define([
  'evaluate',
  'state'
], function(evaluate, state) {
'use strict';

return function(action) {
  let prev = state.getState();
  switch (action.type) {
    case 'keypress':
      let data = action.data;
      if (data === '=') {
        let operation = prev.input;
        let input = evaluate(prev.input);
        state.setState({clear: true, operation: operation, input: input});
        break;
      }

      let input = prev.clear ? data : prev.input + data;
      state.setState({input: input, clear: false});
      break;
  }
};

});
