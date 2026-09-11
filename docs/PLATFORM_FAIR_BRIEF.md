# Fair experiences on the platform

The build contract for the two public "try it" pages lives in the platform repo, in its
handoff format so it passes that repo's rules:

    fabricxai-generic/docs/handoffs/HANDOFF-X-7-fair-trial.md

Routes there are `/try/marbim` and `/try/demo` (the bare `/marbim` is already the signed-in
MARBIM surface in that app). This site links to them from `/fair` via `FAIR.platformMarbim`
and `FAIR.platformDemo` in `src/lib/data.ts`, passing `?src=fair&s=<scan tag>`.
Set `FAIR.platformLive = false` to hide the two buttons until the pages ship.
