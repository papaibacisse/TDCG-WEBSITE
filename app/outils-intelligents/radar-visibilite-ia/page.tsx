import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RadarVisibiliteIAPage from "@/components/outils/RadarVisibiliteIAPage";

export const metadata: Metadata = {
  title: "Radar de Visibilité IA — Analysez votre présence digitale | TDCG",
  description:
    "Analysez la visibilité de votre marque dans les moteurs de recherche et les systèmes IA. Audit SEO, cohérence de votre présence digitale, comparaison concurrentielle.",
  openGraph: {
    title: "Radar de Visibilité IA — TDCG",
    description:
      "Découvrez comment votre entreprise apparaît sur Google, ChatGPT, Gemini et Perplexity. Rapport structuré avec données réelles.",
    url: "https://terangadigitalconsultinggroup.com/outils-intelligents/radar-visibilite-ia",
  },
};

export default function RadarVisibiliteIARoute() {
  return (
    <>
      <Header />
      <main>
        <RadarVisibiliteIAPage />
      </main>
      <Footer />
    </>
  );
}
