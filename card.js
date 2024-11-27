
            document.addEventListener('DOMContentLoaded', function() {
                // Add event listeners for all cards
                document.querySelectorAll('[data-card-id]').forEach(card => {
                    const viewDetailsBtn = card.querySelector('.view-details');
                    const topUpBtn = card.querySelector('.top-up');
                    
                    viewDetailsBtn.addEventListener('click', () => viewCardDetails(card.dataset.cardId));
                    topUpBtn.addEventListener('click', () => topUpCard(card.dataset.cardId));
                });
            });

            function viewCardDetails(cardId) {
                const card = document.querySelector(`[data-card-id="${cardId}"]`);
                const cardNumber = card.querySelector('.card-number').textContent;
                const balance = card.querySelector('.balance').textContent;
                const expiryDate = card.querySelector('.expiry-date').textContent;
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content dark:bg-slate-800 dark:text-white">
                        <h2 class="text-xl font-bold mb-4">Card Details</h2>
                        <p class="mb-2">Card Number: ${cardNumber}</p>
                        <p class="mb-2">Current Balance: $${balance}</p>
                        <p class="mb-4">${expiryDate}</p>
                        <button onclick="this.closest('.modal').remove()" 
                                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            Close
                        </button>
                    </div>
                `;
                
                document.body.appendChild(modal);
            }
            
            function topUpCard(cardId) {
                const card = document.querySelector(`[data-card-id="${cardId}"]`);
                const currentBalance = card.querySelector('.balance').textContent;
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content dark:bg-slate-800 dark:text-white">
                        <h2 class="text-xl font-bold mb-4">Top Up Card</h2>
                        <p class="mb-4">Current Balance: $${currentBalance}</p>
                        <div class="input-group">
                            <label for="topup-amount">Amount to Top Up ($):</label>
                            <input type="number" id="topup-amount" min="1" step="0.01" class="dark:bg-slate-700">
                        </div>
                        <div class="button-group">
                            <button onclick="processTopUp('${cardId}', this.closest('.modal-content').querySelector('#topup-amount').value)"
                                    class="bg-blue-600 hover:bg-blue-700">
                                Confirm
                            </button>
                            <button onclick="this.closest('.modal').remove()"
                                    class="bg-red-500 hover:bg-red-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            }

            function processTopUp(cardId, amount) {
                if (!amount || amount <= 0) {
                    alert('Please enter a valid amount');
                    return;
                }

                const card = document.querySelector(`[data-card-id="${cardId}"]`);
                const balanceElement = card.querySelector('.balance');
                const currentBalance = parseFloat(balanceElement.textContent);
                const newBalance = (currentBalance + parseFloat(amount)).toFixed(2);
                
                balanceElement.textContent = newBalance;
                
                // Add new transaction to history
                const transactionsContainer = document.getElementById('transactions-container');
                const newTransaction = document.createElement('div');
                newTransaction.className = 'flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-300';
                newTransaction.innerHTML = `
                    <div class="mb-2 sm:mb-0">
                        <p class="font-semibold text-gray-800 dark:text-white">Card Top Up</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${new Date().toLocaleDateString()}</p>
                    </div>
                    <p class="text-green-600 font-semibold text-lg">+$${parseFloat(amount).toFixed(2)}</p>
                `;
                
                transactionsContainer.insertBefore(newTransaction, transactionsContainer.firstChild);
                
                // Close modal and show success message
                document.querySelector('.modal').remove();
                alert('Top up successful!');
            }
   

            

  
