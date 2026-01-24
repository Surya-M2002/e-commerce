import mongoose from "mongoose";
import dotenv from "dotenv";
import { env, exit } from "process";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { cwd } from "process";

dotenv.config();

const ROOT = path.resolve(cwd(), "..");
const mapCandidates = [
  path.join(ROOT, "server", "seed", "uploaded.json"),
  path.join(ROOT, "backend", "seed", "uploaded.json"),
];
const uploadedMapPath =
  mapCandidates.find((p) => existsSync(p)) || mapCandidates[0];
let uploadedMap = {};
try {
  if (existsSync(uploadedMapPath)) {
    uploadedMap = JSON.parse(readFileSync(uploadedMapPath, "utf-8") || "{}");
    console.log(
      `ℹ️ Seed loaded Cloudinary mapping (${
        Object.keys(uploadedMap).length
      } items)`
    );
  }
} catch {
  /* noop */
}

const domainFolder = (domain) =>
  ({
    grocery: "Daily needs",
    bakery: "bakery",
    gift: "gift",
    gadget: "gadgets",
    makeup: "makeup",
    electronics: "gadgets",
    fashion: "clothings",
    furniture: "furnitures",
    bags: "bags",
    clothing: "clothings",
    sports: "sports",
  }[domain] || "");

const resolveImage = (domain, name) => {
  if (!uploadedMap || typeof uploadedMap !== "object") return "";
  const folder = domainFolder(domain);
  const n = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const entry = Object.entries(uploadedMap)
    .filter(([k]) => !folder || k.startsWith(folder + "/"))
    .find(([k]) => k.toLowerCase().includes(n));
  return entry ? entry[1] : "";
};

const domains = {
  grocery: {
    categories: [
      { name: "Fruits & Vegetables", icon: "Apple" },
      { name: "Meat & Fish", icon: "Utensils" },
      { name: "Snacks", icon: "Coffee" },
      { name: "Pet Care", icon: "Dog" },
      { name: "Home & Cleaning", icon: "Home" },
      { name: "Dairy", icon: "Droplets" },
      { name: "Cooking", icon: "Egg" },
      { name: "Breakfast", icon: "Croissant" },
      { name: "Beverage", icon: "Wine" },
      { name: "Health & Beauty", icon: "Heart" },
    ],
    products: [
      {
        name: "Apples",
        unit: "500g",
        price: 120,
        image: "https://via.placeholder.com/300x200?text=Apples",
        categoryName: "Fruits & Vegetables",
      },
      {
        name: "Spinach",
        unit: "1 bunch",
        price: 30,
        image: "https://via.placeholder.com/300x200?text=Spinach",
        categoryName: "Fruits & Vegetables",
      },
      {
        name: "Milk",
        unit: "1L",
        price: 60,
        image: "https://via.placeholder.com/300x200?text=Milk",
        categoryName: "Dairy",
      },
    ],
  },
  bakery: {
    categories: [
      { name: "Bread", icon: "Bread" },
      { name: "Cookies", icon: "Cookie" },
      { name: "Cakes & Pastries", icon: "Cake" },
      { name: "Tea Time Snacks", icon: "Utensils" },
      { name: "Rusks & Toasts", icon: "Croissant" },
      { name: "Khari & Puffs", icon: "Wind" },
      { name: "Buns & Rolls", icon: "Sandwich" },
    ],
    products: [
      {
        name: "Whole Wheat Bread",
        unit: "400g",
        price: 55,
        image: "https://via.placeholder.com/300x200?text=Bread",
        categoryName: "Bread",
      },
      {
        name: "Choco Chip Cookies",
        unit: "200g",
        price: 120,
        image: "https://via.placeholder.com/300x200?text=Cookies",
        categoryName: "Cookies",
      },
      {
        name: "Chocolate Truffle",
        unit: "500g",
        price: 550,
        image: "https://via.placeholder.com/300x200?text=Cake",
        categoryName: "Cakes & Pastries",
      },
    ],
  },
  gift: {
    categories: [
      { name: "Toys", icon: "Toy" },
      { name: "Flowers", icon: "Flower" },
      { name: "Cards", icon: "CreditCard" },
      { name: "Chocolate", icon: "Candy" },
      { name: "Decor", icon: "Home" },
    ],
    products: [
      {
        name: "Rose Bouquet",
        unit: "1 set",
        price: 699,
        image: "https://via.placeholder.com/300x200?text=Rose",
        categoryName: "Flowers",
      },
      {
        name: "Dark Chocolate Box",
        unit: "500g",
        price: 799,
        image: "https://via.placeholder.com/300x200?text=Chocolate",
        categoryName: "Chocolate",
      },
      {
        name: "Plush Teddy",
        unit: "1 pc",
        price: 899,
        image: "https://via.placeholder.com/300x200?text=Teddy",
        categoryName: "Toys",
      },
    ],
  },
  gadget: {
    categories: [
      { name: "Consoles", icon: "Gamepad" },
      { name: "Laptops", icon: "Laptop" },
      { name: "Monitors", icon: "Tv" },
      { name: "Accessories", icon: "Usb" },
      { name: "Cameras", icon: "Camera" },
      { name: "Headphones", icon: "Headphones" },
    ],
    products: [
      {
        name: "Gaming Console",
        unit: "1 pc",
        price: 29999,
        image: "https://via.placeholder.com/300x200?text=Console",
        categoryName: "Consoles",
      },
      {
        name: 'Laptop 14"',
        unit: "1 pc",
        price: 54999,
        image: "https://via.placeholder.com/300x200?text=Laptop",
        categoryName: "Laptops",
      },
      {
        name: "USB-C Hub",
        unit: "1 pc",
        price: 1999,
        image: "https://via.placeholder.com/300x200?text=Hub",
        categoryName: "Accessories",
      },
    ],
  },
  makeup: {
    categories: [
      { name: "Face", icon: "User" },
      { name: "Eyes", icon: "Eye" },
      { name: "Lips", icon: "Smile" },
      { name: "Tools", icon: "Wrench" },
      { name: "Skincare", icon: "Leaf" },
    ],
    products: [
      {
        name: "Foundation",
        unit: "30ml",
        price: 799,
        image: "https://via.placeholder.com/300x200?text=Foundation",
        categoryName: "Face",
      },
      {
        name: "Mascara",
        unit: "1 pc",
        price: 499,
        image: "https://via.placeholder.com/300x200?text=Mascara",
        categoryName: "Eyes",
      },
      {
        name: "Lipstick",
        unit: "1 pc",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Lipstick",
        categoryName: "Lips",
      },
    ],
  },
  electronics: {
    categories: [
      { name: "Phones", icon: "Smartphone" },
      { name: "Audio", icon: "Headphones" },
      { name: "TV", icon: "Tv" },
      { name: "Appliances", icon: "Blender" },
      { name: "Computers", icon: "Laptop" },
    ],
    products: [
      {
        name: "Smartphone",
        unit: "1 pc",
        price: 19999,
        image: "https://via.placeholder.com/300x200?text=Phone",
        categoryName: "Phones",
      },
      {
        name: "Bluetooth Headphones",
        unit: "1 pc",
        price: 2999,
        image: "https://via.placeholder.com/300x200?text=Headphones",
        categoryName: "Audio",
      },
      {
        name: 'LED TV 43"',
        unit: "1 pc",
        price: 24999,
        image: "https://via.placeholder.com/300x200?text=TV",
        categoryName: "TV",
      },
    ],
  },
  fashion: {
    categories: [
      { name: "Men", icon: "User" },
      { name: "Women", icon: "User2" },
      { name: "Kids", icon: "Baby" },
      { name: "Footwear", icon: "Footprints" },
      { name: "Accessories", icon: "Gem" },
    ],
    products: [
      {
        name: "Men's T-Shirt",
        unit: "M",
        price: 499,
        image: "https://via.placeholder.com/300x200?text=T-Shirt",
        categoryName: "Men",
      },
      {
        name: "Women's Dress",
        unit: "S",
        price: 1299,
        image: "https://via.placeholder.com/300x200?text=Dress",
        categoryName: "Women",
      },
      {
        name: "Kids Sneakers",
        unit: "28",
        price: 899,
        image: "https://via.placeholder.com/300x200?text=Sneakers",
        categoryName: "Kids",
      },
    ],
  },
  furniture: {
    categories: [
      { name: "Living", icon: "Sofa" },
      { name: "Bedroom", icon: "Bed" },
      { name: "Office", icon: "Chair" },
      { name: "Kitchen", icon: "Utensils" },
      { name: "Decor", icon: "Brush" },
    ],
    products: [
      {
        name: "Sofa 3-Seater",
        unit: "1 pc",
        price: 18999,
        image: "https://via.placeholder.com/300x200?text=Sofa",
        categoryName: "Living",
      },
      {
        name: "Queen Bed",
        unit: "1 pc",
        price: 24999,
        image: "https://via.placeholder.com/300x200?text=Bed",
        categoryName: "Bedroom",
      },
      {
        name: "Office Chair",
        unit: "1 pc",
        price: 4999,
        image: "https://via.placeholder.com/300x200?text=Chair",
        categoryName: "Office",
      },
    ],
  },
  bags: {
    categories: [
      { name: "Handbag", icon: "Bag" },
      { name: "Backpack", icon: "Backpack" },
      { name: "Wallet", icon: "Wallet" },
      { name: "Travel", icon: "Plane" },
      { name: "Accessories", icon: "Gem" },
    ],
    products: [
      {
        name: "Leather Handbag",
        unit: "1 pc",
        price: 2999,
        image: "https://via.placeholder.com/300x200?text=Handbag",
        categoryName: "Handbag",
      },
      {
        name: "Travel Backpack",
        unit: "1 pc",
        price: 2499,
        image: "https://via.placeholder.com/300x200?text=Backpack",
        categoryName: "Backpack",
      },
      {
        name: "Men's Wallet",
        unit: "1 pc",
        price: 999,
        image: "https://via.placeholder.com/300x200?text=Wallet",
        categoryName: "Wallet",
      },
    ],
  },
  clothing: {
    categories: [
      { name: "Tops", icon: "Shirt" },
      { name: "Footwear", icon: "Footprints" },
      { name: "Accessories", icon: "Gem" },
    ],
    products: [
      {
        name: "Cotton Top",
        unit: "M",
        price: 599,
        image: "https://via.placeholder.com/300x200?text=Top",
        categoryName: "Tops",
      },
      {
        name: "Casual Shoes",
        unit: "9",
        price: 1499,
        image: "https://via.placeholder.com/300x200?text=Shoes",
        categoryName: "Footwear",
      },
      {
        name: "Sunglasses",
        unit: "1 pc",
        price: 799,
        image: "https://via.placeholder.com/300x200?text=Sunglasses",
        categoryName: "Accessories",
      },
    ],
  },
  sports: {
    categories: [
      { name: "Team Sports", icon: "Users" },
      { name: "Cycling", icon: "Bike" },
      { name: "Camping", icon: "Tent" },
      { name: "Fitness", icon: "Dumbbell" },
      { name: "Outdoor", icon: "Map" },
    ],
    products: [
      {
        name: "Football",
        unit: "1 pc",
        price: 999,
        image: "",
        categoryName: "Team Sports",
      },
      {
        name: "Mountain Cycle",
        unit: "1 pc",
        price: 18999,
        image: "",
        categoryName: "Cycling",
      },
      {
        name: "Camping Tent",
        unit: "1 pc",
        price: 5999,
        image: "",
        categoryName: "Camping",
      },
      {
        name: "Kettlebell",
        unit: "10 kg",
        price: 2499,
        image: "",
        categoryName: "Fitness",
      },
      {
        name: "Hiking Backpack",
        unit: "1 pc",
        price: 2999,
        image: "",
        categoryName: "Outdoor",
      },
    ],
  },
};

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

const loadJsonData = (domain) => {
  try {
    const file = path.join(DATA_DIR, `${domain}.json`);
    if (existsSync(file)) {
      const raw = readFileSync(file, "utf-8");
      const data = JSON.parse(raw);
      console.log(
        `ℹ️ Loaded ${domain} data from JSON (${data.products?.length} products)`
      );
      return data;
    }
  } catch (e) {
    console.warn(`⚠️ Failed to load JSON for ${domain}:`, e.message);
  }
  return null;
};

const seedDomain = async (domainKey, data) => {
  // Prefer JSON data if available
  const jsonData = loadJsonData(domainKey);
  const source = jsonData || data; // Use JSON if found, else fallback to hardcoded

  const { categories, products } = source;

  if (!categories || !products) {
    console.warn(`⚠️ Skipping ${domainKey}: missing categories or products`);
    return;
  }

  // 1. Insert Categories
  const catsToInsert = categories.map((c) => ({
    name: c.name,
    icon: c.icon || "Circle",
    domain: domainKey,
  }));

  const savedCats = await Category.insertMany(catsToInsert);

  // 2. Build ID Map (Input ID -> Mongo ID)
  // We assume insertMany preserves order, so savedCats[i] corresponds to categories[i]
  const idMap = new Map();
  categories.forEach((c, idx) => {
    if (c.id && savedCats[idx]) {
      idMap.set(String(c.id), savedCats[idx]._id);
    }
  });

  // 3. Insert Products
  const prodsToInsert = products.map((p) => {
    // Resolve Category ID
    let catId = null;
    if (p.categoryId) {
      catId = idMap.get(String(p.categoryId));
    }

    // Fallback: match by name if ID lookup failed (legacy data support)
    if (!catId && p.categoryName) {
      const cat = savedCats.find((c) => c.name === p.categoryName);
      catId = cat?._id;
    }

    const img = p.img || p.image || resolveImage(domainKey, p.name);

    return {
      name: p.name,
      unit: p.unit,
      price: p.price,
      image: img,
      domain: domainKey,
      categoryId: catId,
    };
  });

  await Product.insertMany(prodsToInsert);
};

const main = async () => {
  await mongoose.connect(env.MONGO_URI);
  for (const [key, value] of Object.entries(domains)) {
    await Category.deleteMany({ domain: key });
    await Product.deleteMany({ domain: key });
    await seedDomain(key, value);
    console.log(`✅ Seeded ${key}`);
  }
  exit();
};

main().catch((err) => {
  console.error("❌ Seed error:", err);
  exit(1);
});
