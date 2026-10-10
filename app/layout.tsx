import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ModalProvider } from "@/lib/ModalContext";
import { CookieConsentProvider } from "@/lib/CookieConsentContext";
import { ExpertiseProvider } from "@/lib/ExpertiseContext";

import ContactModal from "@/components/modals/ContactModal";
import AuditModal from "@/components/modals/AuditModal";
import DevisModal from "@/components/modals/DevisModal";
import CguModal from "@/components/modals/CguModal";
import PrivacyModal from "@/components/modals/PrivacyModal";
import MentionsLegalesModal from "@/components/modals/MentionsLegalesModal";
import CookieConsent from "@/components/CookieConsent";
import FloatingButtons from "@/components/FloatingButtons";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terangadigitalconsultinggroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cabinet Conseil Transformation Digitale Sénégal | TDCG",
  description:
    "TDCG, cabinet de conseil en transformation digitale et IA au Sénégal. Audit digital, stratégie, automatisation pour entreprises d'Afrique de l'Ouest. Réponse sous 48h.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title: "TDCG — Cabinet de Conseil en Transformation Digitale & IA | Sénégal",
    description: "Le premier cabinet africain de conseil en transformation digitale et IA pour les entreprises d'Afrique de l'Ouest.",
    url: SITE_URL,
    siteName: "Teranga Digital Consulting Group",
    locale: "fr_SN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Teranga Digital Consulting Group — Cabinet de conseil en transformation digitale au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDCG — Transformation Digitale & IA | Sénégal",
    description: "Cabinet de conseil en transformation digitale, IA et performance business en Afrique de l'Ouest.",
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "/logo-tdcg.png",
  },
  verification: {
    google: "RWNo-dNoq0kDDAAGBS0YanqZ8-Uy7T1YnVKBKM0dK-g",
  },
  keywords: [
    "transformation digitale Sénégal",
    "cabinet conseil digital Sénégal",
    "consultant IA Afrique de l'Ouest",
    "audit digital Sénégal",
    "marketing digital Dakar",
    "automatisation processus Afrique",
    "stratégie digitale PME Sénégal",
    "TDCG",
    "Teranga Digital Consulting Group",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <ModalProvider>
          <ExpertiseProvider>
          <CookieConsentProvider>
            {children}

            {/* Global modals — mounted once, opened from anywhere via useModal() */}
            <ContactModal />
            <AuditModal />
            <DevisModal />
            <CguModal />
            <PrivacyModal />
            <MentionsLegalesModal />
            <CookieConsent />
            <FloatingButtons />
          </CookieConsentProvider>
          </ExpertiseProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
