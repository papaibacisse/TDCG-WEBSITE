import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrowthPartnerPage from "@/components/outils/GrowthPartnerPage";

export const metadata: Metadata = {
  title: "TDCG Growth Partner — Espace de Pilotage Client",
  description:
    "Accédez à votre tableau de bord de pilotage : objectifs, KPI, feuille de route et rapports de votre accompagnement TDCG. Réservé aux clients TDCG.",
  openGraph: {
    title: "TDCG Growth Partner — Pilotage & Suivi",
    description:
      "Suivez vos objectifs, vos indicateurs clés et votre feuille de route de transformation digitale avec TDCG.",
    url: "https://terangadigitalconsultinggroup.com/outils-intelligents/growth-partner",
  },
};

export default function GrowthPartnerRoute() {
  return (
    <>
      <Header />
      <main>
        <GrowthPartnerPage />
      </main>
      <Footer />
    </>
  );
}
