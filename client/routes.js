Router.configure({
  layout: 'layout'
});

Router.map(function() {

  // Routing / and /home to home template
  this.route('home');
  this.route('home', {
    path: '/',
    template: 'home'
  });

  // Has Offers
  this.route('hasoffers');

});

