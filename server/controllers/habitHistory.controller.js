import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import HabitsHistory from "../models/habitHistory.model.js";

// Complete habits for a specific date
const completeHabits = asyncHandler(async (req, res) => {
    const { userId, date, completedHabits } = req.body;

    // Validate required fields
    if (!userId || !date || !completedHabits) {
        throw new ApiError(400, "userId, date, and completedHabits are required");
    }

    // Validate completedHabits is an array
    if (!Array.isArray(completedHabits)) {
        throw new ApiError(400, "completedHabits must be an array");
    }

    // Convert date string to Date object and normalize to start of day
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    // Create a Map of completed habits
    const completionsMap = new Map();
    completedHabits.forEach(habit => {
        completionsMap.set(habit, true);
    });

    // Upsert the habit history record
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

// Get habit history for a date range (for heatmap)
const getHabitHistory = asyncHandler(async (req, res) => {
    const { userId, startDate, endDate } = req.query;

    // Validate required fields
    if (!userId || !startDate || !endDate) {
        throw new ApiError(400, "userId, startDate, and endDate are required");
    }

    // Convert date strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    // Fetch habit history for the date range
    const habitHistory = await HabitsHistory.find({
        userId,
        date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    return res.status(200).json(
        new ApiResponse(200, habitHistory, "Habit history retrieved successfully")
    );
});

// Get habit history for a specific date
const getHabitHistoryByDate = asyncHandler(async (req, res) => {
    const { userId, date } = req.query;

    // Validate required fields
    if (!userId || !date) {
        throw new ApiError(400, "userId and date are required");
    }

    // Convert date string to Date object and normalize to start of day
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    // Fetch habit history for the specific date
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

export { completeHabits, getHabitHistory, getHabitHistoryByDate }; 