# Compliance features for the Checkpoint demo, and legal risk of the planned new features (as of November 7, 2026)

Research notes, not legal advice. Builds on `context/research/regulation-guide.md` and `judge-qna-cheat-sheet.md` (do not repeat 456.47 basics, CPOM/MSO, 817.505, fee splitting, HIPAA vs FTC, CDS basics). Focus here is what is new or changed since those notes and how to turn law into visible demo features. Several findings come from secondary summaries (law firm alerts, trackers, search snippets); these are flagged. Tool budget limited this pass to about 15 searches/fetches, so some items are carried forward from the existing guide rather than re-verified.

## Q1. AI disclosure and AI-in-healthcare laws in force or passed by late 2026 that touch a Florida consumer health chatbot

### Takeaway
Florida still has no enacted AI-in-health-care or general chatbot-disclosure statute: the DeSantis "AI Bill of Rights" (SB 482 / HB 1395) passed the Senate but died in the House in March 2026 and failed again in an April 2026 special session. The binding disclosure rules a Florida-first product should design to come from other states (Texas TRAIGA and SB 1188, California AB 3030 and AB 489, Utah) plus federal FTC deception law, and Colorado's AI Act was repealed and replaced (SB 26-189, effective January 1, 2027), so it is no longer a near-term driver.

### Cited Findings
**Florida (new since the regulation guide)**
- SB 482 (2026), the "Artificial Intelligence Bill of Rights," passed the Senate 35-2 on March 4, 2026, but House leadership refused to take it up — [Florida Phoenix, Mar 4 2026](https://floridaphoenix.com/2026/03/04/desantis-ai-bill-of-rights-clears-senate-but-house-wont-touch-it/). LegiScan lists it as "Died in Messages" March 13, 2026 — [LegiScan via search summary](https://legiscan.com/FL/text/S0482/2026).
- The filed text included a right "to know whether they are communicating with a human being or an artificial intelligence system, program, or chatbot" — [SB 482 filed text](https://flsenate.gov/Session/Bill/2026/482/BillText/Filed/PDF). This never became law.
- The Senate refiled an identical version for an April 2026 special session (SB 2, Session 2026D) and the House again rejected it — [Florida Phoenix, Apr 22 2026](https://floridaphoenix.com/2026/04/22/desantis-pressures-house-to-pass-ai-bill-of-rights-references-fsu-shooting/); [Independent Florida Alligator, Apr 2026](https://www.alligator.org/article/2026/04/florida-bill-targeting-ai-chatbots-and-privacy-issues-stalls-despite-desantis-backing); [SB 2D bill analysis](https://www.flsenate.gov/Session/Bill/2026D/2D/Analyses/2026s00002D.pre.rc.PDF).
- Bill content (if revived): companion-chatbot disclosures, reminders that the chatbot is AI and to take breaks, parental controls, a 45-day cure period and fines up to $50,000 — [Florida Phoenix](https://floridaphoenix.com/2026/03/04/desantis-ai-bill-of-rights-clears-senate-but-house-wont-touch-it/); [MultiState](https://www.multistate.ai/updates/vol-86-florida-ai-bill-of-rights). DeSantis's original proposal included barring "licensed" therapy or mental health counseling through AI — [Florida Governor press release, Dec 2025](https://www.flgov.com/eog/news/press/2025/governor-ron-desantis-announces-proposal-citizen-bill-rights-artificial).
- SB 344 (2026) would prohibit AI use in the practice of psychology, clinical social work, marriage and family therapy and mental health counseling; final status not found — [SB 344 filed text](https://www.flsenate.gov/Session/Bill/2026/344/BillText/Filed/PDF).
- HB 659 (2026) chatbot bill page exists; final status not confirmed — [flsenate.gov HB 659](https://flsenate.gov/Session/Bill/2026/659).
- September 2026: Attorney General Uthmeier said Florida is considering a law to penalize AI chatbot companies whose bots are allegedly used in crimes (proposal only) — [WWSB/MySuncoast, Sep 8 2026](https://www.mysuncoast.com/2026/09/08/florida-attorney-general-considers-law-penalize-ai-chatbot-companies/).
- An October 2026 healthcare-AI tracker lists no Florida entries — [AI Laws by State healthcare tracker, checked Oct 8 2026](https://www.ailawsbystate.com/tools/healthcare-ai-tracker).

**Other states (status updates)**
- Colorado: Governor Polis signed SB 26-189 on May 14, 2026, repealing and replacing SB 24-205 with a notice-based "automated decision-making technology" model; effective January 1, 2027; AG-only enforcement with a 60-day cure; a federal court had stayed SB 24-205 enforcement in April 2026 in litigation joined by DOJ and xAI — [JD Supra](https://www.jdsupra.com/legalnews/colorado-ai-law-in-flux-comprehensive-2107294/); [Eckert Seamans](https://www.eckertseamans.com/legal-updates/colorado-repeals-and-replaces-its-landmark-ai-statute-what-businesses-need-to-know); [McDermott](https://www.mcdermottlaw.com/?p=383391). Conflict: the AI Laws by State tracker still lists SB 24-205 as effective June 30, 2026 — [tracker](https://www.ailawsbystate.com/tools/healthcare-ai-tracker), which appears stale.
- Texas HB 149 (TRAIGA) effective January 1, 2026 requires health care providers to disclose AI use in care; SB 1188 effective September 1, 2025 governs AI-assisted clinical decisions (practitioner review) — [AI Laws by State](https://www.ailawsbystate.com/tools/healthcare-ai-tracker); [Fenwick (cited in guide)](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance).
- California AB 3030 (effective Jan 1, 2025): generative-AI patient clinical communications need an AI disclaimer and instructions for reaching a human clinician, exempt if a licensed provider reads and reviews the message; AB 489 bars AI wording, interface or post-nominals implying licensure — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance). SB 1120 (Ch. 879, 2024) is about health plan utilization review (licensed professional must make medical-necessity denials), so it does not reach Checkpoint — [AI Laws by State](https://www.ailawsbystate.com/tools/healthcare-ai-tracker).
- California SB 243 (companion chatbots: AI disclosure, self-harm protocol, minor protections, private right of action) reported effective January 1, 2026 — [VertiComply (secondary)](https://verticomply.com/blog/state-ai-healthcare-laws-2026); [StackCyber (secondary)](https://stackcyber.com/posts/ai-chatbot-laws).
- Utah HB 452 (effective May 7, 2025) regulates mental-health chatbots — [AI Laws by State](https://www.ailawsbystate.com/tools/healthcare-ai-tracker). Utah's AI disclosure law (SB 149 as amended by SB 226) was not re-verified this pass.
- Other 2026 enactments reported by secondary trackers: Tennessee SB 1580 (bars marketing AI as a qualified mental health professional, effective July 1, 2026), Maine LD 2082 (AI therapy limits, signed April 13, 2026), Hawaii SB 3001 (effective July 14, 2026); Arizona HB 2311 chatbot disclosure reportedly vetoed June 19, 2026 — [AI Laws by State mental health tracker](https://www.ailawsbystate.com/tools/ai-mental-health-tracker); [psychology.com register, Sep 2026](https://psychology.com/ce/guides/ai-therapy-laws-by-state/). These are vendor/tracker sources with internal inconsistencies.
- Illinois HB 1806 (AI therapy ban) remains as in the guide; not re-verified.

**Federal**
- FTC's September 2025 6(b) orders to seven AI companion companies (Alphabet, Character Technologies, Instagram, Meta, OpenAI, Snap, xAI) are a study, not enforcement; in June 2026 Chairman Ferguson said the report should come "sometime next year" and that the agency wants to understand chatbots before bringing cases — [MLex, Jun 23 2026](https://www.mlex.com/mlex/artificial-intelligence/articles/2493030); [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md). The orders did not specifically target health care — [ABA Health Law](https://www.americanbar.org/groups/health_law/news/2025/ftc-consumer-ai-chatbots-health-care/).
- The FTC finalized its DoNotPay order over "world's first robot lawyer" claims (deceptive AI capability claims) — [MLex](https://www.mlex.com/mlex/artificial-intelligence/articles/2493030). Direct analog: never market "AI doctor."
- Three federal health-AI bills are introduced only (HB 6077, SB 2997, HB 7064); no enacted federal preemption found — [AI Laws by State](https://www.ailawsbystate.com/tools/healthcare-ai-tracker). The December 2025 preemption executive order is covered in the guide.

### Inferences
- Florida demo copy cannot cite a Florida AI disclosure law; say "Florida has no AI-in-health statute yet; two AI Bill of Rights attempts failed in 2026; we build to Texas and California rules anyway." That is accurate and shows awareness.
- The common-denominator disclosure package is: (1) a persistent "you are talking with an AI, not a clinician" label, (2) a visible path to a human, (3) every clinical message reviewed and signed by a named licensed clinician, (4) no human-like credentials for the AI. Under CA AB 3030 the clinician-reviewed reply is exempt from the disclaimer, but labeling it "drafted with AI, reviewed and approved by Dr. X" is safer and doubles as TRAIGA disclosure.
- Mental-health output is the hottest legislative area (IL, NV, UT, TN, ME, FL SB 344 and the DeSantis proposal), so the existing 988 handoff with no therapeutic content is the right design.
- Because SB 482 included chatbot "break reminders" and minor protections, an 18+ gate (already implied by women 18-64) is aligned with where Florida may go.

### Gaps
- Final status of Florida SB 344, HB 659 and any later 2026 special session; whether the 2027 session will refile the AI Bill of Rights.
- Exact disclosure wording in TRAIGA, Utah SB 149/226, and California SB 243 was not pulled from primary text.
- Effective-date conflicts for CA AB 489 and IL HB 1806 (listed in the guide) remain unresolved.

## Q2. FDA: does "could be a bladder infection (UTI)" or a body-map triage make Checkpoint a device?

### Takeaway
The January 6, 2026 revised CDS and general wellness guidances loosened rules for HCP-facing tools and low-risk wellness products, but commentators say they are largely silent on patient-facing symptom checkers, and triage that pushes urgency decisions remains in device territory. Naming a specific disease to the patient moves the patient-facing layer further from "general wellness" and toward "patient-facing CDS," so the safest posture is that the label is generated by fixed rules, framed as "the clinician will check for," and that the clinician, not software, gives the diagnosis.

### Cited Findings
- FDA published revised final general wellness and CDS guidances on January 6, 2026, superseding the 2019 and 2022 versions — [Faegre Drinker](https://faegredrinker.com/en/insights/publications/2026/1/key-updates-in-fdas-2026-general-wellness-and-clinical-decision-support-software-guidance); [King & Spalding](https://www.kslaw.com/insights/articles/fda-updates-general-wellness-and-clinical-decision-support-guidance-documents); [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software).
- The CDS guidance remains largely silent on consumer-facing AI tools such as symptom checkers, health chatbots and patient decision support — [Innolitics](https://innolitics.com/articles/clinical-decision-support-and-general-wellness-guidance-updates/) (secondary, via search summary).
- Time-critical triage is excluded from the CDS carve-out: a chronic low back pain care-pathway example may qualify, but emergent/trauma back pain triage would not; tools that push "send to ED now" based on conversational signals are in time-critical territory — [Innolitics](https://innolitics.com/articles/clinical-decision-support-and-general-wellness-guidance-updates/); [KevinMD](https://kevinmd.com/2026/01/fda-loosens-ai-oversight-what-clinicians-need-to-know-about-the-2026-guidance.html).
- Existing digital health policies "continue to apply to consumer or patient-facing CDS" — [DLA Piper (cited in guide)](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points).
- The general wellness guidance covers only low-risk products; commentary says it now covers patient-facing software supporting symptom monitoring, which is distinct from diagnostic triage — [Honigman](https://www.honigman.com/alert-3236); [Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2026/01/fda-adapts-with-the-times-on-digital-health-updated-guidances-on-general-wellness-products).
- FDA judges intended use including marketing statements, and disclaimers may not change device status — [Cooley (cited in guide)](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny).

### Inferences
- "Could be a bladder infection (UTI), only a clinician can confirm it" is a disease-specific statement to a patient. It is defensible as framing that explains why a UTI clinician is being offered (routing, not diagnosis), but it is the single riskiest line in the demo from an FDA lens. Safer wording, in order of preference:
  1. "Your answers fit what our UTI clinicians review. A Florida-licensed clinician will decide if it is a bladder infection and what to do."
  2. "These symptoms are often checked for a bladder infection (UTI). Only a clinician can tell you if that is what this is."
  Avoid "likely," "probably," percentages, or confidence scores. Show the source as "from Checkpoint's fixed screening rules" so judges see it is not model output.
- Red-flag routing to 911/ER is a time-critical triage function. Keep it static, conservative (any red flag routes out), and described as "safety screen: when in doubt, we send you to in-person care," not as a diagnosis. Do not rank urgency levels for the patient beyond "emergency now / in person / clinician review."
- A body map that leads to condition suggestions for many body regions looks like a general symptom checker (device-adjacent, and out of the UTI wedge). A body map that only collects location (e.g., "where is the pain: lower belly / side or back / other") and feeds the fixed rules is just an input widget. Flank/back taps must map to the existing red-flag rule (pyelonephritis concern).
- Patient-facing "clinician will decide" plus the HCP-facing Claude draft (independently reviewable, shows its basis) is the strongest split under the 2026 guidance.

### Gaps
- The FDA guidance text itself was not read this pass; examples for patient-facing triage are from commentary.
- No 2025-2026 FDA enforcement letter against a consumer symptom checker was found (none searched in depth).

## Q3. Telehealth prescribing for UTI in Florida: text-only visits, video visits, e-prescribing

### Takeaway
New finding: the old Board of Medicine rule saying prescribing based "solely on an electronic medical questionnaire" falls below the standard of care (64B8-9.0141) was repealed effective October 14, 2019, so the governing law is now 456.47, which has not been amended since 2023. Asynchronous care is expressly allowed and no physical exam is required if the evaluation is sufficient to diagnose and treat, but the in-person standard of care applies, "e-mail messages" are excluded, and the clinician must document in the medical record. Florida mandates electronic prescribing (456.42(3)) for non-exempt prescribers.

### Cited Findings
- 456.47(1)(a): telehealth is "the use of synchronous or asynchronous telecommunications technology"; "The term does not include e-mail messages or facsimile transmissions." Text messages are not mentioned — [Fla. Stat. 456.47 (2026)](https://flsenate.gov/Laws/Statutes/2026/456.47).
- 456.47(2)(b): a provider who conducts an evaluation sufficient to diagnose and treat "is not required to research a patient's medical history or conduct a physical examination" — [Fla. Stat. 456.47 (2026)](https://flsenate.gov/Laws/Statutes/2026/456.47).
- 456.47(3): provider "shall document in the patient's medical record the health care services rendered using telehealth"; records are confidential under 395.3025(4) and 456.057 — [Fla. Stat. 456.47 (2026)](https://flsenate.gov/Laws/Statutes/2026/456.47).
- History line: s. 1, ch. 2019-137; s. 60, ch. 2020-156; s. 1, ch. 2022-26; s. 7, ch. 2023-21; s. 1, ch. 2023-63; s. 1, ch. 2023-132; no 2025 or 2026 amendments shown — [Fla. Stat. 456.47 (2026)](https://flsenate.gov/Laws/Statutes/2026/456.47).
- Rule 64B8-9.0141 (Standards for Telemedicine Practice), including the "solely on an electronic medical questionnaire" language, was repealed effective 10/14/2019 (history: New 3-12-14 ... Repealed 10-14-19) — [Cornell LII](https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-64B8-9-0141); questionnaire language described in [Foley 2014](https://www.foley.com/insights/publications/2014/05/florida-board-of-medicine-issues-telemedicine-regu/) and [Cohen Healthcare Law](https://cohenhealthcarelaw.com/?p=3747).
- E-prescribing: HB 831 (2019) created the mandate effective January 1, 2020; 456.42(3) requires prescribers to transmit prescriptions electronically upon license renewal or by July 1, 2021, whichever is earlier, unless an exception applies — [Florida Board of Pharmacy](https://floridaspharmacy.gov/electronic-prescribing-requirements/); [Florida Board of Osteopathic Medicine](https://floridasosteopathicmedicine.gov/electronic-prescribing-requirements-2/). 2025 bills HB 1297 and SB 1568 proposed aligning exceptions with federal ones; outcome not found — [HB 1297 analysis](https://flsenate.gov/Session/Bill/2025/1297/Analyses/h1297a.HPP.PDF); [SB 1568 analysis](https://flsenate.gov/Session/Bill/2025/1568/Analyses/2025s01568.hp.PDF).
- Controlled substances schedule III-V allowed via telehealth in Florida, schedule II narrowly; abortion drugs barred — [Akerman](https://www.akerman.com/en/perspectives/hrx-harmonizing-federal-and-florida-laws-on-prescribing-controlled-substances-through-telehealth.html). (UTI protocol drug is not controlled.)

### Inferences
- The "text visit" should be called an "online visit" or "secure written visit" and run inside the platform (structured intake plus secure messaging in the clinician console), not via email or SMS, to stay clearly inside 456.47's definition. Notifications by SMS/email should carry no clinical content, just "you have a message in Checkpoint."
- Standard of care for an async UTI visit is the in-person standard. The structured intake should mirror what an in-person clinician asks for uncomplicated cystitis (dysuria, frequency, urgency; no fever, flank pain, vaginal discharge, pregnancy; recurrence; allergies; meds). The clinician must be able to escalate to video or decline ("needs an exam") at any point. Show those buttons.
- Video "now" visits: 456.47 imposes no extra requirement for synchronous visits beyond licensure, standard of care and documentation; the operational requirements are identity check, patient location confirmation (she is in Florida at the time of the visit, since telehealth occurs where the patient is), consent, a fallback if the video drops, and a HIPAA-capable video vendor under a BAA. "Now" implies on-demand supply; do not promise wait times the engine cannot back.
- E-prescribing: show "sent electronically to [PHARMACY] (simulated)" in the demo; a real launch needs a certified e-Rx vendor (e.g., Surescripts-connected) and the clinician's own prescriber credentials.

### Gaps
- No Florida Board of Medicine rule or declaratory statement after 2019 on async-only prescribing was found; whether the Board would view a structured questionnaire plus clinician review as "sufficient to diagnose" is a counsel question.
- Florida patient identity verification and informed consent rules for telehealth were not located (also flagged in the guide).
- Whether HB 1297/SB 1568 (2025) passed.

## Q4. Privacy: HBNR, Florida law, out-of-state patients, photos, voice recording

### Takeaway
The existing guide covers HBNR, FIPA, Florida Digital Bill of Rights and Washington MHMDA. The new feature-specific risks are: voice capture (Florida is an all-party consent state for intercepting oral communications), photo uploads (genital/urinary photos are high-sensitivity, CSAM-adjacent if a minor uploads, and expand breach impact), and video recording. None of these is needed for a UTI visit, so the safest design is "no photos, no recordings, no voice storage."

### Cited Findings
- HBNR (2024 amendments) treats unauthorized disclosure as a breach for vendors of personal health records; 60-day notice — [16 CFR 318.2](https://www.law.cornell.edu/cfr/text/16/318.2); [16 CFR 318.4](https://www.law.cornell.edu/cfr/text/16/318.4) (from the guide).
- FIPA counts medical history and diagnosis as personal information, 30-day notice; Florida Digital Bill of Rights applies only to very large companies — [Fla. Stat. 501.171](https://www.flsenate.gov/Laws/Statutes/2024/501.171); [DWT](https://www.dwt.com/gcp/state-privacy-laws-tracker/broad-state-privacy-law-tracker/florida) (from the guide).
- SB 482 (failed) would have restricted sale/disclosure of personal data by AI companies with FDUTPA private enforcement — [MultiState](https://www.multistate.ai/updates/vol-86-florida-ai-bill-of-rights). Not law, but signals direction.
- Florida Security of Communications Act, ch. 934: intercepting oral or electronic communications requires consent of all parties — [Fla. Stat. 934.03](http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0900-0999/0934/Sections/0934.03.html) (not fetched this pass; the guide lists ch. 934 as unverified).
- Washington MHMDA: opt-in consent to collect, separate consent to share, private right of action — [Fisher Phillips](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html) (from the guide).
- California SB 690 leaves CIPA 631/632 wiretap theories for chat transcripts intact — [K&L Gates](https://www.klgates.com/thought-leadership/California-Narrows-CIPA-Litigation-SB-690-Ends-Pen-Register-and-Trap-and-Trace-Claims-10-8-2026) (from the guide).
- Florida physician records retention: at least five years — [64B8-10.002](https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-64B8-10-002) (from the guide).

### Inferences
- Voice: if the patient speaks to Claude by voice, any recording or third-party transcription of a conversation involving the patient and a clinician (or recording of a video visit) needs explicit all-party consent. Demo-safe pattern: browser speech-to-text, nothing stored, a visible mic indicator, and "we do not record your voice." Never record video visits by default; if recorded, both parties consent on screen.
- Voice also defeats the secure-fields design: spoken name/DOB would go to the model. Keep personal fields as typed secure fields only, and block voice input on them.
- Photos: a UTI does not need a photo, so do not add upload. If added for other conditions later, require a separate consent, strip EXIF/GPS, never send to the model, block intimate-area photos, and add an age gate (minor image risk).
- Out-of-state patients: geofence to Florida (patient attests to being in Florida, IP check as a soft signal). A Washington resident visiting Florida is still a Washington "consumer" under MHMDA, so the unbundled opt-in consent pattern is the safe default for all.
- Delete-my-data must say what cannot be deleted: the clinician's medical record (5 years, 64B8-10.002).

### Gaps
- 934.03 text and any case law on AI voice transcription were not fetched.
- HBNR penalty amount for 2026 not verified.

## Q5. Accessibility and language access (ADA, Section 1557, WCAG)

### Takeaway
Section 1557 language access duties attach to covered entities (federal financial assistance, federally facilitated marketplace, HHS programs); a cash-pay Checkpoint and practice likely are not covered, and 2025 executive action (EO 14224) plus HHS changes softened notice/tagline rules. Still, Spanish and Haitian Creole access is a cheap, visible trust feature in Miami, and human review of machine-translated clinical content is the defensible standard.

### Cited Findings
- EO 14224 (March 2025) declared English the official language and revoked EO 13166 — [Ballard Spahr via JD Supra](https://www.jdsupra.com/legalnews/section-1557-deadlines-approach-but-1138384); [KFF](https://kff.org/racial-equity-and-health-policy/designating-english-as-the-official-language-of-the-united-states-could-impact-millions-with-limited-english-proficiency/).
- HHS reportedly eliminated requirements that nondiscrimination notices include taglines in the top 15 languages; advocates say Section 1557 language access duties remain law because an EO cannot amend regulations — [LanguageLine](https://www.languageline.com/blog/important-language-protections-still-in-place-despite-rollback-on-notices); [National Health Law Program](https://healthlaw.org/language-access-is-mission-critical-and-still-the-law/).
- DOJ narrowed Title VI language-access enforcement (no disparate impact theories) — [JD Supra](https://www.jdsupra.com/legalnews/section-1557-deadlines-approach-but-1138384).
- 45 CFR 92.201(c)(3): machine translation of critical/technical text must be reviewed by a qualified human translator when 1557 applies — [eCFR](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201) (from the guide).

### Inferences
- Demo feature: language toggle (English / Espanol / Kreyol) on screening cards and consent, with clinician replies in the patient's language flagged "translation reviewed by clinician" (bilingual clinician matching is already in the engine via the language field).
- WCAG 2.1 AA basics judges notice: keyboard-operable question cards, visible focus, color not the only red-flag signal, readable font sizes, screen-reader labels on secure fields. ADA Title III application to websites is unsettled in some circuits; not researched this pass.

### Gaps
- The current (2026) state of the Section 1557 rule and the HHS notice was not confirmed from the Federal Register.
- ADA web accessibility case law in the Eleventh Circuit not researched.

## Q6. Prioritized compliance features to build and show (with the law each maps to and a one-line demo moment)

### Takeaway
Most of the high-value trust features exist already (rules decide, secure fields, masked view, audit log, red flags). The best adds for a 90-second demo are the ones a judge can see in one glance: an AI disclosure strip, a clinician license card with a DOH lookup link, an approve/edit/escalate bar with "drafted with AI, approved by Dr. X," unbundled consent receipts, Florida location check, and a delete/export button. The label wording change for "could be a UTI" is the single most important copy fix.

### Cited Findings
(Each feature's legal hook is cited; the features themselves are design inferences.)
1. **Persistent AI disclosure + human path.** Banner: "You are chatting with an AI assistant. It cannot diagnose. A Florida-licensed clinician makes every medical decision." Maps to TX TRAIGA disclosure and CA AB 3030 human-contact instructions — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance); failed FL SB 482 "right to know" — [SB 482](https://flsenate.gov/Session/Bill/2026/482/BillText/Filed/PDF). Demo moment: banner visible from the first message.
2. **No implied licensure for the AI.** AI shown as "Claude (AI assistant)," never "Dr." or a white coat; clinician names carry credentials. CA AB 489 — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance); Pennsylvania v. Character Technologies and FTC DoNotPay "robot lawyer" — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny); [MLex](https://www.mlex.com/mlex/artificial-intelligence/articles/2493030). Demo moment: zoom on the label row.
3. **Clinician license card with verification link.** "Dr. Marquez, MD, Florida license ME XXXXX (synthetic) — verify at Florida DOH MQA license lookup." 456.47 licensure where patient is — [Fla. Stat. 456.47](https://flsenate.gov/Laws/Statutes/2026/456.47); unlicensed practice felony 456.065 (guide). Demo moment: click "Verify license" opens the DOH lookup (mqa-internet.doh.state.fl.us) with a note that the demo license is synthetic.
4. **Florida location gate.** "Are you in Florida right now?" with refusal if no. 456.47 (care occurs where the patient is). Demo moment: answering "No, I'm in Georgia" ends with "we can't connect you to a Florida clinician."
5. **Signed clinician reply: "Drafted with AI, reviewed and approved by Dr. Marquez."** With Approve / Edit / Ask for more info / Switch to video / Refer in person. TX SB 1188 review; CA AB 3030 exemption for provider-reviewed messages — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance); 456.47 standard of care and documentation — [Fla. Stat. 456.47](https://flsenate.gov/Laws/Statutes/2026/456.47). Demo moment: clinician edits one sentence; audit log records "edited by clinician."
6. **Rules-sourced condition label with safe wording.** "Your answers fit what our UTI clinicians review. Only a clinician can confirm a bladder infection." Tag: "from fixed screening rules, not AI." FDA intended use / patient-facing CDS — [Innolitics](https://innolitics.com/articles/clinical-decision-support-and-general-wellness-guidance-updates/); [DLA Piper](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points). Demo moment: hover shows "rule U-3: dysuria + frequency, no red flags."
7. **Static red-flag screen with 911/988.** Already built; make the copy static, not model-generated, and show "no data collected" after a red flag. Standard of care plus FDA time-critical triage caution — [Innolitics](https://innolitics.com/articles/clinical-decision-support-and-general-wellness-guidance-updates/). Demo moment: "fever and back pain" ends at in-person care in two seconds.
8. **Unbundled consent with receipt.** Toggles: share with practice (required), de-identified quality use (off), marketing (off); telehealth consent states async/no exam/not for emergencies; receipt with timestamp and version hash. MHMDA opt-in — [Fisher Phillips](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html); HBNR — [16 CFR 318.2](https://www.law.cornell.edu/cfr/text/16/318.2). Demo moment: "Consent receipt #a3f9" chip in the console.
9. **"What Claude saw" masked view + audit log.** Already built; add a one-line "0 personal fields sent to the AI" counter. HBNR unauthorized disclosure theory and FTC GoodRx/BetterHelp line (guide). Demo moment: side-by-side real intake vs model view.
10. **Delete / export my data.** "Delete my Checkpoint data" with note "Your clinician's medical record is kept 5 years as Florida law requires." 64B8-10.002 — [Cornell LII](https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-64B8-10-002). Demo moment: button plus confirmation text.
11. **No trackers badge.** "No ad pixels on this page." FTC Hims & Hers / GoodRx enforcement (guide). Demo moment: footer line.
12. **Model-failure fallback.** If the API fails or the draft fails validation, show the protocol template and "AI unavailable, clinician writing manually"; screening continues because rules are local. Automation bias / human oversight theme in 2026 CDS guidance — [KevinMD](https://kevinmd.com/2026/01/fda-loosens-ai-oversight-what-clinicians-need-to-know-about-the-2026-guidance.html). Demo moment: toggle "simulate AI outage."
13. **Spanish / Haitian Creole toggle.** Section 1557 human-review standard if applicable — [eCFR 92.201](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201). Demo moment: switch screener to Spanish for Maria.
14. **E-prescription to pharmacy (simulated).** 456.42(3) e-prescribing mandate — [Florida Board of Pharmacy](https://floridaspharmacy.gov/electronic-prescribing-requirements/). Demo moment: "Sent electronically to [PHARMACY] (simulated)."
15. **Practice branding / independence notice.** "Care provided by [Practice] PA, an independent Florida medical practice. Checkpoint provides technology." Ostensible agency and CPOM (guide). Demo moment: footer of the clinician reply.

### Inferences
- Priority for tomorrow (cost vs judge impact): 6 (wording fix), 1, 3, 5, 4, 8, 12, 10. Items 2, 7, 9 are mostly done and only need to be pointed at in the demo.
- Judge talking point: "Florida has no AI-in-healthcare statute, and two attempts failed this year. We built to the strictest live rules anyway: Texas disclosure, California no-AI-licensure, physician review on every reply."

### Gaps
- No source tested whether judges or regulators view a DOH lookup link as sufficient license disclosure; it is a design choice.

## Q7. Risk check of planned new features

### Takeaway
Ranked by new legal risk: voice (high: Florida all-party consent, personal data leaking to the model) > photo upload (high and unnecessary for UTI) > AI saying "likely" condition (medium, fixable with wording) > video "now" visits (medium-low, mainly operational: vendor BAA, identity, location, no recording) > body map (low if it is only a location input feeding fixed rules; medium-high if it suggests conditions).

### Cited Findings
- Body map: patient-facing symptom checkers are not clearly covered by the 2026 CDS carve-outs; time-critical triage stays under oversight — [Innolitics](https://innolitics.com/articles/clinical-decision-support-and-general-wellness-guidance-updates/); [Faegre Drinker](https://faegredrinker.com/en/insights/publications/2026/1/key-updates-in-fdas-2026-general-wellness-and-clinical-decision-support-software-guidance).
- "Likely" condition: intended use including statements drives device status; disclaimers may not cure — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny). AI must not imply clinician status — CA AB 489 via [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance).
- Video now: 456.47 permits synchronous care with the in-person standard and documentation duty — [Fla. Stat. 456.47](https://flsenate.gov/Laws/Statutes/2026/456.47).
- Photo upload: increases sensitivity of data covered by HBNR and FIPA breach rules — [16 CFR 318.2](https://www.law.cornell.edu/cfr/text/16/318.2); [Fla. Stat. 501.171](https://www.flsenate.gov/Laws/Statutes/2024/501.171).
- Voice: Florida ch. 934 all-party consent — [Fla. Stat. 934.03](http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0900-0999/0934/Sections/0934.03.html) (unverified this pass); CIPA 632 survives SB 690 — [K&L Gates](https://www.klgates.com/thought-leadership/California-Narrows-CIPA-Litigation-SB-690-Ends-Pen-Register-and-Trap-and-Trace-Claims-10-8-2026).

### Inferences
- **Body map**: build it as a three-zone input (lower belly / side or back / elsewhere) that only feeds engine rules; side/back routes to in-person (pyelonephritis red flag). Do not show disease names per region. Low risk, good visual.
- **"Likely" UTI**: drop "likely." Use the Q6 item 6 wording. Keep the label engine-sourced and show the rule. Medium risk only if the model paraphrases it into a diagnosis; add a prompt rule and a smoke-test check that Claude never says "you have" or "likely."
- **Video now**: fine to show with a "simulated" label; in copy say "next available," require "I am in Florida" confirmation at join, "this visit is not recorded," and BAA-covered video vendor (Zoom for Healthcare type) in the roadmap. Do not promise minute-level wait times.
- **Photo upload**: skip for the UTI wedge. If a judge asks: "UTI does not need photos; adding images raises privacy and minor-image risks without clinical value."
- **Voice**: skip for the demo, or do on-device speech-to-text only for symptom answers with no storage, a mic indicator, and secure fields kept typed-only. Never record clinician calls without on-screen consent from both parties.

### Gaps
- No case law found on AI voice transcription under 934.03.
- No FDA precedent found specifically on body-map symptom inputs.
