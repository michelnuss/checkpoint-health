# Routes

Single page, no router.

| Path | File | What it renders |
|---|---|---|
| `/` | `public/index.html` | Two windows on one page: the patient chat (default) and the clinician console. Switch with the bottom bar (Claude / Clinician) or `setWin("clinician")`. Query `?mode=scripted` starts in scripted mode. |
| `/api/chat`, `/api/draft`, `/api/health` | `server.js` | JSON API to Claude (not UI). |

Key screen for design work: **Clinician console** (`section.console`, rendered by `renderConsole()`): queue of async e-visits, sticky patient banner (name, age/sex, DOB, safety chips, reply clock ring), rules-written summary, UTI-v1 protocol checklist, chart with provenance markers and timestamps, screener answers, audit-log timeline, and a sticky decision panel (prescription pad, Claude-drafted message, hold-to-sign button, signature stamp, edit diff). Toggles: "Clinician view" / "What Claude saw" (black-bar redaction) and "Night shift" (dark theme).
