import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { usePageMeta } from '../lib/usePageMeta';
import { useLanguage } from '../lib/useLanguage';
import { loadHomepage, loadOrderedServices, loadHomepageJson, loadDownloads, loadFAQ, toYouTubeEmbedUrl, type CustomSection } from '../lib/content';
import GatedEmbed from '../components/GatedEmbed';

interface ServiceItem {
  title: string;
  text: string;
  href: string;
}

export default function HomePage() {
  const lang = useLanguage();
  const homepage = loadHomepage(lang);
  const homepageJson = loadHomepageJson(lang);
  const services = loadOrderedServices(lang);
  const downloads = loadDownloads(lang);
  const faqs = loadFAQ(lang);

  usePageMeta({
    title: homepage?.title || 'Willkommen',
    description: homepage?.description || 'Ihre kompetente Rechtsanwaltskanzlei für alle juristischen Fragen.',
  });

  // Default order if not specified
  const defaultOrder = ['video', 'services', 'downloads', 'faq', 'stats', 'contact'];
  const sectionOrder = homepageJson?.sectionOrder || defaultOrder;

  // Hero background image with gradient overlay
  const heroBackgroundImage = homepageJson?.heroBackgroundImage;

  const renderHero = () => (
    <section 
      className="bg-gradient-to-b from-[#1a365d] to-[#2c5282] text-white py-20 relative"
      style={heroBackgroundImage ? {
        backgroundImage: `linear-gradient(to bottom, rgba(26, 54, 93, 0.85), rgba(44, 80, 130, 0.85)), url(${heroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {homepageJson?.heroTitle || homepage?.heroTitle || 'Ihre Rechtsanwaltskanzlei für kompetente Beratung'}
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {homepageJson?.heroSubtitle || homepage?.heroSubtitle || 'Wir stehen Ihnen mit fundierter rechtlicher Expertise und persönlicher Betreuung zur Seite.'}
        </p>
        <Link
          to={`/${lang === 'en' ? 'en/' : ''}termin-buchen`}
          className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
        >
          {homepageJson?.ctaText || homepage?.ctaText || 'Termin buchen'}
        </Link>
      </div>
    </section>
  );

  const renderServices = () => (
    <section id="leistungen" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          {homepageJson?.servicesTitle || 'Unsere Leistungen'}
        </h2>
        {homepageJson?.servicesIntro && (
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {homepageJson.servicesIntro}
          </p>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service: ServiceItem, index: number) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.text}</p>
              {service.href && (
                <Link to={service.href} className="inline-block mt-3 text-[#1a365d] hover:underline">
                  Mehr →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          {homepageJson?.contactTitle || 'Vereinbaren Sie einen Termin'}
        </h2>
        <p className="text-gray-600 mb-8">
          {homepageJson?.contactIntro || 'Rufen Sie uns an oder buchen Sie online einen Beratungstermin.'}
        </p>
        <Link
          to={`/${lang === 'en' ? 'en/' : ''}termin-buchen`}
          className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
        >
          {homepageJson?.ctaText || homepage?.ctaText || 'Termin buchen'}
        </Link>
      </div>
    </section>
  );

  const renderVideo = () => {
    if (!homepageJson?.youtubeUrl) return null;
    const embedUrl = toYouTubeEmbedUrl(homepageJson.youtubeUrl);
    if (!embedUrl) return null;
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {homepageJson?.youtubeTitle || 'Lernen Sie uns kennen'}
          </h2>
          {homepageJson?.youtubeIntro && (
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {homepageJson.youtubeIntro}
            </p>
          )}
          <GatedEmbed
            title={homepageJson.youtubeTitle || 'Video'}
            type="youtube"
            embedUrl={embedUrl}
          />
        </div>
      </section>
    );
  };

  const renderDownloads = () => {
    if (downloads.length === 0) return null;
    return (
      <section id="downloads" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{homepageJson?.downloadsTitle || (lang === 'en' ? 'Downloads' : 'Downloads')}</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {homepageJson?.downloadsIntro || (lang === 'en' ? 'Here you will find helpful documents to download.' : 'Hier finden Sie hilfreiche Dokumente zum Download.')}
          </p>
          <div className="space-y-4">
            {downloads.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-[#1a365d]">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderFAQ = () => {
    if (faqs.length === 0) return null;
    return (
      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{homepageJson?.faqTitle || (lang === 'en' ? 'Frequently Asked Questions' : 'Häufig gestellte Fragen')}</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {homepageJson?.faqIntro || (lang === 'en' ? 'Answers to common questions about our services.' : 'Antworten auf häufige Fragen zu unseren Leistungen.')}
          </p>
          <div className="space-y-6">
            {faqs.slice(0, 4).map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderStats = () => (
    <section className="py-16 bg-[#1a365d] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-gray-300">{lang === 'en' ? 'Years Experience' : 'Jahre Erfahrung'}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-300">{lang === 'en' ? 'Successful Cases' : 'Erfolgreiche Fälle'}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-gray-300">{lang === 'en' ? 'Satisfied Clients' : 'Zufriedene Kunden'}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24h</div>
            <div className="text-gray-300">{lang === 'en' ? 'Response Time' : 'Reaktionszeit'}</div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCustomSection = (section: CustomSection, index: number) => {
    const { id, title, content, backgroundImage, type = 'text', youtubeUrl } = section;
    
    // Video type with YouTube embed
    if (type === 'video' && youtubeUrl) {
      const embedUrl = toYouTubeEmbedUrl(youtubeUrl);
      return (
        <section key={id || index} className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
            {content && (
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">{content}</p>
            )}
            {embedUrl && (
              <GatedEmbed title={title || 'Video'} type="youtube" embedUrl={embedUrl} />
            )}
          </div>
        </section>
      );
    }

    // Image type with background
    if (type === 'image' && backgroundImage) {
      return (
        <section 
          key={id || index}
          className="py-16 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-white">
            {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
            {content && (
              <div className="prose prose-lg mx-auto">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        </section>
      );
    }

    // CTA type
    if (type === 'cta') {
      return (
        <section key={id || index} className="py-16 bg-[#1a365d] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
            {content && <p className="text-gray-200 mb-8">{content}</p>}
            <Link
              to={`/${lang === 'en' ? 'en/' : ''}termin-buchen`}
              className="inline-block px-8 py-4 bg-[#c53030] text-white rounded-lg text-lg font-semibold hover:bg-[#e53e3e] transition-colors"
            >
              Termin buchen
            </Link>
          </div>
        </section>
      );
    }

    // Default: text type
    return (
      <section key={id || index} className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
          {content && (
            <div className="prose prose-lg mx-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Map section IDs to render functions
  const sectionMap: Record<string, React.ReactNode> = {
    video: renderVideo(),
    services: renderServices(),
    contact: renderContact(),
    downloads: renderDownloads(),
    faq: renderFAQ(),
    stats: renderStats(),
  };

  // Get custom sections by their IDs
  const customSections = homepageJson?.customSections || [];
  customSections.forEach((section: CustomSection) => {
    if (section.id) {
      sectionMap[`custom:${section.id}`] = renderCustomSection(section, 0);
    }
  });

  // Render sections in order
  const renderSections = () => {
    const elements: React.ReactNode[] = [];
    sectionOrder.forEach((sectionId: string) => {
      if (sectionMap[sectionId]) {
        elements.push(sectionMap[sectionId]);
      }
    });
    // Also render any custom sections that aren't in the order list (append at end)
    customSections.forEach((section: CustomSection) => {
      if (section.id && !sectionOrder.includes(`custom:${section.id}`) && !sectionOrder.includes(section.id)) {
        elements.push(renderCustomSection(section, elements.length));
      }
    });
    return elements;
  };

  return (
    <>
      {renderHero()}
      {renderSections()}
    </>
  );
}
