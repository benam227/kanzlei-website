import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://kanzlei-recht.de';
  const url = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${location.pathname}`;

  return (
    <>
      <title>{title} | Kanzlei Recht</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={`${title} | Kanzlei Recht`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
