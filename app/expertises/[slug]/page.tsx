import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EXPERTISE_DOMAINS } from "@/lib/constants";
import ExpertisePageClient from "./ExpertisePageClient";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

type Params = { slug: string };

export function generateStaticParams() {
  return EXPERTISE_DOMAINS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expertise = EXPERTISE_DOMAINS.find((e) => e.slug === slug);
  if (!expertise) return {};
  return {
    title: `${expertise.name} — TDCG | Teranga Digital Consulting Group`,
    description: expertise.description,
    openGraph: {
      title: expertise.name,
      description: expertise.description,
      url: `https://terangadigitalconsultinggroup.com/expertises/${slug}`,
    },
  };
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://terangadigitalconsultinggroup.com";

export default async function ExpertisePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const expertise = EXPERTISE_DOMAINS.find((e) => e.slug === slug);
  if (!expertise) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Expertises", url: `${SITE_URL}/expertises` },
          { name: expertise.name, url: `${SITE_URL}/expertises/${slug}` },
        ]}
      />
      <ServiceJsonLd
        name={expertise.name}
        description={expertise.description}
        slug={slug}
        serviceItems={[expertise.name]}
      />
      <ExpertisePageClient slug={slug} />
    </>
  );
}
