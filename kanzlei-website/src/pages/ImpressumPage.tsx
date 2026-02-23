import ReactMarkdown from 'react-markdown';
import { usePageMeta } from '../lib/usePageMeta';
import { loadImpressum } from '../lib/content';
import PageContainer from '../components/PageContainer';

export default function ImpressumPage() {
  const content = loadImpressum();

  usePageMeta({
    title: content?.title || 'Impressum',
    description: content?.description || 'Impressum unserer Rechtsanwaltskanzlei.',
  });

  return (
    <div className="bg-gray-50 py-12">
      <PageContainer>
        <h1 className="text-4xl font-bold mb-6 text-[#1a365d]">{content?.title || 'Impressum'}</h1>
        <div className="prose max-w-4xl">
          <ReactMarkdown>{content?.content || ''}</ReactMarkdown>
        </div>
      </PageContainer>
    </div>
  );
}
