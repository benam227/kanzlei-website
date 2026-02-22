import ReactMarkdown from 'react-markdown';
import { usePageMeta } from '../lib/usePageMeta';
import { loadImpressum } from '../lib/content';

export default function ImpressumPage() {
  const content = loadImpressum();

  usePageMeta({
    title: content?.title || 'Impressum',
    description: content?.description || 'Impressum unserer Rechtsanwaltskanzlei.',
  });

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{content?.title || 'Impressum'}</h1>
        <div className="prose prose-invert max-w-4xl">
          <ReactMarkdown>{content?.content || ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
