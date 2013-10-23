'use strict';

// Protect from the global scope when in a browser
(function(){

  // Has Offers bridge instance
  AnyTV.Data.HasOffers.createInstance('mmotm',{
    NetworkToken : 'NETjE4MoLg7NarETCDruHecVmgLHbN',
    NetworkId : 'mmotm'
  });

  // YouTube bridge instance
  AnyTV.data('YouTube', new AnyTV.Data.YouTube('https://www.googleapis.com/youtube/v3/channels',{
    key : 'AIzaSyDL6F2UDnezIht4VT-nnKpD_vZSu1ujEyY'
  }));

  // AnyTV bridge instance
  //AnyTV.data('AnalyticsEngine',new AnyTV.Data.AnalyticsEngine());

  console.log('Server initialized');
}());