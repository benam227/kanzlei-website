import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Seite nicht gefunden', description: 'Die gesuchte Seite wurde nicht gefunden.' });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Seite nicht gefunden</h1>
      <p className="text-gray-600 mb-8">
        Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-[#1a365d] text-white rounded-lg hover:bg-[#2c5282] transition-colors"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
