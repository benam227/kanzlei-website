import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n/config';

export default function LanguageSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Detect current language from URL path
  const currentLang = location.pathname.startsWith('/en') ? 'en' : 'de';
  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  
  const handleLanguageChange = (langCode: LanguageCode) => {
    const newPath = langCode === 'de' 
      ? location.pathname.replace(/^\/en/, '') || '/'
      : `/en${location.pathname}`;
    
    navigate(newPath);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#1a365d] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
        aria-label={`Sprache ändern, aktuell: ${currentLanguage.nativeName}`}
        aria-expanded={isOpen}
      >
        <span className="text-base" aria-hidden="true">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                lang.code === currentLang ? 'bg-gray-50 text-[#1a365d] font-medium' : 'text-gray-700'
              }`}
            >
              <span className="text-base" aria-hidden="true">{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
