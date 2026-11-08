# Pages

## / — Clinician console (window `section.console`)
Entry: `public/index.html` → `renderConsole()`
Dependencies:
- `public/index.html` (inline CSS: `:root` tokens, CONSOLE LAYOUT and CONSOLE POLISH blocks; JS: `renderConsole`, `queueList`, `renderActions`, `holdToSign`, `logBox`, `row`, `val`, `srcMark`, `stamp`, `wordDiff`, `ringSVG`, `clockText`, `Doctor`)
  - `public/engine.js` (synthetic `DATA`, rules `Engine`, `planLines`, `treatBlockers`, `draftReply`, `age`, `normalizeDob`, `inFlorida`)

## / — Patient chat (window `section.chat`)
Entry: `public/index.html` → `Actions`, `Live`, widgets (`askCard`, `clinicianWidget`, `visitWidget`, `fieldWidget`, consent)
Dependencies:
- `public/index.html`
  - `public/engine.js`
