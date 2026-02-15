import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  // ✅ Create navigation handler
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-container">

          <div className="hero-left">
            <p className="hero-tag">ARTHIKMITRA</p>

            <h1 className="hero-title">
              YOUR <br />
              FINANCIAL <br />
              FUTURE
            </h1>

            <p className="hero-subtitle">
              Learn money. Track spending. Build wealth.
              Your AI-powered financial companion for students.
            </p>

            {/* ✅ Navigation Added Here */}
            <button
              className="hero-btn"
              onClick={() => navigate("/features")}
            >
              Get Started
            </button>
          </div>

          <div className="hero-right">
            <div className="hero-card">
              <p className="card-label">Savings Overview</p>

              <div className="card-amount-row">
                <h2 className="card-amount">₹12,450</h2>
                <img src="/src/img/sim.png" alt="chip" className="card-chip" />
              </div>

              <p className="card-growth">+12% this month</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
