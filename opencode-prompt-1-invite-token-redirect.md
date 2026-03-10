OPENCODE PROMPT — FIX INVITE LINK AUTO-REDIRECT TO /admin/#...

GOAL:
When visiting:
https://laurisprojekt.netlify.app/#invite_token=...
the browser should automatically redirect to:
https://laurisprojekt.netlify.app/admin/#invite_token=...
Same for:
#recovery_token= and #confirmation_token=

CONSTRAINTS:
- No new dependencies.
- Do NOT print full code.
- Only output changed file paths + build/typecheck.

STEPS:
1) Open kanzlei-website/index.html (Vite entry HTML).
2) Add a tiny inline script in <head> that:
   - checks location.hash for invite_token/recovery_token/confirmation_token
   - if present AND pathname does NOT start with "/admin":
     location.replace("/admin/" + location.hash)
   - do nothing if already in /admin
3) npm run build (from kanzlei-website)
4) Commit + push: "fix: redirect identity token links to /admin"

STOP.