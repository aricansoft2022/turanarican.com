import { sourceBooks } from "@/data/source-plans";
import { fetchLessonContent } from "@/src/crawler/lesson-content";
import { discoverPlannedLessons } from "@/src/crawler/lesson-plan";

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

  for (const section of parsedLesson.sections) {
    console.log(`- ${section.heading} (${section.blocks.length} blocks)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
