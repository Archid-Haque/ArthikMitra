import { useNavigate } from "react-router-dom";
import "./games.css";

function Games() {
  const navigate = useNavigate();

  return (
    <div className="games-page">

      <div className="games-header">
        <h1>Investment Games</h1>
        <p>Choose your learning mode</p>
      </div>

      <div className="games-grid">

        <div 
          className="game-card"
          onClick={() => navigate("/game/rat-race")}
          style={{ cursor: "pointer" }}
        >
          <h3>🐭 Escape Rat Race</h3>
          <p>Build assets & escape salary trap</p>
        </div>

        <div 
          className="game-card"
          onClick={() => navigate("/game/trading")}
          style={{ cursor: "pointer" }}
        >
          <h3>📈 Trading Arena</h3>
          <p>Practice stock trading with virtual money</p>
        </div>

        {/* ✅ SIP SIMULATOR FIXED ROUTE */}
        <div 
          className="game-card"
          onClick={() => navigate("/sip-simulator")}
          style={{ cursor: "pointer" }}
        >
          <h3>💰 SIP Simulator</h3>
          <p>Grow wealth through smart investing</p>
        </div>

      </div>

    </div>
  );
}

export default Games;