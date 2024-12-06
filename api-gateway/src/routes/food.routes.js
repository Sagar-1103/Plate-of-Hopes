import { Router } from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
dotenv.config()

const router = Router();

router.use("/",proxy(process.env.FOOD_SERVICE_URL));

export default router;