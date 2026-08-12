import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ModalProvider } from "@/lib/ModalContext";
import { CookieConsentProvider } from "@/lib/CookieConsentContext";

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
  title: "Teranga Digital Consulting Group — Transformer vos idées en résultats",
  description:
    "TDCG accompagne entreprises, institutions publiques et startups d'Afrique de l'Ouest dans leur transformation digitale, leur pilotage stratégique et leur développement.",
  openGraph: {
    title: "Teranga Digital Consulting Group",
    description: "Transformer vos idées en résultats.",
    url: SITE_URL,
    siteName: "TDCG",
    locale: "fr_SN",
    type: "website",
  },
  icons: {
    icon: "/logo-tdcg.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <ModalProvider>
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
        </ModalProvider>
      </body>
    </html>
  );
}
