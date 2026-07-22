#!/usr/bin/env python3
"""Check local page, stylesheet, script, and image references for the static site."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
TR_CHAPTER_PAGES = tuple(
    ROOT / "dersler" / "on-cebir" / f"bolum-{number}" / "index.html"
    for number in range(1, 10)
)
EN_CHAPTER_PAGES = tuple(
    ROOT / "en" / "courses" / "prealgebra" / f"chapter-{number}" / "index.html"
    for number in range(1, 10)
)
PAGES = (
    ROOT / "index.html",
    ROOT / "dersler" / "on-cebir" / "index.html",
    *TR_CHAPTER_PAGES,
    ROOT / "en" / "index.html",
    ROOT / "en" / "courses" / "prealgebra" / "index.html",
    *EN_CHAPTER_PAGES,
)
PART_IDS = (
    "part-whole-numbers-wrapper",
    "part-operations-with-rational-numbers-wrapper",
    "part-measurement-perimeter-area-and-volume-wrapper",
    "part-ratio-proportion-percent-wrapper",
    "part-part-2-wrapper",
    "part-chapter-6-linear-equations-and-graphing-wrapper",
    "part-chapter-7-powers-roots-and-scientific-notation-wrapper",
    "part-polynomials-wrapper",
    "part-trigonometry-wrapper",
)
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)(?P<url>[^)'\"]+)\1\s*\)", re.I)


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if attributes.get("id"):
            self.ids.add(str(attributes["id"]))
        for attribute in ("src", "href"):
            value = attributes.get(attribute)
            if value:
                self.references.append((tag, attribute, value))
        if attributes.get("srcset"):
            for candidate in str(attributes["srcset"]).split(","):
                url = candidate.strip().split()[0]
                if url:
                    self.references.append((tag, "srcset", url))


def is_remote(url: str) -> bool:
    return url.startswith(("http://", "https://", "//"))


def resolve_local(owner: Path, url: str) -> Path | None:
    if not url or url.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None
    if is_remote(url):
        return None
    path_text = unquote(urlsplit(url).path)
    if not path_text:
        return None
    path = ROOT / path_text.lstrip("/") if path_text.startswith("/") else owner.parent / path_text
    path = path.resolve()
    if path.is_dir() or path_text.endswith("/"):
        path /= "index.html"
    return path


def main() -> int:
    errors: list[str] = []
    reference_count = 0
    local_image_count = 0

    settings_paths = (
        ROOT / "settings" / "site.tr.json",
        ROOT / "settings" / "site.en.json",
        ROOT / "settings" / "courses.tr.json",
        ROOT / "settings" / "courses.en.json",
        ROOT / "settings" / "books" / "on-cebir.tr.json",
        ROOT / "settings" / "books" / "prealgebra.en.json",
    )
    settings: dict[Path, object] = {}
    for settings_path in settings_paths:
        try:
            settings[settings_path] = json.loads(settings_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            errors.append(f"invalid settings file {settings_path.relative_to(ROOT)}: {error}")

    for page in PAGES:
        if not page.exists():
            errors.append(f"missing page: {page.relative_to(ROOT)}")
            continue
        parser = ReferenceParser()
        page_source = page.read_text(encoding="utf-8")
        parser.feed(page_source)
        if not re.search(r'class="[^"]*\blanguage-switcher\b', page_source):
            errors.append(f"language switcher missing in {page.relative_to(ROOT)}")
        if 'hreflang="tr"' not in page_source or 'hreflang="en"' not in page_source:
            errors.append(f"language alternates missing in {page.relative_to(ROOT)}")
        reference_count += len(parser.references)
        for tag, attribute, url in parser.references:
            if tag == "img" and is_remote(url):
                errors.append(f"remote image in {page.relative_to(ROOT)}: {url}")
                continue
            target = resolve_local(page, url)
            if target is not None and not target.exists():
                errors.append(
                    f"missing {tag}/{attribute} target in {page.relative_to(ROOT)}: {url}"
                )
            if tag == "img" and target is not None:
                local_image_count += 1

    for stylesheet in (ROOT / "assets" / "css").glob("*.css"):
        for match in CSS_URL_RE.finditer(stylesheet.read_text(encoding="utf-8")):
            url = match.group("url").strip()
            target = resolve_local(stylesheet, url)
            if target is not None and not target.exists():
                errors.append(f"missing CSS asset in {stylesheet.relative_to(ROOT)}: {url}")

    configured_assets = []
    for locale, book_name in (("tr", "on-cebir"), ("en", "prealgebra")):
        site_path = ROOT / "settings" / f"site.{locale}.json"
        course_path = ROOT / "settings" / f"courses.{locale}.json"
        book_path = ROOT / "settings" / "books" / f"{book_name}.{locale}.json"
        site_settings = settings.get(site_path, {})
        book_settings = settings.get(book_path, {})
        course_settings = settings.get(course_path, {})
        if isinstance(site_settings, dict) and isinstance(site_settings.get("home"), dict):
            configured_assets.append(site_settings["home"].get("heroImage"))
            if not site_settings["home"].get("disclaimerText"):
                errors.append(f"disclaimer missing in {site_path.relative_to(ROOT)}")
        if isinstance(book_settings, dict):
            configured_assets.append(book_settings.get("heroImage"))
        courses = course_settings.get("courses", []) if isinstance(course_settings, dict) else []
        ids: set[str] = set()
        for course in courses if isinstance(courses, list) else []:
            if not isinstance(course, dict):
                errors.append(f"{course_path.relative_to(ROOT)} contains a non-object course")
                continue
            course_id = course.get("id")
            if not isinstance(course_id, str) or not course_id:
                errors.append(f"{course_path.relative_to(ROOT)} contains a course without an id")
            elif course_id in ids:
                errors.append(f"duplicate course id in {course_path.relative_to(ROOT)}: {course_id}")
            else:
                ids.add(course_id)
            configured_assets.append(course.get("cover"))
    for configured_asset in configured_assets:
        if isinstance(configured_asset, str) and configured_asset:
            asset_path = (ROOT / configured_asset.lstrip("/")).resolve()
            if not asset_path.is_file():
                errors.append(f"missing configured asset: {configured_asset}")

    expected_parts = tuple(zip(TR_CHAPTER_PAGES, PART_IDS)) + tuple(
        zip(EN_CHAPTER_PAGES, PART_IDS)
    )
    for page, expected_id in expected_parts:
        if page.exists() and f'id="{expected_id}"' not in page.read_text(encoding="utf-8"):
            errors.append(f"expected source wrapper missing in {page.relative_to(ROOT)}: {expected_id}")

    for locale in ("tr", "en"):
        for number in range(1, 10):
            manifest = ROOT / "assets" / "lessons" / "manifests" / f"{locale}-chapter-{number}.json"
            if not manifest.is_file():
                errors.append(f"missing lesson manifest: {manifest.relative_to(ROOT)}")

    if errors:
        print("Site check failed:", file=sys.stderr)
        print("\n".join(f"- {error}" for error in errors), file=sys.stderr)
        return 1

    media_count = sum(1 for path in (ROOT / "assets" / "lessons" / "media").iterdir() if path.is_file())
    print(
        f"site check passed — {len(PAGES)} pages, {reference_count} references, "
        f"{local_image_count} local image uses, {media_count} lesson media files"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
