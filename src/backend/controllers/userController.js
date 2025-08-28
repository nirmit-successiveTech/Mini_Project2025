import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";




export const registerUser = async (req, res) => {
  try {
     console.log("register user");
    const { name, email, password, phone, address, pincode } = req.body;

      if (!name || !email || !password || !phone || !address || !pincode) {
        return res.status(400).json({ message: "All fields are required" });
      }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email is taken" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      pincode,
    });

    await newUser.save();


    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "secret_key123",
      { expiresIn: "7d" } 
    );

   
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ error: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, "secret_key123");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const logout = async(req,res,next)=>{
  try {
    console.log('calling logout');
    const token = req.cookies.token;
    console.log("usertoken",token);
    if(!token){
      return res.status(401).json({error:"User Logout failed"});
    }
    res.clearCookie("token");
    return res.status(200).json({
      success:true,
      message:"Loggged out successfully"
    })
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res) => {
  try {
    console.log('calling login');
    const { name, email, password } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    if (user.name !== name) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, "secret_key123", {
      expiresIn: "1d",
    });

    console.log(token);
        res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

   

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "Server error", error: err.message });
  }
};