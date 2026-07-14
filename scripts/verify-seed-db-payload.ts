import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient } from "@libsql/client";

import {
  applySeedPayload,
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
    await insertStaleSeedRows(client, payload);
    await applySeedPayload(client, payload);

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

async function insertStaleSeedRows(
  client: ReturnType<typeof createClient>,
  payload: Awaited<ReturnType<typeof readSeedDatabasePayload>>,
) {
  const lessonId = stringField(payload.rows.lessons?.[0], "id");
  const sourceUrl = stringField(payload.rows.sourceSnapshots?.[0], "sourceUrl");

  await client.batch(
    [
      {
        sql: [
          "INSERT INTO lesson_sections",
          "(id, lesson_id, heading, slug, level, sort_order, content_json)",
          "VALUES (?, ?, ?, ?, ?, ?, ?)",
        ].join(" "),
        args: [
          "stale-section-for-cleanup",
          lessonId,
          "Stale section",
          "stale-section",
          2,
          999,
          "[]",
        ],
      },
      {
        sql: [
          "INSERT INTO exercises",
          "(id, lesson_id, section_id, number, prompt_json, answer_json, sort_order)",
          "VALUES (?, ?, ?, ?, ?, ?, ?)",
        ].join(" "),
        args: [
          "stale-exercise-for-cleanup",
          lessonId,
          "stale-section-for-cleanup",
          "stale",
          "[]",
          "[]",
          999,
        ],
      },
      {
        sql: [
          "INSERT INTO source_snapshots",
          "(id, source_url, http_status, content_hash, parser_version)",
          "VALUES (?, ?, ?, ?, ?)",
        ].join(" "),
        args: [
          "stale-snapshot-for-cleanup",
          sourceUrl,
          200,
          "stale-content-hash",
          "stale-parser-version",
        ],
      },
      {
        sql: [
          "INSERT INTO source_assets",
          "(id, lesson_id, source_snapshot_id, source_url, asset_type, local_key, r2_key, preferred_treatment, status)",
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ].join(" "),
        args: [
          "stale-asset-for-cleanup",
          lessonId,
          "stale-snapshot-for-cleanup",
          `${sourceUrl}#stale-asset`,
          "image",
          "stale/local-key",
          "stale/r2-key",
          "source",
          "discovered",
        ],
      },
    ],
    "write",
  );
}

function stringField(row: Record<string, unknown> | undefined, field: string) {
  const value = row?.[field];
  if (typeof value !== "string") {
    throw new Error(`Expected string payload field: ${field}`);
  }

  return value;
}
