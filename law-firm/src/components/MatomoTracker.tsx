import { useEffect } from 'react';
import { useConsent } from '../context/ConsentContext';

interface MatomoConfig {
  url: string;
  siteId: number;
}

export default function MatomoTracker({ url, siteId }: MatomoConfig) {
  const { hasAnalytics } = useConsent();

  useEffect(() => {
    if (!hasAnalytics) return;

    const script = document.createElement('script');
    script.innerHTML = `
      var _paq = window._paq = window._paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        _paq.push(['setTrackerUrl', '${url}/matomo.php']);
        _paq.push(['setSiteId', '${siteId}']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.src='${url}/matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [hasAnalytics, url, siteId]);

  return null;
}
