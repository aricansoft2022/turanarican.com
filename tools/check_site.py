#!/usr/bin/env python3
"""Check local page, stylesheet, script, and image references for the static site."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SEO_SETTINGS_PATH = ROOT / "settings" / "seo.json"
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
        self.html_lang = ""
        self.links: list[dict[str, str | None]] = []
        self.metadata: dict[str, list[str]] = {}
        self.title_parts: list[str] = []
        self.json_ld_parts: list[list[str]] = []
        self._in_title = False
        self._in_json_ld = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "html":
            self.html_lang = str(attributes.get("lang") or "")
        elif tag == "title":
            self._in_title = True
        elif tag == "script" and attributes.get("type") == "application/ld+json":
            self._in_json_ld = True
            self.json_ld_parts.append([])
        elif tag == "link":
            self.links.append(attributes)
        elif tag == "meta":
            key = attributes.get("name") or attributes.get("property")
            content = attributes.get("content")
            if key and content is not None:
                self.metadata.setdefault(str(key), []).append(str(content))
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

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        elif tag == "script" and self._in_json_ld:
            self._in_json_ld = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_parts.append(data)
        if self._in_json_ld:
            self.json_ld_parts[-1].append(data)

    @property
    def title(self) -> str:
        return "".join(self.title_parts).strip()

    @property
    def json_ld(self) -> list[str]:
        return ["".join(parts).strip() for parts in self.json_ld_parts]


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


def page_seo_identity(page: Path, base_url: str) -> tuple[str, str, dict[str, str], set[str]]:
    base_url = base_url.rstrip("/")
    if page == ROOT / "index.html":
        locale, canonical_path, tr_path, en_path = "tr", "/", "/", "/en/"
        schema_types = {"WebSite", "WebPage", "Person"}
    elif page == ROOT / "en" / "index.html":
        locale, canonical_path, tr_path, en_path = "en", "/en/", "/", "/en/"
        schema_types = {"WebSite", "WebPage", "Person"}
    elif page == ROOT / "dersler" / "on-cebir" / "index.html":
        locale = "tr"
        canonical_path = tr_path = "/dersler/on-cebir/"
        en_path = "/en/courses/prealgebra/"
        schema_types = {"WebPage", "Course", "BreadcrumbList"}
    elif page == ROOT / "en" / "courses" / "prealgebra" / "index.html":
        locale = "en"
        canonical_path = en_path = "/en/courses/prealgebra/"
        tr_path = "/dersler/on-cebir/"
        schema_types = {"WebPage", "Course", "BreadcrumbList"}
    elif page in TR_CHAPTER_PAGES:
        number = TR_CHAPTER_PAGES.index(page) + 1
        locale = "tr"
        canonical_path = tr_path = f"/dersler/on-cebir/bolum-{number}/"
        en_path = f"/en/courses/prealgebra/chapter-{number}/"
        schema_types = {"WebPage", "LearningResource", "BreadcrumbList"}
    elif page in EN_CHAPTER_PAGES:
        number = EN_CHAPTER_PAGES.index(page) + 1
        locale = "en"
        canonical_path = en_path = f"/en/courses/prealgebra/chapter-{number}/"
        tr_path = f"/dersler/on-cebir/bolum-{number}/"
        schema_types = {"WebPage", "LearningResource", "BreadcrumbList"}
    else:
        raise ValueError(f"unknown public page: {page}")
    absolute = lambda path: f"{base_url}{path}"
    alternates = {
        "tr": absolute(tr_path),
        "en": absolute(en_path),
        "x-default": absolute(tr_path),
    }
    return locale, absolute(canonical_path), alternates, schema_types


def main() -> int:
    errors: list[str] = []
    reference_count = 0
    local_image_count = 0
    canonical_urls: set[str] = set()

    settings_paths = (
        ROOT / "settings" / "site.tr.json",
        ROOT / "settings" / "site.en.json",
        ROOT / "settings" / "courses.tr.json",
        ROOT / "settings" / "courses.en.json",
        ROOT / "settings" / "books" / "on-cebir.tr.json",
        ROOT / "settings" / "books" / "prealgebra.en.json",
        SEO_SETTINGS_PATH,
    )
    settings: dict[Path, object] = {}
    for settings_path in settings_paths:
        try:
            settings[settings_path] = json.loads(settings_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            errors.append(f"invalid settings file {settings_path.relative_to(ROOT)}: {error}")

    seo_settings = settings.get(SEO_SETTINGS_PATH, {})
    base_url = (
        str(seo_settings.get("baseUrl", "")).rstrip("/")
        if isinstance(seo_settings, dict)
        else ""
    )
    site_name = str(seo_settings.get("siteName", "")) if isinstance(seo_settings, dict) else ""
    author = seo_settings.get("author", {}) if isinstance(seo_settings, dict) else {}
    author_name = str(author.get("name", "")) if isinstance(author, dict) else ""
    if not re.fullmatch(r"https://[^/]+", base_url):
        errors.append(f"invalid SEO baseUrl in {SEO_SETTINGS_PATH.relative_to(ROOT)}: {base_url}")

    for page in PAGES:
        if not page.exists():
            errors.append(f"missing page: {page.relative_to(ROOT)}")
            continue
        parser = ReferenceParser()
        page_source = page.read_text(encoding="utf-8")
        parser.feed(page_source)
        page_label = str(page.relative_to(ROOT))
        if not re.search(r'class="[^"]*\blanguage-switcher\b', page_source):
            errors.append(f"language switcher missing in {page_label}")
        if 'hreflang="tr"' not in page_source or 'hreflang="en"' not in page_source:
            errors.append(f"language alternates missing in {page_label}")

        if base_url:
            locale, expected_canonical, expected_alternates, expected_schema_types = (
                page_seo_identity(page, base_url)
            )
            canonical_urls.add(expected_canonical)
            if parser.html_lang != locale:
                errors.append(f"wrong html/lang in {page_label}: {parser.html_lang!r}")
            if not parser.title:
                errors.append(f"title missing in {page_label}")

            description_values = parser.metadata.get("description", [])
            description = description_values[0] if len(description_values) == 1 else ""
            if len(description_values) != 1 or not description.strip():
                errors.append(f"expected one non-empty meta description in {page_label}")

            canonical_links = [
                str(link.get("href") or "")
                for link in parser.links
                if link.get("rel") == "canonical"
            ]
            if canonical_links != [expected_canonical]:
                errors.append(
                    f"wrong canonical in {page_label}: {canonical_links} != {[expected_canonical]}"
                )

            alternates = {
                str(link.get("hreflang")): str(link.get("href") or "")
                for link in parser.links
                if link.get("rel") == "alternate" and link.get("hreflang")
            }
            if alternates != expected_alternates:
                errors.append(f"wrong hreflang set in {page_label}: {alternates}")

            expected_meta = {
                "author": author_name,
                "og:title": parser.title,
                "og:description": description,
                "og:type": "website",
                "og:url": expected_canonical,
                "og:site_name": site_name,
                "og:locale": "tr_TR" if locale == "tr" else "en_US",
                "og:locale:alternate": "en_US" if locale == "tr" else "tr_TR",
                "twitter:card": "summary",
                "twitter:title": parser.title,
                "twitter:description": description,
            }
            for key, expected_value in expected_meta.items():
                values = parser.metadata.get(key, [])
                if values != [expected_value]:
                    errors.append(
                        f"wrong {key} metadata in {page_label}: {values} != {[expected_value]}"
                    )
            robots_values = parser.metadata.get("robots", [])
            if len(robots_values) != 1 or not {"index", "follow"}.issubset(
                {value.strip() for value in robots_values[0].split(",")}
            ):
                errors.append(f"index/follow robots metadata missing in {page_label}")

            if len(parser.json_ld) != 1:
                errors.append(f"expected one JSON-LD block in {page_label}")
            else:
                try:
                    structured_data = json.loads(parser.json_ld[0])
                except json.JSONDecodeError as error:
                    errors.append(f"invalid JSON-LD in {page_label}: {error}")
                else:
                    graph = structured_data.get("@graph", [])
                    schema_types = {
                        node.get("@type") for node in graph if isinstance(node, dict)
                    }
                    if structured_data.get("@context") != "https://schema.org":
                        errors.append(f"wrong JSON-LD context in {page_label}")
                    if not expected_schema_types.issubset(schema_types):
                        errors.append(
                            f"JSON-LD types missing in {page_label}: "
                            f"{sorted(expected_schema_types - schema_types)}"
                        )
                    if expected_canonical not in json.dumps(structured_data, ensure_ascii=False):
                        errors.append(f"canonical URL missing from JSON-LD in {page_label}")

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

    sitemap_path = ROOT / "sitemap.xml"
    if not sitemap_path.is_file():
        errors.append("missing sitemap.xml")
    else:
        try:
            sitemap_root = ElementTree.parse(sitemap_path).getroot()
        except (ElementTree.ParseError, OSError) as error:
            errors.append(f"invalid sitemap.xml: {error}")
        else:
            sitemap_urls = {
                str(element.text or "").strip()
                for element in sitemap_root.findall(".//{*}loc")
                if str(element.text or "").strip()
            }
            if sitemap_urls != canonical_urls:
                errors.append(
                    "sitemap URL set does not match public canonicals: "
                    f"missing={sorted(canonical_urls - sitemap_urls)}, "
                    f"extra={sorted(sitemap_urls - canonical_urls)}"
                )

    robots_path = ROOT / "robots.txt"
    if not robots_path.is_file():
        errors.append("missing robots.txt")
    elif f"Sitemap: {base_url}/sitemap.xml" not in robots_path.read_text(encoding="utf-8"):
        errors.append("robots.txt does not reference the canonical sitemap URL")

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
