OPENCODE PROMPT — FIX NETLIFY “package.json not found” (BASE DIRECTORY / REPO ROOT)

ROLE:
You are a senior DevOps-aware frontend engineer. Diagnose and fix Netlify build failing with:
ENOENT: no such file or directory, open '/opt/build/repo/package.json'

CONSTRAINTS:
- Do NOT print file contents to terminal.
- Work context-efficiently (limited context).
- Only output: commands run, created/updated file paths, and PASS/FAIL.
- Prefer minimal changes. Do not refactor app code.

KNOWN FACT:
Netlify is building at repo root (/opt/build/repo) but package.json is not there.
This means the app is inside a subdirectory OR the wrong folder was pushed.

TASKS (DO IN ORDER):

1) Repo crawl (structure only):
- From the current working directory, identify:
  a) the git repo root
  b) where package.json actually lives
- Run:
  - git rev-parse --show-toplevel
  - pwd
  - ls -la
  - find . -maxdepth 4 -name package.json
- Output ONLY the paths (no file contents).

2) Decide the minimal fix strategy:
- If package.json exists in a subfolder (e.g. ./kanzlei-website/package.json):
  Strategy A (preferred): Fix Netlify settings by setting Base directory to that subfolder.
  Provide exact Netlify UI values:
    - Base directory: <subfolder>
    - Build command: npm run build
    - Publish directory: <subfolder>/dist
  (No repo file changes needed.)

- If there is no package.json anywhere:
  Strategy B: You pushed the wrong folder. Fix by ensuring the correct app folder is committed.
  Identify where the actual app folder is (src/, public/, vite config).
  Then stage+commit+push the correct folder to GitHub.

- If package.json is in repo root already:
  Strategy C: Netlify is connected to wrong repo/branch. Report that.

3) OPTIONAL (only if Strategy A is not possible and we choose Strategy B):
Move app to repo root so Netlify works with default settings:
- Ensure you are in the git repo root.
- Move contents of the app subfolder to repo root:
  - mv <subfolder>/* .
  - mv <subfolder>/.* . (best-effort, ignore errors)
  - rmdir <subfolder> (if empty)
- Update publish directory in Netlify to "dist".
- Commit with message: "chore: move app to repo root for Netlify"
- Push to origin main.

4) Verification checklist:
- Confirm package.json exists at the path Netlify will use (repo root OR base directory).
- Confirm Vite output folder is dist.
- Provide PASS/FAIL and the exact Netlify settings to use.

STOP:
Stop after producing either:
- Netlify settings for Strategy A (Base directory fix), OR
- Completed repo restructure + pushed changes for Strategy B, OR
- Clear diagnosis for Strategy C.