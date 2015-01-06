$(document).on("click", "#add_friend_btn", function(){
	var friendid = $(this).parent().attr('data-roleId');
	var friendname = $(this).parent().children('.content').children('.header').text();
	var user = Parse.Object.extend("User");
	var query = new Parse.Query(user);
	query.equalTo("objectId", friendid);
	query.first({
		success:function(frienddata){
			var friendfbid = frienddata.get("facebookid");
			var r = confirm("Do you want to add " + friendname + " as a friend?");
			if (r==true){
				var currentuser = Parse.User.current();
				var currentuserfriends = Parse.User.current().get('friends');
				currentuserfriends.push(friendfbid);
				currentuser.set("friends", currentuserfriends);
				currentuser.save();
			}
		}
	})
});