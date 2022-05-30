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
       divElement.innerHTML =  `<strong>${user.name}</strong> ${user.wealth}`
        // Display the new divElement in the DOM
        main.appendChild(divElement);
    })
};

// Generate some user on initial page load
generateRandomUser();
// generateRandomUser();
// generateRandomUser();
 


