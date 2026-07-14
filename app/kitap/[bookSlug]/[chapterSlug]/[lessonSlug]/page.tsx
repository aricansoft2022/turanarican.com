import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonNav } from "@/components/layout/LessonNav";
import { LessonView } from "@/components/lesson/LessonView";
import {
  getContentLesson,
  getContentLessonParams,
} from "@/src/content/source";
import { buildLessonStructuredData } from "@/src/content/structured-data";

type LessonPageProps = {
  params: Promise<{
    bookSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getContentLessonParams();
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = await getContentLesson(resolvedParams);
  const lesson = entry?.lesson;

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
  const entry = await getContentLesson(resolvedParams);
  const book = entry?.book;
  const lesson = entry?.lesson;

  if (!book || !lesson) {
    notFound();
  }

  const structuredData = buildLessonStructuredData({ book, lesson });

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
