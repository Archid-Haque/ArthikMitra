import { useEffect, useState } from "react";
import "./DailyChallenge.css";

export default function DailyChallenge() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/daily-challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleComplete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/complete/${id}`, {
        method: "POST",
      });

      setChallenges((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, completed: true } : c
        )
      );
    } catch (err) {
      console.error("Complete error:", err);
    }
  };

  return (
    <div className="daily-container">
      <h1 className="daily-title">🔥 Daily Challenges</h1>

      <div className="daily-grid">
        {challenges.map((ch) => (
          <div key={ch._id} className="daily-card">

            {/* HEADER */}
            <div className="card-header">
              <span className="icon">
                {ch.type === "quiz" && "🧪"}
                {ch.type === "action" && "🎯"}
                {ch.type === "scenario" && "🧠"}
              </span>

              <h2>{ch.title}</h2>
            </div>

            {/* DESCRIPTION */}
            <p className="desc">{ch.description}</p>

            {/* XP */}
            <p className="xp">XP: {ch.xp}</p>

            {/* BUTTON */}
            {ch.completed ? (
              <button className="start-btn completed-btn">
                Completed ✅
              </button>
            ) : (
              <button
                onClick={() => handleComplete(ch._id)}
                className="start-btn"
              >
                Start →
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}