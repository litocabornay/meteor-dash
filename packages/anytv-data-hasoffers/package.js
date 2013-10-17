// Package Description
Package.describe({
  summary: "AnyTV Has Offers Package"
});

// Package use body
Package.on_use(function (api) {
  
  //Add other package dependencies
  api.use([
    'jquery',
    'underscore',
    'anytv-api'
  ],['client','server']);

  //Add package files in the order of dependence (similar to <script>)
  api.add_files([
    'lib/hasoffers.js'
  ],'server'); // Can be 'server', 'client' , ['client','server']

  // Nothing exported here because the library registers itself
});

// Package test body
Package.on_test(function (api) {

  //Add other package dependencies
  api.use([
    'jquery',
    'underscore',
    'tinytest',
    'anytv-data-hasoffers'
  ],['client','server']);

  // Client-server tests
  api.add_files([
    'tests/main.js',
  ], ['client','server']);

  // Client-side tests
  api.add_files([
    'tests/client/main.js',
  ], 'client');

  // Server-side tests
  api.add_files([
    'tests/server/main.js',
  ], 'server');
});