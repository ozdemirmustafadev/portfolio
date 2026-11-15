# ozdemirmustafa.com

Kişisel sitem. Ne iş yaptığımı, üzerinde çalıştığım projeleri ve ara sıra yazdığım yazıları burada topluyorum. Site Türkçe ve İngilizce.

![Ana sayfa](docs/screenshot.jpg)

## Neler kullandım

- Next.js 16 ve TypeScript
- Tailwind CSS
- Blog yazıları için MDX
- İletişim formu için Nodemailer
- Yayında: kendi sunucumda Docker + Nginx

## Kendi bilgisayarında çalıştırmak

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sonra http://localhost:3000 adresini aç. `.env.local` dosyasını boş bıraksan da site açılır, sadece iletişim formu mail gönderemez.

## İçerik nerede

Sitedeki bilgilerin çoğu koddan ayrı dosyalarda duruyor, bir şeyi güncellemek için bileşenlere dokunmak gerekmiyor:

- `src/content/`: profil, projeler, deneyim, eğitim ve yetenekler
- `src/content/blog/tr` ve `src/content/blog/en`: blog yazıları
- `src/i18n/dictionaries/`: arayüzdeki metinler

Yeni bir yazı eklemek için iki klasöre de aynı isimle bir `.mdx` dosyası koymak yeterli.

## Ortam değişkenleri

`.env.example` dosyasında hepsi var. Kısaca:

- `SMTP_*`: form mesajlarını gönderen mail hesabı
- `CONTACT_TO_EMAIL`: mesajların düşeceği adres
- `GITHUB_TOKEN`: zorunlu değil. Verirsen katkı takvimi GitHub API'sinden gelir, vermezsen herkese açık profil sayfasından okunur.
- `NEXT_PUBLIC_SITE_URL`: sitenin adresi, sitemap ve paylaşım önizlemeleri bunu kullanıyor

## Yayına alma

Sunucuda:

```bash
cp .env.example .env
docker compose up -d --build
```

Container sadece `127.0.0.1:3000` portunu dinliyor, dışarıya Nginx açıyor. Kullandığım ayar `deploy/nginx.conf` içinde. Sertifikayı Certbot ile alıyorum:

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d ozdemirmustafa.com -d www.ozdemirmustafa.com
```

Güncellemek için `git pull` yapıp aynı `docker compose` komutunu tekrar çalıştırmak yetiyor.

---

Kodu inceleyip fikir almakta serbestsin. Yazılar ve fotoğraflar bana ait.
