"use client";

import { useState } from "react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { SECTORS, ROI_SECTOR_BASELINE } from "@/lib/constants";

// ─── Taux d'économies opérationnelles par secteur (% des charges annuelles) ───
// Source : benchmarks transformation digitale Afrique subsaharienne + études McKinsey Africa
const SECTOR_OPEX_SAVINGS: Record<string, number> = {
  "Administration publique": 0.08,
  Finance: 0.14,
  Éducation: 0.10,
  Santé: 0.12,
  Agriculture: 0.09,
  Commerce: 0.13,
  Industrie: 0.11,
  ONG: 0.08,
  Télécommunications: 0.15,
  Distribution: 0.12,
  Énergie: 0.10,
  Startups: 0.10,
};

// ─── Multiplicateur taille entreprise (impact sur l'économie opérationnelle) ──
const SIZE_OPEX_MULTIPLIER: Record<string, number> = {
  "1-9":    0.60,  // TPE : processus peu formalisés, gains modérés
  "10-49":  0.85,  // PME : bon potentiel de formalisation
  "50-199": 1.15,  // ETI : processus lourds, fort potentiel d'automatisation
  "200+":   1.40,  // Grande entreprise : ROI opérationnel maximal
};

// ─── Charges annuelles estimées par taille (proxy si non renseignées) ─────────
// En % du CA : rapport habituel pour les entreprises africaines formelles
const SIZE_CHARGES_RATIO: Record<string, number> = {
  "1-9":    0.60,
  "10-49":  0.65,
  "50-199": 0.70,
  "200+":   0.72,
};

type Size = "1-9" | "10-49" | "50-199" | "200+";

const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: "1-9",    label: "TPE — 1 à 9 employés" },
  { value: "10-49",  label: "PME — 10 à 49 employés" },
  { value: "50-199", label: "ETI — 50 à 199 employés" },
  { value: "200+",   label: "Grande entreprise — 200+ employés" },
];

export default function ROISimulator() {
  const { openModal } = useModal();
  const headRef = useReveal();
  const gridRef = useReveal();

  const [budget, setBudget]   = useState("");
  const [secteur, setSecteur] = useState<string>(SECTORS[0]?.name ?? "Commerce");
  const [size, setSize]       = useState<Size>("10-49");
  const [revenue, setRevenue] = useState("");
  const [hasError, setHasError] = useState(false);

  const [result, setResult] = useState<{
    croissancePct: number;     // % de croissance CA attendue
    gainRevenuFcfa: number;    // Revenus supplémentaires (FCFA)
    economieFcfa: number;      // Économies opérationnelles (FCFA)
    investissementFcfa: number;// Budget marketing annuel (FCFA)
    roiNet: number;            // ROI net = gains + éco - investissement
    roiRatio: number;          // ROI ratio = (gains + éco) / investissement
    paybackMois: number;       // Retour sur investissement en mois
  } | null>(null);

  // ─── Formatage ────────────────────────────────────────────────────────────
  function fmt(n: number): string {
    const abs  = Math.abs(n);
    const sign = n < 0 ? "−" : "+";
    if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1).replace(/\.0$/, "")} Mrd FCFA`;
    if (abs >= 1_000_000)     return `${sign}${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")} M FCFA`;
    if (abs >= 1_000)         return `${sign}${Math.round(abs / 1_000)} k FCFA`;
    return `${sign}${Math.round(abs)} FCFA`;
  }

  // ─── Calcul ───────────────────────────────────────────────────────────────
  function calculate() {
    const budgetMensuel = Number(budget)  || 0;
    const caAnnuel      = Number(revenue) || 0;

    if (budgetMensuel <= 0 || caAnnuel <= 0) {
      setHasError(true);
      return;
    }
    setHasError(false);

    const budgetAnnuel   = budgetMensuel * 12;
    const baselineGrowth = ROI_SECTOR_BASELINE[secteur] ?? 22; // % baseline secteur

    // ── 1. Intensité marketing (budget / CA) ────────────────────────────────
    // Ratio sain : 2–8% du CA. En dessous → sous-investi. Au-dessus → sur-investi.
    const intensite = (budgetAnnuel / caAnnuel) * 100; // en %

    // Bonus : si intensité entre 3% et 12%, on est dans la zone optimale
    // Au-delà de 15%, rendements décroissants
    let intensiteBonus: number;
    if (intensite < 1)       intensiteBonus = -5;
    else if (intensite < 3)  intensiteBonus = 0;
    else if (intensite <= 8) intensiteBonus = Math.round(intensite * 1.2); // +3.6 à +9.6
    else if (intensite <= 15) intensiteBonus = Math.round(9.6 - (intensite - 8) * 0.5);
    else                     intensiteBonus = 6; // plateau au-delà

    // ── 2. Bonus taille (les grandes entreprises ont plus à gagner en %) ─────
    const tailleBonus: Record<Size, number> = {
      "1-9":    -3,
      "10-49":   0,
      "50-199":  3,
      "200+":    6,
    };

    // ── 3. Croissance CA projetée ────────────────────────────────────────────
    const croissancePct = Math.max(8, Math.min(65,
      Math.round(baselineGrowth + intensiteBonus + tailleBonus[size])
    ));

    // ── 4. Gain de revenus = % de croissance × CA actuel ────────────────────
    const gainRevenuFcfa = Math.round(caAnnuel * (croissancePct / 100));

    // ── 5. Économies opérationnelles ─────────────────────────────────────────
    // = Taux d'économie secteur × Charges estimées × Multiplicateur taille
    const tauxEpargne  = SECTOR_OPEX_SAVINGS[secteur] ?? 0.10;
    const ratioCharges = SIZE_CHARGES_RATIO[size] ?? 0.65;
    const chargesEst   = caAnnuel * ratioCharges;
    const sizeMulti    = SIZE_OPEX_MULTIPLIER[size] ?? 1.0;
    const economieFcfa = Math.round(chargesEst * tauxEpargne * sizeMulti);

    // ── 6. ROI net et ratio ───────────────────────────────────────────────────
    const totalBenefices = gainRevenuFcfa + economieFcfa;
    const roiNet         = totalBenefices - budgetAnnuel;
    const roiRatio       = budgetAnnuel > 0 ? totalBenefices / budgetAnnuel : 0;

    // ── 7. Délai de retour (payback) en mois ─────────────────────────────────
    const beneficeMensuel = totalBenefices / 12;
    const paybackMois     = beneficeMensuel > 0
      ? Math.ceil(budgetAnnuel / beneficeMensuel)
      : 999;

    setResult({
      croissancePct,
      gainRevenuFcfa,
      economieFcfa,
      investissementFcfa: budgetAnnuel,
      roiNet,
      roiRatio,
      paybackMois,
    });
  }

  // ─── Barre de progression ─────────────────────────────────────────────────
  function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return (
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }

  return (
    <section id="roi-simulateur" className="bg-navy py-[120px] relative overflow-hidden scroll-mt-24">
      <svg className="absolute inset-0 opacity-25 pointer-events-none" viewBox="0 0 1240 700" preserveAspectRatio="xMidYMid slice">
        <g stroke="#C9A227" strokeWidth={1} fill="none" opacity={0.6}>
          <path d="M900 700 C 880 560, 950 480, 920 380 C 900 320, 960 260, 940 180" />
          <path d="M900 700 C 860 600, 800 540, 820 440 C 830 380, 780 320, 800 240" />
          <path d="M900 700 C 940 580, 1000 520, 980 420 C 970 360, 1030 300, 1010 220" />
        </g>
      </svg>

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
        {/* Header */}
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Simulateur
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-white leading-tight">
            Simulateur de ROI digital
          </h2>
          <p className="mt-4 text-white/60 text-[16.5px]">
            Estimez en 30 secondes le retour sur investissement de votre stratégie digitale — croissance CA, économies opérationnelles et délai de retour.
          </p>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-2 gap-12 items-start">
          {/* ── Formulaire ── */}
          <div className="flex flex-col gap-5">

            <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-white/85">
              Chiffre d&apos;affaires annuel (FCFA) *
              <input
                type="number"
                min="0"
                value={revenue}
                onChange={(e) => { setRevenue(e.target.value); setHasError(false); }}
                placeholder="Ex : 80 000 000"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-white/85">
              Budget marketing mensuel (FCFA) *
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => { setBudget(e.target.value); setHasError(false); }}
                placeholder="Ex : 2 500 000"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-white/85">
              Secteur d&apos;activité
              <select
                value={secteur}
                onChange={(e) => setSecteur(e.target.value)}
                className={inputClass + " dark-select"}
              >
                {SECTORS.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-[13.5px] font-semibold text-white/85">
              Taille de l&apos;entreprise
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as Size)}
                className={inputClass + " dark-select"}
              >
                {SIZE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>

            {hasError && (
              <p className="text-red-400 text-[13px] font-medium">
                Veuillez renseigner votre CA annuel et votre budget mensuel.
              </p>
            )}

            <button
              type="button"
              onClick={calculate}
              className="bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors mt-1"
            >
              Calculer mon potentiel
            </button>

            <p className="text-[11.5px] text-white/30 leading-relaxed">
              * Champs obligatoires. Estimation indicative basée sur les benchmarks sectoriels. À affiner avec un audit TDCG.
            </p>
          </div>

          {/* ── Résultats ── */}
          <div className="flex flex-col md:border-l md:border-white/15 md:pl-10 h-full justify-center">
            {result === null ? (
              <div className="py-6">
                <p className="text-white/35 text-[14.5px] leading-relaxed italic mb-8">
                  Renseignez vos données et cliquez sur « Calculer » pour obtenir votre estimation personnalisée.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Croissance CA projetée",
                    "Revenus supplémentaires estimés",
                    "Économies opérationnelles",
                    "ROI net annuel",
                    "Délai de retour sur investissement",
                  ].map((label) => (
                    <div key={label} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                      <span className="text-white/30 text-[13px]">{label}</span>
                      <span className="text-white/20 font-mono text-[13px]">—</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-4">
                {/* Headline */}
                <div className="mb-6 p-5 bg-gold/[0.07] border border-gold/20 rounded-xl">
                  <span className="text-white/50 text-[11px] uppercase tracking-[2px] font-semibold block mb-1">
                    Croissance CA projetée
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-gold font-semibold text-[52px] leading-none">
                      +{result.croissancePct}%
                    </span>
                    <span className="text-white/50 text-[14px]">sur 12 mois</span>
                  </div>
                  <ProgressBar value={result.croissancePct} max={65} color="bg-gold" />
                </div>

                {/* Métriques */}
                <div className="flex flex-col gap-2.5 mb-5">
                  {/* Revenus */}
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/55 text-[13px]">Revenus supplémentaires</span>
                      <span className="text-gold font-semibold font-mono text-[14px]">
                        {fmt(result.gainRevenuFcfa)}
                      </span>
                    </div>
                    <ProgressBar value={result.gainRevenuFcfa} max={result.gainRevenuFcfa + result.economieFcfa || 1} color="bg-gold/70" />
                  </div>

                  {/* Économies */}
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/55 text-[13px]">Économies opérationnelles</span>
                      <span className="text-[#6AFFB4] font-semibold font-mono text-[14px]">
                        {fmt(result.economieFcfa)}
                      </span>
                    </div>
                    <ProgressBar value={result.economieFcfa} max={result.gainRevenuFcfa + result.economieFcfa || 1} color="bg-[#6AFFB4]/70" />
                  </div>

                  {/* Investissement */}
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/55 text-[13px]">Investissement annuel</span>
                      <span className="text-white/50 font-semibold font-mono text-[14px]">
                        {fmt(-result.investissementFcfa).replace("−", "− ")}
                      </span>
                    </div>
                  </div>

                  {/* ROI net */}
                  <div className={`border rounded-lg px-4 py-3 ${
                    result.roiNet >= 0
                      ? "bg-[#6AFFB4]/[0.06] border-[#6AFFB4]/25"
                      : "bg-red-500/[0.05] border-red-500/20"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-[13px] font-semibold">ROI net annuel</span>
                      <span className={`font-semibold font-mono text-[15px] ${result.roiNet >= 0 ? "text-[#6AFFB4]" : "text-red-400"}`}>
                        {fmt(result.roiNet)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/35 text-[12px]">Ratio ROI</span>
                      <span className={`text-[12px] font-mono ${result.roiRatio >= 1 ? "text-[#6AFFB4]/80" : "text-red-400/70"}`}>
                        ×{result.roiRatio.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Payback */}
                  <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/55 text-[13px]">Délai de retour</span>
                      <span className="text-white/80 font-semibold font-mono text-[14px]">
                        {result.paybackMois <= 24
                          ? `${result.paybackMois} mois`
                          : "> 24 mois"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => openModal("audit")}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-black font-semibold text-[14px] rounded-full px-6 py-3.5 transition-colors"
                  >
                    Obtenir un audit personnalisé
                  </button>
                  <button
                    onClick={() => openModal("contact")}
                    className="w-full flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-white/25 text-[13px] rounded-full px-6 py-3 transition-colors"
                  >
                    Échanger avec un consultant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-[14.5px] placeholder:text-white/35 focus:outline-none focus:border-gold focus:bg-white/[0.08]";
