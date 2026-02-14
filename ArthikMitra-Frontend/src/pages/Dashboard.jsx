import { useEffect, useState } from "react";
import AddExpense from "../components/AddExpense";
import { getExpenses, getTotal } from "../services/financeService";

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
<div style={{ padding: "40px" }}> <h1>Financial Dashboard</h1>

  <AddExpense refresh={loadData} />

  <h3>Total Spending: ₹{total}</h3>

  <ul>
    {expenses.map((item, index) => (
      <li key={index}>
        {item.title} — ₹{item.amount}
      </li>
    ))}
  </ul>
</div>


);
}

export default Dashboard;
