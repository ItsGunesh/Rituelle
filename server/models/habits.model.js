import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const HabitsSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    // date:{
    //     type:stringify,
    //     required:true
    // },
    habits:{
        type: [String],
        required: true
    }
})

export const Habits = mongoose.model("Habits",HabitsSchema)