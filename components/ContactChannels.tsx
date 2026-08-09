"use client";

import { Mail, Phone } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import { useReveal } from "@/lib/useReveal";
import { SITE } from "@/lib/constants";

export default function ContactChannels() {
  const { openModal } = useModal();
  const ref = useReveal();

  return (
    <section id="contact-canaux" className="bg-white py-[120px] scroll-mt-24">
      <div ref={ref} className="reveal max-w-[1240px] mx-auto px-8">
        <h2 className="font-display text-[clamp(28px,3.4vw,40px)] text-navy text-center mb-16">
          Vous préférez un autre canal ?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          <div className="bg-grey-light border border-navy/[0.06] rounded-md p-9">
            <div className="w-[52px] h-[52px] rounded-full bg-navy flex items-center justify-center mb-6">
              <Mail size={20} className="text-white" />
            </div>
            <h3 className="text-[19px] text-navy font-semibold mb-2.5">Écrivez-nous</h3>
            <p className="text-grey text-[14.5px] mb-6 leading-relaxed">
              Une question, un projet ? Passez par le formulaire, on vous répond vite.
            </p>
            <button
              onClick={() => openModal("contact")}
              className="text-[14.5px] font-semibold text-navy underline underline-offset-4 decoration-navy/30 hover:decoration-navy transition-colors"
            >
              Formulaire de contact
            </button>
          </div>

          <div className="bg-grey-light border border-navy/[0.06] rounded-md p-9">
            <div className="w-[52px] h-[52px] rounded-full bg-navy flex items-center justify-center mb-6">
              <Phone size={20} className="text-white" />
            </div>
            <h3 className="text-[19px] text-navy font-semibold mb-2.5">Au téléphone</h3>
            <p className="text-grey text-[14.5px] mb-1 leading-relaxed">Lundi – Jeudi : 9h – 17h</p>
            <p className="text-grey text-[14.5px] mb-1 leading-relaxed">
              Vendredi : 8h30 – 13h &amp; 15h – 18h <span className="text-grey/70">(pause 13h–15h)</span>
            </p>
            <p className="text-grey text-[14.5px] mb-6 leading-relaxed">Samedi : 9h – 12h</p>
            <a
              href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
              className="text-[17px] font-semibold text-navy underline underline-offset-4 decoration-navy/30 hover:decoration-navy transition-colors"
            >
              {SITE.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
