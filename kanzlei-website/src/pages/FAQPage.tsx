import { useState } from 'react';
import { usePageMeta } from '../lib/usePageMeta';
import { loadFAQ } from '../lib/content';

export default function FAQPage() {
  const faqs = loadFAQ();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  usePageMeta({
    title: 'FAQ',
    description: 'Häufig gestellte Fragen zu unseren Leistungen.',
  });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">FAQ</h1>
        {faqs.length > 0 ? (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleToggle(index)}
                  aria-expanded={openIndex === index}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/20 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl">Keine FAQ-Einträge vorhanden.</p>
        )}
      </div>
    </div>
  );
}
