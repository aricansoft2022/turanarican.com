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
  exercisePrompts?: Record<string, InlineContent[]>;
  exerciseAnswers: Record<string, InlineContent[]>;
  exerciseSectionSlugs: Record<string, string>;
};

function p(value: string): ContentBlock[] {
  return [{ type: "paragraph", text: [{ type: "text", value }] }];
}

function answer(value: string): InlineContent[] {
  return [{ type: "text", value }];
}

function tx(value: string): InlineContent[] {
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
    tryItSolutions: {
      "Sıra Sizde 2.25": p(
        "Çözüm: y yerine verilen değeri yazarız. y=6 için 6+4=10, y=15 için 15+4=19 olur.",
      ),
      "Sıra Sizde 2.26": p(
        "Çözüm: a yerine verilen sayıyı koyarız. a=9 için 9-5=4, a=17 için 17-5=12 bulunur.",
      ),
      "Sıra Sizde 2.27": p(
        "Çözüm: x=2 iken 8·2-3=13, x=1 iken 8·1-3=5 olur.",
      ),
      "Sıra Sizde 2.28": p(
        "Çözüm: y=3 için 4·3-4=8, y=5 için 4·5-4=16 bulunur.",
      ),
      "Sıra Sizde 2.29": p(
        "Çözüm: x yerine 8 yazınca x²=8²=64 olur.",
      ),
      "Sıra Sizde 2.30": p(
        "Çözüm: x yerine 6 yazınca x³=6³=216 bulunur.",
      ),
      "Sıra Sizde 2.31": p(
        "Çözüm: x=6 olduğunda 2 üzeri x, 2⁶ demektir. 2⁶=64 olduğu için ifadenin değeri 64'tür.",
      ),
      "Sıra Sizde 2.32": p(
        "Çözüm: x yerine 4 yazılır. 3⁴=81 olduğundan ifadenin değeri 81'dir.",
      ),
      "Sıra Sizde 2.33": p(
        "Çözüm: x=11 ve y=3 yazınca 2·11+5·3-4=22+15-4=33 olur.",
      ),
      "Sıra Sizde 2.34": p(
        "Çözüm: x=7 ve y=8 için 5·7-2·8-9=35-16-9=10 bulunur.",
      ),
      "Sıra Sizde 2.35": p(
        "Çözüm: x=3 yazınca 3·3²+4·3+1=27+12+1=40 olur.",
      ),
      "Sıra Sizde 2.36": p(
        "Çözüm: x=2 için 6·2²-4·2-7=24-8-7=9 bulunur.",
      ),
      "Sıra Sizde 2.37": p(
        "Çözüm: İfadede üç terim vardır: 4x, 3b ve 2. Bu terimlerin katsayıları sırasıyla 4, 3 ve 2'dir.",
      ),
      "Sıra Sizde 2.38": p(
        "Çözüm: Terimler 9a, 13a² ve a³'tür. Katsayılar sırasıyla 9, 13 ve 1'dir; a³ teriminin katsayısı yazılmasa da 1 kabul edilir.",
      ),
      "Sıra Sizde 2.39": p(
        "Çözüm: Aynı değişken ve aynı üslere sahip terimler benzerdir. Bu listede 2x³ ile 8x³, y² ile 11y² ve sabit terimler 9 ile 15 benzer terimlerdir.",
      ),
      "Sıra Sizde 2.40": p(
        "Çözüm: Benzer terimler 4x³ ile 6x³, 8x² ile 3x² ve sabit terimler 19 ile 24'tür.",
      ),
      "Sıra Sizde 2.41": p(
        "Çözüm: x'li terimleri ve sabitleri ayrı toplarız: 7x+9x=16x ve 9+8=17. Sonuç 16x+17'dir.",
      ),
      "Sıra Sizde 2.42": p(
        "Çözüm: y'li terimler 5y+8y+4y=17y, sabitler 2+5=7 olur. İfade 17y+7'ye sadeleşir.",
      ),
      "Sıra Sizde 2.43": p(
        "Çözüm: x² terimlerini ve x terimlerini ayrı birleştiririz: 3x²+x²=4x² ve 9x+5x=14x. Sonuç 4x²+14x olur.",
      ),
      "Sıra Sizde 2.44": p(
        "Çözüm: 11y²+y²=12y² ve 8y+7y=15y olduğundan ifade 12y²+15y biçiminde sadeleşir.",
      ),
      "Sıra Sizde 2.45": p(
        "Çözüm: Fark çıkarma, bölüm bölme işlemidir. Bu nedenle ⓐ 47-41, ⓑ 5x/2 olarak yazılır.",
      ),
      "Sıra Sizde 2.46": p(
        "Çözüm: Toplam toplama, çarpım çarpma işlemidir. Bu nedenle ⓐ 17+19, ⓑ 7x yazılır.",
      ),
      "Sıra Sizde 2.47": p(
        "Çözüm: “Fazla” toplama, “eksik” çıkarma anlatır. Bu nedenle ⓐ x+11, ⓑ 11a-14 olur.",
      ),
      "Sıra Sizde 2.48": p(
        "Çözüm: j'den 19 fazla j+19, 2x'ten 21 eksik ise 2x-21 olarak yazılır.",
      ),
      "Sıra Sizde 2.49": p(
        "Çözüm: ⓐ Önce p ile q toplanır, sonra toplam 4 ile çarpılır: 4(p+q). ⓑ Önce p'nin dört katı alınır, sonra q eklenir: 4p+q.",
      ),
      "Sıra Sizde 2.50": p(
        "Çözüm: ⓐ x'in iki katı ile 8'in farkı 2x-8'dir. ⓑ x ile 8'in farkının iki katı ise 2(x-8) olur.",
      ),
      "Sıra Sizde 2.51": p(
        "Çözüm: Genişlik w ise uzunluk bundan 5 inç eksiktir. Bu yüzden uzunluk w-5 ile gösterilir.",
      ),
      "Sıra Sizde 2.52": p(
        "Çözüm: Uzunluk l ise genişlik bundan 2 metre fazladır. Genişlik l+2 olur.",
      ),
      "Sıra Sizde 2.53": p(
        "Çözüm: 25 sentliklerin sayısı q ise bunun altı katı 6q'dur. 10 sentliklerin sayısı yedi eksik olduğundan 6q-7 ile gösterilir.",
      ),
      "Sıra Sizde 2.54": p(
        "Çözüm: 5 sentliklerin sayısı n ise dört katı 4n'dir. 10 sentliklerin sayısı sekiz fazla olduğundan 4n+8 olur.",
      ),
    },
    exerciseAnswers: {
      "69": answer(
        "Çözüm: x yerine 2 yazınca 7·2+8=14+8=22 olur.",
      ),
      "71": answer(
        "Çözüm: x yerine 6 yazılır. 5·6-4=30-4=26 olduğundan ifadenin değeri 26'dır.",
      ),
      "73": answer(
        "Çözüm: x yerine 12 yazılır. Üs, 12'nin kendisiyle çarpılması demektir; bu yüzden x²=12²=144 bulunur.",
      ),
      "75": answer(
        "Çözüm: x yerine 2 yazınca x⁵=2⁵ olur. 2'yi beş kez çarparız ve sonuç 32 çıkar.",
      ),
      "77": answer(
        "Çözüm: x=3 olduğunda 3ˣ ifadesi 3³ olur. 3·3·3=27 olduğundan ifadenin değeri 27'dir.",
      ),
      "79": answer(
        "Çözüm: x=4 yazınca x²+3x-7=4²+3·4-7=16+12-7=21 bulunur.",
      ),
      "81": answer(
        "Çözüm: x=7 ve y=8 yazılır. 2·7+4·8-5=14+32-5=41 olur.",
      ),
      "83": answer(
        "Çözüm: x=10 ve y=7 için (x-y)²=(10-7)²=3²=9 bulunur.",
      ),
      "84": answer(
        "Çözüm: x=6 ve y=9 için (x+y)²=(6+9)²=15²=225 olur.",
      ),
      "85": answer(
        "Çözüm: a=3 ve b=8 yazınca a²+b²=3²+8²=9+64=73 bulunur.",
      ),
      "87": answer(
        "Çözüm: l=15 ve w=12 için 2l+2w=2·15+2·12=30+24=54 olur.",
      ),
      "89": answer(
        "Çözüm: Toplama işaretleri ifadeyi terimlere ayırır. Terimler 15x², 6x ve 2'dir.",
      ),
      "91": answer(
        "Çözüm: İfadede üç terim vardır: 10y³, y ve 2.",
      ),
      "93": answer(
        "Çözüm: 8a teriminde değişkeni çarpan sayı 8'dir. Katsayı 8'dir.",
      ),
      "95": answer(
        "Çözüm: 5r² teriminde r²'nin önündeki sayı 5'tir. Bu nedenle katsayı 5'tir.",
      ),
      "97": answer(
        "Çözüm: Aynı değişken ve aynı üslü terimler benzerdir. x³ ile 8x³ benzerdir; sabit terimler 14 ve 5 de benzerdir.",
      ),
      "99": answer(
        "Çözüm: 16ab ile 4ab benzer terimlerdir. 16b² ile 9b² de benzer terimlerdir; diğerleri değişken ya da üs bakımından farklıdır.",
      ),
      "101": answer(
        "Çözüm: Benzer terimler aynı değişken kısmına sahiptir. Katsayıları toplarız: 10x+3x=13x.",
      ),
      "103": answer(
        "Çözüm: 17a ve 9a benzer terimlerdir. Katsayılar toplanır: 17a+9a=26a.",
      ),
      "105": answer(
        "Çözüm: Üç terim de c'lidir. Katsayıları toplarsak 4c+2c+c=7c olur.",
      ),
      "107": answer(
        "Çözüm: 9x ve 3x benzer terimlerdir; 9x+3x=12x. Sabit 8 aynen kalır, sonuç 12x+8 olur.",
      ),
      "109": answer(
        "Çözüm: u'lu terimler 7u+3u=10u, sabitler 2+1=3 olur. İfade 10u+3'e sadeleşir.",
      ),
      "111": answer(
        "Çözüm: p'li terimler 7p+5p=12p, sabitler 6+4=10 olur. Sonuç 12p+10'dur.",
      ),
      "113": answer(
        "Çözüm: a'lı terimleri birleştiririz: 10a+5a+7a=22a. Sabitler 7-2-4=1 olduğundan sonuç 22a+1 olur.",
      ),
      "115": answer(
        "Çözüm: x² terimleri 3x²+14x²=17x², x terimleri 12x+8x=20x, sabitler 11+5=16'dır. Sonuç 17x²+20x+16 olur.",
      ),
      "117": answer(
        "Çözüm: “Toplam” toplama işlemini anlatır. 8 ile 12'nin toplamı 8+12 olarak yazılır.",
      ),
      "119": answer(
        "Çözüm: “Fark” çıkarma işlemini anlatır. 14 ile 9'un farkı 14-9'dur.",
      ),
      "121": answer(
        "Çözüm: “Çarpım” çarpma işlemini anlatır. 9 ile 7'nin çarpımı 9·7 olarak yazılır.",
      ),
      "123": answer(
        "Çözüm: “Bölüm” bölme işlemini anlatır. 36'nın 9'a bölümü 36÷9 olarak gösterilir.",
      ),
      "125": answer(
        "Çözüm: x ile 4'ün farkı x-4 biçiminde yazılır.",
      ),
      "127": answer(
        "Çözüm: 6 ile y'nin çarpımı 6y olarak yazılır.",
      ),
      "129": answer(
        "Çözüm: 8x ile 3x'in toplamı 8x+3x olarak yazılır; sadeleştirilirse 11x olur.",
      ),
      "131": answer(
        "Çözüm: y'nin 3'e bölümü y÷3 ya da y/3 biçiminde gösterilir.",
      ),
      "133": answer(
        "Çözüm: Önce y ile 9'un farkı alınır: y-9. Bunun sekiz katı 8(y-9) olur.",
      ),
      "135": answer(
        "Çözüm: Sözel ifade ortak çarpanı ve parantez içindeki toplamı anlatır. Bu nedenle cebirsel ifade 5(x+y) şeklinde yazılır.",
      ),
      "137": answer(
        "Çözüm: Bluzun fiyatı b ise etek bundan 15 dolar fazladır. Eteğin fiyatı b+15 ile gösterilir.",
      ),
      "139": answer(
        "Çözüm: Erkek öğrenci sayısı b ise kız öğrenci sayısı bundan 4 eksiktir. İfade b-4 olur.",
      ),
      "141": answer(
        "Çözüm: 5 sentliklerin sayısı n ise bunun iki katı 2n'dir. 1 sentliklerin sayısı bundan yedi eksik olduğundan 2n-7 ile gösterilir.",
      ),
      "143": answer(
        "Çözüm: Justin muafiyet tutarı olan 750 doları öder. Toplam hasar 2.100 dolar olduğuna göre sigorta şirketi 2.100-750=1.350 dolar öder.",
      ),
    },
    exerciseSectionSlugs: {
      "69": "cebirsel-ifadenin-degerini-hesaplama",
      "71": "cebirsel-ifadenin-degerini-hesaplama",
      "73": "cebirsel-ifadenin-degerini-hesaplama",
      "75": "cebirsel-ifadenin-degerini-hesaplama",
      "77": "cebirsel-ifadenin-degerini-hesaplama",
      "79": "cebirsel-ifadenin-degerini-hesaplama",
      "81": "cebirsel-ifadenin-degerini-hesaplama",
      "83": "cebirsel-ifadenin-degerini-hesaplama",
      "84": "cebirsel-ifadenin-degerini-hesaplama",
      "85": "cebirsel-ifadenin-degerini-hesaplama",
      "87": "cebirsel-ifadenin-degerini-hesaplama",
      "89": "terim-katsayi-ve-benzer-terim",
      "91": "terim-katsayi-ve-benzer-terim",
      "93": "terim-katsayi-ve-benzer-terim",
      "95": "terim-katsayi-ve-benzer-terim",
      "97": "terim-katsayi-ve-benzer-terim",
      "99": "terim-katsayi-ve-benzer-terim",
      "101": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "103": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "105": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "107": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "109": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "111": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "113": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "115": "cebirsel-ifadelerde-toplama-ve-cikarma",
      "117": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "119": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "121": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "123": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "125": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "127": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "129": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "131": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "133": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "135": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "137": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "139": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "141": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
      "143": "sozel-durumlari-cebirsel-ifade-ile-gosterme",
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
      sortOrder: 2,
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
      sortOrder: 3,
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
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "cebir-diline-giris",
    sourceNumber: "2.6",
    catalogLesson: {
      id: "lesson-prime-factorization-lcm",
      slug: "asal-carpanlar-ve-ekok",
      displayTitle: "Asal Çarpanlar ve EKOK",
      summary:
        "Bileşik sayıları asal çarpanlarına ayırın ve iki sayının en küçük ortak katını farklı yöntemlerle bulun.",
      sortOrder: 4,
    },
    objectives: [
      "Bileşik sayıları asal çarpanlarına ayırabileceksiniz.",
      "İki doğal sayının en küçük ortak katını (EKOK) bulabileceksiniz.",
    ],
    sectionTitles: {
      "Find the Prime Factorization of a Composite Number":
        "Asal Çarpanlara Ayırma",
      "Prime Factorization Using the Factor Tree Method":
        "Çarpan Ağacı Yöntemi",
      "Prime Factorization Using the Ladder Method":
        "Bölme Merdiveni Yöntemi",
      "Find the Least Common Multiple (LCM) of Two Numbers":
        "En Küçük Ortak Kat (EKOK)",
      "Listing Multiples Method": "Katları Listeleme Yöntemi",
      "Prime Factors Method": "Asal Çarpanlarla EKOK",
    },
    tryItSolutions: {
      "Sıra Sizde 2.95": p(
        "Çözüm: 80'i çarpan ağacıyla 8·10 olarak ayırabiliriz. 8=2·2·2 ve 10=2·5 olduğundan 80=2⁴·5 olur.",
      ),
      "Sıra Sizde 2.96": p(
        "Çözüm: 60=6·10, 6=2·3 ve 10=2·5'tir. Asal çarpanlar 2, 2, 3 ve 5 olduğundan 60=2²·3·5 olur.",
      ),
      "Sıra Sizde 2.97": p(
        "Çözüm: 126=2·63 ve 63=9·7=3·3·7 olduğundan 126=2·3²·7 biçiminde asal çarpanlarına ayrılır.",
      ),
      "Sıra Sizde 2.98": p(
        "Çözüm: 294=2·147, 147=3·49 ve 49=7·7'dir. Bu nedenle 294=2·3·7² olur.",
      ),
      "Sıra Sizde 2.99": p(
        "Çözüm: Bölme merdiveninde 80'i 2'ye art arda böleriz: 80, 40, 20, 10, 5. Son bölüm 5 asal olduğundan 80=2⁴·5'tir.",
      ),
      "Sıra Sizde 2.100": p(
        "Çözüm: 60'ı önce 2'ye böleriz: 60, 30, 15. Sonra 15'i 3'e böleriz ve 5 kalır. 5 asal olduğundan 60=2²·3·5 olur.",
      ),
      "Sıra Sizde 2.101": p(
        "Çözüm: 126'yı 2'ye bölünce 63 kalır. 63'ü 3'e, sonra tekrar 3'e böleriz ve 7 kalır. Bu yüzden 126=2·3²·7'dir.",
      ),
      "Sıra Sizde 2.102": p(
        "Çözüm: 294'ü 2'ye bölersek 147 kalır. 147=3·49 ve 49=7·7 olduğundan asal çarpanlara ayrılmış biçim 2·3·7² olur.",
      ),
      "Sıra Sizde 2.103": p(
        "Çözüm: 9'un katları 9,18,27,36,...; 12'nin katları 12,24,36,... şeklindedir. İlk ortak kat 36 olduğu için EKOK(9,12)=36'dır.",
      ),
      "Sıra Sizde 2.104": p(
        "Çözüm: 18'in katları 18,36,54,72,...; 24'ün katları 24,48,72,... şeklindedir. İlk ortak kat 72 olduğundan EKOK(18,24)=72 olur.",
      ),
      "Sıra Sizde 2.105": p(
        "Çözüm: 15=3·5 ve 20=2²·5'tir. Her asal çarpanın en büyük kuvvetini alırız: 2²·3·5=60. Bu nedenle EKOK 60'tır.",
      ),
      "Sıra Sizde 2.106": p(
        "Çözüm: 15=3·5 ve 35=5·7'dir. Ortak 5'i bir kez, kalan 3 ve 7'yi de alırız: 3·5·7=105. EKOK 105'tir.",
      ),
      "Sıra Sizde 2.107": p(
        "Çözüm: 55=5·11 ve 88=2³·11'dir. En büyük asal kuvvetler 2³, 5 ve 11 olduğundan EKOK=2³·5·11=440 olur.",
      ),
      "Sıra Sizde 2.108": p(
        "Çözüm: 60=2²·3·5 ve 72=2³·3²'dir. En büyük kuvvetleri alırsak EKOK=2³·3²·5=360 bulunur.",
      ),
    },
    exerciseAnswers: {
      "267": answer(
        "Çözüm: 86 çift olduğu için 2'ye bölünür ve 43 kalır. 43 asal olduğundan 86=2·43 biçiminde asal çarpanlarına ayrılır.",
      ),
      "269": answer(
        "Çözüm: 132=2·66=2·2·33 ve 33=3·11'dir. Bu nedenle 132=2²·3·11 olur.",
      ),
      "271": answer(
        "Çözüm: 693'ün rakamları toplamı 18 olduğu için 3'e bölünür. 693=3·231=3·3·77 ve 77=7·11 olduğundan 693=3²·7·11 olur.",
      ),
      "273": answer(
        "Çözüm: 115 son basamağı 5 olduğu için 5'e bölünür. 115=5·23 ve 23 asal olduğundan asal çarpanlara ayrılmış biçim 5·23'tür.",
      ),
      "275": answer(
        "Çözüm: 2475=25·99 olarak ayrılabilir. 25=5² ve 99=9·11=3²·11 olduğundan 2475=3²·5²·11 olur.",
      ),
      "277": answer(
        "Çözüm: 56'yı bölme merdiveninde 2'ye art arda böleriz: 56, 28, 14, 7. 7 asal olduğundan 56=2³·7 olur.",
      ),
      "279": answer(
        "Çözüm: 168'i 2'ye üç kez böleriz: 168, 84, 42, 21. 21=3·7 olduğundan 168=2³·3·7 olur.",
      ),
      "281": answer(
        "Çözüm: 391 sayısı 17·23 olarak yazılabilir. 17 ve 23 asal olduğundan asal çarpanlara ayrılmış biçim 17·23'tür.",
      ),
      "283": answer(
        "Çözüm: 432=16·27 olarak düşünülebilir. 16=2⁴ ve 27=3³ olduğundan 432=2⁴·3³ olur.",
      ),
      "285": answer(
        "Çözüm: 2160=216·10, 216=2³·3³ ve 10=2·5'tir. Bu nedenle 2160=2⁴·3³·5 olur.",
      ),
      "287": answer(
        "Çözüm: 150=15·10, 15=3·5 ve 10=2·5'tir. Asal çarpanlar birleştirilirse 150=2·3·5² olur.",
      ),
      "289": answer(
        "Çözüm: 525=21·25 olarak ayrılabilir. 21=3·7 ve 25=5² olduğundan 525=3·5²·7 olur.",
      ),
      "291": answer(
        "Çözüm: 36=4·9, 4=2² ve 9=3² olduğundan 36=2²·3² biçiminde asal çarpanlarına ayrılır.",
      ),
      "293": answer(
        "Çözüm: 350=35·10, 35=5·7 ve 10=2·5'tir. Bu nedenle 350=2·5²·7 olur.",
      ),
      "295": answer(
        "Çözüm: 8'in katları 8,16,24,...; 12'nin katları 12,24,... şeklindedir. İlk ortak kat 24 olduğundan EKOK(8,12)=24'tür.",
      ),
      "297": answer(
        "Çözüm: 6'nın katları 6,12,18,24,30,...; 15'in katları 15,30,... şeklindedir. İlk ortak kat 30 olduğu için EKOK 30'dur.",
      ),
      "299": answer(
        "Çözüm: 30'un katları 30,60,90,120,...; 40'ın katları 40,80,120,... şeklindedir. İlk ortak kat 120 olduğundan EKOK 120'dir.",
      ),
      "301": answer(
        "Çözüm: 60'ın katları 60,120,180,240,300,...; 75'in katları 75,150,225,300,... şeklindedir. İlk ortak kat 300'dür.",
      ),
      "303": answer(
        "Çözüm: 8=2³ ve 12=2²·3'tür. En büyük asal kuvvetleri alırsak EKOK=2³·3=24 olur.",
      ),
      "305": answer(
        "Çözüm: 24=2³·3 ve 30=2·3·5'tir. En büyük asal kuvvetleri alırız: 2³·3·5=120. EKOK 120'dir.",
      ),
      "307": answer(
        "Çözüm: 70=2·5·7 ve 84=2²·3·7'dir. En büyük kuvvetleri alırsak EKOK=2²·3·5·7=420 olur.",
      ),
      "309": answer(
        "Çözüm: 6=2·3 ve 21=3·7'dir. Ortak 3 bir kez alınır, kalan 2 ve 7 eklenir: EKOK=2·3·7=42.",
      ),
      "311": answer(
        "Çözüm: 24=2³·3 ve 30=2·3·5'tir. En büyük asal kuvvetler 2³, 3 ve 5 olduğundan EKOK=120 bulunur.",
      ),
      "313": answer(
        "Çözüm: Aynı sayıda sosis ve ekmek almak için 10 ve 8'in EKOK'unu buluruz. 10=2·5 ve 8=2³ olduğundan EKOK=2³·5=40'tır; en az 40 sosis ve 40 ekmek alınır.",
      ),
    },
    exerciseSectionSlugs: {
      "267": "carpan-agaci-yontemi",
      "269": "carpan-agaci-yontemi",
      "271": "carpan-agaci-yontemi",
      "273": "carpan-agaci-yontemi",
      "275": "carpan-agaci-yontemi",
      "277": "bolme-merdiveni-yontemi",
      "279": "bolme-merdiveni-yontemi",
      "281": "bolme-merdiveni-yontemi",
      "283": "bolme-merdiveni-yontemi",
      "285": "bolme-merdiveni-yontemi",
      "287": "asal-carpanlara-ayirma",
      "289": "asal-carpanlara-ayirma",
      "291": "asal-carpanlara-ayirma",
      "293": "asal-carpanlara-ayirma",
      "295": "katlari-listeleme-yontemi",
      "297": "katlari-listeleme-yontemi",
      "299": "katlari-listeleme-yontemi",
      "301": "katlari-listeleme-yontemi",
      "303": "asal-carpanlarla-ekok",
      "305": "asal-carpanlarla-ekok",
      "307": "asal-carpanlarla-ekok",
      "309": "en-kucuk-ortak-kat-ekok",
      "311": "en-kucuk-ortak-kat-ekok",
      "313": "en-kucuk-ortak-kat-ekok",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "tam-sayilar",
    sourceNumber: "3.2",
    catalogLesson: {
      id: "lesson-integers-absolute-value",
      slug: "tam-sayilar-ve-mutlak-deger",
      displayTitle: "Tam Sayılar ve Mutlak Değer",
      summary:
        "Pozitif ve negatif sayıları sayı doğrusunda gösterin, tam sayıları karşılaştırın, zıt sayıları ve mutlak değeri kullanın.",
      sortOrder: 1,
    },
    objectives: [
      "Pozitif ve negatif sayıları sayı doğrusunda gösterebileceksiniz.",
      "Tam sayıları karşılaştırıp sıralayabileceksiniz.",
      "Bir sayının zıttını bulabileceksiniz.",
      "Mutlak değer içeren ifadeleri sadeleştirebileceksiniz.",
      "Sözel durumları tam sayılarla gösterebileceksiniz.",
    ],
    sectionTitles: {
      "Locate Positive and Negative Numbers on the Number Line":
        "Sayı Doğrusunda Pozitif ve Negatif Sayılar",
      "Order Positive and Negative Numbers": "Tam Sayıları Sıralama",
      "Find Opposites": "Zıt Sayılar",
      "Opposite Notation": "Zıt Sayı Gösterimi",
      Integers: "Tam Sayılar",
      "Simplify Expressions with Absolute Value": "Mutlak Değer",
      "Translate Word Phrases into Expressions with Integers":
        "Tam Sayılarla Sözel İfadeler",
    },
    tryItSolutions: {
      "Sıra Sizde 3.1": p(
        "Çözüm: Sayı doğrusunda 1, sıfırın bir birim sağındadır; -1, sıfırın bir birim solundadır; -4 ise sıfırın dört birim solundadır.",
      ),
      "Sıra Sizde 3.2": p(
        "Çözüm: -4 sıfırın dört birim solunda, 4 sıfırın dört birim sağında, -1 ise sıfırın bir birim solundadır.",
      ),
      "Sıra Sizde 3.3": p(
        "Çözüm: Sayı doğrusunda sağdaki sayı daha büyüktür. Bu nedenle 15>7, -2<5, -3>-7 ve 5>-17 olur.",
      ),
      "Sıra Sizde 3.4": p(
        "Çözüm: 8 sayısı 13'ün solunda olduğu için 8<13; pozitif 3, -4'ten büyüktür; -5, -2'nin solundadır; 9, -21'den büyüktür. Sonuçlar: 8<13, 3>-4, -5<-2, 9>-21.",
      ),
      "Sıra Sizde 3.5": p(
        "Çözüm: Bir sayının zıttı, sayı doğrusunda sıfıra aynı uzaklıkta karşı tarafta bulunan sayıdır. 4'ün zıttı -4, -3'ün zıttı 3'tür.",
      ),
      "Sıra Sizde 3.6": p(
        "Çözüm: 8'in zıttı -8, -5'in zıttı 5'tir.",
      ),
      "Sıra Sizde 3.7": p(
        "Çözüm: -(-1), -1'in zıttını ister. -1'in zıttı 1 olduğu için sonuç 1'dir.",
      ),
      "Sıra Sizde 3.8": p(
        "Çözüm: -(-5), -5'in zıttıdır. Bu nedenle sonuç 5 olur.",
      ),
      "Sıra Sizde 3.9": p(
        "Çözüm: -n ifadesi n'nin zıttını gösterir. n=4 iken -n=-4, n=-4 iken -n=4 olur.",
      ),
      "Sıra Sizde 3.10": p(
        "Çözüm: -m, m'nin zıttıdır. m=11 iken -m=-11; m=-11 iken -m=11 bulunur.",
      ),
      "Sıra Sizde 3.11": p(
        "Çözüm: Mutlak değer uzaklık belirtir. |12|=12 ve |-28|=28 olur. İkinci ifadede dışarıdaki eksi korunur: -|-28|=-28.",
      ),
      "Sıra Sizde 3.12": p(
        "Çözüm: |9|=9'dur. |37|=37 olduğundan -|37|=-37 olur.",
      ),
      "Sıra Sizde 3.13": p(
        "Çözüm: |x| için x=-17 yazılırsa |-17|=17 olur. |-y| ifadesinde y=-39 iken -y=39, |39|=39'dur. -|m| için m=22 yazılırsa -|22|=-22; -|p| için p=-11 yazılırsa -|-11|=-11 olur.",
      ),
      "Sıra Sizde 3.14": p(
        "Çözüm: |y|, y=-23 iken 23'tür. |-y|, y=-21 iken |21|=21 olur. -|n|, n=37 iken -37; -|q|, q=-49 iken -49'dur.",
      ),
      "Sıra Sizde 3.15": p(
        "Çözüm: Önce mutlak değerleri sadeleştiririz: |-9|=9 ve -|-9|=-9 olduğundan 9>-9. Ayrıca 2>-2, -8<8 ve -5=-5 olur.",
      ),
      "Sıra Sizde 3.16": p(
        "Çözüm: -|-7|=-7 olduğu için 7>-7. -|-11|=-11 olduğundan -11=-11. |-4|=4 ve -|-4|=-4 olduğundan 4>-4. Son olarak -1<|-1| olduğu için -1<1.",
      ),
      "Sıra Sizde 3.17": p(
        "Çözüm: |12-9|=|3|=3 olur. 3|-6| ifadesinde |-6|=6 olduğundan 3·6=18 bulunur.",
      ),
      "Sıra Sizde 3.18": p(
        "Çözüm: |27-16|=|11|=11 olur. 9|-7| ifadesinde |-7|=7 olduğundan sonuç 63'tür.",
      ),
      "Sıra Sizde 3.19": p(
        "Çözüm: |1+8|-|2+5|=|9|-|7|=9-7=2 olur.",
      ),
      "Sıra Sizde 3.20": p(
        "Çözüm: |9-5|-|7-6|=|4|-|1|=4-1=3 bulunur.",
      ),
      "Sıra Sizde 3.21": p(
        "Çözüm: Önce parantez içi yapılır: 3-1=2. Sonra 4·2=8 ve 11-8=3 olur. |3|=3 olduğundan 19-3=16 bulunur.",
      ),
      "Sıra Sizde 3.22": p(
        "Çözüm: Önce 7-5=2, sonra 4·2=8 ve 8-8=0 bulunur. |0|=0 olduğundan 9-0=9 olur.",
      ),
      "Sıra Sizde 3.23": p(
        "Çözüm: Pozitif 9'un zıttı -9'dur. -15'in zıttı 15'tir. Negatif yirmi -20 ile, 11 eksi negatif 4 ise 11-(-4) ile gösterilir.",
      ),
      "Sıra Sizde 3.24": p(
        "Çözüm: Negatif 19'un zıttı 19'dur. 22'nin zıttı -22'dir. Negatif dokuz -9 ile, negatif 8 eksi negatif 5 ise -8-(-5) ile gösterilir.",
      ),
      "Sıra Sizde 3.25": p(
        "Çözüm: Kazanç pozitif yönü anlatır. Bu nedenle 5 yardalık kazanç +5 yard, yani 5 yard olarak gösterilir.",
      ),
      "Sıra Sizde 3.26": p(
        "Çözüm: Su yüzeyinin altı negatif yön kabul edilir. Dalgıç yüzeyin 30 feet altında olduğundan durum -30 feet ile gösterilir.",
      ),
    },
    exerciseAnswers: {
      "1": answer(
        "Çözüm: 2 sıfırın iki birim sağında, -2 sıfırın iki birim solunda, -5 ise sıfırın beş birim solunda işaretlenir.",
      ),
      "3": answer(
        "Çözüm: -8 sıfırın sekiz birim solunda, 8 sıfırın sekiz birim sağında, -6 sıfırın altı birim solunda gösterilir.",
      ),
      "5": answer(
        "Çözüm: Sayı doğrusunda sağdaki sayı daha büyüktür. Bu yüzden 9>4, -3<6, -8<-2 ve 1>-10 olur.",
      ),
      "7": answer(
        "Çözüm: Pozitif sayılar negatif sayılardan büyüktür; negatiflerde sıfıra yakın olan daha büyüktür. Sonuçlar: -5<1, -4>-9, 6<10, 3>-8.",
      ),
      "9": answer(
        "Çözüm: 2'nin zıttı -2'dir. -6'nın zıttı ise 6'dır.",
      ),
      "11": answer(
        "Çözüm: -8'in zıttı 8, 1'in zıttı -1'dir.",
      ),
      "13": answer(
        "Çözüm: -(-4), -4'ün zıttını gösterir. Bu nedenle sonuç 4'tür.",
      ),
      "15": answer(
        "Çözüm: -(-15), -15'in zıttıdır; sonuç 15 olur.",
      ),
      "17": answer(
        "Çözüm: -m ifadesi m'nin zıttını verir. m=3 iken -m=-3, m=-3 iken -m=3 olur.",
      ),
      "19": answer(
        "Çözüm: -c, c'nin zıttıdır. c=12 iken -c=-12; c=-12 iken -c=12 bulunur.",
      ),
      "21": answer(
        "Çözüm: Mutlak değer uzaklık olduğu için negatif çıkmaz. |7|=7, |-25|=25 ve |0|=0 olur.",
      ),
      "23": answer(
        "Çözüm: Sıfıra uzaklıkları alırız: |-32|=32, |-18|=18 ve |16|=16.",
      ),
      "25": answer(
        "Çözüm: x=-28 iken |x|=|-28|=28 olur. u=-15 iken -u=15, dolayısıyla |-u|=|15|=15 bulunur.",
      ),
      "27": answer(
        "Çözüm: p=19 iken -|p|=-|19|=-19 olur. q=-33 iken -|q|=-|-33|=-33'tür.",
      ),
      "29": answer(
        "Çözüm: |-6|=6 olduğundan -6<6. Ayrıca -|-3|=-3 olduğu için -3=-3 olur.",
      ),
      "31": answer(
        "Çözüm: |-3|=3 ve -|-3|=-3 olduğundan 3>-3. Ayrıca -|-4|=-4 olduğu için 4>-4 olur.",
      ),
      "33": answer(
        "Çözüm: Önce mutlak değer içini sadeleştiririz: 8-4=4. |4|=4'tür.",
      ),
      "35": answer(
        "Çözüm: |-7|=7 olduğundan 8|-7|=8·7=56 olur.",
      ),
      "37": answer(
        "Çözüm: |15-7|-|14-6|=|8|-|8|=8-8=0 bulunur.",
      ),
      "39": answer(
        "Çözüm: Önce parantez içi: 8-3=5. Sonra 2·5=10 ve |10|=10 olur. 18-10=8 bulunur.",
      ),
      "41": answer(
        "Çözüm: |-2|=2, 2|-2|=4 ve 14-4=10 olur. Son olarak 8·10=80 bulunur.",
      ),
      "43": answer(
        "Çözüm: 8'in zıttı -8, -6'nın zıttı 6'dır. Negatif üç -3 ile gösterilir. 4 eksi negatif 3 ise 4-(-3)=7 olur.",
      ),
      "45": answer(
        "Çözüm: 20'nin zıttı -20, -5'in zıttı 5'tir. Negatif on iki -12'dir. 18-(-7)=25 olur.",
      ),
      "47": answer(
        "Çözüm: Sıfırın altındaki sıcaklık negatif tam sayıyla gösterilir. Bu durum -6 derece olarak yazılır.",
      ),
      "49": answer(
        "Çözüm: Deniz seviyesinin altı negatif yön kabul edilir. 40 feet aşağısı -40 feet ile gösterilir.",
      ),
      "51": answer(
        "Çözüm: Kayıp negatif değişimdir. 12 yard kayıp -12 yard olarak yazılır.",
      ),
      "53": answer(
        "Çözüm: Kazanç pozitif değişimdir. 3 dolarlık hisse artışı +3 dolar, yani 3 dolar olarak gösterilir.",
      ),
      "55": answer(
        "Çözüm: Golfte parın bir üstü pozitif yönde 1 olarak gösterilir.",
      ),
      "57": answer(
        "Çözüm: Deniz seviyesinin üstü pozitif, altı negatiftir. Mount McKinley için 20.320 feet, Death Valley için -282 feet yazılır.",
      ),
      "59": answer(
        "Çözüm: Bütçe fazlası pozitif, bütçe açığı negatiftir. Fazla +540 milyon dolar, açık -27 milyar dolar olarak gösterilir.",
      ),
      "61": answer(
        "Çözüm: Örnek olarak sıfırın 4 derece altındaki hava sıcaklığı -4 derece ile gösterilebilir.",
      ),
    },
    exerciseSectionSlugs: {
      "1": "sayi-dogrusunda-pozitif-ve-negatif-sayilar",
      "3": "sayi-dogrusunda-pozitif-ve-negatif-sayilar",
      "5": "tam-sayilari-siralama",
      "7": "tam-sayilari-siralama",
      "9": "zit-sayilar",
      "11": "zit-sayilar",
      "13": "zit-sayi-gosterimi",
      "15": "zit-sayi-gosterimi",
      "17": "tam-sayilar",
      "19": "tam-sayilar",
      "21": "mutlak-deger",
      "23": "mutlak-deger",
      "25": "mutlak-deger",
      "27": "mutlak-deger",
      "29": "mutlak-deger",
      "31": "mutlak-deger",
      "33": "mutlak-deger",
      "35": "mutlak-deger",
      "37": "mutlak-deger",
      "39": "mutlak-deger",
      "41": "mutlak-deger",
      "43": "tam-sayilarla-sozel-ifadeler",
      "45": "tam-sayilarla-sozel-ifadeler",
      "47": "tam-sayilarla-sozel-ifadeler",
      "49": "tam-sayilarla-sozel-ifadeler",
      "51": "tam-sayilarla-sozel-ifadeler",
      "53": "tam-sayilarla-sozel-ifadeler",
      "55": "tam-sayilarla-sozel-ifadeler",
      "57": "tam-sayilarla-sozel-ifadeler",
      "59": "tam-sayilarla-sozel-ifadeler",
      "61": "tam-sayilarla-sozel-ifadeler",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "tam-sayilar",
    sourceNumber: "3.3",
    catalogLesson: {
      id: "lesson-add-integers",
      slug: "tam-sayilarla-toplama",
      displayTitle: "Tam Sayılarla Toplama",
      summary:
        "Pozitif ve negatif tam sayıları modelleyerek toplayın, değişkenli ifadeleri değerlendirin ve günlük yaşam problemlerini tam sayılarla çözün.",
      sortOrder: 2,
    },
    objectives: [
      "Tam sayılarla toplamayı modelleyebileceksiniz.",
      "Tam sayılar içeren ifadeleri sadeleştirebileceksiniz.",
      "Tam sayılarla verilen değişkenli ifadeleri değerlendirebileceksiniz.",
      "Sözel ifadeleri cebirsel ifadelere çevirebileceksiniz.",
      "Tam sayılarla toplama gerektiren problemleri çözebileceksiniz.",
    ],
    sectionTitles: {
      "Model Addition of Integers": "Tam Sayılarla Toplamayı Modelleme",
      "Simplify Expressions with Integers": "Tam Sayılarla Toplama İşlemi",
      "Evaluate Variable Expressions with Integers":
        "Değişkenli İfadeleri Değerlendirme",
      "Translate Word Phrases to Algebraic Expressions":
        "Sözel İfadeleri Cebirsel İfadeye Çevirme",
      "Add Integers in Applications": "Tam Sayılarla Problem Çözme",
    },
    tryItSolutions: {
      "Sıra Sizde 3.27": p(
        "Çözüm: İki sayı da pozitif olduğu için sayıları toplarız: 2+4=6.",
      ),
      "Sıra Sizde 3.28": p(
        "Çözüm: Pozitif 2 ile pozitif 5'in toplamı 7'dir.",
      ),
      "Sıra Sizde 3.29": p(
        "Çözüm: İki sayı da negatif olduğundan mutlak değerleri toplar ve negatif işaretini koruruz: -2+(-4)=-6.",
      ),
      "Sıra Sizde 3.30": p(
        "Çözüm: -2 ile -5 aynı işaretlidir. 2+5=7 olduğu için toplam -7 olur.",
      ),
      "Sıra Sizde 3.31": p(
        "Çözüm: 2 pozitif ve 4 negatif sayaçtan iki nötr çift çıkar; geriye 2 negatif kalır. Sonuç -2'dir.",
      ),
      "Sıra Sizde 3.32": p(
        "Çözüm: 2 pozitif, 5 negatifle eşleşince iki nötr çift oluşur ve 3 negatif kalır. 2+(-5)=-3.",
      ),
      "Sıra Sizde 3.33": p(
        "Çözüm: 2 negatif ve 4 pozitif sayaçtan iki nötr çift çıkar; geriye 2 pozitif kalır. Sonuç 2'dir.",
      ),
      "Sıra Sizde 3.34": p(
        "Çözüm: 2 negatif ile 5 pozitiften iki nötr çift çıkar; geriye 3 pozitif kalır. Toplam 3'tür.",
      ),
      "Sıra Sizde 3.35": p(
        "Çözüm: ⓐ 3+4=7. ⓑ -1+4=3. ⓒ 4+(-6)=-2. ⓓ -2+(-2)=-4.",
      ),
      "Sıra Sizde 3.36": p(
        "Çözüm: ⓐ 5+1=6. ⓑ -3+7=4. ⓒ 2+(-8)=-6. ⓓ -3+(-4)=-7.",
      ),
      "Sıra Sizde 3.37": p(
        "Çözüm: ⓐ 15+(-32) işleminde negatiflerin mutlak değeri büyük olduğu için sonuç negatiftir: 32-15=17, sonuç -17. ⓑ -19+76=57.",
      ),
      "Sıra Sizde 3.38": p(
        "Çözüm: ⓐ -55+9 işleminde 55-9=46 ve negatiflerin mutlak değeri büyük olduğu için sonuç -46'dır. ⓑ 43+(-17)=26.",
      ),
      "Sıra Sizde 3.39": p(
        "Çözüm: Aynı işaretli iki negatif sayı toplanır: -31+(-19)=-50.",
      ),
      "Sıra Sizde 3.40": p(
        "Çözüm: -42 ve -28 aynı işaretlidir. 42+28=70 olduğundan toplam -70'tir.",
      ),
      "Sıra Sizde 3.41": p(
        "Çözüm: Önce parantez içi: -4+7=3. Sonra 5·3=15 ve -2+15=13 olur.",
      ),
      "Sıra Sizde 3.42": p(
        "Çözüm: Önce -3+5=2. Sonra 2·2=4 ve -4+4=0 bulunur.",
      ),
      "Sıra Sizde 3.43": p(
        "Çözüm: x=-3 iken x+5=-3+5=2. x=-17 iken x+5=-17+5=-12 olur.",
      ),
      "Sıra Sizde 3.44": p(
        "Çözüm: y=-5 iken y+7=-5+7=2. y=-8 iken y+7=-8+7=-1 olur.",
      ),
      "Sıra Sizde 3.45": p(
        "Çözüm: n=-8 iken n+2=-8+2=-6. -n+2 ifadesinde -n=8 olur; 8+2=10.",
      ),
      "Sıra Sizde 3.46": p(
        "Çözüm: y=-9 iken y+8=-1. -y+8 ifadesinde -y=9 olduğundan 9+8=17 bulunur.",
      ),
      "Sıra Sizde 3.47": p(
        "Çözüm: a=-19 ve b=14 yazılır: a+2b=-19+2·14=-19+28=9.",
      ),
      "Sıra Sizde 3.48": p(
        "Çözüm: p=4 ve q=-7 yazılır: 5p+q=5·4+(-7)=20-7=13.",
      ),
      "Sıra Sizde 3.49": p(
        "Çözüm: x=-15 ve y=29 olduğundan x+y=14 olur. Bu yüzden (x+y)²=14²=196 bulunur.",
      ),
      "Sıra Sizde 3.50": p(
        "Çözüm: x=-8 ve y=10 için x+y=2'dir. Bu nedenle (x+y)³=2³=8 olur.",
      ),
      "Sıra Sizde 3.51": p(
        "Çözüm: “-7 ile 4'ün toplamı” ifadesi -7+4'tür. Mutlak değeri büyük olan sayı negatif olduğu için sonuç -3 olur.",
      ),
      "Sıra Sizde 3.52": p(
        "Çözüm: “-8 ile -6'nın toplamı” ifadesi -8+(-6)'dır. Aynı işaretli negatifler toplandığı için sonuç -14'tür.",
      ),
      "Sıra Sizde 3.53": p(
        "Çözüm: Önce 9+(-16)=-7 bulunur. Bu toplam 4 artırılır: -7+4=-3.",
      ),
      "Sıra Sizde 3.54": p(
        "Çözüm: -8+(-12)=-20 olur. 7 artırırsak -20+7=-13 bulunur.",
      ),
      "Sıra Sizde 3.55": p(
        "Çözüm: Başlangıç sıcaklığı -10°C, artış 14°C'dir. -10+14=4 olduğundan saat 11.00'de sıcaklık 4°C olur.",
      ),
      "Sıra Sizde 3.56": p(
        "Çözüm: Yüzeyin altı negatif kabul edilir. Başlangıç derinliği -16 feet, 17 feet daha aşağı inmek -17 eklemek demektir. -16+(-17)=-33 feet.",
      ),
      "Sıra Sizde 3.57": p(
        "Çözüm: 20 yard çizgisinden başlanır. 9 yard kayıp, 7 yard kazanç ve 4 yard kayıp: 20-9+7-4=14. Top 14 yard çizgisindedir.",
      ),
      "Sıra Sizde 3.58": p(
        "Çözüm: 25 yard çizgisinden başlanır. 5 yard kazanıp 8 yard kaybedip 15 yard kazanırlar: 25+5-8+15=37. Top 37 yard çizgisindedir.",
      ),
    },
    exerciseAnswers: {
      "63": answer("Çözüm: İki sayı da pozitif olduğu için 7+4=11 olur."),
      "65": answer("Çözüm: İki sayı da negatiftir. 6+3=9 olduğundan toplam -9'dur."),
      "67": answer("Çözüm: İşaretler farklıdır. 7-5=2 ve mutlak değeri büyük olan sayı negatif olduğu için sonuç -2'dir."),
      "69": answer("Çözüm: 8 ve -7 ters işaretlidir. 8-7=1 ve pozitif sayı büyük olduğu için sonuç 1'dir."),
      "71": answer("Çözüm: Aynı işaretli negatifler toplanır: -21+(-59)=-80."),
      "73": answer("Çözüm: İşaretler farklıdır. 48-16=32 ve pozitif sayı büyük olduğu için sonuç 32'dir."),
      "75": answer("Çözüm: -200+65 işleminde 200-65=135 ve negatif sayı baskındır; sonuç -135 olur."),
      "77": answer("Çözüm: Önce 2+(-8)=-6 bulunur; sonra kalan +6 ile -6 birbirini sıfırlar. Bu nedenle toplam 0 olur."),
      "79": answer("Çözüm: -14+(-12)=-26 ve -26+4=-22 bulunur."),
      "81": answer("Çözüm: 135+(-110)=25, ardından 25+83=108 olur."),
      "83": answer("Çözüm: -32+24=-8, -8+(-6)=-14 ve -14+10=-4 bulunur."),
      "85": answer("Çözüm: Önce parantez: -3+8=5. Sonra 2·5=10 ve 19+10=29 olur."),
      "87": answer("Çözüm: x=-26 iken x+8=-18. x=-95 iken x+8=-87 olur."),
      "89": answer("Çözüm: y=-33 iken y+(-14)=-47. y=30 iken 30+(-14)=16 olur."),
      "91": answer("Çözüm: a=-7 için a+3=-4. -a+3 ifadesinde -a=7 olduğundan 7+3=10 olur."),
      "93": answer("Çözüm: c=-9 için c+(-4)=-13. -c+(-4) ifadesinde -c=9 olduğundan 9+(-4)=5 bulunur."),
      "95": answer("Çözüm: m=-15 ve n=7 yazılırsa m+n=-15+7=-8 olur."),
      "97": answer("Çözüm: r=16 ve s=2 için r-3s=16-3·2=16-6=10 bulunur."),
      "99": answer("Çözüm: a=-7 ve b=15 olduğundan a+b=8. Bu nedenle (a+b)²=8²=64'tür."),
      "101": answer("Çözüm: x=-3 ve y=14 için x+y=11. Bu yüzden (x+y)²=121 olur."),
      "103": answer("Çözüm: “-14 ile 5'in toplamı” -14+5'tir. Sonuç -9 olur."),
      "105": answer("Çözüm: -2'den 8 fazla, -2+8 demektir. Sonuç 6'dır."),
      "107": answer("Çözüm: -10'a -15 eklenir: -10+(-15)=-25."),
      "109": answer("Çözüm: Önce -1 ile -12'nin toplamı -13'tür. Buna 6 eklenirse -13+6=-7 olur."),
      "111": answer("Çözüm: 10+(-19)=-9. Bu toplam 4 artırılırsa -9+4=-5 bulunur."),
      "113": answer("Çözüm: Sıcaklık -19°F ile başlar ve 26°F artar. -19+26=7 olduğundan öğlen sıcaklık 7°F olur."),
      "115": answer("Çözüm: Borç negatif gösterilir. Başlangıç borcu -73 dolar, yeni harcama -45 dolardır. -73+(-45)=-118; yeni bakiye 118 dolar borçtur."),
      "117": answer("Çözüm: Kayıplar negatif, kazanç pozitif yazılır: -3+(-2)+1+(-4)=-8. Toplam değişim 8 yard kayıptır."),
      "119": answer("Çözüm: 35 yard çizgisinden başlanır: 35-12+8-6=25. Top 25 yard çizgisindedir."),
      "121": answer("Çözüm: Yüzeyin altı negatif alınır. -8-17+5=-20 olduğundan yeni derinlik 20 feet aşağıdadır."),
      "123": answer("Çözüm: Haftalık değişimleri toplarız: -504+142-449+410+369=-32. Hafta sonunda genel değişim -32 puandır."),
      "125": answer("Çözüm: Ters işaretli sayılar toplanırken mutlak değerler çıkarılır ve mutlak değeri büyük olan sayının işareti alınır. -8+2 işleminde 8 büyük olduğu için sonuç negatif; 8+(-2) işleminde 8 büyük olduğu için sonuç pozitiftir."),
    },
    exerciseSectionSlugs: {
      "63": "tam-sayilarla-toplamayi-modelleme",
      "65": "tam-sayilarla-toplamayi-modelleme",
      "67": "tam-sayilarla-toplamayi-modelleme",
      "69": "tam-sayilarla-toplamayi-modelleme",
      "71": "tam-sayilarla-toplama-islemi",
      "73": "tam-sayilarla-toplama-islemi",
      "75": "tam-sayilarla-toplama-islemi",
      "77": "tam-sayilarla-toplama-islemi",
      "79": "tam-sayilarla-toplama-islemi",
      "81": "tam-sayilarla-toplama-islemi",
      "83": "tam-sayilarla-toplama-islemi",
      "85": "tam-sayilarla-toplama-islemi",
      "87": "degiskenli-ifadeleri-degerlendirme",
      "89": "degiskenli-ifadeleri-degerlendirme",
      "91": "degiskenli-ifadeleri-degerlendirme",
      "93": "degiskenli-ifadeleri-degerlendirme",
      "95": "degiskenli-ifadeleri-degerlendirme",
      "97": "degiskenli-ifadeleri-degerlendirme",
      "99": "degiskenli-ifadeleri-degerlendirme",
      "101": "degiskenli-ifadeleri-degerlendirme",
      "103": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "105": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "107": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "109": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "111": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "113": "tam-sayilarla-problem-cozme",
      "115": "tam-sayilarla-problem-cozme",
      "117": "tam-sayilarla-problem-cozme",
      "119": "tam-sayilarla-problem-cozme",
      "121": "tam-sayilarla-problem-cozme",
      "123": "tam-sayilarla-problem-cozme",
      "125": "tam-sayilarla-problem-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "tam-sayilar",
    sourceNumber: "3.4",
    catalogLesson: {
      id: "lesson-subtract-integers",
      slug: "tam-sayilarla-cikarma",
      displayTitle: "Tam Sayılarla Çıkarma",
      summary:
        "Tam sayılarla çıkarmayı sayaç modeliyle anlamlandırın, zıttını ekleme kuralını kullanın ve uygulama problemlerini çözün.",
      sortOrder: 3,
    },
    objectives: [
      "Tam sayılarla çıkarmayı modelleyebileceksiniz.",
      "Tam sayılar içeren çıkarma ifadelerini sadeleştirebileceksiniz.",
      "Tam sayılarla verilen değişkenli ifadeleri değerlendirebileceksiniz.",
      "Sözel ifadeleri cebirsel ifadelere çevirebileceksiniz.",
      "Tam sayılarla çıkarma gerektiren problemleri çözebileceksiniz.",
    ],
    sectionTitles: {
      "Model Subtraction of Integers": "Tam Sayılarla Çıkarmayı Modelleme",
      "Simplify Expressions with Integers": "Tam Sayılarla Çıkarma İşlemi",
      "Evaluate Variable Expressions with Integers":
        "Değişkenli İfadeleri Değerlendirme",
      "Translate Word Phrases to Algebraic Expressions":
        "Sözel İfadeleri Cebirsel İfadeye Çevirme",
      "Subtract Integers in Applications": "Tam Sayılarla Problem Çözme",
    },
    tryItSolutions: {
      "Sıra Sizde 3.59": p(
        "Çözüm: 6 pozitif sayaçtan 4 pozitif sayaç çıkarılır; geriye 2 pozitif sayaç kalır. Bu nedenle 6-4=2.",
      ),
      "Sıra Sizde 3.60": p(
        "Çözüm: 7 pozitif sayaçtan 4 pozitif sayaç çıkarılır ve geriye 3 pozitif sayaç kalır.",
      ),
      "Sıra Sizde 3.61": p(
        "Çözüm: -6 sayacıyla başlayıp 4 negatif sayaç çıkarırız; geriye 2 negatif sayaç kalır. Sonuç -2'dir.",
      ),
      "Sıra Sizde 3.62": p(
        "Çözüm: -7'den -4 çıkarmak 4 negatif sayacı kaldırmak demektir; geriye 3 negatif sayaç kalır. Sonuç -3'tür.",
      ),
      "Sıra Sizde 3.63": p(
        "Çözüm: -6'dan 4 pozitif çıkarmak için 4 nötr çift eklenir, 4 pozitif sayaç kaldırılır ve geriye 10 negatif sayaç kalır. Sonuç -10'dur.",
      ),
      "Sıra Sizde 3.64": p(
        "Çözüm: -7-4 işlemi -7+(-4) ile aynıdır. Aynı işaretli negatifler toplandığı için sonuç -11 olur.",
      ),
      "Sıra Sizde 3.65": p(
        "Çözüm: 6'dan -4 çıkarmak, 4 eklemekle aynıdır. 6-(-4)=6+4=10.",
      ),
      "Sıra Sizde 3.66": p(
        "Çözüm: Negatif bir sayıyı çıkarmak zıttını eklemek demektir: 7-(-4)=7+4=11.",
      ),
      "Sıra Sizde 3.67": p(
        "Çözüm: ⓐ 7-(-8)=15. ⓑ -7-(-2)=-5. ⓒ 4-1=3. ⓓ -6-8=-14.",
      ),
      "Sıra Sizde 3.68": p(
        "Çözüm: ⓐ 4-(-6)=10. ⓑ -8-(-1)=-7. ⓒ 7-3=4. ⓓ -4-2=-6.",
      ),
      "Sıra Sizde 3.69": p(
        "Çözüm: ⓐ 7-9=-2. ⓑ -5-(-9)=-5+9=4.",
      ),
      "Sıra Sizde 3.70": p(
        "Çözüm: ⓐ 4-7=-3. ⓑ -7-(-10)=-7+10=3.",
      ),
      "Sıra Sizde 3.71": p(
        "Çözüm: ⓐ 21-13=8 ve 21+(-13)=8. ⓑ -11-7=-18 ve -11+(-7)=-18.",
      ),
      "Sıra Sizde 3.72": p(
        "Çözüm: ⓐ 15-7=8 ve 15+(-7)=8. ⓑ -14-8=-22 ve -14+(-8)=-22.",
      ),
      "Sıra Sizde 3.73": p(
        "Çözüm: ⓐ 6-(-13)=19 ve 6+13=19. ⓑ -5-(-1)=-4 ve -5+1=-4.",
      ),
      "Sıra Sizde 3.74": p(
        "Çözüm: ⓐ 4-(-19)=23 ve 4+19=23. ⓑ -4-(-7)=3 ve -4+7=3.",
      ),
      "Sıra Sizde 3.75": p(
        "Çözüm: -67-(-38) işleminde -38'in zıttı eklenir: -67+38=-29.",
      ),
      "Sıra Sizde 3.76": p(
        "Çözüm: -83-(-57)=-83+57=-26 olur.",
      ),
      "Sıra Sizde 3.77": p(
        "Çözüm: Önce parantez içi -3-1=-4 olur. Sonra 8-(-4)-9=8+4-9=3 bulunur.",
      ),
      "Sıra Sizde 3.78": p(
        "Çözüm: Parantez içi -9-6=-15'tir. 12-(-15)-14=12+15-14=13 olur.",
      ),
      "Sıra Sizde 3.79": p(
        "Çözüm: Önce çarpma yapılır: 6·2=12, 9·1=9, 8·9=72. Sonra 12-9-72=-69 bulunur.",
      ),
      "Sıra Sizde 3.80": p(
        "Çözüm: Önce çarpımlar: 2·5=10, 3·7=21, 4·9=36. Sonra 10-21-36=-47 olur.",
      ),
      "Sıra Sizde 3.81": p(
        "Çözüm: y=5 iken y-7=5-7=-2. y=-8 iken y-7=-8-7=-15.",
      ),
      "Sıra Sizde 3.82": p(
        "Çözüm: m=1 iken m-3=1-3=-2. m=-4 iken m-3=-4-3=-7.",
      ),
      "Sıra Sizde 3.83": p(
        "Çözüm: k=19 iken 17-k=17-19=-2. k=-19 iken 17-k=17-(-19)=36.",
      ),
      "Sıra Sizde 3.84": p(
        "Çözüm: b=14 iken -5-b=-5-14=-19. b=-14 iken -5-b=-5-(-14)=9.",
      ),
      "Sıra Sizde 3.85": p(
        "Çözüm: ⓐ 14 ile -23'ün farkı 14-(-23)=37'dir. ⓑ -17'den 21 çıkarmak -17-21=-38 verir.",
      ),
      "Sıra Sizde 3.86": p(
        "Çözüm: ⓐ 11-(-19)=30. ⓑ -11'den 18 çıkarmak -11-18=-29 olur.",
      ),
      "Sıra Sizde 3.87": p(
        "Çözüm: Sabah 15°F, öğleden sonra -30°F. Fark 15-(-30)=45°F olur.",
      ),
      "Sıra Sizde 3.88": p(
        "Çözüm: Öğle sıcaklığı -6°F, gün batımı -15°F. Aradaki fark -6-(-15)=9°F'tır.",
      ),
      "Sıra Sizde 3.89": p(
        "Çözüm: Zirve 10.023 feet, mağara -80 feet kabul edilir. Fark 10.023-(-80)=10.103 feet olur.",
      ),
      "Sıra Sizde 3.90": p(
        "Çözüm: Nautilus -340 feet, Explorer -573 feet konumundadır. Fark -340-(-573)=233 feet'tir.",
      ),
      "Sıra Sizde 3.91": p(
        "Çözüm: ⓐ 75-27=48 dolar. ⓑ 48-50=-2 dolar. ⓒ 20 dolarlık çek bozulmadığı için 20 geri eklenir; -2+20=18 dolar.",
      ),
      "Sıra Sizde 3.92": p(
        "Çözüm: ⓐ -78+24=-54 dolar. ⓑ -54+49=-5 dolar; hâlâ borçtadır ve yeni bakiye -5 dolardır.",
      ),
    },
    exerciseAnswers: {
      "127": answer("Çözüm: 8 pozitif sayaçtan 2 pozitif sayaç çıkarılır; geriye 6 kalır."),
      "129": answer("Çözüm: Negatif bir sayıyı çıkarmak zıttını eklemektir: -5-(-1)=-5+1=-4."),
      "131": answer("Çözüm: -5-4, -5+(-4) ile aynıdır. Aynı işaretli negatifler toplandığı için sonuç -9 olur."),
      "133": answer("Çözüm: 8-(-4)=8+4=12; çünkü -4'ü çıkarmak 4 eklemek demektir."),
      "135": answer("Çözüm: ⓐ 15-6=9. ⓑ 15+(-6)=9. İki ifade aynı sonucu verir."),
      "137": answer("Çözüm: ⓐ 44-28=16. ⓑ 44+(-28)=16; çıkarma, zıttını eklemeye dönüştü."),
      "139": answer("Çözüm: ⓐ 8-(-9)=17. ⓑ 8+9=17; negatif çıkarmak pozitif eklemektir."),
      "141": answer("Çözüm: ⓐ 27-(-18)=45. ⓑ 27+18=45. Sonuçlar aynıdır."),
      "143": answer("Çözüm: -12'yi çıkarmak 12 eklemek demektir. Bu nedenle 15-(-12)=15+12=27 olur."),
      "145": answer("Çözüm: -19'u çıkarmak 19 eklemek demektir: 10-(-19)=29."),
      "147": answer("Çözüm: 48-87=48+(-87)=-39; çünkü 87'nin mutlak değeri daha büyüktür."),
      "149": answer("Çözüm: 79'u çıkarmak -79 eklemekle aynıdır. 31+(-79)=-48 olur."),
      "151": answer("Çözüm: 11 çıkarmak -11 eklemek demektir. -31+(-11)=-42 bulunur."),
      "153": answer("Çözüm: 42 çıkarmayı -42 ekleme olarak yazarız: -17+(-42)=-59 olur."),
      "155": answer("Çözüm: -52'yi çıkarmak 52 eklemektir. -103+52=-51 bulunur."),
      "157": answer("Çözüm: -54'ü çıkarmak 54 eklemek demektir. -45+54=9 bulunur."),
      "159": answer("Çözüm: Soldan sağa ilerleriz: 8-3=5 ve 5-7=-2."),
      "161": answer("Çözüm: Önce -5-4=-9, sonra -9+7=-2 olur."),
      "163": answer("Çözüm: -27'yi çıkarmak 27 eklemek demektir. Bu yüzden -14-(-27)+9=-14+27+9=22 bulunur."),
      "165": answer("Çözüm: Soldan sağa ilerleriz. Önce 71+(-10)=61, sonra 61-8=53 olur."),
      "167": answer("Çözüm: Önce parantez: -4+1=-3. Sonra -16-(-3)-7=-16+3-7=-20."),
      "169": answer("Çözüm: (2-7)=-5 ve (3-8)=-5. Bu nedenle -5-(-5)=0."),
      "171": answer("Çözüm: 6-8=-2 olduğu için -(6-8)=2. Ayrıca 2-4=-2; 2-(-2)=4 bulunur."),
      "173": answer("Çözüm: Önce 3-12=-9, sonra 10-(-9)=19 ve en son 25-19=6 olur."),
      "175": answer("Çözüm: Önce çarpımlar: 6·3=18, 4·3=12, 7·2=14. Sonra 18-12-14=-8."),
      "177": answer("Çözüm: Üsler önce hesaplanır: 5²=25 ve 6²=36. 25-36=-11 olur."),
      "179": answer("Çözüm: x=3 iken x-6=3-6=-3. x=-3 iken x-6=-3-6=-9."),
      "181": answer("Çözüm: y=2 iken 5-y=5-2=3. y=-2 iken 5-y=5-(-2)=7."),
      "183": answer("Çözüm: x=3 yazılır: 4·3²-15·3+1=4·9-45+1=36-45+1=-8."),
      "185": answer("Çözüm: x=6 için -12-5x²=-12-5·36=-12-180=-192 olur."),
      "187": answer("Çözüm: ⓐ 3 ile -10'un farkı 3-(-10)=13. ⓑ 45'ten -20 çıkarmak 45-(-20)=65 verir."),
      "189": answer("Çözüm: ⓐ -6 ile 9'un farkı -6-9=-15. ⓑ -16'dan -12 çıkarmak -16-(-12)=-4 verir."),
      "191": answer("Çözüm: ⓐ -17'den 8 eksik, -17-8=-25'tir. ⓑ -24-37=-61 olur."),
      "193": answer("Çözüm: ⓐ 6'dan 21 eksik, 6-21=-15'tir. ⓑ -19'dan 31 çıkarılır: -19-31=-50."),
      "195": answer("Çözüm: Sıcaklık 28°F iken 38°F düştüyse 28-38=-10 olur. Akşam sıcaklığı -10°F'tır."),
      "197": answer("Çözüm: Anaheim 84°F, Embarrass -12°F'tır. Fark 84-(-12)=96°F olur."),
      "199": answer("Çözüm: Başlangıç 30 yard çizgisidir. 30+2-7-4=21; top 21 yard çizgisindedir."),
      "201": answer("Çözüm: Hesapta 148 dolar vardır ve 83 dolarlık çek yazılır. Yeni bakiye 148-83=65 dolardır."),
      "203": answer("Çözüm: 210 dolardan 250 dolar çıkarsa 210-250=-40 olur; hesap 40 dolar eksiye düşer."),
      "205": answer("Çözüm: Başlangıç bakiyesi -14 dolardır. 40 dolar yatırılınca -14+40=26 dolar olur."),
      "207": answer("Çözüm: Sıcaklık -7° iken sınır -20°'dir. -7'den -20'ye düşüş 13 derecedir."),
      "209": answer("Çözüm: 9 ile -6'nın farkı 9-(-6) olarak yazılır. -6'yı çıkarmak 6 eklemek olduğu için 9+6=15 olur."),
    },
    exerciseSectionSlugs: {
      "127": "tam-sayilarla-cikarmayi-modelleme",
      "129": "tam-sayilarla-cikarmayi-modelleme",
      "131": "tam-sayilarla-cikarmayi-modelleme",
      "133": "tam-sayilarla-cikarmayi-modelleme",
      "135": "tam-sayilarla-cikarma-islemi",
      "137": "tam-sayilarla-cikarma-islemi",
      "139": "tam-sayilarla-cikarma-islemi",
      "141": "tam-sayilarla-cikarma-islemi",
      "143": "tam-sayilarla-cikarma-islemi",
      "145": "tam-sayilarla-cikarma-islemi",
      "147": "tam-sayilarla-cikarma-islemi",
      "149": "tam-sayilarla-cikarma-islemi",
      "151": "tam-sayilarla-cikarma-islemi",
      "153": "tam-sayilarla-cikarma-islemi",
      "155": "tam-sayilarla-cikarma-islemi",
      "157": "tam-sayilarla-cikarma-islemi",
      "159": "tam-sayilarla-cikarma-islemi",
      "161": "tam-sayilarla-cikarma-islemi",
      "163": "tam-sayilarla-cikarma-islemi",
      "165": "tam-sayilarla-cikarma-islemi",
      "167": "tam-sayilarla-cikarma-islemi",
      "169": "tam-sayilarla-cikarma-islemi",
      "171": "tam-sayilarla-cikarma-islemi",
      "173": "tam-sayilarla-cikarma-islemi",
      "175": "tam-sayilarla-cikarma-islemi",
      "177": "tam-sayilarla-cikarma-islemi",
      "179": "degiskenli-ifadeleri-degerlendirme",
      "181": "degiskenli-ifadeleri-degerlendirme",
      "183": "degiskenli-ifadeleri-degerlendirme",
      "185": "degiskenli-ifadeleri-degerlendirme",
      "187": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "189": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "191": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "193": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "195": "tam-sayilarla-problem-cozme",
      "197": "tam-sayilarla-problem-cozme",
      "199": "tam-sayilarla-problem-cozme",
      "201": "tam-sayilarla-problem-cozme",
      "203": "tam-sayilarla-problem-cozme",
      "205": "tam-sayilarla-problem-cozme",
      "207": "tam-sayilarla-problem-cozme",
      "209": "tam-sayilarla-problem-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "tam-sayilar",
    sourceNumber: "3.5",
    catalogLesson: {
      id: "lesson-multiply-divide-integers",
      slug: "tam-sayilarla-carpma-ve-bolme",
      displayTitle: "Tam Sayılarla Çarpma ve Bölme",
      summary:
        "Tam sayılarla çarpma ve bölme kurallarını öğrenin, işlem önceliğiyle ifadeleri sadeleştirin ve değişkenli ifadeleri değerlendirin.",
      sortOrder: 4,
    },
    objectives: [
      "Tam sayılarla çarpma işlemi yapabileceksiniz.",
      "Tam sayılarla bölme işlemi yapabileceksiniz.",
      "Tam sayılar içeren ifadeleri sadeleştirebileceksiniz.",
      "Tam sayılarla verilen değişkenli ifadeleri değerlendirebileceksiniz.",
      "Sözel ifadeleri cebirsel ifadelere çevirebileceksiniz.",
    ],
    sectionTitles: {
      "Multiply Integers": "Tam Sayılarla Çarpma",
      "Divide Integers": "Tam Sayılarla Bölme",
      "Simplify Expressions with Integers": "Tam Sayılarla İşlem Önceliği",
      "Evaluate Variable Expressions with Integers":
        "Değişkenli İfadeleri Değerlendirme",
      "Translate Word Phrases to Algebraic Expressions":
        "Sözel İfadeleri Cebirsel İfadeye Çevirme",
    },
    tryItSolutions: {
      "Sıra Sizde 3.93": p(
        "Çözüm: ⓐ -6·8=-48. ⓑ -4(-7)=28. ⓒ 9(-7)=-63. ⓓ 5·12=60.",
      ),
      "Sıra Sizde 3.94": p(
        "Çözüm: ⓐ -8·7=-56. ⓑ -6(-9)=54. ⓒ 7(-4)=-28. ⓓ 3·13=39.",
      ),
      "Sıra Sizde 3.95": p(
        "Çözüm: -1 ile çarpmak sayının zıttını verir. ⓐ -1·9=-9. ⓑ -1·(-17)=17.",
      ),
      "Sıra Sizde 3.96": p(
        "Çözüm: ⓐ -1·8=-8. ⓑ -1·(-16)=16; çünkü negatif sayının zıttı pozitiftir.",
      ),
      "Sıra Sizde 3.97": p(
        "Çözüm: ⓐ -42÷6=-7; işaretler farklıdır. ⓑ -117÷(-3)=39; işaretler aynıdır.",
      ),
      "Sıra Sizde 3.98": p(
        "Çözüm: ⓐ -63÷7=-9. ⓑ -115÷(-5)=23. Aynı işaretli bölüm pozitiftir.",
      ),
      "Sıra Sizde 3.99": p(
        "Çözüm: -1'e bölmek sayının zıttını verir. ⓐ 6÷(-1)=-6. ⓑ -36÷(-1)=36.",
      ),
      "Sıra Sizde 3.100": p(
        "Çözüm: ⓐ 28÷(-1)=-28. ⓑ -52÷(-1)=52; sonuçlar verilen sayıların zıttıdır.",
      ),
      "Sıra Sizde 3.101": p(
        "Çözüm: Önce çarpma yapılır: 8(-3)=-24 ve 5(-7)=-35. Sonra -24-35-4=-63 bulunur.",
      ),
      "Sıra Sizde 3.102": p(
        "Çözüm: Önce 9(-3)=-27 ve 7(-8)=-56. Ardından -27-56-1=-84 olur.",
      ),
      "Sıra Sizde 3.103": p(
        "Çözüm: ⓐ (-3)^4 ifadesinde taban -3'tür; dört çarpan olduğundan sonuç 81. ⓑ -3^4 ifadesi -(3^4)=-81 demektir.",
      ),
      "Sıra Sizde 3.104": p(
        "Çözüm: ⓐ (-7)^2=49. ⓑ -7^2 ifadesinde üs yalnızca 7'ye uygulanır; sonuç -49'dur.",
      ),
      "Sıra Sizde 3.105": p(
        "Çözüm: Önce parantez: 8-11=-3. Sonra 17-4(-3)=17+12=29 olur.",
      ),
      "Sıra Sizde 3.106": p(
        "Çözüm: 7-13=-6 olduğundan 16-6(-6)=16+36=52 bulunur.",
      ),
      "Sıra Sizde 3.107": p(
        "Çözüm: Önce (-3)^3=-27. Sonra 12(-9)=-108 ve -108÷(-27)=4 olur.",
      ),
      "Sıra Sizde 3.108": p(
        "Çözüm: (-2)^3=-8 ve 18(-4)=-72'dir. Bu yüzden -72÷(-8)=9 bulunur.",
      ),
      "Sıra Sizde 3.109": p(
        "Çözüm: Önce bölme ve çarpma yapılır: -27÷3=-9 ve (-5)(-6)=30. Sonra -9+30=21.",
      ),
      "Sıra Sizde 3.110": p(
        "Çözüm: -32÷4=-8 ve (-2)(-7)=14. Toplam -8+14=6 olur.",
      ),
      "Sıra Sizde 3.111": p(
        "Çözüm: x=-3 yazılır: 3(-3)^2-2(-3)+6=27+6+6=39.",
      ),
      "Sıra Sizde 3.112": p(
        "Çözüm: x=-2 yazılır: 4(-2)^2-(-2)-5=16+2-5=13.",
      ),
      "Sıra Sizde 3.113": p(
        "Çözüm: x=-2 ve y=3 yazılır: 7(-2)+6(3)-12=-14+18-12=-8.",
      ),
      "Sıra Sizde 3.114": p(
        "Çözüm: x=-3 ve y=-5 yazılır: 8(-3)-6(-5)+13=-24+30+13=19.",
      ),
      "Sıra Sizde 3.115": p(
        "Çözüm: “-5 ile 12'nin çarpımı” ifadesi -5·12'dir. İşaretler farklı olduğu için sonuç -60 olur.",
      ),
      "Sıra Sizde 3.116": p(
        "Çözüm: “8 ile -13'ün çarpımı” 8(-13) olarak yazılır ve sonuç -104'tür.",
      ),
      "Sıra Sizde 3.117": p(
        "Çözüm: “-63 ile -9'un bölümü” -63÷(-9) demektir. İşaretler aynı olduğu için sonuç 7'dir.",
      ),
      "Sıra Sizde 3.118": p(
        "Çözüm: -72÷(-9)=8 olur; negatif iki sayının bölümü pozitiftir.",
      ),
    },
    exerciseAnswers: {
      "211": answer("Çözüm: İşaretler farklı olduğu için çarpım negatiftir. 4·8=32 olduğundan sonuç -32 olur."),
      "213": answer("Çözüm: -5 ile 7 ters işaretlidir. 5·7=35 olduğu için çarpım -35'tir."),
      "215": answer("Çözüm: İki sayı da negatif olduğu için çarpım pozitiftir. 18·2=36 bulunur."),
      "217": answer("Çözüm: 9 ile -7 ters işaretlidir. 9·7=63 olduğundan sonuç -63 olur."),
      "219": answer("Çözüm: -1 ile çarpmak sayının zıttını verir; 6'nın zıttı -6'dır."),
      "221": answer("Çözüm: -1 ile -14 aynı işaretli iki negatiftir. Çarpım pozitif olur ve 14 bulunur."),
      "223": answer("Çözüm: -24 ile 6 farklı işaretlidir. 24÷6=4 olduğu için bölüm -4'tür."),
      "225": answer("Çözüm: 56÷(-7) işleminde işaretler farklıdır; 56÷7=8 olduğundan sonuç -8 olur."),
      "227": answer("Çözüm: -52 ve -4 aynı işaretlidir. 52÷4=13 olduğundan bölüm pozitiftir: 13."),
      "229": answer("Çözüm: -180÷15 işleminde işaretler farklıdır; 180÷15=12, sonuç -12 olur."),
      "231": answer("Çözüm: -1'e bölmek sayının zıttını verir. Bu nedenle 49÷(-1)=-49 olur."),
      "233": answer("Çözüm: Önce çarpımlar yapılır: 5(-6)=-30 ve 7(-2)=-14. Sonra -30-14-3=-47 bulunur."),
      "235": answer("Çözüm: -8(-2)=16 ve 3(-9)=-27. İfade 16-(-27)=43 olur."),
      "237": answer("Çözüm: (-5)^3 üç negatif çarpan içerir; tek sayıda negatif çarpan sonucu negatif yapar. 5^3=125, sonuç -125'tir."),
      "239": answer("Çözüm: (-2)^6 altı negatif çarpan içerir. Çift sayıda negatif çarpan olduğundan sonuç pozitiftir: 64."),
      "241": answer("Çözüm: -4^2 ifadesinde üs yalnızca 4'e uygulanır. Önce 4^2=16, sonra zıttı alınır: -16."),
      "243": answer("Çözüm: Önce -3(-5)=15 olur. Sonra 15·6=90 bulunur."),
      "245": answer("Çözüm: Soldan sağa çarparız: -4·2=-8 ve -8·11=-88 olur."),
      "247": answer("Çözüm: Önce parantezler: 8-11=-3 ve 9-12=-3. Sonra (-3)(-3)=9 bulunur."),
      "249": answer("Çözüm: Parantez içi 2-7=-5'tir. 3(-5)=-15 olduğundan 26-(-15)=41 olur."),
      "251": answer("Çözüm: Önce çarpma: -10(-4)=40. Sonra 40÷(-8)=-5 olur."),
      "253": answer("Çözüm: 65÷(-5)=-13 ve (-28)÷(-7)=4. Toplam -13+4=-9 olur."),
      "255": answer("Çözüm: Köşeli parantez içinde 8(-2)=-16 ve 3-(-16)=19. Sonra 9-2·19=9-38=-29 bulunur."),
      "257": answer("Çözüm: (-3)^2=9 ve 8-2=6. 24÷6=4 olduğundan ifade 9-4=5 olur."),
      "259": answer("Çözüm: x=8 iken -2x+17=-16+17=1. x=-8 iken -2(-8)+17=16+17=33."),
      "261": answer("Çözüm: m=5 iken 10-3m=10-15=-5. m=-5 iken 10-3(-5)=10+15=25."),
      "263": answer("Çözüm: p=-1 yazılır: p^2-5p+5=(-1)^2-5(-1)+5=1+5+5=11."),
      "265": answer("Çözüm: w=-2 için 2w^2-3w+7=2·4-3(-2)+7=8+6+7=21 olur."),
      "267": answer("Çözüm: x=3 ve y=-1 yazılır: 6x-5y+15=18-5(-1)+15=18+5+15=38."),
      "269": answer("Çözüm: a=-6 ve b=-3 yazılır: 9a-2b-8=9(-6)-2(-3)-8=-54+6-8=-56."),
      "271": answer("Çözüm: “-3 ile 15'in çarpımı” -3·15 olarak yazılır. İşaretler farklı olduğu için sonuç -45'tir."),
      "273": answer("Çözüm: “-60 ile -20'nin bölümü” -60÷(-20) demektir. İşaretler aynı olduğu için sonuç 3'tür."),
      "275": answer("Çözüm: “-6 ile a+b toplamının bölümü” ifadesi -6÷(a+b), yani -6/(a+b) olarak yazılır."),
      "277": answer("Çözüm: “p ile q'nun farkı” p-q'dur. Bunun -10 ile çarpımı -10(p-q) olarak yazılır."),
      "279": answer("Çözüm: Her hisse 12 dolar değer kaybediyorsa değişim -12'dir. 300 hisse için 300(-12)=-3.600 dolar olur."),
      "281": answer("Çözüm: Aynı işaretli iki tam sayının çarpımı pozitiftir; farklı işaretli iki tam sayının çarpımı negatiftir."),
      "283": answer("Çözüm: -2^4 ifadesinde üs yalnızca 2'ye uygulanır ve sonuç -(2^4)=-16 olur. (-2)^4 ifadesinde taban -2 olduğundan sonuç 16'dır."),
    },
    exerciseSectionSlugs: {
      "211": "tam-sayilarla-carpma",
      "213": "tam-sayilarla-carpma",
      "215": "tam-sayilarla-carpma",
      "217": "tam-sayilarla-carpma",
      "219": "tam-sayilarla-carpma",
      "221": "tam-sayilarla-carpma",
      "223": "tam-sayilarla-bolme",
      "225": "tam-sayilarla-bolme",
      "227": "tam-sayilarla-bolme",
      "229": "tam-sayilarla-bolme",
      "231": "tam-sayilarla-bolme",
      "233": "tam-sayilarla-islem-onceligi",
      "235": "tam-sayilarla-islem-onceligi",
      "237": "tam-sayilarla-islem-onceligi",
      "239": "tam-sayilarla-islem-onceligi",
      "241": "tam-sayilarla-islem-onceligi",
      "243": "tam-sayilarla-islem-onceligi",
      "245": "tam-sayilarla-islem-onceligi",
      "247": "tam-sayilarla-islem-onceligi",
      "249": "tam-sayilarla-islem-onceligi",
      "251": "tam-sayilarla-islem-onceligi",
      "253": "tam-sayilarla-islem-onceligi",
      "255": "tam-sayilarla-islem-onceligi",
      "257": "tam-sayilarla-islem-onceligi",
      "259": "degiskenli-ifadeleri-degerlendirme",
      "261": "degiskenli-ifadeleri-degerlendirme",
      "263": "degiskenli-ifadeleri-degerlendirme",
      "265": "degiskenli-ifadeleri-degerlendirme",
      "267": "degiskenli-ifadeleri-degerlendirme",
      "269": "degiskenli-ifadeleri-degerlendirme",
      "271": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "273": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "275": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "277": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "279": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "281": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
      "283": "sozel-ifadeleri-cebirsel-ifadeye-cevirme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "tam-sayilar",
    sourceNumber: "3.6",
    catalogLesson: {
      id: "lesson-integer-equations",
      slug: "tam-sayilarla-denklem-cozme",
      displayTitle: "Tam Sayılarla Denklem Çözme",
      summary:
        "Tam sayılarla denklemlerde çözüm kontrolü yapın, eşitliğin toplama, çıkarma ve bölme özellikleriyle denklem çözün.",
      sortOrder: 5,
    },
    objectives: [
      "Bir tam sayının denklemin çözümü olup olmadığını belirleyebileceksiniz.",
      "Eşitliğin toplama ve çıkarma özelliklerini kullanarak tam sayılı denklemleri çözebileceksiniz.",
      "Eşitliğin bölme özelliğini modelleyebileceksiniz.",
      "Eşitliğin bölme özelliğini kullanarak denklemleri çözebileceksiniz.",
      "Sözel ifadeleri denkleme çevirip çözebileceksiniz.",
    ],
    sectionTitles: {
      "Determine Whether a Number is a Solution of an Equation":
        "Denklemin Çözümünü Kontrol Etme",
      "Solve Equations with Integers Using the Addition and Subtraction Properties of Equality":
        "Toplama ve Çıkarma Özellikleriyle Denklem Çözme",
      "Model the Division Property of Equality":
        "Eşitliğin Bölme Özelliğini Modelleme",
      "Solve Equations Using the Division Property of Equality":
        "Bölme Özelliğiyle Denklem Çözme",
      "Translate to an Equation and Solve": "Denklem Kurup Çözme",
    },
    tryItSolutions: {
      "Sıra Sizde 3.119": p(
        "Çözüm: Verilen değerleri denklemde deneriz. x=-11 için 2(-11)-8=-30, x=11 için 14, x=-3 için -14 olur. Yalnız x=-3 denklemi doğru yapar.",
      ),
      "Sıra Sizde 3.120": p(
        "Çözüm: y=4 için 2y+3=11, y=-4 için -5, y=-7 için -11 olur. Sağ taraf -11 olduğundan çözüm y=-7'dir.",
      ),
      "Sıra Sizde 3.121": p(
        "Çözüm: y+11=7 denkleminde 11'i yok etmek için iki taraftan 11 çıkarırız: y=7-11=-4.",
      ),
      "Sıra Sizde 3.122": p(
        "Çözüm: y+15=-4 olduğundan iki taraftan 15 çıkarırız. y=-4-15=-19 bulunur.",
      ),
      "Sıra Sizde 3.123": p(
        "Çözüm: a-2=-8 denkleminde iki tarafa 2 eklenir. a=-8+2=-6 olur.",
      ),
      "Sıra Sizde 3.124": p(
        "Çözüm: n-4=-8 denkleminde değişkeni yalnız bırakmak için iki tarafa 4 ekleriz. n=-4 bulunur.",
      ),
      "Sıra Sizde 3.125": p(
        "Çözüm: Dört eş zarf toplam 12 sayacı gösterir, bu yüzden denklem 4x=12'dir. İki tarafı 4'e bölersek x=3 olur.",
      ),
      "Sıra Sizde 3.126": p(
        "Çözüm: Üç eş zarf toplam 6 sayacı gösterir. 3x=6 yazılır ve iki taraf 3'e bölünür; her zarfta x=2 sayaç vardır.",
      ),
      "Sıra Sizde 3.127": p(
        "Çözüm: 8a=56 denkleminde iki tarafı 8'e böleriz. a=7 olur; kontrol: 8·7=56.",
      ),
      "Sıra Sizde 3.128": p(
        "Çözüm: 11n=121 olduğundan iki tarafı 11'e böleriz. n=11 bulunur.",
      ),
      "Sıra Sizde 3.129": p(
        "Çözüm: -8p=96 denkleminde iki tarafı -8'e böleriz. p=-12 olur; çünkü -8·(-12)=96.",
      ),
      "Sıra Sizde 3.130": p(
        "Çözüm: -12m=108 olduğundan iki taraf -12'ye bölünür. m=-9 bulunur.",
      ),
      "Sıra Sizde 3.131": p(
        "Çözüm: “x'ten 7 fazla -2'ye eşittir” cümlesi x+7=-2 olur. İki taraftan 7 çıkarınca x=-9 bulunur.",
      ),
      "Sıra Sizde 3.132": p(
        "Çözüm: “y'den 11 fazla 2'ye eşittir” ifadesi y+11=2 denklemini verir. y=2-11=-9 olur.",
      ),
      "Sıra Sizde 3.133": p(
        "Çözüm: “p ile 2'nin farkı -4'tür” cümlesi p-2=-4 olur. İki tarafa 2 ekleyince p=-2 bulunur.",
      ),
      "Sıra Sizde 3.134": p(
        "Çözüm: q ile 7'nin farkı -3 ise q-7=-3 yazılır. İki tarafa 7 eklenir ve q=4 olur.",
      ),
      "Sıra Sizde 3.135": p(
        "Çözüm: 132 sayısı -12 ile y'nin çarpımıdır: 132=-12y. İki tarafı -12'ye böleriz; y=-11.",
      ),
      "Sıra Sizde 3.136": p(
        "Çözüm: 117=-13z yazılır. İki taraf -13'e bölününce z=-9 bulunur.",
      ),
    },
    exercisePrompts: {
      "301": tx(
        "Zarf ve sayaç modelinde 3 eş zarf toplam 6 sayacı gösteriyor. Modelin denklemini yazın ve çözün.",
      ),
      "303": tx(
        "Zarf ve sayaç modelinde 2 eş zarf toplam 8 sayacı gösteriyor. Modelin denklemini yazın ve çözün.",
      ),
    },
    exerciseAnswers: {
      "285": answer("Çözüm: Değerleri yerine yazarız. x=-2 için 4(-2)-2=-10, x=-1 için -6, x=2 için 6 olur. Denklemi yalnız x=2 sağlar."),
      "287": answer("Çözüm: a=6 için 9a+27=81, a=-6 için -27, a=-10 için -63 olur. Sağ taraf -63 olduğundan çözüm a=-10'dur."),
      "289": answer("Çözüm: n+12=5 denkleminde iki taraftan 12 çıkarırız. n=5-12=-7 bulunur."),
      "291": answer("Çözüm: p+9=-8 olduğundan iki taraftan 9 çıkarılır. p=-8-9=-17 olur."),
      "293": answer("Çözüm: u-3=-7 denkleminde iki tarafa 3 ekleriz. u=-7+3=-4 bulunur."),
      "295": answer("Çözüm: h-10=-4 olduğundan iki tarafa 10 eklenir. h=6 olur; kontrol: 6-10=-4."),
      "297": answer("Çözüm: x+(-2)=-18, yani x-2=-18'dir. İki tarafa 2 ekleyince x=-16 bulunur."),
      "299": answer("Çözüm: r-(-5)=r+5 olduğundan denklem r+5=-9 olur. İki taraftan 5 çıkarılır ve r=-14 bulunur."),
      "301": answer("Çözüm: Model 3 eş zarfın toplam 6 sayaca eşit olduğunu gösterir. Denklem 3x=6'dır; iki taraf 3'e bölününce x=2 olur."),
      "303": answer("Çözüm: Model 2 eş zarfın toplam 8 sayaca eşit olduğunu gösterir. Denklem 2x=8'dir; iki taraf 2'ye bölününce x=4 olur."),
      "305": answer("Çözüm: 5x=45 denkleminde iki tarafı 5'e böleriz. x=9 olur; kontrol: 5·9=45."),
      "307": answer("Çözüm: -7c=56 olduğundan iki taraf -7'ye bölünür. c=-8 bulunur; çünkü -7·(-8)=56."),
      "309": answer("Çözüm: -14p=-42 denkleminde iki tarafı -14'e böleriz. p=3 olur."),
      "311": answer("Çözüm: -120=10q denkleminde iki taraf 10'a bölünür. q=-12 bulunur."),
      "313": answer("Çözüm: 24x=480 olduğundan iki tarafı 24'e böleriz. x=20 olur."),
      "315": answer("Çözüm: -3z=0 denkleminde iki taraf -3'e bölünür. z=0 bulunur; sıfırın herhangi sıfır olmayan sayıya bölümü yine sıfırdır."),
      "317": answer("Çözüm: “n'den 4 fazla 1'e eşittir” cümlesi n+4=1 olur. İki taraftan 4 çıkarınca n=-3 bulunur."),
      "319": answer("Çözüm: 8 ile p'nin toplamı -3 ise 8+p=-3 yazılır. İki taraftan 8 çıkarılır ve p=-11 olur."),
      "321": answer("Çözüm: a ile 3'ün farkı -14 ise a-3=-14'tür. İki tarafa 3 eklenir ve a=-11 bulunur."),
      "323": answer("Çözüm: -42 sayısı -7 ile x'in çarpımıdır: -42=-7x. İki taraf -7'ye bölünür; x=6 olur."),
      "325": answer("Çözüm: -15 ile f'nin çarpımı 75 ise -15f=75 yazılır. İki taraf -15'e bölününce f=-5 bulunur."),
      "327": answer("Çözüm: -6+c=4 denkleminde iki tarafa 6 ekleriz. c=10 olur."),
      "329": answer("Çözüm: m'den 9 eksik -4 ise m-9=-4 yazılır. İki tarafa 9 eklenir ve m=5 bulunur."),
      "331": answer("Çözüm: ⓐ x+2=10 için iki taraftan 2 çıkarılır, x=8. ⓑ 2x=10 için iki taraf 2'ye bölünür, x=5."),
      "333": answer("Çözüm: ⓐ -3p=27 denkleminde iki taraf -3'e bölünür, p=-9. ⓑ p-3=27 denkleminde iki tarafa 3 eklenir, p=30."),
      "335": answer("Çözüm: a-4=16 denkleminde iki tarafa 4 ekleriz. a=20 olur."),
      "337": answer("Çözüm: -8m=-56 denkleminde iki taraf -8'e bölünür. m=7 bulunur."),
      "339": answer("Çözüm: -39=u+13 denkleminde iki taraftan 13 çıkarırız. u=-52 olur."),
      "341": answer("Çözüm: 11r=-99 olduğundan iki tarafı 11'e böleriz. r=-9 bulunur."),
      "343": answer("Çözüm: 100=20d denkleminde iki taraf 20'ye bölünür. d=5 olur."),
      "345": answer("Çözüm: -49=x-7 denkleminde iki tarafa 7 eklenir. x=-42 bulunur."),
      "347": answer("Çözüm: 51 kurabiye 3 eş sıraya ayrılmıştır. 3c=51 denklemini kurarız; iki tarafı 3'e bölersek c=17 kurabiye bulunur."),
      "349": answer("Çözüm: Evet, zarf ve sayaç modeli 3x=15 denkleminde 15 sayacın 3 eş gruba ayrıldığını gösterir. Böylece her zarfta 5 sayaç olduğu, yani x=5 olduğu görülür."),
      "351": answer("Çözüm: -3x=36 denkleminde x, -3 ile çarpılmıştır. Çarpmayı tersine çevirmek için toplama değil bölme yapılmalıdır; iki taraf -3'e bölünür ve x=-12 bulunur."),
    },
    exerciseSectionSlugs: {
      "285": "denklemin-cozumunu-kontrol-etme",
      "287": "denklemin-cozumunu-kontrol-etme",
      "289": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "291": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "293": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "295": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "297": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "299": "toplama-ve-cikarma-ozellikleriyle-denklem-cozme",
      "301": "esitligin-bolme-ozelligini-modelleme",
      "303": "esitligin-bolme-ozelligini-modelleme",
      "305": "bolme-ozelligiyle-denklem-cozme",
      "307": "bolme-ozelligiyle-denklem-cozme",
      "309": "bolme-ozelligiyle-denklem-cozme",
      "311": "bolme-ozelligiyle-denklem-cozme",
      "313": "bolme-ozelligiyle-denklem-cozme",
      "315": "bolme-ozelligiyle-denklem-cozme",
      "317": "denklem-kurup-cozme",
      "319": "denklem-kurup-cozme",
      "321": "denklem-kurup-cozme",
      "323": "denklem-kurup-cozme",
      "325": "denklem-kurup-cozme",
      "327": "denklem-kurup-cozme",
      "329": "denklem-kurup-cozme",
      "331": "denklem-kurup-cozme",
      "333": "denklem-kurup-cozme",
      "335": "denklem-kurup-cozme",
      "337": "denklem-kurup-cozme",
      "339": "denklem-kurup-cozme",
      "341": "denklem-kurup-cozme",
      "343": "denklem-kurup-cozme",
      "345": "denklem-kurup-cozme",
      "347": "denklem-kurup-cozme",
      "349": "denklem-kurup-cozme",
      "351": "denklem-kurup-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.2",
    catalogLesson: {
      id: "lesson-visualize-fractions",
      slug: "kesirleri-gorsellestirme",
      displayTitle: "Kesirleri Görselleştirme",
      summary:
        "Kesirleri bütünün parçası olarak modelleyin, bileşik ve tam sayılı kesirleri dönüştürün, denk kesirleri ve sayı doğrusundaki yerlerini görün.",
      sortOrder: 1,
    },
    objectives: [
      "Kesrin bütünün eş parçalarını nasıl gösterdiğini açıklayabileceksiniz.",
      "Bileşik kesirleri ve tam sayılı kesirleri modelleyebileceksiniz.",
      "Bileşik kesirlerle tam sayılı kesirler arasında dönüşüm yapabileceksiniz.",
      "Denk kesirleri modellerle gösterebileceksiniz.",
      "Verilen kesre denk kesirler bulabileceksiniz.",
      "Kesirleri ve tam sayılı kesirleri sayı doğrusunda gösterebileceksiniz.",
      "Kesirleri ve tam sayılı kesirleri sıralayabileceksiniz.",
    ],
    sectionTitles: {
      "Understand the Meaning of Fractions": "Kesrin Anlamı",
      "Model Improper Fractions and Mixed Numbers":
        "Bileşik Kesirler ve Tam Sayılı Kesirler",
      "Convert between Improper Fractions and Mixed Numbers":
        "Bileşik Kesir ve Tam Sayılı Kesir Dönüşümleri",
      "Model Equivalent Fractions": "Denk Kesirleri Modelleme",
      "Find Equivalent Fractions": "Denk Kesir Bulma",
      "Locate Fractions and Mixed Numbers on the Number Line":
        "Kesirleri Sayı Doğrusunda Gösterme",
      "Order Fractions and Mixed Numbers": "Kesirleri Sıralama",
    },
    tryItSolutions: {
      "Sıra Sizde 4.1": p(
        "Çözüm: Payda eş parça sayısını, pay ise boyalı parça sayısını verir. ⓐ 8 parçanın 3'ü boyalıdır: 3/8. ⓑ 9 parçanın 4'ü boyalıdır: 4/9.",
      ),
      "Sıra Sizde 4.2": p(
        "Çözüm: ⓐ 5 eş parçanın 3'ü boyalı olduğu için kesir 3/5'tir. ⓑ 4 eş parçanın 3'ü boyalı olduğu için kesir 3/4'tür.",
      ),
      "Sıra Sizde 4.3": p(
        "Çözüm: Payda 8 olduğu için daire 8 eş parçaya ayrılır; pay 6 olduğu için bu parçalardan 6'sı boyanır.",
      ),
      "Sıra Sizde 4.4": p(
        "Çözüm: Dikdörtgen 5 eş parçaya ayrılmıştır. 2/5 modellemek için bu 5 parçanın 2'si boyanır.",
      ),
      "Sıra Sizde 4.5": p(
        "Çözüm: 3 tane üçte bir parça bir bütünü tamamlar. Bu yüzden 3/3=1 olur.",
      ),
      "Sıra Sizde 4.6": p(
        "Çözüm: 8 tane sekizde bir parça bir bütündür. Bu nedenle 8/8=1.",
      ),
      "Sıra Sizde 4.7": p(
        "Çözüm: 3 tane üçte bir bir bütün yapar; 5 üçte bir parçada 1 bütün ve 2/3 kalır. Sonuç 1 2/3'tür.",
      ),
      "Sıra Sizde 4.8": p(
        "Çözüm: 2 yarım 1 bütün yapar. 5 yarım parça 2 bütün ve 1/2 eder; sonuç 2 1/2'dir.",
      ),
      "Sıra Sizde 4.9": p(
        "Çözüm: Toplam 5 tane üçte bir parça vardır. 3/3 bir bütün eder, 2/3 kalır; bileşik kesir 5/3, tam sayılı kesir 1 2/3'tür.",
      ),
      "Sıra Sizde 4.10": p(
        "Çözüm: 13 tane sekizde bir parça vardır. 8/8 bir bütün, kalan 5/8 olur. Sonuç 13/8=1 5/8'tir.",
      ),
      "Sıra Sizde 4.11": p(
        "Çözüm: 7/6, 6/6 bir bütün ve 1/6 kalan demektir. Bu yüzden 7/6=1 1/6.",
      ),
      "Sıra Sizde 4.12": p(
        "Çözüm: 6/5 içinde 5/5 bir bütün vardır ve 1/5 kalır. Sonuç 1 1/5'tir.",
      ),
      "Sıra Sizde 4.13": p(
        "Çözüm: 9/7 içinde 7/7 bir bütün vardır; 2/7 kalır. Bu yüzden 9/7=1 2/7.",
      ),
      "Sıra Sizde 4.14": p(
        "Çözüm: 7/4 içinde 4/4 bir bütün vardır ve 3/4 kalır. Sonuç 1 3/4'tür.",
      ),
      "Sıra Sizde 4.15": p(
        "Çözüm: 1 bütün 8/8 eder. 8/8 ile 3/8 toplanır ve 11/8 bulunur.",
      ),
      "Sıra Sizde 4.16": p(
        "Çözüm: 1 bütün 6/6'dır. 6/6+5/6=11/6 olduğundan 1 5/6=11/6.",
      ),
      "Sıra Sizde 4.17": p(
        "Çözüm: 13'ü 7'ye böleriz: bölüm 1, kalan 6'dır. Bu nedenle 13/7=1 6/7.",
      ),
      "Sıra Sizde 4.18": p(
        "Çözüm: 14÷9 işleminde bölüm 1, kalan 5'tir. Sonuç 1 5/9 olur.",
      ),
      "Sıra Sizde 4.19": p(
        "Çözüm: 23÷7=3 kalan 2 olduğundan 23/7=3 2/7.",
      ),
      "Sıra Sizde 4.20": p(
        "Çözüm: 48÷11=4 kalan 4'tür. Bu yüzden 48/11=4 4/11.",
      ),
      "Sıra Sizde 4.21": p(
        "Çözüm: 3 5/7 için 3 bütünü yedilere çeviririz: 3·7=21. 21+5=26, sonuç 26/7'dir.",
      ),
      "Sıra Sizde 4.22": p(
        "Çözüm: 2 bütün 16/8 eder. 16/8+7/8=23/8 olduğundan sonuç 23/8'dir.",
      ),
      "Sıra Sizde 4.23": p(
        "Çözüm: 4·11=44 ve 44+6=50. Bu nedenle 4 6/11=50/11.",
      ),
      "Sıra Sizde 4.24": p(
        "Çözüm: 11·3=33 ve 33+1=34. Sonuç 34/3'tür.",
      ),
      "Sıra Sizde 4.25": p(
        "Çözüm: Bir bütünün dörtte biri, sekizde ikiye eşittir. Çünkü 1/4=2/8.",
      ),
      "Sıra Sizde 4.26": p(
        "Çözüm: 1/4 kesrini on ikilik parçalarla göstermek için pay ve paydayı 3 ile çarparız: 1/4=3/12.",
      ),
      "Sıra Sizde 4.27": p(
        "Çözüm: Pay ve paydayı aynı sayıyla çarparız. Örneğin 3/5=6/10=9/15=12/20.",
      ),
      "Sıra Sizde 4.28": p(
        "Çözüm: 4/5 kesrine denk üç örnek: 8/10, 12/15 ve 16/20. Hepsinde pay ve payda aynı çarpanla büyütülmüştür.",
      ),
      "Sıra Sizde 4.29": p(
        "Çözüm: Paydanın 21 olması için 7, 3 ile çarpılır. Payı da 3 ile çarparız: 6/7=18/21.",
      ),
      "Sıra Sizde 4.30": p(
        "Çözüm: 10'u 100 yapmak için 10 ile çarparız. Payı da 10 ile çarparız: 3/10=30/100.",
      ),
      "Sıra Sizde 4.31": p(
        "Çözüm: Sayıları konumlandırırken bileşik kesirleri tam sayılı kesre çevirebiliriz: 5/4=1 1/4, 7/4=1 3/4, 9/2=4 1/2. Noktalar sırasıyla 1/3, 1 1/4, 1 3/4, 2 3/5 ve 4 1/2 konumlarındadır.",
      ),
      "Sıra Sizde 4.32": p(
        "Çözüm: 9/4=2 1/4, 5/2=2 1/2 ve 11/4=2 3/4'tür. Noktalar 2/3, 2 1/4, 2 1/2, 2 3/4 ve 3 2/5 konumlarına yerleştirilir.",
      ),
      "Sıra Sizde 4.33": p(
        "Çözüm: Negatifler sıfırın soluna, pozitifler sağına yerleştirilir. Soldan sağa sıralama -2 1/4, -3/2, -2/3, 2/3, 3/2, 2 1/4 şeklindedir.",
      ),
      "Sıra Sizde 4.34": p(
        "Çözüm: Soldan sağa sıralama -7/3, -1 1/2, -3/4, 3/4, 1 1/2, 7/3 olur.",
      ),
      "Sıra Sizde 4.35": p(
        "Çözüm: Negatif sayılarda sıfıra daha yakın olan daha büyüktür. ⓐ -1/3>-1. ⓑ -1 1/2>-2. ⓒ -2/3<-1/3. ⓓ -3<-7/3.",
      ),
      "Sıra Sizde 4.36": p(
        "Çözüm: ⓐ -3>-17/5. ⓑ -2 1/4<-2. ⓒ -3/5>-4/5. ⓓ -4<-10/3.",
      ),
    },
    exerciseAnswers: {
      "1": answer("Çözüm: Payda toplam eş parça sayısı, pay boyalı parça sayısıdır. ⓐ 1/4, ⓑ 3/4, ⓒ 3/8, ⓓ 5/8."),
      "3": answer("Çözüm: 1/2 için şekil 2 eş parçaya ayrılır ve 1 parça boyanır."),
      "5": answer("Çözüm: 3/4 için şekil 4 eş parçaya ayrılır ve 3 parça boyanır."),
      "7": answer("Çözüm: 5/6 için şekil 6 eş parçaya ayrılır ve 5 parça boyanır."),
      "9": answer("Çözüm: 5/8 için şekil 8 eş parçaya ayrılır ve 5 parça boyanır."),
      "11": answer("Çözüm: 3 tane üçte bir parça bir bütünü tamamlar; 3/3=1."),
      "13": answer("Çözüm: 7 altıda bir parçada 6/6 bir bütün eder, 1/6 kalır. Sonuç 1 1/6'dır."),
      "15": answer("Çözüm: 7 beşte bir parçada 5/5 bir bütün eder, 2/5 kalır. Sonuç 1 2/5'tir."),
      "17": answer("Çözüm: ⓐ 5/4=1 1/4. ⓑ 7/4=1 3/4. ⓒ 11/8=1 3/8. Her durumda bir bütün tamamlandıktan sonra kalan parça yazılır."),
      "19": answer("Çözüm: ⓐ 11/4=2 3/4; iki bütün 8/4 eder, 3/4 kalır. ⓑ 19/8=2 3/8; iki bütün 16/8 eder, 3/8 kalır."),
      "21": answer("Çözüm: 4/4 bir bütündür. Modelde 4 eş parçanın tamamı boyanır."),
      "23": answer("Çözüm: 5/3 için 3/3 bir bütün eder, 2/3 kalır. Model 1 2/3 gösterir."),
      "25": answer("Çözüm: 13/8 için 8/8 bir bütün, kalan 5/8 olur. Sonuç 1 5/8'tir."),
      "27": answer("Çözüm: 9/4 içinde 8/4 iki bütün vardır ve 1/4 kalır. Sonuç 2 1/4'tür."),
      "29": answer("Çözüm: 5÷3 işleminde bölüm 1, kalan 2'dir. Bu yüzden 5/3=1 2/3."),
      "31": answer("Çözüm: 13÷5=2 kalan 3 olduğundan 13/5=2 3/5."),
      "33": answer("Çözüm: 28÷9 işleminde 9, 28'in içinde 3 kez vardır ve 1 artar. Bölüm tam kısım, kalan pay olduğu için sonuç 3 1/9'dur."),
      "35": answer("Çözüm: 47÷15=3 kalan 2. Bu nedenle 47/15=3 2/15."),
      "37": answer("Çözüm: 1 2/5 için 1 bütün 5/5'tir. 5/5+2/5=7/5."),
      "39": answer("Çözüm: 2 bütün 12/6 eder. 12/6+5/6=17/6."),
      "41": answer("Çözüm: 2·7=14 ve 14+5=19. Bu yüzden 2 5/7=19/7."),
      "43": answer("Çözüm: 3·9=27 ve 27+5=32. Sonuç 32/9'dur."),
      "45": answer("Çözüm: 1/3'ü on ikilik parçalarla yazmak için pay ve paydayı 4 ile çarparız: 1/3=4/12. Yani 4 tane on ikide bir gerekir."),
      "47": answer("Çözüm: 3/4=9/12 olduğu için üçte dört, 9 tane on ikide bire eşittir."),
      "49": answer("Çözüm: 3/2 kesrini altılı parçalarla yazarsak 3/2=9/6 olur. Yani 9 tane altıda bir gerekir."),
      "51": answer("Çözüm: Pay ve paydayı aynı sayıyla çarparız. Örneğin 1/3=2/6=3/9=4/12."),
      "53": answer("Çözüm: 5/6 kesrine denk üç örnek 10/12, 15/18 ve 20/24'tür; her biri aynı çarpanla genişletilmiştir."),
      "55": answer("Çözüm: 5/9 için örnek denk kesirler 10/18, 15/27 ve 20/36'dır."),
      "57": answer("Çözüm: 1/3, 0 ile 1 arasında; 7/4=1 3/4, 1 ile 2 arasında; 13/5=2 3/5, 2 ile 3 arasında işaretlenir."),
      "59": answer("Çözüm: 7/10, 0 ile 1 arasında; 13/8=1 5/8, 1 ile 2 arasında; 5/2=2 1/2 ve 3 tam sayı noktasında gösterilir."),
      "61": answer("Çözüm: 1 3/4 pozitif tarafta 1 ile 2 arasındadır. -1 3/5 negatif tarafta -2 ile -1 arasındadır."),
      "63": answer("Çözüm: Soldan sağa sıralama -8/3, -1 3/4, -2/5, 2/5, 1 3/4, 8/3 şeklindedir; sayı doğrusunda noktalar buna göre yerleştirilir."),
      "65": answer("Çözüm: -1, -1/3'ten daha soldadır. Bu yüzden -1<-1/3."),
      "67": answer("Çözüm: -1 3/4 sayısı -2'den sıfıra daha yakındır. Bu nedenle -1 3/4>-2."),
      "69": answer("Çözüm: -9/10, -3/10'dan daha küçüktür; çünkü sayı doğrusunda daha soldadır. Sonuç -9/10<-3/10."),
      "71": answer("Çözüm: -23/6=-3 5/6'dır. -4 bu sayıdan daha solda olduğu için -4<-23/6."),
      "73": answer("Çözüm: 4/4'lük ölçüde 4 çeyrek nota 1 ölçüdür. ⓐ 8 çeyrek nota 2 ölçü eder. ⓑ 25 çeyrek nota 25/4=6 1/4 ölçüdür."),
      "75": answer("Çözüm: Örnek yanıt: Yemek yaparken 1/2 su bardağı ya da 3/4 tatlı kaşığı gibi ölçüler kullanmak için kesirleri anlamak gerekir."),
    },
    exerciseSectionSlugs: {
      "1": "kesrin-anlami",
      "3": "kesrin-anlami",
      "5": "kesrin-anlami",
      "7": "kesrin-anlami",
      "9": "kesrin-anlami",
      "11": "kesrin-anlami",
      "13": "kesrin-anlami",
      "15": "kesrin-anlami",
      "17": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "19": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "21": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "23": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "25": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "27": "bilesik-kesirler-ve-tam-sayili-kesirler",
      "29": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "31": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "33": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "35": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "37": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "39": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "41": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "43": "bilesik-kesir-ve-tam-sayili-kesir-donusumleri",
      "45": "denk-kesirleri-modelleme",
      "47": "denk-kesirleri-modelleme",
      "49": "denk-kesirleri-modelleme",
      "51": "denk-kesir-bulma",
      "53": "denk-kesir-bulma",
      "55": "denk-kesir-bulma",
      "57": "kesirleri-sayi-dogrusunda-gosterme",
      "59": "kesirleri-sayi-dogrusunda-gosterme",
      "61": "kesirleri-sayi-dogrusunda-gosterme",
      "63": "kesirleri-sayi-dogrusunda-gosterme",
      "65": "kesirleri-siralama",
      "67": "kesirleri-siralama",
      "69": "kesirleri-siralama",
      "71": "kesirleri-siralama",
      "73": "kesirleri-siralama",
      "75": "kesirleri-siralama",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.3",
    catalogLesson: {
      id: "lesson-multiply-divide-fractions",
      slug: "kesirlerle-carpma-ve-bolme",
      displayTitle: "Kesirlerle Çarpma ve Bölme",
      summary:
        "Kesirleri sadeleştirin, kesirlerle çarpma yapın, ters kesri bulun ve kesirlerle bölme işlemini açıklayarak çözün.",
      sortOrder: 2,
    },
    objectives: [
      "Kesirleri ortak çarpanları kullanarak sadeleştirebileceksiniz.",
      "Kesirlerle çarpma işlemini modelleyip hesaplayabileceksiniz.",
      "Bir sayının tersini bulabileceksiniz.",
      "Kesirlerle bölme işlemini ters kesirle çarpma olarak çözebileceksiniz.",
    ],
    sectionTitles: {
      "Simplify Fractions": "Kesirleri Sadeleştirme",
      "Multiply Fractions": "Kesirlerle Çarpma",
      "Find Reciprocals": "Ters Kesir",
      "Divide Fractions": "Kesirlerle Bölme",
    },
    tryItSolutions: {
      "Sıra Sizde 4.37": p(
        "Çözüm: 8 ve 12 ortak 4'e bölünür. 8/12=2/3 olur.",
      ),
      "Sıra Sizde 4.38": p(
        "Çözüm: 12 ve 16 ortak 4'e bölünür. 12/16=3/4 bulunur.",
      ),
      "Sıra Sizde 4.39": p(
        "Çözüm: 21 ve 28 ortak 7'ye bölünür; negatif işaret korunur. Sonuç -3/4'tür.",
      ),
      "Sıra Sizde 4.40": p(
        "Çözüm: 16 ve 24 ortak 8'e bölünür. -16/24=-2/3 olur.",
      ),
      "Sıra Sizde 4.41": p(
        "Çözüm: 54 ve 42 ortak 6'ya bölünür. -54/42=-9/7 olur; bileşik kesir karışık sayıya çevrilmez.",
      ),
      "Sıra Sizde 4.42": p(
        "Çözüm: 81 ve 45 ortak 9'a bölünür. -81/45=-9/5 olur.",
      ),
      "Sıra Sizde 4.43": p(
        "Çözüm: 69 ve 120 ortak 3'e bölünür. 69/120=23/40, en sade haldir.",
      ),
      "Sıra Sizde 4.44": p(
        "Çözüm: 120 ve 192 ortak 24'e bölünür. 120/192=5/8 bulunur.",
      ),
      "Sıra Sizde 4.45": p(
        "Çözüm: Pay ve paydadaki ortak 7 sadeleşir. Sonuç x/y olur.",
      ),
      "Sıra Sizde 4.46": p(
        "Çözüm: Pay ve paydadaki ortak 9 sadeleşir. Sonuç a/b'dir.",
      ),
      "Sıra Sizde 4.47": p(
        "Çözüm: 3/5'in yarısı alınır. 3/5 iki eş parçaya ayrılırsa her parça 3/10 olur; sonuç 3/10'dur.",
      ),
      "Sıra Sizde 4.48": p(
        "Çözüm: 5/6'nın yarısı 5/12'dir. Bu yüzden 1/2·5/6=5/12 olur.",
      ),
      "Sıra Sizde 4.49": p(
        "Çözüm: Payları ve paydaları çarparız: 1·2=2 ve 3·5=15. Sonuç 2/15'tir.",
      ),
      "Sıra Sizde 4.50": p(
        "Çözüm: 3·7=21 ve 5·8=40 olduğundan sonuç 21/40'tır.",
      ),
      "Sıra Sizde 4.51": p(
        "Çözüm: İki negatifin çarpımı pozitiftir. 4/7·5/8 işleminde 4 ile 8 sadeleşir ve sonuç 5/14 olur.",
      ),
      "Sıra Sizde 4.52": p(
        "Çözüm: İki negatifin çarpımı pozitiftir. 7/12·8/9 işleminde 8 ile 12 sadeleşir; sonuç 14/27 olur.",
      ),
      "Sıra Sizde 4.53": p(
        "Çözüm: İşaret negatiftir. 10/28·8/15 işleminde 10 ile 15, 8 ile 28 sadeleşir. Sonuç -4/21'dir.",
      ),
      "Sıra Sizde 4.54": p(
        "Çözüm: İşaret negatiftir. 9/20·5/12 işleminde 5 ile 20, 9 ile 12 sadeleşir. Sonuç -3/16 olur.",
      ),
      "Sıra Sizde 4.55": p(
        "Çözüm: ⓐ 72'nin 1/8'i 9'dur. ⓑ 11/3·(-9a) işleminde -9, 3'e bölünür; sonuç -33a olur.",
      ),
      "Sıra Sizde 4.56": p(
        "Çözüm: ⓐ 64'ün 3/8'i 24'tür. ⓑ 16x·11/12 işleminde 16 ve 12 ortak 4'e bölünür; sonuç 44x/3 olur.",
      ),
      "Sıra Sizde 4.57": p(
        "Çözüm: Ters kesir pay ve paydanın yer değiştirmesiyle bulunur. ⓐ 7/5 ⓑ -8 ⓒ -4/11 ⓓ 1/14.",
      ),
      "Sıra Sizde 4.58": p(
        "Çözüm: Pay ve payda yer değiştirir; tam sayılar paydası 1 olan kesir gibi düşünülür. ⓐ 7/3 ⓑ -12 ⓒ -9/14 ⓓ 1/21.",
      ),
      "Sıra Sizde 4.59": p(
        "Çözüm: -5/8 için karşıt 5/8, mutlak değer 5/8, ters -8/5'tir. 1/4 için karşıt -1/4, mutlak değer 1/4, ters 4'tür. 8/3 için karşıt -8/3, mutlak değer 8/3, ters 3/8'dir. -8 için karşıt 8, mutlak değer 8, ters -1/8'dir.",
      ),
      "Sıra Sizde 4.60": p(
        "Çözüm: -4/7 için karşıt 4/7, mutlak değer 4/7, ters -7/4'tür. 1/8 için karşıt -1/8, mutlak değer 1/8, ters 8'dir. 9/4 için karşıt -9/4, mutlak değer 9/4, ters 4/9'dur. -1 için karşıt 1, mutlak değer 1, ters -1'dir.",
      ),
      "Sıra Sizde 4.61": p(
        "Çözüm: 1/3 içinde kaç tane 1/6 olduğunu buluruz. 1/3=2/6 olduğu için sonuç 2'dir.",
      ),
      "Sıra Sizde 4.62": p(
        "Çözüm: 1/2=2/4 olduğundan bir yarımın içinde iki tane dörtte bir vardır. Sonuç 2'dir.",
      ),
      "Sıra Sizde 4.63": p(
        "Çözüm: 2 bütün, altı tane üçte bir parçadan oluşur. Bu nedenle 2÷1/3=6.",
      ),
      "Sıra Sizde 4.64": p(
        "Çözüm: 3 bütün, altı tane yarımdan oluşur. Bu nedenle 3÷1/2=6.",
      ),
      "Sıra Sizde 4.65": p(
        "Çözüm: Bölme yerine bölen kesrin tersiyle çarparız: 3/7·(-3/2). Sonuç -9/14 olur.",
      ),
      "Sıra Sizde 4.66": p(
        "Çözüm: 2/3÷(-7/5)=2/3·(-5/7). Sonuç -10/21'dir.",
      ),
      "Sıra Sizde 4.67": p(
        "Çözüm: p/7'nin tersi 7/p'dir. 3/5·7/p=21/(5p) olur; p sıfır olmamalıdır.",
      ),
      "Sıra Sizde 4.68": p(
        "Çözüm: q/3'ün tersi 3/q'dur. 5/8·3/q=15/(8q) olur; q sıfır olmamalıdır.",
      ),
      "Sıra Sizde 4.69": p(
        "Çözüm: İki negatifin bölümü pozitiftir. -2/3·(-6/5) işleminde 2 ile 6 sadeleşmez; sonuç 12/15=4/5 olur.",
      ),
      "Sıra Sizde 4.70": p(
        "Çözüm: İki negatifin bölümü pozitiftir. -5/6·(-3/2)=15/12=5/4 olur.",
      ),
      "Sıra Sizde 4.71": p(
        "Çözüm: 7/27÷35/36 = 7/27·36/35. 7 ile 35, 36 ile 27 sadeleşir; sonuç 4/15'tir.",
      ),
      "Sıra Sizde 4.72": p(
        "Çözüm: 5/14÷15/28 = 5/14·28/15. 28 ile 14, 5 ile 15 sadeleşir; sonuç 2/3 olur.",
      ),
    },
    exercisePrompts: {
      "77": tx("Sadeleştirin; bileşik kesirleri tam sayılı kesre çevirmeyin: 7/21."),
      "79": tx("Sadeleştirin: 15/20."),
      "81": tx("Sadeleştirin: -40/88."),
      "83": tx("Sadeleştirin: -108/63."),
      "85": tx("Sadeleştirin: 120/252."),
      "87": tx("Sadeleştirin: -168/192."),
      "89": tx("Sadeleştirin: 11x/11y."),
      "91": tx("Sadeleştirin: -3x/12y."),
      "93": tx("Sadeleştirin: 14x²/21y."),
      "95": tx("Diyagramla modelleyin: 1/2 · 2/3."),
      "97": tx("Diyagramla modelleyin: 1/3 · 5/6."),
      "99": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: 2/5 · 1/3."),
      "101": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: 3/4 · 9/10."),
      "103": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: -2/3 · (-3/8)."),
      "105": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: -5/9 · 3/10."),
      "107": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: 7/12 · (-8/21)."),
      "109": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: (-14/15) · (9/20)."),
      "111": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: (-63/84) · (-44/90)."),
      "113": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: 4 · 5/11."),
      "115": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: 3/7 · 21n."),
      "117": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: -28p · (-1/4)."),
      "119": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: -8 · 17/4."),
      "121": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: -1 · (-3/8)."),
      "123": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: (2/3)³."),
      "125": tx("Çarpın ve sonucu sadeleştirilmiş biçimde yazın: (6/5)⁴."),
      "127": tx("Tersini bulun: 3/4."),
      "129": tx("Tersini bulun: -5/17."),
      "131": tx("Tersini bulun: 11/8."),
      "133": tx("Tersini bulun: -19."),
      "135": tx("Tersini bulun: 1."),
      "136": tx("Her sayı için karşıtını, mutlak değerini ve tersini bulun: -7/11, 4/5, 10/7, -8."),
      "137": tx("Her sayı için karşıtını, mutlak değerini ve tersini bulun: -3/13, 9/14, 15/7, -9."),
      "139": tx("Kesir bölmesini modelleyin: 1/2 ÷ 1/8."),
      "141": tx("Kesir bölmesini modelleyin: 3 ÷ 1/4."),
      "143": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 1/2 ÷ 1/8."),
      "145": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 4/5 ÷ 3/4."),
      "147": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -3/4 ÷ 3/5."),
      "149": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -5/6 ÷ (-5/6)."),
      "151": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 2/5 ÷ y/9."),
      "153": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 5/6 ÷ c/15."),
      "155": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 7/18 ÷ (-14/27)."),
      "157": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 5q/12 ÷ 15q/8."),
      "159": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 12r/25 ÷ 18s/35."),
      "161": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -3 ÷ 1/4."),
      "163": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 2/5 ÷ (-10)."),
      "165": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -15 ÷ (-5/3)."),
      "167": tx("İşlemi soldan sağa yapın ve sonucu sadeleştirin: 11/2 ÷ 7/8 · 2/11."),
      "169": tx("Nina, bir dinleti sonrası servis etmek için 4 tepsi şekerleme yapıyor. Her tepsi için 2/3 su bardağı yoğunlaştırılmış süt gerekiyor. ⓐ Toplam ne kadar süt gerekir? Sonucu bileşik kesir ve tam sayılı kesir olarak yazın. ⓑ 1/8, 1/4, 1/3, 1/2 ve 1 su bardağı ölçü kaplarıyla bu miktarı ölçmenin iki yolunu açıklayın."),
      "171": tx("Kristen'in 3/4 yarda kurdelesi var. Bunu kızının 6 bebeği için eş parçalara ayırmak istiyor. Her kurdele parçası kaç yarda olur?"),
      "173": tx("Negatif bir kesrin tersini nasıl bulduğunuzu açıklayın."),
      "175": tx("1/2 · 2/3 işleminin 1/3 olduğunu gösteren günlük yaşamdan bir örnek verin."),
    },
    exerciseAnswers: {
      "77": answer("Çözüm: 7 ve 21 ortak 7'ye bölünür. 7/21=1/3 olur."),
      "79": answer("Çözüm: 15 ve 20 ortak 5'e bölünür. Sonuç 3/4'tür."),
      "81": answer("Çözüm: 40 ve 88 ortak 8'e bölünür. İşaret negatif kalır; sonuç -5/11'dir."),
      "83": answer("Çözüm: 108 ve 63 ortak 9'a bölünür. -108/63=-12/7 olur; bileşik kesir tam sayılı kesre çevrilmez."),
      "85": answer("Çözüm: 120 ve 252 ortak 12'ye bölünür. 120/252=10/21, en sade haldir."),
      "87": answer("Çözüm: 168 ve 192 ortak 24'e bölünür. Sonuç -7/8 olur."),
      "89": answer("Çözüm: Pay ve paydadaki ortak 11 sadeleşir. Sonuç x/y olur."),
      "91": answer("Çözüm: 3 ve 12 ortak 3'e bölünür. Sonuç -x/(4y) olur."),
      "93": answer("Çözüm: 14 ve 21 ortak 7'ye bölünür. Sonuç 2x²/(3y) olur."),
      "95": answer("Çözüm: 2/3'ün yarısı alınır. Bu, 2 parçanın 2'ye bölünmesi gibidir ve sonuç 1/3 olur."),
      "97": answer("Çözüm: 5/6'nın üçte biri 5/18 eder. Paylar ve paydalar çarpıldığında da aynı sonuç bulunur."),
      "99": answer("Çözüm: Payları ve paydaları çarparız: 2·1=2 ve 5·3=15. Sonuç 2/15'tir."),
      "101": answer("Çözüm: 3/4·9/10 işleminde 3·9=27 ve 4·10=40 olur. Sonuç 27/40'tır."),
      "103": answer("Çözüm: İki negatifin çarpımı pozitiftir. 2/3·3/8 işleminde 3'ler sadeleşir; sonuç 1/4 olur."),
      "105": answer("Çözüm: İşaret negatiftir. 5/9·3/10 işleminde 5 ile 10, 3 ile 9 sadeleşir. Sonuç -1/6'dır."),
      "107": answer("Çözüm: İşaret negatiftir. 7/12·8/21 işleminde 7 ile 21, 8 ile 12 sadeleşir; sonuç -2/9 olur."),
      "109": answer("Çözüm: İşaret negatiftir. 14/15·9/20 işleminde 14 ile 20, 9 ile 15 sadeleşir; sonuç -21/50 olur."),
      "111": answer("Çözüm: İki negatifin çarpımı pozitiftir. 63/84=3/4 ve 44/90=22/45 olduğundan çarpım 66/180=11/30 olur."),
      "113": answer("Çözüm: 4=4/1 yazılır. 4·5/11=20/11 olur."),
      "115": answer("Çözüm: 21 ile 7 sadeleşir. 3/7·21n=3·3n=9n olur."),
      "117": answer("Çözüm: İki negatifin çarpımı pozitiftir. 28p·1/4=7p olur."),
      "119": answer("Çözüm: İşaret negatiftir. 8·17/4 işleminde 8 ile 4 sadeleşir; sonuç -34 olur."),
      "121": answer("Çözüm: İki negatifin çarpımı pozitiftir. Sonuç 3/8'dir."),
      "123": answer("Çözüm: Kesrin kuvvetini alırken pay ve paydanın kuvvetini ayrı ayrı alırız. (2/3)³=2³/3³=8/27 olur."),
      "125": answer("Çözüm: Kesrin dördüncü kuvvetinde hem pay hem payda dördüncü kuvvete yükseltilir. (6/5)⁴=6⁴/5⁴=1296/625 olur."),
      "127": answer("Çözüm: Ters kesirde pay ve payda yer değiştirir. Bu nedenle 3/4'ün tersi 4/3'tür."),
      "129": answer("Çözüm: Negatif işaret korunur, pay ve payda yer değiştirir. Ters kesir -17/5'tir."),
      "131": answer("Çözüm: Ters kesri bulmak için pay ve paydayı değiştiririz. 11/8'in tersi 8/11'dir."),
      "133": answer("Çözüm: Tam sayıyı paydası 1 olan kesir gibi yazarız. -19=-19/1 olduğundan tersi -1/19'dur."),
      "135": answer("Çözüm: Bir sayının tersiyle çarpımı 1 olmalıdır. 1'in tersi yine 1'dir; çünkü 1·1=1."),
      "136": answer("Çözüm: -7/11 için karşıt 7/11, mutlak değer 7/11, ters -11/7'dir. 4/5 için -4/5, 4/5, 5/4. 10/7 için -10/7, 10/7, 7/10. -8 için 8, 8, -1/8."),
      "137": answer("Çözüm: -3/13 için karşıt 3/13, mutlak değer 3/13, ters -13/3'tür. 9/14 için -9/14, 9/14, 14/9. 15/7 için -15/7, 15/7, 7/15. -9 için 9, 9, -1/9."),
      "139": answer("Çözüm: 1/2=4/8 olduğundan bir yarımın içinde dört tane sekizde bir vardır. Bu nedenle bölüm 4'tür."),
      "141": answer("Çözüm: Her bütün 4 tane çeyrek içerir. 3 bütün 12 çeyrek içerdiği için 3÷1/4=12 olur."),
      "143": answer("Çözüm: Kesre bölmek, o kesrin tersiyle çarpmaktır. 1/2÷1/8 = 1/2·8/1 = 4 olur."),
      "145": answer("Çözüm: Bölen kesrin tersini alırız. 4/5÷3/4 = 4/5·4/3 = 16/15 olur."),
      "147": answer("Çözüm: Bölme yerine ters kesirle çarparız. -3/4÷3/5 = -3/4·5/3. 3'ler sadeleşir ve sonuç -5/4 olur."),
      "149": answer("Çözüm: Sıfır olmayan her sayı kendisine bölündüğünde 1 verir. Aynı negatif sayı kendisine bölündüğü için sonuç 1'dir."),
      "151": answer("Çözüm: 2/5÷y/9 = 2/5·9/y = 18/(5y) olur; y sıfır olmamalıdır."),
      "153": answer("Çözüm: 5/6÷c/15 = 5/6·15/c. 15 ile 6 ortak 3'e bölünür; sonuç 25/(2c) olur."),
      "155": answer("Çözüm: 7/18÷(-14/27)=7/18·(-27/14). 7 ile 14, 27 ile 18 sadeleşir; sonuç -3/4'tür."),
      "157": answer("Çözüm: 5q/12÷15q/8 = 5q/12·8/(15q). q'ler, 5 ile 15 ve 8 ile 12 sadeleşir; sonuç 2/9 olur."),
      "159": answer("Çözüm: 12r/25÷18s/35 = 12r/25·35/(18s). 12 ile 18, 35 ile 25 sadeleşir; sonuç 14r/(15s) olur."),
      "161": answer("Çözüm: 1/4'e bölmek, 4 ile çarpmaktır. Bu nedenle -3÷1/4 = -3·4 = -12 olur."),
      "163": answer("Çözüm: -10 sayısının tersi -1/10'dur. 2/5÷(-10)=2/5·(-1/10)=-2/50=-1/25 olur."),
      "165": answer("Çözüm: -15÷(-5/3)=-15·(-3/5). Sonuç pozitiftir; 15 ile 5 sadeleşir ve sonuç 9 olur."),
      "167": answer("Çözüm: İşlem soldan sağa yapılır. 11/2÷7/8=11/2·8/7=44/7. Sonra 44/7·2/11=8/7 olur."),
      "169": answer("Çözüm: ⓐ 4 tepsi için 4·2/3=8/3=2 2/3 su bardağı süt gerekir. ⓑ 2 2/3 su bardağı; 1+1+1/3+1/3 ya da 1+1/2+1/2+1/3+1/3 gibi uygun ölçü kaplarıyla oluşturulabilir."),
      "171": answer("Çözüm: 3/4 yarda 6 eş parçaya ayrılır. 3/4÷6 = 3/4·1/6 = 3/24 = 1/8 yarda olur."),
      "173": answer("Çözüm: Negatif kesrin tersini bulurken pay ve payda yer değiştirir, negatif işaret korunur. Örneğin -2/5'in tersi -5/2'dir."),
      "175": answer("Çözüm: Örneğin bir pizzanın 2/3'ü kalmış olsun. Bunun yarısını yerseniz pizzanın 1/3'ünü yemiş olursunuz; bu durum 1/2·2/3=1/3 işlemini gösterir."),
    },
    exerciseSectionSlugs: {
      "77": "kesirleri-sadelestirme",
      "79": "kesirleri-sadelestirme",
      "81": "kesirleri-sadelestirme",
      "83": "kesirleri-sadelestirme",
      "85": "kesirleri-sadelestirme",
      "87": "kesirleri-sadelestirme",
      "89": "kesirleri-sadelestirme",
      "91": "kesirleri-sadelestirme",
      "93": "kesirleri-sadelestirme",
      "95": "kesirlerle-carpma",
      "97": "kesirlerle-carpma",
      "99": "kesirlerle-carpma",
      "101": "kesirlerle-carpma",
      "103": "kesirlerle-carpma",
      "105": "kesirlerle-carpma",
      "107": "kesirlerle-carpma",
      "109": "kesirlerle-carpma",
      "111": "kesirlerle-carpma",
      "113": "kesirlerle-carpma",
      "115": "kesirlerle-carpma",
      "117": "kesirlerle-carpma",
      "119": "kesirlerle-carpma",
      "121": "kesirlerle-carpma",
      "123": "kesirlerle-carpma",
      "125": "kesirlerle-carpma",
      "127": "ters-kesir",
      "129": "ters-kesir",
      "131": "ters-kesir",
      "133": "ters-kesir",
      "135": "ters-kesir",
      "136": "ters-kesir",
      "137": "ters-kesir",
      "139": "kesirlerle-bolme",
      "141": "kesirlerle-bolme",
      "143": "kesirlerle-bolme",
      "145": "kesirlerle-bolme",
      "147": "kesirlerle-bolme",
      "149": "kesirlerle-bolme",
      "151": "kesirlerle-bolme",
      "153": "kesirlerle-bolme",
      "155": "kesirlerle-bolme",
      "157": "kesirlerle-bolme",
      "159": "kesirlerle-bolme",
      "161": "kesirlerle-bolme",
      "163": "kesirlerle-bolme",
      "165": "kesirlerle-bolme",
      "167": "kesirlerle-bolme",
      "169": "kesirlerle-bolme",
      "171": "kesirlerle-bolme",
      "173": "ters-kesir",
      "175": "kesirlerle-carpma",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.4",
    catalogLesson: {
      id: "lesson-mixed-complex-fractions",
      slug: "karma-kesirler-ve-karmasik-kesirler",
      displayTitle: "Karma Kesirler ve Karmaşık Kesirler",
      summary:
        "Tam sayılı kesirlerle çarpma ve bölme yapın, kesirli sözel ifadeleri cebirsel yazın, karmaşık kesirleri ve kesir çizgili ifadeleri sadeleştirin.",
      sortOrder: 3,
    },
    objectives: [
      "Tam sayılı kesirlerle çarpma ve bölme yapabileceksiniz.",
      "Kesir içeren sözel ifadeleri cebirsel ifadeye çevirebileceksiniz.",
      "Karmaşık kesirleri bölme anlamını kullanarak sadeleştirebileceksiniz.",
      "Kesir çizgisini gruplama sembolü gibi kullanarak ifadeleri sadeleştirebileceksiniz.",
    ],
    sectionTitles: {
      "Multiply and Divide Mixed Numbers": "Karma Kesirlerle Çarpma ve Bölme",
      "Translate Phrases to Expressions with Fractions":
        "Kesirli Sözel İfadeler",
      "Simplify Complex Fractions": "Karmaşık Kesirler",
      "Simplify Expressions with a Fraction Bar":
        "Kesir Çizgisiyle İşlem Önceliği",
    },
    tryItSolutions: {
      "Sıra Sizde 4.73": p(
        "Çözüm: 5 2/3=17/3 olur. 17/3·6/17 işleminde 17'ler sadeleşir ve 6/3=2 bulunur.",
      ),
      "Sıra Sizde 4.74": p(
        "Çözüm: 5 1/4=21/4. 3/7·21/4 işleminde 21, 7'ye bölünür; sonuç 9/4=2 1/4 olur.",
      ),
      "Sıra Sizde 4.75": p(
        "Çözüm: 5 5/7=40/7 ve -2 5/8=-21/8. Çarpım negatiftir; sadeleştirme sonrası sonuç -15'tir.",
      ),
      "Sıra Sizde 4.76": p(
        "Çözüm: -3 2/5=-17/5 ve 4 1/6=25/6. Çarpım -425/30=-85/6=-14 1/6 olur.",
      ),
      "Sıra Sizde 4.77": p(
        "Çözüm: 4 3/8=35/8. 35/8÷7=35/8·1/7=5/8 bulunur.",
      ),
      "Sıra Sizde 4.78": p(
        "Çözüm: 2 5/8=21/8. 21/8÷3=21/8·1/3=7/8 olur.",
      ),
      "Sıra Sizde 4.79": p(
        "Çözüm: 2 2/3=8/3 ve 1 1/3=4/3. 8/3÷4/3=8/3·3/4=2.",
      ),
      "Sıra Sizde 4.80": p(
        "Çözüm: 3 3/4=15/4 ve 1 1/2=3/2. 15/4÷3/2=15/4·2/3=5/2=2 1/2.",
      ),
      "Sıra Sizde 4.81": p(
        "Çözüm: Bölüm, bölme ya da kesir çizgisiyle yazılır. 9s ile 14'ün bölümü 9s/14'tür.",
      ),
      "Sıra Sizde 4.82": p(
        "Çözüm: 5y'nin 6'ya bölümü 5y/6 olarak yazılır.",
      ),
      "Sıra Sizde 4.83": p(
        "Çözüm: Önce a ile b'nin farkı alınır, sonra cd'ye bölünür. İfade (a-b)/(cd) olur.",
      ),
      "Sıra Sizde 4.84": p(
        "Çözüm: Önce p ile q toplanır, sonra r'ye bölünür. İfade (p+q)/r olur.",
      ),
      "Sıra Sizde 4.85": p(
        "Çözüm: Karmaşık kesir bölme demektir. 2/3÷5/6=2/3·6/5=4/5 olur.",
      ),
      "Sıra Sizde 4.86": p(
        "Çözüm: 3/7÷6/11=3/7·11/6. 3 ile 6 sadeleşir ve sonuç 11/14 olur.",
      ),
      "Sıra Sizde 4.87": p(
        "Çözüm: -8/7 sayısını 4'e bölmek, 1/4 ile çarpmaktır. Sonuç -2/7'dir.",
      ),
      "Sıra Sizde 4.88": p(
        "Çözüm: -3÷9/10=-3·10/9=-10/3 olur.",
      ),
      "Sıra Sizde 4.89": p(
        "Çözüm: a/8÷ab/6=a/8·6/(ab). a'lar sadeleşir ve sonuç 3/(4b) olur; b sıfır olmamalıdır.",
      ),
      "Sıra Sizde 4.90": p(
        "Çözüm: p/2÷pq/8=p/2·8/(pq). p'ler sadeleşir ve sonuç 4/q olur; q sıfır olmamalıdır.",
      ),
      "Sıra Sizde 4.91": p(
        "Çözüm: 1 2/5=7/5. 5/7÷7/5=5/7·5/7=25/49 olur.",
      ),
      "Sıra Sizde 4.92": p(
        "Çözüm: 3 1/5=16/5. 8/5÷16/5=8/5·5/16=1/2 olur.",
      ),
      "Sıra Sizde 4.93": p(
        "Çözüm: -3/5 ile aynı değeri veren yazımlar -3/5 ve 3/(-5)'tir. Pay ve paydadan yalnızca biri negatif olmalıdır.",
      ),
      "Sıra Sizde 4.94": p(
        "Çözüm: -2/7 ile aynı değeri veren yazımlar -2/7 ve 2/(-7)'dir.",
      ),
      "Sıra Sizde 4.95": p(
        "Çözüm: Pay 4+6=10, payda 11-2=9 olur. Sonuç 10/9'dur.",
      ),
      "Sıra Sizde 4.96": p(
        "Çözüm: Pay 3+5=8, payda 18-2=16 olur. 8/16=1/2.",
      ),
      "Sıra Sizde 4.97": p(
        "Çözüm: Pay 6-3·5=-9, payda 3²+3=12 olur. Sonuç -9/12=-3/4'tür.",
      ),
      "Sıra Sizde 4.98": p(
        "Çözüm: Pay 4-4·6=-20, payda 3³+3=30 olur. Sonuç -20/30=-2/3'tür.",
      ),
      "Sıra Sizde 4.99": p(
        "Çözüm: Pay (11-7)²=16, payda 11²-7²=72 olur. 16/72=2/9.",
      ),
      "Sıra Sizde 4.100": p(
        "Çözüm: Pay (6+2)²=64, payda 6²+2²=40 olur. 64/40=8/5.",
      ),
      "Sıra Sizde 4.101": p(
        "Çözüm: Pay 8(-2)+4(-3)=-28, payda -5(2)+3=-7 olur. Bölüm 4'tür.",
      ),
      "Sıra Sizde 4.102": p(
        "Çözüm: Pay 7(-1)+9(-3)=-34, payda -5(3)-2=-17 olur. Bölüm 2'dir.",
      ),
    },
    exercisePrompts: {
      "185": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 13 1/2 ÷ 9."),
      "187": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -7 ÷ 5 1/4."),
      "189": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: 2 1/5 ÷ 1 1/10."),
      "191": tx("Bölün ve sonucu sadeleştirilmiş biçimde yazın: -18 3/4 ÷ (-3 3/4)."),
      "193": tx("Cebirsel ifadeye çevirin: 7v ile 13'ün bölümü."),
      "195": tx("Cebirsel ifadeye çevirin: a ile b'nin bölümü."),
      "197": tx("Cebirsel ifadeye çevirin: A'nın, 3 ile B'nin farkına bölümü."),
      "199": tx("Karmaşık kesri sadeleştirin: (4/5)/(8/15)."),
      "201": tx("Karmaşık kesri sadeleştirin: (-9/16)/(33/40)."),
      "203": tx("Karmaşık kesri sadeleştirin: (-9/10)/3."),
      "205": tx("Karmaşık kesri sadeleştirin: (5/3)/10."),
      "207": tx("Karmaşık kesri sadeleştirin: (r/5)/(s/3)."),
      "209": tx("Karmaşık kesri sadeleştirin: (-3/8)/(-y/12)."),
      "211": tx("Karmaşık kesri sadeleştirin: 4 2/3 ÷ 1/6."),
      "213": tx("Karmaşık kesri sadeleştirin: (3/8) ÷ (-6 3/4)."),
      "215": tx("Eşdeğer kesirleri belirleyin: -4/9 ile hangi yazımlar eşdeğerdir? -4/-9, -4/9, 4/9, -4/9."),
      "217": tx("Eşdeğer kesirleri belirleyin: -13/6 ile hangi yazımlar eşdeğerdir? 13/6, 13/-6, -13/-6, -13/6."),
      "219": tx("Sadeleştirin: (9+3)/7."),
      "221": tx("Sadeleştirin: (19-4)/6."),
      "223": tx("Sadeleştirin: 46/(4+4)."),
      "225": tx("Sadeleştirin: (-6+3)/(17-8)."),
      "227": tx("Sadeleştirin: (15+9)/(18+12)."),
      "229": tx("Sadeleştirin: (3·4)/(-24)."),
      "231": tx("Sadeleştirin: (6·6)/(9·2)."),
      "233": tx("Sadeleştirin: (7²+1)/60."),
      "235": tx("Sadeleştirin: (9·6-4·7)/(22+3)."),
      "237": tx("Sadeleştirin: (12·9-3²)/(3·18)."),
      "239": tx("Sadeleştirin: (8·9-7·6)/(5·6-9·2)."),
      "241": tx("Sadeleştirin: (6²-4²)/(4-6)."),
      "243": tx("Sadeleştirin: (7+3·5)/(-2-3²)."),
      "245": tx("Sadeleştirin: (9·7-3(12-8))/(8·7-6·6)."),
      "247": tx("Sadeleştirin: (8(9-2)-4(14-9))/(7(8-3)-3(16-9))."),
      "249": tx("Bir fuar standı şekerlemeyi pound ile satıyor. Ödüllü tarifte her pound için 2 2/3 su bardağı çikolata parçacığı kullanılıyor. ⓐ Yarım pound için kaç su bardağı gerekir? ⓑ 10 poundluk parti için kaç su bardağı gerekir? Sonuçları bileşik kesir ve tam sayılı kesir olarak yazın."),
      "251": tx("Karma kesirlerin nasıl çarpıldığını açıklayın."),
      "253": tx("-1/2, (-1)/2 ve 1/(-2) yazımlarının neden eşdeğer olduğunu açıklayın."),
    },
    exerciseAnswers: {
      "177": answer("Çözüm: 2 4/9=22/9. 22/9·6/7 işleminde 6 ile 9 sadeleşir; sonuç 44/21=2 2/21 olur."),
      "179": answer("Çözüm: 6 3/10=63/10. 25/36·63/10 işleminde sadeleştirme yapılır ve sonuç 35/8=4 3/8 olur."),
      "181": answer("Çözüm: 2 2/5=12/5 ve -2 2/9=-20/9. Çarpım -240/45=-16/3=-5 1/3 olur."),
      "183": answer("Çözüm: -1 7/20=-27/20 ve 2 11/12=35/12. Çarpım negatiftir; sonuç -63/16=-3 15/16 olur."),
      "185": answer("Çözüm: 13 1/2=27/2. 27/2÷9=27/2·1/9=3/2=1 1/2 olur."),
      "187": answer("Çözüm: 5 1/4=21/4. -7÷21/4=-7·4/21=-4/3=-1 1/3 olur."),
      "189": answer("Çözüm: 2 1/5=11/5 ve 1 1/10=11/10. 11/5÷11/10=11/5·10/11=2."),
      "191": answer("Çözüm: -18 3/4=-75/4 ve -3 3/4=-15/4. İki negatifin bölümü pozitiftir; sonuç 5'tir."),
      "193": answer("Çözüm: Bölüm kesir çizgisiyle yazılır. 7v'nin 13'e bölümü 7v/13'tür."),
      "195": answer("Çözüm: a ile b'nin bölümü a/b olarak yazılır; b sıfır olmamalıdır."),
      "197": answer("Çözüm: Önce 3 ile B'nin farkı alınır, sonra A bu farka bölünür. İfade A/(3-B) olur."),
      "199": answer("Çözüm: (4/5)/(8/15)=4/5÷8/15=4/5·15/8=3/2 olur."),
      "201": answer("Çözüm: (-9/16)/(33/40)=-9/16·40/33. Sadeleştirme sonrası sonuç -15/22 olur."),
      "203": answer("Çözüm: Bir kesri 3'e bölmek, 1/3 ile çarpmaktır. Bu nedenle (-9/10)/3=-9/10·1/3=-3/10 olur."),
      "205": answer("Çözüm: 10'a bölmek, 1/10 ile çarpmaktır. Bu yüzden (5/3)/10=5/3·1/10=1/6 olur."),
      "207": answer("Çözüm: (r/5)/(s/3)=r/5·3/s=3r/(5s) olur; s sıfır olmamalıdır."),
      "209": answer("Çözüm: (-3/8)/(-y/12)=(-3/8)·(-12/y)=36/(8y)=9/(2y) olur; y sıfır olmamalıdır."),
      "211": answer("Çözüm: 4 2/3=14/3. 14/3÷1/6=14/3·6=28 olur."),
      "213": answer("Çözüm: -6 3/4=-27/4. 3/8÷(-27/4)=3/8·(-4/27)=-1/18 olur."),
      "215": answer("Çözüm: -4/9 ile eşdeğer olmak için yalnızca pay ya da yalnızca payda negatif olmalıdır. Bu nedenle -4/9 ve -4/9 yazımları eşdeğerdir; -4/-9 ve 4/9 pozitiftir."),
      "217": answer("Çözüm: -13/6 ile eşdeğer yazımlar 13/(-6) ve -13/6'dır. Pay ve payda ikisi de negatif olursa sonuç pozitif olur."),
      "219": answer("Çözüm: Önce paydaki toplama yapılır: 9+3=12. Payda 7 kalır; sonuç 12/7 olur."),
      "221": answer("Çözüm: Pay 19-4=15, payda 6'dır. 15/6=5/2 olur."),
      "223": answer("Çözüm: Pay 46, payda 4+4=8 olur. 46/8=23/4."),
      "225": answer("Çözüm: Pay -6+3=-3, payda 17-8=9 olur. -3/9=-1/3."),
      "227": answer("Çözüm: Pay 15+9=24, payda 18+12=30 olur. 24/30=4/5."),
      "229": answer("Çözüm: Pay 3·4=12, payda -24 olur. 12/(-24)=-1/2."),
      "231": answer("Çözüm: Önce pay ve payda ayrı sadeleştirilir. Pay 6·6=36, payda 9·2=18 olur; 36/18=2'dir."),
      "233": answer("Çözüm: Pay 7²+1=50, payda 60 olur. 50/60=5/6."),
      "235": answer("Çözüm: Pay 9·6-4·7=54-28=26, payda 25 olur. Sonuç 26/25'tir."),
      "237": answer("Çözüm: Pay 12·9-3²=108-9=99, payda 3·18=54 olur. 99/54=11/6."),
      "239": answer("Çözüm: Pay 72-42=30, payda 30-18=12 olur. 30/12=5/2."),
      "241": answer("Çözüm: Önce üst ve alt ifadeler hesaplanır. Pay 6²-4²=36-16=20, payda 4-6=-2 olur; 20/(-2)=-10'dur."),
      "243": answer("Çözüm: İşlem önceliğine göre önce çarpma ve üs yapılır. Pay 7+3·5=22, payda -2-3²=-11 olur; sonuç -2'dir."),
      "245": answer("Çözüm: Pay 9·7-3(12-8)=63-12=51, payda 8·7-6·6=56-36=20 olur. Sonuç 51/20=2 11/20'dir."),
      "247": answer("Çözüm: Pay 8(9-2)-4(14-9)=56-20=36, payda 7(8-3)-3(16-9)=35-21=14 olur. 36/14=18/7=2 4/7."),
      "249": answer("Çözüm: ⓐ Yarım pound için 2 2/3'ün yarısı alınır: 8/3·1/2=4/3=1 1/3 su bardağı. ⓑ 10 pound için 10·8/3=80/3=26 2/3 su bardağı gerekir."),
      "251": answer("Çözüm: Karma kesirleri çarpmadan önce bileşik kesre çeviririz. Sonra payları ve paydaları çarpar, mümkünse sadeleştirir ve sonucu gerekirse tam sayılı kesre çeviririz."),
      "253": answer("Çözüm: Kesir bölme anlamı taşır. Negatif işaret payda ya da paydanın yalnızca birinde olduğunda bölüm negatiftir; bu yüzden -1/2, (-1)/2 ve 1/(-2) aynı değeri verir."),
    },
    exerciseSectionSlugs: {
      "177": "karma-kesirlerle-carpma-ve-bolme",
      "179": "karma-kesirlerle-carpma-ve-bolme",
      "181": "karma-kesirlerle-carpma-ve-bolme",
      "183": "karma-kesirlerle-carpma-ve-bolme",
      "185": "karma-kesirlerle-carpma-ve-bolme",
      "187": "karma-kesirlerle-carpma-ve-bolme",
      "189": "karma-kesirlerle-carpma-ve-bolme",
      "191": "karma-kesirlerle-carpma-ve-bolme",
      "193": "kesirli-sozel-ifadeler",
      "195": "kesirli-sozel-ifadeler",
      "197": "kesirli-sozel-ifadeler",
      "199": "karmasik-kesirler",
      "201": "karmasik-kesirler",
      "203": "karmasik-kesirler",
      "205": "karmasik-kesirler",
      "207": "karmasik-kesirler",
      "209": "karmasik-kesirler",
      "211": "karmasik-kesirler",
      "213": "karmasik-kesirler",
      "215": "kesir-cizgisiyle-islem-onceligi",
      "217": "kesir-cizgisiyle-islem-onceligi",
      "219": "kesir-cizgisiyle-islem-onceligi",
      "221": "kesir-cizgisiyle-islem-onceligi",
      "223": "kesir-cizgisiyle-islem-onceligi",
      "225": "kesir-cizgisiyle-islem-onceligi",
      "227": "kesir-cizgisiyle-islem-onceligi",
      "229": "kesir-cizgisiyle-islem-onceligi",
      "231": "kesir-cizgisiyle-islem-onceligi",
      "233": "kesir-cizgisiyle-islem-onceligi",
      "235": "kesir-cizgisiyle-islem-onceligi",
      "237": "kesir-cizgisiyle-islem-onceligi",
      "239": "kesir-cizgisiyle-islem-onceligi",
      "241": "kesir-cizgisiyle-islem-onceligi",
      "243": "kesir-cizgisiyle-islem-onceligi",
      "245": "kesir-cizgisiyle-islem-onceligi",
      "247": "kesir-cizgisiyle-islem-onceligi",
      "249": "karma-kesirlerle-carpma-ve-bolme",
      "251": "karma-kesirlerle-carpma-ve-bolme",
      "253": "kesir-cizgisiyle-islem-onceligi",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.5",
    catalogLesson: {
      id: "lesson-common-denominator-fractions",
      slug: "ortak-paydali-kesirlerde-toplama-cikarma",
      displayTitle: "Ortak Paydalı Kesirlerde Toplama ve Çıkarma",
      summary:
        "Ortak paydalı kesirleri modellerle toplayıp çıkarın, payları birleştirerek işlemleri sadeleştirin ve negatif kesirlerle çalışın.",
      sortOrder: 4,
    },
    objectives: [
      "Kesir toplamayı modelleyebileceksiniz.",
      "Ortak paydalı kesirleri toplayabileceksiniz.",
      "Kesir çıkarmayı modelleyebileceksiniz.",
      "Ortak paydalı kesirleri çıkarabileceksiniz.",
    ],
    sectionTitles: {
      "Model Fraction Addition": "Kesir Toplamayı Modelleme",
      "Add Fractions with a Common Denominator":
        "Ortak Paydalı Kesirleri Toplama",
      "Model Fraction Subtraction": "Kesir Çıkarmayı Modelleme",
      "Subtract Fractions with a Common Denominator":
        "Ortak Paydalı Kesirleri Çıkarma",
    },
    tryItSolutions: {
      "Sıra Sizde 4.103": p(
        "Çözüm: Sekizlik parçalardan 1 tane ve 4 tane birlikte 5 tane sekizlik parça eder. Sonuç 5/8'dir.",
      ),
      "Sıra Sizde 4.104": p(
        "Çözüm: Paydalar aynı olduğu için altılık parçaları sayarız. 1/6+4/6=5/6 olur.",
      ),
      "Sıra Sizde 4.105": p(
        "Çözüm: Ortak payda 6 kalır, paylar toplanır: 3+2=5. Sonuç 5/6'dır.",
      ),
      "Sıra Sizde 4.106": p(
        "Çözüm: Paydalar aynı olduğu için 3+7=10 yazılır. 10/10=1 olur.",
      ),
      "Sıra Sizde 4.107": p(
        "Çözüm: Ortak payda 4'tür. Payları toplarız: x+3. Sonuç (x+3)/4 olur.",
      ),
      "Sıra Sizde 4.108": p(
        "Çözüm: Payda 8 aynı kalır. Paylar y+5 olarak birleşir; sonuç (y+5)/8'dir.",
      ),
      "Sıra Sizde 4.109": p(
        "Çözüm: Payda d aynı kalır. Paylar -7+8=1 verir. Sonuç 1/d'dir.",
      ),
      "Sıra Sizde 4.110": p(
        "Çözüm: Payda m ortak olduğu için paylar toplanır: -6+9=3. Sonuç 3/m olur.",
      ),
      "Sıra Sizde 4.111": p(
        "Çözüm: Payda 8 aynı kalır. 3p+6p=9p olduğundan sonuç 9p/8'dir.",
      ),
      "Sıra Sizde 4.112": p(
        "Çözüm: Payda 5 ortak kalır. 2q+7q=9q, bu yüzden sonuç 9q/5 olur.",
      ),
      "Sıra Sizde 4.113": p(
        "Çözüm: Payda 15'tir. -4+(-6)=-10 olduğu için -10/15=-2/3 olur.",
      ),
      "Sıra Sizde 4.114": p(
        "Çözüm: Payda 21'dir. -5+(-9)=-14 ve -14/21=-2/3 olur.",
      ),
      "Sıra Sizde 4.115": p(
        "Çözüm: Sekizde yedi parçadan dört parça çıkarılır; üç sekizlik parça kalır. Sonuç 3/8'dir.",
      ),
      "Sıra Sizde 4.116": p(
        "Çözüm: Altıda beş parçadan dört parça çıkarılır. Geriye 1/6 kalır.",
      ),
      "Sıra Sizde 4.117": p(
        "Çözüm: Payda 28 aynı kalır. 19-7=12 olduğundan 12/28=3/7 olur.",
      ),
      "Sıra Sizde 4.118": p(
        "Çözüm: Payda 32 aynı kalır. 27-11=16 ve 16/32=1/2 bulunur.",
      ),
      "Sıra Sizde 4.119": p(
        "Çözüm: Payda 7 ortak kalır. Paylar x-2 olarak birleşir; sonuç (x-2)/7 olur.",
      ),
      "Sıra Sizde 4.120": p(
        "Çözüm: Payda 14 aynı kalır. Paylar y-13 olur; sonuç (y-13)/14'tür.",
      ),
      "Sıra Sizde 4.121": p(
        "Çözüm: Ortak payda x'tir. -9-7=-16 olduğu için sonuç -16/x olur.",
      ),
      "Sıra Sizde 4.122": p(
        "Çözüm: Payda a ortak kalır. -17-5=-22, sonuç -22/a'dır.",
      ),
      "Sıra Sizde 4.123": p(
        "Çözüm: Payda 5 ortak olduğu için payları soldan sağa toplarız: 2+(-4)-3=-5. Sonuç -5/5=-1 olur.",
      ),
      "Sıra Sizde 4.124": p(
        "Çözüm: Payda 9 ortak kalır. 5+(-4)-7=-6 olduğundan -6/9=-2/3 olur.",
      ),
    },
    exercisePrompts: {
      "259": tx("Toplamı bulun: 2/9+5/9."),
      "261": tx("Toplamı bulun: 9/15+7/15."),
      "263": tx("Toplamı bulun: y/3+2/3."),
      "265": tx("Toplamı bulun: 8/q+6/q."),
      "267": tx("Toplamı bulun: 5a/7+4a/7."),
      "269": tx("Toplamı bulun: -11x/5+7x/5."),
      "271": tx("Toplamı bulun: -1/8+(-5/8)."),
      "273": tx("Toplamı bulun: -5/16+(-9/16)."),
      "275": tx("Toplamı bulun: -9/19+17/19."),
      "277": tx("Toplamı bulun: 5/12+(-7/12)+(-11/12)."),
      "279": tx("Model kullanarak çıkarın ve bir diyagramla gösterin: 5/6-2/6."),
      "281": tx("Farkı bulun: 4/5-3/5."),
      "283": tx("Farkı bulun: 9/13-4/13."),
      "285": tx("Farkı bulun: 7/12-5/12."),
      "287": tx("Farkı bulun: -8/9-16/9."),
      "289": tx("Farkı bulun: x/19-8/19."),
      "291": tx("Farkı bulun: 11z/13-8/13."),
      "293": tx("Farkı bulun: -7/c-7/c."),
      "295": tx("Farkı bulun: -29/v-26/v."),
      "297": tx("Farkı bulun: 12d/11-9d/11."),
      "299": tx("Farkı bulun: -7s/3-7s/3."),
      "301": tx("Farkı bulun: -3/7-(-5/7)."),
      "303": tx("Farkı bulun: -8/11-(-5/11)."),
      "305": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: -3/14·7/12."),
      "307": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: 6/11-s/11."),
      "309": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: -5/18+1/18."),
      "311": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: 7/12÷9/28."),
      "313": tx("Janet bir tarif için 5/8 su bardağı una ihtiyaç duyuyor. Elinde 3/8 su bardağı un var. Komşusundan ne kadar un ödünç almalı?"),
      "315": tx("Bir partiden sonra Lupe'nin 5/12 peynirli pizza, 4/12 pepperonili pizza ve 4/12 sebzeli pizza dilimi kaldı. Bunların hepsi 1 pizza kutusuna sığar mı? Gerekçenizi açıklayın."),
    },
    exerciseAnswers: {
      "255": answer("Çözüm: Paydalar aynı olduğu için payları toplarız: 3+4=7. Sonuç 7/10'dur."),
      "257": answer("Çözüm: Ortak payda 8 kalır. 3+3=6 olduğundan 6/8=3/4 olur."),
      "259": answer("Çözüm: Payda 9 aynı kalır. 2+5=7, bu yüzden toplam 7/9'dur."),
      "261": answer("Çözüm: Payda 15 ortak kalır. 9+7=16 olduğundan sonuç 16/15=1 1/15 olur."),
      "263": answer("Çözüm: Payda 3 aynıdır. Paylar y+2 olarak birleşir; toplam (y+2)/3 olur."),
      "265": answer("Çözüm: Payda q ortak kalır. 8+6=14 olduğundan sonuç 14/q olur; q sıfır olmamalıdır."),
      "267": answer("Çözüm: Payda 7 aynıdır. 5a+4a=9a, sonuç 9a/7 olur."),
      "269": answer("Çözüm: Payda 5 ortak kalır. -11x+7x=-4x olduğu için toplam -4x/5'tir."),
      "271": answer("Çözüm: Payda 8'dir. -1+(-5)=-6 ve -6/8=-3/4 olur."),
      "273": answer("Çözüm: Payda 16 ortak kalır. -5+(-9)=-14 ve -14/16=-7/8 bulunur."),
      "275": answer("Çözüm: Payda 19 aynı kalır. -9+17=8 olduğundan toplam 8/19'dur."),
      "277": answer("Çözüm: Payda 12 ortak olduğu için payları toplarız: 5+(-7)+(-11)=-13. Sonuç -13/12 olur."),
      "279": answer("Çözüm: Altıda beş parçadan iki parça çıkarılır. Üç altılık parça kalır; 3/6=1/2 olur."),
      "281": answer("Çözüm: Paydalar aynı olduğu için payları çıkarırız: 4-3=1. Sonuç 1/5'tir."),
      "283": answer("Çözüm: Payda 13 kalır. 9-4=5 olduğundan fark 5/13'tür."),
      "285": answer("Çözüm: Payda 12 ortak kalır. 7-5=2 ve 2/12=1/6 olur."),
      "287": answer("Çözüm: Payda 9 aynıdır. -8-16=-24 olduğundan -24/9=-8/3 olur."),
      "289": answer("Çözüm: Payda 19 ortak kalır. Paylar x-8 olarak birleşir; sonuç (x-8)/19 olur."),
      "291": answer("Çözüm: Payda 13 aynıdır. 11z-8 ifadesi payda kalır; sonuç (11z-8)/13'tür."),
      "293": answer("Çözüm: Payda c ortak kalır. -7-7=-14 olduğu için fark -14/c olur."),
      "295": answer("Çözüm: Payda v aynıdır. -29-26=-55, bu yüzden sonuç -55/v olur."),
      "297": answer("Çözüm: Payda 11 ortak kalır. 12d-9d=3d olduğundan fark 3d/11 olur."),
      "299": answer("Çözüm: Payda 3 aynıdır. -7s-7s=-14s, sonuç -14s/3 olur."),
      "301": answer("Çözüm: Negatif bir kesri çıkarmak, karşıtını eklemektir. -3/7-(-5/7)=(-3+5)/7=2/7 olur."),
      "303": answer("Çözüm: -8/11-(-5/11)=(-8+5)/11=-3/11 olur; payda değişmez."),
      "305": answer("Çözüm: Çarpma işleminde önce sadeleştiririz. -3/14·7/12 işleminde 7 ile 14 sadeleşir; sonuç -3/24=-1/8 olur."),
      "307": answer("Çözüm: Ortak payda 11 kalır. Paylar 6-s olarak yazılır; sonuç (6-s)/11 olur."),
      "309": answer("Çözüm: Payda 18 aynıdır. -5+1=-4 ve -4/18=-2/9 olur."),
      "311": answer("Çözüm: Bölme yerine ters kesirle çarparız: 7/12·28/9. 28 ile 12 sadeleşir ve sonuç 49/27 olur."),
      "313": answer("Çözüm: Gereken un 5/8, elindeki un 3/8'tir. Eksik miktar 5/8-3/8=2/8=1/4 su bardağıdır."),
      "315": answer("Çözüm: Kalan dilimler toplamı 5/12+4/12+4/12=13/12'dir. Bu 1 pizzadan fazla olduğu için hepsi 1 pizza kutusuna sığmaz."),
    },
    exerciseSectionSlugs: {
      "255": "kesir-toplamayi-modelleme",
      "257": "kesir-toplamayi-modelleme",
      "259": "ortak-paydali-kesirleri-toplama",
      "261": "ortak-paydali-kesirleri-toplama",
      "263": "ortak-paydali-kesirleri-toplama",
      "265": "ortak-paydali-kesirleri-toplama",
      "267": "ortak-paydali-kesirleri-toplama",
      "269": "ortak-paydali-kesirleri-toplama",
      "271": "ortak-paydali-kesirleri-toplama",
      "273": "ortak-paydali-kesirleri-toplama",
      "275": "ortak-paydali-kesirleri-toplama",
      "277": "ortak-paydali-kesirleri-toplama",
      "279": "kesir-cikarmayi-modelleme",
      "281": "ortak-paydali-kesirleri-cikarma",
      "283": "ortak-paydali-kesirleri-cikarma",
      "285": "ortak-paydali-kesirleri-cikarma",
      "287": "ortak-paydali-kesirleri-cikarma",
      "289": "ortak-paydali-kesirleri-cikarma",
      "291": "ortak-paydali-kesirleri-cikarma",
      "293": "ortak-paydali-kesirleri-cikarma",
      "295": "ortak-paydali-kesirleri-cikarma",
      "297": "ortak-paydali-kesirleri-cikarma",
      "299": "ortak-paydali-kesirleri-cikarma",
      "301": "ortak-paydali-kesirleri-cikarma",
      "303": "ortak-paydali-kesirleri-cikarma",
      "305": "ortak-paydali-kesirleri-cikarma",
      "307": "ortak-paydali-kesirleri-cikarma",
      "309": "ortak-paydali-kesirleri-cikarma",
      "311": "ortak-paydali-kesirleri-cikarma",
      "313": "ortak-paydali-kesirleri-cikarma",
      "315": "ortak-paydali-kesirleri-toplama",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.6",
    catalogLesson: {
      id: "lesson-different-denominator-fractions",
      slug: "farkli-paydali-kesirlerde-toplama-cikarma",
      displayTitle: "Farklı Paydalı Kesirlerde Toplama ve Çıkarma",
      summary:
        "En küçük ortak paydayı bulun, kesirleri denk biçimlere dönüştürün ve farklı paydalı kesirlerle toplama, çıkarma ve işlem önceliği uygulayın.",
      sortOrder: 5,
    },
    objectives: [
      "En küçük ortak paydayı bulabileceksiniz.",
      "Kesirleri en küçük ortak paydayla denk biçimde yazabileceksiniz.",
      "Farklı paydalı kesirleri toplayıp çıkarabileceksiniz.",
      "Kesir işlemlerini ayırt edip uygun yöntemi kullanabileceksiniz.",
      "Karmaşık kesirleri işlem önceliğiyle sadeleştirebileceksiniz.",
      "Kesirli değerler içeren cebirsel ifadeleri hesaplayabileceksiniz.",
    ],
    sectionTitles: {
      "Find the Least Common Denominator":
        "En Küçük Ortak Paydayı Bulma",
      "Convert Fractions to Equivalent Fractions with the LCD":
        "Denk Kesirleri Ortak Paydayla Yazma",
      "Add and Subtract Fractions with Different Denominators":
        "Farklı Paydalı Kesirlerde Toplama ve Çıkarma",
      "Identify and Use Fraction Operations":
        "Kesir İşlemlerini Seçme ve Kullanma",
      "Use the Order of Operations to Simplify Complex Fractions":
        "Karmaşık Kesirlerde İşlem Önceliği",
      "Evaluate Variable Expressions with Fractions":
        "Kesirli Değerlerle Cebirsel İfadeleri Hesaplama",
    },
    tryItSolutions: {
      "Sıra Sizde 4.125": p(
        "Çözüm: Paydalar 12 ve 15'tir. 12=2²·3, 15=3·5 olduğundan EKOK 2²·3·5=60'tır. EKOP 60 olur.",
      ),
      "Sıra Sizde 4.126": p(
        "Çözüm: Paydalar 15 ve 5'tir. 15 zaten 5'in katıdır; bu yüzden en küçük ortak payda 15'tir.",
      ),
      "Sıra Sizde 4.127": p(
        "Çözüm: 24=2³·3 ve 32=2⁵ olduğundan EKOK 2⁵·3=96'dır. Ortak payda 96 olur.",
      ),
      "Sıra Sizde 4.128": p(
        "Çözüm: 28=2²·7 ve 32=2⁵ olduğundan EKOK 2⁵·7=224'tür. En küçük ortak payda 224 olur.",
      ),
      "Sıra Sizde 4.129": p(
        "Çözüm: 3/4 kesrini 3 ile, 5/6 kesrini 2 ile genişletiriz. Denk kesirler 9/12 ve 10/12 olur.",
      ),
      "Sıra Sizde 4.130": p(
        "Çözüm: -7/12 kesri 5 ile genişleyip -35/60 olur; 11/15 kesri 4 ile genişleyip 44/60 olur.",
      ),
      "Sıra Sizde 4.131": p(
        "Çözüm: 13/24 kesrini 4 ile genişletiriz: 52/96. 17/32 kesrini 3 ile genişletiriz: 51/96.",
      ),
      "Sıra Sizde 4.132": p(
        "Çözüm: 9/28 kesri 8 ile genişleyip 72/224 olur; 27/32 kesri 7 ile genişleyip 189/224 olur.",
      ),
      "Sıra Sizde 4.133": p(
        "Çözüm: Ortak payda 12'dir. 1/4=3/12 ve 1/3=4/12 olduğundan toplam 7/12 olur.",
      ),
      "Sıra Sizde 4.134": p(
        "Çözüm: Ortak payda 10'dur. 1/2=5/10 ve 1/5=2/10; toplam 7/10 olur.",
      ),
      "Sıra Sizde 4.135": p(
        "Çözüm: Negatif kesri çıkarmak ekleme yapmaktır. 1/2+1/8=4/8+1/8=5/8 olur.",
      ),
      "Sıra Sizde 4.136": p(
        "Çözüm: 1/3-(-1/6)=1/3+1/6=2/6+1/6=3/6=1/2 olur.",
      ),
      "Sıra Sizde 4.137": p(
        "Çözüm: Ortak payda 60'tır. 7/12=35/60 ve 11/15=44/60; toplam 79/60 olur.",
      ),
      "Sıra Sizde 4.138": p(
        "Çözüm: Ortak payda 60'tır. 13/15=52/60 ve 17/20=51/60; toplam 103/60 olur.",
      ),
      "Sıra Sizde 4.139": p(
        "Çözüm: Ortak payda 96'dır. 13/24=52/96 ve 17/32=51/96; fark 1/96 olur.",
      ),
      "Sıra Sizde 4.140": p(
        "Çözüm: Ortak payda 224'tür. 21/32=147/224 ve 9/28=72/224; fark 75/224 olur.",
      ),
      "Sıra Sizde 4.141": p(
        "Çözüm: Ortak payda 210'dur. -13/42=-65/210 ve 17/35=102/210; toplam 37/210 olur.",
      ),
      "Sıra Sizde 4.142": p(
        "Çözüm: Ortak payda 96'dır. -19/24=-76/96 ve 17/32=51/96; toplam -25/96 olur.",
      ),
      "Sıra Sizde 4.143": p(
        "Çözüm: Ortak payda 18'dir. y/6=3y/18 ve 7/9=14/18; toplam (3y+14)/18 olur.",
      ),
      "Sıra Sizde 4.144": p(
        "Çözüm: Ortak payda 30'dur. x/6=5x/30 ve 7/15=14/30; toplam (5x+14)/30 olur.",
      ),
      "Sıra Sizde 4.145": p(
        "Çözüm: ⓐ -3/4-1/6=-9/12-2/12=-11/12. ⓑ -3/4·1/6=-3/24=-1/8.",
      ),
      "Sıra Sizde 4.146": p(
        "Çözüm: ⓐ 5/6÷(-1/4)=5/6·(-4)=-10/3. ⓑ 5/6-(-1/4)=5/6+1/4=13/12.",
      ),
      "Sıra Sizde 4.147": p(
        "Çözüm: İlk ifade genel olarak daha fazla sadeleşmez: (27a-32)/36. İkinci ifade 2a/3 olarak kalır.",
      ),
      "Sıra Sizde 4.148": p(
        "Çözüm: İlk ifade genel olarak daha fazla sadeleşmez: (24k+25)/30. İkinci ifade 24k/5 olarak kalır.",
      ),
      "Sıra Sizde 4.149": p(
        "Çözüm: Pay (1/3)²=1/9, payda 2³+2=10 olur. (1/9)/10=1/90 bulunur.",
      ),
      "Sıra Sizde 4.150": p(
        "Çözüm: Pay 1+4²=17, payda (1/4)²=1/16 olur. 17÷1/16=272 olur.",
      ),
      "Sıra Sizde 4.151": p(
        "Çözüm: Pay 1/3+1/2=5/6, payda 3/4-1/3=5/12 olur. (5/6)÷(5/12)=2.",
      ),
      "Sıra Sizde 4.152": p(
        "Çözüm: Pay 2/3-1/2=1/6, payda 1/4+1/3=7/12 olur. (1/6)÷(7/12)=2/7.",
      ),
      "Sıra Sizde 4.153": p(
        "Çözüm: ⓐ -7/4+3/4=-1. ⓑ -5/4+3/4=-1/2.",
      ),
      "Sıra Sizde 4.154": p(
        "Çözüm: ⓐ 2/3+1/2=7/6. ⓑ -3/4+1/2=-1/4.",
      ),
      "Sıra Sizde 4.155": p(
        "Çözüm: y=-1/4 yazılır. -1/4-1/2=-1/4-2/4=-3/4 olur.",
      ),
      "Sıra Sizde 4.156": p(
        "Çözüm: x=-5/2 yazılır. -5/2-3/8=-20/8-3/8=-23/8 olur.",
      ),
      "Sıra Sizde 4.157": p(
        "Çözüm: b²=(-1/2)²=1/4. 3·(-2/3)·1/4=-2·1/4=-1/2 olur.",
      ),
      "Sıra Sizde 4.158": p(
        "Çözüm: c³=(-1/2)³=-1/8. 4·(-1/8)·(-4/3)=2/3 olur.",
      ),
      "Sıra Sizde 4.159": p(
        "Çözüm: a+b=-8+(-7)=-15. -15/6=-5/2 olur.",
      ),
      "Sıra Sizde 4.160": p(
        "Çözüm: x+y=9+(-18)=-9. -9/(-6)=3/2 olur.",
      ),
    },
    exercisePrompts: {
      "317": tx("En küçük ortak paydayı bulun: 3/4 ve 2/5."),
      "319": tx("En küçük ortak paydayı bulun: 9/16 ve 7/12."),
      "321": tx("En küçük ortak paydayı bulun: 23/30 ve 5/48."),
      "323": tx("En küçük ortak paydayı bulun: 18/35 ve 33/49."),
      "325": tx("En küçük ortak paydayı bulun: 2/3, 1/4 ve 3/5."),
      "327": tx("EKOP 20 iken kesirleri denk biçimde yazın: 1/4 ve 1/5."),
      "329": tx("EKOP 24 iken kesirleri denk biçimde yazın: 7/12 ve 5/8."),
      "331": tx("EKOP 48 iken kesirleri denk biçimde yazın: 11/16 ve -5/12."),
      "333": tx("EKOP 60 iken kesirleri denk biçimde yazın: 1/3, 3/4 ve 3/5."),
      "335": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1/4+1/5."),
      "337": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1/3+1/8."),
      "339": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1/4-(-1/8)."),
      "341": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1/2-(-1/6)."),
      "343": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 3/4+2/5."),
      "345": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 5/12+3/8."),
      "347": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 7/16-5/12."),
      "349": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 5/8-7/12."),
      "351": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 5/6-3/4."),
      "353": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: -9/20+17/30."),
      "355": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: -23/30+5/48."),
      "357": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: -33/49-18/35."),
      "359": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: -3/4-(-4/5)."),
      "361": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: -7/20-(-5/8)."),
      "363": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1+5/6."),
      "365": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: 1-3/10."),
      "367": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: y/2+2/3."),
      "369": tx("Toplayın ya da çıkarın. Sonucu sadeleştirilmiş biçimde yazın: x/5-1/4."),
      "371": tx("İşlemleri yapın ve sonuçları sadeleştirilmiş biçimde yazın: ⓐ 2/3+1/6 ⓑ 2/3÷1/6."),
      "373": tx("İşlemleri yapın ve sonuçları sadeleştirilmiş biçimde yazın: ⓐ -4/5-1/8 ⓑ -4/5·1/8."),
      "375": tx("İşlemleri yapın ve sonuçları sadeleştirilmiş biçimde yazın: ⓐ 3a/8÷7/12 ⓑ 3a/8-7/12."),
      "377": tx("İşlemleri yapın ve sonuçları sadeleştirilmiş biçimde yazın: ⓐ 4/15·(-5q/9) ⓑ 4/15+(-5q/9)."),
      "381": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: -1/8+7/12."),
      "383": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: 5/9-1/6."),
      "385": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: 7/12·(-8/35)."),
      "387": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: -3/8-x/11."),
      "389": tx("İşlemi yapın ve sadeleştirilmiş biçimde yazın: 10y/13·8/(15y)."),
      "391": tx("Sadeleştirin: ((1/3)^2)/(5+2^2)."),
      "393": tx("Sadeleştirin: (3^3-3^2)/((3/4)^2)."),
      "395": tx("Sadeleştirin: ((3/4)^2)/((5/8)^2)."),
      "397": tx("Sadeleştirin: 5/(1/4+1/3)."),
      "399": tx("Sadeleştirin: (3/4+1/2)/(5/6-2/3)."),
      "401": tx("Sadeleştirin: (3/4-3/5)/(1/4+2/5)."),
      "403": tx("Sadeleştirin: 1/3+2/5·3/4."),
      "405": tx("Sadeleştirin: 1-5/6÷1/12."),
      "407": tx("Sadeleştirin: 2/3+1/4+3/5."),
      "409": tx("Sadeleştirin: 2/5+5/8-3/4."),
      "411": tx("Sadeleştirin: 8(15/16-5/6)."),
      "413": tx("Sadeleştirin: (1/6+3/10)/(14/30)."),
      "415": tx("Sadeleştirin: (3/4+1/6)÷(5/8-1/3)."),
      "417": tx("İfadeyi hesaplayın: x+2/3; ⓐ x=-1/6 iken ⓑ x=-5/3 iken."),
      "419": tx("İfadeyi hesaplayın: x+(-11/12); ⓐ x=11/12 iken ⓑ x=3/4 iken."),
      "421": tx("İfadeyi hesaplayın: x-1/3; ⓐ x=2/3 iken ⓑ x=-2/3 iken."),
      "423": tx("İfadeyi hesaplayın: 5/12-w; ⓐ w=1/4 iken ⓑ w=-1/4 iken."),
      "425": tx("İfadeyi hesaplayın: 5m^2n; m=-2/5 ve n=1/3 iken."),
      "427": tx("İfadeyi hesaplayın: 8u^2v^3; u=-3/4 ve v=-1/2 iken."),
      "429": tx("İfadeyi hesaplayın: (m+n)/p; m=-6, n=-2 ve p=4 iken."),
      "431": tx("İfadeyi hesaplayın: (r-s)/(r+s); r=10 ve s=-5 iken."),
      "433": tx("Vanessa çikolata parçalı kurabiye ve yulaflı kurabiye pişiriyor. İlk tarif için 1 1/4 su bardağı, ikinci tarif için 1 1/8 su bardağı şekere ihtiyacı var. Toplam ne kadar şeker gerekir?"),
      "435": tx("İki kesrin en küçük ortak paydasını nasıl bulacağınızı açıklayın."),
    },
    exerciseAnswers: {
      "317": answer("Çözüm: 4 ve 5'in EKOK'u 20'dir; en küçük ortak payda 20 olur."),
      "319": answer("Çözüm: 16=2⁴ ve 12=2²·3 olduğundan EKOK 2⁴·3=48'dir."),
      "321": answer("Çözüm: 30=2·3·5 ve 48=2⁴·3 olduğundan EKOK 2⁴·3·5=240'tır."),
      "323": answer("Çözüm: 35=5·7 ve 49=7² olduğundan EKOK 5·7²=245'tir."),
      "325": answer("Çözüm: 3, 4 ve 5'in EKOK'u 60'tır; en küçük ortak payda 60 olur."),
      "327": answer("Çözüm: Paydaları 20 yapmak için 1/4 kesrini 5 ile, 1/5 kesrini 4 ile genişletiriz. Sonuç 5/20 ve 4/20 olur."),
      "329": answer("Çözüm: Paydaları 24 yapmak için 7/12 kesri 2 ile, 5/8 kesri 3 ile genişletilir. Sonuç 14/24 ve 15/24 olur."),
      "331": answer("Çözüm: Payda 48 olmalıdır. 11/16 kesrini 3 ile genişletip 33/48, -5/12 kesrini 4 ile genişletip -20/48 buluruz."),
      "333": answer("Çözüm: 1/3=20/60, 3/4=45/60 ve 3/5=36/60 olur."),
      "335": answer("Çözüm: Ortak payda 20'dir. 1/4=5/20 ve 1/5=4/20; toplam 9/20 olur."),
      "337": answer("Çözüm: Ortak payda 24'tür. 1/3=8/24 ve 1/8=3/24; toplam 11/24 olur."),
      "339": answer("Çözüm: Negatif kesri çıkarmak ekleme yapmaktır. 1/4-(-1/8)=1/4+1/8=2/8+1/8=3/8 olur."),
      "341": answer("Çözüm: Negatif kesri çıkardığımız için toplama yaparız. 1/2-(-1/6)=1/2+1/6=3/6+1/6=2/3 olur."),
      "343": answer("Çözüm: Ortak payda 20'dir. 3/4=15/20 ve 2/5=8/20; toplam 23/20 olur."),
      "345": answer("Çözüm: Ortak payda 24'tür. 5/12=10/24 ve 3/8=9/24; toplam 19/24 olur."),
      "347": answer("Çözüm: Ortak payda 48'dir. 7/16=21/48 ve 5/12=20/48; fark 1/48 olur."),
      "349": answer("Çözüm: Ortak payda 24'tür. 5/8=15/24 ve 7/12=14/24; fark 1/24 olur."),
      "351": answer("Çözüm: Ortak payda 12'dir. 5/6=10/12 ve 3/4=9/12; fark 1/12 olur."),
      "353": answer("Çözüm: Ortak payda 60'tır. -9/20=-27/60 ve 17/30=34/60; toplam 7/60 olur."),
      "355": answer("Çözüm: Ortak payda 240'tır. -23/30=-184/240 ve 5/48=25/240; toplam -159/240=-53/80 olur."),
      "357": answer("Çözüm: Ortak payda 245'tir. -33/49=-165/245 ve -18/35=-126/245; toplam -291/245 olur."),
      "359": answer("Çözüm: -3/4-(-4/5)=-3/4+4/5=-15/20+16/20=1/20 olur."),
      "361": answer("Çözüm: -7/20-(-5/8)=-7/20+5/8=-14/40+25/40=11/40 olur."),
      "363": answer("Çözüm: Tam sayıyı altıda altı olarak yazarız. 1=6/6 olduğundan 1+5/6=11/6 olur."),
      "365": answer("Çözüm: Tam sayıyı onda on olarak yazarız. 1=10/10 olduğundan 1-3/10=7/10 olur."),
      "367": answer("Çözüm: Ortak payda 6'dır. y/2=3y/6 ve 2/3=4/6; toplam (3y+4)/6 olur."),
      "369": answer("Çözüm: Ortak payda 20'dir. x/5=4x/20 ve 1/4=5/20; fark (4x-5)/20 olur."),
      "371": answer("Çözüm: ⓐ 2/3+1/6=4/6+1/6=5/6. ⓑ 2/3÷1/6=2/3·6=4."),
      "373": answer("Çözüm: ⓐ -4/5-1/8=-32/40-5/40=-37/40. ⓑ -4/5·1/8=-4/40=-1/10."),
      "375": answer("Çözüm: ⓐ 3a/8÷7/12=3a/8·12/7=9a/14. ⓑ 3a/8-7/12=9a/24-14/24=(9a-14)/24."),
      "377": answer("Çözüm: ⓐ 4/15·(-5q/9)=-20q/135=-4q/27. ⓑ 4/15+(-5q/9)=12/45-25q/45=(12-25q)/45."),
      "381": answer("Çözüm: Ortak payda 24'tür. -1/8=-3/24 ve 7/12=14/24; toplam 11/24 olur."),
      "383": answer("Çözüm: Ortak payda 18'dir. 5/9=10/18 ve 1/6=3/18; fark 7/18 olur."),
      "385": answer("Çözüm: 7/12·(-8/35) işleminde 7 ile 35, 8 ile 12 sadeleşir; sonuç -2/15 olur."),
      "387": answer("Çözüm: Ortak payda 88'dir. -3/8=-33/88 ve x/11=8x/88; sonuç -(8x+33)/88 olur."),
      "389": answer("Çözüm: 10y/13·8/(15y)=80y/(195y). y'ler sadeleşir ve sonuç 16/39 olur; y sıfır olmamalıdır."),
      "391": answer("Çözüm: Pay (1/3)²=1/9, payda 5+2²=9 olur. (1/9)/9=1/81 bulunur."),
      "393": answer("Çözüm: Pay 3³-3²=27-9=18, payda (3/4)²=9/16 olur. 18÷9/16=32 olur."),
      "395": answer("Çözüm: (3/4)²=9/16 ve (5/8)²=25/64. 9/16÷25/64=36/25 olur."),
      "397": answer("Çözüm: Payda 1/4+1/3=7/12 olur. 5÷7/12=60/7 bulunur."),
      "399": answer("Çözüm: Pay 3/4+1/2=5/4, payda 5/6-2/3=1/6 olur. (5/4)÷(1/6)=15/2."),
      "401": answer("Çözüm: Pay 3/4-3/5=3/20, payda 1/4+2/5=13/20 olur. (3/20)÷(13/20)=3/13."),
      "403": answer("Çözüm: Önce çarpma yapılır: 2/5·3/4=3/10. Sonra 1/3+3/10=19/30 olur."),
      "405": answer("Çözüm: Önce bölme yapılır: 5/6÷1/12=10. Sonra 1-10=-9 olur."),
      "407": answer("Çözüm: Ortak payda 60'tır. 2/3=40/60, 1/4=15/60, 3/5=36/60; toplam 91/60 olur."),
      "409": answer("Çözüm: Ortak payda 40'tır. 2/5=16/40, 5/8=25/40, 3/4=30/40; sonuç 11/40 olur."),
      "411": answer("Çözüm: Parantez içi 15/16-5/6=45/48-40/48=5/48 olur. 8·5/48=5/6."),
      "413": answer("Çözüm: Pay 1/6+3/10=14/30 olur. (14/30)/(14/30)=1 bulunur."),
      "415": answer("Çözüm: İlk parantez 3/4+1/6=11/12, ikinci parantez 5/8-1/3=7/24 olur. 11/12÷7/24=22/7."),
      "417": answer("Çözüm: x yerine verilen değeri yazarız. ⓐ -1/6+2/3=1/2. ⓑ -5/3+2/3=-1."),
      "419": answer("Çözüm: ⓐ 11/12+(-11/12)=0. ⓑ 3/4+(-11/12)=9/12-11/12=-1/6."),
      "421": answer("Çözüm: x yerine verilen değeri yazarız ve 1/3 çıkarırız. ⓐ 2/3-1/3=1/3. ⓑ -2/3-1/3=-1."),
      "423": answer("Çözüm: w yerine verilen değeri yazarız. ⓐ 5/12-1/4=1/6. ⓑ 5/12-(-1/4)=2/3."),
      "425": answer("Çözüm: m=-2/5 için m²=4/25. 5·4/25·1/3=4/15 olur."),
      "427": answer("Çözüm: u²=9/16 ve v³=-1/8. 8·9/16·(-1/8)=-9/16 olur."),
      "429": answer("Çözüm: Önce payı hesaplarız: m+n=-6+(-2)=-8. Sonra paydaya böleriz: -8/4=-2 olur."),
      "431": answer("Çözüm: r-s=10-(-5)=15 ve r+s=10+(-5)=5. Sonuç 15/5=3 olur."),
      "433": answer("Çözüm: 1 1/4=5/4 ve 1 1/8=9/8. Toplam 10/8+9/8=19/8=2 3/8 su bardağı şekerdir."),
      "435": answer("Çözüm: Önce paydaların EKOK'unu buluruz. Bu sayı, kesirlerin en küçük ortak paydasıdır; sonra gerekirse kesirleri bu paydaya genişletiriz."),
    },
    exerciseSectionSlugs: {
      "317": "en-kucuk-ortak-paydayi-bulma",
      "319": "en-kucuk-ortak-paydayi-bulma",
      "321": "en-kucuk-ortak-paydayi-bulma",
      "323": "en-kucuk-ortak-paydayi-bulma",
      "325": "en-kucuk-ortak-paydayi-bulma",
      "327": "denk-kesirleri-ortak-paydayla-yazma",
      "329": "denk-kesirleri-ortak-paydayla-yazma",
      "331": "denk-kesirleri-ortak-paydayla-yazma",
      "333": "denk-kesirleri-ortak-paydayla-yazma",
      "335": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "337": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "339": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "341": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "343": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "345": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "347": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "349": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "351": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "353": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "355": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "357": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "359": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "361": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "363": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "365": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "367": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "369": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "371": "kesir-islemlerini-secme-ve-kullanma",
      "373": "kesir-islemlerini-secme-ve-kullanma",
      "375": "kesir-islemlerini-secme-ve-kullanma",
      "377": "kesir-islemlerini-secme-ve-kullanma",
      "381": "kesir-islemlerini-secme-ve-kullanma",
      "383": "kesir-islemlerini-secme-ve-kullanma",
      "385": "kesir-islemlerini-secme-ve-kullanma",
      "387": "kesir-islemlerini-secme-ve-kullanma",
      "389": "kesir-islemlerini-secme-ve-kullanma",
      "391": "karmasik-kesirlerde-islem-onceligi",
      "393": "karmasik-kesirlerde-islem-onceligi",
      "395": "karmasik-kesirlerde-islem-onceligi",
      "397": "karmasik-kesirlerde-islem-onceligi",
      "399": "karmasik-kesirlerde-islem-onceligi",
      "401": "karmasik-kesirlerde-islem-onceligi",
      "403": "karmasik-kesirlerde-islem-onceligi",
      "405": "karmasik-kesirlerde-islem-onceligi",
      "407": "karmasik-kesirlerde-islem-onceligi",
      "409": "karmasik-kesirlerde-islem-onceligi",
      "411": "karmasik-kesirlerde-islem-onceligi",
      "413": "karmasik-kesirlerde-islem-onceligi",
      "415": "karmasik-kesirlerde-islem-onceligi",
      "417": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "419": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "421": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "423": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "425": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "427": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "429": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "431": "kesirli-degerlerle-cebirsel-ifadeleri-hesaplama",
      "433": "farkli-paydali-kesirlerde-toplama-ve-cikarma",
      "435": "en-kucuk-ortak-paydayi-bulma",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.7",
    catalogLesson: {
      id: "lesson-mixed-number-addition-subtraction",
      slug: "karma-kesirlerde-toplama-cikarma",
      displayTitle: "Karma Kesirlerde Toplama ve Çıkarma",
      summary:
        "Karma kesirleri modelleyerek toplayıp çıkarın, gerektiğinde ödünç alma yapın ve farklı paydalı karma kesirlerle çalışın.",
      sortOrder: 6,
    },
    objectives: [
      "Ortak paydalı karma kesirlerin toplamını modelleyebileceksiniz.",
      "Ortak paydalı karma kesirleri toplayabileceksiniz.",
      "Karma kesirlerde çıkarmayı modelleyebileceksiniz.",
      "Ortak paydalı karma kesirleri çıkarabileceksiniz.",
      "Farklı paydalı karma kesirleri toplayıp çıkarabileceksiniz.",
    ],
    sectionTitles: {
      "Model Addition of Mixed Numbers with a Common Denominator":
        "Karma Kesir Toplamayı Modelleme",
      "Add Mixed Numbers": "Karma Kesirleri Toplama",
      "Model Subtraction of Mixed Numbers":
        "Karma Kesir Çıkarmayı Modelleme",
      "Subtract Mixed Numbers with a Common Denominator":
        "Ortak Paydalı Karma Kesirleri Çıkarma",
      "Add and Subtract Mixed Numbers with Different Denominators":
        "Farklı Paydalı Karma Kesirlerde Toplama ve Çıkarma",
    },
    tryItSolutions: {
      "Sıra Sizde 4.161": p(
        "Çözüm: Tam kısımlar 1+3=4, kesir kısımları 2/5+3/5=5/5=1 olur. Toplam 5'tir.",
      ),
      "Sıra Sizde 4.162": p(
        "Çözüm: Tam kısımlar 2+2=4, kesir kısımları 1/6+5/6=1 olur. Toplam 5'tir.",
      ),
      "Sıra Sizde 4.163": p(
        "Çözüm: Tam kısımlar 3 eder. Kesir kısımları 10/6=1 2/3 olduğu için toplam 4 2/3 olur.",
      ),
      "Sıra Sizde 4.164": p(
        "Çözüm: Tam kısımlar 2 eder. Kesir kısımları 12/8=1 1/2 olduğundan toplam 3 1/2 olur.",
      ),
      "Sıra Sizde 4.165": p(
        "Çözüm: Tam kısımlar 5, kesir kısımları 6/7 eder. Toplam 5 6/7'dir.",
      ),
      "Sıra Sizde 4.166": p(
        "Çözüm: Tam kısımlar 7, kesir kısımları 9/11 eder. Sonuç 7 9/11 olur.",
      ),
      "Sıra Sizde 4.167": p(
        "Çözüm: Tam kısımlar 15, kesir kısımları 12/8=1 1/2 eder. Toplam 16 1/2 olur.",
      ),
      "Sıra Sizde 4.168": p(
        "Çözüm: Tam kısımlar 14, kesir kısımları 12/9=1 1/3 eder. Toplam 15 1/3 olur.",
      ),
      "Sıra Sizde 4.169": p(
        "Çözüm: Bileşik kesre çevirsek de aynı sonuç çıkar: 5 5/9+3 7/9=9 1/3.",
      ),
      "Sıra Sizde 4.170": p(
        "Çözüm: Kesir kısımları 16/10=1 3/5 eder; tam kısımlarla birlikte sonuç 6 3/5 olur.",
      ),
      "Sıra Sizde 4.171": p(
        "Çözüm: 1 tamı 4/4 olarak düşünürüz. 4/4-1/4=3/4 kalır.",
      ),
      "Sıra Sizde 4.172": p(
        "Çözüm: 1 tamı 5/5 olarak parçalarız. 5/5-1/5=4/5 olur.",
      ),
      "Sıra Sizde 4.173": p(
        "Çözüm: 2 tamdan 1/5 çıkarılırsa bir tam ve 4/5 kalır. Sonuç 1 4/5'tir.",
      ),
      "Sıra Sizde 4.174": p(
        "Çözüm: 2 tamdan 1/3 çıkarılırsa bir tam ve 2/3 kalır. Sonuç 1 2/3 olur.",
      ),
      "Sıra Sizde 4.175": p(
        "Çözüm: 2-1 1/3 işleminde 2 tamdan 1 tam çıkarılır, sonra 1/3 çıkarılır. Kalan 2/3'tür.",
      ),
      "Sıra Sizde 4.176": p(
        "Çözüm: 2-1 1/4=1-1/4 olur. 1 tamı 4/4 yazınca kalan 3/4'tür.",
      ),
      "Sıra Sizde 4.177": p(
        "Çözüm: 1 1/3 içindeki 1 tamı 3/3 olarak ödünç alırız: 4/3-2/3=2/3.",
      ),
      "Sıra Sizde 4.178": p(
        "Çözüm: 1 1/5 sayısı 6/5'tir. 6/5-4/5=2/5 kalır.",
      ),
      "Sıra Sizde 4.179": p(
        "Çözüm: 6 4/9 sayısından 1 tam ödünç alınır: 5 13/9-3 7/9=2 6/9=2 2/3.",
      ),
      "Sıra Sizde 4.180": p(
        "Çözüm: 4 4/7 sayısını 3 11/7 olarak yazarız. 3 11/7-2 6/7=1 5/7 olur.",
      ),
      "Sıra Sizde 4.181": p(
        "Çözüm: Bileşik kesirle 6 4/9=58/9 ve 3 7/9=34/9. Fark 24/9=2 2/3 olur.",
      ),
      "Sıra Sizde 4.182": p(
        "Çözüm: 4 4/7=32/7 ve 2 6/7=20/7. Fark 12/7=1 5/7 olur.",
      ),
      "Sıra Sizde 4.183": p(
        "Çözüm: Ortak payda 12'dir. 1 10/12+4 9/12=5 19/12=6 7/12 olur.",
      ),
      "Sıra Sizde 4.184": p(
        "Çözüm: Ortak payda 10'dur. 3 8/10+8 5/10=11 13/10=12 3/10 olur.",
      ),
      "Sıra Sizde 4.185": p(
        "Çözüm: 8 1/2=8 5/10 ve 3 4/5=3 8/10. Ödünç alarak 7 15/10-3 8/10=4 7/10.",
      ),
      "Sıra Sizde 4.186": p(
        "Çözüm: Ortak payda 12'dir. 4 3/4=4 9/12 ve 1 5/6=1 10/12. Ödünç alınca sonuç 2 11/12 olur.",
      ),
      "Sıra Sizde 4.187": p(
        "Çözüm: Bileşik kesirlerle 1 3/4=14/8 ve 6 7/8=55/8. Fark -41/8=-5 1/8 olur.",
      ),
      "Sıra Sizde 4.188": p(
        "Çözüm: Ortak payda 63'tür. 10 3/7=657/63 ve 22 4/9=1414/63. Fark -757/63=-12 1/63 olur.",
      ),
    },
    exercisePrompts: {
      "437": tx("Toplayın: 2 1/3+1 1/3."),
      "439": tx("Toplayın: 1 5/6+1 5/6."),
      "441": tx("Toplayın: 2 4/9+5 1/9."),
      "443": tx("Toplayın: 7 9/10+3 1/10."),
      "445": tx("Toplayın: 9 2/3+1 2/3."),
      "447": tx("Toplayın: 8 4/9+2 8/9."),
      "449": tx("Model kullanarak farkı bulun ve modelinizi gösteren bir çizim düşünün: 1 1/8-5/8."),
      "451": tx("Farkı bulun: 2 7/12-1 5/12."),
      "453": tx("Farkı bulun: 19 13/15-13 7/15."),
      "455": tx("Farkı bulun: 5 2/9-3 4/9."),
      "457": tx("Farkı bulun: 2 5/12-1 7/12."),
      "459": tx("Toplamı ya da farkı sadeleştirilmiş karma kesir olarak yazın: 2 1/6+5 3/4."),
      "461": tx("Toplamı ya da farkı sadeleştirilmiş karma kesir olarak yazın: 7 2/3+8 1/2."),
      "463": tx("Toplamı ya da farkı sadeleştirilmiş karma kesir olarak yazın: 6 4/5-1 1/4."),
      "465": tx("Toplamı ya da farkı sadeleştirilmiş karma kesir olarak yazın: 2 7/8-4 1/3."),
      "467": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 1 2/3·4 1/6."),
      "469": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 2/9+5/9."),
      "471": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 2 3/10÷1/10."),
      "473": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 15 5/8-6 7/8."),
      "475": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 11/15-7/15."),
      "477": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 6-2/5."),
      "479": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 7/24÷14/3."),
      "481": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 8 5/13+4 9/13."),
      "483": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 2 5/6+4 1/5."),
      "485": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 5/12·8/9."),
      "487": tx("İşlemi yapın ve sonucu sadeleştirilmiş karma kesir olarak yazın: 6 5/9-4 2/5."),
      "489": tx("İşlemi yapın ve sonucu sadeleştirilmiş biçimde yazın: 4 3/8-3 2/3."),
      "491": tx("Pauline'in ceket dikmek için 3 1/4 yard kumaşı var. Ceket 2 2/3 yard kumaş kullanıyor. Ceketten sonra ne kadar kumaşı kalır?"),
      "493": tx("Tessa'nın aldığı fotoğraf 8 inç genişliğinde. Çerçeve fotoğrafın her iki yanında 2 5/8 inç genişlik ekliyor. Çerçeveli fotoğraf toplam kaç inç geniş olur?"),
      "495": tx("Edgar şehre gitmek için 3,75 dolar geçiş ücreti ödeyecek. ⓐ 10 dolarlık banknotunu yola çıkmadan nasıl bozdurursa tam ödeme yapabilir? ⓑ Bu durum 10-3 3/4 işlemiyle nasıl benzerdir?"),
      "497": tx("3 7/8-4 5/12 işlemini iki kez yapın: önce karma kesir olarak, sonra bileşik kesre çevirerek. Hangi yöntemi tercih edersiniz, neden?"),
    },
    exerciseAnswers: {
      "437": answer("Çözüm: Tam kısımlar 2+1=3, kesir kısımları 1/3+1/3=2/3 eder. Toplam 3 2/3 olur."),
      "439": answer("Çözüm: Tam kısımlar 2 eder, kesir kısımları 10/6=1 2/3 eder. Toplam 3 2/3 olur."),
      "441": answer("Çözüm: Tam kısımlar 7, kesir kısımları 5/9 eder. Sonuç 7 5/9'dur."),
      "443": answer("Çözüm: Tam kısımlar 10, kesir kısımları 10/10=1 eder. Toplam 11 olur."),
      "445": answer("Çözüm: Tam kısımlar 10, kesir kısımları 4/3=1 1/3 eder. Toplam 11 1/3 olur."),
      "447": answer("Çözüm: Tam kısımlar 10, kesir kısımları 12/9=1 1/3 eder. Toplam 11 1/3 olur."),
      "449": answer("Çözüm: 1 1/8 sayısı 9/8'dir. 9/8-5/8=4/8=1/2 kalır; modelde sekizde dört parça kalır."),
      "451": answer("Çözüm: Tam kısımlar farkı 1, kesir kısımları farkı 2/12 olur. 2/12=1/6, sonuç 1 1/6'dır."),
      "453": answer("Çözüm: Tam kısımlar 6, kesir kısımları 6/15 eder. 6/15=2/5 olduğundan sonuç 6 2/5 olur."),
      "455": answer("Çözüm: 5 2/9'dan 1 tam ödünç alırız: 4 11/9-3 4/9=1 7/9 olur."),
      "457": answer("Çözüm: 2 5/12 sayısını 1 17/12 olarak yazarız. 1 17/12-1 7/12=10/12=5/6 olur."),
      "459": answer("Çözüm: Ortak payda 12'dir. 2 2/12+5 9/12=7 11/12 olur."),
      "461": answer("Çözüm: Ortak payda 6'dır. 7 4/6+8 3/6=15 7/6=16 1/6 olur."),
      "463": answer("Çözüm: Ortak payda 20'dir. 6 16/20-1 5/20=5 11/20 olur."),
      "465": answer("Çözüm: Bileşik kesre çeviririz: 23/8-13/3=69/24-104/24=-35/24=-1 11/24 olur."),
      "467": answer("Çözüm: Karma kesirleri bileşik kesre çeviririz: 5/3·25/6=125/18=6 17/18 olur."),
      "469": answer("Çözüm: Paydalar aynı olduğu için payları toplarız. 2/9+5/9=7/9 olur."),
      "471": answer("Çözüm: 2 3/10=23/10. 23/10÷1/10=23/10·10=23 olur."),
      "473": answer("Çözüm: 15 5/8'den 1 tam ödünç alırız: 14 13/8-6 7/8=8 6/8=8 3/4 olur."),
      "475": answer("Çözüm: Paydalar aynı olduğu için 11-7=4 yazılır. Sonuç 4/15'tir."),
      "477": answer("Çözüm: 6 tamdan 2/5 çıkarırken 1 tamı 5/5 olarak ayırırız. Kalan 5 3/5 olur."),
      "479": answer("Çözüm: Bölme yerine ters kesirle çarparız: 7/24·3/14=21/336=1/16 olur."),
      "481": answer("Çözüm: Tam kısımlar 12, kesir kısımları 14/13=1 1/13 eder. Toplam 13 1/13 olur."),
      "483": answer("Çözüm: Ortak payda 30'dur. 2 25/30+4 6/30=6 31/30=7 1/30 olur."),
      "485": answer("Çözüm: Çarpma yapıp sadeleştiririz: 5/12·8/9=40/108=10/27 olur."),
      "487": answer("Çözüm: Ortak payda 45'tir. 6 25/45-4 18/45=2 7/45 olur."),
      "489": answer("Çözüm: Ortak payda 24'tür. 4 9/24-3 16/24 için ödünç alınır; sonuç 17/24 olur."),
      "491": answer("Çözüm: Kalan kumaş 3 1/4-2 2/3'tür. 13/4-8/3=39/12-32/12=7/12 yard kalır."),
      "493": answer("Çözüm: Çerçeve iki yanda 2 5/8 inç ekler. Toplam genişlik 8+2·2 5/8=8+5 1/4=13 1/4 inç olur."),
      "495": answer("Çözüm: Edgar 3 dolar ve 3 çeyrek dolar hazırlarsa 3,75 doları tam öder. Bu, 10-3 3/4 işleminde 10 tamdan 1 tamı 4/4 olarak bozup 9 4/4-3 3/4=6 1/4 bulmaya benzer."),
      "497": answer("Çözüm: Karma kesirle işlem yapmak için ortak payda 24 alınır; 3 21/24-4 10/24=-13/24 olur. Bileşik kesirle de 31/8-53/12=93/24-106/24=-13/24 bulunur. Bu örnekte bileşik kesir yöntemi daha nettir."),
    },
    exerciseSectionSlugs: {
      "437": "karma-kesir-toplamayi-modelleme",
      "439": "karma-kesir-toplamayi-modelleme",
      "441": "karma-kesirleri-toplama",
      "443": "karma-kesirleri-toplama",
      "445": "karma-kesirleri-toplama",
      "447": "karma-kesirleri-toplama",
      "449": "karma-kesir-cikarmayi-modelleme",
      "451": "ortak-paydali-karma-kesirleri-cikarma",
      "453": "ortak-paydali-karma-kesirleri-cikarma",
      "455": "ortak-paydali-karma-kesirleri-cikarma",
      "457": "ortak-paydali-karma-kesirleri-cikarma",
      "459": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "461": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "463": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "465": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "467": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "469": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "471": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "473": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "475": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "477": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "479": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "481": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "483": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "485": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "487": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "489": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "491": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "493": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "495": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
      "497": "farkli-paydali-karma-kesirlerde-toplama-ve-cikarma",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "kesirler",
    sourceNumber: "4.8",
    catalogLesson: {
      id: "lesson-fraction-equations",
      slug: "kesirli-denklemleri-cozme",
      displayTitle: "Kesirli Denklemleri Çözme",
      summary:
        "Kesirli değerlerin denklemin çözümü olup olmadığını kontrol edin, eşitliğin özellikleriyle kesirli denklemleri çözün ve sözel cümleleri denkleme çevirin.",
      sortOrder: 7,
    },
    objectives: [
      "Bir kesrin denklemin çözümü olup olmadığını belirleyebileceksiniz.",
      "Kesirli denklemleri toplama, çıkarma, bölme ve çarpma özellikleriyle çözebileceksiniz.",
      "Eksi bir ve kesir katsayılı denklemleri çözebileceksiniz.",
      "Sözel cümleleri denkleme çevirip çözebileceksiniz.",
    ],
    sectionTitles: {
      "Determine Whether a Fraction is a Solution of an Equation":
        "Kesirli Çözümleri Denklemlerde Kontrol Etme",
      "Solve Equations with Fractions using the Addition, Subtraction, and Division Properties of Equality":
        "Kesirli Denklemleri Toplama, Çıkarma ve Bölme ile Çözme",
      "Solve Equations with Fractions Using the Multiplication Property of Equality":
        "Denklemleri Çarpma Özelliğiyle Çözme",
      "Solve Equations with a Coefficient of −1−1":
        "Eksi Bir Katsayılı Denklemleri Çözme",
      "Solve Equations with a Fraction Coefficient":
        "Kesir Katsayılı Denklemleri Çözme",
      "Translate Sentences to Equations and Solve":
        "Cümleleri Denkleme Çevirme ve Çözme",
    },
    tryItSolutions: {
      "Sıra Sizde 4.189": p(
        "Çözüm: x=1 için sol taraf 1/3 olur, çözüm değildir. x=5/6 için 5/6-2/3=1/6 olur, çözümdür. x=-5/6 çözüm değildir.",
      ),
      "Sıra Sizde 4.190": p(
        "Çözüm: y=1 ve y=-5/8 denklemi doğru yapmaz. y=5/8 için 5/8-1/4=3/8 olduğu için çözüm 5/8'dir.",
      ),
      "Sıra Sizde 4.191": p(
        "Çözüm: Her iki taraftan 11/12 çıkarırız. y=5/12-11/12=-6/12=-1/2 olur.",
      ),
      "Sıra Sizde 4.192": p(
        "Çözüm: Her iki taraftan 8/15 çıkarılır. y=4/15-8/15=-4/15 bulunur.",
      ),
      "Sıra Sizde 4.193": p(
        "Çözüm: Her iki tarafa 3/5 ekleriz. a=-8/5+3/5=-5/5=-1 olur.",
      ),
      "Sıra Sizde 4.194": p(
        "Çözüm: Her iki tarafa 3/7 eklenir. n=-9/7+3/7=-6/7 olur.",
      ),
      "Sıra Sizde 4.195": p(
        "Çözüm: Her iki taraf 12'ye bölünür. u=-76/12=-19/3 olur.",
      ),
      "Sıra Sizde 4.196": p(
        "Çözüm: Her iki taraf 8'e bölünür. m=92/8=23/2 olur.",
      ),
      "Sıra Sizde 4.197": p(
        "Çözüm: Her iki taraf 5 ile çarpılır. f=-25·5=-125 olur.",
      ),
      "Sıra Sizde 4.198": p(
        "Çözüm: Her iki taraf 9 ile çarpılır. h=-27·9=-243 bulunur.",
      ),
      "Sıra Sizde 4.199": p(
        "Çözüm: Her iki taraf -7 ile çarpılır. c=(-35)(-7)=245 olur.",
      ),
      "Sıra Sizde 4.200": p(
        "Çözüm: Her iki taraf -11 ile çarpılır. x=(-12)(-11)=132 olur.",
      ),
      "Sıra Sizde 4.201": p(
        "Çözüm: -y=48 ise y bu sayının ters işaretlisidir. y=-48 olur.",
      ),
      "Sıra Sizde 4.202": p(
        "Çözüm: -c=-23 denkleminin iki tarafını -1 ile çarparız. c=23 olur.",
      ),
      "Sıra Sizde 4.203": p(
        "Çözüm: (2/5)n=14 denkleminde her iki tarafı 5/2 ile çarparız. n=35 olur.",
      ),
      "Sıra Sizde 4.204": p(
        "Çözüm: (5/6)y=15 denkleminde her iki tarafı 6/5 ile çarparız. y=18 olur.",
      ),
      "Sıra Sizde 4.205": p(
        "Çözüm: (-4/7)a=52 olduğundan her iki tarafı -7/4 ile çarparız. a=-91 olur.",
      ),
      "Sıra Sizde 4.206": p(
        "Çözüm: (-7/9)w=84 olduğundan her iki tarafı -9/7 ile çarparız. w=-108 olur.",
      ),
      "Sıra Sizde 4.207": p(
        "Çözüm: n/7=-21 denklemini yazarız. Her iki tarafı 7 ile çarpınca n=-147 olur.",
      ),
      "Sıra Sizde 4.208": p(
        "Çözüm: n/8=-56 denklemini çözeriz. Her iki tarafı 8 ile çarpınca n=-448 olur.",
      ),
      "Sıra Sizde 4.209": p(
        "Çözüm: q/(-8)=72 denklemi kurulur. Her iki tarafı -8 ile çarpınca q=-576 olur.",
      ),
      "Sıra Sizde 4.210": p(
        "Çözüm: p/(-9)=81 denklemi kurulur. Her iki tarafı -9 ile çarpınca p=-729 olur.",
      ),
      "Sıra Sizde 4.211": p(
        "Çözüm: (2/5)f=16 denklemi kurulur. 5/2 ile çarparız ve f=40 buluruz.",
      ),
      "Sıra Sizde 4.212": p(
        "Çözüm: (3/4)f=21 denklemi kurulur. 4/3 ile çarparız ve f=28 olur.",
      ),
      "Sıra Sizde 4.213": p(
        "Çözüm: n/(2/3)=5/12 denklemi için n=(5/12)(2/3)=5/18 olur.",
      ),
      "Sıra Sizde 4.214": p(
        "Çözüm: c/(3/8)=4/9 denklemi için c=(4/9)(3/8)=1/6 olur.",
      ),
      "Sıra Sizde 4.215": p(
        "Çözüm: 5/8+x=1/4 denklemi kurulur. x=1/4-5/8=-3/8 olur.",
      ),
      "Sıra Sizde 4.216": p(
        "Çözüm: 1 3/4-x=5/6 denklemi kurulur. 7/4-x=5/6 olduğundan x=11/12 olur.",
      ),
    },
    exercisePrompts: {
      "499": tx("Verilen değerlerden hangilerinin denklemin çözümü olduğunu belirleyin: y-1/3=5/12; ⓐ y=1 ⓑ y=3/4 ⓒ y=-3/4."),
      "501": tx("Verilen değerlerden hangilerinin denklemin çözümü olduğunu belirleyin: k+2/5=5/6; ⓐ k=1 ⓑ k=13/30 ⓒ k=-13/30."),
      "503": tx("Denklemi çözün: m+3/8=7/8."),
      "505": tx("Denklemi çözün: h+5/6=1/6."),
      "507": tx("Denklemi çözün: c-1/4=-5/4."),
      "509": tx("Denklemi çözün: z-(-5/12)=-7/12."),
      "511": tx("Denklemi çözün: p-3/10=5/8."),
      "513": tx("Denklemi çözün: k+(-1/3)=-4/5."),
      "515": tx("Denklemi çözün: 7k=18."),
      "517": tx("Denklemi çözün: -9v=33."),
      "519": tx("Denklemi çözün: b/3=-9."),
      "521": tx("Denklemi çözün: x/8=-32."),
      "523": tx("Denklemi çözün: q/(-4)=-40."),
      "525": tx("Denklemi çözün: s/(-15)=-3."),
      "527": tx("Denklemi çözün: -y=42."),
      "529": tx("Denklemi çözün: -k=-17/20."),
      "531": tx("Denklemi çözün: (3/10)p=30."),
      "533": tx("Denklemi çözün: (5/2)m=-40."),
      "535": tx("Denklemi çözün: -(3/7)b=9."),
      "537": tx("Denklemi çözün: -(5/12)v=-15."),
      "539": tx("Denklemi çözün: 8y=0."),
      "541": tx("Denklemi çözün: 7g=7/9."),
      "543": tx("Denklemi çözün: q+5/6=1/12."),
      "545": tx("Denklemi çözün: (1/4)n=7/10."),
      "547": tx("Denklemi çözün: -2/3=y+3/8."),
      "549": tx("Denklemi çözün: 8/15=-d."),
      "551": tx("Cümleyi denkleme çevirip çözün: n'nin 6'ya bölümü -24'tür."),
      "553": tx("Cümleyi denkleme çevirip çözün: m'nin -7'ye bölümü -8'dir."),
      "555": tx("Cümleyi denkleme çevirip çözün: f ile -4'ün bölümü -20'dir."),
      "557": tx("Cümleyi denkleme çevirip çözün: g'nin 9'a bölümü 14'tür."),
      "559": tx("Cümleyi denkleme çevirip çözün: q'nun 2/5'i 20'dir."),
      "561": tx("Cümleyi denkleme çevirip çözün: p'nin 4/9'u -28'dir."),
      "563": tx("Cümleyi denkleme çevirip çözün: h'nin 2'ye bölümü 43'tür."),
      "565": tx("Cümleyi denkleme çevirip çözün: a'nın 2/3'e bölümü 3/4'tür."),
      "567": tx("Cümleyi denkleme çevirip çözün: 3/4 ile x'in toplamı 1/8'dir."),
      "569": tx("Cümleyi denkleme çevirip çözün: y ile 1/3'ün farkı -1/6'dır."),
      "571": tx("Bir çocuk oyun evindeki masa, yetişkin boy masanın 3/5'i kadardır. Çocuk masasının yüksekliği 18 inçtir. (3/5)h=18 denklemini çözerek yetişkin masasının yüksekliğini bulun."),
      "573": tx("Richard, (3/4)x=24 denkleminin çözümünün 16 olduğunu düşünüyor. Neden yanlış düşündüğünü açıklayın."),
    },
    exerciseAnswers: {
      "499": answer("Çözüm: y=1 denklemi sağlamaz. y=3/4 için 3/4-1/3=9/12-4/12=5/12 olur; çözüm 3/4'tür. y=-3/4 çözüm değildir."),
      "501": answer("Çözüm: k=13/30 için 13/30+2/5=13/30+12/30=25/30=5/6 olur. Bu yüzden doğru seçenek 13/30'dur; diğerleri denklemi sağlamaz."),
      "503": answer("Çözüm: Her iki taraftan 3/8 çıkarırız. m=7/8-3/8=4/8=1/2 olur."),
      "505": answer("Çözüm: Her iki taraftan 5/6 çıkarılır. h=1/6-5/6=-4/6=-2/3 olur."),
      "507": answer("Çözüm: Her iki tarafa 1/4 ekleriz. c=-5/4+1/4=-4/4=-1 olur."),
      "509": answer("Çözüm: z-(-5/12)=z+5/12 demektir. z=-7/12-5/12=-12/12=-1 olur."),
      "511": answer("Çözüm: Her iki tarafa 3/10 ekleriz. p=5/8+3/10=25/40+12/40=37/40 olur."),
      "513": answer("Çözüm: k-1/3=-4/5 olduğundan her iki tarafa 1/3 ekleriz. k=-4/5+1/3=-7/15 olur."),
      "515": answer("Çözüm: Her iki tarafı 7'ye böleriz. k=18/7 olur."),
      "517": answer("Çözüm: Her iki tarafı -9'a böleriz. v=33/(-9)=-11/3 olur."),
      "519": answer("Çözüm: b/3=-9 denkleminin iki tarafını 3 ile çarparız. b=-27 olur."),
      "521": answer("Çözüm: x/8=-32 denkleminin iki tarafını 8 ile çarparız. x=-256 olur."),
      "523": answer("Çözüm: q/(-4)=-40 denkleminin iki tarafını -4 ile çarparız. q=160 olur."),
      "525": answer("Çözüm: s/(-15)=-3 denkleminin iki tarafını -15 ile çarparız. s=45 olur."),
      "527": answer("Çözüm: -y=42 ise y'nin karşıtı 42'dir. İki tarafı -1 ile çarparız ve y=-42 buluruz."),
      "529": answer("Çözüm: -k=-17/20 denkleminin iki tarafını -1 ile çarparız. k=17/20 olur."),
      "531": answer("Çözüm: (3/10)p=30 denkleminde her iki tarafı 10/3 ile çarparız. p=100 olur."),
      "533": answer("Çözüm: (5/2)m=-40 denkleminde her iki tarafı 2/5 ile çarparız. m=-16 olur."),
      "535": answer("Çözüm: -(3/7)b=9 denkleminde her iki tarafı -7/3 ile çarparız. b=-21 olur."),
      "537": answer("Çözüm: -(5/12)v=-15 denkleminde her iki tarafı -12/5 ile çarparız. v=36 olur."),
      "539": answer("Çözüm: 8y=0 denkleminin iki tarafını 8'e böleriz. y=0 olur."),
      "541": answer("Çözüm: 7g=7/9 denkleminin iki tarafını 7'ye böleriz. g=1/9 olur."),
      "543": answer("Çözüm: Her iki taraftan 5/6 çıkarırız. q=1/12-5/6=1/12-10/12=-3/4 olur."),
      "545": answer("Çözüm: (1/4)n=7/10 denkleminin iki tarafını 4 ile çarparız. n=28/10=14/5 olur."),
      "547": answer("Çözüm: y'yi yalnız bırakmak için 3/8 çıkarırız. y=-2/3-3/8=-16/24-9/24=-25/24 olur."),
      "549": answer("Çözüm: 8/15=-d ise d, 8/15'in ters işaretlisidir. İki tarafı -1 ile çarpınca d=-8/15 olur."),
      "551": answer("Çözüm: Cümle n/6=-24 denklemini verir. Her iki tarafı 6 ile çarparız ve n=-144 buluruz."),
      "553": answer("Çözüm: Cümle m/(-7)=-8 denklemini verir. Her iki tarafı -7 ile çarparız ve m=56 olur."),
      "555": answer("Çözüm: Bölüm f/(-4)=-20 olarak yazılır. Her iki tarafı -4 ile çarpınca f=80 olur."),
      "557": answer("Çözüm: Cümle g/9=14 denklemini verir. Her iki tarafı 9 ile çarparız ve g=126 olur."),
      "559": answer("Çözüm: q'nun 2/5'i 20 ise (2/5)q=20. Her iki tarafı 5/2 ile çarparız; q=50 olur."),
      "561": answer("Çözüm: p'nin 4/9'u -28 ise (4/9)p=-28. Her iki tarafı 9/4 ile çarparız; p=-63 olur."),
      "563": answer("Çözüm: Cümle h/2=43 denklemini verir. Her iki tarafı 2 ile çarparız ve h=86 olur."),
      "565": answer("Çözüm: Cümle a/(2/3)=3/4 denklemini verir. a=(3/4)(2/3)=1/2 olur."),
      "567": answer("Çözüm: Cümle 3/4+x=1/8 denklemini verir. x=1/8-3/4=1/8-6/8=-5/8 olur."),
      "569": answer("Çözüm: Cümle y-1/3=-1/6 denklemini verir. Her iki tarafa 1/3 ekleyince y=1/6 olur."),
      "571": answer("Çözüm: (3/5)h=18 denklemini 5/3 ile çarparız. h=18·5/3=30; yetişkin masası 30 inçtir."),
      "573": answer("Çözüm: x=16 yazılırsa (3/4)·16=12 olur, 24 değildir. Doğru çözüm için iki tarafı 4/3 ile çarparız: x=32."),
    },
    exerciseSectionSlugs: {
      "499": "kesirli-cozumleri-denklemlerde-kontrol-etme",
      "501": "kesirli-cozumleri-denklemlerde-kontrol-etme",
      "503": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "505": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "507": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "509": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "511": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "513": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "515": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "517": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "519": "denklemleri-carpma-ozelligiyle-cozme",
      "521": "denklemleri-carpma-ozelligiyle-cozme",
      "523": "denklemleri-carpma-ozelligiyle-cozme",
      "525": "denklemleri-carpma-ozelligiyle-cozme",
      "527": "eksi-bir-katsayili-denklemleri-cozme",
      "529": "eksi-bir-katsayili-denklemleri-cozme",
      "531": "kesir-katsayili-denklemleri-cozme",
      "533": "kesir-katsayili-denklemleri-cozme",
      "535": "kesir-katsayili-denklemleri-cozme",
      "537": "kesir-katsayili-denklemleri-cozme",
      "539": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "541": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "543": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "545": "kesir-katsayili-denklemleri-cozme",
      "547": "kesirli-denklemleri-toplama-cikarma-ve-bolme-ile-cozme",
      "549": "eksi-bir-katsayili-denklemleri-cozme",
      "551": "cumleleri-denkleme-cevirme-ve-cozme",
      "553": "cumleleri-denkleme-cevirme-ve-cozme",
      "555": "cumleleri-denkleme-cevirme-ve-cozme",
      "557": "cumleleri-denkleme-cevirme-ve-cozme",
      "559": "cumleleri-denkleme-cevirme-ve-cozme",
      "561": "cumleleri-denkleme-cevirme-ve-cozme",
      "563": "cumleleri-denkleme-cevirme-ve-cozme",
      "565": "cumleleri-denkleme-cevirme-ve-cozme",
      "567": "cumleleri-denkleme-cevirme-ve-cozme",
      "569": "cumleleri-denkleme-cevirme-ve-cozme",
      "571": "cumleleri-denkleme-cevirme-ve-cozme",
      "573": "kesir-katsayili-denklemleri-cozme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "ondalik-sayilar",
    sourceNumber: "5.2",
    catalogLesson: {
      id: "lesson-decimals",
      slug: "ondalik-sayilar",
      displayTitle: "Ondalık Sayılar",
      summary:
        "Ondalık sayıları okuyup yazın, kesre ya da karma kesre dönüştürün, sayı doğrusunda gösterin, sıralayın ve yuvarlayın.",
      sortOrder: 1,
    },
    objectives: [
      "Ondalık sayıları okuyabileceksiniz.",
      "Ondalık sayıları yazabileceksiniz.",
      "Ondalık sayıları kesre ya da karma kesre dönüştürebileceksiniz.",
      "Ondalık sayıları sayı doğrusunda gösterebileceksiniz.",
      "Ondalık sayıları sıralayabileceksiniz.",
      "Ondalık sayıları yuvarlayabileceksiniz.",
    ],
    sectionTitles: {
      "Name Decimals": "Ondalık Sayıları Okuma",
      "Write Decimals": "Ondalık Sayıları Yazma",
      "Convert Decimals to Fractions or Mixed Numbers":
        "Ondalık Sayıları Kesre Dönüştürme",
      "Locate Decimals on the Number Line":
        "Ondalık Sayıları Sayı Doğrusunda Gösterme",
      "Order Decimals": "Ondalık Sayıları Sıralama",
      "Round Decimals": "Ondalık Sayıları Yuvarlama",
    },
    tryItSolutions: {
      "Sıra Sizde 5.1": p(
        "Çözüm: 6,7 altı tam onda yedi; 19,58 on dokuz tam yüzde elli sekiz; 0,018 binde on sekiz; -2,053 eksi iki tam binde elli üç diye okunur.",
      ),
      "Sıra Sizde 5.2": p(
        "Çözüm: 5,8 beş tam onda sekiz; 3,57 üç tam yüzde elli yedi; 0,005 binde beş; -13,461 eksi on üç tam binde dört yüz altmış bir diye okunur.",
      ),
      "Sıra Sizde 5.3": p(
        "Çözüm: On üç tam yüzde altmış sekiz, ondalık gösterimde 13,68 olarak yazılır.",
      ),
      "Sıra Sizde 5.4": p(
        "Çözüm: Beş tam binde sekiz yüz doksan dört, 5,894 olarak yazılır.",
      ),
      "Sıra Sizde 5.5": p(
        "Çözüm: Elli sekiz binde, 0,058 olarak yazılır; binde basamağı için üç ondalık yer kullanılır.",
      ),
      "Sıra Sizde 5.6": p(
        "Çözüm: Altmış yedi binde, 0,067 olarak yazılır.",
      ),
      "Sıra Sizde 5.7": p(
        "Çözüm: 5,3=5 3/10, 6,07=6 7/100 ve -0,234=-234/1000=-117/500 olur.",
      ),
      "Sıra Sizde 5.8": p(
        "Çözüm: 8,7=8 7/10, 1,03=1 3/100 ve -0,024=-24/1000=-3/125 olur.",
      ),
      "Sıra Sizde 5.9": p(
        "Çözüm: 0,6 sayısı 0 ile 1 arasında, onda altı noktasındadır.",
      ),
      "Sıra Sizde 5.10": p(
        "Çözüm: 0,9 sayısı 0 ile 1 arasında, 1'e yakın olan onda dokuz noktasındadır.",
      ),
      "Sıra Sizde 5.11": p(
        "Çözüm: -0,63 sayısı -0,6 ile -0,7 arasındadır; -0,63, -0,6'nın biraz solundadır.",
      ),
      "Sıra Sizde 5.12": p(
        "Çözüm: -0,25 sayısı 0 ile -1 arasında, -0,2 ile -0,3 arasındaki çeyrek noktadadır.",
      ),
      "Sıra Sizde 5.13": p(
        "Çözüm: 0,42>0,4 çünkü 0,42=0,420 ve 0,420>0,400. Ayrıca 0,76>0,706.",
      ),
      "Sıra Sizde 5.14": p(
        "Çözüm: 0,1<0,18 çünkü 0,100<0,180. Ayrıca 0,305<0,35 çünkü 0,305<0,350.",
      ),
      "Sıra Sizde 5.15": p(
        "Çözüm: Negatif sayılarda sıfıra daha yakın olan daha büyüktür. Bu yüzden -0,3>-0,5.",
      ),
      "Sıra Sizde 5.16": p(
        "Çözüm: -0,6, sayı doğrusunda -0,7'nin sağındadır; bu nedenle -0,6>-0,7.",
      ),
      "Sıra Sizde 5.17": p(
        "Çözüm: 1,047 sayısını yüzde birler basamağına yuvarlarken binde birler basamağı 7 olduğu için 1,05 olur.",
      ),
      "Sıra Sizde 5.18": p(
        "Çözüm: 9,173 sayısında binde birler basamağı 3'tür. Yüzde birler basamağı değişmez; sonuç 9,17 olur.",
      ),
      "Sıra Sizde 5.19": p(
        "Çözüm: 6,582 en yakın yüzde birliğe 6,58; en yakın onda birliğe 6,6; en yakın tam sayıya 7 olur.",
      ),
      "Sıra Sizde 5.20": p(
        "Çözüm: 15,2175 en yakın binde birliğe 15,218; en yakın yüzde birliğe 15,22; en yakın onda birliğe 15,2 olur.",
      ),
    },
    exercisePrompts: {
      "1": tx("Ondalık sayıyı okuyun: 5,5."),
      "3": tx("Ondalık sayıyı okuyun: 5,01."),
      "5": tx("Ondalık sayıyı okuyun: 8,71."),
      "7": tx("Ondalık sayıyı okuyun: 0,002."),
      "9": tx("Ondalık sayıyı okuyun: 0,381."),
      "11": tx("Ondalık sayıyı okuyun: -17,9."),
      "13": tx("Verilen adı ondalık sayı olarak yazın: sekiz tam yüzde üç."),
      "15": tx("Verilen adı ondalık sayı olarak yazın: yirmi dokuz tam yüzde seksen bir."),
      "17": tx("Verilen adı ondalık sayı olarak yazın: onda yedi."),
      "19": tx("Verilen adı ondalık sayı olarak yazın: binde bir."),
      "21": tx("Verilen adı ondalık sayı olarak yazın: binde yirmi dokuz."),
      "23": tx("Verilen adı ondalık sayı olarak yazın: eksi on bir tam on binde dokuz."),
      "25": tx("Verilen adı ondalık sayı olarak yazın: on üç tam on binde üç yüz doksan beş."),
      "27": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 1,99."),
      "29": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 15,7."),
      "31": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 0,239."),
      "33": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 0,13."),
      "35": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 0,011."),
      "37": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: -0,00007."),
      "39": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 6,4."),
      "41": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 7,05."),
      "43": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 4,006."),
      "45": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 10,25."),
      "47": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 1,324."),
      "49": tx("Ondalık sayıyı kesre ya da karma kesre dönüştürün: 14,125."),
      "51": tx("Sayıyı sayı doğrusunda gösterin: 0,8."),
      "53": tx("Sayıyı sayı doğrusunda gösterin: -0,2."),
      "55": tx("Sayıyı sayı doğrusunda gösterin: 3,1."),
      "57": tx("Sayıyı sayı doğrusunda gösterin: -2,5."),
      "59": tx("< ya da > kullanarak sıralayın: 0,9 __ 0,6."),
      "61": tx("< ya da > kullanarak sıralayın: 0,37 __ 0,63."),
      "63": tx("< ya da > kullanarak sıralayın: 0,6 __ 0,59."),
      "65": tx("< ya da > kullanarak sıralayın: 0,91 __ 0,901."),
      "67": tx("< ya da > kullanarak sıralayın: -0,5 __ -0,3."),
      "69": tx("< ya da > kullanarak sıralayın: -0,62 __ -0,619."),
      "71": tx("Sayıyı en yakın onda birliğe yuvarlayın: 0,67."),
      "73": tx("Sayıyı en yakın onda birliğe yuvarlayın: 2,84."),
      "75": tx("Sayıyı en yakın yüzde birliğe yuvarlayın: 0,845."),
      "77": tx("Sayıyı en yakın yüzde birliğe yuvarlayın: 5,7932."),
      "79": tx("Sayıyı en yakın yüzde birliğe yuvarlayın: 0,299."),
      "81": tx("Sayıyı en yakın yüzde birliğe yuvarlayın: 4,098."),
      "83": tx("5,781 sayısını ⓐ en yakın yüzde birliğe ⓑ en yakın onda birliğe ⓒ en yakın tam sayıya yuvarlayın."),
      "85": tx("63,479 sayısını ⓐ en yakın yüzde birliğe ⓑ en yakın onda birliğe ⓒ en yakın tam sayıya yuvarlayın."),
      "87": tx("Danny'nin yıllık maaşı 58.965,95 dolar oldu. Bu sayıyı ⓐ en yakın dolara ⓑ en yakın bin dolara ⓒ en yakın on bin dolara yuvarlayın."),
      "89": tx("Hyo Jin 1.624,99 dolarlık bir buzdolabı aldı. Satış vergisi 142,186625 dolar çıktı. Vergiyi ⓐ en yakın sente ⓑ en yakın dolara yuvarlayın."),
      "91": tx("Para birimleriyle ilgili bilginiz ondalık sayıları öğrenmenize nasıl yardım eder?"),
      "93": tx("Jim 100 metreyi 12,32 saniyede, Tim aynı yarışı 12,3 saniyede koştu. Kim daha hızlıdır? Nasıl anlarsınız?"),
    },
    exerciseAnswers: {
      "1": answer("Çözüm: 5,5 sayısı beş tam onda beş diye okunur."),
      "3": answer("Çözüm: 5,01 sayısı beş tam yüzde bir diye okunur; 1 yüzde birler basamağındadır."),
      "5": answer("Çözüm: 8,71 sayısı sekiz tam yüzde yetmiş bir diye okunur."),
      "7": answer("Çözüm: 0,002 sayısı binde iki diye okunur."),
      "9": answer("Çözüm: 0,381 sayısı binde üç yüz seksen bir diye okunur."),
      "11": answer("Çözüm: -17,9 sayısı eksi on yedi tam onda dokuz diye okunur."),
      "13": answer("Çözüm: Yüzde üç, virgülden sonra iki basamak ister. Bu nedenle sayı 8,03'tür."),
      "15": answer("Çözüm: Yirmi dokuz tam yüzde seksen bir, ondalık gösterimde 29,81 olur."),
      "17": answer("Çözüm: Onda yedi, virgülden sonra tek basamakla 0,7 olarak yazılır."),
      "19": answer("Çözüm: Binde bir, virgülden sonra üç basamak gerektirir; sayı 0,001'dir."),
      "21": answer("Çözüm: Binde yirmi dokuz, 29/1000 demektir. Ondalık gösterimi 0,029 olur."),
      "23": answer("Çözüm: On binde dokuz, 0,0009'dur. Eksi on bir tam ile birlikte sayı -11,0009 olur."),
      "25": answer("Çözüm: On binde üç yüz doksan beş, 0,0395'tir. On üç tam ile birlikte 13,0395 yazılır."),
      "27": answer("Çözüm: 1,99 sayısında 99 yüzde birlik vardır. Bu yüzden 1,99=1 99/100 olur."),
      "29": answer("Çözüm: 15,7 sayısında 7 onda birlik vardır. Sonuç 15 7/10'dur."),
      "31": answer("Çözüm: 0,239 binde 239 demektir. Kesir olarak 239/1000 yazılır ve sadeleşmez."),
      "33": answer("Çözüm: 0,13 yüzde 13 demektir. Kesir olarak 13/100 olur."),
      "35": answer("Çözüm: 0,011 binde 11 demektir. Kesir olarak 11/1000 yazılır."),
      "37": answer("Çözüm: -0,00007 sayısı yüz binde 7'nin negatifidir. Kesir olarak -7/100000 olur."),
      "39": answer("Çözüm: 6,4=6 4/10 olur. 4/10 sadeleşip 2/5 olduğundan sonuç 6 2/5'tir."),
      "41": answer("Çözüm: 7,05=7 5/100 olur. 5/100=1/20, sonuç 7 1/20'dir."),
      "43": answer("Çözüm: 4,006=4 6/1000 olur. 6/1000=3/500, sonuç 4 3/500'dür."),
      "45": answer("Çözüm: 10,25=10 25/100 olur. 25/100=1/4, sonuç 10 1/4'tür."),
      "47": answer("Çözüm: 1,324=1 324/1000 olur. 324/1000=81/250, sonuç 1 81/250'dir."),
      "49": answer("Çözüm: 14,125=14 125/1000 olur. 125/1000=1/8, sonuç 14 1/8'dir."),
      "51": answer("Çözüm: 0,8 sayısı 0 ile 1 arasında, onda sekiz noktasındadır."),
      "53": answer("Çözüm: -0,2 sayısı 0'ın solunda, -1'e giderken onda iki noktasındadır."),
      "55": answer("Çözüm: 3,1 sayısı 3 ile 4 arasında, 3'ten bir onda bir sağdadır."),
      "57": answer("Çözüm: -2,5 sayısı -2 ile -3'ün tam ortasındadır."),
      "59": answer("Çözüm: 0,9, 0,6'dan büyüktür. Bu nedenle 0,9>0,6 yazılır."),
      "61": answer("Çözüm: Yüzde birlikleri karşılaştırırız: 37<63 olduğundan 0,37<0,63 olur."),
      "63": answer("Çözüm: 0,6 sayısını 0,60 gibi düşünebiliriz. 0,60>0,59 olduğu için 0,6>0,59 olur."),
      "65": answer("Çözüm: 0,91=0,910 olarak yazılabilir. 0,910>0,901 olduğundan 0,91>0,901 olur."),
      "67": answer("Çözüm: Negatif sayılarda sıfıra daha yakın olan daha büyüktür. -0,5, -0,3'ün solunda olduğu için -0,5<-0,3 olur."),
      "69": answer("Çözüm: -0,62=-0,620 olarak yazılır. -0,620, -0,619'dan daha küçüktür; bu yüzden -0,62<-0,619 olur."),
      "71": answer("Çözüm: En yakın onda birlik için yüzde birlik basamağına bakarız. 7 olduğu için 0,67 sayısı 0,7'ye yuvarlanır."),
      "73": answer("Çözüm: En yakın onda birlik için yüzde birlik basamağı 4'tür. 2,84 sayısı 2,8'e yuvarlanır."),
      "75": answer("Çözüm: En yakın yüzde birlik için binde birlik basamağı 5'tir. 0,845 sayısı 0,85'e yuvarlanır."),
      "77": answer("Çözüm: 5,7932 sayısında binde birlik basamağı 3'tür. En yakın yüzde birlik 5,79 olur."),
      "79": answer("Çözüm: 0,299 sayısında binde birlik basamağı 9'dur. 0,29 yukarı yuvarlanır ve 0,30 olur."),
      "81": answer("Çözüm: 4,098 sayısında binde birlik basamağı 8'dir. 4,09 yukarı yuvarlanır ve 4,10 olur."),
      "83": answer("Çözüm: 5,781 en yakın yüzde birliğe 5,78; en yakın onda birliğe 5,8; en yakın tam sayıya 6 olur."),
      "85": answer("Çözüm: 63,479 en yakın yüzde birliğe 63,48; en yakın onda birliğe 63,5; en yakın tam sayıya 63 olur."),
      "87": answer("Çözüm: 58.965,95 dolar en yakın dolara 58.966; en yakın bin dolara 59.000; en yakın on bin dolara 60.000 dolar olur."),
      "89": answer("Çözüm: 142,186625 dolar en yakın sente 142,19 dolar olur. En yakın dolara yuvarlanınca 142 dolar bulunur."),
      "91": answer("Çözüm: Para biriminde 1 dolar 100 sente ayrılır. Bu, 0,01'in yüzde bir olduğunu ve ondalık basamakların kesirlerle ilişkisini somutlaştırır."),
      "93": answer("Çözüm: 12,3 saniye 12,30 saniyedir. 12,30<12,32 olduğu için daha kısa sürede bitiren Tim daha hızlıdır."),
    },
    exerciseSectionSlugs: {
      "1": "ondalik-sayilari-okuma",
      "3": "ondalik-sayilari-okuma",
      "5": "ondalik-sayilari-okuma",
      "7": "ondalik-sayilari-okuma",
      "9": "ondalik-sayilari-okuma",
      "11": "ondalik-sayilari-okuma",
      "13": "ondalik-sayilari-yazma",
      "15": "ondalik-sayilari-yazma",
      "17": "ondalik-sayilari-yazma",
      "19": "ondalik-sayilari-yazma",
      "21": "ondalik-sayilari-yazma",
      "23": "ondalik-sayilari-yazma",
      "25": "ondalik-sayilari-yazma",
      "27": "ondalik-sayilari-kesre-donusturme",
      "29": "ondalik-sayilari-kesre-donusturme",
      "31": "ondalik-sayilari-kesre-donusturme",
      "33": "ondalik-sayilari-kesre-donusturme",
      "35": "ondalik-sayilari-kesre-donusturme",
      "37": "ondalik-sayilari-kesre-donusturme",
      "39": "ondalik-sayilari-kesre-donusturme",
      "41": "ondalik-sayilari-kesre-donusturme",
      "43": "ondalik-sayilari-kesre-donusturme",
      "45": "ondalik-sayilari-kesre-donusturme",
      "47": "ondalik-sayilari-kesre-donusturme",
      "49": "ondalik-sayilari-kesre-donusturme",
      "51": "ondalik-sayilari-sayi-dogrusunda-gosterme",
      "53": "ondalik-sayilari-sayi-dogrusunda-gosterme",
      "55": "ondalik-sayilari-sayi-dogrusunda-gosterme",
      "57": "ondalik-sayilari-sayi-dogrusunda-gosterme",
      "59": "ondalik-sayilari-siralama",
      "61": "ondalik-sayilari-siralama",
      "63": "ondalik-sayilari-siralama",
      "65": "ondalik-sayilari-siralama",
      "67": "ondalik-sayilari-siralama",
      "69": "ondalik-sayilari-siralama",
      "71": "ondalik-sayilari-yuvarlama",
      "73": "ondalik-sayilari-yuvarlama",
      "75": "ondalik-sayilari-yuvarlama",
      "77": "ondalik-sayilari-yuvarlama",
      "79": "ondalik-sayilari-yuvarlama",
      "81": "ondalik-sayilari-yuvarlama",
      "83": "ondalik-sayilari-yuvarlama",
      "85": "ondalik-sayilari-yuvarlama",
      "87": "ondalik-sayilari-yuvarlama",
      "89": "ondalik-sayilari-yuvarlama",
      "91": "ondalik-sayilari-okuma",
      "93": "ondalik-sayilari-siralama",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "ondalik-sayilar",
    sourceNumber: "5.3",
    catalogLesson: {
      id: "lesson-decimal-operations",
      slug: "ondalik-sayilarla-islemler",
      displayTitle: "Ondalık Sayılarla İşlemler",
      summary:
        "Ondalık sayılarla toplama, çıkarma, çarpma ve bölme işlemlerini yapın; para problemlerinde işlem sırasını kullanın.",
      sortOrder: 2,
    },
    objectives: [
      "Ondalık sayılarla toplama ve çıkarma işlemlerini yapabileceksiniz.",
      "Ondalık sayılarla çarpma işlemini yapabileceksiniz.",
      "Ondalık sayıları bölebileceksiniz.",
      "Para problemlerinde ondalık işlemleri kullanabileceksiniz.",
    ],
    sectionTitles: {
      "Add and Subtract Decimals": "Ondalık Sayılarla Toplama ve Çıkarma",
      "Multiply Decimals": "Ondalık Sayılarla Çarpma",
      "Multiply by Powers of 1010": "10'un Kuvvetleriyle Çarpma",
      "Divide Decimals": "Ondalık Sayıları Bölme",
      "Divide a Decimal by Another Decimal":
        "Ondalık Sayıyı Ondalık Sayıya Bölme",
      "Use Decimals in Money Applications":
        "Para Problemlerinde Ondalık Sayılar",
    },
    tryItSolutions: {
      "Sıra Sizde 5.21": p(
        "Çözüm: Virgülleri alt alta hizalarız. 5,7+11,9=17,6 olur.",
      ),
      "Sıra Sizde 5.22": p(
        "Çözüm: Yüzde birlikleri hizalayıp toplarız: 18,32+14,79=33,11.",
      ),
      "Sıra Sizde 5.23": p(
        "Çözüm: 4,8 sayısını 4,80 gibi düşünürüz. 4,80+11,69=16,49 olur.",
      ),
      "Sıra Sizde 5.24": p(
        "Çözüm: 18,47 sayısını 18,470 olarak hizalarız. 5,123+18,470=23,593 olur.",
      ),
      "Sıra Sizde 5.25": p(
        "Çözüm: 10 sayısını 10,00 olarak yazarız. 10,00-9,58=0,42 olur.",
      ),
      "Sıra Sizde 5.26": p(
        "Çözüm: 50,00-37,42=12,58 olur.",
      ),
      "Sıra Sizde 5.27": p(
        "Çözüm: 4,77-6,30 işleminde ikinci sayı büyüktür. 6,30-4,77=1,53, bu yüzden sonuç -1,53'tür.",
      ),
      "Sıra Sizde 5.28": p(
        "Çözüm: 8,12-11,70 işleminde sonuç negatiftir. 11,70-8,12=3,58 olduğundan sonuç -3,58 olur.",
      ),
      "Sıra Sizde 5.29": p(
        "Çözüm: 45·6107=274815 ve toplam dört ondalık basamak vardır. Sonuç 27,4815'tir.",
      ),
      "Sıra Sizde 5.30": p(
        "Çözüm: 1079·812=876148 ve toplam dört ondalık basamak vardır. Sonuç 87,6148 olur.",
      ),
      "Sıra Sizde 5.31": p(
        "Çözüm: İşaretler farklı olduğu için sonuç negatiftir. 4,63·2,9=13,427, sonuç -13,427 olur.",
      ),
      "Sıra Sizde 5.32": p(
        "Çözüm: İşaretler farklıdır. 7,78·4,9=38,122 olduğundan sonuç -38,122 olur.",
      ),
      "Sıra Sizde 5.33": p(
        "Çözüm: 4·87=348 ve toplam beş ondalık basamak vardır. Sonuç 0,00348 olur.",
      ),
      "Sıra Sizde 5.34": p(
        "Çözüm: 9·67=603 ve toplam beş ondalık basamak vardır. Sonuç 0,00603 olur.",
      ),
      "Sıra Sizde 5.35": p(
        "Çözüm: 10, 100 ve 1000 ile çarparken virgülü sırasıyla 1, 2 ve 3 basamak sağa taşırız: 25,8; 258; 2580.",
      ),
      "Sıra Sizde 5.36": p(
        "Çözüm: 14,2·10=142, 14,2·100=1420 ve 14,2·1000=14200 olur.",
      ),
      "Sıra Sizde 5.37": p(
        "Çözüm: 0,28'i 4 eş parçaya böleriz. 28 yüzde birlik 4'e bölününce 7 yüzde birlik kalır; sonuç 0,07 olur.",
      ),
      "Sıra Sizde 5.38": p(
        "Çözüm: 0,56÷7=0,08 çünkü 56 yüzde birlik 7'ye bölününce 8 yüzde birlik eder.",
      ),
      "Sıra Sizde 5.39": p(
        "Çözüm: 6,99÷36=0,194... Para biriminde en yakın sente yuvarlarız; sonuç yaklaşık 0,19 dolardır.",
      ),
      "Sıra Sizde 5.40": p(
        "Çözüm: 4,99÷12=0,4158... En yakın sente yuvarlayınca yaklaşık 0,42 dolar olur.",
      ),
      "Sıra Sizde 5.41": p(
        "Çözüm: İşaretler farklıdır. 1,989÷5,1 için her iki sayıyı 10 ile çarparız: 19,89÷51=0,39. Sonuç -0,39'dur.",
      ),
      "Sıra Sizde 5.42": p(
        "Çözüm: İşaretler farklıdır. 2,04÷5,1 = 20,4÷51 = 0,4 olduğundan sonuç -0,4 olur.",
      ),
      "Sıra Sizde 5.43": p(
        "Çözüm: İki sayı da negatif olduğu için bölüm pozitiftir. 23,492÷0,04 = 2349,2÷4 = 587,3 olur.",
      ),
      "Sıra Sizde 5.44": p(
        "Çözüm: İki negatif sayının bölümü pozitiftir. 4,11÷0,12 = 411÷12 = 34,25 olur.",
      ),
      "Sıra Sizde 5.45": p(
        "Çözüm: 0,03'ü tam sayıya çevirmek için iki basamak sağa taşırız: 6÷0,03 = 600÷3 = 200.",
      ),
      "Sıra Sizde 5.46": p(
        "Çözüm: 7÷0,02 = 700÷2 = 350 olur.",
      ),
      "Sıra Sizde 5.47": p(
        "Çözüm: Nicole'un kalan parası 35,00-18,48=16,52 dolardır.",
      ),
      "Sıra Sizde 5.48": p(
        "Çözüm: Toplam harcama 24,75+36,90+4,32=65,97 dolardır.",
      ),
      "Sıra Sizde 5.49": p(
        "Çözüm: 13·3,175=41,275 dolar eder. En yakın sente yuvarlanınca 41,28 dolar olur.",
      ),
      "Sıra Sizde 5.50": p(
        "Çözüm: 5 pizza için 5·9,75=48,75 dolar ödenir.",
      ),
      "Sıra Sizde 5.51": p(
        "Çözüm: 92,82 dolar 6 kişiye eşit bölünür: 92,82÷6=15,47 dolar.",
      ),
      "Sıra Sizde 5.52": p(
        "Çözüm: Saatlik ücret 570÷40=14,25 dolardır.",
      ),
      "Sıra Sizde 5.53": p(
        "Çözüm: Fasulyeler 3·0,75=2,25 dolar, mısırlar 6·0,62=3,72 dolar tutar. Toplam 5,97 dolardır.",
      ),
      "Sıra Sizde 5.54": p(
        "Çözüm: Yetişkin biletleri 2·9,50=19,00 dolar, çocuk biletleri 4·6,00=24,00 dolar tutar. Toplam 43,00 dolardır.",
      ),
    },
    exercisePrompts: {
      "95": tx("Toplayın veya çıkarın: 16,92+7,56."),
      "97": tx("Toplayın veya çıkarın: 256,37-85,49."),
      "99": tx("Toplayın veya çıkarın: 21,76-30,99."),
      "101": tx("Toplayın veya çıkarın: 37,5+12,23."),
      "103": tx("Toplayın veya çıkarın: -16,53-24,38."),
      "105": tx("Toplayın veya çıkarın: -38,69+31,47."),
      "107": tx("Toplayın veya çıkarın: -4,2+(-9,3)."),
      "109": tx("Toplayın veya çıkarın: 100-64,2."),
      "111": tx("Toplayın veya çıkarın: 72,5-100."),
      "113": tx("Toplayın veya çıkarın: 15+0,73."),
      "115": tx("Toplayın veya çıkarın: 2,51+40."),
      "117": tx("Toplayın veya çıkarın: 91,75-(-10,462)."),
      "119": tx("Toplayın veya çıkarın: 55,01-3,7."),
      "121": tx("Toplayın veya çıkarın: 2,51-7,4."),
      "123": tx("Çarpın: (0,3)(0,4)."),
      "125": tx("Çarpın: (0,24)(0,6)."),
      "127": tx("Çarpın: (5,9)(7,12)."),
      "129": tx("Çarpın: (8,52)(3,14)."),
      "131": tx("Çarpın: (-4,3)(2,71)."),
      "133": tx("Çarpın: (-5,18)(-65,23)."),
      "135": tx("Çarpın: (0,09)(24,78)."),
      "137": tx("Çarpın: (0,06)(21,75)."),
      "139": tx("Çarpın: (9,24)(10)."),
      "141": tx("Çarpın: (55,2)(1000)."),
      "143": tx("Bölün: 0,15÷5."),
      "145": tx("Bölün: 4,75÷25."),
      "147": tx("Bölün: 8,49 dolar ÷ 12."),
      "149": tx("Bölün: 117,25 dolar ÷ 48."),
      "151": tx("Bölün: 0,6÷0,2."),
      "153": tx("Bölün: 1,44÷(-0,3)."),
      "155": tx("Bölün: -1,75÷(-0,05)."),
      "157": tx("Bölün: 5,2÷2,5."),
      "159": tx("Bölün: 12÷0,08."),
      "161": tx("Bölün: 11÷0,55."),
      "163": tx("Sadeleştirin: 6(12,4-9,2)."),
      "165": tx("Sadeleştirin: 24(0,5)+(0,3)²."),
      "167": tx("Sadeleştirin: 1,15(26,83+1,61)."),
      "169": tx("Sadeleştirin: 45 dolar + 0,08(45 dolar)."),
      "171": tx("Sadeleştirin: 18÷(0,75+0,15)."),
      "173": tx("Sadeleştirin: (1,43+0,27)÷(0,9-0,05)."),
      "175": tx("Sadeleştirin: [75,42 dolar + 0,18(75,42 dolar)]÷5."),
      "177": tx("Brenda ATM'den 40 dolar aldı. Bir çift küpe için 15,11 dolar harcadı. Ne kadar parası kaldı?"),
      "179": tx("Adam 18,49 dolara bir tişört ve 8,92 dolara bir kitap aldı. Satış vergisi 1,65 dolardı. Adam toplam ne kadar harcadı?"),
      "181": tx("Emily 4,29 dolarlık bir mısır gevreği aldı. 0,55 dolarlık kuponu vardı ve mağaza kuponu iki katına çıkardı. Ne kadar ödedi?"),
      "183": tx("Leo bir diyet programına 190 pound ile başladı. İlk hafta 4,3 pound, ikinci hafta 2,8 pound verdi; üçüncü hafta 0,7 pound aldı; dördüncü hafta 1,9 pound verdi. Dördüncü haftanın sonunda kaç pound oldu?"),
      "185": tx("Noriko kendisi ve iş arkadaşları için 4 kahve aldı. Her kahve 3,75 dolardı. Toplam ne kadar ödedi?"),
      "187": tx("Mayra saat başına 9,25 dolar kazanıyor. Geçen hafta 32 saat çalıştı. Ne kadar kazandı?"),
      "189": tx("Alan yeni işindeki ilk maaşını aldı. 30 saat çalışıp 382,50 dolar kazandı. Saat başına ne kadar kazanıyor?"),
      "191": tx("Jeannette ve arkadaşları 6,00 dolarlık bir tatlıyı paylaşıyor. Tatlıyı ⓐ 2 ⓑ 3 ⓒ 4 ⓓ 5 ⓔ 6 kişi paylaşırsa kişi başı ödeme ne olur?"),
      "193": tx("Carlson ailesi 3,29 dolarlık 4 hamburger ve 2,74 dolarlık 2 patates kızartması sipariş ediyor. Toplam tutar nedir?"),
      "195": tx("Lewis ve Chousmith aileleri hayvanat bahçesine gidecek. Yetişkin bileti 29,95 dolar, çocuk bileti 19,95 dolar. 4 yetişkin ve 7 çocuk için toplam tutar nedir?"),
      "197": tx("Annie'nin iki işi var. City College'da özel ders için saatlik 14,04 dolar, kahve dükkanında saatlik 8,75 dolar alıyor. Geçen hafta 8 saat özel ders verdi ve 15 saat kahve dükkanında çalıştı. ⓐ Ne kadar kazandı? ⓑ 23 saatin tamamını özel ders olarak çalışsaydı ne kadar fazla kazanırdı?"),
      "199": tx("2010 Kış Olimpiyatları Super-G yarışında Miller'ın süresi 1 dakika 30,62 saniye, Weibrecht'in süresi 1 dakika 30,65 saniyeydi. Süre farkını bulun ve bu ondalık sayının adını yazın."),
    },
    exerciseAnswers: {
      "95": answer("Çözüm: Virgülleri hizalayıp toplarız: 16,92+7,56=24,48."),
      "97": answer("Çözüm: 256,37-85,49 işleminde basamakları hizalarız. Sonuç 170,88 olur."),
      "99": answer("Çözüm: İkinci sayı daha büyüktür. 30,99-21,76=9,23 olduğundan sonuç -9,23 olur."),
      "101": answer("Çözüm: 37,50+12,23=49,73; 37,5 sayısına sıfır eklemek değeri değiştirmez."),
      "103": answer("Çözüm: İki sayı da negatiftir; mutlak değerleri toplarız. 16,53+24,38=40,91, sonuç -40,91 olur."),
      "105": answer("Çözüm: İşaretler farklıdır. 38,69-31,47=7,22 ve mutlak değeri büyük olan sayı negatif olduğu için sonuç -7,22 olur."),
      "107": answer("Çözüm: İki negatif sayı toplanır: -4,2+(-9,3)=-(4,2+9,3)=-13,5."),
      "109": answer("Çözüm: 100 sayısını 100,0 olarak düşünürüz. 100,0-64,2=35,8 olur."),
      "111": answer("Çözüm: 72,5-100 işleminde sonuç negatiftir. 100-72,5=27,5 olduğundan sonuç -27,5 olur."),
      "113": answer("Çözüm: 15 sayısını 15,00 olarak hizalarız. 15,00+0,73=15,73."),
      "115": answer("Çözüm: 40 sayısını 40,00 olarak yazarız. 2,51+40,00=42,51."),
      "117": answer("Çözüm: Negatif sayıyı çıkarmak zıttını eklemektir. 91,75-(-10,462)=91,75+10,462=102,212."),
      "119": answer("Çözüm: 3,7 sayısını 3,70 olarak hizalarız. 55,01-3,70=51,31."),
      "121": answer("Çözüm: 2,51-7,40 işleminde sonuç negatiftir. 7,40-2,51=4,89; sonuç -4,89 olur."),
      "123": answer("Çözüm: 3·4=12 ve toplam iki ondalık basamak vardır. Sonuç 0,12 olur."),
      "125": answer("Çözüm: 24·6=144 ve toplam üç ondalık basamak vardır. Sonuç 0,144 olur."),
      "127": answer("Çözüm: 59·712=42008 ve toplam üç ondalık basamak vardır. Sonuç 42,008 olur."),
      "129": answer("Çözüm: 852·314=267528 ve toplam dört ondalık basamak vardır. Sonuç 26,7528 olur."),
      "131": answer("Çözüm: İşaretler farklı olduğu için çarpım negatiftir. 4,3·2,71=11,653; sonuç -11,653 olur."),
      "133": answer("Çözüm: İki sayı da negatif olduğu için çarpım pozitiftir. 5,18·65,23=337,8914 olur."),
      "135": answer("Çözüm: 9·2478=22302 ve toplam dört ondalık basamak vardır. Sonuç 2,2302 olur."),
      "137": answer("Çözüm: 6·2175=13050 ve toplam dört ondalık basamak vardır. Sonuç 1,305 olur."),
      "139": answer("Çözüm: 10 ile çarparken virgül bir basamak sağa taşınır. 9,24·10=92,4."),
      "141": answer("Çözüm: 1000 ile çarparken virgül üç basamak sağa taşınır. 55,2·1000=55.200."),
      "143": answer("Çözüm: 0,15'i 5'e böleriz. 15 yüzde birlik 5'e bölününce 3 yüzde birlik eder; sonuç 0,03 olur."),
      "145": answer("Çözüm: 4,75'i 25 parçaya böleriz. 25·0,19=4,75 olduğu için bölüm 0,19 olur."),
      "147": answer("Çözüm: 8,49÷12=0,7075 dolar eder. Para olarak en yakın sente yuvarlanırsa 0,71 dolar olur."),
      "149": answer("Çözüm: 117,25÷48=2,4427... dolar eder. En yakın sente yuvarlayınca 2,44 dolar bulunur."),
      "151": answer("Çözüm: 0,6÷0,2 için her iki sayıyı 10 ile çarparız: 6÷2=3."),
      "153": answer("Çözüm: İşaretler farklıdır. 1,44÷0,3 = 14,4÷3 = 4,8 olduğundan sonuç -4,8 olur."),
      "155": answer("Çözüm: İki negatif sayının bölümü pozitiftir. 1,75÷0,05 = 175÷5 = 35 olur."),
      "157": answer("Çözüm: Böleni tam sayı yapmak için iki sayıyı 10 ile çarparız: 5,2÷2,5 = 52÷25 = 2,08 olur."),
      "159": answer("Çözüm: 0,08'i tam sayıya çevirmek için iki basamak sağa taşırız. 12÷0,08 = 1200÷8 = 150."),
      "161": answer("Çözüm: Böleni tam sayı yapmak için iki basamak sağa taşırız: 11÷0,55 = 1100÷55 = 20 olur."),
      "163": answer("Çözüm: Önce parantez: 12,4-9,2=3,2. Sonra 6·3,2=19,2 olur."),
      "165": answer("Çözüm: Önce çarpma ve üs: 24·0,5=12 ve (0,3)²=0,09. Toplam 12,09 olur."),
      "167": answer("Çözüm: Önce parantez: 26,83+1,61=28,44. Sonra 1,15·28,44=32,706 olur."),
      "169": answer("Çözüm: 45 doların %8'i 0,08·45=3,60 dolardır. 45+3,60=48,60 dolar olur."),
      "171": answer("Çözüm: Önce parantez: 0,75+0,15=0,90. Sonra 18÷0,90=20 olur."),
      "173": answer("Çözüm: Üstte 1,43+0,27=1,70, altta 0,9-0,05=0,85. 1,70÷0,85=2 olur."),
      "175": answer("Çözüm: 75,42'nin %18'i 13,5756'dır. Toplam 88,9956, beşe bölününce 17,79912 olur; para olarak yaklaşık 17,80 dolardır."),
      "177": answer("Çözüm: Kalan parayı bulmak için harcamayı başlangıç parasından çıkarırız: 40,00-15,11=24,89 dolar."),
      "179": answer("Çözüm: Harcamaları toplarız: 18,49+8,92+1,65=29,06 dolar."),
      "181": answer("Çözüm: Kupon iki katına çıkınca indirim 2·0,55=1,10 dolar olur. 4,29-1,10=3,19 dolar öder."),
      "183": answer("Çözüm: Değişimleri başlangıçtan çıkarıp ekleriz: 190-4,3-2,8+0,7-1,9=181,7. Leo 181,7 pound olur."),
      "185": answer("Çözüm: Toplam tutar kahve sayısı ile bir kahve fiyatının çarpımıdır: 4·3,75=15,00 dolar."),
      "187": answer("Çözüm: Kazanç saatlik ücret ile saat sayısının çarpımıdır. 9,25·32=296 dolar."),
      "189": answer("Çözüm: Saatlik ücret toplam kazancın saate bölünmesidir. 382,50÷30=12,75 dolar/saat."),
      "191": answer("Çözüm: 6,00 dolar paylaşan kişi sayısına bölünür: ⓐ 3,00 ⓑ 2,00 ⓒ 1,50 ⓓ 1,20 ⓔ 1,00 dolar."),
      "193": answer("Çözüm: Hamburgerler 4·3,29=13,16 dolar, patatesler 2·2,74=5,48 dolar tutar. Toplam 18,64 dolardır."),
      "195": answer("Çözüm: Yetişkinler 4·29,95=119,80 dolar, çocuklar 7·19,95=139,65 dolar tutar. Toplam 259,45 dolardır."),
      "197": answer("Çözüm: ⓐ 8·14,04=112,32 ve 15·8,75=131,25; toplam 243,57 dolar. ⓑ 23 saatin tamamı özel ders olsaydı 23·14,04=322,92 dolar kazanırdı; fark 79,35 dolardır."),
      "199": answer("Çözüm: Süre farkı 30,65-30,62=0,03 saniyedir. 0,03 sayısı yüzde üç, yani üç yüzde birlik diye okunur."),
    },
    exerciseSectionSlugs: {
      "95": "ondalik-sayilarla-toplama-ve-cikarma",
      "97": "ondalik-sayilarla-toplama-ve-cikarma",
      "99": "ondalik-sayilarla-toplama-ve-cikarma",
      "101": "ondalik-sayilarla-toplama-ve-cikarma",
      "103": "ondalik-sayilarla-toplama-ve-cikarma",
      "105": "ondalik-sayilarla-toplama-ve-cikarma",
      "107": "ondalik-sayilarla-toplama-ve-cikarma",
      "109": "ondalik-sayilarla-toplama-ve-cikarma",
      "111": "ondalik-sayilarla-toplama-ve-cikarma",
      "113": "ondalik-sayilarla-toplama-ve-cikarma",
      "115": "ondalik-sayilarla-toplama-ve-cikarma",
      "117": "ondalik-sayilarla-toplama-ve-cikarma",
      "119": "ondalik-sayilarla-toplama-ve-cikarma",
      "121": "ondalik-sayilarla-toplama-ve-cikarma",
      "123": "ondalik-sayilarla-carpma",
      "125": "ondalik-sayilarla-carpma",
      "127": "ondalik-sayilarla-carpma",
      "129": "ondalik-sayilarla-carpma",
      "131": "ondalik-sayilarla-carpma",
      "133": "ondalik-sayilarla-carpma",
      "135": "ondalik-sayilarla-carpma",
      "137": "ondalik-sayilarla-carpma",
      "139": "10-un-kuvvetleriyle-carpma",
      "141": "10-un-kuvvetleriyle-carpma",
      "143": "ondalik-sayilari-bolme",
      "145": "ondalik-sayilari-bolme",
      "147": "ondalik-sayilari-bolme",
      "149": "ondalik-sayilari-bolme",
      "151": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "153": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "155": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "157": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "159": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "161": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "163": "ondalik-sayilarla-carpma",
      "165": "ondalik-sayilarla-carpma",
      "167": "ondalik-sayilarla-carpma",
      "169": "para-problemlerinde-ondalik-sayilar",
      "171": "ondalik-sayilari-bolme",
      "173": "ondalik-sayiyi-ondalik-sayiya-bolme",
      "175": "para-problemlerinde-ondalik-sayilar",
      "177": "para-problemlerinde-ondalik-sayilar",
      "179": "para-problemlerinde-ondalik-sayilar",
      "181": "para-problemlerinde-ondalik-sayilar",
      "183": "para-problemlerinde-ondalik-sayilar",
      "185": "para-problemlerinde-ondalik-sayilar",
      "187": "para-problemlerinde-ondalik-sayilar",
      "189": "para-problemlerinde-ondalik-sayilar",
      "191": "para-problemlerinde-ondalik-sayilar",
      "193": "para-problemlerinde-ondalik-sayilar",
      "195": "para-problemlerinde-ondalik-sayilar",
      "197": "para-problemlerinde-ondalik-sayilar",
      "199": "para-problemlerinde-ondalik-sayilar",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "ondalik-sayilar",
    sourceNumber: "5.4",
    catalogLesson: {
      id: "lesson-decimals-and-fractions",
      slug: "ondalik-sayilar-ve-kesirler",
      displayTitle: "Ondalık Sayılar ve Kesirler",
      summary:
        "Kesirleri ondalık sayıya dönüştürün, devirli ondalıkları tanıyın, kesir ve ondalıkları sıralayın; çember çevresi ve alanını yaklaşık hesaplayın.",
      sortOrder: 3,
    },
    objectives: [
      "Kesirleri ondalık sayıya dönüştürebileceksiniz.",
      "Ondalık sayılar ve kesirleri sıralayabileceksiniz.",
      "İşlem sırasını kullanarak ifadeleri sadeleştirebileceksiniz.",
      "Çemberin çevresini ve alanını hesaplayabileceksiniz.",
    ],
    sectionTitles: {
      "Convert Fractions to Decimals":
        "Kesirleri Ondalık Sayıya Dönüştürme",
      "Repeating Decimals": "Devirli Ondalık Sayılar",
      "Order Decimals and Fractions":
        "Ondalık Sayılar ve Kesirleri Sıralama",
      "Simplify Expressions Using the Order of Operations":
        "İşlem Sırası ile Sadeleştirme",
      "Find the Circumference and Area of Circles":
        "Çemberin Çevresi ve Alanı",
      "Approximate ππ with a Fraction":
        "Pi Sayısını Kesirle Yaklaşık Hesaplama",
    },
    tryItSolutions: {
      "Sıra Sizde 5.55": p(
        "Çözüm: Kesir çizgisi bölme demektir. 1÷4=0,25 olduğundan 1/4=0,25 olur.",
      ),
      "Sıra Sizde 5.56": p(
        "Çözüm: 3÷8=0,375 olur. Bu yüzden 3/8 ondalık gösterimde 0,375'tir.",
      ),
      "Sıra Sizde 5.57": p(
        "Çözüm: Önce 9÷4=2,25 bulunur. Kesir negatif olduğu için sonuç -2,25 olur.",
      ),
      "Sıra Sizde 5.58": p(
        "Çözüm: 11÷2=5,5 olduğundan -11/2=-5,5 olur.",
      ),
      "Sıra Sizde 5.59": p(
        "Çözüm: 27÷11=2,4545... olur. Tekrarlayan blok 45'tir; sonuç 2,45 devirli diye yazılır.",
      ),
      "Sıra Sizde 5.60": p(
        "Çözüm: 51÷22=2,31818... olur. İlk 3'ten sonra 18 tekrar eder; sonuç 2,3 ardından 18 devirli biçimindedir.",
      ),
      "Sıra Sizde 5.61": p(
        "Çözüm: 3/8=0,375. 0,375+4,9=5,275 olur.",
      ),
      "Sıra Sizde 5.62": p(
        "Çözüm: 13/20=0,65. 5,7+0,65=6,35 olur.",
      ),
      "Sıra Sizde 5.63": p(
        "Çözüm: 17/20=0,85 ve 0,85>0,82 olduğu için 17/20>0,82 olur.",
      ),
      "Sıra Sizde 5.64": p(
        "Çözüm: 3/4=0,75 ve 0,75<0,785 olduğu için 3/4<0,785 olur.",
      ),
      "Sıra Sizde 5.65": p(
        "Çözüm: -5/8=-0,625. -0,625, -0,58'den küçüktür; bu yüzden -5/8<-0,58 olur.",
      ),
      "Sıra Sizde 5.66": p(
        "Çözüm: -11/20=-0,55. -0,53 sıfıra daha yakın olduğu için -0,53>-11/20 olur.",
      ),
      "Sıra Sizde 5.67": p(
        "Çözüm: 7/8=0,875 ve 4/5=0,8. Küçükten büyüğe sıralama 4/5, 0,82, 7/8 olur.",
      ),
      "Sıra Sizde 5.68": p(
        "Çözüm: 13/16=0,8125 ve 3/4=0,75. Küçükten büyüğe sıralama 3/4, 13/16, 0,835 olur.",
      ),
      "Sıra Sizde 5.69": p(
        "Çözüm: ⓐ 14,6-37,5=-22,9 ve 8·(-22,9)=-183,2. ⓑ 9,6-2,1=7,5 ve 3/5·7,5=4,5.",
      ),
      "Sıra Sizde 5.70": p(
        "Çözüm: ⓐ 25,69-56,74=-31,05 ve 25·(-31,05)=-776,25. ⓑ 11,9-4,2=7,7 ve 2/7·7,7=2,2.",
      ),
      "Sıra Sizde 5.71": p(
        "Çözüm: Önce üs ve bölme/çarpma yapılır: 9÷0,9=10, 0,4·3=1,2 ve (0,2)^2=0,04. Sonuç 10+1,2-0,04=11,16 olur.",
      ),
      "Sıra Sizde 5.72": p(
        "Çözüm: (1/2)^2=0,25 ve 0,3·4,2=1,26. Toplam 1,51 olur.",
      ),
      "Sıra Sizde 5.73": p(
        "Çözüm: r=50 inç için C≈2·3,14·50=314 inç ve A≈3,14·50^2=7850 inç kare olur.",
      ),
      "Sıra Sizde 5.74": p(
        "Çözüm: r=100 feet için C≈628 feet ve A≈31.400 feet kare olur.",
      ),
      "Sıra Sizde 5.75": p(
        "Çözüm: r=51,8 cm için C≈2·3,14·51,8=325,304 cm ve A≈3,14·51,8^2=8425,3736 cm kare olur.",
      ),
      "Sıra Sizde 5.76": p(
        "Çözüm: r=26,4 m için C≈165,792 m ve A≈2188,4544 m kare olur.",
      ),
      "Sıra Sizde 5.77": p(
        "Çözüm: Kesirli yarıçapta π≈22/7 kullanırız. r=5/21 için C≈220/147 m ve A≈550/3087 m kare olur.",
      ),
      "Sıra Sizde 5.78": p(
        "Çözüm: r=10/33 inç için C≈40/21 inç ve A≈200/693 inç kare olur.",
      ),
    },
    exercisePrompts: {
      "201": tx("Kesri ondalık sayıya dönüştürün: 2/5."),
      "203": tx("Kesri ondalık sayıya dönüştürün: -3/8."),
      "205": tx("Kesri ondalık sayıya dönüştürün: 17/20."),
      "207": tx("Kesri ondalık sayıya dönüştürün: 11/4."),
      "209": tx("Kesri ondalık sayıya dönüştürün: -310/25."),
      "211": tx("Kesri ondalık sayıya dönüştürün: 5/9."),
      "213": tx("Kesri ondalık sayıya dönüştürün: 15/11."),
      "215": tx("Kesri ondalık sayıya dönüştürün: 15/111."),
      "217": tx("İfadeyi sadeleştirin: 1/2+6,5."),
      "219": tx("İfadeyi sadeleştirin: 2,4+5/8."),
      "221": tx("İfadeyi sadeleştirin: 9,73+17/20."),
      "223": tx("< ya da > kullanarak sıralayın: 1/8 ___ 0,8."),
      "225": tx("< ya da > kullanarak sıralayın: 2/5 ___ 0,25."),
      "227": tx("< ya da > kullanarak sıralayın: 0,725 ___ 3/4."),
      "229": tx("< ya da > kullanarak sıralayın: 0,66 ___ 2/3."),
      "231": tx("< ya da > kullanarak sıralayın: -0,75 ___ -4/5."),
      "233": tx("< ya da > kullanarak sıralayın: -3/4 ___ -0,925."),
      "235": tx("Sayıları küçükten büyüğe sıralayın: 3/5, 9/16, 0,55."),
      "237": tx("Sayıları küçükten büyüğe sıralayın: 0,702, 13/20, 5/8."),
      "239": tx("Sayıları küçükten büyüğe sıralayın: -0,3, -1/3, -7/20."),
      "241": tx("Sayıları küçükten büyüğe sıralayın: -3/4, -7/9, -0,7."),
      "243": tx("Sadeleştirin: 10(25,1-43,8)."),
      "245": tx("Sadeleştirin: 62(9,75-4,99)."),
      "247": tx("Sadeleştirin: 3/4(12,4-4,2)."),
      "249": tx("Sadeleştirin: 5/12(30,58+17,9)."),
      "251": tx("Sadeleştirin: 10÷0,1+(1,8)4-(0,3)^2."),
      "253": tx("Sadeleştirin: (37,1+52,7)÷(12,5÷62,5)."),
      "255": tx("Sadeleştirin: (1/5)^2+(1,4)(6,5)."),
      "257": tx("Sadeleştirin: -9/10·8/15+0,25."),
      "259": tx("Ondalık sonuç vererek sadeleştirin: 3 1/4-6,5."),
      "261": tx("Ondalık sonuç vererek sadeleştirin: 10,86÷2/3."),
      "263": tx("Ondalık sonuç vererek sadeleştirin: 7/8(103,48)+1 1/2(361)."),
      "265": tx("Ondalık sonuç vererek sadeleştirin: 3,6(9/8-2,72)."),
      "267": tx("Yarıçapı 5 inç olan çemberin ⓐ çevresini ⓑ alanını yaklaşık hesaplayın."),
      "269": tx("Yarıçapı 9 feet olan çemberin ⓐ çevresini ⓑ alanını yaklaşık hesaplayın."),
      "271": tx("Yarıçapı 46 cm olan çemberin ⓐ çevresini ⓑ alanını yaklaşık hesaplayın."),
      "273": tx("Yarıçapı 18,6 m olan çemberin ⓐ çevresini ⓑ alanını yaklaşık hesaplayın."),
      "275": tx("Yarıçapı 7/10 mil olan çemberin ⓐ çevresini ⓑ alanını kesir biçiminde yaklaşık hesaplayın."),
      "277": tx("Yarıçapı 3/8 yard olan çemberin ⓐ çevresini ⓑ alanını kesir biçiminde yaklaşık hesaplayın."),
      "279": tx("Çapı 5/6 m olan çemberin ⓐ çevresini ⓑ alanını kesir biçiminde yaklaşık hesaplayın."),
      "281": tx("Kelly, normal fiyatı 84,99 dolar olan botları fiyatın 2/3'ü kadar indirimli satış fiyatıyla almak istiyor. Satış fiyatı nedir?"),
      "283": tx("Sizin için ondalık sayıyı kesre dönüştürmek mi, kesri ondalık sayıya dönüştürmek mi daha kolay? Açıklayın."),
    },
    exerciseAnswers: {
      "201": answer("Çözüm: 2÷5=0,4 olduğundan 2/5 ondalık gösterimde 0,4 olur."),
      "203": answer("Çözüm: 3÷8=0,375 bulunur. Kesir negatif olduğu için sonuç -0,375 olur."),
      "205": answer("Çözüm: Kesir çizgisi bölme demektir. 17'yi 20'ye böleriz: 17÷20=0,85, yani 17/20=0,85 olur."),
      "207": answer("Çözüm: 11÷4=2,75. Bu yüzden 11/4 ondalık gösterimde 2,75'tir."),
      "209": answer("Çözüm: 310÷25=12,4 ve kesir negatif olduğundan sonuç -12,4 olur."),
      "211": answer("Çözüm: 5÷9=0,555... olur. 5 rakamı sürekli tekrar ettiği için sonuç 0,5 devirlidir."),
      "213": answer("Çözüm: 15÷11=1,3636... olur. Tekrarlayan blok 36'dır; sonuç 1,36 devirlidir."),
      "215": answer("Çözüm: 15/111 sadeleşince 5/37 olur. Bölme 0,135135... verir; 135 bloğu tekrar eder."),
      "217": answer("Çözüm: 1/2=0,5. 0,5+6,5=7 olduğundan ifade 7'ye sadeleşir."),
      "219": answer("Çözüm: Önce kesri ondalığa çeviririz: 5/8=0,625. Sonra 2,4+0,625=3,025 olur."),
      "221": answer("Çözüm: Önce 17/20 kesrini ondalık yazarız: 17/20=0,85. Ardından 9,73+0,85=10,58 olur."),
      "223": answer("Çözüm: 1/8=0,125 ve 0,125<0,8 olduğu için 1/8<0,8 olur."),
      "225": answer("Çözüm: 2/5=0,4 ve 0,4>0,25 olduğu için 2/5>0,25 olur."),
      "227": answer("Çözüm: 3/4=0,75. 0,725<0,75 olduğu için 0,725<3/4 olur."),
      "229": answer("Çözüm: 2/3=0,666... biçiminde devirli ondalıktır. 0,66 bundan küçük olduğu için 0,66<2/3 olur."),
      "231": answer("Çözüm: -4/5=-0,8. -0,75 sayı doğrusunda -0,8'in sağındadır; bu yüzden -0,75>-4/5 olur."),
      "233": answer("Çözüm: -3/4=-0,75. -0,75, -0,925'ten büyüktür; bu nedenle -3/4>-0,925 olur."),
      "235": answer("Çözüm: 3/5=0,6 ve 9/16=0,5625. Küçükten büyüğe sıralama 0,55, 9/16, 3/5 olur."),
      "237": answer("Çözüm: 13/20=0,65 ve 5/8=0,625. Küçükten büyüğe sıralama 5/8, 13/20, 0,702 olur."),
      "239": answer("Çözüm: -1/3≈-0,333 ve -7/20=-0,35. En küçük en soldaki sayı olduğundan sıralama -7/20, -1/3, -0,3 olur."),
      "241": answer("Çözüm: -3/4=-0,75 ve -7/9≈-0,778. Küçükten büyüğe sıralama -7/9, -3/4, -0,7 olur."),
      "243": answer("Çözüm: Önce parantez: 25,1-43,8=-18,7. Sonra 10·(-18,7)=-187 olur."),
      "245": answer("Çözüm: Önce parantez: 9,75-4,99=4,76. Sonra 62·4,76=295,12 olur."),
      "247": answer("Çözüm: 12,4-4,2=8,2. 8,2'nin 3/4'ü 6,15 olduğundan sonuç 6,15 olur."),
      "249": answer("Çözüm: Önce parantez: 30,58+17,9=48,48. Sonra 5/12·48,48=20,2 olur."),
      "251": answer("Çözüm: 10÷0,1=100, 1,8·4=7,2 ve (0,3)^2=0,09. Sonuç 100+7,2-0,09=107,11 olur."),
      "253": answer("Çözüm: Pay 37,1+52,7=89,8, payda 12,5÷62,5=0,2 olur. 89,8÷0,2=449 bulunur."),
      "255": answer("Çözüm: (1/5)^2=0,04 ve 1,4·6,5=9,1. Toplam 9,14 olur."),
      "257": answer("Çözüm: -9/10·8/15=-72/150=-0,48. -0,48+0,25=-0,23 olur."),
      "259": answer("Çözüm: Önce karma sayıyı ondalığa çeviririz: 3 1/4=3,25. Sonra 3,25-6,5=-3,25 olur."),
      "261": answer("Çözüm: 10,86÷2/3, 10,86·3/2 demektir. 10,86·1,5=16,29 olur."),
      "263": answer("Çözüm: 7/8·103,48=90,545 ve 1 1/2·361=541,5. Toplam 632,045 olur."),
      "265": answer("Çözüm: 9/8=1,125. Parantez 1,125-2,72=-1,595 olur; 3,6·(-1,595)=-5,742 bulunur."),
      "267": answer("Çözüm: r=5 için C≈2·3,14·5=31,4 inç ve A≈3,14·25=78,5 inç kare olur."),
      "269": answer("Çözüm: r=9 için C≈2·3,14·9=56,52 feet ve A≈3,14·81=254,34 feet kare olur."),
      "271": answer("Çözüm: r=46 için C≈2·3,14·46=288,88 cm ve A≈3,14·46^2=6644,24 cm kare olur."),
      "273": answer("Çözüm: r=18,6 için C≈2·3,14·18,6=116,808 m ve A≈3,14·18,6^2=1086,3144 m kare olur."),
      "275": answer("Çözüm: Kesirli ölçüde π≈22/7 alırız. r=7/10 için C≈22/5 mil ve A≈77/50 mil kare olur."),
      "277": answer("Çözüm: r=3/8 için C≈2·22/7·3/8=33/14 yard ve A≈22/7·(3/8)^2=99/224 yard kare olur."),
      "279": answer("Çözüm: Çap 5/6 m olduğundan C≈22/7·5/6=55/21 m. Yarıçap 5/12 m, alan A≈22/7·(5/12)^2=275/504 m kare olur."),
      "281": answer("Çözüm: Satış fiyatı normal fiyatın 2/3'üdür. 84,99÷3=28,33 ve 2·28,33=56,66 dolar olur."),
      "283": answer("Çözüm: Olası açıklama: Kesri ondalığa çevirmek, kesir çizgisini bölme olarak yorumladığımda daha kolaydır; payı paydaya bölerek doğrudan ondalık gösterimi bulabilirim."),
    },
    exerciseSectionSlugs: {
      "201": "kesirleri-ondalik-sayiya-donusturme",
      "203": "kesirleri-ondalik-sayiya-donusturme",
      "205": "kesirleri-ondalik-sayiya-donusturme",
      "207": "kesirleri-ondalik-sayiya-donusturme",
      "209": "kesirleri-ondalik-sayiya-donusturme",
      "211": "devirli-ondalik-sayilar",
      "213": "devirli-ondalik-sayilar",
      "215": "devirli-ondalik-sayilar",
      "217": "devirli-ondalik-sayilar",
      "219": "devirli-ondalik-sayilar",
      "221": "devirli-ondalik-sayilar",
      "223": "ondalik-sayilar-ve-kesirleri-siralama",
      "225": "ondalik-sayilar-ve-kesirleri-siralama",
      "227": "ondalik-sayilar-ve-kesirleri-siralama",
      "229": "ondalik-sayilar-ve-kesirleri-siralama",
      "231": "ondalik-sayilar-ve-kesirleri-siralama",
      "233": "ondalik-sayilar-ve-kesirleri-siralama",
      "235": "ondalik-sayilar-ve-kesirleri-siralama",
      "237": "ondalik-sayilar-ve-kesirleri-siralama",
      "239": "ondalik-sayilar-ve-kesirleri-siralama",
      "241": "ondalik-sayilar-ve-kesirleri-siralama",
      "243": "islem-sirasi-ile-sadelestirme",
      "245": "islem-sirasi-ile-sadelestirme",
      "247": "islem-sirasi-ile-sadelestirme",
      "249": "islem-sirasi-ile-sadelestirme",
      "251": "islem-sirasi-ile-sadelestirme",
      "253": "islem-sirasi-ile-sadelestirme",
      "255": "islem-sirasi-ile-sadelestirme",
      "257": "islem-sirasi-ile-sadelestirme",
      "259": "islem-sirasi-ile-sadelestirme",
      "261": "islem-sirasi-ile-sadelestirme",
      "263": "islem-sirasi-ile-sadelestirme",
      "265": "islem-sirasi-ile-sadelestirme",
      "267": "cemberin-cevresi-ve-alani",
      "269": "cemberin-cevresi-ve-alani",
      "271": "cemberin-cevresi-ve-alani",
      "273": "cemberin-cevresi-ve-alani",
      "275": "pi-sayisini-kesirle-yaklasik-hesaplama",
      "277": "pi-sayisini-kesirle-yaklasik-hesaplama",
      "279": "pi-sayisini-kesirle-yaklasik-hesaplama",
      "281": "islem-sirasi-ile-sadelestirme",
      "283": "kesirleri-ondalik-sayiya-donusturme",
    },
  },
  {
    sourceBookSlug: "prealgebra-2e-openstax",
    catalogBookSlug: "prealgebra-2e",
    catalogChapterSlug: "ondalik-sayilar",
    sourceNumber: "5.5",
    catalogLesson: {
      id: "lesson-decimal-equations",
      slug: "ondalik-denklemler",
      displayTitle: "Ondalık Denklemler",
      summary:
        "Ondalık sayılı denklemlerde çözüm kontrolü yapın, eşitliğin özellikleriyle denklemleri çözün ve sözel durumları denkleme çevirin.",
      sortOrder: 4,
    },
    objectives: [
      "Ondalık sayının bir denklemin çözümü olup olmadığını belirleyebileceksiniz.",
      "Ondalık sayılar içeren denklemleri çözebileceksiniz.",
      "Sözel durumları denkleme çevirip çözebileceksiniz.",
    ],
    sectionTitles: {
      "Determine Whether a Decimal is a Solution of an Equation":
        "Ondalık Denklemlerde Çözüm Kontrolü",
      "Solve Equations with Decimals": "Ondalık Denklemleri Çözme",
      "Translate to an Equation and Solve":
        "Sözel Durumları Denkleme Çevirme",
    },
    tryItSolutions: {
      "Sıra Sizde 5.79": p(
        "Çözüm: x=0,7 için 0,7-0,6=0,1, çözüm değildir. x=1,9 için 1,9-0,6=1,3, çözümdür. x=-0,7 için -0,7-0,6=-1,3, çözüm değildir.",
      ),
      "Sıra Sizde 5.80": p(
        "Çözüm: y=2,1 için 2,1-0,4=1,7, çözümdür. y=1,3 için 0,9, y=-1,3 için -1,7 elde edilir; bunlar çözüm değildir.",
      ),
      "Sıra Sizde 5.81": p(
        "Çözüm: Her iki taraftan 2,7 çıkarırız: y=-5,3-2,7=-8 olur.",
      ),
      "Sıra Sizde 5.82": p(
        "Çözüm: Her iki taraftan 3,6 çıkarınca y=-4,8-3,6=-8,4 bulunur.",
      ),
      "Sıra Sizde 5.83": p(
        "Çözüm: Çıkarmayı gidermek için her iki tarafa 3,93 ekleriz. a=-2,86+3,93=1,07 olur.",
      ),
      "Sıra Sizde 5.84": p(
        "Çözüm: Her iki tarafa 3,47 ekleriz: n=-2,64+3,47=0,83.",
      ),
      "Sıra Sizde 5.85": p(
        "Çözüm: Her iki tarafı 0,7'ye böleriz. b=-8,4÷0,7=-12 olur.",
      ),
      "Sıra Sizde 5.86": p(
        "Çözüm: Her iki tarafı 0,7'ye böleriz. c=-5,6÷0,7=-8 bulunur.",
      ),
      "Sıra Sizde 5.87": p(
        "Çözüm: c, -2,6'ya bölünmüş. Her iki tarafı -2,6 ile çarparız: c=(-4,5)(-2,6)=11,7.",
      ),
      "Sıra Sizde 5.88": p(
        "Çözüm: Her iki tarafı -1,2 ile çarparız: b=(-5,4)(-1,2)=6,48.",
      ),
      "Sıra Sizde 5.89": p(
        "Çözüm: “y ile 4,9'un farkı 2,8” ifadesi y-4,9=2,8 olur. Her iki tarafa 4,9 ekleyince y=7,7 bulunur.",
      ),
      "Sıra Sizde 5.90": p(
        "Çözüm: Denklem z-5,7=3,4'tür. Her iki tarafa 5,7 eklenirse z=9,1 olur.",
      ),
      "Sıra Sizde 5.91": p(
        "Çözüm: “-4,3 ile x'in çarpımı 12,04” denklemi -4,3x=12,04'tür. x=12,04÷(-4,3)=-2,8 olur.",
      ),
      "Sıra Sizde 5.92": p(
        "Çözüm: Denklem -3,1m=26,66 olur. Her iki tarafı -3,1'e böleriz ve m=-8,6 buluruz.",
      ),
      "Sıra Sizde 5.93": p(
        "Çözüm: q/(-3,4)=4,5 denklemini kurarız. Her iki tarafı -3,4 ile çarparız: q=-15,3.",
      ),
      "Sıra Sizde 5.94": p(
        "Çözüm: r/(-2,6)=2,5 olur. Her iki tarafı -2,6 ile çarptığımızda r=-6,5 bulunur.",
      ),
      "Sıra Sizde 5.95": p(
        "Çözüm: j+3,8=2,6 denkleminde her iki taraftan 3,8 çıkarırız. j=-1,2 olur.",
      ),
      "Sıra Sizde 5.96": p(
        "Çözüm: k+4,7=0,3 denklemini çözeriz. k=0,3-4,7=-4,4 olur.",
      ),
    },
    exercisePrompts: {
      "285": tx("Verilen değerlerden hangilerinin denklemi sağladığını belirleyin: x-0,8=2,3; ⓐ x=2 ⓑ x=-1,5 ⓒ x=3,1."),
      "287": tx("Verilen değerlerden hangilerinin denklemi sağladığını belirleyin: h/1,5=-4,3; ⓐ h=6,45 ⓑ h=-6,45 ⓒ h=-2,1."),
      "289": tx("Denklemi çözün: y+2,9=5,7."),
      "291": tx("Denklemi çözün: f+3,45=2,6."),
      "293": tx("Denklemi çözün: a+6,2=-1,7."),
      "295": tx("Denklemi çözün: c+1,15=-3,5."),
      "297": tx("Denklemi çözün: n-2,6=1,8."),
      "299": tx("Denklemi çözün: x-0,4=-3,9."),
      "301": tx("Denklemi çözün: j-1,82=-6,5."),
      "303": tx("Denklemi çözün: m-0,25=-1,67."),
      "305": tx("Denklemi çözün: 0,5x=3,5."),
      "307": tx("Denklemi çözün: -1,7c=8,5."),
      "309": tx("Denklemi çözün: -1,4p=-4,2."),
      "311": tx("Denklemi çözün: -120=1,5q."),
      "313": tx("Denklemi çözün: 0,24x=4,8."),
      "315": tx("Denklemi çözün: -3,4z=-9,18."),
      "317": tx("Denklemi çözün: a/0,4=-20."),
      "319": tx("Denklemi çözün: x/0,7=-0,4."),
      "321": tx("Denklemi çözün: p/(-5)=-1,65."),
      "323": tx("Denklemi çözün: r/(-1,2)=-6."),
      "325": tx("Denklemi çözün ve kontrol edin: x-5=-11."),
      "327": tx("Denklemi çözün ve kontrol edin: p+8=-2."),
      "329": tx("Denklemi çözün ve kontrol edin: -4,2m=-33,6."),
      "331": tx("Denklemi çözün ve kontrol edin: q+5/6=1/12."),
      "333": tx("Denklemi çözün ve kontrol edin: (7/8)m=1/10."),
      "335": tx("Denklemi çözün ve kontrol edin: -2/3=y+3/8."),
      "337": tx("Denklemi çözün ve kontrol edin: 11/20=-f."),
      "339": tx("Denklemi çözün ve kontrol edin: -4,2a=3,36."),
      "341": tx("Denklemi çözün ve kontrol edin: r-1,25=-2,7."),
      "343": tx("Denklemi çözün ve kontrol edin: h/(-3)=-8."),
      "345": tx("Çevirin ve çözün: n ile 1,9'un farkı 3,4'tür."),
      "347": tx("Çevirin ve çözün: -6,2 ile x'in çarpımı -4,96'dır."),
      "349": tx("Çevirin ve çözün: y'nin -1,7'ye bölümü -5'tir."),
      "351": tx("Çevirin ve çözün: n ile -7,3'ün toplamı 2,4'tür."),
      "353": tx("Shawn indirimde 78 dolara bir ayakkabı aldı. Ayakkabının asıl fiyatı p ise 0,75p=78 denklemini çözün."),
      "355": tx("1,2y=60 denklemini çözmeden düşünün: çözüm 60'tan büyük mü küçük mü olmalı? Açıklayın, sonra denklemi çözerek kontrol edin."),
    },
    exerciseAnswers: {
      "285": answer("Çözüm: x=2 için 2-0,8=1,2, çözüm değildir. x=-1,5 için -2,3, çözüm değildir. x=3,1 için 3,1-0,8=2,3, çözümdür."),
      "287": answer("Çözüm: h=6,45 için bölüm 4,3 olur, çözüm değildir. h=-6,45 için -6,45÷1,5=-4,3, çözümdür. h=-2,1 için -1,4 olur, çözüm değildir."),
      "289": answer("Çözüm: Her iki taraftan 2,9 çıkarırız. y=5,7-2,9=2,8 olur."),
      "291": answer("Çözüm: Her iki taraftan 3,45 çıkarırız. f=2,6-3,45=-0,85 bulunur."),
      "293": answer("Çözüm: Her iki taraftan 6,2 çıkarırız. a=-1,7-6,2=-7,9 olur."),
      "295": answer("Çözüm: Her iki taraftan 1,15 çıkarırız. c=-3,5-1,15=-4,65 bulunur."),
      "297": answer("Çözüm: Her iki tarafa 2,6 ekleriz. n=1,8+2,6=4,4 olur."),
      "299": answer("Çözüm: Her iki tarafa 0,4 ekleriz. x=-3,9+0,4=-3,5 olur."),
      "301": answer("Çözüm: Her iki tarafa 1,82 ekleriz. j=-6,5+1,82=-4,68 bulunur."),
      "303": answer("Çözüm: Her iki tarafa 0,25 eklenir. m=-1,67+0,25=-1,42 olur."),
      "305": answer("Çözüm: Her iki tarafı 0,5'e böleriz. x=3,5÷0,5=7 olur."),
      "307": answer("Çözüm: Her iki tarafı -1,7'ye böleriz. c=8,5÷(-1,7)=-5 olur."),
      "309": answer("Çözüm: Her iki tarafı -1,4'e böleriz. p=(-4,2)÷(-1,4)=3 olur."),
      "311": answer("Çözüm: Her iki tarafı 1,5'e böleriz. q=-120÷1,5=-80 bulunur."),
      "313": answer("Çözüm: Her iki tarafı 0,24'e böleriz. x=4,8÷0,24=20 olur."),
      "315": answer("Çözüm: Her iki tarafı -3,4'e böleriz. z=(-9,18)÷(-3,4)=2,7 olur."),
      "317": answer("Çözüm: a/0,4=-20 olduğundan her iki tarafı 0,4 ile çarparız. a=-8 olur."),
      "319": answer("Çözüm: Her iki tarafı 0,7 ile çarparız. x=(-0,4)(0,7)=-0,28 olur."),
      "321": answer("Çözüm: p, -5'e bölünmüş. Her iki tarafı -5 ile çarparız: p=8,25 olur."),
      "323": answer("Çözüm: Her iki tarafı -1,2 ile çarparız. r=(-6)(-1,2)=7,2 bulunur."),
      "325": answer("Çözüm: Her iki tarafa 5 ekleriz. x=-6 olur; kontrol: -6-5=-11."),
      "327": answer("Çözüm: Her iki taraftan 8 çıkarırız. p=-10 olur; kontrol: -10+8=-2."),
      "329": answer("Çözüm: Her iki tarafı -4,2'ye böleriz. m=8 olur; kontrol: -4,2·8=-33,6."),
      "331": answer("Çözüm: Her iki taraftan 5/6 çıkarırız. q=1/12-5/6=1/12-10/12=-3/4 olur."),
      "333": answer("Çözüm: Her iki tarafı 7/8'e böleriz. m=(1/10)÷(7/8)=1/10·8/7=4/35 olur."),
      "335": answer("Çözüm: Her iki taraftan 3/8 çıkarırız. y=-2/3-3/8=-16/24-9/24=-25/24 olur."),
      "337": answer("Çözüm: 11/20=-f ise her iki tarafın zıttını alırız. f=-11/20 olur."),
      "339": answer("Çözüm: Her iki tarafı -4,2'ye böleriz. a=3,36÷(-4,2)=-0,8 olur."),
      "341": answer("Çözüm: Her iki tarafa 1,25 ekleriz. r=-2,7+1,25=-1,45 olur."),
      "343": answer("Çözüm: h, -3'e bölünmüş. Her iki tarafı -3 ile çarparız ve h=24 buluruz."),
      "345": answer("Çözüm: “Fark” çıkarma demektir: n-1,9=3,4. Her iki tarafa 1,9 eklenince n=5,3 olur."),
      "347": answer("Çözüm: Denklem -6,2x=-4,96 olur. Her iki tarafı -6,2'ye böleriz ve x=0,8 bulunur."),
      "349": answer("Çözüm: Denklem y/(-1,7)=-5 olur. Her iki tarafı -1,7 ile çarparız; y=8,5 olur."),
      "351": answer("Çözüm: Denklem n+(-7,3)=2,4'tür. Her iki tarafa 7,3 ekleriz ve n=9,7 buluruz."),
      "353": answer("Çözüm: 0,75p=78 denkleminde her iki tarafı 0,75'e böleriz. p=78÷0,75=104 dolar olur."),
      "355": answer("Çözüm: 1,2, 1'den büyük olduğu için 1,2y=60 denkleminde y'nin 60'tan küçük olması beklenir. Çözünce y=60÷1,2=50 çıkar; düşünce doğrudur."),
    },
    exerciseSectionSlugs: {
      "285": "ondalik-denklemlerde-cozum-kontrolu",
      "287": "ondalik-denklemlerde-cozum-kontrolu",
      "289": "ondalik-denklemleri-cozme",
      "291": "ondalik-denklemleri-cozme",
      "293": "ondalik-denklemleri-cozme",
      "295": "ondalik-denklemleri-cozme",
      "297": "ondalik-denklemleri-cozme",
      "299": "ondalik-denklemleri-cozme",
      "301": "ondalik-denklemleri-cozme",
      "303": "ondalik-denklemleri-cozme",
      "305": "ondalik-denklemleri-cozme",
      "307": "ondalik-denklemleri-cozme",
      "309": "ondalik-denklemleri-cozme",
      "311": "ondalik-denklemleri-cozme",
      "313": "ondalik-denklemleri-cozme",
      "315": "ondalik-denklemleri-cozme",
      "317": "ondalik-denklemleri-cozme",
      "319": "ondalik-denklemleri-cozme",
      "321": "ondalik-denklemleri-cozme",
      "323": "ondalik-denklemleri-cozme",
      "325": "ondalik-denklemleri-cozme",
      "327": "ondalik-denklemleri-cozme",
      "329": "ondalik-denklemleri-cozme",
      "331": "ondalik-denklemleri-cozme",
      "333": "ondalik-denklemleri-cozme",
      "335": "ondalik-denklemleri-cozme",
      "337": "ondalik-denklemleri-cozme",
      "339": "ondalik-denklemleri-cozme",
      "341": "ondalik-denklemleri-cozme",
      "343": "ondalik-denklemleri-cozme",
      "345": "sozel-durumlari-denkleme-cevirme",
      "347": "sozel-durumlari-denkleme-cevirme",
      "349": "sozel-durumlari-denkleme-cevirme",
      "351": "sozel-durumlari-denkleme-cevirme",
      "353": "sozel-durumlari-denkleme-cevirme",
      "355": "sozel-durumlari-denkleme-cevirme",
    },
  },
];
