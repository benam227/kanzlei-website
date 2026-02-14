import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

type ConsentState = {
  essential: boolean;
  analytics: boolean;
  externalMedia: boolean;
};

type ConsentContextType = {
  consent: ConsentState;
  setConsent: (consent: ConsentState) => void;
  hasAnalytics: boolean;
  hasExternalMedia: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'lawfirm-consent';

function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const storedConsent = getStoredConsent();
  const initialConsent = storedConsent ?? { essential: true, analytics: false, externalMedia: false };
  const initialShowBanner = storedConsent === null;

  const [consent, setConsentState] = useState<ConsentState>(initialConsent);
  const [showBanner, setShowBanner] = useState(initialShowBanner);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      setShowBanner(false);
    }
  }, [consent, hasInitialized]);

  const setConsent = useCallback((newConsent: ConsentState) => {
    setConsentState(newConsent);
  }, []);

  const acceptAll = useCallback(() => {
    setConsentState({ essential: true, analytics: true, externalMedia: true });
  }, []);

  const acceptEssential = useCallback(() => {
    setConsentState({ essential: true, analytics: false, externalMedia: false });
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        setConsent,
        hasAnalytics: consent.analytics,
        hasExternalMedia: consent.externalMedia,
        showBanner,
        acceptAll,
        acceptEssential,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}
