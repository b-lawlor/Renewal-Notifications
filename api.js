function apiGet(token, url) {
  // use the http GET method to get data from the api
  var headers = {
    "Authorization" : "Bearer " + token,
    "Content-Type" :  "application/x-www-form-urlencoded"
  };

  var params = {
    "method" : "GET",
    "headers" : headers,
  };
  
  var response = UrlFetchApp.fetch(url, params);
  var headers = response.getAllHeaders();
  var body = JSON.parse(response.getContentText());

  return body;
}

function apiPost(token, url, query) {
  // use the http POST method with a JSON query as the paylod to query for records
  var headers = {
    "Authorization" : "Bearer " + token,
    "Content-Type" :  "application/json"
  };
  
  var params = {
    "method" : "POST",
    "headers" : headers,
    "payload" : JSON.stringify(query),
  };
 
  var request = UrlFetchApp.getRequest(url, params);
  var response = UrlFetchApp.fetch(url, params);
  var headers = response.getAllHeaders();
  var text = response.getContentText();
  var body = JSON.parse(response.getContentText());
  var links = [];
  for (var i = 0; i < body.total; i++) {
    links.push(body.entries[i].link);
  }
  return links;
}

function apiPut(token, url, patch) {
  // use the http PUT method to patch or update records
  var headers = {
    "Authorization" : "Bearer " + token,
    "Content-Type" :  "application/json"
  };
  
  var params = {
    "method" : "PUT",
    "headers" : headers,
    "payload" : JSON.stringify(patch),
  };
 
  var response = UrlFetchApp.fetch(url, params);
  return response.getResponseCode();
}