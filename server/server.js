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
    (function looper(i){
      console.log('[',i,'] Fetching Offers');

      // Asynchronous API call
      // This means the code after the entire looper block can run while waiting for the request
      mmotm.Report.getStats({
        fields : ['Stat.clicks','Stat.conversions','Stat.payout','Stat.currency','Offer.name'],
        sort : 'Offer.name',
        groups : ['Offer.name'],
        totals : 1,
        limit : 1000000
      },function(error,requestDetails){

        // Schedule another request when available. That way, the request happens
        // while we are doing something else. Parallel at its best!
        // TODO: Find a way to use setImmediate() in meteor instead. Much more optimal.
        Meteor.setTimeout(function(){
          looper(i+1);
        },0);


        // If data is no good, return
        var results = requestDetails.data.response;
        if(!~results.status) return;

        // If data is good, then proceed
        console.log('[',i,'] Has Offers game data received');

        // NOTE: There will be 100% CPU usage on first load. When everything
        // is loaded, updates happen *per change only*. This reduces CPU load
        // by 25%, according to my CPU monitor

        // Update totals only when the totals have changed to avoid client update
        console.log('[',i,'] Parsing game totals');
        results.data.totals.Stat.foo = 'bar';
        if(!GameTotals.find(results.data.totals.Stat).count()){
          console.log('[',i,'] Updated Game Totals');
          GameTotals.upsert({foo : 'bar'},results.data.totals.Stat,function(){
            // TODO: Think of something to do when the callback happens, like an error check
          });
        }

        // Update game data only when the game data has changed
        console.log('[',i,'] Parsing game offers');
        (function gamesUpserter(data,index,objects){
          // Async recursion, so that the entire looping of the data
          // does not block other routines.


          // Deym Has offers returns numbers as strings. Not very scalable.
          data.Stat.clicks = parseInt(data.Stat.clicks);
          data.Stat.conversions = parseInt(data.Stat.conversions);
          data.Stat.payout = parseInt(data.Stat.payout);

          if(!Games.find(data).count()){
            console.log('[',i,'] Updated Game Offer: ', data.Offer.name);

            Games.upsert({'Offer.id' : data.Offer.id},data,function(){
              // TODO: Think of something to do when the callback happens, like an error check
            });
          }

          // Queue an immediate call for the next upsert
          Meteor.setTimeout(function(){
            if(++index >= objects.length) return;
            gamesUpserter(objects[index],index,objects)
          },0);
        }(results.data.data[0],0,results.data.data));

      });

    }(1));
  }());


  // YouTube block
  (function(){

    //Videos.remove({});
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
  });

  
});