'use strict';

// Protect from the global scope when in a browser
(function(){

  // Makeshift jQuery.param, until we properly include jQuery
  function objectToQueryString(obj, prefix) {
    var str = [];
    for(var p in obj) {
      if(!obj.hasOwnProperty(p)) continue;
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v == "object" ? 
          objectToQueryString(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
    return str.join("&");
  }

  // Your constructor
  var constructor = function(url,globalParams) {

    // TODO: Add API defaults here (like API keys, network ids, etc.)
    var DEFAULT_GLOBAL_PARAMS = {}

    // Initialize values
    this._url = url || '';
    this._globalParams = _.extend({},DEFAULT_GLOBAL_PARAMS,globalParams);
  

  };

  // Proceed defining methods / properties as usual.
  constructor.prototype = {
    constructor : constructor,

    //TODO: Add methods
    methodName : function(userParams){

      //TODO: Add overridable parameter default values (email, password, recordId etc)
      var METHOD_DEFAULTS = {}

      //TODO: Add parameter values that should not be overridable (remote method name, etc.)
      var METHOD_CONSTANTS = {}

      // Merge parameters
      var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams, METHOD_CONSTANTS);
      
      // TODO: Replace the method accordingly (GET|POST|PUT|DELETE)
      var result = HTTP.call('GET',{
        params : params
      });

      // TODO: format the return to return the response, depending on the response
      return result.data.response;
    }
  }

  // Extend using the AnyTV API
  AnyTV.extend('Data').YouTube = constructor;

}());