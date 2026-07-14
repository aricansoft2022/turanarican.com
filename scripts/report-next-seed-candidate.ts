import { sourceBooks } from "@/data/source-plans";
import { fetchPlannedLessonContent } from "@/src/crawler/seed-lesson";
import { discoverPlannedLessons } from "@/src/crawler/lesson-plan";

import { readSeedFixture } from "./validate-seed-lessons";

type PlannedSeedLesson = {
  sourceNumber: string;
  displayNumber: string;
  title: string;
  seeded: boolean;
};

async function main() {
  const fixture = await readSeedFixture();
  const seededBySourceBook = new Map<string, Set<string>>();

  for (const entry of fixture.lessons) {
    const seeded = seededBySourceBook.get(entry.sourceBookSlug) ?? new Set<string>();
    seeded.add(entry.sourceNumber);
    seededBySourceBook.set(entry.sourceBookSlug, seeded);
  }

  const candidates = [];

  for (const sourceBook of sourceBooks) {
    if (!sourceBook.targetRanges.length) continue;

    const plannedBook = await discoverPlannedLessons(sourceBook);
    const seeded = seededBySourceBook.get(sourceBook.slug) ?? new Set<string>();
    const lessons = plannedBook.lessons.map((lesson) => ({
      sourceNumber: lesson.sourceNumber,
      displayNumber: lesson.displayNumber,
      title: lesson.title,
      seeded: seeded.has(lesson.sourceNumber),
    }));
    const candidate = findNextAfterSeededRange(lessons);

    if (!candidate) {
      candidates.push({
        sourceBookSlug: sourceBook.slug,
        title: sourceBook.title,
        nextCandidate: null,
      });
      continue;
    }

    const { plannedLesson, parsedLesson } = await fetchPlannedLessonContent({
      sourceBookSlug: sourceBook.slug,
      sourceNumber: candidate.sourceNumber,
      sourceBookPlans: sourceBooks,
    });

    candidates.push({
      sourceBookSlug: sourceBook.slug,
      title: sourceBook.title,
      seededRanges: summarizeSeededRuns(lessons),
      nextCandidate: {
        sourceNumber: plannedLesson.sourceNumber,
        displayNumber: plannedLesson.displayNumber,
        sourceTitle: plannedLesson.title,
        sourceUrl: plannedLesson.href,
        contentHash: parsedLesson.contentHash.slice(0, 16),
        objectives: parsedLesson.objectives,
        metrics: {
          sections: parsedLesson.sections.length,
          blocks: parsedLesson.sections.reduce(
            (total, section) => total + section.blocks.length,
            0,
          ),
          examples: parsedLesson.examples.length,
          tryIts: parsedLesson.tryIts.length,
          exercises: parsedLesson.exercises.length,
          assets: parsedLesson.assets.length,
        },
        validation: parsedLesson.validation,
        sections: parsedLesson.sections.map((section) => ({
          heading: section.heading,
          slug: section.slug,
          blocks: section.blocks.length,
          examples: section.blocks
            .filter((block) => block.type === "example")
            .map((block) => block.label),
        })),
        tryItLabels: parsedLesson.tryIts.map((tryIt) => tryIt.label),
        exerciseSamples: parsedLesson.exercises.slice(0, 12).map((exercise) => ({
          number: exercise.number,
          prompt: truncate(exercise.promptText, 160),
        })),
      },
    });
  }

  console.log("Next seed candidate report.");
  console.log(JSON.stringify({ candidates }, null, 2));
}

function summarizeSeededRuns(lessons: PlannedSeedLesson[]) {
  const runs: string[] = [];
  let start: PlannedSeedLesson | undefined;
  let end: PlannedSeedLesson | undefined;

  const flush = () => {
    if (!start || !end) return;
    runs.push(
      start.sourceNumber === end.sourceNumber
        ? start.sourceNumber
        : `${start.sourceNumber}-${end.sourceNumber}`,
    );
    start = undefined;
    end = undefined;
  };

  for (const lesson of lessons) {
    if (!lesson.seeded) {
      flush();
      continue;
    }

    start ??= lesson;
    end = lesson;
  }

  flush();
  return runs;
}

function findNextAfterSeededRange(lessons: PlannedSeedLesson[]) {
  const lastSeededIndex = findLastSeededIndex(lessons);
  if (lastSeededIndex < 0) return lessons.find((lesson) => !lesson.seeded) ?? null;

  return lessons.slice(lastSeededIndex + 1).find((lesson) => !lesson.seeded) ?? null;
}

function findLastSeededIndex(lessons: PlannedSeedLesson[]) {
  for (let index = lessons.length - 1; index >= 0; index -= 1) {
    if (lessons[index]?.seeded) return index;
  }

  return -1;
}

function truncate(value: string, maxLength: number) {
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > maxLength
    ? `${cleaned.slice(0, maxLength - 3)}...`
    : cleaned;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
