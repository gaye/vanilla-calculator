define([
  'components/calculator',
  'keyboard',
  'state'
], function(calculator, keyboard, state) {
'use strict';

let element = calculator();
let container = document.getElementById('container');
container.appendChild(element);

// Start listening for keys pressed.
keyboard();

state.on('update', function() {
  console.log(JSON.stringify(state.getState()));
  let prev = element;
  element = calculator();
  container.replaceChild(element, prev);
});

});
