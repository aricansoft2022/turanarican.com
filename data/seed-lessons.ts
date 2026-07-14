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
      "Cebirsel ifadelerin değerini hesaplayabileceksiniz.",
      "Terim, katsayı ve benzer terimleri ayırt edebileceksiniz.",
      "Benzer terimleri birleştirerek cebirsel ifadeleri sadeleştirebileceksiniz.",
      "Sözel durumları cebirsel ifadelerle gösterebileceksiniz.",
    ],
    sectionTitles: {
      "Evaluate Algebraic Expressions":
        "Cebirsel İfadenin Değerini Hesaplama",
      "Identify Terms, Coefficients, and Like Terms":
        "Terim, Katsayı ve Benzer Terim",
      "Simplify Expressions by Combining Like Terms":
        "Cebirsel İfadelerde Toplama ve Çıkarma",
      "Translate Words to Algebraic Expressions":
        "Sözel Durumları Cebirsel İfade ile Gösterme",
    },
    exerciseAnswers: {
      "69": [
        { type: "text", value: "Çözüm: Değişken yerine verilen değeri yazıp işlem sırasını uygularız. İfade sadeleştiğinde sonuç " },
        { type: "math", value: "22" },
        { type: "text", value: " olur." },
      ],
      "79": [
        { type: "text", value: "Çözüm: Verilen değeri değişkenin yerine koyarız. Çarpma ve çıkarma işlemlerini sırayla yapınca değer " },
        { type: "math", value: "21" },
        { type: "text", value: " bulunur." },
      ],
      "101": [
        { type: "text", value: "Çözüm: Benzer terimler aynı değişken kısmına sahiptir. Katsayıları toplar, değişken kısmını koruruz; sonuç " },
        { type: "math", value: "13x" },
        { type: "text", value: " olur." },
      ],
      "135": [
        { type: "text", value: "Çözüm: Sözel ifade ortak çarpanı ve parantez içindeki toplamı anlatır. Bu nedenle cebirsel ifade " },
        { type: "math", value: "5(x+y)" },
        { type: "text", value: " şeklinde yazılır." },
      ],
    },
    exerciseSectionSlugs: {
      "69": "cebirsel-ifadenin-degerini-hesaplama",
      "79": "cebirsel-ifadenin-degerini-hesaplama",
      "101": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "135": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.4",
    catalogLesson: {
      id: "lesson-subtraction-addition-equations",
      slug: "esitlik-ve-denklem",
      displayTitle: "Eşitlik ve Denklem",
      summary:
        "Bir değerin denklemi sağlayıp sağlamadığını kontrol edin, eşitliği koruyarak denklem çözün ve sözel durumları denklemle gösterin.",
      sortOrder: 4,
    },
    objectives: [
      "Bir sayının bir denklemin çözümü olup olmadığını kontrol edebileceksiniz.",
      "Eşitliğin çıkarma işlemiyle nasıl korunduğunu modelleyebileceksiniz.",
      "Çıkarma işlemini kullanarak denklemleri çözebileceksiniz.",
      "Toplama işlemini kullanarak denklemleri çözebileceksiniz.",
      "Sözel durumları denklemlerle gösterebileceksiniz.",
      "Bir problem için denklem kurup çözümünü bulabileceksiniz.",
    ],
    sectionTitles: {
      "Determine Whether a Number is a Solution of an Equation":
        "Denklemin Çözümünü Kontrol Etme",
      "Model the Subtraction Property of Equality":
        "Eşitliğin Korunumu: Çıkarma",
      "Solve Equations Using the Subtraction Property of Equality":
        "Çıkarma İşlemiyle Denklem Çözme",
      "Solve Equations Using the Addition Property of Equality":
        "Toplama İşlemiyle Denklem Çözme",
      "Translate Word Phrases to Algebraic Equations":
        "Sözel Durumları Denklem ile Gösterme",
      "Translate to an Equation and Solve": "Denklem Kurma ve Çözme",
    },
    exerciseAnswers: {
      "147": [
        { type: "text", value: "Çözüm: Her aday değeri denklemde değişkenin yerine yazarız. Eşitlik doğruysa çözüm olur. Kontrol sonunda ⓐ çözüm, ⓑ çözüm değildir." },
      ],
      "149": [
        { type: "text", value: "Çözüm: Verilen değerleri tek tek yerine koyduğumuzda yalnızca eşitliği doğru yapan değer çözüm olur. Bu nedenle ⓐ çözüm değil, ⓑ çözümdür." },
      ],
      "163": [
        { type: "text", value: "Çözüm: Değişkeni yalnız bırakmak için denklemin iki tarafından aynı sayı çıkarılır. Eşitlik korunur ve " },
        { type: "math", value: "a=16" },
        { type: "text", value: " bulunur." },
      ],
      "175": [
        { type: "text", value: "Çözüm: Değişkenin yanındaki sayı çıkarma ile gelmişse ters işlem olarak iki tarafa aynı sayı eklenir. Böylece " },
        { type: "math", value: "y=22" },
        { type: "text", value: " elde edilir." },
      ],
      "199": [
        { type: "text", value: "Çözüm: Sözel durumdaki bilinmeyen " },
        { type: "math", value: "p" },
        { type: "text", value: " ile gösterilir ve ilişki denklem olarak yazılır. Denklem çözüldüğünde " },
        { type: "math", value: "p=16" },
        { type: "text", value: " olur." },
      ],
      "209": [
        { type: "text", value: "Çözüm: Problemde bilinmeyen miktarı " },
        { type: "math", value: "p" },
        { type: "text", value: " ile gösterip verilen ilişkiye göre denklem kurarız. Ters işlemlerle çözdüğümüzde " },
        { type: "math", value: "p=1300" },
        { type: "text", value: " bulunur." },
      ],
    },
    exerciseSectionSlugs: {
      "147": "denklemin-cozumunu-kontrol-etme",
      "149": "denklemin-cozumunu-kontrol-etme",
      "163": "cikarma-islemiyle-denklem-cozme",
      "175": "toplama-islemiyle-denklem-cozme",
      "199": "sozel-durumlari-denklem-ile-gosterme",
      "209": "denklem-kurma-ve-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.5",
    catalogLesson: {
      id: "lesson-multiples-factors",
      slug: "carpanlar-ve-katlar",
      displayTitle: "Çarpanlar ve Katlar",
      summary:
        "Doğal sayıların katlarını ve çarpanlarını bulun, bölünebilme kurallarını kullanın ve asal-bileşik sayıları ayırt edin.",
      sortOrder: 5,
    },
    objectives: [
      "Doğal sayıların katlarını belirleyebileceksiniz.",
      "Bölünebilme kurallarını kullanabileceksiniz.",
      "Bir doğal sayının tüm çarpanlarını bulabileceksiniz.",
      "Asal ve bileşik sayıları ayırt edebileceksiniz.",
    ],
    sectionTitles: {
      "Identify Multiples of Numbers": "Kat Kavramı ve Katları Belirleme",
      "Use Common Divisibility Tests": "Bölünebilme Kuralları",
      "Find All the Factors of a Number":
        "Doğal Sayıların Çarpanlarını Bulma",
      "Identify Prime and Composite Numbers": "Asal ve Bileşik Sayılar",
    },
    exerciseAnswers: {
      "215": [
        {
          type: "text",
          value:
            "Çözüm: 2'nin katlarını bulmak için 2'den başlayıp her seferinde 2 ekleriz. 50'den küçük katlar 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46 ve 48'dir.",
        },
      ],
      "225": [
        {
          type: "text",
          value:
            "Çözüm: 84 çift olduğu için 2'ye bölünür. Rakamları toplamı 12 olduğu için 3'e bölünür. Son iki basamağı 84 olduğundan 4'e de bölünür. Hem 2'ye hem 3'e bölündüğü için 6'ya bölünür; son basamağı 0 veya 5 olmadığı için 5'e, 0 olmadığı için 10'a bölünmez.",
        },
      ],
      "243": [
        {
          type: "text",
          value:
            "Çözüm: 36'yı 1'den başlayarak böleriz ve tam bölenleri eşleriyle birlikte yazarız: 1·36, 2·18, 3·12, 4·9 ve 6·6. Bu nedenle çarpanlar 1, 2, 3, 4, 6, 9, 12, 18 ve 36'dır.",
        },
      ],
      "251": [
        {
          type: "text",
          value:
            "Çözüm: 43'ün 1 ve kendisi dışında doğal sayı çarpanı yoktur. Bu yüzden 43 asal sayıdır.",
        },
      ],
    },
    exerciseSectionSlugs: {
      "215": "kat-kavrami-ve-katlari-belirleme",
      "225": "bolunebilme-kurallari",
      "243": "dogal-sayilarin-carpanlarini-bulma",
      "251": "asal-ve-bilesik-sayilar",
    },
  },
];
