import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

import { slugify } from "@/src/lib/slugify";

import {
  cleanText,
  fetchLibreTextsHtml,
  hashText,
  parseLessonAssetManifest,
  selectLessonContentRoot,
} from "./libretexts";

export type ParsedLessonBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; text: string }
  | { type: "figure"; text: string };

export type ParsedLessonSection = {
  heading: string;
  slug: string;
  sourceAnchor?: string;
  blocks: ParsedLessonBlock[];
};

export type ParsedLessonBox = {
  label: string;
  slug: string;
  promptText: string;
};

export type ParsedSourceExercise = {
  number: string;
  promptText: string;
};

export type ParsedLessonContent = {
  title: string;
  sourceUrl: string;
  contentHash: string;
  objectives: string[];
  sections: ParsedLessonSection[];
  examples: ParsedLessonBox[];
  tryIts: ParsedLessonBox[];
  exercises: ParsedSourceExercise[];
  assetCount: number;
  validation: {
    selfCheckRemoved: boolean;
    emptyExamples: string[];
    emptyTryIts: string[];
    emptyExercises: string[];
  };
};

type CheerioNode = cheerio.Cheerio<AnyNode>;

const excludedSectionHeadingPattern =
  /^(section\s+\d+(?:\.\d+)?\s+exercises|practice makes perfect|everyday math|writing exercises|self check)$/i;

export async function fetchLessonContent(
  sourceUrl: string,
  context: { bookSlug: string; lessonSlug: string },
) {
  const html = await fetchLibreTextsHtml(sourceUrl);
  return parseLessonContent(html, sourceUrl, context);
}

export function parseLessonContent(
  html: string,
  sourceUrl: string,
  context: { bookSlug: string; lessonSlug: string },
): ParsedLessonContent {
  const $ = cheerio.load(html);
  const root = selectLessonContentRoot($).clone();
  removeSourceChrome($, root);

  const title = cleanText($("h1").first().text() || $("title").text());
  const objectives = parseObjectives($, root);
  const sections = parseMainSections($, root);
  const examples: ParsedLessonBox[] = parseBoxes($, root, "section.box-example");
  const tryIts: ParsedLessonBox[] = parseTryIts($, root);
  const exercises: ParsedSourceExercise[] = parseExercises($, root);
  const assets = parseLessonAssetManifest(html, sourceUrl, context);

  return {
    title,
    sourceUrl,
    contentHash: hashText(cleanText(root.html() ?? root.text())),
    objectives,
    sections,
    examples,
    tryIts,
    exercises,
    assetCount: assets.length,
    validation: {
      selfCheckRemoved: root.find("#Self_Check").length === 0,
      emptyExamples: examples
        .filter((example) => !example.promptText)
        .map((example) => example.label),
      emptyTryIts: tryIts
        .filter((tryIt) => !tryIt.promptText)
        .map((tryIt) => tryIt.label),
      emptyExercises: exercises
        .filter((exercise) => !exercise.promptText)
        .map((exercise) => exercise.number),
    },
  };
}

function removeSourceChrome($: cheerio.CheerioAPI, root: CheerioNode) {
  root.find("script, style, noscript, .autoattribution").remove();
  root
    .find(".mt-section")
    .filter((_: number, element: AnyNode) => {
      const heading = getDirectHeading($, $(element));
      return /^self check$/i.test(heading);
    })
    .remove();
}

function parseObjectives($: cheerio.CheerioAPI, root: CheerioNode) {
  return root
    .find("section.box-objectives li")
    .toArray()
    .map((element: AnyNode) => normalizeElementText($, $(element)))
    .filter(Boolean);
}

function parseMainSections($: cheerio.CheerioAPI, root: CheerioNode) {
  return root
    .find(".mt-section[id^='section_']")
    .toArray()
    .map((element: AnyNode) => {
      const section = $(element);
      const heading = getDirectHeading($, section);
      return { section, heading };
    })
    .filter(
      ({
        heading,
      }: {
        section: CheerioNode;
        heading: string;
      }) => heading && !excludedSectionHeadingPattern.test(heading),
    )
    .map(({ section, heading }) => ({
      heading,
      slug: slugify(heading),
      sourceAnchor: section.children("span[id]").first().attr("id"),
      blocks: parseSectionBlocks($, section),
    }));
}

function parseSectionBlocks($: cheerio.CheerioAPI, section: CheerioNode) {
  const sectionClone = section.clone();
  sectionClone
    .find("section.box-example, section.box-note, .os-section-exercises-container")
    .remove();

  const blocks: ParsedLessonBlock[] = [];
  sectionClone
    .children("p, ul, ol, table, figure, .os-table")
    .each((_: number, element: AnyNode) => {
      const node = $(element);
      const text = normalizeElementText($, node);
      if (!text) return;

      if (node.is("p")) {
        blocks.push({ type: "paragraph", text });
      } else if (node.is("ul, ol")) {
        blocks.push({
          type: "list",
          items: node
            .children("li")
            .toArray()
            .map((item: AnyNode) => normalizeElementText($, $(item)))
            .filter(Boolean),
        });
      } else if (node.is("table, .os-table")) {
        blocks.push({ type: "table", text });
      } else if (node.is("figure")) {
        blocks.push({ type: "figure", text });
      }
    });

  return blocks;
}

function parseBoxes(
  $: cheerio.CheerioAPI,
  root: CheerioNode,
  selector: string,
) {
  return root
    .find(selector)
    .toArray()
    .map((element: AnyNode) => parseBox($, $(element)))
    .filter((box): box is ParsedLessonBox => Boolean(box));
}

function parseTryIts($: cheerio.CheerioAPI, root: CheerioNode) {
  return root
    .find("section.box-note")
    .toArray()
    .map((element: AnyNode) => parseBox($, $(element)))
    .filter((box): box is ParsedLessonBox =>
      Boolean(box && /^Try It/i.test(box.label)),
    );
}

function parseBox($: cheerio.CheerioAPI, box: CheerioNode) {
  const label = getDirectHeading($, box.find("header .mt-section").first());
  if (!label) return null;

  const body = box.clone();
  body.children("header").remove();

  return {
    label,
    slug: slugify(label),
    promptText: normalizeElementText($, body),
  };
}

function parseExercises($: cheerio.CheerioAPI, root: CheerioNode) {
  return root
    .find("div.os-hasSolution[data-type='exercise']")
    .toArray()
    .map((element: AnyNode) => {
      const node = $(element).clone();
      const rawText = normalizeElementText($, node);
      const numberMatch = /^(\d+[A-Za-z]?)\.\s*/.exec(rawText);
      const number = numberMatch?.[1] ?? "";

      return {
        number,
        promptText: numberMatch
          ? rawText.slice(numberMatch[0].length).trim()
          : rawText,
      };
    })
    .filter((exercise: ParsedSourceExercise) => exercise.number);
}

function getDirectHeading($: cheerio.CheerioAPI, node: CheerioNode) {
  return cleanText(node.children("h1,h2,h3,h4,h5,h6").first().text());
}

function normalizeElementText($: cheerio.CheerioAPI, node: CheerioNode) {
  const clone = node.clone();
  clone.find("annotation, annotation-xml, script, style, noscript").remove();
  clone.find("math").each((_: number, math: AnyNode) => {
    const mathText = cleanText($(math).text());
    $(math).replaceWith(` ${mathText} `);
  });

  return cleanText(clone.text());
}
