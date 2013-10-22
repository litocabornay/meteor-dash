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

    // Default request parameters. Placing it here for the mean time
    var DEFAULT_GLOBAL_PARAMS = {
      Service : 'HasOffers',
      Version : 2,
      NetworkToken : '',
      NetworkId : '',
      Format : 'json'
    }

    // Initialize values
    this._url = url || '';
    this._globalParams = _.extend({},DEFAULT_GLOBAL_PARAMS,globalParams);
  

  };                                  //Meteor, browser global

  // Proceed defining methods / properties as usual.

  var methods = {
    Authentication : {
      findUserByCredentials : function(userParams){

        var METHOD_DEFAULTS = {
          email : '',
          password : '',
          type : ''        
        };
        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams);
        var result = HTTP.post(this._url,{
          params : params
        });

        return result.data.response;

      }
    },
    Report :{
      getStats : function(userParams){

        var METHOD_DEFAULTS = {};
        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams);
        var result = HTTP.get(this._url,{
          query : objectToQueryString(params)
        });

        return result.data.response;

      },
      getReferrals : function(userParams){

        var METHOD_DEFAULTS = {};
        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams);
        var result = HTTP.get(this._url,{
          query : objectToQueryString(params)
        });

        return result.data.response;

      }
    },
    AffiliateUser : {
      findById : function(userParams){

        var METHOD_DEFAULTS = {};
        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams);
        var result = HTTP.get(this._url,{
          query : objectToQueryString(params)
        });

        return result.data.response;
      }
    },
    Offer : {
      findAll : function(userParams) {

        var METHOD_DEFAULTS = {};
        var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams);
        var result = HTTP.get(this._url,{
          query : objectToQueryString(params)
        });

        return result.data.response;

      }
    }
  };

  // Create a function for each target on the prototype
  // which maps the method to the methods list
  Object.keys(methods).forEach(function(target){
    constructor.prototype[target] = function(method,params){

      // Use params or default to an empty object
      params = params || {};

      //Reject invalid args
      if(typeof method !== 'string' || !(typeof params === 'object' && params && !(params instanceof Array))) return;
    
      //Inject method-specific details
      params.Target = target;
      params.Method = method;
      
      //run the method
      return methods[target][method].call(this,params);
    }
  });

  // Extend using the AnyTV API
  AnyTV.extend('Data').HasOffers = constructor;

}());