# Multilingual Website Implementation Plan (Corrected)
## Kanzlei Website - German + English

---

## Project Overview

**Goal:** Add German + English multilingual support to existing Kanzlei website  
**Tech Stack:** React 19 + TypeScript + Vite 7 + React Router DOM 7 + Decap CMS + Netlify  
**Languages:** German (default, at `/`) + English (at `/en`)  
**Translation:** AI-generated first, professional certification later

---

## URL Structure

- **German:** `example.com/` (no prefix)
- **English:** `example.com/en`

This avoids SEO duplicate content issues while keeping German as default.

---

## Project Structure

```
kanzlei-website/
├── content/                              # ✏️ RESTRUCTURE - Language files
│   ├── homepage.de.json                 # ✏️ RENAME from homepage.json
│   ├── homepage.en.json                 # 🆕 NEW - AI translated
│   ├── services.de.json                 # ✏️ RENAME
│   ├── services.en.json                 # 🆕 NEW
│   ├── about.de.json                    # ✏️ RENAME
│   ├── about.en.json                    # 🆕 NEW
│   ├── faq.de.json                      # ✏️ RENAME
│   ├── faq.en.json                      # 🆕 NEW
│   ├── downloads.de.json                # ✏️ RENAME
│   ├── downloads.en.json                # 🆕 NEW
│   ├── footer.de.json                   # ✏️ RENAME
│   ├── footer.en.json                   # 🆕 NEW
│   ├── siteSettings.de.json             # ✏️ RENAME
│   ├── siteSettings.en.json             # 🆕 NEW
│   ├── impressum.de.md                  # ✏️ RENAME
│   ├── impressum.en.md                  # 🆕 NEW
│   ├── datenschutz.de.md                # ✏️ RENAME
│   └── datenschutz.en.md                # 🆕 NEW
├── src/
│   ├── i18n/                            # 🆕 NEW - i18n setup
│   │   ├── index.ts                     # i18next initialization
│   │   ├── config.ts                    # Language configs
│   │   └── translations/                # UI strings (nav, buttons)
│   │       ├── de.json                  # German UI
│   │       └── en.json                  # English UI
│   ├── components/
│   │   ├── LanguageSwitcher.tsx         # 🆕 NEW - Language dropdown
│   ├── lib/
│   │   └── content/
│   │       └── loadJson.ts              # ✏️ REWRITE - Dynamic imports
│   ├── App.tsx                          # ✏️ MODIFY - Add /en routes
│   └── main.tsx                         # ✏️ MODIFY - Import i18n
├── public/
│   └── admin/
│       └── config.yml                   # ✏️ MODIFY - Add i18n (2 locales)
└── package.json                         # ✏️ MODIFY - Add i18n deps
```

---

## Phase 1: Install Dependencies

```bash
cd kanzlei-website
npm install i18next react-i18next i18next-browser-languagedetector
```

---

## Phase 2: Restructure Content Files

### Step 2.1: Rename Existing Files to .de.json

```bash
cd content/

# Backup first!
mkdir -p ../content-backup
cp *.json ../content-backup/
cp *.md ../content-backup/

# Rename JSON files to .de.json
mv homepage.json homepage.de.json
mv about.json about.de.json
mv services.json services.de.json
mv faq.json faq.de.json
mv downloads.json downloads.de.json
mv footer.json footer.de.json
mv siteSettings.json siteSettings.de.json

# Rename MD files to .de.md
mv impressum.md impressum.de.md
mv datenschutz.md datenschutz.de.md
```

### Step 2.2: Create English Versions (Placeholder)

```bash
# Copy German files to create English templates
cp homepage.de.json homepage.en.json
cp about.de.json about.en.json
cp services.de.json services.en.json
cp faq.de.json faq.en.json
cp downloads.de.json downloads.en.json
cp footer.de.json footer.en.json
cp siteSettings.de.json siteSettings.en.json
cp impressum.de.md impressum.en.md
cp datenschutz.de.md datenschutz.en.md
```

**Note:** English files will be replaced with AI-translated content in Phase 9.

---

## Phase 3: Rewrite Content Loading (CRITICAL FIX)

### Why This Must Change

The current `loadJson.ts` uses **static imports**:
```typescript
// ❌ CURRENT - This is STATIC, bundled at build time
import homepageData from '../../../content/homepage.json';

export function loadHomepageJson(): HomepageData {
  return homepageData as HomepageData;
}
```

This **cannot** support language switching because the content is bundled at build time.

### IMPORTANT: Do NOT use gray-matter
gray-matter was removed from the project due to Buffer crash issues. Use the existing simple markdown parser instead for frontmatter parsing.

**Note:** `loadMarkdown.ts` also uses static imports and must be rewritten the same way for impressum/datenschutz pages.

### Solution: Vite Dynamic Imports

```typescript
// ✅ NEW - Use Vite's glob import for dynamic loading
const contentModules = import.meta.glob('/content/*.json', { eager: true });

function loadContentFile(filename: string, lang: string): Record<string, unknown> {
  // Try requested language: content/homepage.en.json
  const pathLang = `/content/${filename}.${lang}.json`;
  if (contentModules[pathLang]) {
    return contentModules[pathLang] as Record<string, unknown>;
  }
  
  // Fallback to German: content/homepage.de.json
  const pathDe = `/content/${filename}.de.json`;
  if (contentModules[pathDe]) {
    console.warn(`Content ${filename}.${lang} not found, falling back to German`);
    return contentModules[pathDe] as Record<string, unknown>;
  }
  
  console.error(`Content ${filename} not found in any language`);
  return {};
}

export function loadHomepage(lang: string = 'de'): HomepageData {
  return loadContentFile('homepage', lang) as HomepageData;
}

export function loadFAQ(lang: string = 'de'): FAQItem[] {
  const data = loadContentFile('faq', lang) as FAQData;
  return data.items || [];
}

export function loadServices(lang: string = 'de'): ServiceItem[] {
  const data = loadContentFile('services', lang) as ServicesData;
  return data.items || [];
}

// ... etc for all content types
```

---

## Phase 4: Create i18n Infrastructure

### Step 4.1: `src/i18n/config.ts`

```typescript
// src/i18n/config.ts

export const SUPPORTED_LANGUAGES = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
] as const;

export const DEFAULT_LANGUAGE = 'de';
export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export const getLanguageByCode = (code: string) => {
  return SUPPORTED_LANGUAGES.find(l => l.code === code);
};
```

### Step 4.2: `src/i18n/index.ts`

```typescript
// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './config';

import de from './translations/de.json';
import en from './translations/en.json';

const resources = {
  de: { translation: de },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map(l => l.code),
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
```

### Step 4.3: UI Translations

**`src/i18n/translations/de.json`:**
```json
{
  "nav": {
    "home": "Startseite",
    "services": "Leistungen",
    "about": "Über mich",
    "booking": "Termin buchen",
    "faq": "FAQ",
    "downloads": "Downloads"
  },
  "buttons": {
    "learnMore": "Mehr erfahren",
    "bookNow": "Jetzt Termin buchen",
    "download": "Herunterladen"
  },
  "footer": {
    "allRightsReserved": "Alle Rechte vorbehalten"
  },
  "language": {
    "select": "Sprache wählen"
  }
}
```

**`src/i18n/translations/en.json`:**
```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "about": "About Me",
    "booking": "Book Appointment",
    "faq": "FAQ",
    "downloads": "Downloads"
  },
  "buttons": {
    "learnMore": "Learn More",
    "bookNow": "Book Now",
    "download": "Download"
  },
  "footer": {
    "allRightsReserved": "All Rights Reserved"
  },
  "language": {
    "select": "Select Language"
  }
}
```

---

## Phase 5: Update React App

### Step 5.1: `src/main.tsx`

```typescript
// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import i18n BEFORE App
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Step 5.2: `src/App.tsx` - Add Language Routes

```typescript
// src/App.tsx

import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import LeistungenPage from './pages/LeistungenPage';
import AboutPage from './pages/AboutPage';
import TerminPage from './pages/TerminPage';
import FAQPage from './pages/FAQPage';
import DownloadsPage from './pages/DownloadsPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import NotFoundPage from './pages/NotFoundPage';

function LanguageHandler() {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const currentLang = lang || 'de';
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [lang, i18n]);
  
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageHandler />
      <Routes>
        {/* German (default) - no prefix */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<LeistungenPage />} />
          <Route path="ueber-mich" element={<AboutPage />} />
          <Route path="termin-buchen" element={<TerminPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* English - /en prefix */}
        <Route path="/en" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<LeistungenPage />} />
          <Route path="ueber-mich" element={<AboutPage />} />
          <Route path="termin-buchen" element={<TerminPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Phase 6: Create Language Switcher Component

**File: `src/components/LanguageSwitcher.tsx`:**

```typescript
// src/components/LanguageSwitcher.tsx

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLang = i18n.language || 'de';
  const currentLanguage = getLanguageByCode(currentLang);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const changeLanguage = (newLang: string) => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];
    const isLangSegment = SUPPORTED_LANGUAGES.some(l => l.code === firstSegment);
    
    let pathWithoutLang = location.pathname;
    if (isLangSegment) {
      pathWithoutLang = '/' + pathSegments.slice(1).join('/');
    }
    
    const newPath = newLang === 'de' 
      ? pathWithoutLang || '/'
      : `/${newLang}${pathWithoutLang}`;
    
    i18n.changeLanguage(newLang);
    navigate(newPath);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage?.nativeName}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 transition-colors ${
                  currentLang === lang.code ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{lang.nativeName}</div>
                </div>
                {currentLang === lang.code && (
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Phase 7: Integrate Language Switcher

**File: `src/layouts/Layout.tsx`**

Add LanguageSwitcher to the header:

```typescript
import LanguageSwitcher from '../components/LanguageSwitcher';

// In the header, after the navigation:
<div className="flex items-center gap-4">
  <LanguageSwitcher />
</div>
```

---

## Phase 8: Update Pages to Use Language Parameter

Each page needs to read the language from URL and pass to content loaders.

**Example: `src/pages/HomePage.tsx`**

```typescript
import { useParams } from 'react-router-dom';
import { loadHomepageJson } from '../lib/content/loadJson';

export default function HomePage() {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || 'de';
  
  const homepage = loadHomepageJson(currentLang);
  // ... use homepage data
}
```

Apply this same pattern to all pages:
- LeistungenPage.tsx
- AboutPage.tsx
- FAQPage.tsx
- DownloadsPage.tsx
- ImpressumPage.tsx
- DatenschutzPage.tsx

---

## Phase 9: AI Translation (Later Phase)

Once the infrastructure is working, translate English content files using AI. This will be done manually or with a script.

---

## Summary of Changes

| File | Action |
|------|--------|
| `package.json` | Add i18next deps |
| `content/*.json` | Rename to `.de.json` |
| `content/*.en.json` | Create English versions |
| `content/*.md` | Rename to `.de.md`, create `.en.md` |
| `src/lib/content/loadJson.ts` | **REWRITE** - Dynamic imports |
| `src/lib/content/loadMarkdown.ts` | **REWRITE** - Dynamic imports |
| `src/i18n/config.ts` | Create |
| `src/i18n/index.ts` | Create |
| `src/i18n/translations/*.json` | Create |
| `src/main.tsx` | Import i18n |
| `src/App.tsx` | Add /en routes + language handler |
| `src/components/LanguageSwitcher.tsx` | Create |
| `src/layouts/Layout.tsx` | Read lang from URL, add LanguageSwitcher |
| `src/pages/*.tsx` | Pass lang to content loaders |
| `public/admin/config.yml` | Add 2 locales (de, en) |
| `public/_redirects` | Add /en/* routing |
| `scripts/generate-sitemap.mjs` | Add /en URLs for SEO |

---

## Next Steps

1. Install dependencies (Phase 1)
2. Restructure content files (Phase 2)
3. Rewrite loadJson.ts (Phase 3)
4. Create i18n infrastructure (Phase 4)
5. Update React app (Phase 5-7)
6. Update pages (Phase 8)
7. AI translation (Phase 9)
