"use client";

import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";
import { SITE } from "@/lib/constants";

export default function CguModal() {
  const { activeModal, closeModal } = useModal();
  const isOpen = activeModal === "cgu";

  return (
    <Modal isOpen={isOpen} onClose={closeModal} labelledBy="cgu-modal-title">
      <div className="flex items-center justify-between px-8 py-6 border-b border-navy/10">
        <h3 id="cgu-modal-title" className="text-[22px] text-navy font-display">
          Conditions Générales d&apos;Utilisation
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

        <p>
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du
          site internet <strong className="text-navy">{SITE.domain}</strong>, édité par Teranga Digital Consulting
          Group (TDCG). Elles sont établies conformément au droit sénégalais applicable, notamment la{" "}
          <strong className="text-navy">loi n° 2008-08 du 25 janvier 2008</strong> sur les transactions
          électroniques et la{" "}
          <strong className="text-navy">loi n° 2008-12 du 25 janvier 2008</strong> sur la protection des données
          à caractère personnel.<br /><br />
          En accédant au site, l&apos;utilisateur reconnaît avoir pris connaissance des présentes CGU et
          les accepter sans réserve.
        </p>

        <Article n={1} title="Objet">
          Le site {SITE.domain} a pour objet de présenter les activités de TDCG — cabinet de conseil en
          transformation digitale, intelligence artificielle, stratégie digitale et performance business — et de
          permettre aux visiteurs de prendre contact, demander un devis ou solliciter un audit. Les informations
          publiées sont fournies à titre indicatif et ne constituent pas une offre contractuelle ferme.
        </Article>

        <Article n={2} title="Accès au site">
          Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à internet. Les frais
          d&apos;accès (connexion, matériel) restent à la charge de l&apos;utilisateur. TDCG se réserve le droit
          de suspendre, modifier ou interrompre l&apos;accès au site à tout moment, sans préavis ni indemnité,
          pour des raisons techniques, de maintenance ou de sécurité.
        </Article>

        <Article n={3} title="Conditions d'utilisation">
          L&apos;utilisateur s&apos;engage à :<br /><br />
          — Utiliser le site dans le strict respect des lois et règlements en vigueur au Sénégal ;<br />
          — Ne pas porter atteinte à l&apos;ordre public, aux droits des tiers ni à la réputation de TDCG ;<br />
          — Ne pas tenter d&apos;accéder sans autorisation aux systèmes informatiques du site ;<br />
          — Ne pas diffuser de contenus illicites, malveillants ou frauduleux via les formulaires du site ;<br />
          — Ne pas utiliser le site à des fins commerciales sans autorisation préalable écrite de TDCG.<br /><br />
          Tout manquement à ces obligations peut engager la responsabilité civile et pénale de l&apos;utilisateur,
          notamment au titre de la <strong className="text-navy">loi n° 2008-11 du 25 janvier 2008</strong>{" "}
          portant sur la cybercriminalité.
        </Article>

        <Article n={4} title="Propriété intellectuelle">
          Conformément aux dispositions du droit sénégalais applicable à la propriété intellectuelle, l&apos;ensemble
          des éléments du site (logo, dénomination, textes, charte graphique, structure, codes sources, visuels)
          est la propriété exclusive de TDCG.<br /><br />
          Toute reproduction, représentation, traduction, adaptation ou exploitation commerciale, totale ou
          partielle, par quelque procédé que ce soit, sans autorisation écrite préalable de TDCG, est interdite
          et constitutive de contrefaçon.
        </Article>

        <Article n={5} title="Données personnelles">
          Les données collectées via les formulaires du site font l&apos;objet d&apos;un traitement par TDCG en
          qualité de responsable du traitement, conformément à la{" "}
          <strong className="text-navy">loi n° 2008-12 du 25 janvier 2008</strong> sur la protection des données
          à caractère personnel.<br /><br />
          Elles sont utilisées aux seules fins de traitement des demandes, d&apos;établissement de devis et de suivi
          commercial. L&apos;utilisateur dispose des droits d&apos;accès, de rectification, d&apos;effacement,
          d&apos;opposition et de portabilité, exerçables à l&apos;adresse :{" "}
          <strong className="text-navy">{SITE.email}</strong>.<br /><br />
          Pour plus de détails, consultez notre{" "}
          <strong className="text-navy">Politique de confidentialité</strong>.
        </Article>

        <Article n={6} title="Cookies">
          Le site utilise des cookies nécessaires à son fonctionnement technique. Des cookies analytiques
          peuvent également être déposés avec votre consentement préalable, conformément à la réglementation
          en vigueur. L&apos;utilisateur peut gérer ses préférences à tout moment via le bandeau de gestion des
          cookies accessible sur le site.
        </Article>

        <Article n={7} title="Responsabilité de TDCG">
          TDCG met tout en œuvre pour assurer la disponibilité et l&apos;exactitude des informations du site.
          Toutefois, sa responsabilité ne saurait être engagée pour :<br /><br />
          — Des inexactitudes, omissions ou erreurs dans les informations publiées ;<br />
          — Toute interruption ou indisponibilité du site liée à des raisons techniques ou de force majeure ;<br />
          — Tout dommage indirect résultant de l&apos;utilisation du site ou de ses contenus ;<br />
          — Les contenus des sites tiers vers lesquels des liens sont proposés.
        </Article>

        <Article n={8} title="Transactions électroniques">
          Conformément à la <strong className="text-navy">loi n° 2008-08 du 25 janvier 2008</strong> sur les
          transactions électroniques, toute demande de devis ou d&apos;audit soumise via le site constitue une
          expression d&apos;intérêt commerciale et non un engagement contractuel ferme. Un contrat ne sera formé
          qu&apos;après signature d&apos;une convention de prestation entre les parties. Les communications
          électroniques échangées ont valeur de preuve dans les conditions prévues par ladite loi.
        </Article>

        <Article n={9} title="Liens hypertextes">
          Le site peut contenir des liens vers des sites internet tiers. TDCG n&apos;exerce aucun contrôle sur
          ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques
          en matière de données personnelles. La création de liens vers le site {SITE.domain} est soumise à
          autorisation préalable écrite de TDCG.
        </Article>

        <Article n={10} title="Modification des CGU">
          TDCG se réserve le droit de modifier les présentes CGU à tout moment, sans préavis. Les nouvelles
          CGU entrent en vigueur dès leur mise en ligne. L&apos;utilisation continue du site après modification
          vaut acceptation des nouvelles conditions. Il appartient à l&apos;utilisateur de les consulter
          régulièrement.
        </Article>

        <Article n={11} title="Lois applicables">
          Les présentes CGU sont régies par les textes sénégalais suivants :<br /><br />
          — <strong className="text-navy">Loi n° 2008-08</strong> du 25 janvier 2008 sur les transactions électroniques ;<br />
          — <strong className="text-navy">Loi n° 2008-10</strong> du 25 janvier 2008 portant loi d&apos;orientation sur la société de l&apos;information ;<br />
          — <strong className="text-navy">Loi n° 2008-11</strong> du 25 janvier 2008 portant sur la cybercriminalité ;<br />
          — <strong className="text-navy">Loi n° 2008-12</strong> du 25 janvier 2008 sur la protection des données à caractère personnel ;<br />
          — Les dispositions pertinentes du <strong className="text-navy">Code des Obligations Civiles et Commerciales (COCC)</strong> du Sénégal.
        </Article>

        <Article n={12} title="Règlement des litiges et juridiction compétente">
          En cas de différend relatif à l&apos;utilisation du site, les parties s&apos;engagent à rechercher une
          solution amiable avant tout recours judiciaire. À défaut de résolution amiable dans un délai de
          30 jours, tout litige sera soumis aux <strong className="text-navy">juridictions sénégalaises
          compétentes</strong>, conformément au droit sénégalais.
        </Article>

        <Article n={13} title="Contact">
          Teranga Digital Consulting Group (TDCG)<br />
          {SITE.address}<br />
          E-mail : <strong className="text-navy">{SITE.email}</strong>
        </Article>

        <p className="text-[13px] text-navy/50 italic border-t border-navy/10 pt-4 mt-4">
          En naviguant sur {SITE.domain}, l&apos;utilisateur reconnaît avoir pris connaissance des présentes
          Conditions Générales d&apos;Utilisation et s&apos;engage à les respecter.
        </p>
      </div>
    </Modal>
  );
}

function Article({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-navy font-semibold text-[15px] mt-5 mb-2">
        Article {n} – {title}
      </h4>
      <p>{children}</p>
    </div>
  );
}
