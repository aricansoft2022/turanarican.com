import { createHash } from "node:crypto";

import * as cheerio from "cheerio";

import { slugify } from "@/src/lib/slugify";

export type TocItem = {
  sourceNumber: string;
  title: string;
  slug: string;
  href: string;
};

export type DiscoveredBook = {
  title: string;
  sourceUrl: string;
  contentHash: string;
  chapters: TocItem[];
};

const numberTitlePattern = /^(\d+(?:\.\d+|\.0?[A-Z]|[A-Z])?):\s+(.+)$/i;

function absoluteUrl(href: string, baseUrl: string) {
  return new URL(href, baseUrl).toString();
}

export function parseBookToc(html: string, sourceUrl: string): DiscoveredBook {
  const $ = cheerio.load(html);
  const title = $("h1").first().text().trim() || $("title").text().trim();
  const chapters = new Map<string, TocItem>();

  $("a").each((_, element) => {
    const text = $(element).text().replace(/\s+/g, " ").trim();
    const href = $(element).attr("href");
    const match = numberTitlePattern.exec(text);

    if (!href || !match) return;

    const sourceNumber = match[1].replace(/^0+/, "");
    const itemTitle = match[2].trim();
    const key = `${sourceNumber}:${itemTitle}`;

    if (!chapters.has(key)) {
      chapters.set(key, {
        sourceNumber,
        title: itemTitle,
        slug: slugify(`${sourceNumber}-${itemTitle}`),
        href: absoluteUrl(href, sourceUrl),
      });
    }
  });

  return {
    title,
    sourceUrl,
    contentHash: createHash("sha256").update(html).digest("hex"),
    chapters: [...chapters.values()],
  };
}

export async function fetchBookToc(sourceUrl: string) {
  const response = await fetch(sourceUrl, {
    headers: {
      "user-agent":
        "turanarican.com content ingestion preview (contact: admin@turanarican.com)",
    },
  });

  if (!response.ok) {
    throw new Error(`LibreTexts fetch failed: ${response.status} ${sourceUrl}`);
  }

  return parseBookToc(await response.text(), sourceUrl);
}

