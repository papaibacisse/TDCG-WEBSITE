import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemsSection from "@/components/ProblemsSection";
import PourquoiNousChoisir from "@/components/PourquoiNousChoisir";
import ExpertiseSphere from "@/components/ExpertiseSphere";
import Sectors from "@/components/Sectors";
import ROISimulator from "@/components/ROISimulator";
import Faq from "@/components/Faq";
import CtaFinal from "@/components/CtaFinal";
import ContactChannels from "@/components/ContactChannels";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Accroche — qui nous sommes, pour qui, pourquoi */}
        <Hero />

        {/* 2. Preuve sociale légère — secteurs couverts */}
        <TrustBar />

        {/* 3. Connexion émotionnelle — les défis que vit le prospect */}
        <ProblemsSection />

        {/* 4. Pourquoi nous — différenciateurs honnêtes */}
        <PourquoiNousChoisir />

        {/* 5. Ce qu'on fait — 5 pôles d'expertise interactifs */}
        <ExpertiseSphere />

        {/* 6. Pour qui — secteurs d'activité */}
        <Sectors />

        {/* 7. Outil de conversion — simulateur ROI (ici = plus de leads) */}
        <ROISimulator />

        {/* 8. Objections — FAQ */}
        <Faq />

        {/* 9. CTA final */}
        <CtaFinal />

        {/* 10. Canaux de contact */}
        <ContactChannels />
      </main>
      <Footer />
    </>
  );
}
