import { sourceBooks } from "@/data/source-plans";
import { fetchPlannedLessonContent } from "@/src/crawler/seed-lesson";
import type { ParsedLessonBlock } from "@/src/crawler/lesson-content";

async function main() {
  const sourceBookSlug = process.argv[2] ?? "prealgebra-2e-openstax";
  const sourceNumber = process.argv[3] ?? "2.6";
  const { plannedLesson, parsedLesson } = await fetchPlannedLessonContent({
    sourceBookSlug,
    sourceNumber,
    sourceBookPlans: sourceBooks,
  });

  console.log("Planned lesson inspection.");
  console.log(
    JSON.stringify(
      {
        sourceBookSlug,
        sourceNumber: plannedLesson.sourceNumber,
        displayNumber: plannedLesson.displayNumber,
        title: plannedLesson.title,
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
          blockTypes: summarizeBlockTypes(section.blocks),
          examples: section.blocks
            .filter((block) => block.type === "example")
            .map((block) => block.label),
        })),
        exerciseSamples: parsedLesson.exercises.slice(0, 12).map((exercise) => ({
          number: exercise.number,
          prompt: truncate(exercise.promptText, 160),
        })),
        assetSamples: parsedLesson.assets.slice(0, 12).map((asset) => ({
          id: asset.id,
          type: asset.type,
          treatment: asset.preferredTreatment,
          label: truncate(asset.caption ?? asset.altText ?? "", 160),
        })),
      },
      null,
      2,
    ),
  );
}

function summarizeBlockTypes(blocks: ParsedLessonBlock[]) {
  const counts = new Map<string, number>();

  for (const block of blocks) {
    counts.set(block.type, (counts.get(block.type) ?? 0) + 1);
  }

  return Object.fromEntries([...counts.entries()].sort());
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
