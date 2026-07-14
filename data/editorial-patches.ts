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
        sectionSlug: "terimleri-katsayilari-ve-benzer-terimleri-belirleme",
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
        sectionSlug: "benzer-terimleri-birlestirerek-ifadeleri-sadelestirme",
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
        sectionSlug: "sozcuk-obeklerini-cebirsel-ifadelere-cevirme",
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
        sectionSlug: "esitligin-cikarma-ozelligiyle-denklemleri-cozme",
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
        sectionSlug: "esitligin-toplama-ozelligiyle-denklemleri-cozme",
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
        sectionSlug: "esitligin-cikarma-ozelligini-modelleme",
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
        sectionSlug: "bir-sayinin-denklemin-cozumu-olup-olmadigini-belirleme",
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
    ],
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.5",
    sections: [
      {
        sectionSlug: "sayilarin-katlarini-belirleme",
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
