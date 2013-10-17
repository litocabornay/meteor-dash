'use strict';

// Protect from the global scope when in a browser
(function(){

  // Has Offers Initialization
  AnyTV.data('hasOffers', new AnyTV.Data.HasOffers('https://api.hasoffers.com/Api',{
    NetworkToken : 'NETjE4MoLg7NarETCDruHecVmgLHbN',
    NetworkId : 'mmotm'
  }));
  
  console.log('Server initialized');
}());