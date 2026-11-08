# Checkpoint judge Q&A cheat sheet

Research summary, not legal advice. Source: Checkpoint telehealth regulation guide.

## The 20 second answer

Checkpoint does not practice medicine. The AI prepares a packet and a licensed doctor in the patient's state reviews it, signs it, and owns the advice. Doctors work through a physician-owned practice (the K Health model). We start in Florida, written review only, no prescribing, 911 routing for red flags, and consent plus pseudonymization on every case.

## Top questions and short answers

**1. Isn't this unlicensed practice, or an "AI doctor"?**
- No clinical judgment by software. A licensed physician reviews and owns the advice.
- Never use titles like "AI Doctor" or imply a license (CA AB 489; Pennsylvania v. Character.AI is about holding out as licensed).

**2. Who is liable if someone is harmed?**
- Unsettled. The signing doctor and practice carry primary risk; the platform can be exposed (negligence, ostensible agency).
- Mitigation: documented independent review, consent, clear practice branding, insurance. We cannot eliminate it.

**3. Won't doctors just rubber stamp the AI?**
- Real risk. Design answers: no quotas or timers, logged disagreements, seeded-error audits, sampling, phased rollout like Utah's Doctronic.
- We have not measured the effect yet.

**4. Corporate practice of medicine: is the doctor your employee?**
- No. Physician-owned practice plus a management company (MSO) on a flat fair-market fee, like Teladoc, K Health, Included Health.
- Florida seems permissive (thin source). Strict states (NY, TX, CA, OR, WA) need extra structure or are left out at launch.

**5. 50 states, doctors must be licensed where the patient is. How?**
- Start in Florida (asynchronous telehealth allowed). Expand through compact (IMLC) physicians.
- Hard gate: never route to a doctor not licensed in the patient's state. The compact still issues one license per state.

**6. What if it's an emergency?**
- Red-flag symptoms trigger an immediate static 911 message before any queue. Consent states this is not for emergencies.
- No statute found with a specific escalation duty, so it rests on standard of care. Our escalation recall is not yet validated.

**7. Is it HIPAA compliant?**
- We do not claim that. Consumer to Checkpoint leg is likely outside HIPAA (FTC and state law apply). After handoff to the practice, Checkpoint is likely a business associate and signs a BAA.
- Anthropic's BAA does not cover consumer chats or MCP connectors, so we use our own intake page.

**8. What do regulators actually go after in this space?**
- Privacy and subscription practices, not clinical AI: GoodRx $1.5M, BetterHelp $7.8M, Cerebral about $7M, Hims & Hers suit (July 2026, unproven).
- Our rules: unbundled consent, no ad pixels, no customer list uploads, audit trail, delete on request (except practice records).

**9. Do you need FDA clearance?**
- Unknown, and we do not claim exemption. Jan 2026 CDS guidance helps physician-facing tools but keeps consumer-facing and urgent triage software under oversight.
- Keep pre-review patient content generic. Get regulatory counsel to confirm.

**10. Do state AI laws apply?**
- Yes. We design to the strictest common denominator: AI disclosure plus a human path (CA AB 3030, TX TRAIGA), no implied license (CA AB 489), physician reviews AI output (TX SB 1188), no AI therapy (IL, NV).

**11. Can you prescribe?**
- No. No controlled substances (avoids DEA rules; telemedicine flexibilities expire Dec 31, 2026), no medication changes.

**12. Referral fees and fee splitting?**
- Florida bans split fees and the Patient Brokering Act is an all-payer criminal law. We use a flat fair-market MSO fee, a flat per-review doctor fee, and no payments to or from labs or pharmacies.

**13. OpenAI is being sued over health advice. How are you different?**
- Those suits (Turner-Scott, Wan) allege unsupervised dosing and medication advice. We never change medications, never prescribe, and a physician sits before any clinical advice.
- Cases are unresolved, so our risk is lower, not zero.

**14. Can your terms of service waive liability? Section 230?**
- Do not rely on either. No ruling found letting a ToS waiver defeat injury claims; no medical AI Section 230 ruling. AI and physician advice are first party content.

**15. India and Brazil doctors?**
- Not at launch. A doctor licensed only abroad cannot treat US patients (Florida registration excludes foreign licenses).
- Phase 2: non clinical support and US licensed doctors living abroad. Phase 3: foreign consultants under a US doctor of record, with local counsel in each country.
- India DPDP and Brazil LGPD cross border rules apply. Brazil CFM 2.314 limits telemedicine to Brazilian territory.

**16. Is AI translation safe?**
- Not alone. Human review of translated medical advice (45 CFR 92.201 if Section 1557 applies, not yet established).

**17. What evidence do you have it works?**
- None of our own yet. Nearest analog: K Health with Cedars-Sinai, 461 visits, about two thirds physician and AI agreement (vendor affiliated, expert rated, not outcomes).
- Plan: physician-adjudicated test set reporting escalation recall, agreement rate, override rate, seeded-error catch rate.

**18. Does the business work? Insurance?**
- Open question. AI exclusions are spreading in E&O and general liability policies; no reliable premium figures. Drivers: doctor review time, malpractice cost, compliance cost.
- Precedent: K Health has health system deals; Amazon Clinic and 98point6 struggled (weakly sourced).

**19. Could a sandbox protect you?**
- Utah (Doctronic) and Texas have sandboxes. They waive regulator enforcement, not private lawsuits. We would apply, not claim protection.

## Numbers and facts to have ready

- K Health: ~$900M valuation (2024 round), care via affiliated professional corporations, 48 states.
- Annals study: 461 visits, about two thirds agreement.
- Florida: telehealth occurs where the patient is (456.47); records kept 5 years (64B8-10.002); unlicensed practice is a third degree felony.
- HIPAA breach notice 60 days; FTC Health Breach Notification Rule 60 days.
- DEA telemedicine flexibilities run through Dec 31, 2026.

## Say this, never say that

- Say: "physician reviewed", "licensed in your state", "reviewed by an independent physician practice".
- Never say: "AI doctor", "HIPAA compliant" (without qualifiers), "doctor level", "FDA exempt", "legally protected by our disclaimer".

## Be honest about open items

- IMLC member count: 42 vs 44 depending on source.
- India DPDP cross border date: May 2027 vs a proposed Nov 13, 2026.
- FDA status and Florida corporate practice rules need counsel.
- Federal anti-kickback scope for cash pay is unverified.
- Prototype uses synthetic data and volunteer licensed doctors only.
