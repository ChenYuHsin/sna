$(document).on("click", "#add_friend_btn", function(){
	var friendid = $(this).parent().attr('data-roleId');
	var friendname = $(this).parent().children('.content').children('.header').text();
	var r = confirm("Do you want to add " + friendname + " as a friend?");
	if (r==true){
		var currentuserfriends = Parse.User.current().get('friends');
		var afteraddfriend = currentuserfriends.push(friendid);
		currentuserfriends.set("friends", afteraddfriend);
		currentuserfriends.save();
	}
});