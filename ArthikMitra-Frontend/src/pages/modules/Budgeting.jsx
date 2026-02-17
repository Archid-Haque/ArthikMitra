import BackButton from "../../components/BackButton";
import "./module.css";

function Budgeting() {
  return (
    <div className="module-page">
      <BackButton />

      <div className="module-container">
        <h1 className="module-heading">📊 Budgeting for Students</h1>

        <p className="module-intro">
          Budgeting is not about restricting your life — it's about controlling your money
          so it doesn't control you.
        </p>

        {/* SECTION 1 */}
        <div className="lesson-card">
          <h3>💡 Why Budgeting Matters</h3>
          <p>
            Most students don't know where their money goes. Small daily expenses
            like snacks, subscriptions, and transport silently drain your wallet.
          </p>
          <p>
            A budget helps you track, control, and save — without sacrificing fun.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="lesson-card">
          <h3>📘 The 50-30-20 Rule (Student Version)</h3>
          <ul>
            <li>50% → Needs (food, travel, books)</li>
            <li>30% → Wants (entertainment, outings)</li>
            <li>20% → Savings (future you will thank you)</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="lesson-card">
          <h3>📱 Real Student Example</h3>
          <p>Monthly Allowance = ₹4000</p>
          <ul>
            <li>₹2000 → Essentials</li>
            <li>₹1200 → Enjoyment</li>
            <li>₹800 → Saved / Invested</li>
          </ul>
        </div>

        {/* ACTION */}
        <div className="module-action">
          <button className="complete-btn">
            ✅ Mark as Understood
          </button>
        </div>
      </div>
    </div>
  );
}

export default Budgeting;
