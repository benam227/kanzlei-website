OPENCODE PROMPT 3 — Multilingual UI + Tests (Part 2B): UI Translations + Page Updates + Checklist

CONTEXT:
Multilingual foundation is implemented (Part 1 + Part 2).
Now:
- UI labels should be translated using translation JSON files
- Pages should load content by lang
- Provide a robust testing checklist and production notes

HARD RULES:
- No code dumps in terminal.
- Only changed file paths + build/typecheck + PASS/FAIL notes.

REQUIREMENTS (aus PART2B.md):
1) UI translation files:
- Create:
  - src/i18n/translations/de.json
  - src/i18n/translations/en.json
Include keys for:
- navigation labels (Start, Leistungen, Über mich, Termin buchen, FAQ, Downloads, etc.)
- common CTAs (Jetzt Termin buchen)
- cookie/consent labels if applicable

2) Layout update:
- Ensure LanguageSwitcher is visible and uses i18n labels where appropriate

3) Update pages to use language parameter:
- All pages should request content using lang ("de"/"en")
- Example pattern: loadHomepage(lang), loadServices(lang), etc.
- Ensure fallback works (if EN content missing, fallback to DE)

4) Testing checklist:
- Build test
- Dev server test
- Switching test
- Navigation test
- Direct URL test
- Troubleshooting notes for common issues:
  - module not found for en files
  - content remains German when switching
  - switcher not showing
  - TS errors with glob imports

5) Production deployment notes:
- Ensure Netlify still builds with base dir/publish configured
- Ensure /en routes work with SPA redirects

STEPS:
A) Add translation JSONs:
- Create de.json/en.json under src/i18n/translations/
- Wire them into i18n init (src/i18n/index.ts) as resources.

B) Replace hardcoded UI labels (minimal, only core):
- Header nav labels
- Footer legal labels if needed
- Button labels that appear globally
Use `t("key")` via react-i18next hook.

C) Pages: ensure lang flows everywhere:
- Ensure each page uses the lang coming from route context (/ vs /en)
- Make sure all content loads with the lang param.

D) Testing doc:
- Create /docs/i18n-testing-checklist.md with the Part2B checklist.

QUALITY GATES:
- cd kanzlei-website
- npm run build
- npm run typecheck

COMMIT:
- "feat: ui translations de/en + i18n test checklist"

STOP CONDITION:
- Switching language changes UI labels
- Content changes by language (or falls back correctly)
- / and /en both work with direct navigation
- build/typecheck PASS
