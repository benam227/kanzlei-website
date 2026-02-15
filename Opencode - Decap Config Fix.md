OPENCODE TASK — FIX DECAP CONFIG + DEBUG WHITE SCREEN (NETLIFY)

ROLE:
You are a senior frontend engineer with Netlify/Decap CMS experience.
Fix the Decap CMS config validation error and then diagnose the white screen on the deployed site.

CONSTRAINTS:
- Do NOT print full source code to terminal.
- Write all changes to files locally.
- Output ONLY:
  - created/updated file paths
  - commands run (short)
  - build/typecheck results
  - the ONE key error line found during debugging (if any)
- Make minimal diffs. Do not refactor.
- Work context-efficiently: crawl repo first, open only required files.

PART 0 — REPO CRAWL (MUST DO FIRST)
1) In repo root, list structure (max depth 3) to confirm:
   - public/admin/config.yml exists
   - content/*.md and content/*.json exist
2) Open ONLY:
   - public/admin/config.yml
   - content/faq.json and content/downloads.json (structure only; confirm { "items": [...] })
   - package.json (scripts)
   - src/lib/content/loadJson.ts (to confirm it reads data.items)
No file dumping; only confirm presence/format.

PART 1 — FIX DECAP CMS CONFIG ERROR
Problem:
Decap config error says each collections[i] must have required property 'files' or 'folder'.
So config.yml is using invalid collection schema.

Action:
Replace the entire `collections:` block in `public/admin/config.yml` with a valid `files:` based config for our singletons:

Use EXACTLY this structure (keep existing backend/media_folder/public_folder as-is):
collections:
  - name: "pages"
    label: "Seiten"
    files:
      - name: "homepage"
        label: "Homepage"
        file: "content/homepage.md"
        fields:
          - { label: "Titel", name: "title", widget: "string" }
          - { label: "Beschreibung", name: "description", widget: "string", required: false }
          - { label: "Inhalt", name: "body", widget: "markdown" }
      - name: "services"
        label: "Leistungen"
        file: "content/services.md"
        fields:
          - { label: "Titel", name: "title", widget: "string" }
          - { label: "Beschreibung", name: "description", widget: "string", required: false }
          - { label: "Inhalt", name: "body", widget: "markdown" }
      - name: "impressum"
        label: "Impressum"
        file: "content/impressum.md"
        fields:
          - { label: "Titel", name: "title", widget: "string" }
          - { label: "Beschreibung", name: "description", widget: "string", required: false }
          - { label: "Inhalt", name: "body", widget: "markdown" }
      - name: "datenschutz"
        label: "Datenschutz"
        file: "content/datenschutz.md"
        fields:
          - { label: "Titel", name: "title", widget: "string" }
          - { label: "Beschreibung", name: "description", widget: "string", required: false }
          - { label: "Inhalt", name: "body", widget: "markdown" }

  - name: "data"
    label: "Daten"
    files:
      - name: "faq"
        label: "FAQ"
        file: "content/faq.json"
        format: "json"
        fields:
          - label: "Einträge"
            name: "items"
            widget: "list"
            fields:
              - { label: "Frage", name: "question", widget: "string" }
              - { label: "Antwort", name: "answer", widget: "text" }

      - name: "downloads"
        label: "Downloads"
        file: "content/downloads.json"
        format: "json"
        fields:
          - label: "Einträge"
            name: "items"
            widget: "list"
            fields:
              - { label: "Titel", name: "title", widget: "string" }
              - { label: "Beschreibung", name: "description", widget: "string", required: false }
              - { label: "Dateipfad", name: "href", widget: "string" }

Then:
- Save file.
- Run:
  - npm run build
  - npm run typecheck
- Commit with message: "fix: decap config collections schema"
- Push to origin main

PART 2 — WHITE SCREEN DEBUG (MINIMAL)
After push/deploy, white screen likely due to runtime error or missing base directory/publish dir.

Do these minimal diagnostics locally first:
1) Run `npm run build` and `npm run preview` (or `npm run dev`) and open the site locally.
2) If local works, likely Netlify config/env mismatch.

Create a small debug checklist file (do not print it) at:
- /docs/netlify-debug.md
Include:
- Confirm Netlify publish dir = dist
- Confirm Base directory set correctly (if repo has subfolder)
- Confirm required env vars exist in Netlify:
  - VITE_SITE_URL
  - VITE_ACUITY_EMBED_URL
  - (optional) Matomo vars
- Confirm public/_redirects exists in dist

If the site is still white on Netlify:
- Identify the FIRST error line from browser console (or Netlify deploy logs) and output ONLY that one line as the key finding (no dumps).
- Apply the minimal fix (e.g., missing env guard, wrong asset base path, router issue).

OUTPUT:
- List updated files
- Build/typecheck results
- Commit hash (short)
- ONE key error line if white screen persists and what minimal fix was applied
STOP when /admin loads without config error and site renders (no white screen).