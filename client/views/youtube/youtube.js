Template.youtube.list = function(){
	return Videos.find({}, {sort:{views:-1}});
}