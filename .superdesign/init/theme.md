# Theme

## Part 1 — Token summary
Fonts: chat uses Inter (UI) + Source Serif 4 (Claude's replies); console uses IBM Plex Sans + IBM Plex Mono (ids, timestamps). Signature uses the serif in italic.

Console palette (light): bg #EBEFF1, panel #FFFFFF, ink #13191C, muted #5B6970, line #D7DEE2, soft #F5F7F8.
Status: green #1C5741 (ink #14402F, soft #E1EFE7) = action/approved; red #B3372A (soft #F9E6E2) = hazards only; amber #8A5A00 (soft #F7EDD6) = review/late.
Chat palette: bg #FAF9F5, ink #141413, muted #73726C, line #E8E6DC, accent #D97757 (Claude orange), user bubble #F0EEE6.
Night shift (console only): bg #0E1416, panel #151D20, ink #E3EAEC, muted #8B9AA0, line #26333A, green #5FBF93, red #FF8A7A, amber #F2B84B.
Type scale (console): section labels 10.5px uppercase letter-spaced .08em; body 13.5px; patient name 19px/600; summary 15px. Tabular numerals everywhere.
Radius: cards 8px, chips 6px, buttons 8px. No shadows on cards (hairline borders). Spacing: 12px gaps between cards, 12–16px card padding.
Design rules: no gradients, no glow, no emoji; color only where it means something (green = act, red = safety stop, amber = review).

## Part 2 — Raw CSS
```css
:root{
  --bar:#0F2E24; --bar-ink:#E6EFEA; --bar-muted:#93ADA2;
  --chat-bg:#FAF9F5; --chat-ink:#141413; --chat-muted:#73726C; --chat-line:#E8E6DC; --user-bubble:#F0EEE6; --rail:#F5F4EE; --accent:#D97757; --accent-ink:#C6613F;
  --c-bg:#EBEFF1; --c-panel:#FFFFFF; --c-ink:#13191C; --c-muted:#5B6970; --c-line:#D7DEE2; --c-soft:#F5F7F8;
  --green:#1C5741; --green-ink:#14402F; --green-soft:#E1EFE7;
  --red:#B3372A; --red-soft:#F9E6E2;
  --amber:#8A5A00; --amber-soft:#F7EDD6;
  --chat-font:"Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
  --serif:"Source Serif 4", ui-serif, Georgia, Cambria, serif;
  --c-font:"IBM Plex Sans", system-ui, -apple-system, Segoe UI, sans-serif;
  --mono:"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
```
```css
/* ---------- CONSOLE LAYOUT: queue | chart | decision ---------- */
.cx{display:grid;grid-template-columns:220px minmax(0,1fr);gap:16px;align-items:start}
.cx-queue{position:sticky;top:0;display:flex;flex-direction:column;gap:6px}
.cx-queue .qh{display:flex;justify-content:space-between;font-size:12px;font-weight:600;color:var(--c-muted);text-transform:uppercase;letter-spacing:.04em;padding:2px 4px 4px}
.cx-queue .qh span{text-transform:none;letter-spacing:0;font-weight:500}
.qi{display:block;text-align:left;width:100%;background:var(--c-panel);border:1px solid var(--c-line);border-radius:8px;padding:9px 11px;font:inherit;font-size:12.5px;color:var(--c-muted)}
.qi.active{border-color:var(--green);box-shadow:inset 3px 0 0 var(--green);background:#fff}
.qi .top{display:flex;justify-content:space-between}
.qi .id{font-family:var(--mono);font-size:11.5px}
.qi .wt{font-size:11.5px;color:var(--amber);font-weight:600}
.qi b{display:block;color:var(--c-ink);font-weight:600;font-size:13.5px;margin:2px 0}
.qi .meta{display:flex;justify-content:space-between;gap:6px}
.qi .tag{font-size:11px;border:1px solid var(--c-line);border-radius:5px;padding:0 5px;color:var(--c-ink)}
.cx-main{min-width:0}
.pbanner{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;background:var(--c-panel);border:1px solid var(--c-line);border-radius:10px;padding:12px 16px;margin-bottom:12px;position:sticky;top:0;z-index:2}
.pbanner .who{display:flex;gap:12px;align-items:center}
.pbanner h2{margin:0;font-size:19px;font-weight:600}
.pbanner .demo{color:var(--c-muted);font-size:12.5px;margin-top:2px;font-family:var(--mono)}
.pbanner .chips{display:flex;flex-wrap:wrap;gap:6px}
.pbanner .clock{text-align:right;font-size:12px;color:var(--c-muted);display:grid;gap:4px;justify-items:end}
.chip{font-size:12px;font-weight:500;padding:3px 9px;border-radius:6px;background:var(--c-soft);border:1px solid var(--c-line);color:var(--c-muted);white-space:nowrap}
.chip.g{background:var(--green-soft);color:var(--green-ink);border-color:#BFD9CB}
.chip.r{background:var(--red-soft);color:var(--red);border-color:#EDC4BC;font-weight:600}
.chip.b{background:#EAF0F7;color:#24466B;border-color:#C9D7E8}
.cx-cols{display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:12px;align-items:start}
.cx-chart{display:grid;gap:12px;min-width:0}
.card{background:var(--c-panel);border:1px solid var(--c-line);border-radius:10px;padding:13px 16px}
.card h3{margin:0 0 8px;font-size:13px;font-weight:600;color:var(--c-ink);display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.card h3 .src{font-weight:400;color:var(--c-muted);font-size:12px}
.card h3 .src.ai{color:var(--accent-ink)}
.hpi{margin:0 0 8px;font-size:15px;line-height:1.5}
.verdict{display:inline-block;font-size:13.5px;font-weight:600;padding:5px 10px;border-radius:7px;background:var(--c-soft);color:var(--c-muted);margin-bottom:10px}
.verdict.g{background:var(--green-soft);color:var(--green-ink)}.verdict.a{background:var(--amber-soft);color:var(--amber)}.verdict.r{background:var(--red-soft);color:var(--red)}
.card .quote{font-size:13.5px}
.card .quote .k,.rxcard .k{color:var(--c-muted);font-size:12px}
.crits{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;font-size:13.5px}
.crit{display:flex;gap:8px;align-items:center;padding:3px 4px;border-radius:5px}
.crit .mark{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;flex:none;background:var(--c-soft);color:#9AA6AC}
.crit.ok .mark{background:var(--green-soft);color:var(--green)}
.crit.bad .mark{background:var(--red-soft);color:var(--red)}.crit.bad{color:var(--red);font-weight:600}
.crit.warn .mark{background:var(--amber-soft);color:var(--amber)}.crit.warn{color:var(--amber);font-weight:600}
.crit.wait{color:#9AA6AC}
details.fold summary{cursor:pointer;list-style:none}
details.fold summary h3{margin:0}
details.fold[open] summary h3{margin-bottom:8px}
.decide{position:sticky;top:76px;display:grid;gap:12px;max-height:calc(100vh - 150px);overflow-y:auto;overscroll-behavior:contain;padding-bottom:4px}
.rxcard .dx{font-size:13px;margin-bottom:8px}
.rxline{border:1px solid var(--c-line);border-radius:8px;padding:9px 11px;background:#FBFCFC;font-size:13.5px;line-height:1.5}
.rxline b{display:block;font-size:14px}
.rxcard .checks{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:12.5px;margin:8px 0 2px}
.rxcard .checks .ok{color:var(--green)}.rxcard .checks .bad{color:var(--red);font-weight:600}.rxcard .checks .wait{color:#9AA6AC}
.decide .actions{padding:0}
.decide .actions .approve{flex:1 1 100%;padding:11px 14px;font-size:15px}
.decide .signed{border-radius:10px;border:1px solid #BFD9CB}
.card.stop{border-color:#EDC4BC;background:#FFF8F6}
.card.stop p{margin:0 0 6px;font-size:14px;line-height:1.5}
.card.stop p.hard{color:var(--red);font-weight:600}
.card.stop:has(.hard){border-color:var(--red)}
.cx .log{margin-top:0}
@media (max-width:1180px){.cx{grid-template-columns:1fr}.cx-queue{position:static;flex-direction:row;overflow-x:auto}.qi{min-width:180px}.cx-queue .qh{display:none}}
@media (max-width:1020px){.cx-cols{grid-template-columns:1fr}.decide{position:static}.crits{grid-template-columns:1fr}.pbanner{grid-template-columns:1fr;position:static}.pbanner .clock{justify-items:start;text-align:left}}

/* ---------- CONSOLE ---------- */

.console{font-family:var(--c-font);color:var(--c-ink);display:flex;flex-direction:column;min-height:0;height:100%;overflow:hidden}
.c-head{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--c-panel);border-bottom:1px solid var(--c-line);gap:12px;flex-wrap:wrap}
.c-head .t{font-weight:600;font-size:15px}
.c-head .doc{color:var(--c-muted);font-size:13px}
.view{display:inline-flex;border:1px solid var(--c-line);border-radius:7px;overflow:hidden;font-size:13px}
.view button{border:0;background:#fff;color:var(--c-muted);padding:6px 11px}
.view button[aria-pressed="true"]{background:var(--c-ink);color:#fff}
.c-body{flex:1;overflow-y:auto;padding:16px 20px 24px}
.queue{display:flex;gap:8px;margin-bottom:14px;overflow-x:auto}
.q{flex:none;background:var(--c-panel);border:1px solid var(--c-line);border-radius:8px;padding:8px 12px;font-size:12.5px;color:var(--c-muted);min-width:170px}
.q b{display:block;color:var(--c-ink);font-weight:500;font-size:13px}
.q.active{border-color:var(--green);box-shadow:inset 3px 0 0 var(--green)}
.q .id{font-family:var(--mono);font-size:11.5px}
.case{background:var(--c-panel);border:1px solid var(--c-line);border-radius:10px}
.case-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding:16px 18px;border-bottom:1px solid var(--c-line)}
.case-top h2{margin:0;font-size:21px;font-weight:600}
.case-top .demo{color:var(--c-muted);font-size:13.5px;margin-top:3px}
.case-top .right{text-align:right;font-size:12.5px;color:var(--c-muted);line-height:1.6}
.case-top .id{font-family:var(--mono);font-size:12px}
.pill{display:inline-block;font-size:12px;font-weight:500;padding:3px 9px;border-radius:999px;background:var(--c-soft);color:var(--c-muted);border:1px solid var(--c-line)}
.pill.g{background:var(--green-soft);color:var(--green-ink);border-color:#BFD9CB}
.pill.r{background:var(--red-soft);color:var(--red);border-color:#EDC4BC}
.pill.a{background:var(--amber-soft);color:var(--amber);border-color:#E7D2A6}
.grid{display:grid;grid-template-columns:1fr 1fr}
@media (max-width:1300px){.grid{grid-template-columns:1fr}}
.sec{padding:14px 18px;border-bottom:1px solid var(--c-line)}
.grid .sec:nth-child(odd){border-right:1px solid var(--c-line)}
@media (max-width:1300px){.grid .sec:nth-child(odd){border-right:0}}
.sec.full{grid-column:1 / -1;border-right:0!important}
.sec h3{margin:0 0 8px;font-size:13px;font-weight:600;color:var(--c-muted)}
.row{display:grid;grid-template-columns:132px 1fr;gap:10px;padding:5px 6px;margin:0 -6px;border-radius:5px;font-size:14px;line-height:1.4}
.row .k{color:var(--c-muted);font-size:13px}
.row .v.wait{color:#9AA6AC}
.row .v .ok{color:var(--green);font-size:12.5px;margin-left:6px;white-space:nowrap}
.row .v .bad{color:var(--red);font-size:12.5px;margin-left:6px}
.masked{font-family:var(--mono);font-size:12.5px;background:#EEF1F3;border-radius:4px;padding:1px 6px;color:#3B4A52}
.flash{animation:flash 1.6s ease-out}
@keyframes flash{0%{background:#CFEBDC}100%{background:transparent}}
table.scr{width:100%;border-collapse:collapse;font-size:13.5px}
table.scr td{padding:6px 6px;border-top:1px solid #EDF0F2;vertical-align:top}
table.scr tr:first-child td{border-top:0}
table.scr td:first-child{color:var(--c-muted);width:34%}
table.scr td:last-child{text-align:right;width:84px}
.neg{font-size:13px;color:var(--c-muted);margin-top:8px;line-height:1.45}
.dispo{font-size:16px;font-weight:600;margin:2px 0 4px}
.dispo.g{color:var(--green)}.dispo.r{color:var(--red)}.dispo.a{color:var(--amber)}
.quote{font-size:14px;line-height:1.5;border-left:3px solid var(--c-line);padding-left:10px;color:#2A3439}
.draftwrap textarea{width:100%;min-height:128px;border:1px solid var(--c-line);border-radius:8px;padding:10px 12px;font:inherit;font-size:14px;line-height:1.5;resize:vertical;background:var(--c-soft);color:var(--c-ink)}
.draftwrap textarea:not([readonly]){background:#fff;border-color:var(--green)}
.plan{font-size:13.5px;line-height:1.55;margin-top:10px}
.plan b{font-weight:600}
.sim{font-size:12px;color:var(--amber)}
.actions{display:flex;gap:8px;flex-wrap:wrap;padding:14px 18px}
.actions button{border:1px solid var(--c-line);background:#fff;color:var(--c-ink);border-radius:8px;padding:9px 14px;font-size:14px;font-weight:500}
.actions .approve{background:var(--green);border-color:var(--green);color:#fff}
.actions button:disabled{opacity:.4;cursor:not-allowed}
.signed{padding:12px 18px;font-size:14px;color:var(--green-ink);background:var(--green-soft);border-top:1px solid #BFD9CB}
.log{margin-top:14px;background:var(--c-panel);border:1px solid var(--c-line);border-radius:10px;padding:12px 18px}
.log h3{margin:0 0 6px;font-size:13px;font-weight:600;color:var(--c-muted)}
.log ol{list-style:none;margin:0;padding:0;font-size:13px}
.log li{display:grid;grid-template-columns:70px 1fr;gap:10px;padding:4px 0;border-top:1px solid #F0F2F4}
.log li:first-child{border-top:0}
.log time{font-family:var(--mono);font-size:12px;color:var(--c-muted)}
.c-empty{background:var(--c-panel);border:1px dashed var(--c-line);border-radius:10px;padding:48px 28px;text-align:center;color:var(--c-muted);line-height:1.6}
.c-empty b{display:block;color:var(--c-ink);font-size:17px;font-weight:500;margin-bottom:4px}
.foot{font-size:11.5px;color:var(--c-muted);margin-top:12px}
/* ---------- CONSOLE POLISH: restraint, ledger, provenance, signing ---------- */
.console{font-variant-numeric:tabular-nums}
.card{border-radius:8px;box-shadow:none;padding:12px 14px}
.card h3{font-size:10.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--c-muted);align-items:center}
.card h3 .src{text-transform:none;letter-spacing:0;font-size:11.5px}
.cx-queue .qh{font-size:10.5px;letter-spacing:.08em}
.row{font-size:13.5px;grid-template-columns:120px 1fr auto;align-items:baseline}
.row .k{font-size:12.5px}
.rmeta,table.scr td.rmeta{display:inline-flex;gap:6px;align-items:center;justify-content:flex-end;white-space:nowrap}
.rmeta time{font-family:var(--mono);font-size:11px;color:var(--c-muted);opacity:.75}
table.scr td.rmeta{width:118px}
table.scr td:last-child{text-align:right}
.dim{color:#9AA6AC}
.src-mark{display:inline-grid;place-items:center;min-width:17px;height:15px;padding:0 3px;border-radius:3px;font:600 9.5px/1 var(--mono);letter-spacing:.02em;border:1px solid var(--c-line);color:var(--c-muted);background:var(--c-panel);cursor:help}
.src-mark.ai{color:var(--accent-ink);border-color:#E9C6B7}
.src-mark.rules{color:var(--green);border-color:#BFD9CB}
.src-mark.clinician{color:#24466B;border-color:#C9D7E8}
/* quiet chips: grey unless it is a hazard */
.chip{background:transparent;border-color:var(--c-line);color:var(--c-ink);font-weight:500}
.chip.wait{color:#9AA6AC;border-style:dashed}
.chip.r{background:var(--red-soft);color:var(--red);border-color:#EDC4BC}
.ringrow{display:inline-flex;gap:7px;align-items:center;font-family:var(--mono);font-size:11.5px}
.verdict{font-size:12.5px;padding:3px 9px;border-radius:5px;display:inline-flex;gap:6px;align-items:center}
.verdict::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
/* black-bar redaction in "What Claude saw" */
.masked{background:#111;color:#fff;border-radius:2px;padding:1px 7px;font-size:11px;letter-spacing:.02em;animation:redact .45s cubic-bezier(.2,.7,.2,1) both}
@keyframes redact{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
/* prescription pad */
.rxline{position:relative;overflow:hidden;padding:12px 12px 10px 44px;background:var(--c-panel);border:1px solid var(--c-line);
  background-image:radial-gradient(circle at 6px -2px,var(--c-bg) 4px,transparent 4.5px);background-size:14px 8px;background-repeat:repeat-x;background-position:0 0}
.rxsym{position:absolute;left:12px;top:10px;font:600 24px/1 var(--serif);color:var(--c-ink)}
.rxline .wm{position:absolute;right:-8px;bottom:6px;font:700 11px/1 var(--mono);letter-spacing:.3em;color:var(--red);opacity:.22;transform:rotate(-8deg)}
/* actions: hold to sign, shortcut hints */
.actions button{display:inline-flex;align-items:center;gap:8px;justify-content:center}
.actions kbd{font:500 10.5px/1 var(--mono);padding:2px 5px;border-radius:4px;border:1px solid currentColor;opacity:.55}
.actions .hold{position:relative;overflow:hidden}
.actions .hold .fill{position:absolute;inset:0;background:rgba(255,255,255,.22);transform:scaleX(0);transform-origin:left}
.actions .hold.holding .fill{transform:scaleX(1);transition:transform 1s linear}
.actions .hold .lbl,.actions .hold kbd{position:relative}
.sigstamp{border:2px solid var(--green);border-radius:8px;padding:10px 14px;color:var(--green-ink);background:var(--c-panel);transform:rotate(-1.2deg);animation:stamp .35s cubic-bezier(.2,1.4,.4,1) both}
.sigstamp .t{font:700 11px/1 var(--mono);letter-spacing:.28em;text-transform:uppercase;margin-bottom:6px}
.sigstamp .nm{font-family:var(--serif);font-style:italic;font-size:19px}
.sigstamp .mono{font:11.5px var(--mono);margin-top:2px}
.sigstamp .sub{font-size:12px;margin-top:6px;color:var(--c-muted)}
@keyframes stamp{from{opacity:0;transform:rotate(-1.2deg) scale(1.25)}to{opacity:1;transform:rotate(-1.2deg) scale(1)}}
.diff{margin:0;font-size:13.5px;line-height:1.6}
.diff del{color:var(--red);text-decoration-thickness:1.5px;background:var(--red-soft)}
.diff ins{color:var(--green-ink);text-decoration:none;background:var(--green-soft);border-bottom:1.5px solid var(--green)}
/* audit log as a timeline */
.timeline{position:relative}
.timeline li{grid-template-columns:52px 1fr;border-top:0!important;position:relative;padding:5px 0 5px 0}
.timeline li::before{content:"";position:absolute;left:61px;top:11px;width:7px;height:7px;border-radius:50%;background:var(--c-panel);border:1.5px solid var(--green)}
.timeline li::after{content:"";position:absolute;left:64.5px;top:20px;bottom:-6px;width:1px;background:var(--c-line)}
.timeline li:last-child::after{display:none}
.timeline li span{padding-left:22px}
/* empty inbox */
.c-empty .stats{display:flex;gap:22px;justify-content:center;margin:6px 0 10px;font-size:13px}
.c-empty .stats em{font-style:normal;font-weight:600;color:var(--c-ink);font-family:var(--mono)}
/* night shift */
body.night{--c-bg:#0E1416;--c-panel:#151D20;--c-ink:#E3EAEC;--c-muted:#8B9AA0;--c-line:#26333A;--c-soft:#1B2529;
  --green:#5FBF93;--green-ink:#9FE0C0;--green-soft:#173027;--red:#FF8A7A;--red-soft:#3A1C18;--amber:#F2B84B;--amber-soft:#33280F}
body.night .console,body.night .c-body{background:var(--c-bg)}
body.night .c-head,body.night .qi.active{background:var(--c-panel)}
body.night .view button{background:var(--c-panel);color:var(--c-muted)}
body.night .view button[aria-pressed="true"]{background:var(--c-ink);color:var(--c-bg)}
body.night .rxline{background-color:var(--c-panel)}
body.night .draftwrap textarea{background:var(--c-soft);color:var(--c-ink)}
body.night .actions button{background:var(--c-panel);color:var(--c-ink);border-color:var(--c-line)}
body.night .actions .approve{background:var(--green);color:#0E1416;border-color:var(--green)}
body.night .masked{background:#000;color:#E3EAEC}
body.night .avatar{background:#1E2D29;color:var(--green-ink)}
body.night .card.stop{background:#24161A}
body.night .quote{color:var(--c-ink)}
body.night table.scr td{border-top-color:var(--c-line)}
body.night .rxline .wm{opacity:.35}

```
