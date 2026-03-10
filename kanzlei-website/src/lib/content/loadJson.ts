import type { FAQItem, DownloadItem, FAQData, DownloadsData, FooterData, ServiceItem, ServicesData } from './types';
import faqData from '../../../content/faq.json';
import downloadsData from '../../../content/downloads.json';
import footerData from '../../../content/footer.json';
import servicesData from '../../../content/services.json';
import homepageData from '../../../content/homepage.json';
import siteSettingsData from '../../../content/siteSettings.json';

export function loadFAQ(): FAQItem[] {
  const data = faqData as FAQData;
  return data.items || [];
}

export function loadDownloads(): DownloadItem[] {
  const data = downloadsData as DownloadsData;
  return data.items || [];
}

export function loadFooter(): FooterData {
  return footerData as FooterData;
}

export function loadServices(): ServiceItem[] {
  const data = servicesData as ServicesData;
  return data.items || [];
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
}

export function loadHomepageJson(): HomepageData {
  return homepageData as HomepageData;
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

export interface SiteSettingsPage {
  enabled: boolean;
  navLabel: string;
  navOrder: number;
}

export interface SiteSettings {
  pages: {
    home?: SiteSettingsPage;
    services?: SiteSettingsPage;
    about?: SiteSettingsPage;
    booking?: SiteSettingsPage;
    faq?: SiteSettingsPage;
    downloads?: SiteSettingsPage;
  };
}

export function loadSiteSettings(): SiteSettings {
  return siteSettingsData as SiteSettings;
}

export interface NavItem {
  to: string;
  label: string;
  enabled: boolean;
  order: number;
}

export function loadNavItems(): NavItem[] {
  const settings = loadSiteSettings();
  const items: NavItem[] = [];
  
  if (settings.pages.home?.enabled) {
    items.push({ to: '/', label: settings.pages.home.navLabel || 'Start', enabled: true, order: settings.pages.home.navOrder || 1 });
  }
  if (settings.pages.services?.enabled) {
    items.push({ to: '/leistungen', label: settings.pages.services.navLabel || 'Leistungen', enabled: true, order: settings.pages.services.navOrder || 2 });
  }
  if (settings.pages.about?.enabled) {
    items.push({ to: '/ueber-mich', label: settings.pages.about.navLabel || 'Über mich', enabled: true, order: settings.pages.about.navOrder || 3 });
  }
  if (settings.pages.booking?.enabled) {
    items.push({ to: '/termin-buchen', label: settings.pages.booking.navLabel || 'Termin buchen', enabled: true, order: settings.pages.booking.navOrder || 4 });
  }
  if (settings.pages.faq?.enabled) {
    items.push({ to: '/faq', label: settings.pages.faq.navLabel || 'FAQ', enabled: true, order: settings.pages.faq.navOrder || 5 });
  }
  if (settings.pages.downloads?.enabled) {
    items.push({ to: '/downloads', label: settings.pages.downloads.navLabel || 'Downloads', enabled: true, order: settings.pages.downloads.navOrder || 6 });
  }
  
  return items.sort((a, b) => a.order - b.order);
}
