Template.hasoffers.Games = function(){
  return Games.find({},{
    sort: {'Stat.clicks':-1,'Offer.name':-1}
  });
}

Template.hasoffers.GameTotals = function(){
  return GameTotals.find();
}