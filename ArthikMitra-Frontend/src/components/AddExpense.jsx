import { useState } from "react";
import { addExpense } from "../services/financeService";

function AddExpense({ refresh }) {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");

const handleAdd = () => {
if (!title || !amount) {
alert("Please enter both fields");
return;
}

```
const newExpense = {
  title,
  amount: Number(amount),
};

// Save to storage
addExpense(newExpense);

// Clear input fields
setTitle("");
setAmount("");

// Refresh dashboard list
refresh();
```

};

return (
<div style={{ marginBottom: "20px" }}>
<input
type="text"
placeholder="Expense name"
value={title}
onChange={(e) => setTitle(e.target.value)}
style={{ padding: "8px", marginRight: "10px" }}
/>

  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    style={{ padding: "8px", marginRight: "10px" }}
  />

  <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
    Add
  </button>
</div>

);
}

export default AddExpense;
