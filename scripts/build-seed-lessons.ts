import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { books as catalogBooks } from "@/data/catalog";
import { seedLessonConfigs } from "@/data/seed-lessons";
import { sourceBooks } from "@/data/source-plans";
import { fetchSeedLessonContent } from "@/src/crawler/seed-lesson";
import type { ContentBlock, InlineContent, Lesson } from "@/src/content/types";

const outputPath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-lessons.json",
);

async function main() {
  const entries = [];

  for (const seedConfig of seedLessonConfigs) {
    const result = await fetchSeedLessonContent({
      seedConfig,
      sourceBookPlans: sourceBooks,
      catalog: catalogBooks,
    });

    assertRenderableLesson(result.lesson);

    entries.push({
      sourceBookSlug: result.sourceBook.slug,
      sourceNumber: result.plannedLesson.sourceNumber,
      displayNumber: result.plannedLesson.displayNumber,
      sourceUrl: result.plannedLesson.href,
      contentHash: result.parsedLesson.contentHash,
      validation: result.parsedLesson.validation,
      metrics: {
        objectives: result.lesson.objectives.length,
        sections: result.lesson.sections.length,
        blocks: countLessonBlocks(result.lesson),
        examples: countBlocksByLabel(result.lesson, /^Example/i),
        tryIts: countBlocksByLabel(result.lesson, /^Try It/i),
        exercises: result.lesson.exercises.length,
        mathTokens: countMathTokens(
          result.lesson.sections.flatMap((section) => section.blocks),
        ),
        assets: result.parsedLesson.assetCount,
      },
      lesson: result.lesson,
    });
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        parserVersion: "lesson-content-v1",
        lessons: entries,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Wrote ${entries.length} seed lesson fixture(s).`);
  console.log(path.relative(process.cwd(), outputPath));
}

function assertRenderableLesson(lesson: Lesson) {
  if (!lesson.objectives.length) {
    throw new Error("Seed lesson has no objectives.");
  }

  if (!lesson.sections.length) {
    throw new Error("Seed lesson has no sections.");
  }

  const emptySection = lesson.sections.find((section) => !section.blocks.length);
  if (emptySection) {
    throw new Error(`Seed lesson section has no blocks: ${emptySection.slug}`);
  }

  const emptyExercise = lesson.exercises.find(
    (exercise) =>
      !exercise.prompt.length || !exercise.answer.length || !exercise.sectionSlug,
  );
  if (emptyExercise) {
    throw new Error(`Seed lesson exercise is incomplete: ${emptyExercise.number}`);
  }
}

function countLessonBlocks(lesson: Lesson) {
  return lesson.sections.reduce(
    (total, section) => total + section.blocks.length,
    0,
  );
}

function countBlocksByLabel(lesson: Lesson, pattern: RegExp) {
  return lesson.sections.reduce((total, section) => {
    return (
      total +
      section.blocks.filter((block) => {
        return block.type === "example" && pattern.test(block.label);
      }).length
    );
  }, 0);
}

function countMathTokens(blocks: ContentBlock[]) {
  return blocks.reduce((total, block) => total + countBlockMathTokens(block), 0);
}

function countBlockMathTokens(block: ContentBlock): number {
  if (block.type === "paragraph") return countInlineMathTokens(block.text);
  if (block.type === "list") {
    return block.items.reduce(
      (total, item) => total + countInlineMathTokens(item),
      0,
    );
  }
  if (block.type === "callout") return countMathTokens(block.blocks);
  if (block.type === "example") {
    return countInlineMathTokens(block.prompt) + countMathTokens(block.solution);
  }
  if (block.type === "figure") return countInlineMathTokens(block.caption ?? []);

  return 0;
}

function countInlineMathTokens(items: InlineContent[]) {
  return items.filter((item) => item.type === "math").length;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
