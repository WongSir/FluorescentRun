window.onload = function(){
	var date1 = new Date();
	var date2 = new Date(2014,10,3,0,0,0);
	time = date2.getTime()-date1.getTime();
	days = parseInt(time/1000/60/60/24)+1;
	document.getElementById("timeLeft").innerHTML = days;
}