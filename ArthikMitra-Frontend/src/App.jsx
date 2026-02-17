import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Learn from "./pages/Learn";
import AICoach from "./pages/AICoach";
import RoleSelect from "./pages/RoleSelect";
import StudentLogin from "./pages/StudentLogin";
import StudentPortal from "./pages/StudentPortal";
import Dashboard from "./pages/Dashboard";

// ✅ Module Pages
import SavingBasics from "./pages/modules/SavingBasics";
import Budgeting from "./pages/modules/Budgeting";
import InvestingIntro from "./pages/modules/InvestingIntro";

// ✅ Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Page Routing */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/ai-coach" element={<AICoach />} />

        {/* Auth Pages */}
        <Route path="/login" element={<RoleSelect />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Student Portal */}
        <Route path="/student-portal" element={<StudentPortal />} />

        {/* Learning Modules */}
        <Route path="/module/saving-basics" element={<SavingBasics />} />
        <Route path="/module/budgeting" element={<Budgeting />} />
        <Route path="/module/investing-intro" element={<InvestingIntro />} />

        {/* Protected Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
