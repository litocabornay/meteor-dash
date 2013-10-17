Tinytest.add('AnyTV API - Non-existence test', function (test) {
  
  test.isUndefined(window.AnyTV,'AnyTV should NOT be defined on the client');

});
