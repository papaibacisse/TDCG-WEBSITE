import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PourquoiNousChoisir from "@/components/PourquoiNousChoisir";
import ExpertiseSphere from "@/components/ExpertiseSphere";
import Methodology from "@/components/Methodology";
import Sectors from "@/components/Sectors";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ROISimulator from "@/components/ROISimulator";
import CtaFinal from "@/components/CtaFinal";
import ContactChannels from "@/components/ContactChannels";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <PourquoiNousChoisir />
        <ExpertiseSphere />
        <Methodology />
        <Sectors />
        <CaseStudies />
        <Testimonials />
        <Faq />
        <ROISimulator />
        <CtaFinal />
        <ContactChannels />
      </main>
      <Footer />
    </>
  );
}
