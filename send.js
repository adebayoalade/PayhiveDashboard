
            document.getElementById('sendMoneyForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const recipient = document.getElementById('recipient').value;
                const amount = document.getElementById('amount').value;
                const note = document.getElementById('note').value;
            
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
                // Check if recipient is a PayHive user
                checkRecipientAccount(recipient).then(isUser => {
                    if (isUser) {
                        // Process direct transfer
                        setTimeout(() => {
                            alert(`Successfully sent $${amount} to ${recipient}`);
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    } else {
                        // Send invitation email
                        setTimeout(() => {
                            alert(`An invitation has been sent to ${recipient}. The funds will be available once they create a PayHive account.`);
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    }
                });
            });
            
            // Simulate checking if recipient has PayHive account
            function checkRecipientAccount(email) {
                return new Promise((resolve) => {
                    // This should be replaced with actual API call to check user existence
                    setTimeout(() => {
                        // Simulate random result for demo
                        resolve(Math.random() > 0.5);
                    }, 500);
                });
            }
