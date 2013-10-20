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

  // Has Offers
  this.route('hasoffers');
  this.route('hasoffers', {
    path: '/hasoffers',
    template: 'hasoffers'
  });

  // Youtube
  this.route('youtube');
  this.route('youtube', {
    path: '/youtube',
    template: 'youtube'
  });
});

