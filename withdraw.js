
            document.addEventListener('DOMContentLoaded', function() {
                // Get current balance from localStorage
                const balance = localStorage.getItem('balance') || 0;
                document.getElementById('currentBalance').textContent = balance;
    
                const withdrawForm = document.getElementById('withdrawForm');
                withdrawForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const amount = parseFloat(document.getElementById('amount').value);
                    const bankAccount = document.getElementById('bankAccount').value;
                    const accountNumber = document.getElementById('accountNumber').value;
                    const currentBalance = parseFloat(localStorage.getItem('balance') || 0);
    
                    if (amount > currentBalance) {
                        alert('Insufficient funds!');
                        return;
                    }

                    if (!bankAccount || !accountNumber) {
                        alert('Please fill in all bank account details!');
                        return;
                    }
    
                    const newBalance = currentBalance - amount;
                    localStorage.setItem('balance', newBalance);
                    document.getElementById('currentBalance').textContent = newBalance;
                    
                    // Record transaction
                    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
                    transactions.push({
                        type: 'withdraw',
                        amount: amount,
                        bankAccount: bankAccount,
                        accountNumber: accountNumber.slice(-4), // Store only last 4 digits for security
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('transactions', JSON.stringify(transactions));
    
                    alert('Withdrawal successful! Funds will be transferred to your bank account within 1-3 business days.');
                    withdrawForm.reset();
                });
            });
      