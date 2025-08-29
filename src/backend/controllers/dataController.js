

import nodemailer from 'nodemailer';
import { User } from '../models/userModel.js';
import { Food } from '../models/foodModel.js';

export const sendMail = async (req, res, next) => {
  try {
    console.log("calling send mail controller");
    const { email, user ,status,foodId} = req.body;
    console.log("body content is",email,user,status);

    if (!email || !user) {
      return res.status(400).json({ error: "email and user are required" });
    }

    const userExists = await User.findById(user);
    const claimedFood = await Food.findByIdAndUpdate(foodId,{status:status},{new:true});
    console.log(claimedFood);

    if (!userExists) {
      return res.status(404).json({ error: "User not found ,kindly register" });
    }
    console.log('user exists:', userExists);

    const subject = "Food Claim Request";
    const text = `User ${userExists.name} has claimed the food item.`;

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_GRID_USER,           
        pass: process.env.SEND_GRIDS
      },
    });

 
    const info = await transporter.sendMail({
      from: '"HungerHub" <nirmit.kaundal@successive.tech>', 
      to: email,
      subject: subject,
      text: text,
      html: `<p>${text}</p>`,
    });

    console.log("Message sent: %s", info.messageId,info.response);

    return res.json({
      success: true,
      status: 200,
      message: "Mail sent",
      data: { messageId: info.messageId },
    });
  } catch (error) {
    console.error("error sending mail", error);
    return res.status(500).json({ error: error.message });
  }
};