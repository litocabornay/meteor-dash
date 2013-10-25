Template.userbar.isLoggedIn = function(){
  return !!Meteor.user();
}

Template.userbar.events({
  'click a[href="/logout"]' : function(event){
    event.preventDefault();
    Meteor.logout(function(error){
      if(!error) Router.go('/');
      else console.log('Failed to logout');
    });
  }
});