 document.addEventListener('DOMContentLoaded', function() {
        const paymentMethod = document.getElementById('paymentMethod');
        const paymentDetails = document.querySelectorAll('.payment-details');
        const withdrawalForm = document.getElementById('withdrawalSettingsForm');

        // Handle payment method change with animation
        paymentMethod.addEventListener('change', function() {
            paymentDetails.forEach(detail => {
                detail.style.opacity = '0';
                detail.style.display = 'none';
            });
            
            const selectedMethod = this.value;
            if (selectedMethod) {
                const selectedDetail = document.getElementById(`${selectedMethod}Details`);
                selectedDetail.style.display = 'block';
                setTimeout(() => {
                    selectedDetail.style.opacity = '1';
                }, 50);
            }
        });

        // Add smooth transitions
        paymentDetails.forEach(detail => {
            detail.style.transition = 'opacity 0.3s ease-in-out';
        });

        // Handle form submission
        withdrawalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedMethod = paymentMethod.value;
            let withdrawalSettings = {
                paymentMethod: selectedMethod,
                twoFactorAuth: document.getElementById('twoFactorAuth').checked
            };

            // Collect method-specific details
            switch(selectedMethod) {
                case 'bank':
                    withdrawalSettings.bankDetails = {
                        bankName: document.getElementById('bankName').value,
                        accountNumber: document.getElementById('accountNumber').value,
                        swiftCode: document.getElementById('swiftCode').value
                    };
                    break;
                case 'paypal':
                    withdrawalSettings.paypalDetails = {
                        email: document.getElementById('paypalEmail').value
                    };
                    break;
            }

            // Save settings to backend (mock API call)
            console.log('Saving withdrawal settings:', withdrawalSettings);
            alert('Withdrawal settings saved successfully!');
        });
    });