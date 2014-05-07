// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Page Ready");
	initializePage();
});

function initializePage(){
	$(".class").click(function(){
		console.log(this.id);
		console.log("Icon clicked");
		console.log(".test #" + this.id);
		$("#" + this.id).toggleClass("classPicked");
		$(".button #" + this.id).toggleClass("btn-danger");
	});

	$(".save_button").click(function(){
		var allClasses = $(".classPicked");
		var classes = [];
		var category = null; 
		//var requirement = null;
		allClasses.each(function(){
			var classTaking = $(this).attr('id');
			if(!category){
				category = $(this).attr('name');
			}
			console.log($(this).attr('id'));
			classes.push(classTaking);
		});
		console.log(category);
		$.post("/save_classes",
			{"classes" : classes, 
			"requirement" : null,
			"category" : category}, 
			saveClasses);

	});

	//$(function(){$("#hoho").popover();});
	$("#hoho").popover();
	$("#hoho2").popover();

}