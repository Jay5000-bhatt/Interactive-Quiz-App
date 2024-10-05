import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Assuming username should be required
      trim: true, // Trim whitespace from the username
    },
    result: {
      type: [Object], // Array of objects to store result details
      default: [], // Default to an empty array
    },
    attempts: {
      type: Number,
      default: 0, // Default to 0 attempts
    },
    points: {
      type: Number,
      default: 0, // Default to 0 points
    },
    achieved: {
      type: String,
      default: "", // Default to an empty string for the achievement status
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
