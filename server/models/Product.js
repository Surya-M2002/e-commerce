import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    unit: String,
    price: Number,
    image: String,
    domain: {
        type: String,
        enum: [
            "grocery",
            "daily",
            "bakery",
            "gift",
            "gadget",
            "gadgets",
            "makeup",
            "electronics",
            "fashion",
            "furniture",
            "furnitures",
            "bags",
            "clothing",
            "clothings",
            "sports",
        ],
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});

export default mongoose.model("Product", productSchema);
