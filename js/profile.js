$(document).ready(function(){
	var follower = Parse.Object.extend("User");
	var query = new Parse.Query(follower);
	query.notEqualTo("objectId", Parse.User.current().id);
	query.find({
		success:function(alluser){
			var myfollower = 0;
			for(i = 0; i<alluser.length; i++){
				var alluserfriend = alluser[i].get('friends');
				for(var j = 0; j<alluserfriend.length; j++){
					if(alluserfriend[j] == Parse.User.current().id){
						myfollower++;
					}
				}
			}
			$('.follwers-num').html(myfollower);
		}
	})

	var dent = Parse.Object.extend("Dent");
	var query1 = new Parse.Query(dent);
	query1.equalTo("poster", Parse.User.current());
	query1.find({
		success:function(mydent){
			var mydentnum = mydent.length;
			$('.Dents-num').html(mydentnum);
		}
	})
})