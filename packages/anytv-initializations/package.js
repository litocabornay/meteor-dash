// Package Description
Package.describe({
  summary: "AnyTV Initializations"
});

// Package use body
Package.on_use(function (api) {
  
  // Server-side initializations
  api.use([
    'anytv-api',
    'anytv-data-hasoffers',
    'anytv-data-youtube'
  ],'server');

  api.add_files([
    'lib/server-initializations.js'
  ],'server');

  // Client-side initializations
  api.add_files([
    'lib/client-initializations.js'
  ],'client');

});