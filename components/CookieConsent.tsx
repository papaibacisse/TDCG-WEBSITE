"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, BarChart3, Megaphone, Sparkles, X } from "lucide-react";
import { useCookieConsent } from "@/lib/CookieConsentContext";
import { useModal } from "@/lib/ModalContext";

const STORAGE_KEY = "tdcg_cookie_consent";
const COOKIE_TTL_DAYS = 395; // ~13 months

interface Consent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: number;
}

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    const ageDays = (Date.now() - parsed.timestamp) / 86_400_000;
    if (ageDays > COOKIE_TTL_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: Omit<Consent, "timestamp">) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }));
  } catch {
    // storage unavailable — consent simply won't persist
  }
}

// Placeholder loaders — wire in real tracking IDs from env vars when ready.
function loadConditionalScripts(consent: Consent) {
  if (consent.analytics) {
    // e.g. inject Google Analytics / GTM using NEXT_PUBLIC_GA_MEASUREMENT_ID
    console.info("[TDCG cookies] Analytics scripts would load here (consent granted).");
  }
  if (consent.marketing) {
    // e.g. inject Meta Pixel / LinkedIn Insight using their NEXT_PUBLIC_* ids
    console.info("[TDCG cookies] Marketing scripts would load here (consent granted).");
  }
}

export default function CookieConsent() {
  const { settingsOpen, openSettings, closeSettings } = useCookieConsent();
  const { openModal } = useModal();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [toggles, setToggles] = useState({ analytics: false, marketing: false, personalization: false });

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setToggles({
        analytics: stored.analytics,
        marketing: stored.marketing,
        personalization: stored.personalization,
      });
      loadConditionalScripts(stored);
    } else {
      const t = setTimeout(() => setBannerVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function saveConsent(consent: Omit<Consent, "timestamp">) {
    writeConsent(consent);
    loadConditionalScripts({ ...consent, timestamp: Date.now() });
    setBannerVisible(false);
    closeSettings();
  }

  function acceptAll() {
    setToggles({ analytics: true, marketing: true, personalization: true });
    saveConsent({ essential: true, analytics: true, marketing: true, personalization: true });
  }

  function rejectAll() {
    setToggles({ analytics: false, marketing: false, personalization: false });
    saveConsent({ essential: true, analytics: false, marketing: false, personalization: false });
  }

  function saveCustom() {
    saveConsent({ essential: true, ...toggles });
  }

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Consentement aux cookies"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 0.8, 0.24, 1] }}
            className="fixed left-6 right-6 bottom-6 z-[1500] max-w-[620px] mx-auto rounded-2xl border border-white/10 bg-navy/[0.88] backdrop-blur-lg shadow-modal p-[30px_32px]"
          >
            <h4 className="font-display text-lg text-white mb-2.5 font-semibold">Votre confidentialité est importante</h4>
            <p className="text-[13.5px] text-white/65 leading-relaxed">
              Chez Teranga Digital Consulting Group (TDCG), nous utilisons des cookies afin d&apos;améliorer votre
              expérience de navigation, d&apos;analyser les performances du site et de vous proposer des contenus
              adaptés à vos besoins. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos
              préférences à tout moment.{" "}
              <button
                onClick={() => openModal("privacy")}
                className="text-gold underline underline-offset-2 font-medium hover:text-gold-hover"
              >
                En savoir plus dans notre Politique de confidentialité
              </button>
              .
            </p>
            <div className="flex flex-wrap gap-2.5 mt-[22px] items-center">
              <button onClick={acceptAll} className="text-[13.5px] font-semibold rounded-full px-5 py-3 bg-gold text-black hover:bg-gold-hover transition-colors">
                Accepter tout
              </button>
              <button onClick={rejectAll} className="text-[13.5px] font-semibold rounded-full px-5 py-3 bg-transparent text-white border border-white/35 hover:border-white hover:bg-white/[0.06] transition-colors">
                Refuser
              </button>
              <button onClick={openSettings} className="text-[13.5px] font-semibold rounded-full px-5 py-3 bg-white/[0.08] text-white border border-white/15 hover:bg-white/[0.14] transition-colors">
                Personnaliser
              </button>
              <button onClick={() => setBannerVisible(false)} className="text-[12.5px] text-white/45 underline underline-offset-2 hover:text-white/75 ml-auto">
                Continuer sans accepter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings modal */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeSettings(); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-sm max-w-[620px] w-full max-h-[86vh] overflow-y-auto shadow-modal flex flex-col"
            >
              <div className="flex items-center justify-between px-8 py-[26px] border-b border-navy/10">
                <h3 id="cookie-settings-title" className="text-xl text-navy font-display">Gestion des cookies</h3>
                <button onClick={closeSettings} aria-label="Fermer" className="w-9 h-9 rounded-full border border-navy/15 flex items-center justify-center hover:bg-navy hover:border-navy transition-colors group">
                  <X size={16} className="text-navy group-hover:text-white" />
                </button>
              </div>

              <div className="px-8 pt-2 pb-2">
                <p className="text-sm text-grey mb-2">
                  Personnalisez les catégories de cookies que vous souhaitez autoriser. Vous pouvez modifier ces
                  préférences à tout moment depuis le lien « Gestion des cookies » en bas de page.
                </p>

                <CookieCategory
                  icon={ShieldCheck}
                  title="Cookies essentiels"
                  description="Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés."
                  locked
                />
                <CookieCategory
                  icon={BarChart3}
                  title="Cookies analytiques"
                  description="Ils nous permettent de mesurer l'audience et d'améliorer nos services (ex. Google Analytics)."
                  checked={toggles.analytics}
                  onToggle={() => setToggles((s) => ({ ...s, analytics: !s.analytics }))}
                />
                <CookieCategory
                  icon={Megaphone}
                  title="Cookies marketing"
                  description="Ils permettent de mesurer l'efficacité de nos campagnes publicitaires (Meta Pixel, LinkedIn Insight, Google Ads)."
                  checked={toggles.marketing}
                  onToggle={() => setToggles((s) => ({ ...s, marketing: !s.marketing }))}
                />
                <CookieCategory
                  icon={Sparkles}
                  title="Cookies de personnalisation"
                  description="Ils mémorisent vos préférences afin d'améliorer votre expérience utilisateur."
                  checked={toggles.personalization}
                  onToggle={() => setToggles((s) => ({ ...s, personalization: !s.personalization }))}
                  last
                />
              </div>

              <div className="flex gap-3 flex-wrap px-8 py-6 border-t border-navy/10">
                <button onClick={saveCustom} className="flex-1 justify-center text-white bg-navy hover:bg-black text-sm font-semibold rounded-sm px-6 py-3.5 transition-colors">
                  Enregistrer mes préférences
                </button>
                <button onClick={acceptAll} className="flex-1 justify-center text-black bg-gold hover:bg-gold-hover text-sm font-semibold rounded-sm px-6 py-3.5 transition-colors">
                  Accepter tout
                </button>
                <button onClick={rejectAll} className="flex-1 justify-center text-navy border border-navy/20 hover:bg-grey-light text-sm font-semibold rounded-sm px-6 py-3.5 transition-colors">
                  Tout refuser
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CookieCategory({
  icon: Icon,
  title,
  description,
  locked = false,
  checked = false,
  onToggle,
  last = false,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  locked?: boolean;
  checked?: boolean;
  onToggle?: () => void;
  last?: boolean;
}) {
  return (
    <div className={"flex gap-[18px] py-6 " + (last ? "" : "border-b border-navy/10")}>
      <div className="w-[42px] h-[42px] rounded-[10px] bg-grey-light flex items-center justify-center shrink-0">
        <Icon size={20} className="text-navy" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-[15.5px] font-semibold text-navy">{title}</h4>
          {locked ? (
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-gold bg-gold-soft px-2.5 py-1 rounded-full shrink-0">
              Toujours activés
            </span>
          ) : (
            <button
              role="switch"
              aria-checked={checked}
              aria-label={`Activer les ${title.toLowerCase()}`}
              onClick={onToggle}
              className={"toggle " + (checked ? "on" : "")}
            />
          )}
        </div>
        <p className="text-[13.5px] text-grey mt-1.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
