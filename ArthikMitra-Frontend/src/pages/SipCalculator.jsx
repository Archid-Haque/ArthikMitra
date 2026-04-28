import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./sip.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function SipCalculator() {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const data = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;

    const invested = monthly * n;
    const futureValue =
      monthly * (((1 + r) ** n - 1) / r) * (1 + r);

    const returns = futureValue - invested;

    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(futureValue),
    };
  }, [monthly, rate, years]);

  const chartData = {
    labels: ["Invested", "Returns"],
    datasets: [
      {
        data: [data.invested, data.returns],
        backgroundColor: ["#64748b", "#00ff9f"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="coin-container">
      <div className="main">

        <h2>SIP Calculator</h2>

        <div className="sip-advanced">

          {/* LEFT SIDE INPUT */}
          <div className="sip-left">

            <label>Monthly Investment</label>
            <input
              type="range"
              min="500"
              max="100000"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
            <div className="value">₹ {monthly.toLocaleString()}</div>

            <label>Expected Return (%)</label>
            <input
              type="range"
              min="1"
              max="20"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <div className="value">{rate}%</div>

            <label>Time Period (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <div className="value">{years} Yr</div>

          </div>

          {/* RIGHT SIDE CHART */}
          <div className="sip-right">
            <div className="chart-wrapper">
              <Doughnut data={chartData} />
            </div>

            <div className="breakdown">
              <p>Invested Amount</p>
              <h3>₹ {data.invested.toLocaleString()}</h3>

              <p>Estimated Returns</p>
              <h3>₹ {data.returns.toLocaleString()}</h3>

              <p>Total Value</p>
              <h2 className="profit">
                ₹ {data.total.toLocaleString()}
              </h2>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SipCalculator;