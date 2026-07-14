import Link from "next/link";
import type { Route } from "next";
import { BookOpen, Menu } from "lucide-react";

import { LogoPlaceholder } from "@/components/layout/LogoPlaceholder";
import type { Book, Lesson } from "@/src/content/types";

export function LessonNav({ book, lesson }: { book: Book; lesson: Lesson }) {
  const chapter = book.chapters.find((item) => item.slug === lesson.chapterSlug);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-brand-red bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3">
          <LogoPlaceholder />
          <label
            htmlFor="lesson-drawer"
            className="inline-flex cursor-pointer items-center gap-2 border border-brand-red px-3 py-2 text-sm font-bold text-brand-red lg:hidden"
          >
            <Menu className="size-4" />
            Menü
          </label>
        </div>
      </header>

      <input id="lesson-drawer" type="checkbox" className="peer sr-only" />
      <label
        htmlFor="lesson-drawer"
        className="fixed inset-0 z-40 hidden bg-ink/40 peer-checked:block lg:hidden"
        aria-label="Menüyü kapat"
      />

      <aside className="fixed inset-y-0 left-0 z-50 w-[320px] max-w-[88vw] -translate-x-full overflow-y-auto border-r border-ink/15 bg-white p-4 transition peer-checked:translate-x-0 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0">
        <div className="mb-6 hidden lg:block">
          <LogoPlaceholder />
        </div>
        <div className="mb-5 flex items-center gap-2 text-sm font-extrabold uppercase text-brand-red">
          <BookOpen className="size-4" />
          {book.title}
        </div>

        <nav aria-label="Ders menüsü" className="grid gap-5">
          {book.chapters.map((chapterItem) => (
            <section key={chapterItem.id}>
              <h2 className="mb-2 text-sm font-extrabold text-ink">
                {chapterItem.displayNumber}. {chapterItem.displayTitle}
              </h2>
              <ul className="grid gap-1">
                {chapterItem.lessons.map((lessonItem) => {
                  const href =
                    `/kitap/${book.slug}/${chapterItem.slug}/${lessonItem.slug}` as Route;
                  const isCurrent = lessonItem.id === lesson.id;

                  return (
                    <li key={lessonItem.id}>
                      <Link
                        href={href}
                        className={
                          isCurrent
                            ? "block border-l-4 border-brand-red bg-brand-soft px-3 py-2 text-sm font-bold text-brand-red"
                            : "block border-l-4 border-transparent px-3 py-2 text-sm text-ink/72 hover:border-brand-red/35 hover:bg-brand-soft"
                        }
                      >
                        {lessonItem.displayNumber} {lessonItem.displayTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        <div className="mt-8 border-t border-ink/10 pt-5">
          <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-brand-red">
            Sayfa İçeriği
          </h2>
          <ul className="grid gap-2 text-sm">
            {lesson.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.slug}`} className="text-ink/72 hover:text-brand-red">
                  {section.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#alistirmalar" className="text-ink/72 hover:text-brand-red">
                Alıştırmalar
              </a>
            </li>
          </ul>
        </div>

        {chapter ? (
          <p className="mt-8 text-xs leading-relaxed text-ink/55">
            Kaynak bölüm: {chapter.sourceNumber}. {chapter.sourceTitle}
          </p>
        ) : null}
      </aside>
    </>
  );
}
