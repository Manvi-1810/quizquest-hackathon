import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Leaderboard from "./pages/Leaderboard";
import QuizPlay from "./pages/QuizPlay"; // ✅ NEW

function Layout() {
  const location = useLocation();

  // Hide navbar on login/register
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* ✅ NEW ROUTE FOR QUIZ */}
        <Route path="/quiz/:quizId" element={<QuizPlay />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}










