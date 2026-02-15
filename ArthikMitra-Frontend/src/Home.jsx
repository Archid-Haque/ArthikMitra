import { useNavigate } from "react-router-dom";

function Home() {
  // Hook MUST be inside the component
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>ArthikMitra</h1>
      <p>Welcome to AI Powered Financial Learning Platform</p>

      {/* Get Started Button */}
      <button
        className="hero-btn"
        onClick={() => navigate("/features")}
        style={{
          marginTop: "30px",
          padding: "14px 28px",
          background: "#A3FF12",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
