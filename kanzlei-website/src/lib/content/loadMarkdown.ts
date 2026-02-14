import matter from 'gray-matter';
import type { MarkdownContent } from './types';

const markdownModules = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true });

export function loadMarkdown(filename: string): MarkdownContent | null {
  const path = `/content/${filename}.md`;
  const raw = markdownModules[path] as string | undefined;
  if (!raw) return null;

  const { data, content } = matter(raw);
  return { ...data, content } as MarkdownContent;
}

export function loadHomepage() {
  return loadMarkdown('homepage');
}

export function loadServices() {
  const content = loadMarkdown('services');
  return content?.services || [];
}

export function loadImpressum() {
  return loadMarkdown('impressum');
}

export function loadDatenschutz() {
  return loadMarkdown('datenschutz');
}
