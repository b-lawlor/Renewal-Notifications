function getUpdatedExpirationDates() {
  // gets updated expiration dates for patrons who have been notified
  // adds the current expiration date to the Google Sheet
  // adjust the ranges 'D2:D' and 'G2:G' to only check
  var token = getToken_();
  var url;
  var fields = '?fields=expirationDate';
  var ids = notificationsSheet.getRange('D2:D').getValues();
  var expirationDates = [];
  for(i in ids){
    url = 'https://LIBRARY.DOMAIN/iii/sierra-api/v5/patrons/' + ids[i][0].toString() + fields;
    patron = apiGet(token, url);
    expirationDates.push([patron.expirationDate]);
  }
  notificationsSheet.getRange('G2:G').setValues(expirationDates);
}