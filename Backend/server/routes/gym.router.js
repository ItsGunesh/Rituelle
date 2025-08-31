import { Router } from "express";
import { fetchProgress , updateSession , addExercise , fetchExeData } from "../controllers/gymProgress.controller.js";

const router = Router()

router.route("/fetchprogress").get(fetchProgress)
router.route("/updateprogress").post(updateSession)
router.route("/addexercise").post(addExercise)
router.route("/fetchexedata").get(fetchExeData)

export default router