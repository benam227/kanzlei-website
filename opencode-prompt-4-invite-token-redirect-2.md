OPENCODE FIX — Invite token redirect should land on /admin/#/ + token

GOAL:
Ensure visiting /#invite_token=... redirects to /admin/#/invite_token=... (or /admin/#/ + token)
so Decap loads the correct password-set panel on first try.

STEPS:
1) Open: kanzlei-website/index.html
2) Update redirect script:
   - If hash contains invite_token/recovery_token/confirmation_token AND pathname not /admin:
     location.replace("/admin/#/" + location.hash)
   (Important: include "#/" before the token hash)
3) Build: npm run build (from kanzlei-website)
4) Commit+push: "fix: identity token redirect to /admin/#/"

Do not print code. Output only changed paths + build result.