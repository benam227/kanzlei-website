OPENCODE PROMPT — Replace homepage “markdown section clones” with structured CMS fields

GOAL:
Make existing homepage UI sections editable via CMS without duplicating sections in homepage.md body.
Use structured JSON content for section titles/intros + hero fields.

CONSTRAINTS:
- Do NOT print file contents.
- Minimal diffs.
- Output only changed file paths + build/typecheck.
- Keep current UI sections; only swap content source.

STEPS:

1) Create structured homepage content:
- Create: kanzlei-website/content/homepage.json with fields:
  - heroTitle (string)
  - heroSubtitle (string)
  - ctaText (string)
  - introText (string, optional)
  - servicesTitle (string)
  - servicesIntro (string, optional)
  - contactTitle (string)
  - contactIntro (string, optional)

2) Update Decap config:
- Update: kanzlei-website/public/admin/config.yml
- Add a new file entry under data/pages (whichever you use) for:
  - file: "kanzlei-website/content/homepage.json"
  - format: json
  - fields matching the keys above

3) Update homepage.md:
- Remove the duplicated markdown section blocks added previously.
- Keep only a short intro paragraph (or leave body empty).
- Keep frontmatter if still used elsewhere, but homepage UI must use homepage.json going forward.

4) Update JSON loader to support object JSON:
- If current loadJson assumes {items:[]}, add a minimal loadJsonObject(path) or extend existing loader to return raw object when no items key exists.

5) Update frontend:
- Update: kanzlei-website/src/pages/HomePage.tsx
  - Load homepage.json and use it for hero + section headings/intros + CTA text.
  - Keep services cards rendering as-is (from services.json).
  - Ensure layout stays boxed/centered.

6) Verify:
- cd kanzlei-website
- npm run build
- npm run typecheck

7) Commit + push:
- "feat: cms-editable structured homepage sections"

STOP when:
- CMS shows editable fields for hero + services section title/intro + contact section title/intro
- Homepage renders using homepage.json (no duplicated markdown sections)