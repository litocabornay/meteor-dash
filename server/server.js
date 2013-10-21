console.log('Server code speaking');


Meteor.startup(function(){
  
  // Has Offers aggregator
  (function(){

    // Clearing the collections on first run
    Games.remove({});
    Gametotals.remove({});

    // Publish data when clients subscribe
    Meteor.publish('games', function(){
      return Games.find();
    });
    Meteor.publish('gametotals', function(){
      return Gametotals.find();
    });

    // Escape this block when Has Offers doesn't exist
    if(!AnyTV.data('hasOffers')) return;

    // Storage variables for paged polling
    var pageCount = -1;
    var itemCount = -1;
    var currentPage = 1;

    // Semi-real time data, courtesy of this timer
    // TODO: Fix scoping of current page variable to fetch pages in order
    Meteor.setInterval(function(){
      console.log('Fetching Offers Page ',currentPage);

      // TODO: Fix grouping of offer names. Most likely, the cause is the offer_id which can't be grouped`
      var results = AnyTV.data('hasOffers').Report('getStats',{
        fields : ['Stat.offer_id','Offer.name','Stat.clicks','Stat.conversions','Stat.currency','Stat.payout'],
        sort : 'Offer.name',
        groups : ['Offer.name'],
        page : currentPage
      });

      // Check if offers data failed, and if so, skip
      if(results.status === -1) return;

      // Update the counts
      if(pageCount === -1) pageCount = results.data.pageCount;
      if(itemCount === -1) itemCount = results.data.count;

      var offer;
      var offerEntry;
      var offers = results.data.data;
      var offerIndex = 0;
      var offerLength = offers.length;

      // Add to collection the data fetched
      for(var offerIndex = 0; offerIndex < offerLength; ++offerIndex){
        offer = offers[offerIndex];

        // Generate the offer entry
        offerEntry = {
          offer_id    : offer.Stat.offer_id, 
          name        : offer.Offer.name,
          clicks      : parseInt(offer.Stat.clicks), 
          conversions : parseInt(offer.Stat.conversions), 
          payout      : parseInt(offer.Stat.payout), 
          currency    : offer.Stat.currency
        };

        // Upsert - update existing with given offer_id, or insert
        Games.upsert(
          {offer_id : offerEntry.offer_id},
          offerEntry
        );

      }

      // Increment, and when end is reached, reset
      if(++currentPage > pageCount) currentPage = 1;
    },2000);

  }());




  
  Videos.remove({});
  Meteor.publish('videos', function(){
    return Videos.find();
  })


  if(AnyTV.data('YouTube')){
    Meteor.setInterval(function(){
      var results = AnyTV.data('YouTube').Report('getChannelInfo',{
        part : ['statistics','contentDetails','snippet'],
        forUsername: 'pewdiepie'
      });

      //console.log(results.data.items[0].snippet.title);

      var channel_id = results.data.items[0].id;
      var title = results.data.items[0].snippet.title;
      var views = results.data.items[0].statistics.viewCount;
      var comments = results.data.items[0].statistics.commentCount;
      var subscribers = results.data.items[0].statistics.subscriberCount;
      var videos = results.data.items[0].statistics.videoCount;

      if(Videos.find({channel_id:channel_id}).count() === 0){
        console.log('vids in');
        Videos.insert({channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos});
      }else{
        var id = Videos.findOne({channel_id:channel_id})._id;
        Videos.update({_id:id},{$set:{channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos}});
      }
    }, 2000);

     Meteor.setInterval(function(){
      var results = AnyTV.data('YouTube').Report('getChannelInfo',{
        part : ['statistics','contentDetails','snippet'],
        forUsername: 'DevDiaryOnanyTV'
      });

      //console.log(results.data.items[0].snippet.title);

      var channel_id = results.data.items[0].id;
      var title = results.data.items[0].snippet.title;
      var views = results.data.items[0].statistics.viewCount;
      var comments = results.data.items[0].statistics.commentCount;
      var subscribers = results.data.items[0].statistics.subscriberCount;
      var videos = results.data.items[0].statistics.videoCount;

      if(Videos.find({channel_id:channel_id}).count() === 0){
        console.log('vids in');
        Videos.insert({channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos});
      }else{
        var id = Videos.findOne({channel_id:channel_id})._id;
        Videos.update({_id:id},{$set:{channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos}});
      }
    }, 2000);

     Meteor.setInterval(function(){
      var results = AnyTV.data('YouTube').Report('getChannelInfo',{
        part : ['statistics','contentDetails','snippet'],
        forUsername: 'RayWilliamJohnson'
      });

      //console.log(results.data.items[0].snippet.title);

      var channel_id = results.data.items[0].id;
      var title = results.data.items[0].snippet.title;
      var views = results.data.items[0].statistics.viewCount;
      var comments = results.data.items[0].statistics.commentCount;
      var subscribers = results.data.items[0].statistics.subscriberCount;
      var videos = results.data.items[0].statistics.videoCount;

      if(Videos.find({channel_id:channel_id}).count() === 0){
        console.log('vids in');
        Videos.insert({channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos});
      }else{
        var id = Videos.findOne({channel_id:channel_id})._id;
        Videos.update({_id:id},{$set:{channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos}});
      }
    }, 2000);

     Meteor.setInterval(function(){
      var results = AnyTV.data('YouTube').Report('getChannelInfo',{
        part : ['statistics','contentDetails','snippet'],
        forUsername: 'smosh'
      });

      //console.log(results.data.items[0].snippet.title);

      var channel_id = results.data.items[0].id;
      var title = results.data.items[0].snippet.title;
      var views = results.data.items[0].statistics.viewCount;
      var comments = results.data.items[0].statistics.commentCount;
      var subscribers = results.data.items[0].statistics.subscriberCount;
      var videos = results.data.items[0].statistics.videoCount;

      if(Videos.find({channel_id:channel_id}).count() === 0){
        console.log('vids in');
        Videos.insert({channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos});
      }else{
        var id = Videos.findOne({channel_id:channel_id})._id;
        Videos.update({_id:id},{$set:{channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos}});
      }
    }, 2000);  
  }
});