// get dom elements
const baseCurrency = document.getElementById ('base-currency');
const targetCurrency = document.getElementById ('target-currency');
const baseAmount = document.getElementById ('base-amount');
const targetAmount = document.getElementById ('target-amount'); 
const exchangeRate = document.getElementById ('xrate');
const flipBtn = document.getElementById ('flip');

// Function to fetch exchange rates from API and up DOM
function calculate() {
    // Get the currency codes for base and target currency
    const baseCode = baseCurrency.value;
    const targetCode = targetCurrency.value;
    // Execu
fetch(`https://v6.exchangerate-api.com/v6/3a4e3d6d3e4463ee44c98cc0/latest/${baseCode}`)
     .then(res=>res.json() )  
      .then( data => {
        //   Get the exchange rate for base currency to target currency 
         const rate =  data.conversion_rates[targetCode];
        //  Update DOM with the exchange rate
        exchangeRate.innerText= `1 ${baseCode} = ${rate} ${targetCode}`;
        // Calculate  amoubt of target currency based on exchange rate
        targetAmount.value = (baseAmount.value * rate).toFixed(2); 
      })
};

// Event listeners
// 1. listen for change to base currency select box
baseCurrency.addEventListener('change',calculate);
// 2. listen for input in base amount  input failed
baseAmount.addEventListener('input',calculate);
// 3. listen for change to target currency    select box
targetCurrency.addEventListener('change',calculate);
// 4. listen for input in Target amount input  failed
targetAmount.addEventListener('input',calculate);
// 5. Listen for click on the flip button
flipBtn.addEventListener('click',() =>{
  // save the vaue of the currency in a temp variable
  const tempCurrency = baseCurrency.value;
  // Reassign base currency using target currency
  baseCurrency.value = targetCurrency.value;
  // Reassign target currency using the original base currency
  targetCurrency.value = tempCurrency;
  // Recalculate exchange rate nd DOM
  calculate () ;
}) 
// Initonal calculation
calculate();