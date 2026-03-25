import "./studentPortal.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function StudentPortal() {

  const navigate = useNavigate();

  return (
    <div className="student-page">

      <BackButton />

      <h1 className="student-heading">
        Welcome Back <span className="highlight-word">Investor</span>
      </h1>

      <p className="student-tagline">
        Your Friend to Master Money. Early.
      </p>

      <div
        className="student-grid"
        onMouseMove={(e) => {
          const cards = document.querySelectorAll(".student-card");
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
          });
        }}
      >

        {/* MY MODULES */}
        <div 
          className="student-card"
          onClick={() => navigate("/learn")}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/learn")}
        >    
          <div className="card-icon">📘</div>
          <h3>My Modules</h3>
          <p>Pick up where you left off.</p>

          <div className="card-action">
            Continue Learning →
          </div>
        </div>

        {/* INVESTMENT GAMES */}
        <div 
          className="student-card"
          onClick={() => navigate("/games")}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/games")}
        >
          <div className="card-icon">🎮</div>
          <h3>Investment Games</h3>
          <p>Learn finance through interactive simulations.</p>

          <div className="card-action">
            Play Now →
          </div>
        </div>

        {/* DAILY CHALLENGE */}
        <div className="student-card">
          <div className="card-icon">🔥</div>
          <h3>Daily Challenge</h3>
          <p>Complete today's finance mission.</p>

          <div className="card-action">
            Take Challenge →
          </div>
        </div>

        {/* LEADERBOARD */}
        <div className="student-card">
          <div className="card-icon">🏆</div>
          <h3>Leaderboard</h3>
          <p>See how you rank among friends.</p>

          <div className="card-action">
            View Rankings →
          </div>
        </div>

        {/* AI MENTOR */}
        <div className="student-card">
          <div className="card-icon">🤖</div>
          <h3>AI Mentor</h3>
          <p>Ask anything about money.</p>

          <div className="card-action">
            Ask AI →
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="student-card">
          <div className="card-icon">🎯</div>
          <h3>Achievements</h3>
          <p>Track your growth journey.</p>

          <div className="card-action">
            View Badges →
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentPortal;