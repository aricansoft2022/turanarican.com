type NumberLocalizationOptions = {
  preserveLabeledReferences?: boolean;
};

const labeledReferencePattern =
  /\b(?:section|chapter|example|exercise|try it|figure|table|page|bölüm|bolum|örnek|ornek|alıştırma|alistirma|şekil|sekil|tablo|sayfa)\s+\d+(?:\.\d+)+(?:[a-z])?\b/gi;

const englishNumberPattern =
  /(?<![\p{L}\p{N}_])([+-]?(?:(?:\d{1,3}(?:,\d{3})+)|(?:\d+))(?:\.\d+)?)(?![\p{L}\p{N}_])/gu;

export function localizeEnglishNumberSeparators(
  input: string,
  options: NumberLocalizationOptions = {},
) {
  return localizeNumberSeparators(input, ",", options);
}

export function localizeEnglishMathNumberSeparators(
  input: string,
  options: NumberLocalizationOptions = {},
) {
  return localizeNumberSeparators(input, "{,}", options);
}

function localizeNumberSeparators(
  input: string,
  decimalMark: "," | "{,}",
  { preserveLabeledReferences = true }: NumberLocalizationOptions,
) {
  return withProtectedReferences(input, preserveLabeledReferences, (text) =>
    text.replace(englishNumberPattern, (match) =>
      formatEnglishNumber(match, decimalMark),
    ),
  );
}

function withProtectedReferences(
  input: string,
  enabled: boolean,
  transform: (input: string) => string,
) {
  if (!enabled) return transform(input);

  const references: string[] = [];
  const protectedInput = input.replace(labeledReferencePattern, (match) => {
    const key = `__TR_REF_${references.length}__`;
    references.push(match);
    return key;
  });

  return transform(protectedInput).replace(/__TR_REF_(\d+)__/g, (_, index) => {
    return references[Number(index)] ?? "";
  });
}

function formatEnglishNumber(input: string, decimalMark: "," | "{,}") {
  const sign = input.startsWith("-") || input.startsWith("+") ? input[0] : "";
  const unsigned = sign ? input.slice(1) : input;
  const [integerPart, decimalPart] = unsigned.split(".");
  const localizedInteger = integerPart.replace(/,/g, ".");

  if (!decimalPart) return `${sign}${localizedInteger}`;

  return `${sign}${localizedInteger}${decimalMark}${decimalPart}`;
}
