# Project Reference and Workflow

This file is the handoff anchor for future Codex sessions. When the user says
"repodaki uretimi devam et", read this file first, then inspect the current
git status and continue from the next unfinished item.

## Product Goal

Build `turanarican.com` as a responsive Turkish math education platform. The
first production source is LibreTexts/OpenStax Prealgebra 2e. The current static
HTML lesson is a visual prototype/reference for the platform design language,
not the final app architecture.

The platform should support multiple books over time, with shared rendering,
navigation, SEO, attribution, and ingestion workflows.

## Current Repository State

- Current branch after the last handoff: `main`.
- Last known production commit: `3fb4193 Make algebra lesson production ready`.
- Current tracked app artifact: `İfadeleri Değerlendirme.dc.html`.
- Removed prototype/export leftovers: `support.js`, `.thumbnail`.
- Existing HTML demonstrates the intended red/black magazine-style lesson UI,
  Turkish text fixes, KaTeX rendering, single-scroll layout, and answer reveal
  behavior.

Do not treat the single HTML file as the long-term implementation. It is the
design and content reference to translate into a modular Next.js app.

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

- 1.2 through 1.6
- 2.2 through 2.6
- 3.2 through 3.6
- 4.2 through 4.8
- 5.2 through 5.8
- 6.2 through 6.6
- 7.2 through 7.6
- 8.2 through 8.5
- 9.2 through 9.8
- 10.2 through 10.7
- 11.2 through 11.5

Important numbering rule: for this book, some early pages such as `2.1` may be
skipped in the Turkish product flow. Preserve the real source number separately
from the displayed product number so attribution and source lookup remain exact.

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

Content should be a typed JSON AST that can render paragraphs, math, lists,
tables, callouts, examples, exercises, images, and attribution blocks.

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
9. Normalize math delimiters and render with KaTeX in the app.
10. Apply Turkish adaptation layer.
11. Store structured content in Turso through Drizzle.
12. Run validation: missing headings, broken math, empty examples, unpaired
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

1. Scaffold Next.js + TypeScript + Tailwind.
2. Preserve the current HTML lesson as `reference/legacy/` or transform it into
   an initial seed lesson.
3. Add Drizzle/Turso schema.
4. Add crawler/ingestion scripts for LibreTexts TOC discovery.
5. Add landing page with logo placeholder.
6. Add book/chapter/lesson route shell with responsive drawer navigation.
7. Add structured lesson renderer and answer reveal components.
8. Seed one or two lessons end-to-end before mass ingestion.

## Quality Gates

Before finalizing any implementation turn:

- `git status` is understood.
- Formatting/lint/type checks run if configured.
- Build runs if feasible.
- Desktop and mobile screenshots checked for layout regressions.
- No double scrollbar regression.
- No broken Turkish characters.
- No empty example boxes.
- Answer reveals start closed.
- No placeholder links like `href="#"`.
- Attribution and license information remain visible.

