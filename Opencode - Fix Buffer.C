OPENCODE TASK — FIX "Buffer is not defined" in Markdown Loader (Vite/React static site)

ROLE:
Senior frontend engineer. Fix production crash: Buffer is not defined.
Cause: src/lib/content/loadMarkdown.ts uses Node-style Buffer/toBuffer/toFile logic.

CONSTRAINTS:
- Do NOT print full source code.
- Only output: changed file paths + build/typecheck results.
- Keep changes minimal, static-site friendly.

PLAN:
We will replace the markdown loader to use Vite raw imports (no Buffer, no fetch),
so content is bundled at build time.

STEPS:

1) Locate the loader:
- Open: kanzlei-website/src/lib/content/loadMarkdown.ts
- Identify any usage of Buffer, toBuffer, toFile, or Node-only APIs.

2) Replace implementation:
- Implement a simple loader that returns frontmatter + markdown body WITHOUT Buffer.
- Use `gray-matter` directly on a string input (it works in browser/bundled).
- Signature should remain compatible with existing calls.

3) Update call sites to use raw imports:
- Open: kanzlei-website/src/lib/content/index.ts (or wherever loadHomepage/loadServices is)
- Replace any file-path-based calls with raw imports:
  - import homepageRaw from "../../../content/homepage.md?raw"
  - import servicesRaw from "../../../content/services.md?raw"
  - import impressumRaw from "../../../content/impressum.md?raw"
  - import datenschutzRaw from "../../../content/datenschutz.md?raw"
- Then call loadMarkdownFromString(homepageRaw) etc.
- Keep JSON loaders as-is.

4) Ensure the homepage no longer crashes:
- Run from kanzlei-website/:
  - npm run build
  - npm run typecheck
  - npm run preview (optional) and confirm "/" renders.

5) Commit + push:
- Commit message: "fix: remove Buffer usage from markdown loader"
- Push to main.

OUTPUT:
- List updated files (paths only)
- ✓ build/typecheck results
STOP.