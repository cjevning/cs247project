var models = require('../models');

exports.message = function(req,res)
{
	req.session.uid = req.params.uid1;
	var l = models.Match.find({"uid": req.session.uid}).remove();
	res.render('message');
}