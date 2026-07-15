import { spawn } from "node:child_process";
import { access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";

import { applySqlMigrations } from "./lib/migrations";
import {
  applySeedPayload,
  readSeedDatabasePayload,
  type SeedDatabasePayload,
} from "./lib/seed-db";

type ExpectedBuildPaths = {
  bookPaths: string[];
  chapterPaths: string[];
  lessonPaths: string[];
  prerenderedPageCount: number;
};

async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-database-build-"));
  const dbPath = path.join(tempDir, "content.db");
  const databaseUrl = `file:${dbPath}`;
  const client = createClient({ url: databaseUrl });
  const payload = await readSeedDatabasePayload();
  const expected = buildExpectedBuildPaths(payload);

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);
    await applySeedPayload(client, payload);
  } finally {
    client.close();
  }

  try {
    const output = await runBuild(databaseUrl);
    assertBuildOutput(output, expected);
    await assertPrerenderedFiles(expected);

    console.log("Verified database content build.");
    console.log(
      JSON.stringify(
        {
          books: expected.bookPaths.length,
          chapters: expected.chapterPaths.length,
          lessons: expected.lessonPaths.length,
          paths: [
            ...expected.bookPaths,
            ...expected.chapterPaths,
            ...expected.lessonPaths,
          ],
        },
        null,
        2,
      ),
    );
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

function runBuild(databaseUrl: string) {
  return new Promise<string>((resolve, reject) => {
    const child = spawn("npm", ["run", "build"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        CONTENT_SOURCE: "database",
        TURSO_DATABASE_URL: databaseUrl,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";

    child.stdout.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      output += text;
      process.stderr.write(text);
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
        return;
      }

      reject(new Error(`Database content build failed with exit code ${code}.`));
    });
  });
}

function assertBuildOutput(output: string, expected: ExpectedBuildPaths) {
  const pageCountPattern = new RegExp(
    `Generating static pages using \\d+ workers \\(${expected.prerenderedPageCount}\\/${expected.prerenderedPageCount}\\)`,
  );
  if (!pageCountPattern.test(output)) {
    throw new Error("Database content build did not prerender the expected page count.");
  }
}

async function assertPrerenderedFiles(expected: ExpectedBuildPaths) {
  for (const routePath of [
    ...expected.bookPaths,
    ...expected.chapterPaths,
    ...expected.lessonPaths,
  ]) {
    const htmlPath = path.join(
      process.cwd(),
      ".next",
      "server",
      "app",
      `${routePath.slice(1)}.html`,
    );

    try {
      await access(htmlPath);
    } catch {
      throw new Error(`Database content build did not prerender route: ${routePath}`);
    }
  }
}

function buildExpectedBuildPaths(payload: SeedDatabasePayload): ExpectedBuildPaths {
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
      throw new Error(`Expected build paths are missing book for chapter ${chapter.id}.`);
    }

    return `/kitap/${stringField(book, "slug")}/${stringField(chapter, "slug")}`;
  });
  const lessonPaths = lessons.map((lesson) => {
    const chapter = chapterById.get(stringField(lesson, "chapterId"));
    if (!chapter) {
      throw new Error(`Expected build paths are missing chapter for lesson ${lesson.id}.`);
    }

    const book = bookById.get(stringField(chapter, "bookId"));
    if (!book) {
      throw new Error(`Expected build paths are missing book for lesson ${lesson.id}.`);
    }

    return `/kitap/${stringField(book, "slug")}/${stringField(chapter, "slug")}/${stringField(lesson, "slug")}`;
  });

  return {
    bookPaths,
    chapterPaths,
    lessonPaths,
    prerenderedPageCount: 6 + bookPaths.length + chapterPaths.length + lessonPaths.length,
  };
}

function stringField(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (typeof value !== "string" || !value) {
    throw new Error(`Expected seed payload field ${key} to be a non-empty string.`);
  }

  return value;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
