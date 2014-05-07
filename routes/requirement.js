var data = require('../data.json');

exports.viewRequirement = function(req,res){
  // req.session.universityYear = "2014";
  // if(req.session.universityYear){
  //   uniYear = req.session.universityYear;
  // }

  var current_classes = req.session.current_classes;
  if(req.session.current_classes){
    console.log(req.session.current_classes);
  }
  else{
    console.log("no classes");  
  }

  var uniYear = "2014";
  var requirement = req.params.requirement;
  req.session.requirement = req.params.requirement;
  if(requirement != "University" && requirement != "Major"){
    res.render('home'); 
  }
  var major = 'Computer Science';
  if(requirement == 'University'){
    major = "Buffer";
    res.render("comingsoon",{"name":requirement});
  }
  var requirements = data['requirements'][requirement][uniYear][major];
  req.session.tabBoolean = false;
  res.render('requirements',{
    "name" : requirement,
    "requirements" : requirements,
    "classes" : current_classes,
    "tabBoolean" : false
  });
}

exports.viewRequirementAlternate = function(req,res) {
  var current_classes = req.session.current_classes;
  if(req.session.current_classes){
    console.log(req.session.current_classes);
  }
  else{
    console.log("no classes");  
  }

  var uniYear = "2014";
  var requirement = req.params.requirement;
  req.session.requirement = req.params.requirement;
  if(requirement != "University" && requirement != "Major"){
    res.render('home'); 
  }
  var major = 'Computer Science';
  if(requirement == 'University'){
    major = "Buffer";
    res.render("comingsoon",{"name":requirement});
  }
  var requirements = data['requirements'][requirement][uniYear][major];
  req.session.tabBoolean = true;
  res.render('requirements',{
    "name" : requirement,
    "requirements" : requirements,
    "classes" : current_classes,
    "tabBoolean" : true
  });
}