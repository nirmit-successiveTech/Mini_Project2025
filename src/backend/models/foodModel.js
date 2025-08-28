import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    status:{
      type:String,
      enum:["Available","Claimed"],
      default:"Available"
    }
  },
  { timestamps: true } 
);

export const Food = mongoose.model("Food", foodSchema);
