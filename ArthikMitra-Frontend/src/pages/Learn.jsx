import "./learn.css";

function Learn() {
  return (
    <div className="learn-page">
      <div className="learn-container">

        <h1 className="learn-title">Learning Modules</h1>
        <p className="learn-subtitle">
          Master saving, budgeting and investing with simple student-friendly lessons.
        </p>

        <div className="module-grid">

          {/* Saving Module */}
          <div className="module-card">
            <h3 className="module-title">💰 Saving Basics</h3>
            <p className="module-text">
              Understand why saving early matters and how to build financial discipline.
            </p>
            <button className="module-btn">Start Learning</button>
          </div>

          {/* Budgeting Module */}
          <div className="module-card">
            <h3 className="module-title">📊 Budgeting</h3>
            <p className="module-text">
              Learn to track expenses, control spending and avoid money leaks.
            </p>
            <button className="module-btn">Start Learning</button>
          </div>

          {/* Investing Module */}
          <div className="module-card">
            <h3 className="module-title">📈 Investing Intro</h3>
            <p className="module-text">
              Explore SIP, mutual funds and compounding — explained for beginners.
            </p>
            <button className="module-btn">Start Learning</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Learn;
