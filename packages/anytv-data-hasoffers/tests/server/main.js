Tinytest.add('Has Offers - Existence Test', function (test) {
  
  test.isNotNull(AnyTV.Data.HasOffers,'Has Offers should be defined under AnyTV.Data');
  test.equal(typeof AnyTV.Data.HasOffers,'function','Has Offers should be a function');

});
