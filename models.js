var Mongoose = require('mongoose');


var MatchSchema = new Mongoose.Schema({
	"uid1": String,
	"uid2": String, 
	"recommenders": String,
	"numRecs": Number
});

var NoMatchSchema = new Mongoose.Schema({
	"uid1": String,
	"uid2": String, 
	"recommender": String,
});

exports.Match = Mongoose.model('Match', MatchSchema);
exports.NoMatch = Mongoose.model('NoMatch', NoMatchSchema);
