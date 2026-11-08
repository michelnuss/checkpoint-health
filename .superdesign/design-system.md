# Checkpoint Health: design system

## Product context
Checkpoint is an MCP connector that lets a health AI (Claude) hand a patient's symptom question to a licensed Florida clinician. Wedge: uncomplicated UTIs in women 18 to 64, cash pay ($50 online visit, $79 video). Demo for the UM AI Hackathon 2026; all data synthetic, prescriptions simulated.

Two windows on one page:
- Patient: a Claude-style chat (warm off-white, Source Serif replies).
- Clinician console (the design target): an async e-visit inbox where a Florida-licensed clinician reviews a case that a fixed-rule engine screened, then signs a Claude-drafted message and a protocol prescription.

## Clinician console: jobs to be done
1. See who is waiting and how long (queue, reply clock: 30-minute target).
2. Verify safety in seconds: allergies, pregnancy, location in Florida (license state), age/sex vs protocol.
3. Read the one-line summary written by the rules (not AI) and the protocol checklist (12 inclusion/exclusion criteria).
4. Check the chart: medications, allergies, pharmacy, location, phone, consents, payment; each field marked with its source (P patient, R rules, AI Claude, C clinician) and arrival time.
5. Review the prescription (nitrofurantoin 100 mg BID x 5 days, disp 10, refills 0) and Claude's draft message; edit if needed (edits shown as a word diff).
6. Sign with a deliberate press-and-hold (1 s), or switch to video, or refer in person. Keyboard: Cmd+Enter sign, E edit, V video, R refer.
7. Toggle "What Claude saw": personal details become black redaction bars.
8. Audit log as a timeline (+m:ss).

Safety states that must stay visible: red-flag case (no case created, no actions), outside Florida (hard stop), outside protocol (no pre-filled order, video first), unreadable DOB (warning).

## Current visual language (baseline)
- Fonts: IBM Plex Sans (UI), IBM Plex Mono (ids, timestamps, license numbers), Source Serif 4 italic for the signature only.
- Colors (light): bg #EBEFF1, panel #FFFFFF, ink #13191C, muted #5B6970, line #D7DEE2. Green #1C5741 = clinician action / approved. Red #B3372A = safety stops only. Amber #8A5A00 = review / running late. Claude orange #D97757 marks AI-written content only.
- Night shift (dark): bg #0E1416, panel #151D20, ink #E3EAEC, line #26333A, green #5FBF93, red #FF8A7A, amber #F2B84B.
- Hairline borders, 8px radius, no card shadows, 13.5px body, 10.5px uppercase letter-spaced section labels, tabular numerals.
- Layout: left queue (220px) | center chart column | right sticky decision panel (400px), under a sticky patient banner.

## Style rules (hard constraints for every direction)
- Anti-slop: no gradients, no glow, no glassmorphism, no emoji, no stock illustration, no generic icon-in-a-circle feature cards, no purple.
- Color must mean something: one action color, one hazard color, one review color, one AI color. Everything else is neutral.
- Must read like real clinical software that someone cared about (Linear / Stripe level craft, EHR density), legible on a projector.
- Keep all content and safety semantics above; never hide the hazard states or the source markers.
- Plain language, sentence case, no em dashes or en dashes in copy.

## Motion
Subtle and purposeful: new data fades in with a short highlight, redaction bars slide in, the sign button fills during the hold, the signature stamp lands with a small scale-down. No decorative animation.
