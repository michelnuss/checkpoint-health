# Checkpoint Health demo

Hackathon demo for the UM AI Hackathon 2026. Checkpoint is an MCP connector that lets any health AI hand a patient's symptom question to a licensed clinician. Wedge: uncomplicated UTIs, Florida-licensed clinicians, cash pay ($50 text visit, $79 video visit).

The demo has two windows in one page:
- **Claude**: a Claude-style chat (Maria, the patient) talking to the real Claude API with the Checkpoint tools.
- **Clinician**: Dr. Marquez's console, filling in live as Maria answers, with a Claude-drafted reply to approve.

All patients, clinicians, licenses and pharmacies are synthetic. Prescriptions are simulated.

## Commands

```bash
node server.js              # serve on http://localhost:3000 (needs ANTHROPIC_API_KEY in .env)
node tests/engine.test.js   # offline rule tests, run after any change to public/engine.js
node tests/smoke.js         # live API test, ~2 min; run after any change to prompts/ or the chat flow
node tests/smoke.js -v      # same, printing the full conversations
```

No npm install. Node 18+ only, no dependencies. Keep it that way unless there's a strong reason.

## Layout

- `public/engine.js`: synthetic dataset (`DATA`) and Checkpoint's fixed rules (`Engine`). Loaded by the browser and by the tests, so both run the same rules. Global state lives in `var S`.
- `public/index.html`: the whole front end (CSS + JS inline). Sections are marked with `/* ===== NAME ===== */` banners: UI helpers, widgets, Actions, Live (API loop), console render, windows, autoplay, wiring.
- `prompts/patient-assistant.md`: system prompt for Claude in the patient chat.
- `prompts/clinician-draft.md`: system prompt for Claude drafting the clinician's reply.
- `prompts/tools.json`: `ask_user` (Claude's own question card) plus 4 Checkpoint tools.
- `server.js`: serves the page, owns the key, adds prompts and tools to every call (`/api/chat`), and validates drafts (`/api/draft`). Prompts are re-read on every request.
- `tests/`: `engine.test.js` (offline), `smoke.js` (real API), `load-engine.js` (loads engine.js in a vm context).

## Rules that must not break

1. **Rules decide, Claude talks.** Eligibility, red flags, clinician matching, prices and visit times come only from `Engine`. Never let model output decide them. During screening, the browser replaces Claude's `ask_user` options with the engine's options.
2. **No personal data to Claude.** Intake values go into secure fields and straight into `S.intake`. Claude only ever receives `[<label> provided securely to Checkpoint]`. The smoke test fails if a name, date of birth, address or phone reaches the API.
3. **Draft safety.** `/api/draft` rejects any draft that changes the protocol medicine or dose, names another drug, or uses placeholders other than `[PATIENT_NAME]` and `[PHARMACY]`; it retries once, then the console falls back to the protocol template.
4. **Red flags stop everything.** After an `in_person` result, no clinician, no intake, no personal data collected.
5. **Play demo is scripted; typing is live.** The Play demo button calls `autoplay("video")`, which runs in scripted mode at human speed (about 3 min 40 s). Anything typed in the chat goes to the real API. Don't blur these: a faked "live" demo caps the hackathon Build score.
6. **Never commit or print `.env`.** It holds the API key and is in `.gitignore`.

## Model

`CLAUDE_MODEL` in `.env`, currently `claude-haiku-5-5`.

## Writing style for any user-facing copy

Plain language, sentence case, short sentences. No em dashes or en dashes; use commas, periods or parentheses. Don't add "AI-sounding" filler.

## Project context

Read `context/BRIEF.md` first (the full picture: goal, product, business model, legal posture, what done looks like), then `context/HANDOFF.md`: decisions, what is built, open items and starter prompts. The pitch deck text is in `context/deck/current-figma-deck.md`, the hackathon rules in `context/hackathon/`, the legal research in `context/research/`.

Slash commands: `/check` runs both test suites, `/eval` builds or reruns the slide 6 evaluation.

## Ideas queued

- A real MCP server (`mcp-server.js`, stdio) exposing the same 4 Checkpoint tools from `engine.js`, so Claude Code or Claude Desktop can call Checkpoint directly. Register with `claude mcp add checkpoint -- node mcp-server.js`.
- Spanish copy for the screener and intake (Maria speaks Spanish).
- The held-out eval for slide 6 (see context/HANDOFF.md).
