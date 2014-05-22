
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
  var match = new models.Match({"uid1": "10152423734788293", "uid2": "33333333", "recommender": "hello", "numRecs": 5});
  match.save(function(err, proj) {
    if(err) console.log(err);
    console.log("done3");
    var not = new models.Notification({"uid": "10152423734788293", "type": "match", "seen": false})
    not.save(function(err, proj) {
      if(err) console.log(err);
      console.log("done4");
      mongoose.connection.close();
    });
  });
}