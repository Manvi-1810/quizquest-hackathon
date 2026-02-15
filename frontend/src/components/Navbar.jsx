import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 25px",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left */}
      <Link
        to="/"
        style={{
          fontSize: "22px",
          fontWeight: "900",
          color: "#0b6bff",
          textDecoration: "none",
        }}
      >
        QuizQuest
      </Link>

      {/* Right */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>

        {/* ✅ ALWAYS SHOW DASHBOARD */}
        <Link to="/dashboard" style={btnStyle}>Dashboard</Link>

        <Link to="/login" style={btnStyle}>Login</Link>
        <Link to="/register" style={outlineBtnStyle}>Register</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#111827",
  textDecoration: "none",
  fontWeight: "700",
};

const btnStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  background: "#0b6bff",
  color: "white",
  textDecoration: "none",
  fontWeight: "800",
};

const outlineBtnStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  background: "white",
  color: "#0b6bff",
  border: "2px solid #0b6bff",
  textDecoration: "none",
  fontWeight: "800",
};




