OPENCODE TASK — LIVE SITE CRAWL + ERROR REPORT (Playwright)

GOAL:
Crawl https://laurisprojekt.netlify.app/ with a headless browser, detect:
- console errors/warnings
- network failures (404/500)
- broken internal links
- SPA route coverage
- basic accessibility issues (axe)

OUTPUT FILES (write locally, no terminal dumps):
- /docs/site-crawl-report.md
- /docs/site-crawl-report.json

CONSTRAINTS:
- Do NOT print source code or large outputs to terminal.
- Terminal output only: created/updated file paths + PASS/FAIL summaries.
- Keep deps minimal.

STEPS:

1) Add minimal tooling (repo root):
- Create folder: /scripts
- Add Playwright + axe:
  - cd kanzlei-website
  - npm i -D playwright @axe-core/playwright
  - npx playwright install chromium

2) Create crawler script:
- Create: /scripts/crawl-site.mjs
Requirements for script:
- Use Chromium headless
- Base URL = https://laurisprojekt.netlify.app
- Visit these routes:
  /, /termin-buchen, /faq, /downloads, /impressum, /datenschutz, /admin
- For each route collect:
  a) console messages (type, text)
  b) failed requests + status codes (404/500)
  c) document title
  d) presence of main landmarks (header/nav/main/footer) basic check
  e) run axe accessibility scan for WCAG AA (report violations count + top 10 items)
- Also extract internal <a href> links from each page and verify they return 200 (same-origin only)
- Save report to:
  - docs/site-crawl-report.json (full structured data)
  - docs/site-crawl-report.md (human summary: per-route table + top issues list)

3) Run crawl:
- node scripts/crawl-site.mjs
- Mark PASS if:
  - no uncaught errors
  - no 404/500 for same-origin assets
- Otherwise FAIL and list top 10 issues in the markdown report.

4) Quick “obvious issues” checks in repo (paths only, no code dump):
- Search for refresh.js or localhost:8081 references
- Search for Permissions-Policy / browsing-topics in:
  - public/_headers
  - netlify.toml headers section (if any)
Record findings in the report.

5) Output:
- Updated/created file paths
- Crawl result: PASS/FAIL
STOP.