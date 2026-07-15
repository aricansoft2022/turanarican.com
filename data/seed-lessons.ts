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
];
