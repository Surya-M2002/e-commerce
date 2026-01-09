import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
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
    }
});

export default mongoose.model("Category", categorySchema);
