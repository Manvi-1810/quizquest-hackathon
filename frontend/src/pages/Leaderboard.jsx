import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  // Dummy data now (later from backend)
  useEffect(() => {
    const dummy = [
      { id: 1, name: "Manvi", points: 980, quizzes: 12 },
      { id: 2, name: "Samruddh", points: 920, quizzes: 10 },
      { id: 3, name: "Aditi", points: 860, quizzes: 9 },
      { id: 4, name: "Rahul", points: 790, quizzes: 8 },
      { id: 5, name: "Sneha", points: 740, quizzes: 7 },
    ];

    setLeaders(dummy);
  }, []);

  return (
    <div className="lb-page">
      <div className="lb-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top students based on points and quiz performance.</p>
      </div>

      <div className="lb-card">
        <table className="lb-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Quizzes</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((u, index) => (
              <tr key={u.id} className={index === 0 ? "top1" : ""}>
                <td className="rank">{index + 1}</td>
                <td className="name">{u.name}</td>
                <td>{u.quizzes}</td>
                <td className="points">{u.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

