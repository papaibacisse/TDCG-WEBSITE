"use client";

import { FormEvent, useMemo, useState } from "react";
import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";
import { SECTORS, EXPERTISE_DOMAINS, BUDGET_OPTIONS, COMPANY_SIZE_OPTIONS } from "@/lib/constants";
import { useAutoCloseOnSuccess } from "@/lib/useAutoCloseOnSuccess";

function formatFcfa(n: number) {
  return Math.round(n).toLocaleString("fr-FR").replace(/\u202f|,/g, " ") + " FCFA";
}

export default function DevisModal() {
  const { activeModal, closeModal, openModal } = useModal();
  const isOpen = activeModal === "devis";

  const [secteur, setSecteur] = useState<string>(SECTORS[0].name);
  const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[0]);
  const [multiplier, setMultiplier] = useState<string>(COMPANY_SIZE_OPTIONS[0].value);
  const [selectedObjectifs, setSelectedObjectifs] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useAutoCloseOnSuccess(status, isOpen, closeModal, setStatus);

  function toggleObjectif(name: string) {
    setSelectedObjectifs((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  }

  const estimate = useMemo(() => {
    if (!selectedObjectifs.length) return null;
    const base = EXPERTISE_DOMAINS.filter((d) => selectedObjectifs.includes(d.name)).reduce(
      (sum, d) => sum + d.devisBasePrice,
      0
    );
    const total = base * Number(multiplier);
    return { low: total * 0.85, high: total * 1.15 };
  }, [selectedObjectifs, multiplier]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;
    const tailleLabel = COMPANY_SIZE_OPTIONS.find((o) => o.value === multiplier)?.label ?? "";
    const objectifs = selectedObjectifs.join(", ") || "Non précisé";
    const estimateText = estimate ? `${formatFcfa(estimate.low)} — ${formatFcfa(estimate.high)}` : "Non calculée";

    setStatus("loading");
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: get("prenom"),
          nomfamille: get("nomfamille"),
          email: get("email"),
          secteur,
          budget,
          tailleLabel,
          objectifs,
          estimateText,
          website: get("website"),
        }),
      });
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
      setSelectedObjectifs([]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      boxClassName="bg-navy rounded-sm max-w-[680px] w-full max-h-[90vh] overflow-y-auto shadow-modal p-11"
      showDefaultClose
      closeButtonLight
      labelledBy="devis-modal-title"
    >
      <div className="flex flex-col gap-3.5 mb-7">
        <span className="inline-flex items-center gap-2 self-start border border-gold/40 text-gold bg-gold-soft text-[13px] font-semibold px-4 py-2 rounded-full">
          ✦ Calculateur de devis
        </span>
        <h3 id="devis-modal-title" className="font-display text-[clamp(24px,3vw,30px)] text-white leading-tight">
          Estimez votre projet en quelques clics.
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          Renseignez votre contexte pour obtenir une fourchette de prix indicative en FCFA. Un consultant affinera cette estimation lors d&apos;un échange.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        />
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
          Quel est votre secteur ?
          <select value={secteur} onChange={(e) => setSecteur(e.target.value)} className={inputClass + " dark-select"}>
            {SECTORS.map((s) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          Quel est votre budget ?
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass + " dark-select"}>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-white/85">
          Combien d&apos;employés ?
          <select value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className={inputClass + " dark-select"}>
            {COMPANY_SIZE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-[13.5px] font-semibold text-white/85">
            Objectifs ? <em className="font-normal not-italic text-white/45">(plusieurs choix possibles)</em>
          </span>
          <div className="flex flex-wrap gap-2.5 mt-2.5">
            {EXPERTISE_DOMAINS.map((d) => (
              <button
                type="button"
                key={d.name}
                onClick={() => toggleObjectif(d.name)}
                className={
                  "text-[13.5px] font-medium rounded-full px-[18px] py-2.5 border transition-colors " +
                  (selectedObjectifs.includes(d.name)
                    ? "bg-gold border-gold text-black font-semibold"
                    : "bg-white/5 border-white/18 text-white/75 hover:border-gold/50")
                }
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.06] border border-gold/35 rounded-sm px-5 py-5 flex flex-col gap-1.5">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-gold">Estimation indicative</span>
          <span className="font-display text-2xl text-white font-semibold">
            {estimate ? `${formatFcfa(estimate.low)} — ${formatFcfa(estimate.high)}` : "Sélectionnez au moins un objectif"}
          </span>
          {estimate && (
            <span className="text-xs text-white/50">
              Basé sur {selectedObjectifs.length} objectif{selectedObjectifs.length > 1 ? "s" : ""} sélectionné
              {selectedObjectifs.length > 1 ? "s" : ""}.
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full justify-center bg-gold hover:bg-gold-hover disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold text-[14.5px] rounded-full py-4 mt-1 transition-colors"
        >
          {status === "loading" ? "Envoi en cours..." : "Recevoir mon devis détaillé"}
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
          <button type="button" onClick={() => openModal("privacy")} className="underline underline-offset-2 text-white/75 hover:text-gold">
            politique de confidentialité
          </button>
          .
        </p>
        <p className="text-[11.5px] text-white/40 text-center">
          Cette estimation est fournie à titre indicatif et ne constitue pas un engagement contractuel.
        </p>
      </form>
    </Modal>
  );
}

const inputClass =
  "bg-white/5 border border-white/15 rounded-sm px-4 py-3.5 text-white text-[14.5px] focus:outline-none focus:border-gold focus:bg-white/[0.08]";
