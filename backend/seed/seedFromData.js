import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "process";
import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

const ICONS = {
  grocery: {
    "Fruits & Vegetables": "Apple",
    "Meat & Fish": "Utensils",
    Snacks: "Coffee",
    "Pet Care": "Dog",
    "Home & Cleaning": "Home",
    Dairy: "Droplets",
    Cooking: "Egg",
    Breakfast: "Croissant",
    Beverage: "Wine",
    "Health & Beauty": "Heart",
  },
  daily: {
    "Fruits & Vegetables": "Apple",
    "Meat & Fish": "Utensils",
    Snacks: "Coffee",
    "Pet Care": "Dog",
    "Home & Cleaning": "Home",
    Dairy: "Droplets",
    Cooking: "Egg",
    Breakfast: "Croissant",
    Beverage: "Wine",
    "Health & Beauty": "Heart",
  },
  gadgets: {
    Console: "Gamepad",
    Laptop: "Laptop",
    Monitor: "Tv",
    Accessories: "Usb",
    Camera: "Camera",
    Headphone: "Headphones",
    console: "Gamepad",
    laptop: "Laptop",
    monitor: "Tv",
    accessories: "Usb",
    camera: "Camera",
    headphone: "Headphones",
  },
  electronics: {
    Phones: "Smartphone",
    Audio: "Headphones",
    TV: "Tv",
    Appliances: "Blender",
    Computers: "Laptop",
  },
  fashion: {
    Men: "User",
    Women: "User2",
    Kids: "Baby",
    Footwear: "Footprints",
    Accessories: "Gem",
  },
  furnitures: {
    Living: "Sofa",
    Bedroom: "Bed",
    Office: "Chair",
    Kitchen: "Utensils",
    Decor: "Brush",
  },
  bags: {
    Handbag: "Bag",
    Backpack: "Backpack",
    Wallet: "Wallet",
    Travel: "Plane",
    Accessories: "Gem",
  },
  clothings: {
    Tops: "Shirt",
    Bottoms: "Shirt",
    Outerwear: "Shirt",
    Footwear: "Footprints",
    Accessories: "Gem",
  },
  gift: {
    Toys: "Toy",
    Flowers: "Flower",
    Cards: "CreditCard",
    Chocolate: "Candy",
    Decor: "Home",
  },
  makeup: {
    Face: "User",
    Eyes: "Eye",
    Lips: "Smile",
    Tools: "Wrench",
    Skincare: "Leaf",
  },
  sports: {
    "Team Sports": "Users",
    Cycling: "Bike",
    Camping: "Tent",
    Fitness: "Dumbbell",
    Outdoor: "Map",
  },
};

const loadJson = (filePath) => {
  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`⚠️ Failed to read ${filePath}: ${e.message}`);
    return null;
  }
};

const seedDomain = async (domain, data) => {
  const { categories, products } = data || {};
  if (!Array.isArray(categories) || !Array.isArray(products)) {
    console.warn(`⚠️ Skipping ${domain}: missing categories or products`);
    return;
  }

  await Category.deleteMany({ domain });
  await Product.deleteMany({ domain });

  const savedCats = await Category.insertMany(
    categories.map((c) => ({
      name: c.name,
      icon:
        c.icon || ICONS[domain]?.[c.name] || ICONS[domain]?.[c.id] || "Circle",
      domain,
    }))
  );

  const idMap = new Map();
  categories.forEach((c, idx) => {
    if (c.id && savedCats[idx]) {
      idMap.set(String(c.id), savedCats[idx]._id);
    }
  });

  // Use grocery images for daily when names match
  let groceryMap = null;
  if (domain === "daily") {
    try {
      const gFile = path.join(DATA_DIR, "grocery.json");
      if (existsSync(gFile)) {
        const gData = JSON.parse(readFileSync(gFile, "utf-8"));
        groceryMap = new Map(
          (gData.products || []).map((p) => [
            String(p.name),
            p.img || p.image || "",
          ])
        );
      }
    } catch {
      /* noop */
    }
  }

  await Product.insertMany(
    products.map((p) => {
      let catId = null;
      if (p.categoryId) {
        catId = idMap.get(String(p.categoryId)) || null;
      }
      if (!catId && p.categoryName) {
        const match = savedCats.find((c) => c.name === p.categoryName);
        catId = match?._id || null;
      }
      let imageOut = p.img || p.image || "";
      if (domain === "daily") {
        const gImg = groceryMap?.get(String(p.name));
        imageOut = gImg || imageOut;
      }
      const doc = {
        name: p.name,
        unit: p.unit,
        price: p.price,
        image: imageOut,
        domain,
        categoryId: catId,
      };
      return doc;
    })
  );

  console.log(`✅ Seeded ${domain}`);
};

const main = async () => {
  await mongoose.connect(env.MONGO_URI);
  if (!existsSync(DATA_DIR)) {
    console.log("ℹ️ No backend/data folder found");
    return process.exit(0);
  }
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  if (files.length === 0) {
    console.log("ℹ️ No JSON files in backend/data");
    return process.exit(0);
  }
  for (const f of files) {
    const domain = path.basename(f, ".json");
    const data = loadJson(path.join(DATA_DIR, f));
    if (data) {
      await seedDomain(domain, data);
    }
  }
  process.exit(0);
};

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
