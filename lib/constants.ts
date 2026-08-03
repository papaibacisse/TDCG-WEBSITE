// Centralised content & data for the TDCG site.
// Keeping copy and pricing tables here (instead of scattered in JSX)
// makes them easy to update without touching component markup.

export const SITE = {
  name: "Teranga Digital Consulting Group",
  shortName: "TDCG",
  tagline: "Transformer vos idées en résultats.",
  domain: "terangadigitalconsultinggroup.com",
  email: "contact@terangadigitalconsultinggroup.com",
  phones: ["+221 77 255 44 22", "+221 76 183 53 79"],
  whatsapp: ["221772554422", "221761835379"],
  address: "Thiokhna, Avenue El Hadji Samba Khary Cisse, 31009, Louga, Sénégal",
};

export const SECTORS = [
  {
    name: "Administration publique",
    description: "Digitalisation des services citoyens et modernisation des processus internes de l'État.",
  },
  {
    name: "Finance",
    description: "Stratégie de croissance, conformité et transformation digitale pour le secteur financier.",
  },
  {
    name: "Éducation",
    description: "Solutions numériques pour l'apprentissage, la gestion scolaire et le suivi pédagogique.",
  },
  {
    name: "Santé",
    description: "Digitalisation des parcours patients et optimisation des systèmes de santé.",
  },
  {
    name: "Agriculture",
    description: "Valorisation des filières agricoles par le numérique et l'accès facilité aux marchés.",
  },
  {
    name: "Commerce",
    description: "Stratégies omnicanales et expérience client pour les enseignes commerciales.",
  },
  {
    name: "Industrie",
    description: "Automatisation des processus et pilotage de la performance industrielle.",
  },
  {
    name: "ONG",
    description: "Structuration organisationnelle et mesure d'impact pour les projets sociaux.",
  },
  {
    name: "Télécommunications",
    description: "Accompagnement stratégique pour les opérateurs et acteurs du numérique.",
  },
  {
    name: "Distribution",
    description: "Optimisation logistique et digitalisation des réseaux de distribution.",
  },
  {
    name: "Énergie",
    description: "Conseil stratégique pour la transition énergétique et l'efficacité opérationnelle.",
  },
  {
    name: "Startups",
    description: "Structuration, préparation à la levée de fonds et stratégie de croissance rapide.",
  },
] as const;

// Baseline "additional prospects" potential (%) used by the ROI simulator,
// and base FCFA price per domain used by the quote (devis) calculator.
export const EXPERTISE_DOMAINS = [
  { name: "Marketing", roiBaseline: 32, devisBasePrice: 750_000, description: "Positionnement de marque, plans marketing intégrés et pilotage de la performance commerciale." },
  { name: "IA", roiBaseline: 30, devisBasePrice: 1_500_000, description: "Intégration de l'intelligence artificielle pour automatiser vos processus et accélérer vos décisions." },
  { name: "Communication", roiBaseline: 25, devisBasePrice: 500_000, description: "Storytelling de marque, communication institutionnelle et gestion de la réputation." },
  { name: "Transformation digitale", roiBaseline: 28, devisBasePrice: 2_000_000, description: "Modernisation des outils et accompagnement au changement vers une organisation 100% digitale." },
  { name: "Conseil", roiBaseline: 24, devisBasePrice: 900_000, description: "Analyse stratégique, structuration d'entreprise et accompagnement à la prise de décision." },
  { name: "CRM", roiBaseline: 27, devisBasePrice: 1_100_000, description: "Mise en place et optimisation d'outils de gestion de la relation client." },
  { name: "Automatisation", roiBaseline: 26, devisBasePrice: 1_000_000, description: "Automatisation des workflows pour gagner en efficacité opérationnelle au quotidien." },
  { name: "Data", roiBaseline: 29, devisBasePrice: 1_200_000, description: "Collecte, structuration et valorisation de la donnée pour éclairer vos décisions stratégiques." },
  { name: "SEO", roiBaseline: 22, devisBasePrice: 450_000, description: "Optimisation du référencement naturel pour renforcer votre visibilité sur les moteurs de recherche." },
  { name: "Publicité", roiBaseline: 23, devisBasePrice: 650_000, description: "Campagnes publicitaires ciblées et pilotage du retour sur investissement média." },
] as const;

// Sector baseline used specifically by the ROI simulator (distinct scale
// from the sectors list above, since not every sector has the same
// digital-marketing uplift potential).
export const ROI_SECTOR_BASELINE: Record<string, number> = {
  "Administration publique": 18,
  Finance: 28,
  Éducation: 25,
  Santé: 27,
  Agriculture: 22,
  Commerce: 32,
  Industrie: 24,
  ONG: 20,
  Télécommunications: 30,
  Distribution: 29,
  Énergie: 26,
  Startups: 35,
};

export const COMPANY_SIZE_OPTIONS = [
  { value: "1", label: "1 à 9 employés" },
  { value: "1.3", label: "10 à 49 employés" },
  { value: "1.7", label: "50 à 199 employés" },
  { value: "2.2", label: "200 employés et plus" },
];

export const BUDGET_OPTIONS = [
  "Moins de 1 000 000 FCFA",
  "1 000 000 – 3 000 000 FCFA",
  "3 000 000 – 10 000 000 FCFA",
  "Plus de 10 000 000 FCFA",
];

export const FAQ_ITEMS = [
  {
    q: "Combien de temps dure un audit digital ?",
    a: "Un audit standard dure entre 2 et 4 semaines selon la taille de votre organisation et le périmètre analysé.",
  },
  {
    q: "Travaillez-vous avec les institutions publiques ?",
    a: "Oui, nous accompagnons régulièrement des administrations publiques dans leurs projets de digitalisation et de modernisation des services.",
  },
  {
    q: "Proposez-vous un accompagnement pour les startups ?",
    a: "Absolument. Nous proposons des offres adaptées aux startups, de la structuration initiale à la stratégie de croissance.",
  },
  {
    q: "Comment se déroule la première prise de contact ?",
    a: "Un premier échange gratuit de 30 minutes permet de cerner vos enjeux avant de vous proposer une proposition d'accompagnement sur-mesure.",
  },
];

export const CASE_STUDIES = [
  {
    tag: "Administration publique",
    title: "Digitalisation d'un service citoyen",
    description:
      "Un service public régional peinait à traiter les demandes des usagers, générant délais et insatisfaction. TDCG a conçu et déployé une plateforme de gestion des demandes en ligne.",
    kpis: [
      { value: "-64%", label: "Délai de traitement" },
      { value: "+120%", label: "Demandes traitées / mois" },
    ],
  },
  {
    tag: "Distribution",
    title: "Refonte stratégie marketing",
    description:
      "Une enseigne de distribution régionale souhaitait renforcer sa présence digitale. Audit, repositionnement de marque et plan média intégré ont été déployés en 4 mois.",
    kpis: [
      { value: "+85%", label: "Trafic digital" },
      { value: "3.2x", label: "ROI campagnes" },
    ],
  },
  {
    tag: "ONG",
    title: "Structuration organisationnelle",
    description:
      "Une ONG en forte croissance manquait de processus internes clairs. TDCG a conçu une gouvernance de projet et des outils de suivi d'impact.",
    kpis: [
      { value: "+40%", label: "Efficacité opérationnelle" },
      { value: "6", label: "Nouveaux partenariats" },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "TDCG a su transformer notre vision en plan d'action concret. Le niveau d'exigence est comparable à celui des grands cabinets internationaux.",
    name: "Amadou D.",
    role: "Directeur Général, secteur distribution",
  },
  {
    quote:
      "Un accompagnement rigoureux et humain. Nos équipes ont gagné en autonomie sur les outils numériques en quelques semaines.",
    name: "Fatou S.",
    role: "Responsable communication, ONG",
  },
  {
    quote:
      "Le meilleur investissement stratégique que nous ayons fait cette année. Résultats visibles dès le premier trimestre.",
    name: "Moussa K.",
    role: "Fondateur, startup fintech",
  },
];
