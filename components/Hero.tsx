"use client";

import { useModal } from "@/lib/ModalContext";
import { useEffect, useRef } from "react";

const SECTORS_PREVIEW = [
  "Administration publique",
  "Finance & Banque",
  "Santé",
  "Agriculture",
  "Télécommunications",
  "ONG & Institutions",
  "Commerce & Distribution",
  "Startups",
  "Éducation",
  "Industrie",
];

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

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      const delay = parseInt(item.dataset.reveal ?? "0", 10);
      setTimeout(() => {
        item.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, delay + i * 35);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden text-white"
      style={{ minHeight: "100svh", paddingTop: "110px", paddingBottom: "0", background: "#07090F" }}
    >

      {/* ── Background ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.028]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        {/* Primary gold glow — top right */}
        <div className="absolute top-[-120px] right-[-80px] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,90,0.09) 0%, transparent 65%)" }} />

        {/* Secondary gold glow — center left */}
        <div className="absolute top-[30%] left-[-180px] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,90,0.04) 0%, transparent 65%)" }} />

        {/* Blue accent — bottom right */}
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)" }} />

        {/* Horizontal rule at header bottom */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF5A]/20 to-transparent" />

        {/* Constellation SVG */}
        <svg className="absolute right-0 top-0 h-full w-[52%] opacity-[0.14]"
          viewBox="0 0 600 800" fill="none" aria-hidden="true">
          {[
            [320,120],[420,200],[510,160],[480,310],[380,370],
            [540,420],[300,460],[440,530],[510,600],[350,640],
            [270,320],[570,280],[600,500],[450,680],[580,720],
          ].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={i%3===0?2.8:1.6} fill="#D4AF5A" opacity={i%3===0?0.9:0.5}/>
          ))}
          {[
            [320,120,420,200],[420,200,510,160],[420,200,480,310],
            [510,160,570,280],[480,310,380,370],[480,310,540,420],
            [570,280,540,420],[380,370,300,460],[540,420,440,530],
            [440,530,510,600],[300,460,350,640],[440,530,350,640],
            [270,320,380,370],[270,320,300,460],[510,600,600,500],
            [510,600,450,680],[450,680,580,720],
          ].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF5A" strokeWidth="0.6" opacity="0.4"/>
          ))}
        </svg>

        {/* Subtle vertical spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent)" }} />
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* ── Institutional signature — visible badge ── */}
        <div data-reveal="0" className="flex items-center gap-3 mb-8 mt-6">
          {/* Gold accent bar */}
          <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #D4AF5A, #E8C96A)" }} />
          {/* Badge pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border"
            style={{ borderColor: "rgba(212,175,90,0.3)", background: "rgba(212,175,90,0.06)" }}>
            {/* Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[2.5px] uppercase"
              style={{ color: "rgba(212,175,90,0.9)" }}>
              Cabinet de conseil
            </span>
            <span className="w-px h-3 bg-[#D4AF5A]/25" />
            <span className="font-mono text-[11px] tracking-[2.5px] uppercase"
              style={{ color: "rgba(212,175,90,0.7)" }}>
              Sénégal
            </span>
            <span className="w-px h-3 bg-[#D4AF5A]/25" />
            <span className="font-mono text-[11px] tracking-[2.5px] uppercase"
              style={{ color: "rgba(212,175,90,0.7)" }}>
              Afrique de l&apos;Ouest
            </span>
          </div>
        </div>

        {/* Primary grid */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-x-20 gap-y-12 items-start">

          {/* LEFT */}
          <div className="max-w-[720px]">
            <h1 data-reveal="80" className="font-display font-semibold leading-[1.06] mb-6"
              style={{ fontSize: "clamp(34px, 4.2vw, 60px)" }}>
              <span className="block text-white">Nous transformons</span>
              <span className="block text-white">les entreprises africaines</span>
              <span className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #D4AF5A 0%, #F0D080 50%, #D4AF5A 100%)" }}>
                grâce au digital et à l&apos;IA.
              </span>
            </h1>

            <p data-reveal="160" className="leading-[1.75] mb-8 max-w-[540px]"
              style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: "rgba(255,255,255,0.58)" }}>
              Nous accompagnons les dirigeants, entreprises et institutions dans leur transformation
              digitale, l&apos;intégration de l&apos;intelligence artificielle et l&apos;amélioration de leur performance.
              Une expertise stratégique internationale, un accompagnement ancré dans les réalités africaines.
            </p>

            {/* CTAs */}
            <div data-reveal="220" className="flex flex-wrap gap-3">
              <button
                onClick={() => openModal("audit")}
                className="hero-cta-primary group inline-flex items-center gap-2.5 font-semibold rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #D4AF5A 0%, #E8C96A 100%)",
                  color: "#07090F",
                  fontSize: "14.5px",
                  padding: "15px 32px",
                  boxShadow: "0 4px 24px rgba(212,175,90,0.25)",
                }}
              >
                Demander un audit stratégique
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a
                href="/notre-approche"
                className="cta-secondary inline-flex items-center gap-2 font-medium rounded-full border transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.70)",
                  fontSize: "14.5px",
                  padding: "15px 30px",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                Découvrir notre approche
              </a>
            </div>
          </div>

          {/* RIGHT — expertise list */}
          <div data-reveal="100" className="hidden lg:flex flex-col min-w-[270px] pt-1">
            <p className="text-[10px] tracking-[2.5px] uppercase font-mono mb-5"
              style={{ color: "rgba(255,255,255,0.22)" }}>
              Nos pôles d&apos;intervention
            </p>
            <nav className="rounded-xl overflow-hidden border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              {EXPERTISE_LINKS.map(({ label, slug, num }) => (
                <a
                  key={slug}
                  href={`/expertises/${slug}`}
                  className="expertise-row group flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.05] last:border-b-0 transition-all duration-200 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[10px] text-white/20 group-hover:text-[#D4AF5A] transition-colors w-6 shrink-0">
                    {num}
                  </span>
                  <span className="text-[13.5px] font-medium text-white/50 group-hover:text-white transition-colors flex-1">
                    {label}
                  </span>
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none"
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0">
                    <path d="M1 4.5h9M6.5 1l3.5 3.5L6.5 8" stroke="#D4AF5A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </nav>
            <button
              onClick={() => openModal("devis")}
              className="mt-4 text-[12px] transition-colors text-left px-1"
              style={{ color: "rgba(255,255,255,0.28)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
            >
              Obtenir une estimation →
            </button>
          </div>
        </div>

        {/* ── Metrics strip ── */}
        <div data-reveal="300"
          className="mt-10 grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-white/[0.07]"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          {METRICS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-5 px-6 ${i < METRICS.length - 1 ? "border-r border-white/[0.07]" : ""}`}
            >
              <div className="font-display font-semibold leading-none mb-1.5 bg-clip-text text-transparent"
                style={{ fontSize: "clamp(24px, 2.8vw, 36px)", backgroundImage: "linear-gradient(135deg, #D4AF5A, #E8C96A)" }}>
                {value}
              </div>
              <div className="text-[12px] tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Secteurs accompagnés — marquee ── */}
        <div data-reveal="380" className="mt-3 border border-white/[0.07] rounded-xl py-3.5 -mx-0 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="flex items-center gap-6 px-6">
            <span className="font-mono text-[10px] uppercase tracking-[2.5px] shrink-0 whitespace-nowrap"
              style={{ color: "rgba(212,175,90,0.55)" }}>
              Secteurs
            </span>
            <div className="w-px h-4 bg-white/10 shrink-0" />
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-5 w-max" style={{ animation: "marquee 30s linear infinite" }}>
                {[...SECTORS_PREVIEW, ...SECTORS_PREVIEW].map((s, i) => (
                  <span key={i} className="text-[12.5px] font-medium whitespace-nowrap px-3 py-1 rounded-full border border-white/[0.08] transition-colors"
                    style={{ color: "rgba(255,255,255,0.45)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          [style*="marquee"] { animation: none !important; }
        }
        .hero-cta-primary:hover {
          background: linear-gradient(135deg, #E8C96A 0%, #F5D97A 100%) !important;
          box-shadow: 0 6px 32px rgba(212,175,90,0.35) !important;
          transform: translateY(-1px);
        }
        .cta-secondary:hover {
          border-color: rgba(255,255,255,0.3) !important;
          color: rgba(255,255,255,0.92) !important;
          background: rgba(255,255,255,0.06) !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
