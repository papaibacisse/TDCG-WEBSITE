import type { MetadataRoute } from "next";
import { EXPERTISE_DOMAINS } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terangadigitalconsultinggroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const expertisePages = EXPERTISE_DOMAINS.map((e) => ({
    url: `${SITE_URL}/expertises/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/notre-approche`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...expertisePages,
  ];
}
