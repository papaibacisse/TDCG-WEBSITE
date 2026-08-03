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
        <p className="font-mono text-[12px] uppercase tracking-wider text-gold">Dernière mise à jour : 29 juillet 2026</p>
        <p>
          Bienvenue sur le site internet de Teranga Digital Consulting Group (TDCG), accessible à l&apos;adresse{" "}
          <strong className="text-navy">{SITE.domain}</strong>. Les présentes Conditions Générales d&apos;Utilisation
          (CGU) ont pour objet de définir les modalités d&apos;accès et d&apos;utilisation du site ainsi que les droits
          et obligations des utilisateurs. En accédant au site, vous reconnaissez avoir pris connaissance des présentes
          CGU et les accepter sans réserve.
        </p>

        <Article n={1} title="Présentation de l'entreprise">
          Le site est édité par Teranga Digital Consulting Group (TDCG), cabinet de conseil en stratégie,
          transformation digitale, communication et solutions numériques. Slogan : « {SITE.tagline} » Le cabinet
          accompagne les entreprises, institutions publiques, ONG, PME, startups et organisations dans leur
          développement stratégique et leur transformation digitale.
        </Article>

        <Article n={2} title="Objet du site">
          Le site a pour vocation de présenter les activités de TDCG, d&apos;informer les visiteurs sur ses services, de
          permettre la prise de contact, de recevoir des demandes de devis ou d&apos;audit, de publier des contenus
          informatifs et professionnels, et de promouvoir les solutions et expertises du cabinet. Les informations
          diffusées sont fournies à titre indicatif et peuvent être modifiées à tout moment.
        </Article>

        <Article n={3} title="Accès au site">
          Le site est accessible gratuitement à toute personne disposant d&apos;un accès à Internet. Les frais liés à
          l&apos;accès au réseau Internet restent à la charge de l&apos;utilisateur. TDCG met tout en œuvre pour
          assurer une disponibilité optimale du site sans pouvoir garantir un fonctionnement continu (maintenance,
          mises à jour, sécurité, cas de force majeure, défaillance technique).
        </Article>

        <Article n={4} title="Utilisation du site">
          L&apos;utilisateur s&apos;engage à utiliser le site conformément aux lois en vigueur. Il est notamment
          interdit de perturber le fonctionnement du site, d&apos;introduire des virus ou logiciels malveillants,
          de tenter d&apos;accéder frauduleusement aux systèmes informatiques, d&apos;utiliser le contenu à des fins
          illicites, ou de porter atteinte aux droits de TDCG ou de tiers.
        </Article>

        <Article n={5} title="Propriété intellectuelle">
          L&apos;ensemble des éléments présents sur le site (logo, textes, illustrations, photographies, vidéos,
          icônes, charte graphique, codes sources, bases de données, documents téléchargeables) est protégé par les
          lois relatives à la propriété intellectuelle. Toute reproduction sans autorisation écrite préalable de TDCG
          est interdite.
        </Article>

        <Article n={6} title="Services proposés">
          Audit digital, Conseil stratégique, Stratégie marketing, Marketing digital, Communication, Gestion de
          projets, Accompagnement des entreprises, Digitalisation des entreprises. Cette liste est susceptible
          d&apos;évoluer à tout moment.
        </Article>

        <Article n={7} title="Formulaires">
          L&apos;utilisateur garantit que les informations communiquées via les formulaires sont exactes. TDCG se
          réserve le droit de ne pas répondre aux demandes manifestement abusives ou inappropriées.
        </Article>

        <Article n={8} title="Protection des données personnelles">
          Les données collectées sont utilisées pour répondre aux demandes, établir des devis, assurer le suivi
          commercial et améliorer les services. L&apos;utilisateur dispose d&apos;un droit d&apos;accès, de
          rectification, d&apos;effacement, d&apos;opposition, de limitation et de portabilité. Toute demande peut être
          adressée à : <strong className="text-navy">{SITE.email}</strong>.
        </Article>

        <Article n={9} title="Cookies">
          Le site utilise des cookies afin d&apos;améliorer l&apos;expérience utilisateur, mesurer l&apos;audience,
          assurer la sécurité et personnaliser certains contenus. L&apos;utilisateur peut gérer ses préférences à tout
          moment.
        </Article>

        <Article n={10} title="Liens externes">
          Le site peut contenir des liens vers des sites tiers. TDCG ne saurait être tenu responsable du contenu, des
          politiques ou du fonctionnement de ces sites externes.
        </Article>

        <Article n={11} title="Responsabilité">
          TDCG s&apos;efforce de fournir des informations fiables sans garantir l&apos;absence totale d&apos;erreurs,
          l&apos;exhaustivité des informations, ni l&apos;absence d&apos;interruption du service.
        </Article>

        <Article n={12} title="Sécurité">
          TDCG met en œuvre des mesures techniques et organisationnelles destinées à assurer la sécurité du site, sans
          pouvoir garantir une sécurité absolue.
        </Article>

        <Article n={13} title="Modification des CGU">
          Les présentes CGU peuvent être modifiées à tout moment. La version publiée sur le site est la seule
          applicable.
        </Article>

        <Article n={14} title="Droit applicable et juridiction compétente">
          Les présentes CGU sont régies par le droit sénégalais. Tout différend relève de la compétence des
          juridictions sénégalaises compétentes.
        </Article>

        <Article n={15} title="Contact">
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
