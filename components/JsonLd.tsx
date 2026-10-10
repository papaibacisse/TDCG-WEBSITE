import { SITE, FAQ_ITEMS } from "@/lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://terangadigitalconsultinggroup.com";

// ─── Organization + LocalBusiness + WebSite ─────────────────────────────────

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-tdcg.png`,
          width: 200,
          height: 60,
        },
        image: `${SITE_URL}/og-image.png`,
        description:
          "Cabinet de conseil en transformation digitale, intelligence artificielle et performance business en Afrique de l'Ouest.",
        foundingLocation: "Louga, Sénégal",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avenue El Hadji Samba Khary Cisse, Thiokhna",
          addressLocality: "Louga",
          postalCode: "31009",
          addressCountry: "SN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 15.61914,
          longitude: -16.22597,
        },
        telephone: "+221772554422",
        email: SITE.email,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday"],
            opens: "08:30",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "12:00",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Sénégal" },
          { "@type": "Country", name: "Côte d'Ivoire" },
          { "@type": "Country", name: "Mali" },
          { "@type": "Country", name: "Guinée" },
          { "@type": "AdministrativeArea", name: "Afrique de l'Ouest" },
        ],
        serviceType: [
          "Transformation digitale",
          "Intelligence artificielle",
          "Marketing digital",
          "Conseil stratégique",
          "Automatisation des processus",
          "CRM et Expérience client",
        ],
        sameAs: [
          "https://www.linkedin.com/company/teranga-digital-consulting-group",
        ],
        priceRange: "FCFA",
        currenciesAccepted: "XOF",
        paymentAccepted: "Virement bancaire, Chèque",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.tagline,
        inLanguage: "fr-SN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Service ─────────────────────────────────────────────────────────────────

interface ServiceJsonLdProps {
  name: string;
  description: string;
  slug: string;
  serviceItems: readonly string[];
}

export function ServiceJsonLd({
  name,
  description,
  slug,
  serviceItems,
}: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}/expertises/${slug}`,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
    },
    areaServed: [
      { "@type": "Country", name: "Sénégal" },
      { "@type": "AdministrativeArea", name: "Afrique de l'Ouest" },
    ],
    serviceType: serviceItems[0] ?? name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services ${name}`,
      itemListElement: serviceItems.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
