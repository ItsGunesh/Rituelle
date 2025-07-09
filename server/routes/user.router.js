import { Router } from "express";
import { userLogin, userRegister , logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

// secured Routes

router.route("/logout").post(verifyJWT,  logoutUser)

export default router