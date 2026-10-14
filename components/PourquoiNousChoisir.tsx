"use client";

import { useRef, useState, useEffect } from "react";

const DIFFERENTIATORS = [
  {
    num: "01",
    color: "#D4AF5A",
    title: "Rigueur internationale",
    description:
      "Nos méthodes s'appuient sur les standards des meilleurs cabinets mondiaux — McKinsey, BCG, Accenture — adaptées aux réalités africaines. Pas de copier-coller : une synthèse au service de votre contexte.",
  },
  {
    num: "02",
    color: "#6AB5FF",
    title: "Résultats mesurables",
    description:
      "Nous définissons des KPIs dès le cadrage. Chaque mission est pilotée par des indicateurs concrets. Pas de promesses vagues : un engagement chiffré sur l'impact attendu.",
  },
  {
    num: "03",
    color: "#6AFFB4",
    title: "Ancrage local profond",
    description:
      "Basés au Sénégal, nous comprenons les contraintes locales — réglementation, culture business, dynamiques de marché. Nous ne sommes pas un cabinet étranger qui transpose une approche inadaptée.",
  },
  {
    num: "04",
    color: "#FF9A6A",
    title: "Transfert de compétences",
    description:
      "Nous ne créons pas de dépendance. Notre objectif est de rendre vos équipes autonomes sur les outils et méthodes que nous déployons ensemble. L'indépendance de votre organisation est notre critère de succès.",
  },
];

const TRUST_ITEMS = [
  {
    label: "Notre engagement",
    text: "Un diagnostic honnête avant toute proposition commerciale.",
  },
  {
    label: "Notre promesse",
    text: "Si nous ne pouvons pas mesurer l'impact, nous le disons avant de commencer.",
  },
  {
    label: "Notre différence",
    text: "Rigueur internationale. Réalités locales. Résultats concrets.",
  },
];

export default function PourquoiNousChoisir() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0F1E] py-[110px] overflow-hidden"
    >
      {/* Subtle background texture — horizontal lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(212,175,90,0.5) 40px)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-[500px] opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse at right center, #D4AF5A 0%, transparent 65%)" }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Section header — asymmetric */}
        <div
          className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-16 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#D4AF5A]/60" />
              <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70">
                Pourquoi TDCG
              </span>
            </div>
            <h2
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
            >
              Ce qui nous distingue<br />
              <span style={{ color: "#D4AF5A" }}>réellement.</span>
            </h2>
          </div>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-[380px] lg:pb-1">
            Beaucoup de cabinets proposent des services similaires. La différence TDCG tient à quatre engagements non négociables que nous tenons sur chaque mission.
          </p>
        </div>

        {/* Differentiators — horizontal rows */}
        <div
          className="space-y-0 divide-y divide-white/[0.05] mb-12"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.14s, transform 0.7s ease 0.14s",
          }}
        >
          {DIFFERENTIATORS.map((d, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={d.title}
                className="group relative grid lg:grid-cols-[80px_1fr_1fr] gap-6 py-8 cursor-default transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.18 + i * 0.08}s, transform 0.5s ease ${0.18 + i * 0.08}s`,
                  transform: revealed ? "translateX(0)" : "translateX(-12px)",
                }}
              >
                {/* Hover background */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${d.color}06 0%, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Number + gold bar */}
                <div className="flex items-start gap-3 relative z-[1]">
                  <span
                    className="w-px h-10 shrink-0 transition-all duration-300 mt-1"
                    style={{ background: isHovered ? d.color : "rgba(255,255,255,0.08)" }}
                  />
                  <span
                    className="font-mono text-[13px] tracking-[2px] font-medium transition-colors duration-300 mt-1"
                    style={{ color: isHovered ? d.color : "rgba(255,255,255,0.25)" }}
                  >
                    {d.num}
                  </span>
                </div>

                {/* Title */}
                <div className="relative z-[1]">
                  <h3
                    className="font-semibold text-[17px] leading-snug transition-colors duration-300"
                    style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.75)" }}
                  >
                    {d.title}
                  </h3>
                  {/* Animated underline */}
                  <div
                    className="h-px mt-2 transition-all duration-400"
                    style={{
                      width: isHovered ? "48px" : "0px",
                      background: d.color,
                    }}
                  />
                </div>

                {/* Description */}
                <p
                  className="text-[14px] leading-relaxed relative z-[1] transition-colors duration-300"
                  style={{ color: isHovered ? "rgba(255,255,255,0.60)" : "rgba(255,255,255,0.38)" }}
                >
                  {d.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust band */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-700"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          {/* Gold accent line */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,90,0.4), transparent)" }}
          />
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] px-2">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="px-8 py-7">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-3 h-px bg-[#D4AF5A]/50" />
                  <span className="font-mono text-[9.5px] tracking-[2.5px] uppercase text-[#D4AF5A]/60">
                    {item.label}
                  </span>
                </div>
                <p className="text-white/65 text-[13.5px] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [style*="transition"] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
