Tinytest.add('YouTube - Existence Test', function (test) {
  
  test.isNotNull(AnyTV.Data.YouTube,'YouTube should be defined under AnyTV.Data');
  test.equal(typeof AnyTV.Data.YouTube,'function','YouTube should be a function');

});
