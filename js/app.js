define([
  'components/calculator',
  'state'
], function(calculator, state) {
'use strict';

let element = calculator();

let container = document.getElementById('container');
container.appendChild(element);

state.on('update', function() {
  let prev = element;
  element = calculator();
  container.replaceChild(element, prev);
});

});
