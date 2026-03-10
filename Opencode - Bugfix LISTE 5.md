OPENCODE PROMPT 3 — FIX SERVICES CONTENT (Homepage + Leistungen page)

GOAL:
Fix:
- Homepage section "Unsere Leistungen" shows no content
- Leistungen page shows no content
Ensure services content is editable via CMS OR at least correctly rendered from services.md.

CONSTRAINTS:
- Do NOT print full code.
- Minimal diffs.
- Output only changed file paths + build/typecheck.

STEPS:

1) Identify current services source:
- Check kanzlei-website/content/services.md and how it is rendered.
- Determine whether HomePage expects structured list (3 cards) but receives plain markdown.

2) Implement a stable structured services source (recommended):
Option A (preferred): Use JSON for services cards:
- Create: kanzlei-website/content/services.json
Format:
{
  "items": [
    { "title": "Asylrecht", "text": "...", "href": "/leistungen#asylrecht" },
    { "title": "Aufenthaltsrecht", "text": "...", "href": "/leistungen#aufenthalt" },
    { "title": "Staatsangehörigkeit", "text": "...", "href": "/leistungen#staatsangehoerigkeit" }
  ]
}

- Update Decap config.yml to edit services.json (file path must include kanzlei-website/ prefix).
- Update HomePage section to render cards from services.json items.
- Update Leistungen page to render the same items + optionally additional markdown body.

3) Ensure route exists for Leistungen:
- Confirm route /leistungen exists and points to a LeistungenPage.
- If missing: create src/pages/LeistungenPage.tsx and add route.
- Page should render:
  - H1 "Unsere Leistungen"
  - the 3 service blocks (from services.json)
  - optional extended text from services.md (if exists)

4) Verify:
- npm run build
- npm run typecheck

5) Commit + push:
- "fix: render services content on home and leistungen page"

OUTPUT:
- Updated file paths
- Build/typecheck PASS/FAIL
STOP.