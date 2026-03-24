import { useEffect, useRef, useState } from "react";
import "./RatRaceGame.css";

const WIDTH = 400;
const HEIGHT = 600;
const LANES = [80, 180, 280];

function RatRaceGame() {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  // GAME STATE
  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);
  const [sip, setSip] = useState(0);
  const [emergency, setEmergency] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 🔥 IMPORTANT: persistent objects
  const playerLane = useRef(1);
  const coins = useRef([]);
  const obstacles = useRef([]);
  const speed = useRef(2.5); // slower speed

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const player = {
      width: 50,
      height: 50,
      y: HEIGHT - 100,
    };

    // 🎮 CONTROLS
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        playerLane.current = Math.max(0, playerLane.current - 1);
      }
      if (e.key === "ArrowRight") {
        playerLane.current = Math.min(2, playerLane.current + 1);
      }
    };

    window.addEventListener("keydown", handleKey);

    // 🎯 SPAWN (LOW DISTRACTION)
    function spawn() {
      // coins more frequent
      if (Math.random() < 0.12) {
        coins.current.push({
          lane: Math.floor(Math.random() * 3),
          y: -20,
        });
      }

      // obstacles VERY RARE
      if (Math.random() < 0.04) {
        obstacles.current.push({
          lane: Math.floor(Math.random() * 3),
          y: -40,
        });
      }
    }

    let offset = 0;

    // 🛣️ ROAD
    function drawRoad() {
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;

      offset += speed.current;

      for (let i = -20; i < HEIGHT; i += 70) {
        ctx.beginPath();
        ctx.moveTo(150, i + (offset % 70));
        ctx.lineTo(150, i + 30 + (offset % 70));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, i + (offset % 70));
        ctx.lineTo(250, i + 30 + (offset % 70));
        ctx.stroke();
      }
    }

    // 🧍 PLAYER
    function drawPlayer() {
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(
        LANES[playerLane.current],
        player.y,
        player.width,
        player.height
      );
    }

    // 💰 COINS (SCORE UPDATED HERE)
    function drawCoins() {
      coins.current.forEach((coin, i) => {
        coin.y += speed.current;

        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(LANES[coin.lane] + 25, coin.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // 🎯 COLLISION WITH PLAYER
        if (
          coin.y > player.y &&
          coin.y < player.y + player.height &&
          coin.lane === playerLane.current
        ) {
          coins.current.splice(i, 1);

          setMoney((m) => m + 100);
          setScore((s) => s + 10); // 🔥 SCORE FIXED HERE
        }

        // remove off-screen coins
        if (coin.y > HEIGHT) {
          coins.current.splice(i, 1);
        }
      });
    }

    // 🚧 OBSTACLES
    function drawObstacles() {
      obstacles.current.forEach((obs, i) => {
        obs.y += speed.current + 0.5;

        ctx.fillStyle = "#ef4444";
        ctx.fillRect(LANES[obs.lane], obs.y, 50, 50);

        // 💀 COLLISION
        if (
          obs.y > player.y &&
          obs.y < player.y + player.height &&
          obs.lane === playerLane.current
        ) {
          setGameOver(true);
        }

        // cleanup
        if (obs.y > HEIGHT) {
          obstacles.current.splice(i, 1);
        }
      });
    }

    // 💸 FINANCE SYSTEM
    function updateFinance() {
      // SIP
      if (money >= 500) {
        setSip((s) => s + 200);
        setMoney((m) => m - 200);
      }

      // Emergency fund
      if (emergency < 2000 && money >= 100) {
        setEmergency((e) => e + 100);
        setMoney((m) => m - 100);
      }
    }

    // 🔁 MAIN LOOP (STABLE)
    function gameLoop() {
      if (gameOver) return;

      drawRoad();
      spawn();
      drawPlayer();
      drawCoins();
      drawObstacles();
      updateFinance();

      requestRef.current = requestAnimationFrame(gameLoop);
    }

    gameLoop();

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [gameOver, money]);

  return (
    <div className="game-wrapper">

      {/* HUD */}
      <div className="hud">
        <div>💰 ₹{money}</div>
        <div>📈 SIP ₹{sip}</div>
        <div>🛟 Emergency ₹{emergency}</div>
        <div>⚡ Score {score}</div>
      </div>

      {/* GAME */}
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />

      {/* GAME OVER */}
      {gameOver && (
        <div className="overlay">
          <h1>Game Over 💀</h1>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default RatRaceGame;