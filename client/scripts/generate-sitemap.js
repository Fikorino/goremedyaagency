import fs from "fs";
import path from "path";

const baseUrl = "https://goremedyaajans.com";
const routes = [
  "/",
  "/hizmetler",
  "/portfolyo",
  "/fiyat-hesapla",
  "/blog",
  "/hakkimizda",
  "/iletisim",
  "/admin"
];

const dynamicRoutes = {
  services: [
    "sosyal-medya-yonetimi",
    "grafik-tasarim",
    "produksiyon",
    "web-site-tasarimi",
    "fotograf-cekimi",
    "marka-tanitimi",
    "reklam-calismalari"
  ],
  portfolio: ["aurora-otel", "nova-clinic", "denizli-coffee"],
  blog: [
    "2026da-sosyal-medya-yonetimi",
    "reels-ile-satis-artirma",
    "marka-kimligi-nedir",
    "google-ads-mi-meta-ads-mi",
    "kurumsal-web-sitesi-seo-temelleri",
    "ajansla-calisirken-brief",
    "fotograf-cekimi-ile-guven",
    "produksiyon-sureci",
    "yerel-seo-google-business-profile",
    "aylik-icerik-plani"
  ]
};

const urls = [
  ...routes,
  ...dynamicRoutes.services.map((slug) => `/hizmetler/${slug}`),
  ...dynamicRoutes.portfolio.map((slug) => `/portfolyo/${slug}`),
  ...dynamicRoutes.blog.map((slug) => `/blog/${slug}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((url) => `  <url><loc>${baseUrl}${url}</loc></url>`)
  .join("\n")}\n</urlset>`;

const outputPath = path.resolve("./public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap generated at ${outputPath}`);
