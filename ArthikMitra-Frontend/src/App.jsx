import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

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

/* ========= MODULES ========= */
import SavingBasics from "./pages/modules/SavingBasics";
import Budgeting from "./pages/modules/Budgeting";
import InvestingIntro from "./pages/modules/InvestingIntro";

/* ========= PROTECTION ========= */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
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

        {/* ================= AI COACH ================= */}
        <Route
          path="/ai-coach"
          element={
            <ProtectedRoute>
              <AICoach />
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
