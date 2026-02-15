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

        {/* CARD */}
        <div 
        className="student-card"
            onClick={() => navigate("/learn")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyEnter(e, "/learn")}
          >    
           <h3>📘 My Modules</h3>
          <p>Pick up where you left off.</p>

          <div className="card-action">
            Continue Learning →
          </div>
        </div>

        <div className="student-card">
          <h3>📈 Trading Arena</h3>
          <p>Practice trading with virtual money.</p>

          <div className="card-action">
            Start Trading →
          </div>
        </div>

        <div className="student-card">
          <h3>🔥 Daily Challenge</h3>
          <p>Complete today's finance mission.</p>

          <div className="card-action">
            Take Challenge →
          </div>
        </div>

        <div className="student-card">
          <h3>🏆 Leaderboard</h3>
          <p>See how you rank among friends.</p>

          <div className="card-action">
            View Rankings →
          </div>
        </div>

        <div className="student-card">
          <h3>🤖 AI Mentor</h3>
          <p>Ask anything about money.</p>

          <div className="card-action">
            Ask AI →
          </div>
        </div>

        <div className="student-card">
          <h3>🎯 Achievements</h3>
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