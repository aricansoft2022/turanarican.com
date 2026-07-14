import type { Book, Lesson } from "@/src/content/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.turanarican.com";

export function buildLessonStructuredData({
  book,
  lesson,
}: {
  book: Book;
  lesson: Lesson;
}) {
  const chapter = book.chapters.find((item) => item.slug === lesson.chapterSlug);
  const bookUrl = `${siteUrl}/kitap/${book.slug}`;
  const chapterUrl = `${bookUrl}/${lesson.chapterSlug}`;
  const lessonUrl = `${chapterUrl}/${lesson.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: lesson.displayTitle,
      description: lesson.summary,
      inLanguage: "tr",
      url: lessonUrl,
      isPartOf: {
        "@type": "Book",
        name: book.title,
        url: book.sourceUrl,
      },
      license: lesson.license.url,
      provider: {
        "@type": "Organization",
        name: "Turan Arıcan Matematik",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: book.title,
          item: bookUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: chapter?.displayTitle ?? lesson.chapterSlug,
          item: chapterUrl,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: lesson.displayTitle,
          item: lessonUrl,
        },
      ],
    },
  ];
}
