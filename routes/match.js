var models = require('../models');

exports.match = function(req,res)
{
	req.session.uid = req.params.uid;
	res.render('match');
}

exports.addTo = function(req, res) {
	console.log("hi");
	var m = models.Match.find().exec(addToArray2);
      function addToArray2(err, toAdd2) {
      	if(err) console.log(err);
        console.log(toAdd2);
      }
     console.log("hi2");
	var uid1 = req.params.uid1;
	var uid2 = req.params.uid2;
	var rec = req.params.recommender;
	console.log("hi2.5");
	var l = models.Match.find({"uid1": uid1, "uid2": uid2}).exec(addToArray);
	function addToArray(err, toAdd) {
		console.log("hi3");
		if(err) console.log(err);
		if (toAdd[0]) {
			var recs = toAdd[0].recommenders;
			var oldNum = toAdd[0].numRecs;
			toAdd[0].recommenders = recs + "," + rec;
			toAdd[0].numRecs = oldNum++;
			toAdd[0].save(afterS);
		    function afterS (err, t) {
		    	if(err) console.log(err);
		    	res.send();
		    }
		}
		else {
			var m = models.Match.find({"uid1": uid2, "uid2": uid1}).exec(addToArray2);
			function addToArray2(err, toAdd2) {
				if(err) console.log(err);
				if (toAdd2[0]) {
					var recs = toAdd2[0].recommenders;
					var oldNum = toAdd2[0].numRecs;
					toAdd2[0].recommenders = recs + "," + rec;
					toAdd2[0].numRecs = oldNum++;
					toAdd2[0].save(afterS);
				    function afterS (err, t) {
				    	if(err) console.log(err);
				    	res.send();
				    }
				}
				else {
					var newMatch = new models.Match({
				    "uid1": uid1,
				    "uid2": uid2,
				    "recommenders": rec,
				    "numRecs": 1,
					});

					newMatch.save(afterSave);
					function afterSave(err, resu) {				    
					    if(err) console.log(err);
					    res.send();
					}
				}
			}
		}
	}
}