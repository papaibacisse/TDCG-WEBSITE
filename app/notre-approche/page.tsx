import type { Metadata } from "next";
import NotreApprochePage from "./NotreApprochePage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terangadigitalconsultinggroup.com";
const PAGE_URL = `${SITE_URL}/notre-approche`;

export const metadata: Metadata = {
  title: "Notre Méthode de Conseil en Transformation Digitale | TDCG Sénégal",
  description:
    "Découvrez la méthodologie TDCG en 5 étapes : audit, stratégie, planification, exécution et mesure. Cabinet de conseil en transformation digitale au Sénégal.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "fr": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Notre Méthode de Conseil en Transformation Digitale | TDCG",
    description: "Rigueur internationale, ancrage local, résultats mesurables — la méthode TDCG pour accompagner votre transformation digitale en Afrique de l'Ouest.",
    url: PAGE_URL,
    siteName: "Teranga Digital Consulting Group",
    locale: "fr_SN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Méthodologie TDCG — Cabinet de conseil en transformation digitale Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notre Méthode de Conseil | TDCG Sénégal",
    description: "La méthode TDCG en 5 étapes pour réussir votre transformation digitale en Afrique de l'Ouest.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Notre approche", url: PAGE_URL },
        ]}
      />
      <NotreApprochePage />
    </>
  );
}
