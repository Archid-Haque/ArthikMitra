import { useNavigate } from "react-router-dom";
import "./games.css"; // 👈 LINKED CSS FILE

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
        >
          <h3>🐭 Escape Rat Race</h3>
          <p>Build assets & escape salary trap</p>
        </div>

        <div 
          className="game-card"
          onClick={() => navigate("/game/trading")}
        >
          <h3>📈 Trading Arena</h3>
          <p>Practice stock trading with virtual money</p>
        </div>

        <div 
          className="game-card"
          onClick={() => navigate("/game/sip")}
        >
          <h3>💰 SIP Simulator</h3>
          <p>Grow wealth through smart investing</p>
        </div>

      </div>

    </div>
  );
}

export default Games;