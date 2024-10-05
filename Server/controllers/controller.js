import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import { questionsData, answers } from "../database/data.js";

// Get all questions
export async function getQuestions(req, res) {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Insert all questions
export async function insertQuestions(req, res) {
  try {
    const { questions, answers } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ error: "Questions and answers must be provided as arrays." });
    }

    const result = await Questions.create({ questions, answers });
    res.status(201).json({ msg: "Data Saved Successfully!", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete all questions
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.status(200).json({ msg: "Questions Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all results
export async function getResult(req, res) {
  try {
    const results = await Results.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Store result
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achieved } = req.body;

    if (!username || !result) {
      return res
        .status(400)
        .json({ error: "Username and result must be provided." });
    }

    // Use insertMany if inserting multiple documents
    const resultData = { username, result, attempts, points, achieved };
    await Results.create([resultData]); // Insert as an array to match the expected input

    res.status(201).json({ msg: "Result Saved Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete all results
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.status(200).json({ msg: "Result Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
