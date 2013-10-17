'use strict';

(function(AnyTV){

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

}(AnyTV = AnyTV || {}));