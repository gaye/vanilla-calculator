define([
  'state'
], function(state) {
'use strict';

return function() {
  let data = state.getState();

  let display = document.createElement('div');
  display.classList.add('display');

  let operation = document.createElement('div');
  operation.classList.add('display-operation');
  operation.textContent = data.operation.length ? data.operation + '=' : '';
  display.appendChild(operation);

  let input = document.createElement('div');
  input.classList.add('display-input');
  input.textContent = data.input;
  display.appendChild(input);

  return display;
};

});
