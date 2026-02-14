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
