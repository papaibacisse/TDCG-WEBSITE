"use client";

import Modal from "./Modal";
import { useModal } from "@/lib/ModalContext";
import { SITE } from "@/lib/constants";

export default function PrivacyModal() {
  const { activeModal, closeModal } = useModal();
  const isOpen = activeModal === "privacy";

  return (
    <Modal isOpen={isOpen} onClose={closeModal} labelledBy="privacy-modal-title">
      <div className="flex items-center justify-between px-8 py-6 border-b border-navy/10">
        <h3 id="privacy-modal-title" className="text-[22px] text-navy font-display">
          Politique de confidentialité
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
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : 29 juillet 2026</p>
        <p>
          Chez Teranga Digital Consulting Group (TDCG), nous accordons une importance particulière à la protection de
          votre vie privée et de vos données personnelles. En utilisant notre site internet{" "}
          <strong className="text-navy">{SITE.domain}</strong>, vous acceptez les pratiques décrites dans cette
          politique.
        </p>

        <Section n={1} title="Qui sommes-nous ?">
          TDCG est un cabinet de conseil spécialisé dans le conseil stratégique, la transformation digitale, le
          marketing digital, la communication, la gestion de projets et la digitalisation des entreprises.
        </Section>

        <Section n={2} title="Les données que nous collectons">
          <p className="mb-2"><strong className="text-navy">Données d&apos;identification</strong> — nom, prénom, entreprise, fonction, e-mail, téléphone.</p>
          <p className="mb-2"><strong className="text-navy">Données professionnelles</strong> — secteur d&apos;activité, taille de l&apos;entreprise, projet exprimé.</p>
          <p><strong className="text-navy">Données techniques</strong> — adresse IP, navigateur, système d&apos;exploitation, pages consultées, cookies.</p>
        </Section>

        <Section n={3} title="Pourquoi collectons-nous vos données ?">
          Pour répondre à vos demandes, établir un devis, organiser un rendez-vous, réaliser un audit digital,
          améliorer nos services, assurer le suivi commercial, envoyer des informations avec votre consentement,
          analyser les performances du site et renforcer la sécurité de nos systèmes.
        </Section>

        <Section n={4} title="Base légale du traitement">
          Consentement, exécution de mesures précontractuelles ou contractuelles, obligations légales, ou intérêt
          légitime à développer et sécuriser nos services.
        </Section>

        <Section n={5} title="Partage des données">
          Vos données ne sont ni vendues ni louées à des tiers. Elles peuvent être communiquées à nos prestataires de
          confiance (hébergement, messagerie, analyse d&apos;audience, prise de rendez-vous, paiement, maintenance),
          tous tenus de garantir un niveau de sécurité approprié.
        </Section>

        <Section n={6} title="Durée de conservation">
          Demandes de contact : jusqu&apos;à 3 ans après le dernier échange. Prospects : jusqu&apos;à 3 ans sans
          interaction. Clients : durée de la relation contractuelle, puis obligations légales. Données de navigation :
          jusqu&apos;à 13 mois pour les cookies soumis à consentement.
        </Section>

        <Section n={7} title="Sécurité des données">
          Protocole HTTPS, chiffrement des données sensibles, sauvegardes régulières, contrôle des accès, surveillance
          de la sécurité.
        </Section>

        <Section n={8} title="Vos droits">
          Droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition, de portabilité, et
          de retrait du consentement. Contact : <strong className="text-navy">{SITE.email}</strong>.
        </Section>

        <Section n={9} title="Cookies">
          Garantir le bon fonctionnement du site, mémoriser vos préférences, mesurer l&apos;audience, améliorer votre
          expérience, réaliser des statistiques anonymisées et optimiser nos campagnes de communication.
        </Section>

        <Section n={10} title="Services tiers">
          Google Analytics, Google Tag Manager, Google Maps, Meta Pixel, LinkedIn Insight Tag, WhatsApp, YouTube.
        </Section>

        <Section n={11} title="Transfert des données">
          Vos données peuvent être transférées ou hébergées en dehors du Sénégal, encadrées par des garanties
          appropriées conformes aux exigences légales applicables.
        </Section>

        <Section n={12} title="Protection des mineurs">
          Notre site est destiné aux professionnels, entreprises et organisations. Nous ne collectons pas
          volontairement de données concernant des personnes de moins de 18 ans.
        </Section>

        <Section n={13} title="Évolution de cette politique">
          Cette politique peut être modifiée pour tenir compte des évolutions réglementaires, technologiques ou des
          nouveaux services proposés.
        </Section>

        <Section n={14} title="Contact">
          Teranga Digital Consulting Group (TDCG)
          <br />
          Site internet : {SITE.domain}
          <br />
          E-mail : {SITE.email}
          <br />
          Téléphone : {SITE.phones.join(" / ")}
          <br />
          Adresse : {SITE.address}
        </Section>

        <Section n={15} title="Réclamation">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de
          l&apos;autorité compétente chargée de la protection des données au Sénégal.
        </Section>

        <div>
          <h4 className="text-navy font-semibold text-[15px] mt-5 mb-2">Notre engagement</h4>
          <p>
            Chez TDCG, la confidentialité, la transparence et la sécurité des données de nos clients et partenaires
            sont au cœur de notre démarche.
          </p>
        </div>
      </div>
    </Modal>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-navy font-semibold text-[15px] mt-5 mb-2">
        {n}. {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}
