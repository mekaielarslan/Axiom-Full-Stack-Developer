"use strict";

// Get DOM Element
var menuToggle = document.getElementById('toggle');
var close = document.getElementById('close');
var open = document.getElementById('open');
var modal = document.getElementById('modal'); // Event Listeners
// 1.Listen to click on toggle button

menuToggle.addEventListener('click', function () {
  document.body.classList.toggle('show-nav');
}); // 2. Listen for click on open button

open.addEventListener('click', function () {
  return modal.classList.add('show-modal');
}); //3. Listenfor click on close button

close.addEventListener('click', function () {
  return modal.classList.remove('show-modal');
}); // 4. Listen for click outside of modal

window.addEventListener('click', function (e) {
  return e.target === modal ? modal.classList.remove('show-modal') : false;
});