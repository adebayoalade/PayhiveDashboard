
            function updateAmount() {
                const serviceSelect = document.getElementById('service');
                const amountInput = document.getElementById('amount');
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                const price = selectedOption.dataset.price || 0;
                amountInput.value = price;
            }

            function submitRequest(event) {
                event.preventDefault();
                
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('service').value,
                    amount: document.getElementById('amount').value,
                    billingAddress: document.getElementById('billing-address').value,
                    description: document.getElementById('description').value,
                    dueDate: document.getElementById('due-date').value
                };
            
                // Here you would typically send the data to your backend to generate invoice and send email
                console.log('Invoice request submitted:', formData);
                
                // Show success message
                alert('Invoice has been generated and sent to the provided email address.');
                
                // Reset the form
                document.getElementById('requestForm').reset();
            }