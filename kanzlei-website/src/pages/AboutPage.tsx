import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';
import { useLanguage } from '../lib/useLanguage';
import { loadAbout, toYouTubeEmbedUrl } from '../lib/content';
import GatedEmbed from '../components/GatedEmbed';
import PageHeader from '../components/PageHeader';

interface AboutData {
  title?: string;
  intro?: string;
  bio?: string;
  vita?: string[];
  youtubeTitle?: string;
  youtubeUrl?: string;
  headerImage?: string;
  headerImageAlt?: string;
}

export default function AboutPage() {
  const lang = useLanguage();
  const about = loadAbout(lang) as AboutData;

  usePageMeta({
    title: about?.title || 'Über mich',
    description: about?.intro || 'Erfahren Sie mehr über unsere Kanzlei.',
  });

  const bookingPath = lang === 'en' ? '/en/termin-buchen' : '/termin-buchen';

  // Use PageHeader if headerImage is set, otherwise inline header
  if (about?.headerImage) {
    return (
      <>
        <PageHeader
          title={about.title || 'Über mich'}
          subtitle={about.intro}
          imageSrc={about.headerImage}
          imageAlt={about.headerImageAlt}
        />
        <div className="max-w-4xl mx-auto px-4 py-12">
          {about?.bio && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">Mein Werdegang</h2>
              <p className="text-gray-600 leading-relaxed">
                {about.bio}
              </p>
            </section>
          )}

          {about?.vita && about.vita.length > 0 && (
            <section className="mb-12">
<h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
              {lang === 'en' ? 'Milestones' : 'Meilensteine'}
            </h2>
              <ul className="space-y-3">
                {about.vita.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#c53030] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {about?.youtubeUrl && (() => {
            const embedUrl = toYouTubeEmbedUrl(about.youtubeUrl);
            if (!embedUrl) return null;
            return (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
                  {about.youtubeTitle || 'Video'}
                </h2>
                <GatedEmbed
                  title={about.youtubeTitle || 'Über mich'}
                  type="youtube"
                  embedUrl={embedUrl}
                />
              </section>
            );
          })()}

          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">Kontakt</h2>
            <p className="text-gray-600 mb-6">
              Möchten Sie einen Termin vereinbaren oder haben Sie Fragen?
            </p>
            <Link
              to={bookingPath}
              className="inline-block px-6 py-3 bg-[#c53030] text-white rounded-lg font-semibold hover:bg-[#e53e3e] transition-colors"
            >
              Termin buchen
            </Link>
          </section>
        </div>
      </>
    );
  }

  // Fallback: inline header without image
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#1a365d] mb-8">
        {about?.title || 'Über mich'}
      </h1>

      {about?.intro && (
        <p className="text-lg text-gray-600 mb-8">
          {about.intro}
        </p>
      )}

      {about?.bio && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">Mein Werdegang</h2>
          <p className="text-gray-600 leading-relaxed">
            {about.bio}
          </p>
        </section>
      )}

      {about?.vita && about.vita.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
            {lang === 'en' ? 'Milestones' : 'Meilensteine'}
          </h2>
          <ul className="space-y-3">
            {about.vita.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-[#c53030] flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {about?.youtubeUrl && (() => {
        const embedUrl = toYouTubeEmbedUrl(about.youtubeUrl);
        if (!embedUrl) return null;
        return (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">
              {about.youtubeTitle || 'Video'}
            </h2>
            <GatedEmbed
              title={about.youtubeTitle || 'Über mich'}
              type="youtube"
              embedUrl={embedUrl}
            />
          </section>
        );
      })()}

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-[#1a365d] mb-4">Kontakt</h2>
        <p className="text-gray-600 mb-6">
          Möchten Sie einen Termin vereinbaren oder haben Sie Fragen?
        </p>
        <Link
          to={bookingPath}
          className="inline-block px-6 py-3 bg-[#c53030] text-white rounded-lg font-semibold hover:bg-[#e53e3e] transition-colors"
        >
          Termin buchen
        </Link>
      </section>
    </div>
  );
}
