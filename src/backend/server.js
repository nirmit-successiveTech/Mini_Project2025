

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import router from "./router/userRouter.js";


const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);
app.use("/api/users", router);

app.listen(8000,()=>{
    console.log("server has started");
})