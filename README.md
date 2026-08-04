# TDCG Website

Site vitrine de **Teranga Digital Consulting Group (TDCG)**, construit avec Next.js 14 (App Router), React, TypeScript, Tailwind CSS et Framer Motion.

## Stack technique

| Outil | Usage |
|---|---|
| **Next.js 14** (App Router) | Framework, routing, rendu |
| **React 18 + TypeScript** | Composants, typage strict |
| **Tailwind CSS** | Styling utilitaire, design tokens (couleurs, polices) |
| **Framer Motion** | Animations des fenêtres modales et de la bannière de cookies |
| **lucide-react** | Icônes |

## Démarrage rapide

```bash
npm install
cp .env.example .env.local   # puis renseigner les vraies valeurs
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # eslint
```

## Structure du projet

```
tdcg-website/
├── app/
│   ├── layout.tsx        # Layout racine : polices, métadonnées, providers globaux, modales
│   ├── page.tsx           # Page d'accueil : assemble toutes les sections
│   └── globals.css        # Reset, variables CSS (couleurs/polices), classes utilitaires partagées
│
├── components/
│   ├── Header.tsx                 # Navbar sticky + menu mobile
│   ├── Hero.tsx                   # Section hero (titre, CTA, stats)
│   ├── TrustBar.tsx               # Bandeau "Ils nous font confiance"
│   ├── PourquoiNousChoisir.tsx    # Section immersive : storytelling, compteurs, piliers,
│   │                               #   comparatif agence classique vs TDCG, frise, CTA
│   ├── NetworkCanvas.tsx          # Animation canvas de particules/lignes connectées (fond)
│   ├── ExpertiseSphere.tsx        # Sphère interactive des 10 domaines d'expertise
│   ├── Methodology.tsx            # Notre méthodologie (4 étapes)
│   ├── Sectors.tsx                # Grille de cartes "Secteurs d'activité" (+ carrousel mobile)
│   ├── CaseStudies.tsx            # Études de cas
│   ├── Testimonials.tsx           # Témoignages clients
│   ├── Faq.tsx                    # FAQ (accordéon) + carte "Nous contacter"
│   ├── ROISimulator.tsx           # Simulateur de ROI marketing
│   ├── CtaFinal.tsx               # CTA de fin de page
│   ├── Footer.tsx                 # Pied de page
│   ├── FloatingButtons.tsx        # Bouton WhatsApp (double numéro) + retour en haut
│   ├── CookieConsent.tsx          # Bannière + fenêtre de gestion des cookies (RGPD)
│   └── modals/
│       ├── Modal.tsx              # Composant modal générique (focus trap, Échap, Framer Motion)
│       ├── ContactModal.tsx       # "Nous contacter"
│       ├── AuditModal.tsx         # "Demander un audit"
│       ├── DevisModal.tsx         # Calculateur de devis interactif (estimation en FCFA)
│       ├── CguModal.tsx           # Conditions Générales d'Utilisation
│       └── PrivacyModal.tsx       # Politique de confidentialité
│
├── lib/
│   ├── constants.ts        # Données du site : coordonnées, secteurs, expertises, FAQ, etc.
│   ├── ModalContext.tsx    # Contexte React pour ouvrir/fermer les fenêtres modales globalement
│   ├── CookieConsentContext.tsx  # Contexte pour la fenêtre de préférences cookies
│   ├── useCountUp.ts       # Hook : anime un nombre de 0 → cible au scroll
│   └── useReveal.ts        # Hook : ajoute une classe au scroll (fade-in / slide-up)
│
├── styles/
│   └── motion.ts            # Variants Framer Motion partagés (fadeInUp, staggerContainer, etc.)
│
├── public/
│   └── logo-tdcg.png        # Logo (blason doré)
│
├── package.json
├── next.config.ts
├── tailwind.config.ts       # Palette (navy, gold, greyLight, ink) + polices custom
├── tsconfig.json
├── .env.example
└── README.md
```

## Approche de style

Les couleurs et polices de la charte TDCG sont définies comme *design tokens* dans `tailwind.config.ts` (`navy`, `gold`, `greyLight`, `ink`) et utilisées directement comme classes Tailwind (`bg-navy`, `text-gold`, etc.). Quelques variables CSS globales (`app/globals.css`) couvrent les cas non couverts nativement par Tailwind (interrupteurs de préférence cookies, chevron des `<select>` sur fond sombre).

## Contenu éditable

Toutes les données affichées (secteurs, domaines d'expertise, études de cas, témoignages, FAQ, tarifs du calculateur de devis, coordonnées) sont centralisées dans `lib/constants.ts` — modifiez ce fichier plutôt que le JSX des composants pour mettre à jour le contenu.

## Formulaires

Les 3 formulaires (audit, devis, contact) utilisent actuellement un lien `mailto:` comme solution de repli (aucun backend requis). Pour les connecter à un vrai service d'envoi :

1. Renseignez `FORM_SUBMISSION_ENDPOINT` / `FORM_SUBMISSION_API_KEY` dans `.env.local`.
2. Remplacez la ligne `window.location.href = "mailto:..."` par un appel `fetch()` vers votre endpoint (route API Next.js, Resend, Formspree, etc.) dans `AuditModal.tsx`, `DevisModal.tsx` et `ContactModal.tsx`.

## Cookies & scripts tiers

`components/CookieConsent.tsx` stocke le consentement dans `localStorage` (clé `tdcg_cookie_consent`, expiration ~13 mois) et n'exécute les scripts analytiques/marketing qu'après consentement explicite. Les emplacements pour brancher Google Analytics / GTM / Meta Pixel / LinkedIn Insight (via les identifiants `NEXT_PUBLIC_*` de `.env.example`) sont commentés dans la fonction `loadConditionalScripts`.

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com) :

```bash
npm i -g vercel
vercel
```

Pensez à renseigner les variables d'environnement de `.env.example` dans les réglages du projet Vercel avant le déploiement en production.

## Accessibilité

- Fenêtres modales : piège du focus, fermeture au clavier (Échap), attributs `role="dialog"` / `aria-modal`.
- Interrupteurs de préférence cookies : `role="switch"`, `aria-checked`.
- Contrastes et tailles de police alignés sur les recommandations WCAG AA.

