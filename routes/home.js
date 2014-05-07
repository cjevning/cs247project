
/*
 * GET home page.
 */

 var data = require('../data.json');

exports.viewHome = function(req, res){
	console.log(req.session.username);
    res.render('home', {'data' : data, 'username' : req.session.username});
};

exports.debug = function(req,res){
	res.render('debug',{'classes' : data['classes']});
}

exports.class_major_track = function (req,res) {
	console.log(req.query);
	console.log("major: "+req.query.majorfield);
	console.log("track: "+req.query.trackfield);
	console.log("class: "+req.query.classfield);
	console.log("program:"+req.query.programyear);
	
	if(req.query.Choice_Button == "Major"){
		req.session.classYear = req.query.classfield;
		req.session.programYear = req.query.programyear;
		major = req.query.majorfield.split("-");
		req.session.major = major[0];
		req.session.majorID = major[1];
		track = req.query.trackfield.split("-");
		req.session.track = track[0];
		req.session.trackID = track[1];
	}

	if(req.query.Choice_Button == "University"){
		req.session.classYear = req.query.classfield;
	}

	res.redirect('/requirement/'+req.query.Choice_Button);
}