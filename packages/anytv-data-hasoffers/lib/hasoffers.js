'use strict';

// Protect from the global scope when in a browser
(function(){

  // Default API config
  var API_PARAMS = {
    Service : 'HasOffers',
    Version : 2,
    NetworkToken : '',
    NetworkId : '',
    Format : 'json'
  }

  var API_URL = 'https://api.hasoffers.com/Api';

  // Plugin API
  var instances = {};

  AnyTV.extend('Data').HasOffers = {
    createInstance : function(name,config){
      if(instances[name]) return instances[name];
      var instance = HasOffers(config);
      instances[name] = instance;
      return instance;
    },
    getInstance : function(name){
      return instances[name];
    }
  }

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


  // API functions
  function mergeFunctions(instance){
    _.extend(instance,{
      Authentication : {
        findUserByCredentials : function(userParams,callback){

          var METHOD_DEFAULTS = {
            email : '',
            password : '',
            type : ''        
          };

          var METHOD_CONSTANTS = {
            Target : 'Authentication',
            Method : 'findUserByCredentials'
          }
          
          HTTP.post(API_URL,{
            params : _.extend(METHOD_DEFAULTS, userParams || {}, METHOD_CONSTANTS, instance._apiParams)
          },callback);

        }
      },
      Report :{
        getStats : function(userParams,callback){

          var METHOD_DEFAULTS = {};

          var METHOD_CONSTANTS = {
            Target : 'Report',
            Method : 'getStats'
          };

          var params = _.extend(METHOD_DEFAULTS, userParams || {}, METHOD_CONSTANTS, instance._apiParams);
          
          var result = HTTP.get(API_URL,{
            query : objectToQueryString(params)
          },callback);

        },
        getReferrals : function(userParams,callback){

          var METHOD_DEFAULTS = {};

          var METHOD_CONSTANTS = {
            Target : 'Report',
            Method : 'getReferrals'
          };

          var params = _.extend(METHOD_DEFAULTS, userParams || {}, METHOD_CONSTANTS, instance._apiParams);
          
          var result = HTTP.get(API_URL,{
            query : objectToQueryString(params)
          },callback);

        }
      },
      AffiliateUser : {
        findById : function(userParams,callback){

          var METHOD_DEFAULTS = {};

          var METHOD_CONSTANTS = {
            Target : 'AffiliateUser',
            Method : 'findById'
          };

          var params = _.extend(METHOD_DEFAULTS, userParams || {}, METHOD_CONSTANTS, instance._apiParams);
          
          var result = HTTP.get(API_URL,{
            query : objectToQueryString(params)
          },callback);
        }
      },
      Offer : {
        findAll : function(userParams,callback) {

          var METHOD_DEFAULTS = {};

          var METHOD_CONSTANTS = {
            Target : 'Offer',
            Method : 'findAll'
          };

          var params = _.extend(METHOD_DEFAULTS, userParams || {}, METHOD_CONSTANTS, instance._apiParams);
          
          var result = HTTP.get(API_URL,{
            query : objectToQueryString(params)
          },callback);

        }
      }
    });
  }

  
  
  //Instance creator
  function HasOffers(instanceParams){

    // Create a new object
    var newObject = {};

    // Merge user config with default config for API
    newObject._apiParams = _.extend({},API_PARAMS,instanceParams);

    // Merge needed objects
    mergeFunctions(newObject);

    return newObject;

  }



}());