import { Model } from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Habits} from "../models/habits.model.js";

const habitUpdate = asyncHandler(async(req,res)=>{

})

console.log("inside habits controller")

const insertHabit = asyncHandler(async (req,res)=>{
    
    console.log("inside insert Habts")
    const {userId,habits} = req.body
    
    const newHabits = await Habits.create({
        userId,
        habits
    })
    console.log("Outside newHabits")

    return res.status(201).json(
        new ApiResponse(200,newHabits,"Habits inserted Successfully")
    )
})



export {habitUpdate,insertHabit}