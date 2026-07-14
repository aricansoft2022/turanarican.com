import { sourceBooks } from "@/data/source-plans";
import { fetchPlannedLessonContent } from "@/src/crawler/seed-lesson";
import type { ParsedLessonBlock } from "@/src/crawler/lesson-content";

async function main() {
  const { includeDraft, positionalArgs } = parseArgs(process.argv.slice(2));
  const sourceBookSlug = positionalArgs[0] ?? "prealgebra-2e-openstax";
  const sourceNumber = positionalArgs[1] ?? "2.6";
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
        seedConfigDraft: includeDraft
          ? buildSeedConfigDraft({
              sourceBookSlug,
              plannedLesson,
              parsedLesson,
            })
          : undefined,
      },
      null,
      2,
    ),
  );
}

function parseArgs(args: string[]) {
  return {
    includeDraft: args.includes("--draft"),
    positionalArgs: args.filter((arg) => !arg.startsWith("--")),
  };
}

function buildSeedConfigDraft({
  sourceBookSlug,
  plannedLesson,
  parsedLesson,
}: {
  sourceBookSlug: string;
  plannedLesson: Awaited<
    ReturnType<typeof fetchPlannedLessonContent>
  >["plannedLesson"];
  parsedLesson: Awaited<
    ReturnType<typeof fetchPlannedLessonContent>
  >["parsedLesson"];
}) {
  return {
    sourceBookSlug,
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: plannedLesson.sourceNumber,
    catalogLesson: {
      id: "lesson-todo",
      slug: "todo",
      displayTitle: "TODO",
      summary: "TODO",
      sortOrder: Number(plannedLesson.sourceNumber.split(".").at(-1)),
    },
    objectives: parsedLesson.objectives.map((objective) => `TODO: ${objective}`),
    sectionTitles: Object.fromEntries(
      parsedLesson.sections.map((section) => [section.heading, "TODO"]),
    ),
    suggestedExerciseSectionSlugs: Object.fromEntries(
      collectExerciseCandidates(parsedLesson).map((candidate) => [
        candidate.number,
        candidate.sourceSectionSlug,
      ]),
    ),
    suggestedExerciseAnswerKeys: collectExerciseCandidates(parsedLesson).map(
      (candidate) => candidate.number,
    ),
  };
}

function collectExerciseCandidates(
  parsedLesson: Awaited<
    ReturnType<typeof fetchPlannedLessonContent>
  >["parsedLesson"],
) {
  let currentSectionSlug = parsedLesson.sections[0]?.slug ?? "";

  return parsedLesson.exercises.map((exercise) => {
    currentSectionSlug =
      inferExerciseSectionSlug(exercise.promptText, parsedLesson.sections) ??
      currentSectionSlug;

    return {
      number: exercise.number,
      sourceSectionSlug: currentSectionSlug,
      prompt: truncate(exercise.promptText, 120),
    };
  });
}

function inferExerciseSectionSlug(
  prompt: string,
  sections: Array<{ slug: string }>,
) {
  const promptLower = prompt.toLowerCase();
  const wantedSlug =
    findPrimeFactorizationExerciseSlug(promptLower) ??
    findLeastCommonMultipleExerciseSlug(promptLower);

  if (!wantedSlug) return undefined;

  return sections.find((section) => section.slug === wantedSlug)?.slug;
}

function findPrimeFactorizationExerciseSlug(promptLower: string) {
  if (!promptLower.includes("prime factorization")) return undefined;
  if (promptLower.includes("factor tree")) {
    return "prime-factorization-using-the-factor-tree-method";
  }
  if (promptLower.includes("ladder")) {
    return "prime-factorization-using-the-ladder-method";
  }

  return "find-the-prime-factorization-of-a-composite-number";
}

function findLeastCommonMultipleExerciseSlug(promptLower: string) {
  if (
    !promptLower.includes("least common multiple") &&
    !promptLower.includes("lcm")
  ) {
    return undefined;
  }

  if (promptLower.includes("listing multiples")) {
    return "listing-multiples-method";
  }
  if (promptLower.includes("prime factors method")) {
    return "prime-factors-method";
  }

  return "find-the-least-common-multiple-lcm-of-two-numbers";
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
