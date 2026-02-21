OPENCODE TASK — MINI REPORT ADDON: SCAN dist/assets FOR Buffer/toBuffer/gray-matter

GOAL:
Extend the existing build report to also scan the built bundle (dist/assets),
because Buffer/toBuffer can come from dependencies and won’t show up in src scans.

CONSTRAINTS:
- Do NOT print file contents.
- Only output: updated file paths + PASS/FAIL.
- Keep it small: only add a short “Bundle Scan” section to the existing report.

TARGET FILE:
- /docs/mini-build-arch.md (append a new section at the end)

STEPS:

1) Build (ensure dist exists):
- cd kanzlei-website
- npm run build

2) Bundle scan (names/counts only, no snippets):
- Scan ONLY these terms inside dist/assets:
  - Buffer
  - "Buffer is not defined"
  - toBuffer
  - toFile
  - gray-matter
  - fileURLToPath
- For each term, record in the report:
  - term: FOUND/NOT FOUND
  - match count (number)
  - up to 5 file names in dist/assets where it appears (filenames only, no code)

3) Append section to /docs/mini-build-arch.md titled:
  "Bundle Scan (dist/assets)"

4) Output:
- Updated file paths (only /docs/mini-build-arch.md)
- Build result PASS/FAIL
STOP.