import type { MarkdownContent } from './types';

import homepageRaw from '../../../content/homepage.md?raw';
import servicesRaw from '../../../content/services.md?raw';
import impressumRaw from '../../../content/impressum.md?raw';
import datenschutzRaw from '../../../content/datenschutz.md?raw';

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  if (!raw.startsWith('---\n')) {
    return { data: {}, content: raw };
  }

  const endIndex = raw.indexOf('\n---\n');
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(4, endIndex);
  const content = raw.slice(endIndex + 5);

  const data: Record<string, string> = {};
  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    const value = trimmed.slice(colonIndex + 1).trim();
    if (key) data[key] = value;
  }

  return { data, content };
}

function parseMarkdown(raw: string): MarkdownContent | null {
  if (!raw) return null;
  const { data, content } = parseFrontmatter(raw);
  return { ...data, content } as MarkdownContent;
}

export function loadMarkdown(filename: string): MarkdownContent | null {
  switch (filename) {
    case 'homepage': return parseMarkdown(homepageRaw);
    case 'services': return parseMarkdown(servicesRaw);
    case 'impressum': return parseMarkdown(impressumRaw);
    case 'datenschutz': return parseMarkdown(datenschutzRaw);
    default: return null;
  }
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
