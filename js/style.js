$(document).ready(function(){
	//$('.dropdown').dropdown();
	$('.ui.dropdown').dropdown();
	
	$('.cd-timeline-img.cd-location').sidebar('toggle');

	$('.left.sidebar.menu').sidebar('attach events', '.toggle.button');	
	$('.toggle.button').removeClass('disabled');
   
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
	var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

	// Create an object newDate()
	var newDate = new Date();
	// Retrieve the current date from the Date object
	newDate.setDate(newDate.getDate());
	// At the output of the day, date, month and year    
	$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

	setInterval( function() {
	    // Create an object newDate () and extract the second of the current time
	    var seconds = new Date().getSeconds();
	    // Add a leading zero to the value of seconds
	    $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	    },1000);
	    
	setInterval( function() {
	    // Create an object newDate () and extract the minutes of the current time
	    var minutes = new Date().getMinutes();
	    // Add a leading zero to the minutes
	    $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
	    },1000);
	    
	setInterval( function() {
	    // Create an object newDate () and extract the clock from the current time
	    var hours = new Date().getHours();
	    // Add a leading zero to the value of hours
	    $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
	    }, 1000);
});
