OPENCODE TASK — MINI BUILD ARCH REPORT (DEBUG-FOCUSED, LOW COST)

ROLE:
Senior build/debug engineer. Create a compact report that captures only what is needed to debug production issues (e.g., Buffer in browser) and Netlify/Vite build behavior.

CONSTRAINTS:
- Do NOT print full source code or file contents to terminal.
- Only output: commands run, created/updated file paths, PASS/FAIL.
- Save results into ONE markdown file only.
- Minimize repo traversal: no deep tree dumps.

DELIVERABLE:
Create/overwrite: /docs/mini-build-arch.md

STEPS:

1) Minimal structure confirmation (paths only):
- From repo root, confirm existence of:
  - ./netlify.toml
  - ./kanzlei-website/package.json
  - ./kanzlei-website/vite.config.*
  - ./kanzlei-website/src/main.tsx
  - ./kanzlei-website/src/App.tsx
  - ./kanzlei-website/src/lib/content/ (folder)
Write ONLY these paths (as a list) into the report.

2) Netlify build config summary (NO dumping):
- Read ./netlify.toml and summarize ONLY:
  - build.base
  - build.command
  - build.publish
  - whether redirects are defined there (yes/no) + how many
Write the summarized values into the report (not the whole file).

3) Build + artifact map (names only):
- cd kanzlei-website
- npm run build
- Record in the report:
  - dist/ exists (yes/no)
  - dist/index.html exists (yes/no)
  - dist/assets file count (number only)
  - presence of dist/_redirects (yes/no)
  - presence of dist/admin/ (yes/no)
  - presence of dist/sitemap.xml + dist/robots.txt (yes/no)

4) “Node-in-browser risk scan” (paths only, no snippets):
From repo root, run searches and record ONLY matching file paths + counts:
- Buffer
- toBuffer
- toFile
- fs.
- path.
- process.
- fileURLToPath
- localhost:8081
Write a short section:
- Token -> count
- Token -> file paths (max 10 paths per token; if more, write “+N more”)

5) Identify the content pipeline entrypoints (paths only):
- List files under kanzlei-website/src/lib/content/ (max depth 2) by path only.
- Also record which pages import markdown/json loaders:
  - Search for "loadMarkdown" and "loadJson" usage; write file paths only.

6) Final status:
- Report ends with:
  - "Build: PASS/FAIL"
  - "Top suspected cause of Buffer crash: <one sentence based on scan results>"

OUTPUT:
- Created/updated file paths (only /docs/mini-build-arch.md if created)
- Build result PASS/FAIL
STOP.