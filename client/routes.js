Router.configure({
  // Using layout template as base for all templates
  layout: 'layout',
  // Defaultly render sections to specified yields
  renderTemplates : {
    navbar : {to: 'navbar'}
  }
});

Router.map(function() {

  // Routing / and /home to home template
  this.route('home');
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('register')
  this.route('hasoffers');
  this.route('youtube');
  this.route('login');  
});

