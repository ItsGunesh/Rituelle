import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {HabitsHistory} from "../models/habitHistory.model.js";


const updateDB = asyncHandler(async (req, res) => {
    const { userId, date, completedHabits } = req.body;


    if (!userId || !date || !completedHabits) {
        throw new ApiError(400, "userId, date, and completedHabits are required");
    }


    if (!Array.isArray(completedHabits)) {
        throw new ApiError(400, "completedHabits must be an array");
    }


    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const completionsMap = new Map();
    completedHabits.forEach(habit => {
        completionsMap.set(habit, true);
    });


    const habitHistory = await HabitsHistory.findOneAndUpdate(
        { userId, date: targetDate },
        { 
            userId,
            date: targetDate,
            completions: completionsMap
        },
        { 
            upsert: true, 
            new: true 
        }
    );

    return res.status(200).json(
        new ApiResponse(200, habitHistory, "Habits completed successfully")
    );
});


const getHabitHistory = asyncHandler(async (req, res) => {
    const { userId, startDate, endDate } = req.query;


    if (!userId || !startDate || !endDate) {
        throw new ApiError(400, "userId, startDate, and endDate are required");
    }


    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);


    const habitHistory = await HabitsHistory.find({
        userId,
        date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    return res.status(200).json(
        new ApiResponse(200, habitHistory, "Habit history retrieved successfully")
    );
});


const getHabitHistoryByDate = asyncHandler(async (req, res) => {
    const { userId, date } = req.query;

    if (!userId || !date) {
        throw new ApiError(400, "userId and date are required");
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const habitHistory = await HabitsHistory.findOne({
        userId,
        date: targetDate
    });

    if (!habitHistory) {
        return res.status(200).json(
            new ApiResponse(200, { completions: new Map() }, "No habits completed for this date")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, habitHistory, "Habit history retrieved successfully")
    );
});

export { updateDB, getHabitHistory, getHabitHistoryByDate }; 