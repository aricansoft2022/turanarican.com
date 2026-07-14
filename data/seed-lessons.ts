import type { InlineContent } from "@/src/content/types";

export type SeedLessonConfig = {
  sourceBookSlug: string;
  catalogBookSlug: string;
  catalogChapterSlug: string;
  sourceNumber: string;
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
      "101": "benzer-terimleri-birlestirme",
      "135": "sozcuk-obeklerini-cebirsel-ifadelere-cevirme",
    },
  },
];
