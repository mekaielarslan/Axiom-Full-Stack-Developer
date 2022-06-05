"use strict";

// Get DOM Elements
var wordElement = document.getElementById('word');
var incorrectLettersElement = document.getElementById('incorrect-letters');
var notificationElement = document.getElementById('notification-container');
var gameoverElement = document.getElementById('gameover-container');
var gameoverMessage = document.getElementById('gameover-message');
var playButton = document.getElementById('play-btn'); // Get DOM Elements for Hangman Parts

var hangmanParts = document.querySelectorAll('.hangman-part'); // List of words for game

var words = ["scientist", "song", "built", "word", "spell", "value", "support", "heavy", "men", "dead", "bad", "here", "street", "dream", "eventually", "original", "broad", "floating", "daily", "tool", "swimming", "mostly", "escape", "fourth", "within", "government", "somewhere", "means", "fight", "section", "longer", "clear", "creature", "situation", "who", "were", "turn", "table", "sure", "sugar", "sister", "wool"]; // Select a word from the list at random

var randomWord = words[Math.floor(Math.random() * words.length)]; // Array to hold the letters from correct guesses

var correctLetters = []; // Array to hold the letters from incorrect guesses

var incorrectLetters = []; // Function to render the random words in the UI

function renderWord() {
  // split the random word into individual letters as an array, map over the array,
  // for each letter, create a span element and only display the letter if it's present 
  // in the correctLetters array
  wordElement.innerHTML = "\n        ".concat(randomWord.split('').map(function (letter) {
    return " \n            <span class=\"letter\">".concat(correctLetters.includes(letter) ? letter : '', "</span>\n            ");
  }).join(''), "\n    "); // Remove the new line characters for the word

  var word = wordElement.innerText.replace(/\n/g, ''); // Check to see if  the word (only the correct letters) matches the randomWord

  if (word === randomWord) {
    // Set the gameover message
    gameoverMessage.innerText = 'You won!'; // Display the gmaeover container

    gameoverElement.style.display = 'flex';
  }
}

; // Function to display the notification container

function displayNotification() {
  // Display the notification in the window
  notificationElement.classList.add('show'); // Remove the notification after 1 second

  setTimeout(function () {
    notificationElement.classList.remove('show');
  }, 1000);
}

; // Function to update UI based on incorrect letter guess

function renderIncorrectLetters() {
  // Display the incorrect letters section and show each letter from the incorrectLetters array
  incorrectLettersElement.innerHTML = "\n    <p>Incorrect Letters</p>\n    ".concat(incorrectLetters.map(function (letter) {
    return "<span>".concat(letter, "</span>");
  }), "\n    "); // Display the hangman part for everytime user inputs an incorrect letters

  hangmanParts.forEach(function (part, index) {
    // Determine the number of incorrect guesses by counting number of incorrect letters
    var numIncorrect = incorrectLetters.length; // Check if the number of incorrect guesses by counting number of incorrect letters

    if (index < numIncorrect) {
      // if true, then display this part
      part.style.display = 'block';
    } else {
      // if false, then don't display
      part.style.display = 'none';
    }
  }); // Check if the game is over

  if (incorrectLetters.length === hangmanParts.length) {
    // If true, set the gameover message
    gameoverMessage.innerText = 'You lost!'; // Display the gmaeover container

    gameoverElement.style.display = 'flex';
  }
}

; // Event Listeners
// 1. Listen for keyboard keydown event

window.addEventListener('keydown', function (e) {
  // Check if the keyboard key pressed is a letter
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // if the keycode is between 65 and 90 save the letter
    var letter = e.key; // Check to see if the letter is in the randomWord

    if (randomWord.includes(letter)) {
      // If the randomWord has the letter, check to see if there is already in correctLetters array
      if (!correctLetters.includes(letter)) {
        // if the letter not already in the correctLetters array, add it there
        correctLetters.push(letter); // Rendor the word in UI again

        renderWord();
      } else {
        // If the letter is already in the correctLetters array, show the notification
        displayNotification();
      }
    } else {
      // If the randomWord does not have the letter, check to see if letter is already in the incorrectLetters array
      if (!incorrectLetters.includes(letter)) {
        // if the letter not already in the incorrectLetters array, add it there
        incorrectLetters.push(letter); // Render the incorrect letters section

        renderIncorrectLetters();
      } else {// If the letter is already in the incorrectLetters array, show the notification
      }

      displayNotification();
    }
  }
}); // 2. listen for a click on the playbutton

playButton.addEventListener('click', function () {
  // Empty the incorrect and correct letter arrays
  correctLetters.splice(0);
  incorrectLetters.splice(0); // Generate a new randomWord

  randomWord = words[Math.floor(Math.random() * words.length)]; // Update the incorect Letters section

  renderIncorrectLetters(); // Hide the gameover container

  gameoverElement.style.display = 'none'; // Render the new randomWord

  renderWord();
});
renderWord();