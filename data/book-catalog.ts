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
        displayNumber: "2",
        sourceTitle: "Introduction to the Language of Algebra",
        displayTitle: "Cebir Diline Giriş",
        sourceUrl:
          "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/02%3A_Introduction_to_the_Language_of_Algebra",
        sortOrder: 2,
        lessons: [
          {
            id: "lesson-evaluate-simplify-translate",
            chapterId: "chapter-language-of-algebra",
            slug: "ifadeleri-degerlendirme-sadelestirme-cevirme",
            sourceNumber: "2.3",
            displayNumber: "2.2",
            sourceTitle: "Evaluate, Simplify, and Translate Expressions",
            displayTitle: "İfadeleri Değerlendirme, Sadeleştirme ve Çevirme",
            summary:
              "Değişkenleri sayılarla değiştirin, benzer terimleri birleştirin ve sözcük öbeklerini cebirsel ifadelere çevirin.",
            sourceUrl:
              "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/02%3A_Introduction_to_the_Language_of_Algebra/2.03%3A_Evaluate_Simplify_and_Translate_Expressions",
            sortOrder: 3,
          },
        ],
      },
    ],
  },
];
