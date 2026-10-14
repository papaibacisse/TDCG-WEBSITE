"use client";

import { useModal } from "@/lib/ModalContext";
import { useState, useRef, useEffect } from "react";

const PROBLEMS = [
  {
    id: "p1",
    pain: "Vos processus sont manuels et ralentissent votre croissance.",
    solution: "Nous les cartographions, les digitalisons et les automatisons pour libérer votre équipe sur les tâches à valeur.",
    tag: "Automatisation",
  },
  {
    id: "p2",
    pain: "Vous investissez en marketing digital mais les résultats ne suivent pas.",
    solution: "Nous auditons votre stratégie, identifions les fuites et réorientons les dépenses vers ce qui génère réellement des leads qualifiés.",
    tag: "Marketing & Growth",
  },
  {
    id: "p3",
    pain: "Vous avez entendu parler de l'IA mais vous ne savez pas par où commencer.",
    solution: "Nous évaluons votre maturité IA, construisons une feuille de route réaliste et déployons les premiers cas d'usage concrets.",
    tag: "IA & Automatisation",
  },
  {
    id: "p4",
    pain: "Votre organisation croît mais votre structure ne suit plus.",
    solution: "Nous redesignons votre organisation — processus, outils, équipes — pour qu'elle supporte votre prochaine phase de croissance.",
    tag: "Conseil Stratégique",
  },
  {
    id: "p5",
    pain: "Vous avez des données mais vous ne savez pas comment les exploiter.",
    solution: "Nous construisons les tableaux de bord et les processus qui transforment vos données brutes en décisions opérationnelles.",
    tag: "Data & CRM",
  },
  {
    id: "p6",
    pain: "Vous voulez vous digitaliser mais vous ne savez pas par où commencer.",
    solution: "Nous faisons le diagnostic, définissons les priorités selon votre contexte et vous accompagnons pas à pas dans la transformation.",
    tag: "Transformation Digitale",
  },
];

export default function ProblemsSection() {
  const { openModal } = useModal();
  const [active, setActive] = useState<string | null>("p1");
  const sectionRef = useRef<HTMLElement>(null);

  /* Reveal on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = el.querySelectorAll<HTMLElement>("[data-prob-reveal]");
            items.forEach((item) => {
              const delay = parseInt(item.dataset.probReveal ?? "0", 10);
              setTimeout(() => {
                item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, delay);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeData = PROBLEMS.find((p) => p.id === active);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060B16] py-[100px] overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,175,90,0.4) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,175,90,0.4) 60px)",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-[600px] opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse at left center, #D4AF5A 0%, transparent 65%)" }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Section header */}
        <div
          data-prob-reveal="0"
          style={{ opacity: 0, transform: "translateY(16px)" }}
          className="flex items-start justify-between gap-8 mb-16 flex-wrap"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#D4AF5A]/60" />
              <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70">
                Ce que vous vivez
              </span>
            </div>
            <h2
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
            >
              Ces défis vous parlent ?<br />
              <span style={{ color: "#D4AF5A" }}>Nous avons les réponses.</span>
            </h2>
          </div>
          <p className="text-white/45 text-[15.5px] leading-relaxed max-w-[360px] pt-2">
            Chaque organisation que nous accompagnons arrive avec des défis spécifiques.
            Voici les plus fréquents — et comment nous les résolvons.
          </p>
        </div>

        {/* Accordion layout */}
        <div
          data-prob-reveal="80"
          style={{ opacity: 0, transform: "translateY(16px)" }}
          className="grid lg:grid-cols-[1fr_420px] gap-8 items-start"
        >
          {/* LEFT — accordion list */}
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {PROBLEMS.map((p) => {
              const isOpen = active === p.id;
              return (
                <div key={p.id}>
                  <button
                    onClick={() => setActive(isOpen ? null : p.id)}
                    className="w-full flex items-start gap-5 py-5 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF5A]/40 rounded"
                    aria-expanded={isOpen}
                  >
                    {/* Tag chip */}
                    <span
                      className="shrink-0 font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded mt-1 transition-colors duration-200"
                      style={{
                        background: isOpen ? "rgba(212,175,90,0.15)" : "rgba(255,255,255,0.04)",
                        color: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.25)",
                        border: `1px solid ${isOpen ? "rgba(212,175,90,0.3)" : "rgba(255,255,255,0.07)"}`,
                        fontSize: "9.5px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.tag}
                    </span>

                    <div className="flex-1">
                      <p
                        className="font-medium text-[15px] leading-snug transition-colors duration-200"
                        style={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.55)" }}
                      >
                        {p.pain}
                      </p>

                      {/* Inline answer on mobile (always visible when open) */}
                      {isOpen && (
                        <p className="mt-3 text-[13.5px] leading-relaxed text-white/45 lg:hidden">
                          {p.solution}
                        </p>
                      )}
                    </div>

                    {/* Indicator */}
                    <span
                      className="shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: isOpen ? "#D4AF5A" : "rgba(255,255,255,0.12)",
                        background: isOpen ? "rgba(212,175,90,0.12)" : "transparent",
                      }}
                    >
                      <svg
                        width="8" height="8" viewBox="0 0 8 8" fill="none"
                        className="transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                      >
                        <path d="M4 1v6M1 4h6" stroke={isOpen ? "#D4AF5A" : "rgba(255,255,255,0.35)"} strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT — featured answer panel (desktop) */}
          <div className="hidden lg:block sticky top-28">
            <div
              className="rounded-2xl p-8 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(212,175,90,0.16)",
              }}
            >
              {activeData ? (
                <>
                  {/* Tag */}
                  <span
                    className="inline-block font-mono text-[9.5px] tracking-[2px] uppercase px-2.5 py-1 rounded mb-5"
                    style={{
                      background: "rgba(212,175,90,0.12)",
                      color: "#D4AF5A",
                      border: "1px solid rgba(212,175,90,0.25)",
                    }}
                  >
                    {activeData.tag}
                  </span>

                  {/* Problem */}
                  <p className="text-white/40 text-[13px] leading-snug mb-4">
                    Défi identifié
                  </p>
                  <p className="text-white font-medium text-[16px] leading-snug mb-6">
                    {activeData.pain}
                  </p>

                  {/* Divider */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-4 h-px bg-[#D4AF5A]/40" />
                    <span className="font-mono text-[9.5px] tracking-[2px] uppercase text-[#D4AF5A]/60">
                      Notre réponse
                    </span>
                  </div>

                  {/* Answer */}
                  <p className="text-white/60 text-[14.5px] leading-relaxed mb-8">
                    {activeData.solution}
                  </p>

                  <button
                    onClick={() => openModal("audit")}
                    className="w-full text-center text-[13px] font-semibold text-[#080D18] rounded-full py-3.5 transition-colors duration-200"
                    style={{ background: "#D4AF5A" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E0BB3F")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A")}
                  >
                    Discutons de votre situation →
                  </button>
                </>
              ) : (
                <p className="text-white/25 text-[14px] text-center py-8">
                  Sélectionnez un défi pour voir notre réponse.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          data-prob-reveal="160"
          style={{ opacity: 0, transform: "translateY(16px)" }}
          className="mt-16 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => openModal("audit")}
            className="inline-flex items-center gap-2.5 font-semibold text-[14px] rounded-full px-7 py-3.5 transition-colors duration-200"
            style={{ background: "#D4AF5A", color: "#080D18" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E0BB3F")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A")}
          >
            Parlez-nous de votre défi
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a
            href="/expertises"
            className="text-[14px] text-white/40 hover:text-white/70 transition-colors"
          >
            Voir nos expertises →
          </a>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-prob-reveal] { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
