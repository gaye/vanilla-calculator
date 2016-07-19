define([
  'components/display',
  'components/keypad'
], function(display, keypad) {
'use strict';

return function() {
  let element = document.createElement('div');
  element.classList.add('calculator');
  element.appendChild(display());
  element.appendChild(keypad());
  return element;
};

});
