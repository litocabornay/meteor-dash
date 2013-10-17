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

Tinytest.add('AnyTV API - data()', function (test) {

  test.isTrue(!!AnyTV.data,'data() should exist');

  test.isUndefined(AnyTV._cache._data,'The data cache should not exist here yet');

  AnyTV.data();
  test.isTrue(!!AnyTV._cache._data,'The data cache should now exist');

  var sampleString = 'foo';
  var sampleObject = {'foo':'bar'};  

  test.isUndefined(AnyTV.data('sample'),'Non-existent items should be undefined');

  AnyTV.data('sample',sampleString);
  test.equal(AnyTV.data('sample'),'foo',"Should be equal to expeced string");

  AnyTV.data('sample',sampleObject);
  test.equal(AnyTV.data('sample'),sampleObject,"Should be the same object.");
  test.equal(AnyTV.data('sample').foo,'bar',"Should contain the same value.");


});