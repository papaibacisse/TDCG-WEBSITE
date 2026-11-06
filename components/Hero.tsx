"use client";

import { useModal } from "@/lib/ModalContext";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "11",    sup: "",    label: "secteurs\naccompagnés" },
  { value: "5",     sup: "",    label: "pôles\nd'expertise" },
  { value: "48h",   sup: "",    label: "première\nréponse" },
  { value: "100",   sup: "%",   label: "missions\nsur-mesure" },
];

const TRUST_ITEMS = [
  "Transformation Digitale",
  "IA & Automatisation",
  "Marketing & Croissance",
  "Data & CRM",
  "Conseil Stratégique",
  "Sénégal · Afrique de l'Ouest",
];

export default function Hero() {
  const { openModal } = useModal();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Mask-reveal on title lines
    const lines = el.querySelectorAll<HTMLElement>(".hero-line");
    lines.forEach((line, i) => {
      line.style.clipPath = "inset(0 0 100% 0)";
      line.style.opacity = "1";
      setTimeout(() => {
        line.style.transition = `clip-path 0.9s cubic-bezier(0.16,1,0.3,1)`;
        line.style.clipPath = "inset(0 0 0% 0)";
      }, 180 + i * 130);
    });

    // Fade items
    const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
    fades.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(14px)";
      const delay = parseInt(item.dataset.fade ?? "0", 10);
      setTimeout(() => {
        item.style.transition = "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative text-white overflow-hidden"
      style={{
        minHeight: "100svh",
        background: "#06080F",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Background layer ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">

        {/* Topographic grid — cartographic, African continent feel */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.038 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="topo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#D4AF5A" strokeWidth="0.5"/>
            </pattern>
            <pattern id="topo2" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
              <circle cx="200" cy="200" r="120" fill="none" stroke="#D4AF5A" strokeWidth="0.4"/>
              <circle cx="200" cy="200" r="80" fill="none" stroke="#D4AF5A" strokeWidth="0.3"/>
              <circle cx="200" cy="200" r="40" fill="none" stroke="#D4AF5A" strokeWidth="0.3"/>
              <line x1="0" y1="200" x2="400" y2="200" stroke="#D4AF5A" strokeWidth="0.25"/>
              <line x1="200" y1="0" x2="200" y2="400" stroke="#D4AF5A" strokeWidth="0.25"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)"/>
          <rect width="100%" height="100%" fill="url(#topo2)"/>
        </svg>

        {/* Gold halo — bottom left only, editorial asymmetry */}
        <div
          className="absolute"
          style={{
            bottom: "-200px",
            left: "-150px",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,90,0.11) 0%, rgba(212,175,90,0.04) 35%, transparent 65%)",
          }}
        />

        {/* Top vignette */}
        <div
          className="absolute top-0 inset-x-0 h-32"
          style={{ background: "linear-gradient(to bottom, #06080F, transparent)" }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.022,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px",
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div
        className="relative z-[2] flex-1 flex flex-col"
        style={{
          paddingTop: "clamp(90px, 10vw, 120px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
          maxWidth: "1360px",
          margin: "0 auto",
          width: "100%",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >

        {/* ── Top identifier ── */}
        <div data-fade="100" className="flex items-center gap-4 mb-10 md:mb-14">
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "linear-gradient(90deg, #D4AF5A, transparent)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "rgba(212,175,90,0.75)",
              fontFamily: "var(--font-mono, monospace)",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Teranga Digital Consulting Group
          </span>
          <div
            style={{
              width: "1px",
              height: "14px",
              background: "rgba(212,175,90,0.2)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "var(--font-mono, monospace)",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Dakar · Afrique
          </span>
        </div>

        {/* ── Core layout: title + stats ── */}
        <div className="flex-1 flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">

          {/* LEFT — Headline block */}
          <div className="flex-1 min-w-0">

            {/* The headline — editorial, massive, 2 lines */}
            <h1
              className="font-display font-bold leading-[0.95] mb-10"
              style={{ fontSize: "clamp(52px, 8.5vw, 118px)", letterSpacing: "-0.02em" }}
            >
              {/* Line 1 — white */}
              <span
                className="hero-line block"
                style={{ color: "#FFFFFF" }}
              >
                Performance
              </span>

              {/* Line 2 — gold, slightly inset for editorial rhythm */}
              <span
                className="hero-line block"
                style={{
                  color: "#D4AF5A",
                  paddingLeft: "clamp(0px, 1.5vw, 24px)",
                  display: "block",
                }}
              >
                par le digital.
              </span>

              {/* Line 3 — white, lighter weight */}
              <span
                className="hero-line block"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                L&apos;IA au service
              </span>
              <span
                className="hero-line block"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                de l&apos;Afrique.
              </span>
            </h1>

            {/* Sub — restrained, one idea */}
            <p
              data-fade="700"
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: "1.72",
                color: "rgba(255,255,255,0.46)",
                maxWidth: "520px",
                marginBottom: "clamp(36px, 5vw, 52px)",
              }}
            >
              Nous accompagnons les dirigeants et institutions africaines dans leur transformation
              digitale, l&apos;intégration de l&apos;IA et l&apos;amélioration durable de leur performance.
            </p>

            {/* CTAs */}
            <div data-fade="850" className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openModal("audit")}
                className="hero-cta-gold group flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #D4AF5A 0%, #C9A44E 100%)",
                  color: "#06080F",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  padding: "17px 36px",
                  borderRadius: "2px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 0 0 rgba(212,175,90,0)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Demander un audit
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <a
                href="/notre-approche"
                className="hero-cta-ghost flex items-center gap-2"
                style={{
                  color: "rgba(255,255,255,0.52)",
                  fontWeight: 500,
                  fontSize: "13.5px",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  padding: "17px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
              >
                Notre approche
              </a>
            </div>
          </div>

          {/* RIGHT — Stats column, vertical */}
          <div
            data-fade="600"
            className="hidden lg:flex flex-col gap-0"
            style={{
              minWidth: "200px",
              paddingBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: "9.5px",
                letterSpacing: "3px",
                color: "rgba(255,255,255,0.18)",
                fontFamily: "var(--font-mono, monospace)",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              Chiffres clés
            </div>

            {STATS.map(({ value, sup, label }, i) => (
              <div
                key={label}
                style={{
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: "clamp(42px, 4vw, 56px)",
                    color: i === 0 ? "#D4AF5A" : "rgba(255,255,255,0.78)",
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  {value}
                  {sup && (
                    <sup style={{ fontSize: "0.45em", verticalAlign: "super", letterSpacing: 0, color: i === 0 ? "#D4AF5A" : "rgba(255,255,255,0.5)" }}>
                      {sup}
                    </sup>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "rgba(255,255,255,0.3)",
                    lineHeight: "1.5",
                    whiteSpace: "pre-line",
                    fontWeight: 400,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom trust band ── */}
        <div
          data-fade="1000"
          className="mt-14 lg:mt-16"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "clamp(20px, 2.5vw, 32px)",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span
              style={{
                fontSize: "9.5px",
                letterSpacing: "3px",
                color: "rgba(255,255,255,0.16)",
                fontFamily: "var(--font-mono, monospace)",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              Expertises
            </span>
            <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
            {TRUST_ITEMS.map((item, i) => (
              <span
                key={item}
                style={{
                  fontSize: "12.5px",
                  color: i === TRUST_ITEMS.length - 1
                    ? "rgba(212,175,90,0.5)"
                    : "rgba(255,255,255,0.28)",
                  fontWeight: i === TRUST_ITEMS.length - 1 ? 400 : 400,
                  letterSpacing: i === TRUST_ITEMS.length - 1 ? "0.08em" : "0",
                  fontFamily: i === TRUST_ITEMS.length - 1
                    ? "var(--font-mono, monospace)"
                    : "inherit",
                }}
              >
                {item}
                {i < TRUST_ITEMS.length - 2 && (
                  <span style={{ color: "rgba(255,255,255,0.1)", marginLeft: "8px" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── Scroll indicator — right edge ── */}
      <div
        data-fade="1200"
        className="hidden lg:flex absolute right-10 bottom-10 flex-col items-center gap-3"
        style={{ zIndex: 3 }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "1px",
            height: "56px",
            background: "linear-gradient(to bottom, rgba(212,175,90,0.4), transparent)",
          }}
        />
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "var(--font-mono, monospace)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-line {
            clip-path: none !important;
            transition: none !important;
          }
          [data-fade] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        .hero-cta-gold:hover {
          background: linear-gradient(135deg, #E8C96A 0%, #D4AF5A 100%) !important;
          box-shadow: 0 8px 40px rgba(212,175,90,0.28) !important;
          transform: translateY(-1px);
        }

        .hero-cta-ghost:hover {
          color: rgba(255,255,255,0.88) !important;
          border-bottom-color: rgba(255,255,255,0.5) !important;
        }
      `}</style>
    </section>
  );
}
