$(document).ready(function(){
var uniChart = $("#universityChart").get(0).getContext("2d");
    var uniData = {
	labels : ["IHUM","Disciplinary Breadth","Education for Citizenship"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [3,5,2]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [3,3,1]
		}
	]
	}
	var universityChart = new Chart(uniChart).Radar(uniData);
	

	var majChart = $("#majorChart").get(0).getContext("2d");
    var majData = {
	labels : ["Math","Science","Technology in Society","Eng Fundamental", "Writing in Major", "Core", "Speciality", "Capstone"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [4,3,1,3,1,3,4,1]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [3,2,1,2,0,2,2,0]
		}
	]
	}
	var majorChart = new Chart(majChart).Radar(majData);


	
});
