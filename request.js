function submitRequest(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        description: document.getElementById('description').value,
        preferredDate: document.getElementById('preferred-date').value
    };

    // Here you would typically send the data to your backend
    console.log('Request submitted:', formData);
    
    // Show success message
    alert('Your request has been submitted successfully! We will contact you soon.');
    
    // Reset the form
    document.getElementById('requestForm').reset();
}