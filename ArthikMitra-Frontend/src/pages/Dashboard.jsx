import { useEffect, useState } from "react";
import "./dashboard.css";

function Dashboard() {
  const [minutes, setMinutes] = useState(0);
  const [weeklyData, setWeeklyData] = useState(
    JSON.parse(localStorage.getItem("weeklyTime")) || [0,0,0,0,0,0,0]
  );

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [badge, setBadge] = useState("Bronze");

  // PROFILE STATE
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");



// ADD THIS STATE BELOW PROFILE STATE
const [goals, setGoals] = useState(
  JSON.parse(localStorage.getItem("goals")) || [
    { title: "Buy Bike 🚲", target: 50000, saved: 5000 },
    { title: "Emergency Fund 🛡", target: 10000, saved: 2000 }
  ]
);

// SAVE GOALS
useEffect(() => {
  localStorage.setItem("goals", JSON.stringify(goals));
}, [goals]);

const updateGoal = (index, value) => {
  const updated = [...goals];
  updated[index].saved = Number(value);
  setGoals(updated);
};


  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // SAVE WEEKLY
  useEffect(() => {
    const today = new Date().getDay();
    const updated = [...weeklyData];
    updated[today] = minutes;

    setWeeklyData(updated);
    localStorage.setItem("weeklyTime", JSON.stringify(updated));
  }, [minutes]);

  // GAME LOGIC
  useEffect(() => {
    const newScore = Math.floor(minutes / 2);
    setScore(newScore);

    const newLevel = Math.floor(newScore / 50) + 1;
    setLevel(newLevel);

    if (newScore > 200) setBadge("Diamond");
    else if (newScore > 120) setBadge("Gold");
    else if (newScore > 60) setBadge("Silver");
    else setBadge("Bronze");
  }, [minutes]);

  const saveProfile = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
    alert("Profile Saved ✅");
  };

  return (
    <div className="dashboard">

      <div className="header">
        <h1>Financial Cockpit</h1>
        <p>Welcome back, {name || "Investor"}</p>
      </div>

      {/* TOP */}
      <div className="top-cards">
        <div className="card">⏱ Time <span>{minutes} min</span></div>
        <div className="card">💰 Score <span>{score}</span></div>
        <div className="card">⚡ Level <span>Lv {level}</span></div>
        <div className="card">🏆 Badge <span>{badge}</span></div>
      </div>

      <div className="main-grid">

        {/* LEFT */}
        <div className="left">

          {/* MARKET */}
          <div className="box">
            <h2 className="section-title market-title">📈 Market Overview</h2>

            <iframe
              title="market"
              src="https://s.tradingview.com/widgetembed/?symbol=NASDAQ:AAPL&interval=5&theme=dark"
              className="chart"
            />
          </div>

          {/* WEEKLY GRAPH */}
          <div className="box">
            <h2 className="section-title">⏱ Weekly Screen Time</h2>

            <div className="bar-chart">
              {weeklyData.map((val, i) => (
                <div key={i} className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: `${val * 2}px` }}
                  ></div>
                  <span>{["S","M","T","W","T","F","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PIE */}
          <div className="box pie-flex">

            <div className="pie-left">
              <h2 className="section-title">📊 Expense Split</h2>
              <div className="pie"></div>
            </div>

            <div className="pie-right">
              <h3>Smart Allocation</h3>
              <p>💼 Investment: 20%</p>
              <p>🛒 Needs: 50%</p>
              <p>🎯 Wants: 30%</p>

              <div className="tip">
                Follow 50-30-20 rule for financial stability 🚀
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="right">

          <div className="panel">
            <h3>🎯 Activity Panel</h3>
            <div className="stat">Focus Score <span>{Math.min(minutes,100)}%</span></div>
            <div className="stat">Consistency <span>{level}</span></div>
            <div className="stat">Sessions <span>{Math.floor(minutes/10)}</span></div>
          </div>

          <div className="panel">
            <h3>📅 Weekly Report</h3>
            <p>Total Time: {weeklyData.reduce((a,b)=>a+b,0)} min</p>
            <p>Avg Daily: {Math.floor(weeklyData.reduce((a,b)=>a+b,0)/7)} min</p>
            <p>
              Best Day: {
                ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][
                  weeklyData.indexOf(Math.max(...weeklyData))
                ]
              }
            </p>
          </div>

          {/* PROFILE PANEL */}
          <div className="panel profile">
            <h3>👤 Your Profile</h3>

            <input
              className="input"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <textarea
              className="input"
              placeholder="Write Bio..."
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
            />

            <button className="btn" onClick={saveProfile}>
              Save Profile
            </button>
          </div>

          <div className="panel">
            <h3>🧠 AI Insights</h3>
            <p>Stay consistent. You're building strong discipline.</p>
          </div>

{/* GOALS PANEL */}
<div className="panel goals">
  <h3>🎯 Financial Goals</h3>

  {goals.map((goal, i) => {
    const percent = Math.min((goal.saved / goal.target) * 100, 100);

    return (
      <div key={i} className="goal-item">

        <div className="goal-top">
          <span>{goal.title}</span>
          <span>₹{goal.saved} / ₹{goal.target}</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <input
          type="number"
          className="input"
          placeholder="Update saved amount"
          value={goal.saved}
          onChange={(e) => updateGoal(i, e.target.value)}
        />

      </div>
    );
  })}
</div>


        </div>

      </div>
    </div>
  );
}

export default Dashboard;