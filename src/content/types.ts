export type License = {
  name: string;
  url: string;
  attribution: string;
};

export type NumberingPolicy = "preserve" | "skip_intro_shift" | "custom_map";

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sourceUrl: string;
  sourcePlatform: "LibreTexts";
  license: License;
  numberingPolicy: NumberingPolicy;
  chapters: Chapter[];
};

export type Chapter = {
  id: string;
  bookId: string;
  slug: string;
  sourceNumber: string;
  displayNumber: string;
  sourceTitle: string;
  displayTitle: string;
  sourceUrl: string;
  sortOrder: number;
  lessons: LessonSummary[];
};

export type LessonSummary = {
  id: string;
  chapterId: string;
  slug: string;
  sourceNumber: string;
  displayNumber: string;
  sourceTitle: string;
  displayTitle: string;
  summary: string;
  sourceUrl: string;
  sortOrder: number;
};

export type Lesson = LessonSummary & {
  bookId: string;
  bookSlug: string;
  chapterSlug: string;
  objectives: string[];
  sections: LessonSection[];
  exercises: Exercise[];
  license: License;
};

export type LessonSection = {
  id: string;
  heading: string;
  slug: string;
  level: 2 | 3;
  blocks: ContentBlock[];
};

export type ContentBlock =
  | { type: "paragraph"; text: InlineContent[] }
  | { type: "callout"; label: string; tone: "red" | "soft"; blocks: ContentBlock[] }
  | { type: "example"; label: string; prompt: InlineContent[]; solution: ContentBlock[] }
  | { type: "list"; items: InlineContent[][] }
  | { type: "table"; columns: string[]; rows: string[][] };

export type InlineContent =
  | { type: "text"; value: string }
  | { type: "math"; value: string; display?: boolean };

export type Exercise = {
  id: string;
  number: string;
  sectionSlug: string;
  prompt: InlineContent[];
  answer: InlineContent[];
  sortOrder: number;
};

