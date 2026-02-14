import { usePageMeta } from '../lib/usePageMeta';
import { loadDownloads } from '../lib/content';

export default function DownloadsPage() {
  const downloads = loadDownloads();

  usePageMeta({
    title: 'Downloads',
    description: 'Herunterladbare Dokumente und Formulare.',
  });

  return (
    <div className="bg-[#1a365d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Downloads</h1>
        {downloads.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {downloads.map((item, index) => (
              <li key={index} className="bg-white/10 rounded-lg p-4">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:bg-white/20 transition-colors rounded p-2 -m-2"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-xl">Keine Downloads verfügbar.</p>
        )}
      </div>
    </div>
  );
}
