"use client";

import { useState } from "react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { SECTORS, ROI_SECTOR_BASELINE } from "@/lib/constants";

export default function ROISimulator() {
  const { openModal } = useModal();
  const headRef = useReveal();
  const gridRef = useReveal();

  const [budget, setBudget] = useState("");
  const [secteur, setSecteur] = useState<string>(SECTORS[0].name);
  const [secteurAutre, setSecteurAutre] = useState("");
  const [clients, setClients] = useState("");
  const [revenue, setRevenue] = useState("");
  const [percent, setPercent] = useState<number | null>(null);

  function calculate() {
    const budgetNum = Number(budget) || 0;
    const revenueNum = Number(revenue) || 0;
    const baseline = ROI_SECTOR_BASELINE[secteur] ?? 22;
    const annualBudget = budgetNum * 12;
    const ratio = revenueNum > 0 ? annualBudget / revenueNum : 0;
    const budgetBonus = Math.min(15, ratio * 300);
    const raw = Math.round(baseline + budgetBonus);
    setPercent(Math.max(15, Math.min(45, raw)));
  }

  return (
    <section id="roi-simulateur" className="bg-navy py-[120px] relative overflow-hidden">
      <svg className="absolute inset-0 opacity-25 pointer-events-none" viewBox="0 0 1240 700" preserveAspectRatio="xMidYMid slice">
        <g stroke="#C9A227" strokeWidth={1} fill="none" opacity={0.6}>
          <path d="M900 700 C 880 560, 950 480, 920 380 C 900 320, 960 260, 940 180" />
          <path d="M900 700 C 860 600, 800 540, 820 440 C 830 380, 780 320, 800 240" />
          <path d="M900 700 C 940 580, 1000 520, 980 420 C 970 360, 1030 300, 1010 220" />
        </g>
      </svg>

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Simulateur
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-white leading-tight">
            Simulateur de ROI marketing
          </h2>
          <p className="mt-4 text-white/60 text-[16.5px]">
            Estimez en quelques secondes le potentiel de croissance de votre stratégie digitale.
          </p>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
              Quel est votre budget marketing mensuel (FCFA) ?
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex : 2 000 000"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
              Quel est votre secteur ?
              <select value={secteur} onChange={(e) => setSecteur(e.target.value)} className={inputClass + " dark-select"}>
                {SECTORS.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
                <option value="Autre">Autre</option>
              </select>
            </label>

            {secteur === "Autre" && (
              <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
                Précisez votre secteur
                <input
                  type="text"
                  value={secteurAutre}
                  onChange={(e) => setSecteurAutre(e.target.value)}
                  placeholder="Ex. : Immobilier"
                  className={inputClass}
                />
              </label>
            )}

            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
              Combien de clients avez-vous actuellement ?
              <input
                type="number"
                value={clients}
                onChange={(e) => setClients(e.target.value)}
                placeholder="Ex : 150"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
              Quel est votre chiffre d&apos;affaires annuel (FCFA) ?
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Ex : 50 000 000"
                className={inputClass}
              />
            </label>

            <button
              type="button"
              onClick={calculate}
              className="bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors mt-1"
            >
              Calculer mon potentiel
            </button>
          </div>

          <div className="flex flex-col border-l border-white/15 pl-10 h-full justify-center">
            <div className="py-6">
              <p className="text-white/70 text-[15.5px] leading-relaxed">
                En optimisant votre stratégie digitale, votre entreprise pourrait générer jusqu&apos;à{" "}
                <span className="font-display text-gold font-semibold text-[28px] align-middle">
                  {percent !== null ? `${percent} %` : "— %"}
                </span>{" "}
                de prospects supplémentaires.
              </p>
              <p className="text-[12.5px] text-white/40 mt-4">
                Estimation indicative basée sur votre secteur et l&apos;intensité de votre budget marketing par
                rapport à votre chiffre d&apos;affaires. À affiner avec un consultant.
              </p>
              <button
                onClick={() => openModal("contact")}
                className="mt-6 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-semibold text-[13.5px] rounded-full px-6 py-3.5 transition-colors"
              >
                Échanger avec un consultant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-[14.5px] placeholder:text-white/35 focus:outline-none focus:border-gold focus:bg-white/[0.08]";
