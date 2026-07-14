import type { InlineContent } from "@/src/content/types";

export type SeedLessonConfig = {
  sourceBookSlug: string;
  catalogBookSlug: string;
  catalogChapterSlug: string;
  sourceNumber: string;
  catalogLesson?: {
    id: string;
    slug: string;
    displayTitle: string;
    summary: string;
    sortOrder: number;
  };
  objectives: string[];
  sectionTitles: Record<string, string>;
  exerciseAnswers: Record<string, InlineContent[]>;
  exerciseSectionSlugs: Record<string, string>;
};

export const seedLessonConfigs: SeedLessonConfig[] = [
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.3",
    objectives: [
      "Cebirsel ifadeleri değerlendirin.",
      "Terimleri, katsayıları ve benzer terimleri belirleyin.",
      "Benzer terimleri birleştirerek ifadeleri sadeleştirin.",
      "Sözcük öbeklerini cebirsel ifadelere çevirin.",
    ],
    sectionTitles: {
      "Evaluate Algebraic Expressions": "Cebirsel İfadeleri Değerlendirme",
      "Identify Terms, Coefficients, and Like Terms":
        "Terimleri, Katsayıları ve Benzer Terimleri Belirleme",
      "Simplify Expressions by Combining Like Terms":
        "Benzer Terimleri Birleştirerek İfadeleri Sadeleştirme",
      "Translate Words to Algebraic Expressions":
        "Sözcük Öbeklerini Cebirsel İfadelere Çevirme",
    },
    exerciseAnswers: {
      "69": [{ type: "math", value: "22" }],
      "79": [{ type: "math", value: "21" }],
      "101": [{ type: "math", value: "13x" }],
      "135": [{ type: "math", value: "5(x+y)" }],
    },
    exerciseSectionSlugs: {
      "69": "cebirsel-ifadeleri-degerlendirme",
      "79": "cebirsel-ifadeleri-degerlendirme",
      "101": "benzer-terimleri-birlestirerek-ifadeleri-sadelestirme",
      "135": "sozcuk-obeklerini-cebirsel-ifadelere-cevirme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.4",
    catalogLesson: {
      id: "lesson-subtraction-addition-equations",
      slug: "esitligin-cikarma-toplama-ozellikleriyle-denklem-cozme",
      displayTitle:
        "Eşitliğin Çıkarma ve Toplama Özellikleriyle Denklem Çözme",
      summary:
        "Bir sayının denklemin çözümü olup olmadığını kontrol edin, eşitliğin çıkarma ve toplama özellikleriyle denklemleri çözün ve sözel ifadeleri denklemlere çevirin.",
      sortOrder: 4,
    },
    objectives: [
      "Bir sayının bir denklemin çözümü olup olmadığını belirleyin.",
      "Eşitliğin çıkarma özelliğini modelleyin.",
      "Eşitliğin çıkarma özelliğini kullanarak denklemleri çözün.",
      "Eşitliğin toplama özelliğini kullanarak denklemleri çözün.",
      "Sözcük öbeklerini cebirsel denklemlere çevirin.",
      "Bir denkleme çevirip çözün.",
    ],
    sectionTitles: {
      "Determine Whether a Number is a Solution of an Equation":
        "Bir Sayının Denklemin Çözümü Olup Olmadığını Belirleme",
      "Model the Subtraction Property of Equality":
        "Eşitliğin Çıkarma Özelliğini Modelleme",
      "Solve Equations Using the Subtraction Property of Equality":
        "Eşitliğin Çıkarma Özelliğiyle Denklemleri Çözme",
      "Solve Equations Using the Addition Property of Equality":
        "Eşitliğin Toplama Özelliğiyle Denklemleri Çözme",
      "Translate Word Phrases to Algebraic Equations":
        "Sözcük Öbeklerini Cebirsel Denklemlere Çevirme",
      "Translate to an Equation and Solve": "Denkleme Çevirme ve Çözme",
    },
    exerciseAnswers: {
      "147": [{ type: "text", value: "ⓐ çözüm, ⓑ çözüm değil" }],
      "149": [{ type: "text", value: "ⓐ çözüm değil, ⓑ çözüm" }],
      "163": [{ type: "math", value: "a=16" }],
      "175": [{ type: "math", value: "y=22" }],
      "199": [{ type: "math", value: "p=16" }],
      "209": [{ type: "math", value: "p=1300" }],
    },
    exerciseSectionSlugs: {
      "147": "bir-sayinin-denklemin-cozumu-olup-olmadigini-belirleme",
      "149": "bir-sayinin-denklemin-cozumu-olup-olmadigini-belirleme",
      "163": "esitligin-cikarma-ozelligiyle-denklemleri-cozme",
      "175": "esitligin-toplama-ozelligiyle-denklemleri-cozme",
      "199": "sozcuk-obeklerini-cebirsel-denklemlere-cevirme",
      "209": "denkleme-cevirme-ve-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.5",
    catalogLesson: {
      id: "lesson-multiples-factors",
      slug: "katlari-ve-carpanlari-bulma",
      displayTitle: "Katları ve Çarpanları Bulma",
      summary:
        "Sayıların katlarını belirleyin, bölünebilme testlerini kullanın, tüm çarpanları bulun ve asal-bileşik sayıları ayırt edin.",
      sortOrder: 5,
    },
    objectives: [
      "Sayıların katlarını belirleyin.",
      "Yaygın bölünebilme testlerini kullanın.",
      "Bir sayının tüm çarpanlarını bulun.",
      "Asal ve bileşik sayıları belirleyin.",
    ],
    sectionTitles: {
      "Identify Multiples of Numbers": "Sayıların Katlarını Belirleme",
      "Use Common Divisibility Tests":
        "Yaygın Bölünebilme Testlerini Kullanma",
      "Find All the Factors of a Number":
        "Bir Sayının Tüm Çarpanlarını Bulma",
      "Identify Prime and Composite Numbers":
        "Asal ve Bileşik Sayıları Belirleme",
    },
    exerciseAnswers: {
      "215": [
        {
          type: "text",
          value:
            "2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48",
        },
      ],
      "225": [
        {
          type: "text",
          value:
            "84; 2, 3, 4 ve 6 ile bölünebilir; 5 ve 10 ile bölünemez.",
        },
      ],
      "243": [
        { type: "text", value: "1, 2, 3, 4, 6, 9, 12, 18, 36" },
      ],
      "251": [{ type: "text", value: "43 asal sayıdır." }],
    },
    exerciseSectionSlugs: {
      "215": "sayilarin-katlarini-belirleme",
      "225": "yaygin-bolunebilme-testlerini-kullanma",
      "243": "bir-sayinin-tum-carpanlarini-bulma",
      "251": "asal-ve-bilesik-sayilari-belirleme",
    },
  },
];
