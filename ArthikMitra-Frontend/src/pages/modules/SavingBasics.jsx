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

        <div className="module-box">
          💡 Without savings → One emergency = financial stress  
          💡 With savings → You stay calm and in control
        </div>

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

        <h2>Types of Savings</h2>
        <ul>
          <li>📅 Short-term (phone, trips)</li>
          <li>🏠 Mid-term (bike, education)</li>
          <li>💼 Long-term (wealth, retirement)</li>
        </ul>

        <h2>Where to Keep Savings?</h2>
        <ul>
          <li>🏦 Bank Savings Account</li>
          <li>💳 Fixed Deposits (FD)</li>
          <li>📈 Mutual Funds (basic level)</li>
          <li>💰 Digital wallets (short-term only)</li>
        </ul>

        <h2>Simple Student Strategy</h2>
        <div className="module-box">
          Pocket Money →  
          50% Spend  
          30% Save  
          20% Invest (later stage)
        </div>

        <h2>Power of Small Savings</h2>
        <p>
          Saving ₹100 daily = ₹3000/month = ₹36,000/year  
          In 5 years = ₹1,80,000 (without interest!)
        </p>

        <h2>Common Mistakes</h2>
        <ul>
          <li>❌ Saving after spending</li>
          <li>❌ No goal for saving</li>
          <li>❌ Spending on impulse</li>
          <li>❌ Ignoring small expenses</li>
        </ul>

        <h2>Smart Tips</h2>
        <ul>
          <li>✅ Track every expense</li>
          <li>✅ Avoid unnecessary subscriptions</li>
          <li>✅ Use UPI wisely</li>
          <li>✅ Set saving goals</li>
        </ul>

        <h2>Saving Challenge 🔥</h2>
        <p>
          Try saving ₹10 extra every day than yesterday.  
          Day 1 → ₹10  
          Day 2 → ₹20  
          Day 3 → ₹30  
          This builds strong discipline.
        </p>

        <h2>Mindset Shift</h2>
        <div className="module-highlight">
          ❌ Spend → Save leftover  
          ✅ Save → Spend leftover
        </div>

        <h2>Final Thought</h2>
        <p>
          Saving is not restriction — it's freedom.  
          The more you save, the more choices you have in life.
        </p>

      </div>
    </div>
  );
}

export default SavingBasics;