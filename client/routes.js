Router.configure({
  // Using layout template as base for all templates
  layout: 'layout',
  // Defaultly render sections to specified yields
  renderTemplates : {
    topnav : {to: 'topnav'},
    userbar : {to: 'userbar'}
  }
});

// Required login router
ControllerRequiredLogin = RouteController.extend({
  before : function(){
    // Redirect to home when logged in
    if (!Meteor.user()) Router.go('/login');
  }
});

// Not visible to login
ControlledInvisibleToLogin = RouteController.extend({
  before : function(){
    // Redirect to home when logged in
    if (!!Meteor.user()) Router.go('/');
  }
});

Router.map(function() {

  // Routing / and /home to home template
  this.route('home');
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('hasoffers');
  this.route('youtube');  

  this.route('login',{
    controller : ControlledInvisibleToLogin
  });
  this.route('register',{
    controller : ControlledInvisibleToLogin
  });
  this.route('account',{
    controller : ControllerRequiredLogin
  });

});

