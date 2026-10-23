"use client";

import Image from "next/image";
import { useModal } from "@/lib/ModalContext";
import { useCookieConsent } from "@/lib/CookieConsentContext";
import { SITE } from "@/lib/constants";

const SERVICES_LINKS = ["Audit digital", "Stratégie marketing", "Digitalisation", "Conseil stratégique"];

export default function Footer() {
  const { openModal } = useModal();
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-ink text-white/60 pt-12 pb-6">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block">
              <Image
                src="/logo-tdcg.png"
                alt="TDCG – Teranga Digital Consulting Group"
                width={110}
                height={44}
                className="object-contain"
              />
            </a>
            <p className="mt-3 text-[13px] max-w-[260px] text-white/45 leading-relaxed">
              Cabinet de conseil en transformation digitale et IA, basé au Sénégal, au service des entreprises d&apos;Afrique de l&apos;Ouest.
            </p>
            <div className="mt-4">
              <a href={`mailto:${SITE.email}`} className="text-[12.5px] text-white/40 hover:text-gold transition-colors">
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-3">Services</h4>
            <ul className="flex flex-col gap-2">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a href="#expertise" className="text-[13px] text-white/50 hover:text-gold transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cabinet */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-3">Cabinet</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="/notre-approche" className="text-[13px] text-white/50 hover:text-gold transition-colors">Notre approche</a></li>
              <li><a href="/expertises" className="text-[13px] text-white/50 hover:text-gold transition-colors">Nos expertises</a></li>
              <li><a href="/direction" className="text-[13px] text-white/50 hover:text-gold transition-colors">Mot du DG</a></li>
              <li><a href="#faq" className="text-[13px] text-white/50 hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-white/70 font-semibold mb-3">Légal</h4>
            <ul className="flex flex-col gap-2">
              <li><button onClick={() => openModal("mentions-legales")} className="text-[13px] text-white/50 hover:text-gold transition-colors">Mentions légales</button></li>
              <li><button onClick={() => openModal("privacy")} className="text-[13px] text-white/50 hover:text-gold transition-colors">Confidentialité</button></li>
              <li><button onClick={openSettings} className="text-[13px] text-white/50 hover:text-gold transition-colors">Cookies</button></li>
              <li><button onClick={() => openModal("cgu")} className="text-[13px] text-white/50 hover:text-gold transition-colors">CGU</button></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center pt-5 gap-3 text-[12px] text-white/30">
          <span>© 2026 Teranga Digital Consulting Group — Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
