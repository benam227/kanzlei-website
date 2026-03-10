OPENCODE PROMPT — CMS HOMEPAGE SECTIONS EDITABLE

GOAL:
In Decap CMS, the homepage should expose editable fields for main sections,
not only header/hero.

CONSTRAINTS:
- Keep it simple: do not model everything as complex nested objects unless needed.
- Prefer: one markdown body + a few key fields.
- Do NOT print full content.
- Output only changed files + build/typecheck.

PLAN (recommended):
- Keep homepage.md as the single source of truth.
- Ensure CMS exposes:
  - title (string)
  - description (string)
  - heroTitle (string)
  - heroSubtitle (string)
  - ctaText (string)
  - body (markdown)  <-- for all sections below hero

STEPS:
1) Inspect kanzlei-website/content/homepage.md:
- Confirm it contains body content for sections (leistungen, kontakt, etc.)
2) Update kanzlei-website/public/admin/config.yml:
- For homepage entry, ensure there is a "body" markdown field.
- If body already exists but CMS still shows nothing, ensure the file path is correct
  (must be kanzlei-website/content/homepage.md).
3) Ensure the frontend actually renders homepage body below hero:
- If HomePage currently only uses frontmatter fields and ignores body,
  update HomePage to render markdown body (react-markdown) in a boxed container section.
4) Build + typecheck
5) Commit: "fix: cms homepage body and sections rendering"

STOP.