import { usePageMeta } from '../lib/usePageMeta';
import GatedEmbed from '../components/GatedEmbed';
import PageContainer from '../components/PageContainer';

const calEmbedUrl = import.meta.env.VITE_CALEMBED_URL?.trim().replace(/^["']|["']$/g, '');
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
const contactPhone = import.meta.env.VITE_CONTACT_PHONE;

export default function TerminPage() {
  usePageMeta({
    title: 'Termin buchen',
    description: 'Vereinbaren Sie einen Beratungstermin mit unserer Kanzlei.',
  });

  return (
    <div className="bg-gray-50 py-12">
      <PageContainer>
        <h1 className="text-4xl font-bold mb-6 text-[#1a365d]">Termin buchen</h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Vereinbaren Sie Ihren Beratungstermin bequem online über unser Buchungssystem. 
          Die Terminbuchung wird über den externen Dienstleister Cal.eu abgewickelt.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Die Zahlung bzw. Anzahlung erfolgt direkt innerhalb von Cal.eu. 
          Auf unserer Website werden keine Zahlungsdaten erfasst oder verarbeitet.
        </p>

        <div 
          role="note" 
          className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-8"
        >
          <p className="font-semibold mb-2">Hinweis:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Externer Dienst: Cal.eu</li>
            <li>Zahlung/Anzahlung erfolgt innerhalb von Cal.eu</li>
            <li>Externe Inhalte werden erst nach Zustimmung geladen</li>
          </ul>
        </div>

        {calEmbedUrl ? (
          <GatedEmbed
            title="Terminbuchung"
            type="cal"
            embedUrl={calEmbedUrl}
            height={800}
          />
        ) : (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center">
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
      </PageContainer>
    </div>
  );
}
