import type { MetadataRoute } from "next";

import { getContentLessonParams } from "@/src/content/source";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.turanarican.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lessons = await getContentLessonParams();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...lessons.map((lesson) => ({
      url: `${siteUrl}/kitap/${lesson.bookSlug}/${lesson.chapterSlug}/${lesson.lessonSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
