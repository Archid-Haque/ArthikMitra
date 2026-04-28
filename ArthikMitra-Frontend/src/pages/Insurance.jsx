// src/pages/Insurance.jsx
import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import "./sip.css";
import { useNavigate } from "react-router-dom";

function Insurance() {

const navigate = useNavigate();
const location = useLocation();

  const [income, setIncome] = useState(800000);
  const [age, setAge] = useState(25);
  const [dependents, setDependents] = useState(2);

  // Coverage Rule (simple but powerful)
  const coverage = useMemo(() => {
    return income * 10 + dependents * 200000;
  }, [income, dependents]);

  // Premium Estimation
  const premium = useMemo(() => {
    return Math.round(coverage * 0.001 + age * 20);
  }, [coverage, age]);

  return (
    <div className="coin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>COIN</h2>


<div className="sidebar">
  <h2>COIN</h2>

  <div className="menu" onClick={() => navigate("/sip-simulator")}>
    📊 Dashboard
  </div>

  <div className="menu" onClick={() => navigate("/mutual-funds")}>
    💼 Mutual Funds
  </div>

  <div className="menu" onClick={() => navigate("/nps")}>
    🧓 NPS
  </div>

  <div className="menu" onClick={() => navigate("/fixed-deposit")}>
    🏦 Fixed Deposit
  </div>

  <div className="menu" onClick={() => navigate("/sip-calculator")}>
    🧮 SIP Calculator
  </div>

  <div className="menu active">
    🛡 Insurance
  </div>
</div>


<div className="menu">📊 Dashboard</div>
        <div className="menu">💼 Mutual Funds</div>
        <div className="menu">🧓 NPS</div>
        <div className="menu">🏦 Fixed Deposit</div>
        <div className="menu">🧮 SIP Calculator</div>
        <div className="menu active">🛡 Insurance</div>
      </div>





      {/* MAIN */}
      <div className="main">

        <div className="topbar">
          <h2>Insurance Planner</h2>
        </div>

        {/* INPUT */}
        <div className="sip-box">
          <h3>Calculate Your Coverage</h3>

          <div className="inputs">
            <input
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Annual Income ₹"
            />

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />

            <input
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              placeholder="Dependents"
            />
          </div>
        </div>

        {/* RESULT */}
        <div className="summary">

          <div className="card">
            <p>Recommended Coverage</p>
            <h3>₹ {coverage.toLocaleString()}</h3>
          </div>

          <div className="card">
            <p>Estimated Premium</p>
            <h3>₹ {premium.toLocaleString()}/year</h3>
          </div>

        </div>

        {/* PLAN SUGGESTIONS */}
        <div className="insurance-grid">

          <div className="card plan-card">
            <h4>🛡 Term Insurance</h4>
            <p>High coverage at low premium</p>
            <button>View Plans</button>
          </div>

          <div className="card plan-card">
            <h4>🏥 Health Insurance</h4>
            <p>Medical protection for family</p>
            <button>View Plans</button>
          </div>

          <div className="card plan-card">
            <h4>⚖ Combo Plan</h4>
            <p>Balanced risk + coverage</p>
            <button>View Plans</button>
          </div>

        </div>

        {/* AI INSIGHT */}
        <div className="ai-box">
          <h3>🤖 Smart Insight</h3>

          <p>
            Based on your income, you should have at least 
            <b> ₹ {coverage.toLocaleString()}</b> coverage.
          </p>

          <p style={{ marginTop: "10px" }}>
            Term insurance gives the best cost-to-coverage ratio 🚀
          </p>
        </div>

      </div>
    </div>
  );
}

export default Insurance;