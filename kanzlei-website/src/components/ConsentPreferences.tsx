import { useState } from 'react';
import { getConsent, setConsent } from '../lib/consent';

interface ConsentPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsentPreferences({ isOpen, onClose }: ConsentPreferencesProps) {
  const [analytics, setAnalytics] = useState(() => isOpen ? getConsent().analytics : false);
  const [externalMedia, setExternalMedia] = useState(() => isOpen ? getConsent().externalMedia : false);

  if (!isOpen) return null;

  const handleSave = () => {
    setConsent({ analytics, externalMedia });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-title"
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h2 id="preferences-title" className="text-xl font-bold mb-4">Cookie-Einstellungen</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium block">Notwendige Cookies</span>
              <span className="text-sm text-gray-500">Immer aktiv</span>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              className="w-5 h-5 rounded border-gray-300"
              aria-label="Notwendige Cookies"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium block">Analyse</span>
              <span className="text-sm text-gray-500">Matomo (anonymisiert)</span>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d]"
              aria-label="Analyse-Cookies"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium block">Externe Inhalte</span>
              <span className="text-sm text-gray-500">YouTube, Buchungssystem</span>
            </div>
            <input
              type="checkbox"
              checked={externalMedia}
              onChange={(e) => setExternalMedia(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d]"
              aria-label="Externe Inhalte"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-[#1a365d] text-white rounded hover:bg-[#2d4a7c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
