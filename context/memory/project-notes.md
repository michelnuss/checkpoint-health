# Saved project notes (from Claude's memory, Nov 7, 2026)

## Checkpoint (the idea)
- Working with teammates on Checkpoint: an MCP connector so that when someone asks Claude about symptoms (a cold, food poisoning, etc.), Claude connects them to a real licensed doctor instead of saying "I'm not a doctor".
- Use case changed from insurance denial review to everyday symptom questions.
- Explored sending written, translated case info (and possibly telemedicine with transcripts) to doctors in India or Brazil for American users. Current plan: overseas doctors only as consultants to a Florida doctor of record, later phase.
- Hackathon version is "Checkpoint Health", UTI wedge in Florida.
- Pricing: about $50 per consult; revenue is the per-consult spread between the patient fee and the clinician's flat fee. The AI runs a starter screener before handoff.

## Original 25-slide deck (summary)
- One-line pitch: for anything telemedicine can treat, Checkpoint finds the lowest-cost licensed clinician and puts them inside the AI people already ask.
- Market framing: TAM $63.9B US telehealth 2026 (Precedence Research, Apr 2026); wedge 5M+ UTI office visits a year.
- Architecture: privacy shield (mask data before model calls), red-flag triage (fixed rules first, then model), matcher (license, language, availability, price), audit log; model agnostic.
- Data design: names in a vault, two consents (care required, data program opt-in), de-identification via HIPAA Safe Harbor or Expert Determination, never sell, license de-identified data only.
- Innovation: opt-in de-identified outcome loop (symptoms, diagnosis, treatment, 72-hour check-in). Competitors: Doctronic, Chia Health, Terac, cash-pay UTI telehealth. Positioning: "MCP is distribution, moat is licensed price routing and consented outcome data".
- Positioning vs K Health: K Health is a destination app with its own AI; Checkpoint is a layer any AI agent plugs into; legal model copied from K Health (physician-owned practice plus MSO, state-licensed clinicians, flat fees).

## Hackathon playbook (summary)
- Rubric (100 pts): Value 25, Build 20, Trust 20, Run 15, People 10, Innovation 10. Each scored 0 to 4. Minus 2 per missed gate. Slide polish not scored; unshown evidence scores a level lower.
- Gates: G1 Problem, G2 Design (architecture, data, top 5 risks, token budget), G3 Evidence (working slice, eval vs baseline, cost per successful result, show failures), G4 Run (monitoring, fallback, run cost, owner, 90-day plan).
- Pitch: 5 minutes + 3 minute Q&A. Problem 0:00, Solution 0:45, Live demo 1:15, Evidence 2:45, Trust and run 3:30, Value and ask 4:15. Panel stops at time.
- Rules: synthetic or public data only; exposed keys cap Trust at 2; faked live demo caps Build and People at 1; disclose AI coding assistants in writing; fixed token budget per team.
- Expected questions: ROI if adoption halves? Show a failure. Paste a prompt injection. Cost per successful result incl. retries? How did the plan change with the curveball? What's not in a tutorial?
