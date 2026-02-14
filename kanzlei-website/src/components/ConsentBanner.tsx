import { useState } from 'react';
import { setConsent, hasConsent } from '../lib/consent';

interface ConsentBannerProps {
  onOpenPreferences?: () => void;
}

export default function ConsentBanner({ onOpenPreferences }: ConsentBannerProps) {
  const [visible, setVisible] = useState(() => !hasConsent());

  if (!visible) return null;

  const handleAcceptAll = () => {
    setConsent({ analytics: true, externalMedia: true });
    setVisible(false);
  };

  const handleNecessaryOnly = () => {
    setConsent({ analytics: false, externalMedia: false });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p id="consent-title" className="text-sm text-gray-700">
          Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. 
          Einige Cookies sind notwendig, während andere uns helfen, unsere Dienste zu verbessern 
          und externe Inhalte (z.B. YouTube, Buchungssystem) zu ermöglichen.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleNecessaryOnly}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Nur notwendige
          </button>
          <button
            onClick={onOpenPreferences}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Einstellungen
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm bg-[#1a365d] text-white rounded hover:bg-[#2d4a7c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
