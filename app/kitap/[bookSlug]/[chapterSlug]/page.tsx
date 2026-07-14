import { redirect } from "next/navigation";

import {
  getContentBook,
  getContentChapterParams,
} from "@/src/content/source";

type ChapterPageProps = {
  params: Promise<{
    bookSlug: string;
    chapterSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getContentChapterParams();
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { bookSlug, chapterSlug } = await params;
  const book = await getContentBook(bookSlug);
  const chapter = book?.chapters.find((item) => item.slug === chapterSlug);
  const firstLesson = chapter?.lessons[0];

  if (!book || !chapter || !firstLesson) {
    redirect(`/kitap/${bookSlug}`);
  }

  redirect(`/kitap/${book.slug}/${chapter.slug}/${firstLesson.slug}`);
}
