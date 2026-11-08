// Checkpoint demo server.
// - Serves the demo page.
// - Owns the prompts and tool definitions (prompts/), so the browser can't see or change them.
// - Calls the Claude API with your key from .env. The key never reaches the browser.
// - Checks every clinician draft before the clinician sees it.
// Run: node server.js   (Node 18 or newer, no npm install needed)

const http = require("http");
const fs = require("fs");
const path = require("path");

// ---------- config ----------
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.CLAUDE_MODEL || "claude-haiku-5-5";
const API_BASE = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/$/, "");
const PUBLIC = path.join(__dirname, "public");
const PROMPTS = path.join(__dirname, "prompts");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png" };

// Prompts are re-read on every call, so you can edit them while the server runs.
function prompts() {
  return {
    patient: fs.readFileSync(path.join(PROMPTS, "patient-assistant.md"), "utf8"),
    draft: fs.readFileSync(path.join(PROMPTS, "clinician-draft.md"), "utf8"),
    tools: JSON.parse(fs.readFileSync(path.join(PROMPTS, "tools.json"), "utf8"))
  };
}

// ---------- helpers ----------
function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", c => { data += c; if (data.length > 2e6) { reject(new Error("Body too large")); req.destroy(); } });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}
let noTemperature = false; // some models reject temperature; remember and stop sending it
async function claude(payload) {
  const body = { model: MODEL, ...payload };
  if (noTemperature) delete body.temperature;
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(API_BASE + "/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body)
    });
    const json = await r.json().catch(() => ({ error: { message: "Bad JSON from API" } }));
    if (r.status === 400 && body.temperature !== undefined && /temperature/i.test(JSON.stringify(json))) {
      noTemperature = true; delete body.temperature; continue;
    }
    if ((r.status === 429 || r.status === 529 || r.status >= 500) && attempt < 2) {
      await new Promise(ok => setTimeout(ok, 800 * (attempt + 1))); continue;
    }
    return { status: r.status, json };
  }
}
function log(...a) { console.log(new Date().toLocaleTimeString(), ...a); }

// ---------- /api/chat: Claude talking with the patient ----------
function validMessages(messages) {
  if (!Array.isArray(messages) || !messages.length || messages.length > 160) return "messages must be a non-empty array (max 160)";
  for (const m of messages) {
    if (!m || !["user", "assistant"].includes(m.role)) return "only user and assistant roles are allowed";
    if (typeof m.content !== "string" && !Array.isArray(m.content)) return "bad message content";
  }
  if (messages[0].role !== "user") return "first message must be from the user";
  return null;
}
async function chat(body) {
  const bad = validMessages(body.messages);
  if (bad) return { status: 400, json: { error: { message: bad } } };
  const p = prompts();
  const out = await claude({
    // Room for the model's thinking plus a short reply. Haiku 5.5 thinks by default and counts it against max_tokens.
    max_tokens: 2000,
    temperature: 0.3,
    system: [{ type: "text", text: p.patient, cache_control: { type: "ephemeral" } }],
    tools: p.tools,
    messages: body.messages
  });
  if (out.status === 200) {
    const calls = (out.json.content || []).filter(b => b.type === "tool_use").map(b => b.name).join(", ");
    log("chat ->", out.json.stop_reason, calls || "(text only)");
  } else log("chat error", out.status, JSON.stringify(out.json).slice(0, 300));
  return out;
}

// ---------- /api/draft: Claude drafting the clinician's reply from the masked case ----------
// Medicines the check knows, generic name -> brand names. Any of these other than the plan's drug is rejected,
// including the other protocol drug (so an allergy plan can't slip nitrofurantoin back in).
const MEDS = {
  nitrofurantoin: ["macrobid", "macrodantin", "furadantin"],
  fosfomycin: ["monurol"],
  ciprofloxacin: ["cipro"], levofloxacin: ["levaquin"], ofloxacin: [], moxifloxacin: ["avelox"],
  trimethoprim: ["primsol"], sulfamethoxazole: ["bactrim", "septra", "smz-tmp", "tmp-smx"],
  amoxicillin: ["amoxil", "augmentin"], ampicillin: [], penicillin: [], cephalexin: ["keflex", "cefalexin"], cefuroxime: ["ceftin"],
  cefpodoxime: [], cefdinir: ["omnicef"], ceftriaxone: ["rocephin"], doxycycline: ["vibramycin"], azithromycin: ["zithromax", "z-pak"],
  methenamine: ["hiprex"], pivmecillinam: [], metronidazole: ["flagyl"], fluconazole: ["diflucan"],
  phenazopyridine: ["pyridium", "azo", "uristat"], ibuprofen: ["advil", "motrin"], naproxen: ["aleve"], acetaminophen: ["tylenol"],
  oxycodone: ["oxycontin", "percocet"], hydrocodone: ["vicodin", "norco"], tramadol: ["ultram"], codeine: [], morphine: []
};
// Catches medicines not in the list above by their name endings (antibiotics, opioids, and so on).
const DRUG_ENDINGS = /\b[a-z]+(cillin|mycin|floxacin|cycline|azole|codone|morphone|azepam|prazole|sartan|statin)\b/g;
const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
// Same wording rules for the plan and the draft, so "100 milligrams, twice daily for five days" matches "100 mg, twice a day for 5 days".
function normalizeRx(s) {
  return String(s).toLowerCase()
    .replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/g, w => NUMBER_WORDS[w])
    .replace(/(\d)\s*-\s*(day|dose)/g, "$1 $2")
    .replace(/\b(\d+(?:\.\d+)?)\s*(milligrams?|mgs?)\b/g, "$1 mg")
    .replace(/\b(\d+(?:\.\d+)?)\s*(grams?|gm?)\b/g, "$1 g")
    .replace(/\b(twice (a|per|each) day|twice daily|2 times (a|per|each) day|2 times daily|every 12 hours|bid)\b/g, "twice a day")
    .replace(/\b(once (a|per|each) day|once daily|1 time (a|per|each) day|daily)\b/g, "once a day")
    .replace(/\b(a single|single|1 single|1 time|just 1)\s+dose\b/g, "1 dose")
    .replace(/\bdays\b/g, "day").replace(/\bdoses\b/g, "dose")
    .replace(/[(),;:]/g, " ").replace(/\s+/g, " ").trim();
}
function checkDraft(text, c) {
  const problems = [];
  const drug = String(c.plan.required_drug || "").toLowerCase();
  const lower = text.toLowerCase();
  const norm = normalizeRx(text);
  if (!text.trim()) problems.push("empty");
  if (drug && !lower.includes(drug)) problems.push(`must name ${drug} exactly as in plan.patient_rx`);
  // The whole regimen must be there: drug and dose, how often, and how long. "nitrofurantoin 100 mg" + "twice a day" + "5 day".
  const parts = String(c.plan.patient_rx).split(/,| for /i).map(normalizeRx).filter(Boolean);
  const has = p => new RegExp(`(^|[^a-z0-9.])${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z0-9])`).test(norm);
  const missing = parts.filter(p => !has(p));
  if (missing.length) problems.push(`must state the regimen exactly as "${c.plan.patient_rx}" (missing or changed: ${missing.join("; ")})`);
  // Only the plan's dose may appear. Any other amount means a changed dose or a second medicine.
  const allowedDoses = new Set((normalizeRx(c.plan.patient_rx).match(/\d+(?:\.\d+)? (mg|g|mcg|ml)\b/g) || []));
  const otherDoses = [...new Set((norm.match(/\d+(?:\.\d+)? ?(mg|g|mcg|ml)\b/g) || []).map(d => d.replace(/(\d)(mg|g|mcg|ml)$/, "$1 $2")))].filter(d => !allowedDoses.has(d));
  if (otherDoses.length) problems.push(`mentions another dose (${otherDoses.join(", ")}); only ${[...allowedDoses].join(", ")} is allowed`);
  // No other medicine, by generic name, brand name, or a drug-like name ending.
  const allowedNames = new Set([drug, ...(MEDS[drug] || [])]);
  const others = new Set();
  for (const [generic, brands] of Object.entries(MEDS)) for (const name of [generic, ...brands]) {
    if (!allowedNames.has(name) && new RegExp(`\\b${name.replace(/[-]/g, "\\-")}\\b`, "i").test(lower)) others.add(name);
  }
  for (const m of lower.matchAll(DRUG_ENDINGS)) if (!allowedNames.has(m[0])) others.add(m[0]);
  if (others.size) problems.push(`mentions another medicine (${[...others].join(", ")}); only ${drug} is allowed`);
  const tokens = (text.match(/\[[A-Z_]+\]/g) || []).filter(t => !["[PATIENT_NAME]", "[PHARMACY]"].includes(t));
  if (tokens.length) problems.push(`unknown placeholders ${tokens.join(", ")}`);
  if (!text.includes("[PATIENT_NAME]")) problems.push("must greet [PATIENT_NAME]");
  if (text.length > 900) problems.push("too long, keep under 90 words");
  return problems;
}
async function draft(body) {
  const c = body && body.case;
  if (!c || !c.plan || !c.plan.patient_rx || !c.plan.required_drug) return { status: 400, json: { error: { message: "case.plan.patient_rx and case.plan.required_drug are required" } } };
  const p = prompts();
  const messages = [{ role: "user", content: "Case:\n```json\n" + JSON.stringify(c, null, 2) + "\n```" }];
  const usage = {}; // summed across attempts, so tests/eval.js can price retries
  for (let attempt = 1; attempt <= 2; attempt++) {
    // Low effort: a short templated message needs little thinking, and at the old 400-token cap thinking used every token and left no text.
    const out = await claude({ max_tokens: 1500, temperature: 0.2, output_config: { effort: "low" }, system: p.draft, messages });
    if (out.status !== 200) { log("draft error", out.status); return out; }
    for (const [k, v] of Object.entries(out.json.usage || {})) if (typeof v === "number") usage[k] = (usage[k] || 0) + v;
    const text = (out.json.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
    const problems = checkDraft(text, c);
    if (!problems.length) { log("draft ok, attempt", attempt); return { status: 200, json: { draft: text, attempts: attempt, usage } }; }
    log("draft rejected:", problems.join("; "));
    messages.push({ role: "assistant", content: text || "(empty)" });
    messages.push({ role: "user", content: "Rewrite it. Fix: " + problems.join("; ") + ". Output only the message." });
  }
  return { status: 422, json: { error: { message: "Draft failed the safety check twice; using the protocol template." }, usage } };
}

// ---------- server ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (url.pathname === "/api/health") return send(res, 200, { live: Boolean(API_KEY), model: MODEL });
    if ((url.pathname === "/api/chat" || url.pathname === "/api/draft") && req.method === "POST") {
      if (!API_KEY) return send(res, 400, { error: { message: "No ANTHROPIC_API_KEY in .env" } });
      const body = JSON.parse(await readBody(req) || "{}");
      const out = url.pathname === "/api/chat" ? await chat(body) : await draft(body);
      return send(res, out.status, out.json);
    }
  } catch (e) {
    log("server error", e.message);
    return send(res, 500, { error: { message: e.message } });
  }
  // static files
  const file = path.normalize(path.join(PUBLIC, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname)));
  if (!file.startsWith(PUBLIC)) return send(res, 403, "Forbidden", "text/plain");
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, "Not found", "text/plain");
    send(res, 200, data, TYPES[path.extname(file)] || "application/octet-stream");
  });
});

// Only listen when run directly; tests/eval.js requires this file to reuse checkDraft.
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Checkpoint demo running at http://localhost:${PORT}`);
    console.log(API_KEY ? `Claude API on, model ${MODEL}` : "No ANTHROPIC_API_KEY in .env: the page will say the API is not connected.");
  });
}

module.exports = { checkDraft };
