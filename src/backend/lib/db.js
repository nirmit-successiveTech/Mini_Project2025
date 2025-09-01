import mongoose from "mongoose";


export async function connectDB() {
 
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/successive-db");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}
