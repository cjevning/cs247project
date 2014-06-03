var models = require('../models');

exports.message = function(req,res)
{
	var user = req.params.user;
	var match = req.params.match;
	var b = models.Match.find({"uid1": user, "uid2": match}).exec(addToArray);
	function addToArray(err, results) {
		var len = results.length;
		if (len < 1) {
			var a = models.Match.find({"uid1": match, "uid2": user}).exec(addToArray2);
			function addToArray2(err, resu) {
				var match = resu[0];
				var allthem = match.recommenders;
				var splits = allthem.split(",");
				var recommenders = "";
				for (var i = 0; i < splits.length-1; i++) {
					recommenders += splits[i];
					recommenders += ", ";
				}
				recommenders += "and ";
				recommenders += splits[splits.length-1];
				res.render('message', {'recommenders': recommenders});
			}
		}
		else {
			var match = results[0];
			var allthem = match.recommenders;
			var splits = allthem.split(",");
			var recommenders = "";
			for (var i = 0; i < splits.length-1; i++) {
				recommenders += splits[i];
				recommenders += ", ";
			}
			recommenders += "and ";
			recommenders += splits[splits.length-1];
			res.render('message', {'recommenders': recommenders});
		}
	}
}

exports.allMessages = function(req,res)
{
	var id = req.params.id;
	console.log(id);
	var all = [];
	var newMessages = [];
	var q = models.Notification.find({"uid": id}).exec(addToArray2);
	function addToArray2(err, re) {
		var len = re.length;
		for (var i = 0; i < len; i++) {
			newMessages.push({"from": re[i].from});
		}
		var b = models.Notification.find({"uid": id}).remove();
	}
	
	var l = models.Match.find({"uid1": id, "numRecs": {"$gte": 5}}).exec(addToArray);
	function addToArray(err, results) {
		var len = results.length;
		for (var i = 0; i < len; i++) {
			all.push({"user": id, "match": results[i].uid2});
		}
		var k = models.Match.find({"uid2": id, "numRecs": {"$gte": 5}}).exec(addToArray2);
		function addToArray2(err, resu) {
			var leng = resu.length;
			for (var j = 0; j < leng; j++) {
				all.push({"user": id, "match": resu[j].uid1});
			}
			res.render('allmessages', {'matches': all, 'messages': newMessages});
		}
	}
}

exports.goodorder = function(req,res)
{
	var user = req.params.user;
	var match = req.params.match;
	var b = models.Match.find({"uid1": user, "uid2": match}).exec(addToArray);
	function addToArray(err, results) {
		var len = results.length;
		if (len < 1) {
			res.json({"good": false, "id": match, "user": user});
		}
		else {
			res.json({"good": true, "id": match, "user": user});
		}
	}
}

exports.notify = function(req, res) {
	var newNot = new models.Notification({
		"uid": req.params.to,
		"type": "message",
		"seen": false,
		"from": req.params.from
	});
	newNot.save(aS);
	function aS(err, re) {
		if(err) { console.log(err); res.send(500); }
		res.send();
	}
}