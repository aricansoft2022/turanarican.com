import { editorialLessonPatches } from "@/data/editorial-patches";
import { readSeedFixture } from "./validate-seed-lessons";

async function main() {
  const fixture = await readSeedFixture();
  const lessons = fixture.lessons;

  const report = editorialLessonPatches.map((patchSet) => {
    const entry = lessons.find(
      (lessonEntry) =>
        lessonEntry.sourceBookSlug === patchSet.sourceBookSlug &&
        lessonEntry.sourceNumber === patchSet.sourceNumber,
    );

    const sectionReports = patchSet.sections.map((sectionPatch) => {
      const section = entry?.lesson.sections.find(
        (item) => item.slug === sectionPatch.sectionSlug,
      );
      const replacedBlocks = sectionPatch.replaceBlocks ?? [];

      return {
        sectionSlug: sectionPatch.sectionSlug,
        sectionFound: Boolean(section),
        replacements: replacedBlocks.map((replacement) => {
          const block = section?.blocks[replacement.sourceBlockIndex - 1];
          return {
            sourceBlockIndex: replacement.sourceBlockIndex,
            replacementBlocks: replacement.blocks.length,
            blockFoundAfterBuild: Boolean(block),
            preview: block ? previewBlock(block) : null,
          };
        }),
      };
    });

    return {
      sourceBookSlug: patchSet.sourceBookSlug,
      sourceNumber: patchSet.sourceNumber,
      lessonFound: Boolean(entry),
      lessonSlug: entry?.lesson.slug ?? null,
      sections: sectionReports,
      replacements: sectionReports.reduce(
        (total, section) => total + section.replacements.length,
        0,
      ),
    };
  });

  assertEditorialPatchReport(report);

  console.log("Editorial patch report.");
  console.log(
    JSON.stringify(
      {
        patchSets: report.length,
        replacements: report.reduce((total, item) => total + item.replacements, 0),
        report,
      },
      null,
      2,
    ),
  );
}

function previewBlock(
  block: NonNullable<
    Awaited<ReturnType<typeof readSeedFixture>>["lessons"][number]["lesson"]["sections"][number]["blocks"][number]
  >,
) {
  if (block.type === "paragraph") return inlinePreview(block.text);
  if (block.type === "example") return `${block.label}: ${inlinePreview(block.prompt)}`;
  if (block.type === "list") return `${block.items.length} list item(s)`;
  if (block.type === "table") {
    return `${block.columns.length} column(s), ${block.rows.length} row(s)`;
  }
  if (block.type === "figure") return `figure ${block.assetId}`;
  return `${block.label}: ${block.blocks.length} block(s)`;
}

function inlinePreview(
  items: Array<{ type: "text" | "math"; value: string; display?: boolean }>,
) {
  const text = items.map((item) => item.value).join(" ").replace(/\s+/g, " ");
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

function assertEditorialPatchReport(
  report: Array<{
    sourceBookSlug: string;
    sourceNumber: string;
    lessonFound: boolean;
    sections: Array<{
      sectionSlug: string;
      sectionFound: boolean;
      replacements: Array<{
        sourceBlockIndex: number;
        replacementBlocks: number;
        blockFoundAfterBuild: boolean;
      }>;
    }>;
  }>,
) {
  for (const patchSet of report) {
    if (!patchSet.lessonFound) {
      throw new Error(
        `Editorial patch lesson was not found: ${patchSet.sourceBookSlug}/${patchSet.sourceNumber}`,
      );
    }

    for (const section of patchSet.sections) {
      if (!section.sectionFound) {
        throw new Error(
          `Editorial patch section was not found: ${patchSet.sourceBookSlug}/${patchSet.sourceNumber}/${section.sectionSlug}`,
        );
      }

      for (const replacement of section.replacements) {
        if (
          replacement.replacementBlocks > 0 &&
          !replacement.blockFoundAfterBuild
        ) {
          throw new Error(
            `Editorial patch replacement did not resolve after build: ${patchSet.sourceBookSlug}/${patchSet.sourceNumber}/${section.sectionSlug}/${replacement.sourceBlockIndex}`,
          );
        }
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
