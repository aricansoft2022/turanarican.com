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
    tryItSolutions: {
      "Sıra Sizde 2.55": p(
        "Çözüm: x yerine 3 yazınca sol taraf 4·3-7=12-7=5 olur. Sağ taraf 16 olduğundan eşitlik doğru değildir; x=3 bu denklemin çözümü değildir.",
      ),
      "Sıra Sizde 2.56": p(
        "Çözüm: x yerine 2 yazınca 6·2-2=12-2=10 bulunur. Sol taraf sağ tarafa eşit olduğu için x=2 denklemin çözümüdür.",
      ),
      "Sıra Sizde 2.57": p(
        "Çözüm: y=3 için sol taraf 9·3-2=25, sağ taraf 8·3+1=25 olur. İki taraf eşit olduğundan y=3 çözümdür.",
      ),
      "Sıra Sizde 2.58": p(
        "Çözüm: y=4 için sol taraf 5·4-3=17, sağ taraf 3·4+5=17 olur. Eşitlik sağlandığı için y=4 denklemin çözümüdür.",
      ),
      "Sıra Sizde 2.59": p(
        "Çözüm: Zarf bilinmeyeni gösterir. Model x+1=7 denklemini verir. İki taraftan 1 sayaç çıkarınca x=6 kalır.",
      ),
      "Sıra Sizde 2.60": p(
        "Çözüm: Model x+3=4 denklemini gösterir. Eşitliği korumak için iki taraftan 3 çıkarırız; böylece x=1 bulunur.",
      ),
      "Sıra Sizde 2.61": p(
        "Çözüm: x+6=19 denkleminde x'i yalnız bırakmak için iki taraftan 6 çıkarırız. x=13 bulunur.",
      ),
      "Sıra Sizde 2.62": p(
        "Çözüm: x+9=14 denkleminde iki taraftan 9 çıkarırız. 14-9=5 olduğu için x=5'tir.",
      ),
      "Sıra Sizde 2.63": p(
        "Çözüm: 95=y+67 denkleminde y'yi yalnız bırakmak için iki taraftan 67 çıkarırız. 95-67=28 olduğundan y=28 olur.",
      ),
      "Sıra Sizde 2.64": p(
        "Çözüm: 91=y+45 denkleminde iki taraftan 45 çıkarırız. 91-45=46 olduğu için y=46'dır.",
      ),
      "Sıra Sizde 2.65": p(
        "Çözüm: x-9=13 denkleminde çıkarılan 9'u dengelemek için iki tarafa 9 ekleriz. x=22 bulunur.",
      ),
      "Sıra Sizde 2.66": p(
        "Çözüm: y-1=3 denkleminde iki tarafa 1 ekleriz. Böylece y=4 elde edilir.",
      ),
      "Sıra Sizde 2.67": p(
        "Çözüm: 19=a-18 denkleminde a'yı yalnız bırakmak için iki tarafa 18 ekleriz. 19+18=37 olduğundan a=37'dir.",
      ),
      "Sıra Sizde 2.68": p(
        "Çözüm: 27=n-14 denkleminde iki tarafa 14 ekleriz. 27+14=41 olduğu için n=41 olur.",
      ),
      "Sıra Sizde 2.69": p(
        "Çözüm: “7 ile 6'nın toplamı” ifadesi 7+6 olarak yazılır. “13 verir” ifadesi eşitliği gösterir; denklem 7+6=13'tür.",
      ),
      "Sıra Sizde 2.70": p(
        "Çözüm: Toplam sözü toplama işlemini, “14'tür” sözü eşitliği anlatır. Bu nedenle denklem 8+6=14 olur.",
      ),
      "Sıra Sizde 2.71": p(
        "Çözüm: “6 ile 9'un çarpımı” 6·9 demektir. Sonuç 54 olduğuna göre denklem 6·9=54'tür.",
      ),
      "Sıra Sizde 2.72": p(
        "Çözüm: “21 ile 3'ün çarpımı 63 verir” cümlesi doğrudan 21·3=63 denklemiyle gösterilir.",
      ),
      "Sıra Sizde 2.73": p(
        "Çözüm: Önce x ile 5'in farkı x-5'tir. Bu farkın iki katı 2(x-5) olur ve 30'a eşittir; denklem 2(x-5)=30'dur.",
      ),
      "Sıra Sizde 2.74": p(
        "Çözüm: y ile 4'ün farkı y-4'tür. Farkın iki katı 16 verdiği için denklem 2(y-4)=16 olur.",
      ),
      "Sıra Sizde 2.75": p(
        "Çözüm: “x'ten yedi fazla” x+7 olarak yazılır. x+7=37 denkleminde iki taraftan 7 çıkarınca x=30 bulunur.",
      ),
      "Sıra Sizde 2.76": p(
        "Çözüm: Cümle y+11=28 denklemini verir. İki taraftan 11 çıkarınca y=17 elde edilir.",
      ),
      "Sıra Sizde 2.77": p(
        "Çözüm: “z ile 17'nin farkı” z-17 demektir. z-17=37 denkleminde iki tarafa 17 ekleriz ve z=54 buluruz.",
      ),
      "Sıra Sizde 2.78": p(
        "Çözüm: Cümle x-19=45 denklemini verir. İki tarafa 19 eklenirse x=64 olur.",
      ),
    },
    exerciseAnswers: {
      "147": answer(
        "Çözüm: x=8 için x+13=21 olur ve eşitlik sağlanır. x=34 için 34+13=47 olduğundan eşitlik sağlanmaz. Bu nedenle ⓐ çözüm, ⓑ çözüm değildir.",
      ),
      "149": answer(
        "Çözüm: m=9 için m-4=5 olur ve 13'e eşit değildir. m=17 için 17-4=13 olur. Bu nedenle ⓐ çözüm değil, ⓑ çözümdür.",
      ),
      "151": answer(
        "Çözüm: p=3 için 3·3+6=15 olduğundan eşitlik sağlanır. p=7 için 3·7+6=27 olur. Bu nedenle ⓐ çözüm, ⓑ çözüm değildir.",
      ),
      "153": answer(
        "Çözüm: d=1 için 18·1-9=9 olur; 27 değildir. d=2 için 18·2-9=27 olur. Bu nedenle ⓐ çözüm değil, ⓑ çözümdür.",
      ),
      "155": answer(
        "Çözüm: u=3 için sol taraf 20, sağ taraf 52 olur; eşitlik sağlanmaz. u=11 için iki taraf da 84 olur. Bu nedenle ⓐ çözüm değil, ⓑ çözümdür.",
      ),
      "157": answer(
        "Çözüm: h=6 için sol taraf 115, sağ taraf 125 olur; eşitlik sağlanmaz. h=8 için iki taraf da 155 olur. Bu nedenle ⓐ çözüm değil, ⓑ çözümdür.",
      ),
      "159": answer(
        "Çözüm: Modelde sol tarafta bir zarf ve 2 sayaç, sağ tarafta 5 sayaç vardır; denklem x+2=5 olur. İki taraftan 2 çıkarınca x=3 bulunur.",
      ),
      "161": answer(
        "Çözüm: Model x+3=6 denklemini gösterir. Eşitliği korumak için iki taraftan 3 sayaç çıkarırız; geriye x=3 kalır.",
      ),
      "163": answer(
        "Çözüm: a+2=18 denkleminde değişkeni yalnız bırakmak için iki taraftan 2 çıkarılır. Böylece a=16 bulunur.",
      ),
      "165": answer(
        "Çözüm: p+18=23 denkleminde iki taraftan 18 çıkarırız. 23-18=5 olduğu için p=5'tir.",
      ),
      "167": answer(
        "Çözüm: r+76=100 denkleminde iki taraftan 76 çıkarılır. 100-76=24 olduğundan r=24 olur.",
      ),
      "169": answer(
        "Çözüm: 16=x+9 denkleminde x'i yalnız bırakmak için iki taraftan 9 çıkarırız. 16-9=7 olduğu için x=7'dir.",
      ),
      "171": answer(
        "Çözüm: 93=p+24 denkleminde iki taraftan 24 çıkarılır. 93-24=69 olduğundan p=69 bulunur.",
      ),
      "173": answer(
        "Çözüm: 465=d+398 denkleminde iki taraftan 398 çıkarırız. 465-398=67 olduğu için d=67'dir.",
      ),
      "175": answer(
        "Çözüm: y-3=19 denkleminde çıkarılan 3'ü dengelemek için iki tarafa 3 eklenir. Böylece y=22 elde edilir.",
      ),
      "177": answer(
        "Çözüm: u-6=24 denkleminde iki tarafa 6 ekleriz. 24+6=30 olduğundan u=30'dur.",
      ),
      "179": answer(
        "Çözüm: f-55=123 denkleminde iki tarafa 55 eklenir. 123+55=178 olduğu için f=178 bulunur.",
      ),
      "181": answer(
        "Çözüm: 19=n-13 denkleminde iki tarafa 13 ekleriz. 19+13=32 olduğundan n=32'dir.",
      ),
      "183": answer(
        "Çözüm: 10=p-38 denkleminde iki tarafa 38 eklenir. 10+38=48 olduğu için p=48 olur.",
      ),
      "185": answer(
        "Çözüm: 268=y-199 denkleminde iki tarafa 199 ekleriz. 268+199=467 olduğundan y=467 bulunur.",
      ),
      "187": answer(
        "Çözüm: “8 ve 9'un toplamı” 8+9, “17'ye eşittir” ise =17 demektir. Denklem 8+9=17 şeklinde yazılır.",
      ),
      "189": answer(
        "Çözüm: “23 ve 19'un farkı” 23-19 olarak yazılır. Sonuç 4'e eşit olduğundan denklem 23-19=4'tür.",
      ),
      "191": answer(
        "Çözüm: “3 ile 9'un çarpımı” 3·9 demektir. 27'ye eşit olduğu için denklem 3·9=27 olur.",
      ),
      "193": answer(
        "Çözüm: “54'ün 6'ya bölümü” 54÷6 olarak yazılır. Sonuç 9 olduğundan denklem 54÷6=9'dur.",
      ),
      "195": answer(
        "Çözüm: n ile 10'un farkı n-10'dur. Bunun iki katı 52 verdiği için denklem 2(n-10)=52 olur.",
      ),
      "197": answer(
        "Çözüm: y'nin üç katı 3y'dir; buna 10 eklenince 3y+10 olur. Toplam 100'e eşit olduğundan denklem 3y+10=100'dür.",
      ),
      "199": answer(
        "Çözüm: “p'den beş fazla 21'e eşittir” cümlesi p+5=21 denklemini verir. İki taraftan 5 çıkarınca p=16 bulunur.",
      ),
      "201": answer(
        "Çözüm: Cümle r+18=73 denklemini verir. İki taraftan 18 çıkarırsak r=55 olur.",
      ),
      "203": answer(
        "Çözüm: “d ile 30'un farkı 52'ye eşittir” cümlesi d-30=52 denklemini verir. İki tarafa 30 ekleyince d=82 bulunur.",
      ),
      "205": answer(
        "Çözüm: “u'dan 12 eksik” u-12 olarak yazılır. u-12=89 denkleminde iki tarafa 12 eklenir ve u=101 bulunur.",
      ),
      "207": answer(
        "Çözüm: “c'den 325 eksik 799 verir” cümlesi c-325=799 denklemini verir. İki tarafa 325 ekleyince c=1124 olur.",
      ),
      "209": answer(
        "Çözüm: Sigorta şirketinin ödeyeceği tutar p olsun. Toplam hasar 1.800 dolar ve 500 dolarlık muafiyet olduğundan 500+p=1800 yazılır. İki taraftan 500 çıkarınca p=1300 bulunur.",
      ),
      "211": answer(
        "Çözüm: İndirimden önceki fiyat p olsun. 120 dolar indirimden sonra 340 dolar ödendiği için p-120=340 yazılır. İki tarafa 120 eklenirse p=460 bulunur.",
      ),
    },
    exerciseSectionSlugs: {
      "147": "denklemin-cozumunu-kontrol-etme",
      "149": "denklemin-cozumunu-kontrol-etme",
      "151": "denklemin-cozumunu-kontrol-etme",
      "153": "denklemin-cozumunu-kontrol-etme",
      "155": "denklemin-cozumunu-kontrol-etme",
      "157": "denklemin-cozumunu-kontrol-etme",
      "159": "esitligin-korunumu-cikarma",
      "161": "esitligin-korunumu-cikarma",
      "163": "cikarma-islemiyle-denklem-cozme",
      "165": "cikarma-islemiyle-denklem-cozme",
      "167": "cikarma-islemiyle-denklem-cozme",
      "169": "cikarma-islemiyle-denklem-cozme",
      "171": "cikarma-islemiyle-denklem-cozme",
      "173": "cikarma-islemiyle-denklem-cozme",
      "175": "toplama-islemiyle-denklem-cozme",
      "177": "toplama-islemiyle-denklem-cozme",
      "179": "toplama-islemiyle-denklem-cozme",
      "181": "toplama-islemiyle-denklem-cozme",
      "183": "toplama-islemiyle-denklem-cozme",
      "185": "toplama-islemiyle-denklem-cozme",
      "187": "sozel-durumlari-denklem-ile-gosterme",
      "189": "sozel-durumlari-denklem-ile-gosterme",
      "191": "sozel-durumlari-denklem-ile-gosterme",
      "193": "sozel-durumlari-denklem-ile-gosterme",
      "195": "sozel-durumlari-denklem-ile-gosterme",
      "197": "sozel-durumlari-denklem-ile-gosterme",
      "199": "denklem-kurma-ve-cozme",
      "201": "denklem-kurma-ve-cozme",
      "203": "denklem-kurma-ve-cozme",
      "205": "denklem-kurma-ve-cozme",
      "207": "denklem-kurma-ve-cozme",
      "209": "denklem-kurma-ve-cozme",
      "211": "denklem-kurma-ve-cozme",
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
