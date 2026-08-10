"use client";

import { useCookieConsent } from "@/lib/CookieConsentContext";
import { SITE } from "@/lib/constants";

export default function MapEmbed() {
  const { consent, openSettings } = useCookieConsent();
  const mapsAllowed = consent?.marketing || consent?.analytics;
  const query = encodeURIComponent(SITE.address);

  if (!mapsAllowed) {
    return (
      <div className="rounded-md border border-white/10 bg-white/[0.03] p-5 text-[13px] text-white/55">
        La carte Google Maps nécessite les cookies « analytiques » ou « marketing ».{" "}
        <button
          onClick={openSettings}
          className="text-gold underline underline-offset-2 hover:text-gold-hover"
        >
          Activer les cookies
        </button>{" "}
        ou{" "}
        <a
          href={`https://maps.google.com/?q=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 hover:text-gold-hover"
        >
          voir l&apos;adresse sur Google Maps
        </a>
        .
      </div>
    );
  }

  return (
    <iframe
      title="Localisation de TDCG"
      src={`https://www.google.com/maps?q=${query}&output=embed`}
      className="w-full h-[220px] rounded-md border border-white/10 grayscale-[30%]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
