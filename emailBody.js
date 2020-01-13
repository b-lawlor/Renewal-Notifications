function getPlainBody(name, library, date){
    var body = "Hi " + name + ",\n\n" + "This is a courtesy message from CLAMS to let you know your " + library + " card needs to be renewed before " + date
                + ".\n\nWe don't want you to miss out on any of your favorite books, ebooks, or DVDs. "
                + "\nPlease contact " + library + " or any CLAMS library convenient to you to update your account.\nCLAMS member libraries' locations and hours can be found "
                + "at the following link:\nhttps://library.clamsnet.org/screens/libinfo.html\n\nThank you for supporting CLAMS libraries";

  return body;
}

function getHtmlBody(name, library, date){
    var body = "Hi " + name + ",<br><br>" + "This is a courtesy message from CLAMS to let you know your " + library + " card needs to be renewed before " + date
                + ".<br><br>We don't want you to miss out on any of your favorite books, ebooks, or DVDs. "
                + "<br>Please contact " + library + " or any CLAMS library convenient to you to update your account.<br>CLAMS member libraries' locations and hours can be found "
                + "on <a href=\"https://library.clamsnet.org/screens/libinfo.html\">our website.</a><p>Thank you for supporting CLAMS libraries</p>";

  return body
}