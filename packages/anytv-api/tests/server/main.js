Tinytest.add('AnyTV API - Existence test', function (test) {
  
  test.isTrue(!!AnyTV,'AnyTV should be defined on the server');
  test.equal(typeof AnyTV, 'object', 'AnyTV should be an object');

});


Tinytest.add('AnyTV API - extend()', function (test) {

  test.isTrue(!!AnyTV.extend,'extend() should exist');
  
  test.equal(AnyTV.extend(),AnyTV,'Should be equal to the base object');

  AnyTV.extend('Foo.Bar');
  test.equal(typeof AnyTV.Foo, 'object', 'Should be the namespace Foo');
  test.equal(typeof AnyTV.Foo.Bar, 'object', 'Should be the namespace Foo');

  AnyTV.extend('Foo.Bar');
  test.equal(typeof AnyTV.Foo, 'object', 'Should be the namespace Foo');
  test.equal(typeof AnyTV.Foo.Bar, 'object', 'Should be the namespace Foo');

  var someObject = {};
  AnyTV.extend(someObject,'Foo.Bar').baz = function(){return 'baz'};
  test.equal(typeof someObject.Foo.Bar.baz, 'function', 'Should extend someObject with Foo.Bar and add baz function');
  test.isUndefined(AnyTV.Foo.Bar.baz,'The base object should not be extended');

  AnyTV.extend(someObject,'Foo.Bar').bam = function(){return 'bam'};
  test.isTrue(!!someObject.Foo.Bar.bam,'bam should now be appended');
  test.isTrue(!!someObject.Foo.Bar.baz,'baz extended earlier should still exist');

  test.equal(someObject.Foo.Bar.baz(),'baz','Should output baz');
  test.equal(someObject.Foo.Bar.bam(),'bam','Should output bam');

});