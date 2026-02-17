import BackButton from "../../components/BackButton";
import "./module.css";

function SavingBasics() {
  return (
    <div className="module-page">
      <BackButton />

      <h1 className="module-title">💰 Saving Basics</h1>

      <div className="module-content">
        <h2>Why Saving Matters?</h2>
        <p>
          Saving is the foundation of financial freedom. Before investing,
          earning interest, or building wealth — you must learn to control money.
        </p>

        <h2>Rule #1 — Pay Yourself First</h2>
        <p>
          Whenever you receive money, save at least <b>20%</b> before spending.
          This builds discipline and future security.
        </p>

        <h2>Emergency Fund</h2>
        <p>
          Always build a safety fund equal to <b>3–6 months of expenses</b>.
          This protects you from sudden problems.
        </p>

        <h2>Golden Habit</h2>
        <p>
          Saving is not about amount. It is about consistency.
          Even ₹50 saved daily creates powerful long-term results.
        </p>

        <div className="module-highlight">
          ✅ Saving is not leftover money.  
          Saving is the first expense.
        </div>
      </div>
    </div>
  );
}

export default SavingBasics;
