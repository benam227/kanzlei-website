export const SUPPORTED_LANGUAGES = [
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
] as const;

export const DEFAULT_LANGUAGE = 'de';

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export const getLanguageByCode = (code: string) => SUPPORTED_LANGUAGES.find(l => l.code === code);
