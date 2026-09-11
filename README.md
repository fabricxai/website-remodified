# FabricXai — marketing site v2 (Next.js)

Next.js 16 (App Router, TypeScript). Started as a 1:1 port of the Claude Design bundle
(`../FabricX AI Marketing Site.html`), then enhanced per the v2 brief: the positioning
ladder, the MARBIM elevation, the motion system, the new routes and the SEO pass.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Environment: `NEXT_PUBLIC_SITE_URL` (canonical base for sitemap/OG, default `https://fabricxai.com`); `NEXT_PUBLIC_FAIR_LEAD_WEBHOOK` (optional lead endpoint for `/fair`).
Route groups: `src/app/(site)` carries the shared shell (thread, nav, footer); `src/app/(fair)` is the bare QR landing.
After Innovation Fair 2026, set `FAIR_OVER=1` and `/fair` 301s to `/demo`.

## Routes

| Path | Content |
| --- | --- |
| `/` | Home — hero (ladder copy + Three.js weave), order journey with per-station artifacts, three problems with the documents-assemble centrepiece, trust loop + audit stamp, departments → modules, "The system that runs the floor" dark cut, final CTA |
| `/marbim` | Garment intelligence: hero + mark loop, what it reads today (provenance interactive), Inside MARBIM (5 layers, dark cut), why small, roadmap (SHIPPED / IN TRAINING / AHEAD), what MARBIM never does (`#never`) |
| `/product` | The journey as an explorable rail + the 11-module grid |
| `/product/[module]` | One template, one data file (`src/lib/modules.ts`): claim, screen, three capabilities, MARBIM moment (hover → audit stamp), safeguard |
| `/technology` | Architecture at full depth, trust loop as a sequence (dark cut), isolation, deployment, Bangla + English |
| `/pricing` | Implementation / Platform / MARBIM structure, no numbers, FAQ |
| `/about` | SocioFi Technology, the founding argument, team roles, Dhaka |
| `/demo` `/walkthrough` | Kept; walkthrough clips carry `VIDEO COMING` badges |
| `/fair` | QR landing for Innovation Fair 2026 · Stall 16. Standalone shell (no nav/footer/thread, always light, Bangla default). WhatsApp deep link when `FAIR.whatsapp` is set, otherwise a 3-field form that posts to `NEXT_PUBLIC_FAIR_LEAD_WEBHOOK` or falls back to a prefilled email. Inline "never" list, vCard, links to fabricxai.com and sociofitechnology.com. Print the QR as `/fair?s=16` to tag the source. |
| `/handoff` | Internal — noindex, excluded from nav, sitemap and robots |

## Motion system (`src/components/motion/`)

- `Thread` — one amber SVG path down the left gutter, knotting at every `Eyebrow` (`data-knot`), drawn by `stroke-dashoffset` from scroll progress. Hidden ≤1000px, fully drawn under `prefers-reduced-motion`.
- `MonoNumber` — mono numbers count up / decode once on first viewport entry (400ms).
- `DocumentsAssemble` — the six-artefacts scroll sequence: stack → red error → regenerate amber from one committed record. Static before/after on phones.
- `AuditStamp` (`DraftCard`, `Stamp`) — `DRAFT · NOT SAVED` → amber APPROVE → `COMMITTED · audit 8f21c4` on hover/tap.
- `DarkCut` — the one full-ink section a page may have.

## Content

- `src/lib/data.ts` — copy, EN/BN pairs (`t(T.key)`), stations, MARBIM layers/roadmap, pricing, about, fair.
- `src/lib/modules.ts` — the eleven department pages.
- Naming: `FabricXai` everywhere; `MARBIM` in prose, uppercase only in mono labels. "Copilot" is retired.

## Assets to drop in

- `public/media/fair-loop.mp4` (+ `fair-loop.vtt` captions) — the 58-second fair film. Until present, `/fair` shows a "Film coming" panel.
- Real chapter clips for `/walkthrough` — remove the `VIDEO COMING` badge per chapter as they land.

The demo and fair forms are front-end only; wire their `onSubmit` handlers to a backend.
