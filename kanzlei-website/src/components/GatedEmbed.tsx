import { useState } from 'react';
import { getConsent, setConsent } from '../lib/consent';

interface GatedEmbedProps {
  title: string;
  type: 'cal' | 'acuity' | 'youtube';
  embedUrl: string;
  originalUrl?: string;
  height?: number;
}

export default function GatedEmbed({ title, type, embedUrl, originalUrl, height = 500 }: GatedEmbedProps) {
  const [hasConsent, setHasConsent] = useState(() => getConsent().externalMedia);

  // Show fallback link if YouTube URL is invalid
  if (type === 'youtube' && !embedUrl && originalUrl) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">Das Video konnte nicht geladen werden.</p>
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#1a365d] text-white rounded hover:bg-[#2d4a7c]"
        >
          Video auf YouTube ansehen
        </a>
      </div>
    );
  }

  if (hasConsent) {
    if (type === 'youtube') {
      return (
        <div className="relative" style={{ paddingBottom: `${(315 / 560) * 100}%`, height: 0 }}>
          <iframe
            src={embedUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    }
    
    // Cal/Acuity - use no-referrer (required for proper functioning)
    return (
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height={height}
        style={{ border: 'none' }}
        loading="lazy"
        referrerPolicy="no-referrer"
        allow="payment"
      />
    );
  }

  const description = (type === 'cal' || type === 'acuity')
    ? 'Um diesen Service zu nutzen, müssen Sie der Verwendung externer Inhalte zustimmen.'
    : 'Um dieses Video anzusehen, müssen Sie der Verwendung externer Inhalte zustimmen.';

  return (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={() => {
          setConsent({ externalMedia: true });
          setHasConsent(true);
        }}
        className="px-6 py-3 bg-[#1a365d] text-white rounded hover:bg-[#2d4a7c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
      >
        Inhalt laden
      </button>
    </div>
  );
}
