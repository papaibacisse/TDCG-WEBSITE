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
  { href: "/notre-approche", label: "Notre Approche" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact-canaux", label: "Contact" },
];

const OUTILS_NAV = [
  {
    href: "/outils-intelligents",
    label: "Vue d'ensemble",
    desc: "Les 4 outils intelligents TDCG",
  },
  {
    href: "/outils-intelligents/diagnostic",
    label: "Diagnostic digital",
    desc: "Évaluez votre maturité en 16 questions",
  },
  {
    href: "/outils-intelligents/simulateur-roi",
    label: "Simulateur de ROI",
    desc: "Calculez le ROI de vos projets digitaux",
  },
  {
    href: "/outils-intelligents/radar-visibilite-ia",
    label: "Radar Visibilité IA",
    desc: "Votre présence dans ChatGPT, Gemini…",
  },
  {
    href: "/outils-intelligents/growth-partner",
    label: "Growth Partner",
    desc: "Espace de pilotage clients accompagnés",
  },
];

// ── Données du mega-menu Expertises ─────────────────────────────────────────
const EXPERTISES = [
  {
    num: "01",
    title: "Transformation digitale",
    anchor: "/expertises/strategie-digitale-transformation",
    items: ["Digitalisation des processus", "Stratégie digitale", "Audit de maturité", "Roadmap digitale"],
  },
  {
    num: "02",
    title: "IA & Automatisation",
    anchor: "/expertises/ia-automatisation",
    items: ["Audit IA", "Automatisation des processus", "Assistants IA", "Copilotes IA", "Formation & adoption IA"],
  },
  {
    num: "03",
    title: "Marketing & Growth",
    anchor: "/expertises/marketing-croissance-digitale",
    items: ["Stratégie marketing", "Acquisition", "SEO", "Social Media", "Performance marketing"],
  },
  {
    num: "04",
    title: "Data, CRM & CX",
    anchor: "/expertises/data-crm-experience-client",
    items: ["CRM", "KPI & tableaux de bord", "Data & analyse", "Parcours client", "Fidélisation"],
  },
  {
    num: "05",
    title: "Conseil & Performance",
    anchor: "/expertises/conseil-business-technologie",
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

// ── Dropdown Outils intelligents ─────────────────────────────────────────────
function OutilsDropdown() {
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
        onMouseEnter={() => setOpen(true)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[14.5px] font-medium text-white/85 hover:text-white relative group"
      >
        Outils
        <ChevronDown size={14} className={`text-gold/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        <span className={`absolute left-0 -bottom-0.5 h-px bg-gold transition-all duration-300 ${open ? "w-full" : "w-0 group-hover:w-full"}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#0F1C2E] border border-gold/20 rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] py-2 z-[1100]"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/30 to-transparent mb-2" />
          <a
            href={OUTILS_NAV[0].href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#D4AF5A] hover:bg-[#D4AF5A]/08 transition-colors font-semibold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            {OUTILS_NAV[0].label}
          </a>
          <div className="h-px mx-4 bg-white/[0.05] mb-1" />
          {OUTILS_NAV.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex flex-col px-4 py-2.5 hover:bg-[#D4AF5A]/06 transition-colors group/item"
            >
              <span className="text-[13px] font-medium text-white/85 group-hover/item:text-white transition-colors">
                {item.label}
              </span>
              <span className="text-[11.5px] text-white/35 group-hover/item:text-white/50 transition-colors mt-0.5">
                {item.desc}
              </span>
            </a>
          ))}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF5A]/20 to-transparent mt-2" />
        </div>
      )}
    </li>
  );
}

// ── Menu mobile accordéon ────────────────────────────────────────────────────
function MobileMenu({
  openModal,
  setMobileOpen,
  handleSectorSelect,
}: {
  openModal: (m: Exclude<ModalName, null>) => void;
  setMobileOpen: (v: boolean) => void;
  handleSectorSelect: (idx: number) => void;
}) {
  const [openSection, setOpenSection] = useState<"expertises" | "secteurs" | "outils" | null>(null);

  function toggle(section: "expertises" | "secteurs" | "outils") {
    setOpenSection((prev) => (prev === section ? null : section));
  }

  return (
    <div className="md:hidden absolute top-full inset-x-0 bg-[#080D18] border-b border-white/10 px-6 py-4 flex flex-col max-h-[82vh] overflow-y-auto">

      {/* ─ Expertises accordéon ─ */}
      <div className="border-b border-white/[0.07]">
        <button
          onClick={() => toggle("expertises")}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-[10px] uppercase tracking-[2px] text-[#D4AF5A]/70 font-semibold">Expertises</span>
          <ChevronDown
            size={14}
            className={`text-[#D4AF5A]/60 transition-transform duration-200 ${openSection === "expertises" ? "rotate-180" : ""}`}
          />
        </button>

        {openSection === "expertises" && (
          <div className="pb-4 flex flex-col gap-4">
            {EXPERTISES.map((exp) => (
              <div key={exp.num}>
                <a
                  href={exp.anchor}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 mb-2"
                >
                  <span className="text-[10px] font-mono text-[#D4AF5A]/60">{exp.num}</span>
                  <span className="text-[14px] font-semibold text-white">{exp.title}</span>
                </a>
                <div className="pl-5 flex flex-col gap-1.5">
                  {exp.items.map((item) => (
                    <a
                      key={item}
                      href={exp.anchor}
                      onClick={() => setMobileOpen(false)}
                      className="text-[12.5px] text-white/45 hover:text-white/80 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─ Secteurs accordéon ─ */}
      <div className="border-b border-white/[0.07]">
        <button
          onClick={() => toggle("secteurs")}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-[10px] uppercase tracking-[2px] text-[#D4AF5A]/70 font-semibold">Secteurs</span>
          <ChevronDown
            size={14}
            className={`text-[#D4AF5A]/60 transition-transform duration-200 ${openSection === "secteurs" ? "rotate-180" : ""}`}
          />
        </button>

        {openSection === "secteurs" && (
          <div className="pb-4 flex flex-col gap-0.5">
            {SECTORS.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => { handleSectorSelect(idx); setMobileOpen(false); }}
                className="w-full text-left text-white/70 font-medium py-2 text-[14px] hover:text-white transition-colors"
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─ Outils intelligents accordéon ─ */}
      <div className="border-b border-white/[0.07]">
        <button
          onClick={() => toggle("outils")}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="text-[10px] uppercase tracking-[2px] text-[#D4AF5A]/70 font-semibold">Outils intelligents</span>
          <ChevronDown
            size={14}
            className={`text-[#D4AF5A]/60 transition-transform duration-200 ${openSection === "outils" ? "rotate-180" : ""}`}
          />
        </button>
        {openSection === "outils" && (
          <div className="pb-4 flex flex-col gap-1">
            {OUTILS_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex flex-col py-2.5 group/item"
              >
                <span className="text-[14px] font-medium text-white/80 group-hover/item:text-white transition-colors">
                  {item.label}
                </span>
                <span className="text-[11.5px] text-white/35 mt-0.5">{item.desc}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ─ Liens simples ─ */}
      <div className="flex flex-col border-b border-white/[0.07]">
        {SIMPLE_NAV.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-white/70 font-medium py-3.5 text-[14px] hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* ─ CTA ─ */}
      <div className="flex flex-col gap-2.5 pt-5 pb-2">
        <button
          onClick={() => { openModal("contact"); setMobileOpen(false); }}
          className="bg-gold text-black rounded-full px-6 py-3.5 font-semibold text-[14px] text-center"
        >
          Nous contacter
        </button>
      </div>
    </div>
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
      <nav className="flex items-center gap-8 max-w-[1240px] mx-auto px-8 py-4 md:py-2 relative">

        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <Image src={logo} alt="TDCG - Teranga Digital Consulting Group" className="h-[80px] md:h-[96px] w-auto object-contain" priority />
        </a>

        {/* Nav desktop */}
        <ul className="hidden md:flex items-center gap-7 flex-1 justify-center">

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

          {/* Outils intelligents */}
          <OutilsDropdown />

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
        <div className="hidden md:flex items-center gap-3 shrink-0">
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
        <MobileMenu
          openModal={openModal}
          setMobileOpen={setMobileOpen}
          handleSectorSelect={handleSectorSelect}
        />
      )}
    </header>
  );
}
