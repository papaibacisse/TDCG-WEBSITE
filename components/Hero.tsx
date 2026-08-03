"use client";

import { useModal } from "@/lib/ModalContext";
import { useCountUp } from "@/lib/useCountUp";

export default function Hero() {
  const { openModal } = useModal();
  const orgs = useCountUp(40, "+");
  const satisfaction = useCountUp(96, "%");

  return (
    <section className="relative overflow-hidden bg-navy text-white pt-[190px] pb-[140px]">
      <svg className="absolute inset-0 opacity-35 pointer-events-none" viewBox="0 0 1240 700" preserveAspectRatio="xMidYMid slice">
        <g stroke="#C9A227" strokeWidth={1} fill="none" opacity={0.6}>
          <path d="M900 700 C 880 560, 950 480, 920 380 C 900 320, 960 260, 940 180" />
          <path d="M900 700 C 860 600, 800 540, 820 440 C 830 380, 780 320, 800 240" />
          <path d="M900 700 C 940 580, 1000 520, 980 420 C 970 360, 1030 300, 1010 220" />
          <path d="M920 380 C 950 350, 990 350, 1010 320" />
          <path d="M820 440 C 790 410, 750 410, 730 380" />
          <path d="M980 420 C 1020 400, 1060 400, 1080 370" />
        </g>
      </svg>

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8 grid md:grid-cols-[1.15fr_.85fr] gap-16 items-end">
        <div>
          <h1 className="font-display font-semibold text-[clamp(40px,5.2vw,68px)] leading-[1.05] max-w-[640px]">
            Transformer vos <em className="italic text-gold font-medium">idées</em> en résultats.
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-[480px]">
            Teranga Digital Consulting Group accompagne entreprises, institutions et startups dans leur transformation
            digitale, leur stratégie et leur croissance — avec l&apos;exigence d&apos;un cabinet international et
            l&apos;ancrage d&apos;un partenaire local.
          </p>
          <div className="flex gap-4 flex-wrap mt-10">
            <button
              onClick={() => openModal("audit")}
              className="bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors"
            >
              Demander un audit
            </button>
            <a
              href="#expertise"
              className="border border-white/30 text-white font-semibold text-[14.5px] rounded-sm px-7 py-4 hover:bg-white/10 transition-colors"
            >
              Découvrir nos expertises →
            </a>
          </div>
        </div>

        <div className="flex flex-col border-l border-white/15 pl-10">
          <div className="py-[18px] border-b border-white/10">
            <div ref={orgs.ref as any} className="font-display text-[34px] font-semibold">
              <span className="text-gold">{orgs.value}</span>
            </div>
            <div className="text-[13px] text-white/55 mt-0.5">Organisations accompagnées</div>
          </div>
          <div className="py-[18px] border-b border-white/10">
            <div className="font-display text-[34px] font-semibold"><span className="text-gold">12</span> secteurs</div>
            <div className="text-[13px] text-white/55 mt-0.5">D&apos;expertise couverts</div>
          </div>
          <div className="py-[18px]">
            <div ref={satisfaction.ref as any} className="font-display text-[34px] font-semibold">
              <span className="text-gold">{satisfaction.value}</span>
            </div>
            <div className="text-[13px] text-white/55 mt-0.5">Taux de satisfaction client</div>
          </div>
        </div>
      </div>
    </section>
  );
}
