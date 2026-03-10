OPENCODE PROMPT — FIX MOBILE HEADER NAV (BURGER MENU)

GOAL:
Make header responsive on mobile:
- no horizontal scroll
- no overlap
- stable layout
Implement a burger menu for <= md breakpoint.

CONSTRAINTS:
- No UI libraries.
- Use Tailwind only.
- Keep desktop nav as-is.
- Do NOT print full code.
- Output only changed files + build/typecheck.

STEPS:
1) Locate header/nav in kanzlei-website/src/layouts/Layout.tsx (or Header component).
2) Implement:
- Desktop (md+): normal horizontal nav
- Mobile (<md): show
  - Logo left
  - Burger button right
  - Menu opens as dropdown/drawer (simple overlay or below-header panel)
3) Ensure:
- body does not horizontally scroll (add overflow-x-hidden where appropriate)
- links are keyboard accessible
- burger button has aria-expanded and aria-controls
- menu closes on link click
4) npm run build + typecheck
5) Commit: "fix: responsive mobile header nav"

STOP.