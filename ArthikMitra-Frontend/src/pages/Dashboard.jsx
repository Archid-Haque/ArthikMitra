import { useEffect, useState } from "react";
import AddExpense from "../components/AddExpense";
import { getExpenses, getTotal } from "../services/financeService";
import "./dashboard.css";   // ✅ add this

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const loadData = () => {
    const data = getExpenses();
    setExpenses(data);
    setTotal(getTotal());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <p>Track. Learn. Improve. Your AI-powered finance mentor.</p>
      </div>

      {/* TOP CARDS */}
      <div className="dashboard-cards">

        <div className="card highlight">
          <h3>Total Spending</h3>
          <p className="amount">₹{total}</p>
          <span>This is your current tracked expense</span>
        </div>

        <div className="card">
          <h3>Transactions</h3>
          <p className="amount">{expenses.length}</p>
          <span>Recorded entries</span>
        </div>

        <div className="card">
          <h3>AI Financial Hint</h3>
          <p>
            Try reducing impulse spending.
            Students who track weekly save 23% more.
          </p>
        </div>

      </div>

      {/* ADD EXPENSE SECTION */}
      <div className="dashboard-section">
        <h2>Add New Expense</h2>
        <AddExpense refresh={loadData} />
      </div>

      {/* EXPENSE LIST */}
      <div className="dashboard-section">
        <h2>Spending History</h2>

        <div className="expense-list">
          {expenses.length === 0 ? (
            <p className="empty">No expenses added yet.</p>
          ) : (
            expenses.map((item, index) => (
              <div className="expense-item" key={index}>
                <span>{item.title}</span>
                <span>₹{item.amount}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
