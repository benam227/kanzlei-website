import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConsentProvider } from './context/ConsentContext';
import Layout from './components/Layout';
import MatomoTracker from './components/MatomoTracker';
import HomePage from './pages/HomePage';
import TerminPage from './pages/TerminPage';
import FAQPage from './pages/FAQPage';
import DownloadsPage from './pages/DownloadsPage';
import ImpressumPage from './pages/ImpressumPage';
import DatenschutzPage from './pages/DatenschutzPage';

export default function App() {
  return (
    <BrowserRouter>
      <ConsentProvider>
        <MatomoTracker url="https://analytics.kanzlei-recht.de" siteId={1} />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/termin" element={<TerminPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
          </Routes>
        </Layout>
      </ConsentProvider>
    </BrowserRouter>
  );
}
