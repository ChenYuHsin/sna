$(document).ready(function(){

	//呈現時間
	var monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	//var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
	var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thurs day","Friday","Saturday"];
	
	// Create an object newDate()
	var newDate = new Date();
	// Retrieve e current date from the Date object
	newDate.setDate(newDate.getDate());
	// At the output of the day, date, month and year    
	//$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
	$("#menu_date").html(monthNames[newDate.getMonth()]+"/"+newDate.getDate()+"/"+newDate.getFullYear());

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

    //status
	$('.left.sidebar.menu').sidebar('attach events', '#status_sidebar_btn');	
	$('#status_sidebar_btn').removeClass('disabled');

	//menu scroll
	var scrollUpBtn = $("#scroll_up_btn");
	var scrollDownBtn = $("#scroll_down_btn");
	var nav = $(".following.bar");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 136) {
			nav.addClass("light fixed");
			scrollUpBtn.removeClass("inverted")
			scrollDownBtn.removeClass("inverted")

		} else {
			nav.removeClass("light fixed");
			scrollUpBtn.addClass("inverted")
			scrollDownBtn.addClass("inverted")
		}
	});

	$(".chevron.icon").popup();
	var chooseDate = monthNames[newDate.getMonth()]+"/"+newDate.getDate()+"/"+newDate.getFullYear();

	$("#next_date").click(function(){

		var user_choose_date = $("#menu_date").text();
		var nowTime = new Date(user_choose_date);
		
		var nextDate = new Date(nowTime.getTime()+86400000);

		$("#menu_date").html(monthNames[nextDate.getMonth()]+"/"+nextDate.getDate()+"/"+nextDate.getFullYear());

		$("[data-timelineid = '"+Parse.User.current().id+"']").remove("'."+Parse.User.current().id+"'");
		var userfriend = Parse.User.current().get('friends');
		for(var i = 0; i< userfriend.length; i++){
			$("[data-timelineid = '"+userfriend[i]+"']").remove("'."+userfriend[i]+"'");
		}
		var selecteddate = $('#menu_date').text();
		queryDent(Parse.User.current(), selecteddate); 
		v2friend(selecteddate);
		setTimeout(function(){ 
			appeardent();
		}, 2000);		
		
	})
	$("#previous_date").click(function(){

		var user_choose_date = $("#menu_date").text();
		var nowTime = new Date(user_choose_date);
		
		var previousDate = new Date(nowTime.getTime()-86400000);

		$("#menu_date").html(monthNames[previousDate.getMonth()]+"/"+previousDate.getDate()+"/"+previousDate.getFullYear());
		
		$("[data-timelineid = '"+Parse.User.current().id+"']").remove("'."+Parse.User.current().id+"'");
		var userfriend = Parse.User.current().get('friends');
		for(var i = 0; i< userfriend.length; i++){
			console.log($("[data-timelineid = '"+userfriend[i]+"']"));
			$("[data-timelineid = '"+userfriend[i]+"']").remove("'."+userfriend[i]+"'");
		}
		var selecteddate = $('#menu_date').text();
		queryDent(Parse.User.current(), selecteddate); 
		v2friend(selecteddate);
		setTimeout(function(){ 
			appeardent();
		}, 2000);	
	})

	//scroll
	var currentScroll = (newDate.getHours())*60+newDate.getMinutes();
	var scrollDistance = currentScroll*2-(8*60*2);
	console.log(scrollDistance);

	$.fn.scrollBy = function (x, y) {
    return this.animate({
        scrollLeft: '+=' + x,
        scrollTop: '+=' + y
    });
};
	//window.scrollTo(scrollDistance);
	$("#go_to_now").click(function(){
		$('html,body').scrollBy(0, scrollDistance);
	})
	$("#scroll_up_btn").click(function(){
		$('html,body').stop().scrollBy(0, -380);
	})
	$("#scroll_down_btn").click(function(){
		$('html,body').stop().scrollBy(0, 380);
	})
	/*window.scrollTo(0, scrollD$('html,body').stop().scrollBy(0, 500);istance);

	$("#scroll_up_btn").click(function(){
		window.scrollBy(0, -380);
	})
	$("#scroll_down_btn").click(function(){
		window.scrollBy(0, 380);
	})*/
})


	