import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { EXPERTISE_DOMAINS } from "@/lib/constants";
import ExpertisePageClient from "./ExpertisePageClient";

type Params = { slug: string };

// Pages statiques générées au build
export function generateStaticParams() {
  return EXPERTISE_DOMAINS.map((e) => ({ slug: e.slug }));
}

// Metadata SEO par expertise
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
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

export default async function ExpertisePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expertise = EXPERTISE_DOMAINS.find((e) => e.slug === slug);
  if (!expertise) notFound();

  const currentIndex = EXPERTISE_DOMAINS.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? EXPERTISE_DOMAINS[currentIndex - 1] : null;
  const next = currentIndex < EXPERTISE_DOMAINS.length - 1 ? EXPERTISE_DOMAINS[currentIndex + 1] : null;

  return <ExpertisePageClient expertise={expertise} prev={prev} next={next} />;
}
