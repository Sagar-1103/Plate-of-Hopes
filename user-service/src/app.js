import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());

app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.status(200).json({"User-Service Status":"Connected"});
})

export {app}