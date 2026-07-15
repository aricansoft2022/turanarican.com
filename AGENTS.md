# Project Reference and Workflow

This file is the handoff anchor for future Codex sessions. When the user says
"repodaki uretimi devam et", read this file first, then inspect the current
git status and continue from the next unfinished item.

Current workflow preference: continue locally from `main`. Do not push to
remote and do not write to any remote/production database until the user
explicitly asks for that specific action. Local validation, generated fixtures,
and local commits are okay when they close a meaningful milestone.

For deploy, dashboard, Turso, Cloudflare, or R2 bucket steps, also read
`docs/OPERATIONS.md` and update it when the operational workflow changes.

## Product Goal

Build `turanarican.com` as a responsive Turkish math education platform. The
first production source is LibreTexts/OpenStax Prealgebra 2e. The current static
HTML lesson is a visual prototype/reference for the platform design language,
not the final app architecture.

The platform should support multiple books over time, with shared rendering,
navigation, SEO, attribution, and ingestion workflows.

## Current Repository State

- Current branch after the last handoff: `main`.
- Recent production commits include:
  - `6f16ea1 Add fraction multiplication division seed lesson`
  - `3317b15 Add fractions visualization seed lesson`
  - `5ddbf79 Add integer equations seed lesson`
  - `a56b0ef Add integer multiplication division seed lesson`
  - `9005ce6 Add integer subtraction seed lesson`
- Latest confirmed seed DB write count:
  - `books`: 1
  - `chapters`: 4
  - `lessons`: 19
  - `lessonSections`: 101
  - `exercises`: 726
  - `sourceSnapshots`: 19
  - `sourceAssets`: 511
- Latest generated local seed payload count, not yet written to remote DB:
  - `books`: 1
  - `chapters`: 4
  - `lessons`: 20
  - `lessonSections`: 104
  - `exercises`: 762
  - `sourceSnapshots`: 20
  - `sourceAssets`: 523
- Next.js/Tailwind/Turso/Drizzle/Cloudflare app scaffold has been started.
- Current tracked app artifact moved to
  `reference/legacy/ifadeleri-degerlendirme.html`.
- Removed prototype/export leftovers: `support.js`, `.thumbnail`.
- Existing HTML demonstrates the intended red/black magazine-style lesson UI,
  Turkish text fixes, KaTeX rendering, single-scroll layout, and answer reveal
  behavior.

Do not treat the legacy HTML file as the long-term implementation. It is the
design and content reference while the modular Next.js app takes over.

## Target Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Turso SQLite
- Drizzle ORM
- Cloudflare Pages/Workers via OpenNext for Cloudflare
- KaTeX for math rendering
- Dynamic OG image generation
- Cloudflare WAF/rate limiting/bot protection

Use Tailwind, but preserve the current design language: red accent, black
display typography, faint red grid, sharp editorial cards, restrained shadows,
and compact study-focused layouts.

## Source Books Observed

### Prealgebra 2e (OpenStax)

Source URL:
https://math.libretexts.org/Bookshelves/PreAlgebra/Prealgebra_2e_(OpenStax)

License observed on LibreTexts: CC BY 4.0, author/source OpenStax.

Initial target ranges:

- 2.3 through 2.6
- 3.2 through 3.6
- 4.2 through 4.8
- 5.2 through 5.8
- 6.2 through 6.6
- 7.2 through 7.6
- 8.2 through 8.5
- 9.2 through 9.8
- 10.2 through 10.7
- 11.2 through 11.5

Important numbering rule: for this book, the Turkish product flow starts at
source chapter 2 and displays it as chapter 1. Source chapter numbers from `2`
onward are shifted down by one for display, and early pages such as `2.1` may
also be skipped. The first included source lesson in each target range displays
as `.1`. For example, source `2.3` displays as `1.1`, source `3.2` displays as
`2.1`, and source `4.3` displays as `3.2`. Preserve the real source number
separately from the displayed product number so attribution and source lookup
remain exact.

### Elementary Algebra (LibreTexts)

Source URL:
https://math.libretexts.org/Bookshelves/Algebra/Elementary_Algebra_(LibreTexts)

License observed on LibreTexts: CC BY-NC-SA 3.0, author Anonymous / LibreTexts,
source from lardbucket beginning algebra.

Important architecture lesson: this book's `1.1` is a real lesson, not an
unwanted introduction page. Chapter 1 also uses a non-decimal review page like
`1.E`. Therefore numbering cannot be a global "always skip .1" rule. It must be
per-book/per-chapter metadata.

License warning: CC BY-NC-SA is not the same as CC BY. Store and render license
metadata per book/page. Do not assume every future book can be used in the same
commercial/product context without review.

## Numbering Model

Every lesson needs separate source and display fields:

- `sourceNumber`: exact number on LibreTexts, e.g. `2.3`, `1.1`, `1.E`
- `displayNumber`: number shown on turanarican.com, e.g. possibly shifted
- `sourceTitle`: exact source title
- `displayTitle`: Turkish/adapted title
- `sourceUrl`: exact LibreTexts URL
- `bookSlug`, `chapterSlug`, `lessonSlug`
- `numberingPolicy`: e.g. `preserve`, `skip_intro_shift`, `custom_map`

Never infer display numbering from source numbering at render time. Resolve it
during ingestion or editorial mapping and persist it.

## Localization Rules

English source books use comma thousands separators and dot decimal separators,
for example `1,000` and `2.5`. Turkish content must display these as `1.000`
and `2,5`.

- Do not apply this to source URLs, slugs, raw source numbers, or persisted
  attribution identifiers.
- Preserve lesson/section/example references such as `Section 2.3`,
  `Example 2.13`, `Örnek 2.13`, and `Bölüm 2.3`.
- In text content, use comma as the decimal mark.
- In KaTeX/math content, use `{,}` as the decimal mark so spacing remains
  mathematically correct.
- This is both an ingestion/adaptation concern and a render safety net; see
  `src/content/number-localization.ts`.
- Current seed lessons may still render substantial English source text until
  Turkish editorial content is added. This is temporary, but should be treated
  as a product gap before real launch/content expansion.
- Use `npm run content:language-report` to measure English-looking text in the
  generated seed fixture. The report is informational for now; convert it into
  a failing gate when Turkish editorial adaptation becomes the active milestone.

## Translation and Editorial Model

Do not design the ingestion scripts as a full automatic translator. New books
and lessons should not be fetched, machine-translated, and published by script
alone. The intended workflow is:

1. Scripts fetch, clean, structure, attribute, and validate source lessons.
2. Scripts may apply narrow deterministic localization cleanup such as numeric
   separators, obvious KaTeX `\text{...}` connector words, and source chrome
   removal.
3. The Turkish lesson text itself is added editorially in Codex sessions while
   the user is connected to the repo.
4. Validation and language reports surface remaining English text, broken math,
   attribution gaps, and parser mistakes.

Treat `src/crawler/turkish-localization.ts` as cleanup/localization support, not
as a general translation engine.
Put manual lesson translations and replacements in `data/editorial-patches.ts`
so source crawl/seed metadata stays separate from editorial Turkish content.

Turkish product titles and section headings should prefer names close to the
Turkish math curriculum instead of literal source translations. For example,
use topic-style names such as `Cebirsel İfadeler`, `Eşitlik ve Denklem`,
`Çarpanlar ve Katlar`, `Bölünebilme Kuralları`, `Terim, Katsayı ve Benzer
Terim`, and similar concise curriculum-facing headings when they fit the
lesson.

Learning objectives are displayed after "Bu bölümün sonunda şunları
yapabileceksiniz:" and must be written as capability statements, not commands.
Use forms such as `... hesaplayabileceksiniz`, `... ayırt edebileceksiniz`,
`... çözebileceksiniz`, and `... gösterebileceksiniz`.

Examples, Sıra Sizde blocks, and exercises should be treated as solution-bearing
learning objects. Pull every source example, Try It/Sıra Sizde item, and
exercise when preparing a lesson. Revealed content should provide explanatory
solutions, not only a final answer. If a source answer key only gives a result,
add the Turkish explanation editorially.

## Data Model Direction

Use structured content rather than storing one large HTML blob.

Suggested core entities:

- `books`
  - title, slug, source_url, license_name, license_url, attribution_text,
    source_platform, language, status
- `chapters`
  - book_id, source_number, display_number, source_title, display_title, slug,
    sort_order, source_url
- `lessons`
  - chapter_id, source_number, display_number, source_title, display_title,
    slug, source_url, summary, sort_order, status, raw_hash
- `lesson_sections`
  - lesson_id, heading, slug, level, sort_order, content_json
- `examples`
  - lesson_id, section_id, label, prompt_json, solution_json, sort_order
- `exercises`
  - lesson_id, section_id, number, prompt_json, answer_json, sort_order,
    difficulty, tags
- `source_snapshots`
  - source_url, fetched_at, http_status, content_hash, raw_html_path_or_blob,
    parser_version
- `source_assets`
  - lesson_id/source_snapshot_id, source_url, asset_type, alt_text, caption,
    local_key/r2_key, content_hash, preferred_treatment, status

Content should be a typed JSON AST that can render paragraphs, math, lists,
tables, callouts, examples, exercises, images, figures, and attribution blocks.

## Crawl and Ingestion Workflow

Crawler must not run inside the public app request path.

Recommended pipeline:

1. Fetch book TOC.
2. Fetch chapter TOCs.
3. Apply per-book target ranges and numbering policy.
4. Fetch source lessons with rate limiting and retries.
5. Cache raw HTML with content hashes.
6. Parse source chrome away: LibreTexts nav, login, helpful widgets, footer
   boilerplate, recommended articles.
7. Remove "Self Check" / "Oz Kontrol" sections for this product.
8. Extract headings, examples, try-it blocks, exercises, answers, tables,
   figures, and math.
9. Extract image/figure/table assets into an asset manifest. Prefer rebuilding
   diagrams, charts, graphs, and tables in Turkish when the source is simple
   enough. If a recreated asset is visually broken or too ambiguous, keep and
   serve the original asset with attribution.
10. Normalize math delimiters and render with KaTeX in the app.
11. Apply narrow Turkish localization cleanup, including English-to-Turkish
    numeric separator localization. Do not attempt full automatic translation.
12. Store structured content in Turso through Drizzle.
13. Upload production assets to Cloudflare R2/bucket once credentials and bucket
   naming are configured. Until then, keep stable local/R2 keys in manifests.
14. Run validation: missing headings, broken math, empty examples, unpaired
    answers, orphaned images, source attribution.

Before large crawls, check source access rules and use conservative throttling.
Keep enough source metadata for attribution and future recrawls.

## UI and UX Requirements

- Landing page in same design language.
- Logo area is a placeholder only; reserve a practical size such as 160x40.
- Lesson layout:
  - Responsive left drawer menu for book/chapter/lesson navigation.
  - Page-level navigation.
  - In-page heading navigation.
  - Mobile drawer/sheet behavior.
  - Desktop persistent sidebar.
- Answer reveal:
  - Exercises and try-it answers hidden by default.
  - Use semantic disclosure controls.
  - Preserve accessibility and keyboard operation.
- Remove self-check sections.
- Keep current single-scroll behavior concept: no accidental nested page
  scrollbars unless a drawer/modal intentionally scrolls.
- Do not spend extra production time polishing the current frontend or taking
  screenshot-review passes unless the user explicitly asks. The design will
  change. When the implementation reaches the appropriate design replacement
  step, ask the user for the new design files before doing frontend redesign
  work.

## SEO Requirements

- Strong per-lesson metadata.
- Canonical URLs under `https://turanarican.com`.
- Suggested lesson path:
  `/kitap/[bookSlug]/[chapterSlug]/[lessonSlug]`
- Breadcrumb structured data.
- Article or LearningResource/Course structured data where appropriate.
- Dynamic OG images in the red/black design language.
- Sitemaps for books, chapters, lessons.
- Preserve source attribution visibly and in metadata.

## Cloudflare Requirements

- Deploy through Cloudflare-compatible Next.js output.
- Add security headers.
- Use Cloudflare WAF/rate limiting/bot protection.
- Use Turnstile only for forms or auth surfaces, not normal lesson reading.
- Cache static assets aggressively.
- Do not expose crawler/admin endpoints publicly without protection.
- Keep `docs/OPERATIONS.md` current when Cloudflare, Turso, R2, DNS, WAF, or
  deployment steps become concrete.

## Resume Protocol For Future Sessions

When resuming:

1. Run `git status --short --branch`.
2. Read this file.
3. Inspect the current package/project structure with `rg --files`.
4. If no Next.js app exists yet, scaffold it in-place without losing the
   current HTML reference.
5. Keep commits small and intentional.
6. After each meaningful milestone, run local validation and commit.

Expected first build milestones:

1. Scaffold Next.js + TypeScript + Tailwind. Done.
2. Preserve the current HTML lesson as `reference/legacy/`. Done.
3. Add Drizzle/Turso schema. Done.
4. Add crawler/ingestion scripts for LibreTexts TOC discovery. Started.
5. Add landing page with logo placeholder. Done.
6. Add book/chapter/lesson route shell with responsive drawer navigation. Done.
7. Add structured lesson renderer and answer reveal components. Started.
8. Seed one or two lessons end-to-end before mass ingestion. Done; twenty seed
   lessons now build end-to-end for Prealgebra 2.3, 2.4, 2.5, 2.6, 3.2, 3.3,
   3.4, 3.5, 3.6, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.2, 5.3, 5.4, and
   5.5.
9. Add target range lesson planner and shifted display numbering. Done.
10. Add first structured LibreTexts lesson parser. Done.
11. Add informational language coverage report and initial Turkish localization
    cleanup hooks for exercise prompts/math text. Started.

Current next seed candidate after the latest local work: Prealgebra 5.6
`Averages and Probability`, displayed as product lesson 4.5 under
`Ondalık Sayılar`.

Latest completed seed lesson: Prealgebra 5.5 `Solve Equations with Decimals`,
displayed as product lesson 4.4 `Ondalık Denklemler`. It includes 3 Turkish
editorial sections, 18 Sıra Sizde solutions, 36 source exercises with
explanatory reveal solutions, and 12 extracted source assets.

## Quality Gates

Before finalizing any implementation turn:

- `git status` is understood.
- Formatting/lint/type checks run if configured.
- Build runs if feasible.
- Desktop and mobile screenshots checked only when frontend/layout work is
  explicitly requested or when the new design implementation begins.
- No double scrollbar regression.
- No broken Turkish characters.
- No empty example boxes.
- Answer reveals start closed.
- No placeholder links like `href="#"`.
- Attribution and license information remain visible.
