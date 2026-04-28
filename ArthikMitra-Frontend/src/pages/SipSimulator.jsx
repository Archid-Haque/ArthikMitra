import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./sip.css";

function SipSimulator() {
  const navigate = useNavigate();

  const [monthly, setMonthly] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const chartData = useMemo(() => {
    let arr = [];
    let total = 0;
    let invested = 0;
    let r = rate / 12 / 100;

    for (let i = 1; i <= years * 12; i++) {
      invested += Number(monthly);
      total = total * (1 + r) + Number(monthly);

      arr.push({
        month: i,
        value: Math.round(total),
        invested: Math.round(invested),
      });
    }

    return arr;
  }, [monthly, years, rate]);

  const invested = chartData.at(-1)?.invested || 0;
  const current = chartData.at(-1)?.value || 0;
  const profit = current - invested;

  return (
    <div className="coin-container">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2>COIN</h2>

        <div
          className="menu active"
          onClick={() => navigate("/sip-simulator")}
        >
          📊 Dashboard
        </div>

        <div
          className="menu"
          onClick={() => navigate("/mutual-funds")}
        >
          💼 Mutual Funds
        </div>

        <div
          className="menu"
          onClick={() => navigate("/nps")}
        >
          🧓 NPS
        </div>

        <div
          className="menu"
          onClick={() => navigate("/fixed-deposit")}
        >
          🏦 Fixed Deposit
        </div>

        <div
          className="menu"
          onClick={() => navigate("/sip-calculator")}
        >
          🧮 SIP Calculator
        </div>

        <div
          className="menu"
          onClick={() => navigate("/insurance")}
        >
          🛡 Insurance
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="main">

        {/* HEADER */}
        <div className="topbar">
          <h2>Portfolio Summary</h2>
          <input placeholder="Search mutual funds..." />
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="summary">

          <div className="big-card">
            <p>Total Investment</p>
            <h1>{invested}</h1>
          </div>

          <div className="small-cards">

            <div className="card">
              <p>Invested</p>
              <h3>{invested}</h3>
            </div>

            <div className="card">
              <p>Current</p>
              <h3>{current}</h3>
            </div>

            <div className="card profit">
              <p>P&L</p>
              <h3>{profit}</h3>
            </div>

            <div className="card">
              <p>XIRR</p>
              <h3>{rate}%</h3>
            </div>

          </div>
        </div>

        {/* ================= GRAPH ================= */}
        <div className="chart-box">
          <h3>Growth Projection</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#00ff9f"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="invested"
                stroke="#64748b"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= SIP INPUT ================= */}
        <div className="sip-box">
          <h3>SIP Simulator</h3>

          <div className="inputs">
            <input
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="Monthly ₹"
            />
            <input
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Years"
            />
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="% Return"
            />
          </div>

          <div className="actions">
            <button onClick={() => alert("SIP Started 🚀")}>
              Invest Now
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/sip-calculator")}
            >
              Open Calculator
            </button>
          </div>
        </div>

        {/* ================= AI ================= */}
        <div className="ai-box">
          <h3>🤖 AI Suggestion</h3>
          <p>
            If you increase SIP to <b>₹ {monthly * 2}</b>, you can reach your goal faster 🚀
          </p>
        </div>

      </div>
    </div>
  );
}

export default SipSimulator;