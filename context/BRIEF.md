# Checkpoint Health: the full brief

Read this first. It explains what we are building, why, for whom, and what "done" looks like. CLAUDE.md has the rules and commands. HANDOFF.md has the decision log and open items. This file is the big picture.

## 1. The one-sentence version

Checkpoint is an MCP connector that lets any health AI (Claude, ChatGPT, a symptom checker) hand a patient's question to a licensed Florida clinician, who reviews it and can prescribe, for a flat cash price.

## 2. Who we are and what the event is

- Builder: Michel, University of Miami (UM) student, Miami, Eastern time.
- Event: UM AI Hackathon 2026. Pitch is 5 minutes plus 3 minutes of judge Q&A. A live demo slot is part of the pitch (about 90 seconds).
- Judging criteria and weights: Value 25, Build 20, Trust 20, Run 15, People 10, Innovation 10.
- The playbook is in `context/hackathon/`. Re-read it before changing the deck or the demo.

What the weights mean for the work:
- Value (25): a real person with a real problem, and revenue we can explain in one breath.
- Build (20): the thing actually works, on a real API, not a mockup.
- Trust (20): safety, privacy and legal footing. This is where health products die, so we over-invest here.
- Run (15): evidence it keeps working: tests, an evaluation, run numbers, costs.
- People (10): who is on the team and who does what.
- Innovation (10): why this is new (an MCP connector to human care, not another chatbot).

## 3. The problem

People already ask AI about symptoms. AI can inform them but cannot examine, diagnose, or prescribe. So the conversation dead-ends at "see a doctor," and the patient has to leave the AI, find a provider, create accounts, wait, and pay. Most just do not follow through, or they go to urgent care for something simple.

Checkpoint closes that gap inside the conversation. The AI recognizes the case, offers a clinician, collects the intake securely, and hands off. A clinician reviews and responds.

## 4. The wedge: uncomplicated UTIs

We start narrow on purpose.
- Uncomplicated urinary tract infection in adult women is common, well understood, and has a standard protocol.
- A clinician can decide from a short, structured intake whether it is safe to treat remotely or whether the patient needs in-person care.
- A narrow wedge is easier to make safe, easier to evaluate, and easier to explain to judges.

Screening is done by a fixed-rule engine (`public/engine.js`), not by the model. Red flags (fever, flank pain, pregnancy, male patient, recurrent infection, and so on) route the patient out of the remote path to in-person care or emergency guidance.

## 5. How a visit works (the product)

1. Patient talks to a health AI (in the demo, a Claude-style chat).
2. The AI asks screening questions as clickable cards. The questions come from the engine, so they are not guessed.
3. Rules decide: eligible, needs in-person care, or emergency (911 or 988 language where relevant).
4. If eligible, the AI offers a Florida-licensed clinician and lists the available ones with price, language, and next availability.
5. Patient picks a clinician and a visit type: text ($50) or video ($79).
6. Intake (name, date of birth, address, phone, pharmacy, allergies, medications) is collected in secure fields. The AI never sees these values. It only sees "[Label provided securely to Checkpoint]".
7. Consent, then submit.
8. The clinician console fills in live: the screening answers, the intake, a risk summary, and a Claude-drafted reply for the clinician to edit and approve. The clinician is always the decision maker.
9. For video, the patient picks a slot, gets a Zoom link message from the doctor and a calendar confirmation (both simulated and labeled demo).

## 6. The business model

- Cash pay only. Insurance was considered and dropped: Florida has no payment parity for telehealth, and async e-visit codes pay very little (Medicare 99421 is about $15 to $16). Revisit insurance after launch.
- Prices: $50 text visit, $79 video visit.
- Clinician gets a flat $20 per text visit. This is a flat fee for the clinician's work, never a percentage or "commission" (see the legal notes on fee splitting).
- Checkpoint's revenue is the spread between what the patient pays and what the clinician is paid, per visit.
- Category name: "on-demand care."
- Comparison points: Amazon One Medical charges $29 for messaging and $49 for video. OpenLoop-style networks pay clinicians roughly $4 to $40 per visit.
- Overseas doctors come later, and only as consultants to a Florida physician who stays the doctor of record.

## 7. Trust and legal posture (the 20-point category)

The full guide is `context/research/`. The short version:
- Practice of medicine: Florida-licensed clinicians only. Florida Statute 456.47 governs telehealth. 458.303 and 458.331 matter for physician conduct. 817.505 covers patient brokering, which is why the fee structure has to be a flat fee for service and not tied to referrals.
- Corporate practice of medicine: Checkpoint is the technology and operations layer, the clinicians practice through their own professional entity. Never imply that Checkpoint practices medicine.
- Privacy: HIPAA posture, minimum data to the model, secure fields, and the smoke test asserts that no names, DOB, address, or phone reach the API.
- AI rules: the AI talks, the engine decides, the clinician signs. State AI-in-healthcare laws (for example California AB 489) favor this design.
- Prescribing: the demo simulates prescriptions only. A real launch needs e-prescribing and clear controlled-substance exclusions (the protocol drug is not a controlled substance).
- Be ready for judge questions on all of the above. The cheat sheet is in `context/research/`.

## 8. What is built (and works)

- Real Anthropic API in the loop (Claude Haiku 5.5 by default). The key stays on the server.
- Claude-style patient chat with genuine question cards (`ask_user`) and four Checkpoint tools: `checkpoint_screen_next`, `checkpoint_list_clinicians`, `checkpoint_select_clinician`, `checkpoint_intake_next`.
- Fixed-rule engine for eligibility and safety, with 13 offline tests.
- Prompts in `prompts/` for the patient assistant and the clinician draft, with a draft safety validator (must name the protocol drug and dose, no other drugs, only approved placeholders, one retry, then a template fallback).
- Clinician console with a "What Claude saw" masked view and an audit log.
- Secure fields with dot masking.
- Video visit scheduling with a Zoom link message and a calendar confirmation card.
- A scripted Play demo at human speed, plus a live mode for typed input.
- A live smoke test (9 checks) against the real API.

## 9. What "done" looks like for the hackathon

Must have:
1. The demo runs end to end live, with the real API, without a stumble.
2. A 90-second version of the demo for the pitch slot (the scripted Play demo currently takes about 3:40, so it needs a faster mode).
3. A held-out evaluation for slide 6: 50 to 60 cases (screening decisions and draft safety), compared against a simple keyword baseline. This is the Run/Trust proof and is the highest-value missing piece.
4. Run numbers for slide 8: correction rate, cost per successful result, injection attempts blocked.
5. A real MCP server so Claude can call Checkpoint directly (see below).

Nice to have:
- The tailwinds slide (MCP and connectors as a trend, on-demand care, and so on). The draft is in `context/deck/`. Not added yet because Michel wants to collect every tailwind first.
- Deck blanks: response-time target, team names and owners, the curveball panel.

## 10. The real MCP server (next big build)

Right now the four Checkpoint tools are defined in `prompts/tools.json` and executed in the browser by `public/engine.js`. For the "MCP connector" claim to be literal, build `mcp-server.js`:
- A stdio MCP server wrapping the same four tools and the same engine, so behavior is identical.
- Register with `claude mcp add checkpoint -- node mcp-server.js` and demonstrate Claude calling it.
- Keep zero dependencies if possible, or add the official MCP SDK if the protocol handling gets heavy (that is an acceptable reason to break the no-dependencies rule).
- Intake values must still never be returned to the model. The server holds them and returns only labels.

## 11. Rules that must not break

These are also in CLAUDE.md. In short: the model never sees personal intake values; the engine, not the model, decides eligibility and safety; the clinician is the decision maker; all data and prescriptions in the demo are synthetic and labeled; the fee is a flat fee, never "commission"; and no em or en dashes anywhere in text Michel will read or present (use commas, brackets, or other punctuation).

## 12. Style and working preferences

- No em dashes or en dashes in any copy.
- Always share full code, not fragments.
- Documents Michel will read or submit are delivered as PDFs. Context files for Claude Code stay markdown.
- Terminal commands should be copy-paste ready.
- Use Miami time for anything scheduled.
- Plain, specific wording. No inflated claims in the deck or the demo. Michel specifically asked for the "AI sloppiness" to be removed from the presentation, so avoid filler phrases and generic claims.

## 13. Where things are

- `CLAUDE.md`: rules, commands, layout.
- `context/HANDOFF.md`: decisions, status, open items, starter prompts.
- `context/BRIEF.md`: this file.
- `context/deck/`: the current 11-slide deck text and notes, the tailwinds draft, and the original 25-slide deck.
- `context/hackathon/`: playbook and rubric.
- `context/research/`: regulation guide, judge Q&A, raw notes.
- `context/memory/project-notes.md`: standing preferences.
- `prompts/`: the backend prompts and tool definitions.
- `tests/`: offline and live tests. Run `/check` after any change.
- The pitch deck lives in Figma (https://www.figma.com/slides/6PR3C2CFguvURd1pjv2lPq). Claude Code cannot edit it without the Figma connector. The text is mirrored in `context/deck/`.

## 14. Suggested order of work

1. Read CLAUDE.md, HANDOFF.md and this file. Run `/check`.
2. Build `tests/eval.js` (50 to 60 held-out cases, keyword baseline) and report the numbers.
3. Build `mcp-server.js` and register it.
4. Add a fast 90-second demo mode.
5. Capture run numbers for slide 8 and update the deck text in `context/deck/`.
6. Rotate the API key after the hackathon.
