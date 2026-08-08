"use client";

import { FormEvent, useState } from "react";
import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";

export default function AuditModal() {
  const { activeModal, closeModal, openModal } = useModal();
  const isOpen = activeModal === "audit";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value;
    const tailleSelect = form.elements.namedItem("taille") as HTMLSelectElement;
    const tailleLabel = tailleSelect.options[tailleSelect.selectedIndex]?.text ?? "";

    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: get("prenom"),
          nomfamille: get("nomfamille"),
          email: get("email"),
          entreprise: get("entreprise"),
          url: get("url"),
          tailleLabel,
        }),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      boxClassName="bg-navy rounded-sm max-w-[600px] w-full max-h-[88vh] overflow-y-auto shadow-modal p-11"
      showDefaultClose
      closeButtonLight
      labelledBy="audit-modal-title"
    >
      <div className="flex flex-col gap-4 mb-8">
        <span className="inline-flex items-center gap-2 self-start border border-gold/40 text-gold bg-gold-soft text-[13px] font-semibold px-4 py-2 rounded-full">
          ✦ Audit
        </span>
        <h3 id="audit-modal-title" className="font-display text-[clamp(24px,3vw,30px)] text-white leading-tight">
          Recevez votre audit digital.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Prénom*
            <input name="prenom" required placeholder="Kingsley" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
            Nom*
            <input name="nomfamille" required placeholder="Cisse" className={inputClass} />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          Email professionnel*
          <input name="email" type="email" required placeholder="Kingsley@votre-entreprise.sn" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          Nom de votre entreprise*
          <input name="entreprise" required placeholder="Ex. : TDCG SARL" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          URL de votre site*
          <input name="url" required placeholder="votresite.sn" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          Taille de l&apos;entreprise*
          <select name="taille" required defaultValue="" className={inputClass + " dark-select"}>
            <option value="" disabled>Sélectionner...</option>
            <option value="1-9">1 à 9 employés</option>
            <option value="10-49">10 à 49 employés</option>
            <option value="50-199">50 à 199 employés</option>
            <option value="200+">200 employés et plus</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full justify-center bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold text-[14.5px] rounded-full py-4 mt-1 transition-colors"
        >
          {status === "loading" ? "Envoi en cours..." : "Recevoir mon audit"}
        </button>
        {status === "success" && (
          <p className="text-[13.5px] text-green-400 text-center font-medium">
            Merci ! Votre demande a bien été envoyée, nous revenons vers vous rapidement.
          </p>
        )}
        {status === "error" && (
          <p className="text-[13.5px] text-red-400 text-center font-medium">
            Une erreur est survenue. Réessayez ou écrivez-nous directement à contact@terangadigitalconsultinggroup.com.
          </p>
        )}
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
    </Modal>
  );
}

const inputClass =
  "bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white placeholder-white/35 text-[14.5px] focus:outline-none focus:border-gold focus:bg-white/[0.08]";
