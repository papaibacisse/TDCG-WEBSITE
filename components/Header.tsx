"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useExpertise } from "@/lib/ExpertiseContext";
import { EXPERTISE_DOMAINS, SECTORS, sectorSlug } from "@/lib/constants";
import logo from "@/public/logo-tdcg.png";

const SIMPLE_NAV = [
  { href: "#etudes", label: "Études de cas" },
  { href: "#faq", label: "FAQ" },
  { href: "#roi-simulateur", label: "Simulateur de ROI marketing" },
  { href: "#contact-canaux", label: "Contact" },
];

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
        <ChevronDown
          size={14}
          className={`text-gold/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
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

export default function Header() {
  const { openModal } = useModal();
  const { openExpertise } = useExpertise();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSectorSelect(idx: number) {
    const id = sectorSlug(SECTORS[idx].name);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.getElementById("secteurs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-[1000] bg-[#0B0F1E] border-b border-gold/[0.18]">
      <nav className="flex items-center gap-8 max-w-[1240px] mx-auto px-8 py-4">
        <a href="#" className="flex items-center gap-3.5 font-display font-bold text-[20px] text-white tracking-wide shrink-0">
          <Image src={logo} alt="TDCG - Teranga Digital Consulting Group" className="h-[46px] w-auto" priority />
          <span className="w-px self-stretch bg-gold/40" />
          <span className="flex flex-col leading-tight">
            <span className="text-gold tracking-wider">TDCG</span>
            <span className="font-body font-normal text-[11px] text-white/65">Des idées aux résultats</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          <DropdownNav
            label="Expertises"
            items={EXPERTISE_DOMAINS.map((e) => ({ name: e.name }))}
            onSelect={(idx) => openExpertise(idx)}
          />
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

        <button
          className="md:hidden ml-auto flex items-center justify-center bg-white/[0.06] border border-gold/30 rounded-full w-16 h-10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={20} className="text-gold" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white border-b border-navy/10 px-8 py-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-grey font-semibold mb-2">Expertises</p>
            {EXPERTISE_DOMAINS.map((e, idx) => (
              <button
                key={e.name}
                onClick={() => { openExpertise(idx); setMobileOpen(false); }}
                className="block w-full text-left text-navy font-medium py-1.5 text-[14.5px] hover:text-gold"
              >
                {e.name}
              </button>
            ))}
          </div>
          <hr className="border-navy/10" />
          <div>
            <p className="text-[11px] uppercase tracking-wider text-grey font-semibold mb-2">Secteurs</p>
            {SECTORS.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => { handleSectorSelect(idx); setMobileOpen(false); }}
                className="block w-full text-left text-navy font-medium py-1.5 text-[14.5px] hover:text-gold"
              >
                {s.name}
              </button>
            ))}
          </div>
          <hr className="border-navy/10" />
          {SIMPLE_NAV.map((l) => (
            <a key={l.href} href={l.href} className="text-navy font-medium" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { openModal("contact"); setMobileOpen(false); }}
            className="bg-navy text-white rounded-full px-6 py-3 font-semibold text-sm mt-2"
          >
            Nous contacter
          </button>
        </div>
      )}
    </header>
  );
}
