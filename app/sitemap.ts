import type { MetadataRoute } from "next";

import { lessons } from "@/data/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.turanarican.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...lessons.map((lesson) => ({
      url: `${siteUrl}/kitap/${lesson.bookSlug}/${lesson.chapterSlug}/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
