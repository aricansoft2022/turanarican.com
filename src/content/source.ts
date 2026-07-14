import { createDatabaseClient } from "@/db/client";
import {
  getAllBookParams as getStaticBookParams,
  getAllLessonParams as getStaticLessonParams,
  getBook as getStaticBook,
  getLesson as getStaticLesson,
} from "@/data/catalog";
import {
  getBookFromDatabase,
  getLessonFromDatabase,
  listBookParamsFromDatabase,
  listLessonParamsFromDatabase,
  type LessonParams,
} from "@/src/content/db-catalog";

export type ContentSource = "static" | "database";

export function getContentSource(): ContentSource {
  return process.env.CONTENT_SOURCE === "database" ? "database" : "static";
}

export async function getContentBook(bookSlug: string) {
  if (getContentSource() === "database") {
    return getBookFromDatabase(createDatabaseClient(), bookSlug);
  }

  return getStaticBook(bookSlug) ?? null;
}

export async function getContentBookParams() {
  if (getContentSource() === "database") {
    return listBookParamsFromDatabase(createDatabaseClient());
  }

  return getStaticBookParams();
}

export async function getContentLesson(params: LessonParams) {
  if (getContentSource() === "database") {
    return getLessonFromDatabase(createDatabaseClient(), params);
  }

  const book = getStaticBook(params.bookSlug) ?? null;
  const lesson = getStaticLesson(params) ?? null;

  return book && lesson ? { book, lesson } : null;
}

export async function getContentLessonParams() {
  if (getContentSource() === "database") {
    return listLessonParamsFromDatabase(createDatabaseClient());
  }

  return getStaticLessonParams();
}
