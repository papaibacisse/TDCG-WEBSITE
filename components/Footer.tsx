"use client";

import { useModal } from "@/lib/ModalContext";
import { useCookieConsent } from "@/lib/CookieConsentContext";
import { SITE } from "@/lib/constants";

const SERVICES_LINKS = ["Audit digital", "Stratégie marketing", "Digitalisation", "Conseil stratégique"];

export default function Footer() {
  const { openModal } = useModal();
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-ink text-white/60 pt-20 pb-8">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid gap-10 pb-[60px] border-b border-white/10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="font-display font-bold text-[19px] text-white">
              TDCG<span className="text-gold">.</span>
            </a>
            <p className="mt-[18px] text-sm max-w-[280px] text-white/50">
              Cabinet de conseil en transformation digitale et stratégie, basé à Louga, au service des entreprises et
              institutions d&apos;Afrique de l&apos;Ouest.
            </p>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-wider text-white font-semibold mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((s) => (
                <li key={s}>
                  <a href="#expertise" className="text-sm text-white/55 hover:text-gold transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div id="footer-contact" className="scroll-mt-28">
            <h4 className="text-[13px] uppercase tracking-wider text-white font-semibold mb-5">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`mailto:${SITE.email}`} className="text-sm text-white/55 hover:text-gold transition-colors">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="text-sm text-white/55 hover:text-gold transition-colors">{SITE.phones[0]}</a></li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/55 hover:text-gold transition-colors"
                >
                  {SITE.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] uppercase tracking-wider text-white font-semibold mb-5">Légal</h4>
            <ul className="space-y-3">
              <li><button onClick={() => openModal("mentions-legales")} className="text-sm text-white/55 hover:text-gold transition-colors">Mentions légales</button></li>
              <li><button onClick={() => openModal("privacy")} className="text-sm text-white/55 hover:text-gold transition-colors">Politique de confidentialité</button></li>
              <li><button onClick={openSettings} className="text-sm text-white/55 hover:text-gold transition-colors">Cookies</button></li>
              <li><button onClick={() => openModal("cgu")} className="text-sm text-white/55 hover:text-gold transition-colors">CGU</button></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center pt-7 text-[13px] text-white/40 flex-wrap gap-3">
          <span>© 2026 Teranga Digital Consulting Group. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}
