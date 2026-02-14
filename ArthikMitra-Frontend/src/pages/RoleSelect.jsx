import { useNavigate } from "react-router-dom";
import "./roleselect.css";

function RoleSelect() {
  const navigate = useNavigate();

  // ✅ Go to Login FIRST (not dashboard)
  const goToStudent = () => {
    navigate("/student-login");
  };

  // (You can create teacher login later)
  const goToTeacher = () => {
    navigate("/teacher-login");
  };

  return (
    <div className="role-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h2 className="role-heading">
        Arthik<span>Mitra</span>
      </h2>

      <p className="role-sub">
        Access the Financial Literacy Portal
      </p>

      <div className="role-grid">
        {/* STUDENT */}
        <div className="role-card" onClick={goToStudent}>
          <h3>🎓 Student</h3>
          <p>Learn, track progress, and manage your money.</p>
          <button>Enter Portal</button>
        </div>

        {/* TEACHER */}
        <div className="role-card" onClick={goToTeacher}>
          <h3>🧑‍🏫 Teacher</h3>
          <p>Manage lessons, track students, and guide learning.</p>
          <button>Admin Access</button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
