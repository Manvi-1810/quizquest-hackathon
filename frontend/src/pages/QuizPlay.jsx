import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizPlay.css";

export default function QuizPlay() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  // ✅ Dummy questions for now
  useEffect(() => {
    const dummy = [
      {
        id: 1,
        question: "What is the size of int in Java?",
        options: ["2 bytes", "4 bytes", "8 bytes", "Depends on OS"],
        correct: "4 bytes",
      },
      {
        id: 2,
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        correct: "extends",
      },
      {
        id: 3,
        question: "Which one is NOT an OOP concept?",
        options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"],
        correct: "Compilation",
      },
    ];

    setQuestions(dummy);
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const selectOption = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitQuiz = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) score += 1;
    });

    alert(`Quiz Submitted! ✅\nScore: ${score}/${questions.length}`);

    // later: call backend to save score
    navigate("/dashboard");
  };

  if (!questions.length) return <div style={{ padding: 30 }}>Loading quiz...</div>;

  const q = questions[current];

  return (
    <div className="quiz-page">
      <div className="quiz-topbar">
        <h2>Quiz #{quizId}</h2>
        <div className="timer">⏳ {timeLeft}s</div>
      </div>

      <div className="quiz-card">
        <p className="q-count">
          Question {current + 1} / {questions.length}
        </p>

        <h3 className="q-text">{q.question}</h3>

        <div className="options">
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`opt-btn ${answers[q.id] === opt ? "selected" : ""}`}
              onClick={() => selectOption(q.id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button className="secondary" onClick={prevQuestion} disabled={current === 0}>
            Prev
          </button>

          {current < questions.length - 1 ? (
            <button className="primary" onClick={nextQuestion}>
              Next
            </button>
          ) : (
            <button className="submit" onClick={submitQuiz}>
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
