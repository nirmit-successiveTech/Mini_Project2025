import { pubsub } from "../graphql/pubsub.js";
import { Food } from "../models/foodModel.js";

export const createFood = async (req, res) => {
  try {
    console.log('callin foodcontroller')
    const { title, description, imageUrl, userId } = req.body;

    const newFood = new Food({ title, description, imageUrl, userId });
    await newFood.save();

    await pubsub.publish(FOOD_TOPIC, { foodAdded: newFood });

    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: newFood,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllFood=async(req,res,next)=>{
    try {
        const food = await Food.find().populate("userId","name email");
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:food
        })
    } catch (error) {
    console.error("Error fetch food:", error);
    return res.status(500).json({ success: false, error: error.message });        
    }
}

export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await Food.findById(id).populate("userId", "name email status phone");
    if (!foodItem) {
      return res.status(404).json({ success: false, error: "Food item not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Food item fetched successfully",
      data: foodItem,
    });
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}