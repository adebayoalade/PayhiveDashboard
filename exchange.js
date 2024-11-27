
            async function updateExchangeRate() {
                const fromCurrency = document.getElementById('fromCurrency').value;
                const toCurrency = document.getElementById('toCurrency').value;
                
                try {
                    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                    const data = await response.json();
                    const rate = data.rates[toCurrency];
                    document.getElementById('currentRate').innerHTML = 
                        `Current Exchange Rate: 1 ${fromCurrency} = ${rate} ${toCurrency}`;
                } catch (error) {
                    document.getElementById('currentRate').innerHTML = 
                        'Unable to fetch current exchange rate';
                }
            }

            document.getElementById('fromCurrency').addEventListener('change', updateExchangeRate);
            document.getElementById('toCurrency').addEventListener('change', updateExchangeRate);
            
            // Initial exchange rate display
            updateExchangeRate();

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