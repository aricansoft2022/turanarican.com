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
import { applySeedPayload, readSeedDatabasePayload } from "./lib/seed-db";

const siteUrl = "https://turanarican.com";

const expectedLessonUrls = [
  `${siteUrl}/kitap/prealgebra-2e/cebir-diline-giris/ifadeleri-degerlendirme-sadelestirme-cevirme`,
  `${siteUrl}/kitap/prealgebra-2e/cebir-diline-giris/esitligin-cikarma-toplama-ozellikleriyle-denklem-cozme`,
  `${siteUrl}/kitap/prealgebra-2e/cebir-diline-giris/katlari-ve-carpanlari-bulma`,
];

async function main() {
  await assertStaticSource();
  await assertDatabaseSource();
}

async function assertStaticSource() {
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

  if (params.length !== expectedLessonUrls.length) {
    throw new Error(
      `Static content source expected ${expectedLessonUrls.length} lessons, got ${params.length}.`,
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
  if (!book || book.chapters[0]?.lessons.length !== expectedLessonUrls.length) {
    throw new Error("Static content source did not expose the seeded book tree.");
  }

  await assertSitemap("static", {
    books: bookParams.length,
    chapters: chapterParams.length,
    lessons: params.length,
  });
}

async function assertDatabaseSource() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-content-source-"));
  const dbPath = path.join(tempDir, "content.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);
    await applySeedPayload(client, await readSeedDatabasePayload());
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

    if (params.length !== expectedLessonUrls.length) {
      throw new Error(
        `Database content source expected ${expectedLessonUrls.length} lessons, got ${params.length}.`,
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
    if (!book || book.chapters[0]?.lessons.length !== expectedLessonUrls.length) {
      throw new Error("Database content source did not expose the seeded book tree.");
    }

    await assertSitemap("database", {
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
          staticLessons: expectedLessonUrls.length,
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
    `${siteUrl}/kitap/prealgebra-2e`,
    `${siteUrl}/kitap/prealgebra-2e/cebir-diline-giris`,
    ...expectedLessonUrls,
  ]) {
    if (!urls.has(url)) {
      throw new Error(`${source} sitemap is missing URL: ${url}`);
    }
  }
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
