import { Router } from "express";
import { fetchProgress , updateSession , addExercise } from "../controllers/gymProgress.controller.js";

const router = Router()

router.route("/fetchprogress").get(fetchProgress)
router.route("/updateprogress").post(updateSession)
router.route("/addexercise").post(addExercise)

export default router