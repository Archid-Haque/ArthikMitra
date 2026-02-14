import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import AICoach from "./pages/AICoach";
import RoleSelect from "./pages/RoleSelect";
import StudentLogin from "./pages/StudentLogin";

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
        <Route path="/learn" element={<Learn />} />
        <Route path="/ai-coach" element={<AICoach />} />

        {/* Role Selection */}
        <Route path="/login" element={<RoleSelect />} />

        {/* Login Page */}
        <Route path="/student-login" element={<StudentLogin />} />

        {/* ✅ Protected Dashboard */}
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
