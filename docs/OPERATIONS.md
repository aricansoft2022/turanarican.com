# Operasyon Kılavuzu

Bu dosya `turanarican.com` için deploy, dashboard, veritabanı, asset ve üretim
kontrollerinin yaşayan kılavuzudur. Yeni bir panel ayarı, hata, deployment
kararı veya altyapı adımı netleştiğinde bu dosyayı güncelle.

## Hızlı Özet

Proje şu anda:

- Next.js App Router kullanıyor.
- Cloudflare Workers üzerinde OpenNext ile çalışacak şekilde paketleniyor.
- Turso SQLite + Drizzle için hazırlanmış durumda.
- Crawled görsel/şekil/tablo assetleri için ileride Cloudflare R2 kullanılacak.
- Public crawler veya admin endpoint yok.
- Canlı canonical host şu an `https://turanarican.com`.
- `https://www.turanarican.com` Cloudflare tarafından apex hosta 301
  yönleniyor.

En önemli deploy kuralı:

```bash
npm run cf:build
npx @opennextjs/cloudflare deploy
```

Cloudflare dashboard tek komut istiyorsa:

```bash
npm run deploy
```

`npm run build` yalnızca Next.js build üretir. Cloudflare/OpenNext deploy için
gereken `.open-next` worker çıktısını üretmez.

## Roller

Codex tarafı:

- Kod, config ve dokümantasyon değişikliklerini yapar.
- Local doğrulama komutlarını çalıştırır.
- Migration ve deploy komutlarını hazırlar.
- Gerekirse repo commit/push yapar.

Kullanıcı tarafı:

- Cloudflare, Turso, GitHub ve domain dashboardlarında hesap/dns/secret gibi
  yetki gerektiren işleri yapar.
- Production tokenları güvenli yerde tutar.
- Dashboard üzerinden görünen URL, deploy logu veya hata mesajlarını Codex ile
  paylaşır.

## Local Hazırlık

Repo kökünde çalış:

```bash
npm install
```

Günlük geliştirme sunucusu:

```bash
npm run dev
```

Production benzeri build kontrolü:

```bash
npm run build
```

Cloudflare/OpenNext paket kontrolü:

```bash
npm run cf:build
```

Local Cloudflare preview:

```bash
npm run preview
```

## Deploy Öncesi Kontrol Listesi

Deploy öncesi normal kalite kapıları:

```bash
npm run typecheck
npm run lint
npm run build
npm run cf:build
npm audit --omit=dev
```

Schema değiştiyse ayrıca:

```bash
npm run db:generate
npm run db:migrate
```

Beklenen durum:

- `typecheck` hatasız.
- `lint` hatasız.
- `next build` başarılı.
- `cf:build` sonunda `.open-next/worker.js` üretildi mesajı görünür.
- `npm audit --omit=dev` 0 vulnerability döner.
- `git status --short --branch` temiz veya değişiklikler bilinçli şekilde
  commitlenmiştir.

## Environment Variables

Gerçek secretları git'e koyma. `.env.example` sadece isimleri ve güvenli
placeholder değerleri gösterir.

Şu an bilinen değişkenler:

- `NEXT_PUBLIC_SITE_URL`: public site adresi. Production için
  `https://turanarican.com`.
- `CONTENT_SOURCE`: public içerik kaynağı. Varsayılan `static`; Turso içeriğine
  bilinçli geçiş için `database` yap.
- `TURSO_DATABASE_URL`: Turso database URL.
- `TURSO_AUTH_TOKEN`: Turso auth token.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account id. CI veya CLI akışında
  gerekebilir.
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token. Dashboard Git deploy kullanırken
  çoğu zaman manuel eklemek gerekmez, ama CI/CLI için gerekebilir.
- `R2_ASSETS_BUCKET`: ileride kullanılacak asset bucket adı.

Cloudflare dashboard'da env var girerken:

1. Production ve preview ortamlarını ayrı düşün.
2. Secret olan değerleri plaintext dokümana yazma.
3. Değişiklikten sonra yeni deploy tetikle.
4. Env değişkeni runtime'da okunuyorsa eski deploy otomatik güncellenmeyebilir;
   yeniden deploy güvenli yaklaşımdır.

`CONTENT_SOURCE=database` yapmadan önce production Turso migration'ları ve seed
payload uygulanmış olmalı. Aksi halde public route'lar build veya runtime
sırasında içerik bulamayabilir. Geçişten önce repo içinde:

```bash
npm run seed:pipeline
```

Bu pipeline, seed fixture doğrulamasına ek olarak Türkçe dil sinyali kontrolünü
ve tüm `Sıra Sizde`/kaynak alıştırmalar için açıklamalı çözüm kapsamını da
zorunlu kalite kapısı olarak çalıştırır.

ve hedef DB için:

```bash
npm run db:migrate
npm run seed:db-apply -- --write
```

çalıştır.

## GitHub

Remote repo:

```text
https://github.com/aricansoft2022/turanarican.com
```

Kontrol:

```bash
git remote -v
git status --short --branch
git log -3 --oneline
```

Push:

```bash
git push
```

Yeni ortamda remote yoksa:

```bash
git remote add origin https://github.com/aricansoft2022/turanarican.com.git
git push -u origin main
```

## Cloudflare Workers Deploy

Bu proje Cloudflare Workers için OpenNext kullanır. Cloudflare tarafında normal
Next.js Pages ayarı gibi davranma; hedef `.open-next` worker çıktısıdır.

### Dashboard Ayarları

Git-connected Workers Builds kullanırken önerilen ayarlar:

- Repository: `aricansoft2022/turanarican.com`
- Branch: `main`
- Root directory: repo kökü
- Framework preset: None/manual veya Cloudflare'ın OpenNext Worker algıladığı
  özel preset
- Install command: boş bırakılabilir veya `npm ci`
- Build command: `npm run cf:build`
- Deploy command: `npx @opennextjs/cloudflare deploy`

Dashboard tek komut istiyorsa:

```bash
npm run deploy
```

Kullanma:

```bash
npm run build
npx wrangler deploy
```

Neden? `npm run build`, yalnızca `.next` üretir. OpenNext deploy ise
`.open-next` altında compiled config ve worker bekler.

### Local Deploy

Localden deploy etmek için:

```bash
npm run deploy
```

Eşdeğer açık komut:

```bash
npm run cf:deploy
```

Bu komutlar önce OpenNext build yapar, sonra deploy eder.

### Build Logda Beklenen Sinyaller

Başarılı OpenNext build sırasında şunlara benzer satırlar görünür:

```text
OpenNext — Cloudflare build
OpenNext — Building Next.js app
OpenNext — Generating bundle
Worker saved in `.open-next/worker.js`
OpenNext build complete.
```

Sadece şu route özetini görmek yeterli değildir:

```text
Route (app)
┌ ○ /
...
Success: Build command completed
```

Bu kısım Next.js build'in geçtiğini gösterir; OpenNext worker çıktısının
üretildiğini garanti etmez.

## Son Görülen Deploy Hatası

Hata:

```text
OpenNext project detected, calling `opennextjs-cloudflare deploy`
ERROR Could not find compiled Open Next config, did you run the build command?
```

Sebep:

- Cloudflare build command olarak `next build` veya `npm run build` çalıştırmış.
- Sonra deploy command olarak `npx wrangler deploy` çalışmış.
- Wrangler OpenNext projesini algılayıp OpenNext deploy'a yönlendirmiş.
- Ancak `.open-next` çıktısı olmadığı için deploy düşmüş.

Çözüm:

- Build command: `npm run cf:build`
- Deploy command: `npx @opennextjs/cloudflare deploy`

veya tek komut:

```bash
npm run deploy
```

## Domain ve DNS

Production hedef:

```text
turanarican.com
www.turanarican.com -> turanarican.com
```

Dashboard'da kontrol edilecekler:

1. Domain Cloudflare zone içinde mi?
2. DNS kayıtları doğru Worker/route veya custom domain hedefine gidiyor mu?
3. `www.turanarican.com` hostu `turanarican.com` apex adresine 301
   yönleniyor mu?
4. Canonical URL uygulamada `https://turanarican.com` olarak kalıyor mu?
5. SSL/TLS aktif ve hata vermiyor mu?

Öneri:

- Ana canonical host şu an `turanarican.com`.
- `www` hostu apex hosta yönlensin.

## Cloudflare Güvenlik Ayarları

Normal ders okuma akışı kullanıcıya açık olmalı; bunu Turnstile veya login ile
engelleme.

Repo içinde uygulananlar:

- `next.config.ts` global security headers gönderir:
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `X-Frame-Options`
  - `Permissions-Policy`
  - `Cross-Origin-Opener-Policy`
- Explicit blocked routes şu iç yüzeyleri public'te 404 ile kapatır:
  - `/admin`
  - `/api/admin`
  - `/api/crawl`
  - `/api/ingest`
  - `/api/revalidate`
- Not: OpenNext/Cloudflare, Next 16 `proxy.ts`/Node middleware yolunu şu an
  desteklemediği için bu koruma middleware/proxy ile değil route dosyalarıyla
  uygulanır.

Cloudflare dashboard'da yapılacaklar:

### WAF Managed Rules

1. Cloudflare Dashboard'da account ve `turanarican.com` zone'unu seç.
2. Yeni dashboard'da **Security > Settings** sayfasına git.
3. **Web application exploits** filtresini kullan.
4. Managed rulesetleri aç:
   - `Cloudflare Managed Ruleset`
   - Varsa `Cloudflare OWASP Core Ruleset`
5. İlk etapta hassas ayarları çok agresif yapma; false positive görürsen
   ilgili rule/tag için exception ekle.

Eski dashboard'da yaklaşık yol:

```text
Security > WAF > Managed rules
```

### Bot Fight / Bot Protection

Free/Pro düzeyinde:

1. **Security > Settings** sayfasına git.
2. **Bot traffic** filtresini kullan.
3. **Bot Fight Mode** veya plan destekliyorsa **Super Bot Fight Mode** aç.
4. İlk günlerde Cloudflare analytics/logları takip et.
5. Normal kullanıcı, Googlebot ve eğitim içeriklerini indeksleyen legitimate bot
   trafiği etkileniyorsa modu yumuşat veya exception ekle.

Not: Bot koruması ders okumayı engelleyecek kadar agresif olmamalı.

### Rate Limiting

Önerilen başlangıç kuralı:

- Rule name: `general-read-throttle`
- Expression:

```text
(http.host eq "turanarican.com" or http.host eq "www.turanarican.com")
```

- Characteristics: IP
- Period: 60 seconds
- Threshold: 120 requests
- Action: Managed Challenge veya JS Challenge

Dashboard yolu:

```text
Security > Security rules > Create rule > Rate limiting rules
```

İleride API/admin yüzeyleri açılırsa ayrı ve daha sıkı kural ekle:

```text
(http.request.uri.path starts_with "/api/" or http.request.uri.path starts_with "/admin")
```

Önerilen başlangıç:

- Period: 60 seconds
- Threshold: 20 requests
- Action: Block veya Managed Challenge

### Admin/Crawler/Ingest Endpointleri

Şu an public admin, crawler veya ingest endpoint yok. Yeni endpoint eklenirse:

1. Public route olarak açma.
2. Cloudflare Access, signed secret, IP allowlist veya admin auth olmadan deploy
   etme.
3. Blocked route dosyalarını veya yeni admin/auth korumasını güncelle.
4. Rate limiting için ayrı kural ekle.
5. Endpoint crawler ise public app request path içinde çalıştırma.

Turnstile:

- Sadece form, yorum, auth, admin gibi etkileşimli riskli yüzeylerde kullanılmalı.
- Ders sayfası okumayı Turnstile arkasına alma.

## Cache Stratejisi

Şimdilik:

- Static assets agresif cachelenebilir.
- Lesson HTML/route cache politikası içerik ingestion pipeline netleşince tekrar
  karar verilecek.
- OG route dinamik olduğu için dikkatli cachelenmeli.

İleride:

- R2 assetleri immutable keylerle servis edilirse uzun cache verilebilir.
- İçerik değişirse key/hash değişimi veya purge stratejisi gerekir.

## Turso ve Drizzle

Şu an migration dosyaları repo içinde takip ediliyor:

```text
db/migrations/
```

Schema değiştiğinde:

```bash
npm run db:generate
npm run db:migrate
```

Seed ders fixture'ını DB satırlarına çevirip şemaya karşı kontrol etmek için:

```bash
npm run seed:lessons
npm run seed:validate
npm run seed:db-payload
npm run seed:db-verify
npm run seed:db-read
npm run content:verify
npm run content:solution-check
npm run content:build
```

Tek komutluk repo içi seed kalite kapısı:

```bash
npm run seed:pipeline
```

Sıradaki seed adayını ve parse/editoryal iş yükünü görmek için:

```bash
npm run content:seed-coverage
npm run content:next-seed
```

Not: `seed:db-payload` fixture validation'ı kendisi de çalıştırır; bozuk seed
fixture DB payload'a çevrilmez. `seed:db-read`, migration uygulanmış geçici
SQLite veritabanına seed yazar ve uygulamanın `Book`/`Lesson` okuma modeline
geri çevrilebildiğini doğrular. `content:verify`, hem varsayılan statik içerik
kaynağını hem de geçici SQLite üstünden `CONTENT_SOURCE=database` akışını
uygulamanın kullandığı içerik fonksiyonlarıyla test eder. `content:build`,
geçici SQLite seed DB ile `CONTENT_SOURCE=database` build'i çalıştırır ve seed
lesson route'larının prerender edildiğini kontrol eder. `content:solution-check`,
seedlenen her `Sıra Sizde` ve kaynak alıştırmasının açıklamalı reveal çözümü
olduğunu doğrular.

Migration uygulanmış bir Turso veya lokal SQLite hedefine seed payload'ı yazmak
için önce kuru koşuyu kontrol et:

```bash
npm run seed:db-apply
```

Yazma işlemi bilinçli bayrak ister:

```bash
TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run seed:db-apply -- --write
```

Bu komut `id` üzerinden upsert yapar; mevcut seed satırlarını günceller, aynı
tablolardaki seed dışı satırları silmez. Migration'ı otomatik çalıştırmaz.

Production Turso adımları:

1. Turso dashboard'da production database oluştur.
2. Production auth token üret.
3. İlk migration/seed denemesi için ayrı Turso branch URL'i kullan.
4. Branch üzerinde migration ve seed yazma komutlarını doğrula.
5. Cloudflare env vars içine production `TURSO_DATABASE_URL` ve
   `TURSO_AUTH_TOKEN` ekle.
6. Migration'ı production database'e bilinçli olarak uygula.
7. Dashboard'da tablo listesini ve migration durumunu kontrol et.

Önemli:

- Migration public app request path içinde çalışmamalı.
- Production tokenları commitlenmemeli.
- Token sızıntısı şüphesi varsa token rotate edilmeli.
- Cloudflare secret değerleri sonradan okunamaz. Token'ın doğru olup olmadığı
  dashboard'da değeri görerek değil, aynı token ile branch/prod bağlantı
  komutlarının başarılı olmasıyla doğrulanır.
- Turso branch URL'i production URL'den ayrıdır; branch'e yazılan migration ve
  seed verisi production'a otomatik yansımaz.

## R2 Asset Pipeline

Crawler şimdiden stable asset keyleri üretiyor:

```text
assets/{bookSlug}/{lessonSlug}/{assetId}
```

R2 üretime alınırken:

1. Cloudflare R2 bucket oluştur.
2. Bucket adını `.env.example` ve dashboard env ile uyumlu tut.
3. `wrangler.jsonc` içine R2 binding ekle.
4. Crawler veya ingest job assetleri R2'ye yüklesin.
5. `source_assets` tablosunda `r2Key`, `contentHash`, `status` güncellensin.
6. Türkçe yeniden çizilen görseller `redrawn`, sorunlu yeniden çizimler
   `fallback_original` olarak işaretlensin.

Not: Worker dashboard'daki `ASSETS` binding'i OpenNext/Workers static assets
binding'idir. Bu binding R2 bucket değildir. R2 üzerinden ders görselleri
okunacaksa ayrıca R2 bucket binding'i eklenmelidir. R2 bucket public access
kapalı ve boş kalabilir; asset pipeline üretime alınana kadar bu sorun değildir.

Asset statüleri:

- `discovered`: kaynakta bulundu.
- `downloaded`: lokal veya ingest cache'e alındı.
- `redrawn`: Türkçe yeniden üretildi.
- `uploaded`: production asset storage'a yüklendi.
- `fallback_original`: yeniden üretim güvenilir olmadığı için kaynak asset
  kullanılacak.

## Crawl ve Ingestion

Crawler public request sırasında çalışmamalı. İdeal akış:

1. TOC keşfi.
2. Chapter TOC keşfi.
3. Target range ve numbering policy uygulama.
4. Lesson HTML fetch.
5. Raw snapshot/cache.
6. İçerik gövdesi parse.
7. Self Check kaldırma.
8. Örnekler, alıştırmalar, cevaplar, tablolar, figürler, math AST çıkarma.
9. Sayı yerelleştirme: `1,000.25` -> `1.000,25`; math içinde `1.000{,}25`.
10. Turkish adaptation.
11. Validation.
12. Turso insert/update.
13. Asset upload.

Kaynak numara ve display numara ayrı kalmalı:

- `sourceNumber`: LibreTexts'teki gerçek numara.
- `displayNumber`: Türkçe üründe görünen numara.

Örnek:

```text
source 2.3 -> display 2.2
```

## Post-Deploy Smoke Test

Deploy sonrası tarayıcıda kontrol et:

- `https://turanarican.com` açılıyor.
- `https://www.turanarican.com` 301 ile `https://turanarican.com` adresine
  gidiyor.
- Ana sayfa mobil ve desktopta taşmıyor.
- Ders route'u açılıyor:
  `/kitap/prealgebra-2e/cebir-diline-giris/cebirsel-ifadeler`
- Sağda/ekranda çift scrollbar yok.
- Türkçe karakterler doğru.
- KaTeX matematikler render oluyor.
- Çözümler başlangıçta kapalı, tıklayınca açılıyor.
- `/robots.txt` cevap veriyor.
- `/sitemap.xml` cevap veriyor.
- `/og` cevap veriyor.
- OG preview kırık değil.
- Attribution/license görünür.
- Cloudflare logs içinde repeated runtime error yok.

Komutla hızlı kontrol örnekleri:

```bash
curl -I https://turanarican.com
curl -I https://turanarican.com/robots.txt
curl -I https://turanarican.com/sitemap.xml
curl -I "https://turanarican.com/og?title=Test&label=Kontrol"
curl -I https://www.turanarican.com
```

## Rollback

Cloudflare dashboard'da önceki başarılı deployment'a dönmek tercih edilir.

Rollback yapmadan önce:

1. Hata yalnızca env/config kaynaklı mı?
2. Yeni commit mi bozdu?
3. Database migration geri dönüş gerektiriyor mu?
4. Asset veya cache purge gerekiyor mu?

Kod rollback gerekiyorsa:

- Önce Cloudflare dashboard'dan önceki deployment'a dön.
- Sonra repoda düzeltme commit'i hazırla.
- Destructive git komutları kullanmadan ilerle.

## Sık Hatalar

### `.open-next` bulunamadı

Belirti:

```text
Could not find compiled Open Next config
```

Çözüm:

- Build command `npm run cf:build` olmalı.
- Deploy command `npx @opennextjs/cloudflare deploy` olmalı.

### `TURSO_DATABASE_URL` eksik

Belirti:

- Runtime database bağlantı hatası.
- Cloudflare logs içinde env missing benzeri hata.

Çözüm:

- Cloudflare env vars içine Turso URL ve token ekle.
- Yeni deploy tetikle.

### OG route uyarısı

Belirti:

```text
Using edge runtime on a page currently disables static generation for that page
```

Şu an beklenen uyarıdır. `/og` dinamik/edge çalıştığı için build'i engellemez.

### Türkçe sayı biçimi hatalı

Belirti:

- `1,000` Türkçe içerikte binlik ayırıcı gibi değil de İngilizce biçimde
  kalmış.
- `2.5` Türkçe metinde ondalık nokta ile görünüyor.

Çözüm:

- Ingestion/adaptation sırasında `src/content/number-localization.ts` kuralları
  uygulanmalı.
- Math içinde ondalık virgül `{,}` olarak korunmalı.

## Ne Zaman Deploy Etmek Mantıklı?

Şu an deploy etmek şu amaçlarla faydalı:

- Cloudflare/OpenNext ayarlarını doğrulamak.
- Domain ve DNS akışını görmek.
- OG, sitemap, robots ve routing smoke test yapmak.
- Runtime logs ve observability'yi kontrol etmek.

Şu amaçlar için erken:

- SEO lansmanı.
- Kullanıcıya açık tam içerik duyurusu.
- Geniş katalog yayını.

İçerik ingestion tamamlanana kadar deploy'u "altyapı testi" olarak gör.

## Güncelleme Kuralı

Bu dosya şu durumlarda güncellenmeli:

- Cloudflare dashboard ayarı değiştiğinde.
- Turso production database oluşturulduğunda.
- R2 bucket ve binding eklendiğinde.
- Deploy hatası ve çözümü öğrenildiğinde.
- Yeni env var eklendiğinde.
- Yeni post-deploy kontrolü gerektiğinde.
