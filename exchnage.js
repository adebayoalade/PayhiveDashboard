document.getElementById('exchangeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
      
        const rate = data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);
      
        document.getElementById('result').style.display = 'block';
        document.getElementById('conversionResult').innerHTML = 
            `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').style.display = 'block';
        document.getElementById('conversionResult').innerHTML = 
            'Error occurred during conversion. Please try again.';
    }
});