const express = require("express");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");
const protect = require("../middleware/authMiddleware");




const router = express.Router();


// ADD QUESTION (Only Teacher)
router.post("/add",protect,async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can add questions" });
    }

    const { quizId, questionText, options, correctAnswer, difficulty } = req.body;

    if (!quizId || !questionText || !options || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.create({
      quizId,
      questionText,
      options,
      correctAnswer,
      difficulty,
    });

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET QUESTIONS BY QUIZ ID (Students + Teacher)
router.get("/:quizId", authMiddleware, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const questions = await Question.find({ quizId });

    res.json({
      message: "Questions fetched successfully",
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
