# US Health Privacy and Data Law for Checkpoint (MCP connector, physician async review), current to Nov 7, 2026

Method note: about 19 tool calls. Items fetched and read this session are cited inline. Items I know from statute/training but did NOT re-verify this session are placed under Gaps with the primary-source URL to check. Not legal advice; counsel must confirm.

## 1. HIPAA: covered entity vs business associate vs neither; BAAs; de-identification; limited data sets; authorization

### Takeaway
Checkpoint's HIPAA status turns on who it works for. If it acts for the physician practice (a covered entity if it bills electronically) in creating, handling and returning case packets, it is likely a business associate and needs a BAA. Consumer-originated symptom text, before it reaches the practice, is generally outside HIPAA. De-identification under 45 CFR 164.514 is the cleanest route for evaluation and model-improvement data.

### Cited Findings
- Safe Harbor (164.514(b)(2)) requires removal of 18 identifier categories (of the individual and of relatives, employers, household members) AND no actual knowledge that remaining info could identify someone. Categories include names, geography smaller than a state (3-digit ZIP exception), all date elements except year (ages over 89 aggregated), phone/fax, email, SSN, MRN/plan numbers, account/license numbers, vehicle and device identifiers, URLs and IPs, biometrics, full-face images, and any other unique identifying number, characteristic or code. Source: [eCFR 45 CFR 164.514](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514)
- Expert Determination (164.514(b)(1)): a qualified person applying accepted statistical and scientific methods determines re-identification risk is "very small" and documents methods and results. Source: [eCFR 164.514](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514)
- Re-identification codes (164.514(c)): a covered entity may assign a code to allow re-identification only if (1) the code is not derived from or related to information about the individual and cannot be translated to identify them, and (2) the entity does not use or disclose the code for other purposes or disclose the mechanism. Source: [eCFR 164.514](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514)
- Limited data set (164.514(e)): PHI minus 16 direct identifiers; may retain city/town, state, ZIP and dates; usable only for research, public health or health care operations; requires a data use agreement (limits uses, safeguards, breach reporting, binding agents, no re-identification or contacting individuals). Covered entity must cure or end disclosure on known pattern of material breach and report to HHS if uncured. Source: [eCFR 164.514](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514)
- HIPAA Security Rule overhaul status: HHS OCR NPRM published Jan 6, 2025 (90 Fed. Reg. 898); as of July 24, 2026 the final rule was not final, with the Unified Agenda pointing to about July 2027. Source: [Physicians Practice, July 24, 2026](https://www.physicianspractice.com/view/hipaa-security-rule-postponed-privacy-rule-imminent). Other vendor blogs in search results describe a "2026 final rule" as if changes are in force; treat those as unreliable and conflicting with the Physicians Practice report (e.g., [MyABT](https://www.myabt.com/blog/hipaa-security-rule-2026-final-changes?hsLang=en) title says "Final Rule", not verified).
- HIPAA Privacy Rule "Coordinated Care and Individual Engagement" rule: final rule anticipated Aug 2026 per the same article (goals: access rights, care coordination sharing, caregiver involvement). Whether it was actually finalized after August is not confirmed in my sources. Source: [Physicians Practice](https://www.physicianspractice.com/view/hipaa-security-rule-postponed-privacy-rule-imminent)

### Inferences
- Likely structure: Checkpoint is a BA of the physician practice for the review flow (it creates, maintains and transmits PHI on the practice's behalf) once the practice receives the packet. Pre-packet consumer data held by Checkpoint as the consumer's agent is not PHI, creating a "two regimes" boundary the architecture should map explicitly (consumer-regulated data up to the consent/transmission point; PHI after).
- A pseudonymized packet sent to a physician is still PHI in the practice's hands if the practice can link it to the individual (the practice holds the identity or code key). The 164.514(c) code safe-harbor carve-out helps only for data that is otherwise de-identified, and the covered entity (not an unrelated vendor) is the party that holds the key.
- Secondary use (eval, training) paths: (a) de-identify via Safe Harbor or Expert Determination (BA may de-identify only if the BAA permits it); (b) limited data set + DUA for research/operations; (c) written HIPAA authorization (164.508) for anything else, which cannot be bundled with other consents. Free-text symptom narratives make Safe Harbor hard in practice (actual-knowledge prong, embedded dates, names, places), so Expert Determination is the more defensible route for narrative text.
- Selling to health systems/insurers later: insurers as plan sponsors raise "sale of PHI" and marketing limits; keep consumer-originated data and PHI logically separate.

### Gaps
- HIPAA CE/BA definitions (45 CFR 160.103), BAA content (164.504(e), 164.314), minimum necessary (164.502(b)), authorization elements (164.508), sale of PHI (164.502(a)(5)(ii)), and OCR's "online tracking technologies" guidance: I did not fetch these. Verify at eCFR (https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-160 and part-164) and HHS OCR. Note the N.D. Tex. 2024 ruling (AHA v. Becerra) vacating part of OCR's tracking-technology bulletin: not verified here.
- Whether the Privacy Rule final rule issued after Aug 2026: not found.

## 2. Anthropic: consumer chat vs BAA coverage, HIPAA-ready offerings, ZDR, exclusions, and MCP implications

### Takeaway
A BAA covers only specific commercial Anthropic products when the customer has activated it; ordinary consumer Claude (Free/Pro/Max) and Team cannot be HIPAA-enabled, and MCP connectors are explicitly "available but not covered." So symptom data typed into a consumer Claude chat is not under any BAA with Anthropic, and Checkpoint's connector cannot retroactively cover it.

### Cited Findings
- HIPAA-ready Claude Enterprise: Enterprise plan only; only the Primary Owner can accept the BAA and enable HIPAA; enabling is a one-way decision; Free, Pro and Max individual plans cannot enable HIPAA; Team plans also cannot. Rule: "Don't use PHI with a product that isn't covered." A BAA signed before Dec 2, 2025 covers API only and does not extend to HIPAA-ready Enterprise. Source: [support.claude.com HIPAA-ready Claude Enterprise](https://support.claude.com/en/articles/13296973-hipaa-ready-claude-enterprise-offering)
- Covered under BAA (commercial): Claude Enterprise chat, Projects and Artifacts (in-chat only), file creation and code execution (no network access), Voice, Web Search, Research; Cowork and Claude Code (terminal/Desktop) with HIPAA configuration; Claude Code with Console API key only with ZDR; first-party Messages API (and Token Counting, Models, Org Management, Compliance); Claude in Microsoft Foundry with HIPAA configuration. Source: [support.claude.com BAA for commercial customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers)
- Excluded/not covered: Claude Console, Cowork in cloud, Dispatch, Claude Code cloud sessions and mobile, Code Review, Computer Use (in some contexts), Remote Control, session sharing; beta features (Claude in Office, Design, Slides, Docs); third-party flows: Skills, MCPs/Connectors, Enterprise Search, Claude in Chrome, external MCP are "available but not covered"; API features Batch, Files, Skills API, Code Execution, Web Fetch. Source: [support.claude.com BAA for commercial customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers)
- ZDR interplay: "Covered Models" require 30-day data retention and are unavailable with ZDR enabled unless Anthropic expressly authorizes; Claude Code can't use Covered Models while ZDR is on for Claude Code, unless authorized. Certain Messages API features are covered only under BAA versions accepted after 4/1/26; certain Enterprise features after 12/2/25. Source: [support.claude.com BAA for commercial customers](https://support.claude.com/en/articles/8114513-business-associate-agreements-baa-for-commercial-customers)
- Consumer health integrations (Jan 2026): US users can opt in to beta connectors for lab data and Apple Health / Android Health Connect on certain subscription tiers; Anthropic says health data accessed this way is not used for model training and users can revoke access. The article does not say HIPAA applies to those consumer integrations. Source: [Help Net Security, Jan 12, 2026](https://www.helpnetsecurity.com/2026/01/12/claude-for-healthcare-data-security-oversight/)

### Inferences
- Architecture consequence: the consumer's chat (Free/Pro/Max) sits with Anthropic under consumer terms and privacy policy; Checkpoint is a third-party connector. Checkpoint should treat everything it receives via MCP tool calls as consumer health data under FTC/state laws, not PHI, until handed to the practice.
- Checkpoint cannot rely on Anthropic's BAA for its own data. If Checkpoint itself uses the Claude API for redaction/summarization of PHI (post-handoff), it needs its own Anthropic BAA, API under the BAA scope, and must avoid excluded features (Batch, Files, Web Fetch, etc.) and be aware of the ZDR/covered-model conflict.
- Disclose in the consent screen that the chat provider (Anthropic) is a separate party and that the conversation text up to that point is governed by their terms.
- Minimizing what the model transmits to the tool (the MCP tool schema asking only for the needed fields) reduces exposure of data that the chat provider already holds.

### Gaps
- Anthropic consumer privacy policy details (training opt-out, retention for consumer chats, privacy.claude.com consumer health data/Washington MHMDA notice): not fetched; check https://privacy.claude.com and https://www.anthropic.com/legal/privacy.
- The Anthropic Trust Center Implementation Guide (authoritative on covered features) requires request access; not reviewed.
- platform.claude.com ZDR documentation: not fetched.
- The two Anthropic pages carry no explicit update dates ("Updated over a week ago"); feature lists change frequently.

## 3. FTC: Health Breach Notification Rule, Section 5 enforcement, ad trackers

### Takeaway
For consumer-side data, the FTC is the primary federal regulator. The 2024-amended HBNR treats unauthorized disclosures (not only hacks) as breaches for non-HIPAA health apps, and the FTC's July 29, 2026 suit against Hims & Hers (with California and Utah) shows pixels, customer-list uploads and privacy-policy statements remain live enforcement theories.

### Cited Findings
- HBNR was amended by a final rule published May 30, 2024 (89 Fed. Reg.) expanding scope to health apps and similar technologies. Source: [Federal Register 2024-10855](https://www.federalregister.gov/documents/2024/05/30/2024-10855/health-breach-notification-rule) (page fetch blocked by robots; existence/date confirmed via search listing only); law-firm summaries: [MoFo](https://www.mofo.com/resources/insights/240514-ftc-issues-final-rule-to-expand), [Debevoise](https://www.debevoise.com/insights/publications/2024/05/federal-trade-commission-finalizes-updates). Detailed rule contents (breach includes unauthorized disclosure, 60-day notice, FTC notice for 500+) were not read this session; see Gaps.
- FTC v. Hims & Hers Health, Inc.: complaint filed July 29, 2026 in N.D. Cal., joined by California and Utah; FTC vote 2-0; nine counts: FTC Act Section 5 (deceptive privacy representations, failure to disclose health data sharing, deceptive intake/charging practices), ROSCA (3 counts), California FAL/UCL/ARL and constitutional privacy claim, Utah Consumer Sales Practices Act. Alleged sharing: customer-list uploads to ad platforms and pixels/API business tools sending site activity to ad platforms. Relief sought: permanent injunction, monetary relief, no FTC civil penalties; California civil penalties up to $2,500 per violation. Hims denies. Source: [McDermott Will & Schulte alert](https://www.mcdermottlaw.com/insights/ftc-two-states-take-aim-at-hims-hers-subscription-and-health-data-practices/). The McDermott piece does not mention the HBNR and does not name Meta or Snap, while news headlines say Meta and Snap ([Action News Jax](https://www.actionnewsjax.com/news/trending/ftc-sues-hims-hers-over-alleged-health-data-sharing-with-meta-snap/XED5OVHO5BHB3A2ZMUIDYVXOEM/)); minor source difference, not resolved.
- Earlier cases (GoodRx, BetterHelp, Premom, Cerebral) appear in search results ([Proskauer](https://privacylaw.proskauer.com/2023/03/articles/data-privacy-laws/ftcs-one-two-punch-on-data-tracking-and-health-privacy/), [WSGR on Premom](https://wsgr.com/en/insights/ftc-announces-proposed-settlement-with-premom-fertility-tracking-app-for-privacy-practices.html), [Promise Legal overview](https://blog.promise.legal/ftc-health-breach-notification-rule-health-apps/)) but I did not open them; settlement amounts are unverified.

### Inferences
- Checkpoint's consumer-facing layer is plausibly a "vendor of personal health records"/"PHR related entity"-type actor under the HBNR if it is not HIPAA-regulated for that data; the Hims complaint pattern (pixels, list uploads, inconsistent privacy statements) is the template risk. Design: no third-party ad/analytics pixels on consent or intake pages or in tool UI; no customer-list uploads to ad platforms; make privacy statements match actual flows.

### Gaps
- Exact HBNR text (definitions, 60-day clock, 500+ rule, penalties per violation ~$53k adjusted annually): verify at https://www.ecfr.gov/current/title-45... (16 CFR Part 318) and ftc.gov.
- Settlement details for GoodRx ($1.5M civil penalty, 2023), BetterHelp ($7.8M, 2023), Premom (2023), Cerebral (2024): from memory only; confirm on ftc.gov.
- Whether any 2025/2026 FTC HBNR amendments or rollbacks occurred: not found.

## 4. State consumer health data laws

### Takeaway
Washington MHMDA is the highest-risk statute (opt-in consent, separate consent for sharing, private right of action via the CPA). Nevada and Connecticut are similar in consent structure but AG-enforced only. New York's HIPA was vetoed.

### Cited Findings
- Washington MHMDA: effective Mar 31, 2024 (small businesses June 30, 2024 per general knowledge, unverified); applies to "regulated entities" not just HIPAA entities; affirmative opt-in consent to collect; sale requires signed written authorization that expires after one year; revocable; access within 45 days; deletion within 30 days; private right of action plus AG. Source: [Fisher Phillips, Aug 2023](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html)
- First MHMDA class action filed against Amazon, Feb 2025 (W.D. Wash.), on location/SDK data: [WilmerHale](https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20250220-first-lawsuit-filed-under-washingtons-my-health-my-data-act), [Washington State Standard](https://washingtonstatestandard.com/2025/02/21/lawsuit-against-amazon-provides-first-test-of-was-health-data-privacy-law/). Outcome of that case not found.
- Nevada SB 370: effective Mar 31, 2024; modeled on Washington with broader exemptions (HIPAA and GLBA entities); separate consent for collection and for sharing; written authorization for sales; no private right of action; AG enforcement as deceptive trade practice. Source: [Fisher Phillips](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html)
- Connecticut (CTDPA as amended): opt-in consent for collecting, processing, selling consumer health data; no private right of action. Source: [Fisher Phillips](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html)
- New York Health Information Privacy Act was vetoed by Gov. Hochul (reported Dec 2025/Jan 2026); Democrats said they would push a new bill. Sources: [Healthcare Brew, Jan 12, 2026](https://www.healthcare-brew.com/stories/2026/01/12/new-york-governor-vetoes-health-data-privacy-bill), [Bloomberg Government](https://news.bgov.com/bloomberg-government-news/ny-democrats-push-new-health-data-privacy-bill-after-hochul-veto). Whether a replacement passed in 2026: not found.

### Inferences
- Design to the strictest standard (Washington): separate consent for collection vs sharing, and a separate signed authorization if any data is "sold" (broadly defined; sharing de-identified data for value should be analyzed). Only MHMDA clearly allows consumer lawsuits among the states covered by my sources.

### Gaps
- California CMIA (Civ. Code 56 et seq., private right with statutory damages $1,000 nominal), CCPA/CPRA sensitive PI (opt-out/limit right, no general private right except breaches), Texas TDPSA (sensitive data consent), Florida Digital Bill of Rights (threshold $1B revenue, narrow applicability), Florida Information Protection Act (30-day breach notice, AG notice at 500+): none of these were researched this session; confirm at leg.wa.gov (RCW 19.373), leginfo.legislature.ca.gov, statutes.capitol.texas.gov, leg.state.fl.us. Also the status of other 2025/2026 state health data laws (e.g., Virginia, others): not found.
- MHMDA effective dates by entity size and the exact consent-form content requirements: not verified.

## 5. 42 CFR Part 2, mental health, minors (18+ only)

### Takeaway
Not researched in depth; Part 2 applies only to federally assisted SUD programs and their lawful holders, so it is relevant only if Checkpoint receives SUD treatment records from a Part 2 program, not for consumer-described symptoms.

### Cited Findings
- None retrieved this session.

### Gaps
- Part 2 2024 final rule alignment with HIPAA (compliance date Feb 16, 2026) and any 2026 changes: unverified; check https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-2 and HHS press materials.
- State mental health/reproductive/HIV special-category laws: not researched.

## 6. Breach notification, security expectations, retention/deletion, telehealth recordkeeping

### Takeaway
Security Rule NPRM (MFA, encryption, asset inventory, etc.) is still proposed; build to it anyway. Retention and deletion conflict is state-medical-record-driven for the physician practice and must be addressed in notices.

### Cited Findings
- Proposed HIPAA Security Rule changes remain at NPRM stage; commentators suggest voluntarily adopting MFA, required/addressable restructuring, and AI considerations. Source: [Physicians Practice, July 24, 2026](https://www.physicianspractice.com/view/hipaa-security-rule-postponed-privacy-rule-imminent)

### Inferences
- Maintain immutable audit logs, encryption in transit and at rest, per-case key separation for the pseudonym map, role-based access, and a documented risk analysis; these are consistent with both the current Security Rule and the NPRM.
- Deletion requests under MHMDA (30 days) or CCPA will collide with physician record retention; the usual resolution is to delete or de-link the Checkpoint-held consumer copy and tell the user the practice's medical record must be retained under state law (HIPAA/state law exemptions to be confirmed per statute).

### Gaps
- HIPAA breach notification (45 CFR 164.400-414: 60 days, HHS/media thresholds at 500), state breach statutes, HIPAA 6-year documentation retention (164.316/164.530(j)), state medical record retention (often 5 to 10 years, longer for minors), and telehealth-specific recordkeeping: no sources retrieved. Verify at eCFR and state medical board rules.

## 7. Wiretap/CIPA litigation and session replay

### Takeaway
California's SB 690 (signed Sept 30, 2026, effective Jan 1, 2027) ends private pen-register/trap-and-trace claims over website/app tracking, retroactive to actions commenced on or after Jan 1, 2025, but does NOT touch the CIPA anti-wiretapping/eavesdropping provisions (Sections 631 and 632), so chat-transcript interception claims remain.

### Cited Findings
- SB 690: signed Sept 30, 2026; effective Jan 1, 2027; private plaintiffs barred from Section 638.51 pen-register and trap-and-trace claims for website/app conduct (analytics, pixels, cookies, session replay); only the California AG may bring them; applies to claims in actions commenced on or after Jan 1, 2025 (retroactivity may be challenged); Sections 631-632 unaffected. Source: [K&L Gates, Oct 8, 2026](https://www.klgates.com/thought-leadership/California-Narrows-CIPA-Litigation-SB-690-Ends-Pen-Register-and-Trap-and-Trace-Claims-10-8-2026). Other firm alerts on the same bill: [Sidley](https://www.sidley.com/ja/insights/newsupdates/2026/09/californias-sb-690-clears-the-legislature-what-it-means-for-cipa-website-tracking-claims), [Baker Donelson](https://www.bakerdonelson.com/sb-690-signed-into-law-what-it-means-for-cipa/web-tracking-litigation). The K&L Gates piece does not discuss a business-purpose exemption; other firms' descriptions of a "whittled-down" bill ([Captain Compliance](https://captaincompliance.com/news/cipa-reform-is-a-whittled-down-version-of-sb-690-on-the-verge-of-becoming-law/)) suggest legislative changes during passage; final text should be checked.

### Inferences
- Chat transcripts and third-party chat/replay vendors (a "third party listening in" theory under Section 631) remain the exposure. Mitigate with consent before recording, no third-party session replay or chat widgets on health pages, and processor-only vendors with contractual use limits.

### Gaps
- Federal Wiretap Act and other states' all-party consent laws (e.g., Pennsylvania, Washington): not researched.

## 8. Best-practice consent screen design

### Takeaway
No source gave a prescriptive template; the following is design inference from the cited laws.

### Cited Findings
- Washington MHMDA requires affirmative, revocable opt-in consent for collection, separate from consent for sharing; sales need a signed written authorization expiring in one year. Nevada requires separate consent for collection vs sharing. Source: [Fisher Phillips](https://www.fisherphillips.com/en/news-insights/beyond-hipaa-states-join-trend-to-protect-consumer-health-data.html)
- Hims complaint alleges deceptive privacy representations and undisclosed health data sharing, so statements must match practice. Source: [McDermott](https://www.mcdermottlaw.com/insights/ftc-two-states-take-aim-at-hims-hers-subscription-and-health-data-practices/)

### Inferences
- Separate unbundled toggles: (1) collect and create the case packet; (2) transmit to a named physician practice; (3) optional: use de-identified data for evaluation/model improvement (default off, not required for service); (4) optional marketing (default off). No pre-checked boxes; no dark patterns.
- Show exactly what the packet contains (redacted preview), who sees it, retention period, how to revoke/delete, and the limits (revocation cannot erase the practice's medical record; Anthropic chat is a separate party).
- State that this is not an emergency service; add 18+ attestation; record consent version, timestamp and text hash in the audit trail.
- If any HIPAA authorization is needed (secondary use of PHI by the practice), keep it a standalone document with required HIPAA elements.

### Gaps
- State-specific consent wording requirements (e.g., MHMDA sale authorization elements) were not verified from statute text.
