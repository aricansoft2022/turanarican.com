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
import type { ContentBlock, InlineContent } from "@/src/content/types";

export type ParsedLessonBlock =
  | { type: "paragraph"; text: string; content: InlineContent[] }
  | { type: "list"; items: string[]; contentItems: InlineContent[][] }
  | { type: "table"; text: string; columns: string[]; rows: string[][] }
  | { type: "figure"; text: string; caption: InlineContent[] };

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
  prompt: InlineContent[];
  solutionText: string;
  solution: ContentBlock[];
};

export type ParsedSourceExercise = {
  number: string;
  promptText: string;
  prompt: InlineContent[];
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

export function parsedLessonBlocksToContentBlocks(
  blocks: ParsedLessonBlock[],
): ContentBlock[] {
  return blocks.flatMap((block, index): ContentBlock[] => {
    if (block.type === "paragraph") {
      return block.content.length ? [{ type: "paragraph", text: block.content }] : [];
    }

    if (block.type === "list") {
      return block.contentItems.length
        ? [{ type: "list", items: block.contentItems }]
        : [];
    }

    if (block.type === "table") {
      return block.columns.length || block.rows.length
        ? [{ type: "table", columns: block.columns, rows: block.rows }]
        : [];
    }

    return [
      {
        type: "figure",
        assetId: `source-figure-${String(index + 1).padStart(2, "0")}`,
        caption: block.caption,
      },
    ];
  });
}

export function parsedBoxToExampleBlock(box: ParsedLessonBox): ContentBlock {
  return {
    type: "example",
    label: box.label,
    prompt: box.prompt,
    solution: box.solution,
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
        blocks.push({
          type: "paragraph",
          text,
          content: normalizeElementInlineContent($, node),
        });
      } else if (node.is("ul, ol")) {
        blocks.push({
          type: "list",
          items: node
            .children("li")
            .toArray()
            .map((item: AnyNode) => normalizeElementText($, $(item)))
            .filter(Boolean),
          contentItems: node
            .children("li")
            .toArray()
            .map((item: AnyNode) => normalizeElementInlineContent($, $(item)))
            .filter((item) => item.length > 0),
        });
      } else if (node.is("table, .os-table")) {
        const table = parseTable($, node);
        blocks.push({ type: "table", text, ...table });
      } else if (node.is("figure")) {
        blocks.push({
          type: "figure",
          text,
          caption: normalizeElementInlineContent(
            $,
            node.find("figcaption, .mt-caption, .caption").first(),
          ),
        });
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
  const solutionNode = body.find("dl dd").first();
  const promptNode = body.clone();
  promptNode.find("dl").remove();
  const prompt = normalizeElementInlineContent($, promptNode);
  const solution = solutionNode.length
    ? parseSolutionBlocks($, solutionNode)
    : [];

  return {
    label,
    slug: slugify(label),
    promptText: inlineContentToText(prompt),
    prompt,
    solutionText: contentBlocksToText(solution),
    solution,
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
      const prompt = stripLeadingExerciseNumber(
        normalizeElementInlineContent($, node),
        number,
      );

      return {
        number,
        promptText: numberMatch
          ? rawText.slice(numberMatch[0].length).trim()
          : rawText,
        prompt,
      };
    })
    .filter((exercise: ParsedSourceExercise) => exercise.number);
}

function getDirectHeading($: cheerio.CheerioAPI, node: CheerioNode) {
  return cleanText(node.children("h1,h2,h3,h4,h5,h6").first().text());
}

function normalizeElementText($: cheerio.CheerioAPI, node: CheerioNode) {
  return inlineContentToText(normalizeElementInlineContent($, node));
}

function normalizeElementInlineContent(
  $: cheerio.CheerioAPI,
  node: CheerioNode,
) {
  if (!node.length) return [];

  const items: InlineContent[] = [];
  collectInlineContent($, node, items);

  return normalizeInlineContent(items);
}

function collectInlineContent(
  $: cheerio.CheerioAPI,
  node: CheerioNode,
  items: InlineContent[],
) {
  node.contents().each((_: number, child: AnyNode) => {
    const childNode = $(child);
    const data = "data" in child ? child.data : "";
    const name = getNodeName(child);

    if (child.type === "text") {
      items.push({ type: "text", value: String(data ?? "") });
      return;
    }

    if (name === "script" || name === "style" || name === "noscript") {
      return;
    }

    if (name === "math") {
      items.push({ type: "math", value: mathNodeToTex($, childNode) });
      return;
    }

    if (name === "br") {
      items.push({ type: "text", value: "\n" });
      return;
    }

    if (name === "img") {
      const alt = cleanText(childNode.attr("alt") ?? childNode.attr("title") ?? "");
      if (alt && alt !== ".") {
        items.push({ type: "text", value: alt });
      }
      return;
    }

    collectInlineContent($, childNode, items);
  });
}

function normalizeInlineContent(items: InlineContent[]) {
  const normalized: InlineContent[] = [];

  for (const item of items) {
    if (item.type === "math") {
      const value = cleanMathText(item.value);
      if (value) normalized.push({ ...item, value });
      continue;
    }

    const value = item.value.replace(/\s+/g, " ");
    if (!value) continue;

    const previous = normalized.at(-1);
    if (previous?.type === "text") {
      previous.value += value;
    } else {
      normalized.push({ type: "text", value });
    }
  }

  const first = normalized[0];
  if (first?.type === "text") first.value = first.value.trimStart();

  const last = normalized.at(-1);
  if (last?.type === "text") last.value = last.value.trimEnd();

  return normalized.filter(
    (item) => item.type === "math" || cleanText(item.value).length > 0,
  );
}

function inlineContentToText(items: InlineContent[]) {
  return cleanText(
    items
      .map((item) => (item.type === "math" ? item.value : item.value))
      .join(" "),
  );
}

function stripLeadingExerciseNumber(items: InlineContent[], number: string) {
  if (!number) return items;

  const [first, ...rest] = items;
  if (!first || first.type !== "text") return items;

  const value = first.value.replace(
    new RegExp(`^\\s*${escapeRegExp(number)}\\.\\s*`),
    "",
  );

  if (!value) return rest;
  return [{ ...first, value }, ...rest];
}

function contentBlocksToText(blocks: ContentBlock[]): string {
  return cleanText(
    blocks
      .map((block) => {
        if (block.type === "paragraph") return inlineContentToText(block.text);
        if (block.type === "list") {
          return block.items.map((item) => inlineContentToText(item)).join(" ");
        }
        if (block.type === "table") {
          return [...block.columns, ...block.rows.flat()].join(" ");
        }
        if (block.type === "example") {
          return inlineContentToText(block.prompt);
        }
        if (block.type === "callout") return contentBlocksToText(block.blocks);
        if (block.type === "figure") return inlineContentToText(block.caption ?? []);
        return "";
      })
      .join(" "),
  );
}

function parseSolutionBlocks(
  $: cheerio.CheerioAPI,
  node: CheerioNode,
): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  node.children("p, ul, ol, table, .os-table").each((_: number, element: AnyNode) => {
    const child = $(element);

    if (child.is("p")) {
      const text = normalizeElementInlineContent($, child);
      if (text.length) blocks.push({ type: "paragraph", text });
      return;
    }

    if (child.is("ul, ol")) {
      const items = child
        .children("li")
        .toArray()
        .map((item: AnyNode) => normalizeElementInlineContent($, $(item)))
        .filter((item) => item.length > 0);
      if (items.length) blocks.push({ type: "list", items });
      return;
    }

    const table = parseTable($, child);
    if (table.columns.length || table.rows.length) {
      blocks.push({ type: "table", ...table });
    }
  });

  return blocks;
}

function parseTable($: cheerio.CheerioAPI, node: CheerioNode) {
  const matrix = node
    .find("tr")
    .toArray()
    .map((row: AnyNode) =>
      $(row)
        .children("th, td")
        .toArray()
        .map((cell: AnyNode) => normalizeElementText($, $(cell)))
        .filter(Boolean),
    )
    .filter((row: string[]) => row.length > 0);

  const headerRow = node.find("tr").first().children("th").length > 0;
  const columns = headerRow ? (matrix.shift() ?? []) : [];

  return {
    columns,
    rows: matrix,
  };
}

function mathNodeToTex($: cheerio.CheerioAPI, node: CheerioNode): string {
  const element = node[0];
  if (!element) return "";

  if (element.type === "text") {
    return String("data" in element ? (element.data ?? "") : "");
  }

  const name = getNodeName(element);
  const children = getMathChildren(node);

  if (name === "annotation" || name === "annotation-xml") return "";

  if (name === "semantics") {
    return joinMathChildren(
      $,
      children.filter((child) => {
        const childName = getNodeName(child);
        return childName !== "annotation" && childName !== "annotation-xml";
      }),
    );
  }

  if (name === "mi" || name === "mn") return cleanMathText(node.text());
  if (name === "mtext") return `\\text{${cleanText(node.text())}}`;
  if (name === "mspace") return " ";
  if (name === "mo") return mathOperatorToTex(cleanMathText(node.text()));

  if (name === "msup") {
    const [base, exponent] = children;
    return `${wrapMathGroup(mathNodeToTex($, $(base)))}^{${mathNodeToTex(
      $,
      $(exponent),
    )}}`;
  }

  if (name === "msub") {
    const [base, subscript] = children;
    return `${wrapMathGroup(mathNodeToTex($, $(base)))}_{${mathNodeToTex(
      $,
      $(subscript),
    )}}`;
  }

  if (name === "mfrac") {
    const [numerator, denominator] = children;
    return `\\frac{${mathNodeToTex($, $(numerator))}}{${mathNodeToTex(
      $,
      $(denominator),
    )}}`;
  }

  if (name === "msqrt") {
    return `\\sqrt{${joinMathChildren($, children)}}`;
  }

  if (name === "mroot") {
    const [radicand, index] = children;
    return `\\sqrt[${mathNodeToTex($, $(index))}]{${mathNodeToTex(
      $,
      $(radicand),
    )}}`;
  }

  if (name === "mtable") {
    const rows = children
      .map((child) => mathNodeToTex($, $(child)))
      .filter(Boolean)
      .join(" \\\\ ");
    return `\\begin{array}{l}${rows}\\end{array}`;
  }

  if (name === "mtr" || name === "mlabeledtr") {
    return children
      .map((child) => mathNodeToTex($, $(child)))
      .filter(Boolean)
      .join(" & ");
  }

  if (name === "mtd") {
    return joinMathChildren($, children);
  }

  return joinMathChildren($, children);
}

function joinMathChildren($: cheerio.CheerioAPI, children: AnyNode[]) {
  return cleanMathText(
    children.map((child) => mathNodeToTex($, $(child))).join(""),
  );
}

function getMathChildren(node: CheerioNode) {
  return node
    .contents()
    .toArray()
    .filter((child) => {
      if (child.type !== "text") return true;

      return Boolean(
        cleanMathText(String("data" in child ? (child.data ?? "") : "")),
      );
    });
}

function getNodeName(node: AnyNode) {
  return "name" in node ? String(node.name).toLowerCase() : "";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mathOperatorToTex(operator: string) {
  const operatorMap: Record<string, string> = {
    "−": "-",
    "×": "\\times",
    "⋅": "\\cdot",
    "÷": "\\div",
    "≤": "\\le",
    "≥": "\\ge",
    "≠": "\\ne",
    "≈": "\\approx",
  };

  return operatorMap[operator] ?? operator;
}

function wrapMathGroup(value: string) {
  if (/^[a-zA-Z0-9]$/.test(value)) return value;
  return `{${value}}`;
}

function cleanMathText(input: string) {
  return input.replace(/\s+/g, " ").trim();
}
