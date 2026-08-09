"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-7 right-7 z-[900] flex flex-col gap-3.5">
      <a
        href={`https://wa.me/${SITE.whatsapp[0]}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contacter sur WhatsApp au ${SITE.phones[0]}`}
        className="w-[54px] h-[54px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:scale-105 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.08L2 22l5.08-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.6-1.28 1.16-1.77 1.2-.46.05-1.04.07-1.68-.1-.39-.1-.9-.3-1.55-.58-2.73-1.18-4.5-3.96-4.64-4.15-.14-.19-1.1-1.47-1.1-2.8 0-1.33.7-1.98.95-2.25.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.6.46.22.53.75 1.83.82 1.96.07.14.11.3.02.48-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.35-.22.6-.13.24.09 1.54.73 1.8.86.27.14.45.2.51.32.07.12.07.68-.15 1.28z" />
        </svg>
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={
          "w-[54px] h-[54px] rounded-full bg-navy flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] transition-all " +
          (showTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      >
        <ArrowUp size={20} className="text-white" />
      </button>
    </div>
  );
}
