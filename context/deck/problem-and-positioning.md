# Checkpoint Health: the problem, what already works, what we add

## The problem (say this first)

People now ask AI about their health before they ask anyone else, and the AI cannot finish the job.
- 32% of US adults used AI chatbots for health information in the past year (KFF, Feb to Mar 2026).
- 42% of people who asked about physical health never saw a professional afterward.
- 1 in 5 use AI because they cannot afford a professional or get an appointment.
- Today's AI either exaggerates ("could be sepsis or even cancer") or dead ends ("I'm not a doctor, search medical info"). Result: anxiety, a needless ER visit, or no care.
- Care for something telemedicine can treat costs $160 to $354 at urgent care for an uncomplicated UTI, and the ER is $1,500 to $3,000 for an uninsured patient.

One sentence: **people ask AI, AI cannot connect them to a licensed clinician at a fair price, so they overpay or get no care.**

## What already works (K Health, our proof)

- Free AI symptom checker, then a paid licensed clinician: $49 first month of unlimited visits or $73 one time. Text first, with photos or a quick video if needed.
- Clinicians work for affiliated physician-owned practices, with K Health as the tech and management company. About 48 states.
- Health system partners include Cedars-Sinai, Northwell and Penn.
- Annals of Internal Medicine study (2025): 461 visits at Cedars-Sinai Connect, physicians and the AI agreed in about two thirds of cases. Caveat: K Health affiliated authors, expert ratings, not patient outcomes.
- Teladoc, Included Health and SteadyMD use the same physician practice plus management company structure.
- What this proves: the legal structure and the AI intake plus clinician model are viable. It does not prove our new part.

## What we add (the new part)

- **A layer, not an app.** K Health is a destination you download. Checkpoint is an MCP server any health AI can call, so the handoff happens inside the chat the person already started. No new app, no forms.
- **Price routing.** We match the lowest cost licensed clinician who is licensed in the patient's state, speaks the language and is online now ($39 target UTI visit), where K Health offers one provider at one price.
- **Doctor reviews the AI's draft.** Red flags are checked first by fixed rules, personal data is masked, and the clinician approves, edits or starts video. This is faster than a fresh chat, which keeps the price low.
- **Audit log and outcome loop.** Every decision is logged; an opt-in, de-identified 72 hour check-in shows what worked.
- **Model agnostic.** Works with whichever frontier model or agent a company uses.
- Later: more conditions and states, then international clinicians as consultants to a US licensed doctor.

## Honest framing for judges

"The structure is proven. K Health has run AI intake plus licensed clinicians across most states and with major health systems. What is new is the layer: any AI can hand a case to a clinician, matched on price and license, and the clinician reviews the AI's draft. That handoff is what we test."

Limits to state: prices and volumes are assumptions, replacement of urgent care visits is unproven, legal structure is to be confirmed with counsel, the demo uses synthetic data, and prescribing needs a separate legal review.
