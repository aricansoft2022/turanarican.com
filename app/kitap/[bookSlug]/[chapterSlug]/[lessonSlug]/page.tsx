import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonNav } from "@/components/layout/LessonNav";
import { LessonView } from "@/components/lesson/LessonView";
import { getAllLessonParams, getBook, getLesson } from "@/data/catalog";

type LessonPageProps = {
  params: Promise<{
    bookSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
};

export function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lesson = getLesson(resolvedParams);

  if (!lesson) {
    return {};
  }

  const title = `${lesson.displayNumber} ${lesson.displayTitle}`;
  const description = lesson.summary;
  const path = `/kitap/${lesson.bookSlug}/${lesson.chapterSlug}/${lesson.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      images: [
        {
          url: `/og?title=${encodeURIComponent(lesson.displayTitle)}&label=${encodeURIComponent(`Bölüm ${lesson.displayNumber}`)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `/og?title=${encodeURIComponent(lesson.displayTitle)}&label=${encodeURIComponent(`Bölüm ${lesson.displayNumber}`)}`,
      ],
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const book = getBook(resolvedParams.bookSlug);
  const lesson = getLesson(resolvedParams);

  if (!book || !lesson) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.displayTitle,
    description: lesson.summary,
    inLanguage: "tr",
    isPartOf: {
      "@type": "Book",
      name: book.title,
      url: book.sourceUrl,
    },
    license: lesson.license.url,
    provider: {
      "@type": "Organization",
      name: "Turan Arıcan Matematik",
      url: "https://turanarican.com",
    },
  };

  return (
    <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
      <LessonNav book={book} lesson={lesson} />
      <main>
        <LessonView book={book} lesson={lesson} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}

