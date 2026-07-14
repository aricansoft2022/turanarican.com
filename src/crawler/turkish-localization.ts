import type { ContentBlock, InlineContent } from "@/src/content/types";

export function localizeContentBlocksForTurkish(
  blocks: ContentBlock[],
): ContentBlock[] {
  return blocks.map((block) => {
    if (block.type === "paragraph") {
      return { ...block, text: adaptInlineContentToTurkish(block.text) };
    }

    if (block.type === "list") {
      return {
        ...block,
        items: block.items.map(adaptInlineContentToTurkish),
      };
    }

    if (block.type === "example") {
      return {
        ...block,
        prompt: adaptInlineContentToTurkish(block.prompt),
        solution: localizeContentBlocksForTurkish(block.solution),
      };
    }

    if (block.type === "figure") {
      return {
        ...block,
        caption: block.caption
          ? adaptInlineContentToTurkish(block.caption)
          : undefined,
      };
    }

    if (block.type === "callout") {
      return { ...block, blocks: localizeContentBlocksForTurkish(block.blocks) };
    }

    if (block.type === "table") {
      return {
        ...block,
        columns: block.columns.map(adaptTexStringToTurkish),
        rows: block.rows.map((row) => row.map(adaptTexStringToTurkish)),
      };
    }

    return block;
  });
}

export function localizeExercisePromptForTurkish(
  prompt: InlineContent[],
): InlineContent[] {
  const normalizedPrompt = adaptInlineContentToTurkish(prompt);

  return (
    adaptMultiplesInstruction(normalizedPrompt) ??
    adaptDivisibilityInstruction(normalizedPrompt) ??
    adaptBankingSavingsExercise(normalizedPrompt) ??
    adaptInsuranceDeductibleExercise(normalizedPrompt) ??
    adaptSalePurchaseExercise(normalizedPrompt) ??
    adaptEnvelopeCounterExercise(normalizedPrompt) ??
    adaptAlgebraicEquationSentenceExercise(normalizedPrompt) ??
    adaptAlgebraicWordPhraseExercise(normalizedPrompt) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, evaluate the expression for the given value.",
      "Aşağıdaki alıştırmalarda ifadeyi verilen değer için değerlendirin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, simplify the given expression by combining like terms.",
      "Aşağıdaki alıştırmalarda benzer terimleri birleştirerek verilen ifadeyi sadeleştirin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, translate the given word phrase into an algebraic expression.",
      "Aşağıdaki alıştırmalarda verilen sözcük öbeğini cebirsel ifadeye çevirin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, determine whether each given value is a solution to the equation.",
      "Aşağıdaki alıştırmalarda verilen her değerin denklemin çözümü olup olmadığını belirleyin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, solve each equation using the subtraction property of equality.",
      "Aşağıdaki alıştırmalarda her denklemi eşitliğin çıkarma özelliğini kullanarak çözün.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, solve each equation using the addition property of equality.",
      "Aşağıdaki alıştırmalarda her denklemi eşitliğin toplama özelliğini kullanarak çözün.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, translate the given sentence into an algebraic equation and then solve it.",
      "Aşağıdaki alıştırmalarda verilen cümleyi cebirsel denkleme çevirin ve çözün.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find all the factors of the given number.",
      "Aşağıdaki alıştırmalarda verilen sayının tüm çarpanlarını bulun.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, determine if the given number is prime or composite.",
      "Aşağıdaki alıştırmalarda verilen sayının asal mı bileşik mi olduğunu belirleyin.",
    ) ??
    normalizedPrompt
  );
}

function adaptEnvelopeCounterExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const [instruction, space, description] = prompt;

  if (
    instruction?.type !== "text" ||
    instruction.value !==
      "In the following exercises, write the equation modeled by the envelopes and counters and then solve using the subtraction property of equality." ||
    space?.type !== "text" ||
    space.value.trim() !== "" ||
    description?.type !== "text"
  ) {
    return null;
  }

  const model = description.value
    .replace(
      "The image is divided in half vertically. On the left side is an envelope with ",
      "",
    )
    .replace(" below it. On the right side is ", " | ")
    .replace(" counters.", "")
    .replace("one counter", "1 sayaç")
    .replace("2 counters", "2 sayaç")
    .replace("three counters", "3 sayaç")
    .replace("4 counters", "4 sayaç")
    .replace("5 counters", "5 sayaç")
    .replace("6 counters", "6 sayaç")
    .replace("7 counters", "7 sayaç");

  const [leftCounters, rightCounters] = model.split(" | ");
  if (!leftCounters || !rightCounters) return null;

  return [
    {
      type: "text",
      value: `Aşağıdaki alıştırmalarda zarf ve sayaç modelinin gösterdiği denklemi yazın ve eşitliğin çıkarma özelliğini kullanarak çözün. Modelde sol tarafta bir zarf ve ${leftCounters}, sağ tarafta ${rightCounters} vardır.`,
    },
  ] satisfies InlineContent[];
}

function adaptAlgebraicEquationSentenceExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const instruction = adaptPlainInstruction(
    prompt,
    "In the following exercises, translate the given sentence into an algebraic equation.",
    "Aşağıdaki alıştırmalarda verilen cümleyi cebirsel denkleme çevirin.",
  );
  const solveInstruction = adaptPlainInstruction(
    prompt,
    "In the following exercises, translate the given sentence into an algebraic equation and then solve it.",
    "Aşağıdaki alıştırmalarda verilen cümleyi cebirsel denkleme çevirin ve çözün.",
  );
  const adaptedInstruction = instruction ?? solveInstruction;
  if (!adaptedInstruction) return null;

  const [heading, space, ...phrase] = adaptedInstruction;
  if (space?.type !== "text" || space.value.trim() !== "") return null;

  const sentence = adaptEquationSentencePhrase(phrase);
  return sentence ? [heading, { type: "text", value: " " }, ...sentence] : null;
}

function adaptEquationSentencePhrase(
  phrase: InlineContent[],
): InlineContent[] | null {
  const [first, a, joiner, b, relation, c] = phrase;

  if (
    first?.type === "text" &&
    first.value === "The sum of " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    (relation.value === " is equal to " || relation.value === " is ") &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: " ile " },
      b,
      { type: "text", value: "'nin toplamı " },
      stripTrailingPeriod(c),
      { type: "text", value: "'ye eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "The difference of " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    relation.value === " is equal to " &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: " ile " },
      b,
      { type: "text", value: "'nin farkı " },
      stripTrailingPeriod(c),
      { type: "text", value: "'ye eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "The product of " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    relation.value === " is equal to " &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: " ile " },
      b,
      { type: "text", value: "'un çarpımı " },
      stripTrailingPeriod(c),
      { type: "text", value: "'ye eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "The quotient of " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    relation.value === " is equal to " &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: "'ün " },
      b,
      { type: "text", value: "'ya bölümü " },
      stripTrailingPeriod(c),
      { type: "text", value: "'a eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "Twice the difference of " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    relation.value === " gives " &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: " ile " },
      b,
      { type: "text", value: "'un farkının iki katı " },
      stripTrailingPeriod(c),
      { type: "text", value: " verir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "The sum of three times " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    b?.type === "math" &&
    relation?.type === "text" &&
    relation.value === " is " &&
    c?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: "'nin üç katı ile " },
      b,
      { type: "text", value: "'un toplamı " },
      stripTrailingPeriod(c),
      { type: "text", value: "'e eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "Five more than " &&
    a?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " is equal to " &&
    b?.type === "math"
  ) {
    return [
      a,
      { type: "text", value: "'den beş fazla " },
      stripTrailingPeriod(b),
      { type: "text", value: "'e eşittir." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "math" &&
    a?.type === "text" &&
    a.value === " less than " &&
    joiner?.type === "math" &&
    b?.type === "text" &&
    (b.value === " is " || b.value === " gives ") &&
    relation?.type === "math"
  ) {
    return [
      joiner,
      { type: "text", value: "'den " },
      first,
      { type: "text", value: " eksik " },
      stripTrailingPeriod(relation),
      { type: "text", value: b.value === " is " ? "'a eşittir." : " verir." },
    ] satisfies InlineContent[];
  }

  return null;
}

function adaptSalePurchaseExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const [prefix, discount, paidPrefix, paid, middle, variable, suffix, equation] =
    prompt;

  if (
    prefix?.type !== "text" ||
    prefix.value !== "Sale purchase Arthur bought a suit that was on sale for " ||
    discount?.type !== "math" ||
    paidPrefix?.type !== "text" ||
    paidPrefix.value !== " off. He paid " ||
    paid?.type !== "math" ||
    middle?.type !== "text" ||
    middle.value !== " for the suit. Find the original price, " ||
    variable?.type !== "math" ||
    suffix?.type !== "text" ||
    suffix.value !== " of the suit by solving the equation " ||
    equation?.type !== "math"
  ) {
    return null;
  }

  return [
    {
      type: "text",
      value: "İndirimli alışveriş: Arthur ",
    },
    discount,
    {
      type: "text",
      value: " indirimde olan bir takım elbise aldı ve ",
    },
    paid,
    {
      type: "text",
      value: " ödedi. Takım elbisenin indirimsiz fiyatını, ",
    },
    { ...variable, value: variable.value.replace(/,$/, "") },
    {
      type: "text",
      value: ", denklemi çözerek bulun: ",
    },
    stripTrailingPeriod(equation),
  ] satisfies InlineContent[];
}

function adaptBankingSavingsExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const text = inlineText(prompt);

  if (!text.startsWith("Banking Frank’s grandmother gave him")) {
    return null;
  }

  return [
    {
      type: "text",
      value:
        "Bankacılık: Frank'in büyükannesi lise mezuniyetinde ona 100 dolar verdi. Frank bu parayı harcamak yerine bir banka hesabı açtı ve her hafta hesaba 15 dolar ekledi. Tablo, her haftanın sonunda hesaba toplam kaç dolar koyduğunu gösteriyor. Eksik yerleri tamamlayın: 0. hafta 100 dolar, 1. hafta 115 dolar, 2. hafta 130 dolar; 3, 4, 5 ve 6. haftalar için toplamları bulun.",
    },
  ] satisfies InlineContent[];
}

function adaptInsuranceDeductibleExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const [prefix, deductible, middle, variable, claimPrefix, claim, suffix, equation] =
    prompt;

  if (
    prefix?.type !== "text" ||
    prefix.value !== "Insurance Vince’s car insurance has a " ||
    deductible?.type !== "math" ||
    middle?.type !== "text" ||
    middle.value !==
      " deductible. Find the amount the insurance company will pay, " ||
    variable?.type !== "math" ||
    claimPrefix?.type !== "text" ||
    claimPrefix.value !== " for an " ||
    claim?.type !== "math" ||
    suffix?.type !== "text" ||
    suffix.value !== " claim by solving the equation " ||
    equation?.type !== "math"
  ) {
    return null;
  }

  return [
    {
      type: "text",
      value:
        "Sigorta: Vince'in araç sigortasında 500 dolarlık muafiyet vardır. 1.800 dolarlık bir hasar için sigorta şirketinin ödeyeceği tutarı, ",
    },
    { ...variable, value: variable.value.replace(/,$/, "") },
    {
      type: "text",
      value: ", denklemi çözerek bulun: ",
    },
    { ...equation, value: equation.value.replace(/\.$/, "") },
  ] satisfies InlineContent[];
}

function adaptAlgebraicWordPhraseExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const instruction = adaptPlainInstruction(
    prompt,
    "In the following exercises, translate the given word phrase into an algebraic expression.",
    "Aşağıdaki alıştırmalarda verilen sözcük öbeğini cebirsel ifadeye çevirin.",
  );

  if (!instruction) return null;

  const phrase = instruction.slice(1);
  const [space, prefix, first, joiner, second, ...rest] = phrase;

  if (
    space?.type === "text" &&
    space.value.trim() === "" &&
    prefix?.type === "text" &&
    prefix.value === "Five times the sum of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    second?.type === "math"
  ) {
    return [
      instruction[0],
      { type: "text", value: " " },
      first,
      { type: "text", value: " ile " },
      second,
      { type: "text", value: "'nin toplamının beş katı" },
      ...rest,
    ] satisfies InlineContent[];
  }

  return instruction;
}

function adaptInlineContentToTurkish(items: InlineContent[]): InlineContent[] {
  return items.map(adaptMathTextToTurkish);
}

function inlineText(items: InlineContent[]) {
  return items.map((item) => item.value).join(" ").replace(/\s+/g, " ").trim();
}

function stripTrailingPeriod(item: InlineContent): InlineContent {
  return item.type === "math"
    ? { ...item, value: item.value.replace(/\.$/, "") }
    : item;
}

function adaptMathTextToTurkish(item: InlineContent): InlineContent {
  if (item.type !== "math") return item;

  return {
    ...item,
    value: adaptTexStringToTurkish(item.value),
  };
}

function adaptTexStringToTurkish(value: string) {
  return value
    .replace(/\\text\{Evaluate\}/g, "\\text{Değerlendir}")
    .replace(/\\text\{Determine whether\}/g, "\\text{Belirleyin}")
    .replace(/\\text\{Eight added to\}/g, "\\text{Sekiz eklenmiş}")
    .replace(/\\text\{Eight more than\}/g, "\\text{Sekiz fazla}")
    .replace(/\\text\{Is\}/g, "\\text{}")
    .replace(/\\text\{Is sum of digits divisible by\}/g, "\\text{Rakamlar toplamı bölünebilir mi}")
    .replace(/\\text\{Multiple of 3\}/g, "\\text{3'ün katı}")
    .replace(/\\text\{Multiples of\}/g, "\\text{Katları}")
    .replace(/\\text\{Multiples\}/g, "\\text{Katlar}")
    .replace(/\\text\{Seven less than\}/g, "\\text{Yedi eksik}")
    .replace(/\\text\{Seven subtracted from\}/g, "\\text{Yedi çıkarılmış}")
    .replace(/\\text\{Sum of digits\}/g, "\\text{Rakamlar toplamı}")
    .replace(/\\text\{a solution of\}/g, "\\text{denklemin çözümü mü}")
    .replace(/\\text\{and\}/g, "\\text{ve}")
    .replace(/\\text\{and 8\}/g, "\\text{ve 8}")
    .replace(/\\text\{are like terms\.\}/g, "\\text{benzer terimlerdir.}")
    .replace(/\\text\{by\}/g, "\\text{ile}")
    .replace(/\\text\{divide\}/g, "\\text{böl}")
    .replace(/\\text\{is a solution of\}/g, "\\text{denklemin çözümüdür}")
    .replace(/\\text\{minus\}/g, "\\text{eksi}")
    .replace(/\\text\{of\}/g, "\\text{}")
    .replace(/\\text\{or\}/g, "\\text{veya}")
    .replace(/\\text\{the difference\}/g, "\\text{fark}")
    .replace(/\\text\{the quotient of\}/g, "\\text{bölüm}")
    .replace(/\\text\{when\}/g, "\\text{iken}");
}

function adaptPlainInstruction(
  prompt: InlineContent[],
  source: string,
  target: string,
) {
  const first = prompt[0];
  if (first?.type !== "text" || first.value !== source) return null;

  return [{ ...first, value: target }, ...prompt.slice(1)];
}

function adaptMultiplesInstruction(prompt: InlineContent[]) {
  const [prefix, limit, suffix, ...rest] = prompt;

  if (
    prefix?.type !== "text" ||
    prefix.value !== "In the following exercises, list all the multiples less than " ||
    limit?.type !== "math" ||
    suffix?.type !== "text" ||
    suffix.value !== " for the given number."
  ) {
    return null;
  }

  return [
    { type: "text", value: "Aşağıdaki alıştırmalarda verilen sayı için " },
    limit,
    { type: "text", value: "'den küçük tüm katları listeleyin." },
    ...rest,
  ] satisfies InlineContent[];
}

function adaptDivisibilityInstruction(prompt: InlineContent[]) {
  const [prefix, divisors, ...rest] = prompt;

  if (
    prefix?.type !== "text" ||
    prefix.value !==
      "In the following exercises, use the divisibility tests to determine whether each number is divisible by " ||
    divisors?.type !== "math"
  ) {
    return null;
  }

  return [
    {
      type: "text",
      value: "Aşağıdaki alıştırmalarda her sayının ",
    },
    { ...divisors, value: divisors.value.replace(/\.$/, "") },
    {
      type: "text",
      value:
        " ile bölünüp bölünmediğini belirlemek için bölünebilme testlerini kullanın.",
    },
    ...rest,
  ] satisfies InlineContent[];
}
