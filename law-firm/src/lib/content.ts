import matter from 'gray-matter';
import type { Service, FAQ, Download, PageContent } from './types';

const contentModules = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true });

export function loadContent(filename: string): PageContent | null {
  const path = `/content/${filename}.md`;
  const raw = contentModules[path] as string | undefined;
  if (!raw) return null;
  
  const { data, content } = matter(raw);
  return { ...data, content } as PageContent;
}

interface SortableItem {
  order?: number;
}

export function loadCollection<T extends SortableItem>(folder: string): T[] {
  const items: T[] = [];
  
  Object.keys(contentModules).forEach((path) => {
    if (path.includes(folder) && path.endsWith('.md')) {
      const raw = contentModules[path] as string;
      const { data } = matter(raw);
      items.push(data as T);
    }
  });
  
  return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function loadServices(): Service[] {
  return loadCollection<Service>('services');
}

export function loadFAQ(): FAQ[] {
  return loadCollection<FAQ>('faq');
}

export function loadDownloads(): Download[] {
  return loadCollection<Download>('downloads');
}
