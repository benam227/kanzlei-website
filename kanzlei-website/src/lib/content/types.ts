export interface MarkdownContent {
  title: string;
  description?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  content: string;
  services?: {
    title: string;
    description: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  items: FAQItem[];
}

export interface DownloadItem {
  title: string;
  description: string;
  href: string;
}

export interface DownloadsData {
  items: DownloadItem[];
}

export interface ServiceItem {
  title: string;
  text: string;
  href: string;
}

export interface ServicesData {
  itemOrder?: string[];
  items: ServiceItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterData {
  companyName: string;
  addressLines: string[];
  email?: string;
  phone?: string;
  footerNote?: string;
  links: FooterLink[];
}

export interface CustomSection {
  id: string;
  title?: string;
  content?: string;
  backgroundImage?: string;
  type?: 'text' | 'cta' | 'image' | 'video';
  youtubeUrl?: string;
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
  customSections?: CustomSection[];
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

export interface NavItem {
  to: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface AboutData {
  title?: string;
  intro?: string;
  bio?: string;
  vita?: Array<{ text: string }>;
  youtubeTitle?: string;
  youtubeUrl?: string;
  headerImage?: string;
  headerImageAlt?: string;
}
