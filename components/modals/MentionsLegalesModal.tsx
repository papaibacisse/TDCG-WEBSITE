"use client";

import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";
import { SITE } from "@/lib/constants";

export default function MentionsLegalesModal() {
  const { activeModal, closeModal } = useModal();
  const isOpen = activeModal === "mentions-legales";

  return (
    <Modal isOpen={isOpen} onClose={closeModal} labelledBy="mentions-modal-title">
      <div className="flex items-center justify-between px-8 py-6 border-b border-navy/10">
        <h3 id="mentions-modal-title" className="text-[22px] text-navy font-display">
          Mentions légales
        </h3>
      </div>
      <button
        onClick={closeModal}
        aria-label="Fermer"
        className="absolute top-6 right-6 w-9 h-9 rounded-full border border-navy/15 flex items-center justify-center hover:bg-navy hover:border-navy transition-colors group"
      >
        <span className="text-navy group-hover:text-white text-lg leading-none">×</span>
      </button>

      <div className="px-8 pb-9 pt-2 overflow-y-auto text-[14.5px] leading-relaxed text-grey space-y-3">
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : 8 août 2026</p>

        <Section title="Éditeur du site">
          Le site {SITE.domain} est édité par Teranga Digital Consulting Group (TDCG).
          <br />
          Forme juridique : <em className="text-navy/60">[à compléter]</em>
          <br />
          Numéro RCCM : <em className="text-navy/60">[à compléter]</em>
          <br />
          Numéro NINEA : <em className="text-navy/60">[à compléter]</em>
          <br />
          Siège social : {SITE.address}
          <br />
          Chargé de la publication : Teranga Digital Consulting Group (TDCG)
          <br />
          Email : <strong className="text-navy">{SITE.email}</strong>
          <br />
          Téléphone : {SITE.phones.join(" / ")}
        </Section>

        <Section title="Hébergement">
          Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          <br />
          La messagerie électronique du cabinet est hébergée par Infomaniak Network SA, rue Eugène-Marziano 25,
          1227 Les Acacias, Genève, Suisse.
        </Section>

        <Section title="Propriété intellectuelle">
          L&apos;ensemble du contenu de ce site (textes, logo, charte graphique, structure) est la propriété de TDCG,
          sauf mention contraire, et ne peut être reproduit sans autorisation écrite préalable.
        </Section>

        <Section title="Responsabilité">
          TDCG s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site, sans pouvoir
          garantir l&apos;absence totale d&apos;erreurs ou d&apos;omissions.
        </Section>

        <Section title="Contact">
          Pour toute question relative aux présentes mentions légales, vous pouvez nous écrire à{" "}
          <strong className="text-navy">{SITE.email}</strong>.
        </Section>

        <p className="text-[12.5px] text-navy/40 italic">
          Note interne : les champs marqués « à compléter » doivent être renseignés avec les informations légales
          exactes de la structure (forme juridique, RCCM, NINEA, dirigeant) avant publication définitive.
        </p>
      </div>
    </Modal>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-navy font-semibold text-[15px] mt-5 mb-2">{title}</h4>
      <p>{children}</p>
    </div>
  );
}
