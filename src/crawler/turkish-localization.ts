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
    adaptAlgebraicExpressionWritingExercise(normalizedPrompt) ??
    adaptCarInsuranceExpressionProblem(normalizedPrompt) ??
    adaptGroceryLcmExercise(normalizedPrompt) ??
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
      "In the following exercises, list the terms in the given expression.",
      "Aşağıdaki alıştırmalarda verilen ifadedeki terimleri listeleyin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, identify the coefficient of the given term.",
      "Aşağıdaki alıştırmalarda verilen terimin katsayısını belirleyin.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, identify all sets of like terms.",
      "Aşağıdaki alıştırmalarda benzer terim gruplarını belirleyin.",
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
      "In the following exercises, find the prime factorization of each number using the factor tree method.",
      "Aşağıdaki alıştırmalarda her sayıyı çarpan ağacı yöntemiyle asal çarpanlarına ayırın.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find the prime factorization of each number using the ladder method.",
      "Aşağıdaki alıştırmalarda her sayıyı bölme merdiveni yöntemiyle asal çarpanlarına ayırın.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find the prime factorization of each number using any method.",
      "Aşağıdaki alıştırmalarda her sayıyı istediğiniz yöntemle asal çarpanlarına ayırın.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find the least common multiple (LCM) by listing multiples.",
      "Aşağıdaki alıştırmalarda katları listeleyerek en küçük ortak katı (EKOK) bulun.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find the least common multiple (LCM) by using the prime factors method.",
      "Aşağıdaki alıştırmalarda asal çarpanlar yöntemini kullanarak en küçük ortak katı (EKOK) bulun.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, find the least common multiple (LCM) using any method.",
      "Aşağıdaki alıştırmalarda istediğiniz yöntemle en küçük ortak katı (EKOK) bulun.",
    ) ??
    adaptPlainInstruction(
      normalizedPrompt,
      "In the following exercises, determine if the given number is prime or composite.",
      "Aşağıdaki alıştırmalarda verilen sayının asal mı bileşik mi olduğunu belirleyin.",
    ) ??
    normalizedPrompt
  );
}

function adaptGroceryLcmExercise(prompt: InlineContent[]): InlineContent[] | null {
  const text = inlineText(prompt);

  if (!text.startsWith("Grocery shopping Hot dogs are sold in packages of ten")) {
    return null;
  }

  return [
    {
      type: "text",
      value:
        "Market alışverişi: Sosisler 10'lu paketlerde, sosis ekmekleri ise 8'li paketlerde satılıyor. Aynı sayıda sosis ve ekmek almak istiyorsanız satın alınabilecek en küçük sosis ve ekmek sayısı kaçtır? İpucu: Bu sayı EKOK'tur.",
    },
  ] satisfies InlineContent[];
}

function adaptAlgebraicExpressionWritingExercise(
  prompt: InlineContent[],
): InlineContent[] | null {
  const [instruction, space, ...problem] = prompt;

  if (
    instruction?.type !== "text" ||
    instruction.value !==
      "In the following exercises, write an algebraic expression." ||
    space?.type !== "text" ||
    space.value.trim() !== ""
  ) {
    return null;
  }

  const [first, amount, second, variable, third] = problem;

  if (
    first?.type === "text" &&
    first.value === "Adele bought a skirt and a blouse. The skirt cost " &&
    amount?.type === "math" &&
    second?.type === "text" &&
    second.value === " more than the blouse. Let " &&
    variable?.type === "math" &&
    third?.type === "text" &&
    third.value ===
      " represent the cost of the blouse. Write an expression for the cost of the skirt."
  ) {
    return [
      { type: "text", value: "Aşağıdaki alıştırmalarda cebirsel ifade yazın. Adele bir etek ve bir bluz aldı. Etek, bluzdan " },
      amount,
      { type: "text", value: " daha pahalıdır. Bluzun fiyatını " },
      variable,
      { type: "text", value: " temsil etsin. Eteğin fiyatı için bir ifade yazın." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value === "The number of girls in a second-grade class is " &&
    amount?.type === "math" &&
    second?.type === "text" &&
    second.value === " less than the number of boys. Let " &&
    variable?.type === "math" &&
    third?.type === "text" &&
    third.value ===
      " represent the number of boys. Write an expression for the number of girls."
  ) {
    return [
      { type: "text", value: "Aşağıdaki alıştırmalarda cebirsel ifade yazın. İkinci sınıftaki kız öğrenci sayısı, erkek öğrenci sayısından " },
      amount,
      { type: "text", value: " eksiktir. Erkek öğrenci sayısını " },
      variable,
      { type: "text", value: " temsil etsin. Kız öğrenci sayısı için bir ifade yazın." },
    ] satisfies InlineContent[];
  }

  if (
    first?.type === "text" &&
    first.value ===
      "Greg has nickels and pennies in his pocket. The number of pennies is seven less than twice the number of nickels. Let " &&
    amount?.type === "math" &&
    second?.type === "text" &&
    second.value ===
      " represent the number of nickels. Write an expression for the number of pennies."
  ) {
    return [
      { type: "text", value: "Aşağıdaki alıştırmalarda cebirsel ifade yazın. Greg'in cebinde 5 sentlik ve 1 sentlik madeni paralar var. 1 sentliklerin sayısı, 5 sentliklerin sayısının iki katından yedi eksiktir. 5 sentliklerin sayısını " },
      amount,
      { type: "text", value: " temsil etsin. 1 sentliklerin sayısı için bir ifade yazın." },
    ] satisfies InlineContent[];
  }

  return null;
}

function adaptCarInsuranceExpressionProblem(
  prompt: InlineContent[],
): InlineContent[] | null {
  const [instruction, space, prefix, deductible, middle, paid, afterPaid, beyond, claimPrefix, claim, suffix] =
    prompt;

  if (
    instruction?.type !== "text" ||
    instruction.value !==
      "In the following exercises, use algebraic expressions to solve the problem." ||
    space?.type !== "text" ||
    space.value.trim() !== "" ||
    prefix?.type !== "text" ||
    prefix.value !== "Car insurance Justin’s car insurance has a " ||
    deductible?.type !== "math" ||
    middle?.type !== "text" ||
    middle.value !== " deductible per incident. This means that he pays " ||
    paid?.type !== "math" ||
    afterPaid?.type !== "text" ||
    afterPaid.value !==
      " and his insurance company will pay all costs beyond " ||
    beyond?.type !== "math" ||
    claimPrefix?.type !== "text" ||
    claimPrefix.value !== " If Justin files a claim for " ||
    claim?.type !== "math" ||
    suffix?.type !== "text" ||
    suffix.value !==
      " how much will he pay, and how much will his insurance company pay?"
  ) {
    return null;
  }

  return [
    { type: "text", value: "Aşağıdaki alıştırmalarda cebirsel ifadeler kullanarak problemi çözün. Araç sigortası: Justin'in araç sigortasında olay başına " },
    stripTrailingPeriod(deductible),
    { type: "text", value: " muafiyet vardır. Bu, Justin'in " },
    stripTrailingPeriod(paid),
    { type: "text", value: " ödeyeceği ve sigorta şirketinin bunun üzerindeki tüm masrafları karşılayacağı anlamına gelir. Justin " },
    stripTrailingComma(claim),
    { type: "text", value: " tutarında hasar bildirirse Justin ne kadar öder, sigorta şirketi ne kadar öder?" },
  ] satisfies InlineContent[];
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
  const simplePhrase = adaptSimpleAlgebraicWordPhrase(phrase);
  if (simplePhrase) {
    return [instruction[0], { type: "text", value: " " }, ...simplePhrase];
  }

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

function adaptSimpleAlgebraicWordPhrase(
  phrase: InlineContent[],
): InlineContent[] | null {
  const textOnly = inlineText(phrase);
  const replacements: Record<string, string> = {
    "The sum of 8 and 12": "8 ile 12'nin toplamı",
    "The difference of 14 and 9": "14 ile 9'un farkı",
    "The product of 9 and 7": "9 ile 7'nin çarpımı",
    "The quotient of 36 and 9": "36'nın 9'a bölümü",
  };
  const replacement = replacements[textOnly];
  if (replacement) return [{ type: "text", value: replacement }];

  const [space, prefix, first, joiner, second] = phrase;
  if (space?.type !== "text" || space.value.trim() !== "") return null;

  if (
    prefix?.type === "text" &&
    prefix.value === "The difference of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    second?.type === "math"
  ) {
    return [
      first,
      { type: "text", value: " ile " },
      second,
      { type: "text", value: "'ün farkı" },
    ] satisfies InlineContent[];
  }

  if (
    prefix?.type === "text" &&
    prefix.value === "The product of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    second?.type === "math"
  ) {
    return [
      first,
      { type: "text", value: " ile " },
      second,
      { type: "text", value: "'nin çarpımı" },
    ] satisfies InlineContent[];
  }

  if (
    prefix?.type === "text" &&
    prefix.value === "The sum of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    second?.type === "math"
  ) {
    return [
      first,
      { type: "text", value: " ile " },
      second,
      { type: "text", value: "'in toplamı" },
    ] satisfies InlineContent[];
  }

  if (
    prefix?.type === "text" &&
    prefix.value === "The quotient of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and " &&
    second?.type === "math"
  ) {
    return [
      first,
      { type: "text", value: "'nin " },
      second,
      { type: "text", value: "'e bölümü" },
    ] satisfies InlineContent[];
  }

  if (
    prefix?.type === "text" &&
    prefix.value === "Eight times the difference of " &&
    first?.type === "math" &&
    joiner?.type === "text" &&
    joiner.value === " and nine"
  ) {
    return [
      first,
      { type: "text", value: " ile 9'un farkının sekiz katı" },
    ] satisfies InlineContent[];
  }

  return null;
}

function adaptInlineContentToTurkish(items: InlineContent[]): InlineContent[] {
  return items.map(adaptMathTextToTurkish);
}

function inlineText(items: InlineContent[]) {
  return items.map((item) => item.value).join(" ").replace(/\s+/g, " ").trim();
}

function stripTrailingPeriod(item: InlineContent): InlineContent {
  return item.type === "math"
    ? { ...item, value: item.value.replace(/\.$/, "").replace(/\.}$/, "}") }
    : item;
}

function stripTrailingComma(item: InlineContent): InlineContent {
  return item.type === "math"
    ? { ...item, value: item.value.replace(/,$/, "").replace(/,}$/, "}") }
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
