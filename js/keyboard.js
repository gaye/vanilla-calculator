define([
  'dispatch'
], function(dispatch) {
'use strict';

return function() {
  window.addEventListener('keyup', function(event) {
    let chr;
    if (event.shiftKey) {
      switch (event.keyCode) {
        case 54:
          chr = '^';
          break;
        case 56:
          chr = '*';
          break;
        case 61:
          chr = '+';
          break;
        case 173:
          chr = '-';
          break;
        case 191:
          chr = '/';
          break;
      }
    } else if (event.keyCode > 47 && event.keyCode < 58) {
      chr = '' + (parseInt(event.keyCode) - 48);
    } else {
      switch (event.keyCode) {
        case 13:
        case 61:
          chr = '=';
          break;
      }
    }

    if (chr) {
      dispatch({type: 'keypress', data: chr});
    }
  });
};

});
