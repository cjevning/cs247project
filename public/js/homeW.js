'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$.get("/get_form_details",postDetails);
})

function postDetails(data){
	if(data.classYear){
		console.log(data.classYear);
		$(".uni-year-control #none").removeAttr("selected");
		$(".uni-year-control #uni-" + data.classYear).attr("selected","sel");
		$('#classButton').removeAttr('disabled');	
	}
	if(data.programYear){
		console.log(data.programYear);
		$(".prog-year-control #none").removeAttr("selected");
		$(".prog-year-control #prog-" + data.programYear).attr("selected","sel");	
		$('#majorfield').removeAttr('disabled');

		if(data.major){
			console.log(data.major);
			$(".maj-control #none").removeAttr("selected");
			$(".maj-control #maj-" + data.majorID).prop("selected","sel");
			$('#trackfield').removeAttr('disabled');
			$.get("/major/" + data.major, populateConcentration);

			// if(data.track){
			// 	console.log("Trying to populate the last one!");
			// 	console.log(data.track);
			// 	$(".track-control #none").removeAttr("selected");
			// 	$(".track-control #track-" + data.trackID).prop("selected","sel");	
			// 	$('#majorButton').removeAttr('disabled');	
			// }
		}
	}
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page Ready");
	// add any functionality and listeners you want here
	//$('#classfield').change(toggleUniReqButton);
	$('#programfield').change(toggleMajorField);
	$('#majorfield').change(toggleConcentrationField);
	$('#trackfield').change(toggleMajorButton);
}

function toggleMajorField() {
	console.log("Reached toggleMajorField");
	var major = document.getElementById('programfield').value;
	if(major === "0") {
		$('#majorfield').attr('disabled', 'disabled');
	} else {
		$('#majorfield').removeAttr('disabled');
	}
	toggleMajorButton();
}

// Toggles disabling of Select Concentration Dropdown
function toggleConcentrationField() {
	console.log("Reached toggleConcentrationField");
	document.getElementById('trackfield').innerHTML='';
	var maj = document.getElementById('majorfield').value;
	console.log("major" + maj);
	maj = maj.split("-")[0];
	if(maj === "0") {
		$('#trackfield').attr('disabled', 'disabled');
		toggleMajorButton();
	} else {
		$.get("/major/" + maj, populateConcentration);
		console.log("/major/" + maj);
		$('#trackfield').removeAttr('disabled');
	}
}

function populateConcentration(result) {
	var populate;
	var list = result.tracks;
	console.log("Pouplate concentration");
	var dropdown = document.getElementById('trackfield');
	var el1 = document.createElement("option");
	el1.textContent = "-- Select Track --";
	el1.value = '0';
	dropdown.appendChild(el1);
	for(var i = 0; i < list.length; i++) {
		var el = document.createElement("option");
        el.textContent = list[i].name;
        el.value = list[i].name + "-" + list[i].id;
        el.id = "track-" + list[i].id;
        dropdown.appendChild(el);
	}
	toggleMajorButton();

	try{
		populate = result.populate;
		console.log("Trying to populate...");
		$(".track-control #none").removeAttr("selected");
		$(".track-control #track-" + result.trackID).prop("selected","sel");	
		$('#majorButton').removeAttr('disabled');
	}catch(err){
		console.log(err);
	}
}

// Toggles visibility of Button under Major Requirements
function toggleMajorButton() {
	console.log("Reached toggleMajorButton");
	var classYear = document.getElementById('classfield').value;
	var programYear = document.getElementById('programfield').value;
	var major = document.getElementById('majorfield').value;
	var track = document.getElementById('trackfield').value;
	console.log("track" + track);
	if(track === "0" || major === "0" || programYear === "0") { // || classYear === "0") {
		$('#majorButton').attr('disabled', 'disabled');
		//document.getElementById('majorButton').style.visibility="hidden";
	} else {
		$('#majorButton').removeAttr('disabled');
		//document.getElementById('majorButton').style.visibility="visible";	
	}
}

// Toggles visibility of Button under University Requirements
function toggleUniReqButton() {
	console.log("Reached toggleUniReqButton");
	var year = document.getElementById('classfield').value;
	console.log("year" + year);
	if(year === "0") {
		$('#classButton').attr('disabled', 'disabled');
	} else {
		$('#classButton').removeAttr('disabled');
	}
	toggleMajorButton();
}