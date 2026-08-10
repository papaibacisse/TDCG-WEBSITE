export const CONSENT_STORAGE_KEY = "tdcg_cookie_consent";
export const CONSENT_TTL_DAYS = 395; // ~13 mois

export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
}

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    const ageDays = (Date.now() - parsed.timestamp) / 86_400_000;
    if (ageDays > CONSENT_TTL_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(consent: Omit<CookieConsent, "timestamp">) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }));
  } catch {
    // stockage indisponible — le consentement ne sera simplement pas mémorisé
  }
}
