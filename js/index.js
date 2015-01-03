jQuery(document).ready(function($){
	Parse.initialize("i3YYpkGy0zHRuBevYamiXHNZIGQO8Mmj7IjUxGXE", "sHviJS2dqoTQWIPM3Fx3Si2zv01YQ9KgMIQXMun5");

	if(Parse.User.current()==null){
		$('.logout_btn').css("display","none");
		$('.account_info').css("display", "none");
		$('#account_img').css("display", "none");
	}

	//fblogin button
	$("#my-login-button").click(function(){
	    Parse.FacebookUtils.logIn("user_friends", {
	        success: function(user) {
	            if (!user.existed()){
	                alert("User signed up and logged in through Facebook!");
	                var fbid = user.get('authData')['facebook'].id;
	                user.set('facebookid', fbid);
	                user.save();
	                location.assign("index.html");
	            } 
	            else{
	                alert("User logged in through Facebook!");
	                location.assign("index.html");
	            }
	        },
	        error: function(user, error) {
	            alert("User cancelled the Facebook login or did not fully authorize.");
	            location.assign("index.html");
	        }
	    });
	});
	//logout button
	$(".logout_btn").click(function(){
	    Parse.User.logOut();
	    FB.getLoginStatus(function(response) {
	        if (response && response.status === 'connected') {
	            FB.logout(function(response) {
	                document.location.reload();
	            });
	        }
	    });
	});

	function deliverDent(user, category, content, s, e){
		alert(user.id + ":" + category + ":" + content + ":" + s + ":" + e);
		var Dent = Parse.Object.extend("Dent");
  		var dent = new Dent();
  		var Poster = Parse.Object.extend("User");
  		var query = new Parse.Query(Poster);
  			
		query.get(user.id, {
			success: function(p) {
				var poster = p;
				var s_datetime = new Date(s);
	  			var e_datetime = new Date(e);
	  			dent.set("poster", poster);
	  			dent.set("category", category);
	  			dent.set("content", content);
	  			dent.set("s_datetime", s_datetime);
	  			dent.set("e_datetime", e_datetime);
	  			dent.save(null, {
				  	success: function(gameScore) {
				    	//queryDent();
				    	alert("success");
				  	},
				  	error: function(gameScore, error) {
				    	alert('Failed to create new object, with error code: ' + error.message);
				  	}
				});
			},
			error: function(object, error) {
				alert(error.message);
			}
		});
	};
	
	    
    /*$('#end_datetime').datetimepicker({
	   	dateFormat: "yy-mm-dd"
    });*/

	$(".dent_send").click(function(){
		var currentUser = Parse.User.current();
		var category = $('input:radio:checked[name="emotion"]').val();
    	//var category = $('#category').val();
    	var content = $('.make_dent_content').val();
    	var start_datetime = $('#start_datetime').val();
    	var end_datetime = $('#end_datetime').val();
    	deliverDent(currentUser, category, content, start_datetime, end_datetime);
		// alert( user + ":" + content + ":" + start_datetime + ":" + end_datetime);
   });

/***********************************  object id to me_line *******************************************/
	var currentUser = Parse.User.current();
	if(currentUser){
		$('.me_line').attr("data-meId", currentUser.id);
	}else{

	}
	$('.me_line').attr
/******************************** add friends ****************************************/
$(".add_friend_btn").click(function(){
	var currentUser = Parse.User.current();
	if(currentUser){
		var friends = currentUser.get("friends");
		var friend_id = $(this).closest("div").attr("data-friendId");
		friends.push(friend_id);
		console.log(friends);
		currentUser.save(null, {
			success: function(){
				currentUser.set("friends", friends);
			},
			error: function(){
				alert("error");
			}
		})
		
		

	}else{

	}
	
})
/********************************* 朋友的timeline *****************************************/

/*var friendsTimlineSection = function(num){
	var friendsSection = "<section id='cd-timeline' class=' no_" +num + " cd-container two wide column center' style='position: relative'>"+
								"<img src='img/7.jpg' alt='Picture' class='friends_pic' >"+
							"</section>";
	return friendsSection;
}*/
var currentUser = Parse.User.current();
if (currentUser) {
	var friends = currentUser.get("friends");
	for(var i = 0;i < friends.length; i++){
		var friendsSection = "<section id='cd-timeline' class=' no_" +i + " cd-container two wide column center' style='position: relative'>"+
								"<img src='img/7.jpg' alt='Picture' class='friends_pic'  data-friendId='"+friends[i]+"'>"+
							"</section>";
		$("#friends_timmeline_area #1 .content").append(friendsSection);

		var Dent = Parse.Object.extend("Dent");
		var dent = new Parse.Query(Dent);
		dent.equalTo("poster2", friends[i]);
		
		dent.find({
		  success: function(results) {
		    //alert("Successfully retrieved ");
		    for(j = 0 ; j < friends.length ; j++){
		    	var className= ".no_"+j;
		    	$(className).append(timeLineTpl(1, 3, 'smile' ,'yellow'));
		    };
		    // Do something with the returned Parse.Object values

		    
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}
    
} else {
    // show the signup or login page
}
/*************************************** this is test *************************************************/
	var timeLineTpl = function( startPoint, keepTime ,face , color){
		var timeTpl = "<div class='cd-timeline-block start"+startPoint+"'>"+
						"<div class='cd-timeline-img cd-"+face+ " keep"+keepTime+" "+color +" ui button' data-position='right center' data-variation='wide'>"+
							"<i class='"+face+" icon inverted'></i>"+
						"</div>"+
					"</div>";
		return timeTpl;
		
	};
	//timeLineTpl( 1, 3, 'smile' ,'yellow');
	//$(".me_line").append(timeLineTpl(1, 3, 'smile' ,'yellow'));
	//$(".me_line").append(timeLineTpl(7, 2, 'frown', 'blue' ));
	//$("#test .no_1").append(timeLineTpl(2, 2, 'empty heart', 'red'));
	//$("#test .no_2").append(timeLineTpl(3, 4, 'meh' ,'green'));
	function queryDent(){
		var Dent = Parse.Object.extend("Dent");
		var query = new Parse.Query(Dent);
		
		//var origin = "<tr><th>User</th><th>Category</th><th>Content</th><th>Start Time</th><th>End Time</th><th>Response</th><th>Like</th></tr>";
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
					var calstart = dent_start.getHours()+dent_start.getMinutes();
					var calkeep = (dent_end.getTime() - dent_start.getTime())/1800000;
					var ClassName = "[data-meId = "+ dent_poster.id +"]";
					console.log(ClassName);
					$(ClassName).append(timeLineTpl(calstart, calkeep, dent_category ,'yellow'));

					
					//origin += "<tr><td>" + dent_poster + "</td><td>" + dent_category + "</td><td>" + dent_content + "</td><td>" + dent_start + "</td><td>" + dent_end + "</td><td><a href='response.html?id=" + dent.id + "'>Link</a></td><td><button onclick='like(\"" + dent.id + "\")'>Like</button></td></tr>";
				}
				
			},
			error: function(object, error){
				alert(error.message);
			}
		});
	}

	queryDent();


	
});