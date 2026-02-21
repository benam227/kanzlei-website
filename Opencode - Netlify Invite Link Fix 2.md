OPENCODE TASK — REMOVE INVALID /.netlify REDIRECT

1) Open repo-root netlify.toml
2) Remove any redirect rule whose "from" starts with "/.netlify/"
3) Keep only:
   - /admin/* -> /admin/:splat 200
   - /* -> /index.html 200
4) Commit + push: "chore: remove invalid netlify redirect"