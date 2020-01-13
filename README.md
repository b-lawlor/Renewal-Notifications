Google Apps Script project that uses Sierra API to send patrons notification e-mails. Created by Brendan Lawlor for test purposes only. Use at your own risk. Not supported by CLAMS.

# Quickstart

## Install Node.js
https://nodejs.org/en/download/

## Install clasp
```
npm install @google/clasp -g
```

## Enable the Google Apps Script API
https://script.google.com/home/usersettings

## Clone this Repo
```
git clone https://github.com/b-lawlor/Renewal-Notifications
```

## Create a new Apps Script Project
```
cd Renewal-Notifications
clasp login
clasp create --title "Renewal Notifications"
```
**choose standalone**
```
clasp push
clasp open
```

## Edit Apps Script Code

In auth.gs:
```
getToken_()
    var key = "YOUR SIERRA API KEY";
    var secret = "YOUR SUPER SECRET API SECRET";
    var getTokenUrl = "https://LIBRARY.DOMAIN/iii/sierra-api/v5/token";
```

In main.gs:
```
main()
    var url = "https://LIBRARY.DOMAIN/iii/sierra-api/v5/patrons/query?offset=0&limit=3"; // set low limit for test

sendNotifications()
    var supportEmail = "support@LIBRAY.DOMAIN"
    var testEmail = "you@LIBRARY.DOMAIN"
    // uncomment to send emails to patrons
    //GmailApp.sendEmail(patron.emails[0], subject, body, options);

getLocations()
    var loc = apiGet(token, "https://LIBRARY.DOMAIN/iii/sierra-api/v5/branches/pickupLocations");
```

In emailBody.gs:
```
getPlainBody()
    var body = "notification plain text"
getHtmlBody()
    var body = "notification with html markup"
```

## authorize the script
1. Run-> Run function -> main
2. Click Allow


## add a trigger

1. Edit-> Current project's triggers
2. "+" Add Trigger
3. Choose which function to run: **main**
4. Choose which deployment to run: **Head**
5. Select event source: **Time-driven**
6. Select type of time based trigger: **Day timer**
7. Select time of day: **9am to 10am**

