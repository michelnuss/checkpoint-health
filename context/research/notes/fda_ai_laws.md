# FDA and State AI-in-Healthcare Law for Checkpoint (current to Nov 2026)

Note on method: ~25 tool calls; primary sources (FDA.gov, legislature sites) were NOT directly fetched; findings rely on law firm alerts. Verify bill text before relying.

## FDA: SaMD, CDS, general wellness, chatbots

### Takeaway
FDA's Jan 2026 revised CDS guidance is framed around HCP-facing tools; consumer/patient-facing symptom software stays under general device policy and intended-use analysis. A physician-in-the-loop design helps (HCP-facing, independent review) but does not by itself make patient-facing output exempt. FDA has not (found) brought enforcement against LLM health chatbots; state actors have led.

### Cited Findings
- FDA issued revised CDS guidance (superseding 2022) in Jan 2026 without prior public comment — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software)
- 520(o)(1)(E) non-device criteria (all four needed): (1) not acquiring/processing image, IVD signal or pattern/signal; (2) displays/analyzes medical info; (3) supports/provides recommendations to an HCP on prevention, diagnosis, treatment; (4) lets HCP independently review the basis so not relying primarily on it — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software)
- New: limited enforcement discretion for single-output/recommendation software when only one option is "clinically appropriate"; not for time-critical event prediction or image/signal analysis; time-critical decision support no longer excluded per se — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software)
- Existing digital health policies "continue to apply to consumer or patient-facing CDS"; context of use determinative; software that establishes a definitive diagnosis or guides care pathways/escalation for conditions needing immediate intervention remains under FDA oversight — [DLA Piper](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points)
- Source disagreement: Arnold & Porter says the 2026 version removed the 2022 automation-bias discussion; DLA Piper says FDA now evaluates automation bias by level of automation and time-criticality. Check the guidance text.
- General wellness 2026 update: keeps 2019 definition, widens non-invasive wearable examples; wellness alerts suggesting HCP evaluation allowed only if they do not name a condition, call output abnormal/diagnostic, give thresholds or treatment advice, or manage disease — [DLA Piper](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points); [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software)
- Both guidances were direct-to-final; commentators note possible procedural challenge — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software)
- Aug 18, 2026: FDA Digital Health Center of Excellence released a GenAI-enabled device discussion paper (not guidance); comments due Oct 19, 2026, Docket FDA-2026-N-7874. Raises device-status question for GenAI, two-axis risk framework (informs/directs/acts vs harm severity), agentic AI. Notes a "talk to your doctor" disclaimer may not make a directive output less directive; patient outreach may be outside jurisdiction — [Hall Render](https://hallrender.com/2026/08/26/fda-seeks-input-on-the-future-of-genai-enabled-medical-device-oversight/)
- Cooley (Jun 2026): FDCA could reach chatbots that perform diagnostic/treatment functions; FDA looks at intended use incl. design, marketing, statements; enforcement so far mainly from states, not FDA — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)
- July 2025 WHOOP warning letter (blood pressure feature) is the notable FDA wellness-line enforcement; Jan 2026 guidance appears to relax it though sources differ on how much — [Arnold & Porter](https://www.arnoldporter.com/en/perspectives/advisories/2026/01/fda-cuts-red-tape-on-clinical-decision-support-software); [DLA Piper](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points)

### Inferences
- Checkpoint's AI draft goes to a physician, so the CDS criterion-3 "HCP" audience and criterion-4 independent review fit, and the patient never sees clinical advice before sign-off. But the pre-consent consumer-facing general info, red-flag/escalation guidance ("go to ER") and any patient-facing triage output are the exposed parts: triage/escalation for urgent conditions is the category DLA says stays under oversight. Keep patient-facing pre-review content to general education and generic red-flag/emergency messaging, avoid condition-specific diagnostic outputs, and document intended use.
- Inference: strongest position is that the physician, not software, delivers the clinical advice (practice of medicine, which FDA does not regulate), with software supporting an HCP. Not tested in any found authority.

### Gaps
- No primary FDA text fetched; no FDA 2025-26 enforcement action against an LLM symptom chatbot found. FDA Nov 2025 Digital Health Advisory Committee on generative AI mental health devices not verified here. Patient-facing symptom-checker precedent (e.g., 2019 policy, Ada/Babylon) not researched.

## State laws on AI in healthcare

### Takeaway
Fast-moving patchwork. Most health-specific rules target (a) AI implying licensure, (b) disclosure of genAI clinical communications with a path to a human, (c) human review of AI clinical decisions, and (d) mental-health chatbots. A physician-reviewed, clearly disclosed design aligns with the common requirements.

### Cited Findings
- California AB 3030 (eff. Jan 1, 2025): providers using genAI for patient clinical communications must include AI disclaimer and instructions for reaching a human provider — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance). Source reports (via Sheppard Mullin/Mondaq results) an exemption where a licensed provider reviews the communication; not confirmed in fetched text — [Sheppard Mullin](https://www.sheppard.com/insights/blogs/california-passes-law-regulating-generative-ai-use-in-healthcare) (unverified)
- California AB 489 (signed Sept 2, 2025; eff. Oct 1, 2025): bars AI systems from implying licensed medical oversight via terminology, interface, or post-nominals (M.D., R.N.); boards may investigate; each term is a separate offense — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance); see also [CA Psychology Board advisory](https://psychology.ca.gov/laws_regs/ab489_advisory.pdf)
- California SB 1120 (payer utilization review requires physician decision): not covered in fetched sources; payer-focused, likely not applicable to Checkpoint. California SB 243 companion chatbot law effective Jan 1, 2026 (disclosure; minors) — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md)
- Illinois HB 1806 (WOPRA), eff. Aug 4, 2025: AI may not make independent therapeutic decisions, interact in therapeutic communication, or generate therapy recommendations without licensed professional review; up to $10,000/violation, IDFPR; exemptions for peer support and self-help. Note Manatt lists effective date as 8/1/2025 — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance); [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker) (date discrepancy)
- Nevada AB 406, eff. Jul 1, 2025: bars AI offering/programming professional mental/behavioral health care or using titles like "therapist"; civil penalties up to $15,000 per instance — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance)
- Texas SB 1188 (eff. Sept 1, 2025): practitioners using AI for diagnosis/treatment must review AI recommendations and records and remain responsible. TRAIGA HB 149 (eff. Jan 1, 2026): providers must disclose AI use in diagnosis/treatment to patients; emergencies as soon as reasonably possible; 60-day cure after AG notice — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance). Manatt describes TRAIGA mainly as a sandbox law and not health-specific, a framing difference — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker)
- Utah: Doctronic regulatory mitigation agreement (Jan 2026, 12 months, 192 medications, 30/60/90-day renewals, Division of Professional Licensing forgoes enforcement, monthly reports) — [JD Supra](https://www.jdsupra.com/legalnews/utah-approves-ai-for-prescription-1410720/). Manatt: a licensing board sought suspension, state declined — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker); a Pulse.bot item reports the medical board pushed to stop it (secondary) — [Pulse](https://www.pulse.bot/healthtech/news/utah-medical-board-pushes-to-stop-ai-prescription-renewals-2d80cf7b-aae2-478e-a287-d9955b733daa/). Utah AI Policy Act requires consumer disclosure incl. high-risk health interactions. Utah HB 452 (mental health chatbots) not verified.
- Manatt July 2026 tracker: Colorado narrowed its AI Act (signed May 2026; exempts HIPAA-covered entities and FDA-regulated devices); new Colorado chatbot law (1/1/2027) bars posing as mental health providers; Hawaii SB 3001 (7/14/2026), Vermont (6/17/2026), Maine (7/29/2026), Louisiana AI-recording notice (8/1/2026), Iowa SF 2417, Georgia, Idaho (7/1/2027), Washington, Oregon, Rhode Island (1/1/2027), Nebraska LB 525 — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker). Bill numbers for several were missing in the source.
- Delaware HB 191 reportedly bars nonhuman entities incl. AI agents from using titles like "doctor" or practicing medicine — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)
- Florida: Attorney General sued OpenAI and Altman in state court over ChatGPT safety (FDUTPA-style unfair practices; first state suit) — [WDBO/AP](https://www.wdbo.com/news/business/florida-sues-openai/ABJFAGFG7E5SRFGVA43V4KZ6UQ/). Florida chatbot bill HB 659 was pending as of Jan 2026 — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md). Manatt source shows no Florida health-AI statute. Final status of HB 659 not found.

### Inferences
- Design that satisfies the common denominator: clear "AI" labeling, no credentials implied for the AI, physician identified by real name/license, licensed in patient's state, explicit human path, no therapy/mental-health clinical output by AI (IL/NV/UT-type bans), and physician review of each clinical output (TX SB 1188, IL, NV logic).
- Checkpoint should geo-gate or restrict mental-health symptom intake in IL, NV and other bans, and watch the physician's licensure in the patient's state (telehealth licensure not covered in this assignment).

### Gaps
- Did not confirm full text, penalties, or private right of action for most statutes; SB 1120 and Utah HB 452 unverified; Colorado AI Act final section details; Florida 2026 session outcomes.

## Unauthorized practice of medicine theories

### Takeaway
Pennsylvania's May 2026 action establishes that a platform can be pursued for holding out as licensed even without delivering care. Checkpoint's mitigants are no AI credential claims and a real licensed physician.

### Cited Findings
- May 1, 2026: Pennsylvania State Board of Medicine (Dept of State) sued Character Technologies in Commonwealth Court; investigator chatted with "Emilie," a "doctor of psychiatry" character with ~45,500 interactions, which claimed a PA license and gave a fabricated number; claims under Medical Practice Act §§422.10 and 422.38; company says characters are fictional with disclaimers — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny); complaint PDF at [pa.gov](https://www.pa.gov/content/dam/copapwp-pagov/en/governor/documents/dos%20character.ai%20complaint%20marked%20accepted%2005.01.26.pdf); more at [Akin](https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/pennsylvania-files-suit-against-generative-ai-based-medical-chatbot-developer), [Troutman](https://www.troutman.com/insights/pennsylvania-targets-ai-chatbot-for-the-unauthorized-practice-of-medicine/)
- Cooley: disclaimers show knowledge and do not change device status; recommends enforcing limits through model constraints, not disclaimers — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)
- Kentucky AG sued Character Technologies (child harm); FSMB formed an AI workgroup — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)

### Inferences
- Relief sought not captured; outcome of the PA case not found as of Nov 2026.
- Checkpoint risks: corporate practice of medicine (CPOM) in many states if a non-physician company employs/controls physicians (typically solved with a friendly PC/MSO model), and state-by-state licensure of reviewing physicians. Not researched here.

### Gaps
- PA case status after May 2026; any other medical-board actions against AI platforms not found.

## Federal activity (FTC, HHS/ONC, CMS, preemption)

### Takeaway
Federal deregulation of health IT (HTI-5) and an executive push to preempt state AI laws coexist with active FTC/AG scrutiny of chatbots. Preemption did not (as far as found) displace state health-AI laws by Nov 2026.

### Cited Findings
- FTC 6(b) orders (Sept 2025) to Google, Character.AI, Meta, Snap, OpenAI on companion chatbots: monetization, data, child-harm testing, substantiation of safety claims; no findings reported as of Jan 2026 — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md); [DLA Piper](https://www.dlapiper.com/en-cl/insights/publications/2025/09/ftc-ai-chatbots)
- Dec 11, 2025 EO: DOJ AI Litigation Task Force (30 days), Commerce list of "onerous" state laws and BEAD conditions (by Mar 11, 2026), FTC policy statement on altering truthful outputs (Mar 11, 2026), FCC proceeding; legislative recommendation would preserve state child-safety laws; EO cites Colorado's AI Act — [Manatt](https://www.manatt.com/insights/newsletters/client-alert/trump-executive-order-targets-state-ai-laws-raising-questions-and-risks)
- Colorado later narrowed its law (May 2026) — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker)
- HTI-5 final rule published Oct 26, 2026 removes HTI-1 model-card/transparency requirements for DSIs in certified health IT; effective dates vary (60 days, Jan 1 2027, Jan 1 2030), DSI date unclear — [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/10/hti5-promotes-deregulatory-certification-actions). HTI-1 DSI rules apply only to certified EHR developers, so likely not directly to Checkpoint (inference).
- Cooley: December 2025 EO could challenge conflicting state laws — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)

### Gaps
- Whether Commerce list/FTC statement issued and any DOJ lawsuits: not found (sources pre-date March 2026). Federal preemption legislation status unknown. CMS rules not researched. No evidence found that the EO invalidated any state law.

## Marketing claims

### Takeaway
Little found directly on "AI doctor" claims; relevant authorities are FTC substantiation (the 6(b) covers substantiation of safety claims), AB 489, Delaware HB 191, Nevada/Illinois title bans, and FDA intended-use via marketing.

### Cited Findings
- FDA intended use looks at marketing and statements — [Cooley](https://www.cooley.com/news/insight/2026/2026-06-25-ai-chatbots-medical-claims-draw-regulatory-scrutiny)
- FTC 6(b) asks whether public safety claims are substantiated — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md)
- 42 AGs warned that sycophantic/delusional outputs may violate consumer protection law — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md)

### Inferences
- Describe the product as "physician-reviewed guidance"; avoid "AI doctor", "doctor-level", diagnosis claims; substantiate any accuracy/speed claims; name reviewing physicians accurately.

### Gaps
- No FTC Health Products Compliance Guidance or Operation AI Comply cases fetched.

## Emergency handling and liability

### Takeaway
No statute found imposing a duty on AI companies to route to 911, but litigation and AG suits allege failure to detect crisis; crisis protocols are required for companion chatbots in some new state laws.

### Cited Findings
- Colorado chatbot law (eff. 1/1/2027) requires crisis detection (among minor safeguards) — [Manatt](https://www.manatt.com/insights/newsletters/health-highlights/manatt-health-health-ai-policy-tracker)
- Senators asked FTC to examine crisis detection; lawsuits allege failure to prevent suicidal ideation incl. wrongful death claims — [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/ai-chatbots-face-rising-legal-and-legislative-scrutiny.md)
- Florida AG suit alleges ChatGPT encourages self-harm while presented as safe — [WDBO/AP](https://www.wdbo.com/news/business/florida-sues-openai/ABJFAGFG7E5SRFGVA43V4KZ6UQ/)
- TRAIGA disclosure in emergencies allowed "as soon as reasonably possible" — [Fenwick](https://www.fenwick.com/insights/publications/the-new-regulatory-reality-for-ai-in-healthcare-how-certain-states-are-reshaping-compliance)
- FDA (per DLA) treats software guiding escalation for conditions needing immediate intervention as device territory — [DLA Piper](https://www.dlapiper.com/en-pl/insights/publications/2026/01/fda-updates-its-clinical-decision-support-and-general-wellness-guidances-key-points)

### Inferences
- Emergency routing should be deterministic, pre-review, and immediate (static 911/988 message), not dependent on physician review latency; this is a design/liability choice and also the FDA-sensitive piece, so keep it generic.

### Gaps
- Raine v. OpenAI status and any court holding on duty to escalate not found; no best-practice standard (e.g., from professional bodies) retrieved.
