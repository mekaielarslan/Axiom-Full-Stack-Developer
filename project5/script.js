// Get Dom
const addUserBtn = document.getElementById('add-user');
const doubleWealthBtn  = document.getElementById('double-wealth');
const filterWealthBtn = document.getElementById('filter-wealth');
const sortBtn = document.getElementById('sort-wealth');
const sumWealthBtn = document.getElementById('sum-wealth');
const main = document.getElementById('main');

// Thios is the array to store user data to display in dom
let userArray = [];

// Function to fetch a random user and assign random wealth
 async function generateRandomUser() {
    // Use Fetch to get random user data from randomuser.me/api
    const res = await fetch(`https://randomuser.me/api/`); 
    const data = await res.json();
    // Save the user data 
    const user = data.results[0];
    // Create new user  object with random user name and wealth
     const newUser = {
             name : `${user.name.title} ${user.name.first} ${user.name.last}`,
             wealth : Math.floor( Math.random () * 10000000)
     };
    //  Add newUser object to userArray
    addUserData(newUser);
};

 //Function to update the new user data from userArray
 function addUserData (user) {
   //  Push user object to the userArray
   userArray.push (user);
   // Update the DOM With new data in userArray
     updateDOM();
};

// Function to update the DOM with new user data from userArray
function updateDOM (userData = userArray){
   // Wipe away content from main element
   main.innerHTML = '<h2><strong>User</strong>Wealth</h2>'
    // loop over  userData array and display user in the DOM
    userData.forEach( user => {
       // Create a new div element for the user
       const divElement = document.createElement('div');
       // Assign a class to the new div
       divElement.classList.add('user');
       divElement.innerHTML =  `<strong>${user.name}</strong> $${formatWealth(user.wealth)}`
        // Display the new divElement in the DOM
        main.appendChild(divElement);
    })
};

// Format wealth number as dollar

function formatWealth(wealth) {
 return wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

};

// Functon to double wealth of all user
function doubleWealth() {
  // User map method t create a new array with double wealth
    userArray = userArray.map( user => {
        return {...user,wealth : user.wealth *2 } 
    });
  // Update the DOM after is doubled
  updateDOM();
};

// Function to filter and display only user with wealth greater than $1,000,000 
function filterWealth() {
  // Run the filter method to filter and show Millionaire
         userArray = userArray.filter(user => user.wealth > 1000000);
        //  Update  the DOM after users are filtered 
        updateDOM();
};

// Function to sort users by wealth
function sortUser(){
  // Use a campare function to short users based on wealth in descending order
  userArray.sort ((a, b) => b.wealth - a.wealth);
  updateDOM();
};

//Function to sum all the wealth from all users 
function calculateNetWealth(){
  // User reduce method to calculate sum of all wealth
   const netWealth = userArray.reduce( (acc, user) =>
   (acc += user.wealth),0 ); 
  //  Create new div element
  const totalWealthDiv = document.createElement('div');
  // create content for totalWealthDiv 
  totalWealthDiv.innerHTML = `<h3>Net Wealth:<strong> $${formatWealth(netWealth)}</strong></h3>`
  // Append the new totalWealthDiv into DOM
  main.appendChild(totalWealthDiv); 
};

// Event Listeners
// 1. Lestion for click on Add User Button
addUserBtn.addEventListener('click',generateRandomUser);

// 2. listen for click on the Double Wealth Button 
doubleWealthBtn.addEventListener('click',doubleWealth);

// 3. Listen for click on the Show Millionaire Button
filterWealthBtn.addEventListener('click',filterWealth);

// 4.listen for click on sort users Button
sortBtn.addEventListener('click',sortUser);

// 5.Listen for click on Calculate Net Wealth Buttpn
sumWealthBtn.addEventListener('click',calculateNetWealth);
// Generate some user on initial page load
generateRandomUser(); 
generateRandomUser();
generateRandomUser();
// generateRandomUser();
// generateRandomUser();
 


