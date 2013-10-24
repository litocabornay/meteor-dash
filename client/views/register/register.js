Template.register.events({
  'submit #registration' : function(event){
    event.preventDefault();

    var login = $(event.currentTarget).serializeObject();

    console.log(login);
  }
});