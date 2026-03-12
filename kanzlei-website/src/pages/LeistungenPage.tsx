import { usePageMeta } from '../lib/usePageMeta';
import { useLanguage } from '../lib/useLanguage';
import { loadOrderedServices } from '../lib/content';
import { Link } from 'react-router-dom';

export default function LeistungenPage() {
  const lang = useLanguage();
  const services = loadOrderedServices(lang);

  usePageMeta({
    title: 'Unsere Leistungen',
    description: 'Juristische Beratung im Migrationsrecht - Asylrecht, Aufenthaltsrecht, Staatsangehörigkeitsrecht.',
  });

  const bookingPath = lang === 'en' ? '/en/termin-buchen' : '/termin-buchen';

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Unsere Leistungen</h1>
        <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
          Wir bieten Ihnen professionelle rechtliche Beratung in allen Bereichen des Migrationsrechts.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} id={service.href.replace('/leistungen#', '')} className="bg-white/10 rounded-lg p-8 hover:bg-white/15 transition-colors">
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-200">{service.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h2>
          <p className="text-gray-200 mb-6">
            Vereinbaren Sie einen unverbindlichen Beratungstermin.
          </p>
          <Link
            to={bookingPath}
            className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
          >
            Termin buchen
          </Link>
        </div>
      </div>
    </div>
  );
}
