import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Willkommen"
        description="Ihre kompetente Rechtsanwaltskanzlei für alle juristischen Fragen. Wir bieten professionelle Beratung und Vertretung in allen Rechtsgebieten."
      />
      
      <section className="bg-gradient-to-b from-[#1a365d] to-[#2c5282] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Ihre Rechtsanwaltskanzlei<br />für kompetente Beratung
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Wir stehen Ihnen mit fundierter rechtlicher Expertise und persönlicher Betreuung zur Seite.
          </p>
          <Link
            to="/termin"
            className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
          >
            Termin buchen
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Leistungen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#1a365d] rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Arbeitsrecht</h3>
              <p className="text-gray-600">
                Beratung zu Arbeitsverträgen, Kündigungsschutz, Betriebsratsfragen und vieles mehr.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#1a365d] rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mietrecht</h3>
              <p className="text-gray-600">
                Unterstützung bei Mieterhöhungen, Kündigungen, Nebenkostenabrechnungen und Wohnungsmängeln.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#1a365d] rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vertragsrecht</h3>
              <p className="text-gray-600">
                Erstellung und Prüfung von Verträgen, allgemeinen Geschäftsbedingungen und rechtlicher Vertretung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vereinbaren Sie einen Termin</h2>
          <p className="text-gray-600 mb-8">
            Rufen Sie uns an oder buchen Sie online einen Beratungstermin.
          </p>
          <Link
            to="/termin"
            className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
          >
            Termin buchen
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unser Team</h2>
          <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Vorstellung unserer Kanzlei" />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kontakt</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kanzlei Recht</h3>
              <p className="text-gray-600 mb-2">Musterstraße 123</p>
              <p className="text-gray-600 mb-2">12345 Musterstadt</p>
              <p className="text-gray-600 mt-4">
                <strong>Telefon:</strong> +49 123 456789<br />
                <strong>E-Mail:</strong> info@kanzlei-recht.de
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sprechzeiten</h3>
              <p className="text-gray-600">
                Mo - Fr: 09:00 - 17:00 Uhr<br />
                Sa: Nach Vereinbarung
              </p>
            </div>
          </div>
        </div>
      </section>

      <Link
        to="/termin"
        className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-[#c53030] text-white rounded-full shadow-lg hover:bg-[#e53e3e] transition-colors font-semibold"
      >
        Termin buchen
      </Link>
    </>
  );
}
