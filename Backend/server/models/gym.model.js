import mongoose, { Schema } from "mongoose";

const setSchema = new Schema({
  weight: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  }
});

const defaultSets = [
  { weight: 0, reps: 0 },
  { weight: 0, reps: 0 },
  { weight: 0, reps: 0 }
];

const sessionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  sets: {
    type: [setSchema],
    default: defaultSets,
    validate: [val => val.length === 3, 'Session must have exactly 3 sets']
  }
});

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sessions: [sessionSchema]
});

const gymProgressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exercises: [exerciseSchema]
}, { timestamps: true });

export const GymProgress = mongoose.model("GymProgress", gymProgressSchema);
