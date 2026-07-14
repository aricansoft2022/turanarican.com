import type { ContentBlock, InlineContent, Lesson } from "@/src/content/types";

import { readSeedFixture } from "./validate-seed-lessons";

type TextFragment = {
  lessonSlug: string;
  context: string;
  text: string;
};

const englishSignalPattern =
  /\b(?:the|and|with|from|then|number|numbers|expression|expressions|equation|equations|multiple|multiples|factor|factors|prime|composite|find|identify|determine|using|following|exercises|answer|solution|table|figure|step|each|given|counting|substitute|simplify|solve)\b/i;
const englishSignalTokenPattern =
  /\b(?:the|and|with|from|then|number|numbers|expression|expressions|equation|equations|multiple|multiples|factor|factors|prime|composite|find|identify|determine|using|following|exercises|answer|solution|table|figure|step|each|given|counting|substitute|simplify|solve)\b/gi;

async function main() {
  const fixture = await readSeedFixture();
  const lessons = fixture.lessons.map((entry) => entry.lesson);
  const fragments = lessons.flatMap(collectLessonFragments);
  const flagged = fragments.filter((fragment) =>
    englishSignalPattern.test(fragment.text),
  );

  const byLesson = lessons.map((lesson) => {
    const lessonFragments = fragments.filter(
      (fragment) => fragment.lessonSlug === lesson.slug,
    );
    const lessonFlagged = flagged.filter(
      (fragment) => fragment.lessonSlug === lesson.slug,
    );

    return {
      slug: lesson.slug,
      title: lesson.displayTitle,
      fragments: lessonFragments.length,
      englishSignalFragments: lessonFlagged.length,
      englishSignalRatio: ratio(lessonFlagged.length, lessonFragments.length),
      samples: lessonFlagged.slice(0, 5).map((fragment) => ({
        context: fragment.context,
        text: truncate(fragment.text),
      })),
    };
  });

  console.log("Seed language coverage report.");
  console.log(
    JSON.stringify(
      {
        lessons: lessons.length,
        fragments: fragments.length,
        englishSignalFragments: flagged.length,
        englishSignalRatio: ratio(flagged.length, fragments.length),
        topSignals: summarizeTopSignals(flagged),
        byLesson,
      },
      null,
      2,
    ),
  );
}

function collectLessonFragments(lesson: Lesson): TextFragment[] {
  const fragments: TextFragment[] = [];
  const push = (context: string, text: string) => {
    const cleaned = text.replace(/\s+/g, " ").trim();
    if (cleaned) fragments.push({ lessonSlug: lesson.slug, context, text: cleaned });
  };

  push("summary", lesson.summary);
  lesson.objectives.forEach((objective, index) =>
    push(`objective:${index + 1}`, objective),
  );

  for (const section of lesson.sections) {
    push(`section:${section.slug}:heading`, section.heading);
    collectBlockFragments(section.blocks, `section:${section.slug}`, push);
  }

  for (const exercise of lesson.exercises) {
    collectInlineFragments(
      exercise.prompt,
      `exercise:${exercise.number}:prompt`,
      push,
    );
    collectInlineFragments(
      exercise.answer,
      `exercise:${exercise.number}:answer`,
      push,
    );
  }

  return fragments;
}

function collectBlockFragments(
  blocks: ContentBlock[],
  context: string,
  push: (context: string, text: string) => void,
) {
  for (const [index, block] of blocks.entries()) {
    const blockContext = `${context}:block:${index + 1}:${block.type}`;

    if (block.type === "paragraph") {
      collectInlineFragments(block.text, blockContext, push);
      continue;
    }

    if (block.type === "list") {
      block.items.forEach((item, itemIndex) =>
        collectInlineFragments(item, `${blockContext}:item:${itemIndex + 1}`, push),
      );
      continue;
    }

    if (block.type === "table") {
      block.columns.forEach((column, columnIndex) =>
        push(`${blockContext}:column:${columnIndex + 1}`, column),
      );
      block.rows.forEach((row, rowIndex) =>
        row.forEach((cell, cellIndex) =>
          push(`${blockContext}:row:${rowIndex + 1}:cell:${cellIndex + 1}`, cell),
        ),
      );
      continue;
    }

    if (block.type === "figure") {
      collectInlineFragments(block.caption ?? [], `${blockContext}:caption`, push);
      continue;
    }

    if (block.type === "callout") {
      push(`${blockContext}:label`, block.label);
      collectBlockFragments(block.blocks, blockContext, push);
      continue;
    }

    push(`${blockContext}:label`, block.label);
    collectInlineFragments(block.prompt, `${blockContext}:prompt`, push);
    collectBlockFragments(block.solution, `${blockContext}:solution`, push);
  }
}

function collectInlineFragments(
  items: InlineContent[],
  context: string,
  push: (context: string, text: string) => void,
) {
  const text = items
    .filter((item) => item.type === "text")
    .map((item) => item.value)
    .join(" ");

  push(context, text);

  const mathText = items
    .filter((item) => item.type === "math")
    .map((item) => extractMathText(item.value))
    .filter(Boolean)
    .join(" ");

  push(`${context}:math-text`, mathText);
}

function extractMathText(value: string) {
  return [...value.matchAll(/\\text\{([^}]*)\}/g)]
    .map((match) => match[1])
    .join(" ");
}

function ratio(part: number, total: number) {
  return total === 0 ? 0 : Number((part / total).toFixed(3));
}

function truncate(text: string) {
  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function summarizeTopSignals(fragments: TextFragment[]) {
  const counts = new Map<string, number>();

  for (const fragment of fragments) {
    for (const match of fragment.text.matchAll(englishSignalTokenPattern)) {
      const key = match[0].toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 20)
    .map(([signal, count]) => ({ signal, count }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
