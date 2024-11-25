   // Initialize Stripe
   const stripe = Stripe('your_publishable_key');
   const elements = stripe.elements();

   // Create card element
   const card = elements.create('card', {
       style: {
           base: {
               fontSize: '16px',
               color: '#424770',
               '::placeholder': {
                   color: '#aab7c4',
               },
           },
           invalid: {
               color: '#9e2146',
           },
       },
   });
   card.mount('#card-element');

   // Handle real-time validation errors
   card.addEventListener('change', function(event) {
       const displayError = document.getElementById('card-errors');
       if (event.error) {
           displayError.textContent = event.error.message;
       } else {
           displayError.textContent = '';
       }
   });

   // Handle form submission
   const form = document.getElementById('payment-form');
   form.addEventListener('submit', async function(event) {
       event.preventDefault();

       const submitButton = form.querySelector('button');
       submitButton.disabled = true;
       submitButton.textContent = 'Processing...';

       const { token, error } = await stripe.createToken(card);

       if (error) {
           const errorElement = document.getElementById('card-errors');
           errorElement.textContent = error.message;
           submitButton.disabled = false;
           submitButton.textContent = 'Submit Payment';
       } else {
           // Send token to your server
           const name = document.getElementById('name').value;
           const email = document.getElementById('email').value;
           
           try {
               const response = await fetch('/process-payment', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                       token: token.id,
                       name: name,
                       email: email
                   })
               });
               
               const result = await response.json();
               if (result.success) {
                   alert('Payment successful!');
                   form.reset();
               } else {
                   alert('Payment failed. Please try again.');
               }
           } catch (err) {
               console.error('Error:', err);
               alert('An error occurred. Please try again.');
           } finally {
               submitButton.disabled = false;
               submitButton.textContent = 'Submit Payment';
           }
       }
   });


   

  
