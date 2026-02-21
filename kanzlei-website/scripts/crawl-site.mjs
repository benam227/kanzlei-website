import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://laurisprojekt.netlify.app';
const ROUTES = ['/', '/termin-buchen', '/faq', '/downloads', '/impressum', '/datenschutz', '/admin'];

async function crawl() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: [],
    summary: { errors: 0, warnings: 0, accessibilityIssues: 0 }
  };

  for (const route of ROUTES) {
    const page = await context.newPage();
    const routeReport = { url: route, console: [], networkErrors: [], title: '', landmarks: {}, links: [] };
    
    page.on('console', msg => {
      if (msg.type() === 'error') routeReport.console.push({ type: msg.type(), text: msg.text() });
    });
    page.on('requestfailed', req => {
      routeReport.networkErrors.push({ url: req.url(), failure: req.failure()?.errorText });
    });
    page.on('response', res => {
      if (res.status() >= 400) routeReport.networkErrors.push({ url: res.url(), status: res.status() });
    });

    try {
      await page.goto(BASE_URL + route, { waitUntil: 'networkidle', timeout: 30000 });
      routeReport.title = await page.title();

      const landmarks = await page.evaluate(() => {
        const check = (sel) => !!document.querySelector(sel);
        return { header: check('header'), nav: check('nav'), main: check('main'), footer: check('footer') };
      });
      routeReport.landmarks = landmarks;

      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href^="/"]')).map(a => a.getAttribute('href')).filter(h => !h.startsWith('//') && !h.startsWith('http'));
      });
      routeReport.links = [...new Set(links)];

    } catch (e) {
      routeReport.console.push({ type: 'error', text: e.message });
    }

    await page.close();
    report.routes.push(routeReport);
  }

  for (const route of report.routes) {
    report.summary.errors += route.console.length + route.networkErrors.filter(e => e.status >= 400).length;
  }

  await browser.close();

  const markdown = `# Site Crawl Report

**Timestamp:** ${report.timestamp}
**Base URL:** ${BASE_URL}

## Summary

- **Total Routes Tested:** ${ROUTES.length}
- **Console Errors:** ${report.summary.errors}

## Per-Route Results

| Route | Title | Console Errors | Network Errors | Landmarks |
|-------|-------|----------------|----------------|-----------|
${report.routes.map(r => `| ${r.url} | ${r.title || 'N/A'} | ${r.console.length} | ${r.networkErrors.length} | ${Object.entries(r.landmarks).filter(([k,v])=>v).map(([k])=>k).join(', ') || 'none'} |`).join('\n')}

## Top Issues

${report.routes.flatMap(r => r.console.map(c => `- **${r.url}**: ${c.text}`)).slice(0, 10).join('\n') || 'No console errors'}

${report.routes.flatMap(r => r.networkErrors.map(n => `- **${r.url}**: ${n.status || 'FAILED'} ${n.url}`)).slice(0, 10).join('\n') || 'No network errors'}

## Result: ${report.summary.errors === 0 ? 'PASS' : 'FAIL'}
`;

  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir);
  
  fs.writeFileSync(path.join(docsDir, 'site-crawl-report.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(docsDir, 'site-crawl-report.md'), markdown);

  console.log('Crawl complete. Reports written to docs/');
  console.log(`Result: ${report.summary.errors === 0 ? 'PASS' : 'FAIL'}`);
}

crawl().catch(console.error);
