// src/pages/FixedDeposit.jsx
import { useState, useMemo } from "react";
import "./sip.css";
import { useNavigate } from "react-router-dom";

function FixedDeposit() {


const navigate = useNavigate();


  const [principal, setPrincipal] = useState(100000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(7);
  const [compound, setCompound] = useState(4); // quarterly default

  const maturity = useMemo(() => {
    const r = rate / 100;
    const n = compound;
    const t = years;

    const amount = principal * Math.pow(1 + r / n, n * t);
    return Math.round(amount);
  }, [principal, rate, years, compound]);

  const interest = maturity - principal;

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

  <div className="menu" onClick={() => navigate("/nps")}>
    🧓 NPS
  </div>

  <div className="menu active">
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
          <h2>Fixed Deposit Calculator</h2>
        </div>

        {/* INPUT BOX */}
        <div className="sip-box">
          <h3>FD Investment</h3>

          <div className="inputs">
            <input
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Amount ₹"
            />

            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Interest %"
            />

            <input
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="Years"
            />
          </div>

          {/* COMPOUNDING */}
          <div style={{ marginTop: "15px" }}>
            <select
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
              className="fd-select"
            >
              <option value={1}>Yearly</option>
              <option value={2}>Half-Yearly</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className="summary">

          <div className="card">
            <p>Principal</p>
            <h3>₹ {Number(principal).toLocaleString()}</h3>
          </div>

          <div className="card">
            <p>Interest Earned</p>
            <h3>₹ {interest.toLocaleString()}</h3>
          </div>

          <div className="card profit">
            <p>Maturity Value</p>
            <h3>₹ {maturity.toLocaleString()}</h3>
          </div>

        </div>

        {/* AI INSIGHT */}
        <div className="ai-box">
          <h3>💡 Smart Insight</h3>

          <p>
            At <b>{rate}%</b>, your money grows to 
            <b> ₹ {maturity.toLocaleString()}</b> in {years} years.
          </p>

          <p style={{ marginTop: "10px" }}>
            Switching to monthly compounding can increase returns slightly 📈
          </p>
        </div>

      </div>
    </div>
  );
}

export default FixedDeposit;