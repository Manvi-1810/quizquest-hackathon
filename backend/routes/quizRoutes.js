const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE QUIZ (Teacher)
router.post("/create", protect, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create quiz" });
    }

    const { title, description } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL QUIZZES
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================
// ✅ STEP 2: START QUIZ ROUTE
// ============================
router.get("/:quizId/start", protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questions = await Question.find({ quizId: quiz._id }).select(
      "-correctAnswer"
    );

    res.json({
      quizTitle: quiz.title,
      quizId: quiz._id,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============================
// ✅ STEP 3: SUBMIT QUIZ ROUTE
// ============================
router.post("/:quizId/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body;

    const questions = await Question.find({ quizId: req.params.quizId });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers.find(
        (a) => a.questionId.toString() === q._id.toString()
      );

      if (userAnswer && userAnswer.selectedAnswer === q.correctAnswer) {
        score++;
      }
    });

    // Save result
    const result = await Result.create({
      userId: req.user.id,
      quizId: req.params.quizId,
      score,
      total: questions.length,
    });

    // XP update
    const user = await User.findById(req.user.id);
    user.xp += score * 10;

    // Level update
    user.level = Math.floor(user.xp / 100) + 1;

    await user.save();

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: questions.length,
      xp: user.xp,
      level: user.level,
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
