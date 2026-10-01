"use client";

import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { AlertCircle, ArrowRight } from "lucide-react";

const PROBLEMS = [
  {
    pain: "Vos processus sont encore manuels et ralentissent votre croissance.",
    solution: "Nous les cartographions, les digitalisons et les automatisons.",
  },
  {
    pain: "Vous investissez en marketing digital mais les résultats ne suivent pas.",
    solution: "Nous auditons votre stratégie et réorientons les dépenses vers ce qui convertit.",
  },
  {
    pain: "Vous avez entendu parler de l'IA mais vous ne savez pas par où commencer.",
    solution: "Nous évaluons votre maturité IA et construisons une feuille de route réaliste.",
  },
  {
    pain: "Votre organisation croît mais votre structure ne suit plus.",
    solution: "Nous redesignons votre organisation pour qu'elle supporte votre ambition.",
  },
  {
    pain: "Vous avez des données mais vous ne savez pas comment les exploiter.",
    solution: "Nous construisons les tableaux de bord et les processus qui transforment vos données en décisions.",
  },
  {
    pain: "Vous voulez vous digitaliser mais vous ne savez pas par où commencer.",
    solution: "Nous faisons le diagnostic, définissons les priorités et vous accompagnons pas à pas.",
  },
];

export default function ProblemsSection() {
  const { openModal } = useModal();
  const ref = useReveal();

  return (
    <section className="bg-[#F8F9FB] py-[100px] border-y border-navy/[0.06]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 items-start">
          {/* Colonne gauche — titre */}
          <div className="md:sticky md:top-32">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
              <span className="w-6 h-px bg-gold" /> Ce que vous vivez
            </div>
            <h2 className="font-display text-[clamp(28px,3.4vw,42px)] text-navy leading-tight mb-6">
              Ces défis vous parlent ?<br />
              <span className="text-gold">Nous avons les réponses.</span>
            </h2>
            <p className="text-grey text-[16px] leading-relaxed mb-8 max-w-[420px]">
              Chaque organisation que nous accompagnons arrive avec des défis spécifiques.
              Voici les plus fréquents — et comment nous les résolvons.
            </p>
            <button
              onClick={() => openModal("audit")}
              className="flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold text-[14.5px] rounded-full px-7 py-3.5 transition-colors"
            >
              Parlez-nous de votre défi
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Colonne droite — liste */}
          <div ref={ref} className="reveal flex flex-col gap-4">
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="group bg-white border border-navy/[0.06] hover:border-gold/40 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(11,31,51,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <AlertCircle size={18} className="text-gold/60 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-navy font-medium text-[14.5px] leading-snug mb-2">{p.pain}</p>
                    <p className="text-grey text-[13.5px] leading-relaxed border-l-2 border-gold/30 pl-3">
                      → {p.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
