
        function handleComplianceForm(event) {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send this data to your backend
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message. Our compliance team will contact you shortly.');
            
            // Reset form
            event.target.reset();
        }