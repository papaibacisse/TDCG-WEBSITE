"use client";

import { useState, useCallback } from "react";
import { useModal } from "@/lib/ModalContext";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Question {
  id: string;
  text: string;
  options: { label: string; score: number }[];
}
interface Domain {
  id: string;
  num: string;
  label: string;
  questions: Question[];
  color: string;
}

/* ─── Données du questionnaire ───────────────────────────────────────────── */
const DOMAINS: Domain[] = [
  {
    id: "strategie",
    num: "01",
    label: "Stratégie & Transformation",
    color: "#D4AF5A",
    questions: [
      {
        id: "s1",
        text: "Votre entreprise dispose-t-elle d'une stratégie digitale formalisée ?",
        options: [
          { label: "Non, aucune stratégie définie", score: 0 },
          { label: "Des initiatives isolées sans cohérence", score: 1 },
          { label: "Une stratégie en cours de formalisation", score: 2 },
          { label: "Une stratégie claire avec un plan d'action", score: 3 },
        ],
      },
      {
        id: "s2",
        text: "Un responsable ou une équipe pilote-t-elle la transformation digitale ?",
        options: [
          { label: "Personne n'en est chargé", score: 0 },
          { label: "C'est géré ponctuellement par la direction", score: 1 },
          { label: "Un responsable partiel s'en occupe", score: 2 },
          { label: "Une équipe dédiée avec budget alloué", score: 3 },
        ],
      },
      {
        id: "s3",
        text: "Votre organisation mesure-t-elle ses progrès digitaux avec des indicateurs ?",
        options: [
          { label: "Non, pas d'indicateurs suivis", score: 0 },
          { label: "Quelques chiffres surveillés occasionnellement", score: 1 },
          { label: "Des KPI définis mais rarement exploités", score: 2 },
          { label: "Des tableaux de bord actualisés régulièrement", score: 3 },
        ],
      },
    ],
  },
  {
    id: "marketing",
    num: "02",
    label: "Marketing & Acquisition",
    color: "#B8975A",
    questions: [
      {
        id: "m1",
        text: "Comment attirez-vous de nouveaux clients aujourd'hui ?",
        options: [
          { label: "Principalement par le bouche-à-oreille", score: 0 },
          { label: "Site web basique sans acquisition active", score: 1 },
          { label: "Réseaux sociaux et actions ponctuelles", score: 2 },
          { label: "Stratégie multi-canal avec suivi des conversions", score: 3 },
        ],
      },
      {
        id: "m2",
        text: "Quel est le niveau de performance de votre site web ?",
        options: [
          { label: "Pas de site web ou site non mis à jour", score: 0 },
          { label: "Site informatif sans objectif de conversion", score: 1 },
          { label: "Site avec formulaires mais peu de trafic", score: 2 },
          { label: "Site optimisé avec analytics et A/B testing", score: 3 },
        ],
      },
      {
        id: "m3",
        text: "Mesurez-vous le coût d'acquisition d'un nouveau client ?",
        options: [
          { label: "Non, jamais calculé", score: 0 },
          { label: "Approximativement, sans outil dédié", score: 1 },
          { label: "Oui, sur certains canaux", score: 2 },
          { label: "Oui, sur tous les canaux avec benchmarks", score: 3 },
        ],
      },
    ],
  },
  {
    id: "crm",
    num: "03",
    label: "Relation Client & CRM",
    color: "#9A8050",
    questions: [
      {
        id: "c1",
        text: "Comment gérez-vous vos données clients ?",
        options: [
          { label: "Dans des fichiers Excel ou des mémoires individuelles", score: 0 },
          { label: "Dans un outil basique non centralisé", score: 1 },
          { label: "Dans un CRM mais sous-utilisé", score: 2 },
          { label: "CRM complet, bien renseigné et exploité", score: 3 },
        ],
      },
      {
        id: "c2",
        text: "Votre équipe suit-elle le parcours client de la prospection à la fidélisation ?",
        options: [
          { label: "Non, chacun gère ses contacts à sa façon", score: 0 },
          { label: "Partiellement, surtout pour les gros clients", score: 1 },
          { label: "Oui, pour la plupart des clients", score: 2 },
          { label: "Oui, processus standardisé et automatisé", score: 3 },
        ],
      },
      {
        id: "c3",
        text: "Communiquez-vous de façon personnalisée avec vos clients ?",
        options: [
          { label: "Non, communication générique uniquement", score: 0 },
          { label: "Email collectif sans segmentation", score: 1 },
          { label: "Segmentation basique selon quelques critères", score: 2 },
          { label: "Personnalisation avancée basée sur les données", score: 3 },
        ],
      },
    ],
  },
  {
    id: "data",
    num: "04",
    label: "Data & KPI",
    color: "#7A6840",
    questions: [
      {
        id: "d1",
        text: "À quelle fréquence consultez-vous vos données de performance ?",
        options: [
          { label: "Rarement ou jamais", score: 0 },
          { label: "Mensuellement de façon informelle", score: 1 },
          { label: "Hebdomadairement avec quelques indicateurs", score: 2 },
          { label: "Quotidiennement via des tableaux de bord", score: 3 },
        ],
      },
      {
        id: "d2",
        text: "Vos décisions stratégiques s'appuient-elles sur des données ?",
        options: [
          { label: "Non, surtout sur l'expérience et l'intuition", score: 0 },
          { label: "Parfois, quand les données sont disponibles", score: 1 },
          { label: "Souvent, mais les données manquent de fiabilité", score: 2 },
          { label: "Systématiquement, avec processus de validation", score: 3 },
        ],
      },
    ],
  },
  {
    id: "ia",
    num: "05",
    label: "IA, Automatisation & Productivité",
    color: "#D4AF5A",
    questions: [
      {
        id: "i1",
        text: "Utilisez-vous des outils d'intelligence artificielle dans votre activité ?",
        options: [
          { label: "Non, pas du tout", score: 0 },
          { label: "Expérimentations individuelles (ex. ChatGPT)", score: 1 },
          { label: "Quelques outils IA intégrés dans certains processus", score: 2 },
          { label: "Stratégie IA déployée avec résultats mesurés", score: 3 },
        ],
      },
      {
        id: "i2",
        text: "Quelles tâches répétitives dans votre entreprise pourraient être automatisées ?",
        options: [
          { label: "Je n'ai pas encore réfléchi à ce sujet", score: 0 },
          { label: "J'en identifie quelques-unes mais sans solution", score: 1 },
          { label: "Certaines sont partiellement automatisées", score: 2 },
          { label: "Cartographie complète et plan d'automatisation", score: 3 },
        ],
      },
      {
        id: "i3",
        text: "Votre équipe est-elle formée aux outils digitaux et à l'IA ?",
        options: [
          { label: "Non, aucune formation spécifique", score: 0 },
          { label: "Formation ponctuelle sans suivi", score: 1 },
          { label: "Programme de formation en cours de mise en place", score: 2 },
          { label: "Formation continue avec certification", score: 3 },
        ],
      },
    ],
  },
  {
    id: "organisation",
    num: "06",
    label: "Organisation & Pilotage",
    color: "#B8975A",
    questions: [
      {
        id: "o1",
        text: "Comment gérez-vous vos projets digitaux ?",
        options: [
          { label: "Sans méthodologie formelle", score: 0 },
          { label: "Avec des outils basiques (emails, Excel)", score: 1 },
          { label: "Outil de gestion de projet mais peu utilisé", score: 2 },
          { label: "Méthodologie agile ou structurée avec reporting", score: 3 },
        ],
      },
      {
        id: "o2",
        text: "La direction de votre entreprise est-elle impliquée dans la transformation digitale ?",
        options: [
          { label: "Non, c'est délégué sans suivi", score: 0 },
          { label: "Sensibilisée mais peu engagée", score: 1 },
          { label: "Engagée sur certains projets prioritaires", score: 2 },
          { label: "Champion actif de la transformation digitale", score: 3 },
        ],
      },
    ],
  },
];

/* ─── Logique de scoring ─────────────────────────────────────────────────── */
function computeScore(answers: Record<string, number>) {
  const domainScores: Record<string, { score: number; max: number }> = {};

  for (const domain of DOMAINS) {
    let total = 0;
    let max = 0;
    for (const q of domain.questions) {
      total += answers[q.id] ?? 0;
      max += 3;
    }
    domainScores[domain.id] = { score: total, max };
  }

  const totalScore = Object.values(domainScores).reduce((s, d) => s + d.score, 0);
  const totalMax = Object.values(domainScores).reduce((s, d) => s + d.max, 0);
  const globalPct = Math.round((totalScore / totalMax) * 100);

  return { domainScores, globalPct };
}

function getLevel(pct: number): { label: string; color: string; bg: string; desc: string } {
  if (pct < 25) return {
    label: "Débutant digital",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    desc: "Votre organisation est au début de sa transformation digitale. Des bases solides à construire.",
  };
  if (pct < 50) return {
    label: "En transition",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    desc: "Des initiatives existent mais manquent de cohérence et de pilotage. Vous êtes à un moment charnière.",
  };
  if (pct < 75) return {
    label: "Digital en progression",
    color: "#D4AF5A",
    bg: "rgba(212,175,90,0.08)",
    desc: "Bonne dynamique digitale. Des axes d'amélioration identifiés pour accélérer votre transformation.",
  };
  return {
    label: "Mature digital",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    desc: "Organisation digitalement avancée. L'enjeu est l'optimisation continue et l'adoption de l'IA.",
  };
}

function getRecommendations(answers: Record<string, number>, domainScores: Record<string, { score: number; max: number }>): { title: string; text: string; priority: "haute" | "moyenne" | "faible" }[] {
  const recs = [];

  // Trie les domaines par score relatif (les plus faibles d'abord)
  const sorted = DOMAINS
    .map((d) => ({
      ...d,
      pct: Math.round(((domainScores[d.id]?.score ?? 0) / (domainScores[d.id]?.max ?? 1)) * 100),
    }))
    .sort((a, b) => a.pct - b.pct);

  for (const domain of sorted.slice(0, 3)) {
    if (domain.id === "strategie" && domain.pct < 50) {
      recs.push({
        title: "Formaliser votre stratégie digitale",
        text: "Sans stratégie claire, les initiatives restent isolées. Définissez votre vision à 12-18 mois, nommez un responsable et allouez un budget.",
        priority: "haute" as const,
      });
    } else if (domain.id === "marketing" && domain.pct < 50) {
      recs.push({
        title: "Structurer votre acquisition digitale",
        text: "Votre croissance dépend encore trop du bouche-à-oreille. Un site optimisé et une stratégie SEO/réseaux sociaux vous permettront de diversifier vos sources de leads.",
        priority: "haute" as const,
      });
    } else if (domain.id === "crm" && domain.pct < 50) {
      recs.push({
        title: "Déployer un CRM adapté à votre structure",
        text: "Centraliser vos données clients est un levier de croissance immédiat. Un CRM bien utilisé augmente la valeur vie client et améliore la productivité commerciale.",
        priority: "haute" as const,
      });
    } else if (domain.id === "data" && domain.pct < 50) {
      recs.push({
        title: "Mettre en place des tableaux de bord simples",
        text: "Commencez par 5 à 8 KPI essentiels suivis hebdomadairement. La prise de décision data-driven s'apprend progressivement.",
        priority: "moyenne" as const,
      });
    } else if (domain.id === "ia" && domain.pct < 50) {
      recs.push({
        title: "Identifier les cas d'usage IA prioritaires",
        text: "L'IA n'est pas un luxe. Commencez par des cas simples : rédaction assistée, automatisation des emails, analyse de données. ROI rapide, adoption facile.",
        priority: "moyenne" as const,
      });
    } else if (domain.id === "organisation" && domain.pct < 50) {
      recs.push({
        title: "Structurer la gouvernance de votre transformation",
        text: "Sans pilotage clair, les projets digitaux s'enlisent. Désignez un référent, adoptez une méthodologie simple et faites des points réguliers.",
        priority: "moyenne" as const,
      });
    }
  }

  // Fallback si déjà tout bon
  if (recs.length === 0) {
    recs.push({
      title: "Accélérer vers l'IA et l'automatisation avancée",
      text: "Votre maturité digitale est élevée. La prochaine étape est l'adoption d'agents IA, l'automatisation des processus complexes et une stratégie data propriétaire.",
      priority: "moyenne" as const,
    });
  }

  return recs.slice(0, 3);
}

function getActionPlan(globalPct: number) {
  if (globalPct < 35) {
    return {
      j30: ["Faire un inventaire complet de vos outils digitaux actuels", "Nommer un référent digital interne", "Créer ou refondre votre site web avec un objectif de conversion"],
      j60: ["Déployer un CRM simple (ex. HubSpot Free ou Zoho)", "Lancer une présence sur 1 ou 2 réseaux sociaux pertinents", "Former votre équipe aux bases du marketing digital"],
      j90: ["Définir 5 à 8 KPI clés et créer un tableau de bord mensuel", "Automatiser au moins 3 tâches répétitives", "Évaluer les opportunités d'investissement prioritaires avec TDCG"],
    };
  }
  if (globalPct < 65) {
    return {
      j30: ["Formaliser votre stratégie digitale sur 18 mois", "Auditer vos outils actuels et identifier les doublons", "Allouer un budget dédié à la transformation digitale"],
      j60: ["Optimiser votre CRM et nettoyer votre base clients", "Lancer une stratégie de contenu SEO sur les sujets prioritaires", "Créer des tableaux de bord hebdomadaires pour la direction"],
      j90: ["Déployer une première intégration IA dans vos processus clés", "Mettre en place un pipeline d'acquisition digital complet", "Mesurer le ROI de vos actions digitales et ajuster"],
    };
  }
  return {
    j30: ["Identifier les cas d'usage IA à fort ROI dans votre secteur", "Auditer vos processus pour les opportunités d'automatisation avancée", "Cartographier les données propriétaires exploitables"],
    j60: ["Déployer des agents IA sur les processus ciblés", "Structurer une stratégie data et analytics avancée", "Former les équipes aux outils IA de nouvelle génération"],
    j90: ["Mesurer l'impact business de chaque initiative IA", "Développer un avantage concurrentiel digital durable", "Définir la roadmap d'expansion et de scalabilité"],
  };
}

/* ─── Barre de progression par domaine ──────────────────────────────────── */
function DomainBar({ domain, pct, color }: { domain: string; pct: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] text-white/70">{domain}</span>
        <span className="font-mono text-[12px] font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
    </div>
  );
}

/* ─── Composant principal ────────────────────────────────────────────────── */
export default function DiagnosticPage() {
  const { openModal } = useModal();

  const totalQuestions = DOMAINS.reduce((s, d) => s + d.questions.length, 0);
  const allQuestions: (Question & { domainId: string; domainLabel: string })[] = [];
  for (const domain of DOMAINS) {
    for (const q of domain.questions) {
      allQuestions.push({ ...q, domainId: domain.id, domainLabel: domain.label });
    }
  }

  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [captureEmail, setCaptureEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleAnswer = useCallback(
    (score: number) => {
      const qId = allQuestions[currentQ].id;
      const newAnswers = { ...answers, [qId]: score };
      setAnswers(newAnswers);
      if (currentQ < allQuestions.length - 1) {
        setCurrentQ((n) => n + 1);
      } else {
        setStep("results");
      }
    },
    [currentQ, answers, allQuestions]
  );

  const handleBack = useCallback(() => {
    if (currentQ > 0) setCurrentQ((n) => n - 1);
  }, [currentQ]);

  const progress = Math.round(((currentQ) / totalQuestions) * 100);

  // Résultats
  const { domainScores, globalPct } = computeScore(answers);
  const level = getLevel(globalPct);
  const recommendations = getRecommendations(answers, domainScores);
  const actionPlan = getActionPlan(globalPct);

  const currentDomain = DOMAINS.find((d) => d.questions.some((q) => q.id === allQuestions[currentQ]?.id));

  return (
    <div className="bg-[#07090F] text-white min-h-screen" style={{ paddingTop: "110px" }}>
      <div className="max-w-[860px] mx-auto px-6 py-16">

        {/* ── Intro ── */}
        {step === "intro" && (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <a href="/" className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">Accueil</a>
              <span className="text-white/20">/</span>
              <a href="/outils-intelligents" className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">Outils intelligents</a>
              <span className="text-white/20">/</span>
              <span className="font-mono text-[11px] tracking-[2px] uppercase text-[#D4AF5A]/70">Diagnostic</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #D4AF5A, #E8C96A)" }} />
              <span className="font-mono text-[11px] tracking-[2.5px] uppercase px-3.5 py-1.5 rounded-full border"
                style={{ color: "rgba(212,175,90,0.9)", borderColor: "rgba(212,175,90,0.3)", background: "rgba(212,175,90,0.06)" }}>
                TDCG Business Intelligence Diagnostic
              </span>
            </div>

            <h1 className="font-display font-semibold text-white mb-5" style={{ fontSize: "clamp(30px, 3.5vw, 50px)", lineHeight: "1.1" }}>
              Diagnostic de maturité digitale
            </h1>
            <p className="mb-10" style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: "1.75", maxWidth: "580px" }}>
              Obtenez une évaluation structurée de votre entreprise en <strong className="text-white/80">5 à 8 minutes</strong>.
              Score global sur 100, analyse par domaine, recommandations concrètes et plan d&apos;action personnalisé.
            </p>

            {/* Domaines couverts */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {DOMAINS.map((domain) => (
                <div key={domain.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                  <span className="font-mono text-[10px] text-[#D4AF5A]/60">{domain.num}</span>
                  <span className="text-[13.5px] text-white/70">{domain.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v6l3.5 2" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke="#D4AF5A" strokeWidth="1.2" opacity="0.5"/></svg>
                5 à 8 minutes
              </div>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#D4AF5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {totalQuestions} questions
              </div>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="#D4AF5A" strokeWidth="1.2" opacity="0.5"/><path d="M4 7h6M4 4.5h4M4 9.5h3" stroke="#D4AF5A" strokeWidth="1.2" strokeLinecap="round"/></svg>
                Résultats immédiats
              </div>
            </div>

            <p className="text-[12px] mb-8" style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
              Ce diagnostic est une évaluation indicative. Il n&apos;est pas un audit exhaustif ni une certification officielle.
            </p>

            <button
              onClick={() => setStep("quiz")}
              className="inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)",
                color: "#07090F",
                fontSize: "15px",
                padding: "16px 36px",
                boxShadow: "0 4px 24px rgba(212,175,90,0.25)",
              }}
            >
              Commencer le diagnostic
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Quiz ── */}
        {step === "quiz" && (
          <div>
            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[11px] tracking-[2px] uppercase" style={{ color: "rgba(212,175,90,0.7)" }}>
                  {currentDomain?.label}
                </span>
                <span className="font-mono text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {currentQ + 1} / {totalQuestions}
                </span>
              </div>
              <div className="h-1 rounded-full w-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round(((currentQ + 1) / totalQuestions) * 100)}%`, background: "linear-gradient(90deg, #D4AF5A, #E8C96A)" }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="font-display font-semibold text-white mb-8" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: "1.3" }}>
                {allQuestions[currentQ].text}
              </h2>

              <div className="flex flex-col gap-3">
                {allQuestions[currentQ].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.score)}
                    className="text-left px-6 py-4 rounded-xl border transition-all duration-200 group"
                    style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(212,175,90,0.3)";
                      el.style.background = "rgba(212,175,90,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono"
                        style={{ borderColor: "rgba(212,175,90,0.3)", color: "rgba(212,175,90,0.6)" }}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-[14.5px] text-white/75 leading-snug group-hover:text-white transition-colors">
                        {opt.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {currentQ > 0 && (
              <button
                onClick={handleBack}
                className="text-[13px] font-medium flex items-center gap-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 6H1M5 2L1 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Question précédente
              </button>
            )}
          </div>
        )}

        {/* ── Résultats ── */}
        {step === "results" && (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <a href="/" className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">Accueil</a>
              <span className="text-white/20">/</span>
              <a href="/outils-intelligents" className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">Outils</a>
              <span className="text-white/20">/</span>
              <span className="font-mono text-[11px] tracking-[2px] uppercase text-[#D4AF5A]/70">Résultats</span>
            </div>

            <h1 className="font-display font-semibold text-white mb-2" style={{ fontSize: "clamp(26px, 3vw, 40px)" }}>
              Votre diagnostic de maturité digitale
            </h1>
            <p className="mb-10 text-[14px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Évaluation indicative — non exhaustive. Basée sur vos {totalQuestions} réponses.
            </p>

            {/* Score global */}
            <div className="rounded-2xl p-8 mb-8 border" style={{ borderColor: "rgba(212,175,90,0.2)", background: level.bg }}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke={level.color} strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${(globalPct / 100) * 326.7} 326.7`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-[26px] text-white">{globalPct}</span>
                    <span className="text-[11px] font-mono text-white/40">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-[20px] text-white mb-2">{level.label}</div>
                  <p className="text-[14px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {level.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Scores par domaine */}
            <div className="rounded-2xl p-7 mb-8 border border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="font-semibold text-white text-[17px] mb-6">Score par domaine</h2>
              {DOMAINS.map((domain) => {
                const ds = domainScores[domain.id];
                const pct = ds ? Math.round((ds.score / ds.max) * 100) : 0;
                return (
                  <DomainBar key={domain.id} domain={domain.label} pct={pct} color={domain.color} />
                );
              })}
            </div>

            {/* Recommandations */}
            <div className="mb-8">
              <h2 className="font-semibold text-white text-[17px] mb-5">Recommandations prioritaires</h2>
              <div className="flex flex-col gap-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="rounded-xl p-6 border border-white/[0.07]"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold"
                        style={{
                          background: rec.priority === "haute" ? "rgba(239,68,68,0.12)" : "rgba(212,175,90,0.12)",
                          color: rec.priority === "haute" ? "#EF4444" : "#D4AF5A",
                        }}>
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-semibold text-white text-[15px]">{rec.title}</h3>
                          <span className="font-mono text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded-full"
                            style={{
                              color: rec.priority === "haute" ? "#EF4444" : "#D4AF5A",
                              background: rec.priority === "haute" ? "rgba(239,68,68,0.08)" : "rgba(212,175,90,0.08)",
                            }}>
                            Priorité {rec.priority}
                          </span>
                        </div>
                        <p className="text-[13.5px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.55)" }}>
                          {rec.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan d'action 30/60/90 jours */}
            <div className="rounded-2xl p-7 mb-8 border border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="font-semibold text-white text-[17px] mb-6">Plan d&apos;action suggéré</h2>
              <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
                {[
                  { label: "30 jours", items: actionPlan.j30 },
                  { label: "60 jours", items: actionPlan.j60 },
                  { label: "90 jours", items: actionPlan.j90 },
                ].map(({ label, items }) => (
                  <div key={label} className="py-4 sm:py-0 sm:px-5 first:pl-0 last:pr-0">
                    <div className="font-mono text-[11px] tracking-[2px] uppercase mb-3" style={{ color: "rgba(212,175,90,0.7)" }}>
                      {label}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-1 shrink-0">
                            <path d="M2 6l2.5 2.5L10 3" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[12.5px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Capture email / CTA */}
            {!captureEmail ? (
              <div className="rounded-2xl p-8 border mb-8"
                style={{ borderColor: "rgba(212,175,90,0.2)", background: "rgba(212,175,90,0.04)" }}>
                <h2 className="font-semibold text-white text-[18px] mb-3">
                  Recevoir votre rapport complet
                </h2>
                <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.65" }}>
                  Obtenez une version détaillée de votre diagnostic avec des recommandations approfondies
                  adaptées à votre secteur, ou échangez directement avec un consultant TDCG.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setCaptureEmail(true)}
                    className="inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)",
                      color: "#07090F",
                      fontSize: "14px",
                      padding: "14px 28px",
                    }}
                  >
                    Recevoir mon rapport par email
                  </button>
                  <button
                    onClick={() => openModal("contact")}
                    className="inline-flex items-center gap-2 font-medium rounded-full border transition-all duration-200"
                    style={{ borderColor: "rgba(212,175,90,0.3)", color: "#D4AF5A", fontSize: "14px", padding: "14px 24px" }}
                  >
                    Parler à un consultant →
                  </button>
                </div>
              </div>
            ) : !emailSubmitted ? (
              <div className="rounded-2xl p-8 border mb-8"
                style={{ borderColor: "rgba(212,175,90,0.2)", background: "rgba(212,175,90,0.04)" }}>
                <h2 className="font-semibold text-white text-[18px] mb-5">
                  Recevoir votre rapport par email
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          nom: "Rapport diagnostic",
                          email,
                          entreprise: "–",
                          services: "Diagnostic de maturité digitale",
                          message: `Score global : ${globalPct}/100 — Niveau : ${level.label}. Demande de rapport complet.`,
                        }),
                      });
                    } catch {}
                    setEmailSubmitted(true);
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="flex-1 px-4 py-3.5 rounded-xl border text-white text-[14px] outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "white" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,90,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                  <button
                    type="submit"
                    className="font-semibold rounded-xl px-6 py-3.5 text-[14px] transition-all duration-200 whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)", color: "#07090F" }}
                  >
                    Envoyer mon rapport →
                  </button>
                </form>
                <p className="text-[11px] mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Vous pouvez consulter vos résultats sans fournir votre email. Aucun spam. Données conformes RGPD.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl p-8 border mb-8 text-center"
                style={{ borderColor: "rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)" }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.12)" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5L18 6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-white text-[17px] mb-2">Demande envoyée !</h3>
                <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Un consultant TDCG vous contactera dans les 48h avec votre rapport personnalisé.
                </p>
              </div>
            )}

            {/* Refaire + explorer */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { setStep("intro"); setCurrentQ(0); setAnswers({}); setCaptureEmail(false); setEmailSubmitted(false); }}
                className="inline-flex items-center gap-2 font-medium rounded-full border text-[13.5px] px-5 py-3 transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
              >
                Refaire le diagnostic
              </button>
              <a
                href="/outils-intelligents/simulateur-roi"
                className="inline-flex items-center gap-2 font-medium rounded-full border text-[13.5px] px-5 py-3 transition-all duration-200"
                style={{ borderColor: "rgba(212,175,90,0.25)", color: "#D4AF5A" }}
              >
                Calculer mon ROI →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
