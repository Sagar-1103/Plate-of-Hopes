import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.routes.js";
import foodRouter from "./routes/food.routes.js";
import matchingRouter from "./routes/matching.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.json({limit:"16kb"}));

app.get("/",(req,res)=>{
    res.status(200).json({"API-Gateway Status":"Connected"});
})

app.use("/chat",chatRouter);
app.use("/food",foodRouter);
app.use("/matching",matchingRouter);
app.use("/notification",notificationRouter);
app.use("/user",userRouter);

export {app}