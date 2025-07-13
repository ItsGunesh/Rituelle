import { Router } from "express";
import {habitUpdate,insertHabit} from "../controllers/habits.controller.js"

const router = Router()

router.route("/insertHabit").post(insertHabit)
router.route("/habitUpdate").post(habitUpdate)

export default router