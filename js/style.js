$(document).ready(function(){
	//$('.dropdown').dropdown();
	$('.ui.dropdown').dropdown();
	
	$('.cd-timeline-img.cd-location').sidebar('toggle');

	$('.left.sidebar.menu').sidebar('attach events', '.status');	
	$('.status').removeClass('disabled');
	
	$('.special.cards .image').dimmer({
  		on: 'hover'
	});
	$('.btn_make_dent').click(function(){
		$('.post_content').modal('show');

	});

	$("#quickdent").popup();
	//$('.ui.sticky').sticky();
    $("#frindes_next").popup({
    	position: "bottom right",
    });
    $("#frindes_previous").popup({
    	position: "bottom left",
    });
	
	// $('.login_btn').click(function(){
	// 	$('.login_content').modal('show');
	// });
	
	$('.shape').shape();
	$('#frindes_previous').click(function(){
		$('.shape').shape('set next side', getSideUp()).shape('flip left');
	});
	$('#frindes_next').click(function(){
		$('.shape').shape('set next side', getSideDown()).shape('flip right');
	});
	$('body').keydown(function(event){
 		if (event.which == 37) { //左鍵的代碼
  			$('.shape').shape('set next side', getSideUp()).shape('flip left');
 		}
 		if (event.which == 39) { //右鍵的代碼
 			$('.shape').shape('set next side', getSideDown()).shape('flip right');
 		}
	});

	//make dent emption
	$('.make_dent_emotion .checkbox').checkbox();
	//$('.shape').shape('flip up');
	var getSideUp = function(){
		var order = $('.side.active').attr('id');
		var num = Number(order);
		console.log("id"+order);
		if(num == $('.side').length){
			return "."+1;
		}else{
			console.log("."+ ++num);
			return "."+ num++;
		}
		
	}
	var getSideDown = function(){
		var order = $('.side.active').attr('id');
		var num = Number(order);
		console.log("id"+order);
		if(num == 1){
			return "."+ $('.side').length;
		}else{
			
			return "."+ --num;
			
		}
		
	}
	//$('.shape').shape('set next side', '.second.side').shape('flip up');

	

	//******************************** 時段 ******************************************//
	/*var timeLineTpl = function( startPoint, keepTime ,face , color){
		var timeTpl = "<div class='cd-timeline-block start"+startPoint+"'>"+
						"<div class='cd-timeline-img cd-"+face+ " keep"+keepTime+" "+color +" ui button' data-position='right center' data-variation='wide'>"+
							"<i class='"+face+" icon inverted'></i>"+
						"</div>"+
					"</div>";
		return timeTpl;
		
	};*/
	//timeLineTpl( 1, 3, 'smile' ,'yellow');
	/*$(".me_line").append(timeLineTpl(1, 3, 'smile' ,'yellow'));
	$(".me_line").append(timeLineTpl(7, 2, 'frown', 'blue' ));
	$("#test .no_1").append(timeLineTpl(2, 2, 'empty heart', 'red'));
	$("#test .no_2").append(timeLineTpl(3, 4, 'meh' ,'green'));*/
	/*function queryDent(timelineClass){
		var Dent = Parse.Object.extend("Dent");
		var query = new Parse.Query(Dent);
		var origin = "<tr><th>User</th><th>Category</th><th>Content</th><th>Start Time</th><th>End Time</th><th>Response</th><th>Like</th></tr>";
		query.find({
			success: function(results){
				// alert("Successfully retrieved " + results.length + " scores.");
				for(var i=0; i<results.length; i++){
					var dent = results[i];
					var dent_poster = dent.get("poster").id;
					var dent_category = dent.get("category");
					var dent_content = dent.get("content");
					var dent_start = dent.get("s_datetime");
					var dent_end = dent.get("e_datetime");
					origin += "<tr><td>" + dent_poster + "</td><td>" + dent_category + "</td><td>" + dent_content + "</td><td>" + dent_start + "</td><td>" + dent_end + "</td><td><a href='response.html?id=" + dent.id + "'>Link</a></td><td><button onclick='like(\"" + dent.id + "\")'>Like</button></td></tr>";
				}
				
				$(timelineClass).append(timeLineTpl(1, 3, 'smile' ,'yellow'));
			},
			error: function(object, error){
				alert(error.message);
			}
		});
	}
	queryDent(".me_line");*/
	/************************************** 時段popup ************************************************************/
	var popupTpl = function(img, description){
		var popupTplCotent = "<div class='ui items popup_item'>"+
								  "<div class='item'>"+
								    "<a class='ui tiny image'>"+
								      "<img src='"+img+" ' style='border-radius: .25rem;'>"+
								    "</a>"+
								    "<div class='content'>"+
								      "<a class='author'>Joe Henderson</a>"+
								      "<div class='metadata'>"+
								      	"<div class='date'>1</div>"+
								      "</div>"+
								      "<div class='description'>"+
								        
								        "<p>"+description+"</p>"+
								      "</div>"+
								    "</div>"+
								  "</div>";
		return  popupTplCotent;

	};

	var c1="晚餐吃大魚墮落！誰要跟我一起！！";
	var c2 = "www";
	//$('.cd-timeline-img').attr("data-html", popupTpl("img/5.jpg", c1));
	$('.cd-timeline-block').click(function(){
		
	});
	//$(".cd-timeline-img").popup({on: "hover"});


	//時段end

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

var nextcheckColor = function(element, elecolor){
	if(element.find(".cd-timeline-img").attr("data-color")){
		if(element.find(".cd-timeline-img").data("color")===elecolor){
			element.find(".cd-timeline-img").css({"background": "#66c17b"});
			nextcheckColor(element.find(".cd-timeline-img").closest(".cd-timeline-block").next(),elecolor);
		}
	}
};
var prevcheckColor = function(element, elecolor){
	if(element.find(".cd-timeline-img").attr("data-color")){
		if(element.find(".cd-timeline-img").data("color")===elecolor){
			element.find(".cd-timeline-img").css({"background": "#66c17b"});
			prevcheckColor(element.find(".cd-timeline-img").closest(".cd-timeline-block").prev(),elecolor);
		}
	}
};
var nextremoveColor = function(element, elecolor){
	if(element.find(".cd-timeline-img").attr("data-color")){
		if(element.find(".cd-timeline-img").data("color")===elecolor){
			element.find(".cd-timeline-img").css({"background": "#5bbd72"});
			nextremoveColor(element.closest(".cd-timeline-block").next(), elecolor);
		}
	}
}
var prevremoveColor = function(element, elecolor){
	if(element.find(".cd-timeline-img").attr("data-color")){
		if(element.find(".cd-timeline-img").data("color")===elecolor){
			element.find(".cd-timeline-img").css({"background": "#5bbd72"});
			prevremoveColor(element.closest(".cd-timeline-block").prev(), elecolor);
		}
	}
}
	
	$("#friends_page .cd-timeline-img.ui.button").hover(function(){
		var color = $(this).data("color");
		var nextele = $(this).closest(".cd-timeline-block").next();
		var prevele = $(this).closest(".cd-timeline-block").prev();
		nextcheckColor(nextele, color);
		prevcheckColor(prevele, color);
	},function(){
		var color = $(this).data("color");
		var nextele = $(this).closest(".cd-timeline-block").next();
		var prevele = $(this).closest(".cd-timeline-block").prev();
		nextremoveColor(nextele, color);
		prevremoveColor(prevele, color);

	});

	
});
