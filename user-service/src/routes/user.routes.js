import Router from "express";
import { consumerSignup, loginUser, producerSignup } from "../controllers/user.routes.js";
import {upload} from "../middleware/multer.middleware.js";

const router = Router();

const uploadOptions = upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'documents', maxCount: 3 }])
router.post("/consumer-signup",uploadOptions,consumerSignup);
router.post("/producer-signup",uploadOptions,producerSignup);
router.post("/login",loginUser);

export default router;