import mongoose, { Schema } from "mongoose";

const HabitsHistory = new Schema({
    UserId:{
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

export default HabitsHistory = mongoose.model("HabitHistory",HabitsHistory)