"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Get Dom
var addUserBtn = document.getElementById('add-user');
var doubleWealthBtn = document.getElementById('double-wealth');
var filterWealthBtn = document.getElementById('filter-wealth');
var sortBtn = document.getElementById('sort-wealth');
var sumWealthBtn = document.getElementById('sum-wealth');
var main = document.getElementById('main'); // Thios is the array to store user data to display in dom

var userArray = []; // Function to fetch a random user and assign random wealth

function generateRandomUser() {
  var res, data, user, newUser;
  return regeneratorRuntime.async(function generateRandomUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://randomuser.me/api/"));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          data = _context.sent;
          // Save the user data 
          user = data.results[0]; // Create new user  object with random user name and wealth

          newUser = {
            name: "".concat(user.name.title, " ").concat(user.name.first, " ").concat(user.name.last),
            wealth: Math.floor(Math.random() * 10000000)
          }; //  Add newUser object to userArray

          addUserData(newUser);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

; //Function to update the new user data from userArray

function addUserData(user) {
  //  Push user object to the userArray
  userArray.push(user); // Update the DOM With new data in userArray

  updateDOM();
}

; // Function to update the DOM with new user data from userArray

function updateDOM() {
  var userData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : userArray;
  // Wipe away content from main element
  main.innerHTML = '<h2><strong>User</strong>Wealth</h2>'; // loop over  userData array and display user in the DOM

  userData.forEach(function (user) {
    // Create a new div element for the user
    var divElement = document.createElement('div'); // Assign a class to the new div

    divElement.classList.add('user');
    divElement.innerHTML = "<strong>".concat(user.name, "</strong> $").concat(formatWealth(user.wealth)); // Display the new divElement in the DOM

    main.appendChild(divElement);
  });
}

; // Format wealth number as dollar

function formatWealth(wealth) {
  return wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

; // Functon to double wealth of all user

function doubleWealth() {
  // User map method t create a new array with double wealth
  userArray = userArray.map(function (user) {
    return _objectSpread({}, user, {
      wealth: user.wealth * 2
    });
  }); // Update the DOM after is doubled

  updateDOM();
}

; // Function to filter and display only user with wealth greater than $1,000,000 

function filterWealth() {
  // Run the filter method to filter and show Millionaire
  userArray = userArray.filter(function (user) {
    return user.wealth > 1000000;
  }); //  Update  the DOM after users are filtered 

  updateDOM();
}

; // Function to sort users by wealth

function sortUser() {
  // Use a campare function to short users based on wealth in descending order
  userArray.sort(function (a, b) {
    return b.wealth - a.wealth;
  });
  updateDOM();
}

; //Function to sum all the wealth from all users 

function calculateNetWealth() {
  // User reduce method to calculate sum of all wealth
  var netWealth = userArray.reduce(function (acc, user) {
    return acc += user.wealth;
  }, 0); //  Create new div element

  var totalWealthDiv = document.createElement('div'); // create content for totalWealthDiv 

  totalWealthDiv.innerHTML = "<h3>Net Wealth:<strong> $".concat(formatWealth(netWealth), "</strong></h3>"); // Append the new totalWealthDiv into DOM

  main.appendChild(totalWealthDiv);
}

; // Event Listeners
// 1. Lestion for click on Add User Button

addUserBtn.addEventListener('click', generateRandomUser); // 2. listen for click on the Double Wealth Button 

doubleWealthBtn.addEventListener('click', doubleWealth); // 3. Listen for click on the Show Millionaire Button

filterWealthBtn.addEventListener('click', filterWealth); // 4.listen for click on sort users Button

sortBtn.addEventListener('click', sortUser); // 5.Listen for click on Calculate Net Wealth Buttpn

sumWealthBtn.addEventListener('click', calculateNetWealth); // Generate some user on initial page load

generateRandomUser();
generateRandomUser();
generateRandomUser(); // generateRandomUser();
// generateRandomUser();