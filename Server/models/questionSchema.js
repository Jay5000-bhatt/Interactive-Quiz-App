import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questions: {
      type: [Object], // Array of objects for questions
      default: [], // Default to an empty array
    },
    answers: {
      type: [Number], // Array of numbers for answers
      default: [], // Default to an empty array
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

const Question = mongoose.model("Question", questionSchema);
export default Question;
