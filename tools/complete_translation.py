#!/usr/bin/env python3
"""Create deterministic Turkish fixes for untranslated book text and alt text.

The tool aligns the English and prepared Turkish XHTML by their unchanged tag
sequence. Only Turkish slots that still contain English terminology or obvious
machine-translation word repetition are replaced; the rest of the prepared
translation remains untouched. Results are stored in JSON and are applied offline
by build_lessons.py on every subsequent build.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import build_lessons


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "sources" / "translation-fixes-tr.json"
SEPARATOR = "\n<<<TURAN_SPLIT_92A7>>>\n"
TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"

ENGLISH_MARKERS = re.compile(
    r"\b(?:chapter|whole numbers?|integer(?:s)?|algebra|fraction(?:s)?|numerator|denominator|"
    r"reciprocal|decimal(?:s)?|real numbers?|example(?:s)?|simplify|evaluate|translate|"
    r"subtract(?:ion)?|multiply|divide|addition|solve|check|substitute|find|write|locate|"
    r"determine|convert|review|practice|exercise(?:s)?|following|expression(?:s)?|equation|"
    r"property|properties|measurement|perimeter|area|volume|geometry|rectangle|triangle|"
    r"trapezoid|circle|surface|attributions?|licen[cs]e|how to|step|use|with|from|into|"
    r"than|then|when|where|which|these|those|fulls|doyative|mountainive|associative|"
    r"commutative|inverse|identity|application(?:s)?|read|name|see|answer|identify|salary|"
    r"paycheck|copyright|figure|adapted|rectangular|solid|cube|sphere|cylinder|cone|this|the|"
    r"and|of|for|are|was|were|has|have|will|each|both|first|second|right|left|greater|less|"
    r"means|times|add|product|same|different|positive|negative|yes|no|notice|all|there|square|"
    r"cubic|units?|feet|foot|inches?|meters?|metres?|pounds?|ounces?|length|width|height|base|"
    r"approximately|round|sum|difference|quotient|values?|numbers?|signs?|equals?|place|point|"
    r"words?|terms?|like|common|least|greatest|factors?|prime|opposite|absolute|read|answer)\b",
    re.I,
)

ATTRIBUTE_MARKERS = re.compile(
    r"\b(?:image|figure|shows?|displayed|illustrat(?:e|es|ing)|table|graph|diagram|line|"
    r"arrow|number|text|circle|rectangle|triangle|fraction|decimal|integer|whole|chapter|"
    r"add|subtract|multiply|divide|rendered|labeled|labelled|written|row|column)\b",
    re.I,
)

REPEATED_WORDS = re.compile(
    r"\b([A-Za-zÇĞİÖŞÜçğıöşü]{2,})(?:\s+\1){1,}\b",
    re.I,
)

EXACT_TRANSLATIONS = {
    "Whole Numbers": "Bütün Sayılar",
    "Whole Number": "Bütün Sayı",
    "Integers": "Tam Sayılar",
    "Integer": "Tam Sayı",
    "Fractions": "Kesirler",
    "Fraction": "Kesir",
    "numerator": "pay",
    "denominator": "payda",
    "Reciprocal": "Çarpmaya Göre Ters",
    "reciprocal": "çarpmaya göre ters",
    "Attributions": "Atıflar",
    "CC BY 4.0 Licence": "CC BY 4.0 Lisansı",
    "Simplify:": "Sadeleştirin:",
    "Simplify.": "Sadeleştirin.",
    "Simplify": "Sadeleştirin",
    "Evaluate": "Değerini bulun",
    "Evaluate:": "Değerini bulun:",
    "Subtract.": "Çıkarın.",
    "Subtract:": "Çıkarın:",
    "Multiply:": "Çarpın:",
    "Solve": "Çözün",
    "Solve.": "Çözün.",
    "Check:": "Kontrol:",
    "Check.": "Kontrol edin.",
    "Substitute": "Yerine yazın",
    "Substitute.": "Yerine yazın.",
    "Perimeter": "Çevre",
    "Volume": "Hacim",
    ", is equal to": ", eşittir",
    ". You will often see this idea, the subtraction property, written as follows:": ". Çıkarma özelliği olarak adlandırılan bu düşüncenin çoğu zaman şöyle yazıldığını görürsünüz:",
    "12. 10.3 square inches": "12. 10,3 inç kare",
    "14. a) 534.1 square inches b) 1335 cubic inches": "14. a) 534,1 inç kare b) 1335 inç küp",
    "5. linear": "5. doğrusal",
    "86. If you need to put a fence around your backyard, do you need to know the perimeter or the area of the backyard? Explain your reasoning.": "86. Arka bahçenizin çevresine çit çekmeniz gerekirse bahçenin çevresini mi, alanını mı bilmeniz gerekir? Gerekçenizi açıklayın.",
    "An": "Bir",
    "Architecture": "Mimarlık",
    "Baseball": "Beyzbol",
    "Change": "Değişim",
    "Example": "Örnek",
    "Example 5": "Örnek 5",
    "Exercises": "Alıştırmalar",
    "For each face of the rectangular solid facing you, there is another face on the opposite side. There are": "Dikdörtgenler prizmasının size bakan her yüzünün karşı tarafında bir yüz daha vardır. Toplam",
    "Friday": "Cuma",
    "HOW TO: Multiply a Decimal by a Power of Ten": "NASIL YAPILIR: Ondalık Bir Sayıyı 10'un Kuvvetiyle Çarpma",
    "If": "Eğer",
    "In": "İçinde",
    "Let": "Olsun",
    "Let’s see what happens when we divide two numbers. Is": "İki sayıyı böldüğümüzde ne olduğuna bakalım.",
    "Mass": "Kütle",
    "Monday": "Pazartesi",
    "Multiply left to right.": "Soldan sağa doğru çarpın.",
    "Notice that in each case, the missing number was the opposite of the number!": "Her durumda eksik sayının verilen sayının karşıtı olduğuna dikkat edin!",
    "Nutrition": "Beslenme",
    "Order": "Sıra",
    "Positive": "Pozitif",
    "Product": "Çarpım",
    "Result": "Sonuç",
    "Round": "Yuvarlayın",
    "Showing where these formulas come from, like we did for a rectangular solid, is beyond the scope of this course. We will approximate": "Dikdörtgenler prizmasında yaptığımız gibi bu formüllerin nereden geldiğini göstermek bu dersin kapsamını aşar. Yaklaşık olarak",
    "Students often ask, “How will I remember the order?” Here is a way to help you remember: Take the first letter of each key word and substitute the silly phrase.": "Öğrenciler sık sık “İşlem sırasını nasıl hatırlayacağım?” diye sorar. Hatırlamanıza yardımcı olacak bir yol şudur: Her anahtar sözcüğün ilk harfini alın ve akılda kalıcı bir cümle kurun.",
    "The volume is approximately 904.32 cubic inches.": "Hacim yaklaşık 904,32 inç küptür.",
    "Thursday": "Perşembe",
    "Tuesday": "Salı",
    "Wednesday": "Çarşamba",
    "When we multiplied fractions, we just multiplied the numerators and multiplied the denominators right straight across. To add or subtract fractions, they must have a common denominator.": "Kesirleri çarparken payları ve paydaları doğrudan kendi aralarında çarptık. Kesirleri toplamak veya çıkarmak için ise ortak bir paydaya ihtiyaç vardır.",
    "When you want to know how much tile is needed to cover a floor, or the size of a wall to be painted, you need to know the area, a measure of the region needed to cover a surface. Area is measured is square units. We often use square inches, square feet, square centimetres, or square miles to measure area. A square centimetre is a square that is one centimetre (cm) on each side. A square inch is a square that is one inch on each side": "Bir zemini kaplamak için ne kadar karo gerektiğini veya boyanacak duvarın büyüklüğünü öğrenmek istediğinizde alanı bilmeniz gerekir. Alan, bir yüzeyi kaplayan bölgenin ölçüsüdür ve kare birimlerle ifade edilir. Alan ölçmek için çoğunlukla inç kare, fit kare, santimetre kare veya mil kare kullanırız. Bir santimetre kare, her kenarı bir santimetre (cm) olan bir karedir. Bir inç kare ise her kenarı bir inç olan bir karedir",
    "You will often see this written as": "Bunun çoğu zaman şöyle yazıldığını görürsünüz:",
    "as": "olarak",
    "as the first step. In": "ilk adım olarak. Bu işlem",
    "b) The area is the surface covered by the figure. There are": "b) Alan, şeklin kapladığı yüzeydir. Burada",
    "because": "çünkü",
    "cm": "cm",
    "different": "farklı",
    "every": "her",
    "is": "olur",
    "is positive or negative. We can see this in": "pozitif ya da negatif olduğunu şu örnekte görebiliriz:",
    "let": "olsun",
    "linear": "doğrusal",
    "million": "milyon",
    "minus": "eksi",
    "negative": "negatif",
    "not": "değil",
    "order": "sıra",
    "percent": "yüzde",
    "pi": "pi",
    "positive": "pozitif",
    "product": "çarpım",
    "ratio": "oran",
    "rational": "rasyonel",
    "same": "aynı",
    "simplified": "sadeleştirilmiş",
    "square": "kare",
    "thousand": "bin",
    "tons": "ton",
    "using < or >.": "< veya > kullanarak.",
    "variable": "değişken",
    "when": "olduğunda",
    "where": "burada",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workers", type=int, default=1)
    parser.add_argument("--delay", type=float, default=1.0, help="Delay between sequential requests")
    parser.add_argument("--engine", choices=("google", "argos"), default="google")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def plain(value: str) -> str:
    return " ".join(html.unescape(value).replace("\xa0", " ").split())


def text_slots(fragment: str) -> list[str]:
    return [token for token in build_lessons.HTML_TOKEN_RE.split(fragment) if not token.startswith("<")]


def translation_candidates(
    existing: dict[str, object],
) -> tuple[dict[str, dict[str, str]], set[str], dict[str, str]]:
    en_source = build_lessons.extract_parts(
        (ROOT / "sources" / "incalg.html").read_text(encoding="utf-8")
    )
    tr_source = build_lessons.extract_parts(
        (ROOT / "sources" / "incalg-TR.html").read_text(encoding="utf-8")
    )
    part_sources: dict[str, dict[str, str]] = {}
    phrases: set[str] = set()

    for chapter in build_lessons.CHAPTERS["tr"]:
        part_id = str(chapter["source_id"])
        en_slots = text_slots(en_source[part_id])
        tr_slots = text_slots(tr_source[part_id])
        if len(en_slots) != len(tr_slots):
            raise RuntimeError(f"Text-slot mismatch in {part_id}: {len(en_slots)} != {len(tr_slots)}")
        slot_sources: dict[str, str] = {}
        existing_slots = existing.get("parts", {}).get(part_id, {})
        for index, (en_raw, tr_raw) in enumerate(zip(en_slots, tr_slots)):
            en_text = plain(en_raw)
            tr_text = plain(tr_raw)
            needs_translation = (
                ENGLISH_MARKERS.search(tr_text) is not None
                or REPEATED_WORDS.search(tr_text) is not None
            )
            if not en_text or not tr_text or not needs_translation:
                continue
            if not re.search(r"[A-Za-z]{2}", en_text):
                continue
            if str(index) in existing_slots:
                continue
            slot_sources[str(index)] = en_text
            phrases.add(en_text)
        part_sources[part_id] = slot_sources

    attributes: dict[str, str] = {}
    selected_en = "\n".join(en_source[str(chapter["source_id"])] for chapter in build_lessons.CHAPTERS["en"])
    for match in build_lessons.TRANSLATABLE_ATTR_RE.finditer(selected_en):
        value = plain(match.group("value"))
        if not value or value in attributes or not ATTRIBUTE_MARKERS.search(value):
            continue
        if value in existing.get("attributes", {}):
            continue
        if value.startswith("\\") and " " not in value:
            continue
        attributes[value] = value
        phrases.add(value)
    return part_sources, phrases, attributes


def make_batches(phrases: set[str], max_chars: int = 4200) -> list[list[str]]:
    batches: list[list[str]] = []
    current: list[str] = []
    current_size = 0
    for phrase in sorted(phrases, key=lambda value: (len(value), value)):
        if phrase in EXACT_TRANSLATIONS:
            continue
        addition = len(phrase) + (len(SEPARATOR) if current else 0)
        if current and current_size + addition > max_chars:
            batches.append(current)
            current = []
            current_size = 0
        current.append(phrase)
        current_size += addition
    if current:
        batches.append(current)
    return batches


def translate_batch(batch: list[str]) -> dict[str, str]:
    source = SEPARATOR.join(batch)
    payload = urlencode({"client": "gtx", "sl": "en", "tl": "tr", "dt": "t", "q": source}).encode()
    last_error: Exception | None = None
    for attempt in range(4):
        try:
            request = Request(
                TRANSLATE_URL,
                data=payload,
                headers={
                    "User-Agent": "Mozilla/5.0",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            )
            with urlopen(request, timeout=60) as response:
                data = json.load(response)
            translated = "".join(segment[0] for segment in data[0])
            pieces = [piece.strip() for piece in translated.split("<<<TURAN_SPLIT_92A7>>>")]
            if len(pieces) != len(batch):
                raise ValueError(f"translation batch split mismatch: {len(pieces)} != {len(batch)}")
            return dict(zip(batch, pieces))
        except Exception as error:
            last_error = error
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"translation failed after retries: {last_error}")


def normalize_translation(source: str, translated: str) -> str:
    if source in EXACT_TRANSLATIONS:
        return EXACT_TRANSLATIONS[source]
    translated = translated.replace("Çevre uzunluğu", "Çevre")
    translated = translated.replace("karşılıklı", "çarpmaya göre ters")
    return translated


def write_fixes(
    existing: dict[str, object],
    part_sources: dict[str, dict[str, str]],
    attribute_sources: dict[str, str],
    translations: dict[str, str],
) -> None:
    parts = {
        part_id: {
            **existing.get("parts", {}).get(part_id, {}),
            **{
                slot: normalize_translation(source, translations[source])
                for slot, source in slots.items()
                if source in translations
            },
        }
        for part_id, slots in part_sources.items()
    }
    attributes = {
        **existing.get("attributes", {}),
        **{
            source: normalize_translation(source, translations[source])
            for source in attribute_sources
            if source in translations
        },
    }
    output = {
        "source": "sources/incalg.html + sources/incalg-TR.html",
        "scope": "All book chapters: untranslated, repeated, and accessible Turkish text",
        "parts": parts,
        "attributes": attributes,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    existing = (
        json.loads(OUTPUT.read_text(encoding="utf-8"))
        if OUTPUT.exists()
        else {"parts": {}, "attributes": {}}
    )
    part_sources, phrases, attribute_sources = translation_candidates(existing)
    batches = make_batches(phrases)
    print(
        f"found {sum(len(value) for value in part_sources.values())} text slots, "
        f"{len(attribute_sources)} accessible attributes, {len(phrases)} unique English phrases"
    )
    print(f"translation batches: {len(batches)}")
    if args.dry_run:
        return 0

    translations = dict(EXACT_TRANSLATIONS)
    write_fixes(existing, part_sources, attribute_sources, translations)

    if args.engine == "argos":
        try:
            import ctranslate2
            import sentencepiece as spm
        except ImportError as error:
            raise RuntimeError(
                "CTranslate2 and SentencePiece are not installed in this Python environment"
            ) from error
        remaining = sorted(phrase for phrase in phrases if phrase not in EXACT_TRANSLATIONS)
        packages_root = Path.home() / ".local" / "share" / "argos-translate" / "packages"
        packages = sorted(packages_root.glob("translate-en_tr-*"))
        if not packages:
            raise RuntimeError("The Argos English-to-Turkish model is not installed")
        package_root = packages[-1]
        processor = spm.SentencePieceProcessor(
            model_file=str(package_root / "sentencepiece.model")
        )
        translator = ctranslate2.Translator(
            str(package_root / "model"),
            device="cpu",
            inter_threads=2,
            intra_threads=0,
        )

        # The Argos model is sentence-oriented. Split only unusually long
        # accessible descriptions, then restore them under their original key.
        phrase_parts: dict[str, list[str]] = {}
        translation_units: list[tuple[str, int, str]] = []
        for phrase in remaining:
            tokens = processor.encode(phrase, out_type=str)
            parts = [phrase]
            if len(tokens) > 180:
                parts = [part for part in re.split(r"(?<=[.!?])\s+", phrase) if part]
            phrase_parts[phrase] = parts
            translation_units.extend((phrase, index, part) for index, part in enumerate(parts))

        completed_units: dict[str, dict[int, str]] = {}
        batch_size = 128
        for start in range(0, len(translation_units), batch_size):
            batch = translation_units[start : start + batch_size]
            token_batch = [processor.encode(item[2], out_type=str) for item in batch]
            results = translator.translate_batch(
                token_batch,
                beam_size=1,
                max_batch_size=2048,
                batch_type="tokens",
                max_input_length=512,
            )
            for (source, index, _), result in zip(batch, results):
                completed_units.setdefault(source, {})[index] = processor.decode(
                    result.hypotheses[0]
                )
                if len(completed_units[source]) == len(phrase_parts[source]):
                    translations[source] = " ".join(
                        completed_units[source][part_index]
                        for part_index in range(len(phrase_parts[source]))
                    )
            write_fixes(existing, part_sources, attribute_sources, translations)
            complete = min(start + batch_size, len(translation_units))
            print(f"translated {complete}/{len(translation_units)} units with Argos")
        print(f"wrote {OUTPUT.relative_to(ROOT)}")
        return 0

    if max(1, args.workers) == 1:
        for complete, batch in enumerate(batches, 1):
            try:
                translations.update(translate_batch(batch))
            except Exception:
                write_fixes(existing, part_sources, attribute_sources, translations)
                print(f"saved progress after {complete - 1}/{len(batches)} batches")
                raise
            write_fixes(existing, part_sources, attribute_sources, translations)
            if complete % 5 == 0 or complete == len(batches):
                print(f"translated {complete}/{len(batches)} batches")
            if args.delay > 0 and complete < len(batches):
                time.sleep(args.delay)
    else:
        with ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
            futures = {pool.submit(translate_batch, batch): index for index, batch in enumerate(batches, 1)}
            for complete, future in enumerate(as_completed(futures), 1):
                translations.update(future.result())
                write_fixes(existing, part_sources, attribute_sources, translations)
                if complete % 10 == 0 or complete == len(futures):
                    print(f"translated {complete}/{len(futures)} batches")

    print(f"wrote {OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
