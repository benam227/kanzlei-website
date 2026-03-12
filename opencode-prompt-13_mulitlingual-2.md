OPENCODE PROMPT 2 — Multilingual Implementation (Part 2): Dynamic Loaders + Routes + Switcher + Decap

CONTEXT:
Wie oben. Deutsch Default (/) und Englisch (/en). Content liegt als:
- /kanzlei-website/content/<name>.de.json / <name>.en.json
- /kanzlei-website/content/<name>.de.md / <name>.en.md

HARD RULES:
- Kein Code im Terminal.
- Nur Pfade + build/typecheck.
- Minimal diff; bestehende Architektur respektieren.

CRITICAL NOTE:
In eurem Projekt wurde gray-matter entfernt (Buffer crash). Daher:
- KEIN gray-matter einführen.
- Markdown Frontmatter weiterhin über den bestehenden einfachen Parser lösen (loadMarkdown.ts).

REQUIREMENTS (aus PART2.md):
1) Rewrite loadJson.ts: dynamic per language via import.meta.glob
- Use Vite glob import for /content/*.json (eager)
- Load filename + lang
- Fallback: requested lang -> de

2) Rewrite loadMarkdown.ts: dynamic per language via import.meta.glob
- Use Vite glob import for /content/*.md with ?raw (eager)
- Parse frontmatter + body via bestehenden Parser (nicht gray-matter)
- Fallback: requested lang -> de

3) i18n configuration files:
- Create src/i18n/config.ts (language list, default)
- Create src/i18n/index.ts (i18next init + detector)
- Add minimal UI translation keys later (Part 2B)

4) App routing:
- German routes under /
- English routes under /en
- Implement route parameter or wrapper that provides lang to pages

5) Language Switcher component:
- Toggle between DE and EN
- Preserves the current route where possible

6) main.tsx:
- Initialize i18n before render

7) Decap CMS config update:
- Ensure CMS can edit both de and en content files (file paths must include kanzlei-website/ prefix!)
- Keep collections readable; do not duplicate broken entries

STEPS:
A) Dynamic JSON loader:
- Update kanzlei-website/src/lib/content/loadJson.ts to support:
  - loadJsonFile(filename, lang): loads /content/<filename>.<lang>.json
  - fallback to .de.json
- Ensure it still supports both "object JSON" and "{items:[]}" JSON used in your project.

B) Dynamic Markdown loader:
- Update kanzlei-website/src/lib/content/loadMarkdown.ts similarly:
  - loads /content/<filename>.<lang>.md via ?raw glob
  - parses frontmatter/body using your existing safe parser
  - fallback to .de.md

C) i18n bootstrap:
- Create/Update:
  - src/i18n/config.ts
  - src/i18n/index.ts (init i18next + detector)
- Use default lang: de. EN served by route (/en)

D) Routing changes:
- Update src/App.tsx so that:
  - German is default: /...
  - English is nested under /en/...
- Ensure pages receive a lang value ("de"|"en") and pass it to loaders.

E) Language switcher:
- Create component src/components/LanguageSwitcher.tsx
- Place it in Layout header
- Switching logic:
  - if current path starts with /en -> switch to german path (strip /en)
  - else -> add /en prefix
- Keep minimal, no libs.

F) Decap CMS:
- Update kanzlei-website/public/admin/config.yml:
  - Add DE + EN file entries for each content file (homepage, about, services, faq, downloads, footer, siteSettings, impressum, datenschutz)
  - Make sure file paths include subfolder prefix:
    - "kanzlei-website/content/homepage.de.json"
    - "kanzlei-website/content/homepage.en.json"
    - etc.
- Keep labels clear: "Homepage (DE)" / "Homepage (EN)" etc.

QUALITY GATES:
- cd kanzlei-website
- npm run build
- npm run typecheck

COMMIT:
- "feat: implement de/en routes + dynamic content loaders + cms locales"

STOP CONDITION:
- / renders German content
- /en renders English content (placeholder ok)
- Language switcher toggles between de/en routes
- CMS shows DE and EN entries and can publish
- build/typecheck PASS
