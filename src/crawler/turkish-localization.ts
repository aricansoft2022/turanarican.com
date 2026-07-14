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
