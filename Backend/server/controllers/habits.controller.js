import { Model } from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Habits} from "../models/habits.model.js";


const updateHabits = asyncHandler(async(req,res)=>{
    const {userId, habit} = req.body

    // // Validate required fields
    // if (!userId || !habit) {
    //     throw new ApiError(400, "userId and habit are required")
    // }

    // // Check if habit is a string
    // if (typeof habit !== 'string') {
    //     throw new ApiError(400, "habit must be a string")
    // }

    // Find existing habits document and add new habit to array
   try {
    const updatedHabits = await Habits.findOneAndUpdate(
        { userId: userId },
        { $push: { habits: habit } },
        { new: true }
    )

    if (!updatedHabits) {
        throw new ApiError(404, "User habits not found.")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedHabits, "Habit added successfully")
    )
   } catch (error) {
    return res.status(401).json(
        new ApiError(401, error?.message || "Could not update Habits")
    )
   }
})

// const habitUpdate = asyncHandler(async(req,res)=>{
//     const {username} = req.params
//     const {userId,habits} = req.body
// })

console.log("inside habits controller")

const insertHabit = asyncHandler(async (req,res)=>{
    
    try {
        console.log("inside insert Habts")
    const {userId,habits} = req.body

    if (!userId || !habits) {
        throw new ApiError(400, "userId and habits are required")
    }

    if (!Array.isArray(habits)) {
        throw new ApiError(400, "habits must be an array")
    }

    const existingHabits = await Habits.findOne({ userId })
    
    if (existingHabits) {
        throw new ApiError(409, "User already has habits. Use update endpoint instead.")
    }
    
    const newHabits = await Habits.create({
        userId,
        habits
    })
    console.log("Outside newHabits")

    return res.status(201).json(
        new ApiResponse(200,newHabits,"Habits inserted Successfully")
    )}

     catch (error) {
        return res.status(401).json(
            new ApiError(401, error?.message || "Could not insert Habits")
        )
    }
})



export {insertHabit,updateHabits}