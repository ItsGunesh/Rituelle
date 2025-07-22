import { Router } from "express";

import { userLogin, userRegister , logoutUser, refreshAccessToken ,getUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router()

// Use upload.none() to parse form-data with no files
router.route("/signup").post(upload.none(), userRegister)
router.route("/login").post(userLogin)
router.route("/getuser").get(getUser)

// secured Routes

router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router