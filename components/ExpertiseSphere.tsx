"use client";

import { useEffect, useRef, useState } from "react";
import {
  Compass, Cpu, TrendingUp, Database, Briefcase, ArrowRight,
} from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useExpertise } from "@/lib/ExpertiseContext";
import { EXPERTISE_DOMAINS } from "@/lib/constants";

const ICONS = [Compass, Cpu, TrendingUp, Database, Briefcase];

const ACCENT_COLORS = ["#D4AF5A", "#6AB5FF", "#6AFFB4", "#B56AFF", "#FF9A6A"];

const ICON_COLORS = [
  "text-[#D4AF5A]",
  "text-[#6AB5FF]",
  "text-[#6AFFB4]",
  "text-[#B56AFF]",
  "text-[#FF9A6A]",
];

export default function ExpertiseSphere() {
  const { openModal } = useModal();
  const { pendingIndex, clearPending } = useExpertise();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Réagir à l'ouverture d'une expertise depuis la navbar
  useEffect(() => {
    if (pendingIndex === null) return;
    setActiveIndex(pendingIndex);
    clearPending();
  }, [pendingIndex, clearPending]);

  /* Scroll reveal */
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const active = EXPERTISE_DOMAINS[activeIndex];
  const accentColor = ACCENT_COLORS[activeIndex];

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-[#070C18] py-[120px] scroll-mt-24 overflow-hidden"
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.04] transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at top right, ${accentColor} 0%, transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at bottom left, #D4AF5A 0%, transparent 65%)" }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Section header */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#D4AF5A]/60" />
            <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70">
              Nos expertises
            </span>
          </div>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-display font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
            >
              Cinq pôles d&apos;expertise.<br />
              <span style={{ color: "#D4AF5A" }}>Une ambition commune.</span>
            </h2>
            <p className="text-white/40 text-[14.5px] leading-relaxed max-w-[340px]">
              Cliquez sur un domaine pour découvrir les services associés et démarrer votre projet.
            </p>
          </div>
        </div>

        {/* Main layout: numbered list LEFT + featured panel RIGHT */}
        <div
          className="grid lg:grid-cols-[340px_1fr] gap-6 items-start"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
          }}
        >
          {/* LEFT — vertical numbered list */}
          <div className="flex flex-col divide-y divide-white/[0.05]">
            {EXPERTISE_DOMAINS.map((domain, i) => {
              const Icon = ICONS[i];
              const isActive = activeIndex === i;
              return (
                <button
                  key={domain.slug}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="group flex items-center gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF5A]/40 rounded"
                  aria-pressed={isActive}
                >
                  {/* Active indicator bar */}
                  <span
                    className="shrink-0 w-0.5 h-10 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? ACCENT_COLORS[i] : "rgba(255,255,255,0.07)",
                    }}
                  />

                  {/* Number */}
                  <span
                    className="shrink-0 font-mono text-[11px] tracking-[2px] w-6 transition-colors duration-200"
                    style={{ color: isActive ? ACCENT_COLORS[i] : "rgba(255,255,255,0.20)" }}
                  >
                    {domain.num}
                  </span>

                  {/* Icon */}
                  <span
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: isActive
                        ? `${ACCENT_COLORS[i]}18`
                        : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <Icon
                      size={17}
                      className={`transition-colors duration-200 ${isActive ? ICON_COLORS[i] : "text-white/30"}`}
                    />
                  </span>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[14px] font-medium leading-snug transition-colors duration-200"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}
                    >
                      {domain.name}
                    </p>
                    {isActive && (
                      <p className="text-[11.5px] text-white/35 mt-0.5 leading-snug">
                        {domain.items.slice(0, 2).join(" · ")}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={14}
                    className="shrink-0 transition-all duration-200"
                    style={{
                      color: isActive ? accentColor : "rgba(255,255,255,0.12)",
                      transform: isActive ? "translateX(2px)" : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT — featured expertise panel */}
          <div className="lg:sticky lg:top-28">
            <div
              key={activeIndex}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(15,21,38,0.8)",
                border: `1px solid ${accentColor}22`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
                }}
              />

              <div className="p-8 md:p-10">
                {/* Domain header */}
                <div className="flex items-start gap-4 mb-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${accentColor}15` }}
                  >
                    {(() => {
                      const Icon = ICONS[activeIndex];
                      return <Icon size={22} className={ICON_COLORS[activeIndex]} />;
                    })()}
                  </div>
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[2.5px] uppercase block mb-1"
                      style={{ color: `${accentColor}80` }}
                    >
                      Pôle {active.num}
                    </span>
                    <h3 className="font-display font-semibold text-white text-[22px] leading-snug">
                      {active.name}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <p
                  className="text-[13px] font-mono tracking-wide mb-5 leading-snug"
                  style={{ color: accentColor }}
                >
                  &ldquo;{active.tagline}&rdquo;
                </p>

                {/* Description */}
                <p className="text-white/60 text-[14.5px] leading-relaxed mb-7">
                  {active.description}
                </p>

                {/* Services grid */}
                <div className="mb-7">
                  <p className="font-mono text-[10px] tracking-[2.5px] uppercase text-white/30 mb-3">
                    Services inclus
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.items.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] rounded-full px-3 py-1 transition-colors"
                        style={{
                          background: `${accentColor}10`,
                          color: "rgba(255,255,255,0.55)",
                          border: `1px solid ${accentColor}20`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {active.results && active.results.length > 0 && (
                  <div className="mb-8 grid grid-cols-3 gap-3">
                    {active.results.slice(0, 3).map((r: string) => {
                      const [val, ...rest] = r.split(" ");
                      return (
                        <div
                          key={r}
                          className="rounded-xl p-3 text-center"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <div
                            className="font-display font-semibold text-[20px] leading-none mb-1"
                            style={{ color: accentColor }}
                          >
                            {val}
                          </div>
                          <div className="text-white/35 text-[10.5px] leading-snug">
                            {rest.join(" ")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (active.slug === "marketing-croissance-digitale") {
                        const el = document.getElementById("roi-simulateur");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        } else {
                          window.location.href = "/#roi-simulateur";
                        }
                      } else {
                        openModal(active.cta.action);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2.5 font-semibold text-[13.5px] rounded-full py-3.5 transition-colors duration-200"
                    style={{ background: accentColor, color: "#080D18" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter = "";
                    }}
                  >
                    {active.cta.label}
                    <ArrowRight size={14} />
                  </button>
                  <a
                    href={`/expertises/${active.slug}`}
                    className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 text-[13.5px] border border-white/[0.10] hover:border-white/20 rounded-full px-5 py-3.5 transition-colors duration-200"
                  >
                    Voir la page →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation dots — mobile only */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
          {EXPERTISE_DOMAINS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: activeIndex === i ? "20px" : "6px",
                height: "6px",
                background: activeIndex === i ? ACCENT_COLORS[i] : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
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
