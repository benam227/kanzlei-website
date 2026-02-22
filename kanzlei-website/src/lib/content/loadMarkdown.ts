import * as yaml from 'js-yaml';
import type { MarkdownContent } from './types';

import homepageRaw from '../../../content/homepage.md?raw';
import servicesRaw from '../../../content/services.md?raw';
import impressumRaw from '../../../content/impressum.md?raw';
import datenschutzRaw from '../../../content/datenschutz.md?raw';

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  if (!raw.startsWith('---\n')) {
    return { data: {}, content: raw };
  }

  const endIndex = raw.indexOf('\n---\n');
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(4, endIndex);
  const content = raw.slice(endIndex + 5);

  try {
    const data = yaml.load(frontmatter) as Record<string, unknown>;
    return { data, content };
  } catch {
    return { data: {}, content };
  }
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
