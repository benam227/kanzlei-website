OPENCODE PROMPT 1 — FIX BUG 6 (Decap CMS shows empty content / not connected)

GOAL:
Fix Decap CMS so existing content from /kanzlei-website/content/* is shown in the CMS editor and edits persist correctly.
After publish:
- Commit appears on GitHub main
- Netlify deploy triggers
- Live site reflects changes

CONSTRAINTS:
- Do NOT print full file contents to terminal.
- Only output: updated file paths + build/typecheck results + short PASS/FAIL notes.
- Minimal diffs: do not refactor unrelated code.
- Work context-efficiently: crawl only necessary files.

PRE-FLIGHT (MUST DO FIRST):
1) Confirm these files exist (paths only):
- kanzlei-website/public/admin/config.yml
- kanzlei-website/content/homepage.md
- kanzlei-website/content/services.md
- kanzlei-website/content/impressum.md
- kanzlei-website/content/datenschutz.md
- kanzlei-website/content/faq.json (must be { "items": [...] })
- kanzlei-website/content/downloads.json (must be { "items": [...] })

2) Determine actual frontmatter format used in markdown files:
- Read ONLY the first ~30 lines of each markdown file (homepage/services/impressum/datenschutz) to detect:
  - whether frontmatter exists
  - keys used (title/description)
  - whether it uses simple "key: value" lines
Do NOT dump the whole file.

TASK A — Align Decap fields with real file structure:
3) Open kanzlei-website/public/admin/config.yml and validate:
- backend: git-gateway, branch: main
- media_folder: "public/uploads"
- public_folder: "/uploads"
- collections use "files:" structure for singletons

4) For each singleton markdown file entry (homepage/services/impressum/datenschutz):
- Ensure fields match actual frontmatter keys:
  - title (string) MUST map to existing key or be added to files
  - description (string) optional
  - body (markdown) is the markdown content

If markdown files currently have NO frontmatter:
- Add minimal frontmatter to each file:
  ---
  title: "..."
  description: "..."
  ---
- Keep body unchanged.

If frontmatter exists but uses different keys:
- Either:
  a) update config.yml fields to match existing keys, OR
  b) rename keys in markdown to title/description for consistency
Choose the minimal-change option.

TASK B — Ensure CMS correctly edits JSON files:
5) Ensure FAQ and Downloads collections:
- file: content/faq.json, format: json
- fields: items (list of {question, answer})
- file: content/downloads.json, format: json
- fields: items (list of {title, description?, href})
Confirm field names match real JSON keys.

TASK C — Ensure /admin experience is stable:
6) Verify admin index exists:
- kanzlei-website/public/admin/index.html
- It must include decap cms script and netlify identity widget
- Ensure login redirect loop fix remains (redirect to /admin/#/)

TASK D — Verification steps (must pass):
7) Local build verification:
- cd kanzlei-website
- npm run build
- npm run typecheck

8) Commit + push:
- Commit message: "fix: align decap cms fields with content files"
- Push to main

9) Write a short checklist file for the human operator:
Create /docs/decap-validation.md with steps:
- open /admin/#/
- verify each collection shows existing content
- edit homepage title/body and publish
- check GitHub commit appears
- check Netlify deploy runs
(Keep it short.)

OUTPUT:
- Updated file paths
- Build/typecheck PASS/FAIL
- Note which content files were modified (frontmatter added/adjusted) yes/no
STOP.