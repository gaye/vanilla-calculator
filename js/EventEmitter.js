define(function() {
'use strict';

function EventEmitter() {
  this.listeners = {};
}

EventEmitter.prototype = {
  on: function(eventType, listener) {
    if (!Array.isArray(this.listeners[eventType])) {
      this.listeners[eventType] = [];
    }

    this.listeners[eventType].push(listener);
  },

  off: function(eventType, listener) {
    let listeners = this.listeners[eventType];
    if (!Array.isArray(listeners)) {
      return;
    }

    let index = listeners.indexOf(listener);
    if (index === -1) {
      return;
    }

    listeners.splice(index, 1);
  },

  emit: function(eventType, data) {
    let listeners = this.listeners[eventType];
    if (!Array.isArray(listeners)) {
      return;
    }

    listeners.forEach(function(listener) {
      listener(data);
    });
  }
};

return EventEmitter;

});
