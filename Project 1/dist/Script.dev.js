"use strict";

var form = document.getElementById("form");
var username = document.getElementById("username");
var email = document.getElementById("email");
var Password = document.getElementById("password");
var Password2 = document.getElementById("password2"); //All Functions
//Funtion to show error

function showError(input, message) {
  var formControl = input.parentElemet;
  formControl.className = 'form-control error';
} //This is an event listener for the form on submit


form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (username.value === '') {
    showError(username, 'Username is required');
  }
});