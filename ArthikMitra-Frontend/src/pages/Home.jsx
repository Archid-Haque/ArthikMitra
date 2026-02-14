import "/src/pages/home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">

        <div className="home-left">
          <p className="home-tag">ARTHIKMITRA</p>

          <h1 className="home-title">
            YOUR <br />
            FINANCIAL <br />
            FUTURE
          </h1>

          <p className="home-subtitle">
            Learn money. Track spending. Build wealth.
            Your AI-powered financial companion for students.
          </p>

          <button className="home-btn">Get Started</button>
        </div>

       <div className="home-right">
  <div className="home-card">

    <p className="card-label">Savings Overview</p>

    <div className="card-amount-row">
  <h2 className="card-amount">₹12,450</h2>
  <img src="/src/img/sim.png" alt="chip" className="card-chip" />
</div>


    <p className="card-growth">+12% this month</p>

  </div>
</div>


      </div>
    </div>
  );
}

export default Home;