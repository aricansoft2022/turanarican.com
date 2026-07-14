import { ChevronDown } from "lucide-react";

import { MathText } from "@/components/lesson/MathText";
import type { InlineContent } from "@/src/content/types";

export function AnswerReveal({ answer }: { answer: InlineContent[] }) {
  return (
    <details className="group answer-reveal">
      <summary className="inline-flex min-h-7 cursor-pointer list-none items-center gap-1 border border-brand-red/35 bg-white px-2 py-1 text-[11px] font-extrabold uppercase leading-none text-brand-red transition hover:bg-brand-soft">
        Cevap
        <ChevronDown
          aria-hidden="true"
          className="size-3 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-2 text-sm font-bold text-brand-red">
        <MathText items={answer} />
      </div>
    </details>
  );
}
