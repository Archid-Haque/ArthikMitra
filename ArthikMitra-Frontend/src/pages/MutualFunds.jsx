import "./sip.css";
import { useNavigate } from "react-router-dom";

function MutualFunds() {

const navigate = useNavigate();


  const funds = [
    {
      name: "HDFC Mid Cap Fund",
      category: "Equity • Mid Cap",
      invested: 6307,
      current: 7124,
    },
    {
      name: "Nippon India Innovation Fund",
      category: "Equity • Thematic",
      invested: 5149,
      current: 5661,
    },
    {
      name: "Parag Parikh Flexi Cap",
      category: "Equity • Flexi Cap",
      invested: 16001,
      current: 16268,
    },
    {
      name: "Axis Small Cap Fund",
      category: "Equity • Small Cap",
      invested: 8147,
      current: 8843,
    },
  ];

  const totalInvested = funds.reduce((a, f) => a + f.invested, 0);
  const totalCurrent = funds.reduce((a, f) => a + f.current, 0);
  const totalPL = totalCurrent - totalInvested;

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

  <div className="menu active">
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

  <div className="menu" onClick={() => navigate("/insurance")}>
    🛡 Insurance
  </div>
</div>



        <div className="menu">📊 Dashboard</div>
        <div className="menu active">💼 Mutual Funds</div>
        <div className="menu">🧓 NPS</div>
        <div className="menu">🏦 Fixed Deposit</div>
        <div className="menu">🧮 SIP Calculator</div>
        <div className="menu">🛡 Insurance</div>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="topbar">
          <h2>Mutual Fund Holdings</h2>
          <input placeholder="Search funds..." />
        </div>

        {/* SUMMARY */}
        <div className="summary">

          <div className="card">
            <p>Invested</p>
            <h3>₹ {totalInvested.toLocaleString()}</h3>
          </div>

          <div className="card">
            <p>Current</p>
            <h3>₹ {totalCurrent.toLocaleString()}</h3>
          </div>

          <div className="card profit">
            <p>Total P&L</p>
            <h3>₹ {totalPL.toLocaleString()}</h3>
          </div>

          <div className="card">
            <p>XIRR</p>
            <h3>12%</h3>
          </div>

        </div>

        {/* TABLE */}
        <div className="fund-table">

          <div className="table-head">
            <span>Fund</span>
            <span>Invested</span>
            <span>Current</span>
            <span>P&L</span>
          </div>

          {funds.map((f, i) => {
            const pl = f.current - f.invested;

            return (
              <div className="table-row" key={i}>

                <div>
                  <strong>{f.name}</strong>
                  <p>{f.category}</p>
                </div>

                <span>₹ {f.invested}</span>
                <span>₹ {f.current}</span>

                <span className={pl >= 0 ? "profit" : "loss"}>
                  ₹ {pl}
                </span>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

export default MutualFunds;