# Göre Medya Ajans (React + Vite)

Modern, hızlı ve içerik yönetilebilir bir medya/advertising ajansı web sitesi. Proje iki bölümden oluşur:

- **/client**: React 18 + Vite + TypeScript SPA
- **/server**: Express API (lowdb JSON veritabanı)

> Not: SPA için `react-helmet-async`, sitemap ve JSON-LD eklendi. En iyi SEO için SSR/SSG’ye geçiş önerilir.

## Özellikler

- Public marketing site (8 ana route)
- Admin panel (JWT tabanlı giriş)
- Çok adımlı fiyat hesaplama sihirbazı
- Blog (10 Türkçe uzun içerik, SEO alanları ve iç linkler)
- Portfolyo ve hizmet yönetimi
- Logolar, site ayarları, lead yönetimi
- Framer Motion animasyonları ve CSS 3D slider
- Google Analytics entegrasyonu (route değişim takibi)

## Kurulum

```bash
npm install
```

### Geliştirme

**Client**
```bash
npm run dev
```

**Server**
```bash
npm run dev:server
```

> API varsayılan olarak `http://localhost:8080` adresindedir. Client bu adresi kullanır.

### Build / Preview

```bash
npm run build
npm run preview
```

### Veri Seed

```bash
npm run seed
```

### Sitemap oluşturma

```bash
npm --workspace client run sitemap
```

## Varsayılan Admin Bilgileri

- **Email:** `admin@goremedyaajans.com`
- **Şifre:** `Admin123!`

Bu değerleri `.env` dosyasından değiştirebilirsiniz.

## Ortam Değişkenleri

`/server/.env` dosyası oluşturun ve aşağıdaki değerleri girin:

```bash
PORT=8080
ADMIN_EMAIL=admin@goremedyaajans.com
ADMIN_PASSWORD=Admin123!
JWT_SECRET=change-me
```

İsteğe bağlı client ortam değişkeni:

```bash
VITE_API_URL=http://localhost:8080
```

## Yayınlama

- Client: `npm run build` ile statik çıktıları alın (`/client/dist`).
- Server: `npm run dev:server` veya `npm --workspace server run start` ile API’yi çalıştırın.
- Görsel yüklemeleri geliştirmede `/client/public/uploads` içinde tutulur; prod ortamında bu klasörü kalıcı bir storage ile eşleyin.

## Klasör Yapısı

```
/workspace/goremedyaagency
├── client
│   ├── public
│   ├── scripts
│   └── src
│       ├── admin
│       ├── components
│       ├── layouts
│       ├── pages
│       └── styles
├── server
│   ├── data
│   └── src
└── README.md
```

## Önemli Dosyalar

- `client/src/pages/*` → Public sayfalar
- `client/src/admin/*` → Admin panel sayfaları
- `client/src/lib/api.ts` → API istemcisi
- `server/src/index.js` → Express API
- `server/src/seed.js` → Seed veri oluşturucu
- `client/scripts/generate-sitemap.js` → Sitemap scripti
