OPENCODE PROMPT 2 — CMS-EDITABLE FOOTER + MOVE LEGAL LINKS TO FOOTER

GOAL:
1) Make footer content editable via Decap CMS (text + contact + legal links).
2) Remove "Impressum" and "Datenschutz" from header navigation.
3) Keep footer rendering consistent site-wide.

CONSTRAINTS:
- Do NOT print full code.
- Output only changed file paths + build/typecheck results.
- Minimal diffs.

STEPS:

A) Add footer content file (repo structure uses subfolder):
1) Create a new content file:
- kanzlei-website/content/footer.json
Format (simple, stable):
{
  "companyName": "",
  "addressLines": ["", ""],
  "email": "",
  "phone": "",
  "footerNote": "",
  "links": [
    { "label": "Impressum", "href": "/impressum" },
    { "label": "Datenschutz", "href": "/datenschutz" }
  ]
}
(Do not fill real personal data unless provided; keep placeholders.)

B) Update Decap CMS config to edit footer:
2) Update: kanzlei-website/public/admin/config.yml
- Add a new entry under the "data" (files) collection:
  - name: "footer"
  - label: "Footer"
  - file: "kanzlei-website/content/footer.json"
  - format: json
  - fields:
    - companyName (string)
    - addressLines (list of strings)
    - email (string, required false)
    - phone (string, required false)
    - footerNote (string, required false)
    - links (list of {label, href})

C) Render footer from content:
3) Update footer component / layout:
- Locate where footer is currently defined (likely in src/layouts/Layout.tsx).
- Load footer.json using existing JSON loader (loadJson) and read data.items pattern if needed.
  NOTE: footer.json is NOT {items:[]} — it is an object.
  Implement a minimal loader for object JSON OR extend loadJson to support both:
   - if json has "items" use it
   - else return json as-is
- Render:
  - companyName
  - addressLines
  - email/phone (only if present)
  - footerNote
  - links (Impressum/Datenschutz)

D) Move legal links out of header:
4) Update header nav (Layout.tsx or Header component):
- Remove menu items for Impressum + Datenschutz from header
- Keep them only in footer links.

E) Verify:
5) cd kanzlei-website
- npm run build
- npm run typecheck

6) Commit + push:
- "feat: cms-editable footer and move legal links to footer"

OUTPUT:
- Updated file paths
- Build/typecheck PASS/FAIL
STOP.