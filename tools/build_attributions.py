#!/usr/bin/env python3
"""Render the shared course attribution data into both course index pages."""

from __future__ import annotations

import html
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "settings" / "attributions.json"
START_MARKER = "        <!-- attribution-resources:start -->"
END_MARKER = "        <!-- attribution-resources:end -->"

LOCALES = {
    "tr": {
        "page": ROOT / "dersler" / "on-cebir" / "index.html",
        "source": ROOT / "sources" / "incalg-TR.html",
        "anchor": "kaynaklar-ve-lisanslar",
        "title": "Bölüm kaynakları ve özel görsel atıfları",
        "intro": (
            "Bölüm eşleştirmeleri arşivlenmiş incalg.html dosyasındaki bölüm sonu "
            "atıflarından çıkarılmıştır. Liste, ders akışını bölmemesi için kapalı tutulur."
        ),
        "summary": "Bölüm kaynaklarını ve özel görsel atıflarını göster",
        "source_heading": "Bölüm kaynakları",
        "image_heading": "Özel görsel atıfları",
        "image_note": (
            "Bu üçüncü taraf görseller kendi kaynak, atıf ve lisans durumlarını korur; "
            "Turan Arıcan’ın CC BY-NC-ND 4.0 kapsamındaki katkıları arasında değildir."
        ),
    },
    "en": {
        "page": ROOT / "en" / "courses" / "prealgebra" / "index.html",
        "source": ROOT / "sources" / "incalg.html",
        "anchor": "sources-and-licenses",
        "title": "Chapter sources and special image attributions",
        "intro": (
            "The chapter mapping was derived from the end-of-section attributions in the "
            "archived incalg.html file. The list is collapsed so it does not interrupt the lessons."
        ),
        "summary": "Show chapter sources and special image attributions",
        "source_heading": "Chapter sources",
        "image_heading": "Special image attributions",
        "image_note": (
            "These third-party images retain their own source, attribution, and license status; "
            "they are not part of Turan Arıcan’s contributions under CC BY-NC-ND 4.0."
        ),
    },
}


def render(locale: str, data: dict[str, object], source_html: str) -> str:
    labels = LOCALES[locale]
    section_sources = data["sectionSources"][locale]
    images = [item for item in data["images"] if str(item["filename"]) in source_html]

    source_items = "\n".join(
        "              <li><strong>"
        + html.escape(str(item["label"]))
        + ":</strong> "
        + html.escape(str(item["text"]))
        + "</li>"
        for item in section_sources
    )
    image_items = "\n".join(
        f'              <li id="{html.escape(str(item["id"]), quote=True)}">'
        f'<strong>{html.escape(str(item["section"][locale]))}:</strong> '
        f'{item["caption"][locale]}</li>'
        for item in images
    )

    return f'''        <article class="license-section attribution-resources" id="{labels["anchor"]}" aria-labelledby="{labels["anchor"]}-title">
          <h2 id="{labels["anchor"]}-title">{labels["title"]}</h2>
          <p>{labels["intro"]}</p>
          <details class="attribution-details">
            <summary>{labels["summary"]}</summary>
            <div class="attribution-details__content">
              <h3>{labels["source_heading"]}</h3>
              <ul class="attribution-list attribution-list--sources">
{source_items}
              </ul>
              <h3>{labels["image_heading"]}</h3>
              <p class="attribution-details__note">{labels["image_note"]}</p>
              <ul class="attribution-list attribution-list--images">
{image_items}
              </ul>
            </div>
          </details>
        </article>'''


def update_page(locale: str, data: dict[str, object]) -> None:
    config = LOCALES[locale]
    page_path = config["page"]
    source_path = config["source"]
    page = page_path.read_text(encoding="utf-8")
    if page.count(START_MARKER) != 1 or page.count(END_MARKER) != 1:
        raise RuntimeError(f"attribution markers missing or duplicated in {page_path}")
    before, rest = page.split(START_MARKER, 1)
    _, after = rest.split(END_MARKER, 1)
    block = render(locale, data, source_path.read_text(encoding="utf-8"))
    page_path.write_text(
        f"{before}{START_MARKER}\n{block}\n{END_MARKER}{after}",
        encoding="utf-8",
    )


def main() -> int:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    for locale in LOCALES:
        update_page(locale, data)
    print("Rendered shared attribution data into 2 course pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
