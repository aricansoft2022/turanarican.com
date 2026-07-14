import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/db/schema";
import {
  getLessonFromDatabase,
  listBooksFromDatabase,
  listLessonParamsFromDatabase,
} from "@/src/content/db-catalog";

import { applySqlMigrations } from "./lib/migrations";
import {
  applySeedPayload,
  readSeedDatabasePayload,
  summarizePayloadRows,
} from "./lib/seed-db";

async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-seed-read-"));
  const dbPath = path.join(tempDir, "seed.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);

    const payload = await readSeedDatabasePayload();
    await applySeedPayload(client, payload);

    const db = drizzle(client, { schema });
    const books = await listBooksFromDatabase(db);
    const params = await listLessonParamsFromDatabase(db);
    const lessons = await Promise.all(
      params.map((lessonParams) => getLessonFromDatabase(db, lessonParams)),
    );

    assertCounts({
      payload: summarizePayloadRows(payload.rows),
      books,
      params,
      lessons,
    });

    console.log("Verified seed DB content read model.");
    console.log(
      JSON.stringify(
        {
          books: books.length,
          chapters: books.reduce((total, book) => total + book.chapters.length, 0),
          lessons: lessons.length,
          objectives: lessons.map((entry) => ({
            slug: entry?.lesson.slug,
            count: entry?.lesson.objectives.length ?? 0,
          })),
        },
        null,
        2,
      ),
    );
  } finally {
    client.close();
    await rm(tempDir, { recursive: true, force: true });
  }
}

function assertCounts({
  payload,
  books,
  params,
  lessons,
}: {
  payload: Record<string, number>;
  books: Awaited<ReturnType<typeof listBooksFromDatabase>>;
  params: Awaited<ReturnType<typeof listLessonParamsFromDatabase>>;
  lessons: Array<Awaited<ReturnType<typeof getLessonFromDatabase>>>;
}) {
  const chapters = books.flatMap((book) => book.chapters);
  const lessonSummaries = chapters.flatMap((chapter) => chapter.lessons);

  if (books.length !== payload.books) {
    throw new Error(`Book read count mismatch: expected ${payload.books}, got ${books.length}`);
  }

  if (chapters.length !== payload.chapters) {
    throw new Error(
      `Chapter read count mismatch: expected ${payload.chapters}, got ${chapters.length}`,
    );
  }

  if (lessonSummaries.length !== payload.lessons || params.length !== payload.lessons) {
    throw new Error(`Lesson read count mismatch: expected ${payload.lessons}.`);
  }

  for (const entry of lessons) {
    if (!entry) {
      throw new Error("Lesson lookup returned null for a listed lesson param.");
    }

    if (!entry.lesson.objectives.length) {
      throw new Error(`Lesson has no objectives after DB read: ${entry.lesson.id}`);
    }

    if (!entry.lesson.sections.length) {
      throw new Error(`Lesson has no sections after DB read: ${entry.lesson.id}`);
    }

    if (!entry.lesson.exercises.length) {
      throw new Error(`Lesson has no exercises after DB read: ${entry.lesson.id}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
