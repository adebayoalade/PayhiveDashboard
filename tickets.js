function calculateTotal() {
    const ticketType = document.getElementById('ticketType').value;
    const quantity = document.getElementById('quantity').value;
    let price = 0;

    switch(ticketType) {
        case 'general':
            price = 50;
            break;
        case 'vip':
            price = 150;
            break;
        case 'backstage':
            price = 250;
            break;
    }

    const total = price * quantity;
    document.getElementById('totalAmount').textContent = `${total}`;
}

document.getElementById('ticketType').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

function validateForm() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return false;
    }

    alert('Thank you for your purchase! Your tickets will be emailed to you shortly.');
    return true;
}