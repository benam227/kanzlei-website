import { useState, useRef } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}

function AccordionItem({ question, answer, isOpen, onToggle, id }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const getHeight = () => {
    if (!contentRef.current) return 0;
    return isOpen ? contentRef.current.scrollHeight : 0;
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-2">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`button-${id}`}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`button-${id}`}
        style={{ height: getHeight() }}
        className="overflow-hidden transition-height duration-300"
      >
        <div className="px-6 pb-4 text-gray-600">{answer}</div>
      </div>
    </div>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FAQItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={`faq-${index}`}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
