import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import { env } from "process";
import path from "path";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
const PORT = env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(compression());

const ROOT = path.resolve(process.cwd(), "..");
app.use(
  "/static/products",
  express.static(path.join(ROOT, "src", "images", "Daily needs"))
);

await connectDB();

app.get("/health", (req, res) => res.json({ ok: true }));

const domainSet = (d) => {
  const dom = normalizeDomain(d);
  const pairs = {
    gadgets: ["gadgets", "gadget"],
    furnitures: ["furnitures", "furniture"],
    clothings: ["clothings", "clothing"],
  };
  return pairs[dom] || [dom];
};

const slugForName = (domain, name) => {
  const base = String(name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const canonical = {
    makeup: {
      face: "face",
      eyes: "eyes",
      lips: "lips",
      accessories: "accessories",
      "shaving needs": "shaving",
      "oral care": "oral",
      "facial care": "facial",
      deodorant: "deodorant",
      "bath and oil": "bath",
    },
    bakery: {
      bread: "bread",
      cookies: "cookies",
      "cakes and pastries": "cakes",
      "tea time snacks": "snacks",
      "rusks and toasts": "toasts",
      "khari and puffs": "khari",
      "buns and rolls": "buns",
    },
    gadgets: {
      console: "console",
      laptop: "laptop",
      monitor: "monitor",
      accessories: "accessories",
      camera: "camera",
      headphone: "headphone",
    },
    clothings: {
      tops: "tops",
      bottoms: "bottoms",
      outerwear: "outerwear",
      footwear: "footwear",
      accessories: "accessories",
    },
    fashion: {
      men: "men",
      women: "women",
      kids: "kids",
      footwear: "footwear",
      accessories: "accessories",
    },
    bags: {
      handbags: "handbag",
      backpacks: "backpack",
      wallets: "wallet",
      travel: "travel",
      accessories: "accessories",
    },
  };
  const table = canonical[normalizeDomain(domain)] || {};
  return table[base] || base.replace(/\s+/g, "_");
};

app.get("/data", async (req, res) => {
  try {
    const { type, domain } = req.query;
    if (!type) return res.status(400).json({ message: "type required" });
    const allowed = new Set(["categories", "products"]);
    const collName = String(type).toLowerCase();
    if (!allowed.has(collName))
      return res.status(400).json({ message: "invalid type" });
    const filter = {};
    const dom = domain ? normalizeDomain(domain) : null;
    if (dom) filter.domain = { $in: domainSet(dom) };
    const data = await mongoose.connection
      .collection(collName)
      .find(filter)
      .toArray();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to load data" });
  }
});

// OAuth: Google
app.get("/auth/google", (req, res) => {
  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = env.GOOGLE_CALLBACK_URL;
  const scope = encodeURIComponent("openid email profile");
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code&scope=${scope}&access_type=online&prompt=consent`;
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).json({ error: "Missing code" });
    const body = new URLSearchParams({
      code: String(code),
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_CALLBACK_URL,
      grant_type: "authorization_code",
    });
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const tokens = await tokenRes.json();
    if (!tokens.access_token) {
      return res
        .status(400)
        .json({ error: "Token exchange failed", detail: tokens });
    }
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    );
    const profile = await userRes.json();
    const jwt = (await import("jsonwebtoken")).default;
    const token = jwt.sign(
      { id: profile.id, email: profile.email, name: profile.name },
      env.JWT_SECRET || "DEV_SECRET",
      { expiresIn: "7d" }
    );
    const dest = env.FRONTEND_URL || "http://localhost:5173";
    const url = new URL(dest);
    url.searchParams.set("token", token);
    url.searchParams.set("name", profile.name || "");
    url.searchParams.set("email", profile.email || "");
    return res.redirect(url.toString());
  } catch (e) {
    res.status(500).json({ error: "OAuth failed" });
  }
});

const normalizeDomain = (d) => {
  const key = String(d || "").toLowerCase();
  return (
    {
      grocery: "grocery",
      daily: "daily",
      bakery: "bakery",
      gift: "gift",
      gadget: "gadgets",
      gadgets: "gadgets",
      makeup: "makeup",
      electronics: "electronics",
      fashion: "fashion",
      furniture: "furnitures",
      furnitures: "furnitures",
      bags: "bags",
      clothing: "clothings",
      clothings: "clothings",
      sports: "sports",
    }[key] || key
  );
};

app.get("/categories", async (req, res) => {
  try {
    const { domain } = req.query;
    const dom = domain ? normalizeDomain(domain) : null;
    const q = dom ? { domain: { $in: domainSet(dom) } } : {};
    const cats = await Category.find(q).lean();
    const out = cats.map((c, idx) => ({
      id: slugForName(dom || c.domain, c.name),
      name: c.name,
      icon: c.icon,
      _id: c._id,
    }));
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: "Failed to load categories" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const { domain, categoryId, q } = req.query;
    const dom = domain ? normalizeDomain(domain) : null;
    const filter = {};
    if (dom) filter.domain = { $in: domainSet(dom) };

    let cats = null;
    if (categoryId) {
      const cid = String(categoryId);
      const looksLikeObjectId = /^[a-f0-9]{24}$/i.test(cid);
      if (looksLikeObjectId) {
        filter.categoryId = cid;
      } else if (dom) {
        cats = await Category.find({ domain: { $in: domainSet(dom) } }).lean();
        const invMap = new Map(
          cats.map((c) => [slugForName(dom, c.name), String(c._id)])
        );
        const mapped = invMap.get(cid) || invMap.get(String(cid).toLowerCase());
        if (mapped) filter.categoryId = mapped;
        else filter.categoryId = cid;
      } else {
        filter.categoryId = cid;
      }
    }

    let prods = await Product.find(filter).lean();
    if (q) {
      const s = String(q).toLowerCase();
      prods = prods.filter((p) => String(p.name).toLowerCase().includes(s));
    }
    if (!cats && dom) {
      cats = await Category.find({ domain: { $in: domainSet(dom) } }).lean();
    }
    const idMap =
      cats && cats.length > 0
        ? new Map(
            cats.map((c) => [
              String(c._id),
              slugForName(dom || c.domain, c.name),
            ])
          )
        : null;
    const out = prods.map((p, idx) => ({
      id: idx + 1,
      name: p.name,
      unit: p.unit,
      price: p.price,
      img: p.image || p.img || "",
      _id: p._id,
      categoryId: idMap
        ? idMap.get(String(p.categoryId)) || null
        : p.categoryId || null,
    }));
    res.json(out);
  } catch (e) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

// CRUD: Categories
app.post("/categories", async (req, res) => {
  try {
    const { name, icon, domain } = req.body || {};
    if (!name || !domain)
      return res.status(400).json({ error: "name and domain required" });
    const doc = await Category.create({
      name,
      icon: icon || "Circle",
      domain: normalizeDomain(domain),
    });
    res.status(201).json(doc);
  } catch {
    res.status(500).json({ error: "Create category failed" });
  }
});

app.put("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body || {};
    if (update.domain) update.domain = normalizeDomain(update.domain);
    const doc = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Update category failed" });
  }
});

app.patch("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body || {};
    if (update.domain) update.domain = normalizeDomain(update.domain);
    const doc = await Category.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Patch category failed" });
  }
});

app.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const out = await Category.findByIdAndDelete(id);
    res.json({ ok: true, deleted: !!out });
  } catch {
    res.status(500).json({ error: "Delete category failed" });
  }
});

// CRUD: Products
app.post("/products", async (req, res) => {
  try {
    const { name, unit, price, image, domain, categoryId } = req.body || {};
    if (!name || !domain)
      return res.status(400).json({ error: "name and domain required" });
    let catObjectId = null;
    if (categoryId) {
      const cid = String(categoryId);
      const looksLikeObjectId = /^[a-f0-9]{24}$/i.test(cid);
      if (looksLikeObjectId) {
        catObjectId = cid;
      } else {
        const cats = await Category.find({
          domain: { $in: domainSet(domain) },
        }).lean();
        const inv = new Map(
          cats.map((c) => [slugForName(domain, c.name), String(c._id)])
        );
        catObjectId = inv.get(cid) || null;
      }
    }
    const doc = await Product.create({
      name,
      unit,
      price,
      image: image || "",
      domain: normalizeDomain(domain),
      categoryId: catObjectId,
    });
    res.status(201).json(doc);
  } catch {
    res.status(500).json({ error: "Create product failed" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body || {};
    if (update.domain) update.domain = normalizeDomain(update.domain);
    if (
      update.categoryId &&
      !/^[a-f0-9]{24}$/i.test(String(update.categoryId))
    ) {
      const cats = await Category.find({
        domain: { $in: domainSet(update.domain) },
      }).lean();
      const inv = new Map(
        cats.map((c) => [slugForName(update.domain, c.name), String(c._id)])
      );
      update.categoryId =
        inv.get(String(update.categoryId)) || update.categoryId;
    }
    const doc = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Update product failed" });
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body || {};
    if (update.domain) update.domain = normalizeDomain(update.domain);
    if (
      update.categoryId &&
      !/^[a-f0-9]{24}$/i.test(String(update.categoryId))
    ) {
      const cats = await Category.find({
        domain: { $in: domainSet(update.domain) },
      }).lean();
      const inv = new Map(
        cats.map((c) => [slugForName(update.domain, c.name), String(c._id)])
      );
      update.categoryId =
        inv.get(String(update.categoryId)) || update.categoryId;
    }
    const doc = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(500).json({ error: "Patch product failed" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const out = await Product.findByIdAndDelete(id);
    res.json({ ok: true, deleted: !!out });
  } catch {
    res.status(500).json({ error: "Delete product failed" });
  }
});

// Domain alias routes
app.get("/:domain/categories", async (req, res) => {
  req.query.domain = req.params.domain;
  return app._router.handle(req, res, () => void 0);
});

app.get("/:domain/products", async (req, res) => {
  req.query.domain = req.params.domain;
  return app._router.handle(req, res, () => void 0);
});

app.get("/domains", (req, res) => {
  res.json([
    "grocery",
    "daily",
    "bakery",
    "gift",
    "gadgets",
    "makeup",
    "electronics",
    "fashion",
    "furnitures",
    "bags",
    "clothings",
    "sports",
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
