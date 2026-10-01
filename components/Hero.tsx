"use client";

import { useModal } from "@/lib/ModalContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const PROOF_POINTS = [
  "Cabinet basé à Louga, actif en Afrique de l'Ouest",
  "12 secteurs d'activité couverts",
  "Réponse sous 48h ouvrées garantie",
];

const EXPERTISE_PILLS = [
  "Transformation Digitale",
  "IA & Automatisation",
  "Marketing & Growth",
  "Data & CRM",
  "Conseil Stratégique",
];

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative overflow-hidden bg-[#080D18] text-white pt-[160px] pb-[120px]">

      {/* Fond géométrique premium */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient lumineux */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.07]"
          style={{ background: "radial-gradient(circle at center, #D4AF5A 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle at center, #6AB5FF 0%, transparent 65%)" }} />

        {/* Grille fine */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF5A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Lignes décoratives */}
        <svg className="absolute right-0 top-0 h-full w-[45%] opacity-[0.07]" viewBox="0 0 560 700" fill="none">
          <path d="M500 700 C 480 560, 520 460, 490 360 C 470 290, 530 230, 510 140" stroke="#D4AF5A" strokeWidth="0.8" />
          <path d="M500 700 C 440 600, 400 530, 420 420 C 430 360, 380 300, 400 210" stroke="#D4AF5A" strokeWidth="0.5" />
          <path d="M500 700 C 540 570, 560 490, 540 390" stroke="#D4AF5A" strokeWidth="0.4" />
        </svg>
      </div>

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Badge positionnement */}
        <div className="inline-flex items-center gap-2.5 bg-[#D4AF5A]/10 border border-[#D4AF5A]/20 rounded-full px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[2px] uppercase text-[#D4AF5A]">
            Cabinet de conseil · Sénégal · Afrique de l&apos;Ouest
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-16 items-end">
          {/* Colonne gauche */}
          <div>
            <h1 className="font-display font-semibold text-[clamp(38px,5vw,66px)] leading-[1.06] max-w-[680px] mb-6">
              Le premier cabinet africain de conseil en{" "}
              <em className="not-italic text-[#D4AF5A]">transformation digitale</em>{" "}
              et IA pour les entreprises d&apos;Afrique de l&apos;Ouest.
            </h1>

            <p className="text-white/60 text-[17px] leading-relaxed max-w-[520px] mb-3">
              Nous accompagnons les dirigeants qui veulent transformer leur organisation — avec la rigueur
              d&apos;un cabinet international et l&apos;ancrage d&apos;un partenaire local.
            </p>

            {/* Proof points */}
            <div className="flex flex-col gap-2 mb-10">
              {PROOF_POINTS.map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-[13.5px] text-white/50">
                  <CheckCircle2 size={14} className="text-[#D4AF5A]/70 shrink-0" />
                  {p}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openModal("audit")}
                className="flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-8 py-4 transition-colors"
              >
                Demander un audit gratuit
                <ArrowRight size={16} />
              </button>
              <a
                href="/notre-approche"
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] rounded-full px-8 py-4 transition-colors"
              >
                Notre approche
              </a>
            </div>
          </div>

          {/* Colonne droite — expertises pills + metrics */}
          <div className="flex flex-col gap-6">
            {/* Pills expertises */}
            <div>
              <p className="font-mono text-[10px] tracking-[2px] uppercase text-white/30 mb-3">Nos 5 pôles d&apos;expertise</p>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_PILLS.map((e, i) => (
                  <a
                    key={e}
                    href={`/expertises/${["strategie-digitale-transformation","ia-automatisation","marketing-croissance-digitale","data-crm-experience-client","conseil-business-technologie"][i]}`}
                    className="text-[12.5px] text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/20 rounded-full px-3.5 py-1.5 transition-all duration-200"
                  >
                    {e}
                  </a>
                ))}
              </div>
            </div>

            {/* Séparateur */}
            <div className="h-px bg-white/[0.07]" />

            {/* Métriques honnêtes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
                <div className="font-display text-[30px] font-semibold text-[#D4AF5A]">12</div>
                <div className="text-[12px] text-white/45 mt-1 leading-tight">Secteurs d&apos;activité couverts</div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
                <div className="font-display text-[30px] font-semibold text-[#D4AF5A]">5</div>
                <div className="text-[12px] text-white/45 mt-1 leading-tight">Pôles d&apos;expertise stratégique</div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
                <div className="font-display text-[30px] font-semibold text-[#D4AF5A]">48h</div>
                <div className="text-[12px] text-white/45 mt-1 leading-tight">Délai de première réponse</div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
                <div className="font-display text-[30px] font-semibold text-[#D4AF5A]">100%</div>
                <div className="text-[12px] text-white/45 mt-1 leading-tight">Missions sur-mesure</div>
              </div>
            </div>

            {/* Micro CTA devis */}
            <button
              onClick={() => openModal("devis")}
              className="w-full text-center text-[13px] text-white/40 hover:text-white/70 transition-colors border border-white/[0.07] rounded-xl py-3"
            >
              Obtenir une estimation de prix →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
