import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";
import sitemap from "@/app/sitemap";

import {
  getContentBook,
  getContentBookParams,
  getContentChapterParams,
  getContentLesson,
  getContentLessonParams,
} from "@/src/content/source";
import { buildLessonStructuredData } from "@/src/content/structured-data";

import { applySqlMigrations } from "./lib/migrations";
import {
  applySeedPayload,
  readSeedDatabasePayload,
  type SeedDatabasePayload,
} from "./lib/seed-db";

const siteUrl = "https://turanarican.com";

type ExpectedContent = {
  bookPaths: string[];
  chapterPaths: string[];
  lessonPaths: string[];
  lessonUrls: string[];
};

async function main() {
  const payload = await readSeedDatabasePayload();
  const expected = buildExpectedContent(payload);

  await assertStaticSource(expected);
  await assertDatabaseSource(payload, expected);
}

async function assertStaticSource(expected: ExpectedContent) {
  process.env.CONTENT_SOURCE = "static";
  delete process.env.TURSO_DATABASE_URL;
  delete process.env.TURSO_AUTH_TOKEN;

  const params = await getContentLessonParams();
  const bookParams = await getContentBookParams();
  const chapterParams = await getContentChapterParams();
  if (bookParams.length !== 1) {
    throw new Error(`Static content source expected 1 book, got ${bookParams.length}.`);
  }

  if (chapterParams.length !== 1) {
    throw new Error(
      `Static content source expected 1 chapter, got ${chapterParams.length}.`,
    );
  }

  if (params.length !== expected.lessonPaths.length) {
    throw new Error(
      `Static content source expected ${expected.lessonPaths.length} lessons, got ${params.length}.`,
    );
  }

  const entries = await Promise.all(params.map((item) => getContentLesson(item)));
  for (const entry of entries) {
    if (!entry) {
      throw new Error("Static content source could not read a listed lesson.");
    }

    assertLessonEntry(entry, "static");
  }

  const book = await getContentBook("prealgebra-2e");
  if (!book || book.chapters[0]?.lessons.length !== expected.lessonPaths.length) {
    throw new Error("Static content source did not expose the seeded book tree.");
  }

  await assertSitemap("static", expected, {
    books: bookParams.length,
    chapters: chapterParams.length,
    lessons: params.length,
  });
}

async function assertDatabaseSource(payload: SeedDatabasePayload, expected: ExpectedContent) {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-content-source-"));
  const dbPath = path.join(tempDir, "content.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);
    await applySeedPayload(client, payload);
  } finally {
    client.close();
  }

  process.env.CONTENT_SOURCE = "database";
  process.env.TURSO_DATABASE_URL = `file:${dbPath}`;
  delete process.env.TURSO_AUTH_TOKEN;

  try {
    const params = await getContentLessonParams();
    const bookParams = await getContentBookParams();
    const chapterParams = await getContentChapterParams();
    if (bookParams.length !== 1) {
      throw new Error(`Database content source expected 1 book, got ${bookParams.length}.`);
    }

    if (chapterParams.length !== 1) {
      throw new Error(
        `Database content source expected 1 chapter, got ${chapterParams.length}.`,
      );
    }

    if (params.length !== expected.lessonPaths.length) {
      throw new Error(
        `Database content source expected ${expected.lessonPaths.length} lessons, got ${params.length}.`,
      );
    }

    const entries = await Promise.all(params.map((item) => getContentLesson(item)));
    for (const entry of entries) {
      if (!entry) {
        throw new Error("Database content source could not read a listed lesson.");
      }

      assertLessonEntry(entry, "database");
    }

    const book = await getContentBook("prealgebra-2e");
    if (!book || book.chapters[0]?.lessons.length !== expected.lessonPaths.length) {
      throw new Error("Database content source did not expose the seeded book tree.");
    }

    await assertSitemap("database", expected, {
      books: bookParams.length,
      chapters: chapterParams.length,
      lessons: params.length,
    });

    console.log("Verified content source abstraction.");
    console.log(
      JSON.stringify(
        {
          staticBooks: 1,
          staticChapters: 1,
          staticLessons: expected.lessonPaths.length,
          databaseBooks: bookParams.length,
          databaseChapters: chapterParams.length,
          databaseLessons: params.length,
          databaseBookLessons: book.chapters[0].lessons.length,
        },
        null,
        2,
      ),
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function assertSitemap(
  source: string,
  expectedContent: ExpectedContent,
  expected: { books: number; chapters: number; lessons: number },
) {
  const entries = await sitemap();
  const urls = new Set(entries.map((entry) => entry.url));
  const expectedCount = 1 + expected.books + expected.chapters + expected.lessons;

  if (entries.length !== expectedCount) {
    throw new Error(
      `${source} sitemap expected ${expectedCount} URLs, got ${entries.length}.`,
    );
  }

  for (const url of [
    siteUrl,
    ...expectedContent.bookPaths.map((item) => `${siteUrl}${item}`),
    ...expectedContent.chapterPaths.map((item) => `${siteUrl}${item}`),
    ...expectedContent.lessonUrls,
  ]) {
    if (!urls.has(url)) {
      throw new Error(`${source} sitemap is missing URL: ${url}`);
    }
  }
}

function buildExpectedContent(payload: SeedDatabasePayload): ExpectedContent {
  const books = payload.rows.books ?? [];
  const chapters = payload.rows.chapters ?? [];
  const lessons = payload.rows.lessons ?? [];

  const bookById = new Map(books.map((book) => [stringField(book, "id"), book]));
  const chapterById = new Map(
    chapters.map((chapter) => [stringField(chapter, "id"), chapter]),
  );

  const bookPaths = books.map((book) => `/kitap/${stringField(book, "slug")}`);
  const chapterPaths = chapters.map((chapter) => {
    const book = bookById.get(stringField(chapter, "bookId"));
    if (!book) {
      throw new Error(`Expected content is missing book for chapter ${chapter.id}.`);
    }

    return `/kitap/${stringField(book, "slug")}/${stringField(chapter, "slug")}`;
  });
  const lessonPaths = lessons.map((lesson) => {
    const chapter = chapterById.get(stringField(lesson, "chapterId"));
    if (!chapter) {
      throw new Error(`Expected content is missing chapter for lesson ${lesson.id}.`);
    }

    const book = bookById.get(stringField(chapter, "bookId"));
    if (!book) {
      throw new Error(`Expected content is missing book for lesson ${lesson.id}.`);
    }

    return `/kitap/${stringField(book, "slug")}/${stringField(chapter, "slug")}/${stringField(lesson, "slug")}`;
  });

  return {
    bookPaths,
    chapterPaths,
    lessonPaths,
    lessonUrls: lessonPaths.map((item) => `${siteUrl}${item}`),
  };
}

function stringField(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (typeof value !== "string" || !value) {
    throw new Error(`Expected seed payload field ${key} to be a non-empty string.`);
  }

  return value;
}

function assertLessonEntry(
  entry: NonNullable<Awaited<ReturnType<typeof getContentLesson>>>,
  source: string,
) {
  if (!entry.book.chapters.length) {
    throw new Error(`${source} content source returned a book without chapters.`);
  }

  if (!entry.lesson.objectives.length) {
    throw new Error(`${source} content source returned a lesson without objectives.`);
  }

  if (!entry.lesson.sections.length) {
    throw new Error(`${source} content source returned a lesson without sections.`);
  }

  if (!entry.lesson.exercises.length) {
    throw new Error(`${source} content source returned a lesson without exercises.`);
  }

  assertLessonStructuredData(entry, source);
}

function assertLessonStructuredData(
  entry: NonNullable<Awaited<ReturnType<typeof getContentLesson>>>,
  source: string,
) {
  const structuredData = buildLessonStructuredData(entry);
  const learningResource = structuredData.find(
    (item) => item["@type"] === "LearningResource",
  );
  const breadcrumbs = structuredData.find(
    (item) => item["@type"] === "BreadcrumbList",
  );

  if (!learningResource) {
    throw new Error(`${source} structured data is missing LearningResource.`);
  }

  if (!breadcrumbs || !("itemListElement" in breadcrumbs)) {
    throw new Error(`${source} structured data is missing BreadcrumbList.`);
  }

  const items = breadcrumbs.itemListElement;
  if (!Array.isArray(items) || items.length !== 4) {
    throw new Error(`${source} breadcrumb structured data must have 4 items.`);
  }

  const lessonUrl = `${siteUrl}/kitap/${entry.lesson.bookSlug}/${entry.lesson.chapterSlug}/${entry.lesson.slug}`;
  const lastItem = items.at(-1);
  if (
    !lastItem ||
    lastItem.item !== lessonUrl ||
    lastItem.name !== entry.lesson.displayTitle
  ) {
    throw new Error(`${source} breadcrumb structured data has an invalid lesson item.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
