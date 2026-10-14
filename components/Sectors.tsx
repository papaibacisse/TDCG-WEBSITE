"use client";

import { useRef, useState, useEffect } from "react";
import {
  Landmark, LineChart, GraduationCap, HeartPulse, Sprout, ShoppingBag,
  Factory, HandHeart, Radio, Truck, Zap, Rocket,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { SECTORS, sectorSlug } from "@/lib/constants";

const ICONS = [
  Landmark, LineChart, GraduationCap, HeartPulse, Sprout, ShoppingBag,
  Factory, HandHeart, Radio, Truck, Zap, Rocket,
];

// Accent color per sector row
const ROW_ACCENTS = ["#D4AF5A", "#6AB5FF", "#6AFFB4"];

export default function Sectors() {
  const { openModal } = useModal();
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
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="secteurs"
      ref={sectionRef}
      className="relative bg-[#080D18] py-[120px] scroll-mt-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(212,175,90,0.6) 80px)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at center top, #D4AF5A 0%, transparent 65%)" }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div
          className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#D4AF5A]/60" />
              <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70">
                Secteurs d&apos;activité
              </span>
            </div>
            <h2
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
            >
              Une expertise transversale,<br />
              <span style={{ color: "#D4AF5A" }}>adaptée à chaque écosystème.</span>
            </h2>
          </div>
          <p className="text-white/40 text-[14.5px] leading-relaxed max-w-[340px] lg:pb-1">
            Douze secteurs clés de l&apos;économie sénégalaise et ouest-africaine, chacun avec ses enjeux propres — et une méthode TDCG qui s&apos;y adapte.
          </p>
        </div>

        {/* Sectors grid — 4 cols × 3 rows */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[i];
            const isHovered = hoveredIndex === i;
            const rowAccent = ROW_ACCENTS[Math.floor(i / 4)];
            const isLastRow = i >= 8;
            const isLastInRow = (i + 1) % 4 === 0;

            return (
              <button
                id={sectorSlug(sector.name)}
                key={sector.name}
                type="button"
                onClick={() => openModal("contact")}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col gap-3 text-left p-6 md:p-7 scroll-mt-28 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[#D4AF5A]/40"
                style={{
                  background: isHovered ? "rgba(255,255,255,0.04)" : "rgba(10,15,28,0.85)",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Top accent bar on hover */}
                <span
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${rowAccent}80, ${rowAccent}20)`,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isHovered ? `${rowAccent}18` : "rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isHovered ? rowAccent : "rgba(255,255,255,0.35)",
                      transition: "color 0.25s ease",
                    }}
                  />
                </div>

                {/* Name */}
                <h3
                  className="font-semibold text-[14px] leading-snug transition-colors duration-250"
                  style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.70)" }}
                >
                  {sector.name}
                </h3>

                {/* Description */}
                <p
                  className="text-[12.5px] leading-relaxed flex-1 transition-colors duration-250"
                  style={{ color: isHovered ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.30)" }}
                >
                  {sector.description}
                </p>

                {/* CTA link */}
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium transition-all duration-250 mt-1"
                  style={{ color: isHovered ? rowAccent : "rgba(255,255,255,0.20)" }}
                >
                  Découvrir
                  <svg
                    width="10" height="8" viewBox="0 0 10 8" fill="none"
                    style={{
                      transform: isHovered ? "translateX(2px)" : "none",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    <path d="M1 4h8M5.5 1l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
          }}
        >
          <p className="text-white/35 text-[13.5px]">
            Votre secteur n&apos;est pas dans la liste ?{" "}
            <button
              onClick={() => openModal("contact")}
              className="text-[#D4AF5A]/70 hover:text-[#D4AF5A] underline underline-offset-2 transition-colors"
            >
              Parlons-en directement.
            </button>
          </p>
          <button
            onClick={() => openModal("audit")}
            className="inline-flex items-center gap-2.5 font-semibold text-[13.5px] rounded-full px-6 py-3 transition-colors duration-200"
            style={{ background: "rgba(212,175,90,0.12)", color: "#D4AF5A", border: "1px solid rgba(212,175,90,0.25)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#D4AF5A";
              (e.currentTarget as HTMLButtonElement).style.color = "#080D18";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,90,0.12)";
              (e.currentTarget as HTMLButtonElement).style.color = "#D4AF5A";
            }}
          >
            Discuter de votre projet
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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
