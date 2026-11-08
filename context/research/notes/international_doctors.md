# Legal pathways for foreign-based doctors (India, Brazil) to review US patient cases for Checkpoint (as of 2026-11-07)

Method note: about 19 tool calls; several secondary sources were only reachable via search snippets or summarized fetches. Items I could not source are in Gaps, not Findings. Primary law and commentary are labeled [PRIMARY] or [COMMENTARY]. This is research, not legal advice.

## 1. US side: can a physician licensed only abroad review or consult on a US patient's case?

### Takeaway
No state route lets a foreign-only physician independently treat or advise a US patient. The workable hook is the "consultation" exemption: many state statutes (Florida 458.303(1)(b) names physicians licensed in another state, territory, or foreign country) exempt a consultant who consults with a locally licensed physician, so a foreign doctor can plausibly act as a consultant to a US-licensed doctor of record who keeps responsibility. Whether that works is state by state, and the exemption's text is thin (e.g. "meeting" is undefined), so it is unsettled for asynchronous, commercial, high-volume use.

### Cited Findings
- [PRIMARY] Fla. Stat. 458.303(1)(b) exempts "any physician lawfully licensed in another state or territory or foreign country" when meeting "duly licensed physicians of this state in consultation". The text contains no telehealth language and does not define "meeting" or say whether the consult must be in person. — [florida.public.law 458.303](https://florida.public.law/statutes/fla._stat._458.303) (official source linked from flsenate.gov; I did not read the current flsenate.gov version directly)
- [PRIMARY] Fla. Stat. 456.47 out-of-state telehealth registration requires a license from "another state", DC, or a US possession or territory that is substantially similar, active and unencumbered, with no license-related discipline in prior 5 years. It does not mention foreign countries. So a foreign-licensed physician cannot use the registration route. — [flsenate.gov 456.47 (2025)](https://www.flsenate.gov/Laws/Statutes/2025/456.47)
- [PRIMARY] Florida 458.303(2) also exempts nurses working under direct supervision and control of a licensed physician (relevant to support staff structure, not to foreign physicians). — [florida.public.law 458.303](https://florida.public.law/statutes/fla._stat._458.303)
- [COMMENTARY] General US rule: states regulate medicine where the patient is located, so a provider needs a license in the patient's state unless an exception applies. A survey found 49 of 54 jurisdictions have some legal path for out-of-state specialists (usually infrequent or episodic second opinions); 7 set numeric limits; most tie the consult to the patient's request or to a locally licensed physician who requests or consults; 4 require physician-to-physician consults; 2 bar consults done for payment; 5 jurisdictions restrict via local license, board notice, or no commercial practice. FSMB has recommended allowing out-of-state second opinions without registration. Suggested best practice: document that the patient's local licensed physician requested the specialist. Note this survey concerns out-of-state (US) specialists, not necessarily foreign-licensed ones. — [Purview, Legal Reality of Second Opinions](https://www.purview.net/2023-licensure-rso)
- [COMMENTARY] Cleveland Clinic's virtual second opinion model is analyzed as relying on the consult exception in many (not all) state licensing laws, with some states excluded. The article does not say whether the doctors hold licenses in patient states. — [Cohen Healthcare Law](https://cohenhealthcarelaw.com/?p=1921)
- [COMMENTARY] Teleradiology precedent: licensure is commonly obtained in every state served; ACR standard requires licensure at transmitting and receiving sites and privileges at the transmitting site; some states waive special licenses when a local physician is consulting; overseas radiologists typically do preliminary reads with a US radiologist issuing the final report; malpractice must cover both locations and overseas radiologists should be named insureds; consent forms may need to disclose transmission to physicians abroad. — [AuntMinnie, international teleradiology legal ground rules](https://cdn.auntminnie.com/industry-news/article/15564284/legal-ground-rules-guide-international-teleradiology-practice)

### Inferences
- A defensible Checkpoint structure for foreign doctors is "consultant to a US-licensed doctor of record" (the US physician reviews, adopts, and signs; the foreign doctor's input is a documented consult), mirroring teleradiology preliminary read plus US final report. The patient never receives clinical advice attributed solely to the foreign doctor.
- The exemption fits worst where a state demands in-person meeting, forbids paid consults, or requires physician-to-physician requests. A consumer-initiated route may not be a "physician-requested consult" in those states. State-by-state matrix needed.
- Non-clinical roles (translation of packets, scribe-style summarization, chart abstraction) are the lowest-risk use of foreign personnel, provided no clinical judgment is exercised or communicated to the patient.

### Gaps
- Not verified: how most states define "practice of medicine" vs non-clinical support, and whether any board has opined on foreign-licensed consultants. No board opinion found.
- Not verified: the 49 of 54 survey is from a 2023 vendor white paper, not a primary source; it likely covers only US-licensed out-of-state specialists. Statutory text for states other than Florida was not pulled.
- Not found: legal structure of Teladoc Expert Medical Opinion (Cleveland Clinic/Amwell "The Clinic" was found only in snippets), Indian hospital international teleconsults, nighthawk radiology specifics.
- Whether Florida's exemption has been applied to asynchronous commercial consults: no authority found. Florida health care counsel essential.

## 2. US-licensed physicians physically located abroad (IMG US physicians in India/Brazil)

### Takeaway
Licensure follows the patient's location, so a physician holding the patient's state license can practice that state's medicine from abroad on its face, but I found no sourced board rules on practicing from outside the US.

### Cited Findings
- [COMMENTARY] Patient location generally determines which state's law applies. — [Purview](https://www.purview.net/2023-licensure-rso)
- [COMMENTARY] Teleradiology practice: malpractice coverage must apply to both the sending and interpreting locations. — [AuntMinnie](https://cdn.auntminnie.com/industry-news/article/15564284/legal-ground-rules-guide-international-teleradiology-practice)
- [PRIMARY] Brazilian CFM 2.314/2022 limits telemedicine to Brazilian territory and requires providers to be based in Brazil (see section 5), which is a separate local-law question if a US-licensed doctor sits in Brazil. — [CFM 2.314/2022 PDF](https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2022/2314_2022.pdf)

### Inferences
- A US-licensed doctor living abroad is likely the cleanest "phase 2" cohort, but local law (India/Brazil) may still treat them as practicing locally or not; also tax residency, permanent establishment and malpractice insurer territory limits matter.

### Gaps
- No sourced answer on: state board rules about physicians physically abroad, US tax treatment (foreign earned income, permanent establishment), insurer territory exclusions, and whether the physician needs an Indian or Brazilian registration. Needs US licensing counsel, tax adviser, and local counsel.

## 3. Medicare/Medicaid and insurer rules on offshore services

### Takeaway
Medicare flatly does not pay for services furnished outside the US, and Medicare Advantage plans routinely require offshore subcontractor attestations from first tier, downstream, and related entities. A health system or payer customer will probably impose offshore restrictions regardless of HIPAA.

### Cited Findings
- [PRIMARY] 42 CFR 411.9(a): "Medicare does not pay for services furnished outside the United States", with a narrow inpatient hospital exception in (b). — [eCFR 42 CFR 411.9](https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-411/subpart-A/section-411.9)
- [COMMENTARY] Medicare pays for overseas preliminary teleradiology reads because a US radiologist writes the final report; not for formal interpretations performed outside the US. — [AuntMinnie](https://cdn.auntminnie.com/industry-news/article/15564284/legal-ground-rules-guide-international-teleradiology-practice)
- [COMMENTARY] Medicare Advantage and Part D plans collect "offshore subcontractor" attestations from providers and vendors (examples from Wellcare, Johns Hopkins Health Plans, Medical Mutual, Health Net). These are plan forms, not CMS rules; I did not read them in detail. — [Wellcare attestation form](https://www.wellcare.com/-/media/pdfs/california/provider/2025/ca_care_prov_offshore_subcontracting_attestation_form_2025_r.ashx); [Johns Hopkins Health Plans offshore Q&A](https://www.hopkinsmedicine.org:443/-/media/johns-hopkins-health-plans/documents/amd/offshore_qa.pdf)

### Inferences
- Checkpoint is a consumer product and likely not billing Medicare; if it later sells to health systems or MA plans, offshore review of Medicare beneficiaries' cases would trigger attestation and likely contractual bans or prior-approval requirements.

### Gaps
- Not verified: CMS's own offshore guidance for MA/Part D (the source of the attestation requirement); Medicaid state-level offshore bans and federal match rules (my Medicaid search returned unrelated 1115 letters); OIG exclusion screening for foreign personnel; Anti-Kickback and fee-splitting issues. Healthcare regulatory counsel needed.

## 4. India: Telemedicine Guidelines, NMC, DPDP Act and Rules, AI, FEMA and tax

### Takeaway
India's Telemedicine Practice Guidelines 2020 (TPG) do not cover consultations involving doctors or patients outside India, so there is no explicit authorization or prohibition for Indian doctors giving remote opinions to US patients; the DPDP regime is notified but cross-border transfer rules are not yet in force as of the last sources I found.

### Cited Findings
- [COMMENTARY] "The Guidelines do not cover consultations involving doctors or patients outside India." Registered medical practitioners must complete a mandatory online course within 3 years of notification. Other laws (including data privacy) still apply. — [Khaitan & Co on TPG](https://khaitanco.com/thought-leaderships/Telemedicine-Practice-Guidelines)
- [COMMENTARY] DPDP Rules 2025 were notified 13 Nov 2025 in phases. Rule 15 and Section 16 (cross-border transfer) take effect in the final 18-month stage, reported as 12 or 13 May 2027 (sources differ by a day). — [AZB & Partners](https://www.azbpartners.com/bank/indias-digital-personal-data-protection-act-phased-rollout-and-key-compliance-milestones/)
- [COMMENTARY] As of an April 2026 article, MeitY proposed shortening the compliance window from 18 to 12 months (final date moved to 13 Nov 2026), and to apply cross-border restrictions for Significant Data Fiduciaries under Rules 13(4) and 15 immediately, after stakeholder talks on 23 Jan 2026. The article does not say whether this was notified. — [Legal 500 / Mondaq](https://www.legal500.com/intelligence/india/privacy/meity-plans-to-cut-short-dpdp-compliance-timeline-and-notify-cross-border-restrictions-for-sdfs)
- [COMMENTARY] Commentary on DPDP cross-border structure (negative list approach rather than blanket localization; contracts being redrafted ahead of rules). — [Mondaq: negative list](https://www.mondaq.com/india/data-protection/1764976/from-localisation-debates-to-a-negative-list-making-cross-border-data-transfers-work-under-indias-dpdp-act); [Bar & Bench](https://www.barandbench.com/columns/the-dpdp-cross-border-transfer-rules-arent-live-yet-so-why-are-contracts-being-redrafted-as-if-they-are) (snippet-level only)

### Inferences
- An Indian doctor reviewing US patients' data is processing data of non-residents; the DPDP Act's treatment of processing of non-Indian data under an outsourcing contract is a known exemption question I could not source here. Expect HIPAA/BAA contract terms to drive, with DPDP security duties for the Indian entity.

### Gaps
- Not sourced: NMC Registered Medical Practitioner (Professional Conduct) Regulations 2023 and ethics on foreign consults; whether Indian doctors may give opinions to foreign patients (silence in TPG is the only finding); India AI counselling restrictions (TPG source I fetched had no AI content; NMC position unverified); FEMA/export of services, GST zero-rating of exports, TDS and tax; whether DPDP exemption for processing of foreign residents' data applies; whether MeitY's accelerated timeline was notified by Nov 2026. Indian counsel essential.

## 5. Brazil: CFM 2.314/2022, CRM, LGPD and ANPD transfers, CFM AI rules, PL 2338

### Takeaway
CFM 2.314/2022 permits telemedicine only within Brazilian territory and requires Brazil-based providers; it is silent on foreign patients, so Brazilian doctors serving US patients sits outside the resolution (no safe harbor, ethics exposure uncertain). LGPD requires a valid transfer mechanism (ANPD standard contractual clauses mandatory since Aug 2025) for personal data sent abroad; CFM now has an AI resolution in force.

### Cited Findings
- [PRIMARY] CFM 2.314/2022 Art. 2: telemedicine "é permitida dentro do território nacional". Art. 17: providers "deverão ter sede estabelecida em território brasileiro"; individual providers must be CRM-registered in their jurisdiction. Art. 3 §7: data follows LGPD. Art. 15: explicit patient consent. Defines teleinterconsulta (Art. 7, exchange of opinions between physicians), teleconsultoria (Art. 12), telediagnóstico (Art. 8, specialist with RQE reporting at request of attending physician). No provision on patients abroad, and no AI mention. — [CFM 2.314/2022](https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2022/2314_2022.pdf)
- [COMMENTARY] ANPD Resolution CD/ANPD 19/2024: SCC adoption grace period ended 23 Aug 2025. International transfers lawful only with SCCs or another approved mechanism (adequacy, BCRs, ANPD-approved clauses); no adequacy decisions had issued at the time; SCC text must remain essentially unchanged; incident reporting to ANPD and data subjects within 3 days; applies to cloud storage and AI tools hosted abroad. Note a transfer occurs when data is sent to or accessed by an importer abroad; the exporter-in-Brazil structure matters for direction of flow. — [Mayer Brown](https://www.mayerbrown.com/pt/insights/publications/2025/08/end-of-grace-period-implementation-of-brazils-standard-contractual-clauses-in-international-transfers-of-personal-data)
- [COMMENTARY] CFM Resolution 2.454/2026 (AI in medicine) published 27 Feb 2026, in force 10 Aug 2026: physician remains fully responsible; must critically assess AI outputs; AI tools risk-classified low/medium/high with patient notification; physicians must tell patients when AI supports diagnosis or treatment and record it; delegating communication of prognosis or therapeutic decisions to AI is prohibited; prohibits AI tools lacking adequate information security. — [Mayer Brown, 2026](https://www.mayerbrown.com/pt/insights/publications/2026/03/brazilian-cfm-issues-resolution-on-the-use-of-artificial-intelligence-in-medicine); other firm alerts: [Cescon Barrieu](https://cesconbarrieu.com.br/resolucao-cfm-no-2-454-2026-regulamenta-o-uso-de-inteligencia-artificial-na-medicina/), [Demarest](https://www.demarest.com.br/cfm-publica-resolucao-que-regulamenta-o-uso-de-inteligencia-artificial-na-medicina/)
- [PRIMARY] PL 2338/2023 (AI bill): Senate plenary approved Dec 2024; sent to the Chamber of Deputies 17 Mar 2025; the Senate record shows no later step. — [Congresso Nacional page](https://www.congressonacional.leg.br/web/atividade/materias/-/materia/157233). [COMMENTARY] A May 2026 press item says the Chamber president expects a vote in 2026; I did not confirm any vote. — [Tribuna do Sertão](https://www.tribunadosertao.com.br/politica/2026/05/28/910103-camara-deve-votar-regulamentacao-da-inteligencia-artificial-ainda-este-ano-afirma-hugo-motta)

### Inferences
- If Checkpoint uses Claude to draft translations or summaries that a Brazilian doctor relies on, CFM 2.454/2026 likely applies to that doctor's conduct (disclosure and critical review), regardless of patient location.
- Because Art. 2 limits telemedicine to national territory, a Brazilian CRM doctor treating US patients is in a regulatory gray zone for CFM ethics; a consult to a US doctor (teleinterconsulta-like) is the least exposed form. This is my reading, not a sourced statement.

### Gaps
- Not sourced: whether CFM has any ruling on Brazilian doctors attending foreign patients; LGPD Art. 11 and 33 as applied to US-to-Brazil flows (LGPD arguably does not govern data of US residents processed in Brazil for a foreign controller, but I did not find a source); Brazilian tax (ISS, export of services), CRM remuneration rules; current PL 2338 status after May 2026. Brazilian counsel essential.

## 6. US data export: HIPAA, BAAs, security, cloud and Anthropic region

### Takeaway
HIPAA has no offshore-specific prohibition, but OCR says location raises risk that must be analyzed; the real constraints are BAAs, state law, and payer contracts.

### Cited Findings
- [PRIMARY/guidance] HHS FAQ: a covered entity or BA may use a cloud provider storing ePHI outside the US if it has a BAA and meets HIPAA; no offshore-specific requirements; geographic location can raise risk and complicate enforcement, so account for it in Security Rule risk analysis and management (45 CFR 164.308(a)(1)(ii)(A)-(B)). — [HHS FAQ 2083](https://www.hhs.gov/hipaa/for-professionals/faq/2083/do-the-hipaa-rules-allow-a-covered-entity-or-business-associate-to-use-a-csp-that-stores-ephi-on-servers-outside-of-the-united-states/index.html)
- [COMMENTARY] Foreign physicians accessing PHI would be workforce or subcontractor business associates; commentary on offshore BAAs and enforcement difficulties (snippet-level). — [Accountable HQ offshore BAA](https://www.accountablehq.com/post/offshore-medical-coding-vendors-business-associate-agreement-requirements)

### Inferences
- Checkpoint is likely a business associate (or a covered entity if it is the clinic); each foreign physician group needs a subcontractor BAA, enforceable audit and breach terms, and a US-law governing clause. Access-only (no storage offshore) with US-hosted data is a risk-reducing design.

### Gaps
- Not sourced: state laws restricting offshore PHI (e.g., some states for Medicaid), Anthropic region and BAA/ZDR terms for Claude, 42 CFR Part 2, state genetic/mental health laws, FTC Health Breach Notification Rule if Checkpoint is not HIPAA-covered.

## 7. Translation: accuracy, Section 1557, interpreter standards

### Takeaway
Under the 2024 Section 1557 rule, machine translation of critical text must be reviewed by a qualified human translator, and covered entities cannot rely on unqualified staff; Checkpoint's Claude translations of case packets and replies need human verification if Checkpoint or its customers are covered.

### Cited Findings
- [PRIMARY] 45 CFR 92.201(c)(3): when machine translation is used, a qualified human translator must review it if the text is critical to rights, benefits or meaningful access, if accuracy is essential, or if the source is complex, non-literal or technical. Language assistance must be free, accurate and timely (b); offer a qualified interpreter (c)(1); no reliance on unqualified staff (e)(4). — [eCFR 45 CFR 92.201](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201)

### Inferences
- Medical advice replies translated into Portuguese or Spanish by Claude fit the "accuracy essential/technical" prong, so a qualified human review step is the conservative design. A bilingual physician reviewing is likely not enough unless they meet the qualified translator definition (not verified).

### Gaps
- Not sourced: whether Section 1557 applies to Checkpoint (depends on receipt of federal financial assistance), the current status of 1557 enforcement under the present administration in 2026, Joint Commission standards, studies of machine translation error rates in clinical text.

## 8. Malpractice, jurisdiction, enforceability, standard of care

### Takeaway
I found no sourced material on judgment enforceability against Indian or Brazilian physicians; only the teleradiology practice of making sure malpractice coverage spans both sites.

### Cited Findings
- [COMMENTARY] Malpractice coverage must apply to sending and interpreting locations, and overseas readers should be named insureds. — [AuntMinnie](https://cdn.auntminnie.com/industry-news/article/15564284/legal-ground-rules-guide-international-teleradiology-practice)

### Inferences
- Structuring so the US doctor of record is the defendant of first resort (and the insured, with Checkpoint's entity contractually indemnified) avoids relying on foreign enforcement.

### Gaps
- No sources found on: US judgments in India (reciprocating-territory issue; the US is, as I recall, not a notified reciprocating territory, unverified) or Brazil (STJ homologation); Hague Service/Evidence conventions; carrier appetite for offshore consultants; standard of care for asynchronous AI-assisted review.

## 9. Recommended phased path (synthesis, my inference from the above)

### Takeaway
Phase 1 US only; phase 2 US-licensed physicians abroad and non-clinical foreign support under a US doctor of record; phase 3 foreign-licensed consultants only after state-by-state and local-law clearance.

### Cited Findings
- See sections 1 to 7 for the underlying sources: Florida 458.303(1)(b) consult exemption; 456.47 excludes foreign licenses; HHS offshore FAQ; 42 CFR 411.9; CFM 2.314 Art. 2 and 17; CFM 2.454/2026; ANPD 19/2024; DPDP Rule 15 timing; 45 CFR 92.201.

### Inferences
- Phase 1: US-licensed doctors in the patient's state (or compact licenses); US-hosted data; BAA with Anthropic/cloud; 1557 and FTC analysis.
- Phase 2a: US-licensed doctors physically abroad (check board rules, insurer territory, tax, local law). Phase 2b: foreign professionals do non-clinical work only (translation checks, packet prep) with HIPAA subcontractor BAAs, India and Brazil data-transfer terms, human translation verification.
- Phase 3: foreign-licensed physicians as documented consultants to a US doctor of record who independently reviews and signs; confine to states with a workable consult exemption; written physician-to-physician request records; no direct patient communication from the foreign doctor; block payer/Medicare/Medicaid flows; local counsel in India and Brazil sign-off on practice authority, data transfer, and tax.

### Gaps
- Everything in Phase 3 depends on state-specific statutes not pulled here and on the unsourced items above. Local lawyers essential in: each target US state (health care licensure), India (NMC, DPDP, FEMA/GST), Brazil (CFM/CRM, LGPD, tax).
