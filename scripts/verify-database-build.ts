import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";

import { applySqlMigrations } from "./lib/migrations";
import { applySeedPayload, readSeedDatabasePayload } from "./lib/seed-db";

const expectedLessonPaths = [
  "/kitap/prealgebra-2e/cebir-diline-giris/ifadeleri-degerlendirme-sadelestirme-cevirme",
  "/kitap/prealgebra-2e/cebir-diline-giris/esitligin-cikarma-toplama-ozellikleriyle-denklem-cozme",
];
const expectedBookPaths = ["/kitap/prealgebra-2e"];

async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-database-build-"));
  const dbPath = path.join(tempDir, "content.db");
  const databaseUrl = `file:${dbPath}`;
  const client = createClient({ url: databaseUrl });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);
    await applySeedPayload(client, await readSeedDatabasePayload());
  } finally {
    client.close();
  }

  try {
    const output = await runBuild(databaseUrl);
    assertBuildOutput(output);

    console.log("Verified database content build.");
    console.log(
      JSON.stringify(
        {
          books: expectedBookPaths.length,
          lessons: expectedLessonPaths.length,
          paths: [...expectedBookPaths, ...expectedLessonPaths],
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

function assertBuildOutput(output: string) {
  for (const bookPath of expectedBookPaths) {
    if (!output.includes(bookPath)) {
      throw new Error(`Database content build did not include route: ${bookPath}`);
    }
  }

  for (const lessonPath of expectedLessonPaths) {
    if (!output.includes(lessonPath)) {
      throw new Error(`Database content build did not include route: ${lessonPath}`);
    }
  }

  if (!/Generating static pages using \d+ workers \(9\/9\)/.test(output)) {
    throw new Error("Database content build did not prerender the expected page count.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
