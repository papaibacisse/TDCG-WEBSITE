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
          Conditions Générales d&apos;Utilisation (CGU)
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
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : 9 août 2026</p>
        <p>
          Bienvenue sur le site internet de Teranga Digital Consulting Group (TDCG), accessible à l&apos;adresse{" "}
          <strong className="text-navy">{SITE.domain}</strong>. L&apos;utilisation du site implique l&apos;acceptation
          pleine et entière des présentes Conditions Générales d&apos;Utilisation (CGU). Tout utilisateur accédant au
          site déclare en avoir pris connaissance et les accepter sans réserve. TDCG ne dispose, à ce jour,
          d&apos;aucune application mobile associée à ce site.
        </p>

        <Article n={1} title="Objet et acceptation">
          Le site {SITE.domain} est édité par Teranga Digital Consulting Group (TDCG), cabinet de conseil en
          stratégie, transformation digitale, communication et solutions numériques. Slogan : « {SITE.tagline} ». En
          naviguant sur le site, l&apos;utilisateur s&apos;engage à respecter les présentes CGU et à faire un usage
          strictement personnel du site.
        </Article>

        <Article n={2} title="Modification des CGU">
          Ces conditions sont susceptibles d&apos;être modifiées ou complétées à tout moment, sans préavis. Les
          utilisateurs sont invités à les consulter régulièrement. Les modifications entrent en vigueur dès leur mise
          en ligne. En cas de désaccord avec les CGU modifiées, l&apos;utilisateur doit cesser toute utilisation du
          site.
        </Article>

        <Article n={3} title="Description des services fournis">
          Le site a pour objet de présenter les activités du cabinet (audit digital, conseil stratégique, stratégie
          marketing, digitalisation, communication, gestion de projets), de permettre la prise de contact et la
          demande de devis ou d&apos;audit. TDCG s&apos;efforce de fournir des informations aussi précises que
          possible, sans pouvoir être tenu responsable des omissions, inexactitudes ou carences de mise à jour. Les
          informations diffusées sont données à titre indicatif, non exhaustif, et susceptibles d&apos;évoluer.
        </Article>

        <Article n={4} title="Limitations contractuelles sur les données techniques">
          Le site est développé avec les technologies JavaScript/TypeScript, au moyen du framework Next.js (React).
          TDCG ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du site. L&apos;utilisateur
          s&apos;engage à y accéder avec un matériel récent, exempt de virus, et un navigateur à jour.
        </Article>

        <Article n={5} title="Propriété intellectuelle et contrefaçons">
          Toute reproduction, représentation, publication ou adaptation de tout ou partie des éléments du site
          (logo, textes, illustrations, charte graphique, codes sources), par quelque procédé que ce soit, est
          interdite sauf autorisation écrite préalable de TDCG. Toute exploitation non autorisée sera considérée
          comme constitutive d&apos;une contrefaçon.
        </Article>

        <Article n={6} title="Limitations de responsabilité">
          TDCG ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de
          l&apos;utilisateur lors de l&apos;accès au site, ni du contenu des sites tiers accessibles via des liens
          hypertextes présents sur le site. Un espace de contact est mis à disposition des utilisateurs ; TDCG se
          réserve le droit de supprimer tout contenu contrevenant à la législation applicable, notamment en matière
          de protection des données.
        </Article>

        <Article n={7} title="Cookies">
          La navigation sur le site est susceptible de provoquer l&apos;installation de cookies sur
          l&apos;ordinateur de l&apos;utilisateur, destinés à faciliter la navigation et à mesurer la fréquentation
          du site. Le refus d&apos;installation d&apos;un cookie peut entraîner l&apos;impossibilité d&apos;accéder à
          certains services. L&apos;utilisateur peut gérer ses préférences à tout moment via les paramètres de son
          navigateur.
        </Article>

        <Article n={8} title="Protection des données personnelles">
          Les données collectées via les formulaires sont utilisées pour répondre aux demandes, établir des devis et
          assurer le suivi commercial. L&apos;utilisateur dispose d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, d&apos;opposition, de limitation et de portabilité, conformément à la loi n° 2008-12 du
          25 janvier 2008 portant sur la protection des données à caractère personnel. Toute demande peut être
          adressée à : <strong className="text-navy">{SITE.email}</strong>.
        </Article>

        <Article n={9} title="Principales lois concernées">
          Loi n° 2008-08 du 25 janvier 2008 sur les transactions électroniques.
          <br />
          Loi n° 2008-12 du 25 janvier 2008 portant sur la protection des données à caractère personnel.
          <br />
          Ainsi que les dispositions applicables du Code des Obligations Civiles et Commerciales du Sénégal.
        </Article>

        <Article n={10} title="Lexique">
          <strong className="text-navy">Utilisateur</strong> : internaute se connectant et utilisant le site
          susnommé.
          <br />
          <strong className="text-navy">Informations personnelles</strong> : informations qui permettent, sous
          quelque forme que ce soit, directement ou non, l&apos;identification des personnes physiques auxquelles
          elles s&apos;appliquent, au sens de la loi n° 2008-12 du 25 janvier 2008.
        </Article>

        <Article n={11} title="Droit applicable et juridiction compétente">
          Les présentes CGU sont régies par le droit sénégalais. Tout différend relève de la compétence des
          juridictions sénégalaises compétentes.
        </Article>

        <Article n={12} title="Contact">
          Teranga Digital Consulting Group (TDCG)
          <br />
          Site web : {SITE.domain}
          <br />
          Email : {SITE.email}
          <br />
          Téléphone : {SITE.phones.join(" / ")}
          <br />
          Adresse : {SITE.address}
        </Article>

        <p>
          En naviguant sur le site {SITE.domain}, l&apos;utilisateur reconnaît avoir pris connaissance des présentes
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
