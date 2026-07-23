#!/usr/bin/env python3
"""Build the XML sitemap from canonical URLs declared by public HTML pages."""

from __future__ import annotations

import json
import re
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SEO_SETTINGS = json.loads((ROOT / "settings" / "seo.json").read_text(encoding="utf-8"))
BASE_URL = str(SEO_SETTINGS["baseUrl"]).rstrip("/")
CANONICAL_RE = re.compile(r'<link\s+rel="canonical"\s+href="([^"]+)"', re.I)


def public_pages() -> list[Path]:
    pages = []
    for page in ROOT.rglob("index.html"):
        relative = page.relative_to(ROOT)
        if relative.parts and relative.parts[0] in {".git", "sources"}:
            continue
        pages.append(page)
    return sorted(pages)


def canonical_urls() -> list[str]:
    urls: list[str] = []
    for page in public_pages():
        source = page.read_text(encoding="utf-8")
        matches = CANONICAL_RE.findall(source)
        if len(matches) != 1:
            raise RuntimeError(
                f"expected one canonical URL in {page.relative_to(ROOT)}, found {len(matches)}"
            )
        canonical = matches[0]
        if not canonical.startswith(f"{BASE_URL}/"):
            raise RuntimeError(
                f"canonical URL in {page.relative_to(ROOT)} is outside {BASE_URL}: {canonical}"
            )
        urls.append(canonical)
    if len(urls) != len(set(urls)):
        raise RuntimeError("duplicate canonical URLs found")
    return sorted(urls, key=lambda url: (url.count("/"), url))


def main() -> int:
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    ElementTree.register_namespace("", namespace)
    urlset = ElementTree.Element(f"{{{namespace}}}urlset")
    for canonical in canonical_urls():
        url_element = ElementTree.SubElement(urlset, f"{{{namespace}}}url")
        ElementTree.SubElement(url_element, f"{{{namespace}}}loc").text = canonical
    ElementTree.indent(urlset, space="  ")
    sitemap = ElementTree.tostring(urlset, encoding="unicode", xml_declaration=True)
    (ROOT / "sitemap.xml").write_text(f"{sitemap}\n", encoding="utf-8")
    print(f"wrote sitemap.xml ({len(urlset)} URLs)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
