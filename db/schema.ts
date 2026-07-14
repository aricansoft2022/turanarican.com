import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const books = sqliteTable(
  "books",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    sourceUrl: text("source_url").notNull(),
    sourcePlatform: text("source_platform").notNull(),
    licenseName: text("license_name").notNull(),
    licenseUrl: text("license_url").notNull(),
    attributionText: text("attribution_text").notNull(),
    language: text("language").notNull().default("tr"),
    numberingPolicy: text("numbering_policy").notNull(),
    status: text("status").notNull().default("draft"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    slugIdx: uniqueIndex("books_slug_idx").on(table.slug),
  }),
);

export const chapters = sqliteTable(
  "chapters",
  {
    id: text("id").primaryKey(),
    bookId: text("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    sourceNumber: text("source_number").notNull(),
    displayNumber: text("display_number").notNull(),
    sourceTitle: text("source_title").notNull(),
    displayTitle: text("display_title").notNull(),
    sourceUrl: text("source_url").notNull(),
    sortOrder: integer("sort_order").notNull(),
  },
  (table) => ({
    bookSlugIdx: uniqueIndex("chapters_book_slug_idx").on(
      table.bookId,
      table.slug,
    ),
    sortIdx: index("chapters_sort_idx").on(table.bookId, table.sortOrder),
  }),
);

export const lessons = sqliteTable(
  "lessons",
  {
    id: text("id").primaryKey(),
    chapterId: text("chapter_id")
      .notNull()
      .references(() => chapters.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    sourceNumber: text("source_number").notNull(),
    displayNumber: text("display_number").notNull(),
    sourceTitle: text("source_title").notNull(),
    displayTitle: text("display_title").notNull(),
    summary: text("summary").notNull(),
    sourceUrl: text("source_url").notNull(),
    sortOrder: integer("sort_order").notNull(),
    status: text("status").notNull().default("draft"),
    rawHash: text("raw_hash"),
  },
  (table) => ({
    chapterSlugIdx: uniqueIndex("lessons_chapter_slug_idx").on(
      table.chapterId,
      table.slug,
    ),
    sortIdx: index("lessons_sort_idx").on(table.chapterId, table.sortOrder),
  }),
);

export const lessonSections = sqliteTable(
  "lesson_sections",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    heading: text("heading").notNull(),
    slug: text("slug").notNull(),
    level: integer("level").notNull(),
    sortOrder: integer("sort_order").notNull(),
    contentJson: text("content_json", { mode: "json" }).notNull(),
  },
  (table) => ({
    lessonSlugIdx: uniqueIndex("lesson_sections_lesson_slug_idx").on(
      table.lessonId,
      table.slug,
    ),
  }),
);

export const exercises = sqliteTable(
  "exercises",
  {
    id: text("id").primaryKey(),
    lessonId: text("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    sectionId: text("section_id").references(() => lessonSections.id, {
      onDelete: "set null",
    }),
    number: text("number").notNull(),
    promptJson: text("prompt_json", { mode: "json" }).notNull(),
    answerJson: text("answer_json", { mode: "json" }).notNull(),
    sortOrder: integer("sort_order").notNull(),
    difficulty: text("difficulty"),
    tagsJson: text("tags_json", { mode: "json" }),
  },
  (table) => ({
    lessonSortIdx: index("exercises_lesson_sort_idx").on(
      table.lessonId,
      table.sortOrder,
    ),
  }),
);

export const sourceSnapshots = sqliteTable(
  "source_snapshots",
  {
    id: text("id").primaryKey(),
    sourceUrl: text("source_url").notNull(),
    fetchedAt: text("fetched_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    httpStatus: integer("http_status").notNull(),
    contentHash: text("content_hash").notNull(),
    rawHtmlPath: text("raw_html_path"),
    parserVersion: text("parser_version").notNull(),
  },
  (table) => ({
    sourceHashIdx: uniqueIndex("source_snapshots_source_hash_idx").on(
      table.sourceUrl,
      table.contentHash,
    ),
  }),
);

export const booksRelations = relations(books, ({ many }) => ({
  chapters: many(chapters),
}));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  book: one(books, {
    fields: [chapters.bookId],
    references: [books.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [lessons.chapterId],
    references: [chapters.id],
  }),
  sections: many(lessonSections),
  exercises: many(exercises),
}));

export const lessonSectionsRelations = relations(
  lessonSections,
  ({ one, many }) => ({
    lesson: one(lessons, {
      fields: [lessonSections.lessonId],
      references: [lessons.id],
    }),
    exercises: many(exercises),
  }),
);

export const exercisesRelations = relations(exercises, ({ one }) => ({
  lesson: one(lessons, {
    fields: [exercises.lessonId],
    references: [lessons.id],
  }),
  section: one(lessonSections, {
    fields: [exercises.sectionId],
    references: [lessonSections.id],
  }),
}));

