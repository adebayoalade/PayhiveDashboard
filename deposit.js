document.getElementById('depositForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const method = document.getElementById('depositMethod').value;
    
    if (!amount || !method) {
        alert('Please fill in all fields');
        return;
    }

    // Here you would typically make an API call to process the deposit
    // For demonstration, we'll just show a success message
    alert(`Deposit of ${amount} via ${method} initiated successfully!`);
    
    // Reset form
    this.reset();
});