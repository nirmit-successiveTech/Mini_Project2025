import { Router } from "express";
import { getUserProfile, logout, registerUser } from "../controllers/userController.js";
import { sendMail } from "../controllers/dataController.js";
import { createFood, getAllFood, getFoodById } from "../controllers/foodController.js";
import { checkUsercredential } from "../middleware/userMiddleware.js";

const router = Router();

router.post("/register", checkUsercredential, registerUser);
router.post("/postfood", createFood);

router.get("/me", getUserProfile);
router.post("/claim", sendMail);
router.get("/allfood",getAllFood);
router.get("/food/:id",getFoodById);
router.get("/logout",logout)

export default router;
