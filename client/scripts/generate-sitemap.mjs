import fs from "node:fs";
import path from "node:path";

const baseUrl = process.env.SITE_URL || "https://goremedya.com";

const routes = [
  "/",
  "/hizmetler",
  "/portfolyo",
  "/fiyat-hesapla",
  "/blog",
  "/hakkimizda",
  "/iletisim",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((route) => {
      return `  <url><loc>${baseUrl}${route}</loc></url>`;
    })
    .join("\n") +
  "\n</urlset>\n";

const outputPath = path.resolve("./public/sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");
console.log(`Sitemap generated at ${outputPath}`);
