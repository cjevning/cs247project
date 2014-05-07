'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
});

var category;

function initializePage(){
	$.get("/get_classes", getClasses);

	$(".class").click(function(){
		console.log(this.id);
		console.log("Icon clicked");
		console.log(".test #" + this.id);
		ga("send", "event", "course", "click");
		$("#" + this.id).toggleClass("classPicked");
		$(".button #" + this.id).toggleClass("btn-danger");
	});

	$(".save_button").click(function(){
		ga("send", "event", "save", "click");
		var allClasses = $(".classPicked");
		var classes = [];
		allClasses.each(function(){
			var classTaking = $(this).attr('id');
			console.log($(this).attr('id'));
			classes.push(classTaking);
		});
		$.post("/save_classes",
			{"classes" : classes}, 
			saveClasses);
	});

	$(".info").click(function(){
		console.log("Modal button clicked");
		var class_name = $(this).attr('id');
		console.log(class_name);
		$.post("/get_class_detail",{"class": class_name},postClassDetail);
	});

}

function postClassDetail(result){
	console.log(result);
	var message = result['message'];
	console.log(message);
	var className = result['class'];
	var title = result['title'];
	//className = className.substr('info-'.length);
	message = message;
	console.log('#' + className + '-modal .modal-body')
	$('#' + className + '-modal .modal-body').html(message);
	$('#' + className + '-modal .modal-title').html(className + ": " + title);
}

function saveClasses(result){
	console.log(result.requirement);
	var address = "/requirement/" + result.requirement;
	window.location.href=address;
}

function getClasses(result){
	var current_classes = result['classes'];
	console.log(result['classes']);
	console.log("Get classes");
	console.log(category);
	for(var i = 0; i < current_classes.length; i++){
		console.log('#'+current_classes[i]);
		$('#'+current_classes[i]).toggleClass("classPicked");
		$('.button #'+current_classes[i]).toggleClass("btn-danger");

	}
	//toggle class to active for every class passed in
}