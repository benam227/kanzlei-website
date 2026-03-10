OPENCODE PROMPT — Add YouTube sections (Home + About) + About page (CMS editable)

GOAL:
1) Add a YouTube video section on the homepage (consent-gated).
2) Add a new About page ("/ueber-mich") with CMS-editable biography/vita content and an optional YouTube video (also consent-gated).
3) Keep everything static, minimal diffs, no new heavy deps.

CONSTRAINTS:
- Do NOT print full code to terminal.
- Only output changed file paths + build/typecheck results.
- No new UI libraries.
- Use existing consent/externalMedia gating (GatedEmbed).
- Keep content editable in Decap CMS.

PRE-FLIGHT (repo crawl, minimal):
- Identify existing:
  - src/components/GatedEmbed.tsx
  - consent storage (externalMedia)
  - HomePage.tsx
  - router file (App.tsx)
  - Decap config (public/admin/config.yml)
  - content folder structure (kanzlei-website/content/*)
  - any existing homepage structured content file (homepage.json) if present

PART A — Homepage YouTube section (CMS driven)
1) Add a CMS-editable YouTube URL field for homepage:
- If homepage uses structured JSON (recommended):
  - Add fields to: kanzlei-website/content/homepage.json
    - youtubeTitle (string, optional)
    - youtubeIntro (string, optional)
    - youtubeUrl (string, optional)  (full YouTube URL or embed URL)
- Update Decap config.yml to expose those fields for homepage.json.
- If homepage is still driven from homepage.md frontmatter:
  - Add youtubeUrl/youtubeTitle/youtubeIntro to the structured homepage source you use.
Choose the minimal consistent approach with the current codebase.

2) Render the section on HomePage:
- If youtubeUrl exists:
  - Render a section with title + intro
  - Render <GatedEmbed type="youtube" embedUrl=... title=... />
- Use existing 2-click / externalMedia consent behavior.
- Ensure it is boxed/centered using existing container layout.
- Ensure YouTube is not loaded without externalMedia consent.

NOTE: Convert standard YouTube links to embed links if needed:
- Accept URLs like:
  - https://www.youtube.com/watch?v=VIDEO_ID
  - https://youtu.be/VIDEO_ID
  - https://www.youtube.com/embed/VIDEO_ID
- Implement a tiny helper: toYouTubeEmbedUrl(url) that returns an embed URL or null.

PART B — About page ("/ueber-mich") + CMS content + optional YouTube
3) Create content file for About page:
- Create: kanzlei-website/content/about.json
Fields:
  - title (string) e.g. "Über mich"
  - intro (string, optional)
  - bio (text or markdown)  (choose markdown if you want formatted vita)
  - vita (list of strings) OR (list of {year, text}) for timeline (keep simple)
  - youtubeTitle (string, optional)
  - youtubeUrl (string, optional)

4) Add Decap CMS entry:
- Update: kanzlei-website/public/admin/config.yml
- Add file collection entry for:
  - file: "kanzlei-website/content/about.json"
  - format: json
  - fields matching the keys above

5) Add About page route and page component:
- Create: kanzlei-website/src/pages/AboutPage.tsx
- Add route: "/ueber-mich" in App.tsx
- Add header nav item:
  - Label: "Über mich"
  - Route: "/ueber-mich"
- The page renders:
  - H1 title
  - intro
  - bio (render as plain text or markdown, depending on chosen field type)
  - vita list nicely formatted
  - optional YouTube section using GatedEmbed if youtubeUrl exists
- Ensure the page uses the same boxed/centered container style as other content pages.

6) Add internal link (optional):
- On homepage or footer you may add a small link to "/ueber-mich" (optional; keep minimal).

QUALITY GATES:
- cd kanzlei-website
- npm run build
- npm run typecheck
- (npm run lint if available)

COMMIT:
- "feat: add homepage youtube section and about page with cms content"

STOP when:
- Home shows YouTube section if configured, gated by consent
- About page exists and is editable in CMS, including optional YouTube
- Build/typecheck pass