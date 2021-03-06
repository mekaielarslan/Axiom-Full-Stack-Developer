"use strict";

var form = document.querySelector('#form');
var username = document.querySelector('#username');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var password2 = document.querySelector('#password2'); // All Functions
// Function to show error

function showError(input, message) {
  var formControl = input.parentElement;
  formControl.className = 'form-control error';
  var small = formControl.querySelector('small');
  small.innerText = message;
} // Funtion to show success


function showSuccess(input) {
  var formControl = input.parentElement;
  formControl.className = 'form-control success';
} // Function to check if email is valid


function checkEmail(input) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please provide a valid emai');
  }
} // Function to check required fields have data


function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === '') {
      showError(input, "".concat(getFieldId(input), " is required"));
    } else {
      showSuccess(input);
    }
  });
} // Function to check length of input field


function checklength(input, min, max) {
  if (input.value.length < min) {
    showError(input, "".concat(getFieldId(input), " needs to be atleast ").concat(min, " characters"));
  } else if (input.value.length > max) {
    showError(input, "".concat(getFieldId(input), " needs to be less than ").concat(max, " characters"));
  } else {
    showSuccess(input);
  }
} // Function to check if password and confirm password match


function chechPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords don't match");
  }
} // Function to get the id of the input field


function getFieldId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
} // This is event listner for the form on submission


form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  checkRequired([username, email, password, password2]);
  checklength(username, 3, 10);
  checklength(password, 6, 30);
  checkEmail(email);
  chechPasswordMatch(password, password2);
});