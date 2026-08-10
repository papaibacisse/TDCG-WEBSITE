"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { CookieConsent, readConsent } from "./cookieConsentStorage";

interface CookieConsentContextValue {
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  consent: CookieConsent | null;
  refreshConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  const refreshConsent = useCallback(() => {
    setConsent(readConsent());
  }, []);

  useEffect(() => {
    refreshConsent();
  }, [refreshConsent]);

  return (
    <CookieConsentContext.Provider
      value={{
        settingsOpen,
        openSettings: () => setSettingsOpen(true),
        closeSettings: () => setSettingsOpen(false),
        consent,
        refreshConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return ctx;
}
