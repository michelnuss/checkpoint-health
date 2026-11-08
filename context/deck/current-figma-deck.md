# Current pitch deck (Figma Slides, 11 slides)

File: https://www.figma.com/slides/6PR3C2CFguvURd1pjv2lPq (owned by mxn840@miami.edu; sign in with that account)
Design: paper background, ink text, Checkpoint green #1C5741 accent, red for problems and blanks. Fonts: Instrument Serif (headlines), Instrument Sans (body), IBM Plex Mono (labels).
Timing follows playbook slide 14: Problem 0:00, Solution 0:45, Demo 1:15, Evidence 2:45, Trust and run 3:30, Value and ask 4:15.
Text marked [__] or [name] is still blank and must be filled before presenting.

## 1. Saturday night (0:00 to 0:15)
- Headline: "Maria's doctor is closed."
- "Burning when she pees since yesterday. It's late, and urgent care starts at $160. So she asks her AI, as one in three Americans now do."
- Chat mock: Maria: "I've had burning when I pee since yesterday. No fever. What should I do?" AI: "I'm not a doctor. Please consult a medical professional..." Label: "Dead end. No next step."
- Source: KFF Health Tracking Poll, Feb to Mar 2026; Solv, Jun 2026. Maria is illustrative.
- Notes: tell it as a story; transition "Maria is not unusual."

## 2. The problem, Trend 1: people ask AI first (0:15 to 0:45)
- Headline: "People ask AI first. AI can't finish the job."
- Two failure quotes: "Could be sepsis, or even cancer." (exaggerates, needless ER visit) and "I'm not a doctor." (dead end, no care)
- Stats: 2x (health questions to AI doubled in one year, 16% to 32% of US adults, Rock Health Mar 2026); 42% (of people asking about physical health never saw a professional after, KFF); 65% (use AI because it's easier than trying to see a doctor, Zocdoc Feb 2026)
- "An uncomplicated UTI costs $160 to $354 at urgent care and about $50 by telehealth. AI never sends her there."
- Notes: Pew backup, 34% of Americans use chatbots for health. Transition: "The fix already exists. It's called on-demand care."

## 3. Proof, Trend 2: on-demand care already works (0:45 to 1:00)
- Headline: "AI intake plus a licensed clinician already works, and people pay for it."
- K Health flow: free AI symptom check, then licensed clinician by text ($49 first month or $73 a visit), physician-owned practices (48 states, Cedars-Sinai partner)
- Stats: 18.4% of commercially insured patients used telehealth in Q1 2026 (FAIR Health); 2 of 3 cases where K Health's AI and physicians agreed (461 visits, Annals of Internal Medicine Apr 2025, K Health authors); $1.15B Hims & Hers deal for Eucalyptus (Reuters Feb 2026)
- Footer: "We didn't invent this model. K Health showed patients pay for it and the legal structure holds."
- Notes: telehealth claim lines up 10.1% QoQ in Q1 2026. Transition: "But on-demand care is an app you have to go find."

## 4. What we add (1:00 to 1:15)
- Headline: "K Health is an app. Checkpoint works inside any AI."
- "An MCP server any health AI can call. The visit happens in the chat she already started."
- 01 Inside the chat she already started (any AI agent hands off over MCP); 02 Cheapest clinician licensed in her state (license, language, availability, then price); 03 Clinician edits the AI's draft (approve, edit or start video; fast reviews keep the price at $50); 04 Every decision logged (audit trail, opt-in 72-hour outcome check)
- Roadmap: Now, Florida-licensed clinicians, uncomplicated UTIs. Next, more conditions, then more states via the licensure compact. Later, overseas doctors as consultants to a Florida doctor of record (Fla. Stat. 458.303, 456.47, to confirm with counsel).

## 5. Live demo (1:15 to 2:45)
- Headline: "Answered by a clinician 25 minutes later."
- Timeline: 9:40 PM Ask (English, Spanish or Haitian Creole); 9:42 Screen (her AI asks screening questions, rules catch red flags); 9:43 Match (Florida-licensed clinician online now, $50); 10:05 Reviewed (approved answer returns in the same chat)
- Case card mock (synthetic): patient Maria 34 Florida, symptoms, red flags none, history, protocol, AI draft reply, Approve / Edit / Start video
- Notes: run ONE path end to end; edit one line before approving; say synthetic data and simulated prescription; if live breaks, say it's a recording.

## 6. Evidence (2:45 to 3:30)
- Headline: "Tested on cases we never tuned on."
- "50 to 60 labeled synthetic cases, held out from the start. Compared with a simple keyword baseline."
- Table (baseline / Checkpoint / pass bar): red-flag cases sent in person [__]% / [__]% / 100%; routed to a licensed clinician [__]% / [__]% / 100%; over-escalation [__]% / [__]% / [__]%; cost per successful result n/a / $[__] / about $23
- "One failure, shown live: Case [__]: [what failed]. Why: [cause]. Fix: [what we changed]."
- STILL BLANK: needs an eval run (see HANDOFF.md, next steps).

## 7. Trust (3:30 to 3:50)
- Risk level: HIGH. Headline: "Four risks, four controls. Each one is shown in the demo."
- LLM01 prompt injection (patient text is data, never instructions; shown live, blocked); LLM02 data leakage (personal data masked before any model call; shown raw vs masked record); LLM06 excessive agency (the AI cannot diagnose or prescribe; shown clinician approval step); Triage missed red flag (fixed rules run before the model; 100% recall bar)
- Licensing: Florida-licensed or registered clinicians only (Fla. Stat. 456.47). Money: flows one way, providers never pay us per patient (Fla. Stat. 817.505). Privacy: two consents, consumer leg under FTC rules, BAA at handoff to the practice.

## 8. Run (3:50 to 4:15)
- Headline: "It's Monday. Who gets paged?"
- Monitoring tiles: red-flag recall 100% (must stay at 100%); clinician correction rate [__]%; cost per successful result $[__]; injection attempts blocked [__]. Alerts: recall below 100% pauses routing; cost above $30 pages the budget owner.
- Fallback: red-flag rules still run without the model; every case goes straight to a clinician; patient sees an honest wait time.
- Owners: on call [name], budget [name], medical director to recruit before pilot.

## 9. Value (4:15 to 4:35)
- Headline: "Same UTI, same antibiotic. $62 instead of $257."
- Bars (visit plus antibiotic, cash, range midpoints): Checkpoint $62 ($60 to $64), telehealth $77 ($50 to $104), primary care $212 ($110 to $314), urgent care $257 ($160 to $354). ER uninsured $1,500 to $3,000 off scale.
- Unit economics: $30 our revenue on each $50 visit, clinician paid $20 flat; 390 visits a month to break even; 7 month payback on a $120K build.
- "If adoption halves: buyers break even when 33% of visits replace urgent care. RAND found 12%. The pilot measures ours."
- Notes: $50 matches Amazon One Medical's $49 video visit. Say "flat fee", never "commission" (fee-splitting, Fla. Stat. 458.331 and 817.505). OpenLoop pays clinicians $4 to $40 per visit.

## 10. Limits and curveball (4:35 to 4:45)
- "What we don't know yet": prices and volumes are assumptions; urgent-care replacement unproven; uncomplicated UTIs only, cash pay, Florida; legal structure to confirm with counsel; demo runs on synthetic data only.
- Curveball panel: [what changed at the event], what broke [__], what we cut [__], what we told our mentor [__].
- Learned: building an MCP server, masking data before model calls, held-out evals, Florida telehealth law.

## 11. The ask (4:45 to 5:00)
- "A 90-day pilot." Uncomplicated UTIs, cash-pay patients, Florida. Scale only if all three bars are met. Stop if one red flag is missed.
- Bars: 100% red-flag cases sent to in-person care; [__] min median time to a clinician's answer; 33%+ of visits replace an urgent-care visit.
- Close: "Next time, Maria pays $50." Team [names], UM AI Hackathon 2026.
