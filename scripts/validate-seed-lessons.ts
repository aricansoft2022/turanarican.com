import { readFile } from "node:fs/promises";
import path from "node:path";

import type {
  ContentBlock,
  InlineContent,
  Lesson,
  SourceAsset,
} from "@/src/content/types";

const fixturePath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-lessons.json",
);

type SeedFixture = {
  schemaVersion: number;
  parserVersion: string;
  lessons: SeedFixtureLesson[];
};

type SeedFixtureLesson = {
  sourceBookSlug: string;
  sourceNumber: string;
  displayNumber: string;
  sourceUrl: string;
  contentHash: string;
  validation: {
    selfCheckRemoved: boolean;
    emptyExamples: string[];
    emptyTryIts: string[];
    emptyExercises: string[];
  };
  assets: SourceAsset[];
  metrics: {
    objectives: number;
    sections: number;
    blocks: number;
    examples: number;
    tryIts: number;
    exercises: number;
    mathTokens: number;
    assets: number;
  };
  lesson: Lesson;
};

async function main() {
  const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as SeedFixture;
  assertFixture(fixture);

  console.log("Validated seed lesson fixture.");
  console.log(
    JSON.stringify(
      {
        lessons: fixture.lessons.length,
        sections: sum(fixture.lessons, (entry) => entry.lesson.sections.length),
        blocks: sum(fixture.lessons, (entry) => countLessonBlocks(entry.lesson)),
        exercises: sum(fixture.lessons, (entry) => entry.lesson.exercises.length),
        assets: sum(fixture.lessons, (entry) => entry.assets.length),
      },
      null,
      2,
    ),
  );
}

function assertFixture(fixture: SeedFixture) {
  if (fixture.schemaVersion !== 1) {
    throw new Error(`Unsupported seed fixture schema: ${fixture.schemaVersion}`);
  }

  if (fixture.parserVersion !== "lesson-content-v1") {
    throw new Error(`Unsupported parser version: ${fixture.parserVersion}`);
  }

  if (!fixture.lessons.length) {
    throw new Error("Seed fixture has no lessons.");
  }

  assertUnique(fixture.lessons.map((entry) => entry.lesson.id), "lesson id");
  assertUnique(fixture.lessons.map((entry) => entry.sourceUrl), "source URL");
  assertUnique(fixture.lessons.map((entry) => entry.contentHash), "content hash");

  for (const entry of fixture.lessons) {
    assertLessonEntry(entry);
  }
}

function assertLessonEntry(entry: SeedFixtureLesson) {
  const { lesson } = entry;

  assertRequired(entry.sourceBookSlug, `source book slug for ${lesson.id}`);
  assertRequired(entry.sourceNumber, `source number for ${lesson.id}`);
  assertRequired(entry.displayNumber, `display number for ${lesson.id}`);
  assertRequired(entry.sourceUrl, `source URL for ${lesson.id}`);
  assertRequired(entry.contentHash, `content hash for ${lesson.id}`);
  assertRequired(lesson.bookSlug, `book slug for ${lesson.id}`);
  assertRequired(lesson.chapterSlug, `chapter slug for ${lesson.id}`);
  assertRequired(lesson.sourceTitle, `source title for ${lesson.id}`);
  assertRequired(lesson.displayTitle, `display title for ${lesson.id}`);
  assertRequired(lesson.license?.name, `license name for ${lesson.id}`);
  assertRequired(lesson.license?.url, `license URL for ${lesson.id}`);
  assertRequired(lesson.license?.attribution, `license attribution for ${lesson.id}`);

  if (entry.sourceNumber !== lesson.sourceNumber) {
    throw new Error(`Source number mismatch for ${lesson.id}.`);
  }

  if (entry.displayNumber !== lesson.displayNumber) {
    throw new Error(`Display number mismatch for ${lesson.id}.`);
  }

  if (!entry.validation.selfCheckRemoved) {
    throw new Error(`Self Check was not removed for ${lesson.id}.`);
  }

  assertEmpty(entry.validation.emptyExamples, `empty examples for ${lesson.id}`);
  assertEmpty(entry.validation.emptyTryIts, `empty try-it boxes for ${lesson.id}`);
  assertEmpty(entry.validation.emptyExercises, `empty exercises for ${lesson.id}`);

  if (!lesson.objectives.length) {
    throw new Error(`Lesson has no objectives: ${lesson.id}`);
  }

  if (!lesson.sections.length) {
    throw new Error(`Lesson has no sections: ${lesson.id}`);
  }

  assertUnique(lesson.sections.map((section) => section.id), `section id in ${lesson.id}`);
  assertUnique(
    lesson.sections.map((section) => section.slug),
    `section slug in ${lesson.id}`,
  );
  assertUnique(
    lesson.exercises.map((exercise) => exercise.id),
    `exercise id in ${lesson.id}`,
  );
  assertUnique(entry.assets.map((asset) => asset.id), `asset id in ${lesson.id}`);
  assertUnique(
    entry.assets.map((asset) => asset.sourceUrl),
    `asset source URL in ${lesson.id}`,
  );
  assertUnique(entry.assets.map((asset) => asset.localKey), `local asset key in ${lesson.id}`);
  assertUnique(entry.assets.map((asset) => asset.r2Key), `R2 asset key in ${lesson.id}`);

  const sectionSlugs = new Set(lesson.sections.map((section) => section.slug));
  const assetIds = new Set(entry.assets.map((asset) => asset.id));

  for (const section of lesson.sections) {
    if (!section.blocks.length) {
      throw new Error(`Section has no content blocks: ${lesson.id}/${section.slug}`);
    }

    assertBlocks(section.blocks, assetIds, `${lesson.id}/${section.slug}`);
  }

  for (const exercise of lesson.exercises) {
    if (!sectionSlugs.has(exercise.sectionSlug)) {
      throw new Error(
        `Exercise section is not in lesson sections: ${lesson.id}/${exercise.number}`,
      );
    }

    if (!exercise.prompt.length || !exercise.answer.length) {
      throw new Error(`Exercise prompt or answer is empty: ${lesson.id}/${exercise.number}`);
    }
  }

  for (const asset of entry.assets) {
    assertRequired(asset.sourceUrl, `asset source URL for ${asset.id}`);
    assertRequired(asset.localKey, `asset local key for ${asset.id}`);
    assertRequired(asset.r2Key, `asset R2 key for ${asset.id}`);
    assertRequired(asset.preferredTreatment, `asset treatment for ${asset.id}`);
    assertRequired(asset.status, `asset status for ${asset.id}`);
  }

  assertMetrics(entry);
}

function assertBlocks(
  blocks: ContentBlock[],
  assetIds: ReadonlySet<string>,
  context: string,
) {
  for (const block of blocks) {
    if (block.type === "paragraph") {
      assertInlineContent(block.text, `paragraph in ${context}`);
      continue;
    }

    if (block.type === "list") {
      if (!block.items.length) throw new Error(`Empty list in ${context}.`);
      block.items.forEach((item, index) =>
        assertInlineContent(item, `list item ${index + 1} in ${context}`),
      );
      continue;
    }

    if (block.type === "table") {
      if (!block.columns.length && !block.rows.length) {
        throw new Error(`Empty table in ${context}.`);
      }
      continue;
    }

    if (block.type === "figure") {
      if (!assetIds.has(block.assetId)) {
        throw new Error(`Figure references missing asset ${block.assetId} in ${context}.`);
      }
      continue;
    }

    if (block.type === "callout") {
      assertRequired(block.label, `callout label in ${context}`);
      if (!block.blocks.length) throw new Error(`Empty callout in ${context}.`);
      assertBlocks(block.blocks, assetIds, context);
      continue;
    }

    assertRequired(block.label, `example label in ${context}`);
    assertInlineContent(block.prompt, `example prompt in ${context}`);
    if (/^Example/i.test(block.label) && !block.solution.length) {
      throw new Error(`Example solution is empty in ${context}.`);
    }
    assertBlocks(block.solution, assetIds, context);
  }
}

function assertInlineContent(items: InlineContent[], context: string) {
  if (!items.length) throw new Error(`Empty inline content: ${context}.`);

  for (const item of items) {
    assertRequired(item.value, `inline ${item.type} in ${context}`);
  }
}

function assertMetrics(entry: SeedFixtureLesson) {
  const { lesson, metrics } = entry;
  const actual = {
    objectives: lesson.objectives.length,
    sections: lesson.sections.length,
    blocks: countLessonBlocks(lesson),
    examples: countBlocksByLabel(lesson, /^Example/i),
    tryIts: countBlocksByLabel(lesson, /^Try It/i),
    exercises: lesson.exercises.length,
    mathTokens: countMathTokens(
      lesson.sections.flatMap((section) => section.blocks),
    ),
    assets: entry.assets.length,
  };

  for (const [key, value] of Object.entries(actual)) {
    const metric = metrics[key as keyof typeof metrics];
    if (metric !== value) {
      throw new Error(
        `Metric mismatch for ${lesson.id}/${key}: expected ${metric}, got ${value}`,
      );
    }
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

function countMathTokens(blocks: ContentBlock[]): number {
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

function assertRequired(value: unknown, label: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing ${label}.`);
  }
}

function assertEmpty(values: unknown[], label: string) {
  if (values.length) {
    throw new Error(`Expected no ${label}: ${JSON.stringify(values)}`);
  }
}

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function sum<T>(items: T[], select: (item: T) => number) {
  return items.reduce((total, item) => total + select(item), 0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
