# Layouts

The page has two windows switched by a floating bottom bar: the patient's Claude-style chat (`section.chat`) and the clinician console (`section.console`). Body classes `v-patient` / `v-clinician` pick the window. The clinician console layout is a 3-zone grid built in JS: queue sidebar (`.cx-queue`), chart column (`.cx-chart`), sticky decision panel (`aside.decide`), under a sticky patient banner (`.pbanner`).

## App shell markup — `public/index.html` (body, before scripts)
```html
<body class="v-patient">




<main class="split">
  <section class="chat" aria-label="Claude conversation, demo">
    <nav class="rail" aria-label="Sidebar">
      <button aria-label="Open sidebar"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5"/><path d="M7.5 3.5v13"/></svg></button>
      <button aria-label="New chat" id="newchat"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 6.5v7M6.5 10h7"/></svg></button>
      <button aria-label="Chats"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5.5h12M4 10h12M4 14.5h8" stroke-linecap="round"/></svg></button>
      <button aria-label="Projects"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6.5a2 2 0 012-2h3l1.5 1.5H15a2 2 0 012 2v6.5a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></button>
      <span class="grow"></span>
      <span class="me" title="Maria (synthetic patient)">M</span>
    </nav>
    <div class="cmain">
      <div class="chat-head">
        <div class="ctitle" id="ctitle">New chat</div>
        <div class="head-r"><button class="sharebtn" id="topreset" title="Start a new demo chat">Reset demo</button></div>
      </div>
      <div class="thread" id="threadwrap"><div class="col" id="thread" aria-live="polite"></div></div>
      <div class="composer">
        <form id="composer">
          <textarea id="input" rows="1" autocomplete="off" placeholder="Reply to Claude..." aria-label="Message Claude"></textarea>
          <div class="crow">
            <span class="ib" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></span>
            <span class="ib" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2.5 4.5h6M11.5 4.5h2M2.5 11.5h2M7.5 11.5h6" stroke-linecap="round"/><circle cx="10" cy="4.5" r="1.5"/><circle cx="6" cy="11.5" r="1.5"/></svg></span>
            <span class="conn"><svg width="12" height="12" viewBox="0 0 20 20"><path d="M5 10.5l3.2 3.2L15 6.8" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>Checkpoint</span>
            <span class="sp"></span>
            <span class="model">Sonnet 5.5</span>
            <button class="send" aria-label="Send message"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </form>
        <div class="fine">Demo with synthetic data. Claude can make mistakes, so Checkpoint's fixed rules and a licensed clinician make the medical calls.</div>
      </div>
    </div>
  </section>

  <section class="console" aria-label="Clinician console">
    <div class="c-head">
      <div><div class="t">Clinician console</div><div class="doc" id="docline">Florida practice, 3 clinicians online</div></div>
      <div class="view" role="group" aria-label="Record view">
        <button id="viewClin" aria-pressed="true">Clinician view</button>
        <button id="viewAI" aria-pressed="false">What Claude saw</button>
      </div>
      <div class="view" role="group" aria-label="Theme">
        <button id="nightbtn" aria-pressed="false" title="Night-shift theme">Night shift</button>
      </div>
    </div>
    <div class="c-body" id="console"></div>
  </section>
</main>
<div class="viewswitch" role="group" aria-label="Switch view">
  <button id="vPatient" aria-pressed="true">Claude</button>
  <button id="vClin" aria-pressed="false">Clinician</button>
  <span class="sep" aria-hidden="true"></span>
  <button id="play" class="play" aria-pressed="false">Play demo</button>
  <button id="resetbtn">Reset</button>
  <button id="pausebtn" aria-pressed="false" disabled title="Pause or resume the Play demo">Pause</button>
</div>

```

## Clinician console layout — `renderConsole` and `queueList` (`public/index.html`)
```js
function renderConsole() {
  const root = $("#console");
  const c = Engine.clinician();
  $("#docline").textContent = c ? `Signed in as ${c.name}, ${c.cred}. ${c.license}` : "Florida practice, 3 clinicians online";
  const queue = queueList();
  if (!S.complaint) {
    root.replaceChildren(h("div", { class: "cx" }, queue, h("div", { class: "cx-main" }, h("div", { class: "c-empty" }, h("b", {}, "Inbox clear"),
      h("div", { class: "stats" }, h("span", {}, h("em", {}, "3"), " visits tonight"), h("span", {}, h("em", {}, "14 min"), " median reply"), h("span", {}, h("em", {}, "0"), " waiting")),
      h("div", {}, "When a patient's AI hands off through Checkpoint, the case builds here as they answer.")), logBox())));
    seen = new Set(); return;
  }
  const a = S.intake, ans = id => S.answers[id] ? S.answers[id].vals : null;
  const ag = a.dob ? age(a.dob.value) : null;
  const name = a.name ? a.name.value : null;
  const title = viewAI ? "[PATIENT_NAME]" : (name || "New patient");
  const sex = ans("sex") ? ans("sex")[0] : null;
  const allergy = a.allergies ? a.allergies.value : null;
  const nka = allergy && /no known/i.test(allergy);
  const red = ans("red"), pregnant = red && red.includes("Could be pregnant");
  const where = a.address ? inFlorida(a.address.value) : null;

  // ---- Patient banner (EHR style): who, safety flags, visit, clock
  const chip = (cls, text, k) => h("span", { class: "chip " + cls, "data-k": k }, text);
  const banner = h("div", { class: "pbanner" },
    h("div", { class: "who" }, h("div", { class: "avatar" }, viewAI || !name ? "?" : initials(name)),
      h("div", {}, h("h2", {}, viewAI ? h("span", { class: "masked" }, "[PATIENT_NAME]") : title),
        h("div", { class: "demo" }, [sex === "Female" ? "F" : sex === "Male" ? "M" : null, ag != null ? (viewAI ? "30 to 39 y" : ag + " y") : ans("age") ? ans("age")[0] : null,
          a.dob && !viewAI ? "DOB " + a.dob.value : null, S.caseId].filter(Boolean).join("  ·  ")))),
    h("div", { class: "chips" },
      allergy ? chip(nka || viewAI ? "" : "r", viewAI ? "[ALLERGIES]" : nka ? "NKDA" : "Allergy: " + allergy, "al" + allergy) : chip("wait", "Allergies pending", "al0"),
      sex === "Male" ? null : red ? chip(pregnant ? "r" : "", pregnant ? "Possibly pregnant" : "Not pregnant", "preg" + pregnant) : chip("wait", "Pregnancy pending", "preg0"),
      a.dob && ag == null ? chip("r", "DOB unreadable", "dobx") : null,
      where == null ? chip("wait", "Location pending", "loc0") : chip(where ? "" : "r", where ? "In Florida" : "Outside Florida", "loc" + where),
      S.visitType ? chip("", S.visitType === "video" ? "Video" + (S.videoNow ? ", now" : ", " + S.slot.replace(/^Tonight /, "")) : "Online visit (async)", "vt" + S.visitType) : null),
    h("div", { class: "clock" }, statusPill(),
      S.submittedAt ? h("div", { class: "ringrow" }, h("span", { id: "waitring", html: ringSVG() }), h("span", { id: "waitclock" }, clockText())) : h("div", {}, "Received " + fmtTime(S.t0))));

  // ---- One-line summary, written by the rules (not AI)
  const durationTxt = ans("duration") ? ans("duration")[0].toLowerCase() : null;
  const negs = [];
  ["red", "other"].forEach(id => { const q = DATA.questions.find(x => x.id === id), v = ans(id); if (v) q.options.forEach(o => { if (!o.none && !v.includes(o.label) && !(sex === "Male" && o.neg === "pregnancy")) negs.push(o.neg); }); });
  const who = (ag != null && !viewAI ? ag + "-year-old " : "") + (sex === "Male" ? "man" : sex === "Female" ? "woman" : "patient");
  const summaryTxt = `${who.charAt(0).toUpperCase() + who.slice(1)} with burning on urination${durationTxt ? " for " + durationTxt : ""}.` +
    (S.red.length ? ` Reports ${S.red.join(", ").toLowerCase()}.` : negs.length ? ` Denies ${negs.slice(0, 5).join(", ")}.` : "") +
    (ans("recurrent") ? ` ${ans("recurrent")[0] === "None" ? "No" : ans("recurrent")[0]} UTIs in the past 12 months.` : "") +
    (S.caution.length ? ` Needs review: ${S.caution.join(", ").toLowerCase()}.` : "");
  const verdict = S.disposition === "async" ? h("div", { class: "verdict g" }, "Meets " + DATA.protocol.id + " criteria for an online visit")
    : S.disposition === "video" ? h("div", { class: "verdict a" }, "Eligible, video visit required")
    : S.disposition === "in_person" ? h("div", { class: "verdict r" }, "Red flag. Sent to in-person care, no case created")
    : h("div", { class: "verdict" }, "Screener in progress");
  const summary = h("div", { class: "card", "data-k": "sum" + Object.keys(S.answers).length },
    h("h3", {}, "Summary ", srcMark("rules"), h("span", { class: "src" }, "written by Checkpoint's rules, not AI")),
    h("p", { class: "hpi" }, summaryTxt), verdict,
    h("div", { class: "quote" }, h("span", { class: "k" }, "Patient wrote "), "“" + S.complaint + "”"));

  // ---- Protocol checklist (inclusion and exclusion criteria)
  const crit = (label, state, k) => h("li", { class: "crit " + state, "data-k": "cr_" + k + state }, h("span", { class: "mark" }, state === "ok" ? "✓" : state === "bad" ? "✗" : state === "warn" ? "!" : "·"), label);
  const has = (id, label) => ans(id) ? (ans(id).includes(label) ? "bad" : "ok") : "wait";
  const checklist = h("div", { class: "card" },
    h("h3", {}, "Protocol " + DATA.protocol.id + " checklist ", h("span", { class: "src" }, DATA.protocol.name)),
    h("ul", { class: "crits" },
      crit("Female", sex ? (sex === "Female" ? "ok" : "warn") : "wait", "sex"),
      crit("Age 18 to 64", ans("age") ? (ans("age")[0] === "18 to 64" ? "ok" : "warn") : "wait", "age"),
      crit("No fever or chills", has("red", "Fever of 100.4°F or chills"), "fev"),
      crit("No flank or back pain", has("red", "Pain in your back or side"), "fl"),
      crit("No vomiting", has("red", "Vomiting"), "vo"),
      sex === "Male" ? crit("Not pregnant (not applicable)", "wait", "pr") : crit("Not pregnant", has("red", "Could be pregnant"), "pr"),
      crit("No visible blood", has("red", "Blood in your urine"), "bl"),
      crit("Symptoms 7 days or less", ans("duration") ? (ans("duration")[0] === "More than 7 days" ? "warn" : "ok") : "wait", "du"),
      crit("Fewer than 3 UTIs a year", ans("recurrent") ? (ans("recurrent")[0] === "3 or more" ? "warn" : "ok") : "wait", "re"),
      crit("No complicating factors", ans("other") ? (ans("other").some(v => v !== "None of these") ? "warn" : "ok") : "wait", "ot"),
      crit("In Florida now (license state)", where == null ? "wait" : where ? "ok" : "bad", "fl_loc"),
      crit(a.dob && ag == null ? "Birth date unreadable" : "Birth date matches age answer", a.dob && ag == null ? "warn" : ag == null ? "wait" : (ag >= 18 && ag <= 64) === (ans("age") && ans("age")[0] === "18 to 64") ? "ok" : "warn", "id")));

  // ---- Screener answers, compact
  const screener = h("details", { class: "card fold", open: true }, h("summary", {}, h("h3", {}, "Screener answers ", h("span", { class: "src" }, DATA.protocol.version))),
    h("table", { class: "scr" }, DATA.questions.map(q => {
      const v = ans(q.id);
      return h("tr", { "data-k": "q_" + q.id + (v ? "_done" : "") }, h("td", {}, q.short), h("td", {}, v ? v.join(", ") : h("span", { class: "dim" }, "Not asked yet")),
        h("td", { class: "rmeta" }, v ? [srcMark("patient"), h("time", {}, stamp(S.answers[q.id].at))] : null));
    })));

  // ---- Chart: meds, pharmacy, contact
  const pharmacy = a.pharmacy ? a.pharmacy.value : null;
  const chart = h("div", { class: "card" }, h("h3", {}, "Chart"),
    row("meds" + !!a.meds, "Medications", val("meds", a.meds && a.meds.value, "[MEDICATIONS]"), a.meds ? { src: "patient", at: a.meds.at } : {}),
    row("allergies" + !!a.allergies, "Allergies", val("allergies", allergy, "[ALLERGIES]"), a.allergies ? { src: "patient", at: a.allergies.at } : {}),
    row("pharmacy" + !!a.pharmacy, "Pharmacy", val("pharmacy", pharmacy, "[PHARMACY]"), a.pharmacy ? { src: "patient", at: a.pharmacy.at } : {}),
    row("address" + !!a.address, "Location now", val("address", a.address && a.address.value, "[ADDRESS]"), a.address ? { src: "patient", at: a.address.at } : {}),
    row("phone" + !!a.phone, "Mobile", val("phone", a.phone && a.phone.value, "[PHONE]"), a.phone ? { src: "patient", at: a.phone.at } : {}),
    row("c" + !!S.consents, "Consents", val("c", S.consents ? "Telehealth, AI disclosure, share with practice" + (S.consents.followup ? ", 72-hour check-in" : "") + ". Signed " + fmtTime(S.consents.at) : null)),
    row("card" + !!S.consents, "Payment", val("card", S.consents ? "$" + Engine.price() + " held on test card 4242. You're paid $" + (S.visitType === "video" ? 30 : 20) + " flat." : null)));

  // ---- Decision panel: order, message, sign
  let decide;
  if (S.disposition === "in_person") {
    decide = h("aside", { class: "decide" }, h("div", { class: "card stop" }, h("h3", {}, "No action needed"),
      h("p", {}, "Checkpoint routed this patient to in-person care before any personal details were collected. Nothing was sent to you to treat."),
      h("p", { class: "neg" }, "Reason: " + S.red.join(", ") + ".")));
  } else {
    const p = planLines(), nitro = p.drug === "nitrofurantoin";
    const blockers = treatBlockers();
    const stops = blockers.length ? h("div", { class: "card stop", "data-k": "blk" + blockers.map(b => b.id).join("") },
      h("h3", {}, blockers.some(b => b.hard) ? "Can't treat yet" : "Before you sign"),
      blockers.map(b => h("p", { class: b.hard ? "hard" : "" }, (b.hard ? "✗ " : "! ") + b.text))) : null;
    const order = S.disposition === "video" ? h("div", { class: "card rxcard", "data-k": "rxnone" },
      h("h3", {}, "Order ", h("span", { class: "src" }, "not pre-filled")),
      h("div", { class: "neg" }, "This patient is outside " + DATA.protocol.id + " (" + S.caution.join(", ").toLowerCase().replace(/outside protocol: /g, "") + "). Checkpoint doesn't suggest a medicine; you choose one, if any, after the video visit."))
    : h("div", { class: "card rxcard", "data-k": "rx" + p.drug + !!pharmacy },
      h("h3", {}, "Order ", h("span", { class: "src" }, "protocol default, you can change it")),
      h("div", { class: "dx" }, h("span", { class: "k" }, "Dx "), p.dx),
      h("div", { class: "rxline" }, h("span", { class: "rxsym", "aria-hidden": "true" }, "℞"), h("span", { class: "wm", "aria-hidden": "true" }, "SIMULATED"), h("b", {}, nitro ? "Nitrofurantoin mono/macro 100 mg capsule" : "Fosfomycin 3 g oral granules"),
        h("div", {}, nitro ? "Sig: 1 capsule by mouth twice daily for 5 days" : "Sig: dissolve 1 packet in water, take once"),
        h("div", { class: "neg" }, nitro ? "Disp: 10 capsules  ·  Refills: 0" : "Disp: 1 packet  ·  Refills: 0")),
      h("div", { class: "checks" },
        h("span", { class: allergy ? "ok" : "wait" }, allergy ? (nitro ? "✓ No allergy conflict" : "✓ Switched for nitrofurantoin allergy") : "· Allergy check pending"),
        h("span", { class: pregnant ? "bad" : red ? "ok" : "wait" }, pregnant ? "✗ Pregnancy" : red ? "✓ Not pregnant" : "· Pregnancy pending"),
        h("span", { class: "ok" }, "✓ Not a controlled substance")),
      h("div", { class: "neg" }, "To: " + (pharmacy ? (viewAI ? "[PHARMACY]" : pharmacy) : "pharmacy pending") + ". e-Prescribing simulated in this demo. " + p.alt + "."));
    const msg = h("div", { class: "card draftwrap", "data-k": "draft" + !!S.submittedAt + (S.draftStatus || "") },
      h("h3", {}, "Message to patient ", S.draftStatus === "claude" ? srcMark("ai") : srcMark("rules"), h("span", { class: "src ai" }, S.draftStatus === "claude" ? "drafted by Claude, review before signing" : "protocol template")),
      S.submittedAt ? [
        h("textarea", { id: "draft", readonly: true, "aria-label": "Draft reply to patient" }, viewAI ? maskDraft(S.signed && !S.signed.video && !S.signed.refer ? S.signed.text : S.draft) : (S.signed && !S.signed.video && !S.signed.refer ? S.signed.text : S.draft)),
        h("div", { class: "neg" }, S.draftStatus === "drafting" ? "Claude is drafting from the masked case. Template shown meanwhile." : "Claude never saw the patient's name or details; Checkpoint filled them in. You sign, Claude doesn't.")
      ] : h("div", { class: "neg" }, "The draft appears when the patient sends the case."));
    const signedBits = [S.signed && S.signed.diff && S.signed.diff.changed ? h("div", { class: "card diffcard" },
        h("h3", {}, S.signed.diff.changed + " word" + (S.signed.diff.changed > 1 ? "s" : "") + " changed by " + c.short, srcMark("clinician")),
        h("p", { class: "diff" }, S.signed.diff.parts.map(([op, w]) => op === "=" ? w : h(op === "+" ? "ins" : "del", {}, w)))) : null,
      S.signed ? (S.signed.refer || S.signed.video ? h("div", { class: "signed" }, S.signed.video ? "Video visit started " + fmtTime(S.signed.at) + "." : "Referred to in-person care " + fmtTime(S.signed.at) + ". Patient not charged.")
        : h("div", { class: "sigstamp" }, h("div", { class: "t" }, "Signed"), h("div", { class: "nm" }, c.name + ", " + c.cred),
            h("div", { class: "mono" }, c.license + "  ·  " + stamp(S.signed.at)),
            h("div", { class: "sub" }, S.disposition === "async" ? "e-Prescription sent (simulated)" : "Note signed, message sent"))) : null];
    decide = h("aside", { class: "decide" }, S.signed ? [signedBits[1], signedBits[0]] : null, stops, order, msg, S.signed ? null : h("div", { class: "actions", id: "actions" }));
  }

  const mainCol = S.disposition === "in_person"
    ? [summary, checklist, h("div", { class: "card" }, h("h3", {}, "Patient details"), h("div", { class: "neg" }, "None collected. Checkpoint stops before asking for identity when a red flag appears."))]
    : [summary, checklist, chart, screener];
  root.replaceChildren(h("div", { class: "cx" }, queue,
    h("div", { class: "cx-main" }, banner, h("div", { class: "cx-cols" }, h("div", { class: "cx-chart" }, mainCol, logBox()), decide),
      h("div", { class: "foot" }, "All patients, clinicians, licenses and pharmacies here are synthetic. Prescriptions are simulated."))));
  if (S.disposition !== "in_person") renderActions();

  // highlight anything new
  const now = new Set();
  root.querySelectorAll("[data-k]").forEach(el => {
    const k = el.dataset.k; now.add(k);
    if (seen.size && !seen.has(k) && !/false$|^q_[a-z]+$|c_wait|0$|wait$/.test(k)) el.classList.add("flash");
  });
  seen = now;
}
function queueList() {
  const mine = S.complaint ? h("button", { class: "qi active" },
    h("div", { class: "top" }, h("span", { class: "id" }, S.caseId), h("span", { class: "wt" }, S.submittedAt && !S.answeredAt ? waitShort() : "")),
    h("b", {}, S.disposition === "in_person" ? "Routed in person" : "Painful urination"),
    h("div", { class: "meta" }, statusText(), S.visitType ? h("span", { class: "tag" }, S.visitType === "video" ? "Video" : "Online") : null)) : null;
  return h("nav", { class: "cx-queue", "aria-label": "Visit queue" },
    h("div", { class: "qh" }, "Queue", h("span", {}, (S.complaint ? 1 : 0) + " waiting")),
    mine, DATA.queue.map(q => h("div", { class: "qi" }, h("div", { class: "top" }, h("span", { class: "id" }, q.id)), h("b", {}, q.what), h("div", { class: "meta" }, q.status))));
}
```
