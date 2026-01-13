# Göre Medya Ajans — React + Vite + Express

Modern, hızlı ve içerik yönetimi yapılabilir bir dijital ajans sitesi. Proje iki parçadan oluşur:

- `/client`: React 18 + Vite + TypeScript
- `/server`: Express + lowdb (JSON dosya veritabanı)

## Özellikler

- **Pazarlama sitesi** (Hero, hizmetler, süreç, portfolyo, blog, CTA ve iletişim)
- **Admin paneli** (CRUD: hizmetler, logo, portfolyo, blog, leads, ayarlar)
- **Fiyat hesaplama sihirbazı** (çok adımlı, kayıtlı lead)
- **Blog** (10 adet uzun SEO odaklı Türkçe içerik seeded)
- **SPA SEO** (react-helmet-async, robots.txt, sitemap scripti, JSON-LD)
- **Animasyonlar** (Framer Motion, 3D slider, logo marquee)
- **Google Analytics** (ayarlarla gtag)

> Not: SPA olduğundan SEO için en iyi sonuç SSR/SSG ile alınır. Bu proje SPA için mümkün olan en iyi SEO uygulamalarını içerir.

## Kurulum

### 1) Sunucu (Express)

```bash
cd server
npm install
npm run seed
npm run dev
```

Sunucu `http://localhost:4000` adresinde çalışır.

### 2) İstemci (Vite)

```bash
cd client
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışır.

## Varsayılan Admin Bilgileri

- **E-posta:** `admin@goremedya.com`
- **Şifre:** `admin123`

## Ortam Değişkenleri

### Sunucu `.env`

```bash
PORT=4000
JWT_SECRET=supersecret
ADMIN_EMAIL=admin@goremedya.com
ADMIN_PASSWORD=admin123
UPLOAD_DIR=../client/public/uploads
```

### İstemci `.env`

```bash
VITE_API_URL=http://localhost:4000
```

## Deployment

- **Client:** `npm run build` ile `client/dist` üretin ve statik olarak yayınlayın.
- **Server:** `npm run start` ile Express sunucusunu çalıştırın.
- Gerekirse `VITE_API_URL` ile API domainini güncelleyin.
- `server/seed.js` ile veri tabanını yeniden oluşturabilirsiniz.

## Scripts

### Client
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run sitemap`

### Server
- `npm run dev`
- `npm run start`
- `npm run seed`

## Klasör Yapısı (Özet)

```
client/
  public/
  scripts/
  src/
server/
  db.json
  seed-data.json
```

## SEO Notları

- `client/scripts/generate-sitemap.mjs` ile sitemap üretin.
- `client/public/robots.txt` varsayılan olarak hazırdır.
- Her sayfada JSON-LD ve meta başlıkları kullanılmıştır.

