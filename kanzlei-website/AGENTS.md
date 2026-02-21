# AGENTS.md - Kanzlei Website

This file provides guidelines for agentic coding tools operating on the kanzlei-website project.

## Project Overview

- **Type:** German law firm website with React 19, TypeScript, Vite
- **Tech Stack:** React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4, React Router DOM 7
- **Language:** German/English mixed content
- **Hosting:** Netlify

---

## Commands

### Development

```bash
cd kanzlei-website
npm run dev              # Start dev server (http://localhost:5173)
npm run preview          # Preview production build locally
```

### Building

```bash
npm run build           # Full build: generate sitemap + typecheck + Vite build
npm run prebuild        # Generate sitemap only
```

### Type Checking & Linting

```bash
npm run typecheck       # TypeScript check (tsc --noEmit)
npm run lint            # ESLint check
```

### Single Test Execution

```bash
# Playwright tests (if configured)
npx playwright test                           # Run all tests
npx playwright test --project=accessibility  # Run a11y tests only
npx playwright test filename.spec.ts          # Run specific test file

# Note: No Jest/unit tests currently configured
```

### Clean & Cache

```bash
rm -rf node_modules/.vite   # Clear Vite cache
rm -rf dist                 # Clear build output
```

---

## Code Style Guidelines

### General Principles

- Write clean, readable code with clear variable names
- Keep components small and focused on single responsibility
- Use functional components with hooks exclusively
- Prefer composition over inheritance

### TypeScript

- **Always** use explicit types for function parameters and return values
- Use interfaces for object shapes, type aliases for unions/intersections
- Avoid `any` - use `unknown` when type is truly unknown
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safety
- Example:
  ```typescript
  interface ConsentState {
    analytics: boolean;
    externalMedia: boolean;
  }

  function getConsent(): ConsentState | null {
    const stored = localStorage.getItem('consent');
    return stored ? JSON.parse(stored) : null;
  }
  ```

### Naming Conventions

- **Components:** PascalCase (e.g., `ConsentBanner.tsx`, `HomePage.tsx`)
- **Files:** kebab-case for utilities (e.g., `consent.ts`), PascalCase for components
- **Variables/functions:** camelCase
- **Constants:** SCREAMING_SNAKE_CASE for config values
- **Props interfaces:** `{ComponentName}Props` suffix (e.g., `ConsentBannerProps`)

### Imports

- Use absolute imports from `src/` root when possible (configured in tsconfig)
- Order imports: external libs → internal components → styles
- Example:
  ```typescript
  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import ConsentBanner from './components/ConsentBanner';
  import { setConsent, hasConsent } from './lib/consent';
  import './styles/globals.css';
  ```

### JSX & React

- Use self-closing tags for elements with no children: `<Component />`
- Always include `key` prop when mapping arrays
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- Include ARIA attributes for accessibility:
  ```tsx
  <button
    onClick={handleClick}
    aria-label="Open menu"
    aria-expanded={isOpen}
  >
  ```
- Destructure props in component signature when possible:
  ```tsx
  export default function ConsentBanner({ onOpenPreferences }: ConsentBannerProps)
  ```

### Error Handling

- Always check for null/undefined before accessing properties
- Provide fallback UI for async data loading
- Use try/catch for async operations with user-friendly error messages
- Throw descriptive errors in development, show friendly messages in production

### Tailwind CSS

- Use utility classes directly in JSX (no custom CSS files unless necessary)
- Follow responsive design: mobile-first with `md:`, `lg:` prefixes
- Use semantic color names when available, fallback to hex for brand colors
- Example:
  ```tsx
  <div className="flex flex-col md:flex-row items-center gap-4 p-4">
    <span className="text-sm text-gray-700">Content</span>
  </div>
  ```

### State Management

- Use `useState` for local component state
- Use `useEffect` for side effects (data fetching, subscriptions)
- Extract complex logic into custom hooks
- Memoize expensive computations with `useMemo`, callbacks with `useCallback`

---

## Project Structure

```
kanzlei-website/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Route page components
│   ├── layouts/       # Layout wrappers
│   ├── lib/           # Utilities and helpers
│   ├── styles/        # Global CSS
│   └── assets/        # Static assets
├── public/
│   └── admin/         # Decap CMS admin (Netlify Identity)
├── scripts/           # Build scripts
├── netlify.toml       # Netlify configuration
└── vite.config.ts     # Vite configuration
```

---

## Accessibility Requirements

- All images must have meaningful `alt` text (or `alt=""` for decorative)
- Form inputs must have associated labels
- Use semantic HTML and ARIA appropriately
- Ensure keyboard navigation works
- Run `npx playwright test --project=accessibility` before committing

---

## Git Workflow

1. Create feature branch from `main`
2. Make changes with clear, concise commit messages
3. Run `npm run typecheck && npm run lint` before pushing
4. Create pull request for review
5. Squash merge to main

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Type check | `npm run typecheck` |
| Lint | `npm run lint` |
| Preview build | `npm run preview` |
