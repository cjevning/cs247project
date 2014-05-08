exports.match = function(req,res)
{
	req.session.uid = req.params.uid;
	res.render('match');
}