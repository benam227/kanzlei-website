import { getConsent } from './consent';

let loaded = false;

interface MatomoConfig {
  url: string;
  siteId: string;
}

export function loadMatomo(config: MatomoConfig): void {
  if (loaded) return;
  
  const consent = getConsent();
  if (!consent.analytics) return;

  const { url, siteId } = config;
  
  if (!url || !siteId) {
    console.warn('Matomo config missing');
    return;
  }

  const _paq: unknown[] = [];
  window._paq = _paq;
  
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', `${url}/matomo.php`]);
  _paq.push(['setSiteId', siteId]);
  
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.src = `${url}/js/${siteId}.js`;
  document.head.appendChild(script);
  
  loaded = true;
}

declare global {
  interface Window {
    _paq?: unknown[];
  }
}
