import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Client, InStatement, InValue } from "@libsql/client";

export const seedPayloadPath = path.join(
  process.cwd(),
  "data",
  "generated",
  "seed-db-payload.json",
);

export type PayloadRows = Record<string, Array<Record<string, unknown>>>;

export type SeedDatabasePayload = {
  rows: PayloadRows;
};

export const tableColumns = {
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
      objectivesJson: "objectives_json",
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

export const insertOrder = [
  "books",
  "chapters",
  "lessons",
  "lessonSections",
  "exercises",
  "sourceSnapshots",
  "sourceAssets",
] as const satisfies Array<keyof typeof tableColumns>;

export async function readSeedDatabasePayload(
  payloadPath = seedPayloadPath,
): Promise<SeedDatabasePayload> {
  return JSON.parse(await readFile(payloadPath, "utf8")) as SeedDatabasePayload;
}

export function summarizePayloadRows(rows: PayloadRows) {
  return Object.fromEntries(
    insertOrder.map((key) => [key, rows[key]?.length ?? 0]),
  ) as Record<(typeof insertOrder)[number], number>;
}

export async function applySeedPayload(
  client: Client,
  payload: SeedDatabasePayload,
) {
  await client.execute("PRAGMA foreign_keys = ON");

  const statements = insertOrder.flatMap((key) =>
    buildUpsertStatements(key, payload.rows[key] ?? []),
  );

  if (statements.length) {
    await client.batch(statements, "write");
  }
}

export async function insertSeedPayload(
  client: Client,
  payload: SeedDatabasePayload,
) {
  await client.execute("PRAGMA foreign_keys = ON");

  const statements = insertOrder.flatMap((key) =>
    buildInsertStatements(key, payload.rows[key] ?? []),
  );

  if (statements.length) {
    await client.batch(statements, "write");
  }
}

export async function readTableCounts(client: Client) {
  const counts: Record<string, number> = {};

  for (const [key, config] of Object.entries(tableColumns)) {
    const result = await client.execute(`SELECT COUNT(*) AS count FROM ${config.table}`);
    counts[key] = Number(result.rows[0]?.count ?? 0);
  }

  return counts;
}

export async function assertForeignKeys(client: Client) {
  const result = await client.execute("PRAGMA foreign_key_check");
  if (result.rows.length) {
    throw new Error(`Foreign key check failed: ${JSON.stringify(result.rows)}`);
  }
}

export function assertPayloadCounts(
  counts: Record<string, number>,
  rows: PayloadRows,
) {
  for (const key of insertOrder) {
    const expected = rows[key]?.length ?? 0;
    const actual = counts[key] ?? 0;

    if (actual !== expected) {
      throw new Error(`Row count mismatch for ${key}: expected ${expected}, got ${actual}`);
    }
  }
}

function buildInsertStatements(
  key: keyof typeof tableColumns,
  rows: Array<Record<string, unknown>>,
): InStatement[] {
  return rows.map((row) => {
    const { config, entries, columns, placeholders } = getStatementParts(key);

    return {
      sql: `INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`,
      args: entries.map(([property]) => serializeValue(row[property])),
    };
  });
}

function buildUpsertStatements(
  key: keyof typeof tableColumns,
  rows: Array<Record<string, unknown>>,
): InStatement[] {
  return rows.map((row) => {
    const { config, entries, columns, placeholders } = getStatementParts(key);
    const updates = columns
      .filter((column) => column !== "id")
      .map((column) => `${column} = excluded.${column}`)
      .join(", ");

    return {
      sql: [
        `INSERT INTO ${config.table} (${columns.join(", ")})`,
        `VALUES (${placeholders})`,
        `ON CONFLICT(id) DO UPDATE SET ${updates}`,
      ].join(" "),
      args: entries.map(([property]) => serializeValue(row[property])),
    };
  });
}

function getStatementParts(key: keyof typeof tableColumns) {
  const config = tableColumns[key];
  const entries = Object.entries(config.columns);
  const columns = entries.map(([, column]) => column);
  const placeholders = columns.map(() => "?").join(", ");

  return { config, entries, columns, placeholders };
}

function serializeValue(value: unknown): InValue {
  if (value === undefined) return null;
  if (Array.isArray(value) || isPlainObject(value)) return JSON.stringify(value);
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    value instanceof Date ||
    value instanceof Uint8Array ||
    value instanceof ArrayBuffer
  ) {
    return value;
  }

  return JSON.stringify(value);
}

function isPlainObject(value: unknown) {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.getPrototypeOf(value) === Object.prototype,
  );
}
