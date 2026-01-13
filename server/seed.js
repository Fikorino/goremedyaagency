import fs from "node:fs";
import path from "node:path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const source = path.resolve(__dirname, "seed-data.json");
const target = path.resolve(__dirname, "db.json");

if (!fs.existsSync(source)) {
  console.error("seed-data.json bulunamadı");
  process.exit(1);
}

fs.copyFileSync(source, target);
console.log("Seed verisi db.json dosyasına yazıldı.");
