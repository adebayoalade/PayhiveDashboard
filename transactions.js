        // Load transactions from localStorage
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Display transactions
        function displayTransactions(filteredTransactions = transactions) {
            const transactionList = document.getElementById('transactionList');
            transactionList.innerHTML = '';
            
            filteredTransactions.forEach(transaction => {
                const transactionElement = document.createElement('div');
                transactionElement.className = `transaction-item ${transaction.type}`;
                
                transactionElement.innerHTML = `
                    <div class="transaction-info">
                        <h3>${transaction.description}</h3>
                        <p>Date: ${new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div class="transaction-amount ${transaction.type}">
                        ${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                    <button onclick="deleteTransaction(${transaction.id})" class="delete-btn">Delete</button>
                `;
                
                transactionList.appendChild(transactionElement);
            });
            
            updateSummary();
        }

        // Update summary calculations
        function updateSummary() {
            const totalIncome = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0);
                
            const totalExpenses = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + parseFloat(t.amount), 0);
                
            const netBalance = totalIncome - totalExpenses;
            
            document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
            document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
            document.getElementById('netBalance').textContent = `$${netBalance.toFixed(2)}`;
        }

        // Delete transaction
        function deleteTransaction(id) {
            transactions = transactions.filter(t => t.id !== id);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransactions();
        }

        // Apply filters
        function applyFilters() {
            const filterType = document.getElementById('filterType').value;
            const dateFilter = document.getElementById('dateFilter').value;
            
            let filteredTransactions = [...transactions];
            
            if (filterType !== 'all') {
                filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
            }
            
            if (dateFilter) {
                filteredTransactions = filteredTransactions.filter(t => 
                    t.date.split('T')[0] === dateFilter
                );
            }
            
            displayTransactions(filteredTransactions);
        }

        // Initial display
        displayTransactions();