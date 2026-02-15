import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <div className="badge">🚀 Gamified Learning Platform</div>

          <h1 className="hero-title">
            Learn Faster with <span>Quizzes</span>, <span>Levels</span> &{" "}
            <span>Leaderboards</span>
          </h1>

          <p className="hero-subtitle">
            QuizQuest helps students learn through interactive quizzes, adaptive difficulty,
            instant feedback, and performance tracking.
          </p>

          <div className="hero-buttons">
            <button className="btn primary" onClick={() => navigate("/register")}>
              Get Started
            </button>

            <button className="btn secondary" onClick={() => navigate("/leaderboard")}>
              View Leaderboard
            </button>

            <button className="btn outline" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>10K+</h3>
              <p>Questions</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Students</p>
            </div>
            <div className="stat">
              <h3>100+</h3>
              <p>Quizzes</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="mock-card">
            <h3>🔥 Daily Challenge</h3>
            <p>Attempt today’s quiz and win bonus points.</p>

            <div className="mock-progress">
              <div className="bar"></div>
            </div>

            <div className="mock-row">
              <span>Accuracy</span>
              <b>78%</b>
            </div>
            <div className="mock-row">
              <span>Points Earned</span>
              <b>320</b>
            </div>

            <button className="mock-btn" onClick={() => navigate("/dashboard")}>
              Start Now →
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">Why QuizQuest?</h2>
        <p className="section-subtitle">
          Built for students and teachers — learning that feels like a game.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🎯 Adaptive Difficulty</h3>
            <p>
              Questions become easier or harder based on your performance to keep you improving.
            </p>
          </div>

          <div className="feature-card">
            <h3>🏆 Leaderboards</h3>
            <p>
              Compete with friends, climb ranks, and stay motivated with points and badges.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Teacher Analytics</h3>
            <p>
              Teachers can track student progress, engagement, quiz completion, and accuracy.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Instant Feedback</h3>
            <p>
              Get immediate results, explanations, and personalized improvement suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-card">
          <h2>Ready to start learning the fun way?</h2>
          <p>Join QuizQuest and make learning addictive 😄</p>

          <div className="cta-buttons">
            <button className="btn primary" onClick={() => navigate("/register")}>
              Create Account
            </button>
            <button className="btn outline" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

