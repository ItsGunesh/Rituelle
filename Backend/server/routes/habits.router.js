import { Router } from "express";
import {updateHabits,insertHabit} from "../controllers/habits.controller.js"

const router = Router()

console.log("inside habitsController")
router.route("/insertHabit").post(insertHabit)
router.route("/updateHabits").post(updateHabits)

export default router