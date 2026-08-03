"use client";

import { useReveal } from "@/lib/useReveal";

const STEPS = [
  {
    title: "Diagnostic & audit",
    text: "Analyse approfondie de votre organisation, de vos outils et de votre positionnement pour identifier les leviers prioritaires.",
  },
  {
    title: "Stratégie sur-mesure",
    text: "Élaboration d'une feuille de route claire, alignée sur vos objectifs et vos contraintes opérationnelles.",
  },
  {
    title: "Mise en œuvre accompagnée",
    text: "Déploiement des actions avec nos équipes, formation de vos collaborateurs et gestion du changement.",
  },
  {
    title: "Mesure & optimisation",
    text: "Suivi des indicateurs de performance et ajustements continus pour maximiser le retour sur investissement.",
  },
];

export default function Methodology() {
  const headRef = useReveal();
  const listRef = useReveal();

  return (
    <section className="bg-navy py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Notre méthodologie
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-white leading-tight">
            Une démarche structurée, du diagnostic à l&apos;impact.
          </h2>
        </div>

        <div ref={listRef} className="reveal flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-3 md:gap-8 items-start py-9 border-t border-white/[0.12] last:border-b"
            >
              <div className="font-display text-4xl text-gold font-medium">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl text-white">{step.title}</h3>
              <p className="text-[14.5px] text-white/60">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
