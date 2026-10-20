"use client";

import { useModal } from "@/lib/ModalContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    num: "01",
    title: "Tableau de bord performance",
    description: "KPIs business centralisés, alertes automatiques, reporting mensuel consolidé.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Suivi de feuille de route",
    description: "Avancement des chantiers, jalons, risques, décisions et livrables en temps réel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Veille stratégique IA",
    description: "Alertes sectorielles, nouvelles opportunités IA, benchmarks concurrentiels mensuels.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Espace documents & livrables",
    description: "Rapports d'audit, recommandations, protocoles, maquettes — centralisés et versionnés.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Messagerie directe consultant",
    description: "Accès direct à votre consultant TDCG dédié, réponse garantie sous 24h ouvrées.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Réunions de pilotage mensuelles",
    description: "Session visio mensuelle de 60 min pour analyser les résultats et ajuster la trajectoire.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
];

const PLANS = [
  {
    name: "Growth Starter",
    badge: null,
    price: "Sur devis",
    priceHint: "À partir de 500k FCFA/mois",
    description: "Pour les PME structurées qui démarrent leur transformation digitale.",
    includes: [
      "Tableau de bord KPI essentiel",
      "Feuille de route 90 jours",
      "1 réunion de pilotage / mois",
      "Messagerie consultant",
      "Espace documents",
    ],
    cta: "Démarrer un accompagnement",
    highlighted: false,
  },
  {
    name: "Growth Business",
    badge: "Le plus choisi",
    price: "Sur devis",
    priceHint: "À partir de 1,2M FCFA/mois",
    description: "Pour les entreprises en phase active de transformation avec des enjeux de croissance.",
    includes: [
      "Tout Growth Starter",
      "Veille stratégique IA mensuelle",
      "Suivi de 2 chantiers simultanés",
      "2 réunions de pilotage / mois",
      "Accès prioritaire consultant",
      "Rapport mensuel consolidé",
    ],
    cta: "Démarrer un accompagnement",
    highlighted: true,
  },
  {
    name: "Growth Enterprise",
    badge: null,
    price: "Sur devis",
    priceHint: "Tarification sur mesure",
    description: "Pour les grandes entreprises, groupes et institutions avec des projets complexes multi-sites.",
    includes: [
      "Tout Growth Business",
      "Équipe dédiée TDCG",
      "Chantiers illimités",
      "Comité de pilotage trimestriel",
      "Intégration système client",
      "SLA & gouvernance personnalisés",
    ],
    cta: "Discuter de votre projet",
    highlighted: false,
  },
];

const JOURNEY = [
  {
    step: "01",
    title: "Cadrage",
    duration: "J+0 à J+5",
    desc: "Appel de découverte, analyse du contexte, définition des objectifs et périmètre de l'accompagnement.",
  },
  {
    step: "02",
    title: "Audit initial",
    duration: "J+5 à J+15",
    desc: "Diagnostic 360° de votre maturité digitale : organisation, processus, données, outils, équipes.",
  },
  {
    step: "03",
    title: "Feuille de route",
    duration: "J+15 à J+20",
    desc: "Livraison de la roadmap priorisée, plan d'action 90 jours et indicateurs de succès.",
  },
  {
    step: "04",
    title: "Exécution accompagnée",
    duration: "Mensuel",
    desc: "Activation des chantiers, suivi des KPIs, ajustements et réunions de pilotage régulières.",
  },
  {
    step: "05",
    title: "Revue & Expansion",
    duration: "Trimestriel",
    desc: "Bilan de performance, recalibrage de la stratégie, identification de nouveaux chantiers à fort impact.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function GrowthPartnerPage() {
  const { openModal } = useModal();

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #07090F 0%, #0B1F33 50%, #07090F 100%)" }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #D4AF5A12 0%, transparent 55%), radial-gradient(circle at 80% 70%, #0B1F3340 0%, transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 border"
            style={{ borderColor: "#D4AF5A40", background: "#D4AF5A10", color: "#D4AF5A" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
            </svg>
            Réservé aux clients accompagnés TDCG
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            TDCG{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #D4AF5A, #f0d080)" }}
            >
              Growth Partner
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 leading-relaxed max-w-2xl mx-auto">
            Votre espace de pilotage stratégique, réservé aux entreprises engagées dans un accompagnement TDCG.
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
            Suivi en temps réel de votre transformation, accès direct à votre consultant dédié, et tous vos livrables centralisés en un seul endroit.
          </p>

          {/* Access gate */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl border"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "#D4AF5A25" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#D4AF5A12", border: "1px solid #D4AF5A30" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400 text-center sm:text-left">
              L&apos;accès à l&apos;espace Growth Partner est fourni automatiquement lors de la mise en place de votre accompagnement TDCG.
            </p>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "#D4AF5A" }}
            >
              Ce que vous obtenez
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Un espace de pilotage conçu pour les dirigeants
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
              Pas un simple portail client. Un véritable outil de gouvernance de votre transformation digitale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.num}
                className="rounded-xl p-5 border transition-all duration-200 hover:border-yellow-800/30 group"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-yellow-900/20"
                    style={{ background: "#D4AF5A10", color: "#D4AF5A" }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color: "#D4AF5A50" }}>{m.num}</span>
                      <h3 className="text-sm font-semibold text-white">{m.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "#D4AF5A" }}
            >
              Comment ça se passe
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Votre parcours d&apos;accompagnement
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, #D4AF5A30, transparent)" }}
            />
            <div className="space-y-6">
              {JOURNEY.map((j, idx) => (
                <div key={j.step} className="flex gap-6 md:gap-10">
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-lg z-10 shrink-0"
                      style={{
                        background: idx === 0 ? "linear-gradient(135deg, #D4AF5A, #b8975a)" : "rgba(255,255,255,0.04)",
                        color: idx === 0 ? "#080808" : "#D4AF5A",
                        border: idx === 0 ? "none" : "1px solid #D4AF5A30",
                      }}
                    >
                      {j.step}
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-xl p-5 border mb-1"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-white">{j.title}</h3>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "#D4AF5A12", color: "#D4AF5A80" }}
                      >
                        {j.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{j.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-3"
              style={{ color: "#D4AF5A" }}
            >
              Formules d&apos;accompagnement
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Un modèle d&apos;accompagnement adapté à votre ambition
            </h2>
            <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
              Chaque accompagnement démarre par un audit de cadrage. Le tarif exact est établi après analyse de votre contexte.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 border flex flex-col relative overflow-hidden"
                style={
                  plan.highlighted
                    ? { background: "rgba(212,175,90,0.05)", borderColor: "#D4AF5A40" }
                    : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }
                }
              >
                {plan.badge && (
                  <div
                    className="absolute top-0 right-0 text-xs font-semibold px-3 py-1.5 rounded-bl-xl"
                    style={{ background: "#D4AF5A", color: "#080808" }}
                  >
                    {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                  <div className="mb-1">
                    <span className="text-2xl font-bold" style={{ color: "#D4AF5A" }}>{plan.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">{plan.priceHint}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "#D4AF5A15", border: "1px solid #D4AF5A30" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="2.5" className="w-2.5 h-2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal("devis")}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={
                    plan.highlighted
                      ? { background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e5e7eb" }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "Comment accéder à l'espace Growth Partner ?",
                a: "L'accès est créé automatiquement dès la signature de votre contrat d'accompagnement TDCG. Vous recevez vos identifiants par email dans les 48h suivant le démarrage de la mission.",
              },
              {
                q: "Peut-on démarrer sans avoir réalisé un audit préalable ?",
                a: "Nous recommandons de démarrer par notre Diagnostic Digital (Business Intelligence Diagnostic) pour établir une baseline solide. Cela dit, nous pouvons adapter notre approche selon votre contexte et l'urgence de vos enjeux.",
              },
              {
                q: "Quelle est la durée minimale d'engagement ?",
                a: "Nos accompagnements sont structurés sur des cycles de 3 mois renouvelables. Une transformation réelle nécessite du temps : nous recommandons un engagement minimum de 6 mois pour mesurer des résultats tangibles.",
              },
              {
                q: "Peut-on combiner plusieurs formules ?",
                a: "Chaque accompagnement est construit sur mesure. Si votre projet évolue ou si vous souhaitez étendre le périmètre, nous adaptons les modalités en cours de mission.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}
              >
                <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-10 border text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4AF5A08 0%, #0B1F3330 100%)", borderColor: "#D4AF5A25" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #D4AF5A50, transparent)" }}
            />
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "#D4AF5A12", border: "1px solid #D4AF5A30" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF5A" strokeWidth="1.5" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Prêt à engager votre transformation ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              Démarrez par un appel de cadrage gratuit. En 30 minutes, nous évaluons ensemble votre contexte, vos enjeux et la formule d&apos;accompagnement la plus adaptée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => openModal("audit")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg, #D4AF5A, #b8975a)", color: "#080808" }}
              >
                Demander un appel de cadrage
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                onClick={() => openModal("devis")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
              >
                Obtenir un devis
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
