import Router from "express";
import { changeCurrentUserPassword, consumerSignup, getCurrentUser, loginUser, logoutUser, producerSignup,refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

const uploadOptions = upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'documents', maxCount: 3 }])
router.post("/consumer-signup",uploadOptions,consumerSignup);
router.post("/producer-signup",uploadOptions,producerSignup);
router.post("/login",loginUser);


router.post("/logout",verifyJWT,logoutUser);
router.post("/refresh-token",refreshAccessToken);
router.put("/change-password",verifyJWT,changeCurrentUserPassword);
router.get("/current-user",verifyJWT,getCurrentUser);

export default router;