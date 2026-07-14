import { createHash } from "node:crypto";

import * as cheerio from "cheerio";

import { slugify } from "@/src/lib/slugify";

export type TocItem = {
  sourceNumber: string;
  title: string;
  slug: string;
  href: string;
};

export type SourceAssetManifestItem = {
  id: string;
  sourceUrl: string;
  type: "image" | "figure" | "table" | "svg";
  altText?: string;
  caption?: string;
  contentHash?: string;
  localKey: string;
  r2Key: string;
  preferredTreatment:
    | "redraw_tr_preferred"
    | "rebuild_html_tr"
    | "reuse_original";
  status: "discovered";
};

export type DiscoveredBook = {
  title: string;
  sourceUrl: string;
  contentHash: string;
  chapters: TocItem[];
};

const numberTitlePattern = /^(\d+(?:\.\d+|\.0?[A-Z]|[A-Z])?):\s+(.+)$/i;
const chapterNumberPattern = /^\d+$/;
const lessonNumberPattern = /^\d+\.(?:\d+|[A-Z])$/i;

function absoluteUrl(href: string, baseUrl: string) {
  return new URL(href, baseUrl).toString();
}

export function parseBookToc(html: string, sourceUrl: string): DiscoveredBook {
  const $ = cheerio.load(html);
  const title = $("h1").first().text().trim() || $("title").text().trim();
  const chapters = parseTocItems($, sourceUrl).filter((item) =>
    chapterNumberPattern.test(item.sourceNumber),
  );

  return {
    title,
    sourceUrl,
    contentHash: hashToc(title, chapters),
    chapters,
  };
}

export function parseChapterToc(html: string, sourceUrl: string) {
  const $ = cheerio.load(html);
  const title = $("h1").first().text().trim() || $("title").text().trim();
  const lessons = parseTocItems($, sourceUrl).filter((item) =>
    lessonNumberPattern.test(item.sourceNumber),
  );

  return {
    title,
    sourceUrl,
    contentHash: hashToc(title, lessons),
    lessons,
  };
}

function parseTocItems($: cheerio.CheerioAPI, sourceUrl: string) {
  const items = new Map<string, TocItem>();
  $("a").each((_, element) => {
    const text = $(element).text().replace(/\s+/g, " ").trim();
    const href = $(element).attr("href");
    const match = numberTitlePattern.exec(text);

    if (!href || !match) return;

    const sourceNumber = match[1].replace(/^0+/, "");
    const itemTitle = match[2].trim();
    const key = `${sourceNumber}:${itemTitle}`;

    if (!items.has(key)) {
      items.set(key, {
        sourceNumber,
        title: itemTitle,
        slug: slugify(`${sourceNumber}-${itemTitle}`),
        href: absoluteUrl(href, sourceUrl),
      });
    }
  });

  return [...items.values()];
}

export function parseLessonAssetManifest(
  html: string,
  sourceUrl: string,
  context: { bookSlug: string; lessonSlug: string },
) {
  const $ = cheerio.load(html);
  const root = selectLessonContentRoot($);
  const assets = new Map<string, SourceAssetManifestItem>();

  root.find("figure, .mt-figure, .lt-figure, img").each((index, element) => {
    const node = $(element);
    const image = node.is("img") ? node : node.find("img").first();
    const rawSrc =
      image.attr("src") ??
      image.attr("data-src") ??
      image.attr("data-deki-src") ??
      image.attr("data-lazy-src");

    if (!rawSrc || rawSrc.startsWith("data:")) return;

    const imageUrl = absoluteUrl(rawSrc, sourceUrl);
    const caption = cleanText(
      node.find("figcaption, .mt-caption, .caption").first().text(),
    );
    const altText = cleanText(image.attr("alt") ?? image.attr("title") ?? "");
    const type = node.is("figure") || caption ? "figure" : "image";

    if (assets.has(imageUrl) || !isContentImageAsset({ altText, caption })) {
      return;
    }

    const id = stableAssetId(imageUrl, index);
    const extension = extensionFromUrl(imageUrl) ?? "png";
    const key = `${context.bookSlug}/${context.lessonSlug}/${id}.${extension}`;

    assets.set(imageUrl, {
      id,
      sourceUrl: imageUrl,
      type,
      altText: altText || undefined,
      caption: caption || undefined,
      localKey: `source-assets/${key}`,
      r2Key: `assets/${key}`,
      preferredTreatment: canRedrawFromText(altText, caption)
        ? "redraw_tr_preferred"
        : "reuse_original",
      status: "discovered",
    });
  });

  root.find("svg").each((index, element) => {
    const htmlSnippet = $.html(element);
    const id = stableAssetId(`${sourceUrl}#svg-${index}-${hashText(htmlSnippet)}`);
    const key = `${context.bookSlug}/${context.lessonSlug}/${id}.svg`;

    assets.set(id, {
      id,
      sourceUrl: `${sourceUrl}#svg-${index}`,
      type: "svg",
      caption: cleanText($(element).parent().text()).slice(0, 240) || undefined,
      localKey: `source-assets/${key}`,
      r2Key: `assets/${key}`,
      preferredTreatment: "redraw_tr_preferred",
      status: "discovered",
    });
  });

  root.find("table").each((index, element) => {
    const tableText = cleanText($(element).text());
    if (!tableText) return;

    const id = stableAssetId(`${sourceUrl}#table-${index}-${hashText(tableText)}`);
    const key = `${context.bookSlug}/${context.lessonSlug}/${id}.json`;

    assets.set(id, {
      id,
      sourceUrl: `${sourceUrl}#table-${index}`,
      type: "table",
      caption:
        cleanText($(element).prev("p, div, span").text()).slice(0, 240) ||
        undefined,
      localKey: `source-assets/${key}`,
      r2Key: `assets/${key}`,
      preferredTreatment: "rebuild_html_tr",
      status: "discovered",
    });
  });

  return [...assets.values()];
}

export async function fetchBookToc(sourceUrl: string) {
  const html = await fetchLibreTextsHtml(sourceUrl);
  return parseBookToc(html, sourceUrl);
}

export async function fetchChapterToc(sourceUrl: string) {
  const html = await fetchLibreTextsHtml(sourceUrl);
  return parseChapterToc(html, sourceUrl);
}

export async function fetchLessonAssetManifest(
  sourceUrl: string,
  context: { bookSlug: string; lessonSlug: string },
) {
  const html = await fetchLibreTextsHtml(sourceUrl);
  return {
    sourceUrl,
    contentHash: hashLessonContent(html),
    assets: parseLessonAssetManifest(html, sourceUrl, context),
  };
}

export async function fetchLibreTextsHtml(sourceUrl: string) {
  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent":
        "turanarican.com content ingestion preview (contact: admin@turanarican.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`LibreTexts fetch failed: ${response.status} ${sourceUrl}`);
  }

  return response.text();
}

export function hashText(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

function hashToc(title: string, items: TocItem[]) {
  return hashText(
    JSON.stringify({
      title,
      items: items.map(({ sourceNumber, title: itemTitle, href }) => ({
        sourceNumber,
        title: itemTitle,
        href,
      })),
    }),
  );
}

function hashLessonContent(html: string) {
  const $ = cheerio.load(html);
  const root = selectLessonContentRoot($).clone();
  root.find("script, style, noscript").remove();

  return hashText(
    cleanText(root.html() ?? root.text() ?? html).replace(
      /\b(last updated|page id)\b/gi,
      "",
    ),
  );
}

function stableAssetId(input: string, fallbackIndex?: number) {
  const hash = createHash("sha256").update(input).digest("hex").slice(0, 16);
  return fallbackIndex === undefined ? hash : `${String(fallbackIndex).padStart(3, "0")}-${hash}`;
}

function extensionFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const match = /\.([a-z0-9]{2,5})$/i.exec(pathname);
  if (!match) return null;

  const extension = match[1].toLowerCase();
  return extension === "jpeg" ? "jpg" : extension;
}

export function cleanText(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

export function selectLessonContentRoot($: cheerio.CheerioAPI) {
  const selectors = [
    ".mt-content-container",
    "#elm-main-content .mt-content-container",
    ".elm-content-container",
    "#elm-main-content",
    "article",
    "main",
    "body",
  ];

  for (const selector of selectors) {
    const candidate = $(selector).first();
    if (candidate.length) return candidate;
  }

  return $.root();
}

function isContentImageAsset({
  altText,
  caption,
}: {
  altText: string;
  caption: string;
}) {
  const normalizedCaption = caption.replace(/[.\s]+/g, "");
  if (normalizedCaption) return true;

  const normalizedAlt = altText.replace(/[.\s]+/g, "");
  if (!normalizedAlt) return false;

  return altText.length >= 12;
}

function canRedrawFromText(altText = "", caption = "") {
  const text = `${altText} ${caption}`.toLowerCase();
  return /(^|\s)(graph|chart|plot|figure|number line|diagram|table|expression|image shows|şekil|grafik)(\s|$|[:.,;])/i.test(
    text,
  );
}
