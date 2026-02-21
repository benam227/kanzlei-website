OPENCODE TASK — REMOVE gray-matter (Buffer crash) + implement tiny frontmatter parser

GOAL:
Fix production error: "Uncaught ReferenceError: Buffer is not defined" coming from markdown parsing bundle.
Eliminate Buffer usage by removing gray-matter from client code.

CONSTRAINTS:
- Do NOT print full code to terminal.
- Only output: updated file paths, npm build/typecheck result, and a YES/NO check whether "Buffer" appears in dist/assets.
- Keep minimal diffs. No refactors outside content pipeline.

STEPS:

1) Identify dependency usage:
- Search in kanzlei-website/src for "gray-matter" imports.
- Confirm which file(s) use it (likely src/lib/content/loadMarkdown.ts).

2) Implement browser-safe frontmatter parsing (no dependencies):
- In kanzlei-website/src/lib/content/loadMarkdown.ts:
  - REMOVE gray-matter import entirely.
  - Implement function parseFrontmatter(raw: string) returning:
      { data: Record<string,string>, content: string }
    Rules:
      - If raw starts with "---\n", parse until the next "\n---\n".
      - Inside frontmatter: support simple "key: value" lines only (no nesting).
      - Trim whitespace; ignore empty/comment lines.
      - Everything after closing --- is content.
      - If no frontmatter: data = {}, content = raw.

  - Ensure existing exported API remains compatible with current callers (keep same exported function names/types).

3) Ensure pages still render:
- Confirm HomePage uses markdown loader and does not crash.

4) Build + verify bundle is Buffer-free:
- cd kanzlei-website
- npm run build
- npm run typecheck
- After build:
  - grep -R "Buffer is not defined" dist/assets || true
  - grep -R "toBuffer" dist/assets || true
  - grep -R "gray-matter" dist/assets || true
  Record in terminal only: Buffer/toBuffer/gray-matter present? YES/NO

5) Remove gray-matter dependency if unused:
- If no remaining imports, remove it from kanzlei-website/package.json deps and run npm install to update lockfile.

6) Commit + push:
- Commit message: "fix: remove gray-matter to avoid Buffer in browser"
- Push to main.

OUTPUT:
- Updated file paths
- ✓ npm run build / typecheck
- Bundle checks (YES/NO flags only)
STOP.