import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@goremedya.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dbFile = path.resolve(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, {
  services: [],
  logos: [],
  portfolio: [],
  blog: [],
  leads: [],
  settings: {},
});

const uploadDir = process.env.UPLOAD_DIR || path.resolve(__dirname, "../client/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(uploadDir));

const loadDb = async () => {
  await db.read();
  db.data ||= { services: [], logos: [], portfolio: [], blog: [], leads: [], settings: {} };
};

const saveDb = async () => {
  await db.write();
};

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send("Yetkisiz");
  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).send("Token geçersiz");
  }
};

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = email === ADMIN_EMAIL;
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const isValidPassword = await bcrypt.compare(password, hashed);
  if (!isValidEmail || !isValidPassword) {
    return res.status(401).send("Giriş bilgileri hatalı");
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token });
});

app.get("/admin/summary", authMiddleware, async (_req, res) => {
  await loadDb();
  const { services, portfolio, blog, leads } = db.data;
  res.json({
    services: services.length,
    portfolio: portfolio.length,
    blog: blog.length,
    leads: leads.length,
  });
});

app.get("/services", async (_req, res) => {
  await loadDb();
  res.json(db.data.services);
});

app.get("/services/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.services.find((service) => service.slug === req.params.slug || service.id === req.params.slug);
  if (!item) return res.status(404).send("Bulunamadı");
  res.json(item);
});

app.post("/services", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = { ...req.body, id: nanoid() };
  db.data.services.push(payload);
  await saveDb();
  res.json(payload);
});

app.put("/services/:id", authMiddleware, async (req, res) => {
  await loadDb();
  const index = db.data.services.findIndex((service) => service.id === req.params.id);
  if (index === -1) return res.status(404).send("Bulunamadı");
  db.data.services[index] = { ...db.data.services[index], ...req.body };
  await saveDb();
  res.json(db.data.services[index]);
});

app.delete("/services/:id", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.services = db.data.services.filter((service) => service.id !== req.params.id);
  await saveDb();
  res.json({ ok: true });
});

app.get("/logos", async (req, res) => {
  await loadDb();
  const includeAll = req.query.all === "true";
  const items = includeAll ? db.data.logos : db.data.logos.filter((logo) => logo.active);
  res.json(items.sort((a, b) => a.order - b.order));
});

app.post("/logos", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = { ...req.body, id: nanoid() };
  db.data.logos.push(payload);
  await saveDb();
  res.json(payload);
});

app.put("/logos/:id", authMiddleware, async (req, res) => {
  await loadDb();
  const index = db.data.logos.findIndex((logo) => logo.id === req.params.id);
  if (index === -1) return res.status(404).send("Bulunamadı");
  db.data.logos[index] = { ...db.data.logos[index], ...req.body };
  await saveDb();
  res.json(db.data.logos[index]);
});

app.delete("/logos/:id", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.logos = db.data.logos.filter((logo) => logo.id !== req.params.id);
  await saveDb();
  res.json({ ok: true });
});

app.get("/portfolio", async (_req, res) => {
  await loadDb();
  res.json(db.data.portfolio);
});

app.get("/portfolio/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.portfolio.find((portfolio) => portfolio.slug === req.params.slug || portfolio.id === req.params.slug);
  if (!item) return res.status(404).send("Bulunamadı");
  res.json(item);
});

app.post("/portfolio", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = { ...req.body, id: nanoid() };
  db.data.portfolio.push(payload);
  await saveDb();
  res.json(payload);
});

app.put("/portfolio/:id", authMiddleware, async (req, res) => {
  await loadDb();
  const index = db.data.portfolio.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).send("Bulunamadı");
  db.data.portfolio[index] = { ...db.data.portfolio[index], ...req.body };
  await saveDb();
  res.json(db.data.portfolio[index]);
});

app.delete("/portfolio/:id", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.portfolio = db.data.portfolio.filter((item) => item.id !== req.params.id);
  await saveDb();
  res.json({ ok: true });
});

app.get("/blog", async (_req, res) => {
  await loadDb();
  const sorted = [...db.data.blog].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
});

app.get("/blog/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.blog.find((post) => post.slug === req.params.slug || post.id === req.params.slug);
  if (!item) return res.status(404).send("Bulunamadı");
  res.json(item);
});

app.post("/blog", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = { ...req.body, id: nanoid() };
  db.data.blog.push(payload);
  await saveDb();
  res.json(payload);
});

app.put("/blog/:id", authMiddleware, async (req, res) => {
  await loadDb();
  const index = db.data.blog.findIndex((post) => post.id === req.params.id);
  if (index === -1) return res.status(404).send("Bulunamadı");
  db.data.blog[index] = { ...db.data.blog[index], ...req.body };
  await saveDb();
  res.json(db.data.blog[index]);
});

app.delete("/blog/:id", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.blog = db.data.blog.filter((post) => post.id !== req.params.id);
  await saveDb();
  res.json({ ok: true });
});

app.get("/leads", authMiddleware, async (_req, res) => {
  await loadDb();
  res.json(db.data.leads);
});

app.post("/leads", async (req, res) => {
  await loadDb();
  const payload = { ...req.body, id: nanoid(), createdAt: new Date().toISOString() };
  db.data.leads.push(payload);
  await saveDb();
  res.json(payload);
});

app.get("/settings", async (_req, res) => {
  await loadDb();
  res.json(db.data.settings);
});

app.put("/settings", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.settings = { ...db.data.settings, ...req.body };
  await saveDb();
  res.json(db.data.settings);
});

app.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ url: filePath });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
