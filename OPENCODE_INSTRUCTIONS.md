# Complete Rebuild Instructions for Opencode

Execute these steps in order on the kanzlei-website project.

---

## Step 1: Clean Everything

```bash
cd ~/Lauris\ Projekt/kanzlei-website
rm -rf dist/ node_modules/ package-lock.json
npm cache clean --force
git clean -fd
git reset --hard HEAD
```

---

## Step 2: Delete the Competing law-firm Project

```bash
cd ~/Lauris\ Projekt
rm -rf law-firm
git add -A
git commit -m "remove: delete conflicting law-firm project"
git push origin main
```

---

## Step 3: Replace vite.config.ts

Replace the entire `kanzlei-website/vite.config.ts` with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    historyApiFallback: true
  }
})
```

---

## Step 4: Replace App.tsx

Replace the entire `kanzlei-website/src/App.tsx` with:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import TerminPage from './pages/TerminPage';
import FAQPage from './pages/FAQPage';
import DatenschutzPage from './pages/DatenschutzPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="termin-buchen" element={<TerminPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Step 5: Create public/_redirects

Create a new file at `kanzlei-website/public/_redirects` with this exact content:

```
/* /index.html 200
```

---

## Step 6: Update netlify.toml

Replace the entire `kanzlei-website/netlify.toml` with:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Step 7: Verify Locally

```bash
cd ~/Lauris\ Projekt/kanzlei-website
npm install
npm run build
```

**After build completes, run these verification commands:**

```bash
ls -la dist/
cat dist/index.html
```

**Expected output for dist/:**
- index.html (should be ~570 bytes)
- assets/ folder (containing .js and .css files)

**Expected output for dist/index.html:**
- Should contain `<title>Kanzlei Recht</title>`
- Should contain `<link ... href="/assets/...css"`
- Should contain `<script ... src="/assets/...js">`
- Should NOT be just 360-400 bytes

---

## Step 8: Commit and Push

If the verification looks correct:

```bash
cd ~/Lauris\ Projekt
git add kanzlei-website/
git commit -m "fix: complete rebuild - remove competing projects, fix vite config, use BrowserRouter with _redirects"
git push origin main
```

---

## Step 9: Netlify Deployment

1. Go to Netlify Dashboard
2. Select your site
3. Go to **Site Settings** → **Build & Deploy** → **Build command**
4. Verify it shows: `npm run build`
5. Go to **Site Settings** → **Build & Deploy** → **Publish directory**
6. Verify it shows: `dist`
7. Click **"Clear cache and deploy"**
8. Wait for build to complete
9. Test the site - it should load with content (not white screen)

---

## Verification Checklist for Opencode

Before pushing to git, please confirm:

- [ ] `dist/index.html` is approximately 570 bytes (not 360-400)
- [ ] `dist/index.html` contains the `<link>` tag for CSS
- [ ] `dist/index.html` contains the `<script>` tag for JavaScript
- [ ] `dist/assets/` folder contains `.js` files
- [ ] `dist/assets/` folder contains `.css` files
- [ ] `npm run build` completes without errors
- [ ] law-firm folder has been deleted from git
- [ ] All files are committed and pushed to main branch

If all checks pass, the white screen issue should be resolved.

---

**Questions? The root cause was:**
1. Two competing projects (kanzlei-website + law-firm) in one repo causing Netlify confusion
2. Vite config not properly configured for build output
3. Previous failed fixes left ghost configurations
4. This rebuild removes all that and starts fresh with correct architecture.
