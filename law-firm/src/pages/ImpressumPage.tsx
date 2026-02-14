import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import { loadContent } from '../lib/content';

export default function ImpressumPage() {
  const content = loadContent('impressum');

  return (
    <>
      <SEO
        title="Impressum"
        description="Impressum unserer Rechtsanwaltskanzlei."
        canonical="/impressum"
      />
      
      <div className="bg-[#1a365d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Impressum</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {content?.content ? (
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{content.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-gray-600">
                Kanzlei Recht<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
              <p className="text-gray-600">
                Telefon: +49 123 456789<br />
                E-Mail: info@kanzlei-recht.de
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Vertreten durch</h2>
              <p className="text-gray-600">
                Rechtsanwalt Max Mustermann
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Berufsbezeichnung</h2>
              <p className="text-gray-600">
                Die Berufsbezeichnung "Rechtsanwalt" wurde in Deutschland verliehen.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Zuständige Kammer</h2>
              <p className="text-gray-600">
                Rechtsanwaltskammer Musterstadt<br />
                Musterkammerstraße 1<br />
                12345 Musterstadt
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Berufsrechtliche Regelungen</h2>
              <p className="text-gray-600">
                Es gelten die folgenden berufsrechtlichen Regelungen:<br />
                - Bundesrechtsanwaltsordnung (BRAO)<br />
                - Rechtsanwaltsvergütungsgesetz (RVG)<br />
                - Berufsordnung für Rechtsanwälte (BORA)
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
              <p className="text-gray-600">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
