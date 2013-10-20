'use strict';

// Protect from the global scope when in a browser
(function(){

  // Has Offers Initialization
  AnyTV.data('hasOffers', new AnyTV.Data.HasOffers('https://api.hasoffers.com/Api',{
    NetworkToken : 'NETjE4MoLg7NarETCDruHecVmgLHbN',
    NetworkId : 'mmotm'
  }));

  AnyTV.data('YouTube', new AnyTV.Data.YouTube('https://www.googleapis.com/youtube/v3/channels',{
    key : 'AIzaSyDL6F2UDnezIht4VT-nnKpD_vZSu1ujEyY'
  }));

  console.log('Server initialized');
}());