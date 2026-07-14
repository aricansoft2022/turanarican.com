import { createClient } from "@libsql/client";

import {
  applySeedPayload,
  assertForeignKeys,
  readSeedDatabasePayload,
  readTableCounts,
  summarizePayloadRows,
} from "./lib/seed-db";

const writeEnabled = process.argv.includes("--write");

async function main() {
  const payload = await readSeedDatabasePayload();
  const summary = summarizePayloadRows(payload.rows);

  if (!writeEnabled) {
    console.log("Seed DB payload dry run.");
    console.log(JSON.stringify(summary, null, 2));
    console.log("No database writes were made. Re-run with --write to apply.");
    return;
  }

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL is required when using --write.");
  }

  const client = createClient({ url, authToken });

  try {
    await applySeedPayload(client, payload);
    await assertForeignKeys(client);

    const counts = await readTableCounts(client);
    console.log("Applied seed DB payload.");
    console.log(JSON.stringify(counts, null, 2));
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
