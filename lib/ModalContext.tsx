"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

export type ModalName = "contact" | "audit" | "devis" | "cgu" | "privacy" | null;

interface ModalContextValue {
  activeModal: ModalName;
  openModal: (name: Exclude<ModalName, null>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  const openModal = useCallback((name: Exclude<ModalName, null>) => {
    setActiveModal(name);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
