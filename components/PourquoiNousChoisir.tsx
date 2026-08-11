"use client";

import { Fragment } from "react";
import { Compass, Layers, RefreshCw, Globe2, Sparkles, Target, Check } from "lucide-react";
import NetworkCanvas from "./NetworkCanvas";
import { useModal } from "@/lib/ModalContext";
import { useCountUp } from "@/lib/useCountUp";
import { useReveal } from "@/lib/useReveal";

const PILLARS = [
  { icon: Compass, title: "Approche stratégique", text: "Diagnostic rigoureux, priorisation claire, feuille de route actionnable — nous pensons comme un cabinet de conseil, pas comme un prestataire." },
  { icon: Layers, title: "Expertise sectorielle", text: "12 secteurs clés maîtrisés : nos consultants comprennent vos enjeux avant même la première réunion." },
  { icon: RefreshCw, title: "Transformation digitale", text: "De l'audit à la mise en œuvre, nous digitalisons sans jamais perdre de vue votre réalité opérationnelle." },
  { icon: Globe2, title: "Connaissance du marché africain", text: "Un ancrage local fort et une lecture fine des dynamiques économiques et culturelles ouest-africaines." },
  { icon: Sparkles, title: "Culture de l'innovation", text: "Veille technologique continue, intégration de l'IA et des outils les plus récents dans nos recommandations." },
  { icon: Target, title: "Résultats mesurables", text: "Chaque mission est cadrée par des indicateurs de performance clairs, avec un reporting transparent." },
];

const COMPARISON = [
  { label: "Approche", classique: "Prestations standardisées", tdcg: "Stratégie sur-mesure" },
  { label: "Délais", classique: "Cycles longs, peu flexibles", tdcg: "Exécution rapide et itérative" },
  { label: "Connaissance locale", classique: "Vision générique", tdcg: "Expertise du marché ouest-africain" },
  { label: "Suivi des résultats", classique: "Livrables sans suivi", tdcg: "Indicateurs & reporting continu" },
  { label: "Relation", classique: "Transactionnelle", tdcg: "Partenariat stratégique durable" },
  { label: "Innovation", classique: "Outils standards", tdcg: "IA, automatisation & veille intégrées" },
];

const PROCESS = ["Écoute", "Stratégie", "Exécution", "Résultats"];

export default function PourquoiNousChoisir() {
  const { openModal } = useModal();
  const introRef = useReveal();
  const countersRef = useReveal();
  const pillarsRef = useReveal();
  const comparisonRef = useReveal();
  const ribbonRef = useReveal();
  const ctaRef = useReveal();

  const responseTime = useCountUp(48, "h");
  const sectors = useCountUp(12, "");
  const tailored = useCountUp(100, "%");

  return (
    <section id="pourquoi" className="relative overflow-hidden bg-navy py-[140px]">
      <NetworkCanvas />
      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
        {/* Intro */}
        <div ref={introRef} className="reveal max-w-[760px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Pourquoi nous choisir
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-white leading-tight">
            Nous ne sommes pas une agence digitale de plus.
          </h2>
          <p className="mt-4 text-white/60 text-[16.5px] max-w-[560px]">
            TDCG pense chaque mission comme un cabinet de conseil international et l&apos;exécute avec la rapidité et
            l&apos;ancrage d&apos;un partenaire local. Voici ce qui change quand on travaille avec nous.
          </p>
        </div>

        {/* Counters */}
        <div ref={countersRef} className="reveal flex flex-col md:flex-row border-y border-white/[0.12] mb-24">
          <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/[0.12] last:border-0">
            <div ref={responseTime.ref as any} className="font-display text-[38px] font-semibold text-gold">{responseTime.value}</div>
            <div className="text-[13px] text-white/55 mt-1.5">Délai de première réponse</div>
          </div>
          <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/[0.12] last:border-0">
            <div ref={sectors.ref as any} className="font-display text-[38px] font-semibold text-gold">{sectors.value} secteurs</div>
            <div className="text-[13px] text-white/55 mt-1.5">D&apos;expertise couverts</div>
          </div>
          <div className="flex-1 p-8">
            <div ref={tailored.ref as any} className="font-display text-[38px] font-semibold text-gold">{tailored.value}</div>
            <div className="text-[13px] text-white/55 mt-1.5">Accompagnement sur-mesure</div>
          </div>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="reveal grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mb-24">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-[rgba(9,22,42,0.55)] hover:bg-white/[0.06] transition-colors p-9">
              <div className="w-11 h-11 rounded-[10px] bg-gold-soft flex items-center justify-center mb-5">
                <Icon size={20} className="text-gold" />
              </div>
              <h4 className="text-white font-semibold text-[16.5px] mb-2.5">{title}</h4>
              <p className="text-white/60 text-[13.5px] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div ref={comparisonRef} className="reveal mb-24">
          <h3 className="font-display text-[clamp(24px,3vw,30px)] text-white text-center mb-9">
            Une autre manière de faire du conseil
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr] border border-white/[0.14] rounded-xl overflow-hidden">
            <div className="hidden md:block" />
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/45 px-5 py-4">Agence classique</div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-gold font-bold bg-gold/[0.14] px-5 py-4">TDCG</div>

            {COMPARISON.map((row) => (
              <Fragment key={row.label}>
                <div className="col-span-2 md:col-span-1 bg-white/[0.04] md:bg-transparent text-white/80 font-semibold text-[13px] px-5 py-4 border-t border-white/10">
                  {row.label}
                </div>
                <div className="text-white/40 text-[13.5px] px-5 py-4 border-t border-white/10">
                  {row.classique}
                </div>
                <div className="flex items-center gap-2.5 bg-gold/[0.06] text-white font-medium text-[13.5px] px-5 py-4 border-t border-white/10">
                  <Check size={15} className="text-gold shrink-0" /> {row.tdcg}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Process ribbon */}
        <div ref={ribbonRef} className="reveal flex flex-col md:flex-row justify-between gap-7 md:gap-3 relative mb-24">
          <div className="hidden md:block absolute top-[19px] left-[6%] right-[6%] h-px bg-white/15" />
          {PROCESS.map((step, i) => (
            <div key={step} className="flex-1 text-center relative z-[1]">
              <div className="w-[38px] h-[38px] rounded-full bg-navy border-2 border-gold flex items-center justify-center mx-auto mb-4 font-display text-gold font-semibold text-sm">
                {i + 1}
              </div>
              <h5 className="text-[13.5px] text-white font-semibold">{step}</h5>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="reveal text-center pt-9 border-t border-white/[0.12]">
          <h3 className="font-display text-[clamp(24px,3vw,30px)] text-white mb-6">Prêt à changer de dimension ?</h3>
          <button
            onClick={() => openModal("contact")}
            className="bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors"
          >
            Parlons de votre transformation
          </button>
        </div>
      </div>
    </section>
  );
}
