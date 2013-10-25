Template.register.events({
  'ready document' : function(event){
    console.log('test')
  },
  'submit #registration' : function(event){
    event.preventDefault();

    // Grab the
    var uncheckedCredentials = $(event.currentTarget).serializeObject();

    // Validate input

    // Omit unnecessary properties
    var userCredentials = _.omit(uncheckedCredentials,'agree');

    // Create the user
    Accounts.createUser(userCredentials,function(error){
      if(!error){
        Router.go('/');
        console.log('user created');
      } else {
        console.log('failed to create user')
      }
    });
  }
});