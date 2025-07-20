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
        type: Map,
        of: Boolean,
        default: new Map()
    }
}, {
    timestamps: true
})

export const HabitsHistory = mongoose.model("HabitsHistory",habitsHistory)