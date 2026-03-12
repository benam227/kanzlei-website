import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import LeistungenPage from './pages/LeistungenPage';
import AboutPage from './pages/AboutPage';
import TerminPage from './pages/TerminPage';
import FAQPage from './pages/FAQPage';
import DownloadsPage from './pages/DownloadsPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';
import NotFoundPage from './pages/NotFoundPage';

// Language handler component that syncs i18n with URL
function LanguageHandler() {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const currentLang = location.pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [location.pathname, i18n]);
  
  return null;
}

// Wrapper component that adds lang parameter to Layout
function LangLayout({ lang }: { lang?: string }) {
  return <Layout lang={lang} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageHandler />
      <Routes>
        {/* German routes (default) */}
        <Route element={<LangLayout lang={undefined} />}>
          <Route index element={<HomePage />} />
          <Route path="leistungen" element={<LeistungenPage />} />
          <Route path="ueber-mich" element={<AboutPage />} />
          <Route path="termin-buchen" element={<TerminPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="impressum" element={<ImpressumPage />} />
          <Route path="datenschutz" element={<DatenschutzPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* English routes with /en prefix */}
        <Route element={<LangLayout lang="en" />}>
          <Route path="/en" index element={<HomePage />} />
          <Route path="/en/leistungen" element={<LeistungenPage />} />
          <Route path="/en/ueber-mich" element={<AboutPage />} />
          <Route path="/en/termin-buchen" element={<TerminPage />} />
          <Route path="/en/faq" element={<FAQPage />} />
          <Route path="/en/downloads" element={<DownloadsPage />} />
          <Route path="/en/impressum" element={<ImpressumPage />} />
          <Route path="/en/datenschutz" element={<DatenschutzPage />} />
          <Route path="/en/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
