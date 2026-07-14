import type {
  Book,
  Chapter,
  EditorialSectionPatch,
  Exercise,
  ContentBlock,
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
import {
  localizeContentBlocksForTurkish,
  localizeExercisePromptForTurkish,
} from "./turkish-localization";

type LessonBuildInput = {
  book: Pick<Book, "id" | "slug" | "license">;
  chapter: Pick<Chapter, "id" | "slug">;
  lesson: LessonSummary;
  parsedLesson: ParsedLessonContent;
  objectives?: string[];
  sectionTitles?: Record<string, string>;
  tryItSolutions?: Record<string, ContentBlock[]>;
  exerciseAnswers?: Record<string, InlineContent[]>;
  exerciseSectionSlugs?: Record<string, string>;
  editorialPatches?: EditorialSectionPatch[];
};

export function buildLessonFromParsedContent({
  book,
  chapter,
  lesson,
  parsedLesson,
  objectives,
  sectionTitles = {},
  tryItSolutions = {},
  exerciseAnswers = {},
  exerciseSectionSlugs = {},
  editorialPatches = [],
}: LessonBuildInput): Lesson {
  const sections = parsedLesson.sections.map((section, index) =>
    buildLessonSection(lesson.slug, section, sectionTitles, index),
  );

  return {
    ...lesson,
    bookId: book.id,
    bookSlug: book.slug,
    chapterSlug: chapter.slug,
    license: book.license,
    objectives: objectives ?? parsedLesson.objectives,
    sections: applyExampleSolutions(
      applyEditorialPatches(sections, editorialPatches),
      tryItSolutions,
    ),
    exercises: buildAnsweredExercises(
      parsedLesson,
      exerciseAnswers,
      exerciseSectionSlugs,
    ),
  };
}

function applyExampleSolutions(
  sections: LessonSection[],
  solutions: Record<string, ContentBlock[]>,
): LessonSection[] {
  if (!Object.keys(solutions).length) return sections;

  return sections.map((section) => ({
    ...section,
    blocks: section.blocks.map((block) => {
      if (block.type !== "example") return block;

      const solution = solutions[block.label];
      return solution ? { ...block, solution } : block;
    }),
  }));
}

function applyEditorialPatches(
  sections: LessonSection[],
  patches: EditorialSectionPatch[],
): LessonSection[] {
  if (!patches.length) return sections;

  return sections.map((section) => {
    const patch = patches.find((item) => item.sectionSlug === section.slug);
    if (!patch) return section;

    const blocks = [...section.blocks];
    for (const replacement of patch.replaceBlocks ?? []) {
      const blockIndex = replacement.sourceBlockIndex - 1;
      if (blockIndex < 0 || blockIndex >= blocks.length) {
        throw new Error(
          `Editorial patch references missing block ${replacement.sourceBlockIndex} in section ${section.slug}.`,
        );
      }

      blocks.splice(blockIndex, 1, ...replacement.blocks);
    }

    return { ...section, blocks };
  });
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
    blocks: localizeContentBlocksForTurkish(
      parsedLessonBlocksToContentBlocks(section.blocks),
    ),
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
      prompt: localizeExercisePromptForTurkish(exercise.prompt),
      answer: exerciseAnswers[exercise.number],
      sortOrder: Number(exercise.number.replace(/\D+$/g, "")),
    }));
}
