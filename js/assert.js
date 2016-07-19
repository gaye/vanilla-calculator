define(function() {
'use strict';

return {
  includes: function(arr, member) {
    if (arr.indexOf(member) === -1) {
      throw new Error('Expected ' + JSON.stringify(arr) + ' to contain ' + member);
    }
  },

  matches: function(str, regexp) {
    if (!regexp.test(str)) {
      throw new Error('Expected ' + str + ' to match ' + regex);
    }
  }
};

});
