import SEO from '../components/SEO';
import Accordion from '../components/Accordion';
import { loadFAQ } from '../lib/content';
import type { FAQ } from '../lib/types';

export default function FAQPage() {
  const faqs = loadFAQ();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: FAQ) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="FAQ"
        description="Häufig gestellte Fragen und Antworten zu unseren Leistungen."
        canonical="/faq"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      
      <div className="bg-[#1a365d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Häufig gestellte Fragen</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {faqs.length > 0 ? (
          <Accordion items={faqs} />
        ) : (
          <p className="text-gray-600">Keine FAQ-Einträge vorhanden.</p>
        )}
      </div>
    </>
  );
}
