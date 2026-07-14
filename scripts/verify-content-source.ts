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

import { applySqlMigrations } from "./lib/migrations";
import { applySeedPayload, readSeedDatabasePayload } from "./lib/seed-db";

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

  if (params.length !== 2) {
    throw new Error(`Static content source expected 2 lessons, got ${params.length}.`);
  }

  const entries = await Promise.all(params.map((item) => getContentLesson(item)));
  for (const entry of entries) {
    if (!entry) {
      throw new Error("Static content source could not read a listed lesson.");
    }

    assertLessonEntry(entry, "static");
  }

  const book = await getContentBook("prealgebra-2e");
  if (!book || book.chapters[0]?.lessons.length !== 2) {
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

    if (params.length !== 2) {
      throw new Error(`Database content source expected 2 lessons, got ${params.length}.`);
    }

    const entries = await Promise.all(params.map((item) => getContentLesson(item)));
    for (const entry of entries) {
      if (!entry) {
        throw new Error("Database content source could not read a listed lesson.");
      }

      assertLessonEntry(entry, "database");
    }

    const book = await getContentBook("prealgebra-2e");
    if (!book || book.chapters[0]?.lessons.length !== 2) {
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
          staticLessons: 2,
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
    "https://www.turanarican.com",
    "https://www.turanarican.com/kitap/prealgebra-2e",
    "https://www.turanarican.com/kitap/prealgebra-2e/cebir-diline-giris",
    "https://www.turanarican.com/kitap/prealgebra-2e/cebir-diline-giris/ifadeleri-degerlendirme-sadelestirme-cevirme",
    "https://www.turanarican.com/kitap/prealgebra-2e/cebir-diline-giris/esitligin-cikarma-toplama-ozellikleriyle-denklem-cozme",
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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
