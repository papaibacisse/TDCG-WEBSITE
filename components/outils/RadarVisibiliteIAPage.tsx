"use client";

import { useState, useRef } from "react";
import { useModal } from "@/lib/ModalContext";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormStep = "intro" | "form" | "submitted";

interface FormData {
  nom: string;
  entreprise: string;
  email: string;
  siteWeb: string;
  secteur: string;
  concurrents: string;
  presence: string[];
  objectif: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTEURS = [
  "Banque & Finance",
  "Assurance",
  "Télécommunications",
  "Distribution & Commerce",
  "Industrie & Manufacturing",
  "Santé & Pharmacie",
  "Éducation & Formation",
  "Immobilier & Construction",
  "Transport & Logistique",
  "Énergie & Utilities",
  "Agriculture & Agroalimentaire",
  "Services aux entreprises",
  "Médias & Communication",
  "ONG & Institutionnel",
  "Autre",
];

const PRESENCE_OPTIONS = [
  { id: "google", label: "Google", icon: "G" },
  { id: "bing", label: "Bing / Copilot", icon: "B" },
  { id: "chatgpt", label: "ChatGPT", icon: "AI" },
  { id: "gemini", label: "Gemini", icon: "Ge" },
  { id: "perplexity", label: "Perplexity", icon: "P" },
  { id: "claude_ai", label: "Claude", icon: "Cl" },
  { id: "linkedin", label: "LinkedIn", icon: "Li" },
  { id: "youtube", label: "YouTube", icon: "YT" },
];

const OBJECTIFS = [
  "Comprendre ma visibilité actuelle dans les IA",
  "Identifier des lacunes vs mes concurrents",
  "Améliorer mon référencement SEO/GEO",
  "Préparer une stratégie de contenu IA-first",
  "Mesurer l'impact d'une action récente",
  "Autre objectif spécifique",
];

const RADAR_DIMENSIONS = [
  {
    id: "seo",
    label: "SEO Classique",
    description: "Positionnement sur Google, Bing — mots-clés sectoriels, pages indexées, autorité de domaine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    id: "geo",
    label: "GEO — IA Générative",
    description: "Visibilité dans ChatGPT, Gemini, Claude, Perplexity — citations, mentions, recommandations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    id: "brand",
    label: "Autorité de marque",
    description: "Réputation en ligne, backlinks, mentions presse, avis clients, présence réseaux sociaux",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    id: "content",
    label: "Contenu & Expertise",
    description: "Qualité et densité du contenu, articles, études de cas, ressources téléchargeables",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    id: "local",
    label: "Présence locale & régionale",
    description: "Google My Business, référencement local Sénégal / Afrique de l'Ouest, annuaires sectoriels",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    id: "competitive",
    label: "Positionnement concurrentiel",
    description: "Part de voix vs concurrents, gaps de mots-clés, opportunités non exploitées",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

// ─── Radar SVG ────────────────────────────────────────────────────────────────

function RadarDemo() {
  // Static demo values for illustration
  const scores = [0.75, 0.35, 0.6, 0.45, 0.55, 0.4];
  const n = scores.length;
  const cx = 100, cy = 100, r = 70;

  const point = (i: number, score: number) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    return { x: cx + r * score * Math.cos(angle), y: cy + r * score * Math.sin(angle) };
  };

  const gridPoint = (i: number, level: number) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    const fr = (level / 4) * r;
    return { x: cx + fr * Math.cos(angle), y: cy + fr * Math.sin(angle) };
  };

  const dataPath = scores
    .map((s, i) => {
      const p = point(i, s);
      return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
    })
    .join(" ") + "Z";

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      {/* Grid */}
      {[1, 2, 3, 4].map((level) => {
        const pts = Array.from({ length: n }, (_, i) => gridPoint(i, level));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
        return (
          <path
            key={level}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
        );
      })}
      {/* Axes */}
      {Array.from({ length: n }, (_, i) => {
        const end = gridPoint(i, 4);
        return (
          <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        );
      })}
      {/* Data fill */}
      <path d={dataPath} fill="#D4AF5A18" stroke="#D4AF5A" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Data points */}
      {scores.map((s, i) => {
        const p = point(i, s);
        return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#D4AF5A" />;
      })}
      {/* "?" overlay */}
      <text x="100" y="108" textAnchor="middle" fontSize="28" fill="rgba(255,255,255,0.12)" fontWeight="bold">?</text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RadarVisibiliteIAPage() {
  const { openModal } = useModal();
  const [step, setStep] = useState<FormStep>("intro");
  const [form, setForm] = useState<FormData>({
    nom: "",
    entreprise: "",
    email: "",
    siteWeb: "",
    secteur: "",
    concurrents: "",
    presence: [],
    objectif: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const setField = (key: keyof FormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const togglePresence = (id: string) => {
    setForm((prev) => ({
      ...prev,
      presence: prev.presence.includes(id)
        ? prev.presence.filter((p) => p !== id)
        : [...prev.presence, id],
    }));
  };

  const isFormValid =
    form.nom.trim() &&
    form.entreprise.trim() &&
    form.email.trim() &&
    form.email.includes("@") &&
    form.secteur &&
    form.objectif;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setError("");

    try {
      const message = [
        `🎯 Demande d'analyse Radar Visibilité IA`,
        ``,
        `📋 Informations entreprise`,
        `Contact : ${form.nom}`,
        `Entreprise : ${form.entreprise}`,
        `Site web : ${form.siteWeb || "Non renseigné"}`,
        `Secteur : ${form.secteur}`,
        ``,
        `🔍 Périmètre d'analyse`,
        `Concurrents à analyser : ${form.concurrents || "À définir avec le consultant"}`,
        `Présences actuelles : ${form.presence.length > 0 ? form.presence.join(", ") : "À cartographier"}`,
        ``,
        `🎯 Objectif principal`,
        form.objectif,
        ``,
        `📧 Contact : ${form.email}`,
      ].join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          email: form.email,
          entreprise: form.entreprise,
          services: "Radar Visibilité IA",
          message,
          website: form.siteWeb,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setStep("submitted");
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

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
              "radial-gradient(circle at 25% 25%, #D4AF5A1A 0%, transparent 60%), radial-gradient(circle at 75% 75%, #0B1F3340 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 border"
                style={{ borderColor: "#D4AF5A40", background: "#D4AF5A10", color: "#D4AF5A" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
                Nouveau — TDCG AI Visibility Radar
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                Votre entreprise est-elle{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #D4AF5A, #f0d080)" }}
                >
                  visible dans les IA ?
                </span>
              </h1>
              <p className="text-gray-400 text-base mb-6 leading-relaxed">
                En 2025, vos clients posent leurs questions à ChatGPT, Gemini, Perplexity et Claude avant de chercher sur Google. Si votre entreprise n&apos;apparaît pas dans ces réponses, vous n&apos;existez pas pour eux.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Audit de votre visibilité SEO traditionnelle",
                  "Analyse de votre présence dans les IA génératives (GEO)",
                  "Benchmark vs 2–3 concurrents",
                  "Rapport + recommandations personnalisées",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "#D4AF5A15", border: "1px solid #D4AF5A40" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="2.5" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              {step === "intro" && (
                <button
                  onClick={() => { setStep("form"); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100); }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }}
                >
                  Analyser ma visibilité IA
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              )}
            </div>
            {/* Radar illustration */}
            <div
              className="rounded-2xl p-8 border relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="text-center mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Votre radar</p>
                <p className="text-sm text-gray-400">6 dimensions analysées</p>
              </div>
              <RadarDemo />
              <div className="mt-6 grid grid-cols-2 gap-2">
                {RADAR_DIMENSIONS.map((d) => (
                  <div key={d.id} className="flex items-center gap-2">
                    <div style={{ color: "#D4AF5A80" }}>{d.icon}</div>
                    <span className="text-xs text-gray-500">{d.label}</span>
                  </div>
                ))}
              </div>
              {/* Blur overlay with question mark */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ background: "rgba(7,9,15,0.35)", backdropFilter: "blur(1px)" }}
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold"
                    style={{ background: "#D4AF5A15", border: "1px solid #D4AF5A40", color: "#D4AF5A" }}
                  >
                    ?
                  </div>
                  <p className="text-sm text-gray-300 font-medium">Votre score ici</p>
                  <p className="text-xs text-gray-500">Après analyse par nos experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Ce que nous analysons</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Contrairement à un audit SEO classique, le Radar Visibilité IA mesure aussi votre présence dans les systèmes d&apos;intelligence artificielle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RADAR_DIMENSIONS.map((d, i) => (
              <div
                key={d.id}
                className="rounded-xl p-5 border transition-all duration-200 hover:border-yellow-800/40"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "#D4AF5A10", color: "#D4AF5A" }}
                  >
                    {d.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color: "#D4AF5A60" }}>0{i + 1}</span>
                      <h3 className="text-sm font-semibold text-white">{d.label}</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{d.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          {step === "intro" ? (
            <div
              className="rounded-2xl p-8 border text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h3 className="text-xl font-bold text-white mb-3">Prêt à découvrir votre score ?</h3>
              <p className="text-sm text-gray-400 mb-6">
                Remplissez le formulaire ci-dessous. Nos analystes effectuent l&apos;audit manuellement et vous envoient votre rapport personnalisé sous 5 jours ouvrés.
              </p>
              <button
                onClick={() => setStep("form")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }}
              >
                Commencer l&apos;analyse
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          ) : step === "submitted" ? (
            <div
              className="rounded-2xl p-10 border text-center"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "#D4AF5A30" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "#D4AF5A15", border: "1px solid #D4AF5A40" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="2" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Demande reçue !</h3>
              <p className="text-gray-400 mb-2">
                Merci <strong className="text-white">{form.nom}</strong>. Votre demande d&apos;analyse Radar Visibilité IA a bien été enregistrée.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Nos analystes vont étudier la visibilité de <strong className="text-gray-300">{form.entreprise}</strong> et vous envoiront votre rapport personnalisé à <strong className="text-gray-300">{form.email}</strong> sous <strong className="text-gray-300">5 jours ouvrés</strong>.
              </p>
              <div
                className="rounded-xl p-4 border text-left mb-8"
                style={{ background: "#D4AF5A08", borderColor: "#D4AF5A20" }}
              >
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Votre rapport contiendra</p>
                {[
                  "Score de visibilité SEO (0–100) avec benchmark sectoriel",
                  "Analyse de votre présence dans les 5 principales IA",
                  "Comparatif avec vos concurrents déclarés",
                  "Cartographie des opportunités prioritaires",
                  "Recommandations concrètes et feuille de route 90 jours",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#D4AF5A" }} />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => openModal("contact")}
                className="text-sm font-medium border px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
              >
                Parler à un expert maintenant
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                {/* Header */}
                <div className="px-8 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <h2 className="text-xl font-bold text-white">Demander votre analyse Radar</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Rapport personnalisé livré sous 5 jours ouvrés · Gratuit pour les entreprises éligibles
                  </p>
                </div>

                <div className="px-8 py-8 space-y-6">
                  {/* Identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Prénom & Nom <span style={{ color: "#D4AF5A" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.nom}
                        onChange={(e) => setField("nom", e.target.value)}
                        placeholder="Amadou Diallo"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-yellow-600/40"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Email professionnel <span style={{ color: "#D4AF5A" }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="amadou@entreprise.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-yellow-600/40"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Entreprise <span style={{ color: "#D4AF5A" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={form.entreprise}
                        onChange={(e) => setField("entreprise", e.target.value)}
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-yellow-600/40"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Site web
                      </label>
                      <input
                        type="url"
                        value={form.siteWeb}
                        onChange={(e) => setField("siteWeb", e.target.value)}
                        placeholder="https://votre-site.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-yellow-600/40"
                        style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                      />
                    </div>
                  </div>

                  {/* Sector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Secteur d&apos;activité <span style={{ color: "#D4AF5A" }}>*</span>
                    </label>
                    <select
                      value={form.secteur}
                      onChange={(e) => setField("secteur", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors focus:border-yellow-600/40 appearance-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.08)",
                        color: form.secteur ? "#fff" : "#4b5563",
                      }}
                      required
                    >
                      <option value="" disabled style={{ background: "#0B1F33" }}>Sélectionnez votre secteur</option>
                      {SECTEURS.map((s) => (
                        <option key={s} value={s} style={{ background: "#0B1F33", color: "#fff" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Competitors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Principaux concurrents à analyser{" "}
                      <span className="text-xs text-gray-500">(optionnel — 2 à 3 noms)</span>
                    </label>
                    <input
                      type="text"
                      value={form.concurrents}
                      onChange={(e) => setField("concurrents", e.target.value)}
                      placeholder="Ex : Entreprise A, Entreprise B"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-yellow-600/40"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
                    />
                  </div>

                  {/* Presence checkboxes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Où êtes-vous présent actuellement ?{" "}
                      <span className="text-xs text-gray-500">(cochez tout ce qui s&apos;applique)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRESENCE_OPTIONS.map((p) => {
                        const selected = form.presence.includes(p.id);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => togglePresence(p.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150"
                            style={
                              selected
                                ? { background: "#D4AF5A15", borderColor: "#D4AF5A50", color: "#D4AF5A" }
                                : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)", color: "#6b7280" }
                            }
                          >
                            <span
                              className="w-5 h-5 rounded text-center text-xs font-bold leading-5 shrink-0"
                              style={{ background: selected ? "#D4AF5A25" : "rgba(255,255,255,0.05)" }}
                            >
                              {p.icon}
                            </span>
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Objective */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Votre objectif principal <span style={{ color: "#D4AF5A" }}>*</span>
                    </label>
                    <div className="space-y-2">
                      {OBJECTIFS.map((obj) => {
                        const selected = form.objectif === obj;
                        return (
                          <button
                            key={obj}
                            type="button"
                            onClick={() => setField("objectif", obj)}
                            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm border transition-all duration-150"
                            style={
                              selected
                                ? { background: "#D4AF5A10", borderColor: "#D4AF5A40", color: "#e5e7eb" }
                                : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", color: "#6b7280" }
                            }
                          >
                            <div
                              className="w-4 h-4 rounded-full border-2 shrink-0 transition-all"
                              style={{
                                borderColor: selected ? "#D4AF5A" : "rgba(255,255,255,0.2)",
                                background: selected ? "#D4AF5A" : "transparent",
                              }}
                            />
                            {obj}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl p-4 text-sm" style={{ background: "#ef444415", color: "#ef4444" }}>
                      {error}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="px-8 py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
                  style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.15)" }}
                >
                  <p className="text-xs text-gray-600">
                    Vos données sont utilisées uniquement pour réaliser votre analyse. Aucun spam.
                  </p>
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
