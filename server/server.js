console.log("Server code speaking");

Meteor.startup(function(){

  

  // Has Offers block
  (function(){

    // Wipe data
    // TODO: Remove during production to avoid collection wipe
    Games.remove({});
    GameTotals.remove({});

    // Publish the collections
    Meteor.publish("games", function(){return Games.find();});
    Meteor.publish("gametotals", function(){return GameTotals.find();}); 

    // If AnyTV Has Offers data source or an instance of mmotm bridge doesn't exist, exit
    if(!AnyTV.Data.HasOffers || !(mmotm = AnyTV.Data.HasOffers.getInstance('mmotm'))) return;

    // Async, timed loop so we don't block the other requests
    (function looper(){
      console.log('Fetching Offers');

      // Request for data
      mmotm.Report.getStats({
        fields : ['Stat.clicks','Stat.conversions','Stat.payout','Stat.currency','Offer.name'],
        sort : 'Offer.name',
        groups : ['Offer.name'],
        totals : 1,
        limit : 1000000
      },function(error,requestDetails){

        // Schedule another rerun in a few seconds
        Meteor.setTimeout(looper,5000);

        // If data is no good, return
        var results = requestDetails.data.response;
        if(!~results.status) return;

        // If data is good, then proceed
        console.log('Has Offers game data received');

        // Update totals
        // TODO: Convert to async
        console.log('Parsing game totals');
        // Inject foo as an id so we can upsert the object instead
        results.data.totals.Stat.foo = 'bar';
        GameTotals.upsert({foo : 'bar'},results.data.totals.Stat);

        // Update game data
        // TODO: convert to async
        console.log('Parsing game offers');
        results.data.data.forEach(function(data,index,objects){

          // Deym Has offers returns numbers as strings. Not very scalable.
          data.Stat.clicks = parseInt(data.Stat.clicks);
          data.Stat.conversions = parseInt(data.Stat.conversions);
          data.Stat.payout = parseInt(data.Stat.payout);

          Games.upsert({'Offer.id' : data.Offer.id},data);
        });


      });

    }());
  }());


  // YouTube block
  (function(){

    Videos.remove({});
    Meteor.publish("videos", function(){
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
  }());

  
});