import type {
  ContentBlock,
  EditorialSectionPatch,
  InlineContent,
} from "@/src/content/types";

export type EditorialLessonPatchSet = {
  sourceBookSlug: string;
  sourceNumber: string;
  sections: EditorialSectionPatch[];
};

const t = (value: string): InlineContent => ({ type: "text", value });
const m = (value: string, display?: boolean): InlineContent => ({
  type: "math",
  value,
  ...(display === undefined ? {} : { display }),
});
const p = (text: InlineContent[]): ContentBlock => ({ type: "paragraph", text });
const pt = (value: string): ContentBlock => p([t(value)]);
const tx = (value: string): InlineContent[] => [t(value)];
const ex = (
  label: string,
  prompt: InlineContent[],
  solution: ContentBlock[] = [],
): ContentBlock => ({
  type: "example",
  label,
  prompt,
  solution,
});
const sol = (...values: string[]): ContentBlock[] => values.map(pt);
const removeBlocks = (from: number, to = 2) =>
  Array.from({ length: from - to + 1 }, (_, index) => ({
    sourceBlockIndex: from - index,
    blocks: [] as ContentBlock[],
  }));

export const editorialLessonPatches: EditorialLessonPatchSet[] = [
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.3",
    sections: [
      {
        sectionSlug: "cebirsel-ifadenin-degerini-hesaplama",
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
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.13",
                prompt: [
                  { type: "text", value: "Aşağıdaki ifadeyi değerlendirin: " },
                  { type: "math", value: "x+7" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "x=3" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "x=12" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      { type: "text", value: "ⓐ " },
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "3" },
                      {
                        type: "text",
                        value: " yazar ve ifadeyi sadeleştiririz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x+7&=3+7 \\\\ &=10\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=3" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "x+7" },
                      { type: "text", value: " ifadesinin değeri " },
                      { type: "math", value: "10" },
                      { type: "text", value: "'dur." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "text", value: "ⓑ " },
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "12" },
                      {
                        type: "text",
                        value: " yazar ve ifadeyi sadeleştiririz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x+7&=12+7 \\\\ &=19\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=12" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "x+7" },
                      { type: "text", value: " ifadesinin değeri " },
                      { type: "math", value: "19" },
                      { type: "text", value: "'dur." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "x=12" },
                  { type: "text", value: " iken " },
                  { type: "math", value: "x+7" },
                  { type: "text", value: " ifadesinin değeri " },
                  { type: "math", value: "19" },
                  { type: "text", value: "'dur." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Aynı ifadeyle başlamamıza rağmen ⓐ ve ⓑ bölümlerinde farklı sonuçlar elde ettik. Bunun nedeni ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value:
                      " için kullanılan değerlerin farklı olmasıdır. Bir ifadeyi değerlendirdiğimizde sonuç, değişken yerine yazılan değere bağlı olarak değişir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.25",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "y+4" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "y=6" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "y=15" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.26",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "a-5" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "a=9" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "a=17" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.14",
                prompt: [
                  { type: "text", value: "Aşağıdaki ifadeyi değerlendirin: " },
                  { type: "math", value: "9x-2" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "x=5" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "x=1" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "ab" },
                      { type: "text", value: " ifadesinin " },
                      { type: "math", value: "a" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "b" },
                      {
                        type: "text",
                        value: " sayılarının çarpımı anlamına geldiğini hatırlayın. Bu yüzden ",
                      },
                      { type: "math", value: "9x" },
                      { type: "text", value: ", " },
                      { type: "math", value: "9" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "x" },
                      { type: "text", value: "'in çarpımıdır." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "text", value: "ⓐ " },
                      { type: "math", value: "x=5" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "5" },
                      {
                        type: "text",
                        value: " yazar ve ifadeyi sadeleştiririz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}9x-2&=9(5)-2 \\\\ &=45-2 \\\\ &=43\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "text", value: "ⓑ " },
                      { type: "math", value: "x=1" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "1" },
                      {
                        type: "text",
                        value: " yazar ve ifadeyi sadeleştiririz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}9x-2&=9(1)-2 \\\\ &=9-2 \\\\ &=7\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "ⓐ bölümünde ",
                  },
                  { type: "math", value: "9\\cdot5" },
                  {
                    type: "text",
                    value: ", ⓑ bölümünde ise ",
                  },
                  { type: "math", value: "9(1)" },
                  {
                    type: "text",
                    value:
                      " yazdığımıza dikkat edin. Hem nokta hem de parantez çarpma işlemini gösterir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.27",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "8x-3" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "x=2" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "x=1" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.28",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "4y-4" },
                  { type: "text", value: ", ⓐ " },
                  { type: "math", value: "y=3" },
                  { type: "text", value: " iken; ⓑ " },
                  { type: "math", value: "y=5" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.15",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "x^{2}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=10" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "10" },
                      {
                        type: "text",
                        value: " yazar ve ifadeyi sadeleştiririz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x^{2}&=10^{2} \\\\ &=10\\cdot10 \\\\ &=100\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=10" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "x^{2}" },
                      { type: "text", value: " ifadesinin değeri " },
                      { type: "math", value: "100" },
                      { type: "text", value: "'dür." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.29",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "x^{2}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=8" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.30",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "x^{3}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=6" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 15,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.16",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "2^{x}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=5" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Bu ifadede değişken üs durumundadır. Bu yüzden ",
                      },
                      { type: "math", value: "x" },
                      { type: "text", value: " yerine " },
                      { type: "math", value: "5" },
                      { type: "text", value: " yazarız." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}2^{x}&=2^{5} \\\\ &=2\\cdot2\\cdot2\\cdot2\\cdot2 \\\\ &=32\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=5" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "2^{x}" },
                      { type: "text", value: " ifadesinin değeri " },
                      { type: "math", value: "32" },
                      { type: "text", value: "'dir." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 16,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.31",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "2^{x}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=6" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 17,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.32",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "3^{x}" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=4" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 18,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.17",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "3x+4y-6" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=10" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "y=2" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Bu ifadede iki değişken var; bu yüzden iki yerine koyma yaparız.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}3x+4y-6&=3(10)+4(2)-6 \\\\ &=30+8-6 \\\\ &=32\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=10" },
                      { type: "text", value: " ve " },
                      { type: "math", value: "y=2" },
                      { type: "text", value: " iken " },
                      { type: "math", value: "3x+4y-6" },
                      { type: "text", value: " ifadesinin değeri " },
                      { type: "math", value: "32" },
                      { type: "text", value: "'dir." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 19,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.33",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "2x+5y-4" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=11" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "y=3" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 20,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.34",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "5x-2y-9" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=7" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "y=8" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 21,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.18",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "2x^{2}+3x+8" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=4" },
                  { type: "text", value: " iken." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Bir ifadede değişkenin üssü varsa dikkatli olmalıyız. Bu ifadede ",
                      },
                      { type: "math", value: "2x^{2}" },
                      { type: "text", value: ", " },
                      { type: "math", value: "2\\cdot x\\cdot x" },
                      {
                        type: "text",
                        value: " anlamına gelir; ",
                      },
                      { type: "math", value: "(2x)^{2}" },
                      { type: "text", value: " ifadesinden farklıdır." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}2x^{2}+3x+8&=2(4^{2})+3(4)+8 \\\\ &=2(16)+12+8 \\\\ &=32+12+8 \\\\ &=52\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 22,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.35",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "3x^{2}+4x+1" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=3" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 23,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.36",
                prompt: [
                  { type: "text", value: "Değerlendirin: " },
                  { type: "math", value: "6x^{2}-4x-7" },
                  { type: "text", value: ", " },
                  { type: "math", value: "x=2" },
                  { type: "text", value: " iken." },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "terim-katsayi-ve-benzer-terim",
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
                      "Cebirsel ifadeler terimlerden oluşur. Terim, bir sabit ya da bir sabit ile bir veya daha fazla değişkenin çarpımıdır. Örneğin ",
                  },
                  { type: "math", value: "7,y,5x^{2},9a" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "13xy" },
                  { type: "text", value: " birer terimdir." },
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
                      "Bir terimde değişkeni çarpan sabite katsayı denir. Katsayıyı, değişkenin önündeki sayı olarak düşünebiliriz. Örneğin ",
                  },
                  { type: "math", value: "3x" },
                  {
                    type: "text",
                    value:
                      " teriminin katsayısı 3'tür. Tablo 2.5, bazı terimlerin katsayılarını gösterir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "table",
                columns: ["Terim", "Katsayı"],
                rows: [
                  ["9a", "9"],
                  ["y", "1"],
                  ["5x^{2}", "5"],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bir cebirsel ifade, bir veya daha fazla terimin toplanması ya da çıkarılmasıyla oluşabilir. Bu bölümde yalnızca toplama biçiminde yazılmış terimlerle çalışacağız. Tablo 2.6, farklı sayıda terime sahip cebirsel ifade örnekleri verir. Bir terimin önündeki işlemi de o terimle birlikte düşündüğümüze dikkat edin.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "table",
                columns: ["İfade", "Terimler"],
                rows: [
                  ["7", "7"],
                  ["y", "y"],
                  ["x+7", "x, 7"],
                  ["2x+7y+4", "2x, 7y, 4"],
                  ["3x^{2}+4x^{2}+5y+3", "3x^{2}, 4x^{2}, 5y, 3"],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.19",
                prompt: [
                  { type: "math", value: "9b+15x^{2}+a+6" },
                  {
                    type: "text",
                    value:
                      " ifadesindeki her terimi belirleyin. Sonra her terimin katsayısını bulun.",
                  },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "İfadenin dört terimi vardır: ",
                      },
                      { type: "math", value: "9b,15x^{2},a" },
                      { type: "text", value: " ve " },
                      { type: "math", value: "6" },
                      { type: "text", value: "." },
                    ],
                  },
                  {
                    type: "table",
                    columns: ["Terim", "Katsayı"],
                    rows: [
                      ["9b", "9"],
                      ["15x^{2}", "15"],
                      ["a", "1"],
                      ["6", "6"],
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Bir değişkenin önünde sayı yazmıyorsa katsayısı 1'dir. Sabit terimin katsayısı ise sabitin kendisidir.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.37",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Verilen ifadedeki tüm terimleri ve katsayılarını belirleyin: ",
                  },
                  { type: "math", value: "4x+3b+2" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.38",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Verilen ifadedeki tüm terimleri ve katsayılarını belirleyin: ",
                  },
                  { type: "math", value: "9a+13a^{2}+a^{3}" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bazı terimler ortak özellikler taşır. Aşağıdaki terimlere bakın. Hangilerinin ortak özellikleri var?",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "5x,7,n^{2},4,3x,9n^{2}",
                    display: true,
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "Bu terimlerden hangileri benzer terimdir?",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "list",
                items: [
                  [
                    { type: "math", value: "7" },
                    { type: "text", value: " ve " },
                    { type: "math", value: "4" },
                    { type: "text", value: " sabit terimlerdir." },
                  ],
                  [
                    { type: "math", value: "5x" },
                    { type: "text", value: " ve " },
                    { type: "math", value: "3x" },
                    { type: "text", value: " aynı değişkeni içerir." },
                  ],
                  [
                    { type: "math", value: "n^{2}" },
                    { type: "text", value: " ve " },
                    { type: "math", value: "9n^{2}" },
                    { type: "text", value: " aynı değişken ve üssü içerir." },
                  ],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Aynı değişkenlere ve aynı üslere sahip terimlere benzer terimler denir. Tüm sabit terimler de birbirine benzerdir. Bu yüzden ",
                  },
                  { type: "math", value: "5x,7,n^{2},4,3x,9n^{2}" },
                  {
                    type: "text",
                    value: " terimleri arasında şu benzer terim grupları vardır:",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "7" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "4" },
                  { type: "text", value: " benzer terimlerdir." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 15,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "5x" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "3x" },
                  { type: "text", value: " benzer terimlerdir." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 16,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "n^{2}" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "9n^{2}" },
                  { type: "text", value: " benzer terimlerdir." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 17,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.20",
                prompt: [
                  {
                    type: "text",
                    value: "Benzer terimleri belirleyin: ⓐ ",
                  },
                  { type: "math", value: "y^{3},7x^{2},14,23,4y^{3},9x,5x^{2}" },
                  { type: "text", value: " ⓑ " },
                  { type: "math", value: "4x^{2}+2x+5x^{2}+6x+40x+8xy" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓐ Değişkenlere ve üslere bakarız. Benzer terim grupları şunlardır:",
                      },
                    ],
                  },
                  {
                    type: "list",
                    items: [
                      [
                        { type: "math", value: "y^{3}" },
                        { type: "text", value: " ve " },
                        { type: "math", value: "4y^{3}" },
                      ],
                      [
                        { type: "math", value: "7x^{2}" },
                        { type: "text", value: " ve " },
                        { type: "math", value: "5x^{2}" },
                      ],
                      [
                        { type: "math", value: "14" },
                        { type: "text", value: " ve " },
                        { type: "math", value: "23" },
                      ],
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "9x" },
                      {
                        type: "text",
                        value:
                          " teriminin bu listede benzer terimi yoktur; çünkü başka hiçbir terimde değişken ",
                      },
                      { type: "math", value: "x" },
                      { type: "text", value: " birinci kuvvetten değildir." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "ⓑ İfadedeki benzer terim grupları şunlardır:",
                      },
                    ],
                  },
                  {
                    type: "list",
                    items: [
                      [
                        { type: "math", value: "4x^{2}" },
                        { type: "text", value: " ve " },
                        { type: "math", value: "5x^{2}" },
                      ],
                      [
                        { type: "math", value: "2x" },
                        { type: "text", value: ", " },
                        { type: "math", value: "6x" },
                        { type: "text", value: " ve " },
                        { type: "math", value: "40x" },
                      ],
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "8xy" },
                      {
                        type: "text",
                        value:
                          " teriminin bu ifadede benzer terimi yoktur.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 18,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.39",
                prompt: [
                  {
                    type: "text",
                    value: "Listede benzer terimleri belirleyin: ",
                  },
                  { type: "math", value: "9,2x^{3},y^{2},8x^{3},15,9y,11y^{2}" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 19,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.40",
                prompt: [
                  {
                    type: "text",
                    value: "İfadede benzer terimleri belirleyin: ",
                  },
                  { type: "math", value: "4x^{3}+8x^{2}+19+3x^{2}+24+6x^{3}" },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "cebirsel-ifadelerde-toplama-ve-cikarma",
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
                      "Bir ifadeyi benzer terimleri birleştirerek sadeleştirebiliriz. Sizce ",
                  },
                  { type: "math", value: "3x+6x" },
                  { type: "text", value: " ifadesi neye sadeleşir? " },
                  { type: "math", value: "9x" },
                  { type: "text", value: " dediyseniz doğru düşündünüz." },
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
                      "Bunun neden işe yaradığını görmek için iki terimi de tekrar eden toplama biçiminde yazabiliriz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "3x" },
                  {
                    type: "text",
                    value: " terimi ",
                  },
                  { type: "math", value: "x+x+x" },
                  {
                    type: "text",
                    value: " demektir. ",
                  },
                  { type: "math", value: "6x" },
                  {
                    type: "text",
                    value: " terimi de ",
                  },
                  { type: "math", value: "x+x+x+x+x+x" },
                  {
                    type: "text",
                    value:
                      " demektir. Hepsini birlikte yazınca toplamda dokuz tane ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value: " elde ederiz; yani ifade ",
                  },
                  { type: "math", value: "9x" },
                  { type: "text", value: " olur." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Benzer terimleri birleştirirken katsayıları toplar, değişken kısmını aynı bırakırız. ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value:
                      " yerine hangi sayı gelirse gelsin fikir aynıdır: aynı şeyden ",
                  },
                  { type: "math", value: "3" },
                  {
                    type: "text",
                    value: " tane varken aynı şeyden ",
                  },
                  { type: "math", value: "6" },
                  {
                    type: "text",
                    value: " tane daha eklersek toplam ",
                  },
                  { type: "math", value: "9" },
                  {
                    type: "text",
                    value:
                      " tane olur. Örneğin 3 portakal ile 6 portakal 9 portakal eder. Bunun arkasındaki matematiksel özellikleri daha sonra ayrıntılı inceleyeceğiz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "3x+6x" },
                  {
                    type: "text",
                    value:
                      " ifadesinin yalnızca iki terimi vardır. Daha çok terimli ifadelerde, benzer terimleri yan yana getirmek için terimlerin sırasını değiştirmek işe yarayabilir. Toplamanın değişme özelliği, toplamın değeri değişmeden toplananların sırasını değiştirebileceğimizi söyler. Bu yüzden benzer terimleri birleştirmeden önce ifadeyi yeniden sıralayabiliriz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "Örneğin ",
                  },
                  { type: "math", value: "3x+4y+2x+6y" },
                  {
                    type: "text",
                    value:
                      " ifadesinde ortadaki terimlerin yerini değiştirerek ",
                  },
                  { type: "math", value: "3x+2x+4y+6y" },
                  {
                    type: "text",
                    value:
                      " yazabiliriz. Böylece ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value: " içeren terimler birlikte, ",
                  },
                  { type: "math", value: "y" },
                  {
                    type: "text",
                    value: " içeren terimler de birlikte durur.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Artık hangi benzer terimlerin birleştirileceğini görmek daha kolaydır.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.21",
                prompt: [
                  { type: "text", value: "İfadeyi sadeleştirin: " },
                  { type: "math", value: "3x+7+4x+5" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Benzer terimleri belirleyelim: ",
                      },
                      { type: "math", value: "3x" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "4x" },
                      {
                        type: "text",
                        value: " benzer terimlerdir; ",
                      },
                      { type: "math", value: "7" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "5" },
                      {
                        type: "text",
                        value: " de sabit terimlerdir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}3x+7+4x+5&=3x+4x+7+5\\\\&=7x+12\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Sadeleşmiş ifade ",
                      },
                      { type: "math", value: "7x+12" },
                      { type: "text", value: " olur." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.41",
                prompt: [
                  { type: "text", value: "Sadeleştirin: " },
                  { type: "math", value: "7x+9+9x+8" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.42",
                prompt: [
                  { type: "text", value: "Sadeleştirin: " },
                  { type: "math", value: "5y+2+8y+4y+5" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Terimlerden bazılarının katsayısı negatif olduğunda yöntem yine aynıdır. Yalnızca benzer terimleri birleştirirken toplama yerine çıkarma yapmamız gerekebilir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.22",
                prompt: [
                  { type: "text", value: "İfadeyi sadeleştirin: " },
                  { type: "math", value: "7x^{2}+8x-x^{2}-4x" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Benzer terimleri gruplayalım: ",
                      },
                      { type: "math", value: "7x^{2}" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "-x^{2}" },
                      {
                        type: "text",
                        value: " benzer terimlerdir; ",
                      },
                      { type: "math", value: "8x" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "-4x" },
                      {
                        type: "text",
                        value: " benzer terimlerdir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}7x^{2}+8x-x^{2}-4x&=7x^{2}-x^{2}+8x-4x\\\\&=6x^{2}+4x\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "6x^{2}" },
                      { type: "text", value: " ve " },
                      { type: "math", value: "4x" },
                      {
                        type: "text",
                        value:
                          " benzer terimler değildir; bu yüzden daha fazla birleştirilemezler. En sade biçim ",
                      },
                      { type: "math", value: "6x^{2}+4x" },
                      { type: "text", value: " olur." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.43",
                prompt: [
                  { type: "text", value: "Sadeleştirin: " },
                  { type: "math", value: "3x^{2}+9x+x^{2}+5x" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.44",
                prompt: [
                  { type: "text", value: "Sadeleştirin: " },
                  { type: "math", value: "11y^{2}+8y+y^{2}+7y" },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "sozel-durumlari-cebirsel-ifade-ile-gosterme",
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
                      "Önceki bölümde cebirde kullanılan işlem sembollerini listeledik; sonra ifadeleri ve denklemleri sözcük öbeklerine çevirdik. Şimdi işlemi tersine çevirecek, sözcük öbeklerini cebirsel ifadelere dönüştüreceğiz. Konuştuğumuz semboller ve değişkenler bu çeviride bize yardımcı olacak. Bunlar Tablo 2.7'de özetlenmiştir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              {
                type: "table",
                columns: ["İşlem", "Sözcük Öbeği", "İfade"],
                rows: [
                  [
                    "Toplama",
                    "a artı b; a ile b'nin toplamı; a'nın b kadar artırılmışı; a'dan b fazla; a ile b'nin toplam değeri; a'ya b eklenmiş",
                    "a+b",
                  ],
                  [
                    "Çıkarma",
                    "a eksi b; a ile b'nin farkı; a'dan b çıkarılmış; a'nın b kadar azaltılmışı; a'dan b eksik",
                    "a-b",
                  ],
                  [
                    "Çarpma",
                    "a çarpı b; a ile b'nin çarpımı",
                    "a\\cdot b, ab, a(b), (a)(b)",
                  ],
                  [
                    "Bölme",
                    "a bölü b; a ile b'nin bölümü; a'nın b'ye oranı; a'nın b'ye bölünmüşü",
                    "a\\div b, a/b, \\frac{a}{b}",
                  ],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Dört işlemi kullanan şu sözcük öbeklerine dikkatle bakın:",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "list",
                items: [
                  [
                    { type: "math", value: "a" },
                    { type: "text", value: " ile " },
                    { type: "math", value: "b" },
                    { type: "text", value: "'nin toplamı" },
                  ],
                  [
                    { type: "math", value: "a" },
                    { type: "text", value: " ile " },
                    { type: "math", value: "b" },
                    { type: "text", value: "'nin farkı" },
                  ],
                  [
                    { type: "math", value: "a" },
                    { type: "text", value: " ile " },
                    { type: "math", value: "b" },
                    { type: "text", value: "'nin çarpımı" },
                  ],
                  [
                    { type: "math", value: "a" },
                    { type: "text", value: " ile " },
                    { type: "math", value: "b" },
                    { type: "text", value: "'nin bölümü" },
                  ],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeği iki sayı üzerinde işlem yapmamızı ister. Hangi sayıların kullanılacağını bulmak için öbekteki ilişki sözlerine, özellikle de “ile”, “toplamı”, “farkı”, “çarpımı” ve “bölümü” ifadelerine bakın.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.23",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "20" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "4" },
                  { type: "text", value: "'ün farkı ⓑ " },
                  { type: "math", value: "10x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "3" },
                  { type: "text", value: "'ün bölümü" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓐ Anahtar sözcük “fark”tır; bu bize işlemin çıkarma olduğunu söyler. Çıkarılacak sayıları bulmak için öbekteki iki niceliğe bakarız.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}\\text{20 ile 4'ün farkı}\\\\20\\text{ eksi }4\\\\20-4\\end{array}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓑ Anahtar sözcük “bölüm”dür; bu bize işlemin bölme olduğunu söyler.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}\\text{10x ile 3'ün bölümü}\\\\10x\\div3\\end{array}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "text", value: "Bu ifade " },
                      { type: "math", value: "10x/3" },
                      { type: "text", value: " ya da " },
                      { type: "math", value: "\\frac{10x}{3}" },
                      { type: "text", value: " olarak da yazılabilir." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.45",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Verilen sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "47" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "41" },
                  { type: "text", value: "'in farkı ⓑ " },
                  { type: "math", value: "5x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "2" },
                  { type: "text", value: "'nin bölümü" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.46",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Verilen sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "17" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "19" },
                  { type: "text", value: "'un toplamı ⓑ " },
                  { type: "math", value: "7" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "x" },
                  { type: "text", value: "'in çarpımı" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Sekiz yıl sonra kaç yaşında olacaksınız? Bu, şimdiki yaşınızdan sekiz fazla yaştır. Şimdiki yaşınıza ",
                  },
                  { type: "math", value: "8" },
                  {
                    type: "text",
                    value:
                      " eklediniz, değil mi? “Sekiz fazla” demek, var olan niceliğe sekiz eklemek demektir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Yedi yıl önce kaç yaşındaydınız? Bu, şimdiki yaşınızdan yedi eksik yaştır. Şimdiki yaşınızdan ",
                  },
                  { type: "math", value: "7" },
                  {
                    type: "text",
                    value:
                      " çıkarırsınız. “Yedi eksik” demek, var olan nicelikten yedi çıkarmak demektir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.24",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "y" },
                  { type: "text", value: "'den sekiz fazla ⓑ " },
                  { type: "math", value: "9z" },
                  { type: "text", value: "'den yedi eksik" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓐ Anahtar söz “fazla”dır; işlem toplamadır. “Sekiz fazla”, sekizin verilen niceliğe eklendiği anlamına gelir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}y\\text{'den sekiz fazla}\\\\y\\text{'ye sekiz eklenmiş}\\\\y+8\\end{array}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓑ Anahtar söz “eksik”tir; işlem çıkarmadır. “Yedi eksik”, yedinin verilen nicelikten çıkarıldığı anlamına gelir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}9z\\text{'den yedi eksik}\\\\9z\\text{'den yedi çıkarılmış}\\\\9z-7\\end{array}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.47",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: "'ten on bir fazla ⓑ " },
                  { type: "math", value: "11a" },
                  { type: "text", value: "'dan on dört eksik" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.48",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "j" },
                  { type: "text", value: "'den " },
                  { type: "math", value: "19" },
                  { type: "text", value: " fazla ⓑ " },
                  { type: "math", value: "2x" },
                  { type: "text", value: "'ten " },
                  { type: "math", value: "21" },
                  { type: "text", value: " eksik" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.25",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Her sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "m" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "n" },
                  {
                    type: "text",
                    value: "'nin toplamının beş katı ⓑ ",
                  },
                  { type: "math", value: "m" },
                  {
                    type: "text",
                    value: "'nin beş katı ile ",
                  },
                  { type: "math", value: "n" },
                  { type: "text", value: "'nin toplamı" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓐ İki işlem sözü vardır: “katı” çarpmayı, “toplam” toplamayı gösterir. Beş ile toplamın tamamını çarptığımız için ",
                      },
                      { type: "math", value: "m" },
                      { type: "text", value: " ile " },
                      { type: "math", value: "n" },
                      {
                        type: "text",
                        value: " toplamını parantez içine almalıyız.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}\\text{m ile n'nin toplamının beş katı}\\\\5(m+n)\\end{array}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓑ Bir toplam alırken hangi iki ifadenin toplandığını buluruz. Burada ",
                      },
                      { type: "math", value: "m" },
                      {
                        type: "text",
                        value: "'nin beş katı ile ",
                      },
                      { type: "math", value: "n" },
                      { type: "text", value: " toplanıyor." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{array}{l}\\text{m'nin beş katı ile n'nin toplamı}\\\\5m+n\\end{array}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Parantez kullanımının sonucu değiştirdiğine dikkat edin. ⓐ bölümünde önce toplarız, ⓑ bölümünde ise önce çarparız.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 15,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.49",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "p" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "q" },
                  {
                    type: "text",
                    value: "'nun toplamının dört katı ⓑ ",
                  },
                  { type: "math", value: "p" },
                  {
                    type: "text",
                    value: "'nin dört katı ile ",
                  },
                  { type: "math", value: "q" },
                  { type: "text", value: "'nun toplamı" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 16,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.50",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Sözcük öbeğini cebirsel ifadeye çevirin: ⓐ ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value: "'in iki katı ile ",
                  },
                  { type: "math", value: "8" },
                  {
                    type: "text",
                    value: "'in farkı ⓑ ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "8" },
                  { type: "text", value: "'in farkının iki katı" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 17,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bu dersin ilerleyen bölümlerinde cebir becerilerimizi denklem çözmek için kullanacağız. Çoğu zaman önce bir sözcük öbeğini cebirsel ifadeye çevirerek başlayacağız. İfadenin neyi temsil ettiğini açıkça belirtmemiz gerekir. Bunu nasıl yapacağımızı sonraki iki örnekte göreceğiz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 18,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.26",
                prompt: [
                  {
                    type: "text",
                    value: "Dikdörtgen bir pencerenin yüksekliği, genişliğinden ",
                  },
                  { type: "math", value: "6" },
                  {
                    type: "text",
                    value:
                      " inç eksiktir. Pencerenin genişliğini ",
                  },
                  { type: "math", value: "w" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. Pencerenin yüksekliği için bir ifade yazın.",
                  },
                ],
                solution: [
                  {
                    type: "table",
                    columns: ["Adım", "Çeviri"],
                    rows: [
                      [
                        "Yükseklik hakkında bir sözcük öbeği yazın.",
                        "genişlikten 6 eksik",
                      ],
                      ["Genişlik yerine w yazın.", "w'den 6 eksik"],
                      [
                        "Eksik ifadesini çıkarma olarak yazın.",
                        "w'den 6 çıkarılmış",
                      ],
                      ["Sözcük öbeğini cebire çevirin.", "w-6"],
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 19,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.51",
                prompt: [
                  {
                    type: "text",
                    value: "Bir dikdörtgenin uzunluğu, genişliğinden ",
                  },
                  { type: "math", value: "5" },
                  {
                    type: "text",
                    value:
                      " inç eksiktir. Dikdörtgenin genişliğini ",
                  },
                  { type: "math", value: "w" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. Dikdörtgenin uzunluğu için bir ifade yazın.",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 20,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.52",
                prompt: [
                  {
                    type: "text",
                    value: "Bir dikdörtgenin genişliği, uzunluğundan ",
                  },
                  { type: "math", value: "2" },
                  {
                    type: "text",
                    value:
                      " metre fazladır. Dikdörtgenin uzunluğunu ",
                  },
                  { type: "math", value: "l" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. Dikdörtgenin genişliği için bir ifade yazın.",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 21,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.27",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Blanca'nın çantasında 10 sentlik ve 25 sentlik madeni paralar var. 10 sentliklerin sayısı, 25 sentliklerin sayısının ",
                  },
                  { type: "math", value: "5" },
                  { type: "text", value: " katından " },
                  { type: "math", value: "2" },
                  {
                    type: "text",
                    value:
                      " eksiktir. 25 sentliklerin sayısını ",
                  },
                  { type: "math", value: "q" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. 10 sentliklerin sayısı için bir ifade yazın.",
                  },
                ],
                solution: [
                  {
                    type: "table",
                    columns: ["Adım", "Çeviri"],
                    rows: [
                      [
                        "10 sentliklerin sayısı hakkında bir sözcük öbeği yazın.",
                        "25 sentliklerin sayısının beş katından iki eksik",
                      ],
                      [
                        "25 sentliklerin sayısı yerine q yazın.",
                        "q'nun beş katından iki eksik",
                      ],
                      ["q'nun beş katını çevirin.", "5q'dan iki eksik"],
                      ["Sözcük öbeğini cebire çevirin.", "5q-2"],
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 22,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.53",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Geoffrey'nin cebinde 10 sentlik ve 25 sentlik madeni paralar var. 10 sentliklerin sayısı, 25 sentliklerin sayısının altı katından yedi eksiktir. 25 sentliklerin sayısını ",
                  },
                  { type: "math", value: "q" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. 10 sentliklerin sayısı için bir ifade yazın.",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 23,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.54",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Lauren'ın çantasında 10 sentlik ve 5 sentlik madeni paralar var. 10 sentliklerin sayısı, 5 sentliklerin sayısının dört katından sekiz fazladır. 5 sentliklerin sayısını ",
                  },
                  { type: "math", value: "n" },
                  {
                    type: "text",
                    value:
                      " temsil etsin. 10 sentliklerin sayısı için bir ifade yazın.",
                  },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.4",
    sections: [
      {
        sectionSlug: "cikarma-islemiyle-denklem-cozme",
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
                      "Bulmaca modelimiz, bir denklemi çözmek için ne yapmamız gerektiğine dair fikir verdi. Amaç, değişkeni denklemin bir tarafında tek başına bırakmaktır. Önceki örneklerde eşitliğin çıkarma özelliğini kullandık: Bir denklemin iki tarafından da aynı niceliği çıkarırsak eşitlik bozulmaz.",
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
                    value: "İkiz kardeşler Andy ve Bobby'yi düşünün. İkisi de ",
                  },
                  { type: "math", value: "17" },
                  {
                    type: "text",
                    value: " yaşında olsun. Andy ",
                  },
                  { type: "math", value: "3" },
                  {
                    type: "text",
                    value: " yıl önce kaç yaşındaydı? ",
                  },
                  { type: "math", value: "17" },
                  {
                    type: "text",
                    value: " yaşından ",
                  },
                  { type: "math", value: "3" },
                  {
                    type: "text",
                    value: " eksikti; yani yaşı ",
                  },
                  { type: "math", value: "17-3" },
                  {
                    type: "text",
                    value: ", başka bir deyişle ",
                  },
                  { type: "math", value: "14" },
                  {
                    type: "text",
                    value:
                      " idi. Bobby de aynı şekilde 14 yaşındaydı. Yaşları şimdi eşit olduğuna göre, ikisinden de aynı miktarı çıkarmak üç yıl önce de eşit yaşlar verir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "\\begin{aligned}a&=b \\\\ a-3&=b-3\\end{aligned}",
                    display: true,
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.31",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "x+8=17" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Değişkeni yalnız bırakmak için eşitliğin çıkarma özelliğini kullanırız; iki taraftan da ",
                      },
                      { type: "math", value: "8" },
                      { type: "text", value: " çıkarırız." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x+8&=17 \\\\ x+8-8&=17-8 \\\\ x&=9\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "x=9" },
                      {
                        type: "text",
                        value: " değeri ",
                      },
                      { type: "math", value: "x+8=17" },
                      {
                        type: "text",
                        value:
                          " denklemini doğru yaptığı için denklemin çözümü ",
                      },
                      { type: "math", value: "9" },
                      { type: "text", value: "'dur." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.61",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "x+6=19" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.62",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "x+9=14" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.32",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "100=y+74" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Bir denklemi çözerken değişkeni yalnız bırakırız; değişkenin hangi tarafta olduğu önemli değildir. ",
                      },
                      { type: "math", value: "y" },
                      {
                        type: "text",
                        value: " değişkenini yalnız bırakmak için iki taraftan da ",
                      },
                      { type: "math", value: "74" },
                      { type: "text", value: " çıkarırız." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}100&=y+74 \\\\ 100-74&=y+74-74 \\\\ 26&=y\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Kontrol edersek: ",
                      },
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}100&\\stackrel{?}{=}26+74 \\\\ 100&=100\\checkmark\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      { type: "math", value: "y=26" },
                      {
                        type: "text",
                        value: " değeri denklemi doğru yaptığı için çözüm ",
                      },
                      { type: "math", value: "26" },
                      { type: "text", value: "'dır." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.63",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "95=y+67" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.64",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "91=y+45" },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "toplama-islemiyle-denklem-cozme",
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
                      "Şimdiye kadar çözdüğümüz denklemlerde, denklemin bir tarafında değişkene bir sayı eklenmişti. Değişkeni yalnız bırakmak için bu eklemeyi geri almak üzere çıkarma kullandık.",
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
                      "Peki değişkenden bir sayı çıkarılmışsa ne yaparız? Örneğin ",
                  },
                  { type: "math", value: "x-5=8" },
                  {
                    type: "text",
                    value:
                      " denklemini düşünelim. Değişkeni yalnız bırakmak için çıkarmayı geri alır, yani iki tarafa da aynı sayıyı ekleriz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bunun için eşitliğin toplama özelliğini kullanırız. Bu özellik, bir denklemin iki tarafına da aynı sayıyı eklediğimizde eşitliğin değişmediğini söyler. Çıkarma özelliğinin tam karşılığı gibi çalıştığına dikkat edin.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "17 yaşındaki ikizler Andy ve Bobby'yi hatırlayın. ",
                  },
                  {
                    type: "math",
                    value: "10",
                  },
                  {
                    type: "text",
                    value:
                      " yıl sonra Andy'nin yaşı yine Bobby'nin yaşına eşit olacaktır. İkisi de ",
                  },
                  {
                    type: "math",
                    value: "27",
                  },
                  {
                    type: "text",
                    value: " yaşında olur.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "\\begin{aligned}a&=b \\\\ a+10&=b+10\\end{aligned}",
                    display: true,
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "İki tarafa da aynı sayıyı ekleyebilir ve eşitliği koruyabiliriz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.33",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "x-5=8" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Değişkeni yalnız bırakmak için eşitliğin toplama özelliğini kullanırız; iki tarafa da ",
                      },
                      { type: "math", value: "5" },
                      { type: "text", value: " ekleriz." },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x-5&=8 \\\\ x-5+5&=8+5 \\\\ x&=13\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.65",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "x-9=13" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.66",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "y-1=3" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.34",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "27=a-16" },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value: "a",
                      },
                      {
                        type: "text",
                        value:
                          " değişkenini yalnız bırakmak için iki tarafa da ",
                      },
                      {
                        type: "math",
                        value: "16",
                      },
                      {
                        type: "text",
                        value: " ekleriz.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}27&=a-16 \\\\ 27+16&=a-16+16 \\\\ 43&=a\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value: "27=a-16",
                      },
                      {
                        type: "text",
                        value: " denkleminin çözümü ",
                      },
                      {
                        type: "math",
                        value: "a=43",
                      },
                      {
                        type: "text",
                        value: "'tür.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.67",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "19=a-18" },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.68",
                prompt: [
                  { type: "text", value: "Çözün: " },
                  { type: "math", value: "27=n-14" },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "esitligin-korunumu-cikarma",
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
                      "Denklem çözmenin bir bulmaca çözmeye nasıl benzediğini görmek için bir model kullanacağız. Zarf, içindeki sayı bilinmediği için değişkeni temsil eder; her sayaç da bir birimi temsil eder.",
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
                      "Bir masanın ortasından geçtiğini düşündüğümüz hayali bir çizgi olsun. Masanın sol tarafına üç sayaç ve bir zarf, sağ tarafına da sekiz sayaç koyuyoruz. İki tarafta da aynı sayıda sayaç var, fakat bazı sayaçlar zarfın içinde gizli. Zarfta kaç sayaç olduğunu söyleyebilir misiniz?",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "figure",
                assetId: "010-48c0b3e4b7da3bb7",
                caption: [{ type: "text", value: "Şekil 2.3" }],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Zarfta kaç sayaç olduğunu bulurken zihninizde hangi adımları izliyorsunuz? Büyük olasılıkla, iki tarafta da eşitlik bozulmadan sol taraftaki üç sayacı ve sağ taraftan da üç sayacı kaldırmayı düşünüyorsunuz. Bu işlemden sonra sağ tarafta beş sayaç kalır; demek ki zarfın içinde beş sayaç vardır.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "figure",
                assetId: "012-b22f3d320dfd26f0",
                caption: [{ type: "text", value: "Şekil 2.4" }],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bu durum hangi cebirsel denklemle modellenir? Masanın her tarafı bir ifadeyi, ortadaki çizgi de eşittir işaretini temsil eder. Zarfın içindekilere ",
                  },
                  { type: "math", value: "x" },
                  {
                    type: "text",
                    value: " diyelim. Sol taraftaki sayaç sayısı ",
                  },
                  { type: "math", value: "x+3" },
                  {
                    type: "text",
                    value: ", sağ taraftaki sayaç sayısı ise ",
                  },
                  { type: "math", value: "8" },
                  { type: "text", value: " olur. Bize " },
                  { type: "math", value: "x+3" },
                  { type: "text", value: " ifadesinin " },
                  { type: "math", value: "8" },
                  {
                    type: "text",
                    value: " değerine eşit olduğu söyleniyor; bu yüzden denklemimiz ",
                  },
                  { type: "math", value: "x+3=8" },
                  { type: "text", value: " olur." },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "figure",
                assetId: "014-2feaf77b56bfe8af",
                caption: [{ type: "text", value: "Şekil 2.5" }],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "x+3=8", display: true },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Zarfta kaç sayaç olduğunu bulmak için yaptığımız adımları şimdi cebirsel olarak yazalım.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "table",
                columns: [],
                rows: [
                  ["Önce her iki taraftan da üç çıkarırız."],
                  ["Böylece zarfta beş sayaç kaldığını görürüz."],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "Şimdi çözümümüzü kontrol edelim. Başlangıç denkleminde ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: " yerine " },
                  { type: "math", value: "5" },
                  {
                    type: "text",
                    value:
                      " yazar ve doğru bir ifade elde edip etmediğimize bakarız.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value:
                      "\\begin{aligned}x+3&=8 \\\\ 5+3&\\stackrel{?}{=}8 \\\\ 8&=8\\checkmark\\end{aligned}",
                    display: true,
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Çözümümüz doğru. Zarftaki beş sayaç ile dışarıdaki üç sayaç birlikte sekiz sayaç eder.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.59",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Zarflar ve sayaçlarla modellenen denklemi yazın, sonra denklemi çözün: Şekil dikey olarak ikiye ayrılmıştır. Sol tarafta bir zarf ve altında bir sayaç, sağ tarafta ise yedi sayaç vardır.",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 15,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.60",
                prompt: [
                  {
                    type: "text",
                    value:
                      "Zarflar ve sayaçlarla modellenen denklemi yazın, sonra denklemi çözün: Şekil dikey olarak ikiye ayrılmıştır. Sol tarafta bir zarf ve altında üç sayaç, sağ tarafta ise dört sayaç vardır.",
                  },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "denklemin-cozumunu-kontrol-etme",
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
                      "Bir denklemi çözmek, bir bulmacanın cevabını bulmaya benzer. Cebirsel denklem, iki cebirsel ifadenin birbirine eşit olduğunu söyler. Denklemi çözmek, denklemi doğru yapan değişken değerlerini belirlemektir. Denklemi doğru yapan her sayı denklemin çözümü olarak adlandırılır; bulmacanın cevabı da budur.",
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
                      "Bir denklemin çözümünü bulmak, değişkenin denklemi doğru yapan değerini bulmak demektir. ",
                  },
                  {
                    type: "math",
                    value: "x+2=7",
                  },
                  {
                    type: "text",
                    value: " denkleminin çözümünü görebiliyor musunuz? ",
                  },
                  {
                    type: "math",
                    value: "5",
                  },
                  {
                    type: "text",
                    value: " dediyseniz haklısınız. ",
                  },
                  {
                    type: "math",
                    value: "x",
                  },
                  {
                    type: "text",
                    value: " yerine ",
                  },
                  {
                    type: "math",
                    value: "5",
                  },
                  {
                    type: "text",
                    value: " yazınca doğru bir ifade elde edildiği için ",
                  },
                  {
                    type: "math",
                    value: "5",
                  },
                  {
                    type: "text",
                    value: ", ",
                  },
                  {
                    type: "math",
                    value: "x+2=7",
                  },
                  {
                    type: "text",
                    value: " denkleminin çözümüdür.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value:
                      "\\begin{aligned}x+2&=7 \\\\ 5+2&\\stackrel{?}{=}7 \\\\ 7&=7\\checkmark\\end{aligned}",
                    display: true,
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "5+2=7",
                  },
                  {
                    type: "text",
                    value: " doğru bir ifade olduğundan ",
                  },
                  {
                    type: "math",
                    value: "5",
                  },
                  {
                    type: "text",
                    value: " sayısının gerçekten bu denklemin çözümü olduğunu biliriz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "\\stackrel{?}{=}",
                  },
                  {
                    type: "text",
                    value:
                      " sembolü, denklemin sol tarafının sağ tarafına eşit olup olmadığını sorar. Sonucu bildiğimizde bu sembolü eşittir işaretine ",
                  },
                  {
                    type: "math",
                    value: "(=)",
                  },
                  {
                    type: "text",
                    value: " ya da eşit değildir işaretine ",
                  },
                  {
                    type: "math",
                    value: "(\\ne)",
                  },
                  {
                    type: "text",
                    value: " dönüştürürüz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.28",
                prompt: [
                  {
                    type: "math",
                    value: "x=5",
                  },
                  {
                    type: "text",
                    value: " değerinin ",
                  },
                  {
                    type: "math",
                    value: "6x-17=16",
                  },
                  {
                    type: "text",
                    value: " denkleminin çözümü olup olmadığını belirleyin.",
                  },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Denklemde ",
                      },
                      {
                        type: "math",
                        value: "x",
                      },
                      {
                        type: "text",
                        value: " yerine ",
                      },
                      {
                        type: "math",
                        value: "5",
                      },
                      {
                        type: "text",
                        value: " yazalım.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}6x-17&=16 \\\\ 6(5)-17&\\stackrel{?}{=}16 \\\\ 30-17&\\stackrel{?}{=}16 \\\\ 13&\\ne16\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Elde edilen ifade yanlış olduğundan ",
                      },
                      {
                        type: "math",
                        value: "x=5",
                      },
                      {
                        type: "text",
                        value: ", ",
                      },
                      {
                        type: "math",
                        value: "6x-17=16",
                      },
                      {
                        type: "text",
                        value: " denkleminin çözümü değildir.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.29",
                prompt: [
                  {
                    type: "math",
                    value: "y=2",
                  },
                  {
                    type: "text",
                    value: " değerinin ",
                  },
                  {
                    type: "math",
                    value: "6y-4=5y-2",
                  },
                  {
                    type: "text",
                    value: " denkleminin çözümü olup olmadığını belirleyin.",
                  },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Değişken denklemin iki tarafında da var. Bu yüzden her ",
                      },
                      {
                        type: "math",
                        value: "y",
                      },
                      {
                        type: "text",
                        value: " yerine ",
                      },
                      {
                        type: "math",
                        value: "2",
                      },
                      {
                        type: "text",
                        value: " yazalım.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}6y-4&=5y-2 \\\\ 6(2)-4&\\stackrel{?}{=}5(2)-2 \\\\ 12-4&\\stackrel{?}{=}10-2 \\\\ 8&=8\\checkmark\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Doğru bir denklem elde edildiği için ",
                      },
                      {
                        type: "math",
                        value: "y=2",
                      },
                      {
                        type: "text",
                        value: ", ",
                      },
                      {
                        type: "math",
                        value: "6y-4=5y-2",
                      },
                      {
                        type: "text",
                        value: " denkleminin çözümüdür.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "sozel-durumlari-denklem-ile-gosterme",
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
                      "Bir denklemin iki cebirsel ifade arasında eşittir işareti içerdiğini hatırlayın. Bu yüzden iki öbeğin eşit olduğunu söyleyen bir cümleyi denkleme çevirebiliriz. Eşittir işaretini gösteren ipucu sözcüklerini ararız. Eşittir işaretine çevrilebilecek bazı sözler şunlardır:",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              {
                type: "list",
                items: [
                  [{ type: "text", value: "eşittir" }],
                  [{ type: "text", value: "aynıdır" }],
                  [{ type: "text", value: "dır / dir" }],
                  [{ type: "text", value: "verir" }],
                  [{ type: "text", value: "idi" }],
                  [{ type: "text", value: "olacaktır" }],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Cümledeki eşitlik sözcüğünü belirlemek, iki tarafı ayrı ayrı görmeyi kolaylaştırır. Sonra eşitlik sözcüğünün solundaki öbeği bir ifadeye, sağındaki öbeği de başka bir ifadeye çevirir ve bunları eşittir işaretinin iki yanına yazarız.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Sözel cümleleri cebirsel denklemlere çevirmeye alıştırma yapacağız. Bazı cümleler değişken içermeyen temel sayı gerçekleri olacak. Bazıları ise değişkenli denklemlere dönüşecek. Şimdilik amacımız yalnızca sözcükleri cebire çevirmektir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.35",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "6" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "9" },
                  { type: "text", value: "'un toplamı " },
                  { type: "math", value: "15" },
                  { type: "text", value: "'tir." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "“...tir” sözü eşitliği gösterir; eşittir işareti toplam öbeği ile 15 arasına gelir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}\\text{6 ile 9'un toplamı} &= 15\\\\6+9&=15\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.69",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "7" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "6" },
                  { type: "text", value: "'nın toplamı " },
                  { type: "math", value: "13" },
                  { type: "text", value: " verir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.70",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "8" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "6" },
                  { type: "text", value: "'nın toplamı " },
                  { type: "math", value: "14" },
                  { type: "text", value: "'tür." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.36",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "8" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "7" },
                  { type: "text", value: "'nin çarpımı " },
                  { type: "math", value: "56" },
                  { type: "text", value: "'dır." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "“...dır” sözü eşitliği gösterir; eşittir işareti çarpım öbeği ile 56 arasına gelir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}\\text{8 ile 7'nin çarpımı} &= 56\\\\8\\cdot7&=56\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.71",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "6" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "9" },
                  { type: "text", value: "'un çarpımı " },
                  { type: "math", value: "54" },
                  { type: "text", value: "'tür." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.72",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "21" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "3" },
                  { type: "text", value: "'ün çarpımı " },
                  { type: "math", value: "63" },
                  { type: "text", value: " verir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.37",
                prompt: [
                  {
                    type: "text",
                    value: "Cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "3" },
                  { type: "text", value: "'ün farkının iki katı " },
                  { type: "math", value: "18" },
                  { type: "text", value: " verir." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "“Verir” sözü eşitliği gösterir. “İki katı” çarpmayı, “fark” ise çıkarma işlemini gösterir. Önce farkı parantez içinde yazarız.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}\\text{x ile 3'ün farkı} &= x-3\\\\\\text{bu farkın iki katı} &= 2(x-3)\\\\2(x-3)&=18\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.73",
                prompt: [
                  {
                    type: "text",
                    value: "Verilen cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "5" },
                  { type: "text", value: "'in farkının iki katı " },
                  { type: "math", value: "30" },
                  { type: "text", value: " verir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.74",
                prompt: [
                  {
                    type: "text",
                    value: "Verilen cümleyi cebirsel denkleme çevirin: ",
                  },
                  { type: "math", value: "y" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "4" },
                  { type: "text", value: "'ün farkının iki katı " },
                  { type: "math", value: "16" },
                  { type: "text", value: " verir." },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "denklem-kurma-ve-cozme",
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
                      "Şimdi cümleleri cebirsel denklemlere çevirip sonra bu denklemleri çözmeye çalışalım. Denklemleri eşitliğin çıkarma ve toplama özelliklerini kullanarak çözeceğiz.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.38",
                prompt: [
                  {
                    type: "text",
                    value: "Çevirin ve çözün: ",
                  },
                  { type: "math", value: "x" },
                  { type: "text", value: "'ten üç fazla " },
                  { type: "math", value: "47" },
                  { type: "text", value: "'ye eşittir." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "Cümleyi denkleme çevirelim. “Üç fazla” ifadesi değişkene 3 eklemeyi, “eşittir” sözü de eşittir işaretini gösterir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}x+3&=47\\\\x+3-3&=47-3\\\\x&=44\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Kontrol edersek ",
                      },
                      { type: "math", value: "44+3=47" },
                      {
                        type: "text",
                        value: " doğru olduğundan çözüm ",
                      },
                      { type: "math", value: "x=44" },
                      { type: "text", value: "'tür." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.75",
                prompt: [
                  { type: "text", value: "Çevirin ve çözün: " },
                  { type: "math", value: "x" },
                  { type: "text", value: "'ten yedi fazla " },
                  { type: "math", value: "37" },
                  { type: "text", value: "'ye eşittir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.76",
                prompt: [
                  { type: "text", value: "Çevirin ve çözün: " },
                  { type: "math", value: "y" },
                  { type: "text", value: "'den on bir fazla " },
                  { type: "math", value: "28" },
                  { type: "text", value: "'e eşittir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.39",
                prompt: [
                  {
                    type: "text",
                    value: "Çevirin ve çözün: ",
                  },
                  { type: "math", value: "y" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "14" },
                  { type: "text", value: "'ün farkı " },
                  { type: "math", value: "18" },
                  { type: "text", value: "'dir." },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "“Fark” çıkarma işlemini, “...dir” sözü eşitliği gösterir. Cümleyi denkleme çevirip iki tarafa da 14 ekleyelim.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "math",
                        value:
                          "\\begin{aligned}y-14&=18\\\\y-14+14&=18+14\\\\y&=32\\end{aligned}",
                        display: true,
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value: "Kontrol edersek ",
                      },
                      { type: "math", value: "32-14=18" },
                      {
                        type: "text",
                        value: " doğru olduğundan çözüm ",
                      },
                      { type: "math", value: "y=32" },
                      { type: "text", value: "'dir." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.77",
                prompt: [
                  { type: "text", value: "Çevirin ve çözün: " },
                  { type: "math", value: "z" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "17" },
                  { type: "text", value: "'nin farkı " },
                  { type: "math", value: "37" },
                  { type: "text", value: "'ye eşittir." },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.78",
                prompt: [
                  { type: "text", value: "Çevirin ve çözün: " },
                  { type: "math", value: "x" },
                  { type: "text", value: " ile " },
                  { type: "math", value: "19" },
                  { type: "text", value: "'un farkı " },
                  { type: "math", value: "45" },
                  { type: "text", value: "'e eşittir." },
                ],
                solution: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.5",
    sections: [
      {
        sectionSlug: "kat-kavrami-ve-katlari-belirleme",
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
                      "Annie dolabındaki ayakkabıları sayıyor. Ayakkabılar çiftler halinde durduğu için her birini tek tek sayması gerekmiyor. İkişer ikişer sayıyor: ",
                  },
                  {
                    type: "math",
                    value: "2,4,6,8,10,12",
                  },
                  {
                    type: "text",
                    value: ". Dolabında ",
                  },
                  {
                    type: "math",
                    value: "12",
                  },
                  {
                    type: "text",
                    value: " ayakkabı var.",
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
                    type: "math",
                    value: "2,4,6,8,10,12",
                  },
                  {
                    type: "text",
                    value: " sayıları ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'nin katlarıdır. ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value:
                      "'nin katları, bir sayma sayısı ile ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value:
                      "'nin çarpımı olarak yazılabilir. İlk altı kat aşağıda gösterilmiştir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bir sayının katı, o sayı ile bir sayma sayısının çarpımıdır. Örneğin ",
                  },
                  {
                    type: "math",
                    value: "3",
                  },
                  {
                    type: "text",
                    value: "'ün katı, bir sayma sayısı ile ",
                  },
                  {
                    type: "math",
                    value: "3",
                  },
                  {
                    type: "text",
                    value: "'ün çarpımıdır. Aşağıda ",
                  },
                  {
                    type: "math",
                    value: "3",
                  },
                  {
                    type: "text",
                    value: "'ün ilk altı katı verilmiştir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value:
                      "Bu işlemi sürdürerek herhangi bir sayının katlarını bulabiliriz. Tablo 2.8, ilk on iki sayma sayısı için ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'den ",
                  },
                  {
                    type: "math",
                    value: "9",
                  },
                  {
                    type: "text",
                    value: "'a kadar olan sayıların katlarını gösterir.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "table",
                columns: [
                  "Sayma Sayısı",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ],
                rows: [
                  [
                    "2'nin katları",
                    "2",
                    "4",
                    "6",
                    "8",
                    "10",
                    "12",
                    "14",
                    "16",
                    "18",
                    "20",
                    "22",
                    "24",
                  ],
                  [
                    "3'ün katları",
                    "3",
                    "6",
                    "9",
                    "12",
                    "15",
                    "18",
                    "21",
                    "24",
                    "27",
                    "30",
                    "33",
                    "36",
                  ],
                  [
                    "4'ün katları",
                    "4",
                    "8",
                    "12",
                    "16",
                    "20",
                    "24",
                    "28",
                    "32",
                    "36",
                    "40",
                    "44",
                    "48",
                  ],
                  [
                    "5'in katları",
                    "5",
                    "10",
                    "15",
                    "20",
                    "25",
                    "30",
                    "35",
                    "40",
                    "45",
                    "50",
                    "55",
                    "60",
                  ],
                  [
                    "6'nın katları",
                    "6",
                    "12",
                    "18",
                    "24",
                    "30",
                    "36",
                    "42",
                    "48",
                    "54",
                    "60",
                    "66",
                    "72",
                  ],
                  [
                    "7'nin katları",
                    "7",
                    "14",
                    "21",
                    "28",
                    "35",
                    "42",
                    "49",
                    "56",
                    "63",
                    "70",
                    "77",
                    "84",
                  ],
                  [
                    "8'in katları",
                    "8",
                    "16",
                    "24",
                    "32",
                    "40",
                    "48",
                    "56",
                    "64",
                    "72",
                    "80",
                    "88",
                    "96",
                  ],
                  [
                    "9'un katları",
                    "9",
                    "18",
                    "27",
                    "36",
                    "45",
                    "54",
                    "63",
                    "72",
                    "81",
                    "90",
                    "99",
                    "108",
                  ],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "math",
                    value: "2,5,10",
                  },
                  {
                    type: "text",
                    value: " ve ",
                  },
                  {
                    type: "math",
                    value: "3",
                  },
                  {
                    type: "text",
                    value:
                      "'ün katlarındaki örüntüleri fark etmek, ders boyunca işinizi kolaylaştıracaktır.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              p([
                t("Şekil 2.6, "),
                m("1"),
                t(" ile "),
                m("50"),
                t(" arasındaki sayma sayılarını gösterir. "),
                m("2"),
                t("'nin katları vurgulanmıştır. Bir örüntü fark ediyor musunuz?"),
              ]),
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "figure",
                assetId: "000-0f70eee58f280cb3",
                caption: [
                  t("Şekil 2.6 "),
                  m("1"),
                  t(" ile "),
                  m("50"),
                  t(" arasındaki "),
                  m("2"),
                  t("'nin katları"),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "paragraph",
                text: [
                  {
                    type: "text",
                    value: "Şekil 2.6'da vurgulanan her sayının son basamağı ",
                  },
                  {
                    type: "math",
                    value: "0,2,4,6",
                  },
                  {
                    type: "text",
                    value: " veya ",
                  },
                  {
                    type: "math",
                    value: "8",
                  },
                  {
                    type: "text",
                    value:
                      "'dir. Bu durum ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value:
                      " ile herhangi bir sayma sayısının çarpımı için geçerlidir. Bu yüzden bir sayının ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value:
                      "'nin katı olup olmadığını anlamak için son basamağına bakarız. Son basamak ",
                  },
                  {
                    type: "math",
                    value: "0,2,4,6",
                  },
                  {
                    type: "text",
                    value: " veya ",
                  },
                  {
                    type: "math",
                    value: "8",
                  },
                  {
                    type: "text",
                    value: " ise sayı ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'nin katıdır.",
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.40",
                prompt: [
                  {
                    type: "text",
                    value: "Aşağıdakilerin ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'nin katı olup olmadığını belirleyin: ⓐ ",
                  },
                  {
                    type: "math",
                    value: "489",
                  },
                  {
                    type: "text",
                    value: " ⓑ ",
                  },
                  {
                    type: "math",
                    value: "3.714",
                  },
                ],
                solution: [
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓐ 489'un son basamağı 9'dur. Son basamak 0, 2, 4, 6 veya 8 olmadığı için 489, ",
                      },
                      {
                        type: "math",
                        value: "2",
                      },
                      {
                        type: "text",
                        value: "'nin katı değildir.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    text: [
                      {
                        type: "text",
                        value:
                          "ⓑ 3.714'ün son basamağı 4'tür. Son basamak 0, 2, 4, 6 veya 8 olduğu için 3.714, ",
                      },
                      {
                        type: "math",
                        value: "2",
                      },
                      {
                        type: "text",
                        value: "'nin katıdır.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.79",
                prompt: [
                  {
                    type: "text",
                    value: "Her sayının ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'nin katı olup olmadığını belirleyin: ⓐ ",
                  },
                  {
                    type: "math",
                    value: "678",
                  },
                  {
                    type: "text",
                    value: " ⓑ ",
                  },
                  {
                    type: "math",
                    value: "21.493",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 14,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.80",
                prompt: [
                  {
                    type: "text",
                    value: "Her sayının ",
                  },
                  {
                    type: "math",
                    value: "2",
                  },
                  {
                    type: "text",
                    value: "'nin katı olup olmadığını belirleyin: ⓐ ",
                  },
                  {
                    type: "math",
                    value: "979",
                  },
                  {
                    type: "text",
                    value: " ⓑ ",
                  },
                  {
                    type: "math",
                    value: "17.780",
                  },
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 15,
            blocks: [
              p([
                t("Şimdi "),
                m("5"),
                t("'in katlarına bakalım. Şekil 2.7, "),
                m("1"),
                t(" ile "),
                m("50"),
                t(" arasındaki "),
                m("5"),
                t("'in katlarını vurgular. "),
                m("5"),
                t("'in katlarıyla ilgili ne fark ediyorsunuz?"),
              ]),
            ],
          },
          {
            sourceBlockIndex: 16,
            blocks: [
              {
                type: "figure",
                assetId: "002-739a8813f29dddb0",
                caption: [
                  t("Şekil 2.7 "),
                  m("1"),
                  t(" ile "),
                  m("50"),
                  t(" arasındaki "),
                  m("5"),
                  t("'in katları"),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 17,
            blocks: [
              p([
                m("5"),
                t("'in tüm katları "),
                m("5"),
                t(" veya "),
                m("0"),
                t(" ile biter. "),
                m("2"),
                t("'nin katlarını son basamağa bakarak belirlediğimiz gibi, "),
                m("5"),
                t("'in katlarını da son basamağa bakarak belirleyebiliriz."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 18,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.41",
                prompt: [
                  t("Aşağıdakilerin "),
                  m("5"),
                  t("'in katı olup olmadığını belirleyin: ⓐ "),
                  m("579"),
                  t(" ⓑ "),
                  m("880"),
                ],
                solution: [
                  p([
                    t("ⓐ "),
                    m("579"),
                    t("'un son basamağı "),
                    m("5"),
                    t(" veya "),
                    m("0"),
                    t(" değildir. Bu nedenle "),
                    m("579"),
                    t(", "),
                    m("5"),
                    t("'in katı değildir."),
                  ]),
                  p([
                    t("ⓑ "),
                    m("880"),
                    t("'in son basamağı "),
                    m("0"),
                    t(" olduğu için "),
                    m("880"),
                    t(", "),
                    m("5"),
                    t("'in katıdır."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 19,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.81",
                prompt: [
                  t("Her sayının "),
                  m("5"),
                  t("'in katı olup olmadığını belirleyin: ⓐ "),
                  m("675"),
                  t(" ⓑ "),
                  m("1.578"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 20,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.82",
                prompt: [
                  t("Her sayının "),
                  m("5"),
                  t("'in katı olup olmadığını belirleyin: ⓐ "),
                  m("421"),
                  t(" ⓑ "),
                  m("2.690"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 21,
            blocks: [
              p([
                t("Şekil 2.8, "),
                m("1"),
                t(" ile "),
                m("50"),
                t(" arasındaki "),
                m("10"),
                t("'un katlarını vurgular. "),
                m("10"),
                t("'un tüm katları sıfır ile biter."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 22,
            blocks: [
              {
                type: "figure",
                assetId: "004-a24bc5bbdf112687",
                caption: [
                  t("Şekil 2.8 "),
                  m("1"),
                  t(" ile "),
                  m("50"),
                  t(" arasındaki "),
                  m("10"),
                  t("'un katları"),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 23,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.42",
                prompt: [
                  t("Aşağıdakilerin "),
                  m("10"),
                  t("'un katı olup olmadığını belirleyin: ⓐ "),
                  m("425"),
                  t(" ⓑ "),
                  m("350"),
                ],
                solution: [
                  p([
                    t("ⓐ "),
                    m("425"),
                    t("'in son basamağı sıfır değildir; bu nedenle "),
                    m("425"),
                    t(", "),
                    m("10"),
                    t("'un katı değildir."),
                  ]),
                  p([
                    t("ⓑ "),
                    m("350"),
                    t("'nin son basamağı sıfırdır; bu nedenle "),
                    m("350"),
                    t(", "),
                    m("10"),
                    t("'un katıdır."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 24,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.83",
                prompt: [
                  t("Her sayının "),
                  m("10"),
                  t("'un katı olup olmadığını belirleyin: ⓐ "),
                  m("179"),
                  t(" ⓑ "),
                  m("3.540"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 25,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.84",
                prompt: [
                  t("Her sayının "),
                  m("10"),
                  t("'un katı olup olmadığını belirleyin: ⓐ "),
                  m("110"),
                  t(" ⓑ "),
                  m("7.595"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 26,
            blocks: [
              p([
                t("Şekil 2.9, "),
                m("3"),
                t("'ün katlarını vurgular. "),
                m("3"),
                t("'ün katlarındaki örüntü, "),
                m("2"),
                t(", "),
                m("5"),
                t(" ve "),
                m("10"),
                t("'un katlarındaki örüntüler kadar açık değildir."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 27,
            blocks: [
              {
                type: "figure",
                assetId: "006-2eabce1a9328161c",
                caption: [
                  t("Şekil 2.9 "),
                  m("1"),
                  t(" ile "),
                  m("50"),
                  t(" arasındaki "),
                  m("3"),
                  t("'ün katları"),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 28,
            blocks: [
              p([
                t("Buradaki örüntü son basamağa bağlı değildir. "),
                m("3"),
                t("'ün katları için rakamlar toplamına bakarız; tablo bu ilişkiyi gösterir."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 30,
            blocks: [
              p([
                m("42"),
                t(" sayısını düşünelim. Rakamları "),
                m("4"),
                t(" ve "),
                m("2"),
                t("'dir; toplamları "),
                m("4+2=6"),
                t("'dır. "),
                m("6"),
                t(", "),
                m("3"),
                t("'ün katı olduğu için "),
                m("42"),
                t(" de "),
                m("3"),
                t("'ün katıdır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 31,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.43",
                prompt: [
                  t("Verilen sayıların "),
                  m("3"),
                  t("'ün katı olup olmadığını belirleyin: ⓐ "),
                  m("645"),
                  t(" ⓑ "),
                  m("10.519"),
                ],
                solution: [
                  p([
                    t("ⓐ "),
                    m("645"),
                    t(" için rakamlar toplamı "),
                    m("6+4+5=15"),
                    t("'tir. "),
                    m("15"),
                    t(", "),
                    m("3"),
                    t("'ün katı olduğundan "),
                    m("645"),
                    t(" de "),
                    m("3"),
                    t("'ün katıdır."),
                  ]),
                  p([
                    t("ⓑ "),
                    m("10.519"),
                    t(" için rakamlar toplamı "),
                    m("1+0+5+1+9=16"),
                    t("'dır. "),
                    m("16"),
                    t(", "),
                    m("3"),
                    t("'ün katı olmadığından "),
                    m("10.519"),
                    t(" de "),
                    m("3"),
                    t("'ün katı değildir."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 32,
            blocks: [
              p([
                m("10.519"),
                t("'u "),
                m("3"),
                t("'e böldüğümüzde bir sayma sayısı elde etmeyiz. Bu yüzden "),
                m("10.519"),
                t(", bir sayma sayısı ile "),
                m("3"),
                t("'ün çarpımı değildir; yani "),
                m("3"),
                t("'ün katı değildir."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 33,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.85",
                prompt: [
                  t("Her sayının "),
                  m("3"),
                  t("'ün katı olup olmadığını belirleyin: ⓐ "),
                  m("954"),
                  t(" ⓑ "),
                  m("3.742"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 34,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.86",
                prompt: [
                  t("Her sayının "),
                  m("3"),
                  t("'ün katı olup olmadığını belirleyin: ⓐ "),
                  m("643"),
                  t(" ⓑ "),
                  m("8.379"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 35,
            blocks: [
              p([
                m("2"),
                t(", "),
                m("5"),
                t(" ve "),
                m("10"),
                t(" katları için oluşturduğunuz çizelgelere tekrar bakın. "),
                m("10"),
                t("'un katları hem "),
                m("2"),
                t("'nin hem de "),
                m("5"),
                t("'in katı olan sayılardır; çünkü "),
                m("10=2\\cdot5"),
                t("'tir. Benzer biçimde "),
                m("6=2\\cdot3"),
                t(" olduğundan, "),
                m("6"),
                t("'nın katları hem "),
                m("2"),
                t("'nin hem de "),
                m("3"),
                t("'ün katı olan sayılardır."),
              ]),
            ],
          },
        ],
      },
      {
        sectionSlug: "bolunebilme-kurallari",
        replaceBlocks: [
          {
            sourceBlockIndex: 1,
            blocks: [
              p([
                t("Bir sayının "),
                m("3"),
                t("'e bölünebilir olduğunu söylemek, o sayının "),
                m("3"),
                t("'ün katı olduğunu söylemenin başka bir yoludur. Örnek 2.43'te "),
                m("10.519"),
                t("'un "),
                m("3"),
                t("'ün katı olmadığını gördük. "),
                m("10.519"),
                t("'u "),
                m("3"),
                t("'e böldüğümüzde bir sayma sayısı elde etmediğimiz için "),
                m("10.519"),
                t(", "),
                m("3"),
                t("'e bölünebilir değildir."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              p([
                t("Çarpma ve bölme ters işlemler olduğundan, bulduğumuz kat örüntülerini bölünebilme testleri olarak kullanabiliriz. Tablo 2.10, "),
                m("1"),
                t(" ile "),
                m("10"),
                t(" arasındaki bazı sayma sayıları için bölünebilme testlerini özetler."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "table",
                columns: ["Bölünebilme Testleri"],
                rows: [
                  ["Bir sayı şu sayıya bölünebilir", "Test"],
                  ["2", "Son basamak 0, 2, 4, 6 veya 8 ise"],
                  ["3", "Rakamlar toplamı 3'e bölünebiliyorsa"],
                  ["5", "Son basamak 5 veya 0 ise"],
                  ["6", "Hem 2'ye hem de 3'e bölünebiliyorsa"],
                  ["10", "Son basamak 0 ise"],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.44",
                prompt: [
                  m("1.290"),
                  t(" sayısının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin."),
                ],
                solution: [
                  p([
                    m("1.290"),
                    t("'ın son basamağı "),
                    m("0"),
                    t(" olduğu için "),
                    m("2"),
                    t(", "),
                    m("5"),
                    t(" ve "),
                    m("10"),
                    t("'a bölünebilir. Rakamlar toplamı "),
                    m("1+2+9+0=12"),
                    t(" ve "),
                    m("12"),
                    t(", "),
                    m("3"),
                    t("'e bölünebildiği için "),
                    m("1.290"),
                    t(" aynı zamanda "),
                    m("3"),
                    t("'e de bölünebilir."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              p([
                t("Böylece "),
                m("1.290"),
                t(" sayısının "),
                m("2,3,5"),
                t(" ve "),
                m("10"),
                t("'a bölünebildiğini görürüz."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.87",
                prompt: [
                  t("Verilen sayının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin: "),
                  m("6240"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.88",
                prompt: [
                  t("Verilen sayının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin: "),
                  m("7248"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.45",
                prompt: [
                  m("5.625"),
                  t(" sayısının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin."),
                ],
                solution: [
                  p([
                    m("5.625"),
                    t("'in son basamağı "),
                    m("5"),
                    t(" olduğu için sayı "),
                    m("5"),
                    t("'e bölünebilir; ancak son basamak çift veya "),
                    m("0"),
                    t(" olmadığı için "),
                    m("2"),
                    t(" ve "),
                    m("10"),
                    t("'a bölünemez. Rakamlar toplamı "),
                    m("5+6+2+5=18"),
                    t(" olduğundan ve "),
                    m("18"),
                    t(", "),
                    m("3"),
                    t("'e bölünebildiğinden sayı "),
                    m("3"),
                    t("'e de bölünebilir."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 9,
            blocks: [
              p([
                t("Dolayısıyla "),
                m("5.625"),
                t(" sayısı "),
                m("3"),
                t(" ve "),
                m("5"),
                t("'e bölünebilir; "),
                m("2"),
                t(" veya "),
                m("10"),
                t("'a bölünemez."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.89",
                prompt: [
                  t("Verilen sayının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin: "),
                  m("4962"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.90",
                prompt: [
                  t("Verilen sayının "),
                  m("2,3,5"),
                  t(" ve "),
                  m("10"),
                  t("'a bölünüp bölünmediğini belirleyin: "),
                  m("3765"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "dogal-sayilarin-carpanlarini-bulma",
        replaceBlocks: [
          {
            sourceBlockIndex: 1,
            blocks: [
              p([
                t("Aynı fikri anlatmanın çoğu zaman birkaç yolu vardır. Eğer "),
                m("m"),
                t(", "),
                m("n"),
                t("'nin katıysa, "),
                m("m"),
                t("'nin "),
                m("n"),
                t("'ye bölünebilir olduğunu da söyleyebiliriz. "),
                m("72=8\\cdot9"),
                t(" olduğundan "),
                m("72"),
                t(", hem "),
                m("8"),
                t("'in hem de "),
                m("9"),
                t("'un katıdır; aynı zamanda "),
                m("8"),
                t(" ve "),
                m("9"),
                t(", "),
                m("72"),
                t("'nin çarpanlarıdır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              p([
                t("Diyagramda "),
                m("8\\cdot9=72"),
                t(" eşitliği gösterilir. "),
                m("8"),
                t(" ve "),
                m("9"),
                t(" çarpan, "),
                m("72"),
                t(" ise çarpım olarak etiketlenir."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              p([
                t("Cebirde bir sayının tüm çarpanlarını belirlemek yararlıdır. Buna sayıyı çarpanlarına ayırmak denir ve birçok problem türünü çözmemize yardımcı olur."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              p([
                t("Örneğin bir koreografın bale gösterisi için bir dans hazırladığını düşünelim. "),
                m("24"),
                t(" dansçı vardır ve koreograf belirli bir sahnede dansçıları eşit büyüklükte gruplar halinde yerleştirmek ister."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              p([
                t("Dansçılar eşit büyüklükte kaç farklı şekilde gruplandırılabilir? Bu soruyu yanıtlamak, "),
                m("24"),
                t("'ün çarpanlarını belirlemekle aynıdır. Tablo 2.13, koreografın dansçıları düzenleyebileceği farklı yolları özetler."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              {
                type: "table",
                columns: ["Grup Sayısı", "Gruptaki Dansçı Sayısı", "Toplam Dansçı"],
                rows: [
                  ["1", "24", "1\\cdot24=24"],
                  ["2", "12", "2\\cdot12=24"],
                  ["3", "8", "3\\cdot8=24"],
                  ["4", "6", "4\\cdot6=24"],
                  ["6", "4", "6\\cdot4=24"],
                  ["8", "3", "8\\cdot3=24"],
                  ["12", "2", "12\\cdot2=24"],
                  ["24", "1", "24\\cdot1=24"],
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              p([
                t("Tablo 2.13'te hangi örüntüleri görüyorsunuz? Grup sayısı ile gruptaki dansçı sayısının çarpımının her zaman "),
                m("24"),
                t(" olduğuna dikkat ettiniz mi? Bu doğaldır, çünkü toplamda her zaman "),
                m("24"),
                t(" dansçı vardır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              p([
                t("İlk iki sütuna dikkatle bakarsanız başka bir örüntü görürsünüz. Bu sütunlar aynı sayı kümesini ters sırada içerir. Birbirinin aynası gibidirler ve ikisi birlikte "),
                m("24"),
                t("'ün tüm çarpanlarını listeler:"),
              ]),
            ],
          },
          {
            sourceBlockIndex: 10,
            blocks: [
              p([
                t("Herhangi bir sayma sayısının tüm çarpanlarını bulmak için sayıyı sistemli olarak "),
                m("1"),
                t("'den başlayarak sayma sayılarına böleriz. Bölüm de bir sayma sayısıysa, bölen ve bölüm o sayının çarpan çiftidir. Bölüm bölen sayıdan küçük olduğunda durabiliriz; sonrasında aynı çarpan çiftleri ters sırada tekrar eder."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 11,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.46",
                prompt: [m("72"), t("'nin tüm çarpanlarını bulun.")],
                solution: [
                  p([
                    m("72"),
                    t("'yi "),
                    m("1"),
                    t("'den başlayarak sayma sayılarına böleriz. Bölüm bir tam sayı olduğunda bölen ve bölüm bir çarpan çiftidir."),
                  ]),
                  p([
                    t("Çarpanları küçükten büyüğe sıralarsak şunları elde ederiz: "),
                    m("1,2,3,4,6,8,9,12,18,24,36,\\text{ ve }72"),
                    t("."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 12,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.91",
                prompt: [t("Verilen sayının tüm çarpanlarını bulun: "), m("96")],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 13,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.92",
                prompt: [t("Verilen sayının tüm çarpanlarını bulun: "), m("80")],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "asal-ve-bilesik-sayilar",
        replaceBlocks: [
          {
            sourceBlockIndex: 1,
            blocks: [
              p([
                t("Bazı sayıların, örneğin "),
                m("72"),
                t("'nin, birçok çarpanı vardır. "),
                m("7"),
                t(" gibi bazı sayıların ise yalnızca iki çarpanı vardır: "),
                m("1"),
                t(" ve sayının kendisi. Yalnızca iki çarpanı olan sayıya asal sayı denir. İkiden fazla çarpanı olan sayıya bileşik sayı denir. "),
                m("1"),
                t(" ne asal ne de bileşik sayıdır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 2,
            blocks: [
              p([
                t("Şekil 2.10, "),
                m("2"),
                t("'den "),
                m("20"),
                t("'ye kadar sayma sayılarını çarpanlarıyla birlikte listeler. Vurgulanan sayılar asaldır; çünkü her birinin yalnızca iki çarpanı vardır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 3,
            blocks: [
              {
                type: "figure",
                assetId: "010-7540c720ed4ebe61",
                caption: [
                  t("Şekil 2.10 "),
                  m("2"),
                  t("'den "),
                  m("20"),
                  t("'ye kadar sayma sayılarının çarpanları; asal sayılar vurgulanmıştır."),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 4,
            blocks: [
              p([
                m("20"),
                t("'den küçük asal sayılar "),
                m("2,3,5,7,11,13,17"),
                t(" ve "),
                m("19"),
                t("'dur. Daha büyük birçok asal sayı da vardır. Bir sayının asal mı bileşik mi olduğunu belirlemek için "),
                m("1"),
                t(" ve kendisi dışında çarpanı olup olmadığını kontrol ederiz. Bunun için küçük asal sayıları sırayla deneyebiliriz."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 5,
            blocks: [
              {
                type: "example",
                label: "Örnek 2.47",
                prompt: [
                  t("Her sayının asal mı bileşik mi olduğunu belirleyin: ⓐ "),
                  m("83"),
                  t(" ⓑ "),
                  m("77"),
                ],
                solution: [
                  p([
                    t("ⓐ "),
                    m("83"),
                    t(" sayısı "),
                    m("2,3,5,7"),
                    t(" veya "),
                    m("11"),
                    t(" ile bölünmez. Bu nedenle yalnızca "),
                    m("1"),
                    t(" ve "),
                    m("83"),
                    t(" çarpanlarına sahiptir; asal sayıdır."),
                  ]),
                  p([
                    t("ⓑ "),
                    m("77=7\\cdot11"),
                    t(" olduğundan "),
                    m("77"),
                    t("'nin "),
                    m("1"),
                    t(" ve kendisi dışında çarpanları vardır; bileşik sayıdır."),
                  ]),
                ],
              },
            ],
          },
          {
            sourceBlockIndex: 6,
            blocks: [
              p([
                m("77"),
                t(", "),
                m("7"),
                t("'ye bölünebildiği için asal sayı değildir. Bileşik sayıdır."),
              ]),
            ],
          },
          {
            sourceBlockIndex: 7,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.93",
                prompt: [
                  t("Sayının asal mı bileşik mi olduğunu belirleyin: "),
                  m("91"),
                ],
                solution: [],
              },
            ],
          },
          {
            sourceBlockIndex: 8,
            blocks: [
              {
                type: "example",
                label: "Sıra Sizde 2.94",
                prompt: [
                  t("Sayının asal mı bileşik mi olduğunu belirleyin: "),
                  m("137"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.6",
    sections: [
      {
        sectionSlug: "asal-carpanlara-ayirma",
        replaceBlocks: [
          ...removeBlocks(3),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Önceki derste bir sayının çarpanlarını bulduk. Asal sayıların yalnızca iki çarpanı vardır: 1 ve sayının kendisi. Bileşik sayıların ise ikiden fazla çarpanı vardır ve her bileşik sayı asal sayıların çarpımı olarak tek bir biçimde yazılabilir. Buna sayının asal çarpanlara ayrılması denir.",
              ),
              pt(
                "Asal çarpanlara ayırma, sonraki konularda özellikle kesirlerle işlem yaparken ve ortak kat bulurken işe yarar.",
              ),
              p([
                t("Bu derste çalışırken 50'den küçük asal sayıları hatırlamak yararlı olur: "),
                m("2,3,5,7,11,13,17,19,23,29,31,37,41,43,47"),
                t("."),
              ]),
            ],
          },
        ],
      },
      {
        sectionSlug: "carpan-agaci-yontemi",
        replaceBlocks: [
          ...removeBlocks(20),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir sayıyı asal çarpanlarına ayırmanın yollarından biri çarpan ağacı oluşturmaktır. Sayıyı iki çarpanın çarpımı olarak yazar, asal olmayan çarpanları aynı şekilde ayırmaya devam ederiz.",
              ),
              pt(
                "Bir dal asal sayıyla bittiğinde o dal tamamlanır. Bütün dallar asal sayılarla bittiğinde, elde edilen asal sayıların çarpımı başlangıçtaki sayının asal çarpanlara ayrılmış biçimidir.",
              ),
              p([
                t("Örneğin "),
                m("36"),
                t(" için "),
                m("36=3\\cdot12"),
                t(", "),
                m("12=3\\cdot4"),
                t(" ve "),
                m("4=2\\cdot2"),
                t(" yazabiliriz. Böylece "),
                m("36=2\\cdot2\\cdot3\\cdot3=2^{2}\\cdot3^{2}"),
                t(" olur."),
              ]),
              {
                type: "example",
                label: "Örnek 2.48",
                prompt: [
                  m("48"),
                  t(" sayısını çarpan ağacı yöntemiyle asal çarpanlarına ayırın."),
                ],
                solution: [
                  p([
                    t("Bir çarpan çiftiyle başlayalım: "),
                    m("48=2\\cdot24"),
                    t(". "),
                    m("2"),
                    t(" asal olduğu için tamamlanır; "),
                    m("24"),
                    t(" ise bileşiktir."),
                  ]),
                  p([
                    m("24=4\\cdot6"),
                    t(", "),
                    m("4=2\\cdot2"),
                    t(" ve "),
                    m("6=2\\cdot3"),
                    t(" olduğundan asal çarpanlar "),
                    m("2,2,2,2,3"),
                    t("'tür."),
                  ]),
                  p([
                    t("Bu nedenle "),
                    m("48=2\\cdot2\\cdot2\\cdot2\\cdot3=2^{4}\\cdot3"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.95",
                prompt: [
                  t("Çarpan ağacı yöntemiyle asal çarpanlarına ayırın: "),
                  m("80"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.96",
                prompt: [
                  t("Çarpan ağacı yöntemiyle asal çarpanlarına ayırın: "),
                  m("60"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Örnek 2.49",
                prompt: [
                  m("84"),
                  t(" sayısını çarpan ağacı yöntemiyle asal çarpanlarına ayırın."),
                ],
                solution: [
                  p([
                    t("Önce "),
                    m("84=4\\cdot21"),
                    t(" yazabiliriz. Sonra "),
                    m("4=2\\cdot2"),
                    t(" ve "),
                    m("21=3\\cdot7"),
                    t(" olarak ayrılır."),
                  ]),
                  p([
                    t("Bütün çarpanlar asal olduğundan "),
                    m("84=2\\cdot2\\cdot3\\cdot7=2^{2}\\cdot3\\cdot7"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.97",
                prompt: [
                  t("Çarpan ağacı yöntemiyle asal çarpanlarına ayırın: "),
                  m("126"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.98",
                prompt: [
                  t("Çarpan ağacı yöntemiyle asal çarpanlarına ayırın: "),
                  m("294"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "bolme-merdiveni-yontemi",
        replaceBlocks: [
          ...removeBlocks(18),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bölme merdiveni yöntemi, bileşik bir sayının asal çarpanlarını bulmanın başka bir yoludur. Sayıyı en küçük asal çarpanına böler, bölüm artık o asal sayıya bölünmeyene kadar devam ederiz.",
              ),
              pt(
                "Sonra sıradaki asal çarpanla devam ederiz. Bölüm asal sayı olduğunda işlem biter. Merdivenin yanındaki ve tepesindeki asal sayılar çarpılarak asal çarpanlara ayrılmış biçim yazılır.",
              ),
              p([
                t("Örneğin "),
                m("36"),
                t(" için "),
                m("36\\div2=18"),
                t(", "),
                m("18\\div2=9"),
                t(", "),
                m("9\\div3=3"),
                t(" olur. Son bölüm asal olduğundan "),
                m("36=2^{2}\\cdot3^{2}"),
                t(" bulunur."),
              ]),
              {
                type: "example",
                label: "Örnek 2.50",
                prompt: [
                  m("120"),
                  t(" sayısını bölme merdiveni yöntemiyle asal çarpanlarına ayırın."),
                ],
                solution: [
                  p([
                    t("En küçük asal çarpan "),
                    m("2"),
                    t("'dir. "),
                    m("120\\div2=60"),
                    t(", "),
                    m("60\\div2=30"),
                    t(", "),
                    m("30\\div2=15"),
                    t(" olur."),
                  ]),
                  p([
                    m("15"),
                    t(" artık "),
                    m("2"),
                    t("'ye bölünmez; sıradaki asal olan "),
                    m("3"),
                    t("'e böleriz ve "),
                    m("5"),
                    t(" kalır. "),
                    m("5"),
                    t(" asal olduğu için "),
                    m("120=2^{3}\\cdot3\\cdot5"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.99",
                prompt: [
                  t("Bölme merdiveni yöntemiyle asal çarpanlarına ayırın: "),
                  m("80"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.100",
                prompt: [
                  t("Bölme merdiveni yöntemiyle asal çarpanlarına ayırın: "),
                  m("60"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Örnek 2.51",
                prompt: [
                  m("48"),
                  t(" sayısını bölme merdiveni yöntemiyle asal çarpanlarına ayırın."),
                ],
                solution: [
                  p([
                    m("48"),
                    t("'i "),
                    m("2"),
                    t("'ye art arda böleriz: "),
                    m("48,24,12,6,3"),
                    t(". Son bölüm "),
                    m("3"),
                    t(" asal olduğundan "),
                    m("48=2^{4}\\cdot3"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.101",
                prompt: [
                  t("Bölme merdiveni yöntemiyle asal çarpanlarına ayırın: "),
                  m("126"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.102",
                prompt: [
                  t("Bölme merdiveni yöntemiyle asal çarpanlarına ayırın: "),
                  m("294"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "en-kucuk-ortak-kat-ekok",
        replaceBlocks: [
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Katlar ve asal sayılarla çalışmamızın önemli nedenlerinden biri, iki sayının en küçük ortak katını bulabilmektir. EKOK özellikle farklı paydalı kesirlerle toplama ve çıkarma yaparken kullanılır.",
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "katlari-listeleme-yontemi",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "İki sayının ortak katı, her iki sayının da katı olan sayıdır. Katları listeleme yönteminde iki sayının katlarını yazar, iki listede de görünen ilk sayıyı seçeriz.",
              ),
              p([
                t("Örneğin "),
                m("10"),
                t(" ve "),
                m("25"),
                t(" için katları yazarsak "),
                m("50"),
                t(" ve "),
                m("100"),
                t(" ortak katlardır. En küçük ortak kat "),
                m("50"),
                t(" olduğu için "),
                m("\\operatorname{EKOK}(10,25)=50"),
                t(" olur."),
              ]),
              {
                type: "example",
                label: "Örnek 2.52",
                prompt: [
                  m("15"),
                  t(" ve "),
                  m("20"),
                  t(" sayılarının EKOK'unu katları listeleyerek bulun."),
                ],
                solution: [
                  p([
                    m("15"),
                    t("'in katları "),
                    m("15,30,45,60,75,\\ldots"),
                    t("; "),
                    m("20"),
                    t("'nin katları "),
                    m("20,40,60,80,\\ldots"),
                    t(" şeklindedir."),
                  ]),
                  p([
                    t("İki listede görünen ilk sayı "),
                    m("60"),
                    t(" olduğundan "),
                    m("\\operatorname{EKOK}(15,20)=60"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.103",
                prompt: [
                  t("Verilen sayıların EKOK'unu bulun: "),
                  m("9"),
                  t(" ve "),
                  m("12"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.104",
                prompt: [
                  t("Verilen sayıların EKOK'unu bulun: "),
                  m("18"),
                  t(" ve "),
                  m("24"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
      {
        sectionSlug: "asal-carpanlarla-ekok",
        replaceBlocks: [
          ...removeBlocks(14),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "İki sayının EKOK'unu bulmanın başka bir yolu asal çarpanları kullanmaktır. Her sayıyı asal çarpanlarına ayırır, ortak asal çarpanları bir kez sayacak biçimde en büyük kuvvetleri seçeriz.",
              ),
              p([
                t("Örneğin "),
                m("12=2^{2}\\cdot3"),
                t(" ve "),
                m("18=2\\cdot3^{2}"),
                t(" olduğundan EKOK için "),
                m("2^{2}"),
                t(" ve "),
                m("3^{2}"),
                t(" alınır. Böylece "),
                m("\\operatorname{EKOK}(12,18)=2^{2}\\cdot3^{2}=36"),
                t(" olur."),
              ]),
              {
                type: "example",
                label: "Örnek 2.53",
                prompt: [
                  m("15"),
                  t(" ve "),
                  m("18"),
                  t(" sayılarının EKOK'unu asal çarpanlar yöntemiyle bulun."),
                ],
                solution: [
                  p([
                    m("15=3\\cdot5"),
                    t(" ve "),
                    m("18=2\\cdot3^{2}"),
                    t("'dir. En büyük asal kuvvetler "),
                    m("2,3^{2},5"),
                    t(" olduğundan "),
                    m("\\operatorname{EKOK}=2\\cdot3^{2}\\cdot5=90"),
                    t(" olur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.105",
                prompt: [
                  t("Asal çarpanlar yöntemiyle EKOK'u bulun: "),
                  m("15"),
                  t(" ve "),
                  m("20"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.106",
                prompt: [
                  t("Asal çarpanlar yöntemiyle EKOK'u bulun: "),
                  m("15"),
                  t(" ve "),
                  m("35"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Örnek 2.54",
                prompt: [
                  m("50"),
                  t(" ve "),
                  m("100"),
                  t(" sayılarının EKOK'unu asal çarpanlar yöntemiyle bulun."),
                ],
                solution: [
                  p([
                    m("50=2\\cdot5^{2}"),
                    t(" ve "),
                    m("100=2^{2}\\cdot5^{2}"),
                    t("'dir. En büyük asal kuvvetleri aldığımızda "),
                    m("\\operatorname{EKOK}=2^{2}\\cdot5^{2}=100"),
                    t(" bulunur."),
                  ]),
                ],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.107",
                prompt: [
                  t("Asal çarpanlar yöntemiyle EKOK'u bulun: "),
                  m("55,88"),
                ],
                solution: [],
              },
              {
                type: "example",
                label: "Sıra Sizde 2.108",
                prompt: [
                  t("Asal çarpanlar yöntemiyle EKOK'u bulun: "),
                  m("60,72"),
                ],
                solution: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "3.2",
    sections: [
      {
        sectionSlug: "sayi-dogrusunda-pozitif-ve-negatif-sayilar",
        replaceBlocks: [
          ...removeBlocks(15),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sıfırın altındaki sıcaklıklar, deniz seviyesinin altındaki yükseklikler veya borç gibi durumlar negatif sayılarla anlatılır. Sıfırdan büyük sayılar pozitif, sıfırdan küçük sayılar negatiftir.",
              ),
              pt(
                "Sayı doğrusunda pozitif sayılar sıfırın sağında, negatif sayılar sıfırın solundadır. Sıfır ne pozitiftir ne negatiftir; iki tarafın başlangıç noktasıdır.",
              ),
              ex(
                "Örnek 3.1",
                [
                  t("Sayı doğrusunda gösterin: ⓐ "),
                  m("3"),
                  t(" ⓑ "),
                  m("-3"),
                  t(" ⓒ "),
                  m("-2"),
                ],
                sol(
                  "Çözüm: Önce ortada sıfır olan bir sayı doğrusu çizeriz. 3, sıfırın üç birim sağındadır; -3, sıfırın üç birim solundadır; -2 ise sıfırın iki birim solundadır.",
                ),
              ),
              ex(
                "Sıra Sizde 3.1",
                [
                  t("Sayı doğrusunda gösterin: ⓐ "),
                  m("1"),
                  t(" ⓑ "),
                  m("-1"),
                  t(" ⓒ "),
                  m("-4"),
                ],
              ),
              ex(
                "Sıra Sizde 3.2",
                [
                  t("Sayı doğrusunda gösterin: ⓐ "),
                  m("-4"),
                  t(" ⓑ "),
                  m("4"),
                  t(" ⓒ "),
                  m("-1"),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilari-siralama",
        replaceBlocks: [
          ...removeBlocks(24),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Pozitif ve negatif sayıları karşılaştırırken sayı doğrusundan yararlanırız. Sağda kalan sayı daha büyük, solda kalan sayı daha küçüktür.",
              ),
              pt(
                "Negatif sayılarda sıfıra daha yakın olan sayı daha büyüktür. Örneğin -1, -4'ün sağında olduğu için -1>-4 yazılır.",
              ),
              ex(
                "Örnek 3.2",
                [
                  t("Her sayı çiftini "),
                  m("<"),
                  t(" veya "),
                  m(">"),
                  t(" kullanarak sıralayın: ⓐ "),
                  m("14\\_\\_6"),
                  t(" ⓑ "),
                  m("-1\\_\\_9"),
                  t(" ⓒ "),
                  m("-1\\_\\_-4"),
                  t(" ⓓ "),
                  m("2\\_\\_-20"),
                ],
                sol(
                  "Çözüm: Sayı doğrusunda 14, 6'nın sağındadır; bu yüzden 14>6. -1, 9'un solundadır; bu yüzden -1<9. -1, -4'ün sağındadır; bu yüzden -1>-4. 2, -20'nin sağındadır; bu yüzden 2>-20.",
                ),
              ),
              ex(
                "Sıra Sizde 3.3",
                [
                  t("Sıralayın: ⓐ "),
                  m("15\\_\\_7"),
                  t(" ⓑ "),
                  m("-2\\_\\_5"),
                  t(" ⓒ "),
                  m("-3\\_\\_-7"),
                  t(" ⓓ "),
                  m("5\\_\\_-17"),
                ],
              ),
              ex(
                "Sıra Sizde 3.4",
                [
                  t("Sıralayın: ⓐ "),
                  m("8\\_\\_13"),
                  t(" ⓑ "),
                  m("3\\_\\_-4"),
                  t(" ⓒ "),
                  m("-5\\_\\_-2"),
                  t(" ⓓ "),
                  m("9\\_\\_-21"),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "zit-sayilar",
        replaceBlocks: [
          ...removeBlocks(5),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sayı doğrusunda sıfıra eşit uzaklıkta ve sıfırın farklı taraflarında bulunan sayılara zıt sayılar denir. Örneğin 2 ile -2, 3 ile -3 birbirinin zıttıdır.",
              ),
              ex(
                "Örnek 3.3",
                [
                  t("Her sayının zıttını bulun: ⓐ "),
                  m("7"),
                  t(" ⓑ "),
                  m("-10"),
                ],
                sol(
                  "Çözüm: 7'nin zıttı -7'dir. -10'un zıttı ise 10'dur; çünkü iki sayı da sıfıra 10 birim uzaklıktadır.",
                ),
              ),
              ex(
                "Sıra Sizde 3.5",
                [
                  t("Her sayının zıttını bulun: ⓐ "),
                  m("4"),
                  t(" ⓑ "),
                  m("-3"),
                ],
              ),
              ex(
                "Sıra Sizde 3.6",
                [
                  t("Her sayının zıttını bulun: ⓐ "),
                  m("8"),
                  t(" ⓑ "),
                  m("-5"),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "zit-sayi-gosterimi",
        replaceBlocks: [
          ...removeBlocks(5),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Eksi işareti farklı anlamlarda kullanılabilir: çıkarma işlemi, negatif sayı ya da bir sayının zıttı. Anlamı, işaretin kullanıldığı yere göre belirlenir.",
              ),
              ex(
                "Örnek 3.4",
                [t("Sadeleştirin: "), m("-(-6)")],
                sol(
                  "Çözüm: -(-6), -6'nın zıttını ister. -6'nın zıttı 6 olduğu için sonuç 6'dır.",
                ),
              ),
              ex("Sıra Sizde 3.7", [t("Sadeleştirin: "), m("-(-1)")]),
              ex("Sıra Sizde 3.8", [t("Sadeleştirin: "), m("-(-5)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilar",
        replaceBlocks: [
          ...removeBlocks(5),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sayma sayıları, bu sayıların zıtları ve sıfır birlikte tam sayılar kümesini oluşturur. Tam sayılar ..., -3, -2, -1, 0, 1, 2, 3, ... biçiminde devam eder.",
              ),
              pt(
                "Bir değişkenin zıttını değerlendirirken işarete özellikle dikkat ederiz. -x ifadesi, x'in zıttı demektir.",
              ),
              ex(
                "Örnek 3.5",
                [
                  m("-x"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("x=8"),
                  t(" iken ⓑ "),
                  m("x=-8"),
                  t(" iken."),
                ],
                sol(
                  "Çözüm: -x, x'in zıttıdır. x=8 iken -x=-8 olur. x=-8 iken -x=8 olur.",
                ),
              ),
              ex(
                "Sıra Sizde 3.9",
                [
                  m("-n"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("n=4"),
                  t(" iken ⓑ "),
                  m("n=-4"),
                  t(" iken."),
                ],
              ),
              ex(
                "Sıra Sizde 3.10",
                [
                  m("-m"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("m=11"),
                  t(" iken ⓑ "),
                  m("m=-11"),
                  t(" iken."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "mutlak-deger",
        replaceBlocks: [
          ...removeBlocks(29),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir sayının sıfıra olan uzaklığına o sayının mutlak değeri denir. Uzaklık negatif olamayacağı için mutlak değer sonucu sıfır ya da pozitif olur.",
              ),
              pt(
                "Mutlak değer çubukları işlem önceliğinde parantez gibi davranır. Önce mutlak değer içindeki ifade sadeleştirilir, sonra mutlak değer alınır.",
              ),
              ex(
                "Örnek 3.6",
                [
                  t("Sadeleştirin: ⓐ "),
                  m("|3|"),
                  t(" ⓑ "),
                  m("|-44|"),
                  t(" ⓒ "),
                  m("|0|"),
                ],
                sol(
                  "Çözüm: 3 sıfıra 3 birim uzaklıktadır, bu yüzden |3|=3. -44 sıfıra 44 birim uzaklıktadır, bu yüzden |-44|=44. 0'ın sıfıra uzaklığı 0 olduğu için |0|=0.",
                ),
              ),
              ex(
                "Sıra Sizde 3.11",
                [t("Sadeleştirin: ⓐ "), m("|12|"), t(" ⓑ "), m("-|-28|")],
              ),
              ex(
                "Sıra Sizde 3.12",
                [t("Sadeleştirin: ⓐ "), m("|9|"), t(" ⓑ "), m("-|37|")],
              ),
              ex(
                "Örnek 3.7",
                [
                  t("Değerlendirin: ⓐ "),
                  m("|x|"),
                  t(", "),
                  m("x=-35"),
                  t(" iken ⓑ "),
                  m("|-y|"),
                  t(", "),
                  m("y=-20"),
                  t(" iken ⓒ "),
                  m("-|u|"),
                  t(", "),
                  m("u=12"),
                  t(" iken ⓓ "),
                  m("-|p|"),
                  t(", "),
                  m("p=-14"),
                  t(" iken."),
                ],
                sol(
                  "Çözüm: |x| için x=-35 yazılırsa |-35|=35 olur. y=-20 iken -y=20 ve |-y|=20'dir. -|u| ifadesinde |12|=12 alınır ve dışarıdaki eksiyle sonuç -12 olur. p=-14 iken -|p|=-|-14|=-14 olur.",
                ),
              ),
              ex(
                "Sıra Sizde 3.13",
                [
                  t("Değerlendirin: ⓐ "),
                  m("|x|, x=-17"),
                  t(" ⓑ "),
                  m("|-y|, y=-39"),
                  t(" ⓒ "),
                  m("-|m|, m=22"),
                  t(" ⓓ "),
                  m("-|p|, p=-11"),
                ],
              ),
              ex(
                "Sıra Sizde 3.14",
                [
                  t("Değerlendirin: ⓐ "),
                  m("|y|, y=-23"),
                  t(" ⓑ "),
                  m("|-y|, y=-21"),
                  t(" ⓒ "),
                  m("-|n|, n=37"),
                  t(" ⓓ "),
                  m("-|q|, q=-49"),
                ],
              ),
              ex(
                "Örnek 3.8",
                [
                  t("Her boşluğa "),
                  m("<"),
                  t(", "),
                  m(">"),
                  t(" veya "),
                  m("="),
                  t(" yazın: ⓐ "),
                  m("|-5|\\_\\_-|-5|"),
                  t(" ⓑ "),
                  m("8\\_\\_-|-8|"),
                  t(" ⓒ "),
                  m("-9\\_\\_-|-9|"),
                  t(" ⓓ "),
                  m("-|-7|\\_\\_-7"),
                ],
                sol(
                  "Çözüm: Önce mutlak değerleri sadeleştiririz. |-5|=5 ve -|-5|=-5 olduğu için 5>-5. 8>-8, -9=-9 ve -|-7|=-7 olduğu için -7=-7 olur.",
                ),
              ),
              ex(
                "Sıra Sizde 3.15",
                [
                  t("Karşılaştırın: ⓐ "),
                  m("|-9|\\_\\_-|-9|"),
                  t(" ⓑ "),
                  m("2\\_\\_-|-2|"),
                  t(" ⓒ "),
                  m("-8\\_\\_|-8|"),
                  t(" ⓓ "),
                  m("-|-5|\\_\\_-5"),
                ],
              ),
              ex(
                "Sıra Sizde 3.16",
                [
                  t("Karşılaştırın: ⓐ "),
                  m("7\\_\\_-|-7|"),
                  t(" ⓑ "),
                  m("-|-11|\\_\\_-11"),
                  t(" ⓒ "),
                  m("|-4|\\_\\_-|-4|"),
                  t(" ⓓ "),
                  m("-1\\_\\_|-1|"),
                ],
              ),
              ex(
                "Örnek 3.9",
                [
                  t("Sadeleştirin: ⓐ "),
                  m("|9-3|"),
                  t(" ⓑ "),
                  m("4|-2|"),
                ],
                sol(
                  "Çözüm: |9-3|=|6|=6 olur. |-2|=2 olduğundan 4|-2|=4·2=8 bulunur.",
                ),
              ),
              ex(
                "Sıra Sizde 3.17",
                [t("Sadeleştirin: ⓐ "), m("|12-9|"), t(" ⓑ "), m("3|-6|")],
              ),
              ex(
                "Sıra Sizde 3.18",
                [t("Sadeleştirin: ⓐ "), m("|27-16|"), t(" ⓑ "), m("9|-7|")],
              ),
              ex(
                "Örnek 3.10",
                [t("Sadeleştirin: "), m("|8+7|-|5+6|"), t(".")],
                sol(
                  "Çözüm: Önce mutlak değer içleri sadeleştirilir: |8+7|-|5+6|=|15|-|11|. Mutlak değerler 15 ve 11 olur; 15-11=4 bulunur.",
                ),
              ),
              ex("Sıra Sizde 3.19", [t("Sadeleştirin: "), m("|1+8|-|2+5|")]),
              ex("Sıra Sizde 3.20", [t("Sadeleştirin: "), m("|9-5|-|7-6|")]),
              ex(
                "Örnek 3.11",
                [t("Sadeleştirin: "), m("24-|19-3(6-2)|"), t(".")],
                sol(
                  "Çözüm: Önce parantez yapılır: 6-2=4. Sonra 3·4=12 ve 19-12=7 olur. |7|=7 olduğundan 24-7=17 bulunur.",
                ),
              ),
              ex("Sıra Sizde 3.21", [t("Sadeleştirin: "), m("19-|11-4(3-1)|")]),
              ex("Sıra Sizde 3.22", [t("Sadeleştirin: "), m("9-|8-4(7-5)|")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-sozel-ifadeler",
        replaceBlocks: [
          ...removeBlocks(10),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sözel ifadeleri tam sayılarla gösterirken yön bildiren kelimelere dikkat ederiz. Altında, kayıp, açık ve borç gibi ifadeler genellikle negatif; üstünde, kazanç ve fazla gibi ifadeler pozitif sayı ile gösterilir.",
              ),
              ex(
                "Örnek 3.12",
                [
                  t("Her ifadeyi tam sayılı bir ifadeye çevirin: ⓐ pozitif 14'ün zıttı ⓑ "),
                  m("-11"),
                  t("'in zıttı ⓒ negatif on altı ⓓ 2 eksi negatif 7"),
                ],
                sol(
                  "Çözüm: Pozitif 14'ün zıttı -14'tür. -11'in zıttı 11'dir. Negatif on altı -16 ile yazılır. 2 eksi negatif 7 ifadesi 2-(-7) biçimindedir.",
                ),
              ),
              ex(
                "Sıra Sizde 3.23",
                [
                  t("Çevirin: ⓐ pozitif 9'un zıttı ⓑ "),
                  m("-15"),
                  t("'in zıttı ⓒ negatif yirmi ⓓ 11 eksi negatif 4"),
                ],
              ),
              ex(
                "Sıra Sizde 3.24",
                [
                  t("Çevirin: ⓐ negatif 19'un zıttı ⓑ 22'nin zıttı ⓒ negatif dokuz ⓓ negatif 8 eksi negatif 5"),
                ],
              ),
              pt(
                "Gerçek yaşam durumlarında da aynı fikir kullanılır. Referans noktası genellikle sıfırdır; sıfırın altı negatif, sıfırın üstü pozitif kabul edilir.",
              ),
              ex(
                "Örnek 3.13",
                [
                  t("Tam sayıyla gösterin: ⓐ sıcaklık sıfırın "),
                  m("12"),
                  t(" Fahrenheit derece altında ⓑ futbol takımının "),
                  m("3"),
                  t(" yard kazancı ⓒ Ölü Deniz'in deniz seviyesinin "),
                  m("1.302"),
                  t(" feet altında olması ⓓ hesabın "),
                  m("40"),
                  t(" dolar açık vermesi"),
                ],
                sol(
                  "Çözüm: Sıfırın altı negatif olduğundan sıcaklık -12 Fahrenheit derece yazılır. Kazanç pozitif olduğu için +3 yard yazılır. Deniz seviyesinin altı -1.302 feet, hesap açığı ise -40 dolar ile gösterilir.",
                ),
              ),
              ex(
                "Sıra Sizde 3.25",
                [t("Futbol takımının "), m("5"), t(" yard kazancını tam sayıyla gösterin.")],
              ),
              ex(
                "Sıra Sizde 3.26",
                [
                  t("Dalgıcın su yüzeyinin "),
                  m("30"),
                  t(" feet altında olmasını tam sayıyla gösterin."),
                ],
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "3.3",
    sections: [
      {
        sectionSlug: "tam-sayilarla-toplamayi-modelleme",
        replaceBlocks: [
          ...removeBlocks(29),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Pozitif ve negatif sayılarla toplama yaparken iki renkli sayaç modeli kullanabiliriz. Pozitif sayaç +1'i, negatif sayaç -1'i temsil eder.",
              ),
              pt(
                "Bir pozitif ve bir negatif sayaç birlikte nötr çift oluşturur; toplam değerleri sıfırdır. Ters işaretli sayıları toplarken bu nötr çiftleri çıkarır, geriye kalan sayaçlara bakarız.",
              ),
              ex(
                "Örnek 3.14",
                [t("Modelleyin: "), m("5+3"), t(".")],
                sol("Çözüm: 5 pozitif sayaca 3 pozitif sayaç ekleriz. Toplam 8 pozitif sayaç olur; bu nedenle 5+3=8."),
              ),
              ex("Sıra Sizde 3.27", [t("Modelleyin: "), m("2+4")]),
              ex("Sıra Sizde 3.28", [t("Modelleyin: "), m("2+5")]),
              ex(
                "Örnek 3.15",
                [t("Modelleyin: "), m("-5+(-3)"), t(".")],
                sol("Çözüm: 5 negatif sayaca 3 negatif sayaç ekleriz. Toplam 8 negatif sayaç olur; bu nedenle -5+(-3)=-8."),
              ),
              ex("Sıra Sizde 3.29", [t("Modelleyin: "), m("-2+(-4)")]),
              ex("Sıra Sizde 3.30", [t("Modelleyin: "), m("-2+(-5)")]),
              pt(
                "Aynı işaretli tam sayılar toplanırken mutlak değerler toplanır ve ortak işaret korunur. Ters işaretli tam sayılarda ise nötr çiftler çıkarılır.",
              ),
              ex(
                "Örnek 3.16",
                [t("Modelleyin: "), m("-5+3"), t(".")],
                sol("Çözüm: 5 negatif ve 3 pozitif sayaçtan 3 nötr çift çıkar. Geriye 2 negatif sayaç kalır; bu yüzden -5+3=-2."),
              ),
              ex(
                "Sıra Sizde 3.31",
                [t("Modelleyin ve sadeleştirin: "), m("2+(-4)")],
              ),
              ex(
                "Sıra Sizde 3.32",
                [t("Modelleyin ve sadeleştirin: "), m("2+(-5)")],
              ),
              ex(
                "Örnek 3.17",
                [t("Modelleyin: "), m("5+(-3)"), t(".")],
                sol("Çözüm: 5 pozitif ve 3 negatif sayaçtan 3 nötr çift çıkar. Geriye 2 pozitif sayaç kalır; bu nedenle 5+(-3)=2."),
              ),
              ex(
                "Sıra Sizde 3.33",
                [t("Modelleyin ve sadeleştirin: "), m("(-2)+4")],
              ),
              ex("Sıra Sizde 3.34", [t("Modelleyin: "), m("(-2)+5")]),
              ex(
                "Örnek 3.18",
                [
                  t("Her toplamayı modelleyin: ⓐ "),
                  m("4+2"),
                  t(" ⓑ "),
                  m("-3+6"),
                  t(" ⓒ "),
                  m("4+(-5)"),
                  t(" ⓓ "),
                  m("-2+(-3)"),
                ],
                sol("Çözüm: ⓐ İki sayı da pozitif: 4+2=6. ⓑ 3 negatif ve 6 pozitiften 3 nötr çift çıkar, 3 pozitif kalır: -3+6=3. ⓒ 4 pozitif ve 5 negatiften 4 nötr çift çıkar, 1 negatif kalır: 4+(-5)=-1. ⓓ İki sayı da negatif: -2+(-3)=-5."),
              ),
              ex(
                "Sıra Sizde 3.35",
                [
                  t("Her toplamayı modelleyin: ⓐ "),
                  m("3+4"),
                  t(" ⓑ "),
                  m("-1+4"),
                  t(" ⓒ "),
                  m("4+(-6)"),
                  t(" ⓓ "),
                  m("-2+(-2)"),
                ],
              ),
              ex(
                "Sıra Sizde 3.36",
                [
                  t("Her toplamayı modelleyin: ⓐ "),
                  m("5+1"),
                  t(" ⓑ "),
                  m("-3+7"),
                  t(" ⓒ "),
                  m("2+(-8)"),
                  t(" ⓓ "),
                  m("-3+(-4)"),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-toplama-islemi",
        replaceBlocks: [
          ...removeBlocks(18),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sayaç modelini zihnimizde canlandırarak daha büyük tam sayıları da toplayabiliriz. Aynı işaretli sayılarda mutlak değerler toplanır; farklı işaretli sayılarda mutlak değerler çıkarılır.",
              ),
              pt(
                "Farklı işaretli iki sayı toplanırken sonucun işareti, mutlak değeri büyük olan sayının işaretidir.",
              ),
              ex(
                "Örnek 3.19",
                [
                  t("Sadeleştirin: ⓐ "),
                  m("19+(-47)"),
                  t(" ⓑ "),
                  m("-32+40"),
                ],
                sol("Çözüm: ⓐ İşaretler farklıdır; 47-19=28 ve mutlak değeri büyük olan sayı negatif olduğu için sonuç -28'dir. ⓑ 40-32=8 ve pozitif sayı büyük olduğu için sonuç 8'dir."),
              ),
              ex(
                "Sıra Sizde 3.37",
                [t("Sadeleştirin: ⓐ "), m("15+(-32)"), t(" ⓑ "), m("-19+76")],
              ),
              ex(
                "Sıra Sizde 3.38",
                [t("Sadeleştirin: ⓐ "), m("-55+9"), t(" ⓑ "), m("43+(-17)")],
              ),
              ex(
                "Örnek 3.20",
                [t("Sadeleştirin: "), m("-14+(-36)"), t(".")],
                sol("Çözüm: İki sayı da negatiftir. 14+36=50 olduğundan toplam -50 olur."),
              ),
              ex("Sıra Sizde 3.39", [t("Sadeleştirin: "), m("-31+(-19)")]),
              ex("Sıra Sizde 3.40", [t("Sadeleştirin: "), m("-42+(-28)")]),
              pt(
                "Daha uzun ifadelerde işlem önceliği değişmez: önce parantez, sonra çarpma ve bölme, en son toplama ve çıkarma yapılır.",
              ),
              ex(
                "Örnek 3.21",
                [t("Sadeleştirin: "), m("-5+3(-2+7)"), t(".")],
                sol("Çözüm: Önce parantez içi sadeleşir: -2+7=5. Sonra çarpma yapılır: 3·5=15. En son -5+15=10 bulunur."),
              ),
              ex("Sıra Sizde 3.41", [t("Sadeleştirin: "), m("-2+5(-4+7)")]),
              ex("Sıra Sizde 3.42", [t("Sadeleştirin: "), m("-4+2(-3+5)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "degiskenli-ifadeleri-degerlendirme",
        replaceBlocks: [
          ...removeBlocks(14),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir ifadeyi değerlendirmek için değişken yerine verilen sayıyı yazarız. Artık değişkenin değeri negatif tam sayı da olabilir.",
              ),
              ex(
                "Örnek 3.22",
                [
                  m("x+7"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("x=-2"),
                  t(" iken ⓑ "),
                  m("x=-11"),
                  t(" iken."),
                ],
                sol("Çözüm: ⓐ x yerine -2 yazılır: -2+7=5. ⓑ x yerine -11 yazılır: -11+7=-4."),
              ),
              ex(
                "Sıra Sizde 3.43",
                [
                  m("x+5"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("x=-3"),
                  t(" iken ⓑ "),
                  m("x=-17"),
                  t(" iken."),
                ],
              ),
              ex(
                "Sıra Sizde 3.44",
                [
                  m("y+7"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("y=-5"),
                  t(" iken ⓑ "),
                  m("y=-8"),
                  t(" iken."),
                ],
              ),
              ex(
                "Örnek 3.23",
                [
                  m("n=-5"),
                  t(" iken değerlendirin: ⓐ "),
                  m("n+1"),
                  t(" ⓑ "),
                  m("-n+1"),
                  t("."),
                ],
                sol("Çözüm: ⓐ n+1=-5+1=-4. ⓑ -n, n'nin zıttıdır; n=-5 iken -n=5 olur. 5+1=6."),
              ),
              ex(
                "Sıra Sizde 3.45",
                [
                  m("n=-8"),
                  t(" iken değerlendirin: ⓐ "),
                  m("n+2"),
                  t(" ⓑ "),
                  m("-n+2"),
                ],
              ),
              ex(
                "Sıra Sizde 3.46",
                [
                  m("y=-9"),
                  t(" iken değerlendirin: ⓐ "),
                  m("y+8"),
                  t(" ⓑ "),
                  m("-y+8"),
                  t("."),
                ],
              ),
              pt("Birden fazla değişken varsa, her değişkenin yerine kendi değeri yazılır."),
              ex(
                "Örnek 3.24",
                [
                  m("a=12"),
                  t(" ve "),
                  m("b=-30"),
                  t(" iken "),
                  m("3a+b"),
                  t(" ifadesini değerlendirin."),
                ],
                sol("Çözüm: a yerine 12, b yerine -30 yazılır: 3a+b=3·12+(-30)=36-30=6."),
              ),
              ex(
                "Sıra Sizde 3.47",
                [
                  m("a=-19"),
                  t(" ve "),
                  m("b=14"),
                  t(" iken "),
                  m("a+2b"),
                  t(" ifadesini değerlendirin."),
                ],
              ),
              ex(
                "Sıra Sizde 3.48",
                [
                  m("p=4"),
                  t(" ve "),
                  m("q=-7"),
                  t(" iken "),
                  m("5p+q"),
                  t(" ifadesini değerlendirin."),
                ],
              ),
              ex(
                "Örnek 3.25",
                [
                  m("x=-18"),
                  t(" ve "),
                  m("y=24"),
                  t(" iken "),
                  m("(x+y)^{2}"),
                  t(" ifadesini değerlendirin."),
                ],
                sol("Çözüm: x+y=-18+24=6 olur. Bu yüzden (x+y)²=6²=36 bulunur."),
              ),
              ex(
                "Sıra Sizde 3.49",
                [
                  m("x=-15"),
                  t(" ve "),
                  m("y=29"),
                  t(" iken "),
                  m("(x+y)^{2}"),
                  t(" ifadesini değerlendirin."),
                ],
              ),
              ex(
                "Sıra Sizde 3.50",
                [
                  m("x=-8"),
                  t(" ve "),
                  m("y=10"),
                  t(" iken "),
                  m("(x+y)^{3}"),
                  t(" ifadesini değerlendirin."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Tam sayılarla çalışırken sözel ifadeleri cebirsel ifadeye çevirme kuralları aynen devam eder. “Toplamı” toplama işlemini, “artırılmış” ifadesi de ekleme yapmayı anlatır.",
              ),
              ex(
                "Örnek 3.26",
                [t("Çevirin ve sadeleştirin: "), m("-9"), t(" ile "), m("5"), t("'in toplamı.")],
                sol("Çözüm: “Toplamı” toplama demektir. İfade -9+5 olur ve sadeleştirince -4 bulunur."),
              ),
              ex(
                "Sıra Sizde 3.51",
                [t("Çevirin ve sadeleştirin: "), m("-7"), t(" ile "), m("4"), t("'ün toplamı.")],
              ),
              ex(
                "Sıra Sizde 3.52",
                [t("Çevirin ve sadeleştirin: "), m("-8"), t(" ile "), m("-6"), t("'nın toplamı.")],
              ),
              ex(
                "Örnek 3.27",
                [
                  t("Çevirin ve sadeleştirin: "),
                  m("8"),
                  t(" ile "),
                  m("-12"),
                  t("'nin toplamının "),
                  m("3"),
                  t(" artırılmış hali."),
                ],
                sol("Çözüm: Önce toplam yazılır: 8+(-12). Sonra 3 eklenir: [8+(-12)]+3. İç toplam -4 olduğundan -4+3=-1 bulunur."),
              ),
              ex(
                "Sıra Sizde 3.53",
                [
                  t("Çevirin ve sadeleştirin: "),
                  m("9"),
                  t(" ile "),
                  m("-16"),
                  t("'nın toplamının "),
                  m("4"),
                  t(" artırılmış hali."),
                ],
              ),
              ex(
                "Sıra Sizde 3.54",
                [
                  t("Çevirin ve sadeleştirin: "),
                  m("-8"),
                  t(" ile "),
                  m("-12"),
                  t("'nin toplamının "),
                  m("7"),
                  t(" artırılmış hali."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-problem-cozme",
        replaceBlocks: [
          ...removeBlocks(8),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sıcaklık, borç, derinlik ve spor gibi durumlarda artışları pozitif, azalışları veya kayıpları negatif tam sayılarla gösterebiliriz.",
              ),
              pt(
                "Problem çözerken önce ne aradığımızı belirler, sonra verilen değişimleri tam sayılarla yazar ve işlemi sadeleştiririz.",
              ),
              ex(
                "Örnek 3.28",
                [
                  t("Buffalo'da sabah sıcaklık sıfırın "),
                  m("7"),
                  t(" Fahrenheit derece altındaydı. Öğlene kadar "),
                  m("12"),
                  t(" derece ısındı. Öğlen sıcaklık kaç derecedir?"),
                ],
                sol("Çözüm: Sıfırın 7 derece altı -7 ile, 12 derece ısınma +12 ile gösterilir. -7+12=5 olduğundan öğlen sıcaklık 5°F olur."),
              ),
              ex(
                "Sıra Sizde 3.55",
                [
                  t("Chicago'da saat 5.00'te sıcaklık sıfırın "),
                  m("10"),
                  t(" Celsius derece altındaydı. Altı saat sonra "),
                  m("14"),
                  t(" derece ısındı. Saat 11.00'de sıcaklık kaç derecedir?"),
                ],
              ),
              ex(
                "Sıra Sizde 3.56",
                [
                  t("Bir dalgıç yüzeyin "),
                  m("16"),
                  t(" feet altında yüzüyordu ve sonra "),
                  m("17"),
                  t(" feet daha aşağı indi. Yeni derinliği nedir?"),
                ],
              ),
              ex(
                "Örnek 3.29",
                [
                  t("Bir futbol takımı topu "),
                  m("42"),
                  t(" yard çizgisinde aldı. Sonraki üç oyunda "),
                  m("6"),
                  t(" yard kaybetti, "),
                  m("4"),
                  t(" yard kazandı ve "),
                  m("8"),
                  t(" yard kaybetti. Top hangi yard çizgisindedir?"),
                ],
                sol("Çözüm: Başlangıç 42'dir. Kayıplar negatif, kazanç pozitif yazılır: 42-6+4-8=32. Top 32 yard çizgisindedir."),
              ),
              ex(
                "Sıra Sizde 3.57",
                [
                  t("Bears topu "),
                  m("20"),
                  t(" yard çizgisinde aldı. Sonraki üç oyunda "),
                  m("9"),
                  t(" yard kaybetti, "),
                  m("7"),
                  t(" yard kazandı ve "),
                  m("4"),
                  t(" yard kaybetti. Top hangi yard çizgisindedir?"),
                ],
              ),
              ex(
                "Sıra Sizde 3.58",
                [
                  t("Chargers topa "),
                  m("25"),
                  t(" yard çizgisinde başladı. Sonraki üç oyunda "),
                  m("5"),
                  t(" yard kazandı, "),
                  m("8"),
                  t(" yard kaybetti ve "),
                  m("15"),
                  t(" yard kazandı. Top hangi yard çizgisindedir?"),
                ],
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "3.4",
    sections: [
      {
        sectionSlug: "tam-sayilarla-cikarmayi-modelleme",
        replaceBlocks: [
          ...removeBlocks(30),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Tam sayılarla çıkarma yaparken sayaç modelini kullanmaya devam ederiz. Pozitif sayaç +1'i, negatif sayaç -1'i temsil eder.",
              ),
              pt(
                "Çıkarma işlemini “verilen sayaçları ortamdan alma” olarak düşünebiliriz. Almak istediğimiz renkten sayaç yoksa, değeri değiştirmeyen nötr çiftler ekleriz.",
              ),
              ex(
                "Örnek 3.30",
                [t("Modelleyin: "), m("5-3"), t(".")],
                sol("Çözüm: 5 pozitif sayaçla başlarız ve 3 pozitif sayacı çıkarırız. Geriye 2 pozitif sayaç kalır; bu nedenle 5-3=2."),
              ),
              ex("Sıra Sizde 3.59", [t("Modelleyin: "), m("6-4")]),
              ex("Sıra Sizde 3.60", [t("Modelleyin: "), m("7-4")]),
              ex(
                "Örnek 3.31",
                [t("Modelleyin: "), m("-5-(-3)"), t(".")],
                sol("Çözüm: 5 negatif sayaçla başlarız ve 3 negatif sayacı çıkarırız. Geriye 2 negatif sayaç kalır; sonuç -2'dir."),
              ),
              ex("Sıra Sizde 3.61", [t("Modelleyin: "), m("-6-(-4)")]),
              ex("Sıra Sizde 3.62", [t("Modelleyin: "), m("-7-(-4)")]),
              pt(
                "Aynı tür sayaçlar çıkarıldığında model doğrudandır. Farklı türden sayaç çıkarmak gerektiğinde nötr çiftler eklemek işimizi kolaylaştırır.",
              ),
              ex(
                "Örnek 3.32",
                [t("Modelleyin: "), m("-5-3"), t(".")],
                sol("Çözüm: -5 ile başlarız. 3 pozitif sayaç çıkarmak için 3 nötr çift ekleriz. 3 pozitif sayacı kaldırınca geriye 8 negatif sayaç kalır; -5-3=-8."),
              ),
              ex("Sıra Sizde 3.63", [t("Modelleyin: "), m("-6-4")]),
              ex("Sıra Sizde 3.64", [t("Modelleyin: "), m("-7-4")]),
              ex(
                "Örnek 3.33",
                [t("Modelleyin: "), m("5-(-3)"), t(".")],
                sol("Çözüm: 5 pozitif sayaçla başlarız. 3 negatif sayaç çıkarabilmek için 3 nötr çift ekleriz. 3 negatif sayacı kaldırınca 8 pozitif sayaç kalır; 5-(-3)=8."),
              ),
              ex("Sıra Sizde 3.65", [t("Modelleyin: "), m("6-(-4)")]),
              ex("Sıra Sizde 3.66", [t("Modelleyin: "), m("7-(-4)")]),
              pt(
                "Bu modeller bizi önemli kurala götürür: Bir tam sayıyı çıkarmak, o tam sayının zıttını eklemekle aynı sonucu verir.",
              ),
              ex(
                "Örnek 3.34",
                [
                  t("Her çıkarmayı modelleyin: ⓐ "),
                  m("8-2"),
                  t(" ⓑ "),
                  m("-5-4"),
                  t(" ⓒ "),
                  m("6-(-6)"),
                  t(" ⓓ "),
                  m("-8-(-3)"),
                ],
                sol("Çözüm: ⓐ 8-2=6. ⓑ -5-4=-9. ⓒ 6-(-6)=12. ⓓ -8-(-3)=-5."),
              ),
              ex(
                "Sıra Sizde 3.67",
                [
                  t("Her çıkarmayı modelleyin: ⓐ "),
                  m("7-(-8)"),
                  t(" ⓑ "),
                  m("-7-(-2)"),
                  t(" ⓒ "),
                  m("4-1"),
                  t(" ⓓ "),
                  m("-6-8"),
                ],
              ),
              ex(
                "Sıra Sizde 3.68",
                [
                  t("Her çıkarmayı modelleyin: ⓐ "),
                  m("4-(-6)"),
                  t(" ⓑ "),
                  m("-8-(-1)"),
                  t(" ⓒ "),
                  m("7-3"),
                  t(" ⓓ "),
                  m("-4-2"),
                ],
              ),
              ex(
                "Örnek 3.35",
                [
                  t("Her çıkarma ifadesini modelleyin: ⓐ "),
                  m("2-8"),
                  t(" ⓑ "),
                  m("-3-(-8)"),
                ],
                sol("Çözüm: ⓐ 2'den 8 çıkarmak için 6 nötr çift gerekir; sonuç -6'dır. ⓑ -3'ten -8 çıkarmak için 5 nötr çift gerekir; 8 negatif çıkarılınca 5 pozitif kalır."),
              ),
              ex(
                "Sıra Sizde 3.69",
                [t("Her çıkarma ifadesini modelleyin: ⓐ "), m("7-9"), t(" ⓑ "), m("-5-(-9)")],
              ),
              ex(
                "Sıra Sizde 3.70",
                [t("Her çıkarma ifadesini modelleyin: ⓐ "), m("4-7"), t(" ⓑ "), m("-7-(-10)")],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-cikarma-islemi",
        replaceBlocks: [
          ...removeBlocks(28),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sayaç modeliyle gördüğümüz kuralı artık doğrudan kullanabiliriz: Bir sayıyı çıkarmak, o sayının zıttını eklemektir.",
              ),
              p([m("a-b=a+(-b)"), t(" kuralı her tam sayı için geçerlidir.")]),
              pt(
                "Örneğin 6-4 ile 6+(-4) aynı sonucu verir. Benzer biçimde 8-(-5), 8+5 ile aynı anlama gelir.",
              ),
              ex(
                "Örnek 3.36",
                [
                  t("Sadeleştirin: ⓐ "),
                  m("13-8"),
                  t(" ve "),
                  m("13+(-8)"),
                  t(" ⓑ "),
                  m("-17-9"),
                  t(" ve "),
                  m("-17+(-9)"),
                ],
                sol("Çözüm: ⓐ 13-8=5 ve 13+(-8)=5. ⓑ -17-9=-26 ve -17+(-9)=-26. Çıkarma, zıttını ekleme ile aynı sonucu verir."),
              ),
              ex(
                "Sıra Sizde 3.71",
                [
                  t("Her ifadeyi sadeleştirin: ⓐ "),
                  m("21-13"),
                  t(" ve "),
                  m("21+(-13)"),
                  t(" ⓑ "),
                  m("-11-7"),
                  t(" ve "),
                  m("-11+(-7)"),
                ],
              ),
              ex(
                "Sıra Sizde 3.72",
                [
                  t("Her ifadeyi sadeleştirin: ⓐ "),
                  m("15-7"),
                  t(" ve "),
                  m("15+(-7)"),
                  t(" ⓑ "),
                  m("-14-8"),
                  t(" ve "),
                  m("-14+(-8)"),
                ],
              ),
              ex(
                "Örnek 3.37",
                [
                  t("Sadeleştirin: ⓐ "),
                  m("9-(-15)"),
                  t(" ve "),
                  m("9+15"),
                  t(" ⓑ "),
                  m("-7-(-4)"),
                  t(" ve "),
                  m("-7+4"),
                ],
                sol("Çözüm: ⓐ 9-(-15)=24 ve 9+15=24. ⓑ -7-(-4)=-3 ve -7+4=-3."),
              ),
              ex(
                "Sıra Sizde 3.73",
                [
                  t("Her ifadeyi sadeleştirin: ⓐ "),
                  m("6-(-13)"),
                  t(" ve "),
                  m("6+13"),
                  t(" ⓑ "),
                  m("-5-(-1)"),
                  t(" ve "),
                  m("-5+1"),
                ],
              ),
              ex(
                "Sıra Sizde 3.74",
                [
                  t("Her ifadeyi sadeleştirin: ⓐ "),
                  m("4-(-19)"),
                  t(" ve "),
                  m("4+19"),
                  t(" ⓑ "),
                  m("-4-(-7)"),
                  t(" ve "),
                  m("-4+7"),
                ],
              ),
              ex(
                "Örnek 3.38",
                [t("Sadeleştirin: "), m("-74-(-58)"), t(".")],
                sol("Çözüm: -58'i çıkarmak 58 eklemek demektir. -74+58=-16 olur."),
              ),
              ex("Sıra Sizde 3.75", [t("Sadeleştirin: "), m("-67-(-38)")]),
              ex("Sıra Sizde 3.76", [t("Sadeleştirin: "), m("-83-(-57)")]),
              pt(
                "Daha uzun ifadelerde işlem önceliği değişmez: önce parantez, sonra üs ve çarpma işlemleri, en son toplama ve çıkarma yapılır.",
              ),
              ex(
                "Örnek 3.39",
                [t("Sadeleştirin: "), m("7-(-4-3)-9"), t(".")],
                sol("Çözüm: Önce parantez içi: -4-3=-7. Sonra 7-(-7)-9=7+7-9=5 olur."),
              ),
              ex("Sıra Sizde 3.77", [t("Sadeleştirin: "), m("8-(-3-1)-9")]),
              ex("Sıra Sizde 3.78", [t("Sadeleştirin: "), m("12-(-9-6)-14")]),
              ex(
                "Örnek 3.40",
                [t("Sadeleştirin: "), m("3\\cdot7-4\\cdot7-5\\cdot8"), t(".")],
                sol("Çözüm: Önce çarpmalar yapılır: 21-28-40. Sonra soldan sağa ilerleriz: 21-28=-7 ve -7-40=-47."),
              ),
              ex("Sıra Sizde 3.79", [t("Sadeleştirin: "), m("6\\cdot2-9\\cdot1-8\\cdot9")]),
              ex("Sıra Sizde 3.80", [t("Sadeleştirin: "), m("2\\cdot5-3\\cdot7-4\\cdot9")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "degiskenli-ifadeleri-degerlendirme",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Değişkenli ifadeleri değerlendirirken değişken yerine verilen değeri yazar, sonra tam sayılarla işlem kurallarını uygularız.",
              ),
              ex(
                "Örnek 3.41",
                [
                  m("x-4"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("x=3"),
                  t(" iken ⓑ "),
                  m("x=-6"),
                  t(" iken."),
                ],
                sol("Çözüm: ⓐ x=3 yazılırsa 3-4=-1. ⓑ x=-6 yazılırsa -6-4=-10 olur."),
              ),
              ex(
                "Sıra Sizde 3.81",
                [
                  m("y-7"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("y=5"),
                  t(" iken ⓑ "),
                  m("y=-8"),
                  t(" iken."),
                ],
              ),
              ex(
                "Sıra Sizde 3.82",
                [
                  m("m-3"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("m=1"),
                  t(" iken ⓑ "),
                  m("m=-4"),
                  t(" iken."),
                ],
              ),
              ex(
                "Örnek 3.42",
                [
                  m("20-z"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("z=12"),
                  t(" iken ⓑ "),
                  m("z=-12"),
                  t(" iken."),
                ],
                sol("Çözüm: ⓐ z=12 yazılırsa 20-12=8. ⓑ z=-12 yazılırsa 20-(-12)=32 olur."),
              ),
              ex(
                "Sıra Sizde 3.83",
                [
                  m("17-k"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("k=19"),
                  t(" iken ⓑ "),
                  m("k=-19"),
                  t(" iken."),
                ],
              ),
              ex(
                "Sıra Sizde 3.84",
                [
                  m("-5-b"),
                  t(" ifadesini değerlendirin: ⓐ "),
                  m("b=14"),
                  t(" iken ⓑ "),
                  m("b=-14"),
                  t(" iken."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
        replaceBlocks: [
          ...removeBlocks(6),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Fark, eksik, çıkarmak ve çıkarılmış gibi ifadeler çıkarma işlemini anlatır. Sıralamaya dikkat ederiz; “a ile b'nin farkı” ifadesi a-b şeklinde yazılır.",
              ),
              ex(
                "Örnek 3.43",
                [
                  t("Çevirin ve sadeleştirin: ⓐ "),
                  m("13"),
                  t(" ile "),
                  m("-21"),
                  t("'in farkı ⓑ "),
                  m("-19"),
                  t("'dan "),
                  m("24"),
                  t(" çıkarın."),
                ],
                sol("Çözüm: ⓐ 13-(-21)=34. ⓑ -19'dan 24 çıkarmak -19-24=-43 demektir."),
              ),
              ex(
                "Sıra Sizde 3.85",
                [
                  t("Çevirin ve sadeleştirin: ⓐ "),
                  m("14"),
                  t(" ile "),
                  m("-23"),
                  t("'ün farkı ⓑ "),
                  m("-17"),
                  t("'den "),
                  m("21"),
                  t(" çıkarın."),
                ],
              ),
              ex(
                "Sıra Sizde 3.86",
                [
                  t("Çevirin ve sadeleştirin: ⓐ "),
                  m("11"),
                  t(" ile "),
                  m("-19"),
                  t("'un farkı ⓑ "),
                  m("-11"),
                  t("'den "),
                  m("18"),
                  t(" çıkarın."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-problem-cozme",
        replaceBlocks: [
          ...removeBlocks(13),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Uygulama problemlerinde önce hangi farkı aradığımızı belirleriz. Sonra büyüklükleri tam sayılarla yazar, çıkarma işlemini zıttını ekleyerek sadeleştiririz.",
              ),
              ex(
                "Örnek 3.44",
                [
                  t("Urbana, Illinois'te sabah sıcaklık "),
                  m("11"),
                  t("°F idi. Öğleden sonra sıcaklık "),
                  m("-9"),
                  t("°F'ye düştü. Sabah ve öğleden sonra sıcaklıkları arasındaki fark kaç derecedir?"),
                ],
                sol("Çözüm: Fark 11-(-9) ile bulunur. Negatif sayı çıkarmak pozitif eklemek demektir: 11+9=20°F."),
              ),
              ex(
                "Sıra Sizde 3.87",
                [
                  t("Anchorage, Alaska'da sabah sıcaklık "),
                  m("15"),
                  t("°F idi. Öğleden sonra sıcaklık sıfırın "),
                  m("30"),
                  t(" derece altına düştü. Sıcaklık farkı kaç derecedir?"),
                ],
              ),
              ex(
                "Sıra Sizde 3.88",
                [
                  t("Denver'da öğle sıcaklığı "),
                  m("-6"),
                  t("°F idi. Gün batımında sıcaklık "),
                  m("-15"),
                  t("°F oldu. İki sıcaklık arasındaki fark kaç derecedir?"),
                ],
              ),
              pt(
                "Yükseklik ve derinlik problemlerinde deniz seviyesi sıfır kabul edilir; üstü pozitif, altı negatif yazılır.",
              ),
              ex(
                "Örnek 3.45",
                [
                  t("California'da Mt. Whitney deniz seviyesinin "),
                  m("14.497"),
                  t(" feet üstündedir. Death Valley deniz seviyesinin "),
                  m("282"),
                  t(" feet altındadır. İki yer arasındaki yükseklik farkı nedir?"),
                ],
                sol("Çözüm: Mt. Whitney 14.497, Death Valley -282 ile gösterilir. Fark 14.497-(-282)=14.779 feet olur."),
              ),
              ex(
                "Sıra Sizde 3.89",
                [
                  t("John bir gün Hawaii'deki Haleakala yanardağının "),
                  m("10.023"),
                  t(" feet yüksekliğindeki zirvesine çıktı. Ertesi gün deniz seviyesinin "),
                  m("80"),
                  t(" feet altındaki bir mağaraya daldı. Zirve ile mağara arasındaki fark nedir?"),
                ],
              ),
              ex(
                "Sıra Sizde 3.90",
                [
                  t("Nautilus denizaltısı yüzeyin "),
                  m("340"),
                  t(" feet altında, Explorer denizaltısı yüzeyin "),
                  m("573"),
                  t(" feet altındadır. Konumları arasındaki fark nedir?"),
                ],
              ),
              pt(
                "Banka hesabı problemlerinde para yatırmak pozitif, çek yazmak veya borç negatif değişim olarak düşünülebilir.",
              ),
              ex(
                "Örnek 3.46",
                [
                  t("Leslie'nin hesabında "),
                  m("25"),
                  t(" dolar var ve "),
                  m("8"),
                  t(" dolarlık çek yazıyor. Sonra "),
                  m("20"),
                  t(" dolarlık ikinci bir çek yazıyor. Daha sonra arkadaşının "),
                  m("10"),
                  t(" dolarlık çeki kaybettiği anlaşılıyor. Bakiyeleri bulun."),
                ],
                sol("Çözüm: İlk çekten sonra 25-8=17 dolar kalır. İkinci çekten sonra 17-20=-3 dolar olur. Kaybolan 10 dolarlık çek hesaptan çıkmayacağı için -3+10=7 dolar kalır."),
              ),
              ex(
                "Sıra Sizde 3.91",
                [
                  t("Araceli'nin hesabında "),
                  m("75"),
                  t(" dolar var ve "),
                  m("27"),
                  t(" dolarlık çek yazıyor. Sonra "),
                  m("50"),
                  t(" dolarlık ikinci bir çek yazıyor. Hayır kurumuna gönderdiği "),
                  m("20"),
                  t(" dolarlık çek bozulmuyor. Son bakiyeyi bulun."),
                ],
              ),
              ex(
                "Sıra Sizde 3.92",
                [
                  t("Genevieve'in hesabı eksi bakiyededir: "),
                  m("-78"),
                  t(" dolar. Önce "),
                  m("24"),
                  t(" dolar, sonra "),
                  m("49"),
                  t(" dolar yatırıyor. Borçtan çıkıp çıkmadığını ve yeni bakiyeyi bulun."),
                ],
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "3.5",
    sections: [
      {
        sectionSlug: "tam-sayilarla-carpma",
        replaceBlocks: [
          ...removeBlocks(20),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Çarpma, tekrarlı toplamanın kısa yoludur. Tam sayılarla çarpmada önce sayıların mutlak değerlerini çarpar, sonra işaretlere bakarız.",
              ),
              pt(
                "İki çarpanın işaretleri aynıysa çarpım pozitif, işaretleri farklıysa çarpım negatiftir.",
              ),
              p([
                m("5\\cdot3=15"),
                t(", "),
                m("-5\\cdot3=-15"),
                t(", "),
                m("5\\cdot(-3)=-15"),
                t(" ve "),
                m("(-5)(-3)=15"),
                t(" örnekleri bu kuralı gösterir."),
              ]),
              ex(
                "Örnek 3.47",
                [
                  t("Çarpın: ⓐ "),
                  m("-9\\cdot3"),
                  t(" ⓑ "),
                  m("-2(-5)"),
                  t(" ⓒ "),
                  m("4(-8)"),
                  t(" ⓓ "),
                  m("7\\cdot6"),
                ],
                sol("Çözüm: ⓐ İşaretler farklıdır: -9·3=-27. ⓑ İki negatifin çarpımı pozitiftir: -2(-5)=10. ⓒ İşaretler farklıdır: 4(-8)=-32. ⓓ İki pozitifin çarpımı pozitiftir: 42."),
              ),
              ex(
                "Sıra Sizde 3.93",
                [
                  t("Çarpın: ⓐ "),
                  m("-6\\cdot8"),
                  t(" ⓑ "),
                  m("-4(-7)"),
                  t(" ⓒ "),
                  m("9(-7)"),
                  t(" ⓓ "),
                  m("5\\cdot12"),
                ],
              ),
              ex(
                "Sıra Sizde 3.94",
                [
                  t("Çarpın: ⓐ "),
                  m("-8\\cdot7"),
                  t(" ⓑ "),
                  m("-6(-9)"),
                  t(" ⓒ "),
                  m("7(-4)"),
                  t(" ⓓ "),
                  m("3\\cdot13"),
                ],
              ),
              pt(
                "-1 ile çarpmak bir sayının zıttını verir. Pozitif sayı negatife, negatif sayı pozitife döner.",
              ),
              ex(
                "Örnek 3.48",
                [t("Çarpın: ⓐ "), m("-1\\cdot7"), t(" ⓑ "), m("-1(-11)")],
                sol("Çözüm: ⓐ -1·7=-7; 7'nin zıttı -7'dir. ⓑ -1(-11)=11; -11'in zıttı 11'dir."),
              ),
              ex("Sıra Sizde 3.95", [t("Çarpın: ⓐ "), m("-1\\cdot9"), t(" ⓑ "), m("-1(-17)")]),
              ex("Sıra Sizde 3.96", [t("Çarpın: ⓐ "), m("-1\\cdot8"), t(" ⓑ "), m("-1(-16)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-bolme",
        replaceBlocks: [
          ...removeBlocks(16),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bölme, çarpmanın ters işlemidir. Bu yüzden tam sayılarla bölmede işaret kuralı çarpmayla aynıdır.",
              ),
              pt(
                "Bölünen ve bölen aynı işaretliyse bölüm pozitif, farklı işaretliyse bölüm negatiftir. Sonucu çarpmayla kontrol edebiliriz.",
              ),
              ex(
                "Örnek 3.49",
                [t("Bölün: ⓐ "), m("-27\\div3"), t(" ⓑ "), m("-100\\div(-4)")],
                sol("Çözüm: ⓐ İşaretler farklıdır; 27÷3=9, sonuç -9. ⓑ İşaretler aynıdır; 100÷4=25, sonuç 25."),
              ),
              ex("Sıra Sizde 3.97", [t("Bölün: ⓐ "), m("-42\\div6"), t(" ⓑ "), m("-117\\div(-3)")]),
              ex("Sıra Sizde 3.98", [t("Bölün: ⓐ "), m("-63\\div7"), t(" ⓑ "), m("-115\\div(-5)")]),
              pt(
                "Bir sayıyı -1'e bölmek de o sayının zıttını verir.",
              ),
              ex(
                "Örnek 3.50",
                [t("Bölün: ⓐ "), m("16\\div(-1)"), t(" ⓑ "), m("-20\\div(-1)")],
                sol("Çözüm: ⓐ 16'nın zıttı -16'dır. ⓑ -20'nin zıttı 20'dir."),
              ),
              ex("Sıra Sizde 3.99", [t("Bölün: ⓐ "), m("6\\div(-1)"), t(" ⓑ "), m("-36\\div(-1)")]),
              ex("Sıra Sizde 3.100", [t("Bölün: ⓐ "), m("28\\div(-1)"), t(" ⓑ "), m("-52\\div(-1)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "tam-sayilarla-islem-onceligi",
        replaceBlocks: [
          ...removeBlocks(16),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Tam sayılarla dört işlem içeren ifadelerde işlem önceliği değişmez: önce parantez ve üs, sonra çarpma-bölme, en son toplama-çıkarma yapılır.",
              ),
              ex(
                "Örnek 3.51",
                [t("Sadeleştirin: "), m("7(-2)+4(-7)-6"), t(".")],
                sol("Çözüm: Önce çarpma yapılır: 7(-2)=-14 ve 4(-7)=-28. Sonra -14-28-6=-48 bulunur."),
              ),
              ex("Sıra Sizde 3.101", [t("Sadeleştirin: "), m("8(-3)+5(-7)-4")]),
              ex("Sıra Sizde 3.102", [t("Sadeleştirin: "), m("9(-3)+7(-8)-1")]),
              pt(
                "Parantez, üslü ifadelerde tabanın ne olduğunu belirler. (-2)^4 ifadesinde taban -2'dir; -2^4 ifadesinde ise üs yalnızca 2'ye uygulanır.",
              ),
              ex(
                "Örnek 3.52",
                [t("Sadeleştirin: ⓐ "), m("(-2)^4"), t(" ⓑ "), m("-2^4")],
                sol("Çözüm: ⓐ (-2)^4=16; dört negatif çarpan pozitif sonuç verir. ⓑ -2^4=-(2^4)=-16; çünkü parantez yoktur."),
              ),
              ex("Sıra Sizde 3.103", [t("Sadeleştirin: ⓐ "), m("(-3)^4"), t(" ⓑ "), m("-3^4")]),
              ex("Sıra Sizde 3.104", [t("Sadeleştirin: ⓐ "), m("(-7)^2"), t(" ⓑ "), m("-7^2")]),
              ex(
                "Örnek 3.53",
                [t("Sadeleştirin: "), m("12-3(9-12)"), t(".")],
                sol("Çözüm: Önce parantez: 9-12=-3. Sonra 3(-3)=-9 ve 12-(-9)=21 olur."),
              ),
              ex("Sıra Sizde 3.105", [t("Sadeleştirin: "), m("17-4(8-11)")]),
              ex("Sıra Sizde 3.106", [t("Sadeleştirin: "), m("16-6(7-13)")]),
              ex(
                "Örnek 3.54",
                [t("Sadeleştirin: "), m("8(-9)\\div(-2)^3"), t(".")],
                sol("Çözüm: Önce üs: (-2)^3=-8. Sonra 8(-9)=-72 ve -72÷(-8)=9 bulunur."),
              ),
              ex("Sıra Sizde 3.107", [t("Sadeleştirin: "), m("12(-9)\\div(-3)^3")]),
              ex("Sıra Sizde 3.108", [t("Sadeleştirin: "), m("18(-4)\\div(-2)^3")]),
              ex(
                "Örnek 3.55",
                [t("Sadeleştirin: "), m("-30\\div2+(-3)(-7)"), t(".")],
                sol("Çözüm: Önce bölme ve çarpma yapılır: -30÷2=-15 ve (-3)(-7)=21. Sonra -15+21=6 olur."),
              ),
              ex("Sıra Sizde 3.109", [t("Sadeleştirin: "), m("-27\\div3+(-5)(-6)")]),
              ex("Sıra Sizde 3.110", [t("Sadeleştirin: "), m("-32\\div4+(-2)(-7)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "degiskenli-ifadeleri-degerlendirme",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Değişkenli ifadeleri değerlendirirken değişken yerine verilen değeri yazarız. Negatif değerlerde parantez kullanmak özellikle önemlidir.",
              ),
              ex(
                "Örnek 3.56",
                [
                  m("x=-4"),
                  t(" iken "),
                  m("2x^2-3x+8"),
                  t(" ifadesini değerlendirin."),
                ],
                sol("Çözüm: x yerine -4 yazılır: 2(-4)^2-3(-4)+8=2·16+12+8=52."),
              ),
              ex("Sıra Sizde 3.111", [t("Değerlendirin: "), m("3x^2-2x+6"), t(", "), m("x=-3"), t(" iken.")]),
              ex("Sıra Sizde 3.112", [t("Değerlendirin: "), m("4x^2-x-5"), t(", "), m("x=-2"), t(" iken.")]),
              ex(
                "Örnek 3.57",
                [
                  m("x=-1"),
                  t(" ve "),
                  m("y=2"),
                  t(" iken "),
                  m("3x+4y-6"),
                  t(" ifadesini değerlendirin."),
                ],
                sol("Çözüm: x=-1 ve y=2 yazılır: 3(-1)+4(2)-6=-3+8-6=-1."),
              ),
              ex("Sıra Sizde 3.113", [t("Değerlendirin: "), m("7x+6y-12"), t(", "), m("x=-2"), t(" ve "), m("y=3"), t(" iken.")]),
              ex("Sıra Sizde 3.114", [t("Değerlendirin: "), m("8x-6y+13"), t(", "), m("x=-3"), t(" ve "), m("y=-5"), t(" iken.")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sözel ifadelerde “çarpımı” çarpma işlemini, “bölümü” ise bölme işlemini anlatır. Sayıların sırasına dikkat ederiz.",
              ),
              ex(
                "Örnek 3.58",
                [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("-2"), t(" ile "), m("14"), t("'ün çarpımı.")],
                sol("Çözüm: Çarpım, çarpma demektir. İfade -2·14 olur ve sonuç -28'dir."),
              ),
              ex("Sıra Sizde 3.115", [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("-5"), t(" ile "), m("12"), t("'nin çarpımı.")]),
              ex("Sıra Sizde 3.116", [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("8"), t(" ile "), m("-13"), t("'ün çarpımı.")]),
              ex(
                "Örnek 3.59",
                [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("-56"), t(" ile "), m("-7"), t("'nin bölümü.")],
                sol("Çözüm: Bölüm, bölme demektir. İfade -56÷(-7) olur. İşaretler aynı olduğu için sonuç 8'dir."),
              ),
              ex("Sıra Sizde 3.117", [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("-63"), t(" ile "), m("-9"), t("'un bölümü.")]),
              ex("Sıra Sizde 3.118", [t("Cebirsel ifadeye çevirip sadeleştirin: "), m("-72"), t(" ile "), m("-9"), t("'un bölümü.")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "3.6",
    sections: [
      {
        sectionSlug: "denklemin-cozumunu-kontrol-etme",
        replaceBlocks: [
          ...removeBlocks(8),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir denklemin çözümü, değişken yerine yazıldığında denklemi doğru yapan değerdir. Tam sayılarla çalışırken de kontrol yöntemi değişmez: değeri yerine yazar, iki tarafın eşit olup olmadığına bakarız.",
              ),
              pt(
                "Bir aday değer denklemi doğru yapıyorsa çözümdür; doğru yapmıyorsa çözüm değildir.",
              ),
              ex(
                "Örnek 3.60",
                [
                  t("Aşağıdaki değerlerin "),
                  m("2x-5=-13"),
                  t(" denkleminin çözümü olup olmadığını belirleyin: ⓐ "),
                  m("x=4"),
                  t(" ⓑ "),
                  m("x=-4"),
                  t(" ⓒ "),
                  m("x=-9"),
                  t("."),
                ],
                sol(
                  "Çözüm: Her değeri x yerine yazarız. ⓐ x=4 için 2·4-5=3 olur; -13'e eşit değildir, çözüm değildir.",
                  "ⓑ x=-4 için 2(-4)-5=-8-5=-13 olur; denklem doğru olduğundan x=-4 çözümdür.",
                  "ⓒ x=-9 için 2(-9)-5=-23 olur; -13'e eşit değildir, çözüm değildir.",
                ),
              ),
              ex(
                "Sıra Sizde 3.119",
                [
                  m("2x-8=-14"),
                  t(" için ⓐ "),
                  m("x=-11"),
                  t(" ⓑ "),
                  m("x=11"),
                  t(" ⓒ "),
                  m("x=-3"),
                  t(" değerlerini kontrol edin."),
                ],
              ),
              ex(
                "Sıra Sizde 3.120",
                [
                  m("2y+3=-11"),
                  t(" için ⓐ "),
                  m("y=4"),
                  t(" ⓑ "),
                  m("y=-4"),
                  t(" ⓒ "),
                  m("y=-7"),
                  t(" değerlerini kontrol edin."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
        replaceBlocks: [
          ...removeBlocks(10),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir denklemin iki tarafına aynı sayıyı ekler ya da iki tarafından aynı sayıyı çıkarırsak eşitlik bozulmaz. Bu özellik, değişkeni yalnız bırakmak için kullanılır.",
              ),
              pt(
                "Denklem çözerken amaç, değişkenin yanındaki toplama veya çıkarma işlemini ters işlemle kaldırmaktır.",
              ),
              ex(
                "Örnek 3.61",
                [t("Çözün: "), m("y+9=5"), t(".")],
                sol(
                  "Çözüm: y'nin yanında +9 vardır. Bunu kaldırmak için iki taraftan 9 çıkarırız.",
                  "y+9-9=5-9 olduğundan y=-4 bulunur.",
                  "Kontrol: -4+9=5, bu yüzden çözüm doğrudur.",
                ),
              ),
              ex("Sıra Sizde 3.121", [t("Çözün: "), m("y+11=7")]),
              ex("Sıra Sizde 3.122", [t("Çözün: "), m("y+15=-4")]),
              ex(
                "Örnek 3.62",
                [t("Çözün: "), m("a-6=-8"), t(".")],
                sol(
                  "Çözüm: a'nın yanında -6 vardır. İki tarafa 6 ekleriz.",
                  "a-6+6=-8+6 olduğundan a=-2 olur.",
                  "Kontrol: -2-6=-8, bu yüzden çözüm doğrudur.",
                ),
              ),
              ex("Sıra Sizde 3.123", [t("Çözün: "), m("a-2=-8")]),
              ex("Sıra Sizde 3.124", [t("Çözün: "), m("n-4=-8")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "esitligin-bolme-ozelligini-modelleme",
        replaceBlocks: [
          ...removeBlocks(19),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Şimdi değişkenin bir sayı ile çarpıldığı denklemlere geçiyoruz. Bu tür denklemlerde zarf ve sayaç modeli, toplamın eş gruplara ayrıldığını gösterir.",
              ),
              pt(
                "Örneğin iki eş zarfın toplamı 6 sayaçsa her zarf aynı sayıda sayaç içerir. Bu durum 2x=6 denklemiyle gösterilir ve 6 sayaç 2 eş gruba ayrıldığı için x=3 olur.",
              ),
              p([
                t("Aynı düşünce "),
                m("3x=12"),
                t(" için de geçerlidir: 12 sayaç 3 eş gruba ayrılır, her grupta "),
                m("4"),
                t(" sayaç vardır."),
              ]),
              ex(
                "Örnek 3.63",
                [
                  t("Zarf ve sayaç modeli 4 eş zarfın toplam 20 sayaca eşit olduğunu gösteriyor. Denklemi yazıp çözün."),
                ],
                sol(
                  "Çözüm: Her zarf x sayaç içerirse model 4x=20 denklemini verir.",
                  "Her zarfı bulmak için iki tarafı 4'e böleriz: x=5.",
                  "Kontrol: 4 zarfın her birinde 5 sayaç varsa toplam 20 sayaç olur.",
                ),
              ),
              pt(
                "Eşitliğin bölme özelliği şunu söyler: Bir denklemin iki tarafını aynı sıfır olmayan sayıya bölersek eşitlik korunur.",
              ),
              ex(
                "Sıra Sizde 3.125",
                [
                  t("Dört eş zarf toplam 12 sayacı gösteriyor. Denklemi yazıp çözün."),
                ],
              ),
              ex(
                "Sıra Sizde 3.126",
                [
                  t("Üç eş zarf toplam 6 sayacı gösteriyor. Denklemi yazıp çözün."),
                ],
              ),
            ],
          },
        ],
      },
      {
        sectionSlug: "bolme-ozelligiyle-denklem-cozme",
        replaceBlocks: [
          ...removeBlocks(9),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Değişken bir sayı ile çarpılmışsa değişkeni yalnız bırakmak için denklemin iki tarafını o sayıya böleriz. Bölen sıfır olamaz.",
              ),
              ex(
                "Örnek 3.64",
                [t("Çözün: "), m("7x=-49"), t(".")],
                sol(
                  "Çözüm: x, 7 ile çarpılmıştır. İki tarafı 7'ye böleriz.",
                  "7x/7=-49/7 olduğundan x=-7 bulunur.",
                  "Kontrol: 7(-7)=-49, çözüm doğrudur.",
                ),
              ),
              ex("Sıra Sizde 3.127", [t("Çözün: "), m("8a=56")]),
              ex("Sıra Sizde 3.128", [t("Çözün: "), m("11n=121")]),
              ex(
                "Örnek 3.65",
                [t("Çözün: "), m("-3y=63"), t(".")],
                sol(
                  "Çözüm: y, -3 ile çarpılmıştır. İki tarafı -3'e böleriz.",
                  "-3y/(-3)=63/(-3) olduğundan y=-21 olur.",
                  "Kontrol: -3(-21)=63, bu yüzden çözüm doğrudur.",
                ),
              ),
              ex("Sıra Sizde 3.129", [t("Çözün: "), m("-8p=96")]),
              ex("Sıra Sizde 3.130", [t("Çözün: "), m("-12m=108")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "denklem-kurup-cozme",
        replaceBlocks: [
          ...removeBlocks(10),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sözel ifadeleri çözerken önce cümledeki ilişkiyi denkleme çeviririz. Sonra uygun ters işlemi kullanarak değişkeni yalnız bırakırız.",
              ),
              ex(
                "Örnek 3.66",
                [t("Denklem kurup çözün: "), m("x"), t("'ten 5 fazla -3'e eşittir.")],
                sol(
                  "Çözüm: “5 fazla” toplama anlatır; denklem x+5=-3 olur.",
                  "İki taraftan 5 çıkarırız: x=-8.",
                  "Kontrol: -8+5=-3.",
                ),
              ),
              ex("Sıra Sizde 3.131", [t("Denklem kurup çözün: "), m("x"), t("'ten 7 fazla -2'ye eşittir.")]),
              ex("Sıra Sizde 3.132", [t("Denklem kurup çözün: "), m("y"), t("'den 11 fazla 2'ye eşittir.")]),
              ex(
                "Örnek 3.67",
                [t("Denklem kurup çözün: "), m("n"), t(" ile 6'nın farkı -10'dur.")],
                sol(
                  "Çözüm: “n ile 6'nın farkı” n-6 demektir. Denklem n-6=-10 olur.",
                  "İki tarafa 6 ekleriz ve n=-4 buluruz.",
                  "Kontrol: -4-6=-10.",
                ),
              ),
              ex("Sıra Sizde 3.133", [t("Denklem kurup çözün: "), m("p"), t(" ile 2'nin farkı -4'tür.")]),
              ex("Sıra Sizde 3.134", [t("Denklem kurup çözün: "), m("q"), t(" ile 7'nin farkı -3'tür.")]),
              ex(
                "Örnek 3.68",
                [t("Denklem kurup çözün: 108 sayısı -9 ile "), m("y"), t("'nin çarpımıdır.")],
                sol(
                  "Çözüm: Cümle 108=-9y denklemini verir.",
                  "İki tarafı -9'a böleriz: y=-12.",
                  "Kontrol: -9(-12)=108.",
                ),
              ),
              ex("Sıra Sizde 3.135", [t("Denklem kurup çözün: 132 sayısı -12 ile "), m("y"), t("'nin çarpımıdır.")]),
              ex("Sıra Sizde 3.136", [t("Denklem kurup çözün: 117 sayısı -13 ile "), m("z"), t("'nin çarpımıdır.")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "4.2",
    sections: [
      {
        sectionSlug: "kesrin-anlami",
        replaceBlocks: [
          ...removeBlocks(30),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesir, bir bütünün eş parçalarından kaçının alındığını gösterir. Payda bütünün kaç eş parçaya ayrıldığını, pay ise bu parçalardan kaçının seçildiğini anlatır.",
              ),
              p([
                t("Örneğin "),
                m("\\frac{1}{2}"),
                t(" bir bütünün iki eş parçasından birini; "),
                m("\\frac{3}{4}"),
                t(" ise dört eş parçadan üçünü gösterir. Payda sıfır olamaz."),
              ]),
              ex(
                "Örnek 4.1",
                [
                  t("Boyalı kısmı kesirle adlandırın: ⓐ 8 eş parçalı dairenin 5 parçası boyalı. ⓑ 9 eş parçalı karenin 2 parçası boyalı."),
                ],
                sol(
                  "Çözüm: Payda toplam eş parça sayısıdır, pay boyalı parça sayısıdır.",
                  "ⓐ 8 parçanın 5'i boyalı olduğu için kesir 5/8'dir. ⓑ 9 parçanın 2'si boyalı olduğu için kesir 2/9'dur.",
                ),
              ),
              ex("Sıra Sizde 4.1", [t("Boyalı kısmı kesirle adlandırın: ⓐ 8 parçanın 3'ü boyalı. ⓑ 9 parçanın 4'ü boyalı.")]),
              ex("Sıra Sizde 4.2", [t("Boyalı kısmı kesirle adlandırın: ⓐ 5 parçanın 3'ü boyalı. ⓑ 4 parçanın 3'ü boyalı.")]),
              ex(
                "Örnek 4.2",
                [m("\\frac{3}{4}"), t(" kesrini daire modeliyle gösterin.")],
                sol(
                  "Çözüm: Payda 4 olduğu için daireyi 4 eş parçaya ayırırız. Pay 3 olduğu için bu parçalardan 3'ünü boyarız.",
                ),
              ),
              ex("Sıra Sizde 4.3", [m("\\frac{6}{8}"), t(" kesrini daire modeliyle gösterin.")]),
              ex("Sıra Sizde 4.4", [m("\\frac{2}{5}"), t(" kesrini dikdörtgen modeliyle gösterin.")]),
              pt(
                "Kesir karoları veya kesir daireleri, bir bütünün farklı eş parçalara ayrılmış hallerini karşılaştırmayı kolaylaştırır.",
              ),
              ex(
                "Örnek 4.3",
                [t("Kesir karolarıyla bir bütünü kaç tane 1/2, 1/3 ve 1/4 parçanın tamamladığını belirleyin.")],
                sol(
                  "Çözüm: 2 tane yarım bir bütünü tamamlar; bu yüzden 2/2=1. 3 tane üçte bir bir bütündür; 3/3=1. 4 tane dörtte bir de bir bütündür; 4/4=1.",
                ),
              ),
              ex("Sıra Sizde 4.5", [t("3 tane üçte bir parçayla kaç bütün yapılır?")]),
              ex("Sıra Sizde 4.6", [t("8 tane sekizde bir parçayla kaç bütün yapılır?")]),
              ex(
                "Örnek 4.4",
                [t("Kesir daireleriyle bütün oluşturun: ⓐ 3 yarım ⓑ 8 beşte bir ⓒ 7 üçte bir.")],
                sol(
                  "Çözüm: ⓐ 3 yarım, 1 bütün ve 1/2 eder. ⓑ 8 beşte bir, 1 bütün ve 3/5 eder. ⓒ 7 üçte bir, 2 bütün ve 1/3 eder.",
                ),
              ),
              ex("Sıra Sizde 4.7", [t("5 tane üçte bir parçayla kaç bütün ve ne kadar artan parça oluşur?")]),
              ex("Sıra Sizde 4.8", [t("5 tane yarım parçayla kaç bütün ve ne kadar artan parça oluşur?")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "bilesik-kesirler-ve-tam-sayili-kesirler",
        replaceBlocks: [
          ...removeBlocks(14),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Payı paydasından büyük ya da paydasına eşit olan kesirlere bileşik kesir denir. Bir bütün ve bir kesirden oluşan yazıma tam sayılı kesir denir.",
              ),
              p([
                t("Örneğin "),
                m("\\frac{8}{5}=1\\frac{3}{5}"),
                t(" çünkü 5 tane beşte bir 1 bütün yapar ve 3 beşte bir artar."),
              ]),
              ex("Sıra Sizde 4.9", [t("Modeli adlandırın ve tam sayılı kesir olarak yazın: 5 tane üçte bir parça.")]),
              ex("Sıra Sizde 4.10", [t("Modeli adlandırın ve tam sayılı kesir olarak yazın: 13 tane sekizde bir parça.")]),
              ex(
                "Örnek 4.6",
                [m("\\frac{11}{8}"), t(" kesrini modelleyin.")],
                sol(
                  "Çözüm: Payda 8 olduğundan her bütün 8 eş parçaya ayrılır. 11 sekizde bir için önce 8/8 ile 1 bütün boyanır, sonra ikinci bütünde 3/8 boyanır. Sonuç 1 3/8'dir.",
                ),
              ),
              ex("Sıra Sizde 4.11", [m("\\frac{7}{6}"), t(" kesrini modelleyin.")]),
              ex("Sıra Sizde 4.12", [m("\\frac{6}{5}"), t(" kesrini modelleyin.")]),
              ex(
                "Örnek 4.7",
                [m("\\frac{11}{6}"), t(" bileşik kesrini tam sayılı kesir olarak yazın.")],
                sol(
                  "Çözüm: 6/6 bir bütün eder. 11 altıda bir parçadan 6'sı 1 bütün yapar, 5/6 kalır. Bu yüzden 11/6=1 5/6.",
                ),
              ),
              ex("Sıra Sizde 4.13", [m("\\frac{9}{7}"), t(" kesrini tam sayılı kesir olarak yazın.")]),
              ex("Sıra Sizde 4.14", [m("\\frac{7}{4}"), t(" kesrini tam sayılı kesir olarak yazın.")]),
              ex(
                "Örnek 4.8",
                [m("1\\frac{4}{5}"), t(" tam sayılı kesrini bileşik kesir olarak yazın.")],
                sol(
                  "Çözüm: 1 bütün 5/5'tir. 5/5 ile 4/5 toplanır ve 9/5 bulunur.",
                ),
              ),
              ex("Sıra Sizde 4.15", [m("1\\frac{3}{8}"), t(" tam sayılı kesrini bileşik kesir olarak yazın.")]),
              ex("Sıra Sizde 4.16", [m("1\\frac{5}{6}"), t(" tam sayılı kesrini bileşik kesir olarak yazın.")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
        replaceBlocks: [
          ...removeBlocks(17),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bileşik kesri tam sayılı kesre çevirmek için payı paydaya böleriz. Bölüm tam kısım, kalan pay, eski payda ise payda olur.",
              ),
              ex(
                "Örnek 4.9",
                [m("\\frac{11}{6}"), t(" kesrini tam sayılı kesre çevirin.")],
                sol("Çözüm: 11÷6=1 kalan 5. Bu nedenle 11/6=1 5/6."),
              ),
              ex("Sıra Sizde 4.17", [m("\\frac{13}{7}"), t(" kesrini tam sayılı kesre çevirin.")]),
              ex("Sıra Sizde 4.18", [m("\\frac{14}{9}"), t(" kesrini tam sayılı kesre çevirin.")]),
              ex(
                "Örnek 4.10",
                [m("\\frac{33}{8}"), t(" kesrini tam sayılı kesre çevirin.")],
                sol("Çözüm: 33÷8=4 kalan 1. Sonuç 4 1/8'dir."),
              ),
              ex("Sıra Sizde 4.19", [m("\\frac{23}{7}"), t(" kesrini tam sayılı kesre çevirin.")]),
              ex("Sıra Sizde 4.20", [m("\\frac{48}{11}"), t(" kesrini tam sayılı kesre çevirin.")]),
              pt(
                "Tam sayılı kesri bileşik kesre çevirmek için tam kısmı paydayla çarpar, payı ekler ve aynı paydayı koruruz.",
              ),
              ex(
                "Örnek 4.11",
                [m("4\\frac{2}{3}"), t(" kesrini bileşik kesre çevirin.")],
                sol("Çözüm: 4·3=12 ve 12+2=14. Sonuç 14/3'tür."),
              ),
              ex("Sıra Sizde 4.21", [m("3\\frac{5}{7}"), t(" kesrini bileşik kesre çevirin.")]),
              ex("Sıra Sizde 4.22", [m("2\\frac{7}{8}"), t(" kesrini bileşik kesre çevirin.")]),
              ex(
                "Örnek 4.12",
                [m("10\\frac{2}{7}"), t(" kesrini bileşik kesre çevirin.")],
                sol("Çözüm: 10·7=70 ve 70+2=72. Sonuç 72/7'dir."),
              ),
              ex("Sıra Sizde 4.23", [m("4\\frac{6}{11}"), t(" kesrini bileşik kesre çevirin.")]),
              ex("Sıra Sizde 4.24", [m("11\\frac{1}{3}"), t(" kesrini bileşik kesre çevirin.")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "denk-kesirleri-modelleme",
        replaceBlocks: [
          ...removeBlocks(12),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Aynı miktarı gösteren farklı kesirlere denk kesirler denir. Bir bütünün yarısı, iki dörtte bir ya da dört sekizde bir olarak da gösterilebilir.",
              ),
              ex(
                "Örnek 4.13",
                [t("Kesir karolarıyla denk kesirleri bulun: ⓐ kaç sekizde bir 1/2 eder? ⓑ kaç onda bir 1/2 eder? ⓒ kaç on ikide bir 1/2 eder?")],
                sol("Çözüm: 1/2=4/8=5/10=6/12. Bu yüzden yanıtlar sırasıyla 4, 5 ve 6 parçadır."),
              ),
              ex("Sıra Sizde 4.25", [t("Kaç sekizde bir, 1/4'e eşittir?")]),
              ex("Sıra Sizde 4.26", [t("Kaç on ikide bir, 1/4'e eşittir?")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "denk-kesir-bulma",
        replaceBlocks: [
          ...removeBlocks(16),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Denk kesir bulmak için payı ve paydayı aynı sıfır olmayan sayıyla çarparız. Bu işlem kesrin değerini değiştirmez, yalnızca parçaların adını değiştirir.",
              ),
              ex(
                "Örnek 4.14",
                [m("\\frac{2}{5}"), t(" kesrine denk üç kesir bulun.")],
                sol("Çözüm: Pay ve paydayı 2, 3 ve 5 ile çarpabiliriz: 2/5=4/10=6/15=10/25."),
              ),
              ex("Sıra Sizde 4.27", [m("\\frac{3}{5}"), t(" kesrine denk üç kesir bulun.")]),
              ex("Sıra Sizde 4.28", [m("\\frac{4}{5}"), t(" kesrine denk üç kesir bulun.")]),
              ex(
                "Örnek 4.15",
                [m("\\frac{2}{7}"), t(" kesrine denk ve paydası 21 olan kesri bulun.")],
                sol("Çözüm: 7'yi 21 yapmak için 3 ile çarparız. Payı da 3 ile çarparız: 2/7=6/21."),
              ),
              ex("Sıra Sizde 4.29", [m("\\frac{6}{7}"), t(" kesrine denk ve paydası 21 olan kesri bulun.")]),
              ex("Sıra Sizde 4.30", [m("\\frac{3}{10}"), t(" kesrine denk ve paydası 100 olan kesri bulun.")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirleri-sayi-dogrusunda-gosterme",
        replaceBlocks: [
          ...removeBlocks(25),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesirleri sayı doğrusunda göstermek için her bir tam sayı aralığını paydaya göre eş parçalara ayırırız. Bileşik kesirleri gerekirse tam sayılı kesre çevirerek konumu daha kolay buluruz.",
              ),
              ex(
                "Örnek 4.16",
                [t("Sayı doğrusunda gösterin: "), m("\\frac{3}{4},\\frac{4}{3},\\frac{5}{3},4\\frac{1}{5},\\frac{7}{2}")],
                sol("Çözüm: 3/4, 0 ile 1 arasındadır. 4/3=1 1/3, 5/3=1 2/3, 7/2=3 1/2 ve 4 1/5 kendi aralıklarında işaretlenir."),
              ),
              ex("Sıra Sizde 4.31", [t("Sayı doğrusunda gösterin: "), m("\\frac{1}{3},\\frac{5}{4},\\frac{7}{4},2\\frac{3}{5},\\frac{9}{2}")]),
              ex("Sıra Sizde 4.32", [t("Sayı doğrusunda gösterin: "), m("\\frac{2}{3},\\frac{5}{2},\\frac{9}{4},\\frac{11}{4},3\\frac{2}{5}")]),
              pt(
                "Negatif kesirler sıfırın soluna yerleştirilir. Pozitif ve negatif eş uzaklıklı kesirler, sıfıra göre simetriktir.",
              ),
              ex(
                "Örnek 4.17",
                [t("Sayı doğrusunda gösterin: "), m("\\frac{1}{4},-\\frac{1}{4},1\\frac{1}{3},-1\\frac{1}{3},\\frac{5}{2},-\\frac{5}{2}")],
                sol("Çözüm: Pozitifler sıfırın sağına, negatifler soluna yerleştirilir. 5/2=2 1/2 ve -5/2=-2 1/2 olarak işaretlenir."),
              ),
              ex("Sıra Sizde 4.33", [t("Sayı doğrusunda gösterin: "), m("\\frac{2}{3},-\\frac{2}{3},2\\frac{1}{4},-2\\frac{1}{4},\\frac{3}{2},-\\frac{3}{2}")]),
              ex("Sıra Sizde 4.34", [t("Sayı doğrusunda gösterin: "), m("\\frac{3}{4},-\\frac{3}{4},1\\frac{1}{2},-1\\frac{1}{2},\\frac{7}{3},-\\frac{7}{3}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirleri-siralama",
        replaceBlocks: [
          ...removeBlocks(4),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesirleri karşılaştırırken sayı doğrusundaki konumlarına bakabiliriz. Sağdaki sayı daha büyük, soldaki sayı daha küçüktür. Negatif sayılarda sıfıra yakın olan daha büyüktür.",
              ),
              ex(
                "Örnek 4.18",
                [t("< veya > yazın: ⓐ "), m("-\\frac{2}{3}\\;\\_\\_\\;-1"), t(" ⓑ "), m("-3\\frac{1}{2}\\;\\_\\_\\;-3"), t(" ⓒ "), m("-\\frac{3}{7}\\;\\_\\_\\;-\\frac{3}{8}"), t(" ⓓ "), m("-2\\;\\_\\_\\;\\frac{-16}{9}")],
                sol("Çözüm: ⓐ -2/3>-1. ⓑ -3 1/2<-3. ⓒ -3/7<-3/8 çünkü -3/7 daha soldadır. ⓓ -2<-16/9."),
              ),
              ex("Sıra Sizde 4.35", [t("< veya > yazın: ⓐ "), m("-\\frac{1}{3}\\;\\_\\_\\;-1"), t(" ⓑ "), m("-1\\frac{1}{2}\\;\\_\\_\\;-2"), t(" ⓒ "), m("-\\frac{2}{3}\\;\\_\\_\\;-\\frac{1}{3}"), t(" ⓓ "), m("-3\\;\\_\\_\\;-\\frac{7}{3}")]),
              ex("Sıra Sizde 4.36", [t("< veya > yazın: ⓐ "), m("-3\\;\\_\\_\\;-\\frac{17}{5}"), t(" ⓑ "), m("-2\\frac{1}{4}\\;\\_\\_\\;-2"), t(" ⓒ "), m("-\\frac{3}{5}\\;\\_\\_\\;-\\frac{4}{5}"), t(" ⓓ "), m("-4\\;\\_\\_\\;-\\frac{10}{3}")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "4.3",
    sections: [
      {
        sectionSlug: "kesirleri-sadelestirme",
        replaceBlocks: [
          ...removeBlocks(26),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Bir kesri sadeleştirmek, pay ve paydayı aynı ortak çarpana bölerek kesrin denk ama daha yalın biçimini yazmaktır. Pay ve paydanın 1 dışında ortak çarpanı kalmadığında kesir en sade haldedir.",
              ),
              p([m("\\frac{a\\cdot c}{b\\cdot c}=\\frac{a}{b}", true)]),
              ex(
                "Örnek 4.19",
                [t("Sadeleştirin: "), m("\\frac{18}{24}"), t(".")],
                sol("Çözüm: 18 ve 24 ortak 6'ya bölünür. 18/24=3/4 olur."),
              ),
              ex("Sıra Sizde 4.37", [t("Sadeleştirin: "), m("\\frac{8}{12}")]),
              ex("Sıra Sizde 4.38", [t("Sadeleştirin: "), m("\\frac{12}{16}")]),
              ex(
                "Örnek 4.20",
                [t("Sadeleştirin: "), m("-\\frac{40}{88}"), t(".")],
                sol("Çözüm: Negatif işaret korunur. 40 ve 88 ortak 8'e bölünür; sonuç -5/11'dir."),
              ),
              ex("Sıra Sizde 4.39", [t("Sadeleştirin: "), m("-\\frac{21}{28}")]),
              ex("Sıra Sizde 4.40", [t("Sadeleştirin: "), m("-\\frac{16}{24}")]),
              ex(
                "Örnek 4.21",
                [t("Sadeleştirin: "), m("-\\frac{63}{45}"), t(".")],
                sol("Çözüm: 63 ve 45 ortak 9'a bölünür. -63/45=-7/5 olur."),
              ),
              ex("Sıra Sizde 4.41", [t("Sadeleştirin: "), m("-\\frac{54}{42}")]),
              ex("Sıra Sizde 4.42", [t("Sadeleştirin: "), m("-\\frac{81}{45}")]),
              ex(
                "Örnek 4.22",
                [t("Sadeleştirin: "), m("\\frac{48}{72}"), t(".")],
                sol("Çözüm: 48 ve 72 ortak 24'e bölünür. 48/72=2/3 olur."),
              ),
              ex("Sıra Sizde 4.43", [t("Sadeleştirin: "), m("\\frac{69}{120}")]),
              ex("Sıra Sizde 4.44", [t("Sadeleştirin: "), m("\\frac{120}{192}")]),
              ex(
                "Örnek 4.23",
                [t("Sadeleştirin: "), m("\\frac{11x}{11y}"), t(".")],
                sol("Çözüm: Pay ve paydadaki ortak 11 sadeleşir. Sonuç x/y olur."),
              ),
              ex("Sıra Sizde 4.45", [t("Sadeleştirin: "), m("\\frac{7x}{7y}")]),
              ex("Sıra Sizde 4.46", [t("Sadeleştirin: "), m("\\frac{9a}{9b}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirlerle-carpma",
        replaceBlocks: [
          ...removeBlocks(26),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesirlerle çarpma yaparken paylar kendi aralarında, paydalar kendi aralarında çarpılır. Çarpımdan önce çapraz sadeleştirme yapmak işlemi çoğu zaman kolaylaştırır.",
              ),
              p([m("\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{ac}{bd}", true)]),
              ex(
                "Örnek 4.24",
                [t("Modelleyin: "), m("\\frac{1}{2}\\cdot\\frac{3}{4}"), t(".")],
                sol("Çözüm: 3/4'ün yarısını alırız. 3/4 iki eş parçaya ayrıldığında her parça 3/8 olur."),
              ),
              ex("Sıra Sizde 4.47", [t("Modelleyin: "), m("\\frac{1}{2}\\cdot\\frac{3}{5}")]),
              ex("Sıra Sizde 4.48", [t("Modelleyin: "), m("\\frac{1}{2}\\cdot\\frac{5}{6}")]),
              ex(
                "Örnek 4.25",
                [t("Çarpın ve sadeleştirin: "), m("\\frac{2}{5}\\cdot\\frac{1}{3}"), t(".")],
                sol("Çözüm: Paylar 2·1=2, paydalar 5·3=15 verir. Sonuç 2/15'tir."),
              ),
              ex("Sıra Sizde 4.49", [t("Çarpın: "), m("\\frac{1}{3}\\cdot\\frac{2}{5}")]),
              ex("Sıra Sizde 4.50", [t("Çarpın: "), m("\\frac{3}{5}\\cdot\\frac{7}{8}")]),
              ex(
                "Örnek 4.26",
                [t("Çarpın: "), m("-\\frac{5}{6}\\cdot\\left(-\\frac{9}{10}\\right)"), t(".")],
                sol("Çözüm: İki negatifin çarpımı pozitiftir. Sadeleştirme sonrası sonuç 3/4'tür."),
              ),
              ex("Sıra Sizde 4.51", [t("Çarpın: "), m("-\\frac{4}{7}\\left(-\\frac{5}{8}\\right)")]),
              ex("Sıra Sizde 4.52", [t("Çarpın: "), m("-\\frac{7}{12}\\left(-\\frac{8}{9}\\right)")]),
              ex(
                "Örnek 4.27",
                [t("Çarpın: "), m("-\\frac{10}{21}\\cdot\\frac{7}{15}"), t(".")],
                sol("Çözüm: İşaret negatiftir. 10 ile 15, 7 ile 21 sadeleşir; sonuç -2/9 olur."),
              ),
              ex("Sıra Sizde 4.53", [t("Çarpın: "), m("-\\frac{10}{28}\\cdot\\frac{8}{15}")]),
              ex("Sıra Sizde 4.54", [t("Çarpın: "), m("-\\frac{9}{20}\\cdot\\frac{5}{12}")]),
              ex(
                "Örnek 4.28",
                [t("Çarpın: ⓐ "), m("\\frac{1}{6}\\cdot 42"), t(" ⓑ "), m("\\frac{5}{4}(-8x)")],
                sol("Çözüm: ⓐ 42'nin altıda biri 7'dir. ⓑ 8 ile 4 sadeleşir; sonuç -10x olur."),
              ),
              ex("Sıra Sizde 4.55", [t("Çarpın: ⓐ "), m("\\frac{1}{8}\\cdot72"), t(" ⓑ "), m("\\frac{11}{3}(-9a)")]),
              ex("Sıra Sizde 4.56", [t("Çarpın: ⓐ "), m("\\frac{3}{8}\\cdot64"), t(" ⓑ "), m("16x\\cdot\\frac{11}{12}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "ters-kesir",
        replaceBlocks: [
          ...removeBlocks(15),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "İki sayının çarpımı 1 ise bu sayılar birbirinin tersidir. Bir kesrin tersini bulmak için pay ile paydayı yer değiştiririz; negatif kesirde işaret negatif kalır.",
              ),
              ex(
                "Örnek 4.29",
                [t("Tersini bulun: ⓐ "), m("\\frac{3}{8}"), t(" ⓑ "), m("-\\frac{1}{2}"), t(" ⓒ "), m("\\frac{9}{5}"), t(" ⓓ "), m("-5")],
                sol("Çözüm: Pay ve payda yer değiştirir. ⓐ 8/3 ⓑ -2 ⓒ 5/9 ⓓ -1/5."),
              ),
              ex("Sıra Sizde 4.57", [t("Tersini bulun: ⓐ "), m("\\frac{5}{7}"), t(" ⓑ "), m("-\\frac{1}{8}"), t(" ⓒ "), m("-\\frac{11}{4}"), t(" ⓓ "), m("14")]),
              ex("Sıra Sizde 4.58", [t("Tersini bulun: ⓐ "), m("\\frac{3}{7}"), t(" ⓑ "), m("-\\frac{1}{12}"), t(" ⓒ "), m("-\\frac{14}{9}"), t(" ⓓ "), m("21")]),
              ex(
                "Örnek 4.30",
                [t("Her sayı için karşıtını, mutlak değerini ve tersini bulun: "), m("-\\frac{3}{8},\\frac{1}{2},\\frac{9}{5},-5")],
                sol("Çözüm: Karşıt işareti değiştirir, mutlak değer uzaklığı verir, ters ise pay ve paydayı değiştirir. Sonuçlar sırasıyla: 3/8, 3/8, -8/3; -1/2, 1/2, 2; -9/5, 9/5, 5/9; 5, 5, -1/5."),
              ),
              ex("Sıra Sizde 4.59", [t("Tabloyu doldurun: "), m("-\\frac{5}{8},\\frac{1}{4},\\frac{8}{3},-8")]),
              ex("Sıra Sizde 4.60", [t("Tabloyu doldurun: "), m("-\\frac{4}{7},\\frac{1}{8},\\frac{9}{4},-1")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirlerle-bolme",
        replaceBlocks: [
          ...removeBlocks(26),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesirlerle bölme, bölen kesrin tersiyle çarpma işlemidir. Bir modelde ise bölme, verilen miktarın içinde bölen parçadan kaç tane bulunduğunu sorar.",
              ),
              p([m("\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}", true)]),
              ex(
                "Örnek 4.31",
                [t("Modelleyin: "), m("\\frac{1}{2}\\div\\frac{1}{4}"), t(".")],
                sol("Çözüm: Bir yarımın içinde iki tane dörtte bir vardır. Sonuç 2'dir."),
              ),
              ex("Sıra Sizde 4.61", [t("Modelleyin: "), m("\\frac{1}{3}\\div\\frac{1}{6}")]),
              ex("Sıra Sizde 4.62", [t("Modelleyin: "), m("\\frac{1}{2}\\div\\frac{1}{4}")]),
              ex(
                "Örnek 4.32",
                [t("Modelleyin: "), m("2\\div\\frac{1}{4}"), t(".")],
                sol("Çözüm: Her bütün 4 çeyrek içerir. 2 bütün 8 çeyrek içerdiği için sonuç 8'dir."),
              ),
              ex("Sıra Sizde 4.63", [t("Modelleyin: "), m("2\\div\\frac{1}{3}")]),
              ex("Sıra Sizde 4.64", [t("Modelleyin: "), m("3\\div\\frac{1}{2}")]),
              ex(
                "Örnek 4.33",
                [t("Bölün: "), m("\\frac{3}{5}\\div\\frac{2}{7}"), t(".")],
                sol("Çözüm: 2/7'nin tersi 7/2'dir. 3/5·7/2=21/10 olur."),
              ),
              ex("Sıra Sizde 4.65", [t("Bölün: "), m("\\frac{3}{7}\\div\\left(-\\frac{2}{3}\\right)")]),
              ex("Sıra Sizde 4.66", [t("Bölün: "), m("\\frac{2}{3}\\div\\left(-\\frac{7}{5}\\right)")]),
              ex(
                "Örnek 4.34",
                [t("Bölün: "), m("\\frac{3}{5}\\div\\frac{p}{7}"), t(".")],
                sol("Çözüm: p/7'nin tersi 7/p'dir. Çarpınca 21/(5p) bulunur; p sıfır olmamalıdır."),
              ),
              ex("Sıra Sizde 4.67", [t("Bölün: "), m("\\frac{3}{5}\\div\\frac{p}{7}")]),
              ex("Sıra Sizde 4.68", [t("Bölün: "), m("\\frac{5}{8}\\div\\frac{q}{3}")]),
              ex(
                "Örnek 4.35",
                [t("Bölün: "), m("-\\frac{2}{3}\\div\\left(-\\frac{5}{6}\\right)"), t(".")],
                sol("Çözüm: İki negatifin bölümü pozitiftir. -2/3·(-6/5)=12/15=4/5 olur."),
              ),
              ex("Sıra Sizde 4.69", [t("Bölün: "), m("-\\frac{2}{3}\\div\\left(-\\frac{5}{6}\\right)")]),
              ex("Sıra Sizde 4.70", [t("Bölün: "), m("-\\frac{5}{6}\\div\\left(-\\frac{2}{3}\\right)")]),
              ex(
                "Örnek 4.36",
                [t("Bölün: "), m("\\frac{7}{27}\\div\\frac{35}{36}"), t(".")],
                sol("Çözüm: 7/27·36/35 yapılır. 7 ile 35, 36 ile 27 sadeleşir; sonuç 4/15'tir."),
              ),
              ex("Sıra Sizde 4.71", [t("Bölün: "), m("\\frac{7}{27}\\div\\frac{35}{36}")]),
              ex("Sıra Sizde 4.72", [t("Bölün: "), m("\\frac{5}{14}\\div\\frac{15}{28}")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "4.4",
    sections: [
      {
        sectionSlug: "karma-kesirlerle-carpma-ve-bolme",
        replaceBlocks: [
          ...removeBlocks(13),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Tam sayılı kesirlerle çarpma ve bölme yaparken önce her tam sayılı kesri bileşik kesre çeviririz. Sonra kesirlerle çarpma ya da bölme kurallarını uygularız.",
              ),
              p([
                t("Bölme işleminde bölen kesrin tersini alıp çarparız. Örneğin "),
                m("2\\frac{1}{2}\\div1\\frac{1}{4}"),
                t(" işlemi "),
                m("\\frac{5}{2}\\div\\frac{5}{4}"),
                t(" olarak yazılır."),
              ]),
              ex(
                "Örnek 4.37",
                [t("Çarpın: "), m("3\\frac{1}{3}\\cdot\\frac{5}{8}")],
                sol(
                  "Çözüm: 3 1/3 önce 10/3 olarak yazılır.",
                  "10/3·5/8 işleminde 10 ile 8 ortak 2'ye bölünür; sonuç 25/12=2 1/12 olur.",
                ),
              ),
              ex("Sıra Sizde 4.73", [t("Çarpın ve sadeleştirilmiş biçimde yazın: "), m("5\\frac{2}{3}\\cdot\\frac{6}{17}")]),
              ex("Sıra Sizde 4.74", [t("Çarpın ve sadeleştirilmiş biçimde yazın: "), m("\\frac{3}{7}\\cdot5\\frac{1}{4}")]),
              ex(
                "Örnek 4.38",
                [t("Çarpın ve sadeleştirilmiş biçimde yazın: "), m("2\\frac{4}{5}\\left(-1\\frac{7}{8}\\right)")],
                sol(
                  "Çözüm: 2 4/5=14/5 ve -1 7/8=-15/8 olur.",
                  "Çarpım negatiftir. 14/5·15/8 işleminde sadeleştirme yapılır ve sonuç -21/4=-5 1/4 bulunur.",
                ),
              ),
              ex("Sıra Sizde 4.75", [t("Çarpın ve sadeleştirilmiş biçimde yazın: "), m("5\\frac{5}{7}\\left(-2\\frac{5}{8}\\right)")]),
              ex("Sıra Sizde 4.76", [t("Çarpın ve sadeleştirilmiş biçimde yazın: "), m("-3\\frac{2}{5}\\cdot4\\frac{1}{6}")]),
              ex(
                "Örnek 4.39",
                [t("Bölün ve sadeleştirilmiş biçimde yazın: "), m("3\\frac{4}{7}\\div5")],
                sol(
                  "Çözüm: 3 4/7=25/7. 5 sayısını 5/1 olarak düşünürüz.",
                  "25/7÷5=25/7·1/5=5/7 olur.",
                ),
              ),
              ex("Sıra Sizde 4.77", [t("Bölün ve sadeleştirilmiş biçimde yazın: "), m("4\\frac{3}{8}\\div7")]),
              ex("Sıra Sizde 4.78", [t("Bölün ve sadeleştirilmiş biçimde yazın: "), m("2\\frac{5}{8}\\div3")]),
              ex(
                "Örnek 4.40",
                [t("Bölün: "), m("2\\frac{1}{2}\\div1\\frac{1}{4}")],
                sol(
                  "Çözüm: 2 1/2=5/2 ve 1 1/4=5/4 olur.",
                  "5/2÷5/4=5/2·4/5=2 bulunur.",
                ),
              ),
              ex("Sıra Sizde 4.79", [t("Bölün ve sadeleştirilmiş biçimde yazın: "), m("2\\frac{2}{3}\\div1\\frac{1}{3}")]),
              ex("Sıra Sizde 4.80", [t("Bölün ve sadeleştirilmiş biçimde yazın: "), m("3\\frac{3}{4}\\div1\\frac{1}{2}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirli-sozel-ifadeler",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Sözel ifadelerde “bölümü” ve “oranı” sözleri çoğu zaman kesir çizgisiyle yazılır. Kesir çizgisi, üstteki ifadenin alttaki ifadeye bölündüğünü gösterir.",
              ),
              p([
                t("Örneğin "),
                m("a"),
                t(" ile "),
                m("b"),
                t("'nin bölümü "),
                m("\\frac{a}{b}"),
                t(" olarak yazılır; "),
                m("b"),
                t(" sıfır olmamalıdır."),
              ]),
              ex(
                "Örnek 4.41",
                [t("Cebirsel ifadeye çevirin: “"), m("3x"), t(" ile 8'in bölümü.”")],
                sol("Çözüm: Bölüm kesir çizgisiyle yazılır. İfade 3x/8 olur."),
              ),
              ex("Sıra Sizde 4.81", [t("Cebirsel ifadeye çevirin: "), m("9s"), t(" ile 14'ün bölümü.")]),
              ex("Sıra Sizde 4.82", [t("Cebirsel ifadeye çevirin: "), m("5y"), t(" ile 6'nın bölümü.")]),
              ex(
                "Örnek 4.42",
                [t("Cebirsel ifadeye çevirin: "), m("m"), t(" ile "), m("n"), t("'nin farkının "), m("p"), t("'ye bölümü.")],
                sol("Çözüm: Önce fark paranteze alınır, sonra p'ye bölünür. İfade (m-n)/p olur."),
              ),
              ex("Sıra Sizde 4.83", [t("Cebirsel ifadeye çevirin: "), m("a"), t(" ile "), m("b"), t("'nin farkının "), m("cd"), t("'ye bölümü.")]),
              ex("Sıra Sizde 4.84", [t("Cebirsel ifadeye çevirin: "), m("p"), t(" ile "), m("q"), t("'nin toplamının "), m("r"), t("'ye bölümü.")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "karmasik-kesirler",
        replaceBlocks: [
          ...removeBlocks(16),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Payında ya da paydasında kesir bulunan kesirlere karmaşık kesir denir. Karmaşık kesri sadeleştirirken ana kesir çizgisini bölme işlemi gibi okuruz.",
              ),
              p([
                t("Örneğin "),
                m("\\frac{\\frac{3}{4}}{\\frac{5}{8}}"),
                t(" ifadesi "),
                m("\\frac{3}{4}\\div\\frac{5}{8}"),
                t(" demektir."),
              ]),
              ex(
                "Örnek 4.43",
                [t("Sadeleştirin: "), m("\\frac{\\frac{3}{4}}{\\frac{5}{8}}"), t(".")],
                sol("Çözüm: 3/4÷5/8=3/4·8/5=6/5 olur."),
              ),
              ex("Sıra Sizde 4.85", [t("Sadeleştirin: "), m("\\frac{\\frac{2}{3}}{\\frac{5}{6}}")]),
              ex("Sıra Sizde 4.86", [t("Sadeleştirin: "), m("\\frac{\\frac{3}{7}}{\\frac{6}{11}}")]),
              ex(
                "Örnek 4.44",
                [t("Sadeleştirin: "), m("\\frac{-\\frac{6}{7}}{3}"), t(".")],
                sol("Çözüm: -6/7 sayısını 3'e böleriz. -6/7·1/3=-2/7 olur."),
              ),
              ex("Sıra Sizde 4.87", [t("Sadeleştirin: "), m("\\frac{-\\frac{8}{7}}{4}")]),
              ex("Sıra Sizde 4.88", [t("Sadeleştirin: "), m("-\\frac{3}{\\frac{9}{10}}")]),
              ex(
                "Örnek 4.45",
                [t("Sadeleştirin: "), m("\\frac{\\frac{x}{2}}{\\frac{xy}{6}}"), t(".")],
                sol("Çözüm: x/2÷xy/6=x/2·6/(xy). x'ler sadeleşir ve sonuç 3/y olur; y sıfır olmamalıdır."),
              ),
              ex("Sıra Sizde 4.89", [t("Sadeleştirin: "), m("\\frac{\\frac{a}{8}}{\\frac{ab}{6}}")]),
              ex("Sıra Sizde 4.90", [t("Sadeleştirin: "), m("\\frac{\\frac{p}{2}}{\\frac{pq}{8}}")]),
              ex(
                "Örnek 4.46",
                [t("Sadeleştirin: "), m("\\frac{2\\frac{3}{4}}{\\frac{1}{8}}"), t(".")],
                sol("Çözüm: 2 3/4=11/4. 11/4÷1/8=11/4·8=22 olur."),
              ),
              ex("Sıra Sizde 4.91", [t("Sadeleştirin: "), m("\\frac{\\frac{5}{7}}{1\\frac{2}{5}}")]),
              ex("Sıra Sizde 4.92", [t("Sadeleştirin: "), m("\\frac{\\frac{8}{5}}{3\\frac{1}{5}}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesir-cizgisiyle-islem-onceligi",
        replaceBlocks: [
          ...removeBlocks(21),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Negatif işaret bir kesrin önünde, payında ya da paydasında yazılabilir. Pay ve paydadan yalnızca biri negatifse kesrin değeri negatiftir; ikisi de negatifse değer pozitiftir.",
              ),
              p([
                m("-\\frac{1}{3}=\\frac{-1}{3}=\\frac{1}{-3}", true),
              ]),
              ex(
                "Örnek 4.47",
                [t("Aşağıdaki kesirlerden hangileri "), m("\\frac{7}{-8}"), t(" ile eşdeğerdir? "), m("\\frac{-7}{-8},\\frac{-7}{8},\\frac{7}{8},-\\frac{7}{8}")],
                sol("Çözüm: 7/(-8) negatiftir. Bu nedenle -7/8 ve -7/8 yazımı eşdeğerdir; diğerleri pozitiftir."),
              ),
              ex("Sıra Sizde 4.93", [t("Aşağıdaki kesirlerden hangileri "), m("\\frac{-3}{5}"), t(" ile eşdeğerdir? "), m("\\frac{-3}{-5},\\frac{3}{5},-\\frac{3}{5},\\frac{3}{-5}")]),
              ex("Sıra Sizde 4.94", [t("Aşağıdaki kesirlerden hangileri "), m("-\\frac{2}{7}"), t(" ile eşdeğerdir? "), m("\\frac{-2}{-7},\\frac{-2}{7},\\frac{2}{7},\\frac{2}{-7}")]),
              pt(
                "Kesir çizgisi de bir gruplama sembolü gibi davranır. Pay ve payda önce kendi içinde sadeleştirilir, sonra bölme yapılır.",
              ),
              ex(
                "Örnek 4.48",
                [t("Sadeleştirin: "), m("\\frac{4+8}{5-3}"), t(".")],
                sol("Çözüm: Pay 12, payda 2 olur. 12/2=6."),
              ),
              ex("Sıra Sizde 4.95", [t("Sadeleştirin: "), m("\\frac{4+6}{11-2}")]),
              ex("Sıra Sizde 4.96", [t("Sadeleştirin: "), m("\\frac{3+5}{18-2}")]),
              ex(
                "Örnek 4.49",
                [t("Sadeleştirin: "), m("\\frac{4-2(3)}{2^{2}+2}"), t(".")],
                sol("Çözüm: Pay 4-6=-2, payda 4+2=6 olur. Sonuç -2/6=-1/3'tür."),
              ),
              ex("Sıra Sizde 4.97", [t("Sadeleştirin: "), m("\\frac{6-3(5)}{3^{2}+3}")]),
              ex("Sıra Sizde 4.98", [t("Sadeleştirin: "), m("\\frac{4-4(6)}{3^{3}+3}")]),
              ex(
                "Örnek 4.50",
                [t("Sadeleştirin: "), m("\\frac{{(8-4)}^{2}}{8^{2}-4^{2}}"), t(".")],
                sol("Çözüm: Pay 4²=16, payda 64-16=48 olur. 16/48=1/3."),
              ),
              ex("Sıra Sizde 4.99", [t("Sadeleştirin: "), m("\\frac{{(11-7)}^{2}}{{11}^{2}-7^{2}}")]),
              ex("Sıra Sizde 4.100", [t("Sadeleştirin: "), m("\\frac{{(6+2)}^{2}}{6^{2}+2^{2}}")]),
              ex(
                "Örnek 4.51",
                [t("Sadeleştirin: "), m("\\frac{4(-3)+6(-2)}{-3(2)-2}"), t(".")],
                sol("Çözüm: Pay -12-12=-24, payda -6-2=-8 olur. Bölüm 3'tür."),
              ),
              ex("Sıra Sizde 4.101", [t("Sadeleştirin: "), m("\\frac{8(-2)+4(-3)}{-5(2)+3}")]),
              ex("Sıra Sizde 4.102", [t("Sadeleştirin: "), m("\\frac{7(-1)+9(-3)}{-5(3)-2}")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "4.5",
    sections: [
      {
        sectionSlug: "kesir-toplamayi-modelleme",
        replaceBlocks: [
          ...removeBlocks(10),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Aynı büyüklükteki kesir parçalarını toplarken parçaların sayısını birleştiririz. Payda, parçaların büyüklüğünü gösterdiği için aynı kalır; paylar toplanır.",
              ),
              p([
                t("Örneğin bir çeyrek ile iki çeyrek birlikte üç çeyrek eder: "),
                m("\\frac{1}{4}+\\frac{2}{4}=\\frac{3}{4}"),
                t("."),
              ]),
              ex(
                "Örnek 4.52",
                [t("Model kullanarak bulun: "), m("\\frac{1}{4}+\\frac{2}{4}"), t(".")],
                sol(
                  "Çözüm: Dörtte bir parçalardan önce 1 tane, sonra 2 tane daha alırız. Toplam 3 tane dörtte bir parça olur.",
                  "Sonuç 3/4'tür.",
                ),
              ),
              ex("Sıra Sizde 4.103", [t("Model kullanarak toplamı bulun: "), m("\\frac{1}{8}+\\frac{4}{8}")]),
              ex("Sıra Sizde 4.104", [t("Model kullanarak toplamı bulun: "), m("\\frac{1}{6}+\\frac{4}{6}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "ortak-paydali-kesirleri-toplama",
        replaceBlocks: [
          ...removeBlocks(16),
          {
            sourceBlockIndex: 1,
            blocks: [
              p([
                t("Paydaları aynı olan kesirleri toplarken payda değişmez, paylar toplanır: "),
                m("\\frac{a}{c}+\\frac{b}{c}=\\frac{a+b}{c}"),
                t(". Sonuç mümkünse sadeleştirilir."),
              ]),
              ex(
                "Örnek 4.53",
                [t("Toplamı bulun: "), m("\\frac{3}{5}+\\frac{1}{5}"), t(".")],
                sol("Çözüm: Payda 5 aynı kalır. 3+1=4 olduğu için sonuç 4/5'tir."),
              ),
              ex("Sıra Sizde 4.105", [t("Toplamı bulun: "), m("\\frac{3}{6}+\\frac{2}{6}")]),
              ex("Sıra Sizde 4.106", [t("Toplamı bulun: "), m("\\frac{3}{10}+\\frac{7}{10}")]),
              ex(
                "Örnek 4.54",
                [t("Toplamı bulun: "), m("\\frac{x}{3}+\\frac{2}{3}"), t(".")],
                sol("Çözüm: Payda 3 ortak kalır. Paylar x+2 olur; sonuç (x+2)/3'tür."),
              ),
              ex("Sıra Sizde 4.107", [t("Toplamı bulun: "), m("\\frac{x}{4}+\\frac{3}{4}")]),
              ex("Sıra Sizde 4.108", [t("Toplamı bulun: "), m("\\frac{y}{8}+\\frac{5}{8}")]),
              ex(
                "Örnek 4.55",
                [t("Toplamı bulun: "), m("-\\frac{9}{d}+\\frac{3}{d}"), t(".")],
                sol("Çözüm: Payda d ortak kalır. -9+3=-6 olduğundan sonuç -6/d olur."),
              ),
              ex("Sıra Sizde 4.109", [t("Toplamı bulun: "), m("-\\frac{7}{d}+\\frac{8}{d}")]),
              ex("Sıra Sizde 4.110", [t("Toplamı bulun: "), m("-\\frac{6}{m}+\\frac{9}{m}")]),
              ex(
                "Örnek 4.56",
                [t("Toplamı bulun: "), m("\\frac{2n}{11}+\\frac{5n}{11}"), t(".")],
                sol("Çözüm: Payda 11 aynı kalır. 2n+5n=7n olduğu için sonuç 7n/11'dir."),
              ),
              ex("Sıra Sizde 4.111", [t("Toplamı bulun: "), m("\\frac{3p}{8}+\\frac{6p}{8}")]),
              ex("Sıra Sizde 4.112", [t("Toplamı bulun: "), m("\\frac{2q}{5}+\\frac{7q}{5}")]),
              ex(
                "Örnek 4.57",
                [t("Toplamı bulun: "), m("-\\frac{3}{12}+\\left(-\\frac{5}{12}\\right)"), t(".")],
                sol("Çözüm: Payda 12 ortak kalır. -3+(-5)=-8 ve -8/12=-2/3 olur."),
              ),
              ex("Sıra Sizde 4.113", [t("Toplamı bulun: "), m("-\\frac{4}{15}+\\left(-\\frac{6}{15}\\right)")]),
              ex("Sıra Sizde 4.114", [t("Toplamı bulun: "), m("-\\frac{5}{21}+\\left(-\\frac{9}{21}\\right)")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesir-cikarmayi-modelleme",
        replaceBlocks: [
          ...removeBlocks(8),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Ortak paydalı kesirlerde çıkarma, aynı büyüklükteki parçalardan bazılarını geri almak demektir. Payda aynı kalır, paylar çıkarılır.",
              ),
              p([
                t("Örneğin "),
                m("\\frac{7}{12}-\\frac{2}{12}=\\frac{5}{12}"),
                t(" çünkü on ikilik 7 parçadan 2 parça çıkarılınca 5 parça kalır."),
              ]),
              ex(
                "Örnek 4.58",
                [t("Model kullanarak bulun: "), m("\\frac{7}{12}-\\frac{2}{12}"), t(".")],
                sol("Çözüm: 7 tane on ikide bir parçadan 2 tanesi çıkarılır. Geriye 5 tane on ikide bir parça kalır; sonuç 5/12'dir."),
              ),
              ex("Sıra Sizde 4.115", [t("Model kullanarak farkı bulun: "), m("\\frac{7}{8}-\\frac{4}{8}")]),
              ex("Sıra Sizde 4.116", [t("Model kullanarak farkı bulun: "), m("\\frac{5}{6}-\\frac{4}{6}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "ortak-paydali-kesirleri-cikarma",
        replaceBlocks: [
          ...removeBlocks(14),
          {
            sourceBlockIndex: 1,
            blocks: [
              p([
                t("Paydaları aynı olan kesirleri çıkarırken payda değişmez, paylar çıkarılır: "),
                m("\\frac{a}{c}-\\frac{b}{c}=\\frac{a-b}{c}"),
                t("."),
              ]),
              ex(
                "Örnek 4.59",
                [t("Farkı bulun: "), m("\\frac{23}{24}-\\frac{14}{24}"), t(".")],
                sol("Çözüm: Payda 24 aynı kalır. 23-14=9 olduğundan 9/24=3/8 olur."),
              ),
              ex("Sıra Sizde 4.117", [t("Farkı bulun: "), m("\\frac{19}{28}-\\frac{7}{28}")]),
              ex("Sıra Sizde 4.118", [t("Farkı bulun: "), m("\\frac{27}{32}-\\frac{11}{32}")]),
              ex(
                "Örnek 4.60",
                [t("Farkı bulun: "), m("\\frac{y}{6}-\\frac{1}{6}"), t(".")],
                sol("Çözüm: Payda 6 ortak kalır. Paylar y-1 olur; sonuç (y-1)/6'dır."),
              ),
              ex("Sıra Sizde 4.119", [t("Farkı bulun: "), m("\\frac{x}{7}-\\frac{2}{7}")]),
              ex("Sıra Sizde 4.120", [t("Farkı bulun: "), m("\\frac{y}{14}-\\frac{13}{14}")]),
              ex(
                "Örnek 4.61",
                [t("Farkı bulun: "), m("-\\frac{10}{x}-\\frac{4}{x}"), t(".")],
                sol("Çözüm: Payda x ortak kalır. -10-4=-14 olduğundan sonuç -14/x olur."),
              ),
              ex("Sıra Sizde 4.121", [t("Farkı bulun: "), m("-\\frac{9}{x}-\\frac{7}{x}")]),
              ex("Sıra Sizde 4.122", [t("Farkı bulun: "), m("-\\frac{17}{a}-\\frac{5}{a}")]),
              pt(
                "Bir ifadede toplama ve çıkarma birlikte varsa paydalar ortaksa payları soldan sağa birleştirebiliriz.",
              ),
              ex(
                "Örnek 4.62",
                [t("Sadeleştirin: "), m("\\frac{3}{8}+\\left(-\\frac{5}{8}\\right)-\\frac{1}{8}"), t(".")],
                sol("Çözüm: Payda 8 ortak kalır. 3+(-5)-1=-3 olduğundan sonuç -3/8'dir."),
              ),
              ex("Sıra Sizde 4.123", [t("Sadeleştirin: "), m("\\frac{2}{5}+\\left(-\\frac{4}{5}\\right)-\\frac{3}{5}")]),
              ex("Sıra Sizde 4.124", [t("Sadeleştirin: "), m("\\frac{5}{9}+\\left(-\\frac{4}{9}\\right)-\\frac{7}{9}")]),
            ],
          },
        ],
      },
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "4.6",
    sections: [
      {
        sectionSlug: "en-kucuk-ortak-paydayi-bulma",
        replaceBlocks: [
          ...removeBlocks(26),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Paydaları farklı kesirleri doğrudan toplayıp çıkaramayız. Önce kesirleri aynı büyüklükte parçalara, yani ortak paydaya dönüştürürüz.",
              ),
              pt(
                "Ortak paydaların en küçüğüne en küçük ortak payda, kısaca EKOP denir. EKOP, kesirlerin paydalarının EKOK'udur; paylar bu aşamada dikkate alınmaz.",
              ),
              p([
                t("Örneğin "),
                m("\\frac{1}{2}"),
                t(" ve "),
                m("\\frac{1}{3}"),
                t(" için paydalar 2 ve 3'tür. EKOK 6 olduğundan EKOP 6'dır."),
              ]),
              ex(
                "Örnek 4.63",
                [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{7}{12}"), t(" ve "), m("\\frac{5}{18}"), t(".")],
                sol("Çözüm: 12=2²·3 ve 18=2·3². EKOK 2²·3²=36 olduğu için en küçük ortak payda 36'dır."),
              ),
              ex("Sıra Sizde 4.125", [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{7}{12}"), t(" ve "), m("\\frac{11}{15}"), t(".")]),
              ex("Sıra Sizde 4.126", [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{13}{15}"), t(" ve "), m("\\frac{17}{5}"), t(".")]),
              pt(
                "Paydalar daha büyük olduğunda da aynı yöntem geçerlidir: paydaları asal çarpanlarına ayırır, her asal çarpanın en büyük kuvvetini alırız.",
              ),
              ex(
                "Örnek 4.64",
                [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{8}{15}"), t(" ve "), m("\\frac{11}{24}"), t(".")],
                sol("Çözüm: 15=3·5 ve 24=2³·3. EKOK 2³·3·5=120 olduğundan EKOP 120'dir."),
              ),
              ex("Sıra Sizde 4.127", [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{13}{24}"), t(" ve "), m("\\frac{17}{32}"), t(".")]),
              ex("Sıra Sizde 4.128", [t("Kesirlerin EKOP'unu bulun: "), m("\\frac{9}{28}"), t(" ve "), m("\\frac{21}{32}"), t(".")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "denk-kesirleri-ortak-paydayla-yazma",
        replaceBlocks: [
          ...removeBlocks(12),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "EKOP'u bulduktan sonra her kesri bu paydaya denk olacak biçimde genişletiriz. Bunu yaparken pay ve paydayı aynı sayı ile çarparız.",
              ),
              p([
                m("\\frac{1}{4}=\\frac{3}{12}"),
                t(" ve "),
                m("\\frac{1}{6}=\\frac{2}{12}"),
                t(" kesirleri buna örnektir; değer değişmez, yalnızca gösterim ortak paydaya uyarlanır."),
              ]),
              ex(
                "Örnek 4.65",
                [m("\\frac{1}{4}"), t(" ve "), m("\\frac{1}{6}"), t(" kesirlerini EKOP 12 ile denk kesirler olarak yazın.")],
                sol("Çözüm: 1/4 kesrinin paydası 12 olmak için 3 ile genişler: 3/12. 1/6 kesri 2 ile genişler: 2/12."),
              ),
              ex("Sıra Sizde 4.129", [t("EKOP 12 ile denk kesirler yazın: "), m("\\frac{3}{4}"), t(" ve "), m("\\frac{5}{6}"), t(".")]),
              ex("Sıra Sizde 4.130", [t("EKOP 60 ile denk kesirler yazın: "), m("-\\frac{7}{12}"), t(" ve "), m("\\frac{11}{15}"), t(".")]),
              ex(
                "Örnek 4.66",
                [m("\\frac{8}{15}"), t(" ve "), m("\\frac{11}{24}"), t(" kesirlerini EKOP 120 ile denk kesirler olarak yazın.")],
                sol("Çözüm: 8/15 kesri 8 ile genişleyip 64/120 olur. 11/24 kesri 5 ile genişleyip 55/120 olur."),
              ),
              ex("Sıra Sizde 4.131", [t("EKOP 96 ile denk kesirler yazın: "), m("\\frac{13}{24}"), t(" ve "), m("\\frac{17}{32}"), t(".")]),
              ex("Sıra Sizde 4.132", [t("EKOP 224 ile denk kesirler yazın: "), m("\\frac{9}{28}"), t(" ve "), m("\\frac{27}{32}"), t(".")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "farkli-paydali-kesirlerde-toplama-ve-cikarma",
        replaceBlocks: [
          ...removeBlocks(25),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Farklı paydalı kesirlerde toplama ve çıkarma için önce ortak payda kurulur. Sonra denk kesirlerin payları toplanır ya da çıkarılır.",
              ),
              ex(
                "Örnek 4.67",
                [t("Toplayın: "), m("\\frac{1}{2}+\\frac{1}{3}"), t(".")],
                sol("Çözüm: EKOP 6'dır. 1/2=3/6 ve 1/3=2/6 olduğundan toplam 5/6 olur."),
              ),
              ex("Sıra Sizde 4.133", [t("Toplayın: "), m("\\frac{1}{4}+\\frac{1}{3}"), t(".")]),
              ex("Sıra Sizde 4.134", [t("Toplayın: "), m("\\frac{1}{2}+\\frac{1}{5}"), t(".")]),
              ex(
                "Örnek 4.68",
                [t("Çıkarın: "), m("\\frac{1}{2}-\\left(-\\frac{1}{4}\\right)"), t(".")],
                sol("Çözüm: Negatif kesri çıkarmak ekleme yapmaktır. 1/2+1/4=2/4+1/4=3/4."),
              ),
              ex("Sıra Sizde 4.135", [t("Sadeleştirin: "), m("\\frac{1}{2}-\\left(-\\frac{1}{8}\\right)")]),
              ex("Sıra Sizde 4.136", [t("Sadeleştirin: "), m("\\frac{1}{3}-\\left(-\\frac{1}{6}\\right)")]),
              ex(
                "Örnek 4.69",
                [t("Toplayın: "), m("\\frac{7}{12}+\\frac{5}{18}"), t(".")],
                sol("Çözüm: EKOP 36'dır. 7/12=21/36 ve 5/18=10/36; toplam 31/36 olur."),
              ),
              ex("Sıra Sizde 4.137", [t("Toplayın: "), m("\\frac{7}{12}+\\frac{11}{15}")]),
              ex("Sıra Sizde 4.138", [t("Toplayın: "), m("\\frac{13}{15}+\\frac{17}{20}")]),
              pt(
                "Ortak paydaya geçerken paydada eksik kalan çarpanları bulmak işi hızlandırır. Her kesri yalnızca eksik çarpanla genişletmek yeterlidir.",
              ),
              ex(
                "Örnek 4.70",
                [t("Çıkarın: "), m("\\frac{7}{15}-\\frac{19}{24}"), t(".")],
                sol("Çözüm: EKOP 120'dir. 7/15=56/120 ve 19/24=95/120. Fark -39/120=-13/40 olur."),
              ),
              ex("Sıra Sizde 4.139", [t("Çıkarın: "), m("\\frac{13}{24}-\\frac{17}{32}")]),
              ex("Sıra Sizde 4.140", [t("Çıkarın: "), m("\\frac{21}{32}-\\frac{9}{28}")]),
              ex(
                "Örnek 4.71",
                [t("Toplayın: "), m("-\\frac{11}{30}+\\frac{23}{42}"), t(".")],
                sol("Çözüm: EKOP 210'dur. -11/30=-77/210 ve 23/42=115/210. Toplam 38/210=19/105 olur."),
              ),
              ex("Sıra Sizde 4.141", [t("Toplayın: "), m("-\\frac{13}{42}+\\frac{17}{35}")]),
              ex("Sıra Sizde 4.142", [t("Toplayın: "), m("-\\frac{19}{24}+\\frac{17}{32}")]),
              pt(
                "Paylarda değişken olduğunda da yöntem değişmez; ortak paydaya geçer, payları cebirsel ifade olarak birleştiririz.",
              ),
              ex(
                "Örnek 4.72",
                [t("Toplayın: "), m("\\frac{3}{5}+\\frac{x}{8}"), t(".")],
                sol("Çözüm: EKOP 40'tır. 3/5=24/40 ve x/8=5x/40; toplam (5x+24)/40 olur."),
              ),
              ex("Sıra Sizde 4.143", [t("Toplayın: "), m("\\frac{y}{6}+\\frac{7}{9}")]),
              ex("Sıra Sizde 4.144", [t("Toplayın: "), m("\\frac{x}{6}+\\frac{7}{15}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesir-islemlerini-secme-ve-kullanma",
        replaceBlocks: [
          ...removeBlocks(7),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Kesirlerde hangi işlemi yaptığımızı önce belirlemek gerekir. Toplama ve çıkarmada ortak payda gerekir; çarpma ve bölmede ise ortak payda aranmaz.",
              ),
              ex(
                "Örnek 4.73",
                [t("Sadeleştirin: ⓐ "), m("-\\frac{1}{4}+\\frac{1}{6}"), t(" ⓑ "), m("-\\frac{1}{4}\\div\\frac{1}{6}")],
                sol("Çözüm: ⓐ Ortak payda 12'dir; -3/12+2/12=-1/12. ⓑ Bölmede ters çevirip çarparız: -1/4·6=-3/2."),
              ),
              ex("Sıra Sizde 4.145", [t("Sadeleştirin: ⓐ "), m("-\\frac{3}{4}-\\frac{1}{6}"), t(" ⓑ "), m("-\\frac{3}{4}\\cdot\\frac{1}{6}")]),
              ex("Sıra Sizde 4.146", [t("Sadeleştirin: ⓐ "), m("\\frac{5}{6}\\div\\left(-\\frac{1}{4}\\right)"), t(" ⓑ "), m("\\frac{5}{6}-\\left(-\\frac{1}{4}\\right)")]),
              ex(
                "Örnek 4.74",
                [t("Sadeleştirin: ⓐ "), m("\\frac{5x}{6}-\\frac{3}{10}"), t(" ⓑ "), m("\\frac{5x}{6}\\cdot\\frac{3}{10}")],
                sol("Çözüm: ⓐ Ortak payda 30'dur; sonuç (25x-9)/30 olur. ⓑ Çarpma yapılır ve sadeleştirilince x/4 bulunur."),
              ),
              ex("Sıra Sizde 4.147", [t("Sadeleştirin: ⓐ "), m("\\frac{27a-32}{36}"), t(" ⓑ "), m("\\frac{2a}{3}")]),
              ex("Sıra Sizde 4.148", [t("Sadeleştirin: ⓐ "), m("\\frac{24k+25}{30}"), t(" ⓑ "), m("\\frac{24k}{5}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "karmasik-kesirlerde-islem-onceligi",
        replaceBlocks: [
          ...removeBlocks(9),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Karmaşık kesirlerde payda ya da payda kısmında yine kesir bulunabilir. Önce payı ve paydayı kendi içinde sadeleştirir, sonra ana kesir çizgisini bölme işlemi gibi okuruz.",
              ),
              p([
                m("\\frac{\\frac{3}{4}}{\\frac{5}{8}}=\\frac{3}{4}\\div\\frac{5}{8}", true),
              ]),
              ex(
                "Örnek 4.75",
                [t("Sadeleştirin: "), m("\\frac{{(\\frac{1}{2})}^{2}}{4+3^{2}}"), t(".")],
                sol("Çözüm: Pay (1/2)²=1/4, payda 4+9=13 olur. (1/4)/13=1/52."),
              ),
              ex("Sıra Sizde 4.149", [t("Sadeleştirin: "), m("\\frac{{(\\frac{1}{3})}^{2}}{2^{3}+2}")]),
              ex("Sıra Sizde 4.150", [t("Sadeleştirin: "), m("\\frac{1+4^{2}}{{(\\frac{1}{4})}^{2}}")]),
              ex(
                "Örnek 4.76",
                [t("Sadeleştirin: "), m("\\frac{\\frac{1}{2}+\\frac{2}{3}}{\\frac{3}{4}-\\frac{1}{6}}"), t(".")],
                sol("Çözüm: Pay 1/2+2/3=7/6, payda 3/4-1/6=7/12 olur. (7/6)÷(7/12)=2."),
              ),
              ex("Sıra Sizde 4.151", [t("Sadeleştirin: "), m("\\frac{\\frac{1}{3}+\\frac{1}{2}}{\\frac{3}{4}-\\frac{1}{3}}")]),
              ex("Sıra Sizde 4.152", [t("Sadeleştirin: "), m("\\frac{\\frac{2}{3}-\\frac{1}{2}}{\\frac{1}{4}+\\frac{1}{3}}")]),
            ],
          },
        ],
      },
      {
        sectionSlug: "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
        replaceBlocks: [
          ...removeBlocks(13),
          {
            sourceBlockIndex: 1,
            blocks: [
              pt(
                "Cebirsel ifadeleri kesirli değerlerle hesaplarken değişkenin yerine verilen kesri yazar, sonra işlem önceliğini uygularız.",
              ),
              ex(
                "Örnek 4.77",
                [t("Hesaplayın: "), m("x+\\frac{1}{3}"), t("; ⓐ "), m("x=-\\frac{1}{3}"), t(" iken ⓑ "), m("x=-\\frac{3}{4}"), t(" iken.")],
                sol("Çözüm: ⓐ -1/3+1/3=0. ⓑ -3/4+1/3=-9/12+4/12=-5/12."),
              ),
              ex("Sıra Sizde 4.153", [t("Hesaplayın: "), m("x+\\frac{3}{4}"), t("; ⓐ "), m("x=-\\frac{7}{4}"), t(" iken ⓑ "), m("x=-\\frac{5}{4}"), t(" iken.")]),
              ex("Sıra Sizde 4.154", [t("Hesaplayın: "), m("y+\\frac{1}{2}"), t("; ⓐ "), m("y=\\frac{2}{3}"), t(" iken ⓑ "), m("y=-\\frac{3}{4}"), t(" iken.")]),
              ex(
                "Örnek 4.78",
                [t("Hesaplayın: "), m("y-\\frac{5}{6}"), t("; "), m("y=-\\frac{2}{3}"), t(" iken.")],
                sol("Çözüm: y yerine -2/3 yazılır. -2/3-5/6=-4/6-5/6=-9/6=-3/2 olur."),
              ),
              ex("Sıra Sizde 4.155", [t("Hesaplayın: "), m("y-\\frac{1}{2}"), t("; "), m("y=-\\frac{1}{4}"), t(" iken.")]),
              ex("Sıra Sizde 4.156", [t("Hesaplayın: "), m("x-\\frac{3}{8}"), t("; "), m("x=-\\frac{5}{2}"), t(" iken.")]),
              ex(
                "Örnek 4.79",
                [t("Hesaplayın: "), m("2x^{2}y"), t("; "), m("x=\\frac{1}{4}"), t(" ve "), m("y=-\\frac{2}{3}"), t(" iken.")],
                sol("Çözüm: 2·(1/4)²·(-2/3)=2·1/16·(-2/3)=-1/12 olur."),
              ),
              ex("Sıra Sizde 4.157", [t("Hesaplayın: "), m("3ab^{2}"), t("; "), m("a=-\\frac{2}{3}"), t(" ve "), m("b=-\\frac{1}{2}"), t(" iken.")]),
              ex("Sıra Sizde 4.158", [t("Hesaplayın: "), m("4c^{3}d"), t("; "), m("c=-\\frac{1}{2}"), t(" ve "), m("d=-\\frac{4}{3}"), t(" iken.")]),
              ex(
                "Örnek 4.80",
                [t("Hesaplayın: "), m("\\frac{p+q}{r}"), t("; "), m("p=-4,q=-2,r=8"), t(" iken.")],
                sol("Çözüm: p+q=-4+(-2)=-6. -6/8=-3/4 olur."),
              ),
              ex("Sıra Sizde 4.159", [t("Hesaplayın: "), m("\\frac{a+b}{c}"), t("; "), m("a=-8,b=-7,c=6"), t(" iken.")]),
              ex("Sıra Sizde 4.160", [t("Hesaplayın: "), m("\\frac{x+y}{z}"), t("; "), m("x=9,y=-18,z=-6"), t(" iken.")]),
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
