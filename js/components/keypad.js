define([
  'dispatch'
], function(dispatch) {
'use strict';

function createButton(text) {
  let button = document.createElement('div');
  button.classList.add('keypad-button');
  button.textContent = text;
  button.addEventListener('click', function() {
    dispatch({type: 'keypress', data: text});
  });

  return button;
}

return function() {
  let keypad = document.createElement('div');
  keypad.classList.add('keypad');

  let row1 = document.createElement('div');
  row1.classList.add('keypad-row');
  row1.appendChild(createButton('1'));
  row1.appendChild(createButton('2'));
  row1.appendChild(createButton('3'));
  row1.appendChild(createButton('+'));
  row1.appendChild(createButton('-'));
  keypad.appendChild(row1);

  let row2 = document.createElement('div');
  row2.classList.add('keypad-row');
  row2.appendChild(createButton('4'));
  row2.appendChild(createButton('5'));
  row2.appendChild(createButton('6'));
  row2.appendChild(createButton('*'));
  row2.appendChild(createButton('÷'));
  keypad.appendChild(row2);

  let row3 = document.createElement('div');
  row3.classList.add('keypad-row');
  row3.appendChild(createButton('7'));
  row3.appendChild(createButton('8'));
  row3.appendChild(createButton('9'));
  row3.appendChild(createButton('^'));
  row3.appendChild(createButton('='));
  keypad.appendChild(row3);

  return keypad;
}

});
