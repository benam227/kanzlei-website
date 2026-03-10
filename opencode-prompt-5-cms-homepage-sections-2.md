OPENCODE FIX — Fill homepage.md body with editable sections (CMS-visible)

GOAL:
Populate kanzlei-website/content/homepage.md body (below frontmatter) with the homepage sections so Decap CMS can edit them and the site renders them.

CONSTRAINTS:
- Do NOT print full content to terminal.
- Keep changes minimal.
- Output only changed file paths + build/typecheck.

STEPS:
1) Open: kanzlei-website/content/homepage.md
2) Keep existing frontmatter as-is.
3) Replace/extend the markdown body (below the closing ---) with a structured template like:

- Intro paragraph (keep existing welcome paragraph)
- Section heading: "## Unsere Leistungen"
  - Short intro sentence
  - A link line pointing to /leistungen (optional)
- Section heading: "## Kontakt"
  - Short text + placeholders for phone/email (or refer to footer)
- Optional: "## Termin buchen"
  - Short explanation + link to /termin-buchen
- Optional: "## Video"
  - One sentence explaining external media consent (no iframe in markdown)

IMPORTANT:
Do not add embeds or scripts into markdown. Just text headings and paragraphs.

4) Run:
- cd kanzlei-website
- npm run build
- npm run typecheck

5) Commit + push:
- "content: add homepage sections to markdown body"

STOP.