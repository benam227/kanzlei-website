import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://example.com';

const routes = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/termin-buchen', priority: '0.9', freq: 'monthly' },
  { path: '/faq', priority: '0.7', freq: 'monthly' },
  { path: '/downloads', priority: '0.7', freq: 'monthly' },
  { path: '/impressum', priority: '0.5', freq: 'yearly' },
  { path: '/datenschutz', priority: '0.5', freq: 'yearly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated:', SITE_URL);
