OPENCODE PROMPT — Decap CMS Collections reorganize: "Seiten" contains all pages, "Daten" only global settings

GOAL:
Make Decap CMS intuitive:
- "Seiten" contains ALL editable website pages (Homepage, Leistungen, About, Termin, FAQ, Downloads, Impressum, Datenschutz).
- "Daten" contains ONLY global/rare settings (e.g., siteSettings/nav toggles) and technical config.
- Remove duplicates so each page has exactly ONE canonical source.

CONSTRAINTS:
- Do NOT print full config.
- Output only changed file paths + build pass.
- Minimal change: config.yml + labels only (no frontend refactor unless absolutely needed).

STEPS:
1) Open: kanzlei-website/public/admin/config.yml
2) Identify current collections and which files they map to.
3) Move page-related file entries into a single collection:
   - name: "pages"
   - label: "Seiten"
   Include file entries for:
   - homepage (homepage.json or homepage.md — choose the one actually used by frontend)
   - leistungen (services.json/services.md)
   - about (about.json)
   - termin (booking page content file if exists)
   - faq (faq.json)
   - downloads (downloads.json)
   - impressum (impressum.md)
   - datenschutz (datenschutz.md)
   Ensure each file path uses the correct repo prefix: "kanzlei-website/..."

4) Create/keep a separate collection:
   - name: "settings"
   - label: "Daten" (or "Einstellungen")
   Include ONLY:
   - siteSettings.json (page enable/disable, nav label/order)
   - footer.json ONLY if you consider footer as global settings (optional)
   Remove any other "data" entries that are actually page content.

5) Remove duplicates:
   - If the same underlying file appears in two collections, keep it only once.

6) Fix validation blockers:
   - For navLabel/navOrder fields: required: false (or set defaults)
   - Ensure enabled toggle defaults are true for core pages in siteSettings.json

7) Commit + push:
   - "chore: simplify decap cms structure (pages vs settings)"

OUTPUT:
- Updated file paths (config.yml, maybe siteSettings.json)
- PASS/FAIL
STOP.