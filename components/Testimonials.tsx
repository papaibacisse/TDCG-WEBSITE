"use client";

import { useReveal } from "@/lib/useReveal";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Témoignages
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-navy leading-tight">
            La confiance de nos partenaires.
          </h2>
          <p className="mt-4 text-grey text-[16.5px]">Témoignages représentatifs des retours de nos clients.</p>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-3 gap-7">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-grey-light rounded-sm border-l-2 border-gold p-9">
              <p className="text-[15.5px] italic text-navy mb-[22px] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-display text-[15px]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-[12.5px] text-grey">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
