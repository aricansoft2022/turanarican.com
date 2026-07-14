import katex from "katex";

import type { InlineContent } from "@/src/content/types";

function renderMath(value: string, displayMode = false) {
  return {
    __html: katex.renderToString(value, {
      displayMode,
      throwOnError: false,
      strict: "ignore",
    }),
  };
}

export function MathText({ items }: { items: InlineContent[] }) {
  return (
    <>
      {items.map((item, index) => {
        if (item.type === "text") {
          return <span key={index}>{item.value}</span>;
        }

        return (
          <span
            key={index}
            className={item.display ? "block py-2" : "inline-math"}
            dangerouslySetInnerHTML={renderMath(item.value, item.display)}
          />
        );
      })}
    </>
  );
}

