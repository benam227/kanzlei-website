OPENCODE PROMPT — FIX DECAP CMS EMPTY ENTRIES (REPO SUBFOLDER PATHS)

GOAL:
Decap CMS shows collections but no entries. Fix config.yml paths because the app lives in subfolder "kanzlei-website/".
Decap file paths must be relative to the REPO ROOT.

CONSTRAINTS:
- Do NOT print full file contents.
- Only output: updated file paths + build result.
- Minimal diffs.

STEPS:

1) Confirm actual repo layout (paths only):
- Verify these exist:
  - kanzlei-website/content/homepage.md
  - kanzlei-website/content/services.md
  - kanzlei-website/content/impressum.md
  - kanzlei-website/content/datenschutz.md
  - kanzlei-website/content/faq.json
  - kanzlei-website/content/downloads.json
  - kanzlei-website/public/uploads/ (folder)

2) Open: kanzlei-website/public/admin/config.yml
Patch paths to include the subfolder prefix "kanzlei-website/":

- media_folder: "kanzlei-website/public/uploads"
- public_folder: "/uploads"   (keep as /uploads, because served from the site)

For every file-based entry, change:
- file: "content/xyz"  -> file: "kanzlei-website/content/xyz"

Examples:
- file: "kanzlei-website/content/homepage.md"
- file: "kanzlei-website/content/services.md"
- file: "kanzlei-website/content/impressum.md"
- file: "kanzlei-website/content/datenschutz.md"
- file: "kanzlei-website/content/faq.json"
- file: "kanzlei-website/content/downloads.json"

Do NOT change collection structure (files: schema stays).
Do NOT change field names.

3) Optional sanity: ensure JSON format still { "items": [...] } (no content dump).

4) Build check:
- cd kanzlei-website
- npm run build
- npm run typecheck

5) Commit + push:
- "fix: decap config paths for subfolder repo layout"

OUTPUT:
- Updated file paths (only config.yml if that is the only change)
- Build/typecheck PASS/FAIL
STOP.