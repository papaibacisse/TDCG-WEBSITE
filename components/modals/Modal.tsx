"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Extra classes for the modal box (controls width, background, padding) */
  boxClassName?: string;
  /** Where to render the close button. Set to false for modals that place their own. */
  showDefaultClose?: boolean;
  closeButtonLight?: boolean;
  labelledBy?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  boxClassName = "bg-white rounded-sm max-w-[620px] w-full max-h-[86vh] overflow-y-auto shadow-modal",
  showDefaultClose = false,
  closeButtonLight = false,
  labelledBy,
}: ModalProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  // Escape to close + basic focus trap
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && boxRef.current) {
        const focusables = boxRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            ref={boxRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={boxClassName + " relative"}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
          >
            {showDefaultClose && (
              <button
                onClick={onClose}
                aria-label="Fermer"
                className={
                  "absolute top-6 right-6 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-colors " +
                  (closeButtonLight
                    ? "border-white/25 bg-white/10 hover:bg-gold hover:border-gold"
                    : "border-navy/15 hover:bg-navy hover:border-navy")
                }
              >
                <X size={16} className={closeButtonLight ? "text-white" : "text-navy"} />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
