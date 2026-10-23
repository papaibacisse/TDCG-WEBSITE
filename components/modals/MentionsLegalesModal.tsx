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
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : octobre 2026</p>

        <Section title="1. Éditeur du site">
          Le site <strong className="text-navy">{SITE.domain}</strong> est édité par :<br /><br />
          <strong className="text-navy">Teranga Digital Consulting Group (TDCG)</strong><br />
          Forme juridique : Société Unipersonnelle à Responsabilité Limitée (SUARL)<br />
          Numéro RCCM : <strong className="text-navy">SN.LGA.2026.A.1</strong><br />
          Numéro NINEA : <strong className="text-navy">013468039</strong><br />
          Siège social : {SITE.address}<br />
          Directeur de la publication : Représentant légal de TDCG<br />
          E-mail : <strong className="text-navy">{SITE.email}</strong>
        </Section>

        <Section title="2. Hébergement">
          Le site est hébergé par :<br /><br />
          <strong className="text-navy">Vercel Inc.</strong><br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
          Site : vercel.com<br /><br />
          La messagerie électronique est hébergée par :<br />
          <strong className="text-navy">Infomaniak Network SA</strong><br />
          Rue Eugène-Marziano 25, 1227 Les Acacias, Genève, Suisse
        </Section>

        <Section title="3. Cadre juridique applicable">
          Le présent site est soumis au droit sénégalais, notamment :<br /><br />
          — <strong className="text-navy">Loi n° 2008-12 du 25 janvier 2008</strong> portant sur la protection des données à caractère personnel ;<br />
          — <strong className="text-navy">Loi n° 2008-10 du 25 janvier 2008</strong> portant loi d&apos;orientation sur la société de l&apos;information ;<br />
          — <strong className="text-navy">Loi n° 2008-11 du 25 janvier 2008</strong> portant sur la cybercriminalité ;<br />
          — Les dispositions applicables du <strong className="text-navy">Code des Obligations Civiles et Commerciales (COCC)</strong> du Sénégal.
        </Section>

        <Section title="4. Propriété intellectuelle">
          L&apos;ensemble des éléments constituant ce site (logo, textes, charte graphique, structure, codes sources,
          visuels) est la propriété exclusive de TDCG et est protégé par les dispositions du droit sénégalais
          applicables à la propriété intellectuelle.<br /><br />
          Toute reproduction, représentation, adaptation, diffusion ou réutilisation, totale ou partielle, par quelque
          procédé que ce soit, sans autorisation écrite préalable de TDCG, est strictement interdite et constitutive
          de contrefaçon au sens de la loi.
        </Section>

        <Section title="5. Responsabilité">
          TDCG s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site.
          Toutefois, TDCG ne saurait être tenu responsable des omissions, inexactitudes, erreurs ou carences de mise à
          jour, qu&apos;elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations.<br /><br />
          TDCG ne saurait être tenu responsable de tout dommage, direct ou indirect, résultant de l&apos;accès au site
          ou de l&apos;utilisation des informations qui y sont contenues, ni de tout préjudice résultant d&apos;une
          indisponibilité du site.
        </Section>

        <Section title="6. Liens hypertextes">
          Le site peut contenir des liens vers des sites tiers. TDCG ne contrôle pas ces sites et décline toute
          responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de données personnelles.
        </Section>

        <Section title="7. Droit applicable et juridiction">
          Les présentes mentions légales sont régies par le droit sénégalais. En cas de litige, et à défaut de
          résolution amiable, les juridictions sénégalaises compétentes seront saisies.
        </Section>

        <Section title="8. Contact">
          Pour toute question relative aux présentes mentions légales :<br /><br />
          Teranga Digital Consulting Group (TDCG)<br />
          {SITE.address}<br />
          E-mail : <strong className="text-navy">{SITE.email}</strong>
        </Section>
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
