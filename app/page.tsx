import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, BookOpen, Database, ShieldCheck } from "lucide-react";

import { LogoPlaceholder } from "@/components/layout/LogoPlaceholder";
import { books } from "@/data/catalog";

export default function HomePage() {
  const firstLesson = books[0].chapters[0].lessons[0];
  const firstLessonHref =
    `/kitap/${books[0].slug}/${books[0].chapters[0].slug}/${firstLesson.slug}` as Route;

  return (
    <main className="page-shell">
      <div className="mx-auto grid min-h-screen max-w-[1180px] content-start px-5 pb-16 pt-8">
        <nav className="flex items-center justify-between border-b-2 border-brand-red pb-4">
          <LogoPlaceholder />
          <Link
            href={firstLessonHref}
            className="inline-flex items-center gap-2 border border-brand-red px-4 py-2 text-sm font-extrabold text-brand-red hover:bg-brand-soft"
          >
            Derse Git
            <ArrowRight className="size-4" />
          </Link>
        </nav>

        <section className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <p className="eyebrow">Açık kaynaklardan Türkçe matematik platformu</p>
            <h1 className="mt-8 max-w-[12ch] font-display text-[clamp(3rem,9vw,7.2rem)] uppercase leading-[.92] text-ink [text-shadow:3px_3px_0_#fff,7px_7px_0_rgba(216,0,0,.28)]">
              Matematiği çalışılabilir hale getir.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/78">
              Turan Arıcan Matematik; açık eğitim kaynaklarını Türkçe, düzenli,
              etkileşimli ve SEO dostu derslere dönüştüren bir çalışma
              platformudur.
            </p>
          </div>
          <div className="issue-card">
            <span>Beta</span>
            <span>Platform</span>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Ders Odaklı",
              text: "Kitap, bölüm, sayfa ve sayfa içi başlıklarla hızlı gezinme.",
            },
            {
              icon: Database,
              title: "Yapısal İçerik",
              text: "Kaynak, lisans, numara kaydırma ve cevaplar veri modelinde korunur.",
            },
            {
              icon: ShieldCheck,
              title: "Üretime Hazır",
              text: "Cloudflare, Turso, SEO, OG ve attribution baştan tasarlanır.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="border border-ink/20 border-l-[10px] border-l-brand-red bg-white p-5 shadow-[8px_8px_0_#ffe1e1]"
            >
              <item.icon className="mb-5 size-6 text-brand-red" />
              <h2 className="text-lg font-extrabold uppercase text-ink">
                {item.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink/72">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 bg-brand-red p-8 text-white shadow-[7px_7px_0_rgba(23,11,11,.32)]">
          <p className="text-xs font-extrabold uppercase tracking-wide opacity-75">
            İlk kitap
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase">{books[0].title}</h2>
          <p className="mt-3 max-w-2xl text-white/90">{books[0].subtitle}</p>
          <Link
            href={firstLessonHref}
            className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-extrabold uppercase text-brand-red"
          >
            İlk örnek derse geç
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
