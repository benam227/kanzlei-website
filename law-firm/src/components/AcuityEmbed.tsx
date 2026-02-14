import { useState, useEffect, useRef } from 'react';
import { useConsent } from '../context/ConsentContext';

interface AcuityEmbedProps {
  appointmentTypeId: string;
  label?: string;
}

export default function AcuityEmbed({ appointmentTypeId, label = 'Termin buchen' }: AcuityEmbedProps) {
  const { hasExternalMedia } = useConsent();
  const [showEmbed, setShowEmbed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasExternalMedia && showEmbed && containerRef.current) {
      const container = containerRef.current;
      const script = document.createElement('script');
      script.src = 'https://static.acuityscheduling.com/js/load.js';
      script.async = true;
      script.onload = () => {
        if (window.AcuityScheduler) {
          window.AcuityScheduler.initialize({
            appointmentType: appointmentTypeId,
            target: container,
          });
        }
      };
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [hasExternalMedia, showEmbed, appointmentTypeId]);

  const handleClick = () => {
    setShowEmbed(true);
  };

  if (!showEmbed) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="mb-4 text-gray-600">
          Um einen Termin zu buchen, müssen Sie der Nutzung externer Inhalte zustimmen.
        </p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-[#c53030] text-white rounded-lg hover:bg-[#e53e3e] transition-colors"
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} className="min-h-[600px]" />
      <p className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
        Die Zahlung erfolgt sicher über Acuity Scheduling. Ihre Zahlungsdaten werden nicht an diese Website übertragen.
      </p>
    </div>
  );
}

declare global {
  interface Window {
    AcuityScheduler?: {
      initialize: (options: { appointmentType: string; target: HTMLElement }) => void;
    };
  }
}
