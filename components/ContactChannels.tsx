"use client";

import { useRef, useState, useEffect } from "react";
import { useModal } from "@/lib/ModalContext";
import { SITE } from "@/lib/constants";

const CHANNELS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 4.5A1.5 1.5 0 013.5 3h13A1.5 1.5 0 0118 4.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 15.5v-11z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 5l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    accentColor: "#D4AF5A",
    label: "Par email",
    title: "Écrivez-nous",
    description: "Une question, un projet ou une demande de devis ? Notre équipe vous répond sous 48h avec une réponse précise.",
    cta: "contact" as const,
    ctaLabel: "Ouvrir le formulaire",
    detail: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 3.5C3 3.5 4.5 2 6 2s2.5 2 3 3.5c.5 1.5 0 2.5-1 3.5-.5.5 0 1.5 2 3.5s3 2.5 3.5 2c1-1 2-1.5 3.5-1 1.5.5 3.5 1.5 3.5 3s-1.5 3-3 3C7 18.5 1.5 13 1.5 7 1.5 5.5 2 3.5 3 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    accentColor: "#6AB5FF",
    label: "Par téléphone",
    title: "Appelez-nous",
    description: "Vous préférez un échange direct ? Nos consultants sont disponibles pour répondre à vos questions.",
    cta: null,
    ctaLabel: null,
    detail: {
      phone: SITE.phones[0],
      hours: [
        { days: "Lun – Jeu", time: "9h – 17h" },
        { days: "Vendredi", time: "8h30 – 13h  ·  15h – 18h" },
        { days: "Samedi", time: "9h – 12h" },
      ],
    },
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 11.5C17 15.09 13.87 18 10 18c-1.17 0-2.27-.28-3.23-.77L3 18l.9-3.4A7.17 7.17 0 013 11.5C3 7.91 6.13 5 10 5s7 2.91 7 6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7.5" cy="11.5" r="1" fill="currentColor"/>
        <circle cx="10" cy="11.5" r="1" fill="currentColor"/>
        <circle cx="12.5" cy="11.5" r="1" fill="currentColor"/>
      </svg>
    ),
    accentColor: "#6AFFB4",
    label: "Via WhatsApp",
    title: "WhatsApp",
    description: "Pour une réponse rapide en dehors des horaires bureaux, écrivez-nous directement sur WhatsApp.",
    cta: null,
    ctaLabel: "Ouvrir WhatsApp",
    whatsapp: SITE.whatsapp[0],
    detail: null,
  },
];

export default function ContactChannels() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact-canaux"
      ref={sectionRef}
      className="relative bg-[#0B0F1E] py-[100px] scroll-mt-24 overflow-hidden"
    >
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse at center, #D4AF5A 0%, transparent 65%)" }}
      />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#D4AF5A]/50" />
            <span className="font-mono text-[10.5px] tracking-[3px] uppercase text-[#D4AF5A]/60">
              Nous joindre
            </span>
            <span className="w-6 h-px bg-[#D4AF5A]/50" />
          </div>
          <h2
            className="font-display font-semibold text-white leading-tight"
            style={{ fontSize: "clamp(26px, 3.2vw, 42px)" }}
          >
            Choisissez votre canal.
          </h2>
          <p className="mt-3 text-white/40 text-[14.5px] max-w-[420px] mx-auto">
            Trois façons de nous contacter — choisissez celle qui vous convient le mieux.
          </p>
        </div>

        {/* Channels grid */}
        <div
          className="grid md:grid-cols-3 gap-4"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
          }}
        >
          {CHANNELS.map((ch, i) => (
            <ChannelCard
              key={ch.title}
              channel={ch}
              index={i}
              revealed={revealed}
              onModalOpen={() => openModal(ch.cta!)}
            />
          ))}
        </div>

        {/* Bottom address line */}
        <div
          className="mt-12 flex items-center justify-center gap-3 transition-all duration-700"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#D4AF5A]/50 shrink-0">
            <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="7" cy="5" r="1.2" fill="currentColor"/>
          </svg>
          <span className="text-white/30 text-[12.5px]">{SITE.address}</span>
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

function ChannelCard({
  channel,
  index,
  revealed,
  onModalOpen,
}: {
  channel: typeof CHANNELS[number];
  index: number;
  revealed: boolean;
  onModalOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? channel.accentColor + "35" : "rgba(255,255,255,0.07)"}`,
        transform: hovered ? "translateY(-3px)" : "none",
        opacity: revealed ? 1 : 0,
        transition: `opacity 0.6s ease ${0.14 + index * 0.08}s, transform 0.3s ease, background 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${channel.accentColor}70, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Tag + icon row */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="font-mono text-[9.5px] tracking-[2px] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: `${channel.accentColor}12`,
              color: channel.accentColor,
              border: `1px solid ${channel.accentColor}25`,
            }}
          >
            {channel.label}
          </span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? `${channel.accentColor}18` : "rgba(255,255,255,0.05)",
              color: hovered ? channel.accentColor : "rgba(255,255,255,0.35)",
            }}
          >
            {channel.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-[17px] mb-2.5 transition-colors duration-300"
          style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.80)" }}
        >
          {channel.title}
        </h3>

        {/* Description */}
        <p className="text-[13.5px] leading-relaxed text-white/40 mb-6 flex-1">
          {channel.description}
        </p>

        {/* Detail block (phone hours) */}
        {channel.detail && (
          <div
            className="rounded-xl p-4 mb-6 space-y-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {channel.detail.hours.map((h) => (
              <div key={h.days} className="flex items-baseline justify-between gap-3">
                <span className="text-[11.5px] text-white/35 font-mono shrink-0">{h.days}</span>
                <span className="text-[11.5px] text-white/55 text-right">{h.time}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-white/[0.06]">
              <a
                href={`tel:${channel.detail.phone.replace(/\s/g, "")}`}
                className="font-semibold text-[16px] transition-colors duration-200"
                style={{ color: channel.accentColor }}
              >
                {channel.detail.phone}
              </a>
            </div>
          </div>
        )}

        {/* CTA */}
        {channel.cta && (
          <button
            onClick={onModalOpen}
            className="w-full font-semibold text-[13px] rounded-full py-3 transition-all duration-200"
            style={{
              background: hovered ? channel.accentColor : `${channel.accentColor}14`,
              color: hovered ? "#080D18" : channel.accentColor,
              border: `1px solid ${channel.accentColor}30`,
            }}
          >
            {channel.ctaLabel} →
          </button>
        )}

        {channel.whatsapp && (
          <a
            href={`https://wa.me/${channel.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-semibold text-[13px] rounded-full py-3 transition-all duration-200 block"
            style={{
              background: hovered ? channel.accentColor : `${channel.accentColor}14`,
              color: hovered ? "#080D18" : channel.accentColor,
              border: `1px solid ${channel.accentColor}30`,
            }}
          >
            {channel.ctaLabel} →
          </a>
        )}
      </div>
    </div>
  );
}
