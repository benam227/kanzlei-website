# Part 2B: UI Translations and Testing

---

## Step 1: UI Translation Files

### `src/i18n/translations/de.json`

```json
{
  "nav": {
    "home": "Startseite",
    "services": "Leistungen",
    "about": "Über mich",
    "booking": "Termin buchen",
    "faq": "FAQ",
    "downloads": "Downloads",
    "contact": "Kontakt",
    "imprint": "Impressum",
    "privacy": "Datenschutz"
  },
  "buttons": {
    "learnMore": "Mehr erfahren",
    "bookNow": "Jetzt Termin buchen",
    "download": "Herunterladen",
    "submit": "Absenden",
    "send": "Senden",
    "cancel": "Abbrechen",
    "close": "Schließen",
    "back": "Zurück",
    "next": "Weiter",
    "readMore": "Weiterlesen",
    "accept": "Akzeptieren",
    "decline": "Ablehnen",
    "manage": "Einstellungen"
  },
  "consent": {
    "title": "Cookie-Einstellungen",
    "description": "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.",
    "essential": "Essentielle Cookies",
    "essentialDescription": "Necessary for the website to function.",
    "analytics": "Analyse-Cookies",
    "analyticsDescription": "Help us understand how visitors interact with our website.",
    "externalMedia": "Externe Medien",
    "externalMediaDescription": "Allow embedding of YouTube, Calendly, etc.",
    "save": "Auswahl speichern",
    "acceptAll": "Alle akzeptieren",
    "declineAll": "Alle ablehnen"
  },
  "contact": {
    "title": "Kontakt",
    "name": "Name",
    "email": "E-Mail",
    "phone": "Telefon",
    "message": "Nachricht",
    "subject": "Betreff",
    "sendMessage": "Nachricht senden",
    "success": "Nachricht erfolgreich gesendet!",
    "error": "Fehler beim Senden. Bitte versuchen Sie es erneut.",
    "required": "Pflichtfeld"
  },
  "footer": {
    "allRightsReserved": "Alle Rechte vorbehalten",
    "legal": "Rechtliches"
  },
  "language": {
    "select": "Sprache wählen",
    "current": "Aktuelle Sprache"
  },
  "common": {
    "loading": "Lädt...",
    "error": "Fehler",
    "notFound": "Nicht gefunden",
    "goHome": "Zur Startseite"
  }
}
```

### `src/i18n/translations/en.json`

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "about": "About Me",
    "booking": "Book Appointment",
    "faq": "FAQ",
    "downloads": "Downloads",
    "contact": "Contact",
    "imprint": "Imprint",
    "privacy": "Privacy Policy"
  },
  "buttons": {
    "learnMore": "Learn More",
    "bookNow": "Book Now",
    "download": "Download",
    "submit": "Submit",
    "send": "Send",
    "cancel": "Cancel",
    "close": "Close",
    "back": "Back",
    "next": "Next",
    "readMore": "Read More",
    "accept": "Accept",
    "decline": "Decline",
    "manage": "Manage"
  },
  "consent": {
    "title": "Cookie Settings",
    "description": "We use cookies to enhance your experience.",
    "essential": "Essential Cookies",
    "essentialDescription": "Necessary for the website to function.",
    "analytics": "Analytics Cookies",
    "analyticsDescription": "Help us understand how visitors interact with our website.",
    "externalMedia": "External Media",
    "externalMediaDescription": "Allow embedding of YouTube, Calendly, etc.",
    "save": "Save Preferences",
    "acceptAll": "Accept All",
    "declineAll": "Decline All"
  },
  "contact": {
    "title": "Contact",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "subject": "Subject",
    "sendMessage": "Send Message",
    "success": "Message sent successfully!",
    "error": "Error sending message. Please try again.",
    "required": "Required field"
  },
  "footer": {
    "allRightsReserved": "All Rights Reserved",
    "legal": "Legal"
  },
  "language": {
    "select": "Select Language",
    "current": "Current Language"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "notFound": "Not Found",
    "goHome": "Go to Homepage"
  }
}
```

---

## Step 2: Layout Update - Add Language Switcher

**File: `src/layouts/Layout.tsx`**

Add the LanguageSwitcher import and read language from URL:

```typescript
import { useState } from 'react';
import { Outlet, Link, NavLink, useParams } from 'react-router-dom';
import FloatingCTA from '../components/FloatingCTA';
import ConsentBanner from '../components/ConsentBanner';
import ConsentPreferences from '../components/ConsentPreferences';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { loadFooter, loadNavItems } from '../lib/content';

export default function Layout() {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || 'de';
  
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const footer = loadFooter(currentLang);  // Use currentLang from URL
  const navLinks = loadNavItems(currentLang);  // Use currentLang from URL

  // ... rest of the component

  // Add LanguageSwitcher in header:
  // 
  // <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
  //   <Link to="/" className="...">Kanzlei Recht</Link>
  //   
  //   <div className="flex items-center gap-4">
  //     <LanguageSwitcher />
  //     <button aria-label="Menu" ...>...</button>
  //   </div>
  // </nav>
}
```

**CRITICAL:** The layout MUST read `lang` from URL params, not hardcode `'de'`. Otherwise language switching won't work properly.

---

## Step 3: Update Pages to Use Language Parameter

Each page needs to get language from URL. Here's the pattern:

### Example: HomePage.tsx

```typescript
import { useParams } from 'react-router-dom';
import { loadHomepageJson, loadOrderedServices } from '../lib/content/loadJson';

export default function HomePage() {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || 'de';
  
  const homepage = loadHomepageJson(currentLang);
  const services = loadOrderedServices(currentLang);
  
  // ... render with homepage data
}
```

### Apply to all pages:

| Page | Change |
|------|--------|
| HomePage.tsx | Add `lang` param, pass to `loadHomepageJson` |
| LeistungenPage.tsx | Add `lang` param, pass to `loadOrderedServices` |
| AboutPage.tsx | Add `lang` param, pass to `loadAbout` |
| FAQPage.tsx | Add `lang` param, pass to `loadFAQ` |
| DownloadsPage.tsx | Add `lang` param, pass to `loadDownloads` |
| ImpressumPage.tsx | Add `lang` param, load from `impressum.{lang}.md` |
| DatenschutzPage.tsx | Add `lang` param, load from `datenschutz.{lang}.md` |

---

## Step 4: Testing Checklist

### Phase 1: Build Test

```bash
cd kanzlei-website
npm run build
```

**Check:**
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ Build completes successfully

### Phase 2: Development Server Test

```bash
npm run dev
```

**Open:** http://localhost:5173

**Check:**
- ✅ Page loads in German (default)
- ✅ Language switcher appears in header
- ✅ German flag shown

### Phase 3: Language Switching Test

**Test German:**
- URL: http://localhost:5173
- Check: Content in German
- Check: No /de prefix in URL

**Test English:**
- Click language switcher → English
- Check: URL changes to /en
- Check: English content loads
- Check: Flag changes to 🇬🇧

### Phase 4: Navigation Test

1. Go to /en
2. Click "Services" link
3. Check: URL becomes /en/leistungen
4. Check: Content in English (or fallback to German)
5. Check: Language stays English

### Phase 5: Direct URL Test

- Visit http://localhost:5173/en/faq directly
- Check: Page loads in English
- Check: Language switcher shows English

---

## Step 5: Troubleshooting

### Issue: "Module not found: Can't resolve '/content/homepage.en.json'"

**Fix:** Make sure you created the English content files:
```bash
cd content
cp homepage.de.json homepage.en.json
```

### Issue: Content still in German when switching to English

**Expected!** The English files are copies of German. Phase 9 will translate them.

### Issue: Language switcher not showing

**Fix:** Check Layout.tsx imports LanguageSwitcher correctly:
```typescript
import LanguageSwitcher from '../components/LanguageSwitcher';
```

### Issue: TypeScript error with import.meta.glob

**Fix:** This is a Vite feature. Make sure you're using Vite 5+. Check tsconfig includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

---

## Step 6: Production Deployment

### Netlify

Update `_redirects` to handle both language paths:

**File: `public/_redirects`**

```apache
# SPA routing - German (default)
/*    /index.html   200

# SPA routing - English
/en/* /index.html 200

# Admin (Decap CMS)
/admin/* /admin/index.html 200
```

### SEO

Add hreflang tags to `index.html`:

```html
<link rel="alternate" hreflang="de" href="https://yoursite.com/" />
<link rel="alternate" hreflang="en" href="https://yoursite.com/en" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/" />
```

---

## Step 7: Update Sitemap Generation

**File: `scripts/generate-sitemap.mjs`**

Update the sitemap generator to include both German and English URLs:

```javascript
// Add language support to sitemap
const languages = ['de', 'en'];

for (const lang of languages) {
  const url = lang === 'de' ? baseUrl : `${baseUrl}/en`;
  
  // Add all pages for each language
  // ...
}
```

---

## Success Criteria

Your setup is working if:

1. ✅ Can switch between German and English
2. ✅ URL changes to `/en` when English selected
3. ✅ Navigation stays in selected language
4. ✅ Direct URLs work (`/en/faq` loads directly)
5. ✅ Language switcher shows correct current language
6. ✅ No console errors
7. ✅ Build completes successfully

---

## Next Step

After testing passes, proceed to **AI Translation** to replace English placeholder content with actual translations.
