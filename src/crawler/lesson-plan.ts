import { createHash } from "node:crypto";

import { slugify } from "@/src/lib/slugify";

import { fetchBookToc, fetchChapterToc, type TocItem } from "./libretexts";

export type SourceBookPlan = {
  slug: string;
  sourceUrl: string;
  numberingPolicy: "preserve" | "skip_intro_shift" | "custom_map";
  targetRanges: readonly (readonly [string, string])[];
};

export type PlannedLesson = TocItem & {
  sourceChapterNumber: string;
  displayNumber: string;
  displaySlug: string;
};

export type PlannedBook = {
  sourceUrl: string;
  contentHash: string;
  lessons: PlannedLesson[];
};

export async function discoverPlannedLessons(sourceBook: SourceBookPlan) {
  const discoveredBook = await fetchBookToc(sourceBook.sourceUrl);
  const targetChapters = new Set(
    sourceBook.targetRanges.map(([start]) => parseLessonNumber(start).chapter),
  );
  const lessons: PlannedLesson[] = [];

  for (const chapter of discoveredBook.chapters) {
    if (!targetChapters.has(chapter.sourceNumber)) continue;

    const chapterToc = await fetchChapterToc(chapter.href);
    for (const lesson of chapterToc.lessons) {
      if (!isInTargetRanges(lesson.sourceNumber, sourceBook.targetRanges)) {
        continue;
      }

      const displayNumber = resolveDisplayNumber(
        lesson.sourceNumber,
        sourceBook.numberingPolicy,
      );

      lessons.push({
        ...lesson,
        sourceChapterNumber: chapter.sourceNumber,
        displayNumber,
        displaySlug: slugify(`${displayNumber}-${lesson.title}`),
      });
    }
  }

  return {
    sourceUrl: discoveredBook.sourceUrl,
    contentHash: hashPlannedLessons(discoveredBook.contentHash, lessons),
    lessons,
  };
}

export function isInTargetRanges(
  sourceNumber: string,
  ranges: readonly (readonly [string, string])[],
) {
  return ranges.some(([start, end]) => {
    return (
      compareLessonNumbers(sourceNumber, start) >= 0 &&
      compareLessonNumbers(sourceNumber, end) <= 0
    );
  });
}

export function resolveDisplayNumber(
  sourceNumber: string,
  numberingPolicy: SourceBookPlan["numberingPolicy"],
) {
  if (numberingPolicy !== "skip_intro_shift") return sourceNumber;

  const parsed = parseLessonNumber(sourceNumber);
  const displayChapter =
    Number(parsed.chapter) > 1 ? Number(parsed.chapter) - 1 : 1;
  const displayLesson =
    typeof parsed.lesson === "number" && parsed.lesson > 1
      ? parsed.lesson - 1
      : parsed.lesson;

  return `${displayChapter}.${displayLesson}`;
}

function compareLessonNumbers(left: string, right: string) {
  const parsedLeft = parseLessonNumber(left);
  const parsedRight = parseLessonNumber(right);

  if (parsedLeft.chapter !== parsedRight.chapter) {
    return Number(parsedLeft.chapter) - Number(parsedRight.chapter);
  }

  return lessonOrdinal(parsedLeft.lesson) - lessonOrdinal(parsedRight.lesson);
}

function parseLessonNumber(sourceNumber: string) {
  const match = /^(\d+)\.(\d+|[A-Z])$/i.exec(sourceNumber);
  if (!match) {
    throw new Error(`Unsupported lesson number: ${sourceNumber}`);
  }

  const rawLesson = match[2];
  const numericLesson = Number(rawLesson);

  return {
    chapter: String(Number(match[1])),
    lesson: Number.isNaN(numericLesson) ? rawLesson.toUpperCase() : numericLesson,
  };
}

function lessonOrdinal(lesson: number | string) {
  if (typeof lesson === "number") return lesson;
  return 1000 + lesson.charCodeAt(0);
}

function hashPlannedLessons(bookHash: string, lessons: PlannedLesson[]) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        bookHash,
        lessons: lessons.map(
          ({ sourceNumber, displayNumber, title, href, displaySlug }) => ({
            sourceNumber,
            displayNumber,
            title,
            href,
            displaySlug,
          }),
        ),
      }),
    )
    .digest("hex");
}
