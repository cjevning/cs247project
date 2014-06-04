
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_name = 'cs247project';
var local_uri  = 'mongodb://localhost/' + local_name
var database_uri = process.env.MONGOLAB_URI || local_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data

// Step 2: Remove all existing documents
models.Match
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);
  models.NoMatch
    .find()
    .remove()
    .exec(onceClear2);
  console.log("done1");
}

function onceClear2(err) {
  if(err) console.log(err);
  models.Notification
    .find()
    .remove()
    .exec(onceClear3);
  console.log("done2"); 
}

function onceClear3(err) {
  var match2 = new models.Match({"uid1": "2415271352488", "uid2": "696436097061985", "recommenders": "Jordan Shelton,Aubriana Menendez,Victoria Smith,Joe Lee,Helena Scutt", "numRecs": 5});
  match2.save(function(err, proj) {
    var match3 = new models.Match({"uid1": "2415271352488", "uid2": "637148899698075", "recommenders": "hello,hi,conner,kennan,jordan", "numRecs": 5});
    match3.save(function(err, proj) {
      var match4 = new models.Match({"uid1": "2415271352488", "uid2": "10152002738066150", "recommenders": "hello,hi,conner,kennan,jordan", "numRecs": 5});
      match4.save(function(err, proj) {

        var match5 = new models.Match({"uid1": "10203898213240590", "uid2": "10152435644103676", "recommenders": "Kennan,Aubriana Menendez,Victoria Smith,Joe Lee,Helena Scutt", "numRecs": 5});
  match5.save(function(err, proj) {

        var match6 = new models.Match({"uid1": "696436097061985", "uid2": "10152435644103676", "recommenders": "Kennan Murphy,John Treat,Victoria Smith,Joe Lee,Helena Scutt", "numRecs": 5});
  match6.save(function(err, proj) {
          var match = new models.Match({"uid1": "10152423734788293", "uid2": "696436097061985", "recommenders": "hello,hi,conner,kennan,jordan", "numRecs": 5});

          match.save(function(err, proj) {
          if(err) console.log(err);
          console.log("done3");
          var not = new models.Notification({"uid": "2415271352488", "type": "message", "seen": false, "from": "637148899698075"})
          not.save(function(err, proj) {
            if(err) console.log(err);
            console.log("done4");
            mongoose.connection.close();
          });
        });
      });
    });
  });
  });
  });
}