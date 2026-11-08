Build or rerun the held-out evaluation for slide 6 of the pitch (see context/HANDOFF.md, open item 1).

- Cases live in tests/eval-cases.json (50 to 60 synthetic, labeled with the expected disposition: async, video or in_person). Never tune the rules on them.
- Compare Checkpoint's rules (public/engine.js) with a simple keyword baseline.
- Report: red-flag cases sent in person (bar 100%), routed to a licensed clinician (bar 100%), over-escalation rate, and cost per successful result including retries (from API usage when the live flow is run).
- Print a table ready to paste into the deck, and name at least one failure with its cause.
