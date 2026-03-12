OPENCODE PROMPT — Website CMS Improvements (Sections, Ordering, Custom Sections, Hero BG, About Image)

ROLE:
You are a senior frontend engineer (React + Vite + TS + Tailwind) and Decap CMS integrator.
You produce clean, minimal, production-ready code. WCAG-AA minded. No overengineering.

PROJECT CONTEXT:
German law firm website with:
- Vite + React + TypeScript + Tailwind
- Decap CMS
Repo location: /home/alex/Lauris Projekt/kanzlei-website

HARD RULES:
- Do NOT print full source code to the terminal.
- Write all changes to local filesystem only.
- Terminal output ONLY:
  - created/updated file paths
  - build/typecheck results
  - concise PASS/FAIL notes
- Keep changes minimal and incremental.

REQUIREMENTS (IMPLEMENT IN THIS ORDER):

1) Remove blank text section (Homepage)
- Remove the empty "Herzlich willkommen" text section from homepage frontend.
- File: src/pages/HomePage.tsx (lines 36–46)
- Ensure homepage still renders correctly after removal.

2) Drag-and-drop section reordering via CMS (native Decap list widget)
2a) Homepage section ordering
- Make homepage sections reorderable via CMS using a list widget.
- Target sections (as IDs/keys): Video, Leistungen, Downloads, FAQ, Stats, CTA, Contact
- Add `sectionOrder` array to `content/homepage.json`
  Example: ["video","services","downloads","faq","stats","cta","contact"]
- HomePage.tsx must render sections based on this order (and only those enabled/available).

2b) Leistungen page ordering
- Make services reorderable via CMS list widget.
- Add `itemOrder` array to `content/services.json`
  Example: ["asylrecht","aufenthaltsrecht","staatsangehoerigkeit"]
- LeistungenPage.tsx must render services based on itemOrder.

3) Custom sections capability (Homepage)
- Allow editors to add completely new custom sections via CMS.
- Add `customSections` list field to `content/homepage.json`
  Each custom section supports:
  - id (string, unique)
  - title (string)
  - content (markdown)
  - backgroundImage (image path)
  - type (select: "text" | "cta" | "image" | "video")
  - youtubeUrl (string, optional; only for type="video")
- HomePage.tsx must be able to render these custom sections in the section flow.
- customSections must be insertable into ordering (either:
  - allow "custom:<id>" entries in sectionOrder, OR
  - append custom sections at the end (choose the simplest workable approach)).

4) Background image for hero (Homepage)
- Add `heroBackgroundImage` field to `content/homepage.json` (image path + optional alt).
- Render it in HomePage hero with a gradient overlay (so text stays readable).
- Must be responsive and not cause layout shift.

5) About page image support verification
- Verify About page renders header image correctly via PageHeader component.
- If About content file has headerImage/headerImageAlt fields, ensure AboutPage passes them to PageHeader.
- If missing, add minimal support (no redesign).

FILES TO MODIFY (EXPECTED):
- public/admin/config.yml
  - Add new CMS fields:
    - homepage.json: sectionOrder, customSections, heroBackgroundImage
    - services.json: itemOrder
    - Ensure widgets: list + markdown + image + select
- content/homepage.json
  - Add sectionOrder
  - Add customSections list
  - Add heroBackgroundImage
- content/services.json
  - Add itemOrder
- src/pages/HomePage.tsx
  - Remove blank section
  - Refactor to render sections dynamically by order
  - Render hero background image with overlay
  - Render custom sections
- src/pages/LeistungenPage.tsx
  - Render services by itemOrder
- (Optional) src/pages/AboutPage.tsx
  - Ensure PageHeader gets header image props

IMPLEMENTATION NOTES:
- Use existing loaders for JSON objects.
- Do NOT introduce new libraries.
- For markdown rendering inside custom sections, reuse existing react-markdown setup.
- For background images, use <img> or CSS background with Tailwind; ensure alt handling.

QUALITY GATES (MUST PASS):
- cd into project root (kanzlei-website)
- npm run build
- npm run typecheck
- npm run lint (only if script exists; do not add eslint)

OUTPUT REQUIREMENTS:
- Print only:
  - Created/updated file paths
  - Results of quality gates (PASS/FAIL)
  - 1–2 line summary of what changed (no code dump)

STOP CONDITION:
Stop when:
- Homepage has no blank text section
- Homepage sections reorder correctly based on CMS sectionOrder
- Leistungen reorder correctly based on CMS itemOrder
- Custom sections can be added in CMS and rendered
- Hero background image renders with overlay
- About header image renders correctly
- Build/typecheck pass