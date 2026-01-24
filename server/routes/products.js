import express from "express";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    const { domain, categoryId, q } = req.query;
    const dom =
      domain && domain !== "undefined" && domain !== "null"
        ? normalizeDomain(domain)
        : null;
    if (mongoose.connection.readyState !== 1) {
      const cats = [
        { id: slugForName(dom || "grocery", "Fruits & Vegetables"), name: "Fruits & Vegetables" },
        { id: slugForName(dom || "grocery", "Dairy"), name: "Dairy" },
        { id: slugForName(dom || "grocery", "Snacks"), name: "Snacks" },
      ];
      const prods = [
        {
          id: 1,
          name: "Apples",
          unit: "500g",
          price: 120,
          img: "https://placehold.co/300x300?text=Apples",
          categoryId: cats[0].id,
        },
        {
          id: 2,
          name: "Milk",
          unit: "1L",
          price: 60,
          img: "https://placehold.co/300x300?text=Milk",
          categoryId: cats[1].id,
        },
        {
          id: 3,
          name: "Potato Chips",
          unit: "100g",
          price: 35,
          img: "https://placehold.co/300x300?text=Chips",
          categoryId: cats[2].id,
        },
      ];
      let items = prods;
      if (q) {
        const s = String(q).toLowerCase();
        items = items.filter((p) => p.name.toLowerCase().includes(s));
      }
      if (categoryId) {
        const c = String(categoryId).toLowerCase();
        items = items.filter((p) => String(p.categoryId).toLowerCase() === c);
      }
      return res.json(items);
    }
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

export default router;
