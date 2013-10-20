console.log("Server code speaking");

// Wondering where the value for AnyTV.data('hasOffers') comes from?
// Check out packages/anytv-initializations package

// // Check if it is in the AnyTV storage (or maybe create one)
// if(AnyTV.data('hasOffers')){

//   // You can immediately fetch and chain
//   var results = AnyTV.data('hasOffers').Report('getStats',{
//     fields : ['Stat.clicks','Stat.conversions','Stat.currency','Stat.payout','Offer.name'],
//     sort : 'Offer.name',
//     groups : ['Offer.name'],
//     totals : 1,
//     limit : 1000000
//   });

//   // We should get some results
//   console.log(results);

// }


Meteor.startup(function(){
  
  Games.remove({});
  
  Gametotals.remove({});
  
  Videos.remove({});

  Meteor.publish("games", function(){
    return Games.find();
  });
  Meteor.publish("gametotals", function(){
    return Gametotals.find();
  })
  Meteor.publish("videos", function(){
    return Videos.find();
  })

  if(AnyTV.data('hasOffers')){
    Meteor.setInterval(function(){

      var results = AnyTV.data('hasOffers').Report('getStats',{
        fields : ['Stat.clicks','Stat.conversions','Stat.currency','Stat.payout','Offer.name'],
        sort : 'Offer.name',
        groups : ['Offer.name'],
        totals : 1,
        limit : 1000000
      });

      var totalclicks = parseInt(results.data.totals.Stat.clicks);
      var totalconversions = parseInt(results.data.totals.Stat.conversions);
      var totalpayout = parseInt(results.data.totals.Stat.payout);
      var totalcurrency = "USD";
      if(Gametotals.find().count() === 0){
        Gametotals.insert({clicks: totalclicks, conversions: totalconversions, payout: totalpayout, currency: totalcurrency});
      }else{
        var id = Gametotals.findOne()._id;
          Gametotals.update({_id:id},{$set:{clicks: totalclicks, conversions: totalconversions, payout: totalpayout, currency: totalcurrency}});
      }

      for (var key in results.data.data) {
        if (results.data.data.hasOwnProperty(key)) {
          var offer_id = parseInt(results.data.data[key].Offer.id);
          var clicks = parseInt(results.data.data[key].Stat.clicks);
          var conversions = parseInt(results.data.data[key].Stat.conversions);
          var payout = parseInt(results.data.data[key].Stat.payout);
          var currency = results.data.data[key].Stat.currency;
          var name = results.data.data[key].Offer.name;
          if(Games.find({offer_id:offer_id}).count() === 0 ){
            Games.insert({offer_id: offer_id, clicks: clicks, conversions: conversions, payout: payout, currency: currency, name: name});
          }else{
            var id = Games.findOne({offer_id:offer_id})._id;
            Games.update({_id:id},{$set:{offer_id: offer_id, clicks: clicks, conversions: conversions, payout: payout, currency: currency, name: name}});
          }
        }
      }
    }, 2000);
  }


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
        console.log("vids in");
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
        console.log("vids in");
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
        console.log("vids in");
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
        console.log("vids in");
        Videos.insert({channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos});
      }else{
        var id = Videos.findOne({channel_id:channel_id})._id;
        Videos.update({_id:id},{$set:{channel_id:channel_id,title:title,views:views,comments:comments,subscribers:subscribers,videos:videos}});
      }
    }, 2000);  
  }
});