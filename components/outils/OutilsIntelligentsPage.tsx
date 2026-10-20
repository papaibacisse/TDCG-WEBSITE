"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/lib/ModalContext";

const TOOLS = [
  {
    id: "diagnostic",
    num: "01",
    href: "/outils-intelligents/diagnostic",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3z" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 8v6l4 2" stroke="#D4AF5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="1.5" fill="#D4AF5A"/>
      </svg>
    ),
    title: "Diagnostic de maturité digitale",
    tagline: "TDCG Business Intelligence Diagnostic",
    description:
      "Obtenez une évaluation structurée de votre entreprise en 5 à 8 minutes. Score global, analyse par domaine et recommandations concrètes.",
    benefits: [
      "Score sur 100 par domaine stratégique",
      "Plan d'action sur 30, 60 et 90 jours",
      "Recommandations adaptées à votre profil",
    ],
    cta: "Lancer mon diagnostic",
    status: "available",
    statusLabel: "Disponible",
  },
  {
    id: "simulateur-roi",
    num: "02",
    href: "/outils-intelligents/simulateur-roi",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="#D4AF5A" strokeWidth="1.5"/>
        <path d="M7 18l4-4 4 4 6-6" stroke="#D4AF5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="21" cy="12" r="1.5" fill="#D4AF5A"/>
      </svg>
    ),
    title: "Simulateur de ROI digital",
    tagline: "TDCG ROI Simulator",
    description:
      "Estimez la valeur réelle de vos investissements digitaux selon 4 scénarios : automatisation, CRM, acquisition, conversion commerciale.",
    benefits: [
      "Calculs réels en FCFA avec formules documentées",
      "Comparaison de scénarios et délai de retour",
      "Hypothèses transparentes et limites indiquées",
    ],
    cta: "Calculer mon ROI",
    status: "available",
    statusLabel: "Disponible",
  },
  {
    id: "radar-visibilite-ia",
    num: "03",
    href: "/outils-intelligents/radar-visibilite-ia",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="#D4AF5A" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="14" cy="14" r="6" stroke="#D4AF5A" strokeWidth="1.3" strokeDasharray="3 2" opacity="0.6"/>
        <circle cx="14" cy="14" r="1.8" fill="#D4AF5A"/>
        <path d="M14 3v2M14 23v2M3 14h2M23 14h2" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: "Radar de visibilité IA",
    tagline: "TDCG AI Visibility Radar",
    description:
      "Analysez comment votre marque apparaît dans les moteurs de recherche et les systèmes de réponse IA. Rapport structuré basé sur des données réelles.",
    benefits: [
      "Audit SEO technique de base",
      "Cohérence de votre présence digitale",
      "Demande d'analyse approfondie par TDCG",
    ],
    cta: "Analyser ma visibilité",
    status: "available",
    statusLabel: "Version MVP",
  },
  {
    id: "growth-partner",
    num: "04",
    href: "/outils-intelligents/growth-partner",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="#D4AF5A" strokeWidth="1.5"/>
        <path d="M9 5V3M19 5V3" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 11h22" stroke="#D4AF5A" strokeWidth="1.3" opacity="0.5"/>
        <path d="M8 15h4M8 19h8" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"/>
        <circle cx="20" cy="17" r="2.5" fill="#D4AF5A" fillOpacity="0.15" stroke="#D4AF5A" strokeWidth="1.3"/>
        <path d="M19 17l1 1 2-2" stroke="#D4AF5A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Espace de pilotage client",
    tagline: "TDCG Growth Partner",
    description:
      "Tableau de bord personnalisé pour suivre votre transformation : objectifs, KPI, feuille de route et livrables. Réservé aux clients accompagnés.",
    benefits: [
      "Accès sécurisé à votre espace dédié",
      "Feuille de route sur 30, 60 et 90 jours",
      "Rapports et livrables centralisés",
    ],
    cta: "Découvrir l'accompagnement",
    status: "reserved",
    statusLabel: "Clients accompagnés",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Diagnostiquer",
    desc: "Comprendre votre situation actuelle : forces, lacunes et niveau de maturité digitale.",
    color: "rgba(212,175,90,0.9)",
  },
  {
    num: "02",
    title: "Mesurer",
    desc: "Identifier et estimer les opportunités de croissance, d'économies et de performance.",
    color: "rgba(212,175,90,0.7)",
  },
  {
    num: "03",
    title: "Agir",
    desc: "Construire un plan d'action priorisé avec des étapes concrètes et réalisables.",
    color: "rgba(212,175,90,0.55)",
  },
  {
    num: "04",
    title: "Piloter",
    desc: "Suivre les progrès, ajuster les décisions et mesurer l'impact des transformations.",
    color: "rgba(212,175,90,0.4)",
  },
];

const PROFILES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="4" stroke="#D4AF5A" strokeWidth="1.5"/>
        <path d="M3 19c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Dirigeants & Chefs d'entreprise",
    desc: "Prenez des décisions stratégiques fondées sur des données concrètes.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="#D4AF5A" strokeWidth="1.5"/>
        <path d="M6 11h10M6 7h6M6 15h8" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" opacity="0.8"/>
      </svg>
    ),
    label: "PME & Entreprises en croissance",
    desc: "Évaluez votre potentiel digital et identifiez vos priorités d'investissement.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 18l4-4 4 3 5-6 3 2" stroke="#D4AF5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="14" r="1.2" fill="#D4AF5A"/>
        <circle cx="11" cy="17" r="1.2" fill="#D4AF5A"/>
        <circle cx="16" cy="11" r="1.2" fill="#D4AF5A"/>
        <circle cx="19" cy="13" r="1.2" fill="#D4AF5A"/>
      </svg>
    ),
    label: "Directions marketing & commerciales",
    desc: "Mesurez le ROI de vos actions et optimisez votre acquisition de clients.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3l2.5 5 5.5.8-4 3.9.9 5.5L11 16l-4.9 2.2.9-5.5L3 8.8l5.5-.8L11 3z" stroke="#D4AF5A" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Organisations en transformation",
    desc: "Structurez votre feuille de route digitale et suivez vos progrès pas à pas.",
  },
];

function RevealWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition =
              "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

export default function OutilsIntelligentsPage() {
  const { openModal } = useModal();

  return (
    <div className="bg-[#07090F] text-white min-h-screen">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: "140px", paddingBottom: "100px" }}
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,175,90,0.07) 0%, transparent 65%)" }}
          />
          <div
            className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 65%)" }}
          />
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }} />
        </div>

        <div className="relative z-[2] max-w-[1240px] mx-auto px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors">Accueil</a>
            <span className="text-white/20 text-[10px]">/</span>
            <span className="font-mono text-[11px] tracking-[2px] uppercase text-[#D4AF5A]/70">Outils intelligents</span>
          </div>

          {/* Signature badge */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #D4AF5A, #E8C96A)" }} />
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(212,175,90,0.3)", background: "rgba(212,175,90,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] animate-pulse" />
              <span className="font-mono text-[11px] tracking-[2.5px] uppercase" style={{ color: "rgba(212,175,90,0.9)" }}>
                4 outils stratégiques
              </span>
            </div>
          </div>

          <div className="max-w-[760px]">
            <h1
              className="font-display font-semibold leading-[1.06] mb-6"
              style={{ fontSize: "clamp(34px, 4.2vw, 60px)" }}
            >
              <span className="block text-white">Transformez vos données</span>
              <span className="block text-white">en décisions.</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #D4AF5A 0%, #F0D080 50%, #D4AF5A 100%)" }}
              >
                Vos décisions en résultats.
              </span>
            </h1>
            <p
              className="leading-[1.75] mb-10 max-w-[580px]"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: "rgba(255,255,255,0.58)" }}
            >
              Découvrez les outils intelligents de TDCG pour évaluer votre maturité digitale,
              mesurer vos opportunités de croissance et piloter votre performance.
              Des outils concrets, des données réelles, des résultats mesurables.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/outils-intelligents/diagnostic"
                className="inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)",
                  color: "#07090F",
                  fontSize: "14.5px",
                  padding: "15px 32px",
                  boxShadow: "0 4px 24px rgba(212,175,90,0.25)",
                }}
              >
                Évaluer mon entreprise
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#outils"
                className="inline-flex items-center gap-2 font-medium rounded-full border transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.70)",
                  fontSize: "14.5px",
                  padding: "15px 30px",
                }}
              >
                Explorer les outils
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Outils cards ── */}
      <section id="outils" className="py-24 max-w-[1240px] mx-auto px-8">
        <RevealWrapper>
          <div className="mb-4">
            <span className="font-mono text-[11px] tracking-[2.5px] uppercase" style={{ color: "rgba(212,175,90,0.7)" }}>
              Nos outils
            </span>
          </div>
          <h2 className="font-display font-semibold text-white mb-4" style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}>
            Quatre outils pour transformer votre performance
          </h2>
          <p className="max-w-[520px] mb-16" style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
            Chaque outil est conçu pour une étape précise de votre transformation digitale.
            Utilisez-les ensemble pour un impact maximal.
          </p>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <RevealWrapper key={tool.id} delay={i * 80}>
              <div
                className="group relative rounded-2xl border p-7 flex flex-col h-full transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,90,0.25)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(212,175,90,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                }}
              >
                {/* Numéro + icône */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,175,90,0.08)", border: "1px solid rgba(212,175,90,0.15)" }}
                    >
                      {tool.icon}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[2.5px] uppercase block mb-0.5" style={{ color: "rgba(212,175,90,0.5)" }}>
                        {tool.tagline}
                      </span>
                      <h3 className="text-[17px] font-semibold text-white leading-snug">{tool.title}</h3>
                    </div>
                  </div>
                  <span
                    className="font-mono text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full shrink-0 ml-3"
                    style={{
                      color: tool.status === "available" ? "rgba(74,222,128,0.9)" : "rgba(212,175,90,0.7)",
                      background: tool.status === "available" ? "rgba(74,222,128,0.08)" : "rgba(212,175,90,0.08)",
                      border: `1px solid ${tool.status === "available" ? "rgba(74,222,128,0.2)" : "rgba(212,175,90,0.2)"}`,
                    }}
                  >
                    {tool.statusLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] mb-6" style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.7" }}>
                  {tool.description}
                </p>

                {/* Bénéfices */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {tool.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                        <path d="M2 7l3.5 3.5L12 3" stroke="#D4AF5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tool.href}
                  className="inline-flex items-center gap-2 font-semibold text-[13.5px] rounded-full border px-5 py-3 self-start transition-all duration-200"
                  style={{ borderColor: "rgba(212,175,90,0.3)", color: "#D4AF5A" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(212,175,90,0.1)";
                    el.style.borderColor = "rgba(212,175,90,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "";
                    el.style.borderColor = "rgba(212,175,90,0.3)";
                  }}
                >
                  {tool.cta}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>

      {/* ── Comment ça fonctionne ── */}
      <section className="py-24 border-t border-white/[0.05]" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-[1240px] mx-auto px-8">
          <RevealWrapper>
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-[2.5px] uppercase" style={{ color: "rgba(212,175,90,0.7)" }}>
                Notre méthode
              </span>
            </div>
            <h2 className="font-display font-semibold text-white mb-16" style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}>
              Comment ça fonctionne ?
            </h2>
          </RevealWrapper>

          <div className="grid md:grid-cols-4 gap-0 divide-x divide-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: "rgba(255,255,255,0.015)" }}>
            {STEPS.map((step, i) => (
              <RevealWrapper key={step.num} delay={i * 80}>
                <div className="p-7">
                  <div className="font-mono text-[13px] font-bold mb-4" style={{ color: step.color }}>
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-white text-[17px] mb-3">{step.title}</h3>
                  <p className="text-[13.5px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {step.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pour qui ── */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-8">
          <RevealWrapper>
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-[2.5px] uppercase" style={{ color: "rgba(212,175,90,0.7)" }}>
                Profils
              </span>
            </div>
            <h2 className="font-display font-semibold text-white mb-4" style={{ fontSize: "clamp(26px, 2.8vw, 40px)" }}>
              Pour qui sont ces outils ?
            </h2>
            <p className="max-w-[520px] mb-14" style={{ fontSize: "15.5px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
              Conçus pour les décideurs qui ont besoin de données concrètes avant d&apos;agir.
            </p>
          </RevealWrapper>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFILES.map((profile, i) => (
              <RevealWrapper key={profile.label} delay={i * 70}>
                <div className="rounded-xl p-6 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(212,175,90,0.08)", border: "1px solid rgba(212,175,90,0.12)" }}>
                    {profile.icon}
                  </div>
                  <h3 className="font-semibold text-white text-[15px] mb-2 leading-snug">{profile.label}</h3>
                  <p className="text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {profile.desc}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 border-t border-white/[0.05]">
        <div className="max-w-[1240px] mx-auto px-8">
          <RevealWrapper>
            <div className="max-w-[760px] mx-auto text-center">
              <h2 className="font-display font-semibold text-white mb-5" style={{ fontSize: "clamp(26px, 2.8vw, 42px)" }}>
                Votre prochaine décision stratégique commence ici.
              </h2>
              <p className="mb-10" style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                Identifions ensemble les opportunités qui permettront à votre entreprise de progresser.
              </p>
              <button
                onClick={() => openModal("contact")}
                className="inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)",
                  color: "#07090F",
                  fontSize: "15px",
                  padding: "17px 38px",
                  boxShadow: "0 4px 28px rgba(212,175,90,0.3)",
                }}
              >
                Échanger avec un consultant TDCG
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </div>
  );
}
