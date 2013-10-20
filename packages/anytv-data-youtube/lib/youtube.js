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
    var DEFAULT_GLOBAL_PARAMS = {
      key : ''
    }

    // Initialize values
    this._url = url || '';
    this._globalParams = _.extend({},DEFAULT_GLOBAL_PARAMS,globalParams);
  

  };

  // Proceed defining methods / properties as usual.

  var methods = {
    Report :{
      getChannelInfo : function(userParams){

        var METHOD_DEFAULTS = {}

        var METHOD_CONSTANTS = {}

        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams, METHOD_CONSTANTS);

        var map = ['part'];


        map.forEach(function(joinable,index,joinables){
          //check if non-existent and skip
          if(!params.hasOwnProperty(joinable)) return;
          
          //check if mapped param is an array, otherwise, leave as is
          if(!(params[joinable] instanceof Array)) return;
            
          //otherwise, join the array into a string separated by comma and replace
          
          params[joinable] = params[joinable].join(',');
          
        });
        
        var result = HTTP.get(this._url,{
          query : objectToQueryString(params)
        });

        // TODO: format the return to return the response, depending on the response
        return result;
      },
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
  };

  // Create a function for each target on the prototype
  // which maps the method to the methods list
  Object.keys(methods).forEach(function(target){
    constructor.prototype[target] = function(method,params){
      //Reject invalid args
      if(typeof method != 'string' || (typeof params != 'object' && params && !(params instanceof Array))) return;
      
      //Inject method-specific details
      params.Target = target;
      params.Method = method;
      
      //run the method
      return methods[target][method].call(this,params);
    }
  });

  // Extend using the AnyTV API
  AnyTV.extend('Data').YouTube = constructor;

}());