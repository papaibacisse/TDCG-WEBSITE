"use client";

import { FormEvent, useState } from "react";
import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";
import { SITE } from "@/lib/constants";

const SERVICES = [
  "Audit digital",
  "Stratégie marketing",
  "Digitalisation",
  "Conseil stratégique",
  "Communication",
  "Gestion de projets",
];

export default function ContactModal() {
  const { activeModal, closeModal, openModal } = useModal();
  const isOpen = activeModal === "contact";
  const [selected, setSelected] = useState<string[]>([]);

  function toggleService(s: string) {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const entreprise = (form.elements.namedItem("entreprise") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const services = selected.join(", ") || "Non précisé";
    const body = `Nom : ${nom}%0AEmail : ${email}%0AEntreprise : ${entreprise}%0AServices souhaités : ${services}%0A%0AMessage :%0A${message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      "Nouvelle demande depuis le site TDCG"
    )}&body=${body}`;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      boxClassName="bg-navy rounded-sm max-w-[980px] w-full max-h-[88vh] overflow-y-auto shadow-modal"
      showDefaultClose
      closeButtonLight
      labelledBy="contact-modal-title"
    >
      <div className="grid md:grid-cols-[1fr_1.15fr]">
        <div className="p-11 flex flex-col gap-5">
          <span className="inline-flex items-center gap-2 self-start border border-gold/40 text-gold bg-gold-soft text-[13px] font-semibold px-4 py-2 rounded-full">
            ✦ On vous écoute
          </span>
          <h3 id="contact-modal-title" className="font-display text-[clamp(28px,3vw,38px)] text-white leading-tight">
            Parlons de votre visibilité.
          </h3>
          <p className="text-white/60 text-[15px] max-w-[340px] leading-relaxed">
            Une question, un projet ? Écrivez-nous et un spécialiste vous répond sous 24h ouvrées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border-l border-white/10 p-11 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Nom complet*
            <input
              name="nom"
              type="text"
              required
              placeholder="Kingsley Cisse"
              className="bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/35 text-[14.5px] focus:outline-none focus:border-gold focus:bg-white/[0.08]"
            />
          </label>
          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Email professionnel*
            <input
              name="email"
              type="email"
              required
              placeholder="Kingsley@votre-entreprise.sn"
              className="bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/35 text-[14.5px] focus:outline-none focus:border-gold focus:bg-white/[0.08]"
            />
          </label>
          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Entreprise*
            <input
              name="entreprise"
              type="text"
              required
              placeholder="Ex. : TDCG SARL"
              className="bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/35 text-[14.5px] focus:outline-none focus:border-gold focus:bg-white/[0.08]"
            />
          </label>

          <div>
            <span className="text-[13.5px] font-semibold text-white/85">
              Quels services vous intéressent ? <em className="font-normal not-italic text-white/45">(plusieurs choix possibles)</em>
            </span>
            <div className="flex flex-wrap gap-2.5 mt-2.5">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleService(s)}
                  className={
                    "text-[13.5px] font-medium rounded-full px-[18px] py-2.5 border transition-colors " +
                    (selected.includes(s)
                      ? "bg-gold border-gold text-black font-semibold"
                      : "bg-white/5 border-white/18 text-white/75 hover:border-gold/50")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Votre message*
            <textarea
              name="message"
              required
              placeholder="Dites-nous en quelques mots ce qui vous amène..."
              className="bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/35 text-[14.5px] min-h-[110px] resize-y focus:outline-none focus:border-gold focus:bg-white/[0.08]"
            />
          </label>

          <button
            type="submit"
            className="w-full justify-center bg-gold hover:bg-gold-hover text-black font-semibold text-[14.5px] rounded-full py-4 mt-1 transition-colors"
          >
            Envoyer mon message
          </button>
          <p className="text-[12.5px] text-white/45 text-center">
            En soumettant, vous acceptez notre{" "}
            <button
              type="button"
              onClick={() => openModal("privacy")}
              className="underline underline-offset-2 text-white/75 hover:text-gold"
            >
              politique de confidentialité
            </button>
            .
          </p>
        </form>
      </div>
    </Modal>
  );
}
