define([
  'assert'
], function(assert) {
'use strict';

let operators = ['^', '*', '÷', '/', '+', '-'];

return function(str) {
  // Parse.
  let input = [str.charAt(0)];
  let lastSeen = 'operand';
  for (let i = 1; i < str.length; i++) {
    let chr = str.charAt(i);
    if (chr >= '0' && chr <= '9') {
      if (lastSeen === 'operator') {
        input.push(chr);
        lastSeen = 'operand';
      } else {
        // Extend operand.
        input[input.length - 1] += chr;
      }
    } else {
      if (lastSeen === 'operator') {
        throw new Error('Cannot have two adjacent operators!');
      }

      input.push(chr);
      lastSeen = 'operator';
    }
  }

  // Now we should have an array like ['12', '*', '2', '^', '3']
  for (let i = 0; i < input.length; i++) {
    let item = input[i];
    if (i % 2) {
      assert.includes(operators, item);
    } else {
      assert.matches(item, /^[0-9]+$/);
    }
  }

  return simplify(input);
};

function simplify(expression) {
  if (expression.length === 1) {
    return expression[0];
  }

  let operator;
  for (let i = 0; i < operators.length; i++) {
    operator = operators[i];
    let index = expression.indexOf(operator);
    if (index === -1) {
      continue;
    }

    // We found the next operator to simplify.
    let left = parseInt(expression[index - 1]);
    let right = parseInt(expression[index + 1]);
    let result = calculate(operator, left, right);
    expression.splice(index - 1, 3, result);
    return simplify(expression);
  }
}

function calculate(operator, left, right) {
  switch (operator) {
    case '^':
      return Math.pow(left, right);
    case '*':
      return left * right;
    case '÷':
    case '/':
      return left / right;
    case '+':
      return left + right;
    case '-':
      return left - right;
  }
}

});
