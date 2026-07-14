import { redirect } from "next/navigation";

import { getContentBook } from "@/src/content/source";

type BookPageProps = {
  params: Promise<{
    bookSlug: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { bookSlug } = await params;
  const book = await getContentBook(bookSlug);
  const firstChapter = book?.chapters[0];
  const firstLesson = firstChapter?.lessons[0];

  if (!book || !firstChapter || !firstLesson) {
    redirect("/");
  }

  redirect(`/kitap/${book.slug}/${firstChapter.slug}/${firstLesson.slug}`);
}
