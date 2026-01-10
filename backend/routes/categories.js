import express from "express";
import Category from "../models/Category.js";

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
    const { domain } = req.query;
    const dom = domain ? normalizeDomain(domain) : null;
    const q = dom ? { domain: { $in: domainSet(dom) } } : {};
    const cats = await Category.find(q).lean();
    const out = cats.map((c) => ({
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

export default router;
