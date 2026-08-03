"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { FAQ_ITEMS } from "@/lib/constants";

export default function Faq() {
  const { openModal } = useModal();
  const headRef = useReveal();
  const gridRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-grey-light py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div ref={headRef} className="reveal max-w-[640px] mb-16">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-gold mb-4">
            <span className="w-6 h-px bg-gold" /> Questions fréquentes
          </div>
          <h2 className="font-display text-[clamp(30px,3.4vw,44px)] text-navy leading-tight">
            Tout ce qu&apos;il faut savoir avant de démarrer.
          </h2>
        </div>

        <div ref={gridRef} className="reveal grid md:grid-cols-[1fr_320px] gap-14 items-start">
          <div className="max-w-[760px]">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="border-b border-navy/[0.12]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex justify-between items-center gap-4 py-[26px] text-left text-[16.5px] font-semibold text-navy"
                  >
                    {item.q}
                    <Plus size={20} className={"text-gold shrink-0 transition-transform duration-300 " + (isOpen ? "rotate-45" : "")} />
                  </button>
                  <div className={"overflow-hidden transition-[max-height] duration-[350ms] ease-premium " + (isOpen ? "max-h-[240px]" : "max-h-0")}>
                    <p className="text-[14.5px] text-grey max-w-[640px] pb-6">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-navy/10 rounded-sm p-9 flex flex-col gap-[22px] md:sticky md:top-[110px]">
            <p className="text-[15.5px] text-navy leading-relaxed">
              Une question qui n&apos;est pas ici ? Écrivez-nous, on revient vers vous rapidement.
            </p>
            <button
              onClick={() => openModal("contact")}
              className="w-full justify-center bg-navy hover:bg-black text-white font-semibold text-[14.5px] rounded-sm px-7 py-4 transition-colors"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
