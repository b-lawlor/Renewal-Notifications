//adapted from: https://www.innovativeusers.org/forum/sierra-millennium-encore/12970-google-sheets-and-automatic-data-population-with-create-lists-query

function getToken_(key, secret) {
  var key = "YOUR SIERRA API KEY HERE";
  var secret = "YOUR SUPER SECRET API SECRET ";
  var getTokenUrl =  "https://LIBRARY.DOMAIN/iii/sierra-api/v5/token";
  
  var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(key + ":" + secret),
    "Content-Type" :  "application/x-www-form-urlencoded"
  };

    var payload = {
      "grant_type" : "client_credentials"
  };

  var params = {
    "method" : "POST",
    "headers" : headers,
    "payload" : "grant_type=client_credentials",
    "muteHttpExceptions" : true
  };
 
  var response = UrlFetchApp.fetch(getTokenUrl, params);
  var token = JSON.parse(response.getContentText())["access_token"];
  return token;
}