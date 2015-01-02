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
	$('#start_datetime').datetimepicker({
		    	dateFormat: "yy-mm-dd"
		    });
		    
		    $('#end_datetime').datetimepicker({
		    	dateFormat: "yy-mm-dd"
		    });

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

	
});