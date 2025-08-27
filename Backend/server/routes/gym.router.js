import { Router } from "express";
import { fetchProgress , updateProgress } from "../controllers/gymProgress.controller.js";

const router = Router()

router.route("/fetchprogress").get(fetchProgress)
router.route("/updateprogress").post(updateProgress)