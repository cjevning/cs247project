var data = require ('../data.json');
var courseData = require('../courseData.json');
var courseMap = require('../courseMap.json');


// Function used to populate form in home.page
// home.html
exports.listTracks = function(req, res) { 
	var major = req.params.major;
	console.log(major);
	var courseList = data[major]['tracks'];
	var populate = false;
	var trackID;
	if(req.session.track){
		populate = true;
		trackID = req.session.trackID;
	}
	res.send({'tracks':courseList,"populate":populate,"trackID":trackID});
}

exports.saveClasses = function(req,res){
	var classes = req.body.classes;
	addToClasses(req,classes);
	console.log("In saveClasses");
	console.log(req.session.current_classes);
	res.json({"requirement":req.session.requirement});	
}

exports.getClasses = function(req,res){
	console.log("getClasses");
	var category = req.session.current_category;
	var requirement = req.session.current_requirement;
	console.log(category);
	if(category){
		var classes = null;
		try{
			classes = req.session.current_classes[requirement][category];
		}
		catch(err){
			console.log("ERROR");
			console.log(err);
		}
		console.log(classes);
		res.json({'classes':classes});
	}else{
		res.json({'classes':"No classes"});
	}
}

exports.getFormDetails = function(req,res){
	var classYear, programYear, major, track, majorID, trackID;
	if(req.session.classYear){
		classYear = req.session.classYear;
	}
	if(req.session.programYear){
		programYear = req.session.programYear;
	}
	if(req.session.major){
		major = req.session.major;
		majorID = req.session.majorID;
	}
	if(req.session.track){
		track = req.session.track;
		trackID = req.session.trackID;
	}
	res.json(
		{'classYear': classYear, 
		'programYear': programYear,
		'major': major, 
		'track': track,
		'majorID' : majorID,
		'trackID' : trackID});
}

function addToClasses(req, classes){
	var category = req.session.current_category;
	var requirement = req.session.current_requirement;
	console.log("Category " + category);
	console.log("Current category " + req.session.current_category);
	console.log("classes " + classes);


	if(!req.session.current_classes){
		// If current_classes isn't created, create it and add classes
		req.session.current_classes = {};
	}
	if(!req.session.current_classes[requirement]){
			req.session.current_classes[requirement] = {}
	}
	req.session.current_classes[requirement][category] = classes;
	
}
function isNumeric(num){
    return !isNaN(num)
}
exports.getClassDetails = function(req,res){
	var class_name = req.body.class;
	
	class_name = class_name.substr('info-'.length);
	console.log("Class Name ");
	class_name_upper = class_name.toUpperCase();
	console.log(class_name);

	var classPrefix = "";
	for(var i = 0; i<class_name.length; i++){
		if(isNaN(class_name[i])){
			console.log(class_name[i]);
			var buf = class_name[i];
			classPrefix = classPrefix + buf.toUpperCase();
		}else{ //This is to prevent grabbing A on CS106A
			break;
		}
	}
	console.log("Class prefix");
	console.log(classPrefix);
	var department = courseMap[classPrefix];
	console.log(department);
	var description = courseData[department][class_name_upper]['description'];
	var title = courseData[department][class_name_upper]['title'];
	console.log(description);
	res.json({'message' : description, 'class' : class_name, 'title' : title});
}











