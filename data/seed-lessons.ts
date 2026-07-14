import type { ContentBlock, InlineContent } from "@/src/content/types";

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
  tryItSolutions?: Record<string, ContentBlock[]>;
  exerciseAnswers: Record<string, InlineContent[]>;
  exerciseSectionSlugs: Record<string, string>;
};

function p(value: string): ContentBlock[] {
  return [{ type: "paragraph", text: [{ type: "text", value }] }];
}

function answer(value: string): InlineContent[] {
  return [{ type: "text", value }];
}

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
    tryItSolutions: {
      "Sıra Sizde 2.79": p(
        "Çözüm: 2'nin katları çift sayılardır. 678 çift olduğu için 2'nin katıdır; 21.493 tek olduğu için 2'nin katı değildir.",
      ),
      "Sıra Sizde 2.80": p(
        "Çözüm: Son basamağa bakarız. 979 tek olduğu için 2'nin katı değildir; 17.780 çift olduğu için 2'nin katıdır.",
      ),
      "Sıra Sizde 2.81": p(
        "Çözüm: 5'in katları 0 veya 5 ile biter. 675, 5 ile bittiği için 5'in katıdır; 1.578, 8 ile bittiği için 5'in katı değildir.",
      ),
      "Sıra Sizde 2.82": p(
        "Çözüm: 421, 0 veya 5 ile bitmediği için 5'in katı değildir. 2.690 ise 0 ile bittiği için 5'in katıdır.",
      ),
      "Sıra Sizde 2.83": p(
        "Çözüm: 10'un katları 0 ile biter. 179, 0 ile bitmediği için 10'un katı değildir; 3.540, 0 ile bittiği için 10'un katıdır.",
      ),
      "Sıra Sizde 2.84": p(
        "Çözüm: 110 son basamağı 0 olduğu için 10'un katıdır. 7.595 son basamağı 5 olduğu için 10'un katı değildir.",
      ),
      "Sıra Sizde 2.85": p(
        "Çözüm: 3'e bölünebilme için rakamlar toplamına bakarız. 954 için 9+5+4=18 olduğundan 3'ün katıdır; 3.742 için 3+7+4+2=16 olduğundan 3'ün katı değildir.",
      ),
      "Sıra Sizde 2.86": p(
        "Çözüm: 643 için rakamlar toplamı 6+4+3=13 olduğu için 3'ün katı değildir. 8.379 için 8+3+7+9=27 olduğu için 3'ün katıdır.",
      ),
      "Sıra Sizde 2.87": p(
        "Çözüm: 6240 çift olduğu için 2'ye, rakamları toplamı 12 olduğu için 3'e, son basamağı 0 olduğu için 5 ve 10'a bölünür.",
      ),
      "Sıra Sizde 2.88": p(
        "Çözüm: 7248 çift olduğu için 2'ye bölünür. Rakamları toplamı 21 olduğu için 3'e bölünür. Son basamağı 0 veya 5 olmadığı için 5'e, 0 olmadığı için 10'a bölünmez.",
      ),
      "Sıra Sizde 2.89": p(
        "Çözüm: 4962 çift olduğu için 2'ye bölünür. Rakamları toplamı 21 olduğu için 3'e bölünür. Son basamağı 0 veya 5 olmadığı için 5'e, 0 olmadığı için 10'a bölünmez.",
      ),
      "Sıra Sizde 2.90": p(
        "Çözüm: 3765 tek olduğu için 2'ye bölünmez. Rakamları toplamı 21 olduğu için 3'e bölünür. Son basamağı 5 olduğu için 5'e bölünür, 0 olmadığı için 10'a bölünmez.",
      ),
      "Sıra Sizde 2.91": p(
        "Çözüm: 96'nın çarpan çiftleri 1·96, 2·48, 3·32, 4·24, 6·16 ve 8·12'dir. Bu nedenle çarpanlar 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48 ve 96'dır.",
      ),
      "Sıra Sizde 2.92": p(
        "Çözüm: 80'in çarpan çiftleri 1·80, 2·40, 4·20, 5·16 ve 8·10'dur. Bu nedenle çarpanlar 1, 2, 4, 5, 8, 10, 16, 20, 40 ve 80'dir.",
      ),
      "Sıra Sizde 2.93": p(
        "Çözüm: 91 sayısı 7·13 olarak yazılabilir. 1 ve kendisi dışında çarpanı olduğu için bileşik sayıdır.",
      ),
      "Sıra Sizde 2.94": p(
        "Çözüm: 137 sayısı 2, 3, 5, 7 veya 11'e bölünmez; karekökünden küçük asal bölen kalmadığı için 137 asal sayıdır.",
      ),
    },
    exerciseAnswers: {
      "215": answer(
        "Çözüm: 2'nin katlarını bulmak için 2'den başlayıp her seferinde 2 ekleriz. 50'den küçük katlar 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46 ve 48'dir.",
      ),
      "217": answer(
        "Çözüm: 4'ün katlarını bulmak için 4'er 4'er sayarız. 50'den küçük katlar 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44 ve 48'dir.",
      ),
      "219": answer(
        "Çözüm: 6'nın katları 6 ile sayma sayılarının çarpımlarıdır. 50'den küçük katlar 6, 12, 18, 24, 30, 36, 42 ve 48'dir.",
      ),
      "221": answer(
        "Çözüm: 8'er 8'er sayarsak 50'den küçük katlar 8, 16, 24, 32, 40 ve 48 olur.",
      ),
      "223": answer(
        "Çözüm: 10'un 50'den küçük katları 10, 20, 30 ve 40'tır; 50 dahil değildir çünkü soru 50'den küçük katları ister.",
      ),
      "225": answer(
        "Çözüm: 84 çift olduğu için 2'ye bölünür. Rakamları toplamı 12 olduğu için 3'e bölünür. Son iki basamağı 84 olduğundan 4'e de bölünür. Hem 2'ye hem 3'e bölündüğü için 6'ya bölünür; son basamağı 0 veya 5 olmadığı için 5'e, 0 olmadığı için 10'a bölünmez.",
      ),
      "227": answer(
        "Çözüm: 75 tek olduğu için 2'ye bölünmez. Rakamları toplamı 12 olduğu için 3'e bölünür. Son iki basamağı 75 olduğu için 4'e bölünmez. Son basamağı 5 olduğu için 5'e bölünür; 2'ye bölünmediği için 6'ya, 0 ile bitmediği için 10'a bölünmez.",
      ),
      "229": answer(
        "Çözüm: 168 çift olduğu için 2'ye bölünür. Rakamları toplamı 15 olduğu için 3'e bölünür. Son iki basamağı 68 olduğu için 4'e bölünür. Hem 2'ye hem 3'e bölündüğü için 6'ya bölünür; 5 ve 10'a bölünmez.",
      ),
      "231": answer(
        "Çözüm: 900 çift olduğu için 2'ye, rakamları toplamı 9 olduğu için 3'e, son iki basamağı 00 olduğu için 4'e bölünür. Son basamağı 0 olduğundan 5 ve 10'a da bölünür; 2 ve 3'e bölündüğü için 6'ya bölünür.",
      ),
      "233": answer(
        "Çözüm: 896 çift olduğu için 2'ye bölünür. Rakamları toplamı 23 olduğu için 3'e bölünmez. Son iki basamağı 96 olduğu için 4'e bölünür. 3'e bölünmediği için 6'ya, son basamağı 0 veya 5 olmadığı için 5 ve 10'a bölünmez.",
      ),
      "235": answer(
        "Çözüm: 375 tek olduğu için 2'ye bölünmez. Rakamları toplamı 15 olduğu için 3'e bölünür. Son iki basamağı 75 olduğu için 4'e bölünmez. Son basamağı 5 olduğu için 5'e bölünür; 2'ye bölünmediği için 6'ya, 0 ile bitmediği için 10'a bölünmez.",
      ),
      "237": answer(
        "Çözüm: 350 çift olduğu için 2'ye bölünür. Rakamları toplamı 8 olduğu için 3'e bölünmez. Son iki basamağı 50 olduğu için 4'e bölünmez. Son basamağı 0 olduğu için 5 ve 10'a bölünür; 3'e bölünmediği için 6'ya bölünmez.",
      ),
      "239": answer(
        "Çözüm: 1430 çift olduğu için 2'ye bölünür. Rakamları toplamı 8 olduğu için 3'e bölünmez. Son iki basamağı 30 olduğu için 4'e bölünmez. Son basamağı 0 olduğundan 5 ve 10'a bölünür; 3'e bölünmediği için 6'ya bölünmez.",
      ),
      "241": answer(
        "Çözüm: 22.335 tek olduğu için 2'ye bölünmez. Rakamları toplamı 15 olduğu için 3'e bölünür. Son iki basamağı 35 olduğu için 4'e bölünmez. Son basamağı 5 olduğu için 5'e bölünür; 2'ye bölünmediği için 6'ya, 0 ile bitmediği için 10'a bölünmez.",
      ),
      "243": answer(
        "Çözüm: 36'yı 1'den başlayarak böleriz ve tam bölenleri eşleriyle birlikte yazarız: 1·36, 2·18, 3·12, 4·9 ve 6·6. Bu nedenle çarpanlar 1, 2, 3, 4, 6, 9, 12, 18 ve 36'dır.",
      ),
      "245": answer(
        "Çözüm: 60'ın çarpan çiftleri 1·60, 2·30, 3·20, 4·15, 5·12 ve 6·10'dur. Bu nedenle çarpanlar 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 ve 60'tır.",
      ),
      "247": answer(
        "Çözüm: 144'ün çarpan çiftleri 1·144, 2·72, 3·48, 4·36, 6·24, 8·18, 9·16 ve 12·12'dir. Çarpanlar 1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 36, 48, 72 ve 144'tür.",
      ),
      "249": answer(
        "Çözüm: 588 = 2·294 = 3·196 = 4·147 = 6·98 = 7·84 = 12·49 = 14·42 = 21·28 olarak eşleşir. Çarpanlar 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 49, 84, 98, 147, 196, 294 ve 588'dir.",
      ),
      "251": answer(
        "Çözüm: 43'ün 1 ve kendisi dışında doğal sayı çarpanı yoktur. Bu yüzden 43 asal sayıdır.",
      ),
      "253": answer(
        "Çözüm: 39 sayısı 3·13 olarak yazılabilir. 1 ve kendisi dışında çarpanı olduğu için bileşik sayıdır.",
      ),
      "255": answer(
        "Çözüm: 71 sayısı 2, 3, 5 veya 7'ye bölünmez. Karekökünden küçük başka asal bölen kalmadığı için 71 asal sayıdır.",
      ),
      "257": answer(
        "Çözüm: 481 sayısı 13·37 olarak yazılabilir. Bu yüzden 1 ve kendisi dışında çarpanı vardır; bileşik sayıdır.",
      ),
      "259": answer(
        "Çözüm: 209 sayısı 11·19 olarak yazılabilir. 1 ve kendisi dışında çarpanı olduğu için bileşik sayıdır.",
      ),
      "261": answer(
        "Çözüm: 667 sayısı 23·29 olarak yazılabilir. Bu nedenle asal değildir; bileşik sayıdır.",
      ),
      "263": answer(
        "Çözüm: Başlangıçta 100 dolar vardır ve her hafta 15 dolar eklenir. Bu yüzden toplam 100+15·hafta sayısı ile bulunur: 3. hafta 145, 4. hafta 160, 5. hafta 175 ve 6. hafta 190 dolardır.",
      ),
    },
    exerciseSectionSlugs: {
      "215": "kat-kavrami-ve-katlari-belirleme",
      "217": "kat-kavrami-ve-katlari-belirleme",
      "219": "kat-kavrami-ve-katlari-belirleme",
      "221": "kat-kavrami-ve-katlari-belirleme",
      "223": "kat-kavrami-ve-katlari-belirleme",
      "225": "bolunebilme-kurallari",
      "227": "bolunebilme-kurallari",
      "229": "bolunebilme-kurallari",
      "231": "bolunebilme-kurallari",
      "233": "bolunebilme-kurallari",
      "235": "bolunebilme-kurallari",
      "237": "bolunebilme-kurallari",
      "239": "bolunebilme-kurallari",
      "241": "bolunebilme-kurallari",
      "243": "dogal-sayilarin-carpanlarini-bulma",
      "245": "dogal-sayilarin-carpanlarini-bulma",
      "247": "dogal-sayilarin-carpanlarini-bulma",
      "249": "dogal-sayilarin-carpanlarini-bulma",
      "251": "asal-ve-bilesik-sayilar",
      "253": "asal-ve-bilesik-sayilar",
      "255": "asal-ve-bilesik-sayilar",
      "257": "asal-ve-bilesik-sayilar",
      "259": "asal-ve-bilesik-sayilar",
      "261": "asal-ve-bilesik-sayilar",
      "263": "kat-kavrami-ve-katlari-belirleme",
    },
  },
];
