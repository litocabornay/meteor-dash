console.log("Server code speaking");

// Wondering where the value for AnyTV.data('hasOffers') comes from?
// Check out packages/anytv-initializations package

// Check if it is in the AnyTV storage (or maybe create one)
if(AnyTV.data('hasOffers')){

  // You can immediately fetch and chain
  var results = AnyTV.data('hasOffers').getStats({
    fields : ['Stat.clicks','Stat.conversions','Stat.currency','Stat.payout'],
    sort : 'Offer.name',
    groups : ['Offer.name'],
    totals : 1,
    limit : 10
  });

  // We should get some results
  console.log(results);

}