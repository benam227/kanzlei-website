OPENCODE TASK — FIX NETLIFY IDENTITY INVITE LINK (Decap token link fails)

GOAL:
Make Netlify Identity/Decap invite/password-token flow work reliably.

CONSTRAINTS:
- Do NOT print full code.
- Output only changed file paths + build result.

STEPS:
1) Open repo-root netlify.toml.
2) Ensure redirects include (in this exact order):
   - /.netlify/identity/callback -> /admin/ (302)
   - /admin/* -> /admin/:splat (200)
   - /* -> /index.html (200)
3) Open kanzlei-website/public/admin/index.html:
   - Confirm netlify-identity-widget script is included:
     https://identity.netlify.com/v1/netlify-identity-widget.js
   - Confirm login redirect handler exists:
     on("login") -> document.location.href = "/admin/"
   (Add minimal snippet if missing.)
4) Run local build:
   - cd kanzlei-website
   - npm run build
5) Commit + push:
   "fix: netlify identity callback redirect for decap"

STOP.