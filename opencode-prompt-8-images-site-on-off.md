OPENCODE PROMPT — CMS page toggles + per-page header images

GOAL:
1) Add CMS-controlled page enable/disable (e.g., About page can be turned off).
2) Add per-page header image (upload + alt text) for Homepage, Leistungen, About (and easy to extend).

CONSTRAINTS:
- No backend. Static site only.
- No new heavy deps.
- Do NOT print full code.
- Output only changed file paths + build/typecheck results.
- Keep minimal diffs and reuse existing loaders/components.

PRE-FLIGHT:
- Identify existing pages/routes: /, /leistungen, /ueber-mich (if present), /downloads, /impressum, /datenschutz
- Identify existing CMS JSON files (homepage.json, services.json, about.json etc.)
- Identify navigation implementation (Layout.tsx / Header component)
- Identify JSON loader behavior (supports {items:[]} and plain objects)

PART A — Page toggles (siteSettings)
1) Create: kanzlei-website/content/siteSettings.json
Structure:
{
  "pages": {
    "home": { "enabled": true, "navLabel": "Start", "navOrder": 1 },
    "services": { "enabled": true, "navLabel": "Leistungen", "navOrder": 2 },
    "about": { "enabled": true, "navLabel": "Über mich", "navOrder": 3 },
    "booking": { "enabled": true, "navLabel": "Termin buchen", "navOrder": 4 },
    "faq": { "enabled": true, "navLabel": "FAQ", "navOrder": 5 },
    "downloads": { "enabled": true, "navLabel": "Downloads", "navOrder": 6 }
  }
}

2) Update Decap config:
- Add file entry for siteSettings.json:
  file: "kanzlei-website/content/siteSettings.json"
  format: json
  fields:
    - pages.home.enabled (boolean) etc.
    - navLabel (string)
    - navOrder (number)
Keep it simple; only include toggles + labels + order.

3) Update navigation rendering:
- Load siteSettings.json in Layout/Header.
- Build nav items from enabled pages only, sorted by navOrder.
- Remove hardcoded nav items if currently hardcoded.

4) Update routing behavior:
- If a page is disabled:
  - Do NOT show it in nav.
  - Visiting the route should show NotFound OR redirect to "/".
Choose one:
  - Preferred: show NotFound with message "Diese Seite ist aktuell nicht verfügbar."
Implement minimal guard in each page component (read enabled flag and return NotFound component).

PART B — Header images per page
5) Add header image fields to content:
- For each of:
  - homepage.json (or equivalent)
  - services.json (or services page content file)
  - about.json
Add fields:
  - headerImage (string path from uploads) OR (image widget stores path)
  - headerImageAlt (string)
If these JSON files do not exist, create minimal ones and keep existing fields.

6) Update Decap config for these files:
- Add an image field:
  - widget: image
  - name: headerImage
  - required: false
- Add alt text field:
  - name: headerImageAlt
  - widget: string
  - required: false

7) Create reusable UI component:
- Create src/components/PageHeader.tsx
Props: title, subtitle?, imageSrc?, imageAlt?
- Render boxed/centered.
- If imageSrc present, render <img src="..." alt="..."> with responsive sizing.

8) Wire PageHeader into pages:
- HomePage: use PageHeader (only if you want header image above hero; otherwise use it for the section)
- LeistungenPage and AboutPage: use PageHeader at top with image + title.
Keep minimal and consistent.

QUALITY GATES:
- npm run build
- npm run typecheck

COMMIT:
- "feat: cms page toggles and per-page header images"

STOP when:
- CMS can toggle About enabled/disabled and nav updates accordingly
- Disabled pages are not in nav and show NotFound/redirect
- Header images can be uploaded in CMS and render on the relevant pages
- Build/typecheck pass