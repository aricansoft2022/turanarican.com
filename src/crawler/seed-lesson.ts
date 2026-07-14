import type { books as catalogBooks } from "@/data/book-catalog";
import { getEditorialLessonPatches } from "@/data/editorial-patches";
import type { seedLessonConfigs } from "@/data/seed-lessons";
import type { sourceBooks } from "@/data/source-plans";
import type { Book, Chapter, Lesson, LessonSummary } from "@/src/content/types";

import { buildLessonFromParsedContent } from "./lesson-adapter";
import { fetchLessonContent, type ParsedLessonContent } from "./lesson-content";
import { discoverPlannedLessons, type PlannedLesson } from "./lesson-plan";

type SourceBook = (typeof sourceBooks)[number];
type CatalogBook = (typeof catalogBooks)[number];
type SeedLessonConfig = (typeof seedLessonConfigs)[number];

export type SeedLessonBuildResult = {
  sourceBook: SourceBook;
  plannedLesson: PlannedLesson;
  catalogBook: Book;
  catalogChapter: Chapter;
  catalogLesson: LessonSummary;
  parsedLesson: ParsedLessonContent;
  lesson: Lesson;
};

export type PlannedLessonContentResult = {
  sourceBook: SourceBook;
  plannedLesson: PlannedLesson;
  parsedLesson: ParsedLessonContent;
};

export async function fetchPlannedLessonContent({
  sourceBookSlug,
  sourceNumber,
  sourceBookPlans,
}: {
  sourceBookSlug: string;
  sourceNumber: string;
  sourceBookPlans: readonly SourceBook[];
}): Promise<PlannedLessonContentResult> {
  const sourceBook = sourceBookPlans.find((book) => book.slug === sourceBookSlug);

  if (!sourceBook) {
    throw new Error(`Source book is not configured: ${sourceBookSlug}`);
  }

  const plannedBook = await discoverPlannedLessons(sourceBook);
  const plannedLesson = plannedBook.lessons.find(
    (lesson) => lesson.sourceNumber === sourceNumber,
  );

  if (!plannedLesson) {
    throw new Error(
      `Lesson was not found in the planned lesson set: ${sourceNumber}`,
    );
  }

  const parsedLesson = await fetchLessonContent(plannedLesson.href, {
    bookSlug: sourceBook.slug,
    lessonSlug: plannedLesson.displaySlug,
  });

  return {
    sourceBook,
    plannedLesson,
    parsedLesson,
  };
}

export async function fetchSeedLessonContent({
  seedConfig,
  sourceBookPlans,
  catalog,
}: {
  seedConfig: SeedLessonConfig;
  sourceBookPlans: readonly SourceBook[];
  catalog: readonly CatalogBook[];
}): Promise<SeedLessonBuildResult> {
  const { sourceBook, plannedLesson, parsedLesson } =
    await fetchPlannedLessonContent({
      sourceBookSlug: seedConfig.sourceBookSlug,
      sourceNumber: seedConfig.sourceNumber,
      sourceBookPlans,
    });

  const catalogBook = catalog.find(
    (book) => book.slug === seedConfig.catalogBookSlug,
  );
  const catalogChapter = catalogBook?.chapters.find(
    (chapter) => chapter.slug === seedConfig.catalogChapterSlug,
  );
  const configuredCatalogLesson = catalogChapter?.lessons.find(
    (lesson) => lesson.sourceNumber === seedConfig.sourceNumber,
  );

  if (!catalogBook || !catalogChapter) {
    throw new Error(
      `Seed lesson is not configured in the catalog: ${seedConfig.sourceNumber}`,
    );
  }

  const catalogLesson =
    configuredCatalogLesson ??
    (seedConfig.catalogLesson
      ? {
          ...seedConfig.catalogLesson,
          chapterId: catalogChapter.id,
          sourceNumber: plannedLesson.sourceNumber,
          displayNumber: plannedLesson.displayNumber,
          sourceTitle: plannedLesson.title,
          sourceUrl: plannedLesson.href,
        }
      : undefined);

  if (!catalogLesson) {
    throw new Error(
      `Seed lesson metadata is not configured: ${seedConfig.sourceNumber}`,
    );
  }

  const lesson = buildLessonFromParsedContent({
    book: catalogBook,
    chapter: catalogChapter,
    lesson: catalogLesson,
    parsedLesson,
    objectives: seedConfig.objectives,
    sectionTitles: seedConfig.sectionTitles,
    tryItSolutions: seedConfig.tryItSolutions,
    exerciseAnswers: seedConfig.exerciseAnswers,
    exerciseSectionSlugs: seedConfig.exerciseSectionSlugs,
    editorialPatches: getEditorialLessonPatches({
      sourceBookSlug: seedConfig.sourceBookSlug,
      sourceNumber: seedConfig.sourceNumber,
    }),
  });

  return {
    sourceBook,
    plannedLesson,
    catalogBook,
    catalogChapter,
    catalogLesson,
    parsedLesson,
    lesson,
  };
}
