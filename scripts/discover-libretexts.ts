import { sourceBooks } from "@/data/source-plans";
import {
  fetchBookToc,
  fetchChapterToc,
  fetchLessonAssetManifest,
} from "@/src/crawler/libretexts";

async function main() {
  for (const sourceBook of sourceBooks) {
    const discovered = await fetchBookToc(sourceBook.sourceUrl);

    console.log(`\n${discovered.title}`);
    console.log(`source: ${discovered.sourceUrl}`);
    console.log(`hash: ${discovered.contentHash.slice(0, 16)}`);

    for (const chapter of discovered.chapters.slice(0, 16)) {
      console.log(
        `- ${chapter.sourceNumber.padEnd(5)} ${chapter.title} :: ${chapter.href}`,
      );
    }

    for (const chapter of discovered.chapters.slice(0, 3)) {
      const chapterToc = await fetchChapterToc(chapter.href);
      console.log(
        `  chapter ${chapter.sourceNumber} lessons: ${chapterToc.lessons.length}`,
      );

      for (const lesson of chapterToc.lessons.slice(0, 6)) {
        console.log(
          `  - ${lesson.sourceNumber.padEnd(5)} ${lesson.title} :: ${lesson.href}`,
        );
      }
    }
  }

  const prealgebra = sourceBooks.find(
    (sourceBook) => sourceBook.slug === "prealgebra-2e-openstax",
  );

  if (!prealgebra) return;

  const discovered = await fetchBookToc(prealgebra.sourceUrl);
  const chapter2 = discovered.chapters.find(
    (chapter) => chapter.sourceNumber === "2",
  );

  if (!chapter2) return;

  const chapter2Toc = await fetchChapterToc(chapter2.href);
  const lesson23 = chapter2Toc.lessons.find(
    (lesson) => lesson.sourceNumber === "2.3",
  );

  if (!lesson23) return;

  const manifest = await fetchLessonAssetManifest(lesson23.href, {
    bookSlug: prealgebra.slug,
    lessonSlug: lesson23.slug,
  });

  console.log(`\nAsset manifest sample: ${lesson23.sourceNumber} ${lesson23.title}`);
  console.log(`source hash: ${manifest.contentHash.slice(0, 16)}`);
  console.log(`assets: ${manifest.assets.length}`);

  for (const asset of manifest.assets.slice(0, 12)) {
    console.log(
      `- ${asset.type.padEnd(6)} ${asset.preferredTreatment.padEnd(20)} ${asset.r2Key}`,
    );
    const label = asset.caption ?? asset.altText;
    if (label) console.log(`  ${label.slice(0, 160)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
