# i18n Testing Checklist

## Build Test
```bash
cd kanzlei-website
npm run build
```
- [ ] Build completes without errors
- [ ] Output in `dist/` folder

## Typecheck
```bash
npm run typecheck
```
- [ ] No TypeScript errors
- [ ] All imports resolve correctly

## Dev Server Test
```bash
npm run dev
```
- [ ] Server starts on http://localhost:5173
- [ ] German version loads at `/`
- [ ] English version loads at `/en`

## Language Switching Test
- [ ] Language switcher visible in header
- [ ] Clicking "English" on German page switches to English version
- [ ] Clicking "Deutsch" on English page switches to German version
- [ ] URL updates when switching languages
- [ ] UI labels change correctly (buttons, consent banner, etc.)

## Navigation Test
- [ ] Navigate between pages in German (/)
- [ ] Navigate between pages in English (/en)
- [ ] Page refresh maintains correct language

## Direct URL Test
- [ ] Direct access to `/` shows German content
- [ ] Direct access to `/en` shows English content
- [ ] Direct access to `/leistungen` shows German content
- [ ] Direct access to `/en/leistungen` shows English content
- [ ] Direct access to `/en/unknown` shows 404 in English

## Troubleshooting

### Module not found error
- Check that translations are in `src/i18n/translations/de.json` and `en.json`
- Verify imports in `src/i18n/index.ts`

### Content remains German when switching to English
- Check JSON files exist: `/content/homepage.en.json`, `/content/services.en.json`, etc.
- Verify `loadHomepageJson(lang)`, `loadOrderedServices(lang)`, etc. receive correct `lang` parameter
- Check that `useLanguage()` returns 'en' when URL starts with '/en'

### Language switcher not showing
- Verify `LanguageSwitcher` component is imported in `Layout.tsx`
- Check component renders in header section

### TypeScript errors
- Run `npm run typecheck` to see specific errors
- Ensure all required JSON translation keys exist

### SPA redirects not working on Netlify
- Verify `netlify.toml` has correct redirect rules for SPA
- Check `base` and `publish` configuration
