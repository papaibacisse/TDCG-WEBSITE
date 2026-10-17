import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsSection from "@/components/ProblemsSection";
import PourquoiNousChoisir from "@/components/PourquoiNousChoisir";
import ExpertiseSphere from "@/components/ExpertiseSphere";
import Sectors from "@/components/Sectors";
import ROISimulator from "@/components/ROISimulator";
import Faq from "@/components/Faq";
import ContactChannels from "@/components/ContactChannels";
import Footer from "@/components/Footer";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/JsonLd";
export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
<FaqJsonLd />
      <Header />
      <main>
        {/* 1. Accroche — qui nous sommes, pour qui, pourquoi */}
        <Hero />

        {/* 3. Connexion émotionnelle — les défis que vit le prospect */}
        <ProblemsSection />

        {/* 4. Pourquoi nous — différenciateurs honnêtes */}
        <PourquoiNousChoisir />

        {/* 5. Ce qu'on fait — 5 pôles d'expertise interactifs */}
        <ExpertiseSphere />

        {/* 6. Pour qui — secteurs d'activité */}
        <Sectors />

        {/* 7. Objections — FAQ */}
        <Faq />

        {/* 8. Outil de conversion — simulateur ROI */}
        <ROISimulator />

        {/* 9. Canaux de contact */}
        <ContactChannels />
      </main>
      <Footer />
    </>
  );
}
