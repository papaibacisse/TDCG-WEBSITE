// Shared Framer Motion variants for the TDCG site.
// Most sections currently use the lightweight `useReveal` IntersectionObserver
// hook (see lib/useReveal.ts) paired with the `.reveal` CSS class in
// app/globals.css, which is cheaper than Framer Motion for simple
// fade/slide-up-on-scroll effects repeated across many sections.
//
// Framer Motion itself is used where real gesture/exit animations are
// needed — see components/modals/Modal.tsx and CookieConsent.tsx.
//
// These variants are here for any component you want to animate directly
// with Framer Motion's <motion.div variants={fadeInUp} ... /> API instead.

import type { Variants } from "framer-motion";

export const EASE_PREMIUM = [0.16, 0.8, 0.24, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
};
