// Package Description
Package.describe({
  summary: "AnyTV Has Offers Package"
});

// Package use body
Package.on_use(function (api) {

  //Add NPM dependencies
  Npm.depends({
    jquery : '1.8.3'
  });

  //Add other package dependencies
  api.use([
    'jquery',
    'underscore'
  ],['client','server']);

  //Add package files in the order of dependence (similar to <script>)
  api.add_files([
    'lib/hasoffers.js'
  ],'server'); // Can be 'server', 'client' , ['client','server']

  //Only expose the My constructor, only export if meteor > 6.5
  if (typeof api.export !== 'undefined') {
    api.export([
      'HasOffersAPI'
    ],'server'); // Can be 'server', 'client' , ['client','server']
  }
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