var Mongoose = require('mongoose');


var MatchSchema = new Mongoose.Schema({
	"uid1": String,
	"uid2": String, 
	"recommenders": String,
	"numRecs": Number
});

exports.Match = Mongoose.model('Match', MatchSchema);
