"use strict";

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
    divElement.innerHTML = "<strong>".concat(user.name, "</strong> ").concat(user.wealth); // Display the new divElement in the DOM

    main.appendChild(divElement);
  });
}

; // Generate some user on initial page load

generateRandomUser(); // generateRandomUser();
// generateRandomUser();