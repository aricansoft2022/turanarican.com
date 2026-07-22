#!/usr/bin/env python3
"""Import high-confidence browser translations into one Turkish chapter.

The browser export is plain text, so it cannot safely replace the source HTML.
This tool aligns its visible lines with the prepared Turkish source, then writes
only unambiguous single-slot text and image-alt matches to the persistent fixes.
"""

from __future__ import annotations

import argparse
import base64
import html
import json
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path

import build_lessons


ROOT = Path(__file__).resolve().parents[1]
FIXES_PATH = ROOT / "sources" / "translation-fixes-tr.json"
BLOCK_TAGS = {
    "address", "article", "aside", "blockquote", "div", "dl", "dt", "dd",
    "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3",
    "h4", "h5", "h6", "header", "hr", "li", "main", "nav", "ol", "p",
    "pre", "section", "table", "ul",
}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.I | re.S)
ALT_RE = re.compile(r'\balt="(?P<value>[^"]*)"', re.I)
SECTION_RE = re.compile(r"^1\.[1-6]\b")
WORD_RE = re.compile(r"[0-9A-Za-zÇĞİÖŞÜçğıöşü]+", re.UNICODE)
NUMBER_RE = re.compile(r"\d+(?:[.,]\d+)*")


EXACT_TRANSLATIONS = {
    "CHAPTER 1 Whole Numbers, Integers, and Introduction to Algebra":
        "1. BÖLÜM Doğal Sayılar, Tam Sayılar ve Cebire Giriş",
    "1.1 Whole Numbers": "1.1 Doğal Sayılar",
    "Use Place Value with Whole Numbers": "Doğal Sayılarda Basamak Değerini Kullanma",
    "Use place value with whole numbers": "Doğal sayılarda basamak değerini kullanmak",
    "Identify multiples and and apply divisibility tests":
        "Katları belirlemek ve bölünebilme kurallarını uygulamak",
    "Find prime factorization and least common multiples":
        "Asal çarpanlara ayırmak ve en küçük ortak katları bulmak",
    "Counting Numbers: 1, 2, 3, …": "Sayma Sayıları: 1, 2, 3, …",
    "Whole Numbers: 0, 1, 2, 3, …": "Doğal Sayılar: 0, 1, 2, 3, …",
    "Practice Makes Perfect": "Alıştırmalar",
    "Review Exercises": "Tekrar Alıştırmaları",
    "Practice Test": "Bölüm Testi",
    "Show answer": "Yanıtı göster",
    "Attributions": "Atıflar",
    "HOW TO: Name a Whole Number in Words.": "NASIL YAPILIR: Bir Doğal Sayıyı Yazıyla İfade Etme.",
    "HOW TO: Round Whole Numbers.": "NASIL YAPILIR: Doğal Sayıları Yuvarlama.",
    "Divisibility Tests": "Bölünebilme Kuralları",
    "Identify the words that indicate periods. (Remember, the ones period is never named.)":
        "Bölükleri gösteren kelimeleri belirleyin. (Birler bölüğünün adlandırılmadığını unutmayın.)",
    "Identify the words that indicate periods. (Remember the ones period is never named.)":
        "Bölükleri gösteren kelimeleri belirleyin. (Birler bölüğünün adlandırılmadığını unutmayın.)",
    "Factor 48.": "48 sayısını çarpanlarına ayırın.",
    "Key Concepts": "Temel Kavramlar",
    "Exponential Notation": "Üslü Gösterim",
    "Like Terms": "Benzer Terimler",
    "Opposite Notation": "Karşıt Gösterimi",
    "Use Negatives and Opposites": "Negatif İşareti ve Karşıtları Kullanma",
    "Use negatives and opposites": "Negatif İşareti ve Karşıtları Kullanma",
    "Use Negatives and Opposites of Integers": "Tam Sayıların Negatiflerini ve Karşıtlarını Kullanma",
    "Add Integers": "Tam Sayıları Toplama",
    "are called the integers. The integers are the numbers":
        "tam sayılar olarak adlandırılır. Tam sayılar şunlardır:",
    "The integers": "Tam Sayılar",
    "Evaluate a)": "a) ifadesinin değerini bulun:",
    "Multiplication of Signed Numbers": "İşaretli Sayıların Çarpımı",
    "Division of Signed Numbers": "İşaretli Sayıların Bölümü",
    "Writing Exercises": "Yazma Alıştırmaları",
    "Review Exercises Answers": "Tekrar Alıştırmalarının Cevapları",
    "Exercise Answers": "Alıştırma Cevapları",
    "Practice Test Answers": "Bölüm Testi Cevapları",
    "Translate Phrases to Expressions with Integers": "Tam Sayı İçeren İfadeleri Cebirsel İfadelere Çevirme",
    "When the signs were the same, the counters were all the same color, and so we added them.":
        "İşaretler aynı olduğunda pulların hepsi aynı renkteydi; bu nedenle pulları topladık.",
    "When the signs are the same, the counters would be all the same color, so add them.":
        "İşaretler aynı olduğunda pulların hepsi aynı renkte olur; bu nedenle pulları toplayın.",
    "Picture 37 blue counters with 53 red counters lined up underneath. Since there would be more red (negative) counters than blue (positive) counters, the sum would be":
        "37 mavi pulu ve altına sıralanmış 53 kırmızı pulu düşünün. Kırmızı (negatif) pulların sayısı mavi (pozitif) pullardan fazla olduğundan toplam şöyle olur:",
    "We start with 5 negatives. We need to take away 3 positives, but we do not have any positives to take away.":
        "5 negatif pulla başlıyoruz. 3 pozitif pulu çıkarmamız gerekiyor, ancak çıkarabileceğimiz pozitif pul yok.",
    "If the signs are the same, the result is positive.": "İşaretler aynıysa sonuç pozitiftir.",
    "The notation “…” is called ellipsis and means “and so on,” or that the pattern continues endlessly.":
        "‘…’ gösterimine üç nokta denir; ‘ve benzeri’ anlamına gelir ve örüntünün sonsuza kadar sürdüğünü belirtir.",
    "1.5 Multiply and Divide Integers": "1.5 Tam Sayılarda Çarpma ve Bölme",
    "1.6 Chapter Review": "1.6 Bölüm Tekrarı",
    "Addition of Positive and Negative Integers": "Pozitif ve Negatif Tam Sayıları Toplama",
    "Subtraction of Integers": "Tam Sayıları Çıkarma",
    "Subtract integers": "Tam Sayıları Çıkarma",
    "Subtract Integers": "Tam Sayıları Çıkarma",
    "Multiply integers": "Tam Sayıları Çarpma",
    "Multiply Integers": "Tam Sayıları Çarpma",
    "Use Negatives and Opposites of Integers": "Tam Sayıların Negatiflerini ve Karşıtlarını Kullanma",
    "Simplify: expressions with absolute value": "Mutlak Değer İçeren İfadeleri Sadeleştirme",
    "Simplify: Expressions with Absolute Value": "Mutlak Değer İçeren İfadeleri Sadeleştirme",
    "Simplify Expressions with Absolute Value": "Mutlak Değer İçeren İfadeleri Sadeleştirme",
    "Simplify Expressions with Integers": "Tam Sayılar İçeren İfadeleri Sadeleştirme",
    "Evaluate variable expressions with integers": "Tam Sayılar İçeren Değişkenli İfadelerin Değerini Bulma",
    "Evaluate Variable Expressions with Integers": "Tam Sayılar İçeren Değişkenli İfadelerin Değerini Bulma",
    "Use Integers in Applications": "Uygulamalarda Tam Sayıları Kullanma",
    "HOW TO: Apply a Strategy to Solve Applications with Integers":
        "NASIL YAPILIR: Tam Sayılarla İlgili Uygulamaları Çözme Stratejisi",
    "Translate English Phrases to Algebraic Expressions": "İngilizce İfadeleri Cebirsel İfadelere Çevirme",
    "Translate an English Phrase to an Algebraic Expression": "İngilizce Bir İfadeyi Cebirsel İfadeye Çevirme",
    "Evaluate an Expression": "Bir İfadenin Değerini Bulma",
    "Simplify Expressions Using the Order of Operations": "İşlem Önceliğiyle İfadeleri Sadeleştirme",
    "Simplify Expressions by Combining Like Terms": "Benzer Terimleri Birleştirerek İfadeleri Sadeleştirme",
    "Add Colored Chip": "Renkli Pul Ekleme",
    "Subtract Colored Chip": "Renkli Pul Çıkarma",
    "Provincial budgets": "Eyalet Bütçeleri",
    "For 2019 the province of Quebec estimated it would have a budget surplus of $5.6 million. That same year, Alberta estimated it would have a budget deficit of $7.5 million.":
        "Quebec eyaleti 2019 yılı için 5,6 milyon dolarlık bütçe fazlası öngördü. Aynı yıl Alberta 7,5 milyon dolarlık bütçe açığı öngördü.",
    "Use integers to write the budget of:": "Aşağıdaki bütçeleri tam sayılarla gösterin:",
    "University enrolments": "Üniversite Kayıtları",
    "The number of international students enrolled in Canadian postsecondary institutions has been on the rise for two decades, with their numbers increasing at a higher rate than that of Canadian students. Enrolments of international students rose by 24,315 from 2015 to 2017. Meanwhile, there was a slight decline in the number of Canadian students, by 912 for the same fiscal years.":
        "Kanada'daki yükseköğretim kurumlarına kayıtlı uluslararası öğrenci sayısı yirmi yıldır artıyor; üstelik artış oranı Kanadalı öğrencilerinkinden daha yüksek. Uluslararası öğrenci kayıtları 2015'ten 2017'ye 24.315 artarken aynı mali yıllarda Kanadalı öğrenci sayısı 912 azaldı.",
    "Use integers to write the change:": "Değişimi tam sayılarla gösterin:",
    "Stock Market": "Borsa",
    "The week of September 15, 2008 was one of the most volatile weeks ever for the US stock market. The closing numbers of the Dow Jones Industrial Average each day were:":
        "15 Eylül 2008 haftası, ABD borsasının en dalgalı haftalarından biriydi. Dow Jones Sanayi Endeksi'nin günlük kapanış değerleri şöyleydi:",
    "During the week of June 22, 2009, the closing numbers of the Dow Jones Industrial Average each day were:":
        "22 Haziran 2009 haftasında Dow Jones Sanayi Endeksi'nin günlük kapanış değerleri şöyleydi:",
    "Add integers": "Tam Sayıları Toplama",
    "Divide integers": "Tam Sayıları Bölme",
    "Divide Integers": "Tam Sayıları Bölme",
    "Simplify expressions with integers": "Tam Sayılar İçeren İfadeleri Sadeleştirme",
    "Translate English phrases to algebraic expressions": "İngilizce İfadeleri Cebirsel İfadelere Çevirme",
    "Use integers in applications": "Uygulamalarda Tam Sayıları Kullanma",
    "Our work so far has only included the counting numbers and the whole numbers. But if you have ever experienced a temperature below zero or accidentally overdrawn your checking account, you are already familiar with negative numbers.":
        "Şimdiye kadarki çalışmalarımız yalnızca sayma sayılarını ve doğal sayıları içeriyordu. Ancak sıfırın altında bir sıcaklıkla karşılaştıysanız veya yanlışlıkla banka hesabınızda eksi bakiyeye düştüyseniz negatif sayılara zaten aşinasınız.",
    "Negative numbers": "Negatif sayılar",
    "is to the right of": "sağındadır",
    "Now we need to extend the number line which showed the whole numbers to include negative numbers, too. The numbers marked by points in":
        "Şimdi doğal sayıları gösteren sayı doğrusunu negatif sayıları da içerecek biçimde genişletmemiz gerekiyor. Şekil 3'te noktalarla işaretlenmiş sayılar",
    "Order each of the following pairs of numbers, using < or >: a)":
        "Aşağıdaki sayı çiftlerini < veya > kullanarak sıralayın: a)",
    "Order each of the following pairs of numbers, using < or >":
        "Aşağıdaki sayı çiftlerini < veya > kullanarak sıralayın",
    ", the negative numbers are a mirror image of the positive numbers, with zero in the middle. Because the numbers 2 and":
        "Negatif sayılar, ortada sıfır olacak biçimde pozitif sayıların ayna görüntüsüdür. 2 ve",
    "Our work with opposites gives us a way to define the integers.The whole numbers and their opposites are called the integers. The integers are the numbers":
        "Karşıtlarla yaptığımız çalışma, tam sayıları tanımlamamızı sağlar. Doğal sayılar ve bunların karşıtları tam sayılar olarak adlandırılır. Tam sayılar şunlardır:",
    "integers": "tam sayılar",
    "When evaluating the opposite of a": "Bir değişkenin karşıtının değerini bulurken",
    "The absolute value of a number is never negative (because distance cannot be negative). The only number with absolute value equal to zero is the number zero itself, because the distance from":
        "Bir sayının mutlak değeri hiçbir zaman negatif değildir; çünkü uzaklık negatif olamaz. Mutlak değeri sıfıra eşit olan tek sayı sıfırdır; çünkü sıfırın",
    "Order.": "Sıralayın.",
    "We now add absolute value bars to our list of grouping symbols. When we use the order of operations, first we simplify inside the absolute value bars as much as possible, then we take the":
        "Artık gruplandırma sembolleri listemize mutlak değer çizgilerini de ekliyoruz. İşlem önceliğini uygularken önce mutlak değer çizgilerinin içini olabildiğince sadeleştirir, ardından",
    "We will use the counters to show how to add the four addition facts using the numbers":
        "Dört toplama durumunu göstermek için renkli pulları kullanacağız. Kullanacağımız sayılar",
    "We remove any neutral pairs.": "Tüm nötr çiftleri çıkarırız.",
    "There are more positives, so the sum is positive.": "Pozitif pul daha fazla olduğu için toplam pozitiftir.",
    "There are more negatives, so the sum is negative.": "Negatif pul daha fazla olduğu için toplam negatiftir.",
    "The answer will be negative because there are more negatives than positives.":
        "Negatif pullar pozitif pullardan fazla olduğu için sonuç negatif olacaktır.",
    "Take 5 positive from 7 positives and get 2 positives.":
        "7 pozitif puldan 5 pozitif pulu çıkarın; geriye 2 pozitif pul kalır.",
    "What happens when we have to subtract one positive and one negative number? We’ll need to use both white and red counters as well as some":
        "Bir pozitif sayı ile bir negatif sayıyı birbirinden çıkarmamız gerektiğinde ne olur? Hem mavi hem kırmızı pulları hem de bazı",
    "neutral pairs": "nötr çiftler",
    "Remember, a neutral pair has value zero. If we add 0 to 5 its value is still 5. We add neutral pairs to the 5 negatives until we get 3 positives to take away.":
        "Bir nötr çiftin değerinin sıfır olduğunu unutmayın. 5'e 0 eklersek değer yine 5 olur. Çıkarabileceğimiz 3 pozitif pul elde edene kadar 5 negatif pula nötr çiftler ekleriz.",
    "We remove the 3 positives.": "3 pozitif pulu çıkarırız.",
    ". We start with 5 positives. We need to take away 3 negatives, but there are no negatives to take away. So we add neutral pairs until we have 3 negatives to take away.":
        "5 pozitif pulla başlarız. 3 negatif pulu çıkarmamız gerekir, ancak çıkarabileceğimiz negatif pul yoktur. Bu nedenle 3 negatif pul elde edene kadar nötr çiftler ekleriz.",
    "We now add the needed neutrals pairs.": "Şimdi gerekli nötr çiftleri ekleriz.",
    "Take 1 positive from the one added neutral pair.": "Eklenen nötr çiftten 1 pozitif pulu çıkarın.",
    "Take 1 negative from the one added neutral pair.": "Eklenen nötr çiftten 1 negatif pulu çıkarın.",
    "Of course, when you have a subtraction problem that has only positive numbers, like":
        "Elbette yalnızca pozitif sayılar içeren bir çıkarma işleminiz olduğunda, örneğin",
    "helps when you are subtracting negative numbers. Make sure that you understand how":
        "negatif sayıları çıkarırken yardımcı olur. Şu işlemin nasıl yapıldığını anladığınızdan emin olun:",
    "In the following exercises, simplify.": "Aşağıdaki alıştırmalarda sadeleştirin.",
    "In the following exercises, evaluate.": "Aşağıdaki alıştırmalarda ifadelerin değerini bulun.",
    "In the following exercises, fill in <, >, or": "Aşağıdaki alıştırmalarda boşlukları <, > veya",
    "In the following exercises, multiply.": "Aşağıdaki alıştırmalarda çarpma işlemlerini yapın.",
    "In the following exercises, divide.": "Aşağıdaki alıştırmalarda bölme işlemlerini yapın.",
    "In the following exercises, evaluate each expression.": "Aşağıdaki alıştırmalarda her ifadenin değerini bulun.",
    "In the following exercises, evaluate the following expressions.": "Aşağıdaki alıştırmalarda verilen ifadelerin değerini bulun.",
    "77. Give an example of a negative number from your life experience.":
        "77. Günlük yaşamınızdan bir negatif sayı örneği verin.",
    "is positive.": "pozitiftir.",
    "What does it mean to multiply 5 by": "5'i şu sayıyla çarpmak ne anlama gelir:",
    "It means subtract 5, 3 times. Looking at subtraction as “taking away,” it means to take away 5, 3 times. But there is nothing to take away, so we start by adding neutral pairs on the workspace. Then we take away 5 three times.":
        "Bu, 5'i üç kez çıkarmak anlamına gelir. Çıkarmayı ‘eksiltme’ olarak düşünürsek 5'i üç kez eksiltmemiz gerekir. Ancak çıkarılacak bir şey olmadığından çalışma alanına nötr çiftler ekleyerek başlarız. Ardından 5'i üç kez çıkarırız.",
    "Positive \\cdot negative": "Pozitif \\cdot negatif",
    "Negative \\cdot positive": "Negatif \\cdot pozitif",
    "When we multiply a number by 1, the result is the same number. What happens when we multiply a number by":
        "Bir sayıyı 1 ile çarptığımızda sonuç aynı sayı olur. Peki bir sayıyı",
    "? Let’s multiply a positive number and then a negative number by":
        "ile çarptığımızda ne olur? Önce pozitif, ardından negatif bir sayıyı",
    ". In words, this expression says that 15 can be divided into three groups of five each because adding five three times gives 15. Look at some examples of multiplying integers, to figure out the rules for dividing integers.":
        "Bu ifade, beşi üç kez topladığımızda 15 elde edildiği için 15'in beşerli üç gruba ayrılabileceğini söyler. Tam sayılarda bölme kurallarını bulmak için tam sayılarda çarpma örneklerine bakalım.",
    "Positive and negative": "Pozitif ve negatif",
    "Negative and positive": "Negatif ve pozitif",
    "Divide. With different signs, the quotient is negative.": "Bölün. İşaretler farklı olduğundan bölüm negatiftir.",
    "Divide. With signs that are the same, the quotient is positive.": "Bölün. İşaretler aynı olduğundan bölüm pozitiftir.",
    "Translate and simplify: the sum of 8 and": "Çevirin ve sadeleştirin: 8 ile",
    "Translate and simplify a) the difference of 14 and": "Çevirin ve sadeleştirin: a) 14 ile",
    "Translate and simplify a) the difference of 11 and": "Çevirin ve sadeleştirin: a) 11 ile",
    "Once again, our prior work translating English to algebra transfers to phrases that include both multiplying and dividing integers. Remember that the key word for":
        "İngilizceden cebire çeviriyle ilgili önceki çalışmalarımız, tam sayıların çarpılmasını ve bölünmesini içeren ifadelere de uygulanır. Unutmayın,",
    "Checking Account": "Banka Hesabı",
    "75. In your own words, state the rules for multiplying integers.":
        "75. Kendi sözlerinizle tam sayılarda çarpma kurallarını açıklayın.",
    "76. In your own words, state the rules for dividing integers.":
        "76. Kendi sözlerinizle tam sayılarda bölme kurallarını açıklayın.",
    "In the following exercises, use the divisibility tests to determine whether each number is divisible by 2, by 3, by 5, by 6, and by 10":
        "Aşağıdaki alıştırmalarda her sayının 2, 3, 5, 6 ve 10'a bölünüp bölünmediğini bölünebilme kurallarıyla belirleyin.",
    "In the following exercises, find the prime factorization.":
        "Aşağıdaki alıştırmalarda sayıları asal çarpanlarına ayırın.",
    "79. Derek bought a skirt and a blouse. The skirt cost $15 more than the blouse. Let b represent the cost of the blouse. Write an expression for the cost of the skirt.":
        "79. Derek bir etek ve bluz aldı. Etek bluzdan 15 dolar daha pahalıydı. Bluzun fiyatını b ile gösterin ve eteğin fiyatını veren bir ifade yazın.",
    "141. When b = -11, evaluate:": "141. b = -11 iken aşağıdakilerin değerini bulun:",
    "142. When c = -9, evaluate:": "142. c = -9 iken aşağıdakilerin değerini bulun:",
    "152. CheckingAccount Adrianne has a balance of -$22 in her checking account. She deposits $301 to the account. What is the new balance?":
        "152. Banka Hesabı Adrianne'nin hesabında -22 dolar bakiye vardır. Hesaba 301 dolar yatırır. Yeni bakiye nedir?",
    "1. Write as a whole number using digits: two hundred five thousand, six hundred seventeen.":
        "1. Verilen sayıyı rakamlarla yazın: iki yüz beş bin altı yüz on yedi.",
    "7. Translate to an algebraic expression and simplify: twenty less than negative 7.":
        "7. Cebirsel ifadeye çevirip sadeleştirin: negatif 7'den yirmi eksik.",
    "Review Exercise Answers": "Tekrar Alıştırmalarının Cevapları",
    "37. 25 minus 7, the difference of twenty-five and seven":
        "37. 25 eksi 7; yirmi beş ile yedinin farkı",
    "39. 45 divided by 5, the quotient of forty-five and five":
        "39. 45 bölü 5; kırk beşin beşe bölümü",
    "41. forty-two is greater than or equal to twenty-seven":
        "41. Kırk iki, yirmi yediden büyük veya ona eşittir.",
    "43. 3 is less than or equal to 20 divided by 4, three is less than or equal to the quotient of twenty and four":
        "43. 3, 20 bölü 4'ten küçük veya ona eşittir; üç, yirminin dörde bölümünden küçük veya ona eşittir.",
    "17. by 2,3,6": "17. 2, 3 ve 6 ile bölünür",
    "19. by 3,5": "19. 3 ve 5 ile bölünür",
    "21. by 2,5,10": "21. 2, 5 ve 10 ile bölünür",
    "Figure 3 All the marked numbers are called integers.":
        "Şekil 3. İşaretlenmiş sayıların tümüne tam sayı denir.",
    "a) 14 is to the right of 6 on the number line.": "a) 14, sayı doğrusunda 6'nın sağındadır.",
    "b) −1 is to the left of 9 on the number line.": "b) −1, sayı doğrusunda 9'un solundadır.",
    "c) −1 is to the right of −4 on the number line.": "c) −1, sayı doğrusunda −4'ün sağındadır.",
    "d) 2 is to the right of −20 on the number line.": "d) 2, sayı doğrusunda −20'nin sağındadır.",
    "The whole numbers and their opposites are called the": "Doğal sayılar ve bunların karşıtları",
    "are opposites because they are the same distance from 0 on the number line. They are both two units from 0. The distance between 0 and any number on the number line is called the":
        "sayı doğrusunda 0'a eşit uzaklıkta oldukları için birbirlerinin karşıtıdır. Her ikisi de 0'a iki birim uzaklıktadır. Sayı doğrusunda 0 ile herhangi bir sayı arasındaki uzaklığa o sayının",
    "for all numbers": "her sayı için",
    "for all numbers. Absolute values are always greater than or equal to zero!":
        "her sayı için geçerlidir. Mutlak değerler her zaman sıfırdan büyük veya sıfıra eşittir!",
    "A $16 fee was deducted from his checking account.": "Banka hesabından 16 dolarlık bir ücret kesildi.",
    "Ester has $124 in her checking account. She writes a check for $152. What is the new balance in her checking account?":
        "Ester'in banka hesabında 124 dolar vardır. 152 dolarlık bir çek yazar. Hesabın yeni bakiyesi nedir?",
    "Selina has $165 in her checking account. She writes a check for $207. What is the new balance in her checking account?":
        "Selina'nın banka hesabında 165 dolar vardır. 207 dolarlık bir çek yazar. Hesabın yeni bakiyesi nedir?",
    "Kevin has a balance of": "Kevin'in banka hesabındaki bakiye",
    "in his checking account. He deposits $225 to the account. What is the new balance?":
        "kadardır. Hesaba 225 dolar yatırır. Yeni bakiye nedir?",
    "Reymonte has a balance of": "Reymonte'un banka hesabındaki bakiye",
    "in his checking account. He deposits $281 to the account. What is the new balance?":
        "kadardır. Hesaba 281 dolar yatırır. Yeni bakiye nedir?",
    "8. Monique has a balance of −$18 in her checking account. She deposits $152 to the account. What is the new balance?":
        "8. Monique'in banka hesabında -18 dolar bakiye vardır. Hesaba 152 dolar yatırır. Yeni bakiye nedir?",
    "Glossary": "Sözlük",
    "Use Place Value with Whole Number": "Doğal Sayılarda Basamak Değerini Kullanma",
    "Identify Multiples and Factors": "Katları ve Çarpanları Belirleme",
}


@dataclass
class TextNode:
    value: str


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Node | TextNode] = field(default_factory=list)


@dataclass
class Line:
    text: str
    refs: set[str]
    has_formula: bool = False


@dataclass(frozen=True)
class Features:
    normalized: str
    words: frozenset[str]
    stems: frozenset[str]
    numbers: tuple[str, ...]
    kind: str


class TreeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.stack.pop()

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(TextNode(data))


class LineRenderer:
    def __init__(self) -> None:
        self.lines: list[Line] = []
        self.parts: list[str] = []
        self.refs: set[str] = set()
        self.has_formula = False

    def emit(self, value: str, ref: str | None = None, formula: bool = False) -> None:
        self.parts.append(value)
        if ref:
            self.refs.add(ref)
        self.has_formula = self.has_formula or formula

    def br(self) -> None:
        value = "".join(self.parts).replace("\xa0", " ")
        value = re.sub(r"[ \r\f\v]+", " ", value).strip()
        if value:
            self.lines.append(Line(value, set(self.refs), self.has_formula))
        self.parts.clear()
        self.refs.clear()
        self.has_formula = False

    def render(self, node: Node | TextNode, active_slot: str | None = None) -> None:
        if isinstance(node, TextNode):
            self.emit(node.value, active_slot)
            return

        classes = set(node.attrs.get("class", "").split())
        if node.tag in {"script", "style"} or node.attrs.get("aria-hidden") == "true":
            return
        if "bc-details" in classes:
            for child in node.children:
                if isinstance(child, Node) and "bc-summary" in set(child.attrs.get("class", "").split()):
                    self.render(child, active_slot)
            return
        if node.tag == "browser-slot":
            active_slot = f"slot:{node.attrs['data-slot']}"
        if node.tag == "img":
            alt = node.attrs.get("alt", "")
            if not alt:
                return
            key = node.attrs.get("data-browser-alt-key", "")
            ref = f"attr:{key}" if key else None
            if "ql-img-inline-formula" in classes:
                self.emit(alt, ref, formula=True)
            else:
                self.br()
                self.emit(alt, ref)
                self.br()
            return

        if node.tag in BLOCK_TAGS:
            self.br()
        if node.tag == "br":
            self.br()
        for child in node.children:
            self.render(child, active_slot)
        if node.tag in BLOCK_TAGS:
            self.br()
        if node.tag in {"td", "th"}:
            self.emit("\t")
        if node.tag == "tr":
            self.br()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("text_file", type=Path)
    parser.add_argument("--chapter", type=int, default=1, choices=range(1, 10))
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--min-confidence", type=float, default=0.56)
    return parser.parse_args()


def plain(value: str) -> str:
    return " ".join(html.unescape(value).replace("\xa0", " ").split())


def annotate_image(tag_match: re.Match[str]) -> str:
    tag = tag_match.group(0)
    alt_match = ALT_RE.search(tag)
    if not alt_match:
        return tag
    key = base64.urlsafe_b64encode(html.unescape(alt_match.group("value")).encode()).decode()
    ending = "/>" if tag.rstrip().endswith("/>") else ">"
    return f'{tag.rstrip()[:-len(ending)].rstrip()} data-browser-alt-key="{key}"{ending}'


def annotated_fragment(fragment: str, part_id: str, fixes: dict[str, object]) -> tuple[str, list[str]]:
    part_fixes = fixes.get("parts", {}).get(part_id, {})
    tokens = build_lessons.HTML_TOKEN_RE.split(fragment)
    output: list[str] = []
    slots: list[str] = []
    slot = 0
    for token in tokens:
        if token.startswith("<"):
            output.append(IMG_TAG_RE.sub(annotate_image, token))
            continue
        slots.append(token)
        replacement = part_fixes.get(str(slot))
        if replacement is not None and token.strip():
            leading = token[: len(token) - len(token.lstrip())]
            trailing = token[len(token.rstrip()):]
            token = f"{leading}{html.escape(str(replacement), quote=False)}{trailing}"
        if token:
            output.append(f'<browser-slot data-slot="{slot}">{token}</browser-slot>')
        slot += 1

    value = "".join(output)
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

    value = build_lessons.TRANSLATABLE_ATTR_RE.sub(replace_attribute, value)
    return build_lessons.repair_turkish_terms(value), slots


def render_lines(fragment: str) -> list[Line]:
    parser = TreeParser()
    parser.feed(fragment)
    renderer = LineRenderer()
    renderer.render(parser.root)
    renderer.br()
    return renderer.lines


def normalized(value: str) -> str:
    value = value.casefold().replace("’", "'")
    value = re.sub(r"\s+", " ", value)
    return re.sub(r"[^0-9a-zçğıöşü]+", " ", value).strip()


def number_signature(value: str) -> tuple[str, ...]:
    return tuple(item.replace(".", "").replace(",", "") for item in NUMBER_RE.findall(value))


def kind(value: str) -> str:
    key = normalized(value)
    if SECTION_RE.match(value):
        return "section"
    for prefix, label in (
        (("örnek",), "example"), (("dene",), "try"), (("çözüm",), "solution"),
        (("şekil",), "figure"), (("yanıtı göster", "cevabı göster"), "answer"),
        (("nasıl yapılır",), "howto"), (("atıflar", "kaynakça"), "attribution"),
        (("öğrenme hedefleri",), "objectives"),
    ):
        if key.startswith(prefix):
            return label
    if not re.search(r"[a-zçğıöşü]", key):
        return "formula"
    return "text"


def features(value: str) -> Features:
    key = normalized(value)
    words = frozenset(WORD_RE.findall(key))
    stems = frozenset(word[:5] for word in words if len(word) >= 3)
    return Features(key, words, stems, number_signature(value), kind(value))


def set_overlap(left: frozenset[str], right: frozenset[str]) -> float:
    return (2 * len(left & right) / (len(left) + len(right))) if left and right else 0.0


def similarity(left: Features, right: Features) -> tuple[float, float]:
    confidence = max(set_overlap(left.words, right.words), set_overlap(left.stems, right.stems))
    if left.normalized == right.normalized:
        confidence = 1.0
    if left.kind == right.kind and left.kind != "text" and left.numbers == right.numbers:
        confidence = max(confidence, 0.9)
    score = -2.0 + confidence * 7.0
    if left.numbers or right.numbers:
        score += 3.0 if left.numbers == right.numbers else -7.0
    if left.kind == right.kind and left.kind != "text":
        score += 3.0
    elif left.kind != right.kind and "text" not in {left.kind, right.kind}:
        score -= 5.0
    length_ratio = min(len(left.normalized), len(right.normalized)) / max(1, max(len(left.normalized), len(right.normalized)))
    if length_ratio < 0.35:
        score -= 4.0
    return score, confidence


def section_ranges(lines: list[Line] | list[str]) -> list[tuple[int, int]]:
    texts = [line.text if isinstance(line, Line) else line for line in lines]
    starts = [0] + [index for index, text in enumerate(texts) if SECTION_RE.match(text)] + [len(texts)]
    return list(zip(starts, starts[1:]))


def align_segment(source: list[Line], browser: list[str], source_offset: int, browser_offset: int) -> list[tuple[int, int, float]]:
    rows, columns = len(source), len(browser)
    gap = -2.5
    scores = [[0.0] * (columns + 1) for _ in range(rows + 1)]
    trace = [[0] * (columns + 1) for _ in range(rows + 1)]
    for row in range(1, rows + 1):
        scores[row][0], trace[row][0] = row * gap, 1
    for column in range(1, columns + 1):
        scores[0][column], trace[0][column] = column * gap, 2
    confidence_cache: dict[tuple[int, int], float] = {}
    source_features = [features(line.text) for line in source]
    browser_features = [features(line) for line in browser]
    for row in range(1, rows + 1):
        for column in range(1, columns + 1):
            pair_score, confidence = similarity(source_features[row - 1], browser_features[column - 1])
            confidence_cache[(row - 1, column - 1)] = confidence
            choices = (
                scores[row - 1][column - 1] + pair_score,
                scores[row - 1][column] + gap,
                scores[row][column - 1] + gap,
            )
            direction = max(range(3), key=choices.__getitem__)
            scores[row][column], trace[row][column] = choices[direction], direction
    pairs: list[tuple[int, int, float]] = []
    row, column = rows, columns
    while row or column:
        direction = trace[row][column]
        if direction == 0:
            pairs.append((source_offset + row - 1, browser_offset + column - 1, confidence_cache[(row - 1, column - 1)]))
            row -= 1
            column -= 1
        elif direction == 1:
            row -= 1
        else:
            column -= 1
    return list(reversed(pairs))


def align(source: list[Line], browser: list[str]) -> list[tuple[int, int, float]]:
    source_ranges, browser_ranges = section_ranges(source), section_ranges(browser)
    if len(source_ranges) != len(browser_ranges):
        raise RuntimeError(f"Section mismatch: {len(source_ranges)} source ranges, {len(browser_ranges)} browser ranges")
    pairs: list[tuple[int, int, float]] = []
    for (s1, s2), (b1, b2) in zip(source_ranges, browser_ranges):
        pairs.extend(align_segment(source[s1:s2], browser[b1:b2], s1, b1))
    return pairs


def match_case(source: str, replacement: str) -> str:
    if source.isupper():
        return replacement.upper()
    if source[:1].isupper():
        return replacement[:1].upper() + replacement[1:]
    return replacement


def replace_case(value: str, pattern: str, replacement: str) -> str:
    return re.sub(pattern, lambda match: match_case(match.group(0), replacement), value, flags=re.I)


def polish(browser_text: str, english_text: str) -> str:
    if english_text in EXACT_TRANSLATIONS:
        return EXACT_TRANSLATIONS[english_text]
    value = browser_text.strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"“\s+", "“", value)
    value = re.sub(r"\s+”", "”", value)
    value = re.sub(r'"\s*([^"\n]*?\S)\s*"', r'"\1"', value)
    if re.search(r"\bwhole numbers?\b", english_text, re.I):
        whole_forms = {
            "tam sayıları": "doğal sayıları", "tam sayıların": "doğal sayıların",
            "tam sayılarda": "doğal sayılarda", "tam sayılardan": "doğal sayılardan",
            "tam sayılara": "doğal sayılara", "tam sayılar": "doğal sayılar",
            "tam sayının": "doğal sayının", "tam sayıyı": "doğal sayıyı",
            "tam sayıya": "doğal sayıya", "tam sayıda": "doğal sayıda",
            "tam sayıdan": "doğal sayıdan", "tam sayı": "doğal sayı",
        }
        for source, target in whole_forms.items():
            value = replace_case(value, rf"\b{re.escape(source)}\b", target)
    if re.search(r"\bintegers?\b", english_text, re.I):
        value = replace_case(value, r"\btamsayı", "tam sayı")
    if re.search(r"\bperiods?\b", english_text, re.I):
        period_forms = {
            "periyotlardaki": "bölüklerdeki", "dönemlerdeki": "bölüklerdeki",
            "periyottaki": "bölükteki", "dönemdeki": "bölükteki",
            "periyotların": "bölüklerin", "dönemlerin": "bölüklerin",
            "periyotları": "bölükleri", "dönemleri": "bölükleri", "noktaları": "bölükleri",
            "periyodun": "bölüğün", "dönemin": "bölüğün", "noktanın": "bölüğün",
            "periyotta": "bölükte", "dönemde": "bölükte", "noktada": "bölükte",
            "periyoda": "bölüğe", "döneme": "bölüğe", "noktaya": "bölüğe",
            "periyottan": "bölükten", "dönemden": "bölükten", "noktadan": "bölükten",
            "periyotlar": "bölükler", "dönemler": "bölükler", "noktalar": "bölükler",
            "periyot": "bölük", "dönem": "bölük", "nokta": "bölük",
        }
        for source, target in period_forms.items():
            value = replace_case(value, rf"\b{source}\b", target)
    if re.search(r"\bpositive|negative\b", english_text, re.I):
        signed_forms = {
            "olumlulardan": "pozitiflerden", "olumsuzlardan": "negatiflerden",
            "olumluları": "pozitifleri", "olumsuzları": "negatifleri",
            "olumlular": "pozitifler", "olumsuzlar": "negatifler",
            "olumlu": "pozitif", "olumsuz": "negatif",
        }
        for source, target in signed_forms.items():
            value = replace_case(value, rf"\b{source}\b", target)
    if re.search(r"\bcounters?\b", english_text, re.I):
        counter_forms = {
            "sayaçların": "pulların", "sayaçları": "pulları", "sayaçlarla": "pullarla",
            "sayaçlardan": "pullardan", "sayaçlara": "pullara", "sayaçlarda": "pullarda",
            "sayaçlar": "pullar", "sayacın": "pulun", "sayacı": "pulu",
            "sayaca": "pula", "sayaçta": "pulda", "sayaç": "pul",
        }
        for source, target in counter_forms.items():
            value = replace_case(value, rf"\b{source}\b", target)
    value = value.replace("Sayıları Sayma", "Sayma Sayıları").replace("sayıları sayma", "sayma sayıları")
    return value


def decode_attr(encoded: str) -> str:
    return base64.urlsafe_b64decode(encoded.encode()).decode()


def main() -> int:
    args = parse_args()
    text_path = args.text_file if args.text_file.is_absolute() else ROOT / args.text_file
    fixes = json.loads(FIXES_PATH.read_text(encoding="utf-8"))
    chapter = build_lessons.CHAPTERS["tr"][args.chapter - 1]
    part_id = str(chapter["source_id"])
    tr_parts = build_lessons.extract_parts((ROOT / "sources" / "incalg-TR.html").read_text(encoding="utf-8"))
    en_parts = build_lessons.extract_parts((ROOT / "sources" / "incalg.html").read_text(encoding="utf-8"))
    fragment, tr_slots = annotated_fragment(tr_parts[part_id], part_id, fixes)
    en_slots = [token for token in build_lessons.HTML_TOKEN_RE.split(en_parts[part_id]) if not token.startswith("<")]
    if len(tr_slots) != len(en_slots):
        raise RuntimeError(f"Text-slot mismatch: {len(tr_slots)} != {len(en_slots)}")
    source_lines = render_lines(fragment)
    browser_lines = [line.strip() for line in text_path.read_text(encoding="utf-8").splitlines() if line.strip()]
    first_section = next(index for index, value in enumerate(browser_lines) if SECTION_RE.match(value))
    browser_lines = browser_lines[max(0, first_section - 6):]
    for marker in ("Ders dizini", "Course index"):
        if marker in browser_lines:
            browser_lines = browser_lines[:browser_lines.index(marker)]

    pairs = align(source_lines, browser_lines)
    part_fixes = fixes.setdefault("parts", {}).setdefault(part_id, {})
    attribute_fixes = fixes.setdefault("part_attributes", {}).setdefault(part_id, {})
    changed_slots = changed_attributes = eligible = 0
    samples: list[str] = []
    attribute_candidates: dict[str, tuple[float, str]] = {}
    for source_index, browser_index, confidence in pairs:
        line = source_lines[source_index]
        browser_text = browser_lines[browser_index]
        if confidence < args.min_confidence or len(line.refs) != 1 or line.has_formula:
            continue
        if number_signature(line.text) != number_signature(browser_text):
            continue
        ref = next(iter(line.refs))
        if ref.startswith("slot:"):
            slot = int(ref.removeprefix("slot:"))
            english_text = plain(en_slots[slot])
            if not re.search(r"[A-Za-z]{2}", english_text):
                continue
            replacement = polish(browser_text, english_text)
            eligible += 1
            if plain(replacement) == plain(tr_slots[slot]) and str(slot) not in part_fixes:
                continue
            if part_fixes.get(str(slot)) != replacement:
                if len(samples) < 12:
                    samples.append(f"slot {slot}: {line.text[:70]} -> {replacement[:70]}")
                part_fixes[str(slot)] = replacement
                changed_slots += 1
        elif ref.startswith("attr:"):
            raw_key = decode_attr(ref.removeprefix("attr:"))
            replacement = polish(browser_text, raw_key)
            eligible += 1
            if raw_key not in attribute_candidates or confidence > attribute_candidates[raw_key][0]:
                attribute_candidates[raw_key] = (confidence, replacement)

    for raw_key, (_, replacement) in attribute_candidates.items():
        if attribute_fixes.get(raw_key) != replacement:
            attribute_fixes[raw_key] = replacement
            changed_attributes += 1

    for slot, english_raw in enumerate(en_slots):
        english_text = plain(english_raw)
        replacement = EXACT_TRANSLATIONS.get(english_text)
        if replacement is not None and plain(replacement) == plain(tr_slots[slot]) and str(slot) not in part_fixes:
            continue
        if replacement is not None and part_fixes.get(str(slot)) != replacement:
            part_fixes[str(slot)] = replacement
            changed_slots += 1

    fixes["parts"][part_id] = dict(sorted(part_fixes.items(), key=lambda item: int(item[0])))
    if not args.dry_run:
        FIXES_PATH.write_text(json.dumps(fixes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"source lines: {len(source_lines)}, browser lines: {len(browser_lines)}, aligned: {len(pairs)}")
    print(f"eligible high-confidence lines: {eligible}")
    print(f"changed text slots: {changed_slots}, changed image attributes: {changed_attributes}")
    for sample in samples:
        print(sample)
    if args.dry_run:
        print("dry run — no files changed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
