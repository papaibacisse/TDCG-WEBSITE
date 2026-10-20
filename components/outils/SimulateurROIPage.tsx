"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useModal } from "@/lib/ModalContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type ScenarioId = "automatisation" | "crm" | "acquisition" | "conversion";

interface InputField {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  hint: string;
}

interface Scenario {
  id: ScenarioId;
  num: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  inputs: InputField[];
  compute: (vals: Record<string, number>) => ROIResult;
}

interface ROIResult {
  gainBrut: number;       // FCFA — revenu ou économie additionnelle annuelle
  coutAnnuel: number;     // FCFA — coût total annualité
  gainNet: number;        // FCFA — gainBrut - coutAnnuel
  roi: number;            // % — (gainNet / coutAnnuel) * 100
  payback: number;        // mois — délai de retour
  margeAdditionnelle: number; // FCFA — marge nette additionnelle
  details: { label: string; value: string; isHighlight?: boolean }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number): string => {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} Mds`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)} k`;
  return `${Math.round(n)}`;
};

const fmtFCFA = (n: number) => `${fmt(n)} FCFA`;

// ─── Scenarios ────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: "automatisation",
    num: "01",
    title: "Automatisation de tâches",
    color: "#D4AF5A",
    description:
      "Calculez le gain réel issu de l'automatisation de processus répétitifs : traitement de données, reporting, saisie, facturation, validation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
      </svg>
    ),
    inputs: [
      { id: "nbEmployes", label: "Employés concernés par les tâches répétitives", unit: "personnes", min: 1, max: 200, step: 1, default: 5, hint: "Nombre d'employés passant du temps sur des tâches automatisables" },
      { id: "hParSemaine", label: "Heures/semaine consacrées aux tâches répétitives (par employé)", unit: "h/semaine", min: 1, max: 40, step: 1, default: 10, hint: "Estimation du temps hebdomadaire sur des tâches automatisables" },
      { id: "coutHoraire", label: "Coût horaire moyen d'un employé (charges incluses)", unit: "FCFA/h", min: 2000, max: 50000, step: 500, default: 6000, hint: "Salaire brut + charges / (52 semaines × heures hebdo)" },
      { id: "tauxAutomatisation", label: "Taux d'automatisation estimé", unit: "%", min: 20, max: 95, step: 5, default: 60, hint: "Part des tâches réellement automatisables (60–80% est réaliste)" },
      { id: "coutProjet", label: "Investissement du projet d'automatisation", unit: "FCFA", min: 500000, max: 50000000, step: 500000, default: 5000000, hint: "Coût total : développement + intégration + formation" },
      { id: "margeOperationnelle", label: "Marge opérationnelle actuelle de l'entreprise", unit: "%", min: 5, max: 60, step: 1, default: 20, hint: "Permet de calculer l'impact sur la marge nette" },
    ],
    compute: (v) => {
      const hAnnuelles = v.nbEmployes * v.hParSemaine * 52;
      const economieHeures = hAnnuelles * (v.tauxAutomatisation / 100);
      const gainBrut = economieHeures * v.coutHoraire;
      const coutAnnuel = v.coutProjet / 3; // amortissement 3 ans
      const gainNet = gainBrut - coutAnnuel;
      const roi = coutAnnuel > 0 ? (gainNet / coutAnnuel) * 100 : 0;
      const payback = gainBrut > 0 ? (v.coutProjet / gainBrut) * 12 : 99;
      const margeAdditionnelle = gainNet * (v.margeOperationnelle / 100);
      return {
        gainBrut, coutAnnuel, gainNet, roi, payback, margeAdditionnelle,
        details: [
          { label: "Heures économisées / an", value: `${Math.round(economieHeures).toLocaleString("fr-FR")} h` },
          { label: "Économie brute annuelle", value: fmtFCFA(gainBrut), isHighlight: true },
          { label: "Coût annualisé (amortissement 3 ans)", value: fmtFCFA(coutAnnuel) },
          { label: "Gain net annuel", value: fmtFCFA(gainNet), isHighlight: true },
          { label: "Marge additionnelle", value: fmtFCFA(margeAdditionnelle) },
        ],
      };
    },
  },
  {
    id: "crm",
    num: "02",
    title: "Investissement CRM",
    color: "#B8975A",
    description:
      "Mesurez l'impact d'un CRM bien déployé sur la rétention client, la valeur vie client et la productivité commerciale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    inputs: [
      { id: "nbClients", label: "Nombre de clients actifs", unit: "clients", min: 10, max: 100000, step: 10, default: 500, hint: "Base client actuelle" },
      { id: "caAnnuel", label: "Chiffre d'affaires annuel actuel", unit: "FCFA", min: 10000000, max: 10000000000, step: 10000000, default: 200000000, hint: "CA total de l'entreprise" },
      { id: "tauxChurn", label: "Taux de perte client actuel (annuel)", unit: "%", min: 5, max: 50, step: 1, default: 20, hint: "% de clients perdus chaque année" },
      { id: "reductionChurn", label: "Réduction du churn attendue avec le CRM", unit: "%", min: 10, max: 50, step: 5, default: 25, hint: "Impact typique d'un CRM : 15 à 40% de réduction du churn" },
      { id: "augUpsell", label: "Hausse des ventes additionnelles / upsell", unit: "%", min: 0, max: 30, step: 1, default: 10, hint: "Un CRM bien utilisé augmente de 10 à 20% les ventes additionnelles" },
      { id: "coutCRM", label: "Coût annuel du CRM (licences + intégration)", unit: "FCFA", min: 500000, max: 20000000, step: 250000, default: 3000000, hint: "Licences + personnalisation + formation + support" },
      { id: "margeBrute", label: "Marge brute moyenne", unit: "%", min: 10, max: 80, step: 1, default: 40, hint: "Marge brute sur les ventes (hors coûts variables)" },
    ],
    compute: (v) => {
      const caParClient = v.caAnnuel / v.nbClients;
      const clientsRetenus = v.nbClients * (v.tauxChurn / 100) * (v.reductionChurn / 100);
      const gainRetention = clientsRetenus * caParClient;
      const gainUpsell = v.caAnnuel * (v.augUpsell / 100);
      const gainBrut = (gainRetention + gainUpsell) * (v.margeBrute / 100);
      const coutAnnuel = v.coutCRM;
      const gainNet = gainBrut - coutAnnuel;
      const roi = coutAnnuel > 0 ? (gainNet / coutAnnuel) * 100 : 0;
      const payback = gainBrut > 0 ? (coutAnnuel / (gainBrut / 12)) : 99;
      const margeAdditionnelle = gainNet;
      return {
        gainBrut, coutAnnuel, gainNet, roi, payback, margeAdditionnelle,
        details: [
          { label: "Clients retenus supplémentaires", value: `${Math.round(clientsRetenus)} clients` },
          { label: "Gain rétention (marge)", value: fmtFCFA(gainRetention * (v.margeBrute / 100)), isHighlight: true },
          { label: "Gain upsell / cross-sell (marge)", value: fmtFCFA(gainUpsell * (v.margeBrute / 100)) },
          { label: "Coût CRM annuel", value: fmtFCFA(coutAnnuel) },
          { label: "Marge additionnelle nette", value: fmtFCFA(margeAdditionnelle), isHighlight: true },
        ],
      };
    },
  },
  {
    id: "acquisition",
    num: "03",
    title: "Campagne d'acquisition digitale",
    color: "#9A8050",
    description:
      "Estimez le ROI d'une campagne d'acquisition digitale (SEO, SEA, Social Ads) en distinguant revenus additionnels et marge réelle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    inputs: [
      { id: "budgetCampagne", label: "Budget total de la campagne", unit: "FCFA", min: 500000, max: 100000000, step: 500000, default: 5000000, hint: "Budget ads + création de contenu + gestion" },
      { id: "visiteursMois", label: "Visiteurs web actuels par mois", unit: "visiteurs", min: 100, max: 1000000, step: 100, default: 2000, hint: "Trafic mensuel actuel (toutes sources)" },
      { id: "augTraific", label: "Augmentation du trafic attendue", unit: "%", min: 10, max: 500, step: 10, default: 80, hint: "Objectif de croissance du trafic sur 12 mois" },
      { id: "tauxConversion", label: "Taux de conversion visiteur → client", unit: "%", min: 0.1, max: 10, step: 0.1, default: 1.5, hint: "% de visiteurs qui deviennent clients (B2B : 1-3%, B2C : 1-5%)" },
      { id: "panierMoyen", label: "Valeur moyenne d'une commande / contrat", unit: "FCFA", min: 10000, max: 50000000, step: 10000, default: 500000, hint: "Montant moyen par transaction" },
      { id: "margeNette", label: "Marge nette sur ventes", unit: "%", min: 5, max: 70, step: 1, default: 30, hint: "Marge après tous les coûts (production, livraison, SAV)" },
      { id: "dureeCampagne", label: "Durée de la campagne", unit: "mois", min: 1, max: 24, step: 1, default: 12, hint: "Durée totale sur laquelle l'investissement est étalé" },
    ],
    compute: (v) => {
      const visiteursSup = v.visiteursMois * (v.augTraific / 100) * v.dureeCampagne;
      const nouveauxClients = visiteursSup * (v.tauxConversion / 100);
      const caAdditionnel = nouveauxClients * v.panierMoyen;
      const gainBrut = caAdditionnel * (v.margeNette / 100);
      const coutAnnuel = v.budgetCampagne;
      const gainNet = gainBrut - coutAnnuel;
      const roi = coutAnnuel > 0 ? (gainNet / coutAnnuel) * 100 : 0;
      const payback = gainBrut > 0 ? (coutAnnuel / (gainBrut / v.dureeCampagne)) : 99;
      const margeAdditionnelle = gainNet;
      return {
        gainBrut, coutAnnuel, gainNet, roi, payback, margeAdditionnelle,
        details: [
          { label: "Visiteurs additionnels générés", value: `${Math.round(visiteursSup).toLocaleString("fr-FR")}` },
          { label: "Nouveaux clients estimés", value: `${Math.round(nouveauxClients)} clients` },
          { label: "CA additionnel généré", value: fmtFCFA(caAdditionnel), isHighlight: true },
          { label: "Marge additionnelle brute", value: fmtFCFA(gainBrut) },
          { label: "ROI net (après budget campagne)", value: fmtFCFA(gainNet), isHighlight: true },
        ],
      };
    },
  },
  {
    id: "conversion",
    num: "04",
    title: "Optimisation de la conversion commerciale",
    color: "#7A6840",
    description:
      "Quantifiez l'impact d'une amélioration du taux de transformation commercial sur votre pipeline B2B.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    inputs: [
      { id: "nbOpportunites", label: "Opportunités commerciales / mois", unit: "leads", min: 1, max: 10000, step: 1, default: 50, hint: "Nombre de prospects qualifiés entrant dans votre pipeline" },
      { id: "tauxActuel", label: "Taux de conversion actuel (lead → client)", unit: "%", min: 1, max: 50, step: 1, default: 15, hint: "% de vos leads qualifiés qui signent" },
      { id: "ameliorationTaux", label: "Amélioration du taux de conversion visée", unit: "pts", min: 2, max: 30, step: 1, default: 8, hint: "Gain en points avec CRM, formation et processus optimisés" },
      { id: "valeurContrat", label: "Valeur moyenne d'un contrat signé", unit: "FCFA", min: 100000, max: 500000000, step: 100000, default: 3000000, hint: "Montant moyen d'un contrat ou d'une vente signée" },
      { id: "margeBrute", label: "Marge brute sur contrats", unit: "%", min: 10, max: 80, step: 1, default: 45, hint: "Marge brute après coûts de production / livraison" },
      { id: "investFormation", label: "Investissement en formation et outils commerciaux", unit: "FCFA", min: 500000, max: 30000000, step: 250000, default: 2000000, hint: "Formation équipe, outils CRM, scripts, coaching, etc." },
    ],
    compute: (v) => {
      const nouveauxClientsActuels = v.nbOpportunites * (v.tauxActuel / 100) * 12;
      const nouveauxClientsOpti = v.nbOpportunites * ((v.tauxActuel + v.ameliorationTaux) / 100) * 12;
      const clientsSup = nouveauxClientsOpti - nouveauxClientsActuels;
      const caAdditionnel = clientsSup * v.valeurContrat;
      const gainBrut = caAdditionnel * (v.margeBrute / 100);
      const coutAnnuel = v.investFormation;
      const gainNet = gainBrut - coutAnnuel;
      const roi = coutAnnuel > 0 ? (gainNet / coutAnnuel) * 100 : 0;
      const payback = gainBrut > 0 ? (coutAnnuel / (gainBrut / 12)) : 99;
      const margeAdditionnelle = gainNet;
      return {
        gainBrut, coutAnnuel, gainNet, roi, payback, margeAdditionnelle,
        details: [
          { label: "Nouveaux clients supplémentaires / an", value: `${Math.round(clientsSup)} clients` },
          { label: "CA additionnel annuel", value: fmtFCFA(caAdditionnel), isHighlight: true },
          { label: "Marge additionnelle brute", value: fmtFCFA(gainBrut) },
          { label: "Investissement annuel", value: fmtFCFA(coutAnnuel) },
          { label: "Gain net annuel", value: fmtFCFA(gainNet), isHighlight: true },
        ],
      };
    },
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SliderInput({
  field,
  value,
  onChange,
}: {
  field: InputField;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100;

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  const displayVal =
    field.unit === "FCFA"
      ? fmtFCFA(value)
      : `${value.toLocaleString("fr-FR")} ${field.unit}`;

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <label className="text-sm text-gray-300 leading-snug flex-1">{field.label}</label>
        <span
          className="text-sm font-semibold shrink-0 tabular-nums"
          style={{ color: "#D4AF5A" }}
        >
          {displayVal}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1 rounded-full bg-white/10" />
        <div
          className="absolute left-0 h-1 rounded-full transition-all duration-100"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #D4AF5A80, #D4AF5A)" }}
        />
        <input
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={value}
          onChange={handleInput}
          className="relative w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
          style={
            {
              "--thumb-border-color": "#D4AF5A",
              ["WebkitTextFillColor" as string]: "transparent",
            } as React.CSSProperties
          }
        />
      </div>
      <p className="text-xs text-gray-500">{field.hint}</p>
    </div>
  );
}

function ROIGauge({ roi }: { roi: number }) {
  const clamped = Math.max(-100, Math.min(500, roi));
  const normalized = (clamped + 100) / 600; // -100→0%, 500→100%
  const angle = normalized * 180 - 90; // -90° to +90°

  const color = roi < 0 ? "#ef4444" : roi < 50 ? "#f59e0b" : roi < 150 ? "#D4AF5A" : "#22c55e";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 70" className="w-48">
        {/* Background arc */}
        <path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <path
          d="M10,60 A50,50 0 0,1 110,60"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="157"
          strokeDashoffset={`${157 * (1 - normalized)}`}
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
        />
        {/* Needle */}
        <g transform={`rotate(${angle}, 60, 60)`} style={{ transition: "transform 0.6s ease" }}>
          <line x1="60" y1="60" x2="60" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4" fill={color} />
        </g>
        {/* Labels */}
        <text x="8" y="72" fontSize="7" fill="#6b7280">-100%</text>
        <text x="93" y="72" fontSize="7" fill="#6b7280">+500%</text>
      </svg>
      <div className="text-center mt-1">
        <span className="text-3xl font-bold tabular-nums" style={{ color }}>
          {roi >= 0 ? "+" : ""}{Math.round(roi)}%
        </span>
        <p className="text-xs text-gray-400 mt-1">ROI estimé</p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SimulateurROIPage() {
  const { openModal } = useModal();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("automatisation");
  const [values, setValues] = useState<Record<ScenarioId, Record<string, number>>>(() => {
    const init: Partial<Record<ScenarioId, Record<string, number>>> = {};
    for (const s of SCENARIOS) {
      init[s.id] = Object.fromEntries(s.inputs.map((f) => [f.id, f.default]));
    }
    return init as Record<ScenarioId, Record<string, number>>;
  });

  const scenario = SCENARIOS.find((s) => s.id === activeScenario)!;
  const result = scenario.compute(values[activeScenario]);

  const setField = useCallback(
    (id: string, val: number) => {
      setValues((prev) => ({
        ...prev,
        [activeScenario]: { ...prev[activeScenario], [id]: val },
      }));
    },
    [activeScenario]
  );

  const roiLabel =
    result.roi >= 200 ? "Excellent" :
    result.roi >= 100 ? "Très bon" :
    result.roi >= 50  ? "Bon" :
    result.roi >= 0   ? "Acceptable" :
    "Négatif — à revoir";

  const roiColor =
    result.roi >= 100 ? "#22c55e" :
    result.roi >= 50  ? "#D4AF5A" :
    result.roi >= 0   ? "#f59e0b" :
    "#ef4444";

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #07090F 0%, #0B1F33 50%, #07090F 100%)" }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, #D4AF5A22 0%, transparent 50%), radial-gradient(circle at 70% 80%, #0B1F3344 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 border"
            style={{ borderColor: "#D4AF5A40", background: "#D4AF5A10", color: "#D4AF5A" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
            Simulateur ROI — Formules documentées
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Mesurez le retour sur investissement{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #D4AF5A, #f0d080)" }}
            >
              de votre transformation digitale
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sélectionnez un scénario, ajustez vos paramètres et obtenez une estimation réaliste en FCFA.
            Simulation indicative basée sur des formules de gestion standard.
          </p>
        </div>
      </section>

      {/* Scenario tabs */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(s.id)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium border transition-all duration-200"
                style={
                  activeScenario === s.id
                    ? { background: "#D4AF5A15", borderColor: "#D4AF5A60", color: "#D4AF5A" }
                    : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "#9ca3af" }
                }
              >
                <span style={{ color: activeScenario === s.id ? "#D4AF5A" : "#6b7280" }}>{s.icon}</span>
                <span>{s.num} — {s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main simulator */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Inputs */}
            <div
              className="rounded-2xl p-8 border"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-start gap-4 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#D4AF5A15", color: "#D4AF5A" }}
                >
                  {scenario.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium" style={{ color: "#D4AF5A" }}>
                      Scénario {scenario.num}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{scenario.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{scenario.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                {scenario.inputs.map((field) => (
                  <SliderInput
                    key={field.id}
                    field={field}
                    value={values[activeScenario][field.id]}
                    onChange={(v) => setField(field.id, v)}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-600 mt-8 italic">
                * Simulation indicative basée sur des hypothèses moyennes de marché. Les résultats réels dépendent de votre contexte. Une mission de cadrage TDCG affine ces estimations.
              </p>
            </div>

            {/* Results panel */}
            <div className="space-y-4">
              {/* ROI gauge */}
              <div
                className="rounded-2xl p-6 border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <ROIGauge roi={result.roi} />
                <div
                  className="mt-4 text-center px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: `${roiColor}18`, color: roiColor }}
                >
                  {roiLabel}
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs text-gray-500 mb-1">Gain net annuel</p>
                  <p
                    className="text-lg font-bold leading-tight tabular-nums"
                    style={{ color: result.gainNet >= 0 ? "#D4AF5A" : "#ef4444" }}
                  >
                    {result.gainNet >= 0 ? "+" : ""}{fmtFCFA(result.gainNet)}
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs text-gray-500 mb-1">Délai de retour</p>
                  <p className="text-lg font-bold text-white leading-tight tabular-nums">
                    {result.payback > 36 ? "> 36 mois" : `${Math.round(result.payback)} mois`}
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs text-gray-500 mb-1">Gain brut annuel</p>
                  <p className="text-lg font-bold text-white leading-tight tabular-nums">
                    {fmtFCFA(result.gainBrut)}
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <p className="text-xs text-gray-500 mb-1">Coût annualisé</p>
                  <p className="text-lg font-bold text-white leading-tight tabular-nums">
                    {fmtFCFA(result.coutAnnuel)}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div
                className="rounded-2xl p-5 border space-y-3"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <h3 className="text-sm font-semibold text-white mb-4">Détail du calcul</h3>
                {result.details.map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">{d.label}</span>
                    <span
                      className={`text-xs font-semibold tabular-nums ${d.isHighlight ? "" : "text-gray-300"}`}
                      style={d.isHighlight ? { color: "#D4AF5A" } : {}}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="rounded-2xl p-5 border"
                style={{ background: "linear-gradient(135deg, #D4AF5A08, #0B1F3320)", borderColor: "#D4AF5A30" }}
              >
                <h3 className="text-sm font-semibold text-white mb-2">
                  Affinez cette estimation avec nos experts
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Un diagnostic TDCG intègre vos données réelles, votre secteur et vos contraintes spécifiques.
                </p>
                <button
                  onClick={() => openModal("audit")}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }}
                >
                  Demander un diagnostic ROI gratuit
                </button>
                <button
                  onClick={() => openModal("contact")}
                  className="w-full mt-2 py-3 rounded-xl text-sm font-medium border transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
                >
                  Parler à un consultant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom disclaimer */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-6 border text-center"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs text-gray-500">
              <strong className="text-gray-400">Avertissement méthodologique :</strong> Ces simulations sont basées sur des formules de gestion standard et des ratios observés en Afrique de l'Ouest. Elles constituent une aide à la décision, non une garantie de résultats. Les variables réelles (maturité digitale, qualité des données, capacité d'exécution) influencent significativement les résultats. TDCG recommande un audit préalable pour affiner les hypothèses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
