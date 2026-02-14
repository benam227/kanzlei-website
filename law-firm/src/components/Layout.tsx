import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: '/', label: 'Startseite' },
  { to: '/faq', label: 'FAQ' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutz' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { showBanner, acceptAll, acceptEssential } = useConsent();

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      {showBanner && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie-Einwilligung"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-4">Cookie-Einstellungen</h2>
            <p className="mb-4 text-gray-600">
              Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. 
              Technisch notwendige Cookies sind immer aktiv, während externe Medien und Analyse-Cookies 
              Ihre Einwilligung erfordern.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-[#1a365d] text-white rounded hover:bg-[#2c5282] transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={acceptEssential}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Nur notwendige
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" aria-label="Hauptnavigation">
          <Link to="/" className="text-xl font-bold text-[#1a365d]" aria-label="Kanzlei Homepage">
            Kanzlei Recht
          </Link>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#c53030] font-semibold'
                      : 'text-gray-600 hover:text-[#1a365d]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Kanzlei Recht</h3>
              <p className="text-gray-400">
                Ihre kompetente Rechtsberatung<br />
                für alle juristischen Angelegenheiten.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400">
                Telefon: +49 123 456789<br />
                E-Mail: info@kanzlei-recht.de
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/impressum" className="hover:text-white">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Kanzlei Recht. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
