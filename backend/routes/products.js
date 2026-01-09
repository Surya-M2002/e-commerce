import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await mongoose.connection
      .collection("products")
      .find({})
      .toArray();

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
