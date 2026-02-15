OPENCODE PROMPT — FIX NETLIFY ENOENT package.json + VERIFY DEPLOY SETTINGS

ROLE:
You are a senior engineer helping fix a Netlify build failure:
npm ENOENT: Could not read package.json at /opt/build/repo/package.json

GOAL:
Confirm where package.json lives, then apply the minimal fix so Netlify runs `npm run build`
in the correct directory and publishes the correct `dist/`.

CONSTRAINTS:
- Do NOT print source code or file contents.
- Only print: commands executed, discovered paths, PASS/FAIL, and the exact Netlify settings to enter.
- Work context-efficiently: crawl structure, open only what is necessary.

TASKS (DO IN ORDER):

1) Repo structure crawl (paths only):
Run these commands from the repo root:
- pwd
- git rev-parse --show-toplevel
- ls -la
- find . -maxdepth 4 -name package.json
- find . -maxdepth 4 -name vite.config.* -o -name index.html -o -name src -o -name public
Output ONLY the found paths (no contents).

2) Decide correct Netlify base directory:
- Identify the folder that contains package.json AND the Vite app (src/, public/, vite.config.*).
Call this folder <APP_DIR>.

3) Local verification (must pass):
- cd <APP_DIR>
- npm ci (or npm install if lockfile missing)
- npm run build
- Confirm that <APP_DIR>/dist exists after build
Output PASS/FAIL only + the dist path.

4) Provide EXACT Netlify settings (minimal change):
In Netlify site settings → Build & deploy → Build settings:
- Base directory: <APP_DIR>   (relative path from repo root, e.g. "kanzlei-website")
- Build command: npm run build
- Publish directory: dist
Also instruct:
- Clear Package directory (leave blank)
- Clear Functions directory (leave blank)
- If any Next.js runtime/plugin is enabled, remove it (project is Vite/React).

5) Post-fix verification guidance:
After saving settings, trigger: "Clear cache and deploy".
Expected deploy log must show:
- Current directory: /opt/build/repo/<APP_DIR>
- npm finds package.json
- Publish directory resolves to /opt/build/repo/<APP_DIR>/dist

STOP:
Stop after:
- You have printed <APP_DIR> and the Netlify settings above,
- and local build PASS is confirmed.