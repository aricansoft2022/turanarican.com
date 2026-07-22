# Site ve Ders Güncelleme Rehberi

Bu dosya, Figma veya ders kaynakları güncellendiğinde Türkçe ve İngilizce siteyi mevcut çalışmayı bozmadan yeniden üretmek için ana referanstır.

## Sabit kapsam

- Türkçe kaynak `sources/incalg-TR.html`, İngilizce kaynak `sources/incalg.html` dosyasıdır.
- Kitap kaynağındaki üst düzey Chapter 1–9’un tamamı işlenir.
- Chapter 1 öncesindeki önsöz, kitap bilgileri ve diğer ön bölümlere girilmez veya müdahale edilmez.
- Bölüm içerikleri özetlenmez; açıklamalar, örnekler, alıştırmalar, cevaplar, tablolar ve görseller tam aktarılır.
- İngilizce dersler özgün İngilizce kaynaktan, Türkçe dersler hazırlanmış Türkçe kaynaktan üretilir.
- Türkçe kaynakta İngilizce kalmış veya açıkça bozulmuş metinlerin karşılığı İngilizce kaynakla slot bazında eşlenir. Kaynak dosyaları bu işlem sırasında değiştirilmez.
- Üretilen ders HTML dosyaları elle düzenlenmez; kalıcı değişiklikler üretim araçlarında yapılır.

İşlenen üst düzey kimlikler:

- `part-whole-numbers-wrapper`
- `part-operations-with-rational-numbers-wrapper`
- `part-measurement-perimeter-area-and-volume-wrapper`
- `part-ratio-proportion-percent-wrapper`
- `part-part-2-wrapper`
- `part-chapter-6-linear-equations-and-graphing-wrapper`
- `part-chapter-7-powers-roots-and-scientific-notation-wrapper`
- `part-polynomials-wrapper`
- `part-trigonometry-wrapper`

## Dil ve URL yapısı

Türkçe:

- `/`
- `/dersler/on-cebir/`
- `/dersler/on-cebir/bolum-1/` … `/bolum-9/`

İngilizce:

- `/en/`
- `/en/courses/prealgebra/`
- `/en/courses/prealgebra/chapter-1/` … `/chapter-9/`

Her sayfada TR/EN dil seçici bulunur. Dil bağlantısı aynı içeriğin diğer dildeki karşılığına gitmelidir; ana sayfaya geri düşürülmemelidir. Her iki karşılık ayrıca `rel="alternate"` ve `hreflang` ile tanımlanır.

## SEO ve sosyal paylaşım

- Canonical alan adı `https://turanarican.com` olup `settings/seo.json` içinde tek noktadan yönetilir.
- Her genel sayfa kendisini gösteren mutlak bir `rel="canonical"` bağlantısı taşır.
- Türkçe ve İngilizce eşler her iki sayfada da mutlak `tr`, `en` ve Türkçe karşılığı gösteren `x-default` bağlantılarıyla tanımlanır.
- Sayfa başlığı ve açıklaması; Open Graph ve Twitter kart metinleriyle aynı, sayfaya özel ve ilgili dilde tutulur.
- Ana sayfalarda `WebSite` ve `Person`, ders dizinlerinde `Course`, bölümlerde `LearningResource`; ders ve bölüm sayfalarında ayrıca `BreadcrumbList` JSON-LD verisi bulunur.
- `robots.txt` taramaya izin verir ve kökteki `sitemap.xml` dosyasını bildirir.
- Sayfa URL yapısı değiştiğinde veya genel bir sayfa eklendiğinde sitemap canonical etiketlerinden yeniden üretilir:

  ```sh
  python3 tools/build_sitemap.py
  ```

Bu aşamada özel OG görseli bilinçli olarak eklenmemiştir. Görsel hazırlandığında sayfa türlerine göre `og:image`, boyut, MIME türü ve erişilebilir açıklama; Twitter için de kart ve görsel etiketleri birlikte eklenmeli, ardından SEO denetimi buna göre genişletilmelidir.

## Ayar sistemi

Elle düzenlenebilen yerelleştirilmiş ayarlar:

- `settings/site.tr.json`, `settings/site.en.json`
- `settings/courses.tr.json`, `settings/courses.en.json`
- `settings/books/on-cebir.tr.json`
- `settings/books/prealgebra.en.json`
- `settings/seo.json`

`site.<dil>.json` içinde marka, YouTube, ana sayfa, alt bilgi, arayüz metinleri ve sorumluluk reddi bulunur. `courses.<dil>.json` ana sayfa kartlarını; `books/<kitap>.<dil>.json` kitap hero’sunu ve kaynak/lisans bağlantılarını yönetir. `seo.json` canonical alan adını, site adını, yazarı ve sosyal ağ kimliğini yönetir. JSON dosyalarında sonda fazladan virgül kullanılmaz.

Sorumluluk reddi her dilin kendi `site` ayarında tutulur ve ana sayfa ile kitap sayfasında görünür. Metin değiştirildiğinde iki dil birlikte güncellenmelidir.

## Asset düzeni

- Logo: `assets/images/brand/logo.png`
- Ana arka plan: `assets/images/home/background-overlapping.jpg`
- YouTube ve lisans ikonları: `assets/icons/`
- Ders kartı kapakları: `covers/`
- Ana sayfa ve kitap hero görselleri: `heros/`
- Her iki dilde ortak kullanılan ders görselleri: `assets/lessons/media/`
- Ders asset manifestleri: `assets/lessons/manifests/{tr,en}-chapter-*.json`
- Tasarım ekran görüntüleri: `sources/screenshots/`

Aynı özgün medya URL’si iki dilde tek yerel dosyaya karşılık gelir; İngilizce klasörü altında kopya asset tutulmaz.

## Ders kaynakları güncellendiğinde

1. Yeni dosyaları aynı adlarla `sources/` altına yerleştir.
2. İngilizce kalmış Türkçe slotları ve erişilebilir görsel metinlerini eşleyip kalıcı düzeltme tablosunu güncelle:

   ```sh
   python3 tools/complete_translation.py
   ```

   Araç mevcut `sources/translation-fixes-tr.json` dosyasını korur, yalnız yeni bulunan slotları ekler ve her başarılı çeviri grubundan sonra ilerlemeyi kaydeder. Ağ çağrısı yapmadan sayıyı görmek için `--dry-run` kullanılabilir. Çevrimiçi servis kota verirse Argos İngilizce→Türkçe modeli kurulmuş bir Python ortamında `--engine argos` kullanılır; sonuçta site yine dış servise bağımlı olmaz.

3. On sekiz ders sayfasını ve manifestleri üret:

   ```sh
   python3 tools/build_lessons.py
   ```

   Yalnız bir dili üretmek için `--locale tr` veya `--locale en` verilebilir. Araç yalnız eksik medyayı indirir. Uzak görsel aynı URL altında değiştiyse `--refresh`, geçici olarak kullanılmayan medyayı korumak gerekiyorsa `--keep-unused` kullanılır.

4. Son kontrolü çalıştır:

   ```sh
   python3 tools/check_site.py
   ```

### Tarayıcı destekli Türkçe çeviri geldiğinde

Tarayıcıdan dışa aktarılan düz metinler `sources/ön-cebir-chapter-{bölüm}-tr-by-browser.txt`
adıyla saklanır. Düz metin HTML yapısını, formüllerin sınırlarını ve gizli yanıtları
taşımadığı için ders sayfasına doğrudan yapıştırılmaz. İlgili bölümün görünür satırlarıyla
eşleştirilip kalıcı çeviri tablosuna aktarılır:

```sh
python3 tools/import_browser_translation.py \
  sources/ön-cebir-chapter-1-tr-by-browser.txt \
  --chapter 1
```

Araç yalnız tek bir metin yuvasına veya erişilebilir görsel açıklamasına güvenle bağlanan
satırları yazar; formülleri, bağlantıları, tabloları ve gizli yanıtları korur. Eşleşme eşiği
ancak sonuçlar elle karşılaştırıldıktan sonra `--min-confidence` ile düşürülmelidir.
Genel görsel çevirileri `attributes`, yalnız ilgili bölüme ait tarayıcı çevirileri ise
`part_attributes` altında tutulur. Aktarımdan sonra Türkçe dersleri yeniden üretip site
kontrolünü çalıştırın. Yalnız ilgili bölümü yeniden üretmek için:

```sh
python3 tools/build_lessons.py --locale tr --chapter 1
```

Mevcut taban 22 sayfa, 18 üretilen bölüm, 54 alt ders ve 11.431 benzersiz yerel ders medyasıdır. Kaynak değişince sayılar değişebilir; üretilen derslerde uzak `img/src` kalmaması esastır.

## Figma ve ekran görüntüleri güncellendiğinde

- Figma kaynağı `sources/turanarican.com.fig` dosyasıdır.
- `.fig` doğrudan okunamadığında `sources/screenshots/` altındaki ekran görüntüleri esas alınır.
- Ekran görüntüleri timestamp sırasıyla okunur; aynı alan için daha yeni kare daha eski karenin üzerindedir.
- Karelerdeki tasarım talimatları uygulamanın parçasıdır.
- Responsive kontroller en az 1440, 1024, 768 ve 390 px genişliklerde tekrarlanır.
- Tasarım güncellemesi ders içeriğini yeniden yazmaz; ders gövdesi yalnız ilgili dildeki kitap kaynağından gelir.

## Elle düzenlenen ve üretilen dosyalar

Elle düzenlenen ana dosyalar:

- `index.html`, `en/index.html`
- `dersler/on-cebir/index.html`, `en/courses/prealgebra/index.html`
- `settings/`, `assets/css/`, `assets/js/`
- `robots.txt`, `sitemap.xml`
- `tools/build_lessons.py`, `tools/build_sitemap.py`, `tools/complete_translation.py`, `tools/check_site.py`
- `docs/UPDATE_GUIDE.md`

Otomatik üretilenler:

- `dersler/on-cebir/bolum-{1..9}/index.html`
- `en/courses/prealgebra/chapter-{1..9}/index.html`
- `assets/lessons/media/`
- `assets/lessons/manifests/{tr,en}-chapter-*.json`
- `sources/translation-fixes-tr.json`

## Yerel önizleme

JSON ayarları `fetch` ile okunduğundan sayfalar yerel sunucuyla açılmalıdır:

```sh
python3 -m http.server 4173
```

Temel kontrol adresleri:

- `http://localhost:4173/`
- `http://localhost:4173/dersler/on-cebir/`
- `http://localhost:4173/dersler/on-cebir/bolum-1/`
- `http://localhost:4173/en/`
- `http://localhost:4173/en/courses/prealgebra/`
- `http://localhost:4173/en/courses/prealgebra/chapter-1/`

## Son kontrol listesi

- 22 sayfanın tamamında doğru TR/EN seçici ve `hreflang` karşılıkları var.
- Her sayfada tek ve mutlak canonical; `tr`, `en`, `x-default`; OG/Twitter metinleri ve geçerli JSON-LD var.
- `sitemap.xml` sayfa canonical kümesiyle aynı ve `robots.txt` tarafından bildiriliyor.
- Özel OG görseli hazırlanana kadar `og:image` eklenmiyor.
- Türkçe ve İngilizce metin, kart, hero ve arayüz ayarları kendi yerel JSON dosyasından yükleniyor.
- İki dilde sorumluluk reddi görünür durumda.
- İngilizce dersler `incalg.html`, Türkçe dersler `incalg-TR.html` içeriğini eksiksiz kullanıyor.
- Bölüm menüsü, tablolar, cevap blokları, pager ve okuma ilerleme çubuğu çalışıyor.
- Chapter 1 öncesindeki ön bölümler üretilen sayfalara girmiyor; Chapter 1–9’un tamamı mevcut.
- Ders içi görseller yerel ve iki dil arasında ortak; kırık yerel link veya eksik ayar yok.
- `*:Zone.Identifier`, `.part`, `__pycache__` ve eski manifests repoda kalmıyor.
