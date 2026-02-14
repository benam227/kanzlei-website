import ReactMarkdown from 'react-markdown';
import { usePageMeta } from '../lib/usePageMeta';
import { loadDatenschutz } from '../lib/content';

export default function DatenschutzPage() {
  const content = loadDatenschutz();

  usePageMeta({
    title: content?.title || 'Datenschutz',
    description: content?.description || 'Datenschutzerklärung unserer Rechtsanwaltskanzlei.',
  });

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{content?.title || 'Datenschutz'}</h1>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content?.content || ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
