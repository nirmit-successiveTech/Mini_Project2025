import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Please provide a valid 6-digit pincode"], 
    },
  },
  { timestamps: true } 
);

export const User = mongoose.model("User", userSchema);
