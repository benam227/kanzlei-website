import ReactMarkdown from 'react-markdown';
import { usePageMeta } from '../lib/usePageMeta';
import { useLanguage } from '../lib/useLanguage';
import { loadDatenschutz } from '../lib/content';
import PageContainer from '../components/PageContainer';

export default function DatenschutzPage() {
  const lang = useLanguage();
  const content = loadDatenschutz(lang);

  usePageMeta({
    title: content?.title || 'Datenschutz',
    description: content?.description || 'Datenschutzerklärung unserer Rechtsanwaltskanzlei.',
  });

  return (
    <div className="bg-gray-50 py-12">
      <PageContainer>
        <h1 className="text-4xl font-bold mb-6 text-[#1a365d]">{content?.title || 'Datenschutz'}</h1>
        <div className="prose max-w-4xl">
          <ReactMarkdown>{content?.content || ''}</ReactMarkdown>
        </div>
      </PageContainer>
    </div>
  );
}
