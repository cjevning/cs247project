var models = require('../models');

exports.match = function(req,res)
{
	req.session.uid = req.params.uid;
	var seen = [];
	var splits = req.session.uid.split("=");
    var loggedIn = splits[1];
	var g = models.NoMatch.find({"recommender": loggedIn}).exec(afterQuery);
	function afterQuery(err, results) {
		if(err) { console.log(err); res.send(500); }
		var len = results.length;
		for (var i = 0; i < len; i++) {
			var r = results[i];
			var m = {"uid1": r.uid1, "uid2": r.uid2};
			seen.push(m);
		}
		res.render('match', { 'seen': seen });
	}
}

exports.good = function(req, res) {
	var uid1 = req.params.uid1;
	var uid2 = req.params.uid2;
	var rec = req.params.recommender;
	var l = models.Match.find({"uid1": uid1, "uid2": uid2}).exec(addToArray);
	function addToArray(err, toAdd) {
		if(err) { console.log(err); res.send(500); }
		res.send();
		if (toAdd[0]) {
			var recs = toAdd[0].recommenders;
			var oldNum = toAdd[0].numRecs;
			toAdd[0].recommenders = recs + "," + rec;
			toAdd[0].numRecs = oldNum++;
			toAdd[0].save(afterS);
		    function afterS (err, t) {
		    	if(err) console.log(err);
				var newNoMatch = new models.NoMatch({
				    "uid1": uid1,
				    "uid2": uid2,
				    "recommender": rec,
				});
				newNoMatch.save(afterSave);
				function afterSave(err, resu) {	
				    if(err) { console.log(err); res.send(500); }
				    if (toAdd[0].numRecs == 5) {
						var newNot = new models.Notification({
							"uid": uid1,
							"type": "match",
							"seen": false,
							"from": uid2,
						});
						newNot.save(aSave);
						function aSave(err, resul) {
							if(err) { console.log(err); res.send(500); }
							var newNot = new models.Notification({
								"uid": uid2,
								"type": "match",
								"seen": false,
								"from": uid1,
							});
							newNot2.save(aS);
							function aS(err, re) {
								if(err) { console.log(err); res.send(500); }
								res.send();
							}
						}
					}
				}	
		    }
		}
		else {
			var m = models.Match.find({"uid1": uid2, "uid2": uid1}).exec(addToArray2);
			function addToArray2(err, toAdd2) {
				if(err) { console.log(err); res.send(500); }
				if (toAdd2[0]) {
					var recs = toAdd2[0].recommenders;
					var oldNum = toAdd2[0].numRecs;
					toAdd2[0].recommenders = recs + "," + rec;
					toAdd2[0].numRecs = oldNum++;
					toAdd2[0].save(afterS);
				    function afterS (err, t) {
				    	if(err) { console.log(err); res.send(500); }
				    	var newNoMatch = new models.NoMatch({
						    "uid1": uid1,
						    "uid2": uid2,
						    "recommender": rec,
						});
						newNoMatch.save(afterSave);
						function afterSave(err, resu) {	
						    if(err) { console.log(err); res.send(500); }
						    if (toAdd[0].numRecs == 5) {
								var newNot = new models.Notification({
									"uid": uid1,
									"type": "match",
									"seen": false,
									"from": uid2,
								});
								newNot.save(aSave);
								function aSave(err, resul) {
									if(err) { console.log(err); res.send(500); }
									var newNot2 = new models.Notification({
										"uid": uid2,
										"type": "match",
										"seen": false,
										"from": uid1
									});
									newNot2.save(aS);
									function aS(err, re) {
										if(err) { console.log(err); res.send(500); }
										res.send();
									}
								}
							}
						}	
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
					    if(err) { console.log(err); res.send(500); }
					    var newNoMatch = new models.NoMatch({
						    "uid1": uid1,
						    "uid2": uid2,
						    "recommender": rec,
						});
						newNoMatch.save(afterSave);
						function afterSave(err, resu) {	
						    if(err) { console.log(err); res.send(500); }
						    res.send();
						}	
					}
				}
			}
		}
	}
}


exports.bad = function(req, res) {
	var uid1 = req.params.uid1;
	var uid2 = req.params.uid2;
	var rec = req.params.recommender;
	var newNoMatch = new models.NoMatch({
	    "uid1": uid1,
	    "uid2": uid2,
	    "recommender": rec,
	});
	newNoMatch.save(afterSave);
	function afterSave(err, resu) {	
	    if(err) { console.log(err); res.send(500); }
	    res.send();
	}	
}

exports.check = function(req, res) {
	var user = req.params.user;
	var l = models.Notification.find({"uid": user, "seen": false}).exec(addToArray);
	function addToArray(err, results) {
		if(err) { console.log(err); res.send(500); }
		if (results[0]) {
			res.json({"notifications": true, "id": results[0]._id, "type": results[0].type});
		}
		else res.json({"notifications": false});
	}
}

exports.seen = function(req, res) {
	var user = req.params.user;
	var id = req.params.id;
	var l = models.Notification.update({"uid": user, "_id": id},{"seen": true}).exec(addToArray);
	function addToArray(err, results) {
		if(err) { console.log(err); res.send(500); }
		res.send();
	}
}
