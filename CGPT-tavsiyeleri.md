# CGPT Tavsiyeleri

Bu belge, `turanarican.com` projesinin yüksek trafik altında ekonomik ve sürdürülebilir biçimde çalıştırılması üzerine ChatGPT tarafından yapılan teknik değerlendirmelerin tartışma notudur.

## Önemli çalışma talimatı

Bu belgedeki maddeler **onaylanmış kararlar veya doğrudan uygulanacak görevler değildir**.

Codex:

- Bu tavsiyelere dayanarak workflow, deployment, cache, veritabanı, routing, Cloudflare, Turso, R2, güvenlik veya içerik üretim akışında kendiliğinden değişiklik yapmamalıdır.
- Herhangi bir uygulamaya başlamadan önce öneriyi kullanıcıyla tartışmalı; gerekçeyi, beklenen faydayı, riskleri, alternatifleri ve değişecek dosyaları açıklamalıdır.
- Kullanıcının açık onayı olmadan kod, config, dashboard talimatı veya operasyon akışı değiştirilmemelidir.
- Mevcut üretim ve içerik ekleme workflow'u şimdilik aynen korunmalıdır.
- Bu dosya bir görev listesi değil, ileride değerlendirilecek mimari seçenekler kaydıdır.

## Mevcut durumun özeti

Proje şu anda genel olarak doğru yöndedir:

- Next.js App Router kullanılıyor.
- Cloudflare Workers üzerinde OpenNext hedefleniyor.
- Kitap, bölüm ve ders rotaları `generateStaticParams()` ile önceden üretilebiliyor.
- Varsayılan içerik kaynağı `static`; Turso kullanımı opsiyonel.
- OpenNext static assets binding mevcut.
- Crawler ve ingestion işlemleri public request path dışında tutuluyor.
- Güvenlik header'ları ve public olmaması gereken bazı route korumaları uygulanmış durumda.

Bu nedenle şu aşamada bütün uygulamayı Render üzerinde sürekli çalışan bir Next.js Web Service'e taşımak önerilmiyor. Public ders okuma trafiği için Cloudflare'ın static-first modeli ekonomik olarak daha uygun görünüyor.

## Tartışılması önerilen konular

### 1. Production cache davranışının ölçülmesi

Kodun statik üretime uygun olması tek başına yeterli değildir. Canlı ders sayfalarının gerçekten Cloudflare static assets veya edge cache katmanından mı servis edildiği, yoksa her isteğin Worker çalıştırıp çalıştırmadığı ölçülmelidir.

Tartışmadan sonra yapılabilecek doğrulamalar:

- `npm run cf:build` çıktısının incelenmesi
- `.open-next` altında üretilen static/prerender assetlerin kontrol edilmesi
- Canlı ders URL'lerinde `curl -I` ile `CF-Cache-Status`, `Cache-Control`, `Age` ve ilgili header'ların ölçülmesi
- Cloudflare Worker invocation ve CPU metriklerinin ders trafiğiyle karşılaştırılması

Bu ölçüm yapılmadan cache veya deployment mimarisinde kapsamlı değişiklik önerilmemelidir.

### 2. Public içerik için static-first modelin korunması

Önerilen temel yön:

```text
Turso veya repo içeriği
        ↓
build / deploy sırasında okuma
        ↓
önceden üretilmiş ders çıktısı
        ↓
Cloudflare static assets / CDN
        ↓
ziyaretçi
```

Kaçınılması önerilen varsayılan model:

```text
her ziyaretçi
    ↓
Worker runtime
    ↓
Turso sorgusu
    ↓
ders çıktısı
```

`CONTENT_SOURCE=database` seçeneği public request başına database okuması anlamına gelecek şekilde production'da açılmadan önce kullanıcıyla tartışılmalıdır. Database kaynaklı build mümkündür; runtime database bağımlılığı teknik olarak zorunlu değildir.

### 3. `dynamicParams = false` seçeneği

Kitap, bölüm ve ders rotalarında önceden üretilmemiş rastgele slug isteklerinin dinamik render yoluna düşmesini kesin biçimde engellemek için `dynamicParams = false` değerlendirilebilir.

Ancak uygulanmadan önce şunlar tartışılmalıdır:

- İçerik yayınlama sırasında yeni slug'ların deploy öncesi erişilebilir olması gerekip gerekmediği
- OpenNext/Next.js mevcut davranışının zaten yeterli olup olmadığı
- 404 davranışının SEO ve preview akışlarına etkisi

### 4. Dinamik OG görsellerinin cachelenmesi veya statik üretilmesi

Mevcut `/og` route'u query parametrelerine göre runtime'da `ImageResponse` üretiyor. Uzun süreli edge cache header'ı eklemek veya ders başına OG görsellerini build sırasında statik üretmek değerlendirilebilir.

Öncelikli seçenekler:

1. Mevcut route'u koruyup güçlü CDN cache header'ları eklemek.
2. Ders başına değişmez OG URL'leri üretmek.
3. OG görsellerini build pipeline'ında statik dosya olarak oluşturmak.

Değişiklik öncesinde build süresi, deploy boyutu, purge ihtiyacı ve OpenNext uyumu tartışılmalıdır.

### 5. OpenNext cache bileşenleri

`open-next.config.ts` içinde incremental cache, tag cache ve queue için `dummy` adaptörleri kullanılıyor.

Bu, deploy ile güncellenen tamamen statik içerik modelinde kabul edilebilir. Sırf daha gelişmiş görünmesi için KV, D1 veya benzeri bir cache sistemi eklenmemelidir.

Gerçek bir cache adaptörü ancak şu ihtiyaçlardan biri ortaya çıkarsa tartışılmalıdır:

- ISR
- `revalidateTag` veya `revalidatePath`
- Deploy dışı içerik yayınlama
- Dinamik içerik invalidation
- Runtime CMS davranışı

### 6. R2 ve figure asset hattı

R2 kullanımı planlanmış olsa da gerçek R2 binding, upload otomasyonu ve figure renderer hattı henüz tamamlanmış değildir. Figure block'ları şu anda gerçek asset yerine placeholder gösterebilir.

Önerilen sıra:

1. Asset renderer veri sözleşmesini netleştirmek.
2. Yerel/static asset gösterimini tamamlamak.
3. Upload ve immutable key stratejisini doğrulamak.
4. Bundan sonra R2 binding ve production upload hattını eklemek.

Boş bir R2 bucket veya kullanılmayan binding eklemek ilerleme sayılmamalıdır.

### 7. Rate limiting yaklaşımı

Hostun tamamına IP başına düşük bir istek limiti uygulamak okul, kurs veya ortak ağ kullanan öğrenciler için sorun çıkarabilir. Next.js prefetch ve asset istekleri de toplam sayıyı büyütebilir.

Genel okuma trafiği yerine öncelikle pahalı veya kötüye kullanılabilir yüzeylerin sınırlandırılması tartışılmalıdır:

- `/og`
- gelecekteki API route'ları
- auth ve form endpointleri
- admin/crawler/ingest yüzeyleri
- pahalı arama veya raporlama endpointleri

Static assetler ve normal ders okuma trafiği mümkün olduğunca cache ve bot yönetimiyle korunmalıdır.

### 8. Render veya başka servislerin rolü

Render, projenin tamamını barındırmak için şu an öncelikli öneri değildir. Aşağıdaki ihtiyaçlar doğarsa ayrı bir servis olarak değerlendirilebilir:

- Uzun süren crawler işleri
- Background worker
- Queue consumer
- Workers runtime ile uyumsuz Node.js/native paketler
- Uzun süreli process veya WebSocket

Bu durumda hibrit model değerlendirilebilir:

```text
Public site: Cloudflare
Database: Turso
Assets: static assets / gerektiğinde R2
Crawler veya ağır background işler: GitHub Actions, Render worker veya VPS
```

Public web trafiğinin tamamını Render'a taşımak ancak ölçülmüş teknik bir zorunluluk varsa tartışılmalıdır.

## Önerilen tartışma sırası

Kullanıcı ileride bu konuları ele almak istediğinde önerilen sıra şöyledir:

1. Canlı cache ve Worker invocation ölçümleri
2. Production `CONTENT_SOURCE` değerinin doğrulanması
3. OG cache veya statik OG kararı
4. Geçersiz slug/dynamic route davranışı
5. Rate limiting kapsamı
6. Figure renderer ve asset pipeline
7. R2 üretim entegrasyonu
8. Ancak ihtiyaç doğarsa ISR veya gerçek OpenNext cache adaptörü

## Karar ilkesi

Mimari değişiklikler varsayıma göre değil ölçüme göre yapılmalıdır. Her öneride şu sorular cevaplanmadan uygulamaya geçilmemelidir:

- Şu an ölçülen gerçek problem nedir?
- Mevcut maliyet veya performans etkisi nedir?
- Öneri bu problemi nasıl çözüyor?
- Daha basit bir çözüm var mı?
- Yeni operasyon yükü veya vendor bağımlılığı oluşturuyor mu?
- Geri alma planı nedir?

Son karar her zaman kullanıcıya aittir. Codex bu belgeyi gördüğünde değişiklik yapmak yerine önce kullanıcıyla tartışmalıdır.
