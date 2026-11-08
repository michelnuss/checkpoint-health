# Extractable components

## PatientBanner
- Source: `public/index.html` (`renderConsole`, `.pbanner`)
- Category: layout
- Description: Sticky EHR-style banner: avatar initials, name, sex/age/DOB/case id in mono, safety chips, status pill, reply-clock ring
- Extractable props: redacted (boolean, default false), status (string, default "Ready for your review")
- Hardcoded: chip labels, ring SVG, fonts

## VisitQueue
- Source: `public/index.html` (`queueList`, `.cx-queue`)
- Category: layout
- Description: Left inbox of async e-visits with id, complaint, status, wait time, visit-type tag
- Extractable props: activeCaseId (string, default "CP-1042"), waitingCount (number, default 1)
- Hardcoded: queue items

## DecisionPanel
- Source: `public/index.html` (`renderConsole` decide block, `renderActions`)
- Category: layout
- Description: Sticky right panel: prescription pad, Claude-drafted message, hold-to-sign and secondary actions with keyboard hints, signature stamp after signing
- Extractable props: signed (boolean, default false)
- Hardcoded: Rx text, button labels

## Card
- Source: `public/index.html` (`.card` with `h3` small-caps label + `.src` note)
- Category: basic
- Description: Hairline-bordered section card used for Summary, Checklist, Chart, Screener, Order, Message
- Extractable props: none
- Hardcoded: label text

## Chip / SourceMark / Verdict
- Source: `public/index.html` (`.chip`, `.src-mark`, `.verdict`)
- Category: basic
- Description: Quiet outlined chip (red only for hazards); P/R/AI/C provenance marker; status verdict with dot
- Extractable props: tone (string: neutral|hazard|wait)
- Hardcoded: none
