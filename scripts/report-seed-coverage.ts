import { sourceBooks } from "@/data/source-plans";
import { discoverPlannedLessons } from "@/src/crawler/lesson-plan";

import { readSeedFixture } from "./validate-seed-lessons";

type SeedCoverageLesson = {
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

  const books = [];

  for (const sourceBook of sourceBooks) {
    if (!sourceBook.targetRanges.length) continue;

    const plannedBook = await discoverPlannedLessons(sourceBook);
    const seeded = seededBySourceBook.get(sourceBook.slug) ?? new Set<string>();
    const lessons: SeedCoverageLesson[] = plannedBook.lessons.map((lesson) => ({
      sourceNumber: lesson.sourceNumber,
      displayNumber: lesson.displayNumber,
      title: lesson.title,
      seeded: seeded.has(lesson.sourceNumber),
    }));
    const missing = lessons.filter((lesson) => !lesson.seeded);

    books.push({
      sourceBookSlug: sourceBook.slug,
      title: sourceBook.title,
      plannedLessons: lessons.length,
      seededLessons: lessons.length - missing.length,
      missingLessons: missing.length,
      seededRanges: summarizeSeededRuns(lessons),
      nextAfterSeededRange: findNextAfterSeededRange(lessons),
      nextMissing: missing.slice(0, 10),
    });
  }

  console.log("Seed coverage report.");
  console.log(JSON.stringify({ books }, null, 2));
}

function summarizeSeededRuns(lessons: SeedCoverageLesson[]) {
  const runs: string[] = [];
  let start: SeedCoverageLesson | undefined;
  let end: SeedCoverageLesson | undefined;

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

function findNextAfterSeededRange(lessons: SeedCoverageLesson[]) {
  const lastSeededIndex = findLastSeededIndex(lessons);
  if (lastSeededIndex < 0) return lessons.find((lesson) => !lesson.seeded) ?? null;

  return lessons.slice(lastSeededIndex + 1).find((lesson) => !lesson.seeded) ?? null;
}

function findLastSeededIndex(lessons: SeedCoverageLesson[]) {
  for (let index = lessons.length - 1; index >= 0; index -= 1) {
    if (lessons[index]?.seeded) return index;
  }

  return -1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
