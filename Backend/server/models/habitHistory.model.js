import mongoose, { Schema } from "mongoose";

const habitsHistory = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        required: true
    },
    completions:{
        type: [Boolean],
        default: []
    }
}, {
    timestamps: true
})

export const HabitsHistory = mongoose.model("HabitsHistory",habitsHistory)