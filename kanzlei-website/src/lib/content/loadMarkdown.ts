import type { MarkdownContent } from './types';

// Dynamic Markdown imports with language support using ?raw query
type RawModules = Record<string, { default: string }>;

const rawModules = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true }) as RawModules;

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
    // Simple YAML-like frontmatter parser (no external dependency)
    const data: Record<string, unknown> = {};
    const lines = frontmatter.split('\n');
    let currentKey = '';
    let currentValue: string[] = [];
    let inList = false;
    let listItems: string[] = [];

    for (const line of lines) {
      // Check for list item
      if (line.startsWith('  - ')) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(line.slice(4));
        continue;
      }
      
      // End of list
      if (inList && !line.startsWith('  ')) {
        if (currentKey && listItems.length > 0) {
          data[currentKey] = listItems;
        }
        inList = false;
        listItems = [];
      }
      
      // Check for key: value
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        // Save previous key-value if exists
        if (currentKey && currentValue.length > 0) {
          data[currentKey] = currentValue.join(':').trim();
        }
        
        currentKey = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        
        if (value) {
          currentValue = [value];
        } else {
          currentValue = [];
        }
      } else if (currentKey && line.trim()) {
        // Continuation of multiline value
        currentValue.push(line);
      }
    }
    
    // Save last key-value
    if (inList && currentKey && listItems.length > 0) {
      data[currentKey] = listItems;
    } else if (currentKey && currentValue.length > 0) {
      data[currentKey] = currentValue.join(':').trim();
    }
    
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

function loadMarkdownFile(filename: string, lang: string): MarkdownContent | null {
  // Try requested language first
  const langPath = `/content/${filename}.${lang}.md`;
  if (rawModules[langPath]) {
    return parseMarkdown(rawModules[langPath].default);
  }
  
  // Fallback to German
  const dePath = `/content/${filename}.de.md`;
  if (rawModules[dePath]) {
    return parseMarkdown(rawModules[dePath].default);
  }
  
  return null;
}

export function loadMarkdown(filename: string, lang: string = 'de'): MarkdownContent | null {
  return loadMarkdownFile(filename, lang);
}

export function loadHomepage(lang: string = 'de') {
  return loadMarkdownFile('homepage', lang);
}

export function loadImpressum(lang: string = 'de') {
  return loadMarkdownFile('impressum', lang);
}

export function loadDatenschutz(lang: string = 'de') {
  return loadMarkdownFile('datenschutz', lang);
}
