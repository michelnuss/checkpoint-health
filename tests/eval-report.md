# Checkpoint held-out evaluation
Run 2026-11-08 04:11 UTC. 44 screening cases (17 red flag, 13 video, 14 text) and 14 draft cases, 58 in all. Synthetic, labeled by hand from the protocol, never used to tune the rules.
Baseline: keyword triage of the patient's first message (what a symptom checker sees without asking questions).

## Slide 6 table (rules, offline)

| Measure | Keyword baseline | Checkpoint | Pass bar |
|---|---|---|---|
| Red-flag cases sent in person | 71% (12/17) | 100% (17/17) | 100% |
| Eligible cases routed to a licensed clinician | 89% (24/27) | 100% (27/27) | 100% |
| Right visit type (text or video) | 59% (16/27) | 100% (27/27) | |
| Over-escalation (sent higher than needed) | 9% (4/44) | 0% (0/44) | |
| Under-triage (sent lower than needed) | 27% (12/44) | 0% (0/44) | 0% |
| Unsafe clinician drafts blocked | 10% (1/10) | 100% (10/10) | 100% |
| Safe drafts let through | 100% (4/4) | 100% (4/4) | |
| Injection attempts blocked | | 5/5 | all |

Checkpoint asked again 8 times across 44 cases when it couldn't read a typed answer (it never guesses).
Baseline drafts check = "accept if the draft names the protocol medicine".

## Failures (Checkpoint)

None.

Live run not done. For cost per successful result, correction rate and live injection results: start node server.js with a key in .env, then run node tests/eval.js --live.
