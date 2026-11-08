# Components

Framework: none. One static page (`public/index.html`) with inline CSS and vanilla JS, served by a zero-dependency Node server. No component library, no Tailwind. UI is built with a tiny `h(tag, attrs, ...kids)` DOM helper. The rules engine and synthetic data live in `public/engine.js`.

## h (DOM helper) — `public/index.html`
```js
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k)));
  return el;
}
```

## row / srcMark / stamp / val — chart row with provenance marker and ledger timestamp
```js
function val(key, value, maskLabel, extra) {
  if (value == null || value === "") return h("span", { class: "v wait" }, "Waiting for patient");
  if (viewAI && maskLabel) return h("span", { class: "v" }, h("span", { class: "masked" }, maskLabel));
  return h("span", { class: "v" }, value, extra || null);
}
function row(key, label, node, meta = {}) {
  return h("div", { class: "row", "data-k": key }, h("span", { class: "k" }, label), node,
    h("span", { class: "rmeta" }, meta.src ? srcMark(meta.src) : null, meta.at ? h("time", {}, stamp(meta.at)) : null));
}
```
```js
const SRC = { patient: ["P", "Typed by the patient into a secure field"], rules: ["R", "Set by Checkpoint's fixed rules"], ai: ["AI", "Drafted by Claude from the masked case"], clinician: ["C", "Written by the clinician"] };
function srcMark(src) { const [t, title] = SRC[src]; return h("span", { class: "src-mark " + src, title, "aria-label": title }, t); }
function stamp(ms) { return new Date(demoNow(ms)).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" }); }
```

## Action buttons with hold-to-sign — `renderActions`, `holdToSign`
```js
function renderActions() {
  const box = $("#actions"); if (!box) return;
  const ready = S.phase === "submitted" && !viewAI;
  const blocked = treatBlockers().some(b => b.hard);
  const needsVideoFirst = S.disposition === "video" && !S.videoStarted;
  const canSign = ready && !blocked && !needsVideoFirst;
  const ta = $("#draft");
  const editing = ta && !ta.readOnly;
  box.replaceChildren(...[
    S.visitType === "video" && !S.videoStarted ? h("button", { class: "approve", disabled: !ready || blocked, onclick: Doctor.video }, "Start video visit") : null,
    holdToSign(h("button", { class: (S.visitType === "video" && !S.videoStarted ? "" : "approve") + " hold", id: "signbtn", disabled: !canSign, title: blocked ? "Patient is outside Florida" : needsVideoFirst ? "Start the video visit first" : "Hold to sign, or press ⌘ Enter" },
      h("span", { class: "fill", "aria-hidden": "true" }), h("span", { class: "lbl" }, S.disposition === "video" ? "Hold to sign note and send" : "Hold to sign and send Rx"), h("kbd", {}, "⌘↵"))),
    h("button", { disabled: !ready || blocked, onclick: Doctor.edit }, editing ? "Done editing" : "Edit draft", h("kbd", {}, "E")),
    S.visitType !== "video" ? h("button", { disabled: !ready || !!S.videoStarted, onclick: Doctor.video }, S.videoStarted ? "Video started" : "Switch to video", h("kbd", {}, "V")) : null,
    h("button", { disabled: !ready, onclick: Doctor.refer }, "Refer in person", h("kbd", {}, "R"))].filter(Boolean));
}
function holdToSign(btn) {
  let timer = null;
  const cancel = () => { clearTimeout(timer); timer = null; btn.classList.remove("holding"); };
  btn.addEventListener("pointerdown", e => { if (btn.disabled || e.button !== 0) return; btn.classList.add("holding"); timer = setTimeout(() => { cancel(); Doctor.approve(); }, 1000); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => btn.addEventListener(ev, cancel));
  btn.addEventListener("click", e => { if (e.detail === 0 && !btn.disabled) Doctor.approve(); });
  return btn;
}
```

## Audit log timeline — `logBox`
```js
function logBox() {
  return h("div", { class: "log" }, h("h3", {}, "Audit log"),
    S.events.length ? h("ol", { class: "timeline" }, S.events.slice().reverse().map(e => {
      const sec = Math.max(0, Math.round((e.at - S.t0) * CLOCK_SPEED / 1000));
      return h("li", {}, h("time", { title: fmtTime(e.at) }, "+" + Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0")), h("span", {}, e.text));
    }))
      : h("div", { class: "neg" }, "Every decision Checkpoint makes is logged here."));
}
```
