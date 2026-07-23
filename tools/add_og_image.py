#!/usr/bin/env python3
"""
og:image / twitter:image etiketlerini tum sayfalara ekler.
Idempotent: zaten eklenmis bir sayfaya tekrar calistirilirsa atlar.

Kullanim:
    python3 add_og_image.py .          (repo kokunden calistir)
"""
import re
import sys
from pathlib import Path

OG_IMAGE_URL = "https://turanarican.com/assets/images/og/og-image.jpg"
ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")

OLD_TWITTER_CARD = '    <meta name="twitter:card" content="summary">'
NEW_BLOCK = (
    f'    <meta property="og:image" content="{OG_IMAGE_URL}">\n'
    '    <meta property="og:image:width" content="1200">\n'
    '    <meta property="og:image:height" content="630">\n'
    '    <meta property="og:image:type" content="image/jpeg">\n'
    '    <meta name="twitter:card" content="summary_large_image">'
)
TWITTER_DESC_RE = re.compile(r'    <meta name="twitter:description"[^>]*>\n')
TWITTER_IMAGE_LINE = f'    <meta name="twitter:image" content="{OG_IMAGE_URL}">\n'

updated = skipped = warned = 0

for path in ROOT.rglob("index.html"):
    if "sources" in path.parts:
        continue
    html = path.read_text(encoding="utf-8")

    if "og:image" in html:
        skipped += 1
        continue

    if OLD_TWITTER_CARD not in html:
        print(f"UYARI: {path} - beklenen twitter:card satırı yok, elle kontrol et")
        warned += 1
        continue

    html = html.replace(OLD_TWITTER_CARD, NEW_BLOCK, 1)
    m = TWITTER_DESC_RE.search(html)
    if m:
        html = html[: m.end()] + TWITTER_IMAGE_LINE + html[m.end():]

    path.write_text(html, encoding="utf-8")
    updated += 1
    print(f"guncellendi: {path}")

print()
print(f"Guncellenen: {updated}, zaten vardı (atlandı): {skipped}, uyarı: {warned}")