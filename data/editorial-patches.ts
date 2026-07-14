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
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    sourceNumber: "2.4",
    sections: [
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
