export const sourceBooks = [
  {
    slug: "prealgebra-2e-openstax",
    title: "Prealgebra 2e",
    sourceUrl:
      "https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)",
    licenseName: "CC BY 4.0",
    sourceLocale: "en-US",
    targetLocale: "tr-TR",
    numberingPolicy: "skip_intro_shift",
    targetRanges: [
      ["1.2", "1.6"],
      ["2.2", "2.6"],
      ["3.2", "3.6"],
      ["4.2", "4.8"],
      ["5.2", "5.8"],
      ["6.2", "6.6"],
      ["7.2", "7.6"],
      ["8.2", "8.5"],
      ["9.2", "9.8"],
      ["10.2", "10.7"],
      ["11.2", "11.5"],
    ],
  },
  {
    slug: "elementary-algebra-libretexts",
    title: "Elementary Algebra",
    sourceUrl:
      "https://math.libretexts.org/Bookshelves/Algebra/Elementary_Algebra_(LibreTexts)",
    licenseName: "CC BY-NC-SA 3.0",
    sourceLocale: "en-US",
    targetLocale: "tr-TR",
    numberingPolicy: "preserve",
    targetRanges: [],
  },
] as const;
