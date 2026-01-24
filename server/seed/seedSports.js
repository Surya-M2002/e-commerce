import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { sportsCategories } from "./sportsCategories.js";
import { sportsProducts } from "./sportsProducts.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const savedCategories = await Category.insertMany(sportsCategories);

const formattedProducts = sportsProducts.map(p => {
    const cat = savedCategories.find(c => c.slug === p.categorySlug);
    return {...p, categoryId: cat._id };
});

await Product.insertMany(formattedProducts);

console.log("✅ Sports data seeded");
process.exit();