import { usePageMeta } from '../lib/usePageMeta';
import { loadDownloads } from '../lib/content';
import PageContainer from '../components/PageContainer';

export default function DownloadsPage() {
  const downloads = loadDownloads();

  usePageMeta({
    title: 'Downloads',
    description: 'Herunterladbare Dokumente und Formulare.',
  });

  return (
    <div className="bg-gray-50 py-12">
      <PageContainer>
        <h1 className="text-4xl font-bold mb-8 text-[#1a365d]">Downloads</h1>
        {downloads.length > 0 ? (
          <ul className="space-y-4">
            {downloads.map((item, index) => (
              <li key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                >
                  <h3 className="text-lg font-semibold text-[#1a365d]">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-gray-600">Keine Downloads verfügbar.</p>
        )}
      </PageContainer>
    </div>
  );
}
