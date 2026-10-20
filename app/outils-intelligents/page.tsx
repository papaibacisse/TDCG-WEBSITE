import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OutilsIntelligentsPage from "@/components/outils/OutilsIntelligentsPage";
import { OrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Outils Intelligents — Diagnostiquer, Mesurer, Agir | TDCG",
  description:
    "Découvrez les outils intelligents de TDCG : diagnostic de maturité digitale, simulateur de ROI, radar de visibilité IA et espace de pilotage client. Transformez vos données en décisions stratégiques.",
  openGraph: {
    title: "Outils Intelligents TDCG — Du Diagnostic à la Performance",
    description:
      "Évaluez votre maturité digitale, estimez vos opportunités de croissance et pilotez votre transformation avec les outils de TDCG.",
    url: "https://terangadigitalconsultinggroup.com/outils-intelligents",
    type: "website",
  },
};

export default function OutilsIntelligentsRoute() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />
      <main>
        <OutilsIntelligentsPage />
      </main>
      <Footer />
    </>
  );
}
