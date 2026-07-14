import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";

import {
  assertForeignKeys,
  assertPayloadCounts,
  insertSeedPayload,
  readSeedDatabasePayload,
  readTableCounts,
} from "./lib/seed-db";
import { applySqlMigrations } from "./lib/migrations";

async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-seed-db-"));
  const dbPath = path.join(tempDir, "seed.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applySqlMigrations(client);

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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
