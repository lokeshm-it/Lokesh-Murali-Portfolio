import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudies.map((study) => ({
      url: `${siteConfig.url}/projects/${study.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
