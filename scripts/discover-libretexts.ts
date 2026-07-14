import { sourceBooks } from "@/data/source-plans";
import { fetchBookToc } from "@/src/crawler/libretexts";

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
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

