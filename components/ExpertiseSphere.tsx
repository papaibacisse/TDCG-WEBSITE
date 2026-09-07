"use client";

import { useEffect, useRef, useState } from "react";
import {
  Compass, Cpu, TrendingUp, Database, Briefcase, ChevronRight, X, ArrowRight,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { useExpertise } from "@/lib/ExpertiseContext";
import { EXPERTISE_DOMAINS } from "@/lib/constants";

// 5 icônes, une par pôle d'expertise
const ICONS = [Compass, Cpu, TrendingUp, Database, Briefcase];

// Couleurs d'accent subtiles par pôle
const ACCENTS = [
  "from-[#D4AF5A]/12 to-transparent",
  "from-[#6AB5FF]/10 to-transparent",
  "from-[#6AFFB4]/10 to-transparent",
  "from-[#B56AFF]/10 to-transparent",
  "from-[#FF9A6A]/10 to-transparent",
];
const ICON_COLORS = [
  "text-[#D4AF5A]",
  "text-[#6AB5FF]",
  "text-[#6AFFB4]",
  "text-[#B56AFF]",
  "text-[#FF9A6A]",
];

export default function ExpertiseSphere() {
  const { openModal } = useModal();
  const { pendingIndex, clearPending } = useExpertise();
  const wrapRef = useReveal();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Réagir à l'ouverture d'une expertise depuis le menu navbar
  useEffect(() => {
    if (pendingIndex === null) return;
    setActiveIndex(pendingIndex);
    clearPending();
  }, [pendingIndex, clearPending]);

  const active = activeIndex !== null ? EXPERTISE_DOMAINS[activeIndex] : null;

  return (
    <section id="expertise" className="bg-[#0B0F1E] py-[120px] scroll-mt-24 relative overflow-hidden">
      {/* Fond géométrique subtil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #D4AF5A 0%, transparent 45%), radial-gradient(circle at 80% 20%, #6AB5FF 0%, transparent 40%)",
        }}
      />

      <div className="max-w-[1240px] mx-auto px-8">
        {/* Header */}
        <div className="max-w-[720px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#D4AF5A] mb-4">
            <span className="w-6 h-px bg-[#D4AF5A]" /> Nos expertises
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,48px)] text-white leading-tight">
            Cinq pôles d&apos;expertise.<br />
            <span className="text-[#D4AF5A]">Une ambition commune.</span>
          </h2>
          <p className="mt-4 text-white/55 text-[16.5px] leading-relaxed">
            Chaque pôle est conçu pour répondre à un enjeu stratégique précis.
            Cliquez sur un domaine pour découvrir les services et démarrer votre projet.
          </p>
        </div>

        {/* Grille des 5 expertises */}
        <div ref={wrapRef} className="reveal grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {EXPERTISE_DOMAINS.map((domain, i) => {
            const Icon = ICONS[i];
            const isActive = activeIndex === i;

            return (
              <button
                key={domain.name}
                type="button"
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={
                  "group relative flex flex-col text-left p-6 rounded-xl border transition-all duration-300 " +
                  (isActive
                    ? "bg-[#131B2E] border-[#D4AF5A]/60 shadow-[0_0_30px_rgba(212,175,90,0.12)]"
                    : "bg-[#0F1526] border-white/[0.07] hover:border-white/20 hover:bg-[#131B2E]")
                }
              >
                {/* Gradient accent en haut à droite */}
                <div className={`absolute top-0 right-0 w-28 h-28 rounded-xl bg-gradient-to-bl ${ACCENTS[i]} pointer-events-none`} />

                {/* Numéro */}
                <span className="font-mono text-[11px] tracking-[2.5px] text-white/30 mb-3">{domain.num}</span>

                {/* Icône */}
                <div className={`w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4 transition-colors group-hover:bg-white/10 ${isActive ? "bg-white/10" : ""}`}>
                  <Icon size={20} className={ICON_COLORS[i]} />
                </div>

                {/* Titre */}
                <h3 className="text-[15px] font-semibold text-white leading-snug mb-3">{domain.name}</h3>

                {/* Sous-items (top 3 visibles, reste masqué) */}
                <ul className="flex flex-col gap-1 mt-auto">
                  {domain.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-white/40 group-hover:text-white/60 transition-colors">
                      <ChevronRight size={10} className={`shrink-0 ${ICON_COLORS[i]}`} />
                      {item}
                    </li>
                  ))}
                  {domain.items.length > 3 && (
                    <li className="text-[11px] text-white/30 mt-1">
                      +{domain.items.length - 3} autres
                    </li>
                  )}
                </ul>

                {/* Indicateur actif */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ${isActive ? "w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/60 to-transparent" : "w-0"}`} />
              </button>
            );
          })}
        </div>

        {/* Panel détail de l'expertise active */}
        {active && (
          <div className="mt-6 bg-[#0F1526] border border-[#D4AF5A]/20 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/40 to-transparent" />
            <div className="p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = ICONS[EXPERTISE_DOMAINS.indexOf(active)];
                    const i = EXPERTISE_DOMAINS.indexOf(active);
                    return (
                      <div className={`w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center`}>
                        <Icon size={20} className={ICON_COLORS[i]} />
                      </div>
                    );
                  })()}
                  <div>
                    <span className="font-mono text-[11px] tracking-[2.5px] text-white/30 block">{active.num}</span>
                    <h3 className="font-display text-[22px] text-white">{active.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveIndex(null)}
                    aria-label="Fermer"
                    className="ml-auto w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X size={14} className="text-white/60" />
                  </button>
                </div>

                <p className="text-white/65 text-[15.5px] leading-relaxed mb-6 max-w-[620px]">
                  {active.description}
                </p>

                {/* Tous les sous-items */}
                <div className="flex flex-wrap gap-2">
                  {active.items.map((item) => (
                    <span
                      key={item}
                      className="text-[12.5px] text-white/60 bg-white/[0.05] border border-white/[0.08] rounded-full px-3.5 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 md:min-w-[200px]">
                <button
                  onClick={() => openModal(active.cta.action)}
                  className="flex items-center justify-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[14px] rounded-full px-6 py-3.5 transition-colors whitespace-nowrap"
                >
                  {active.cta.label}
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => openModal("contact")}
                  className="flex items-center justify-center gap-2 text-white/70 hover:text-white border border-white/15 hover:border-white/30 text-[14px] rounded-full px-6 py-3.5 transition-colors whitespace-nowrap"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
