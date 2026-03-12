# Part 2: Implementation Details

This file contains the detailed implementation code for the multilingual setup.

---

## Step 1: Install Dependencies

```bash
cd kanzlei-website
npm install i18next react-i18next i18next-browser-languagedetector
```

---

## Step 2: Content File Restructuring

### Rename existing files to German (.de)

```bash
cd content/

# Rename JSON files
mv homepage.json homepage.de.json
mv about.json about.de.json
mv services.json services.de.json
mv faq.json faq.de.json
mv downloads.json downloads.de.json
mv footer.json footer.de.json
mv siteSettings.json siteSettings.de.json

# Rename MD files
mv impressum.md impressum.de.md
mv datenschutz.md datenschutz.de.md
```

### Create English versions (placeholder)

```bash
# Copy German to English
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

---

## Step 3: Rewrite loadJson.ts with Dynamic Imports

**File: `src/lib/content/loadJson.ts`** - COMPLETE REWRITE

```typescript
// src/lib/content/loadJson.ts

import type { FAQItem, DownloadItem, FAQData, DownloadsData, FooterData, ServiceItem, ServicesData } from './types';

// CRITICAL: Use Vite's dynamic glob import for language switching
const contentModules = import.meta.glob('/content/*.json', { eager: true });

function loadContentFile(filename: string, lang: string): Record<string, unknown> {
  const pathLang = `/content/${filename}.${lang}.json`;
  
  if (contentModules[pathLang]) {
    return contentModules[pathLang] as Record<string, unknown>;
  }
  
  const pathDe = `/content/${filename}.de.json`;
  if (contentModules[pathDe]) {
    console.warn(`Content ${filename}.${lang} not found, falling back to German`);
    return contentModules[pathDe] as Record<string, unknown>;
  }
  
  console.error(`Content ${filename} not found in any language`);
  return {};
}

export function loadFAQ(lang: string = 'de'): FAQItem[] {
  const data = loadContentFile('faq', lang) as FAQData;
  return data.items || [];
}

export function loadDownloads(lang: string = 'de'): DownloadItem[] {
  const data = loadContentFile('downloads', lang) as DownloadsData;
  return data.items || [];
}

export function loadFooter(lang: string = 'de'): FooterData {
  return loadContentFile('footer', lang) as FooterData;
}

export function loadServices(lang: string = 'de'): ServiceItem[] {
  const data = loadContentFile('services', lang) as ServicesData;
  return data.items || [];
}

export function loadOrderedServices(lang: string = 'de'): ServiceItem[] {
  const data = loadContentFile('services', lang) as ServicesData;
  const items = data.items || [];
  const order = data.itemOrder;
  
  if (!order || order.length === 0) {
    return items;
  }
  
  const itemMap = new Map<string, ServiceItem>();
  items.forEach((item) => {
    const slug = item.title.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');
    itemMap.set(slug, item);
    if (item.href) {
      const hrefSlug = item.href.replace('/leistungen#', '');
      itemMap.set(hrefSlug, item);
    }
  });
  
  const ordered: ServiceItem[] = [];
  order.forEach((slug: string) => {
    const item = itemMap.get(slug);
    if (item && !ordered.includes(item)) {
      ordered.push(item);
    }
  });
  
  items.forEach((item: ServiceItem) => {
    if (!ordered.includes(item)) {
      ordered.push(item);
    }
  });
  
  return ordered;
}

export interface AboutData {
  title?: string;
  intro?: string;
  bio?: string;
  vita?: string[];
  youtubeTitle?: string;
  youtubeUrl?: string;
}

export function loadAbout(lang: string = 'de'): AboutData {
  return loadContentFile('about', lang) as AboutData;
}

export interface HomepageData {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  introText?: string;
  servicesTitle?: string;
  servicesIntro?: string;
  contactTitle?: string;
  contactIntro?: string;
  youtubeTitle?: string;
  youtubeIntro?: string;
  youtubeUrl?: string;
  sectionOrder?: string[];
  heroBackgroundImage?: string;
  heroBackgroundImageAlt?: string;
  customSections?: Array<{
    id: string;
    title?: string;
    content?: string;
    backgroundImage?: string;
    type?: 'text' | 'cta' | 'image' | 'video';
    youtubeUrl?: string;
  }>;
}

export function loadHomepageJson(lang: string = 'de'): HomepageData {
  return loadContentFile('homepage', lang) as HomepageData;
}

export function parseYouTubeId(url: string | undefined): string | null {
  if (!url || url.trim() === '') return null;
  const trimmedUrl = url.trim();
  
  const embedMatch = trimmedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  const shortMatch = trimmedUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  const watchMatch = trimmedUrl.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  return null;
}

export function toYouTubeEmbedUrl(url: string | undefined): string | null {
  const videoId = parseYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export interface SiteSettingsPage {
  enabled: boolean;
  navLabel: string;
  navOrder: number;
}

export interface SiteSettings {
  home?: SiteSettingsPage;
  services?: SiteSettingsPage;
  about?: SiteSettingsPage;
  booking?: SiteSettingsPage;
  faq?: SiteSettingsPage;
  downloads?: SiteSettingsPage;
}

export function loadSiteSettings(lang: string = 'de'): SiteSettings {
  return loadContentFile('siteSettings', lang) as SiteSettings;
}

export interface NavItem {
  to: string;
  label: string;
  enabled: boolean;
  order: number;
}

export function loadNavItems(lang: string = 'de'): NavItem[] {
  const settings = loadSiteSettings(lang);
  const items: NavItem[] = [];
  
  const prefix = lang === 'de' ? '' : `/${lang}`;
  
  if (settings.home?.enabled) {
    items.push({ to: `${prefix}/`, label: settings.home.navLabel || 'Start', enabled: true, order: settings.home.navOrder || 1 });
  }
  if (settings.services?.enabled) {
    items.push({ to: `${prefix}/leistungen`, label: settings.services.navLabel || 'Leistungen', enabled: true, order: settings.services.navOrder || 2 });
  }
  if (settings.about?.enabled) {
    items.push({ to: `${prefix}/ueber-mich`, label: settings.about.navLabel || 'Über mich', enabled: true, order: settings.about.navOrder || 3 });
  }
  if (settings.booking?.enabled) {
    items.push({ to: `${prefix}/termin-buchen`, label: settings.booking.navLabel || 'Termin buchen', enabled: true, order: settings.booking.navOrder || 4 });
  }
  if (settings.faq?.enabled) {
    items.push({ to: `${prefix}/faq`, label: settings.faq.navLabel || 'FAQ', enabled: true, order: settings.faq.navOrder || 5 });
  }
  if (settings.downloads?.enabled) {
    items.push({ to: `${prefix}/downloads`, label: settings.downloads.navLabel || 'Downloads', enabled: true, order: settings.downloads.navOrder || 6 });
  }
  
  return items.sort((a, b) => a.order - b.order);
}
```

---

## Step 3B: Rewrite loadMarkdown.ts with Dynamic Imports (CRITICAL)

**File: `src/lib/content/loadMarkdown.ts`**

The markdown loader also needs dynamic imports for language switching.

**IMPORTANT:** Do NOT use gray-matter (removed due to Buffer crash). Use the existing simple parser.

```typescript
// src/lib/content/loadMarkdown.ts

// CRITICAL: Use Vite's dynamic glob import for language switching
// Use ?raw query to get raw content as string
const markdownModules = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true });

export interface MarkdownContent {
  content: string;
  frontmatter: Record<string, unknown>;
}

function loadMarkdownFile(filename: string, lang: string): MarkdownContent {
  const pathLang = `/content/${filename}.${lang}.md`;
  
  if (markdownModules[pathLang]) {
    const rawContent = markdownModules[pathLang] as string;
    // Parse using your existing safe parser (NOT gray-matter)
    return parseMarkdownContent(rawContent);
  }
  
  const pathDe = `/content/${filename}.de.md`;
  if (markdownModules[pathDe]) {
    console.warn(`Markdown ${filename}.${lang} not found, falling back to German`);
    const rawContent = markdownModules[pathDe] as string;
    return parseMarkdownContent(rawContent);
  }
  
  console.error(`Markdown ${filename} not found in any language`);
  return { content: '', frontmatter: {} };
}

export function loadImpressum(lang: string = 'de'): MarkdownContent {
  return loadMarkdownFile('impressum', lang);
}

export function loadDatenschutz(lang: string = 'de'): MarkdownContent {
  return loadMarkdownFile('datenschutz', lang);
}
```

Then export from `src/lib/content/index.ts`:

```typescript
export { loadImpressum, loadDatenschutz } from './loadMarkdown';
```

---

## Step 4: i18n Configuration

### `src/i18n/config.ts`

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

### `src/i18n/index.ts`

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

---

## Step 5: App.tsx with Language Routes

**File: `src/App.tsx`**

**IMPORTANT:** Use `useLocation()` to detect language, not route params. This avoids edge cases with nested routes.

```typescript
// src/App.tsx

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Detect language from URL path - more reliable than route params
    const currentLang = location.pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [location.pathname, i18n]);
  
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

## Step 6: Language Switcher Component

**File: `src/components/LanguageSwitcher.tsx`**

**IMPORTANT:** Use `useLocation()` to detect current language for consistency with LanguageHandler.

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
  
  // Detect language from URL path
  const currentLang = location.pathname.startsWith('/en') ? 'en' : 'de';
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

## Step 7: main.tsx

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

---

## Step 8: Decap CMS Config Update

**File: `public/admin/config.yml`**

Update CMS to handle both languages. **IMPORTANT:** File paths must include `kanzlei-website/` prefix.

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "kanzlei-website/public/uploads"
public_folder: "/uploads"

collections:
  - name: "pages_de"
    label: "Seiten (DE)"
    folder: "kanzlei-website/content"
    create: true
    slug: "{{slug}}"
    extension: json
    fields:
      - {label: "JSON Inhalt", name: "body", widget: "text"}
    format: "json"

  - name: "pages_en"
    label: "Seiten (EN)"
    folder: "kanzlei-website/content"
    create: true
    slug: "{{slug}}"
    extension: json
    fields:
      - {label: "JSON Inhalt", name: "body", widget: "text"}
    format: "json"

  # Or use file-based collections for each:
  # homepage.de.json, homepage.en.json, etc.
  - name: "homepage"
    label: "Homepage"
    files:
      - label: "Homepage (DE)"
        name: "homepage_de"
        file: "kanzlei-website/content/homepage.de.json"
        fields:
          - {label: "Hero Title", name: "heroTitle", widget: "string"}
          # ... other fields
      - label: "Homepage (EN)"
        name: "homepage_en"
        file: "kanzlei-website/content/homepage.en.json"
        fields:
          - {label: "Hero Title", name: "heroTitle", widget: "string"}
          # ... other fields
```

**Key:** Always use full path `kanzlei-website/content/filename.de.json` for file collections.

---

(Continue to Part 2B for UI translations and testing)
