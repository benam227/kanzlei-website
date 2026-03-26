import type { FAQItem, DownloadItem, FAQData, DownloadsData, FooterData, ServiceItem, ServicesData, HomepageData, SiteSettings, NavItem, AboutData } from './types';

// Dynamic JSON imports with language support
type JsonModules = Record<string, { default: unknown }>;

const jsonModules = import.meta.glob('/content/*.json', { eager: true }) as JsonModules;

function loadJsonFile<T>(filename: string, lang: string): T {
  // Try requested language first
  const langPath = `/content/${filename}.${lang}.json`;
  if (jsonModules[langPath]) {
    return jsonModules[langPath].default as T;
  }
  
  // Fallback to German
  const dePath = `/content/${filename}.de.json`;
  if (jsonModules[dePath]) {
    return jsonModules[dePath].default as T;
  }
  
  // Return empty object as fallback
  return {} as T;
}

export function loadFAQ(lang: string = 'de'): FAQItem[] {
  const data = loadJsonFile<FAQData>('faq', lang);
  return data.items || [];
}

export function loadDownloads(lang: string = 'de'): DownloadItem[] {
  const data = loadJsonFile<DownloadsData>('downloads', lang);
  return data.items || [];
}

export function loadFooter(lang: string = 'de'): FooterData {
  return loadJsonFile<FooterData>('footer', lang);
}

export function loadServices(lang: string = 'de'): ServiceItem[] {
  const data = loadJsonFile<ServicesData>('services', lang);
  return data.items || [];
}

export function loadOrderedServices(lang: string = 'de'): ServiceItem[] {
  const data = loadJsonFile<ServicesData>('services', lang);
  const items = data.items || [];
  const order = data.itemOrder;
  
  if (!order || order.length === 0) {
    return items;
  }
  
  // Create a map for quick lookup
  const itemMap = new Map<string, ServiceItem>();
  items.forEach((item) => {
    // Generate slug from title (lowercase, remove special chars)
    const slug = item.title.toLowerCase().replace(/[^a-zäöüß0-9]/g, '');
    itemMap.set(slug, item);
    // Also try with just the first part of href if available
    if (item.href) {
      const hrefSlug = item.href.replace('/leistungen#', '');
      itemMap.set(hrefSlug, item);
    }
  });
  
  // Order items according to itemOrder
  const ordered: ServiceItem[] = [];
  order.forEach((slug: string) => {
    const item = itemMap.get(slug);
    if (item && !ordered.includes(item)) {
      ordered.push(item);
    }
  });
  
  // Add any items not in the order list
  items.forEach((item: ServiceItem) => {
    if (!ordered.includes(item)) {
      ordered.push(item);
    }
  });
  
  return ordered;
}

export function loadHomepageJson(lang: string = 'de'): HomepageData {
  return loadJsonFile<HomepageData>('homepage', lang);
}

/**
 * Extracts YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 * Returns null if no valid ID found
 */
export function parseYouTubeId(url: string | undefined): string | null {
  if (!url || url.trim() === '') return null;
  
  const trimmedUrl = url.trim();
  
  // youtube.com/embed/ID
  const embedMatch = trimmedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  // youtu.be/ID short URL
  const shortMatch = trimmedUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  // youtube.com/watch?v=ID
  const watchMatch = trimmedUrl.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  return null;
}

/**
 * Converts YouTube URL to embed URL using privacy-enhanced youtube-nocookie.com
 * Supports: https://www.youtube.com/watch?v=VIDEO_ID
 *           https://youtu.be/VIDEO_ID
 *           https://www.youtube.com/embed/VIDEO_ID
 * Returns null if URL is empty or invalid
 */
export function toYouTubeEmbedUrl(url: string | undefined): string | null {
  const videoId = parseYouTubeId(url);
  if (!videoId) return null;
  
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function loadSiteSettings(lang: string = 'de'): SiteSettings {
  return loadJsonFile<SiteSettings>('siteSettings', lang);
}

export function loadNavItems(lang: string = 'de'): NavItem[] {
  const settings = loadSiteSettings(lang);
  const items: NavItem[] = [];
  
  // Determine path prefix - empty for German, '/en' for English
  const langPrefix = lang === 'en' ? '/en' : '';
  
  if (settings.home?.enabled) {
    // Home is special: '/en' becomes '/en' (index), '/' stays '/'
    items.push({ to: lang === 'en' ? '/en' : '/', label: settings.home.navLabel || 'Start', enabled: true, order: settings.home.navOrder || 1 });
  }
  if (settings.services?.enabled) {
    items.push({ to: `${langPrefix}/leistungen`, label: settings.services.navLabel || 'Leistungen', enabled: true, order: settings.services.navOrder || 2 });
  }
  if (settings.about?.enabled) {
    items.push({ to: `${langPrefix}/ueber-mich`, label: settings.about.navLabel || 'Über mich', enabled: true, order: settings.about.navOrder || 3 });
  }
  if (settings.booking?.enabled) {
    items.push({ to: `${langPrefix}/termin-buchen`, label: settings.booking.navLabel || 'Termin buchen', enabled: true, order: settings.booking.navOrder || 4 });
  }
  if (settings.faq?.enabled) {
    items.push({ to: `${langPrefix}/faq`, label: settings.faq.navLabel || 'FAQ', enabled: true, order: settings.faq.navOrder || 5 });
  }
  if (settings.downloads?.enabled) {
    items.push({ to: `${langPrefix}/downloads`, label: settings.downloads.navLabel || 'Downloads', enabled: true, order: settings.downloads.navOrder || 6 });
  }
  
  return items.sort((a, b) => a.order - b.order);
}

export function loadAbout(lang: string = 'de'): AboutData {
  return loadJsonFile<AboutData>('about', lang);
}
