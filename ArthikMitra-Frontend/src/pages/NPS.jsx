// src/pages/NPS.jsx
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./sip.css";

function NPS() {
const navigate = useNavigate();
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(10);

  // Allocation (NPS style)
  const allocation = [
    { name: "Equity", value: 50 },
    { name: "Corporate Bonds", value: 30 },
    { name: "Govt Securities", value: 20 },
  ];

  const COLORS = ["#00ff9f", "#3b82f6", "#a78bfa"];

  // Future Value Calculation
  const futureValue = useMemo(() => {
    let total = 0;
    let r = rate / 12 / 100;

    for (let i = 0; i < years * 12; i++) {
      total = total * (1 + r) + Number(monthly);
    }

    return Math.round(total);
  }, [monthly, years, rate]);

  const invested = monthly * 12 * years;
  const profit = futureValue - invested;

  return (
    <div className="coin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>COIN</h2>



<div className="menu" onClick={() => navigate("/sip-simulator")}>
    📊 Dashboard
  </div>

  <div className="menu" onClick={() => navigate("/mutual-funds")}>
    💼 Mutual Funds
  </div>

  <div className="menu active">
    🧓 NPS
  </div>

  <div className="menu" onClick={() => navigate("/fixed-deposit")}>
    🏦 Fixed Deposit
  </div>

  <div className="menu" onClick={() => navigate("/sip-calculator")}>
    🧮 SIP Calculator
  </div>

  <div className="menu" onClick={() => navigate("/insurance")}>
    🛡 Insurance
  </div>
</div>



        
      {/* MAIN */}
      <div className="main">

        <div className="topbar">
          <h2>NPS Retirement Planner</h2>
        </div>

        {/* INPUTS */}
        <div className="sip-box">
          <h3>Plan Your Retirement</h3>

          <div className="inputs">
            <input
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="Monthly Contribution ₹"
            />
            <input
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Years"
            />
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Expected Return %"
            />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary">

          <div className="card">
            <p>Invested</p>
            <h3>₹ {invested.toLocaleString()}</h3>
          </div>

          <div className="card">
            <p>Estimated Value</p>
            <h3>₹ {futureValue.toLocaleString()}</h3>
          </div>

          <div className="card profit">
            <p>Returns</p>
            <h3>₹ {profit.toLocaleString()}</h3>
          </div>

        </div>

        {/* PIE + INSIGHT */}
        <div className="nps-grid">

          {/* PIE */}
          <div className="chart-box">
            <h3>Asset Allocation</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={allocation}
                  dataKey="value"
                  outerRadius={100}
                  innerRadius={60}
                >
                  {allocation.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* INSIGHT */}
          <div className="ai-box">
            <h3>📊 Smart Insight</h3>
            <p>
              With ₹ <b>{monthly}</b>/month, you can build a retirement corpus of
              <b> ₹ {futureValue.toLocaleString()}</b>.
            </p>

            <p style={{ marginTop: "10px" }}>
              Increasing contribution by ₹ 2000 can boost your corpus by ~30% 🚀
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default NPS;