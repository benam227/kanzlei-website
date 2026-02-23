import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import { loadHomepage, loadServices } from '../lib/content';

export default function HomePage() {
  const homepage = loadHomepage();
  const services = loadServices();

  usePageMeta({
    title: homepage?.title || 'Willkommen',
    description: homepage?.description || 'Ihre kompetente Rechtsanwaltskanzlei für alle juristischen Fragen.',
  });

  return (
    <>
      <section className="bg-gradient-to-b from-[#1a365d] to-[#2c5282] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {homepage?.heroTitle || 'Ihre Rechtsanwaltskanzlei für kompetente Beratung'}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {homepage?.heroSubtitle || 'Wir stehen Ihnen mit fundierter rechtlicher Expertise und persönlicher Betreuung zur Seite.'}
          </p>
          <Link
            to="/termin-buchen"
            className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
          >
            {homepage?.ctaText || 'Termin buchen'}
          </Link>
        </div>
      </section>

      <section id="leistungen" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Unsere Leistungen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.text}</p>
                {service.href && (
                  <Link to={service.href} className="inline-block mt-3 text-[#1a365d] hover:underline">
                    Mehr →
                  </Link>
                )}
              </div>
            ))}
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
            to="/termin-buchen"
            className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
          >
            Termin buchen
          </Link>
        </div>
      </section>
    </>
  );
}
