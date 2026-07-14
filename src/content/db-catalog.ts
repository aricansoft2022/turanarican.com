import { and, asc, eq } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";
import type {
  Book,
  Chapter,
  ContentBlock,
  Exercise,
  InlineContent,
  Lesson,
  LessonSection,
  LessonSummary,
  NumberingPolicy,
  SourceAsset,
} from "@/src/content/types";

export type ContentDatabase = LibSQLDatabase<typeof schema>;

export type LessonParams = {
  bookSlug: string;
  chapterSlug: string;
  lessonSlug: string;
};

export async function listBookParamsFromDatabase(db: ContentDatabase) {
  const rows = await db
    .select({
      bookSlug: schema.books.slug,
    })
    .from(schema.books)
    .orderBy(asc(schema.books.slug));

  return rows;
}

export async function listChapterParamsFromDatabase(db: ContentDatabase) {
  const rows = await db
    .select({
      bookSlug: schema.books.slug,
      chapterSlug: schema.chapters.slug,
    })
    .from(schema.chapters)
    .innerJoin(schema.books, eq(schema.chapters.bookId, schema.books.id))
    .orderBy(asc(schema.books.slug), asc(schema.chapters.sortOrder));

  return rows;
}

export async function listBooksFromDatabase(db: ContentDatabase): Promise<Book[]> {
  const [bookRows, chapterRows, lessonRows] = await Promise.all([
    db.select().from(schema.books).orderBy(asc(schema.books.slug)),
    db
      .select()
      .from(schema.chapters)
      .orderBy(asc(schema.chapters.bookId), asc(schema.chapters.sortOrder)),
    db
      .select()
      .from(schema.lessons)
      .orderBy(asc(schema.lessons.chapterId), asc(schema.lessons.sortOrder)),
  ]);

  const lessonsByChapter = groupBy(lessonRows, (lesson) => lesson.chapterId);
  const chaptersByBook = groupBy(chapterRows, (chapter) => chapter.bookId);

  return bookRows.map((book): Book => {
    const chapters = (chaptersByBook.get(book.id) ?? []).map((chapter): Chapter => {
      const lessons = (lessonsByChapter.get(chapter.id) ?? []).map(toLessonSummary);

      return {
        id: chapter.id,
        bookId: chapter.bookId,
        slug: chapter.slug,
        sourceNumber: chapter.sourceNumber,
        displayNumber: chapter.displayNumber,
        sourceTitle: chapter.sourceTitle,
        displayTitle: chapter.displayTitle,
        sourceUrl: chapter.sourceUrl,
        sortOrder: chapter.sortOrder,
        lessons,
      };
    });

    return {
      id: book.id,
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle ?? "",
      sourceUrl: book.sourceUrl,
      sourcePlatform: assertSourcePlatform(book.sourcePlatform),
      license: {
        name: book.licenseName,
        url: book.licenseUrl,
        attribution: book.attributionText,
      },
      numberingPolicy: assertNumberingPolicy(book.numberingPolicy),
      chapters,
    };
  });
}

export async function getBookFromDatabase(
  db: ContentDatabase,
  bookSlug: string,
): Promise<Book | null> {
  const books = await listBooksFromDatabase(db);
  return books.find((book) => book.slug === bookSlug) ?? null;
}

export async function listLessonParamsFromDatabase(db: ContentDatabase) {
  const rows = await db
    .select({
      bookSlug: schema.books.slug,
      chapterSlug: schema.chapters.slug,
      lessonSlug: schema.lessons.slug,
    })
    .from(schema.lessons)
    .innerJoin(schema.chapters, eq(schema.lessons.chapterId, schema.chapters.id))
    .innerJoin(schema.books, eq(schema.chapters.bookId, schema.books.id))
    .orderBy(
      asc(schema.books.slug),
      asc(schema.chapters.sortOrder),
      asc(schema.lessons.sortOrder),
    );

  return rows;
}

export async function getLessonFromDatabase(
  db: ContentDatabase,
  params: LessonParams,
): Promise<{ book: Book; lesson: Lesson } | null> {
  const rows = await db
    .select({
      book: schema.books,
      chapter: schema.chapters,
      lesson: schema.lessons,
    })
    .from(schema.lessons)
    .innerJoin(schema.chapters, eq(schema.lessons.chapterId, schema.chapters.id))
    .innerJoin(schema.books, eq(schema.chapters.bookId, schema.books.id))
    .where(
      and(
        eq(schema.books.slug, params.bookSlug),
        eq(schema.chapters.slug, params.chapterSlug),
        eq(schema.lessons.slug, params.lessonSlug),
      ),
    )
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const [sectionRows, exerciseRows, assetRows] = await Promise.all([
    db
      .select()
      .from(schema.lessonSections)
      .where(eq(schema.lessonSections.lessonId, row.lesson.id))
      .orderBy(asc(schema.lessonSections.sortOrder)),
    db
      .select()
      .from(schema.exercises)
      .where(eq(schema.exercises.lessonId, row.lesson.id))
      .orderBy(asc(schema.exercises.sortOrder)),
    db
      .select()
      .from(schema.sourceAssets)
      .where(eq(schema.sourceAssets.lessonId, row.lesson.id))
      .orderBy(asc(schema.sourceAssets.id)),
  ]);

  const sectionSlugById = new Map(
    sectionRows.map((section) => [section.id, section.slug]),
  );
  const sections: LessonSection[] = sectionRows.map((section) => ({
    id: section.id,
    heading: section.heading,
    slug: section.slug,
    level: assertSectionLevel(section.level),
    blocks: assertContentBlocks(section.contentJson, `section ${section.id}`),
  }));
  const exercises: Exercise[] = exerciseRows.map((exercise) => ({
    id: exercise.id,
    number: exercise.number,
    sectionSlug: exercise.sectionId
      ? (sectionSlugById.get(exercise.sectionId) ?? "")
      : "",
    prompt: assertInlineContent(exercise.promptJson, `exercise ${exercise.id} prompt`),
    answer: assertInlineContent(exercise.answerJson, `exercise ${exercise.id} answer`),
    sortOrder: exercise.sortOrder,
  }));

  const book = await getBookFromDatabase(db, row.book.slug);
  if (!book) return null;

  const assets = assetRows.map((asset) => toSourceAsset(asset, row.lesson.id));

  return {
    book,
    lesson: {
      ...toLessonSummary(row.lesson),
      bookId: row.book.id,
      bookSlug: row.book.slug,
      chapterSlug: row.chapter.slug,
      objectives: assertStringArray(
        row.lesson.objectivesJson,
        `lesson ${row.lesson.id} objectives`,
      ),
      sections,
      exercises,
      assets,
      license: {
        name: row.book.licenseName,
        url: row.book.licenseUrl,
        attribution: row.book.attributionText,
      },
    },
  };
}

function toSourceAsset(
  asset: typeof schema.sourceAssets.$inferSelect,
  lessonId: string,
): SourceAsset {
  return {
    id: stripLessonAssetPrefix(asset.id, lessonId),
    sourceUrl: asset.sourceUrl,
    type: assertAssetType(asset.assetType),
    altText: asset.altText ?? undefined,
    caption: asset.caption ?? undefined,
    contentHash: asset.contentHash ?? undefined,
    localKey: asset.localKey,
    r2Key: asset.r2Key,
    preferredTreatment: assertAssetTreatment(asset.preferredTreatment),
    status: assertAssetStatus(asset.status),
  };
}

function toLessonSummary(lesson: typeof schema.lessons.$inferSelect): LessonSummary {
  return {
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
  };
}

function assertSourcePlatform(value: string): "LibreTexts" {
  if (value !== "LibreTexts") {
    throw new Error(`Unsupported source platform: ${value}`);
  }

  return value;
}

function assertNumberingPolicy(value: string): NumberingPolicy {
  if (value === "preserve" || value === "skip_intro_shift" || value === "custom_map") {
    return value;
  }

  throw new Error(`Unsupported numbering policy: ${value}`);
}

function assertSectionLevel(value: number): 2 | 3 {
  if (value === 2 || value === 3) return value;
  throw new Error(`Unsupported section level: ${value}`);
}

function assertAssetType(value: string): SourceAsset["type"] {
  if (value === "image" || value === "figure" || value === "table" || value === "svg") {
    return value;
  }

  throw new Error(`Unsupported source asset type: ${value}`);
}

function assertAssetTreatment(value: string): SourceAsset["preferredTreatment"] {
  if (
    value === "redraw_tr_preferred" ||
    value === "rebuild_html_tr" ||
    value === "reuse_original"
  ) {
    return value;
  }

  throw new Error(`Unsupported source asset treatment: ${value}`);
}

function assertAssetStatus(value: string): SourceAsset["status"] {
  if (
    value === "discovered" ||
    value === "downloaded" ||
    value === "redrawn" ||
    value === "uploaded" ||
    value === "fallback_original"
  ) {
    return value;
  }

  throw new Error(`Unsupported source asset status: ${value}`);
}

function assertStringArray(value: unknown, label: string): string[] {
  const items = normalizeJsonArray(value, label);

  if (!items.every((item): item is string => typeof item === "string")) {
    throw new Error(`Expected ${label} to contain strings.`);
  }

  return items;
}

function assertContentBlocks(value: unknown, label: string): ContentBlock[] {
  return normalizeJsonArray(value, label) as ContentBlock[];
}

function assertInlineContent(value: unknown, label: string): InlineContent[] {
  return normalizeJsonArray(value, label) as InlineContent[];
}

function normalizeJsonArray(value: unknown, label: string): unknown[] {
  const parsed = typeof value === "string" ? JSON.parse(value) : value;

  if (!Array.isArray(parsed)) {
    throw new Error(`Expected ${label} to be an array.`);
  }

  return parsed;
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return groups;
}

function stripLessonAssetPrefix(assetId: string, lessonId: string) {
  const prefix = `${lessonId}-asset-`;
  return assetId.startsWith(prefix) ? assetId.slice(prefix.length) : assetId;
}
