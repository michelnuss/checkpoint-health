# Checkpoint: Liability, Malpractice, Insurance, Precedents and Judge Q&A (current to Nov 7, 2026)

Scope note: US focus. Search budget was limited (about 24 calls), so several items are flagged as gaps. "Single-source" or "snippet-level" flags are explicit. Where a fact is general legal knowledge not verified in this session, it is placed under Inferences or Gaps, not Cited Findings.

## 1. Malpractice for telehealth and for physicians reviewing AI output (standard of care, automation bias, who is liable, insurer exclusions, Good Samaritan)

### Takeaway
Liability for AI-assisted care currently falls mainly on the physician who signs the decision (and the hospital or practice), not on the AI developer; the allocation among physician, system and vendor is legally unsettled. Insurers are adding AI exclusions mostly to CGL/E&O/D&O lines, so Checkpoint's practice-level malpractice policy and tech E&O must be checked line by line.

### Cited Findings
- Sara Gerke says liability currently falls mainly on physicians and hospitals rather than manufacturers; The Doctors Company's Deepika Srivastava says malpractice law "provides no clear allocation of liability" among physicians, health systems and tech companies, and physicians carry primary risk because they sign the record and make the clinical decision. — [Physicians Practice, May 12, 2026](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- Standard of care may shift: Gerke says AI "could eventually redefine the standard of care"; David Simon says whether non-use becomes a breach depends on adoption in a field, likely gradual and uneven; relying on AI without proper validation may be seen as careless. — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- Physicians risk becoming "liability sinks" (little control over design, most exposure), per a 2024 Future Healthcare Journal paper cited in the same article; under the learned intermediary doctrine a manufacturer can often satisfy its duty by informing the physician. — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- Insurer-side risk guidance: informed consent when AI is used is the top protective step; physicians must review AI-generated notes; health systems face liability for failing to vet, oversee and train staff on AI; physicians should ask vendors how a tool was validated and whether they will pay for defense. — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- That article does not discuss malpractice policy AI exclusions (so no evidence either way for MPL policies from this source). — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- Texas SB 1188 (effective Sept 1, 2025): practitioners may use AI for diagnosis/treatment planning only if AI-generated records are reviewed, and they keep ultimate responsibility for clinical decisions; TRAIGA (effective Jan 1, 2026) requires disclosure to patients when AI is used in diagnosis or treatment. — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance)
- California AB 3030 (effective Jan 1, 2025) requires an AI disclaimer and instructions for reaching a licensed human provider on AI-generated clinical communications. — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance)
- Insurance exclusions: ISO CGL generative-AI endorsements (CG 40 47 broadest, CG 40 48 Coverage B only, CG 35 08 products/completed ops) effective Jan 1, 2026; W.R. Berkley "absolute" AI exclusions on E&O/D&O/fiduciary; some E&O carriers exclude or sub-limit AI claims; insurers may argue unverified AI reliance is not a "professional service"; no cyber AI exclusion described (some cyber carriers added AI endorsements expanding coverage). — [Olshan / Legal Intelligencer, May 15, 2026](https://www.olshanlaw.com/assets/htmldocuments/Legal%20Intelligencer%20-%20The%20Continued%20Rise%20of%20Generative%20AI%20Exclusions%20in%20Commercial%20Insurance%20Policies%20-%20What%20Policyholders%20Need%20to%20Know%20Crawford%205-15-26.pdf); see also [Insurance Business](https://www.insurancebusinessmag.com/us/news/professional-liability/isos-generative-ai-exclusion-is-already-on-thousands-of-cgl-policies-589971.aspx) (search snippet only)
- Same source advises: expect underwriters to ask about AI use, negotiate narrower exclusions or carve-backs, check vendor indemnity gaps, and note that courts generally read exclusions narrowly. — [Olshan](https://www.olshanlaw.com/assets/htmldocuments/Legal%20Intelligencer%20-%20The%20Continued%20Rise%20of%20Generative%20AI%20Exclusions%20in%20Commercial%20Insurance%20Policies%20-%20What%20Policyholders%20Need%20to%20Know%20Crawford%205-15-26.pdf)
- Ostensible agency in general: an independent-contractor physician can be treated as the principal's ostensible agent if it appears the physician is an employee; the test is how things reasonably appear to the patient; mitigation includes not letting contractors use the practice's name/logo, requiring own malpractice coverage, conspicuous non-employee notices, and own billing. — [ProAssurance Claims Rx, July 2025](https://riskmanagement.proassurance.com/hubfs/M6240_July2025ClaimsRxD4.pdf?hsLang=en) (general principle, not telehealth-platform specific; outcome varies by state)

### Inferences
- Because the physician signs the case, a Checkpoint reviewing physician is the most likely primary malpractice defendant; the platform would likely be named too (negligence, ostensible agency, corporate negligence). This is reasoning from the sources above, not a decided Checkpoint-type case.
- Automation bias is a real design risk for the "AI-prepared packet" model: a physician rubber-stamping a packet is the exact fact pattern plaintiffs would plead. Mitigations the sources imply: documented independent review, disagreement logging, and sampling audits (Utah's Doctronic phases use AI-vs-physician disagreement tracking, see Section 4).
- Good Samaritan statutes protect emergency, gratuitous care at the scene without a pre-existing duty; a commercial, scheduled, paid or credentialed asynchronous review likely creates a physician-patient relationship, so they should not be relied on. (General legal knowledge, not sourced in this session.)

### Gaps
- No 2025 to 2026 reported malpractice case specifically about a physician reviewing AI-prepared triage output was found.
- No source verifying AI exclusions in medical professional liability (MPL) policies specifically; the exclusion evidence is for CGL, E&O, D&O.
- Cross-state telehealth coverage (licensure where the patient sits, whether the carrier covers out-of-state telehealth) not researched; no source found.
- Good Samaritan statute text not retrieved; flagged as unsourced.
- Memory note for main session: Michel's earlier idea (saved memory) included routing cases to doctors in India or Brazil. Under the brief (US licensed physicians) this is out of scope, but if raised, US state licensure generally attaches where the patient is located; not verified here.

---

## 2. Product liability and negligence against AI chatbot companies for health harms; Section 230; duty to warn; ToS enforceability

### Takeaway
Courts and plaintiffs are treating chatbots as products or negligence targets, not as neutral publishers, and 2026 health-specific suits against OpenAI now plead design defect, failure to warn and unlicensed-practice theories. Section 230 looks like a weak shield for first-party generated output, and disclaimers help (Walters) but have not stopped injury suits.

### Cited Findings
- Garcia v. Character Technologies (M.D. Fla., May 2025): Judge Anne Conway let the wrongful death suit proceed against Character Technologies, Google and founders; she was "not prepared" to hold chatbot output is protected speech "at this stage." — [Insurance Journal, May 23, 2025](https://www.insurancejournal.com/news/national/2025/05/23/824758.htm)
- Same case, 785 F. Supp. 3d 1157: court found a plausible duty of care based on foreseeable risks of anthropomorphic AI and did not resolve publisher-based Section 230 defenses at the motion-to-dismiss stage. — [Quinn Emanuel AI Update, April 2026](https://www.quinnemanuel.com/the-firm/publications/artificial-intelligence-update-april-2026/)
- Character.AI and Google agreed to settle Garcia and four other cases (NY, CO, TX), reported Jan 7, 2026; terms undisclosed. Settlement means no appellate ruling on the product and speech questions. — [Bloomberg Law via abc17news](https://abc17news.com/?p=1585259)
- Walters v. OpenAI (Ga. Super. Ct., May 19, 2025): summary judgment for OpenAI on defamation; disclaimers meant no reasonable person would take output as stated fact, and hallucination-mitigation efforts showed no negligence. — [Quinn Emanuel](https://www.quinnemanuel.com/the-firm/publications/artificial-intelligence-update-april-2026/)
- Quinn Emanuel's conclusion: AI developers face more exposure from design-defect and duty-of-care theories than from claims that would trigger Section 230 immunity; design-based claims often avoid Section 230 (Lemmon v. Snap; Anderson v. TikTok). — [Quinn Emanuel](https://www.quinnemanuel.com/the-firm/publications/artificial-intelligence-update-april-2026/)
- Turner-Scott v. OpenAI Foundation (S.F. Superior Court, filed May 12, 2026): family of Samuel Nelson alleges ChatGPT (GPT-4o) recommended Xanax and kratom and suggested Benadryl before a fatal overdose; claims include defective design, failure to warn, negligence, wrongful death, UCL, unlicensed medical practice theory, and violation of a state law barring AI from presenting as a licensed health practitioner (apparently California AB 489). Seeks damages and an injunction pausing health products. OpenAI says the model is no longer available and ChatGPT is not a substitute for medical care. — [Bloomberg Law](https://news.bloomberglaw.com/tech-and-telecom-law/openai-hit-with-overdose-suit-centered-on-chatgpt-medical-advice)
- Wan v. OpenAI and Altman (S.F. Superior Court, filed Oct 27, 2026): parents allege GPT-4o produced a plan to taper lamotrigine to zero over about 25 days and encouraged distrust of providers; patient died of SUDEP (Feb 2026). Eight claims including negligence, defective design, failure to warn, wrongful death, UCL; seeks injunction barring medication discontinuation instructions and directing users to licensed professionals. No rulings. — [HLTH, Oct 29, 2026](https://hlth.com/insights/news/openai-faces-wrongful-death-lawsuit-over-alleged-chatgpt-medication-advice)
- A Florida pastor sued OpenAI and Altman alleging dangerous medical advice (pulmonary embolism context). — headlines only: [Entrepreneur](https://entrepreneur.com/business-news/a-florida-pastor-is-suing-openai-claiming-chatgpt-gave-him-extremely-dangerous-medical-advice), [Runtime Wire](https://runtimewire.com/article/openai-sued-chatgpt-pastor-medical-advice-pulmonary-embolism) (details not fetched; weak)
- California AB 489 (effective Oct 1, 2025) bars AI systems from using terms, interface elements or post-nominals (M.D., D.O., R.N.) implying licensed human care when none exists; each term is a separate offense; boards can investigate. — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance)

### Inferences
- The Section 230 answer for Checkpoint: the AI's own generated summary and the physician's own advice are first-party content; relying on 230 is unwise. This is an inference from the design-defect trend, not a holding about medical AI.
- Checkpoint's structure (physician reviews before the user gets clinical advice) directly answers the pleaded failure mode in Turner-Scott and Wan (unsupervised AI advising on dosing and medication discontinuation). Medication changes should be a hard-coded refusal.
- Branding: avoid "AI Doctor" style labels in CA; the AI layer must be labeled AI and the physician layer labeled as a physician.
- ToS limits: disclaimers helped OpenAI on defamation (Walters), but no source found showing ToS liability waivers defeating a wrongful death or personal injury claim by a user or by non-party heirs. Treat waivers as weak against personal-injury claims.

### Gaps
- No ruling found on ToS enforceability (arbitration, limitation of liability) for AI health harms; none found on Section 230 for medical AI specifically.
- Details of the Florida pastor complaint (court, date, claims) not verified.
- Other 2026 rulings on motions to dismiss in OpenAI health cases were not found (suits are recent).

---

## 3. Platform liability for referral networks and branded doctors (apparent or ostensible agency)

### Takeaway
A platform that brands, markets and schedules doctors is exposed to vicarious liability if patients reasonably believe the doctors are the platform's own; independence disclosures and physician-owned practices reduce, but do not eliminate, that exposure.

### Cited Findings
- Ostensible agency turns on how things would "reasonably appear to the patient"; calling a contractor "our ob-gyn," without telling patients he was a contractor, led a practice to settle. — [ProAssurance Claims Rx](https://riskmanagement.proassurance.com/hubfs/M6240_July2025ClaimsRxD4.pdf?hsLang=en)
- Risk reduction steps listed: no practice names or logos on contractors, contractors carry own insurance, conspicuous notice that contractors are not employees or agents, contractors bill under own names, avoid referral language suggesting membership; state law varies. — [ProAssurance](https://riskmanagement.proassurance.com/hubfs/M6240_July2025ClaimsRxD4.pdf?hsLang=en)
- Health systems face liability if they fail to vet, oversee and train staff on AI tools (hospitals are not exempt). — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)

### Inferences
- Checkpoint (an MCP connector surfaced inside Claude) is a double-brand situation: Claude/Anthropic's brand plus Checkpoint's. Clear, conspicuous disclosure that the reviewing physician practices through an independent, physician-owned practice, with the practice's name on the reply and its own malpractice coverage, mirrors the ProAssurance steps. Consider also that the more control the platform exerts over clinical workflow, the weaker the independence argument.
- Corporate practice of medicine (CPOM) is the reason for physician-owned practices plus an administrative MSO; K Health uses affiliated professional corporations (see Section 4). CPOM rules vary by state; not researched here.

### Gaps
- No telehealth-platform-specific ostensible agency decision (e.g., a Teladoc or Doctor on Demand case) was retrieved; the source is general physician-practice guidance. A targeted case-law search (Westlaw/Lexis) is needed.

---

## 4. Precedents: K Health, Teladoc, Doctronic and Utah, 98point6, Ada, Included Health, Amazon Clinic; what regulators and litigators targeted

### Takeaway
AI plus physician-in-the-loop is being adopted by major health systems (K Health with Cedars-Sinai, Northwell, Penn) and tested under regulator supervision (Utah/Doctronic), while enforcement against telehealth companies has focused on privacy/ad tracking and subscription practices rather than on clinical AI itself.

### Cited Findings
- K Health and Cedars-Sinai, Annals of Internal Medicine (Apr 4, 2025), 461 real visits at Cedars-Sinai Connect (urinary, vaginal, respiratory, eye, dental complaints): physicians made the same decision as the AI about two-thirds of the time; in the remaining third AI recommendations were rated superior about twice as often as inferior; AI made no recommendation in about 20% of cases for lack of confidence; AI received about half as many "potentially harmful" ratings. Limitations: unclear whether physicians saw AI output before deciding; expert ratings not outcomes; physicians can ask clarifying questions; editorial from Tufts urged AI mainly to confirm physician decisions. — [EurekAlert news release](https://www.eurekalert.org/news-releases/1078883); also [Healio](https://www.healio.com/news/primary-care/20250411/study-ai-recommendations-for-common-conditions-superior-to-those-from-physicians) (snippet only). Note: the study is co-authored by K Health employees (vendor-affiliated, per the release's author list of Tel Aviv University, Cedars-Sinai and K Health).
- Northwell and K Health launched an AI-powered virtual primary care platform (announced Nov 20, 2025). — [Business Wire](https://businesswire.com/news/home/20251120812043/en/Northwell-Health-and-K-Health-Launch-Virtual-Primary-Care-Platform-Powered-by-Clinical-AI) (headline only; details not fetched)
- K Health and Penn Medicine: multi-year deployment of AI clinical agents across UPHS EHR starting with Penn Medicine On-Demand, with pre-populated draft chart flowing to the provider; Penn invested in K Health. Release (dated via URL as May 27, 2026) does not describe clinician oversight mechanics or an affiliated medical group. — [Business Wire](https://www.businesswire.com/news/home/20260527013277/en/)
- Doctronic and Utah Office of AI Policy (OAIP), announced Jan 6, 2026: AI handles 30/60/90 day renewals of existing prescriptions only; no new prescriptions, no controlled substances, no treatment changes. — [Utah Commerce](https://commerce.utah.gov/2026/01/06/news-release-utah-and-doctronic-announce-groundbreaking-partnership-for-ai-prescription-medication-renewals/); [OAIP page](https://ai.utah.gov/agreements/doctronic/)
- Utah physician oversight detail: Phase One has a licensed physician approve every AI renewal; AI-physician disagreements get risk assessment; Phase Two clinician review after issuance; Phase Three semi-autonomous renewals with random sampling; each phase requires demonstrated safety; monthly reports to OAIP; OAIP may modify or cancel. — [Utah agency reply to Medical Board, April 2026](https://commerce.utah.gov/wp-content/uploads/2026/04/Medical-Board-Doctronic-Response.pdf)
- Utah Medical Board pushback: 11 of 14 members signed an April 20, 2026 letter asking for immediate suspension, citing refills without adequate oversight and financial incentives. The agency declined. — [Utah agency reply](https://commerce.utah.gov/wp-content/uploads/2026/04/Medical-Board-Doctronic-Response.pdf)
- FTC, California and Utah v. Hims & Hers (N.D. Cal., filed July 29, 2026; FTC vote 2-0): alleges sharing of sensitive health data with ad platforms via customer-list uploads, pixels and APIs despite privacy promises; ROSCA/subscription disclosure and cancellation failures; FTC Act Section 5; state UCL, FAL, ARL, CA constitutional privacy, Utah Consumer Sales Practices Act. Hims denies; unproven. — [McDermott Will & Schulte](https://www.mcdermottlaw.com/insights/ftc-two-states-take-aim-at-hims-hers-subscription-and-health-data-practices/); also [Insurance Journal](https://amp.insurancejournal.com/news/west/2026/07/30/879579.htm), [Troutman/InfoLawGroup](https://www.infolawgroup.com/insights/2026/8/4/subscriptions-meet-sensitive-data-the-ftc-and-states-sue-hims-amp-hers) (snippets)
- FTC v. Cerebral (proposed order Apr 15, 2024): more than $7 million; $5.1 million partial refunds; $10 million civil penalty suspended after $2 million payment; allegations of sharing data on nearly 3.2 million consumers with LinkedIn, Snapchat, TikTok; cancellation difficulty; postcards revealing diagnoses; weak security; ban on using health data for most advertising; former CEO named. — [Healthcare Dive](https://www.healthcaredive.com/news/cerebral-federal-trade-commission-7-million-fine-data-sharing-privacy/713295/)
- Lessons the Hims coverage draws: disclose billing before collecting payment; easy cancellation; audit pixels and SDKs; make privacy promises match practice; act on complaints. — [McDermott](https://www.mcdermottlaw.com/insights/ftc-two-states-take-aim-at-hims-hers-subscription-and-health-data-practices/)
- Amazon Clinic: search results indicate Amazon shut down the Clinic telehealth service and consolidated into One Medical. — headline-level only: [Pharmaphorum](https://pharmaphorum.com/news/amazon-healthcare-push-shifts-with-closure-of-telehealth-service), [Yahoo](https://uk.news.yahoo.com/amazon-consolidates-amazon-clinic-one-153223718.html) (weak; not fetched, no dates verified)
- 98point6: search listings show a CEO departure, layoffs, and a Transcarent transaction. — headline-level only: [Becker's](https://beckershospitalreview.com/telehealth/telemedicine-startup-98point6-ceo-abruptly-departs.html) (weak; not verified)

### Inferences
- Utah's phased model (physician approves everything first, then sampling, with disagreement and escalation metrics) is a ready template for Checkpoint's own rollout plan and validation reporting.
- BetterHelp and Cerebral lessons converge with Hims: the highest-probability enforcement risk for Checkpoint is privacy (pseudonymization, no ad pixels, no data to model vendors beyond BAAs) and consumer-protection (clear consent, billing terms), not an AI-specific statute. This is reasoning from the cited actions.
- Checkpoint's consent and pseudonymized audit trail design aligns with these lessons; verify with HIPAA counsel whether the connector and each vendor in the chain (including the LLM provider) are covered by BAAs.

### Gaps
- Not found/researched: Teladoc litigation or malpractice history; Ada Health's regulatory posture; Included Health/Doctor on Demand; BetterHelp FTC ($7.8 million, 2023) details were not retrieved (known from background knowledge only; unverified here).
- K Health's affiliated professional corporation structure and Cedars-Sinai partnership terms: not verified from a primary source in this session.
- Whether the Hims complaint includes the Health Breach Notification Rule was not confirmed in the McDermott summary.

---

## 5. Regulatory sandboxes and safe harbors

### Takeaway
Utah's OAIP regulatory mitigation agreements are the only operating model with real health precedent (three health agreements including Doctronic); Texas has a statutory sandbox with a defined application, Delaware is not yet operational, and Arizona and Florida were not confirmed.

### Cited Findings
- Utah: Learning Lab plus three health care regulatory relief agreements, including Doctronic; interests include diagnostic decision support, mental health support, specialty care. Approved developers sign an agreement with OAIP and the agency whose rules won't be enforced. — [Manatt Health](https://www.manatt.com/insights/newsletters/health-highlights/testing-the-future-of-ai-what-ai-sandboxes-means-for-innovation-in-health-care)
- Texas: a House bill (TRAIGA) created a sandbox with legal protection and limited market access; applications need the system and intended use, a benefit assessment (consumer, privacy, public safety), a risk mitigation plan, and proof of compliance with federal AI laws; approval by Texas DIR and applicable agencies. — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/testing-the-future-of-ai-what-ai-sandboxes-means-for-innovation-in-health-care); see also [ABA Business Law Today](https://www.americanbar.org/groups/business_law/resources/business-law-today/2025-july/texas-enters-ai-sandbox-with-traiga-implications-business-trials/) (snippet only)
- Delaware: Agentic AI Regulatory Sandbox Subcommittee created January 2026 and drafting legislation; not operational. — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/testing-the-future-of-ai-what-ai-sandboxes-means-for-innovation-in-health-care)
- Federal: Cruz SANDBOX Act did not advance in 2025; FDA TEMPO pilot tied to CMS ACCESS allows up to 40 manufacturers to offer devices without premarket authorization (selection process not described). — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/testing-the-future-of-ai-what-ai-sandboxes-means-for-innovation-in-health-care)
- In Utah the agency agrees not to enforce specified regulations during the agreement; Manatt says little beyond that on liability protection. — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/testing-the-future-of-ai-what-ai-sandboxes-means-for-innovation-in-health-care)

### Inferences
- A sandbox waives regulator enforcement, not private tort liability (reasoning; Utah text on liability was not stated on the OAIP page, and the Doctronic final agreement PDF at commerce.utah.gov/wp-content/uploads/2026/01/Doctronic-Final-Agreement.pdf was not read). Patients can still sue.
- For a hackathon: say "we would apply to Utah OAIP (health relief agreements exist) and use Texas's sandbox application structure as our template"; do not claim any approval.
- The Utah Medical Board's opposition shows a sandbox can be politically contested; plan for physician-board engagement.

### Gaps
- Arizona and Florida: Manatt does not mention sandboxes there; not verified (Arizona has a general fintech/FinTech sandbox and Florida has bills, but not researched).
- Whether sandbox participation covers a connector offering asynchronous physician review (versus AI acting alone) is untested.

---

## 6. Insurance: cyber, tech E&O, medical professional liability, cost ranges

### Takeaway
Coverage is available but AI exclusions are spreading across CGL, E&O and D&O; plan a stack of tech E&O + cyber (with AI carve-backs negotiated) for Checkpoint and MPL for each physician practice. Reliable cost ranges were not found.

### Cited Findings
- AI exclusions summary: ISO CGL (Jan 1, 2026), Berkley E&O/D&O/fiduciary absolute exclusion, some E&O carriers sub-limiting AI claims; cyber had AI endorsements expanding coverage in some cases. — [Olshan](https://www.olshanlaw.com/assets/htmldocuments/Legal%20Intelligencer%20-%20The%20Continued%20Rise%20of%20Generative%20AI%20Exclusions%20in%20Commercial%20Insurance%20Policies%20-%20What%20Policyholders%20Need%20to%20Know%20Crawford%205-15-26.pdf)
- Physicians should ask vendors whether they will pay for defense, i.e., vendor indemnity terms matter. — [Physicians Practice](https://www.physicianspractice.com/view/tech-at-warp-speed-medical-practice-liability)
- Contractor physicians should carry their own malpractice coverage per ostensible-agency guidance. — [ProAssurance](https://riskmanagement.proassurance.com/hubfs/M6240_July2025ClaimsRxD4.pdf?hsLang=en)

### Inferences
- A sensible Checkpoint stack: (a) MPL claims-made policy per practice or physician with explicit telehealth and AI-assisted review coverage confirmed in writing; (b) tech E&O naming Checkpoint and checking the AI exclusion wording; (c) cyber including privacy regulatory defense and media/tracking-technology coverage (given Hims/Cerebral); (d) contractual indemnity from the LLM provider where obtainable.

### Gaps
- No dependable cost ranges were found. Search surfaced broker/marketing pages (Insureon, Founder Shield, Zensurance, Corgi) that were not opened; their figures would be vendor marketing. Report writer should not quote costs.
- Cross-state telehealth MPL coverage terms: not found.

---

## 7. Evidence standards and benchmarks

### Takeaway
Health systems and regulators will want task-specific, physician-adjudicated safety evidence (escalation sensitivity above all) and evidence about real workflows; general benchmarks such as HealthBench show model quality but not real-world safety.

### Cited Findings
- HealthBench (OpenAI, arXiv 2505.08775): 5,000 multi-turn conversations, 262 physicians across 26 specialties, median 11 rubric criteria per conversation, 48,562 unique criteria; seven themes including emergency referrals (482 examples, 9.6%) that penalizes both under- and over-escalation; scores range 0.16 (GPT-3.5 Turbo) to 0.60 (o3); GPT-4o 0.32; HealthBench Hard 1,000 examples with no model above 32% (at paper time). — [arXiv](https://arxiv.org/pdf/2505.08775)
- HealthBench limitations: rubric criteria mostly not validated by other physicians, model grader (GPT-4.1) with agreement comparable to physicians (macro F1 0.709; agreement ranges about 55 to 75%), evaluates single responses and not workflow outcomes; reliability concern (worst-at-16 score about a third below average for o3). — [arXiv](https://arxiv.org/pdf/2505.08775)
- Physician baselines: recent models beat unassisted physicians' written responses, but physician edits improved September 2024 model answers more often than worsened them (56.2% vs 39.8%) and were about even for April 2025 models (46.8% vs 47.7%). — [arXiv](https://arxiv.org/pdf/2505.08775)
- K Health study metrics (physician-AI agreement about two-thirds; no-recommendation about 20%; harm ratings about half) are the closest published analog to what Checkpoint would report. — [EurekAlert](https://www.eurekalert.org/news-releases/1078883)
- Utah regulators ask for AI-physician agreement and escalation rates and monthly reports. — [Utah agency reply](https://commerce.utah.gov/wp-content/uploads/2026/04/Medical-Board-Doctronic-Response.pdf)

### Inferences
- Proposed Checkpoint metrics (design recommendation, not a sourced regulatory requirement): red-flag escalation recall (target near 100% on a pre-registered adjudicated set, with confidence interval), escalation precision (over-escalation burden), physician-AI agreement and override rates, rate of "no recommendation," time-to-response, adverse-event reporting, subgroup performance, and a prospective study with outcome follow-up.
- Because physician review is the safety layer, measure also whether physicians catch seeded AI errors (a direct automation-bias test).

### Gaps
- No FDA or state guidance specifically defining required sensitivity/specificity for symptom-triage was found. FDA clinical decision support (CDS) and software-as-a-medical-device (SaMD) status for Checkpoint was not researched; this is a major open item for the writer to flag.

---

## 8. Judge Q&A (20 questions)

Answers are short and honest; "[src]" points to the section above. Items resting on inference or weak sources are marked.

1. **Isn't this the unlicensed practice of medicine or an AI doctor?**
   The AI only prepares a case packet; a licensed US physician makes every clinical judgment, which is the model Texas SB 1188 requires (practitioner reviews AI and keeps responsibility) [src 1]. We avoid titles like "AI Doctor," which California AB 489 targets [src 2].

2. **Who is liable if someone is harmed?**
   Honestly, it is unsettled: the physician who signs and the practice bear primary risk today, with the platform exposed through negligence and agency theories [src 1, 3]. We reduce it with documented review, consent, and insurance.

3. **Won't doctors just rubber-stamp the AI (automation bias)?**
   It is a real risk; liability commentary calls clinicians "liability sinks" [src 1]. Our mitigation is design: independent review prompts, logged disagreements, seeded-error audits, and sampling, modeled on Utah's Doctronic phases [src 4].

4. **Can Section 230 protect you?**
   We do not rely on it; AI output and physician advice are first-party content, and courts allowed design and duty-of-care claims against Character.AI to proceed [src 2]. This is an inference, no medical-AI 230 ruling exists in our research.

5. **Chatbot companies are already being sued for health advice. Why is Checkpoint different?**
   Suits against OpenAI (Turner-Scott, May 2026; Wan, Oct 2026) allege unsupervised dosing and medication-discontinuation advice [src 2]. Checkpoint refuses medication changes, never prescribes, and puts a physician before any clinical advice. The cases are unresolved, so the risk is not zero.

6. **Can your terms of service waive liability?**
   Do not count on it. Disclaimers helped OpenAI against defamation (Walters), but we found no ruling letting a ToS defeat a wrongful-death claim [src 2].

7. **Is the doctor your employee? Corporate practice of medicine?**
   Doctors work through physician-owned practices, the structure K Health uses with affiliated professional corporations (single-source, unverified here) [src 4]. CPOM rules vary by state and need counsel [src 3].

8. **Apparent agency: if the app brands the doctors, aren't you on the hook?**
   Possibly. Ostensible agency turns on how things look to the patient [src 3]. We disclose the independent practice conspicuously, show the practice name, and require each practice to carry its own malpractice insurance, per ProAssurance guidance [src 3].

9. **What happens in an emergency?**
   Red-flag symptoms trigger an immediate instruction to call 911 before any queue. Asynchronous review is not for emergencies, so the key metric is escalation recall; Good Samaritan statutes would not shield us [src 1 inference]. Requires validation [src 7].

10. **Will insurers even cover this?**
   Maybe with work: AI exclusions are spreading in CGL, E&O and D&O, so we would negotiate carve-backs and confirm telehealth and AI review coverage in the practice's MPL policy [src 1, 6]. We have no reliable premium figures.

11. **What clinical evidence do you have?**
   Honestly none yet at hackathon stage. The nearest evidence is K Health/Cedars-Sinai (461 visits, about two-thirds agreement, half the harmful ratings, vendor-affiliated, expert-rated) [src 4]. Our plan is to adopt similar metrics plus escalation recall [src 7].

12. **Is HealthBench enough to prove safety?**
   No. It measures single-response quality, uses model grading, and not workflow outcomes; o3 scored 0.60 overall [src 7]. We would use it for model selection and prospective physician-adjudicated testing for safety.

13. **How is patient privacy protected?**
   Consent, pseudonymization and audit trail are built in; the biggest enforcement risk in this sector is health data sharing and subscriptions (Cerebral $7M order, FTC v. Hims & Hers July 2026) [src 4]. We would use no ad pixels and BAAs with every vendor in the chain [src 4 inference].

14. **What do regulators actually go after in telehealth?**
   Privacy and billing practices: Hims & Hers complaint (disclosure before billing, cancellation, tracking tech) and Cerebral [src 4]. Hims denies; allegations are unproven.

15. **Is there a legal pathway like a sandbox?**
   Utah OAIP signed health agreements, including Doctronic; Texas has a sandbox with a defined application; Delaware is not yet operational [src 5]. A sandbox waives enforcement, not private lawsuits, and Utah's medical board opposed Doctronic [src 4, 5].

16. **Does the FDA regulate this as a medical device?**
   Unresolved in our research [src 7 gap]. Physician-reviewed decision support may fall under clinical decision support exemptions, but we have not verified this and would seek regulatory counsel. Do not claim exemption.

17. **Do state laws on AI in health care apply?**
   Yes: CA AB 3030 (AI disclaimer and human contact path), CA AB 489, Texas TRAIGA/SB 1188 (disclosure, review), Illinois and Nevada limits on AI therapy [src 1, 2]. We design to the strictest common denominator.

18. **Doctors must be licensed where the patient is. How do you handle 50 states?**
   We only route to US-licensed physicians licensed in the patient's state; this limits supply early. (Licensure rule is general knowledge, unverified here; if offshore doctors are proposed, this does not work.) [src 1 gap]

19. **Who pays, and does the business work?**
   Not established in research: no verified unit economics or reimbursement data. Honest answer: possible models are employer/health-plan or per-case fees, but physician review time, malpractice premiums and compliance costs are the cost drivers, and consumer subscriptions carry FTC risk [src 4, 6]. Treat as an open question.

20. **Why would a physician or health system trust you after others folded?**
   Several virtual-care ventures contracted (Amazon Clinic closure and 98point6 turmoil, both weakly sourced here) [src 4], while health systems are now adopting AI intake with physicians in the loop (Cedars-Sinai, Northwell, Penn) [src 4]. We focus on a narrow, supervised scope and publish safety metrics.

### Gaps (overall)
- Not covered: FDA CDS/SaMD analysis; HIPAA/BAA analysis of the MCP architecture; interstate licensure compacts; CPOM state survey; Teladoc, Ada, Included Health and BetterHelp specifics; reliable insurance premium data; Good Samaritan statutes. Each needs targeted follow-up before final claims.
- Note: user preference is to deliver documents as PDFs; this file is Markdown as requested by the assignment path, and the main session may convert.
