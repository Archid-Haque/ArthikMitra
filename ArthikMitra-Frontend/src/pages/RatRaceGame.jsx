import { useState } from "react";
import "./RatRaceGame.css";

const scenarios = [
  {
    text: "You got ₹10,000 stipend 💰",
    options: [
      { label: "Save 💼", money: 10000, assets: 0, score: 10 },
      { label: "Invest 📈", money: -5000, assets: 8000, score: 30 },
      { label: "Spend 😎", money: -8000, assets: 0, score: 5 },
    ],
  },
  {
    text: "Stock market crash 📉",
    options: [
      { label: "Hold 📊", money: 0, assets: -2000, score: 10 },
      { label: "Sell 😨", money: 2000, assets: -4000, score: 5 },
      { label: "Buy More 🚀", money: -3000, assets: 6000, score: 40 },
    ],
  },
  {
    text: "You earned ₹5,000 freelance 💻",
    options: [
      { label: "Save", money: 5000, assets: 0, score: 10 },
      { label: "Invest", money: -3000, assets: 5000, score: 25 },
      { label: "Spend", money: -5000, assets: 0, score: 5 },
    ],
  },
];

function RatRaceGame() {
  const [money, setMoney] = useState(0);
  const [assets, setAssets] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const handleChoice = (opt) => {
    setMoney((m) => m + opt.money);
    setAssets((a) => a + opt.assets);
    setScore((s) => s + opt.score);
    setLevel((l) => l + 1);

    // next question random
    const next = Math.floor(Math.random() * scenarios.length);
    setIndex(next);
  };

  return (
    <div className="game-container">

      {/* BACKGROUND */}
      <div className="bg-animation"></div>

      {/* HUD */}
      <div className="hud">
        <div className="hud-box">
          <span>💰</span>
          <p>₹{money}</p>
        </div>

        <div className="hud-box">
          <span>📊</span>
          <p>₹{assets}</p>
        </div>

        <div className="hud-box">
          <span>⭐</span>
          <p>Lv {level}</p>
        </div>

        <div className="hud-box">
          <span>⚡</span>
          <p>{score}</p>
        </div>
      </div>

      {/* GAME CARD */}
      <div className="game-card">
        <h2>{scenarios[index].text}</h2>

        <div className="choices">
          {scenarios[index].options.map((opt, i) => (
            <button key={i} onClick={() => handleChoice(opt)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default RatRaceGame;