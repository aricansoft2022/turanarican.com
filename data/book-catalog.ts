import type { Book } from "@/src/content/types";

export const books: Book[] = [
  {
    id: "book-prealgebra-2e",
    slug: "prealgebra-2e",
    title: "Ön Cebir 2e",
    subtitle: "Cebir diline güçlü bir başlangıç",
    sourceUrl:
      "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)",
    sourcePlatform: "LibreTexts",
    numberingPolicy: "skip_intro_shift",
    license: {
      name: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
      attribution:
        "OpenStax Prealgebra 2e içeriğinden uyarlanmıştır; kaynak LibreTexts üzerinden erişilmiştir.",
    },
    chapters: [
      {
        id: "chapter-language-of-algebra",
        bookId: "book-prealgebra-2e",
        slug: "cebir-diline-giris",
        sourceNumber: "2",
        displayNumber: "1",
        sourceTitle: "Introduction to the Language of Algebra",
        displayTitle: "Cebir Diline Giriş",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/02%3A_Introduction_to_the_Language_of_Algebra",
        sortOrder: 1,
        lessons: [
          {
            id: "lesson-evaluate-simplify-translate",
            chapterId: "chapter-language-of-algebra",
            slug: "cebirsel-ifadeler",
            sourceNumber: "2.3",
            displayNumber: "1.1",
            sourceTitle: "Evaluate, Simplify, and Translate Expressions",
            displayTitle: "Cebirsel İfadeler",
            summary:
              "Cebirsel ifadelerin değerini hesaplayın, terim ve katsayıları ayırt edin, benzer terimleri birleştirin ve sözel durumları cebirsel ifadeyle gösterin.",
            sourceUrl:
              "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/02%3A_Introduction_to_the_Language_of_Algebra/2.03%3A_Evaluate_Simplify_and_Translate_Expressions",
            sortOrder: 1,
          },
        ],
      },
      {
        id: "chapter-integers",
        bookId: "book-prealgebra-2e",
        slug: "tam-sayilar",
        sourceNumber: "3",
        displayNumber: "2",
        sourceTitle: "Integers",
        displayTitle: "Tam Sayılar",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/03%3A_Integers",
        sortOrder: 2,
        lessons: [],
      },
      {
        id: "chapter-fractions",
        bookId: "book-prealgebra-2e",
        slug: "kesirler",
        sourceNumber: "4",
        displayNumber: "3",
        sourceTitle: "Fractions",
        displayTitle: "Kesirler",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/04%3A_Fractions",
        sortOrder: 3,
        lessons: [],
      },
      {
        id: "chapter-decimals",
        bookId: "book-prealgebra-2e",
        slug: "ondalik-sayilar",
        sourceNumber: "5",
        displayNumber: "4",
        sourceTitle: "Decimals",
        displayTitle: "Ondalık Sayılar",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/05%3A_Decimals",
        sortOrder: 4,
        lessons: [],
      },
      {
        id: "chapter-percents",
        bookId: "book-prealgebra-2e",
        slug: "yuzdeler",
        sourceNumber: "6",
        displayNumber: "5",
        sourceTitle: "Percents",
        displayTitle: "Yüzdeler",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/06%3A_Percents",
        sortOrder: 5,
        lessons: [],
      },
    ],
  },
];
