(function(global) {
'use strict';

let main = document.currentScript.dataset.main;
let baseUrl = getBaseUrl(main);
let cache = {};

global.define = function(ids, fn) {
  if (typeof ids === 'function') {
    return ids();
  }

  return Promise.all(ids.map(load)).then(function(args) {
    return fn.apply(null, args);
  });
}

function load(id) {
  let module = cacheGet(id);
  if (module) {
    return Promise.resolve(module);
  }

  // Fetch the script.
  let req = new XMLHttpRequest();
  req.open('GET', baseUrl + '/' + id + '.js');
  req.send();

  return new Promise(function(resolve, reject) {
    req.addEventListener('load', function() {
      // Try to eval the module.
      try {
        let module = eval(req.responseText);
        cacheSet(id, module);
        resolve(module);
      } catch (error) {
        throw new Error('Loading ' + id + ': ' + error.toString());
      }
    });
  });
}

function cacheGet(id) {
  let parts = id.split('/');
  let parent = cache;
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (!parent[part]) {
      return null;
    }

    parent = parent[part];
  }

  return parent;
}

function cacheSet(id, module) {
  let parts = id.split('/');
  let parent = cache;
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i];
    if (!parent[part]) {
      parent[part] = {};
    }

    parent = parent[part];
  }

  parent[parts[parts.length - 1]] = module;
}

function getBaseUrl(main) {
  let parts = main.split('/');
  let path = parts.slice(0, parts.length - 1).join('/');
  return location.protocol + '//' + location.host + path;
}

// Call main.
let parts = main.split('/');
let entrypoint = parts[parts.length - 1];
let mainId = entrypoint.replace(/\.js$/, '');
return load(mainId);

})(this);
