import React, { useEffect, useRef, useState } from "react";
import "./RatRaceGame.css";

const WIDTH = 500;
const HEIGHT = 550;

function RatRaceGame() {
  const canvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [money, setMoney] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    let player = {
      x: WIDTH / 2 - 20,
      y: HEIGHT - 100,
      width: 40,
      height: 60,
      speed: 4, // 🔥 reduced speed
    };

    let obstacles = [];
    let coins = [];

    // ✨ glow effect state
    let glowEffect = 0;

    let keys = {};

    const handleKeyDown = (e) => (keys[e.key] = true);
    const handleKeyUp = (e) => (keys[e.key] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function spawnObstacle() {
      const lane = Math.floor(Math.random() * 3);
      const laneWidth = WIDTH / 3;

      obstacles.push({
        x: lane * laneWidth + laneWidth / 2 - 20,
        y: -60,
        width: 40,
        height: 60,
      });
    }

    function spawnCoin() {
      const lane = Math.floor(Math.random() * 3);
      const laneWidth = WIDTH / 3;

      coins.push({
        x: lane * laneWidth + laneWidth / 2 - 10,
        y: -20,
        radius: 10,
      });
    }

    function isColliding(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    function gameLoop() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // ROAD
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // LANE LINES
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.setLineDash([20, 20]);

      ctx.beginPath();
      ctx.moveTo(WIDTH / 3, 0);
      ctx.lineTo(WIDTH / 3, HEIGHT);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo((2 * WIDTH) / 3, 0);
      ctx.lineTo((2 * WIDTH) / 3, HEIGHT);
      ctx.stroke();

      ctx.setLineDash([]);

      // PLAYER MOVE
      if (keys["ArrowLeft"]) player.x -= player.speed;
      if (keys["ArrowRight"]) player.x += player.speed;

      if (player.x < 0) player.x = 0;
      if (player.x + player.width > WIDTH)
        player.x = WIDTH - player.width;

      // ✨ PLAYER GLOW EFFECT
      if (glowEffect > 0) {
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 25;
        glowEffect--;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      ctx.shadowBlur = 0;

      // OBSTACLES
      obstacles.forEach((obs, i) => {
        obs.y += 3; // 🔥 slower

        ctx.fillStyle = "red";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        if (isColliding(player, obs)) {
          setGameOver(true);
        }

        if (obs.y > HEIGHT) obstacles.splice(i, 1);
      });

      // COINS
      coins.forEach((coin, i) => {
        coin.y += 2.5; // 🔥 smoother

        // ✨ glow coin
        ctx.shadowColor = "gold";
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
        ctx.fillStyle = "gold";
        ctx.fill();

        ctx.shadowBlur = 0;

        // COLLISION
        if (
          player.x < coin.x &&
          player.x + player.width > coin.x &&
          player.y < coin.y &&
          player.y + player.height > coin.y
        ) {
          coins.splice(i, 1);

          setScore((prev) => prev + 10);
          setMoney((prev) => prev + 100);

          // ✨ trigger glow
          glowEffect = 10;
        }

        if (coin.y > HEIGHT) coins.splice(i, 1);
      });

      // SPAWN
      if (Math.random() < 0.015) spawnObstacle();
      if (Math.random() < 0.025) spawnCoin();

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    }

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div className="game-wrapper">
      <div className="hud">
        <div>💰 ₹{money}</div>
        <div>⚡ Score {score}</div>
      </div>

      <div id="game-container">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      </div>

      {gameOver && (
        <div className="overlay">
          <h1>Game Over 💀</h1>
          <p>Score: {score}</p>
          <button onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default RatRaceGame;