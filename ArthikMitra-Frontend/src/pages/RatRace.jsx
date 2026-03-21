import { useNavigate } from "react-router-dom";
import "./ratrace.css";

function RatRace() {
  const navigate = useNavigate();

  return (
    <div className="ratrace-page">

      {/* BACK BUTTON */}
      <div className="back-btn" onClick={() => navigate("/games")}>
        ← Back
      </div>

      {/* TITLE */}
      <h1>Escape Rat Race</h1>

      {/* GAME MODES */}
      <div className="mode-container">

        {/* ✅ CLICKABLE MAIN GAME */}
        <div 
          className="mode-card blue"
          onClick={() => navigate("/game/rat-race/play")}
        >
          Escape Rat Race
        </div>

        {/* LOCKED MODES */}
        <div className="mode-card orange locked">
          Get Rich 🔒
          <p>Complete 5 levels to unlock</p>
        </div>

        <div className="mode-card red locked">
          Story Mode 🔒
          <p>Complete 5 levels to unlock</p>
        </div>

        <div className="mode-card purple locked">
          Chaos Mode 🔒
          <p>Complete 5 levels to unlock</p>
        </div>

      </div>

      {/* FREE RUN BUTTON */}
      <div 
        className="free-run"
        onClick={() => navigate("/game/rat-race/play")}
      >
        Free Run
      </div>

    </div>
  );
}

export default RatRace;