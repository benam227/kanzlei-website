import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMeta {
  title: string;
  description?: string;
}

function getSiteUrl(): string {
  if (typeof import.meta.env.VITE_SITE_URL === 'string' && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return 'https://example.com';
}

export function usePageMeta({ title, description }: PageMeta) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const siteUrl = getSiteUrl();
    const canonicalUrl = `${siteUrl}${location.pathname}`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || '');
    } else {
      const el = document.createElement('meta');
      el.name = 'description';
      el.content = description || '';
      document.head.appendChild(el);
    }

    const existingOgTitle = document.querySelector('meta[property="og:title"]');
    if (existingOgTitle) {
      existingOgTitle.setAttribute('content', title);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:title');
      el.content = title;
      document.head.appendChild(el);
    }

    const existingOgDesc = document.querySelector('meta[property="og:description"]');
    if (existingOgDesc) {
      existingOgDesc.setAttribute('content', description || '');
    } else {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:description');
      el.content = description || '';
      document.head.appendChild(el);
    }

    const existingOgType = document.querySelector('meta[property="og:type"]');
    if (existingOgType) {
      existingOgType.setAttribute('content', 'website');
    } else {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:type');
      el.content = 'website';
      document.head.appendChild(el);
    }

    const existingOgUrl = document.querySelector('meta[property="og:url"]');
    if (existingOgUrl) {
      existingOgUrl.setAttribute('content', canonicalUrl);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:url');
      el.content = canonicalUrl;
      document.head.appendChild(el);
    }

    const existingTwitterCard = document.querySelector('meta[name="twitter:card"]');
    if (existingTwitterCard) {
      existingTwitterCard.setAttribute('content', 'summary');
    } else {
      const el = document.createElement('meta');
      el.name = 'twitter:card';
      el.content = 'summary';
      document.head.appendChild(el);
    }

    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', canonicalUrl);
    } else {
      const el = document.createElement('link');
      el.rel = 'canonical';
      el.href = canonicalUrl;
      document.head.appendChild(el);
    }
  }, [title, description, location.pathname]);
}
