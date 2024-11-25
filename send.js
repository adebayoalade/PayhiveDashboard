
document.getElementById('sendMoneyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;
    const note = document.getElementById('note').value;

    // Validate inputs
    if (!recipient || !amount) {
        alert('Please fill in all required fields');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Simulate sending money
    setTimeout(() => {
        alert(`Successfully sent ${amount} to ${recipient}`);
        window.location.href = 'dashboard.html';
    }, 1000);
});