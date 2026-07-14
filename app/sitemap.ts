import type { MetadataRoute } from "next";

import {
  getContentBookParams,
  getContentChapterParams,
  getContentLessonParams,
} from "@/src/content/source";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turanarican.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, chapters, lessons] = await Promise.all([
    getContentBookParams(),
    getContentChapterParams(),
    getContentLessonParams(),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...books.map((book) => ({
      url: `${siteUrl}/kitap/${book.bookSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...chapters.map((chapter) => ({
      url: `${siteUrl}/kitap/${chapter.bookSlug}/${chapter.chapterSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...lessons.map((lesson) => ({
      url: `${siteUrl}/kitap/${lesson.bookSlug}/${lesson.chapterSlug}/${lesson.lessonSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
