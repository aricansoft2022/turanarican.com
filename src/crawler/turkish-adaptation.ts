import type { InlineContent } from "@/src/content/types";

export function adaptExercisePromptToTurkish(
  prompt: InlineContent[],
): InlineContent[] {
  const normalizedPrompt = prompt.map(adaptMathTextToTurkish);

  return (
    adaptMultiplesInstruction(normalizedPrompt) ??
    adaptDivisibilityInstruction(normalizedPrompt) ??
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

function adaptMathTextToTurkish(item: InlineContent): InlineContent {
  if (item.type !== "math") return item;

  return {
    ...item,
    value: item.value
      .replace(/\\text\{and\}/g, "\\text{ve}")
      .replace(/\\text\{when\}/g, "\\text{iken}"),
  };
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
