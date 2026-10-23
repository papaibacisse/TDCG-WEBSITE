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
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : octobre 2026</p>

        <p>
          Teranga Digital Consulting Group (TDCG) attache une importance particulière à la protection des données
          à caractère personnel. La présente politique est établie conformément à la{" "}
          <strong className="text-navy">loi n° 2008-12 du 25 janvier 2008</strong> portant sur la protection des
          données à caractère personnel au Sénégal et aux recommandations de la{" "}
          <strong className="text-navy">Commission de Protection des Données Personnelles (CDP)</strong>.
        </p>

        <Section n={1} title="Responsable du traitement">
          <strong className="text-navy">Teranga Digital Consulting Group (TDCG)</strong><br />
          SUARL — RCCM : SN.LGA.2026.A.1 — NINEA : 013468039<br />
          {SITE.address}<br />
          E-mail : <strong className="text-navy">{SITE.email}</strong>
        </Section>

        <Section n={2} title="Données collectées">
          <strong className="text-navy">a) Données fournies directement</strong><br />
          Nom, prénom, dénomination sociale, fonction, adresse e-mail, numéro de téléphone, secteur
          d&apos;activité, description du projet ou de la demande, via nos formulaires de contact, de devis ou
          d&apos;audit.<br /><br />
          <strong className="text-navy">b) Données collectées automatiquement</strong><br />
          Adresse IP, type et version du navigateur, système d&apos;exploitation, pages consultées, durée de
          visite, données de navigation (cookies techniques et analytiques avec votre consentement).
        </Section>

        <Section n={3} title="Finalités et bases légales du traitement">
          Conformément à l&apos;article 18 de la loi n° 2008-12, tout traitement repose sur une base légale :<br /><br />
          — <strong className="text-navy">Consentement (art. 18-1°)</strong> : envoi de communications commerciales, dépôt de cookies non essentiels ;<br />
          — <strong className="text-navy">Exécution d&apos;un contrat ou mesures précontractuelles (art. 18-2°)</strong> : traitement des demandes de contact, de devis et d&apos;audit ;<br />
          — <strong className="text-navy">Intérêt légitime (art. 18-5°)</strong> : amélioration de nos services, sécurité informatique, prévention des abus ;<br />
          — <strong className="text-navy">Obligation légale (art. 18-3°)</strong> : conservation des données comptables et fiscales.
        </Section>

        <Section n={4} title="Durée de conservation">
          — Demandes de contact et prospects : <strong className="text-navy">3 ans</strong> à compter du dernier échange ;<br />
          — Relations contractuelles : durée de la relation, puis <strong className="text-navy">5 ans</strong> au titre des obligations légales comptables (COCC) ;<br />
          — Données de navigation (cookies analytiques) : <strong className="text-navy">13 mois maximum</strong> ;<br />
          — Données de facturation : <strong className="text-navy">10 ans</strong> conformément aux obligations fiscales sénégalaises.
        </Section>

        <Section n={5} title="Destinataires des données">
          Vos données ne sont ni vendues, ni louées à des tiers. Elles peuvent être communiquées à nos
          sous-traitants techniques (hébergement, messagerie, analyse d&apos;audience, outils CRM), tous soumis à des
          engagements contractuels de confidentialité et de sécurité. Ces tiers n&apos;agissent que sur instruction
          de TDCG et ne peuvent utiliser vos données à d&apos;autres fins.
        </Section>

        <Section n={6} title="Transferts hors du Sénégal">
          Certains de nos prestataires (Vercel Inc. — États-Unis, Infomaniak — Suisse) sont établis à
          l&apos;étranger. Ces transferts sont encadrés par des garanties contractuelles appropriées, conformément
          à l&apos;article 47 de la loi n° 2008-12, afin d&apos;assurer un niveau de protection équivalent à
          celui garanti au Sénégal.
        </Section>

        <Section n={7} title="Sécurité des données">
          TDCG met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données
          contre toute perte, destruction, altération, accès ou divulgation non autorisés, conformément à
          l&apos;article 37 de la loi n° 2008-12 :<br /><br />
          — Chiffrement des communications (protocole HTTPS/TLS) ;<br />
          — Contrôle strict des accès internes ;<br />
          — Sauvegardes régulières et sécurisées ;<br />
          — Surveillance continue de la sécurité des systèmes.
        </Section>

        <Section n={8} title="Vos droits">
          Conformément aux articles 39 à 44 de la loi n° 2008-12, vous disposez des droits suivants :<br /><br />
          — <strong className="text-navy">Droit d&apos;information et d&apos;accès</strong> : connaître les données vous concernant ;<br />
          — <strong className="text-navy">Droit de rectification</strong> : corriger des données inexactes ou incomplètes ;<br />
          — <strong className="text-navy">Droit d&apos;effacement</strong> : demander la suppression de vos données ;<br />
          — <strong className="text-navy">Droit d&apos;opposition</strong> : vous opposer à un traitement fondé sur l&apos;intérêt légitime ;<br />
          — <strong className="text-navy">Droit à la limitation</strong> : restreindre temporairement un traitement ;<br />
          — <strong className="text-navy">Droit au retrait du consentement</strong> : à tout moment, sans effet rétroactif.<br /><br />
          Pour exercer ces droits, adressez votre demande à :{" "}
          <strong className="text-navy">{SITE.email}</strong>. TDCG s&apos;engage à répondre dans un délai de{" "}
          <strong className="text-navy">30 jours</strong> à compter de la réception de votre demande.
        </Section>

        <Section n={9} title="Cookies">
          Le site utilise des cookies nécessaires au bon fonctionnement technique et, avec votre consentement
          préalable, des cookies analytiques pour mesurer l&apos;audience. Vous pouvez gérer vos préférences à
          tout moment via le bandeau de gestion des cookies accessible en bas de page.<br /><br />
          Conformément à la recommandation de la CDP, aucun cookie non essentiel n&apos;est déposé sans votre
          consentement exprès.
        </Section>

        <Section n={10} title="Protection des mineurs">
          Le site est exclusivement destiné aux professionnels, entreprises et organisations. TDCG ne collecte
          sciemment aucune donnée concernant des personnes âgées de moins de 18 ans. Si de telles données nous
          parvenaient à notre insu, elles seraient supprimées sans délai.
        </Section>

        <Section n={11} title="Réclamation auprès de la CDP">
          Si vous estimez que vos droits ne sont pas respectés, vous disposez du droit d&apos;introduire une
          réclamation auprès de la{" "}
          <strong className="text-navy">Commission de Protection des Données Personnelles (CDP)</strong> du
          Sénégal, autorité de contrôle compétente en vertu de la loi n° 2008-12.<br /><br />
          CDP — 18, rue Parchappe × Vincens, Dakar, Sénégal — cdp.sn
        </Section>

        <Section n={12} title="Évolution de la politique">
          TDCG se réserve le droit de modifier la présente politique à tout moment pour l&apos;adapter aux
          évolutions réglementaires ou technologiques. Toute modification substantielle sera portée à la
          connaissance des utilisateurs via ce site.
        </Section>

        <Section n={13} title="Contact — Délégué à la protection des données">
          Pour toute question relative à la protection de vos données personnelles :<br /><br />
          Teranga Digital Consulting Group (TDCG)<br />
          {SITE.address}<br />
          E-mail : <strong className="text-navy">{SITE.email}</strong>
        </Section>
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
