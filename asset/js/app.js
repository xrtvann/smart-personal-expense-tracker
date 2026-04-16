const formatCurrency = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const formatDate = Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const transactionListElement = document.getElementById("transaction-list");

let listTransaction =
  JSON.parse(localStorage.getItem("transactions-history")) || [];

const transactionForm = document.getElementById("transaction-form");

const totalBalanceElement = document.querySelector(".total-balance h2");
const totalIncomeElement = document.querySelector(".total-income h2");
const totalExpenseElement = document.querySelector(".total-expense h2");

function calculateTotals() {
  const totals = listTransaction.reduce(
    (cart, transaction) => {
      if (transaction.type === "income") {
        cart.income += transaction.amount;
      } else {
        cart.expense += transaction.amount;
      }
      return cart;
    },
    { income: 0, expense: 0 },
  );

  totalBalanceElement.textContent = formatCurrency.format(
    totals.income - totals.expense,
  );
  totalIncomeElement.textContent = formatCurrency.format(totals.income);
  totalExpenseElement.textContent = formatCurrency.format(totals.expense);
}

function renderTransactions() {
  let no = 1;
  transactionListElement.innerHTML = "";

  let fragment = document.createDocumentFragment();

  listTransaction.forEach((transaction) => {
    const transactionItem = document.createElement("tr");
    transactionItem.innerHTML = `
      <td>${no++}</td>
      <td>${transaction.name}</td>
      <td>${transaction.category}</td>
      <td style="color: ${transaction.type === "income" ? "green" : "red"}">
        ${transaction.type === "income" ? "Income" : "Expense"}
      </td>
      <td>${formatCurrency.format(transaction.amount)}</td>
      <td>${formatDate.format(new Date(transaction.date))}</td>
      <td>
        <button class="button delete-transaction" data-id="${transaction.id}" onclick="return confirm('Are you sure you want to delete this transaction?')">
          Delete
        </button>
      </td>
    `;
    fragment.appendChild(transactionItem);
  });
  transactionListElement.appendChild(fragment);
}

transactionForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form Values
  const transactionName = document.getElementById("name").value;
  const transactionType = document.getElementById("type").value;
  const transactionAmount = parseInt(document.getElementById("amount").value);
  const transactionCategory = document.getElementById("category").value;
  const transactionDate = document.getElementById("date").value;

  // Create a transaction object

  const transactionData = {
    id: Date.now(),
    name: transactionName,
    type: transactionType,
    amount: transactionAmount,
    category: transactionCategory,
    date: transactionDate,
  };
  listTransaction.push(transactionData);
  localStorage.setItem("transactions-history", JSON.stringify(listTransaction));

  transactionForm.reset();
  calculateTotals();
  renderTransactions();
});

transactionListElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-transaction")) {
    const transactionId = parseInt(event.target.getAttribute("data-id"));
    listTransaction = listTransaction.filter(
      (transaction) => transaction.id !== transactionId,
    );
    localStorage.setItem(
      "transactions-history",
      JSON.stringify(listTransaction),
    );
    calculateTotals();
    renderTransactions();
  }
});

calculateTotals();
renderTransactions();
