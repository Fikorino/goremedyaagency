# Göre Medya Ajans (React + Vite + Express)

Bu depo, “Göre Medya Ajans” için hazırlanmış modern bir web sitesini içerir.
Teknik bilgisi olmayan birinin bile kurup çalıştırabilmesi için adımlar en baştan anlatılmıştır.

## 1) Bu proje ne yapar?

- Ajansın **genel tanıtım sitesi** (anasayfa, hizmetler, portfolyo, blog, iletişim)
- **Admin paneli** (içerik yönetimi)
- **Fiyat hesaplama sihirbazı** (çok adımlı teklif hesaplama + lead kaydı)
- **Blog** (10 uzun Türkçe yazı hazır gelir)

## 2) Proje klasörleri

```
/workspace/goremedyaagency
├── client   → Ön yüz (web sitesi)
└── server   → API (admin giriş ve veri kaydı)
```

## 3) Kurulum (tek seferlik)

Bilgisayarınızda **Node.js 18+** olduğundan emin olun.

```bash
npm install
```

> Eğer “403 Forbidden” hatası alırsanız, ağ/kurumsal izinlerden dolayı erişim engelleniyor olabilir.

## 4) İlk veri hazırlığı (seed)

Projeyi ilk kez çalıştırmadan önce demo verileri oluşturun:

```bash
npm run seed
```

Bu işlem şunları oluşturur:
- 7 hizmet
- 3 portfolyo örneği
- 4 logo
- 10 uzun blog yazısı

## 5) Çalıştırma (geliştirme)

### 5.1 API’yi çalıştır
```bash
npm run dev:server
```

API şu adreste çalışır: `http://localhost:8080`

### 5.2 Web sitesini çalıştır
Yeni bir terminal açın ve:

```bash
npm run dev
```

Web sitesi şu adreste çalışır: `http://localhost:5173`

## 6) Admin panel girişi

Tarayıcıda şu adrese gidin:
```
http://localhost:5173/admin/login
```

Varsayılan giriş:
- **Email:** `admin@goremedyaajans.com`
- **Şifre:** `Admin123!`

## 7) SEO ve sitemap

Sitemap üretmek için:

```bash
npm --workspace client run sitemap
```

## 8) Yayınlama (production)

### 8.1 Web sitesi (client)
```bash
npm run build
```

Çıktı: `client/dist`

### 8.2 API (server)
```bash
npm --workspace server run start
```

## 9) Ortam değişkenleri (çok önemli)

`/server/.env` dosyası oluşturun:

```bash
PORT=8080
ADMIN_EMAIL=admin@goremedyaajans.com
ADMIN_PASSWORD=Admin123!
JWT_SECRET=change-me
```

Opsiyonel olarak client için:

```bash
VITE_API_URL=http://localhost:8080
```

## 10) Önemli dosyalar

- `client/src/pages/*` → Ön yüz sayfaları
- `client/src/admin/*` → Admin panel sayfaları
- `client/src/lib/api.ts` → API iletişim noktası
- `server/src/index.js` → Express API
- `server/src/seed.js` → Demo veriler

---

## Notlar

- Bu proje SPA olduğu için SEO’nun en iyisi için SSR/SSG’ye geçiş önerilir.
- Görsel yüklemeleri geliştirmede `client/public/uploads` klasörüne kaydedilir.
