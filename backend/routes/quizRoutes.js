const express = require("express");
const Quiz = require("../models/Quiz");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE QUIZ (Only teacher)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create quizzes" });
    }

    const { title, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      questions,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL QUIZZES (Student + Teacher)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
