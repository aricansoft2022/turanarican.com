#!/usr/bin/env python3
"""Build every Turkish and English book chapter without shortening source content."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
MEDIA_DIR = ROOT / "assets" / "lessons" / "media"
MANIFEST_DIR = ROOT / "assets" / "lessons" / "manifests"
TRANSLATION_FIXES_PATH = ROOT / "sources" / "translation-fixes-tr.json"

PART_START_RE = re.compile(
    r'<div class="part-wrapper"\s+id="(?P<id>part-[^"]+-wrapper)">', re.I
)
IMG_SRC_RE = re.compile(
    r'(?P<prefix><img\b[^>]*?\bsrc=")(?P<url>https?://[^"]+)(?P<suffix>")', re.I
)
SRCSET_RE = re.compile(r'(?P<prefix>\bsrcset=")(?P<value>[^"]+)(?P<suffix>")', re.I)
REMOTE_URL_RE = re.compile(r'https?://[^\s,]+')
HTML_TOKEN_RE = re.compile(r'(<(?:!--.*?--|[^>]+)>)', re.S)
TRANSLATABLE_ATTR_RE = re.compile(
    r'(?P<prefix>\b(?:alt|data-alt|title)=")(?P<value>[^"]*)(?P<suffix>")', re.I
)


CHAPTERS = {
    "tr": (
        {
            "number": 1,
            "source_id": "part-whole-numbers-wrapper",
            "slug": "bolum-1",
            "title": "Doğal Sayılar, Tam Sayılar ve Cebire Giriş",
            "short_title": "Sayılar ve cebire giriş",
            "description": "Doğal sayılar, cebir dili, ifadeler ve tam sayılarla işlemler.",
            "sections": (
                ("chapter-whole-numbers", "1.1 Doğal Sayılar"),
                ("chapter-use-the-language-of-algebra", "1.2 Cebir Dilini Kullanma"),
                ("chapter-evaluate-simplify-and-translate-expressions", "1.3 İfadeleri Değerlendirme, Sadeleştirme ve Çevirme"),
                ("chapter-add-and-subtract-integers", "1.4 Tam Sayılarda Toplama ve Çıkarma"),
                ("chapter-multiply-and-divide-integers", "1.5 Tam Sayılarda Çarpma ve Bölme"),
                ("chapter-slug-1-review", "1.6 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 2,
            "source_id": "part-operations-with-rational-numbers-wrapper",
            "slug": "bolum-2",
            "title": "Rasyonel Sayılarla İşlemler ve Gerçek Sayılara Giriş",
            "short_title": "Rasyonel ve gerçek sayılar",
            "description": "Kesirler, ondalık sayılar ve gerçek sayıların temel özellikleri.",
            "sections": (
                ("chapter-visualize-fractions", "2.1 Kesirleri Görselleştirme"),
                ("chapter-add-and-subtract-fractions", "2.2 Kesirlerde Toplama ve Çıkarma"),
                ("chapter-decimals", "2.3 Ondalık Sayılar"),
                ("chapter-the-real-numbers", "2.4 Gerçek Sayılara Giriş"),
                ("chapter-properties-of-real-numbers", "2.5 Gerçek Sayıların Özellikleri"),
                ("chapter-measurement-review", "2.6 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 3,
            "source_id": "part-measurement-perimeter-area-and-volume-wrapper",
            "slug": "bolum-3",
            "title": "Ölçme, Çevre, Alan ve Hacim",
            "short_title": "Ölçme ve geometri",
            "description": "Ölçme sistemleri, düzlemsel şekiller, alan, yüzey alanı ve hacim.",
            "sections": (
                ("chapter-systems-of-measurement", "3.1 Ölçme Sistemleri"),
                ("chapter-use-properties-of-rectangles-triangles-and-trapezoids", "3.2 Dikdörtgen, Üçgen ve Yamuklar"),
                ("chapter-solve-geometry-applications-volume-and-surface-area", "3.3 Hacim ve Yüzey Alanı"),
                ("chapter-solve-geometry-applications-circles-and-irregular-figures", "3.4 Çemberler ve Düzensiz Şekiller"),
                ("chapter-slug-3-5-chapter-review", "3.5 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 4,
            "source_id": "part-ratio-proportion-percent-wrapper",
            "slug": "bolum-4",
            "title": "Oran, Orantı ve Yüzde",
            "short_title": "Oran, orantı ve yüzde",
            "description": "Oranlar, birim oranlar, orantılar, yüzde kavramı ve yüzde problemleri.",
            "sections": (
                ("chapter-ratios-and-rate", "4.1 Oranlar ve Birim Oran"),
                ("chapter-understand-percent", "4.2 Yüzde Kavramı"),
                ("chapter-solve-proportions-and-their-applications", "4.3 Orantılar ve Uygulamaları"),
                ("chapter-solve-general-applications-of-percent", "4.4 Yüzde Problemleri"),
                ("chapter-slug-4-review", "4.5 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 5,
            "source_id": "part-part-2-wrapper",
            "slug": "bolum-5",
            "title": "Tek Değişkenli Birinci Dereceden Denklemleri Çözme",
            "short_title": "Birinci dereceden denklemler",
            "description": "Doğrusal denklemler, formüller ve problem çözme stratejileri.",
            "sections": (
                ("chapter-introduction-to-solving-linear-equations", "Giriş"),
                ("chapter-solve-equations-using-the-subtraction-and-addition-properties-of-equality", "5.1 Eşitliğin Çıkarma ve Toplama Özellikleri"),
                ("chapter-solve-equations-using-the-division-and-multiplication-properties-of-equality-2", "5.2 Eşitliğin Bölme ve Çarpma Özellikleri"),
                ("chapter-solve-equations-with-variables-and-constants-on-both-sides", "5.3 İki Tarafında Değişken Bulunan Denklemler"),
                ("chapter-solve-equations-with-fraction-or-decimal-coefficients", "5.4 Kesirli veya Ondalık Katsayılı Denklemler"),
                ("chapter-use-a-general-strategy-to-solve-linear-equations", "5.5 Doğrusal Denklemler İçin Genel Strateji"),
                ("chapter-solve-a-formula-for-a-specific-variable", "5.6 Bir Formülü Belirli Bir Değişken İçin Çözme"),
                ("chapter-use-a-problem-solving-strategy", "5.7 Problem Çözme Stratejisi"),
                ("chapter-slug-5-review", "5.8 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 6,
            "source_id": "part-chapter-6-linear-equations-and-graphing-wrapper",
            "slug": "bolum-6",
            "title": "Doğrusal Denklemler ve Grafikler",
            "short_title": "Doğrusal denklemler ve grafikler",
            "description": "Koordinat sistemi, iki değişkenli doğrusal denklemler, eğim ve doğru denklemleri.",
            "sections": (
                ("chapter-use-the-rectangular-coordinate-system", "6.1 Dik Koordinat Sistemini Kullanma"),
                ("chapter-graph-linear-equations-in-two-variables", "6.2 İki Değişkenli Doğrusal Denklemlerin Grafikleri"),
                ("chapter-graph-with-intercepts", "6.3 Eksenleri Kestiği Noktalarla Grafik Çizme"),
                ("chapter-understand-slope-of-a-line", "6.4 Doğrunun Eğimi"),
                ("chapter-use-the-slope-intercept-form-of-an-equation-of-a-line", "6.5 Doğru Denkleminin Eğim-Kesen Biçimi"),
                ("chapter-find-the-equation-of-a-line", "6.6 Doğru Denklemini Bulma"),
                ("chapter-graph-review", "6.7 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 7,
            "source_id": "part-chapter-7-powers-roots-and-scientific-notation-wrapper",
            "slug": "bolum-7",
            "title": "Üsler, Kökler ve Bilimsel Gösterim",
            "short_title": "Üsler, kökler ve bilimsel gösterim",
            "description": "Üs kuralları, bilimsel gösterim ve kare köklerle işlemler.",
            "sections": (
                ("chapter-use-multiplication-properties-of-exponents", "7.1 Üslerin Çarpma Özellikleri"),
                ("chapter-divide-monomials", "7.2 Üslerin Bölme Özelliği"),
                ("chapter-integer-exponents-and-scientific-notation", "7.3 Tam Sayı Üsleri ve Bilimsel Gösterim"),
                ("chapter-simplify-and-use-square-roots-2", "7.4 Kare Kökleri Sadeleştirme ve Kullanma"),
                ("chapter-simplify-square-roots", "7.5 Kare Kökleri Sadeleştirme"),
                ("chapter-chapter-review", "7.6 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 8,
            "source_id": "part-polynomials-wrapper",
            "slug": "bolum-8",
            "title": "Polinomlar",
            "short_title": "Polinomlar",
            "description": "Polinomlarla işlemler, özdeşlikler ve çarpanlara ayırma.",
            "sections": (
                ("chapter-add-and-subtract-polynomials", "8.1 Polinomlarda Toplama ve Çıkarma"),
                ("chapter-multiply-polynomials", "8.2 Polinomlarda Çarpma"),
                ("chapter-special-products", "8.3 Özel Çarpımlar"),
                ("chapter-greatest-common-factor-and-factor-by-grouping", "8.4 Ortak Çarpan ve Gruplandırma"),
                ("chapter-factor-quadratic-trinomials-with-leading-coefficient-1", "8.5 İkinci Dereceden Üç Terimlileri Çarpanlara Ayırma"),
                ("chapter-divide-polynomials", "8.6 Polinomlarda Bölme"),
                ("chapter-review", "8.7 Bölüm Tekrarı"),
            ),
        },
        {
            "number": 9,
            "source_id": "part-trigonometry-wrapper",
            "slug": "bolum-9",
            "title": "Trigonometri",
            "short_title": "Trigonometri",
            "description": "Açılar, üçgenler, Pisagor teoremi ve temel trigonometrik oranlar.",
            "sections": (
                ("chapter-use-properties-of-angles-triangles-and-the-pythagorean-theorem", "9.1 Açılar, Üçgenler ve Pisagor Teoremi"),
                ("chapter-solve-geometry-application", "9.2 Sinüs, Kosinüs ve Tanjant Uygulamaları"),
                ("chapter-review-9", "9.3 Bölüm Tekrarı"),
            ),
        },
    ),
    "en": (
        {
            "number": 1,
            "source_id": "part-whole-numbers-wrapper",
            "slug": "chapter-1",
            "title": "Whole Numbers, Integers, and an Introduction to Algebra",
            "short_title": "Numbers and algebra",
            "description": "Whole numbers, the language of algebra, expressions, and operations with integers.",
            "sections": (
                ("chapter-whole-numbers", "1.1 Whole Numbers"),
                ("chapter-use-the-language-of-algebra", "1.2 Use the Language of Algebra"),
                ("chapter-evaluate-simplify-and-translate-expressions", "1.3 Evaluate, Simplify, and Translate Expressions"),
                ("chapter-add-and-subtract-integers", "1.4 Add and Subtract Integers"),
                ("chapter-multiply-and-divide-integers", "1.5 Multiply and Divide Integers"),
                ("chapter-slug-1-review", "1.6 Chapter Review"),
            ),
        },
        {
            "number": 2,
            "source_id": "part-operations-with-rational-numbers-wrapper",
            "slug": "chapter-2",
            "title": "Operations with Rational Numbers and an Introduction to Real Numbers",
            "short_title": "Rational and real numbers",
            "description": "Fractions, decimals, and the fundamental properties of real numbers.",
            "sections": (
                ("chapter-visualize-fractions", "2.1 Visualize Fractions"),
                ("chapter-add-and-subtract-fractions", "2.2 Add and Subtract Fractions"),
                ("chapter-decimals", "2.3 Decimals"),
                ("chapter-the-real-numbers", "2.4 The Real Numbers"),
                ("chapter-properties-of-real-numbers", "2.5 Properties of Real Numbers"),
                ("chapter-measurement-review", "2.6 Chapter Review"),
            ),
        },
        {
            "number": 3,
            "source_id": "part-measurement-perimeter-area-and-volume-wrapper",
            "slug": "chapter-3",
            "title": "Measurement, Perimeter, Area, and Volume",
            "short_title": "Measurement and geometry",
            "description": "Systems of measurement, plane figures, area, surface area, and volume.",
            "sections": (
                ("chapter-systems-of-measurement", "3.1 Systems of Measurement"),
                ("chapter-use-properties-of-rectangles-triangles-and-trapezoids", "3.2 Rectangles, Triangles, and Trapezoids"),
                ("chapter-solve-geometry-applications-volume-and-surface-area", "3.3 Volume and Surface Area"),
                ("chapter-solve-geometry-applications-circles-and-irregular-figures", "3.4 Circles and Irregular Figures"),
                ("chapter-slug-3-5-chapter-review", "3.5 Chapter Review"),
            ),
        },
        {
            "number": 4,
            "source_id": "part-ratio-proportion-percent-wrapper",
            "slug": "chapter-4",
            "title": "Ratio, Proportion, and Percent",
            "short_title": "Ratio, proportion, and percent",
            "description": "Ratios, rates, proportions, percent concepts, and percent applications.",
            "sections": (
                ("chapter-ratios-and-rate", "4.1 Ratios and Rate"),
                ("chapter-understand-percent", "4.2 Understand Percent"),
                ("chapter-solve-proportions-and-their-applications", "4.3 Proportions and Applications"),
                ("chapter-solve-general-applications-of-percent", "4.4 Applications of Percent"),
                ("chapter-slug-4-review", "4.5 Chapter Review"),
            ),
        },
        {
            "number": 5,
            "source_id": "part-part-2-wrapper",
            "slug": "chapter-5",
            "title": "Solving First Degree Equations in One Variable",
            "short_title": "First degree equations",
            "description": "Linear equations, formulas, and problem-solving strategies.",
            "sections": (
                ("chapter-introduction-to-solving-linear-equations", "Introduction"),
                ("chapter-solve-equations-using-the-subtraction-and-addition-properties-of-equality", "5.1 Subtraction and Addition Properties of Equality"),
                ("chapter-solve-equations-using-the-division-and-multiplication-properties-of-equality-2", "5.2 Division and Multiplication Properties of Equality"),
                ("chapter-solve-equations-with-variables-and-constants-on-both-sides", "5.3 Variables and Constants on Both Sides"),
                ("chapter-solve-equations-with-fraction-or-decimal-coefficients", "5.4 Fraction or Decimal Coefficients"),
                ("chapter-use-a-general-strategy-to-solve-linear-equations", "5.5 General Strategy for Linear Equations"),
                ("chapter-solve-a-formula-for-a-specific-variable", "5.6 Solve a Formula for a Variable"),
                ("chapter-use-a-problem-solving-strategy", "5.7 Problem-Solving Strategy"),
                ("chapter-slug-5-review", "5.8 Chapter Review"),
            ),
        },
        {
            "number": 6,
            "source_id": "part-chapter-6-linear-equations-and-graphing-wrapper",
            "slug": "chapter-6",
            "title": "Linear Equations and Graphing",
            "short_title": "Linear equations and graphing",
            "description": "The coordinate system, linear equations in two variables, slope, and equations of lines.",
            "sections": (
                ("chapter-use-the-rectangular-coordinate-system", "6.1 The Rectangular Coordinate System"),
                ("chapter-graph-linear-equations-in-two-variables", "6.2 Graph Linear Equations in Two Variables"),
                ("chapter-graph-with-intercepts", "6.3 Graph with Intercepts"),
                ("chapter-understand-slope-of-a-line", "6.4 Slope of a Line"),
                ("chapter-use-the-slope-intercept-form-of-an-equation-of-a-line", "6.5 Slope–Intercept Form"),
                ("chapter-find-the-equation-of-a-line", "6.6 Find the Equation of a Line"),
                ("chapter-graph-review", "6.7 Chapter Review"),
            ),
        },
        {
            "number": 7,
            "source_id": "part-chapter-7-powers-roots-and-scientific-notation-wrapper",
            "slug": "chapter-7",
            "title": "Powers, Roots, and Scientific Notation",
            "short_title": "Powers, roots, and scientific notation",
            "description": "Exponent rules, scientific notation, and operations with square roots.",
            "sections": (
                ("chapter-use-multiplication-properties-of-exponents", "7.1 Multiplication Properties of Exponents"),
                ("chapter-divide-monomials", "7.2 Quotient Property of Exponents"),
                ("chapter-integer-exponents-and-scientific-notation", "7.3 Integer Exponents and Scientific Notation"),
                ("chapter-simplify-and-use-square-roots-2", "7.4 Simplify and Use Square Roots"),
                ("chapter-simplify-square-roots", "7.5 Simplify Square Roots"),
                ("chapter-chapter-review", "7.6 Chapter Review"),
            ),
        },
        {
            "number": 8,
            "source_id": "part-polynomials-wrapper",
            "slug": "chapter-8",
            "title": "Polynomials",
            "short_title": "Polynomials",
            "description": "Polynomial operations, special products, and factoring.",
            "sections": (
                ("chapter-add-and-subtract-polynomials", "8.1 Add and Subtract Polynomials"),
                ("chapter-multiply-polynomials", "8.2 Multiply Polynomials"),
                ("chapter-special-products", "8.3 Special Products"),
                ("chapter-greatest-common-factor-and-factor-by-grouping", "8.4 Greatest Common Factor and Grouping"),
                ("chapter-factor-quadratic-trinomials-with-leading-coefficient-1", "8.5 Factor Quadratic Trinomials"),
                ("chapter-divide-polynomials", "8.6 Divide Polynomials"),
                ("chapter-review", "8.7 Chapter Review"),
            ),
        },
        {
            "number": 9,
            "source_id": "part-trigonometry-wrapper",
            "slug": "chapter-9",
            "title": "Trigonometry",
            "short_title": "Trigonometry",
            "description": "Angles, triangles, the Pythagorean theorem, and fundamental trigonometric ratios.",
            "sections": (
                ("chapter-use-properties-of-angles-triangles-and-the-pythagorean-theorem", "9.1 Angles, Triangles, and the Pythagorean Theorem"),
                ("chapter-solve-geometry-application", "9.2 Sine, Cosine, and Tangent Applications"),
                ("chapter-review-9", "9.3 Chapter Review"),
            ),
        },
    ),
}


LOCALES = {
    "tr": {
        "source": ROOT / "sources" / "incalg-TR.html",
        "course_dir": ROOT / "dersler" / "on-cebir",
        "root_prefix": "../../..",
        "home_rel": "index.html",
        "course_rel": "dersler/on-cebir",
        "course_name": "Ön Cebir",
        "home_anchor": "dersler",
        "about_anchor": "hakkinda",
        "ui": {
            "skip": "İçeriğe geç", "home_aria": "Turan Arıcan ana sayfa",
            "all_courses": "Tüm dersler", "contact": "İletişim", "menu": "Bölüm menüsünü aç",
            "chapters": "Ders bölümleri", "in_chapter": "Bu bölümde", "content": "Bölüm içeriği",
            "breadcrumb": "Sayfa yolu", "home": "Ana sayfa", "chapter": "Bölüm", "lesson": "ders",
            "pager": "Bölümler arası gezinme", "previous": "Önceki bölüm", "next": "Sonraki bölüm",
            "course_index": "Ders dizini", "continue": "Devam et", "back_home": "Ana sayfaya dön",
            "footer": "Alt menü", "courses": "dersler", "about": "hakkında", "contact_lower": "iletişim",
            "contact_prefix": "iletişim:", "language": "Dil seçimi",
        },
    },
    "en": {
        "source": ROOT / "sources" / "incalg.html",
        "course_dir": ROOT / "en" / "courses" / "prealgebra",
        "root_prefix": "../../../..",
        "home_rel": "en/index.html",
        "course_rel": "en/courses/prealgebra",
        "course_name": "Prealgebra",
        "home_anchor": "courses",
        "about_anchor": "about",
        "ui": {
            "skip": "Skip to content", "home_aria": "Turan Arıcan home page",
            "all_courses": "All courses", "contact": "Contact", "menu": "Open chapter menu",
            "chapters": "Course chapters", "in_chapter": "In this chapter", "content": "Chapter contents",
            "breadcrumb": "Breadcrumb", "home": "Home", "chapter": "Chapter", "lesson": "lessons",
            "pager": "Chapter navigation", "previous": "Previous chapter", "next": "Next chapter",
            "course_index": "Course index", "continue": "Continue", "back_home": "Return home",
            "footer": "Footer navigation", "courses": "courses", "about": "about", "contact_lower": "contact",
            "contact_prefix": "contact:", "language": "Language selector",
        },
    },
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--locale", choices=("all", "tr", "en"), default="all")
    parser.add_argument("--chapter", type=int, choices=range(1, 10))
    parser.add_argument("--no-download", action="store_true")
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--keep-unused", action="store_true")
    parser.add_argument("--workers", type=int, default=16)
    return parser.parse_args()


def extract_parts(source: str) -> dict[str, str]:
    starts = list(PART_START_RE.finditer(source))
    return {
        match.group("id"): source[
            match.start() : starts[index + 1].start() if index + 1 < len(starts) else len(source)
        ].strip()
        for index, match in enumerate(starts)
    }


def media_filename(url: str) -> str:
    request_url = html.unescape(url)
    basename = unquote(Path(urlsplit(request_url).path).name) or "asset"
    basename = re.sub(r"[^A-Za-z0-9._-]+", "-", basename).strip("-.") or "asset"
    if len(basename) > 110:
        basename = f"{Path(basename).stem[:80]}{Path(basename).suffix[:12]}"
    digest = hashlib.sha1(request_url.encode("utf-8")).hexdigest()[:12]
    return f"{digest}-{basename}"


def urls_in_fragment(fragment: str) -> set[str]:
    urls = {match.group("url") for match in IMG_SRC_RE.finditer(fragment)}
    for match in SRCSET_RE.finditer(fragment):
        urls.update(REMOTE_URL_RE.findall(match.group("value")))
    return urls


def load_translation_fixes() -> dict[str, object]:
    if not TRANSLATION_FIXES_PATH.exists():
        return {"parts": {}, "attributes": {}}
    return json.loads(TRANSLATION_FIXES_PATH.read_text(encoding="utf-8"))


def apply_translation_fixes(fragment: str, part_id: str, fixes: dict[str, object]) -> str:
    part_fixes = fixes.get("parts", {}).get(part_id, {})
    tokens = HTML_TOKEN_RE.split(fragment)
    text_slot = 0
    for index, token in enumerate(tokens):
        if token.startswith("<"):
            continue
        replacement = part_fixes.get(str(text_slot))
        if replacement is not None and token.strip():
            leading = token[: len(token) - len(token.lstrip())]
            trailing = token[len(token.rstrip()) :]
            tokens[index] = f"{leading}{html.escape(str(replacement), quote=False)}{trailing}"
        text_slot += 1
    fragment = "".join(tokens)

    attribute_fixes = {
        **fixes.get("attributes", {}),
        **fixes.get("part_attributes", {}).get(part_id, {}),
    }

    def replace_attribute(match: re.Match[str]) -> str:
        current = html.unescape(match.group("value"))
        replacement = attribute_fixes.get(current)
        if replacement is None:
            return match.group(0)
        return f'{match.group("prefix")}{html.escape(str(replacement), quote=True)}{match.group("suffix")}'

    return TRANSLATABLE_ATTR_RE.sub(replace_attribute, fragment)


def repair_turkish_terms(fragment: str) -> str:
    replacements = {
        "Multiplikasyon": "Çarpma",
        "multiplikasyon": "çarpma",
        "Arapça ifadeler": "cebirsel ifadeler",
        "dikdörtgen katı": "dikdörtgenler prizması",
        "Dikdörtgen Katı": "Dikdörtgenler Prizması",
        "Cilt": "Hacim",
        "Kone": "Koni",
        "kone": "koni",
        "Yastık birimleri": "Kübik birimler",
        "yastık birimleri": "kübik birimler",
        "Yemin ederim": "çarpı",
        "Duyuru": "Dikkat edin",
        "dekimale": "ondalık sayıya",
        "Dekimal": "Ondalık sayı",
        "dekimal": "ondalık sayı",
        "feet": "fit",
        "foot": "fit",
        "pounds": "libre",
        "pound": "libre",
        "ounces": "ons",
        "ounce": "ons",
    }
    english_glossary = {
        "the equivalent fraction with no decimals": "ondalık sayı içermeyen eşdeğer kesri",
        "division and multiplication properties of equality": "eşitliğin bölme ve çarpma özellikleri",
        "subtraction and addition properties of equality": "eşitliğin çıkarma ve toplama özellikleri",
        "multiplication properties of exponents": "üslerin çarpma özellikleri",
        "problem solving strategy": "problem çözme stratejisi",
        "rectangular coordinate system": "dik koordinat sistemi",
        "scientific notation": "bilimsel gösterim",
        "square roots": "kare kökler",
        "right triangle": "dik üçgen",
        "right angle": "dik açı",
        "three decimal places": "üç ondalık basamak",
        "one decimal place": "bir ondalık basamak",
        "round your final answer to one decimal place": "sonucunuzu bir ondalık basamağa yuvarlayın",
        "unit price": "birim fiyat",
        "line up": "aynı doğru üzerinde sıralanmak",
        "points in a rectangular coordinate system": "dik koordinat sistemindeki noktaları",
        "if they do not": "değillerse",
        "word cloud by": "kelime bulutu:",
        "how to": "nasıl yapılır",
        "try it": "sıra sizde",
        "tl it": "sıra sizde",
        "real numbers": "gerçek sayılar",
        "chapter review": "bölüm tekrarı",
        "general applications": "genel uygulamalar",
        "surface area": "yüzey alanı",
        "linear equations": "doğrusal denklemler",
        "special products": "özel çarpımlar",
        "greatest common factor": "en büyük ortak çarpan",
        "slope-intercept": "eğim-kesen",
        "first degree": "birinci dereceden",
        "adapted by": "uyarlayan:",
        "exponents'in": "üslerin",
        "exponentsn": "üslerin",
        "co effectives": "katsayılar",
        "alttraction": "çıkarma",
        "altstituting": "yerine yazma",
        "proportion": "orantı",
        "proportions": "orantılar",
        "percent": "yüzde",
        "ratios": "oranlar",
        "ratio": "oran",
        "rates": "birim oranlar",
        "rate": "birim oran",
        "polynomials": "polinomlar",
        "polynomial": "polinom",
        "monomials": "tek terimliler",
        "monomial": "tek terimli",
        "trinomials": "üç terimliler",
        "trinomial": "üç terimli",
        "exponents": "üsler",
        "exponent": "üs",
        "powers": "kuvvetler",
        "roots": "kökler",
        "root": "kök",
        "graphing": "grafik çizme",
        "graphs": "grafikler",
        "graph": "grafik",
        "slope": "eğim",
        "intercepts": "eksenleri kestiği noktalar",
        "intercept": "eksen kesim noktası",
        "coordinates": "koordinatlar",
        "coordinate": "koordinat",
        "quadrants": "bölgeler",
        "quadrant": "bölge",
        "axes": "eksenler",
        "axis": "eksen",
        "plot": "işaretleyin",
        "linear": "doğrusal",
        "lines": "doğrular",
        "line": "doğru",
        "variables": "değişkenler",
        "variable": "değişken",
        "constants": "sabitler",
        "constant": "sabit",
        "coefficients": "katsayılar",
        "coefficient": "katsayı",
        "formula": "formül",
        "solutions": "çözümler",
        "solution": "çözüm",
        "pythagorean theorem": "Pisagor teoremi",
        "triangles": "üçgenler",
        "triangle": "üçgen",
        "angles": "açılar",
        "angle": "açı",
        "sine": "sinüs",
        "cosine": "kosinüs",
        "tangent": "tanjant",
        "numerator": "pay",
        "denominator": "payda",
        "decimals": "ondalık sayılar",
        "decimal": "ondalık sayı",
        "fractions": "kesirler",
        "fraction": "kesir",
        "reciprocal": "çarpmaya göre ters",
        "equations": "denklemler",
        "equation": "denklem",
        "expressions": "ifadeler",
        "expression": "ifade",
        "properties": "özellikler",
        "property": "özellik",
        "subtraction": "çıkarma",
        "addition": "toplama",
        "commutative": "değişme",
        "quotient": "bölüm",
        "integers": "tam sayılar",
        "integer": "tam sayı",
        "geometry": "geometri",
        "applications": "uygulamalar",
        "application": "uygulama",
        "perimeter": "çevre",
        "area": "alan",
        "measurement": "ölçme",
        "rectangular": "dikdörtgen",
        "trapezoid": "yamuk",
        "circle": "çember",
        "chapter": "BÖLÜM",
        "example": "ÖRNEK",
        "exercises": "alıştırmalar",
        "exercise": "alıştırma",
        "copyright": "telif hakkı",
        "algebra": "cebir",
        "figure": "Şekil",
        "simplify": "sadeleştirin",
        "add": "toplayın",
        "evaluate": "değerini bulun",
        "substitute": "yerine yazın",
        "subtract": "çıkarın",
        "multiply": "çarpın",
        "divide": "bölün",
        "convert": "dönüştürün",
        "locate": "bulun",
        "solve": "çözün",
        "check": "kontrol edin",
        "write": "yazın",
        "find": "bulun",
        "read": "okuyun",
        "round": "yuvarlayın",
        "use": "kullanın",
        "see": "bkz.",
        "name": "ad",
        "answer": "cevap",
        "positive": "pozitif",
        "negative": "negatif",
        "prime": "asal",
        "product": "çarpım",
        "difference": "fark",
        "sum": "toplam",
        "term": "terim",
        "factor": "çarpan",
        "values": "değerler",
        "value": "değer",
        "number": "sayı",
        "unit": "birim",
        "square": "kare",
        "cube": "küp",
        "point": "nokta",
        "points": "noktalar",
        "system": "sistem",
        "plane": "düzlem",
        "price": "fiyat",
        "store": "mağaza",
        "replace": "yerine yazın",
        "compare": "karşılaştırın",
        "carefully": "dikkatle",
        "careful": "dikkatli",
        "useful": "kullanışlı",
        "final": "son",
        "your": "sizin",
        "they": "onlar",
        "very": "çok",
        "not": "değil",
        "if": "eğer",
        "you": "siz",
        "work": "çalışmanızı",
        "review": "tekrar",
        "each": "her",
        "step": "adım",
        "words": "sözcükler",
        "word": "sözcük",
        "with": "ile",
        "from": "-den",
        "into": "içine",
        "for": "için",
        "than": "-den",
        "then": "sonra",
        "when": "iken",
        "where": "burada",
        "which": "hangi",
        "these": "bunlar",
        "those": "şunlar",
        "there": "orada",
        "both": "her ikisi",
        "same": "aynı",
        "different": "farklı",
        "will": "-ecek",
        "have": "sahiptir",
        "has": "sahiptir",
        "are": "dır",
        "was": "idi",
        "were": "idi",
        "this": "bu",
        "that": "bu",
        "and": "ve",
        "the": "",
        "of": "",
        "no": "yok",
    }

    # Work on text slots only so asset URLs, classes and source metadata remain
    # byte-for-byte stable. Translation fixes are deliberately kept separate
    # from the source files so refreshed books can be rebuilt repeatably.
    tokens = HTML_TOKEN_RE.split(fragment)
    for index, token in enumerate(tokens):
        if token.startswith("<"):
            continue
        for source, target in replacements.items():
            token = re.sub(rf"\b{re.escape(source)}\b", target, token)
        for source, target in sorted(english_glossary.items(), key=lambda item: len(item[0]), reverse=True):
            token = re.sub(rf"\b{re.escape(source)}\b", target, token, flags=re.I)
        token = re.sub(
            r"\b([A-Za-zÇĞİÖŞÜçğıöşü]{2,})(?:\s+\1){1,}\b",
            r"\1",
            token,
            flags=re.I,
        )
        token = token.replace("Doğru üçgen", "Dik üçgen").replace("doğru üçgen", "dik üçgen")
        token = token.replace("Doğru açı", "Dik açı").replace("doğru açı", "dik açı")
        token = re.sub(r"\s+([,.;:!?])", r"\1", token)
        token = re.sub(r" {2,}", " ", token)
        tokens[index] = token
    fragment = "".join(tokens)

    exact_attributes = {
        '"7 is less than 11" equivalent to "11 is greater than 7"': '"7, 11’den küçüktür" ifadesi "11, 7’den büyüktür" ifadesine eşdeğerdir.',
        "-7, 0, and 8": "-7, 0 ve 8",
        "1.2 Use the Language of Algebra": "1.2 Cebir Dilini Kullanma",
        "1.3 Evaluate, Simplify, and Translate Expressions": "1.3 İfadelerin Değerini Bulma, Sadeleştirme ve Çevirme",
        "2.1 Visualize Fractions": "2.1 Kesirleri Görselleştirme",
        "2.3 Decimals": "2.3 Ondalık Sayılar",
        "2.4 Introduction to the Real Numbers": "2.4 Gerçek Sayılara Giriş",
        "2.5 Properties of Real Numbers": "2.5 Gerçek Sayıların Özellikleri",
        "3.1 Systems of Measurement": "3.1 Ölçme Sistemleri",
        "3.2 Use Properties of Rectangles, Triangles, and Trapezoids": "3.2 Dikdörtgen, Üçgen ve Yamukların Özelliklerini Kullanma",
        "3.3 Solve Geometry Applications: Volume and Surface Area": "3.3 Geometri Uygulamaları: Hacim ve Yüzey Alanı",
        "3.4 Solve Geometry Applications: Circles and Irregular Figures": "3.4 Geometri Uygulamaları: Çemberler ve Düzensiz Şekiller",
        "A checkerboard is shown. It has 10 squares across the top and 5 down the side.": "Üst kenarında 10, yan kenarında 5 kare bulunan bir dama tahtası gösteriliyor.",
        "A checkerboard is shown. It has 10 squares across the top and 5 down the side. The top and bottom each have two adjacent 1 inch labels across, the sides have 1 inch labels.": "Üst kenarında 10, yan kenarında 5 kare bulunan bir dama tahtası gösteriliyor. Üst ve alt kenarlarda yan yana iki adet 1 inç etiketi, yanlarda ise 1 inç etiketleri vardır.",
        "A cube is shown, comprised of smaller cubes. Each side of the cube has 3 smaller cubes across, for a total of 27 smaller cubes.": "Küçük küplerden oluşan bir küp gösteriliyor. Her kenarda 3 küçük küp, toplamda 27 küçük küp vardır.",
        "A measuring cup showing millilitre s and ounces.": "Mililitre ve ons ölçülerini gösteren bir ölçü kabı.",
        "A right trapezoid is shown.": "Bir dik yamuk gösteriliyor.",
        "A ruler with inches and centimetres.": "İnç ve santimetre ölçekli bir cetvel.",
        "A square is shown comprised of 4 smaller squares.": "Dört küçük kareden oluşan bir kare gösteriliyor.",
        "A square is shown with four triangles coming off each side.": "Her kenarına birer üçgen eklenmiş bir kare gösteriliyor.",
        "A square is shown. It is comprised of nine smaller squares.": "Dokuz küçük kareden oluşan bir kare gösteriliyor.",
        "An intricate class ceiling. The structure is made up of individual shapes.": "Ayrı geometrik şekillerden oluşan karmaşık bir sınıf tavanı.",
        "Five squares are shown, in a T-shape. There are three squares across the top and three squares down.": "T biçiminde beş kare gösteriliyor; üstte üç kare, aşağı doğru üç kare vardır.",
        "The formula V equals one-third times capital B times h is shown.": "V eşittir büyük B çarpı h bölü üç formülü gösteriliyor.",
        "The formula V equals one-third times pi times r squared times h is shown.": "V eşittir pi çarpı r kare çarpı h bölü üç formülü gösteriliyor.",
        "The second step reads “Step 2. Underline the digit to the right of the given place value.” To the right of this, we have 18.379 with the 9 underlined.": "İkinci adımda “2. Adım: Verilen basamak değerinin sağındaki rakamın altını çizin.” yazıyor. Yanında 9 rakamının altı çizili olduğu 18,379 sayısı bulunuyor.",
        "Three squares are shown, in a sideways L shape.": "Yatay bir L biçiminde üç kare gösteriliyor.",
        "Three squares are shown. There is one on the bottom left, one on the bottom right, and one on the top right.": "Biri sol altta, biri sağ altta, biri de sağ üstte olmak üzere üç kare gösteriliyor.",
        "Two thermometres are shown, one in Celsius (°C) and another in Fahrenheit (°F). They are marked “Water boils” at 100°C and 212°F. They are marked “Normal body temperature” at 37°C and 98.6°F. They are marked “Water freezes” at 0°C and 32°F.": "Biri Celsius (°C), diğeri Fahrenheit (°F) ölçekli iki termometre gösteriliyor. Suyun kaynama noktası 100°C ve 212°F, normal vücut sıcaklığı 37°C ve 98,6°F, suyun donma noktası ise 0°C ve 32°F olarak işaretlenmiştir.",
        "We have the statement that 2 times a blank space equals 1. Then it is stated that “We know 2 times 1/2 equals 1.”": "2 ile boş bir alanın çarpımının 1’e eşit olduğu ifade ediliyor. Ardından “2 çarpı 1/2’nin 1’e eşit olduğunu biliyoruz.” deniyor.",
        "We have the statement that 2/3 times a blank space equals 1. Then it is stated that “We know 2/3 times 3/2 equals 1.”": "2/3 ile boş bir alanın çarpımının 1’e eşit olduğu ifade ediliyor. Ardından “2/3 çarpı 3/2’nin 1’e eşit olduğunu biliyoruz.” deniyor.",
        "negative 2 is greater than negative 8 divided by 3.": "Negatif 2, negatif 8 bölü 3’ten büyüktür.",
    }
    attribute_words = {
        "real numbers": "gerçek sayılar",
        "and": "ve", "when": "iken", "times": "çarpı", "of": "",
        "negative": "negatif", "equals": "eşittir", "feet": "fit",
        "foot": "fit", "pounds": "libre", "pound": "libre",
        "inches": "inç", "inch": "inç", "ounces": "ons", "ounce": "ons",
        "evaluate": "değerini bulun", "subtract": "çıkarın", "simplify": "sadeleştirin",
        "the": "", "from": "-den", "as": "olarak", "minus": "eksi",
        "read": "okuyun", "difference": "fark", "prime": "asal",
    }

    def repair_attribute(match: re.Match[str]) -> str:
        value = html.unescape(match.group("value"))
        value = exact_attributes.get(value, value)
        for source, target in sorted(english_glossary.items(), key=lambda item: len(item[0]), reverse=True):
            value = re.sub(rf"\b{re.escape(source)}\b", target, value, flags=re.I)
        for source, target in attribute_words.items():
            value = re.sub(rf"\b{re.escape(source)}\b", target, value, flags=re.I)
        value = re.sub(r" {2,}", " ", value)
        return f'{match.group("prefix")}{html.escape(value, quote=True)}{match.group("suffix")}'

    return TRANSLATABLE_ATTR_RE.sub(repair_attribute, fragment)


def localize_fragment(
    fragment: str,
    mapping: dict[str, str],
    asset_prefix: str,
    locale: str,
    part_id: str,
    fixes: dict[str, object],
) -> str:
    if locale == "tr":
        fragment = apply_translation_fixes(fragment, part_id, fixes)
        fragment = repair_turkish_terms(fragment)

    def replace_src(match: re.Match[str]) -> str:
        url = match.group("url")
        return f'{match.group("prefix")}{asset_prefix}/assets/lessons/media/{mapping[url]}{match.group("suffix")}'

    def replace_srcset(match: re.Match[str]) -> str:
        value = REMOTE_URL_RE.sub(
            lambda url_match: f"{asset_prefix}/assets/lessons/media/{mapping[url_match.group(0)]}",
            match.group("value"),
        )
        return f'{match.group("prefix")}{value}{match.group("suffix")}'

    fragment = IMG_SRC_RE.sub(replace_src, fragment)
    fragment = SRCSET_RE.sub(replace_srcset, fragment)
    fragment = fragment.replace(
        'href="/contents/ba42b46c-de39-4f91-a515-06bfd7a16c6b"',
        'href="#chapter-understand-slope-of-a-line"',
    )
    fragment = re.sub(r"<h2(?P<attrs>\b[^>]*)>", r"<h4\g<attrs>>", fragment, flags=re.I)
    fragment = re.sub(r"</h2>", "</h4>", fragment, flags=re.I)
    fragment = re.sub(
        r'<h1(?P<attrs>\b[^>]*class="[^"]*(?:part-title|chapter-title)[^"]*"[^>]*)>(?P<body>.*?)</h1>',
        r"<h2\g<attrs>>\g<body></h2>", fragment, flags=re.I | re.S,
    )
    fragment = re.sub(
        r"<h1(?P<attrs>\b[^>]*)>(?P<body>.*?)</h1>",
        r"<h3\g<attrs>>\g<body></h3>", fragment, flags=re.I | re.S,
    )
    return re.sub(
        r"<img(?![^>]*\bloading=)(?P<attrs>[^>]*)>",
        r'<img loading="lazy" decoding="async"\g<attrs>>', fragment, flags=re.I,
    )


def download_one(url: str, destination: Path, refresh: bool) -> tuple[str, int, str]:
    if destination.exists() and destination.stat().st_size > 0 and not refresh:
        return url, destination.stat().st_size, "cached"
    request_url = html.unescape(url)
    last_error: Exception | None = None
    for attempt in range(4):
        try:
            request = Request(request_url, headers={
                "User-Agent": "turanarican.com lesson asset builder/2.0",
                "Accept": "image/avif,image/webp,image/svg+xml,image/*,*/*;q=0.8",
            })
            with urlopen(request, timeout=45) as response:
                payload = response.read()
            if not payload:
                raise OSError("empty response")
            temporary = destination.with_name(f"{destination.name}.part")
            temporary.write_bytes(payload)
            temporary.replace(destination)
            return url, len(payload), "downloaded"
        except (HTTPError, URLError, TimeoutError, OSError) as error:
            last_error = error
            if attempt < 3:
                time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"could not download {request_url}: {last_error}")


def language_switcher(locale: str, root_prefix: str, number: int, label: str) -> str:
    tr_url = f"{root_prefix}/dersler/on-cebir/bolum-{number}/"
    en_url = f"{root_prefix}/en/courses/prealgebra/chapter-{number}/"
    tr_current = ' aria-current="true"' if locale == "tr" else ""
    en_current = ' aria-current="true"' if locale == "en" else ""
    return (
        f'<nav class="language-switcher" aria-label="{html.escape(label)}">'
        f'<a href="{tr_url}" lang="tr" hreflang="tr"{tr_current}>TR</a>'
        f'<a href="{en_url}" lang="en" hreflang="en"{en_current}>EN</a></nav>'
    )


def chapter_nav(locale: str, current_number: int) -> str:
    links = []
    for chapter in CHAPTERS[locale]:
        state = ' aria-current="page"' if chapter["number"] == current_number else ""
        links.append(
            f'<a href="../{chapter["slug"]}/"{state}>'
            f'<span>0{chapter["number"]}</span>{html.escape(str(chapter["short_title"]))}</a>'
        )
    return "\n".join(links)


def section_nav(chapter: dict[str, object]) -> str:
    return "\n".join(
        f'<a href="#{section_id}">{html.escape(label)}</a>'
        for section_id, label in chapter["sections"]
    )


def pager(locale: str, chapter: dict[str, object], root_prefix: str) -> str:
    ui = LOCALES[locale]["ui"]
    chapters = CHAPTERS[locale]
    index = int(chapter["number"]) - 1
    previous = chapters[index - 1] if index > 0 else None
    following = chapters[index + 1] if index + 1 < len(chapters) else None
    previous_html = (
        f'<a class="lesson-pager__link lesson-pager__link--previous" href="../{previous["slug"]}/">'
        f'<span>{ui["previous"]}</span><strong>{html.escape(str(previous["short_title"]))}</strong></a>'
        if previous else
        f'<a class="lesson-pager__link lesson-pager__link--previous" href="../">'
        f'<span>{ui["course_index"]}</span><strong>{LOCALES[locale]["course_name"]}</strong></a>'
    )
    following_html = (
        f'<a class="lesson-pager__link lesson-pager__link--next" href="../{following["slug"]}/">'
        f'<span>{ui["next"]}</span><strong>{html.escape(str(following["short_title"]))}</strong></a>'
        if following else
        f'<a class="lesson-pager__link lesson-pager__link--next" '
        f'href="{root_prefix}/{LOCALES[locale]["home_rel"]}#{LOCALES[locale]["home_anchor"]}">'
        f'<span>{ui["continue"]}</span><strong>{ui["all_courses"]}</strong></a>'
    )
    return f"{previous_html}\n{following_html}"


def render_page(locale: str, chapter: dict[str, object], fragment: str) -> str:
    config = LOCALES[locale]
    ui = config["ui"]
    root_prefix = str(config["root_prefix"])
    asset_prefix = f"{root_prefix}/assets"
    home_url = f"{root_prefix}/{config['home_rel']}"
    title = html.escape(str(chapter["title"]))
    description = html.escape(str(chapter["description"]))
    number = int(chapter["number"])
    tr_alternate = f"{root_prefix}/dersler/on-cebir/bolum-{number}/"
    en_alternate = f"{root_prefix}/en/courses/prealgebra/chapter-{number}/"
    return f"""<!doctype html>
<html lang="{locale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{description}">
    <title>{ui['chapter']} {number}: {title} | Turan Arıcan</title>
    <link rel="alternate" hreflang="tr" href="{tr_alternate}">
    <link rel="alternate" hreflang="en" href="{en_alternate}">
    <link rel="icon" type="image/png" href="{asset_prefix}/images/brand/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{asset_prefix}/css/site.css">
    <link rel="stylesheet" href="{asset_prefix}/css/lesson.css">
    <script src="{asset_prefix}/js/site.js" defer></script>
    <script src="{asset_prefix}/js/lesson.js" defer></script>
  </head>
  <body class="lesson-page lesson-page--{number}" data-site-root="{root_prefix}" data-locale="{locale}">
    <a class="skip-link" href="#content">{ui['skip']}</a>
    <header class="lesson-header">
      <a class="lesson-brand" href="{home_url}" aria-label="{ui['home_aria']}">
        <span class="site-brand__mark lesson-brand__mark"><img src="{asset_prefix}/images/brand/logo.png" alt=""></span>
        <span>turanarican.com</span>
      </a>
      <div class="lesson-header__actions">
        <a href="../">{config['course_name']}</a>
        <a href="{home_url}#{config['home_anchor']}">{ui['all_courses']}</a>
        <a href="#contact">{ui['contact']}</a>
        {language_switcher(locale, root_prefix, number, str(ui['language']))}
        <button class="lesson-menu-button" type="button" aria-controls="lesson-sidebar" aria-expanded="false">
          <span></span><span></span><span></span><span class="visually-hidden">{ui['menu']}</span>
        </button>
      </div>
    </header>

    <div class="lesson-shell">
      <aside class="lesson-sidebar" id="lesson-sidebar">
        <div class="lesson-sidebar__inner">
          <p class="lesson-sidebar__eyebrow">{config['course_name']}</p>
          <nav class="lesson-chapters" aria-label="{ui['chapters']}">
            {chapter_nav(locale, number)}
          </nav>
          <p class="lesson-sidebar__eyebrow lesson-sidebar__eyebrow--sections">{ui['in_chapter']}</p>
          <nav class="lesson-sections" aria-label="{ui['content']}">
            {section_nav(chapter)}
          </nav>
        </div>
      </aside>

      <main class="lesson-main" id="content">
        <nav class="breadcrumbs" aria-label="{ui['breadcrumb']}">
          <a href="{home_url}">{ui['home']}</a><span>/</span><a href="../">{config['course_name']}</a><span>/</span><span>{ui['chapter']} {number}</span>
        </nav>
        <header class="lesson-hero">
          <p>{ui['chapter']} {number} · {len(chapter['sections'])} {ui['lesson']}</p>
          <h1>{title}</h1>
          <span class="lesson-hero__shape" aria-hidden="true"></span>
        </header>
        <article class="lesson-content">
{fragment}
        </article>
        <nav class="lesson-pager" aria-label="{ui['pager']}">
          {pager(locale, chapter, root_prefix)}
        </nav>
      </main>
    </div>
    <footer class="site-footer lesson-footer" id="contact">
      <div class="site-footer__inner">
        <a class="site-footer__brand site-brand__mark" href="{home_url}" aria-label="{ui['back_home']}">
          <img src="{asset_prefix}/images/brand/logo.png" alt="">
        </a>
        <div class="site-footer__links">
          <nav aria-label="{ui['footer']}">
            <a href="{home_url}#{config['home_anchor']}">{ui['courses']}</a>
            <a href="{home_url}#{config['about_anchor']}">{ui['about']}</a>
            <a href="#contact">{ui['contact_lower']}</a>
          </nav>
          <a class="site-footer__contact" data-contact-link href="mailto:turan@turanarican.com">{ui['contact_prefix']} <span data-setting-text="footer.email">turan@turanarican.com</span></a>
        </div>
      </div>
    </footer>
  </body>
</html>
"""


def write_manifest(locale: str, chapter: dict[str, object], urls: set[str], mapping: dict[str, str]) -> None:
    manifest = {
        "locale": locale,
        "chapter": chapter["number"],
        "source_part_id": chapter["source_id"],
        "asset_count": len(urls),
        "assets": {url: f"assets/lessons/media/{mapping[url]}" for url in sorted(urls)},
    }
    path = MANIFEST_DIR / f'{locale}-chapter-{chapter["number"]}.json'
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    locale_names = ("tr", "en") if args.locale == "all" else (args.locale,)
    sources: dict[str, dict[str, str]] = {}
    chapter_urls: dict[tuple[str, int], set[str]] = {}
    all_urls: set[str] = set()

    for locale in locale_names:
        source_path = LOCALES[locale]["source"]
        if not source_path.exists():
            raise FileNotFoundError(f"Source file not found: {source_path}")
        parts = extract_parts(source_path.read_text(encoding="utf-8"))
        missing = [chapter["source_id"] for chapter in CHAPTERS[locale] if chapter["source_id"] not in parts]
        if missing:
            raise RuntimeError(f"Source chapter wrappers not found in {source_path.name}: {', '.join(missing)}")
        sources[locale] = parts
        for chapter in CHAPTERS[locale]:
            urls = urls_in_fragment(parts[str(chapter["source_id"])])
            chapter_urls[(locale, int(chapter["number"]))] = urls
            all_urls.update(urls)

    MEDIA_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST_DIR.mkdir(parents=True, exist_ok=True)
    mapping = {url: media_filename(url) for url in all_urls}

    if not args.no_download:
        failures: list[str] = []
        downloaded = cached = 0
        with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
            futures = {
                pool.submit(download_one, url, MEDIA_DIR / mapping[url], args.refresh): url
                for url in sorted(all_urls)
            }
            total = len(futures)
            for complete, future in enumerate(as_completed(futures), start=1):
                url = futures[future]
                try:
                    _, _, state = future.result()
                    downloaded += state == "downloaded"
                    cached += state == "cached"
                except Exception as error:
                    failures.append(f"{url}: {error}")
                if complete % 200 == 0 or complete == total:
                    print(f"media {complete}/{total} — downloaded {downloaded}, cached {cached}")
        if failures:
            print("\nMedia download failures:", file=sys.stderr)
            print("\n".join(failures), file=sys.stderr)
            return 1

    fixes = load_translation_fixes()
    for locale in locale_names:
        config = LOCALES[locale]
        course_dir = config["course_dir"]
        course_dir.mkdir(parents=True, exist_ok=True)
        for chapter in CHAPTERS[locale]:
            if args.chapter is not None and int(chapter["number"]) != args.chapter:
                continue
            number = int(chapter["number"])
            source_id = str(chapter["source_id"])
            localized = localize_fragment(
                sources[locale][source_id], mapping, str(config["root_prefix"]), locale, source_id, fixes
            )
            destination = course_dir / str(chapter["slug"]) / "index.html"
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(render_page(locale, chapter, localized), encoding="utf-8")
            write_manifest(locale, chapter, chapter_urls[(locale, number)], mapping)
            print(f"wrote {destination.relative_to(ROOT)} ({len(localized):,} characters)")

    if not args.keep_unused and not args.no_download:
        referenced = set(mapping.values())
        removed = 0
        for path in MEDIA_DIR.iterdir():
            if path.is_file() and path.name not in referenced:
                path.unlink()
                removed += 1
        if removed:
            print(f"removed {removed} unreferenced generated media files")

    print(f"complete — {len(all_urls)} unique local media files referenced for {', '.join(locale_names)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
