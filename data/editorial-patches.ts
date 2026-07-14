import type { EditorialSectionPatch } from "@/src/content/types";

export type EditorialLessonPatchSet = {
  sourceBookSlug: string;
  sourceNumber: string;
  sections: EditorialSectionPatch[];
};

export const editorialLessonPatches: EditorialLessonPatchSet[] = [
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.3",
    sections: [
      {
        sectionSlug: "cebirsel-ifadeleri-degerlendirme",
        replaceBlocks: [
          {
            sourceBlockIndex: 1,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Önceki bölümde işlem sırasını kullanarak ifadeleri sadeleştirdik. Bu bölümde yine işlem sırasını izleyerek cebirsel ifadeleri değerlendireceğiz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bir cebirsel ifadeyi değerlendirmek, değişken yerine verilen sayıyı yazarak ifadenin değerini bulmak demektir. Bunun için verilen sayıyı ifadede değişkenin yerine koyar, sonra işlem sırasına göre sadeleştiririz.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getEditorialLessonPatches({
  sourceBookSlug,
  sourceNumber,
}: {
  sourceBookSlug: string;
  sourceNumber: string;
}) {
  return (
    editorialLessonPatches.find(
      (patchSet) =>
        patchSet.sourceBookSlug === sourceBookSlug &&
        patchSet.sourceNumber === sourceNumber,
    )?.sections ?? []
  );
}
