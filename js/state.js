define([
  'EventEmitter'
], function(EventEmitter) {
'use strict';

function State() {
  EventEmitter.call(this);

  this.data = {
    clear: true,
    operation: '',
    input: '0'
  };
}

State.prototype = {
  __proto__: EventEmitter.prototype,

  getState: function() {
    return this.data;
  },

  setState: function(update) {
    this.data = Object.assign(this.data, update);
    this.emit('update');
  }
};

return new State();

});
