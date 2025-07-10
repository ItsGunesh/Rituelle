import { Router } from "express";
import { userLogin, userRegister , logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

// secured Routes

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router