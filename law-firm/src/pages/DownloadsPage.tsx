import SEO from '../components/SEO';
import { loadDownloads } from '../lib/content';

export default function DownloadsPage() {
  const downloads = loadDownloads();

  return (
    <>
      <SEO
        title="Downloads"
        description="Herunterladbare Dokumente und Formulare."
        canonical="/downloads"
      />
      
      <div className="bg-[#1a365d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Downloads</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Wichtiger Hinweis zum Datenschutz:</strong> Beim Download von Dokumenten können 
            personenbezogene Daten verarbeitet werden. Bitte beachten Sie unsere{' '}
            <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.
          </p>
        </div>

        {downloads.length > 0 ? (
          <ul className="space-y-4">
            {downloads.map((download, index) => (
              <li key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <a
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-[#1a365d]">{download.title}</h3>
                    <p className="text-sm text-gray-600">{download.description}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Keine Downloads verfügbar.</p>
        )}
      </div>
    </>
  );
}
