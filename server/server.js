console.log("Server code speaking");

/*SAMPLE API CALLS*/

// Create a "bridge" to the Has Offers API
var hasOffers = new HasOffersAPI('https://api.hasoffers.com/Api',{
  NetworkToken : 'NETjE4MoLg7NarETCDruHecVmgLHbN',
  NetworkId : 'mmotm'
})

// Try doing a login (should fail)
var login = hasOffers.findUserByCredentials({
  email     : 'poi@yahoo.com',
  password  : 'poi',
  type      : 'affiliate_user'
});

// Watch console
console.log(login);

// Try grabbing data
var stats = hasOffers.getStats({
  fields  : ['Stat.clicks','Stat.conversions','Stat.currency','Stat.payout'],
  sort    : 'Offer.name',
  groups  : ['Offer.name'],
  totals  : 1,
  limit   : 10
});

// Watch console
console.log(JSON.stringify(stats));

// Try getting the referrals
var referrals = hasOffers.getReferrals({
  fields  : ['Stat.url','Stat.source','Stat.clicks','Stat.conversions','Offer.name'],
  groups  : ['Stat.url'],
  totals  : 1,
  limit   : 10
});

// There should be a bunch of links
console.log(JSON.stringify(referrals));