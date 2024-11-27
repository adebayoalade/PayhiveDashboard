
            document.getElementById('depositMethod').addEventListener('change', function() {
                const bankDetails = document.getElementById('bankDetails');
                const cardDetails = document.getElementById('cardDetails');
                
                bankDetails.classList.add('hidden');
                cardDetails.classList.add('hidden');
                
                if (this.value === 'bank') {
                    bankDetails.classList.remove('hidden');
                } else if (this.value === 'card') {
                    cardDetails.classList.remove('hidden');
                }
            });

            document.getElementById('depositForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const amount = document.getElementById('amount').value;
                const method = document.getElementById('depositMethod').value;
                
                if (!amount || !method) {
                    alert('Please fill in all fields');
                    return;
                }

                if (method === 'card') {
                    const cardNumber = document.getElementById('cardNumber').value;
                    const expiry = document.getElementById('expiry').value;
                    const cvv = document.getElementById('cvv').value;
                    
                    if (!cardNumber || !expiry || !cvv) {
                        alert('Please fill in all card details');
                        return;
                    }
                }
            
                // Here you would typically make an API call to process the deposit
                alert(`Deposit of ${amount} via ${method} initiated successfully!`);
                
                // Reset form
                this.reset();
                document.getElementById('bankDetails').classList.add('hidden');
                document.getElementById('cardDetails').classList.add('hidden');
            });
         