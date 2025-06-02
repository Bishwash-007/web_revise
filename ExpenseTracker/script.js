const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
const form = document.querySelector(".form-container form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Handle form submission
form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  if (!description || isNaN(amount) || amount === 0) return;

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
  form.reset();
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
}

// Update transaction list in DOM
function updateTransactionList() {
  transactionListEl.innerHTML = "";

  [...transactions].reverse().forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");
    li.style.borderRight = `4px solid ${transaction.amount > 0 ? "#2ec4b6" : "#ff6b6b"}`;
    li.innerHTML = `
      <span>${transaction.description}</span>
      <span>${formatCurrency(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">&times;</button>
    `;
    transactionListEl.appendChild(li);
  });
}

// Update balance, income, and expense
function updateSummary() {
  const amounts = transactions.map((t) => t.amount);
  const income = amounts.filter((a) => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter((a) => a < 0).reduce((a, b) => a + b, 0);
  const balance = income + expense;

  animateBalance(balanceEl.querySelector("span"), balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(Math.abs(expense));
}

// Format currency
function formatCurrency(num) {
  return (num < 0 ? "- " : "") + "$" + Math.abs(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Animate balance value
function animateBalance(el, newValue) {
  const current = parseFloat(el.textContent.replace(/[^0-9.-]+/g, "")) || 0;
  const duration = 400;
  const start = performance.now();

  function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = current + (newValue - current) * progress;
    el.textContent = formatCurrency(value);
    if (progress < 1) requestAnimationFrame(animate);
    else el.textContent = formatCurrency(newValue);
  }

  requestAnimationFrame(animate);
}

// Initial render
updateTransactionList();
updateSummary();

// Expose delete function globally for inline onclick
window.removeTransaction = removeTransaction;