import { books as catalogBooks } from "@/data/book-catalog";
import { seedLessonConfigs } from "@/data/seed-lessons";
import { sourceBooks } from "@/data/source-plans";
import { fetchSeedLessonContent } from "@/src/crawler/seed-lesson";
import type { ContentBlock, Lesson } from "@/src/content/types";

type MissingTryIt = {
  label: string;
  prompt: string;
};

type MissingExercise = {
  number: string;
  prompt: string;
};

async function main() {
  const failOnMissing = process.argv.includes("--fail-on-missing");
  const reports = [];

  for (const seedConfig of seedLessonConfigs) {
    const result = await fetchSeedLessonContent({
      seedConfig,
      sourceBookPlans: sourceBooks,
      catalog: catalogBooks,
    });

    const answeredExerciseNumbers = new Set(
      result.lesson.exercises.map((exercise) => exercise.number),
    );
    const missingExercises = result.parsedLesson.exercises
      .filter((exercise) => !answeredExerciseNumbers.has(exercise.number))
      .map((exercise) => ({
        number: exercise.number,
        prompt: truncate(exercise.promptText, 180),
      }));
    const missingTryIts = collectMissingTryIts(result.lesson);

    reports.push({
      sourceBookSlug: result.sourceBook.slug,
      sourceNumber: result.plannedLesson.sourceNumber,
      lessonSlug: result.lesson.slug,
      lessonTitle: result.lesson.displayTitle,
      tryIts: {
        total: countExamples(result.lesson, /^Sıra Sizde\b/i),
        withSolution:
          countExamples(result.lesson, /^Sıra Sizde\b/i) - missingTryIts.length,
        missing: missingTryIts.length,
        missingItems: missingTryIts,
      },
      exercises: {
        sourceTotal: result.parsedLesson.exercises.length,
        withSolution: result.lesson.exercises.length,
        missing: missingExercises.length,
        missingItems: missingExercises,
      },
    });
  }

  const totals = reports.reduce(
    (total, report) => ({
      tryIts: total.tryIts + report.tryIts.total,
      tryItsWithSolution:
        total.tryItsWithSolution + report.tryIts.withSolution,
      missingTryIts: total.missingTryIts + report.tryIts.missing,
      sourceExercises: total.sourceExercises + report.exercises.sourceTotal,
      exercisesWithSolution:
        total.exercisesWithSolution + report.exercises.withSolution,
      missingExercises: total.missingExercises + report.exercises.missing,
    }),
    {
      tryIts: 0,
      tryItsWithSolution: 0,
      missingTryIts: 0,
      sourceExercises: 0,
      exercisesWithSolution: 0,
      missingExercises: 0,
    },
  );

  const payload = {
    totals,
    lessons: reports,
  };

  console.log("Solution coverage report.");
  console.log(JSON.stringify(payload, null, 2));

  if (
    failOnMissing &&
    (totals.missingTryIts > 0 || totals.missingExercises > 0)
  ) {
    throw new Error("Missing lesson solutions remain.");
  }
}

function collectMissingTryIts(lesson: Lesson): MissingTryIt[] {
  return lesson.sections.flatMap((section) =>
    section.blocks.flatMap((block) => collectMissingTryItsFromBlock(block)),
  );
}

function collectMissingTryItsFromBlock(block: ContentBlock): MissingTryIt[] {
  if (block.type === "callout") {
    return block.blocks.flatMap((child) => collectMissingTryItsFromBlock(child));
  }

  if (
    block.type === "example" &&
    /^Sıra Sizde\b/i.test(block.label) &&
    block.solution.length === 0
  ) {
    return [
      {
        label: block.label,
        prompt: truncate(inlineText(block.prompt), 180),
      },
    ];
  }

  return [];
}

function countExamples(lesson: Lesson, pattern: RegExp) {
  return lesson.sections.reduce(
    (total, section) =>
      total +
      section.blocks.filter(
        (block) => block.type === "example" && pattern.test(block.label),
      ).length,
    0,
  );
}

function inlineText(items: Array<{ type: "text" | "math"; value: string }>) {
  return items.map((item) => item.value).join(" ").replace(/\s+/g, " ").trim();
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
