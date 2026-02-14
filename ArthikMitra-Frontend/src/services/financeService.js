const KEY = "arthikmitra_expenses";

// Get all expenses
export const getExpenses = () => {
const data = localStorage.getItem(KEY);
return data ? JSON.parse(data) : [];
};

// Add a new expense
export const addExpense = (expense) => {
const current = getExpenses();
const updated = [...current, expense];
localStorage.setItem(KEY, JSON.stringify(updated));
};

// Get total spending
export const getTotal = () => {
const expenses = getExpenses();
return expenses.reduce((sum, item) => sum + item.amount, 0);
};
