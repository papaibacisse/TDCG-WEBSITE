// Centralised content & data for the TDCG site.
// Keeping copy and pricing tables here (instead of scattered in JSX)
// makes them easy to update without touching component markup.

export const SITE = {
  name: "Teranga Digital Consulting Group",
  shortName: "TDCG",
  tagline: "Transformer vos idées en résultats.",
  domain: "terangadigitalconsultinggroup.com",
  email: "contact@terangadigitalconsultinggroup.com",
  phones: ["+221 77 255 44 22"],
  whatsapp: ["221772554422"],
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
  {
    num: "01",
    slug: "strategie-digitale-transformation",
    name: "Stratégie Digitale & Transformation",
    tagline: "Définir votre cap. Piloter votre transformation.",
    roiBaseline: 28,
    devisBasePrice: 2_000_000,
    description: "Nous aidons les organisations à définir leur cap digital et à piloter leur transformation avec méthode, de l'audit initial jusqu'à la feuille de route opérationnelle.",
    longDescription: "La transformation digitale ne se limite pas à l'installation d'outils. C'est un changement de culture, de processus et de positionnement stratégique. TDCG vous accompagne de l'état des lieux à l'exécution, avec une méthode rigoureuse et un ancrage local fort.",
    items: ["Positionnement stratégique", "Transformation digitale", "Digitalisation des processus", "Audit de maturité digitale", "Roadmap digitale"],
    services: [
      { title: "Audit de maturité digitale", description: "Évaluation complète de votre niveau de digitalisation (outils, processus, compétences, gouvernance) avec un rapport de recommandations prioritaires." },
      { title: "Stratégie digitale", description: "Définition de votre vision digitale à 3-5 ans, identification des leviers de transformation et élaboration d'un plan d'action structuré." },
      { title: "Digitalisation des processus", description: "Cartographie, simplification et automatisation de vos processus métier pour gagner en efficacité et réduire les coûts opérationnels." },
      { title: "Roadmap de transformation", description: "Feuille de route détaillée avec jalons, KPIs, responsabilités et budget, pour piloter votre transformation dans la durée." },
      { title: "Accompagnement au changement", description: "Formation des équipes, gestion de la résistance au changement et ancrage des nouvelles pratiques dans votre organisation." },
    ],
    results: ["Réduction des coûts opérationnels", "Accélération des cycles de décision", "Amélioration de l'expérience collaborateur", "Gain de compétitivité sur le marché"],
    cta: { label: "Demander un audit", action: "audit" as const },
    targets: ["PME structurées", "Grandes entreprises", "Institutions publiques", "ONG & associations"],
  },
  {
    num: "02",
    slug: "ia-automatisation",
    name: "IA & Automatisation",
    tagline: "L'intelligence artificielle au service de votre performance.",
    roiBaseline: 30,
    devisBasePrice: 1_500_000,
    description: "Nous intégrons l'intelligence artificielle et l'automatisation pour libérer vos équipes des tâches répétitives et accélérer vos prises de décision.",
    longDescription: "L'IA n'est plus réservée aux grandes multinationales. TDCG démocratise l'accès à ces technologies pour les entreprises africaines, avec des solutions concrètes, adaptées à vos contextes et pilotées par des résultats mesurables.",
    items: ["Audit de maturité IA", "Intelligence artificielle", "Automatisation des processus", "Assistants IA", "Copilotes IA", "Formation & accompagnement"],
    services: [
      { title: "Diagnostic de maturité IA", description: "Évaluation de votre niveau de préparation à l'IA : données, infrastructures, compétences, cas d'usage potentiels et ROI attendu." },
      { title: "Stratégie IA", description: "Définition de votre feuille de route IA avec priorisation des cas d'usage à fort impact business et plan de déploiement progressif." },
      { title: "Automatisation des processus", description: "Identification et automatisation des tâches répétitives (RPA, workflows intelligents) pour libérer vos équipes à haute valeur ajoutée." },
      { title: "Assistants & Copilotes IA", description: "Développement d'assistants IA sur mesure intégrés à vos outils existants (service client, support interne, rédaction, analyse)." },
      { title: "Formation & adoption IA", description: "Programmes de montée en compétence de vos équipes sur les outils IA, les bonnes pratiques et la gouvernance des données." },
    ],
    results: ["Réduction du temps sur les tâches répétitives", "Amélioration de la qualité des livrables", "Prise de décision plus rapide et mieux informée", "Avantage concurrentiel durable"],
    cta: { label: "Diagnostic maturité IA", action: "contact" as const },
    targets: ["Directions générales", "DSI", "Directions opérationnelles", "Startups tech"],
  },
  {
    num: "03",
    slug: "marketing-croissance-digitale",
    name: "Marketing & Croissance Digitale",
    tagline: "Attirer, convertir, fidéliser. À grande échelle.",
    roiBaseline: 32,
    devisBasePrice: 750_000,
    description: "Nous concevons et exécutons des stratégies marketing orientées résultats pour accélérer votre croissance, votre visibilité et votre acquisition de clients.",
    longDescription: "Le marketing digital efficace en Afrique ne se copie pas d'un template occidental. Il se construit avec une compréhension profonde des audiences locales, des plateformes utilisées et des parcours d'achat spécifiques. TDCG conçoit des stratégies qui performent dans votre contexte.",
    items: ["Stratégie marketing", "Acquisition digitale", "SEO", "Social Media", "Growth Marketing", "Performance marketing"],
    services: [
      { title: "Stratégie marketing intégrée", description: "Définition de votre positionnement, de vos personas, de votre message et de votre mix marketing adapté au marché africain." },
      { title: "Acquisition digitale", description: "Conception et pilotage de campagnes d'acquisition multicanales (SEA, Social Ads, emailings) avec optimisation continue du ROI." },
      { title: "SEO & Visibilité organique", description: "Audit technique, stratégie de contenu et link building pour améliorer votre positionnement sur les moteurs de recherche." },
      { title: "Social Media & Communauté", description: "Stratégie de contenu, animation des communautés et gestion de la présence sur les réseaux sociaux pertinents pour votre audience." },
      { title: "Growth Marketing", description: "Expérimentation rapide, tests A/B et optimisation du funnel de conversion pour accélérer votre croissance à moindre coût." },
    ],
    results: ["Augmentation du trafic qualifié", "Amélioration du taux de conversion", "Réduction du coût d'acquisition client", "Notoriété et visibilité renforcées"],
    cta: { label: "Simulateur ROI", action: "contact" as const },
    targets: ["PME & Startups", "E-commerce", "Services B2B", "Institutions & ONG"],
  },
  {
    num: "04",
    slug: "data-crm-experience-client",
    name: "Data, CRM & Expérience Client",
    tagline: "Vos données comme levier de croissance.",
    roiBaseline: 29,
    devisBasePrice: 1_200_000,
    description: "Nous transformons vos données en actifs stratégiques et optimisons chaque point de contact avec vos clients pour maximiser leur satisfaction et leur fidélité.",
    longDescription: "Dans un contexte de concurrence accrue, la connaissance client est un avantage décisif. TDCG vous aide à structurer vos données, à mettre en place les bons outils CRM et à concevoir des parcours clients qui fidélisent et génèrent de la valeur sur le long terme.",
    items: ["Data & Analytics", "KPI & Business Intelligence", "CRM", "Parcours client", "Customer Experience", "Fidélisation"],
    services: [
      { title: "Audit & stratégie data", description: "Inventaire de vos sources de données, évaluation de leur qualité et définition d'une architecture data adaptée à vos objectifs." },
      { title: "CRM & Gestion de la relation client", description: "Sélection, paramétrage et déploiement de votre CRM (HubSpot, Salesforce, etc.) avec formation et accompagnement des équipes." },
      { title: "KPI & Tableaux de bord", description: "Conception de dashboards métier en temps réel pour suivre vos performances et prendre des décisions éclairées rapidement." },
      { title: "Parcours client", description: "Cartographie et optimisation de l'ensemble du parcours client, de la prise de conscience à la fidélisation post-achat." },
      { title: "Stratégie de fidélisation", description: "Programmes de fidélité, personnalisation des communications et expériences client différenciantes pour augmenter la valeur vie client." },
    ],
    results: ["Meilleure connaissance et segmentation clients", "Augmentation du taux de rétention", "Amélioration de la satisfaction client (NPS)", "Revenus récurrents accrus"],
    cta: { label: "Audit CRM", action: "contact" as const },
    targets: ["Commerce & Distribution", "Banques & Assurances", "Télécommunications", "Services aux entreprises"],
  },
  {
    num: "05",
    slug: "conseil-business-technologie",
    name: "Conseil Business & Technologie",
    tagline: "La rigueur d'un cabinet international. L'ancrage local.",
    roiBaseline: 25,
    devisBasePrice: 900_000,
    description: "Nous accompagnons les dirigeants et leurs équipes dans leurs décisions stratégiques, l'optimisation de leur organisation et la gestion de leurs projets de transformation.",
    longDescription: "Face à des environnements complexes et des marchés en mutation rapide, les dirigeants africains ont besoin de partenaires qui combinent rigueur méthodologique internationale et compréhension des réalités locales. TDCG est ce partenaire.",
    items: ["Conseil stratégique", "Organisation & performance", "Pilotage", "Gestion de projets", "Conseil technologique", "Accompagnement des entreprises"],
    services: [
      { title: "Conseil stratégique", description: "Analyse de votre position concurrentielle, identification des opportunités de croissance et recommandations stratégiques actionnables." },
      { title: "Organisation & performance", description: "Diagnostic organisationnel, restructuration des processus et mise en place d'indicateurs de performance pour améliorer l'efficacité globale." },
      { title: "Pilotage de la performance", description: "Définition des KPIs clés, conception des outils de reporting et accompagnement dans l'instauration d'une culture de la performance." },
      { title: "Gestion de projets de transformation", description: "Direction de projet (PMO), coordination des parties prenantes et gestion des risques pour mener vos transformations dans les délais et budgets prévus." },
      { title: "Conseil technologique", description: "Aide au choix et à l'intégration des solutions technologiques adaptées à vos enjeux métier et à votre contexte organisationnel." },
    ],
    results: ["Clarté stratégique et alignement des équipes", "Réduction des coûts et gains d'efficacité", "Projets livrés dans les délais et budgets", "Organisation plus agile et performante"],
    cta: { label: "Prendre RDV", action: "contact" as const },
    targets: ["Directions générales", "Groupes & Holdings", "Institutions publiques", "Organisations internationales"],
  },
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
    q: "Quels sont vos tarifs ?",
    a: "Nos tarifs varient selon la taille du projet et de votre structure. Contactez-nous pour un devis personnalisé sous 48h.",
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

/** Génère un slug d'ancrage cohérent pour les noms de secteurs */
export function sectorSlug(name: string): string {
  return "sector-" + name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
