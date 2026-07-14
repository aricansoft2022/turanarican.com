import type {
  Book,
  Chapter,
  Exercise,
  InlineContent,
  Lesson,
  LessonSection,
  LessonSummary,
} from "@/src/content/types";
import { slugify } from "@/src/lib/slugify";

import {
  parsedLessonBlocksToContentBlocks,
  type ParsedLessonContent,
} from "./lesson-content";

type LessonBuildInput = {
  book: Pick<Book, "id" | "slug" | "license">;
  chapter: Pick<Chapter, "id" | "slug">;
  lesson: LessonSummary;
  parsedLesson: ParsedLessonContent;
  objectives?: string[];
  sectionTitles?: Record<string, string>;
  exerciseAnswers?: Record<string, InlineContent[]>;
  exerciseSectionSlugs?: Record<string, string>;
};

export function buildLessonFromParsedContent({
  book,
  chapter,
  lesson,
  parsedLesson,
  objectives,
  sectionTitles = {},
  exerciseAnswers = {},
  exerciseSectionSlugs = {},
}: LessonBuildInput): Lesson {
  return {
    ...lesson,
    bookId: book.id,
    bookSlug: book.slug,
    chapterSlug: chapter.slug,
    license: book.license,
    objectives: objectives ?? parsedLesson.objectives,
    sections: parsedLesson.sections.map((section, index) =>
      buildLessonSection(lesson.slug, section, sectionTitles, index),
    ),
    exercises: buildAnsweredExercises(
      parsedLesson,
      exerciseAnswers,
      exerciseSectionSlugs,
    ),
  };
}

function buildLessonSection(
  lessonSlug: string,
  section: ParsedLessonContent["sections"][number],
  sectionTitles: Record<string, string>,
  index: number,
): LessonSection {
  const heading = sectionTitles[section.heading] ?? section.heading;
  const slug = slugify(heading);

  return {
    id: `${lessonSlug}-section-${String(index + 1).padStart(2, "0")}`,
    heading,
    slug,
    level: 2,
    blocks: parsedLessonBlocksToContentBlocks(section.blocks),
  };
}

function buildAnsweredExercises(
  parsedLesson: ParsedLessonContent,
  exerciseAnswers: Record<string, InlineContent[]>,
  exerciseSectionSlugs: Record<string, string>,
): Exercise[] {
  return parsedLesson.exercises
    .filter((exercise) => exerciseAnswers[exercise.number]?.length)
    .map((exercise) => ({
      id: `exercise-${exercise.number}`,
      number: exercise.number,
      sectionSlug: exerciseSectionSlugs[exercise.number] ?? "",
      prompt: exercise.prompt,
      answer: exerciseAnswers[exercise.number],
      sortOrder: Number(exercise.number.replace(/\D+$/g, "")),
    }));
}
