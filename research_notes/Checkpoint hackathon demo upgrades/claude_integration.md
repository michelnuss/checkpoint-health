# Making Checkpoint "fully integrated with Claude" (as of Nov 7, 2026)

Scope: a real Checkpoint MCP server, showing it inside real Claude on stage, MCP Apps (UI in Claude), elicitation for secure intake, Claude healthcare offerings and policy, and Claude API features worth showing. Research done Nov 7, 2026, from official MCP and Anthropic docs plus one live probe of the Claude Code CLI installed on Michel's Mac (v2.1.292).

## 1. Current MCP spec, transports, and the minimal server (zero-dep vs SDK)

### Takeaway
The current MCP spec is `2026-07-28`, which made MCP stateless and removed the `initialize` handshake. Claude Code (v2.1.292, tested on this machine) is "dual-era": it first probes with `server/discover` (2026-07-28) and, if that returns "Method not found", falls back to the legacy `initialize` handshake with `protocolVersion: "2025-11-25"`. So the fastest reliable zero-dependency stdio server is a legacy `2025-11-25` server that answers `initialize`, `tools/list`, `tools/call` and returns `-32601` to `server/discover`.

### Cited Findings
- The latest spec is based on `schema/2026-07-28/schema.ts`; it lists the base protocol as "Stateless, self-contained requests" and "Per-request capability negotiation". Extensions include Tasks, Skills over MCP, and MCP Apps. — [MCP spec (latest)](https://modelcontextprotocol.io/specification/latest)
- 2026-07-28 major changes: removes `initialize`/`notifications/initialized`; every request carries `_meta` keys `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities`; adds required `server/discover`; removes `Mcp-Session-Id` from Streamable HTTP; removes `ping` and `logging/setLevel`; introduces Multi Round-Trip Requests (MRTR) replacing server-initiated `elicitation/create`, `sampling/createMessage`, `roots/list`; all results now carry `resultType` (`"complete"` or `"input_required"`), and clients MUST treat results from earlier-protocol servers that omit it as `"complete"`; list results need `ttlMs` and `cacheScope`; Streamable HTTP POSTs need `Mcp-Method` and `Mcp-Name` headers. — [2026-07-28 changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- Roots, Sampling and Logging are deprecated; HTTP+SSE transport is deprecated (use Streamable HTTP). — [2026-07-28 changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- Terminology: "Legacy" = `2025-11-25` and earlier (initialize handshake). A "dual-era" client on stdio probes with `server/discover` and "fall[s] back on any error that is not a recognized modern error". Compatibility matrix: Dual-era client + Legacy server = "Works... the probe returns a non-modern error or times out, and the client falls back to `initialize`". Legacy client + Modern-only server = "Fails". A server MAY implement both eras. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- Modern unsupported-version error code is `-32022` with `data.supported` list. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle)
- **Live probe (primary evidence, run tonight):** Claude Code 2.1.292 launched a logging stdio server via `claude -p --mcp-config cfg.json --strict-mcp-config`. The exact messages it sent, in order:
  1. `{"jsonrpc":"2.0","id":"server-discover-probe-1","method":"server/discover","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientInfo":{"name":"claude-code",...,"version":"2.1.292"},"io.modelcontextprotocol/clientCapabilities":{"roots":{"listChanged":true},"elicitation":{"form":{},"url":{}}}}}}`
  2. (after the probe server answered `-32601 Method not found`) `{"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{"roots":{"listChanged":true},"elicitation":{"form":{},"url":{}}},"clientInfo":{...}},"jsonrpc":"2.0","id":0}`
  3. `{"jsonrpc":"2.0","method":"notifications/initialized"}`
  4. `{"method":"tools/list","jsonrpc":"2.0","id":1}`
  — Source: local test, scratchpad probe server (no URL). Note: Claude Code did NOT advertise the MCP Apps extension (`io.modelcontextprotocol/ui`) in its capabilities.
- **Same probe, important gotcha:** the headless run then failed with `Failed to authenticate: OAuth session expired and could not be refreshed`. Michel must re-login Claude Code (`claude` then `/login`) before rehearsal. — local test.
- npm versions checked tonight with `npm view`: `@modelcontextprotocol/sdk` 1.32.2 (modified 2026-10-23); `@modelcontextprotocol/server` 2.4.0 (modified 2026-10-23, the split v2 package); `@modelcontextprotocol/ext-apps` 2.0.4 (modified 2026-10-27); `@anthropic-ai/mcpb` 2.1.2 (modified 2026-10-07). Local Node is v26.13.0. — local `npm view` (registry.npmjs.org)
- Official MCP Apps build guide still uses SDK v1 imports: `McpServer` from `@modelcontextprotocol/sdk/server/mcp.js`, `StreamableHTTPServerTransport` from `@modelcontextprotocol/sdk/server/streamableHttp.js`, with `sessionIdGenerator: undefined, enableJsonResponse: true`. — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build)

### Minimal zero-dependency stdio server (legacy 2025-11-25, verified handshake shape)
Newline-delimited JSON-RPC on stdin/stdout. Never `console.log` to stdout (it corrupts the stream); log to stderr.

```js
// mcp-server.js  (node mcp-server.js) - zero dependencies
const send = m => process.stdout.write(JSON.stringify(m) + "\n");
const TOOLS = [ /* {name, description, inputSchema:{type:"object",properties:{...},required:[...]}} x4 */ ];
let buf = "";
process.stdin.on("data", d => {
  buf += d; let i;
  while ((i = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, i); buf = buf.slice(i + 1);
    if (!line.trim()) continue;
    const m = JSON.parse(line);
    if (m.method === "initialize") return send({ jsonrpc: "2.0", id: m.id, result: {
      protocolVersion: "2025-11-25",          // echo a version you support
      capabilities: { tools: {} },
      serverInfo: { name: "checkpoint", version: "0.1.0" },
      instructions: "Checkpoint hands a UTI symptom question to a Florida-licensed clinician. Rules decide eligibility." } });
    if (m.method === "notifications/initialized") continue;           // notification, no reply
    if (m.method === "tools/list") { send({ jsonrpc: "2.0", id: m.id, result: { tools: TOOLS } }); continue; }
    if (m.method === "tools/call") {
      const out = runEngineTool(m.params.name, m.params.arguments || {}); // wrap public/engine.js
      send({ jsonrpc: "2.0", id: m.id, result: {
        content: [{ type: "text", text: JSON.stringify(out) }],
        structuredContent: out, isError: false } });
      continue;
    }
    if (m.id !== undefined) send({ jsonrpc: "2.0", id: m.id, error: { code: -32601, message: "Method not found" } }); // includes server/discover and ping
  }
});
```
Loading `public/engine.js` in Node: reuse `tests/load-engine.js` (vm context), as the tests already do.

### Inferences
- Answering `server/discover` with `-32601` is what made Claude Code fall back cleanly in the probe; do not half-implement `server/discover` (a "modern" reply would switch Claude Code to stateless 2026-07-28 semantics, where results need `resultType` and per-request `_meta`).
- The official SDK is now only worth it for Streamable HTTP (remote connector / MCP Apps); for stdio the zero-dep file above is ~40 lines and matches the project rule.
- Server state: because the legacy stdio session is one process per client, `S` (engine state) can live in module memory for the demo.

### Gaps
- I did not verify whether `@modelcontextprotocol/sdk` 1.32.2 speaks 2026-07-28 or only legacy versions, nor the v2 `@modelcontextprotocol/server` API surface. Pin whatever version you install and test with `claude mcp list`.
- Claude Desktop's and claude.ai's handshake behavior were not probed (only Claude Code was).

## 2. Registering it: Claude Code, Claude Desktop, claude.ai custom connectors. What is fastest for tomorrow?

### Takeaway
Claude Code via `claude mcp add` is the fastest and most reliable path (verified tonight that Claude Code talks to a zero-dep stdio server). Claude Desktop via `claude_desktop_config.json` is a close second and looks more "consumer Claude" on stage. claude.ai custom connectors need a public URL (tunnel) and a Streamable HTTP server; they are the only route that is documented to render MCP Apps, but they add network risk.

### Cited Findings
- Claude Code stdio syntax: `claude mcp add [options] <name> -- <command> [args...]`; `--` separates Claude options from the server command; scopes `-s local` (default), `project` (writes `.mcp.json`), `user`. HTTP: `claude mcp add --transport http <name> <url>`. Verify with `claude mcp list`, `claude mcp get <name>`, or `/mcp` in a session (statuses like "Connected", "Failed to connect", "Pending approval"). — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)
- `.mcp.json` format: `{"mcpServers":{"name":{"type":"http","url":"..."}}}`; env var expansion `${VAR}` / `${VAR:-default}`; project servers prompt for approval in interactive sessions. — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)
- Claude Code output limits: warns over 10,000 tokens, caps at 25,000 by default (`MAX_MCP_OUTPUT_TOKENS`); per-server `"timeout"` or `MCP_TOOL_TIMEOUT`. Elicitation `elicitation/create` requests are served only in interactive terminal sessions. — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)
- Claude Desktop config: `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS (Settings > Developer > Edit Config); a trailing comma stops all servers loading; use absolute paths; `claude mcp add-from-claude-desktop` copies servers into Claude Code. Desktop Extensions use the `.mcpb` bundle format (formerly `.dxt`). — [MCPBundles guide](https://www.mcpbundles.com/guides/claude-desktop), [Analytics Vidhya guide](https://www.analyticsvidhya.com/blog/2026/07/connect-mcp-servers-claude-desktop-code/) (third-party; I could not reach Anthropic's own Desktop article)
- Custom connectors (remote MCP): available on Free, Pro, Max, Ultra, Team, Enterprise; "Free users are limited to one custom connector". Server must be reachable from Anthropic's IP ranges on the public internet. OAuth is optional: options are "Sign in now", "Sign in when needed", or "No sign in"; fixed headers can be added. Steps: Customize > Connectors > + Add > Add custom connector > name + URL > auth choice > Add. The connection originates from Anthropic's servers on every client. — [Custom connectors help article](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)
- The MCP Apps guide's recommended way to get a local server into Claude: `npx cloudflared tunnel --url http://localhost:3001`, then add the `https://<random>.trycloudflare.com` URL (+ `/mcp`) as a custom connector. — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build)
- "Advanced research can't invoke tools from local MCP servers." — [Custom connectors help article](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)

### Exact commands for tonight
```bash
cd /Users/michelnussbacher/Downloads/checkpoint-demo
claude mcp add --transport stdio checkpoint -- node /Users/michelnussbacher/Downloads/checkpoint-demo/mcp-server.js
claude mcp list            # expect: checkpoint ... Connected
```
Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`), then fully quit and reopen Desktop:
```json
{ "mcpServers": { "checkpoint": { "command": "node", "args": ["/Users/michelnussbacher/Downloads/checkpoint-demo/mcp-server.js"] } } }
```
Quick offline sanity test without any Claude:
```bash
printf '%s\n' '{"jsonrpc":"2.0","id":0,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"t","version":"1"}}}' '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node mcp-server.js
```

### Inferences
- Stage recommendation: (a) primary live demo stays the existing web app (it already shows the clinician console); (b) add a 20 to 30 second "and here it is inside real Claude" moment using Claude Desktop or Claude Code with the stdio server; (c) record a backup screen video tonight in case of Wi-Fi or auth failure.
- `command: "node"` in Desktop can fail if Desktop's PATH lacks the Node install; using the absolute node path (`which node`) avoids that (common gotcha, not verified in an Anthropic doc).
- A claude.ai custom connector over a `trycloudflare.com` tunnel works on the Free plan (one connector), but the tunnel URL changes each run and conference Wi-Fi is a risk.

### Gaps
- No official Anthropic page reached for Desktop local MCP config or `.mcpb`; details above are from third-party guides.
- Whether connectors added on claude.ai sync to Claude Desktop is not stated explicitly in the help article.

## 3. MCP Apps (interactive UI inside Claude): status, format, feasibility for Checkpoint

### Takeaway
MCP Apps is an official MCP extension (`io.modelcontextprotocol/ui`) and the official docs say Claude (web) and Claude Desktop support it; Claude Code (terminal) did not advertise it. A tool declares `_meta.ui.resourceUri: "ui://..."`, the server serves an HTML resource with mimeType `text/html;profile=mcp-app`, and the host renders it in a sandboxed iframe that can call the server's tools. Checkpoint's screener cards, clinician list or a "case sent" card could render inside claude.ai, but the documented path needs Streamable HTTP + SDK + ext-apps + a bundler + a tunnel: realistic only if the stdio server is already done and working early tonight.

### Cited Findings
- "MCP Apps are currently supported by Claude, Claude Desktop, VS Code GitHub Copilot, Microsoft 365 Copilot, Goose, Postman, MCPJam, and Archestra.AI." — [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview)
- Mechanism: tool description includes `_meta.ui.resourceUri` pointing to a `ui://` resource; host fetches the HTML and renders it in a sandboxed iframe; resource `_meta.ui` may include `csp` and `permissions`; app and host talk JSON-RPC over postMessage (`ui/initialize` and other `ui/` methods, plus `tools/call`); app can call tools, send messages, update the model's context. The `App` class from `@modelcontextprotocol/ext-apps` is optional; you can implement the postMessage protocol directly. — [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview)
- Extension identifier and MIME type: `io.modelcontextprotocol/ui` with `"mimeTypes": ["text/html;profile=mcp-app"]`. — [Versioning and Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/lifecycle), [Extension matrix](https://modelcontextprotocol.io/extensions/client-matrix)
- Official minimal server (verbatim API names): `registerAppTool(server, "get-time", { title, description, inputSchema: {}, _meta: { ui: { resourceUri } } }, handler)` and `registerAppResource(server, resourceUri, resourceUri, { mimeType: RESOURCE_MIME_TYPE }, async () => ({ contents: [{ uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html }] }))`, imported from `@modelcontextprotocol/ext-apps/server`. UI side: `const app = new App({ name, version }); app.connect(); app.ontoolresult = (result) => {...}; await app.callServerTool({ name, arguments })`. Install: `npm install @modelcontextprotocol/ext-apps @modelcontextprotocol/sdk` + dev deps `typescript vite vite-plugin-singlefile express cors tsx`. Iframe uses "deny-by-default CSP", so bundle assets into one HTML file (vite-plugin-singlefile) or configure CSP. — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build)
- Testing in Claude: tunnel with cloudflared and add as custom connector; the guide's note says custom connectors are on paid plans (Pro, Max, Team) — this conflicts with the help article that lists Free (one connector). — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build) vs [Custom connectors help article](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)
- Local test host without Claude: `ext-apps/examples/basic-host`, `SERVERS='["http://localhost:3001/mcp"]' npm start`, open `http://localhost:8080`. — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build)
- Claude Code skill to scaffold: `/plugin marketplace add modelcontextprotocol/ext-apps` then `/plugin install mcp-apps@modelcontextprotocol-ext-apps` (skill `create-mcp-app`). — [Build an MCP App](https://modelcontextprotocol.io/extensions/apps/build)
- Practitioner gotchas (Claude Desktop, remote connector via cloudflared, Mar 2026): importing ext-apps from a CDN (esm.sh) failed in the iframe; bundling with Vite single-file fixed it; if `app.connect()` is never called the iframe stays at height 0 (looks blank); put `csp.connectDomains`/`resourceDomains` on the resource's `_meta.ui`, not the tool's; hosts that don't understand `_meta.ui` ignore it. — [Classmethod blog](https://dev.classmethod.jp/articles/growthpack-mcp-apps/)
- Third-party SDK docs also say MCP Apps support is experimental and servers should return a text fallback. — [C# SDK apps docs](https://csharp.sdk.modelcontextprotocol.io/v2/concepts/apps/apps.html)

### Inferences
- Best Checkpoint candidate for an MCP App: `checkpoint_list_clinicians` rendering clinician cards (name, license state, language, price, next slot) with "Choose" buttons that call `checkpoint_select_clinician` via `app.callServerTool`. Second: the screener as a card. A body map is more work than it is worth tonight.
- An MCP App iframe is also a natural "secure field" surface: intake typed in the iframe could go straight to the server via `callServerTool` and the tool could return only `[Date of birth provided securely to Checkpoint]` to the model. But values still transit Claude's host as a tool call payload; avoid claiming "Anthropic never sees it" for this path.
- Always keep a plain text `content` in each tool result so Claude Code and non-Apps hosts still work.
- Time estimate: 2 to 4 hours for someone new to it, with real risk; treat as stretch goal after the stdio server and backup video.

### Gaps
- Not verified whether Claude Desktop renders MCP Apps from a local stdio server (all examples found used a remote connector).
- ext-apps is at 2.0.4; the build guide may reflect 1.x API names. Check the package README/API docs at [apps.extensions.modelcontextprotocol.io](https://apps.extensions.modelcontextprotocol.io/api/) before coding.
- Exact raw postMessage messages for a no-bundler vanilla implementation were not extracted (spec at github.com/modelcontextprotocol/ext-apps/blob/main/specification/).

## 4. Elicitation for secure intake (can name/DOB bypass the model?)

### Takeaway
Yes in Claude Code: it advertises elicitation `form` and `url` modes (seen in tonight's probe), and form-mode answers go from the user to the server, not into the model's context unless the server's tool result includes them. claude.ai and Claude Desktop support is unconfirmed or reported absent. Spec-wise, form mode is allowed for name/DOB-type data, but the spec recommends URL mode for secrets, and URL mode is the stronger privacy story (data never passes through the MCP client).

### Cited Findings
- Claude Code 2.1.292 declared `"elicitation":{"form":{},"url":{}}` in both its `server/discover` probe and its `initialize`. — local probe (see section 1).
- Claude Code docs: `elicitation/create` requests are served only in interactive terminal sessions (so not in `claude -p`). — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)
- Spec: form mode "Data is exposed to the client"; URL mode "Data (other than the URL itself) is not exposed to the client". Servers MUST NOT use form mode for "passwords, API keys, access tokens, or payment credentials"; "General contact or profile information (such as a name, email address, or username) is not categorically prohibited". Form schemas are flat objects of primitives; string formats `email`, `uri`, `date`, `date-time`. Responses: `accept` (with `content`), `decline`, `cancel`. Clients must let users review/modify and decline. — [Elicitation spec 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)
- Spec: URL mode servers MUST NOT put PII in the URL; client MUST show the full URL and get consent and open it so the client/LLM cannot inspect inputs. — [Elicitation spec 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)
- In 2026-07-28 elicitation is delivered via MRTR (`InputRequiredResult` with `inputRequests`, client retries with `inputResponses`); in legacy 2025-11-25 it is a server-to-client `elicitation/create` request. — [Elicitation spec](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation), [changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- A blog reports Anthropic announced MCP Tasks and Elicitation support in Claude on Oct 23, 2026, "currently available in the Claude Code CLI and will roll out to other Claude products over time"; MCP Tasks public beta needs CLI v2.1.304+ (Michel has 2.1.292). — [azukiazusa.dev](https://azukiazusa.dev/en/blog/claude-mcp-tasks-elicitations) (secondary; cites an @ClaudeDevs post)
- A June 2026 vendor help page states Claude.ai and Claude CoWork do not support elicitation; a March 2026 GitHub feature request for Desktop elicitation was closed. — [RelativityOne help](https://help.relativity.com/RelativityOne/Content/Relativity/MCP/Anthropic_Claude.htm), [claudeissues.com #41110](https://claudeissues.com/issue/41110-feature-mcp-elicitation-support-in-claude-desktop-app)

### Legacy (2025-11-25) elicitation from the zero-dep server
Inside a `tools/call` handler, before replying, send a request to the client and wait for the response with the same id:
```json
{"jsonrpc":"2.0","id":"elicit-1","method":"elicitation/create","params":{
  "mode":"form",
  "message":"Checkpoint secure intake. These answers go to Checkpoint only, not to Claude.",
  "requestedSchema":{"type":"object","properties":{
    "full_name":{"type":"string","title":"Full name"},
    "dob":{"type":"string","format":"date","title":"Date of birth"},
    "pharmacy":{"type":"string","title":"Preferred pharmacy"}},
   "required":["full_name","dob"]}}}
```
Client replies `{"jsonrpc":"2.0","id":"elicit-1","result":{"action":"accept","content":{...}}}`. Store in server memory; then reply to the original `tools/call` with only `"[Name provided securely to Checkpoint] [Date of birth provided securely to Checkpoint]"`. Only send this if the client declared `capabilities.elicitation` in `initialize`; otherwise fall back to "open the secure page" text.

### Inferences
- In Claude Code this is a genuinely strong demo of the "no personal data to Claude" rule: the form is drawn by Claude Code in the terminal, and the model only sees the masked label. It stays truthful only if the tool result never echoes the values; the existing smoke-test assertion idea should be replicated for the MCP server (check tool results for name/DOB strings).
- Wording for the pitch: "the model never sees it" is accurate for this design; "Anthropic never sees it" is not something to claim for form mode (data is exposed to the client app). URL mode to a Checkpoint page is the version where the client also never sees it.
- Do not depend on elicitation in claude.ai or Desktop tomorrow.

### Gaps
- No official Anthropic changelog page found confirming the Oct 23, 2026 elicitation rollout or Desktop status.
- Not tested end to end tonight (needs an interactive, logged-in Claude Code session).

## 5. Claude healthcare offerings, BAA, usage policy: what the pitch can say accurately

### Takeaway
Anthropic launched "Claude for Healthcare" on Jan 11, 2026: HIPAA-ready products for providers/payers/health tech, healthcare connectors (CMS Coverage, ICD-10, NPI Registry, PubMed), consumer health record connectors (HealthEx, Function, Apple Health, Android Health Connect; US, beta), and Agent Skills (FHIR). BAAs exist for the first-party API and HIPAA-configured Enterprise, feature by feature. The Usage Policy treats diagnosis and prescribing as High-risk: a qualified (licensed) human must meaningfully review with authority to change it, and the patient must be told AI was used. Checkpoint's "engine decides, clinician signs" design maps directly onto that.

### Cited Findings
- Claude for Healthcare (published Jan 11, 2026): HIPAA-ready products for providers, payers, health tech and startups; use cases include prior auth, claims appeals, care coordination and "triaging patient messages". Connectors: CMS Coverage Database, ICD-10, NPI Registry, PubMed (for HIPAA-compliant orgs on Claude for Enterprise). Consumer: HealthEx and Function (beta, US, Pro and Max), Apple Health and Android Health Connect (beta via mobile apps). Agent Skills: FHIR development, sample prior authorization review. Anthropic "does not use users' health data to train models"; integrations are opt-in and "private by design". — [Anthropic news](https://www.anthropic.com/news/healthcare-life-sciences)
- BAA: Anthropic offers a BAA covering HIPAA-ready services incl. the first-party API and Enterprise; on Enterprise the Primary Owner must enable HIPAA under "Data and privacy" and accept the BAA. API coverage is feature-by-feature (Batch, Files, Skills, Code Execution, Computer Use, Web Fetch reported not covered). — [Claude help: BAA for commercial customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers) (as summarized by search; sources conflict on Claude Code coverage, see [rapidevelopers](https://rapidevelopers.com/compliance/is-claude-code-hipaa-compliant))
- HIPAA-ready API access requires a BAA via Anthropic sales. — [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention.md)
- Strict tool use is HIPAA eligible, but "PHI must not be included in tool schema definitions" (schemas are cached separately up to 24h). — [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use)
- Usage Policy (page shows effective date Nov 12, 2026): "A qualified person must meaningfully review a High-risk AI Recommendation, with the authority to change or modify it" before it reaches the individual; where law requires a license, the reviewer must hold one; recipients "must be clearly told that AI was used to produce it" (no need to name Claude). Medical High-risk includes "diagnosing a condition; recommending, starting, stopping, or adjusting a treatment or medication, including dose". General health education is not High-risk. Local laws take precedence. — [Anthropic Usage Policy](https://www.anthropic.com/legal/aup)

### Suggested accurate pitch lines
- "Checkpoint is an MCP server. Today it runs in Claude Code and Claude Desktop" (only say claude.ai if the connector demo actually works).
- "Built to Anthropic's high-risk use requirements: a Florida-licensed clinician reviews and can change every recommendation, and the patient is told AI is involved."
- "Claude never sees the patient's name, date of birth, address or phone. Our tests check that." Avoid "HIPAA compliant"; say "designed for a HIPAA path: production would run on Anthropic's HIPAA-ready API under a BAA."
- Tailwind slide: "Anthropic launched Claude for Healthcare in January 2026 with healthcare connectors and consumer health record connectors (HealthEx, Function, Apple Health). Checkpoint is the missing connector: from the chat to a licensed clinician."

### Inferences
- Checkpoint should not claim to be an Anthropic partner or listed connector; it is a custom connector anyone can add.
- The demo uses synthetic data, so no BAA is needed for the hackathon; say so if asked.

### Gaps
- I could not open the BAA help article directly; the feature-coverage list comes from search-result summaries.
- The AUP page showed a Nov 12, 2026 effective date (5 days from now); I did not confirm whether the currently effective version has identical wording.

## 6. Claude API features worth showing judges (reliability and cost)

### Takeaway
Two cheap wins for the existing `server.js`: `strict: true` on the four Checkpoint tools (grammar-constrained, schema-valid tool inputs; supported on `claude-haiku-5-5`), and prompt caching (Haiku 5.5 minimum cacheable prompt is 512 tokens; automatic caching via one top-level `cache_control`). Both produce numbers for the "Run" slide (cache hit tokens, zero malformed tool calls).

### Cited Findings
- Strict tool use: add `"strict": true` next to `name`/`description`/`input_schema`; guarantees tool `input` follows the schema and the tool name is valid; status stable; supported models include `claude-haiku-5-5`; examples use `"additionalProperties": false`; docs examples use header `anthropic-version: 2026-10-21`. — [Strict tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use)
- Prompt caching: Haiku 5.5 minimum cacheable length 512 tokens (Haiku 4.5: 4,096); `"cache_control": {"type":"ephemeral"}` (5 min default) or `{"type":"ephemeral","ttl":"1h"}`; automatic caching via a top-level `cache_control` on the request; cache write 1.25x (5 min) or 2x (1 h), read 0.1x; usage fields `cache_creation_input_tokens`, `cache_read_input_tokens`; cache prefix order is tools > system > messages, so changing tools invalidates everything. — [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- The same page summary listed Haiku 5.5 base input at $0.10/MTok and output $0.50/MTok (<=100K prompt). — [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) (extracted by a summarizer; verify on the pricing page before putting it on a slide)
- MCP spec 2026-07-28: servers SHOULD return tools in deterministic order "to improve LLM prompt cache hit rates". — [changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)

### Inferences
- `server.js` re-reads prompts on every request; that is fine for caching as long as the bytes do not change. Keep `prompts/tools.json` order stable.
- Strict mode requires schema features in the supported subset; check `prompts/tools.json` (e.g. `additionalProperties: false` on every object) and run `node tests/smoke.js` after the change.
- Show judges: "cache_read_input_tokens" from a second turn and a per-visit cost figure.

### Gaps
- Did not verify the full JSON Schema subset limits for strict mode against the current `prompts/tools.json`.
- Haiku 5.5 pricing not cross-checked on the pricing page.
