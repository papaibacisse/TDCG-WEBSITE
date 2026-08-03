"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import logo from "@/public/logo-tdcg.png";

const NAV_LINKS = [
  { href: "#expertise", label: "Expertises" },
  { href: "#secteurs", label: "Secteurs" },
  { href: "#etudes", label: "Études de cas" },
  { href: "#faq", label: "FAQ" },
  { href: "#roi-simulateur", label: "Simulateur de ROI marketing" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { openModal } = useModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[1000] bg-navbar-navy bg-[#0B0F1E] border-b border-gold/[0.18]">
      <nav className="flex items-center gap-10 max-w-[1240px] mx-auto px-8 py-4">
        <a href="#" className="flex items-center gap-3.5 font-display font-bold text-[20px] text-white tracking-wide">
          <Image src={logo} alt="TDCG - Teranga Digital Consulting Group" className="h-[46px] w-auto" priority />
          <span className="w-px self-stretch bg-gold/40" />
          <span className="flex flex-col leading-tight">
            <span className="text-gold tracking-wider">TDCG</span>
            <span className="font-body font-normal text-[11px] text-white/65">Des idées aux résultats</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[14.5px] font-medium text-white/85 hover:text-white relative group">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3 ml-auto">
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
          className="md:hidden ml-auto flex items-center justify-center gap-1 bg-white/[0.06] border border-gold/30 rounded-full w-16 h-10"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu size={20} className="text-gold" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white border-b border-navy/10 px-8 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
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
