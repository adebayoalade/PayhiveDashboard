const balance = 0;
const transactions = [];

function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (type === 'withdraw' && amount > balance) {
        alert('Insufficient funds');
        return;
    }

    const transaction = {
        type: type,
        amount: amount,
        description: description,
        date: new Date().toLocaleString()
    };

    if (type === 'deposit') {
        balance += amount;
    } else {
        balance -= amount;
    }

    transactions.unshift(transaction);
    updateBalance();
    displayTransactions();
    clearForm();
}

function displayTransactions() {
    const transactionsDiv = document.getElementById('transactions');
    transactionsDiv.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.className = 'transaction-item';
        transactionElement.innerHTML = `
            <strong>${transaction.type.toUpperCase()}</strong>: $${transaction.amount.toFixed(2)}
            <br>
            ${transaction.description}
            <br>
            <small>${transaction.date}</small>
        `;
        transactionsDiv.appendChild(transactionElement);
    });
}

function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('type').value = 'deposit';
}

// Initialize
updateBalance();