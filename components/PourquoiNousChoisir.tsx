"use client";

import { useReveal } from "@/lib/useReveal";
import { Globe2, Target, Users, Zap } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Globe2,
    color: "text-[#D4AF5A]",
    bg: "bg-[#D4AF5A]/10",
    title: "Rigueur internationale",
    description: "Nos méthodes s'appuient sur les standards des meilleurs cabinets mondiaux (McKinsey, BCG, Accenture) — adaptées aux réalités africaines.",
  },
  {
    icon: Target,
    color: "text-[#6AB5FF]",
    bg: "bg-[#6AB5FF]/10",
    title: "Résultats mesurables",
    description: "Nous définissons des KPIs dès le départ. Chaque mission est pilotée par des indicateurs concrets. Pas de promesses vagues.",
  },
  {
    icon: Users,
    color: "text-[#6AFFB4]",
    bg: "bg-[#6AFFB4]/10",
    title: "Ancrage local profond",
    description: "Basés au Sénégal, nous comprenons les contraintes locales : réglementation, contexte culturel, dynamiques de marché. Pas un cabinet étranger.",
  },
  {
    icon: Zap,
    color: "text-[#FF9A6A]",
    bg: "bg-[#FF9A6A]/10",
    title: "Transfert de compétences",
    description: "Nous ne créons pas de dépendance. Nous formons vos équipes pour qu'elles deviennent autonomes. C'est notre engagement principal.",
  },
];

export default function PourquoiNousChoisir() {
  const ref = useReveal();

  return (
    <section className="bg-[#0B0F1E] py-[100px]">
      <div className="max-w-[1240px] mx-auto px-8">

        <div className="grid md:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#D4AF5A] mb-4">
              <span className="w-6 h-px bg-[#D4AF5A]" /> Pourquoi TDCG
            </div>
            <h2 className="font-display text-[clamp(28px,3.4vw,44px)] text-white leading-tight">
              Ce qui nous distingue<br />
              <span className="text-[#D4AF5A]">réellement.</span>
            </h2>
          </div>
          <p className="text-white/50 text-[16px] leading-relaxed">
            Beaucoup de cabinets proposent des services similaires. La différence TDCG tient à quatre engagements
            non négociables que nous tenons sur chaque mission.
          </p>
        </div>

        <div ref={ref} className="reveal grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {DIFFERENTIATORS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="group bg-[#0F1526] border border-white/[0.07] hover:border-white/15 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-xl ${d.bg} flex items-center justify-center mb-5`}>
                  <Icon size={22} className={d.color} />
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-3 leading-snug">{d.title}</h3>
                <p className="text-white/45 text-[13.5px] leading-relaxed">{d.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bande de confiance */}
        <div className="mt-12 bg-[#0F1526] border border-white/[0.07] rounded-2xl p-8 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
          <div className="py-4 md:py-0 md:px-8 first:pl-0 last:pr-0">
            <div className="font-mono text-[11px] tracking-[2px] text-white/30 uppercase mb-2">Notre engagement</div>
            <p className="text-white/70 text-[14px] leading-snug">Un diagnostic honnête avant toute proposition commerciale.</p>
          </div>
          <div className="py-4 md:py-0 md:px-8">
            <div className="font-mono text-[11px] tracking-[2px] text-white/30 uppercase mb-2">Notre promesse</div>
            <p className="text-white/70 text-[14px] leading-snug">Si nous ne pouvons pas mesurer l&apos;impact, nous le disons avant de commencer.</p>
          </div>
          <div className="py-4 md:py-0 md:px-8">
            <div className="font-mono text-[11px] tracking-[2px] text-white/30 uppercase mb-2">Notre différence</div>
            <p className="text-white/70 text-[14px] leading-snug">Rigueur internationale. Réalités locales. Résultats concrets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
