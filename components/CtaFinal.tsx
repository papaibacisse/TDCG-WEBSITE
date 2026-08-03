"use client";

import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";

export default function CtaFinal() {
  const { openModal } = useModal();
  const ref = useReveal();

  return (
    <section id="contact" className="bg-navy text-white text-center py-[120px] relative overflow-hidden">
      <div ref={ref} className="reveal max-w-[1240px] mx-auto px-8">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4 justify-center w-full">
          <span className="w-6 h-px bg-gold" /> Passons à l&apos;action
        </div>
        <h2 className="font-display text-[clamp(32px,4vw,48px)] max-w-[680px] mx-auto mb-6 text-white leading-tight">
          Prêt à transformer vos idées en résultats ?
        </h2>
        <p className="text-white/65 max-w-[520px] mx-auto mb-10 text-[16.5px]">
          Échangez gratuitement avec un consultant TDCG et recevez une première analyse de vos enjeux sous 48h.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => openModal("devis")}
            className="bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors"
          >
            Demander un devis
          </button>
          <button
            onClick={() => openModal("contact")}
            className="bg-white hover:bg-grey-light text-navy font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors"
          >
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
}
