"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Users, Target } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { EXPERTISE_DOMAINS } from "@/lib/constants";

type Expertise = typeof EXPERTISE_DOMAINS[number];

const ACCENT_COLORS = [
  { text: "text-[#D4AF5A]", border: "border-[#D4AF5A]/30", bg: "bg-[#D4AF5A]/10", dot: "bg-[#D4AF5A]" },
  { text: "text-[#6AB5FF]", border: "border-[#6AB5FF]/30", bg: "bg-[#6AB5FF]/10", dot: "bg-[#6AB5FF]" },
  { text: "text-[#6AFFB4]", border: "border-[#6AFFB4]/30", bg: "bg-[#6AFFB4]/10", dot: "bg-[#6AFFB4]" },
  { text: "text-[#B56AFF]", border: "border-[#B56AFF]/30", bg: "bg-[#B56AFF]/10", dot: "bg-[#B56AFF]" },
  { text: "text-[#FF9A6A]", border: "border-[#FF9A6A]/30", bg: "bg-[#FF9A6A]/10", dot: "bg-[#FF9A6A]" },
];

export default function ExpertisePageClient({
  expertise,
  prev,
  next,
}: {
  expertise: Expertise;
  prev: Expertise | null;
  next: Expertise | null;
}) {
  const { openModal } = useModal();
  const index = EXPERTISE_DOMAINS.findIndex((e) => e.slug === expertise.slug);
  const accent = ACCENT_COLORS[index] ?? ACCENT_COLORS[0];

  return (
    <main className="min-h-screen bg-[#080D18]">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Fond lumineux */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 70% 30%, ${accent.dot.replace("bg-[", "").replace("]", "")} 0%, transparent 60%)`,
          }}
        />

        <div className="max-w-[1240px] mx-auto px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[13px] text-white/40 mb-10">
            <Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/#expertise" className="hover:text-white/70 transition-colors">Expertises</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{expertise.name}</span>
          </div>

          <div className="grid md:grid-cols-[1fr_360px] gap-16 items-start">
            <div>
              {/* Numéro */}
              <span className={`font-mono text-[12px] tracking-[3px] uppercase ${accent.text} mb-4 block`}>
                {expertise.num} — Expertise
              </span>

              {/* Titre */}
              <h1 className="font-display text-[clamp(32px,4.5vw,58px)] text-white leading-tight mb-4">
                {expertise.name}
              </h1>

              {/* Tagline */}
              <p className={`text-[18px] font-medium mb-6 ${accent.text}`}>
                {expertise.tagline}
              </p>

              {/* Description longue */}
              <p className="text-white/60 text-[16.5px] leading-relaxed max-w-[580px] mb-10">
                {expertise.longDescription}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal(expertise.cta.action)}
                  className="flex items-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  {expertise.cta.label}
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => openModal("contact")}
                  className="flex items-center gap-2 text-white border border-white/20 hover:border-white/40 text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  Nous contacter
                </button>
              </div>
            </div>

            {/* Carte récapitulative */}
            <div className={`bg-[#0F1526] border ${accent.border} rounded-2xl p-7`}>
              <h3 className="text-white/50 text-[11px] uppercase tracking-[2px] font-semibold mb-5">Ce que nous proposons</h3>
              <ul className="flex flex-col gap-3">
                {expertise.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px] text-white/80">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className={`mt-6 pt-6 border-t border-white/[0.06]`}>
                <h3 className="text-white/50 text-[11px] uppercase tracking-[2px] font-semibold mb-4">Nos cibles</h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.targets.map((t) => (
                    <span key={t} className={`text-[12px] ${accent.text} ${accent.bg} ${accent.border} border rounded-full px-3 py-1`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B0F1E]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className={`inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider ${accent.text} mb-4`}>
            <span className={`w-6 h-px ${accent.dot}`} /> Nos services
          </div>
          <h2 className="font-display text-[clamp(26px,3vw,40px)] text-white mb-16">
            Comment nous intervenons
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {expertise.services.map((service, i) => (
              <div
                key={service.title}
                className={`group bg-[#0F1526] border border-white/[0.07] hover:border-white/20 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-8 h-8 rounded-lg ${accent.bg} flex items-center justify-center mb-4`}>
                  <span className={`font-mono text-[12px] font-bold ${accent.text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-3 leading-snug">{service.title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉSULTATS ATTENDUS ───────────────────────────────────────── */}
      <section className="py-24 bg-[#080D18]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider ${accent.text} mb-4`}>
                <span className={`w-6 h-px ${accent.dot}`} /> Résultats
              </div>
              <h2 className="font-display text-[clamp(26px,3vw,40px)] text-white mb-6">
                Ce que vous gagnez concrètement
              </h2>
              <p className="text-white/55 text-[16px] leading-relaxed mb-8">
                Chaque mission TDCG est pilotée par des indicateurs de performance concrets, définis avec vous en amont, et suivis tout au long de l&apos;accompagnement.
              </p>

              <div className="flex flex-col gap-4">
                {expertise.results.map((result) => (
                  <div key={result} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className={`shrink-0 mt-0.5 ${accent.text}`} />
                    <span className="text-white/80 text-[15px]">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA bloc */}
            <div className={`bg-[#0F1526] border ${accent.border} rounded-2xl p-10`}>
              <Target size={32} className={`mb-5 ${accent.text}`} />
              <h3 className="font-display text-[26px] text-white mb-4">
                Prêt à passer à l&apos;action ?
              </h3>
              <p className="text-white/55 text-[14.5px] leading-relaxed mb-8">
                Un premier échange de 30 minutes suffit pour évaluer votre situation et vous proposer un plan d&apos;action concret.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => openModal(expertise.cta.action)}
                  className="w-full flex items-center justify-center gap-2 bg-[#D4AF5A] hover:bg-[#E0BB3F] text-black font-semibold text-[15px] rounded-full px-8 py-4 transition-colors"
                >
                  {expertise.cta.label}
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => openModal("devis")}
                  className="w-full flex items-center justify-center text-white border border-white/15 hover:border-white/30 text-[14px] rounded-full px-8 py-3.5 transition-colors"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTRES EXPERTISES ───────────────────────────────────────── */}
      <section className="py-20 bg-[#0B0F1E] border-t border-white/[0.05]">
        <div className="max-w-[1240px] mx-auto px-8">
          <h2 className="text-white/40 text-[13px] uppercase tracking-[2.5px] font-semibold mb-8">
            Nos autres expertises
          </h2>
          <div className="flex flex-wrap gap-3">
            {EXPERTISE_DOMAINS.filter((e) => e.slug !== expertise.slug).map((e, i) => {
              const a = ACCENT_COLORS[EXPERTISE_DOMAINS.findIndex((d) => d.slug === e.slug)] ?? ACCENT_COLORS[0];
              return (
                <Link
                  key={e.slug}
                  href={`/expertises/${e.slug}`}
                  className={`group flex items-center gap-2.5 bg-[#0F1526] border border-white/[0.07] hover:border-white/20 rounded-full px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <span className={`font-mono text-[10px] ${a.text}`}>{e.num}</span>
                  <span className="text-white/70 text-[13.5px] group-hover:text-white transition-colors">{e.name}</span>
                  <ChevronRight size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION PREV / NEXT ───────────────────────────────────── */}
      <div className="border-t border-white/[0.05] bg-[#080D18]">
        <div className="max-w-[1240px] mx-auto px-8 py-8 flex justify-between items-center">
          {prev ? (
            <Link
              href={`/expertises/${prev.slug}`}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[14px]">
                <span className="block text-[11px] text-white/30 mb-0.5">Précédent</span>
                {prev.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/expertises/${next.slug}`}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group text-right"
            >
              <span className="text-[14px]">
                <span className="block text-[11px] text-white/30 mb-0.5">Suivant</span>
                {next.name}
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
