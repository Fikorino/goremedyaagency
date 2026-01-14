import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.resolve(__dirname, "../data/db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const adminEmail = process.env.ADMIN_EMAIL || "admin@goremedyaajans.com";
const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";
const jwtSecret = process.env.JWT_SECRET || "supersecret";

const uploadFolder = path.resolve(__dirname, "../../client/public/uploads");
const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

async function loadDb() {
  await db.read();
  db.data ||= {
    services: [],
    portfolio: [],
    blog: [],
    leads: [],
    logos: [],
    settings: {}
  };
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "12h" });
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

app.get("/services", async (req, res) => {
  await loadDb();
  res.json(db.data.services);
});

app.get("/services/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.services.find((service) => service.slug === req.params.slug);
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json(item);
});

app.get("/portfolio", async (req, res) => {
  await loadDb();
  res.json(db.data.portfolio);
});

app.get("/portfolio/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.portfolio.find((portfolio) => portfolio.slug === req.params.slug);
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json(item);
});

app.get("/blog", async (req, res) => {
  await loadDb();
  res.json(db.data.blog);
});

app.get("/blog/:slug", async (req, res) => {
  await loadDb();
  const item = db.data.blog.find((post) => post.slug === req.params.slug);
  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }
  return res.json(item);
});

app.get("/settings", async (req, res) => {
  await loadDb();
  res.json(db.data.settings);
});

app.get("/logos", async (req, res) => {
  await loadDb();
  res.json(db.data.logos);
});

app.post("/leads", async (req, res) => {
  await loadDb();
  const lead = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...req.body };
  db.data.leads.push(lead);
  await db.write();
  res.json(lead);
});

app.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.get("/admin/services", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.services);
});

app.post("/admin/services", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = req.body;
  db.data.services = db.data.services.filter((service) => service.id !== payload.id);
  db.data.services.push(payload);
  await db.write();
  res.json(payload);
});

app.delete("/admin/services/:id", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.services = db.data.services.filter((service) => service.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

app.get("/admin/blog", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.blog);
});

app.post("/admin/blog", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = req.body;
  db.data.blog = db.data.blog.filter((post) => post.id !== payload.id);
  db.data.blog.push(payload);
  await db.write();
  res.json(payload);
});

app.get("/admin/portfolio", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.portfolio);
});

app.post("/admin/portfolio", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = req.body;
  db.data.portfolio = db.data.portfolio.filter((item) => item.id !== payload.id);
  db.data.portfolio.push(payload);
  await db.write();
  res.json(payload);
});

app.get("/admin/leads", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.leads);
});

app.get("/admin/settings", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.settings);
});

app.post("/admin/settings", authMiddleware, async (req, res) => {
  await loadDb();
  db.data.settings = req.body;
  await db.write();
  res.json(db.data.settings);
});

app.get("/admin/logos", authMiddleware, async (req, res) => {
  await loadDb();
  res.json(db.data.logos);
});

app.post("/admin/logos", authMiddleware, async (req, res) => {
  await loadDb();
  const payload = req.body;
  db.data.logos = db.data.logos.filter((logo) => logo.id !== payload.id);
  db.data.logos.push(payload);
  await db.write();
  res.json(payload);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
