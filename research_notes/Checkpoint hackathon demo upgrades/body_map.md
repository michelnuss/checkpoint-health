# Body map ("where does it hurt") for the Checkpoint demo

Scope: an interactive body map in `public/index.html` (zero dependencies, no build step) that turns a tap into a structured region and feeds the fixed rules in `public/engine.js`. Project rules that apply: rules decide and Claude talks; no personal data goes to Claude; no em or en dashes in user-facing copy. Research date: 2026-11-07.

Project facts checked locally:
- `public/engine.js` line 19 already has a screening option `{ label: "Pain in your back or side", kw: /back|side|flank/i, red: "Flank pain", neg: "flank pain" }`. A body map tap on back or flank can map straight onto this existing red flag. No new rule logic is needed, only a new way to input it.
- `public/index.html` is about 1350 lines with `/* ===== NAME ===== */` banners (UI helpers, widgets, Actions, Live, console render, windows, autoplay, wiring). The map belongs in "widgets" as one more `ask_user` card type.

## Q1. Which option gives the most "wow" for the least risk with no build step? Can three.js load without npm?

### Takeaway
Build a pseudo-3D SVG map: a front and back silhouette on a CSS 3D flip card (`transform: rotateY(180deg)`, `backface-visibility: hidden`) with 6 to 8 large, hand-placed hit zones. It takes about 2 to 3 hours, works with no network or WebGL, and looks good on a projector. True 3D with three.js is possible without npm (r187, import map or vendored files), but a body model plus picking plus fallbacks takes 5 to 8 hours and adds stage risk for little gain in triage value.

### Cited Findings
- three.js latest release is r187 (30 Oct), r186 (24 Sep), r185 (01 Jul) — [three.js GitHub releases](https://github.com/mrdoob/three.js/releases). jsDelivr reports npm `three` latest = `0.187.0` — [jsDelivr data API](https://data.jsdelivr.com/v1/packages/npm/three) (checked 2026-11-07).
- No-npm loading uses an import map that maps `three` to `build/three.module.js` and `three/addons/` to `examples/jsm/`; the trailing slash on `three/addons/` is required; pin the version and do not use `@latest` — [issoh.co.jp tutorial (r186/r187)](https://www.issoh.co.jp/md/tech/3051); [three.js forum: CDN ES6 import requires importmap](https://discourse.threejs.org/t/cdn-es6-module-import-requires-importmap-vanilla-js/68353); [three.js forum: npm-free three.js](https://discourse.threejs.org/t/npm-free-threejs/50097/2).
- Packaging changes: the script-tag `three.min.js` build ended in r161, and minified module builds such as `three.module.min.js` were dropped from the npm package around r186 — [issoh.co.jp tutorial](https://www.issoh.co.jp/md/tech/3051) (secondary source, not checked against the changelog).
- Checked directly: `three@0.187.0/build/three.module.js` is 658,900 bytes and starts with `import {...} from './three.core.js'` (three.core.js is 1,474,799 bytes). `examples/jsm/controls/OrbitControls.js` is 40,918 bytes and imports from the bare specifier `'three'`. To vendor it, copy all three files into `public/vendor/three/` and keep the import map so `'three'` resolves. That is about 2.2 MB unminified (`curl -I` against cdn.jsdelivr.net, 2026-11-07).
- `@google/model-viewer` latest on npm is 4.4.0 — [jsDelivr data API](https://data.jsdelivr.com/v1/packages/npm/@google/model-viewer). Its hotspots are child elements with `slot="hotspot-*"`, `data-position` and `data-normal`, and they fade when facing away. Picking surface points from a click is not well documented on the example page (it mentions `surfaceFromPoint`) — [model-viewer annotations example](https://modelviewer.dev/examples/annotations/index.html). It also needs a GLB body model, so you still have the asset problem.

### Inferences
Option comparison (hours are estimates for one developer who knows the codebase):

| Option | Effort | Look on stage | Stage risk | Notes |
|---|---|---|---|---|
| A. 2D SVG, front and back side by side | 1.5 to 2 h | Clean, clinical | Very low | Easiest to make accessible. Easy to show both views at once. |
| **B. Pseudo-3D SVG flip card (recommended)** | 2 to 3 h | Polished; the "turn around" flip reads as 3D | Very low | Same SVG as A, plus about 20 lines of CSS. Works offline, no WebGL. |
| C. three.js with primitives (capsules and spheres), drag to rotate, raycast picking | 4 to 6 h | Clearly 3D, but toy-like (mannequin) | Medium | No asset licensing. Needs vendored three.js (about 2.2 MB), WebGL fallback, touch handling. |
| D. three.js or model-viewer with a real GLB human | 6 to 10 h | Most impressive | Medium to high | Needs a CC0 mesh, Blender work to split or name regions (or invisible hit volumes), a loader, and a fallback. Not realistic in one evening alongside the other must-haves. |

- B gives the best value for effort. The flip animation supplies the "3D" moment, and the clinical payoff (tap on back, red flag fires, engine routes to in-person care) is identical in every option.
- If the team wants real 3D anyway, do C as an upgrade over the working B, never instead of it, and keep B as the fallback when `WebGL2RenderingContext` is missing or the canvas fails to load.

### Gaps
- I could not confirm the year on the r187 release from the releases page snippet. jsDelivr showing `0.187.0` as `latest` today makes it current.
- I did not measure model-viewer bundle size or test `positionAndNormalFromPoint` (not documented on the page I read).

## Q2. License-safe assets (SVG and 3D), and the no-asset fallback

### Takeaway
The safest choice is to draw your own simple silhouette (a few SVG paths or ellipses). It has no licence risk and fits the Claude-style UI. If you want detailed anatomy outlines, `react-native-body-highlighter` (MIT, 2022) ships front and back, male and female SVG path data in plain `.ts` files that can be copied with the MIT notice. Its regions are muscles, though, not clinical zones, so you would still overlay your own hit zones. For 3D, CC0 low-poly bodies exist on OpenGameArt and from Quaternius. Z-Anatomy's CC-BY-SA license and heavy meshes make it a poor fit.

### Cited Findings
- `react-native-body-highlighter` by HichamELBSI: MIT License, "Copyright (c) 2022 ELABBASSI Hicham" — [LICENSE](https://raw.githubusercontent.com/HichamELBSI/react-native-body-highlighter/main/LICENSE). It has `side` front/back and `gender` male/female props. Slugs include abs, obliques, chest, lower-back, upper-back, gluteal, head, neck, adductors and more — [repo README](https://github.com/HichamELBSI/react-native-body-highlighter).
- Checked directly: the path data lives in `assets/bodyFront.ts` (25 KB), `assets/bodyBack.ts` (21 KB), `assets/bodyFemaleFront.ts` (32 KB) and `assets/bodyFemaleBack.ts` (23 KB). Each entry is `{ slug, color, path: { left: ["M..."], right: ["M..."] } }`, plain SVG `d` strings that can be pasted into `<path>` elements (GitHub API tree listing and raw file, 2026-11-07). The MIT license does not split code from artwork, so the paths fall under MIT. Keep the copyright notice in a comment.
- The web port `react-body-highlighter` (giavinh79) says its SVG polygons were taken from the React Native package — [react-body-highlighter](https://github.com/giavinh79/react-body-highlighter) (license not checked separately).
- Flutter packages `bodyheatmap` (MIT, front/back SVG with per-region intensity, built for pain tracking) and `human_body_map_selector` (MIT, bitmap with rectangle regions) are useful design references but not drop-in for a web page — [bodyheatmap](https://pub.dev/packages/bodyheatmap); [human_body_map_selector](https://pub.dev/packages/human_body_map_selector/changelog).
- CC0 low-poly human meshes on OpenGameArt: "Human Basemeshes" by pistachio (rigged, female version about 1158 tris), "Humanoid Low Poly Mesh (With Basic Face)" by Shingox, "Low-poly human female" by VideroBoy (748 quad faces) — [Human basemeshes](https://opengameart.org/content/human-basemeshes); [Humanoid low poly mesh](https://opengameart.org/content/humanoid-low-poly-mesh-with-basic-face); [Low poly human female](https://opengameart.org/content/low-poly-human-female); [Low poly male base mesh](https://opengameart.org/content/low-poly-male-base-mesh). These are mostly OBJ or Blend files, so they need a Blender export to GLB.
- Quaternius Universal Base Characters: "free to use in personal, educational and commercial projects (CC0 License)" — [Quaternius pack page](https://quaternius.com/packs/universalbasecharacters.html). A 2026 guide says the site now also publishes a "Quaternius Asset Licence (QAL v1.0)" for some newer packs. Check each download page — [cinevva guide](https://app.cinevva.com/de/guides/free-rigged-3d-character-models) (secondary source).
- Sketchfab: no clearly CC0 low-poly body base mesh turned up. The free low-poly skeleton found is CC Attribution — [Sketchfab skeleton](https://sketchfab.com/3d-models/free-low-poly-pbr-bsdf-textured-human-skeleton-d0c9919aec004fd39d65ce7a7960969b). Use Sketchfab's license filter and confirm on each model page.
- A Fab listing offers meshes derived from MakeHuman's CC0 base (about 71k and 22k verts) — [Fab listing](https://www.fab.com/listings/1c2f2267-751c-47fc-98b5-879a1008d4a5). That is far too dense to need for a demo.

### Inferences
- Z-Anatomy (not checked this session) is known to be CC-BY-SA 4.0, a share-alike license that would apply to derived models. It is also an anatomy atlas with organ-level meshes, which is overkill. Skip it. Mixamo characters are under Adobe terms, not an open license, so skip those too.
- No-asset 3D fallback (option C): build a mannequin from `THREE.CapsuleGeometry` (torso, upper and lower arms, legs) and a `SphereGeometry` head. Add separate named meshes for the clickable zones: a flattened sphere at the lower belly (`name: "suprapubic"`), two small ellipsoids on the lower back at the left and right flank (`"flank_left"`, `"flank_right"`), and so on. Because each zone is its own mesh, raycasting returns the region name directly. No asset, no licence question, about 60 lines.
- Licensing note for the pitch (Trust): "All artwork is drawn by us or MIT-licensed. No patient images."

### Gaps
- I did not verify the react-body-highlighter (web) LICENSE file or the exact QAL v1.0 terms.
- I did not check Kenney's character packs this session (Kenney assets are generally CC0, but this is unverified here).

## Q3. Picking, rotation, highlight, intensity slider, accessibility (code-level guidance)

### Takeaway
Use one `<svg>` per side, a `<g data-region="...">` per clinical zone, event delegation for clicks, `aria-pressed` buttons for state, and a native `<input type="range" min="0" max="10">` for intensity. Duplicate the regions as a visible list of buttons (or checkboxes) under the figure so keyboard and screen-reader users, and anyone on a flaky projector click, can still answer. The map outputs a structured object (`{ regions: ["flank_right"], intensity: 6 }`) that goes to `Engine`, and Claude only gets a short label.

### Cited Findings
- Infermedica (Symptomate) usability testing: users rated pointing on the body very positively and found it "an easy and intuitive way to add symptoms." This is qualitative, with no sample size given — [Infermedica blog: body avatars](https://infermedica.com/blog/articles/the-role-of-body-avatars-in-symptom-checkers-and-how-to-work-with-them).
- The same article recommends: separate SVG group or path per body part; front and back avatars (and male/female); granularity that is "neither too fine nor too coarse"; never making the avatar the only input (pair it with text or search); following WCAG for colour, contrast and click targets; and remembering that avatars cannot capture non-located symptoms such as fever — [Infermedica blog](https://infermedica.com/blog/articles/the-role-of-body-avatars-in-symptom-checkers-and-how-to-work-with-them).
- Infermedica's Symptom Checker 3 tracks clicks on the body model as an analytics event — [Infermedica: Symptom Checker 3](https://infermedica.com/blog/articles/symptom-checker-3-whats-new).
- For three.js picking: `Raycaster` is in the r187 export list (checked in `three.module.js`), and `OrbitControls` lives at `three/addons/controls/OrbitControls.js` (checked).

### Inferences
Recommended region taxonomy for the UTI wedge (small on purpose, each region maps to one rule input):

| Region id | Side | Patient label (plain, no dashes) | Engine meaning |
|---|---|---|---|
| `suprapubic` | front | Lower belly, above the pubic bone | Consistent with bladder (cystitis). Not a red flag. |
| `lower_abdomen_left` / `lower_abdomen_right` | front | Lower left or right belly | Caution: one-sided lower pain is less typical for cystitis. Mark for clinician review (`needs_review`). |
| `upper_abdomen` | front | Upper belly | Outside the UTI pattern. Mark for clinician review. |
| `flank_left` / `flank_right` | back | Side of your back, below the ribs | **Red flag: "Flank pain"** (existing engine rule, possible kidney infection). |
| `lower_back_center` | back | Middle of your lower back | Ask a follow-up, or treat as flank to be safe (team decision; safer to treat as red flag). |
| `pelvis_genital` | front | Pelvic or genital area | Optional. Vaginal symptoms are already a separate screening question. |
| `none` | n/a | "No pain, just burning when I pee" | Not a red flag. Required escape hatch. |

Exact approach for option B (pseudo-3D flip card):

```html
<div class="bm" role="group" aria-labelledby="bm-q">
  <p id="bm-q">Where does it hurt? Tap all that apply.</p>
  <div class="bm-stage"><div class="bm-card" id="bmCard">
    <svg class="bm-face bm-front" viewBox="0 0 200 440" aria-hidden="true">
      <path class="bm-body" d="..."/>                       <!-- silhouette, hand drawn or MIT paths -->
      <g class="bm-zone" data-region="suprapubic"><ellipse cx="100" cy="235" rx="34" ry="18"/></g>
      ...
    </svg>
    <svg class="bm-face bm-back" viewBox="0 0 200 440" aria-hidden="true">
      <path class="bm-body" d="..."/>
      <g class="bm-zone" data-region="flank_left"><ellipse cx="70" cy="200" rx="20" ry="30"/></g>
      <g class="bm-zone" data-region="flank_right"><ellipse cx="130" cy="200" rx="20" ry="30"/></g>
    </svg>
  </div></div>
  <button type="button" id="bmTurn">Turn around</button>
  <div class="bm-list">  <!-- accessible twin of the zones; also the stage fallback -->
    <button type="button" data-region="suprapubic" aria-pressed="false">Lower belly</button>
    <button type="button" data-region="flank_left" aria-pressed="false">Left side of back</button>
    ...
    <button type="button" data-region="none" aria-pressed="false">No pain</button>
  </div>
  <label>How bad is it? <output id="bmVal">5</output>/10
    <input type="range" id="bmPain" min="0" max="10" step="1" value="5"></label>
  <button type="button" id="bmDone">Done</button>
</div>
```

```css
.bm-stage{perspective:900px;width:220px;height:460px;margin:auto}
.bm-card{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.bm-card.back{transform:rotateY(180deg)}
.bm-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.bm-back{transform:rotateY(180deg)}
.bm-body{fill:#e9e4dc;stroke:#b9b1a5}
.bm-zone ellipse{fill:transparent;stroke:transparent;cursor:pointer;transition:fill .15s}
.bm-zone:hover ellipse{fill:rgba(217,119,87,.18)}
.bm-zone.on ellipse{fill:rgba(217,119,87,.55);stroke:#d97757}
@media (prefers-reduced-motion:reduce){.bm-card{transition:none}}
```

```js
function bodyMapWidget(onDone){            // lives in the "widgets" section of index.html
  var picked = new Set(), root = /* the .bm element */;
  function toggle(r){
    if (r === "none") picked.clear(); else { picked.delete("none"); picked.has(r) ? picked.delete(r) : picked.add(r); }
    if (r === "none") picked.add("none");
    root.querySelectorAll("[data-region]").forEach(function(el){
      var on = picked.has(el.dataset.region);
      el.classList.toggle("on", on);
      if (el.tagName === "BUTTON") el.setAttribute("aria-pressed", on);
    });
  }
  root.addEventListener("click", function(e){
    var z = e.target.closest("[data-region]"); if (z) toggle(z.dataset.region);
    if (e.target.id === "bmTurn") root.querySelector("#bmCard").classList.toggle("back");
  });
  root.querySelector("#bmPain").addEventListener("input", function(e){ root.querySelector("#bmVal").textContent = e.target.value; });
  root.querySelector("#bmDone").addEventListener("click", function(){
    onDone({ regions: Array.from(picked), intensity: +root.querySelector("#bmPain").value });
  });
}
```

Wiring to the rules (keeps "rules decide, Claude talks"):
- Add a pure function in `engine.js`, for example `Engine.regionsToAnswers(regions, intensity)`. It returns the same structure the existing screening options produce: `flank_*` (and `lower_back_center`, if the team treats it that way) sets the existing "Flank pain" red flag, and `upper_abdomen` or one-sided lower belly sets a caution or `needs_review`. Add 3 to 4 cases to `tests/engine.test.js` (flank_right gives in_person; suprapubic gives eligible; none gives eligible; suprapubic plus flank_left gives in_person).
- The tool result returned to Claude should be a short neutral label such as `Pain location: lower belly (bladder area), 4/10`, or for a red flag, the engine's own disposition. Body region and intensity are not identifying data, so they can go to Claude, unlike intake fields. Claude must never get to reinterpret the region into a decision.
- Show the region and intensity on the clinician console (a mini static copy of the SVG with the same zones lit is a strong visual for judges).
- Scripted mode: in `autoplay`, simulate the tap (add the `on` class to `suprapubic`, wait 600 ms, flip, flip back, Done). This keeps Play demo deterministic.
- Hit areas: make each zone at least 44 by 44 CSS px at rendered size (WCAG 2.5.5 / Apple HIG). Use generous invisible ellipses rather than exact anatomy.

For option C (three.js, if attempted as an upgrade):

```html
<script type="importmap">{"imports":{
  "three":"/vendor/three/three.module.js",
  "three/addons/":"/vendor/three/addons/"}}</script>
<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); camera = PerspectiveCamera(35, w/h, .1, 100)
// body: CapsuleGeometry meshes (MeshStandardMaterial, color 0xe9e4dc); zones: Mesh(SphereGeometry) scaled, name = region id,
//   material {transparent:true, opacity:0} -> opacity .6 + color 0xd97757 when picked
// controls = new OrbitControls(camera, canvas); controls.enableZoom=false; controls.enablePan=false;
//   controls.minPolarAngle = controls.maxPolarAngle = Math.PI/2  (spin around vertical axis only)
// picking: on 'pointerup' with < 5 px movement since 'pointerdown' (so drags do not select):
//   ndc = ((x/w)*2-1, -(y/h)*2+1); raycaster.setFromCamera(ndc, camera); hit = raycaster.intersectObjects(zones)[0]
//   if (hit) toggle(hit.object.name)    // same toggle() as the SVG version and the list buttons
</script>
```

Vendor `three.module.js`, `three.core.js` and `addons/controls/OrbitControls.js` from `https://cdn.jsdelivr.net/npm/three@0.187.0/` into `public/vendor/three/`. `server.js` must serve `.js` with `Content-Type: text/javascript` or module loading fails. Check that the static handler covers subfolders.

### Gaps
- No public UX write-ups were found for Ada, Buoy or K Health body maps specifically. Ada's public material describes a question-and-answer flow, not a body map — [Ada app listing](https://apps.apple.com/us/app/ada-check-your-health/id1099986434). WebMD's checker is described as using an anatomical avatar to select the problem area — [findailist WebMD page](https://www.findailist.com/tools/webmd-symptom-checker) (low-quality aggregator). I did not verify the Mayo Clinic or Epic MyChart flows.

## Q4. How existing products and clinical practice use body maps; evidence; region taxonomies

### Takeaway
Body avatars are a common, well-liked input in consumer symptom checkers (Infermedica/Symptomate, WebMD). The evidence supports pain drawings as a documentation and self-report aid, not as a standalone diagnostic tool. That matches Checkpoint's design: the map only captures location, and the fixed rules and the clinician decide. For the UTI wedge, the clinically relevant split is suprapubic (bladder) versus flank or costovertebral angle (kidney), which maps onto the standard 9-region abdomen and the CVA.

### Cited Findings
- Systematic review (Carnes et al., 2006, Clinical Journal of Pain): pooled median sensitivity 56%, specificity 79.5% and NPV 88% when pain drawings were used to predict psychological state. The authors recommended against using them for that — reported via search summary of [A Systematic Review of Pain Drawing Literature](https://www.scilit.net/publications/e86c95a6852ec29195d0e28bbb13e4cf) (abstract not read directly).
- Scoping review (Barbero et al., 2020, Diagnostics): 11 cross-sectional studies. Pain extent from drawings had heterogeneous associations with outcomes, stronger in musculoskeletal conditions than in neuropathic pain or headache — [PMC7460462](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7460462/).
- The 9-region abdomen: two vertical and two horizontal lines give right and left hypochondriac, epigastric, right and left lumbar (flank), umbilical, right and left iliac (inguinal), and hypogastric (suprapubic) — [Wikipedia: Quadrants and regions of abdomen](https://en.wikipedia.org/wiki/Quadrants_and_regions_of_abdomen). The hypogastric region contains the bladder — [Medmastery](https://www.medmastery.com/guide/abdominal-examination-clinical-guide/what-are-anatomical-regions-and-quadrants-abdomen).
- CVA tenderness in pyelonephritis: found in 68.8% of one acute pyelonephritis cohort (about a third had none). Other summaries put flank pain or CVA tenderness near 86%. One EM summary lists a +LR of about 1.7 for CVA tenderness. Its diagnostic accuracy is described as poorly studied — [emDocs: Pyelonephritis](https://emdocs.net/pyelonephritis-its-not-always-so-straightforward/); [PMC5215196](https://pmc.ncbi.nlm.nih.gov/articles/PMC5215196); [Southern Medical Journal](https://sma.org/southern-medical-journal/article/skin-to-renal-pelvis-distance-predicts-costovertebral-angle-tenderness-in-adult-patients-with-acute-focal-bacterial-nephritis).
- Infermedica recommends that developers, designers and doctors define body-part division and symptom mapping together — [Infermedica blog](https://infermedica.com/blog/articles/the-role-of-body-avatars-in-symptom-checkers-and-how-to-work-with-them).

### Inferences
- Pitch framing (Trust, no inflated claims): "Patients point, they don't have to know the word 'flank.' The tap becomes a fixed input to our rules. A tap on the back stops the remote path, same as the typed answer." Do not claim the body map improves diagnostic accuracy. The evidence is only that it is a usable self-report aid.
- Because CVA/flank findings are imperfect, keep the existing text question as well. Either source of a flank signal triggers the red flag (OR logic, conservative).
- Keep the map patient-level: about 7 zones, not 9 abdominal regions plus back. Too many zones on a phone conflicts with Infermedica's "neither too fine nor too coarse."

### Gaps
- I did not read the Carnes 2006 abstract directly; the figures come from a search summary.
- I found no study on body maps specifically for UTI triage or telehealth intake.

## Q5. Can this run inside Claude as an MCP App (ui:// resource)?

### Takeaway
Yes, technically. MCP Apps (stable spec 2026-01-26) lets a tool point at a `ui://` HTML resource that Claude renders in a sandboxed iframe. The default CSP allows inline scripts and styles but blocks external origins, so the inline-SVG body map (option B) fits as-is. A three.js version would have to inline the library or declare `resourceDomains`. The map can send its result back through `tools/call` (to a Checkpoint tool, so the engine decides) or `ui/message`.

### Cited Findings
- MCP Apps is the official extension. The stable version is 2026-01-26. Listed clients include Claude, ChatGPT, VS Code, Goose and Postman, and "host support varies" — [modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps).
- Spec details: MIME type `text/html;profile=mcp-app`. The tool links its UI with `_meta.ui.resourceUri` (the flat `_meta["ui/resourceUri"]` is deprecated). The default CSP is `default-src 'none'` and `connect-src 'none'`, with scripts and styles limited to `'self'` and `'unsafe-inline'` and images to `'self' data:`. `resourceDomains` and `connectDomains` widen it. The UI can call `tools/call`, `ui/message`, `ui/update-model-context`, `ui/request-display-mode` and others after `ui/initialize` — [ext-apps spec 2026-01-26](https://raw.githubusercontent.com/modelcontextprotocol/ext-apps/main/specification/2026-01-26/apps.mdx).
- Third-party guides note conflicting SEP numbers (SEP-1724 and SEP-1865) and older MIME types such as `text/html+skybridge` — [mcpbundles blog](https://docs.mcpbundles.com/blog/2025/11/24/mcp-apps-interactive-ui-protocol); [traeai lesson](https://learn.traeai.com/t/ai-engineering/phases/13-tools-and-protocols/14-mcp-apps). Use the official spec.

### Inferences
- Build the body map as a self-contained snippet (inline SVG, CSS and JS, no external files). The same markup can then (1) render in `index.html` today and (2) be served as a `ui://checkpoint/body-map` resource from the planned `mcp-server.js` later. On Done, the app calls `tools/call` on a Checkpoint screening tool with `{regions, intensity}`, so the engine still decides. This makes a good "Innovation" line: "the same widget runs inside Claude."
- Whether Claude Desktop (as opposed to claude.ai) renders MCP Apps from a local stdio server is not confirmed here. Another researcher covers MCP in depth.

### Gaps
- I did not confirm Claude Desktop support for local stdio MCP Apps, or how it handles touch and sizing.

## Q6. Performance and stage risk (mobile, projector, offline, WebGL)

### Takeaway
Option B has essentially no stage risk: a few KB of inline SVG, no network, no GPU dependency, and it scales cleanly on a projector. Option C or D adds about 2.2 MB of vendored JS (unminified r187), a WebGL dependency, touch-versus-drag ambiguity, and a blank canvas if anything fails. If 3D is used, vendor it locally (never a CDN on venue Wi-Fi) and auto-fall back to the SVG.

### Cited Findings
- r187 module files: three.module.js 658,900 bytes plus three.core.js 1,474,799 bytes plus OrbitControls.js 40,918 bytes (checked with `curl -I` on jsDelivr, 2026-11-07). Minified module builds were removed from npm around r186 — [issoh.co.jp](https://www.issoh.co.jp/md/tech/3051).
- The react-native-body-highlighter path files are 21 to 32 KB each (GitHub tree listing). A hand-drawn silhouette with 7 ellipses is under 3 KB.

### Inferences
Stage checklist:
- Run on `localhost:3000` from the laptop. Nothing in the map should fetch from the network. If using three.js, serve from `public/vendor/three/`, not a CDN.
- WebGL fallback: `const ok = !!document.createElement('canvas').getContext('webgl2');`. If it fails, or on `webglcontextlost`, render option B. Always render the list of region buttons regardless.
- Projector: SVG is resolution-independent. Use high contrast for selected zones (the Claude orange `#d97757` on a light silhouette) and a visible text label of selected regions ("Selected: lower belly"), because projectors wash out light fills.
- Touch: with three.js, distinguish tap from drag (movement under 5 px). In SVG, set `touch-action: manipulation` to kill double-tap zoom delay.
- Scripted Play demo: drive the map programmatically (no real clicks) so timing is deterministic. Add only about 3 to 4 s to the 90-second cut (tap lower belly, slider to 4, Done). For the red-flag story, a separate short clip: tap the back, flip, red flag fires.
- One-evening plan (about 3 to 4 h total for B, with tests): 45 min silhouette and zones, 45 min widget and flip and slider and list, 45 min `Engine.regionsToAnswers` plus 4 tests, 30 min console mini-map, 30 min autoplay wiring and smoke test, plus buffer. Attempt three.js only if all of that is done and green.

### Gaps
- I did not measure frame rate on a specific phone or projector setup. The risk ratings are judgement, not measurement.
