"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useExpertise } from "@/lib/ExpertiseContext";
import { SECTORS, sectorSlug } from "@/lib/constants";
import logo from "@/public/logo-tdcg.png";
import type { ModalName } from "@/lib/ModalContext";

const SIMPLE_NAV = [
  { href: "#etudes", label: "Études de cas" },
  { href: "#faq", label: "FAQ" },
  { href: "#roi-simulateur", label: "Simulateur de ROI" },
  { href: "#contact-canaux", label: "Contact" },
];

// ── Données du mega-menu Expertises ─────────────────────────────────────────
const EXPERTISES = [
  {
    num: "01",
    title: "Transformation digitale",
    anchor: "#expertise",
    items: ["Digitalisation des processus", "Stratégie digitale", "Audit de maturité", "Roadmap digitale"],
  },
  {
    num: "02",
    title: "IA & Automatisation",
    anchor: "#expertise",
    items: ["Audit IA", "Automatisation des processus", "Assistants IA", "Copilotes IA", "Formation & adoption IA"],
  },
  {
    num: "03",
    title: "Marketing & Growth",
    anchor: "#expertise",
    items: ["Stratégie marketing", "Acquisition", "SEO", "Social Media", "Performance marketing"],
  },
  {
    num: "04",
    title: "Data, CRM & CX",
    anchor: "#expertise",
    items: ["CRM", "KPI & tableaux de bord", "Data & analyse", "Parcours client", "Fidélisation"],
  },
  {
    num: "05",
    title: "Conseil & Performance",
    anchor: "#expertise",
    items: ["Conseil stratégique", "Organisation & optimisation", "Pilotage", "Gestion de projets"],
  },
];

// ── Mega-menu Expertises ─────────────────────────────────────────────────────
function ExpertiseMegaMenu({
  open,
  onClose,
  openModal,
}: {
  open: boolean;
  onClose: () => void;
  openModal: (m: Exclude<ModalName, null>) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="absolute top-full left-0 right-0 mt-0 z-[1100] px-8"
      onMouseLeave={onClose}
    >
      {/* Petit pont invisible pour éviter la fermeture entre le bouton et le panel */}
      <div className="h-3 w-full" />
      <div
        className="
          bg-[#080D18] border border-white/[0.08] rounded-xl
          shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(212,175,90,0.06)]
          overflow-hidden
        "
      >
        {/* Barre dorée supérieure */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/40 to-transparent" />

        <div className="p-7 grid grid-cols-5 gap-0 divide-x divide-white/[0.06]">
          {EXPERTISES.map((exp, i) => (
            <div key={exp.num} className="px-6 first:pl-0 last:pr-0 group/col">
              {/* Numéro + titre */}
              <a
                href={exp.anchor}
                onClick={onClose}
                className="block mb-4"
              >
                <span className="text-[10px] font-mono tracking-[2.5px] text-[#D4AF5A]/70 uppercase">
                  {exp.num}
                </span>
                <h3 className="mt-1 text-[14.5px] font-semibold text-white leading-snug group-hover/col:text-[#D4AF5A] transition-colors duration-200">
                  {exp.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-[#D4AF5A]/30 group-hover/col:w-full transition-all duration-300" />
              </a>

              {/* Sous-services */}
              <ul className="flex flex-col gap-1.5">
                {exp.items.map((item) => (
                  <li key={item}>
                    <a
                      href={exp.anchor}
                      onClick={onClose}
                      className="text-[12.5px] text-white/50 hover:text-white/90 hover:translate-x-1 transition-all duration-150 flex items-center gap-1.5 group/item"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#D4AF5A]/30 group-hover/item:bg-[#D4AF5A] transition-colors shrink-0" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bande CTA en bas */}
        <div className="border-t border-white/[0.06] bg-[#0B1120] px-7 py-4 flex items-center justify-between">
          <p className="text-[13px] text-white/45">
            Vous ne savez pas quelle expertise correspond à votre besoin ?
          </p>
          <button
            onClick={() => { openModal("contact"); onClose(); }}
            className="flex items-center gap-2 text-[13px] font-semibold text-[#D4AF5A] hover:text-white border border-[#D4AF5A]/30 hover:border-[#D4AF5A] hover:bg-[#D4AF5A]/10 rounded-full px-5 py-2 transition-all duration-200"
          >
            Parlons de votre projet
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Barre dorée inférieure */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/20 to-transparent" />
      </div>
    </div>
  );
}

// ── Dropdown générique (Secteurs) ────────────────────────────────────────────
function DropdownNav({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: { name: string }[];
  onSelect: (idx: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[14.5px] font-medium text-white/85 hover:text-white relative group"
      >
        {label}
        <ChevronDown size={14} className={`text-gold/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 w-60 bg-[#0F1C2E] border border-gold/20 rounded-md shadow-[0_12px_32px_rgba(0,0,0,0.45)] py-2 z-[1100]">
          {items.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => { onSelect(idx); setOpen(false); }}
              className="w-full text-left px-5 py-2.5 text-[13.5px] text-white/80 hover:text-white hover:bg-gold/10 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

// ── Header principal ─────────────────────────────────────────────────────────
export default function Header() {
  const { openModal } = useModal();
  const { openExpertise } = useExpertise();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const expertiseRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  // Fermer si clic en dehors
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (expertiseRef.current && !expertiseRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSectorSelect(idx: number) {
    const id = sectorSlug(SECTORS[idx].name);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else document.getElementById("secteurs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="fixed top-0 inset-x-0 z-[1000] bg-[#0B0F1E] border-b border-gold/[0.18]">
      <nav className="flex items-center gap-8 max-w-[1240px] mx-auto px-8 py-4 relative">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3.5 font-display font-bold text-[20px] text-white tracking-wide shrink-0">
          <Image src={logo} alt="TDCG - Teranga Digital Consulting Group" className="h-[46px] w-auto" priority />
          <span className="w-px self-stretch bg-gold/40" />
          <span className="flex flex-col leading-tight">
            <span className="text-gold tracking-wider">TDCG</span>
            <span className="font-body font-normal text-[11px] text-white/65">Des idées aux résultats</span>
          </span>
        </a>

        {/* Nav desktop */}
        <ul className="hidden md:flex items-center gap-7">

          {/* Expertises → Mega-menu */}
          <li
            ref={expertiseRef}
            className="static"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <button
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              className="flex items-center gap-1.5 text-[14.5px] font-medium text-white/85 hover:text-white relative group"
            >
              Expertises
              <ChevronDown
                size={14}
                className={`text-gold/70 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
              <span className={`absolute left-0 -bottom-0.5 h-px bg-gold transition-all duration-300 ${megaOpen ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>

            <ExpertiseMegaMenu
              open={megaOpen}
              onClose={() => setMegaOpen(false)}
              openModal={openModal}
            />
          </li>

          {/* Secteurs */}
          <DropdownNav
            label="Secteurs"
            items={SECTORS.map((s) => ({ name: s.name }))}
            onSelect={handleSectorSelect}
          />

          {SIMPLE_NAV.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[14.5px] font-medium text-white/85 hover:text-white relative group">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
          <button
            onClick={() => openModal("audit")}
            className="text-white border border-white/28 hover:border-gold hover:bg-gold-soft text-[14.5px] font-semibold rounded-full px-7 py-3.5 transition-colors"
          >
            Demander un audit
          </button>
          <button
            onClick={() => openModal("contact")}
            className="bg-gold hover:bg-gold-hover text-black text-[14.5px] font-semibold rounded-full px-7 py-3.5 transition-colors"
          >
            Nous contacter
          </button>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden ml-auto flex items-center justify-center bg-white/[0.06] border border-gold/30 rounded-full w-16 h-10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={20} className="text-gold" />
        </button>
      </nav>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-[#080D18] border-b border-white/10 px-6 py-6 flex flex-col gap-0 max-h-[82vh] overflow-y-auto">
          {/* Expertises mobile */}
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[2px] text-[#D4AF5A]/70 font-semibold mb-3">Expertises</p>
            {EXPERTISES.map((exp, i) => (
              <div key={exp.num} className="mb-4">
                <a
                  href={exp.anchor}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 mb-1.5"
                >
                  <span className="text-[10px] font-mono text-[#D4AF5A]/60">{exp.num}</span>
                  <span className="text-[14px] font-semibold text-white">{exp.title}</span>
                </a>
                <div className="pl-6 flex flex-col gap-1">
                  {exp.items.map((item) => (
                    <a
                      key={item}
                      href={exp.anchor}
                      onClick={() => setMobileOpen(false)}
                      className="text-[12.5px] text-white/50 hover:text-white/90"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/[0.07] mb-5" />

          {/* Secteurs mobile */}
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[2px] text-[#D4AF5A]/70 font-semibold mb-3">Secteurs</p>
            {SECTORS.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => { handleSectorSelect(idx); setMobileOpen(false); }}
                className="block w-full text-left text-white/75 font-medium py-1.5 text-[14px] hover:text-white"
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="h-px bg-white/[0.07] mb-5" />

          {SIMPLE_NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/75 font-medium py-2 text-[14px] hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}

          <button
            onClick={() => { openModal("contact"); setMobileOpen(false); }}
            className="mt-5 bg-gold text-black rounded-full px-6 py-3 font-semibold text-sm text-center"
          >
            Nous contacter
          </button>

          <button
            onClick={() => { openModal("audit"); setMobileOpen(false); }}
            className="mt-2 border border-white/20 text-white rounded-full px-6 py-3 font-semibold text-sm text-center"
          >
            Demander un audit
          </button>
        </div>
      )}
    </header>
  );
}
