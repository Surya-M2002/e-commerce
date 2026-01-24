import mongoose from "mongoose";
import { env, exit } from "process";

const connectDB = async() => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("✅ MongoDB connected using Mongoose");
    } catch (error) {
        console.error("❌ MongoDB connection failed", error);
        console.log("⚠️ Continuing without database connection");
    }
};

export default connectDB;
