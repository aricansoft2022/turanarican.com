import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import type { Client } from "@libsql/client";

export const migrationsDir = path.join(process.cwd(), "db", "migrations");

export async function applySqlMigrations(
  client: Client,
  inputMigrationsDir = migrationsDir,
) {
  const migrationFiles = (await readdir(inputMigrationsDir))
    .filter((fileName) => fileName.endsWith(".sql"))
    .sort();

  for (const fileName of migrationFiles) {
    const migration = await readFile(path.join(inputMigrationsDir, fileName), "utf8");
    const statements = migration
      .split("--> statement-breakpoint")
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await client.execute(statement);
    }
  }
}
