import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import FloatingCTA from '../components/FloatingCTA';
import ConsentBanner from '../components/ConsentBanner';
import ConsentPreferences from '../components/ConsentPreferences';
import { loadFooter } from '../lib/content/loadJson';

const navLinks = [
  { to: '/', label: 'Start' },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/termin-buchen', label: 'Termin buchen' },
  { to: '/faq', label: 'FAQ' },
  { to: '/downloads', label: 'Downloads' },
];

export default function Layout() {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const footer = loadFooter();

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Zum Hauptinhalt springen
      </a>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between" aria-label="Hauptnavigation">
          <Link to="/" className="text-xl font-bold text-[#1a365d]">
            Kanzlei Recht
          </Link>
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d] rounded ${
                      isActive ? 'text-[#c53030] font-semibold' : 'text-gray-600 hover:text-[#1a365d]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{footer.companyName || 'Kanzlei Recht'}</h3>
              <p className="text-gray-400">
                {footer.footerNote || 'Ihre kompetente Rechtsberatung'}
              </p>
              {footer.addressLines.length > 0 && footer.addressLines[0] && (
                <p className="text-gray-400 mt-2">
                  {footer.addressLines.map((line) => (
                    <span key={line}>
                      {line}<br />
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400">
                {footer.phone && <>Telefon: {footer.phone}<br /></>}
                {footer.email && <>E-Mail: <a href={`mailto:${footer.email}`} className="hover:text-white">{footer.email}</a></>}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-400">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="hover:text-white focus-visible:outline-2 focus-visible:outline-white rounded">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => setPreferencesOpen(true)}
                    className="hover:text-white focus-visible:outline-2 focus-visible:outline-white rounded"
                  >
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} {footer.companyName || 'Kanzlei Recht'}. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>

      <FloatingCTA />
      <ConsentBanner onOpenPreferences={() => setPreferencesOpen(true)} />
      <ConsentPreferences isOpen={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
    </div>
  );
}
