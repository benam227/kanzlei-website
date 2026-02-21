OPENCODE TASK — FIX DECAP LOGIN REDIRECT LOOP (/admin/#/ <-> /admin/)

GOAL:
Stop infinite redirect loop after Decap login.
Ensure post-login landing stays on /admin/#/ (Decap hash router).

CONSTRAINTS:
- Do NOT print file contents.
- Only output changed file paths + build result.
- Minimal diff only.

STEPS:
1) Open: kanzlei-website/public/admin/index.html
2) Find any netlify identity widget snippet such as:
   - netlifyIdentity.on("login", ...)
   - netlifyIdentity.on("init", ...)
   - any code redirecting to "/admin/" or adding/removing "#/"
3) Patch logic:
   - On login: redirect to "/admin/#/" using location.replace
   - Example target: location.replace("/admin/#/")
   - Ensure it does NOT redirect if already at "/admin/#/".
4) Remove/disable any code that forces "/admin/" (without hash) after login.
5) Build:
   - cd kanzlei-website
   - npm run build
6) Commit + push:
   - "fix: decap admin login redirect to hash route"

OUTPUT:
- Updated file paths
- Build PASS/FAIL
STOP.