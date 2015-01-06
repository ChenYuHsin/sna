$(document).on("click", "#add_friend_btn", function(){
	$('#add_friend_btn').on("click",function(){
		var friendid = $(this).parent().attr('data-roleid').text();
		console.log(friendid);
		console.log(friendname);
		var r = confirm("Do you want to add " + friendname + " as a friend?");
		if (r==true){
			var currentuserfriends = Parse.User.current().get('friends');
			currentuserfriends.push(friendid);
			currentuserfriends.save();
		}
		else{
			
		}
	})
});