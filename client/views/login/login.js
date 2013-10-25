Template.login.events({
  'submit #login' : function(event){
    event.preventDefault();

    var login = $(event.currentTarget).serializeObject();

    console.log(login);
  }
});