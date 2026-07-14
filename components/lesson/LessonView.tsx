import Link from "next/link";

import { AnswerReveal } from "@/components/lesson/AnswerReveal";
import { ContentRenderer } from "@/components/lesson/ContentRenderer";
import { MathText } from "@/components/lesson/MathText";
import type { Book, Lesson } from "@/src/content/types";

export function LessonView({ book, lesson }: { book: Book; lesson: Lesson }) {
  return (
    <article className="lesson-shell">
      <div className="lesson-breadcrumb">
        <Link href="/">Turan Arıcan</Link>
        <span>›</span>
        <Link href={`/kitap/${book.slug}`}>{book.title}</Link>
        <span>›</span>
        <span>{lesson.displayNumber}</span>
      </div>

      <header className="lesson-hero">
        <div className="min-w-0">
          <p className="eyebrow">Bölüm {lesson.displayNumber}</p>
          <h1>{lesson.displayTitle}</h1>
          <p className="lesson-summary">{lesson.summary}</p>
          <div className="lesson-stripe" />
        </div>
        <div className="issue-card">
          <span>Cebir</span>
          <span>Sayı {lesson.displayNumber}</span>
        </div>
      </header>

      <section className="objective-card">
        <p className="text-xs font-extrabold uppercase tracking-wide opacity-75">
          Öğrenme Hedefleri
        </p>
        <p className="mt-3 text-lg">Bu bölümün sonunda şunları yapabileceksiniz:</p>
        <ol className="mt-4 grid gap-3">
          {lesson.objectives.map((objective, index) => (
            <li key={objective} className="flex gap-3">
              <span className="font-extrabold opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{objective}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-12">
        {lesson.sections.map((section) => (
          <section key={section.id} id={section.slug} className="scroll-mt-24">
            <h2>{section.heading}</h2>
            <ContentRenderer blocks={section.blocks} />
          </section>
        ))}
      </div>

      <section id="alistirmalar" className="mt-16 scroll-mt-24">
        <p className="eyebrow">Alıştırmalar · Pratik ustalık kazandırır</p>
        <h2>Bölüm {lesson.displayNumber} Alıştırmalar</h2>
        <div className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {lesson.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex flex-wrap items-baseline gap-3 border-b border-ink/10 py-3"
            >
              <span className="min-w-8 text-xs font-extrabold text-brand-red">
                {exercise.number}.
              </span>
              <span className="min-w-0 flex-1 text-base">
                <MathText items={exercise.prompt} />
              </span>
              <AnswerReveal answer={exercise.answer} />
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-ink/15 pt-6 text-sm text-ink/65">
        <p>{lesson.license.attribution}</p>
        <p className="mt-2">
          Lisans:{" "}
          <a href={lesson.license.url} rel="noreferrer" target="_blank">
            {lesson.license.name}
          </a>
          . Kaynak sayfa:{" "}
          <a href={lesson.sourceUrl} rel="noreferrer" target="_blank">
            LibreTexts
          </a>
          .
        </p>
      </footer>
    </article>
  );
}

