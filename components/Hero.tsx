"use client";

import { useModal } from "@/lib/ModalContext";
import { useEffect, useRef } from "react";

const EXPERTISE_LINKS = [
  { label: "Transformation Digitale",       slug: "strategie-digitale-transformation",   num: "01" },
  { label: "IA & Automatisation",            slug: "ia-automatisation",                   num: "02" },
  { label: "Marketing & Croissance",         slug: "marketing-croissance-digitale",       num: "03" },
  { label: "Data, CRM & Expérience client",  slug: "data-crm-experience-client",         num: "04" },
  { label: "Conseil Stratégique",            slug: "conseil-business-technologie",        num: "05" },
];

const METRICS = [
  { value: "12",   label: "Secteurs couverts" },
  { value: "5",    label: "Pôles d'expertise" },
  { value: "48h",  label: "Première réponse" },
  { value: "100%", label: "Missions sur-mesure" },
];

export default function Hero() {
  const { openModal } = useModal();
  const heroRef = useRef<HTMLElement>(null);

  /* One-time entrance animation */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(18px)";
      const delay = parseInt(item.dataset.reveal ?? "0", 10);
      setTimeout(() => {
        item.style.transition = "opacity 0.65s ease, transform 0.65s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, delay + i * 40);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#080D18] text-white"
      style={{ minHeight: "100svh", paddingTop: "140px", paddingBottom: "0" }}
    >

      {/* ── Background layer ───────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft glow top-right */}
        <div
          className="absolute top-[-80px] right-[-120px] w-[640px] h-[640px] rounded-full opacity-[0.055]"
          style={{ background: "radial-gradient(circle, #D4AF5A 0%, transparent 68%)" }}
        />
        {/* Cool blue bottom-left counter-glow */}
        <div
          className="absolute bottom-[60px] left-[-100px] w-[480px] h-[480px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #4B8FCC 0%, transparent 68%)" }}
        />

        {/* Constellation SVG — abstract West-Africa network */}
        <svg
          className="absolute right-0 top-0 h-full w-[50%] opacity-[0.11]"
          viewBox="0 0 600 800"
          fill="none"
          aria-hidden="true"
        >
          {/* Nodes */}
          {[
            [320, 120], [420, 200], [510, 160], [480, 310], [380, 370],
            [540, 420], [300, 460], [440, 530], [510, 600], [350, 640],
            [270, 320], [570, 280], [600, 500],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.4} fill="#D4AF5A" />
          ))}
          {/* Connections */}
          {[
            [320,120, 420,200], [420,200, 510,160], [420,200, 480,310],
            [510,160, 570,280], [480,310, 380,370], [480,310, 540,420],
            [570,280, 540,420], [380,370, 300,460], [540,420, 440,530],
            [440,530, 510,600], [300,460, 350,640], [440,530, 350,640],
            [270,320, 380,370], [270,320, 300,460], [510,600, 600,500],
          ].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF5A" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Single vertical rule — editorial spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.025] hidden lg:block" />
      </div>

      {/* ── Main content ───────────────────────────────── */}
      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Institutional signature — top line, no pill */}
        <div data-reveal="0" className="flex items-center gap-3 mb-12">
          <span className="w-5 h-px bg-[#D4AF5A]/60" />
          <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/70 select-none">
            Cabinet de conseil&nbsp;&nbsp;·&nbsp;&nbsp;Sénégal&nbsp;&nbsp;·&nbsp;&nbsp;Afrique de l&apos;Ouest
          </span>
        </div>

        {/* Primary grid */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-x-20 gap-y-12 items-start">

          {/* LEFT — headline + body + CTAs */}
          <div className="max-w-[720px]">
            {/* Editorial headline — full width, no word accent inside the line */}
            <h1 data-reveal="80" className="font-display font-semibold leading-[1.04] mb-8"
              style={{ fontSize: "clamp(42px, 5.6vw, 78px)" }}>
              <span className="block text-white">Nous transformons</span>
              <span className="block text-white">les entreprises africaines</span>
              <span className="block" style={{ color: "#D4AF5A" }}>grâce au digital et à l&apos;IA.</span>
            </h1>

            <p data-reveal="160" className="text-white/55 leading-[1.75] mb-10 max-w-[540px]"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)" }}>
              Nous accompagnons les dirigeants, entreprises et institutions dans leur transformation
              digitale, l&apos;intégration de l&apos;intelligence artificielle et l&apos;amélioration de leur performance.
              Une expertise stratégique internationale, un accompagnement ancré dans les réalités africaines.
            </p>

            {/* CTAs */}
            <div data-reveal="220" className="flex flex-wrap gap-3">
              <button
                onClick={() => openModal("audit")}
                className="hero-cta-primary group inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-200"
                style={{ background: "#D4AF5A", color: "#080D18", fontSize: "14.5px", padding: "14px 30px" }}
              >
                Demander un audit stratégique
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a
                href="/notre-approche"
                className="inline-flex items-center gap-2 font-medium rounded-full border transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", fontSize: "14.5px", padding: "14px 28px" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
                }}
              >
                Découvrir notre approche
              </a>
            </div>
          </div>

          {/* RIGHT — expertise editorial list */}
          <div data-reveal="100" className="hidden lg:flex flex-col min-w-[260px] pt-1">
            <p className="text-[10px] tracking-[2.5px] uppercase text-white/25 font-mono mb-5">
              Nos pôles d&apos;intervention
            </p>
            <nav>
              {EXPERTISE_LINKS.map(({ label, slug, num }) => (
                <a
                  key={slug}
                  href={`/expertises/${slug}`}
                  className="expertise-row group flex items-center gap-4 py-3.5 border-b border-white/[0.06] last:border-b-0 transition-all duration-200"
                >
                  <span className="font-mono text-[10px] text-white/20 group-hover:text-[#D4AF5A] transition-colors w-6 shrink-0">
                    {num}
                  </span>
                  <span className="text-[13.5px] font-medium text-white/50 group-hover:text-white transition-colors">
                    {label}
                  </span>
                  <svg
                    width="12" height="10" viewBox="0 0 12 10" fill="none"
                    className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                  >
                    <path d="M1 5h10M7 1l4 4-4 4" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </nav>
            <button
              onClick={() => openModal("devis")}
              className="mt-6 text-[12px] text-white/30 hover:text-white/60 transition-colors text-left"
            >
              Obtenir une estimation →
            </button>
          </div>
        </div>

        {/* ── Metrics strip — full width, bottom of hero ── */}
        <div
          data-reveal="300"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.08]"
        >
          {METRICS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-7 px-2 ${i < METRICS.length - 1 ? "md:border-r border-white/[0.06]" : ""}`}
            >
              <div
                className="font-display font-semibold leading-none mb-1.5"
                style={{ fontSize: "clamp(26px, 3vw, 38px)", color: "#D4AF5A" }}
              >
                {value}
              </div>
              <div className="text-[12px] text-white/35 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        .hero-cta-primary:hover { background: #E0BB3F !important; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
