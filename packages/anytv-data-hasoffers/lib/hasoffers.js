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
  constructor.prototype = {
    constructor : constructor,
    findUserByCredentials : function(userParams){

      var METHOD_DEFAULTS = {
        email : '',
        password : '',
        type : ''        
      }

      var METHOD_CONSTANTS = {
        Method : 'findUserByCredentials',
        Target : 'Authentication'
      }

      var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams, METHOD_CONSTANTS);

      var result = HTTP.post(this._url,{
        params : params
      });

      return result.data.response;
    },
    getStats : function(userParams){

      var METHOD_DEFAULTS = {};
      
      var METHOD_CONSTANTS = {
        Method : 'getStats',
        Target : 'Report'
      };

      var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams, METHOD_CONSTANTS);

      // Manually generating the query string since Meteor's param sucks in object->QS conversion
      var result = HTTP.get(this._url,{
        query : objectToQueryString(params)
      });

      return result.data.response;

    },
    getReferrals : function(userParams){

      var METHOD_DEFAULTS = {};
      
      var METHOD_CONSTANTS = {
        Method : 'getReferrals',
        Target : 'Report'
      };

      var params = _.extend(METHOD_DEFAULTS, userParams, this._globalParams, METHOD_CONSTANTS);

      // Manually generating the query string since Meteor's param sucks in object->QS conversion
      var result = HTTP.get(this._url,{
        query : objectToQueryString(params)
      });

      return result.data.response;

    }
  }

  // Extend using the AnyTV API
  AnyTV.extend('Data').HasOffers = constructor;

}());