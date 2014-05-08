exports.message = function(req,res)
{
	req.session.uid = req.params.uid1;
	res.render('message');
}