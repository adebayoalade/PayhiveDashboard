             function validateForm() {
                const subject = document.getElementById('subject').value;
                const description = document.getElementById('description').value;
            
                if (subject.trim() === '') {
                    alert('Please enter a subject for your ticket');
                    return false;
                }
            
                if (description.trim() === '') {
                    alert('Please provide a detailed description of your issue');
                    return false;
                }
            
                alert('Thank you for submitting your ticket! Our support team will contact you shortly.');
                return true;
            }