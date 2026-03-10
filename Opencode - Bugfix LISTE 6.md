OPENCODE PROMPT 4 — BOXED CONTENT LAYOUT (Downloads/Datenschutz/Impressum/Termin)

GOAL:
Fix layout issues:
- Downloads container not centered/boxed
- Datenschutz and Impressum content not boxed/centered
- Termin buchen page boxed/centered and consistent

CONSTRAINTS:
- Do NOT print full code.
- Minimal diffs.
- Output only changed file paths + build/typecheck.

STEPS:

1) Create a reusable page container component:
- Create src/components/PageContainer.tsx
- Renders a centered container with:
  - max width (e.g. max-w-4xl or max-w-5xl)
  - mx-auto
  - px-4 sm:px-6
  - py-8
- Optional: "prose" styling wrapper for markdown content.

2) Apply PageContainer to these pages:
- DownloadsPage
- DatenschutzPage
- ImpressumPage
- TerminPage
Keep content inside the container so it’s boxed and centered.

3) Ensure Downloads list still renders (data from downloads.json items).

4) Termin buchen:
- Ensure the explanatory text + GatedEmbed sit inside PageContainer.
- Keep embed width 100% of container and height appropriate.

5) Verify:
- npm run build
- npm run typecheck

6) Commit + push:
- "fix: apply boxed layout to content pages"

OUTPUT:
- Updated file paths
- Build/typecheck PASS/FAIL
STOP.