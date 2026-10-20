import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimulateurROIPage from "@/components/outils/SimulateurROIPage";

export const metadata: Metadata = {
  title: "Simulateur de ROI Digital — Estimez la valeur de vos investissements | TDCG",
  description:
    "Estimez le retour sur investissement de vos projets digitaux : automatisation, CRM, campagnes d'acquisition, optimisation commerciale. Calculs réels en FCFA.",
  openGraph: {
    title: "Simulateur de ROI Digital TDCG",
    description:
      "Calculez le ROI de vos projets digitaux avec des formules réelles : économies, gains additionnels, délai de retour sur investissement.",
    url: "https://terangadigitalconsultinggroup.com/outils-intelligents/simulateur-roi",
  },
};

export default function SimulateurROIRoute() {
  return (
    <>
      <Header />
      <main>
        <SimulateurROIPage />
      </main>
      <Footer />
    </>
  );
}
