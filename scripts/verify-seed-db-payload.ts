import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient, type Client } from "@libsql/client";

import {
  assertForeignKeys,
  assertPayloadCounts,
  insertSeedPayload,
  readSeedDatabasePayload,
  readTableCounts,
} from "./lib/seed-db";

const migrationPath = path.join(
  process.cwd(),
  "db",
  "migrations",
  "0000_mixed_excalibur.sql",
);
async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-seed-db-"));
  const dbPath = path.join(tempDir, "seed.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applyMigration(client);

    const payload = await readSeedDatabasePayload();
    await insertSeedPayload(client, payload);

    const counts = await readTableCounts(client);
    await assertForeignKeys(client);
    assertPayloadCounts(counts, payload.rows);

    console.log("Verified seed DB payload against SQLite schema.");
    console.log(JSON.stringify(counts, null, 2));
  } finally {
    client.close();
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function applyMigration(client: Client) {
  const migration = await readFile(migrationPath, "utf8");
  const statements = migration
    .split("--> statement-breakpoint")
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await client.execute(statement);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
