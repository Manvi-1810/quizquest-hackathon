import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const quizzes = useMemo(
    () => [
      { id: 1, title: "Java Basics", level: "Easy", questions: 10, points: 100 },
      { id: 2, title: "DBMS Fundamentals", level: "Medium", questions: 12, points: 150 },
      { id: 3, title: "Operating Systems", level: "Hard", questions: 15, points: 200 },
    ],
    []
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // If user not present, create demo user (for hackathon testing)
    if (!storedUser) {
      const demo = { name: "Demo Student", role: "student" };
      localStorage.setItem("user", JSON.stringify(demo));
      setUser(demo);
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      const demo = { name: "Demo Student", role: "student" };
      localStorage.setItem("user", JSON.stringify(demo));
      setUser(demo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ CHANGED: now goes to quiz page
  const startQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (!user) return null;

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">
            Welcome, <span>{user.name}</span> 👋
          </h1>
          <p className="dash-subtitle">
            Attempt quizzes, improve accuracy, and climb the leaderboard.
          </p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Points</p>
          <h2 className="stat-value">320</h2>
          <p className="stat-note">+40 this week</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Quizzes Attempted</p>
          <h2 className="stat-value">7</h2>
          <p className="stat-note">2 pending</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Accuracy</p>
          <h2 className="stat-value">78%</h2>
          <p className="stat-note">Good consistency</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Current Rank</p>
          <h2 className="stat-value">#12</h2>
          <p className="stat-note">Keep going!</p>
        </div>
      </div>

      <div className="quiz-section">
        <div className="quiz-section-head">
          <h2>Available Quizzes</h2>
          <button className="secondary-btn" onClick={() => navigate("/leaderboard")}>
            View Leaderboard
          </button>
        </div>

        <div className="quiz-grid">
          {quizzes.map((q) => (
            <div className="quiz-card" key={q.id}>
              <div className="quiz-top">
                <h3>{q.title}</h3>
                <span className={`level ${q.level.toLowerCase()}`}>{q.level}</span>
              </div>

              <p className="quiz-meta">
                Questions: <b>{q.questions}</b> • Points: <b>{q.points}</b>
              </p>

              <button className="primary-btn" onClick={() => startQuiz(q.id)}>
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






