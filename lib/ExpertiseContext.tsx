"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface ExpertiseContextValue {
  pendingIndex: number | null;
  openExpertise: (index: number) => void;
  clearPending: () => void;
}

const ExpertiseContext = createContext<ExpertiseContextValue | undefined>(undefined);

export function ExpertiseProvider({ children }: { children: ReactNode }) {
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const openExpertise = useCallback((index: number) => {
    setPendingIndex(index);
    const el = document.getElementById("expertise");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const clearPending = useCallback(() => setPendingIndex(null), []);

  return (
    <ExpertiseContext.Provider value={{ pendingIndex, openExpertise, clearPending }}>
      {children}
    </ExpertiseContext.Provider>
  );
}

export function useExpertise() {
  const ctx = useContext(ExpertiseContext);
  if (!ctx) throw new Error("useExpertise must be used within ExpertiseProvider");
  return ctx;
}
