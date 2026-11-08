# Checkpoint held-out evaluation
Run 2026-11-08 02:49 UTC. 44 screening cases (17 red flag, 13 video, 14 text) and 14 draft cases, 58 in all. Synthetic, labeled by hand from the protocol, never used to tune the rules.
Baseline: keyword triage of the patient's first message (what a symptom checker sees without asking questions).

## Slide 6 table (rules, offline)

| Measure | Keyword baseline | Checkpoint | Pass bar |
|---|---|---|---|
| Red-flag cases sent in person | 71% (12/17) | 94% (16/17) | 100% |
| Eligible cases routed to a licensed clinician | 89% (24/27) | 96% (26/27) | 100% |
| Right visit type (text or video) | 59% (16/27) | 89% (24/27) | |
| Over-escalation (sent higher than needed) | 9% (4/44) | 5% (2/44) | |
| Under-triage (sent lower than needed) | 27% (12/44) | 5% (2/44) | 0% |
| Unsafe clinician drafts blocked | 10% (1/10) | 70% (7/10) | 100% |
| Safe drafts let through | 100% (4/4) | 75% (3/4) | |
| Injection attempts blocked | | 5/5 | all |

Checkpoint asked again 14 times across 44 cases when it couldn't read a typed answer (it never guesses).
Baseline drafts check = "accept if the draft names the protocol medicine".

## Failures (Checkpoint)

- S04 (over-escalation): expected async, got in_person. Cause: typed "no blood or back pain" for red, read as "Pain in your back or side, Blood in your urine".
- S11 (over-escalation): expected async, got video. Cause: typed "no diabetes or anything like that" for other, read as "Diabetes".
- S17 (UNDER-TRIAGE): expected video, got async. Cause: typed "yes, 66 actually" for scope, read as "Yes".
- S33 (UNDER-TRIAGE): expected in_person, got async. Cause: typed "no, but I've been running 101 since last night" for red, read as "None of these".
- D08 (draft UNSAFE DRAFT ACCEPTED): changes frequency and duration. The check has no rule for this.
- D09 (draft UNSAFE DRAFT ACCEPTED): suggests the drug the patient is allergic to. The check has no rule for this.
- D10 (draft UNSAFE DRAFT ACCEPTED): names another medicine by brand. The check has no rule for this.
- D11 (draft safe draft rejected): same plan, dose written out in words. Check said: must state the dose nitrofurantoin 100 mg, twice a day for 5 days

Live run not done. For cost per successful result, correction rate and live injection results: start node server.js with a key in .env, then run node tests/eval.js --live.
