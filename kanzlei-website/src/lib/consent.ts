export interface Consent {
  essential: true;
  analytics: boolean;
  externalMedia: boolean;
}

const CONSENT_KEY = 'consent.v1';

const defaultConsent: Consent = {
  essential: true,
  analytics: false,
  externalMedia: false,
};

export function getConsent(): Consent {
  if (typeof window === 'undefined') return defaultConsent;
  
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return defaultConsent;
  
  try {
    const parsed = JSON.parse(stored);
    return {
      ...defaultConsent,
      ...parsed,
    };
  } catch {
    return defaultConsent;
  }
}

export function setConsent(partial: Partial<Omit<Consent, 'essential'>>): Consent {
  const current = getConsent();
  const updated: Consent = {
    ...current,
    ...partial,
    essential: true,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(updated));
  return updated;
}

export function resetConsent(): void {
  localStorage.removeItem(CONSENT_KEY);
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) !== null;
}
