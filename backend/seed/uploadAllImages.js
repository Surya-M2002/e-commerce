import { readdirSync, statSync } from "fs";
import path from "path";
import dotenv from "dotenv";
import { env, cwd, exit, argv } from "process";
import cloudinary from "../config/cloudinary.js";

const ROOT = path.resolve(cwd());
dotenv.config({ path: path.join(ROOT, "backend", ".env") });

const SRC_IMAGES_DIR = path.join(ROOT, "src", "images");
const OUTPUT = path.join(ROOT, "backend", "seed", "uploaded.json");

const walk = (dir) => {
  const entries = readdirSync(dir);
  const files = [];
  for (const name of entries) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
};

const relFromSrc = (abs) => abs.replace(SRC_IMAGES_DIR + path.sep, "").replace(/\\/g, "/");

const main = async () => {
  const args = Object.fromEntries(argv.slice(2).map(s => {
    const [k, v] = s.split("=");
    return [k.replace(/^--/, ""), v];
  }));
  if (!env.CLOUDINARY_URL && (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET)) {
    if (args.cloud_name && args.api_key && args.api_secret) {
      cloudinary.config({
        cloud_name: args.cloud_name,
        api_key: args.api_key,
        api_secret: args.api_secret
      });
      console.log("Cloudinary configured from CLI args");
    } else {
      console.error("Missing Cloudinary credentials. Provide CLOUDINARY_URL or pass --cloud_name= --api_key= --api_secret=");
      exit(1);
    }
  }

  const files = walk(SRC_IMAGES_DIR).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  const mapping = {};
  for (const file of files) {
    const rel = relFromSrc(file);
    const parts = rel.split("/");
    const folder = `uploads/${parts[0]}`;
    const base = path.parse(file).name.replace(/[^a-z0-9_-]/gi, "_");
    try {
      const res = await cloudinary.uploader.upload(file, {
        folder,
        public_id: base,
        overwrite: true,
        resource_type: "image"
      });
      mapping[rel] = res.secure_url || res.url;
      console.log(`Uploaded: ${rel} -> ${mapping[rel]}`);
    } catch (err) {
      console.error(`Failed: ${rel}`, err?.message || err);
    }
  }
  try {
    const { writeFileSync } = await import("fs");
    writeFileSync(OUTPUT, JSON.stringify(mapping, null, 2));
    console.log(`Saved mapping to ${OUTPUT}`);
  } catch (err) {
    console.error("Write mapping failed:", err?.message || err);
    exit(1);
  }
};

main();
