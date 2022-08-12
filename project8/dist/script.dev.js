"use strict";

// Get DOM Elements
var search = document.getElementById('search');
var submit = document.getElementById('submit');
var generate = document.getElementById('generate');
var resultsHeading = document.getElementById('results-heading');
var meals = document.getElementById('meals');
var selectedMeal = document.getElementById('selected-meal'); // Function to search the meal using the API

function searchMeal(e) {
  // Prevent the form submission and redirect
  e.preventDefault(); // Clear previous search details for search details

  selectedMeal.innerHTML = ''; // Get the value from the search input field

  var searchText = search.value; // Check if search input field is empty

  if (searchText.trim()) {
    // Fetch data from API
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=".concat(searchText)).then(function (res) {
      return res.json();
    }).then(function (data) {
      // Update results heading
      resultsHeading.innerHTML = "<h2>Search results for ".concat(searchText, "</h2>"); // Check if any meals returned from API

      if (data.meals === null) {
        resultsHeading.innerHTML = "<h2>No results found for ".concat(searchText, "</h2>");
      } else {
        meals.innerHTML = data.meals.map(function (meal) {
          return "\n                <div class=\"meal\">\n                    <img src=\"".concat(meal.strMealThumb, "\" alt=\"").concat(meal.strMeal, "\" />\n                    <div class=\"meal-info\" data-mealID=\"").concat(meal.idMeal, "\">\n                        <h3>").concat(meal.strMeal, "</h3>\n                    </div>\n                </div>\n                ");
        }).join('');
      }

      ; // Clear the search text after search

      search.value = '';
    });
  } else {
    // If search text does not exist, raise an alert asking user to enter text
    alert('Please enter search keyword');
  }

  ;
}

; // Function to get the full details of a meal using  it's ID

function getFullDetails(mealID) {
  // Use fetch API to get the full details
  fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=".concat(mealID)).then(function (res) {
    return res.json();
  }).then(function (data) {
    var meal = data.meals[0]; // Add the meal to the DOM

    renderMeal(meal);
  });
}

; // Function to render the selected meal in the DOM

function renderMeal(meal) {
  // Hide the search results heading
  resultsHeading.innerHTML = ''; // Hide the search results

  meals.innerHTML = ''; // Initialize array for ingredients

  var ingredients = []; // Loop over the 20 ingredients

  for (i = 1; i <= 20; i++) {
    if (meal["strIngredient".concat(i)]) {
      // If ingredient exists,push the ingredient and measurement to the ingredients array
      ingredients.push("".concat(meal["strIngredient".concat(i)], " - ").concat(meal["strMeasure".concat(i)], " "));
    } else {
      // If the ingredient does not exist, exit the loop
      break;
    }
  }

  ; // Add the data to the DOM

  selectedMeal.innerHTML = "\n        <div class=\"selected-meal-details\">\n            <h1>".concat(meal.strMeal, "</h1>\n            <img src=\"").concat(meal.strMealThumb, "\" alt = \"").concat(meal.strMeal, "\" />\n            <div class = \"selected-meal-info\">\n                ").concat(meal.strCategory ? "<p>".concat(meal.strCategory, "</p>") : '', "\n                ").concat(meal.strArea ? "<p>".concat(meal.strArea, "</p>") : '', "\n            </div>\n            <div class = \"selected-meal-instructions\">\n                <h2>Instructions</h2>\n                <p>").concat(meal.strInstructions, "</p>\n                <h2>Ingredients</h2>\n                <ul>\n                    ").concat(ingredients.map(function (ingredient) {
    return "<li>".concat(ingredient, "</li>");
  }).join(''), "\n                </ul>\n            </div>\n        </div>\n    ");
}

;

function randomMeal() {
  // Use fetch API to get the full details
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(function (res) {
    return res.json();
  }).then(function (data) {
    var meal = data.meals[0]; // Add the meal to the DOM

    renderMeal(meal);
  });
}

; // Event Listeners
// 1. Listen for form submit 

submit.addEventListener('submit', searchMeal); // 2. Listen for the click on the meals element

meals.addEventListener('click', function (e) {
  // Get all items clicked
  var mealInfo = e.path.find(function (item) {
    // Get only the elements with class = meal-info
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  }); // Check if the mealInfo has the valid data

  if (mealInfo) {
    // Get the value from the data-mealID attribute
    var mealID = mealInfo.getAttribute('data-mealID'); // Use the mealID to get the full details of the meal

    getFullDetails(mealID);
  }
}); // Listen for click on generate button

generate.addEventListener('click', randomMeal);