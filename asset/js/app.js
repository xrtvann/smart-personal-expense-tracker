const listTransaction =
  JSON.parse(localStorage.getItem("transactions-history")) || [];

function renderTransactions() {
  const transactionListElement = document.getElementById("transaction-list");
  let no = 1;
  transactionListElement.innerHTML = "";

  listTransaction.forEach((transaction) => {
    const transactionItem = document.createElement("tr");
    transactionItem.innerHTML = `
      <td>${no++}</td>
      <td>${transaction.name}</td>
      <td>${transaction.type}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.category}</td>
      <td>${transaction.date}</td>
    `;
    transactionListElement.appendChild(transactionItem);
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("type").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

document
  .getElementById("btn-add-transaction")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form Values
    const transactionName = document.getElementById("name").value;
    const transactionType = document.getElementById("type").value;
    const transactionAmount = parseInt(document.getElementById("amount").value);
    const transactionCategory = document.getElementById("category").value;
    const transactionDate = document.getElementById("date").value;

    // Create a transaction object

    const transactionData = {
      name: transactionName,
      type: transactionType,
      amount: transactionAmount,
      category: transactionCategory,
      date: transactionDate,
    };
    listTransaction.push(transactionData);
    localStorage.setItem(
      "transactions-history",
      JSON.stringify(listTransaction),
    );
    clearForm();
    renderTransactions();
  });

renderTransactions();
