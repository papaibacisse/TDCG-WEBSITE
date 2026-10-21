"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Landmark, LineChart, GraduationCap, HeartPulse, Sprout, ShoppingBag,
  Factory, HandHeart, Radio, Truck, Zap, Rocket,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { SECTORS, sectorSlug } from "@/lib/constants";

const ICONS = [
  Landmark, LineChart, GraduationCap, HeartPulse,
  Sprout, ShoppingBag, Factory, HandHeart,
  Radio, Truck, Zap, Rocket,
];

// Couleurs par segment de spirale
const SECTOR_COLORS = [
  "#D4AF5A", "#C8A84E", "#BCA042", "#B09836",
  "#A49030", "#B8A055", "#CCB06A", "#D4B870",
  "#D4AF5A", "#C0A048", "#B09030", "#D4AF5A",
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function Sectors() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Abréviations pour les noms trop longs dans la roue
  const LABEL_OVERRIDES: Record<string, string[]> = {
    "Administration publique": ["Admin.", "Publique"],
    "Télécommunications": ["Télécom-", "munications"],
  };

  const N = SECTORS.length; // 12
  const GAP = 2; // degrés entre chaque segment
  const SLICE = 360 / N - GAP; // ~28°

  // Taille SVG responsive
  const SIZE = isMobile ? 340 : 520;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R_OUTER = SIZE * 0.47;
  const R_INNER = SIZE * 0.28;
  const R_LABEL = SIZE * 0.385;
  const R_ICON = SIZE * 0.395;

  return (
    <section
      id="secteurs"
      ref={sectionRef}
      className="relative bg-[#06080F] py-[120px] scroll-mt-24 overflow-hidden"
    >
      {/* Fond ambiance */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,90,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(212,175,90,0.8) 80px)",
        }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4AF5A]/40" />
            <span className="font-mono text-[10.5px] tracking-[3.5px] uppercase text-[#D4AF5A]/60">
              Secteurs d&apos;activité
            </span>
            <span className="w-8 h-px bg-[#D4AF5A]/40" />
          </div>
          <h2
            className="font-display font-semibold text-white leading-tight mx-auto"
            style={{ fontSize: "clamp(26px, 3.2vw, 44px)", maxWidth: 620 }}
          >
            Une expertise transversale,{" "}
            <span style={{ color: "#D4AF5A" }}>adaptée à chaque écosystème.</span>
          </h2>
          <p className="text-white/35 text-[14px] mt-4 max-w-[480px] mx-auto leading-relaxed">
            Douze secteurs clés de l&apos;économie africaine — chacun avec ses enjeux propres et une méthode TDCG qui s&apos;y adapte.
          </p>
        </div>

        {/* Layout principal : spirale + info panel */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

          {/* ── Roue spirale SVG ── */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: SIZE,
              height: SIZE,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "scale(1) rotate(0deg)" : "scale(0.88) rotate(-15deg)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.15s",
            }}
          >
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Glow gold */}
                <filter id="glow-gold" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Glow white */}
                <filter id="glow-white" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Gradient actif */}
                {SECTORS.map((_, i) => (
                  <radialGradient key={i} id={`grad-${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={SECTOR_COLORS[i]} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={SECTOR_COLORS[i]} stopOpacity="0.4" />
                  </radialGradient>
                ))}
                {/* Anneau interne gradient */}
                <radialGradient id="center-bg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0D1525" stopOpacity="1" />
                  <stop offset="100%" stopColor="#080D18" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="ring-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="transparent" />
                  <stop offset="100%" stopColor="rgba(212,175,90,0.06)" />
                </radialGradient>
              </defs>

              {/* Cercle de fond externe doux */}
              <circle cx={CX} cy={CY} r={R_OUTER + 6} fill="rgba(212,175,90,0.025)" />

              {/* Segments */}
              {SECTORS.map((sector, i) => {
                const startAngle = i * (360 / N);
                const endAngle = startAngle + SLICE;
                const isHov = hovered === i;

                // Chemin de l'arc plein (anneau)
                const outerR = isHov ? R_OUTER + 8 : R_OUTER;
                const p1 = polarToCartesian(CX, CY, outerR, startAngle);
                const p2 = polarToCartesian(CX, CY, outerR, endAngle);
                const p3 = polarToCartesian(CX, CY, R_INNER, endAngle);
                const p4 = polarToCartesian(CX, CY, R_INNER, startAngle);
                const largeArc = SLICE > 180 ? "1" : "0";

                const segPath = [
                  `M ${p1.x} ${p1.y}`,
                  `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
                  `L ${p3.x} ${p3.y}`,
                  `A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
                  "Z",
                ].join(" ");

                // Midpoint pour label
                const midAngle = startAngle + SLICE / 2;
                const lp = polarToCartesian(CX, CY, R_LABEL, midAngle);
                const ip = polarToCartesian(CX, CY, R_ICON, midAngle);
                const textRotate = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;

                return (
                  <g
                    key={sector.name}
                    id={sectorSlug(sector.name)}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => openModal("contact")}
                  >
                    {/* Segment de fond */}
                    <path
                      d={segPath}
                      fill={isHov ? `url(#grad-${i})` : "rgba(255,255,255,0.04)"}
                      stroke={isHov ? SECTOR_COLORS[i] : "rgba(212,175,90,0.15)"}
                      strokeWidth={isHov ? 1.5 : 0.8}
                      style={{
                        filter: isHov ? "url(#glow-gold)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Ligne fine entre segments */}
                    <path
                      d={describeArc(CX, CY, (R_OUTER + R_INNER) / 2, startAngle, startAngle)}
                      stroke="rgba(212,175,90,0.1)"
                      strokeWidth="0.5"
                      fill="none"
                    />

                    {/* Nom du secteur — 1 ou 2 lignes selon la longueur */}
                    {(() => {
                      const lines = LABEL_OVERRIDES[sector.name] ?? [sector.name];
                      const isLong = lines.length > 1;
                      const baseFontSize = isMobile ? 7 : 9;
                      const fontSize = isLong ? baseFontSize * 0.85 : baseFontSize;
                      const lineHeight = fontSize * 1.35;
                      const offsetY = isLong ? -lineHeight / 2 : 0;

                      return (
                        <text
                          x={lp.x}
                          y={lp.y}
                          textAnchor="middle"
                          transform={`rotate(${textRotate}, ${lp.x}, ${lp.y})`}
                          style={{
                            fontSize,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: isHov ? 700 : 500,
                            fill: isHov ? "#ffffff" : "rgba(255,255,255,0.55)",
                            letterSpacing: isLong ? "0.03em" : "0.05em",
                            textTransform: "uppercase",
                            transition: "fill 0.25s ease",
                            pointerEvents: "none",
                          }}
                        >
                          {lines.map((line, li) => (
                            <tspan
                              key={li}
                              x={lp.x}
                              dy={li === 0 ? offsetY : lineHeight}
                              dominantBaseline="middle"
                            >
                              {line}
                            </tspan>
                          ))}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}

              {/* Anneau interne décoratif */}
              <circle cx={CX} cy={CY} r={R_INNER} fill="url(#center-bg)" />
              <circle
                cx={CX} cy={CY} r={R_INNER}
                fill="none"
                stroke="rgba(212,175,90,0.25)"
                strokeWidth="1"
              />
              <circle
                cx={CX} cy={CY} r={R_INNER - 8}
                fill="none"
                stroke="rgba(212,175,90,0.08)"
                strokeWidth="0.8"
              />

              {/* Petits dots de connexion sur l'anneau interne */}
              {SECTORS.map((_, i) => {
                const angle = i * (360 / N) + SLICE / 2;
                const dp = polarToCartesian(CX, CY, R_INNER - 0.5, angle);
                return (
                  <circle
                    key={i}
                    cx={dp.x} cy={dp.y} r={2.5}
                    fill={hovered === i ? SECTOR_COLORS[i] : "rgba(212,175,90,0.3)"}
                    style={{ transition: "fill 0.25s ease" }}
                  />
                );
              })}

            </svg>

            {/* Centre — Logo + CTA */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ pointerEvents: "none" }}
            >
              {/* Halo doré derrière le logo */}
              <div
                className="absolute rounded-full"
                style={{
                  width: R_INNER * 1.5,
                  height: R_INNER * 1.5,
                  background: "radial-gradient(circle, rgba(212,175,90,0.08) 0%, transparent 70%)",
                }}
              />

              <div
                className="relative flex flex-col items-center gap-3"
                style={{ pointerEvents: "auto" }}
              >
                {/* Logo */}
                <div
                  className="relative"
                  style={{
                    width: isMobile ? 68 : 88,
                    height: isMobile ? 68 : 88,
                  }}
                >
                  <Image
                    src="/logo-tdcg.png"
                    alt="TDCG"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Ligne décorative */}
                <div
                  className="w-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #D4AF5A, transparent)" }}
                />

                {/* Texte */}
                <p
                  className="font-mono text-center leading-tight"
                  style={{
                    fontSize: isMobile ? 7 : 8.5,
                    letterSpacing: "0.18em",
                    color: "rgba(212,175,90,0.5)",
                    textTransform: "uppercase",
                    maxWidth: R_INNER * 1.2,
                  }}
                >
                  Votre secteur,<br />notre expertise
                </p>

                {/* CTA central */}
                <button
                  onClick={() => openModal("contact")}
                  className="group relative overflow-hidden rounded-full text-center transition-all duration-300"
                  style={{
                    marginTop: 4,
                    padding: isMobile ? "6px 14px" : "8px 18px",
                    background: "rgba(212,175,90,0.1)",
                    border: "1px solid rgba(212,175,90,0.35)",
                    fontSize: isMobile ? 9 : 10.5,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "#D4AF5A",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A";
                    (e.currentTarget as HTMLButtonElement).style.color = "#06080F";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,90,0.1)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#D4AF5A";
                  }}
                >
                  Nous contacter
                </button>
              </div>
            </div>
          </div>

          {/* ── Panel info à droite ── */}
          <div
            className="flex-1 max-w-[400px] transition-all duration-700"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            {hovered !== null ? (
              /* Carte secteur actif */
              <div
                key={hovered}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: "rgba(13,21,37,0.9)",
                  border: `1px solid ${SECTOR_COLORS[hovered]}40`,
                  animation: "fadeSlide 0.25s ease forwards",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${SECTOR_COLORS[hovered]}, transparent)`,
                  }}
                />
                <div
                  className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${SECTOR_COLORS[hovered]}12 0%, transparent 70%)`,
                  }}
                />

                {/* Icône */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${SECTOR_COLORS[hovered]}18`, border: `1px solid ${SECTOR_COLORS[hovered]}30` }}
                >
                  {(() => { const Icon = ICONS[hovered]; return <Icon size={20} style={{ color: SECTOR_COLORS[hovered] }} />; })()}
                </div>

                <h3 className="font-semibold text-white text-[18px] mb-2">
                  {SECTORS[hovered].name}
                </h3>
                <p className="text-white/50 text-[13.5px] leading-relaxed mb-6">
                  {SECTORS[hovered].description}
                </p>

                <button
                  onClick={() => openModal("contact")}
                  className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-wider transition-all duration-200"
                  style={{ color: SECTOR_COLORS[hovered] }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  Discuter de votre projet
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              /* État par défaut */
              <div className="space-y-6">
                <div>
                  <p className="text-white/20 text-[12px] font-mono tracking-[0.2em] uppercase mb-4">
                    Survolez un secteur
                  </p>
                  <div className="space-y-3">
                    {SECTORS.slice(0, 6).map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => openModal("contact")}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="flex items-center gap-3 w-full group"
                      >
                        <span
                          className="w-1 h-4 rounded-full flex-shrink-0 transition-all duration-200"
                          style={{
                            background: `rgba(212,175,90,${0.15 + i * 0.05})`,
                          }}
                        />
                        <span className="text-white/40 text-[13px] group-hover:text-white/70 transition-colors">
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="h-px"
                  style={{ background: "linear-gradient(90deg, rgba(212,175,90,0.2), transparent)" }}
                />

                <div className="space-y-3">
                  {SECTORS.slice(6).map((s, i) => (
                    <button
                      key={s.name}
                      onClick={() => openModal("contact")}
                      onMouseEnter={() => setHovered(i + 6)}
                      onMouseLeave={() => setHovered(null)}
                      className="flex items-center gap-3 w-full group"
                    >
                      <span
                        className="w-1 h-4 rounded-full flex-shrink-0 transition-all duration-200"
                        style={{ background: `rgba(212,175,90,${0.15 + i * 0.04})` }}
                      />
                      <span className="text-white/40 text-[13px] group-hover:text-white/70 transition-colors">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div
                  className="rounded-xl p-5 mt-4"
                  style={{ background: "rgba(212,175,90,0.05)", border: "1px solid rgba(212,175,90,0.12)" }}
                >
                  <p className="text-white/50 text-[13px] leading-relaxed mb-4">
                    Votre secteur n&apos;est pas dans la liste ? Nous intervenons dans tout écosystème nécessitant une transformation digitale.
                  </p>
                  <button
                    onClick={() => openModal("contact")}
                    className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider transition-all duration-200"
                    style={{ color: "#D4AF5A" }}
                  >
                    Parlons-en
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4h8M5.5 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 flex justify-center transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
          }}
        >
          <button
            onClick={() => openModal("audit")}
            className="inline-flex items-center gap-3 font-semibold text-[13.5px] rounded-full px-8 py-3.5 transition-all duration-200"
            style={{
              background: "rgba(212,175,90,0.1)",
              color: "#D4AF5A",
              border: "1px solid rgba(212,175,90,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A";
              (e.currentTarget as HTMLButtonElement).style.color = "#06080F";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,90,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#D4AF5A";
            }}
          >
            Demander un audit sectoriel
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="transition"] { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
