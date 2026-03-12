import { useLocation } from 'react-router-dom';

export function useLanguage(): string {
  const location = useLocation();
  // Detect language from URL path
  return location.pathname.startsWith('/en') ? 'en' : 'de';
}
