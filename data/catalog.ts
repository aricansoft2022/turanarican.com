import type { Book, Lesson } from "@/src/content/types";

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

export const lessons: Lesson[] = [
  {
    id: "lesson-evaluate-simplify-translate",
    bookId: "book-prealgebra-2e",
    bookSlug: "prealgebra-2e",
    chapterId: "chapter-language-of-algebra",
    chapterSlug: "cebir-diline-giris",
    slug: "ifadeleri-degerlendirme-sadelestirme-cevirme",
    sourceNumber: "2.3",
    displayNumber: "2.2",
    sourceTitle: "Evaluate, Simplify, and Translate Expressions",
    displayTitle: "İfadeleri Değerlendirme, Sadeleştirme ve Çevirme",
    summary:
      "Cebirsel ifadeleri değerlendirmeyi, benzer terimleri birleştirmeyi ve günlük dildeki ifadeleri cebir diline çevirmeyi öğreniyoruz.",
    sourceUrl:
      "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)/02%3A_Introduction_to_the_Language_of_Algebra/2.03%3A_Evaluate_Simplify_and_Translate_Expressions",
    sortOrder: 3,
    license: books[0].license,
    objectives: [
      "Cebirsel ifadeleri değerlendirin.",
      "Terimleri, katsayıları ve benzer terimleri belirleyin.",
      "Benzer terimleri birleştirerek ifadeleri sadeleştirin.",
      "Sözcük öbeklerini cebirsel ifadelere çevirin.",
    ],
    sections: [
      {
        id: "section-evaluate",
        heading: "Cebirsel İfadeleri Değerlendirme",
        slug: "cebirsel-ifadeleri-degerlendirme",
        level: 2,
        blocks: [
          {
            type: "paragraph",
            text: [
              {
                type: "text",
                value:
                  "Bir cebirsel ifadeyi değerlendirmek için değişkenin yerine verilen sayıyı yazar, sonra işlem önceliğini izleriz.",
              },
            ],
          },
          {
            type: "example",
            label: "Örnek 2.13",
            prompt: [
              { type: "text", value: "Değerlendirin: " },
              { type: "math", value: "x+7" },
              { type: "text", value: ", " },
              { type: "math", value: "x=3" },
            ],
            solution: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "x+7=3+7=10" },
                  { type: "text", value: "." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "section-like-terms",
        heading: "Benzer Terimleri Birleştirme",
        slug: "benzer-terimleri-birlestirme",
        level: 2,
        blocks: [
          {
            type: "paragraph",
            text: [
              {
                type: "text",
                value:
                  "Benzer terimler aynı değişkenleri aynı üslerle içerir. Sadece katsayılar toplanır veya çıkarılır.",
              },
            ],
          },
          {
            type: "callout",
            label: "Tanım",
            tone: "soft",
            blocks: [
              {
                type: "paragraph",
                text: [
                  { type: "math", value: "7x" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "3x" },
                  {
                    type: "text",
                    value: " benzer terimlerdir; fakat ",
                  },
                  { type: "math", value: "7x" },
                  { type: "text", value: " ve " },
                  { type: "math", value: "7x^2" },
                  { type: "text", value: " benzer değildir." },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "section-translate",
        heading: "Sözcük Öbeklerini Cebir Diline Çevirme",
        slug: "sozcuk-obeklerini-cebir-diline-cevirme",
        level: 2,
        blocks: [
          {
            type: "paragraph",
            text: [
              {
                type: "text",
                value:
                  "Günlük dildeki işlem sözcüklerini cebirsel sembollere çevirirken işlem sırasına ve parantez gerekip gerekmediğine dikkat ederiz.",
              },
            ],
          },
        ],
      },
    ],
    exercises: [
      {
        id: "exercise-69",
        number: "69",
        sectionSlug: "cebirsel-ifadeleri-degerlendirme",
        prompt: [
          { type: "math", value: "7x+8" },
          { type: "text", value: ", " },
          { type: "math", value: "x=2" },
        ],
        answer: [{ type: "math", value: "22" }],
        sortOrder: 69,
      },
      {
        id: "exercise-79",
        number: "79",
        sectionSlug: "cebirsel-ifadeleri-degerlendirme",
        prompt: [
          { type: "math", value: "x^2+3x-7" },
          { type: "text", value: ", " },
          { type: "math", value: "x=4" },
        ],
        answer: [{ type: "math", value: "21" }],
        sortOrder: 79,
      },
      {
        id: "exercise-101",
        number: "101",
        sectionSlug: "benzer-terimleri-birlestirme",
        prompt: [{ type: "math", value: "10x+3x" }],
        answer: [{ type: "math", value: "13x" }],
        sortOrder: 101,
      },
      {
        id: "exercise-135",
        number: "135",
        sectionSlug: "sozcuk-obeklerini-cebir-diline-cevirme",
        prompt: [{ type: "text", value: "x ve y toplamının beş katı" }],
        answer: [{ type: "math", value: "5(x+y)" }],
        sortOrder: 135,
      },
    ],
  },
];

export function getBook(bookSlug: string) {
  return books.find((book) => book.slug === bookSlug);
}

export function getLesson(params: {
  bookSlug: string;
  chapterSlug: string;
  lessonSlug: string;
}) {
  return lessons.find(
    (lesson) =>
      lesson.bookSlug === params.bookSlug &&
      lesson.chapterSlug === params.chapterSlug &&
      lesson.slug === params.lessonSlug,
  );
}

export function getAllLessonParams() {
  return lessons.map((lesson) => ({
    bookSlug: lesson.bookSlug,
    chapterSlug: lesson.chapterSlug,
    lessonSlug: lesson.slug,
  }));
}

export function getAllBookParams() {
  return books.map((book) => ({
    bookSlug: book.slug,
  }));
}
