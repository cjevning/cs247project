var models = require('../models');

exports.message = function(req,res)
{
	req.session.uid = req.params.uid1;
	var l = models.Notification.find({"uid": req.session.uid}).remove();
	res.render('message');
}

exports.allMessages = function(req,res)
{
	var id = req.params.id;
	console.log(id);
	var all = [];
	var l = models.Match.find({"uid1": id, "numRecs": {"$gte": 5}}).exec(addToArray);
	function addToArray(err, results) {
		var len = results.length;
		console.log(len);
		for (var i = 0; i < len; i++) {
			all.push({"user": id, "match": results[i].uid2});
		}
		var k = models.Match.find({"uid2": id, "numRecs": {"$gte": 5}}).exec(addToArray2);
		function addToArray2(err, resu) {
			var leng = resu.length;
			for (var j = 0; j < leng; j++) {
				all.push({"user": id, "match": resu[j].uid1});
			}
			res.render('allMessages', {'matches': all});
		}
	}
}