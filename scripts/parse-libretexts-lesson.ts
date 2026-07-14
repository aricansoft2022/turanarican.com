import { sourceBooks } from "@/data/source-plans";
import {
  fetchLessonContent,
  parsedLessonBlocksToContentBlocks,
} from "@/src/crawler/lesson-content";
import { discoverPlannedLessons } from "@/src/crawler/lesson-plan";
import type { ContentBlock, InlineContent } from "@/src/content/types";

async function main() {
  const sourceBook = sourceBooks.find(
    (book) => book.slug === "prealgebra-2e-openstax",
  );

  if (!sourceBook) {
    throw new Error("Prealgebra source book is not configured.");
  }

  const plannedBook = await discoverPlannedLessons(sourceBook);
  const lesson = plannedBook.lessons.find(
    (plannedLesson) => plannedLesson.sourceNumber === "2.3",
  );

  if (!lesson) {
    throw new Error("Sample lesson 2.3 was not found in the planned lesson set.");
  }

  const parsedLesson = await fetchLessonContent(lesson.href, {
    bookSlug: sourceBook.slug,
    lessonSlug: lesson.displaySlug,
  });
  const renderBlocks = parsedLesson.sections.flatMap((section) =>
    parsedLessonBlocksToContentBlocks(section.blocks),
  );

  console.log(`${lesson.sourceNumber} -> ${lesson.displayNumber} ${lesson.title}`);
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

  for (const section of parsedLesson.sections) {
    console.log(`- ${section.heading} (${section.blocks.length} blocks)`);
  }
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
