'use strict';

(function(AnyTV){

  // Data storage for the AnyTV API
  AnyTV._cache = {};

  // Namespace extender
  // Example: AnyTV.extend('Foo.Bar.Baz') => AnyTV.Foo.Bar.Baz will exist
  AnyTV.extend = function(parent,namespace){

    //Return the context object when the function isn't given arguments
    if(arguments.length === 0) {
      return AnyTV;
    }

    //If the first argument is a string, then 
    if(typeof parent === 'string') {
      namespace = parent;
      parent = AnyTV;
    }

    var parts = namespace.split('.');
    var partsLength = parts.length;
    var i;
    var part;

    for(i = 0; i < partsLength; ++i) {
      part = parts[i];
      //Use an existing parent part or create a new nested object
      parent[part] = parent[part] || {};
      parent = parent[part];
    }
    return parent;
  }

  //Data store, similar to jQuery.data(). Can be used for common data storage.
  AnyTV.data = function(key,value){

    // Create a data object on the cache if it does not exist
    if(!AnyTV._cache.hasOwnProperty('_data')) AnyTV._cache._data = {};

    // Operate only when the key is provided
    if(typeof key === 'string'){
      if(value === undefined) return AnyTV._cache._data[key];
      else AnyTV._cache._data[key] = value;
    }

  }

}(AnyTV = AnyTV || {}));