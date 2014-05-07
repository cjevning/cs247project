var data = require('../data.json');


exports.viewCategory = function(req,res){
  console.log("tabBool" + req.session.tabBoolean);
  if (req.session.tabBoolean === false) {
    var uniYear = "2014";
    var category = req.params.category;
    var requirement = req.params.requirement;
    var major = 'Computer Science';
    if(requirement == "University"){
        major = "Buffer";
    }
    console.log(major);
    var requirements = data['requirements'][requirement][uniYear][major];
    //console.log(requirements);
    req.session.current_category = category;
    req.session.current_requirement = requirement;

    var classes_in_category;
    var class_electives;
    var about;
    var miniDescription;

    for(var i=0; i<requirements.length; i++){
      var obj = requirements[i];
      if(obj.name == category){
        class_electives = obj.electives;
        miniDescription = obj.miniDescription;
        if(category == "Specialization"){
          track = req.session.track;
          about = obj.specializations["Artificial Intelligence"]["about"];
          classes_in_category = obj.specializations["Artificial Intelligence"]["classes"];
        }else{
          about = obj.about;
          classes_in_category = obj.classes;
        }
      }
    }
    // For Debug atm, gets classes you've chosen
    var current_classes = null;
    try{
      current_classes = req.session.current_classes[requirement][category];
      console.log("in view category");
      console.log(current_classes);
    }catch(err){
      console.log(err)
      console.log("Not classes in that category");
    }

    res.render("category",{
      "requirement" : requirement, 
      "category" : category, 
      "classes" : classes_in_category,
      "electives" : class_electives,
      "about" : about,
      "current_classes" : current_classes,
      "on_elective" : false,
      "miniDescription" : miniDescription,
      "tabBoolean" : false
    });
  
  } else {
    var uniYear = "2014";
    var category = req.params.category;
    var requirement = req.params.requirement;
    var major = 'Computer Science';
    if(requirement == "University"){
        major = "Buffer";
    }
    console.log(major);
    var requirements = data['requirements'][requirement][uniYear][major];
    //console.log(requirements);
    req.session.current_category = category;
    req.session.current_requirement = requirement;

    var classes_in_category;
    var class_electives;
    var about;
    var miniDescription;

    for(var i=0; i<requirements.length; i++){
      var obj = requirements[i];
      if(obj.name == category){
        class_electives = obj.electives;
        miniDescription = obj.miniDescription;
        if(category == "Specialization"){
          track = req.session.track;
          about = obj.specializations["Artificial Intelligence"]["about"];
          classes_in_category = obj.specializations["Artificial Intelligence"]["classes"];
        }else{
          about = obj.about;
          classes_in_category = obj.classes;
        }
      }
    }

    // For Debug atm, gets classes you've chosen
    var current_classes = null;
    try{
      current_classes = req.session.current_classes[requirement][category];
      console.log("in view category");
      console.log(current_classes);
    }catch(err){
      console.log(err)
      console.log("Not classes in that category");
    }


    res.render("category",{
      "requirement" : requirement, 
      "category" : category, 
      "classes" : classes_in_category,
      "about" : about,
      "current_classes" : current_classes,
      "on_elective" : false,
      "miniDescription" : miniDescription,
      "tabBoolean" : true
    });
  }
}


exports.viewElectives = function(req,res){
  var uniYear = "2014";
  var category = req.params.category;
  var requirement = req.params.requirement;
  var major = 'Computer Science';
  if(requirement == "University"){
      major = "Buffer";
  }
  console.log(major);
  var requirements = data['requirements'][requirement][uniYear][major];
  //console.log(requirements);
  req.session.current_category = category;
  req.session.current_requirement = requirement;

  var classes_in_category;
  var class_electives;
  var about;
  var miniDescription;

  for(var i=0; i< requirements.length; i++){
    var obj = requirements[i];
    if(obj.name == category){
      classes_in_category = obj.classes;
      class_electives = obj.electives;
      about = obj.about;
      miniDescription = obj.miniDescription;
    }
  }

  // For Debug atm, gets classes you've chosen
  var current_classes = null;
  try{
    current_classes = req.session.current_classes[requirement][category];
    console.log("in view category");
    console.log(current_classes);
  }catch(err){
    console.log(err)
    console.log("Not classes in that category");
  }


  res.render("category",{
    "requirement" : requirement, 
    "category" : category, 
    "classes" : class_electives,
    "about" : about,
    "current_classes" : current_classes,
    "on_elective" : true,
    "miniDescription" : miniDescription,
    "tabBoolean" : true
  });

}

exports.viewAll = function(req,res){

  var uniYear = "2014";
  var category = req.params.category;
  var requirement = req.params.requirement;
  var major = 'Computer Science';
  if(requirement == "University"){
      major = "Buffer";
  }
  console.log(major);
  var requirements = data['requirements'][requirement][uniYear][major];
  //console.log(requirements);
  req.session.current_category = category;
  req.session.current_requirement = requirement;

  var classes_in_category;
  var class_electives;
  var about;
  var miniDescription;

  for(var i=0; i<requirements.length; i++){
    var obj = requirements[i];
    if(obj.name == category){
      class_electives = obj.electives;
      miniDescription = obj.miniDescription;
      if(category == "Specialization"){
        track = req.session.track;
        about = obj.specializations["Artificial Intelligence"]["about"];
        classes_in_category = obj.specializations["Artificial Intelligence"]["classes"];
      }else{
        about = obj.about;
        classes_in_category = obj.classes;
      }
    }
  }

  // For Debug atm, gets classes you've chosen
  var current_classes = null;
  try{
    current_classes = req.session.current_classes[requirement][category];
    console.log("in view category");
    console.log(current_classes);
  }catch(err){
    console.log(err)
    console.log("Not classes in that category");
  }


  res.render("category",{
    "requirement" : requirement, 
    "category" : category, 
    "classes" : classes_in_category,
    "electives" : class_electives,
    "about" : about,
    "current_classes" : current_classes,
    "on_elective" : false,
    "miniDescription" : miniDescription,
    "tabBoolean" : false
  });
}