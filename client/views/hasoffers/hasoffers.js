Template.hasoffers.list = function(){
  return Games.find({},{
    sort: {name:1}
    //sort: {clicks:-1,name:-1}
  });
}

Template.hasoffers.totals = function(){
  return Gametotals.find();
}