OPENCODE PROMPT 1 — Multilingual Setup (Part 1): Content-Struktur + i18n Basis

CONTEXT:
Kanzlei Website mit Vite + React 19 + TypeScript + Tailwind + React Router DOM 7 + Decap CMS + Netlify.
Projektpfad: /home/alex/Lauris Projekt/kanzlei-website
Ziel: Deutsch (Default unter /) + Englisch unter /en

HARD RULES:
- KEIN Code im Terminal ausgeben (keine File-Inhalte).
- Alle Änderungen in Dateien schreiben.
- Terminal output nur:
  - created/updated file paths
  - build/typecheck results
  - kurze PASS/FAIL Notizen
- Minimaler Diff, keine unnötigen Refactors.

PART 1 REQUIREMENTS (aus PART1.md):
1) Dependencies installieren:
- i18next, react-i18next, i18next-browser-languagedetector

2) Content-Dateien sprachfähig machen (umbenennen + Platzhalter Englisch):
- Bestehende Content-Dateien in /kanzlei-website/content umbenennen:
  - JSON: *.json => *.de.json
  - MD: *.md => *.de.md
- Danach englische Placeholder-Dateien anlegen:
  - *.en.json und *.en.md (initial als Kopie der deutschen Version)

3) Content Loader Vorbereitung (kein finaler Code hier):
- Ziel ist später dynamisches Laden per Vite glob import anhand filename + lang
- Noch NICHT die komplette Router-Umstellung erzwingen (kommt in Part 2)

STEPS:
A) Repo Crawl:
- Prüfe vorhandene Struktur und welche Dateien existieren unter kanzlei-website/content/
- Erstelle ein Backup-Verzeichnis (content-backup) im Repo (ohne Inhalte zu dumpen)

B) Rename + Copy:
- Renames:
  - homepage.json -> homepage.de.json (falls vorhanden)
  - about.json -> about.de.json
  - services.json -> services.de.json
  - faq.json -> faq.de.json
  - downloads.json -> downloads.de.json
  - footer.json -> footer.de.json
  - siteSettings.json -> siteSettings.de.json
  - impressum.md -> impressum.de.md
  - datenschutz.md -> datenschutz.de.md
- Copies (Placeholder Englisch):
  - *.de.json => *.en.json
  - *.de.md => *.en.md

C) Dependency Install:
- cd kanzlei-website
- npm install i18next react-i18next i18next-browser-languagedetector

D) Quality gates:
- npm run build
- npm run typecheck

COMMIT:
- Commit message: "feat: add multilingual content scaffolding (de/en) + i18n deps"
- Push to main

STOP CONDITION:
- Alle Content-Dateien existieren als .de.* und .en.* (placeholder ok)
- Build + typecheck PASS
