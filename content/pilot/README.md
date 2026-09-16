# Baraka pilot portal — content

The portal at pilot.fabricxai.com renders entirely from two files in this folder.
Edit, commit, push; the next deploy shows the change. No code changes needed.

- `baraka.json` — everything on the page except issues.
- `issues.json` — the issues list. "Report a problem" on the portal appends here.

Dates that the page calculates with are ISO (`2026-09-21`). Dates that are only
displayed are free text, written exactly as they should read (`21 to 25 Sep`).

## baraka.json

| Field | One line |
| --- | --- |
| `factory` | Factory name, used in the page title. |
| `portalName`, `portalTagline` | The two lines in the left-rail brand block. |
| `updated`, `updatedBy` | The "Updated … by …" stamp in the top bar. Free text. |
| `appUrl` | Where "Open the app" goes. |
| `roadmapPdf` | Path of the roadmap PDF in `public/`. |
| `reportEmail` | Address the "Report a problem" form emails when the API is unavailable. |
| `rail.who` | Lines under the rail nav ("Private to …", "Signed in as …"). |
| `today.title`, `today.sub` | The headline and the sentence under it. |
| `today.stats[]` | The four stat boxes. `label` is the caption. `value` is a number, or `"auto"` with `auto` set to `departmentsLive`, `openIssues` or `neededFromBaraka` so the page counts it. Optional `suffix` (small grey text after the number) and `action: true` (amber box). |
| `today.needed` | Amber "Needed from Baraka" box: `title` and `items[]`. Its item count feeds the `neededFromBaraka` stat. |
| `today.doing` | "What FabricXai is doing" box: `title` and `items[]`. |
| `today.nextReview` | Text after "Next weekly review:". |
| `roadmap.title`, `roadmap.lede` | Section heading and intro. |
| `roadmap.downloadLabel` | Text on the PDF button. |
| `roadmap.timelineStart` | ISO date where the roadmap thread begins (the first milestone). The thread ends at the last phase's `end`. |
| `roadmap.phases[]` | The four phase cards: `name`, `start`, `end` (ISO, used for the thread and today marker), `dates` (display text), `summary`. |
| `roadmap.milestones[]` | Table rows: `when` (display), `title`, `what`, `status` (`done` / `next` / `planned`). `next` rows are highlighted amber. Optional `statusLabel` replaces the chip text (e.g. "Saturday"). Optional `movedFrom: { "when": "18 Sep", "reason": "…" }` shows the old date struck through with the reason. |
| `departments.title`, `departments.lede` | Section heading and intro. |
| `departments.weeks[]` | One group per week: `label` ("Week 1"), `title` (the rest of the line), `tiles[]`. |
| `departments.weeks[].tiles[]` | `name`, `status` (`not_started` / `training_scheduled` / `trained` / `live`), `info` (small line at the bottom). `department: false` marks a tile that is a role or a view, not one of the sixteen departments, so it is left out of the "departments live" count and the report form. |
| `log.title`, `log.lede` | Section heading and intro. |
| `log.entries[]` | Newest first. `date` (display), `title`, `body`, `tags[]`. The first entry gets the amber dot. |
| `issues.title`, `issues.lede`, `issues.empty` | Section heading, intro, and the text shown when there are no issues. Counts come from `issues.json`. |
| `data.title`, `data.lede` | Section heading and intro. |
| `data.rows[]` | Data register: `item`, `from`, `received`, `usedFor`, `visibleTo`. |
| `data.assurances[]` | The three boxes under the register: `title`, `body`. |
| `meetings.title`, `meetings.lede` | Section heading and intro. |
| `meetings.items[]` | One card each: `title`, `sub` (date line), `columns[]` of `{ heading, items[] }`, `acknowledged` (true shows "Acknowledged by the system champion"), `upcoming` (true dims the card). |
| `handover.title`, `handover.lede`, `handover.checklistTitle` | Headings and intro. |
| `handover.checklist[]` | `item`, `done` (true ticks the box), `date` (display, e.g. "by 23 Oct"). |
| `handover.maintenance` | `title`, `included[]`, `notIncluded[]`, then the closing sentence as `until` + bold `supportEnds` + `untilAfter`. |
| `handover.contacts[]` | `name`, `how`, `phone`, optional `email`. |
| `agreement.title`, `agreement.lede` | Section heading and intro. |
| `agreement.sides[]` | Two lists: `title` ("FabricXai will"), `items[]`. |
| `agreement.escalation` | `label`, `path[]` (joined with ", then "), `rule`. |

## issues.json

An array. Each issue:

| Field | One line |
| --- | --- |
| `id` | `BK-001`, `BK-002`, … The form picks the next number. |
| `department` | One of the tile names in `baraka.json`. |
| `raisedBy` | Name typed in the form. |
| `date` | ISO date raised. |
| `what` | What happened, as typed. |
| `status` | `open`, `fixed`, or `wont_fix` (explained, not fixed). |
| `acknowledged` | ISO date FabricXai acknowledged it, or `null`. |
| `fixed` | ISO date it was fixed, or `null`. |
| `note` | Optional: what was done, or why not. |

The page computes from this array: the rail badge and the "open" figure (status
`open`), "fixed this week" (`fixed` within the last 7 days), and "average days to
fix" (mean of `fixed` minus `date` over fixed issues).
