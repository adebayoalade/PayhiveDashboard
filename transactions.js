
            // Load transactions from localStorage
            let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

            // Display transactions
            function displayTransactions(filteredTransactions = transactions) {
                const transactionList = document.getElementById('transactionList');
                transactionList.innerHTML = '';
                
                filteredTransactions.forEach(transaction => {
                    const tr = document.createElement('tr');
                    tr.className = 'hover:bg-gray-50';
                    
                    tr.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(transaction.date).toLocaleDateString()}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.description}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">${transaction.type}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}">
                            ${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onclick="viewTransactionDetails(${transaction.id})" class="bg-indigo-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-indigo-700">View Details</button>
                            <button onclick="generateReceipt(${transaction.id})" class="bg-green-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-700">Generate Receipt</button>
                            <button onclick="deleteTransaction(${transaction.id})" class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Delete</button>
                        </td>
                    `;
                    
                    transactionList.appendChild(tr);
                });
                
                updateSummary();
            }

            // View transaction details
            function viewTransactionDetails(id) {
                const transaction = transactions.find(t => t.id === id);
                // Implement view details functionality (e.g., modal or new page)
                alert(`Transaction Details:\nID: ${transaction.id}\nDescription: ${transaction.description}\nAmount: $${Math.abs(transaction.amount).toFixed(2)}\nDate: ${new Date(transaction.date).toLocaleDateString()}\nType: ${transaction.type}`);
            }

            // Generate receipt
            function generateReceipt(id) {
                const transaction = transactions.find(t => t.id === id);
                // Implement receipt generation functionality
                alert(`Generating receipt for transaction ${id}...\nThis feature will be implemented soon.`);
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
                if (confirm('Are you sure you want to delete this transaction?')) {
                    transactions = transactions.filter(t => t.id !== id);
                    localStorage.setItem('transactions', JSON.stringify(transactions));
                    displayTransactions();
                }
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