import { books as catalogBooks } from "@/data/catalog";
import { seedLessonConfigs } from "@/data/seed-lessons";
import { sourceBooks } from "@/data/source-plans";
import { parsedLessonBlocksToContentBlocks } from "@/src/crawler/lesson-content";
import { fetchSeedLessonContent } from "@/src/crawler/seed-lesson";
import type { ContentBlock, InlineContent, Lesson } from "@/src/content/types";

async function main() {
  const seedConfig = seedLessonConfigs.find(
    (config) =>
      config.sourceBookSlug === "prealgebra-2e-openstax" &&
      config.sourceNumber === "2.3",
  );

  if (!seedConfig) {
    throw new Error("Sample lesson 2.3 seed config is not configured.");
  }

  const { plannedLesson, parsedLesson, lesson: seedLesson } =
    await fetchSeedLessonContent({
      seedConfig,
      sourceBookPlans: sourceBooks,
      catalog: catalogBooks,
    });
  assertRenderableLesson(seedLesson);

  const renderBlocks = parsedLesson.sections.flatMap((section) =>
    parsedLessonBlocksToContentBlocks(section.blocks),
  );

  console.log(
    `${plannedLesson.sourceNumber} -> ${plannedLesson.displayNumber} ${plannedLesson.title}`,
  );
  console.log(`hash: ${parsedLesson.contentHash.slice(0, 16)}`);
  console.log(`objectives: ${parsedLesson.objectives.length}`);
  console.log(`sections: ${parsedLesson.sections.length}`);
  console.log(`examples: ${parsedLesson.examples.length}`);
  console.log(`try its: ${parsedLesson.tryIts.length}`);
  console.log(`exercises: ${parsedLesson.exercises.length}`);
  console.log(`assets: ${parsedLesson.assetCount}`);
  console.log(`self check removed: ${parsedLesson.validation.selfCheckRemoved}`);
  console.log(`empty examples: ${parsedLesson.validation.emptyExamples.length}`);
  console.log(`empty try its: ${parsedLesson.validation.emptyTryIts.length}`);
  console.log(`empty exercises: ${parsedLesson.validation.emptyExercises.length}`);
  console.log(`renderable blocks: ${renderBlocks.length}`);
  console.log(`renderable examples: ${countBlocksByLabel(renderBlocks, /^Example/i)}`);
  console.log(`renderable try its: ${countBlocksByLabel(renderBlocks, /^Try It/i)}`);
  console.log(`math tokens: ${countMathTokens(renderBlocks)}`);
  console.log(
    `example solutions: ${parsedLesson.examples.filter((example) => example.solution.length > 0).length}`,
  );
  console.log(`seed lesson sections: ${seedLesson.sections.length}`);
  console.log(`seed lesson blocks: ${countLessonBlocks(seedLesson)}`);
  console.log(`seed lesson exercises: ${seedLesson.exercises.length}`);

  for (const section of parsedLesson.sections) {
    console.log(`- ${section.heading} (${section.blocks.length} blocks)`);
  }
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

function countBlocksByLabel(blocks: ContentBlock[], pattern: RegExp) {
  return blocks.filter((block) => {
    return block.type === "example" && pattern.test(block.label);
  }).length;
}

function countInlineMathTokens(items: InlineContent[]) {
  return items.filter((item) => item.type === "math").length;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
