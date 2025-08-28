import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { GymProgress } from "../models/gym.model.js";

const fetchProgress = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { name } = req.body;

    if (!name) {
        throw new ApiError(401, "Exercise name required");
    }

    const fetchedUser = await GymProgress.findOne({ userId });
    if (!fetchedUser) {
        throw new ApiError(404, "User progress not found");
    }

    const exercise = fetchedUser.exercises.find(
        exe => exe.name.toLowerCase() === name.toLowerCase()
    );

    if (!exercise) {
        throw new ApiError(404, "Exercise not found");
    }

    const last5Sessions = exercise.sessions
        .slice(-5)
        .reverse();

    res.status(200).json(
        new ApiResponse(200, last5Sessions, "Exercise fetched successfully")
    );
});


const updateSession = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { name, sets } = req.body;

    if (!name || !sets || !Array.isArray(sets) || sets.length !== 3) {
        throw new ApiError(400, "Exercise name and exactly 3 sets are required");
    }

    try {
        const fetchedUser = await GymProgress.findOne({ userId });
    if (!fetchedUser) {
        throw new ApiError(404, "User progress not found");
    }

    const exercise = fetchedUser.exercises.find(
        exe => exe.name.toLowerCase() === name.toLowerCase()
    );
    if (!exercise) {
        throw new ApiError(404, "Exercise not found for user");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let session = exercise.sessions.find(
        ses => {
            const sesDate = new Date(ses.date);
            sesDate.setHours(0, 0, 0, 0);
            return sesDate.getTime() === today.getTime();
        }
    );

    if (session) {
        session.sets = sets;
    } else {
        exercise.sessions.push({ date: today, sets });
    }

    await fetchedUser.save();

    res.status(200).json(
        new ApiResponse(200, { name, sets }, "Session updated successfully")
    );
    } catch (error) {
        new ApiError(401,"Updating session Failed",error)
    }
});


const addExercise = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Exercise name is required");
    }

    try {
        let fetchedUser = await GymProgress.findOne({ userId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const defaultSession = {
        date: today,
        sets: [
            { weight: 0, reps: 0 },
            { weight: 0, reps: 0 },
            { weight: 0, reps: 0 }
        ]
    };

    if (!fetchedUser) {
        fetchedUser = await GymProgress.create({
            userId,
            exercises: [{ name, sessions: [defaultSession] }]
        });
    } else {
        const alreadyExists = fetchedUser.exercises.some(
            exe => exe.name.toLowerCase() === name.toLowerCase()
        );
        if (alreadyExists) {
            throw new ApiError(409, "Exercise with this name already exists");
        }

        fetchedUser.exercises.push({ name, sessions: [defaultSession] });
        await fetchedUser.save();
    }

    res.status(200).json(
        new ApiResponse(200, { name, sessions: [defaultSession] }, "Exercise added successfully")
    );
    } catch (error) {
        throw new ApiError(401,"Unable to add exercise",error)
    }
});



export {
    fetchProgress,
    updateSession,
    addExercise
}