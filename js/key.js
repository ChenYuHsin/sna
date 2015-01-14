$(document).ready(function(){
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
	                var fbid = user.get('authData')['facebook'].id;
	                user.set('facebookid', fbid);
	                user.set('friends', []);
	                user.save();
	                location.assign("index.html");
	            } 
	            else{
	                location.assign("index.html");
	            }
	        },
	        error: function(user, error) {
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

	$("#profile").click(function(){
	    window.location.assign("friends.html");
	});

	$(".logo").click(function(){
	    window.location.assign("index-v3.html");
	});

	$("#userphoto").click(function(){
	    window.location.assign("profile-new.html");
	});
})