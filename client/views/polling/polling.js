Template.hasoffers.list = function(){
	return Games.find({},{sort:{clicks:-1}});
}

Template.hasoffers.totals = function(){
	return Gametotals.find();
}

Template.youtube.list = function(){
	return Videos.find({}, {sort:{views:-1}});
}