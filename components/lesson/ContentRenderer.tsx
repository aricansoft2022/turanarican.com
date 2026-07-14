import { MathText } from "@/components/lesson/MathText";
import type { ContentBlock } from "@/src/content/types";

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="lesson-paragraph">
              <MathText items={block.text} />
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="my-4 grid gap-2 pl-5 text-[1.02rem]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="list-disc">
                  <MathText items={item} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="my-6 overflow-x-auto border border-ink/20">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead className="bg-brand-soft text-ink">
                  <tr>
                    {block.columns.map((column) => (
                      <th key={column} className="border border-ink/10 px-4 py-3">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-ink/10 px-4 py-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "figure") {
          return (
            <figure
              key={index}
              className="my-6 border border-ink/15 bg-white p-4 shadow-[7px_7px_0_#ffe1e1]"
            >
              <div className="flex aspect-[16/9] items-center justify-center border border-dashed border-brand-red/40 bg-brand-soft text-sm font-bold uppercase text-brand-red">
                Görsel asset: {block.assetId}
              </div>
              {block.caption ? (
                <figcaption className="mt-3 text-sm text-ink/65">
                  <MathText items={block.caption} />
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "callout") {
          return (
            <section
              key={index}
              className="my-6 border border-ink/20 border-l-[14px] border-l-brand-red bg-white p-5 shadow-[10px_10px_0_#ffe1e1]"
            >
              <div className="mb-3 text-xs font-extrabold uppercase tracking-wide text-brand-red">
                {block.label}
              </div>
              <ContentRenderer blocks={block.blocks} />
            </section>
          );
        }

        return (
          <section
            key={index}
            className="my-6 border border-brand-red bg-[#fff7f7] p-5"
          >
            <div className="mb-3 inline-flex bg-brand-red px-3 py-1 text-xs font-extrabold uppercase text-white">
              {block.label}
            </div>
            <p className="lesson-paragraph">
              <MathText items={block.prompt} />
            </p>
            <details className="mt-4">
              <summary className="inline-flex cursor-pointer list-none border border-brand-red/35 bg-white px-3 py-2 text-xs font-extrabold uppercase text-brand-red hover:bg-brand-soft">
                Çözümü Göster
              </summary>
              <div className="mt-3 border border-brand-red bg-white p-4">
                <ContentRenderer blocks={block.solution} />
              </div>
            </details>
          </section>
        );
      })}
    </>
  );
}
