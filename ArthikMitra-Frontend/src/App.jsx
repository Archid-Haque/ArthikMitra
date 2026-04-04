import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

/* ========= TIMER ========= */
import { startSession, stopSession } from "./utils/sessionTimer";

/* ========= PUBLIC PAGES ========= */
import Home from "./pages/Home";
import Features from "./pages/Features";
import Learn from "./pages/Learn";
import RoleSelect from "./pages/RoleSelect";
import StudentLogin from "./pages/StudentLogin";

/* ========= STUDENT AREA ========= */
import StudentPortal from "./pages/StudentPortal";
import Dashboard from "./pages/Dashboard";
import AICoach from "./pages/AICoach";
import DailyChallenge from "./pages/DailyChallenge"; // ✅ ADDED

/* ========= GAMES ========= */
import Games from "./pages/Games";
import RatRace from "./pages/RatRace";
import RatRaceGame from "./pages/RatRaceGame";

/* ========= MODULES ========= */
import SavingBasics from "./pages/modules/SavingBasics";
import Budgeting from "./pages/modules/Budgeting";
import InvestingIntro from "./pages/modules/InvestingIntro";

/* ========= STORE ========= */
import Store from "./pages/Store";

/* ========= PROTECTION ========= */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  // 🔥 GLOBAL SESSION CONTROL (FIXED)
  useEffect(() => {

    const startIfLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      startSession();
    };

    // ✅ run on load
    startIfLoggedIn();

    // ✅ run after login
    window.addEventListener("authChanged", startIfLoggedIn);

    // ✅ handle tab visibility
    const handleVisibility = () => {
      if (document.hidden) {
        stopSession();
      } else {
        startIfLoggedIn();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("authChanged", startIfLoggedIn);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/learn" element={<Learn />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<RoleSelect />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* ================= STUDENT PORTAL ================= */}
        <Route
          path="/student-portal"
          element={
            <ProtectedRoute>
              <StudentPortal />
            </ProtectedRoute>
          }
        />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= DAILY CHALLENGE (ADDED) ================= */}
        <Route
          path="/daily-challenge"
          element={
            <ProtectedRoute>
              <DailyChallenge />
            </ProtectedRoute>
          }
        />

        {/* ================= AI COACH ================= */}
        <Route
          path="/ai-coach"
          element={
            <ProtectedRoute>
              <AICoach />
            </ProtectedRoute>
          }
        />

        {/* ================= STORE ================= */}
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />

        {/* ================= GAMES ================= */}
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          }
        />

        {/* ================= RAT RACE ================= */}
        <Route
          path="/game/rat-race"
          element={
            <ProtectedRoute>
              <RatRace />
            </ProtectedRoute>
          }
        />

        {/* ================= RAT RACE PLAY ================= */}
        <Route
          path="/game/rat-race/play"
          element={
            <ProtectedRoute>
              <RatRaceGame />
            </ProtectedRoute>
          }
        />

        {/* ================= MODULES ================= */}
        <Route path="/module/saving-basics" element={<SavingBasics />} />
        <Route path="/module/budgeting" element={<Budgeting />} />
        <Route path="/module/investing-intro" element={<InvestingIntro />} />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;