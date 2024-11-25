document.getElementById('profileSettingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Collect form data
    const formData = new FormData(this);
    
    // Send to server (example fetch request)
    fetch('/api/profile/update', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profile updated successfully!');
        } else {
            alert('Error updating profile: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating your profile.');
    });
});

// Preview profile picture
document.getElementById('profilePicture').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${e.target.result}" class="max-w-full max-h-full object-cover">`;
        };
        reader.readAsDataURL(file);
    }
});

// Load existing profile data
window.addEventListener('load', function() {
    fetch('/api/profile/get')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('bio').value = data.bio || '';
            document.getElementById('emailNotif').checked = data.emailNotif || false;
            document.getElementById('smsNotif').checked = data.smsNotif || false;
        })
        .catch(error => {
            console.error('Error loading profile:', error);
        });
});