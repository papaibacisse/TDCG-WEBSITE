import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EXPERTISE_DOMAINS } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import ContactModalButton from "@/components/ContactModalButton";

export const metadata: Metadata = {
  title: "Nos Expertises — TDCG | Teranga Digital Consulting Group",
  description:
    "Découvrez les 5 pôles d'expertise de TDCG : Stratégie Digitale, IA & Automatisation, Marketing Digital, Data & CRM, Conseil Business. Cabinet de conseil en transformation digitale en Afrique.",
  openGraph: {
    title: "Nos Expertises — TDCG",
    description:
      "5 pôles d'expertise pour transformer votre entreprise : stratégie digitale, IA, marketing, data et conseil business.",
    url: "https://terangadigitalconsultinggroup.com/expertises",
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://terangadigitalconsultinggroup.com";

const ACCENT_COLORS = [
  { text: "text-[#D4AF5A]", border: "border-[#D4AF5A]/30", bg: "bg-[#D4AF5A]/10", dot: "bg-[#D4AF5A]", hex: "#D4AF5A" },
  { text: "text-[#6AB5FF]", border: "border-[#6AB5FF]/30", bg: "bg-[#6AB5FF]/10", dot: "bg-[#6AB5FF]", hex: "#6AB5FF" },
  { text: "text-[#6AFFB4]", border: "border-[#6AFFB4]/30", bg: "bg-[#6AFFB4]/10", dot: "bg-[#6AFFB4]", hex: "#6AFFB4" },
  { text: "text-[#B56AFF]", border: "border-[#B56AFF]/30", bg: "bg-[#B56AFF]/10", dot: "bg-[#B56AFF]", hex: "#B56AFF" },
  { text: "text-[#FF9A6A]", border: "border-[#FF9A6A]/30", bg: "bg-[#FF9A6A]/10", dot: "bg-[#FF9A6A]", hex: "#FF9A6A" },
];

export default function ExpertisesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Expertises", url: `${SITE_URL}/expertises` },
        ]}
      />
      <main className="min-h-screen bg-[#080D18]">
        {/* HERO */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, #D4AF5A 0%, transparent 60%)",
            }}
          />
          <div className="max-w-[1240px] mx-auto px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
              <Link href="/" className="hover:text-white/70 transition-colors">
                Accueil
              </Link>
              <ChevronRight size={12} />
              <span className="text-white/70">Expertises</span>
            </div>

            <div className="max-w-[760px]">
              <span className="font-mono text-[12px] tracking-[3px] uppercase text-[#D4AF5A] mb-4 block">
                Nos domaines d'intervention
              </span>
              <h1 className="font-display text-[clamp(32px,4.5vw,58px)] text-white leading-tight mb-5">
                5 pôles d'expertise pour{" "}
                <span className="text-[#D4AF5A]">transformer votre entreprise</span>
              </h1>
              <p className="text-white/55 text-[17px] leading-relaxed">
                TDCG regroupe ses savoir-faire autour de cinq grandes expertises
                complémentaires. Chaque pôle est pensé pour répondre à des enjeux
                business concrets, avec des équipes dédiées et des méthodologies
                éprouvées sur le terrain africain.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERTISE CARDS */}
        <section className="py-8 pb-24">
          <div className="max-w-[1240px] mx-auto px-8 flex flex-col gap-6">
            {EXPERTISE_DOMAINS.map((expertise, index) => {
              const accent = ACCENT_COLORS[index] ?? ACCENT_COLORS[0]!;
              return (
                <Link
                  key={expertise.slug}
                  href={`/expertises/${expertise.slug}`}
                  className={`group relative bg-[#0F1526] border ${accent.border} hover:border-opacity-60 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                  style={{
                    boxShadow: undefined,
                  }}
                >
                  {/* Subtle hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(ellipse 50% 60% at 10% 50%, ${accent.hex}08 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative grid md:grid-cols-[1fr_320px] gap-8 items-start">
                    {/* Left: number + title + description */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`font-mono text-[11px] tracking-[2.5px] uppercase ${accent.text} ${accent.bg} px-2.5 py-1 rounded-md`}
                        >
                          {expertise.num}
                        </span>
                        <span className="text-white/20 text-[11px] font-mono">—</span>
                        <span className={`font-mono text-[11px] tracking-[2px] uppercase ${accent.text} opacity-70`}>
                          Expertise
                        </span>
                      </div>

                      <h2 className="font-display text-[clamp(20px,2.5vw,28px)] text-white leading-tight mb-2">
                        {expertise.name}
                      </h2>
                      <p className={`text-[14px] font-medium mb-4 ${accent.text}`}>
                        {expertise.tagline}
                      </p>
                      <p className="text-white/50 text-[14.5px] leading-relaxed max-w-[520px]">
                        {expertise.description}
                      </p>

                      <div
                        className={`inline-flex items-center gap-2 mt-6 ${accent.text} text-[13px] font-medium group-hover:gap-3 transition-all duration-200`}
                      >
                        Découvrir ce pôle
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Right: items list */}
                    <div
                      className={`bg-[#080D18]/60 border ${accent.border} border-opacity-40 rounded-xl p-6`}
                    >
                      <h3 className="text-white/40 text-[10px] uppercase tracking-[2px] font-semibold mb-4">
                        Ce que nous proposons
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {expertise.items.slice(0, 5).map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-[13px] text-white/70"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`}
                            />
                            {item}
                          </li>
                        ))}
                        {expertise.items.length > 5 && (
                          <li className={`text-[12px] ${accent.text} opacity-60 pl-4.5 mt-1`}>
                            +{expertise.items.length - 5} autres prestations
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-[#0B0F1E] border-t border-white/[0.05]">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="max-w-[640px] mx-auto text-center">
              <span className="font-mono text-[11px] tracking-[3px] uppercase text-[#D4AF5A] mb-4 block">
                Passez à l'action
              </span>
              <h2 className="font-display text-[clamp(24px,3vw,38px)] text-white mb-5">
                Vous ne savez pas par quel pôle commencer ?
              </h2>
              <p className="text-white/50 text-[15.5px] leading-relaxed mb-8">
                Un échange de 30 minutes avec nos consultants suffit pour identifier
                vos priorités et construire un plan d'action adapté à votre situation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <ContactModalButton />
                <Link
                  href="/#expertise"
                  className="flex items-center gap-2 text-white border border-white/20 hover:border-white/40 text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  Voir notre approche
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
