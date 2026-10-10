import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EXPERTISE_DOMAINS } from "@/lib/constants";
import ExpertisePageClient from "./ExpertisePageClient";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terangadigitalconsultinggroup.com";

type Params = { slug: string };

// SEO meta descriptions courtes et optimisées (max 155 chars) par expertise
const SEO_META: Record<string, { title: string; description: string }> = {
  "strategie-digitale-transformation": {
    title: "Stratégie Digitale & Transformation Sénégal | TDCG",
    description:
      "Audit de maturité, roadmap digitale et accompagnement au changement pour entreprises en Afrique de l'Ouest. Cabinet TDCG basé au Sénégal.",
  },
  "ia-automatisation": {
    title: "IA & Automatisation pour Entreprises | TDCG Sénégal",
    description:
      "Diagnostic IA, automatisation des processus et copilotes IA sur mesure. TDCG intègre l'intelligence artificielle dans vos opérations en Afrique de l'Ouest.",
  },
  "marketing-croissance-digitale": {
    title: "Marketing Digital & Croissance | TDCG Sénégal",
    description:
      "Stratégie marketing, SEO, acquisition digitale et growth marketing adaptés au marché africain. Simulateur ROI disponible. Cabinet TDCG au Sénégal.",
  },
  "data-crm-experience-client": {
    title: "Data, CRM & Expérience Client Afrique | TDCG",
    description:
      "Structurez vos données, déployez votre CRM et optimisez vos parcours clients. TDCG accompagne entreprises et institutions en Afrique de l'Ouest.",
  },
  "conseil-business-technologie": {
    title: "Conseil Business & Technologie Sénégal | TDCG",
    description:
      "Conseil stratégique, organisation et gestion de projets de transformation. Rigueur internationale, ancrage local — cabinet TDCG au Sénégal.",
  },
};

// Pages statiques générées au build
export function generateStaticParams() {
  return EXPERTISE_DOMAINS.map((e) => ({ slug: e.slug }));
}

// Metadata SEO par expertise
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const expertise = EXPERTISE_DOMAINS.find((e) => e.slug === slug);
  if (!expertise) return {};

  const seo = SEO_META[slug] ?? {
    title: `${expertise.name} — TDCG Sénégal`,
    description: expertise.description.slice(0, 155),
  };

  const pageUrl = `${SITE_URL}/expertises/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "fr": pageUrl,
        "x-default": pageUrl,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pageUrl,
      siteName: "Teranga Digital Consulting Group",
      locale: "fr_SN",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${expertise.name} — TDCG Cabinet Conseil Sénégal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function ExpertisePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expertise = EXPERTISE_DOMAINS.find((e) => e.slug === slug);
  if (!expertise) notFound();

  const currentIndex = EXPERTISE_DOMAINS.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? EXPERTISE_DOMAINS[currentIndex - 1] : null;
  const next = currentIndex < EXPERTISE_DOMAINS.length - 1 ? EXPERTISE_DOMAINS[currentIndex + 1] : null;

  return (
    <>
      {/* Structured data JSON-LD */}
      <ServiceJsonLd
        name={expertise.name}
        description={expertise.description}
        slug={expertise.slug}
        serviceItems={expertise.items}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Nos expertises", url: `${SITE_URL}/#expertise` },
          { name: expertise.name, url: `${SITE_URL}/expertises/${expertise.slug}` },
        ]}
      />
      <ExpertisePageClient expertise={expertise} prev={prev} next={next} />
    </>
  );
}
