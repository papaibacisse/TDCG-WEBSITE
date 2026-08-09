import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terangadigitalconsultinggroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const anchors = ["", "#expertise", "#secteurs", "#etudes", "#faq", "#roi-simulateur", "#footer-contact"];

  return anchors.map((anchor) => ({
    url: `${SITE_URL}/${anchor}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: anchor === "" ? 1 : 0.6,
  }));
}
