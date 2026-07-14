import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createClient, type Client } from "@libsql/client";

const migrationPath = path.join(
  process.cwd(),
  "db",
  "migrations",
  "0000_mixed_excalibur.sql",
);
const payloadPath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-db-payload.json",
);

type PayloadRows = Record<string, Array<Record<string, unknown>>>;

type SeedDatabasePayload = {
  rows: PayloadRows;
};

const tableColumns = {
  books: {
    table: "books",
    columns: {
      id: "id",
      slug: "slug",
      title: "title",
      subtitle: "subtitle",
      sourceUrl: "source_url",
      sourcePlatform: "source_platform",
      licenseName: "license_name",
      licenseUrl: "license_url",
      attributionText: "attribution_text",
      language: "language",
      numberingPolicy: "numbering_policy",
      status: "status",
    },
  },
  chapters: {
    table: "chapters",
    columns: {
      id: "id",
      bookId: "book_id",
      slug: "slug",
      sourceNumber: "source_number",
      displayNumber: "display_number",
      sourceTitle: "source_title",
      displayTitle: "display_title",
      sourceUrl: "source_url",
      sortOrder: "sort_order",
    },
  },
  lessons: {
    table: "lessons",
    columns: {
      id: "id",
      chapterId: "chapter_id",
      slug: "slug",
      sourceNumber: "source_number",
      displayNumber: "display_number",
      sourceTitle: "source_title",
      displayTitle: "display_title",
      summary: "summary",
      sourceUrl: "source_url",
      sortOrder: "sort_order",
      status: "status",
      rawHash: "raw_hash",
    },
  },
  lessonSections: {
    table: "lesson_sections",
    columns: {
      id: "id",
      lessonId: "lesson_id",
      heading: "heading",
      slug: "slug",
      level: "level",
      sortOrder: "sort_order",
      contentJson: "content_json",
    },
  },
  exercises: {
    table: "exercises",
    columns: {
      id: "id",
      lessonId: "lesson_id",
      sectionId: "section_id",
      number: "number",
      promptJson: "prompt_json",
      answerJson: "answer_json",
      sortOrder: "sort_order",
      difficulty: "difficulty",
      tagsJson: "tags_json",
    },
  },
  sourceSnapshots: {
    table: "source_snapshots",
    columns: {
      id: "id",
      sourceUrl: "source_url",
      httpStatus: "http_status",
      contentHash: "content_hash",
      rawHtmlPath: "raw_html_path",
      parserVersion: "parser_version",
    },
  },
  sourceAssets: {
    table: "source_assets",
    columns: {
      id: "id",
      lessonId: "lesson_id",
      sourceSnapshotId: "source_snapshot_id",
      sourceUrl: "source_url",
      assetType: "asset_type",
      altText: "alt_text",
      caption: "caption",
      localKey: "local_key",
      r2Key: "r2_key",
      contentHash: "content_hash",
      preferredTreatment: "preferred_treatment",
      status: "status",
    },
  },
} as const;

const insertOrder: Array<keyof typeof tableColumns> = [
  "books",
  "chapters",
  "lessons",
  "lessonSections",
  "exercises",
  "sourceSnapshots",
  "sourceAssets",
];

async function main() {
  const tempDir = await mkdtemp(path.join(tmpdir(), "turan-seed-db-"));
  const dbPath = path.join(tempDir, "seed.db");
  const client = createClient({ url: `file:${dbPath}` });

  try {
    await client.execute("PRAGMA foreign_keys = ON");
    await applyMigration(client);

    const payload = JSON.parse(
      await readFile(payloadPath, "utf8"),
    ) as SeedDatabasePayload;

    for (const key of insertOrder) {
      await insertRows(client, key, payload.rows[key] ?? []);
    }

    const counts = await readCounts(client);
    await assertForeignKeys(client);
    assertCounts(counts, payload.rows);

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

async function insertRows(
  client: Client,
  key: keyof typeof tableColumns,
  rows: Array<Record<string, unknown>>,
) {
  const config = tableColumns[key];
  const entries = Object.entries(config.columns);
  const columns = entries.map(([, column]) => column);
  const placeholders = columns.map(() => "?").join(", ");
  const sql = `INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`;

  for (const row of rows) {
    await client.execute({
      sql,
      args: entries.map(([property]) => serializeValue(row[property])),
    });
  }
}

function serializeValue(value: unknown) {
  if (value === undefined) return null;
  if (Array.isArray(value) || isPlainObject(value)) return JSON.stringify(value);
  return value as string | number | null;
}

function isPlainObject(value: unknown) {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.getPrototypeOf(value) === Object.prototype,
  );
}

async function readCounts(client: Client) {
  const counts: Record<string, number> = {};

  for (const [key, config] of Object.entries(tableColumns)) {
    const result = await client.execute(`SELECT COUNT(*) AS count FROM ${config.table}`);
    counts[key] = Number(result.rows[0]?.count ?? 0);
  }

  return counts;
}

async function assertForeignKeys(client: Client) {
  const result = await client.execute("PRAGMA foreign_key_check");
  if (result.rows.length) {
    throw new Error(`Foreign key check failed: ${JSON.stringify(result.rows)}`);
  }
}

function assertCounts(counts: Record<string, number>, rows: PayloadRows) {
  for (const key of Object.keys(tableColumns)) {
    const expected = rows[key]?.length ?? 0;
    const actual = counts[key] ?? 0;

    if (actual !== expected) {
      throw new Error(`Row count mismatch for ${key}: expected ${expected}, got ${actual}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
