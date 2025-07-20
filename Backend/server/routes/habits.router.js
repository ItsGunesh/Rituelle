import { Router } from "express";
import {updateHabits,insertHabit,getHabits} from "../controllers/habits.controller.js"
import { updateDB } from "../controllers/habitHistory.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

// console.log("inside habitsController")
router.route("/insertHabit").post(verifyJWT , insertHabit)
router.route("/updateHabits").post(verifyJWT,updateHabits)
router.route("/getHabits").get(getHabits)
router.route("/updateDB").post(updateDB)

export default router