import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DiagnosticPage from "@/components/outils/DiagnosticPage";

export const metadata: Metadata = {
  title: "Diagnostic de Maturité Digitale — TDCG Business Intelligence",
  description:
    "Évaluez la maturité digitale de votre entreprise en 5 à 8 minutes. Score global, analyse par domaine, recommandations personnalisées et plan d'action sur 30/60/90 jours.",
  openGraph: {
    title: "Diagnostic de Maturité Digitale — TDCG",
    description:
      "Obtenez une évaluation structurée de votre entreprise : stratégie digitale, marketing, CRM, data, IA et organisation.",
    url: "https://terangadigitalconsultinggroup.com/outils-intelligents/diagnostic",
  },
};

export default function DiagnosticRoute() {
  return (
    <>
      <Header />
      <main>
        <DiagnosticPage />
      </main>
      <Footer />
    </>
  );
}
