exports.viewLogin = function(req, res){
    res.render('login');
};

exports.login = function(req,res){
	var email = req.query.email;
	var password = req.query.password;

	req.session.username = email;

	console.log(email);
	console.log(password);

	res.redirect('/home');
}