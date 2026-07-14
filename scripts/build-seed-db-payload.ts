import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { books as catalogBooks } from "@/data/catalog";

import {
  validateSeedFixture,
  type SeedFixture,
} from "./validate-seed-lessons";

const inputPath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-lessons.json",
);
const outputPath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-db-payload.json",
);

async function main() {
  const fixture = JSON.parse(await readFile(inputPath, "utf8")) as SeedFixture;
  validateSeedFixture(fixture);

  const payload = buildPayload(fixture);
  assertPayload(payload);

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);

  console.log("Wrote seed DB payload.");
  console.log(path.relative(process.cwd(), outputPath));
  console.log(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(payload.rows).map(([key, rows]) => [key, rows.length]),
      ),
      null,
      2,
    ),
  );
}

function buildPayload(fixture: SeedFixture) {
  const lessonBookIds = new Set(
    fixture.lessons.map(({ lesson }) => lesson.bookId),
  );
  const lessonChapterIds = new Set(
    fixture.lessons.map(({ lesson }) => lesson.chapterId),
  );
  const catalogBookRows = catalogBooks
    .filter((book) => lessonBookIds.has(book.id))
    .map((book) => ({
      id: book.id,
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      sourceUrl: book.sourceUrl,
      sourcePlatform: book.sourcePlatform,
      licenseName: book.license.name,
      licenseUrl: book.license.url,
      attributionText: book.license.attribution,
      language: "tr",
      numberingPolicy: book.numberingPolicy,
      status: "draft",
    }));
  const catalogChapterRows = catalogBooks
    .flatMap((book) => book.chapters)
    .filter((chapter) => lessonChapterIds.has(chapter.id))
    .map((chapter) => ({
      id: chapter.id,
      bookId: chapter.bookId,
      slug: chapter.slug,
      sourceNumber: chapter.sourceNumber,
      displayNumber: chapter.displayNumber,
      sourceTitle: chapter.sourceTitle,
      displayTitle: chapter.displayTitle,
      sourceUrl: chapter.sourceUrl,
      sortOrder: chapter.sortOrder,
    }));

  const sourceSnapshots = fixture.lessons.map((entry) => ({
    id: `snapshot-${entry.contentHash.slice(0, 16)}`,
    sourceUrl: entry.sourceUrl,
    httpStatus: 200,
    contentHash: entry.contentHash,
    rawHtmlPath: null,
    parserVersion: fixture.parserVersion,
  }));

  const lessons = fixture.lessons.map(({ lesson, contentHash }) => ({
    id: lesson.id,
    chapterId: lesson.chapterId,
    slug: lesson.slug,
    sourceNumber: lesson.sourceNumber,
    displayNumber: lesson.displayNumber,
    sourceTitle: lesson.sourceTitle,
    displayTitle: lesson.displayTitle,
    summary: lesson.summary,
    sourceUrl: lesson.sourceUrl,
    sortOrder: lesson.sortOrder,
    status: "draft",
    rawHash: contentHash,
  }));

  const lessonSections = fixture.lessons.flatMap(({ lesson }) =>
    lesson.sections.map((section, index) => ({
      id: section.id,
      lessonId: lesson.id,
      heading: section.heading,
      slug: section.slug,
      level: section.level,
      sortOrder: index + 1,
      contentJson: section.blocks,
    })),
  );

  const exercises = fixture.lessons.flatMap(({ lesson }) =>
    lesson.exercises.map((exercise) => ({
      id: `${lesson.id}-${exercise.id}`,
      lessonId: lesson.id,
      sectionId:
        lesson.sections.find((section) => section.slug === exercise.sectionSlug)
          ?.id ?? null,
      number: exercise.number,
      promptJson: exercise.prompt,
      answerJson: exercise.answer,
      sortOrder: exercise.sortOrder,
      difficulty: null,
      tagsJson: null,
    })),
  );

  const sourceAssets = fixture.lessons.flatMap((entry) => {
    const snapshotId = `snapshot-${entry.contentHash.slice(0, 16)}`;
    return entry.assets.map((asset) => ({
      id: `${entry.lesson.id}-asset-${asset.id}`,
      lessonId: entry.lesson.id,
      sourceSnapshotId: snapshotId,
      sourceUrl: asset.sourceUrl,
      assetType: asset.type,
      altText: asset.altText ?? null,
      caption: asset.caption ?? null,
      localKey: asset.localKey,
      r2Key: asset.r2Key,
      contentHash: asset.contentHash ?? null,
      preferredTreatment: asset.preferredTreatment,
      status: asset.status,
    }));
  });

  return {
    schemaVersion: 1,
    sourceFixture: path.relative(process.cwd(), inputPath),
    rows: {
      books: catalogBookRows,
      chapters: catalogChapterRows,
      lessons,
      lessonSections,
      exercises,
      sourceSnapshots,
      sourceAssets,
    },
  };
}

function assertPayload(payload: ReturnType<typeof buildPayload>) {
  assertUnique(payload.rows.books.map((row) => row.id), "book id");
  assertUnique(payload.rows.chapters.map((row) => row.id), "chapter id");
  assertUnique(payload.rows.lessons.map((row) => row.id), "lesson id");
  assertUnique(payload.rows.lessonSections.map((row) => row.id), "section id");
  assertUnique(payload.rows.exercises.map((row) => row.id), "exercise id");
  assertUnique(
    payload.rows.sourceSnapshots.map((row) => row.id),
    "source snapshot id",
  );
  assertUnique(payload.rows.sourceAssets.map((row) => row.id), "source asset id");

  const bookIds = new Set(payload.rows.books.map((row) => row.id));
  const chapterIds = new Set(payload.rows.chapters.map((row) => row.id));
  const lessonIds = new Set(payload.rows.lessons.map((row) => row.id));
  const sectionIds = new Set(payload.rows.lessonSections.map((row) => row.id));
  const snapshotIds = new Set(payload.rows.sourceSnapshots.map((row) => row.id));

  for (const chapter of payload.rows.chapters) {
    assertReference(bookIds, chapter.bookId, `chapter ${chapter.id} book`);
  }

  for (const lesson of payload.rows.lessons) {
    assertReference(chapterIds, lesson.chapterId, `lesson ${lesson.id} chapter`);
  }

  for (const section of payload.rows.lessonSections) {
    assertReference(lessonIds, section.lessonId, `section ${section.id} lesson`);
    if (!section.contentJson.length) {
      throw new Error(`Section has empty content: ${section.id}`);
    }
  }

  for (const exercise of payload.rows.exercises) {
    assertReference(lessonIds, exercise.lessonId, `exercise ${exercise.id} lesson`);
    if (exercise.sectionId) {
      assertReference(
        sectionIds,
        exercise.sectionId,
        `exercise ${exercise.id} section`,
      );
    }
  }

  for (const asset of payload.rows.sourceAssets) {
    assertReference(lessonIds, asset.lessonId, `asset ${asset.id} lesson`);
    assertReference(
      snapshotIds,
      asset.sourceSnapshotId,
      `asset ${asset.id} snapshot`,
    );
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

function assertReference(values: Set<string>, value: string, label: string) {
  if (!values.has(value)) {
    throw new Error(`Missing ${label} reference: ${value}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
