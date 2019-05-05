var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('storage.sqlite');
 
db.serialize(function() {
  db.each("SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'", function(err, row) {
    if (err) {
      console.error(err);
    } else {
      console.log(row);
    }
  });
});
 
db.close();