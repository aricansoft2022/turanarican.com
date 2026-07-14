import seedFixture from "@/data/generated/seed-lessons.json";
import { books as baseBooks } from "@/data/book-catalog";
import type { Book, Lesson, LessonSummary } from "@/src/content/types";

type SeedFixture = {
  lessons: Array<{
    assets: NonNullable<Lesson["assets"]>;
    lesson: Lesson;
  }>;
};

const seedLessons = (seedFixture as unknown as SeedFixture).lessons;

export const lessons: Lesson[] = seedLessons
  .map(({ assets, lesson }) => ({
    ...lesson,
    assets,
  }))
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const books: Book[] = baseBooks.map((book) => ({
  ...book,
  chapters: book.chapters.map((chapter) => ({
    ...chapter,
    lessons: lessons
      .filter(
        (lesson) =>
          lesson.bookSlug === book.slug && lesson.chapterSlug === chapter.slug,
      )
      .map(toLessonSummary),
  })),
}));

export function getBook(bookSlug: string) {
  return books.find((book) => book.slug === bookSlug);
}

export function getLesson(params: {
  bookSlug: string;
  chapterSlug: string;
  lessonSlug: string;
}) {
  return lessons.find(
    (lesson) =>
      lesson.bookSlug === params.bookSlug &&
      lesson.chapterSlug === params.chapterSlug &&
      lesson.slug === params.lessonSlug,
  );
}

export function getAllLessonParams() {
  return lessons.map((lesson) => ({
    bookSlug: lesson.bookSlug,
    chapterSlug: lesson.chapterSlug,
    lessonSlug: lesson.slug,
  }));
}

export function getAllBookParams() {
  return books.map((book) => ({
    bookSlug: book.slug,
  }));
}

function toLessonSummary(lesson: Lesson): LessonSummary {
  return {
    id: lesson.id,
    chapterId: lesson.chapterId,
    slug: lesson.slug,
    sourceNumber: lesson.sourceNumber,
    displayNumber: lesson.displayNumber,
    sourceTitle: lesson.sourceTitle,
    displayTitle: lesson.displayTitle,
    summary: lesson.summary,
    sourceUrl: lesson.sourceUrl,
    sortOrder: lesson.sortOrder,
  };
}
