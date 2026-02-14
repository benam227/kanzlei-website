import { useState } from 'react';
import { getConsent, setConsent } from '../lib/consent';

interface GatedEmbedProps {
  title: string;
  type: 'acuity' | 'youtube';
  embedUrl: string;
  height?: number;
}

export default function GatedEmbed({ title, type, embedUrl, height = 500 }: GatedEmbedProps) {
  const [hasConsent, setHasConsent] = useState(() => getConsent().externalMedia);

  if (hasConsent) {
    if (type === 'youtube') {
      return (
        <div className="relative" style={{ paddingBottom: `${(315 / 560) * 100}%`, height: 0 }}>
          <iframe
            src={embedUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
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

  const description = type === 'acuity' 
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
