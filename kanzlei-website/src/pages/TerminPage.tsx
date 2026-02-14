import { usePageMeta } from '../lib/usePageMeta';
import GatedEmbed from '../components/GatedEmbed';

const acuityUrl = import.meta.env.VITE_ACUITY_EMBED_URL?.trim().replace(/^["']|["']$/g, '');
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
const contactPhone = import.meta.env.VITE_CONTACT_PHONE;

export default function TerminPage() {
  usePageMeta({
    title: 'Termin buchen',
    description: 'Vereinbaren Sie einen Beratungstermin mit unserer Kanzlei.',
  });

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Termin buchen</h1>
        
        <div className="max-w-3xl">
          <p className="text-lg text-gray-200 mb-6">
            Vereinbaren Sie Ihren Beratungstermin bequem online über unser Buchungssystem. 
            Die Terminbuchung wird über den externen Dienstleister Acuity Scheduling abgewickelt.
          </p>
          <p className="text-lg text-gray-200 mb-8">
            Die Zahlung bzw. Anzahlung erfolgt direkt innerhalb von Acuity. 
            Auf unserer Website werden keine Zahlungsdaten erfasst oder verarbeitet.
          </p>

          <div 
            role="note" 
            className="bg-white/10 border border-white/20 rounded-lg p-4 mb-8"
          >
            <p className="font-semibold mb-2">Hinweis:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-200">
              <li>Externer Dienst: Acuity Scheduling</li>
              <li>Zahlung/Anzahlung erfolgt innerhalb von Acuity</li>
              <li>Externe Inhalte werden erst nach Zustimmung geladen</li>
            </ul>
          </div>

          {acuityUrl ? (
            <GatedEmbed
              title="Terminbuchung"
              type="acuity"
              embedUrl={acuityUrl}
              height={800}
            />
          ) : (
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
              <p className="text-lg mb-4">
                Das Buchungssystem ist derzeit nicht konfiguriert.
              </p>
              {(contactEmail || contactPhone) && (
                <p className="mb-4">
                  Alternativ können Sie uns kontaktieren:
                  {contactPhone && <span className="block">Telefon: {contactPhone}</span>}
                  {contactEmail && <span className="block">E-Mail: {contactEmail}</span>}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
