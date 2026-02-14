export interface Service {
  title: string;
  description: string;
  icon: string;
  order?: number;
}

export interface FAQ {
  question: string;
  answer: string;
  order?: number;
}

export interface Download {
  title: string;
  description: string;
  url: string;
  order?: number;
}

export interface PageContent {
  title?: string;
  subtitle?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  content?: string;
}
