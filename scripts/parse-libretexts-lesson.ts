import { books as catalogBooks } from "@/data/catalog";
import { sourceBooks } from "@/data/source-plans";
import { buildLessonFromParsedContent } from "@/src/crawler/lesson-adapter";
import {
  fetchLessonContent,
  parsedLessonBlocksToContentBlocks,
} from "@/src/crawler/lesson-content";
import { discoverPlannedLessons } from "@/src/crawler/lesson-plan";
import type { ContentBlock, InlineContent, Lesson } from "@/src/content/types";

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
  const catalogBook = catalogBooks.find((book) => book.slug === "prealgebra-2e");
  const catalogChapter = catalogBook?.chapters.find(
    (chapter) => chapter.slug === "cebir-diline-giris",
  );
  const catalogLesson = catalogChapter?.lessons.find(
    (lessonSummary) => lessonSummary.sourceNumber === "2.3",
  );

  if (!lesson) {
    throw new Error("Sample lesson 2.3 was not found in the planned lesson set.");
  }

  if (!catalogBook || !catalogChapter || !catalogLesson) {
    throw new Error("Sample lesson 2.3 is not configured in the catalog.");
  }

  const parsedLesson = await fetchLessonContent(lesson.href, {
    bookSlug: sourceBook.slug,
    lessonSlug: lesson.displaySlug,
  });
  const renderBlocks = parsedLesson.sections.flatMap((section) =>
    parsedLessonBlocksToContentBlocks(section.blocks),
  );
  const seedLesson = buildLessonFromParsedContent({
    book: catalogBook,
    chapter: catalogChapter,
    lesson: catalogLesson,
    parsedLesson,
    objectives: [
      "Cebirsel ifadeleri değerlendirin.",
      "Terimleri, katsayıları ve benzer terimleri belirleyin.",
      "Benzer terimleri birleştirerek ifadeleri sadeleştirin.",
      "Sözcük öbeklerini cebirsel ifadelere çevirin.",
    ],
    sectionTitles: {
      "Evaluate Algebraic Expressions": "Cebirsel İfadeleri Değerlendirme",
      "Identify Terms, Coefficients, and Like Terms":
        "Terimleri, Katsayıları ve Benzer Terimleri Belirleme",
      "Simplify Expressions by Combining Like Terms":
        "Benzer Terimleri Birleştirerek İfadeleri Sadeleştirme",
      "Translate Words to Algebraic Expressions":
        "Sözcük Öbeklerini Cebirsel İfadelere Çevirme",
    },
    exerciseAnswers: {
      "69": [{ type: "math", value: "22" }],
      "79": [{ type: "math", value: "21" }],
      "101": [{ type: "math", value: "13x" }],
      "135": [{ type: "math", value: "5(x+y)" }],
    },
    exerciseSectionSlugs: {
      "69": "cebirsel-ifadeleri-degerlendirme",
      "79": "cebirsel-ifadeleri-degerlendirme",
      "101": "benzer-terimleri-birlestirme",
      "135": "sozcuk-obeklerini-cebirsel-ifadelere-cevirme",
    },
  });
  assertRenderableLesson(seedLesson);

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
