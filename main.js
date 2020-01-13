// set up a Google Sheet for collecting notification statistics
// ss = SpreadsheetApp.openById('YOUR GOOGLE SHEET ID HERE');
// notificationsSheet = ss.getSheetByName('notifications');  // you must have a sheet with a matching name

function main() {
  // get authentication token, url and json query and make a POST request to /v5/patrons/query
  var token = getToken_();
  var url = "https://LIBRARY.DOMAIN/iii/sierra-api/v5/patrons/query?offset=0&limit=3"; // set low limit for testing
  var expirationDate = getExpirationDate(30);
  var query = getQuery(expirationDate);
  var patronUrls = apiPost(token, url, query);  // returns an array of urls with patron record numbers

  var patronFields = "?fields=names%2Cemails%2ChomeLibraryCode%2CpatronType%2CvarFields%2CexpirationDate";  // patron record fields to retrieve
  var locations = getLocations(token);  // returns object with pickup location key value pairs {"code": "name"}
  var patron, library;

  for(i in patronUrls) {
    patron = apiGet(token, patronUrls[i] + patronFields);  // make a GET request for each patron that the query returned
    // example of using a conditional to further refine your query: skip 4c patrons and temporary vh patrons 
    if( (patron.patronType === 189 && /vh*/i.test(patron.homeLibraryCode)) || /4C*/i.test(patron.homeLibraryCode) ) {
      //Logger.log("skipping temp patron for "  + patron.homeLibraryCode + patronUrls[i]);
    }
    else {
      library = locations[patron.homeLibraryCode.substring(0,2)];
      sendNotification(patron, library, expirationDate);
      // uncomment if you set up a Google sheet to log a record of email notifications
      //notificationsSheet.appendRow([new Date().toISOString().split('T')[0], patron.homeLibraryCode, patron.patronType, patron.id, patron.expirationDate]);
      // uncomment if you want to add a note to the patron record
      //addPatronNote(token, patronUrls[i], patron);
    }
  }
}

function sendNotification(patron, library, date) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  date = new Date(date).toLocaleDateString("en", options);  // format date for humans
  var supportEmail = "support@LIBRAY.DOMAIN";
  var testEmail = "you@LIBRARY.DOMAIN";

  try {
    var name = patron.names[0].split(", ")[1].split(" ")[0].toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  catch(error) {
    GmailApp.sendEmail(supportEmail, error, patron.names);  // send errors to your helpdesk
    name = patron.names[0];
  }

  var subject = "It's Time to Renew Your CLAMS Library Card";
  var body = getPlainBody(name, library, date);
  var options = { "noReply": true, "htmlBody": getHtmlBody(name, library, date) }
  
  Logger.log([patron.emails[0], patron.homeLibraryCode, patron.patronType, subject, body]);  // log to console for testing
  try {
      // send email to yourself for testing
      GmailApp.sendEmail(testEmail, subject, body, options);
      // uncomment to send emails to patrons
      //GmailApp.sendEmail(patron.emails[0], subject, body, options);
  }
  catch(error) {
      GmailApp.sendEmail(supportEmail, error, patron.emails[0]); // send errors to your helpdesk
  }
}

function getLocations(token) {
  // get pickup locations from Sierra Admin->Parameters->Circulation->Hold Pickup Locations
  var loc = apiGet(token, "https://LIBRARY.DOMAIN/iii/sierra-api/v5/branches/pickupLocations");
  var locations= {};
  for(l in loc) {
    locations[loc[l].code.substring(0,2)] = loc[l].name;
  }

  return locations;
}

function getExpirationDate(offset) {
  var date = new Date(); // Now
  date.setDate(date.getDate() + offset);  // Set now + offset days as the new date
  date = date.toISOString().split('T')[0];  // format as yyyy-mm-dd
  
  return date;
}

function addPatronNote(token, url, patron){
  var date = new Date().toISOString().split('T')[0]; //format as yyyy-mm-dd;
  var patch = {};
  // copy all var fields and push the new note so that you don't overwrite the record's var fields
  patch.varFields = patron.varFields;
  patch.varFields.push( { "fieldTag": "x", "content": "Renewal Notification sent " + date + " cl/sys"} );
  var response = apiPut(token, url, patch);
}