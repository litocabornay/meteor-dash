Template.login.events({
  'submit #login' : function(event){
    event.preventDefault();

    var login = $(event.currentTarget).serializeObject();

    Meteor.loginWithPassword(login.username,login.password,function(error){
      if(!error){
        Router.go('/')
      } else {
        console.log('failed to login');
        console.log(error)
      }
    });

    console.log(login);
  }
});