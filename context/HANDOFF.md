# Handoff: where Checkpoint stands (Nov 7, 2026)

Everything built and decided so far for the UM AI Hackathon 2026, so work can continue in Claude Code.

## The idea in one line

Checkpoint is an MCP connector that lets any health AI hand a symptom question to a licensed clinician. People already ask AI first (trend 1) and on-demand care already works (trend 2, K Health proves it). Checkpoint connects them inside the chat the patient already started.

## Decisions made

- **Wedge:** uncomplicated UTIs, women 18 to 64, Florida-licensed clinicians, cash pay.
- **Prices:** $50 text visit, $79 video visit. Patient pays, clinician gets a flat fee ($20 text, $30 video), Checkpoint keeps the spread ($30 per text visit). Always say "flat fee", never "commission" (fee-splitting risk under Fla. Stat. 458.331 and 817.505).
- **Insurance:** dropped. Cash pay only. (Florida has no telehealth payment parity; async e-visit codes pay about $15 to $16 under Medicare.)
- **Category name:** "on-demand care".
- **Expansion:** Florida first, then more states (licensure compact), later overseas doctors only as consultants to a Florida doctor of record (Fla. Stat. 458.303(1)(b), 456.47; confirm with counsel). No law lets foreign-only licensed doctors treat US patients directly.
- **Prescribing:** the demo's antibiotic is simulated. Real prescribing needs counsel review before any pilot.
- **Model:** `claude-haiku-5-5` via the Anthropic API.
- **Demo modes:** typing in the chat is always the live Claude API. The Play demo button is a scripted run at human speed (about 3 min 40 s). A faked "live" demo caps the hackathon Build score at 1, so say Play demo is scripted when presenting it.

## What's built (this folder)

- Claude-style patient chat + clinician console, switched with the Claude / Clinician buttons.
- Live Claude with 5 tools: `ask_user` (Claude's own question card) and 4 Checkpoint tools (screen, list clinicians, select clinician, intake).
- 5-question safety screener with fixed red-flag rules (fever, flank pain, vomiting, pregnancy, blood). Red flags stop the flow and send the patient in person without collecting any personal data.
- Clinician list (cheapest first, offline ones disabled), text visit now or video visit with time slots.
- Secure intake fields (masked with dots while typing) that never reach Claude. Claude sees only "[Date of birth provided securely to Checkpoint]".
- Consent card, $ hold on a test card, then the case lands in the clinician console with every answer, checks (age matches, in Florida), audit log, and a "What Claude saw" view showing masked tokens.
- Video visits: clinician's Zoom link message (synthetic), Google Calendar confirmation card (simulated), clinician starts the call, patient joins a Zoom-style call screen.
- Claude drafts the clinician's reply from the masked case; the server rejects drafts that change the medicine or dose; clinician edits and approves; reply lands in Maria's chat.
- Tests: `tests/engine.test.js` (13 offline checks, all pass) and `tests/smoke.js` (9 live API checks, all passed against Haiku 5.5 on Nov 7).

## Open items before the hackathon

1. **Eval for slide 6** (biggest gap). Build `tests/eval.js`: 50 to 60 labeled synthetic cases (held out), run Checkpoint's rules and the live flow vs a simple keyword baseline, and print: red-flag cases sent in person (bar 100%), routed to a licensed clinician (bar 100%), over-escalation, cost per successful result including retries (token usage from the API response). Include at least one real failure to show.
2. **Run numbers for slide 8:** clinician correction rate, cost per successful result, injection attempts blocked. The eval can produce these.
3. **Real MCP server:** `mcp-server.js` (stdio) exposing the 4 Checkpoint tools from `public/engine.js`, so Claude Code or Claude Desktop calls Checkpoint directly. `claude mcp add checkpoint -- node mcp-server.js`.
4. **Deck blanks:** response-time target (slide 11), owners and team names (slides 8, 11), curveball panel (slide 10, fill at the event).
5. **Pitch timing:** the scripted Play demo takes about 3:40, but the demo slot is 90 seconds. Either type a short live path on stage, or start Play demo before the slot and narrate the key moments.
6. **Tailwinds slide** (drafted, not added): see `deck/tailwinds-slide-draft.md`.
7. **Rotate the API key** after the hackathon (it was pasted into a chat).

## Where things are

- `context/deck/current-figma-deck.md`: all 11 slides' text and speaker notes.
- `context/deck/tailwinds-slide-draft.md`: the drafted tailwinds slide.
- `context/deck/original-25-slide-deck.pptx` and `original-deck-source-pack.md`: the team's first deck.
- `context/deck/problem-and-positioning.md`: problem, K Health, what Checkpoint adds.
- `context/hackathon/`: the student playbook (rubric, gates, pitch timing, judge questions, rules).
- `context/research/regulation-guide.md`: full legal research (licensure, CPOM/MSO, HIPAA/FTC, FDA CDS, state AI laws, liability, e-prescribing, international doctors) with 21 judge Q&As.
- `context/research/judge-qna-cheat-sheet.md`: condensed Q&A.
- `context/research/notes/`: raw research notes behind the guide.
- `context/memory/`: saved notes about the project, the deck and the playbook.

## Starter prompts for Claude Code

1. `Read CLAUDE.md and context/HANDOFF.md, run the offline tests, and tell me the state of the project in five bullets.`
2. `Build tests/eval.js as described in HANDOFF.md open item 1. Use the engine for ground truth, keep cases synthetic, and print a table I can paste into slide 6.`
3. `Build mcp-server.js exposing the four Checkpoint tools over stdio using public/engine.js, add it with claude mcp add, and show me Claude Code calling it.`
4. `Rehearse: start the server, run node tests/smoke.js -v, and flag anything Claude said that a judge could criticize.`
