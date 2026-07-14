import { redirect } from "next/navigation";

import { getBook } from "@/data/catalog";

type BookPageProps = {
  params: Promise<{
    bookSlug: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { bookSlug } = await params;
  const book = getBook(bookSlug);
  const firstChapter = book?.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  if (!book || !firstChapter || !firstLesson) {
    redirect("/");
  }

  redirect(`/kitap/${book.slug}/${firstChapter.slug}/${firstLesson.slug}`);
}

