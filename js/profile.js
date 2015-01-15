$(document).ready(function(){
	var myfriend = Parse.User.current().get('friends');
	var myfriendnum = myfriend.length;
	$('.included-num').html(myfriendnum);

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

	$('#gotofacebook').attr('href', "http://www.facebook.com/"+Parse.User.current().get('facebookid'));

	$(document).on("click", "#quickdent", function(){
		var currentuser = Parse.User.current();
		var category = "Empty Star";
		var color = "black";
		var content = "一支穿雲箭，千軍萬馬來相見！";
		var s = new Date();
		var e = new Date(s.getTime() + 30*60000);
		deliverDent(currentuser, category, color, content, s, e);
		

	})

})

function deliverDent(user, category, color, content, s, e){
	var Dent = Parse.Object.extend("Dent");
		var dent = new Dent();
		var Poster = Parse.Object.extend("User");
		var query = new Parse.Query(Poster);
		var poster_img = Parse.User.current().get('imagesrc'); 
		var poster_name = Parse.User.current().get('name');
		// var poster_img = $('.post_content img').attr('src'); 
		// var poster_name = $('.make_dent_name').text(); 	 			
	query.get(user.id, {
		success: function(p) {
			var poster = p;
			var s_datetime = new Date(s);
  			var e_datetime = new Date(e);
  			dent.set("poster", poster);
  			dent.set("category", category);
  			dent.set("color", color);
  			dent.set("content", content);
  			dent.set("s_datetime", s_datetime);
  			dent.set("e_datetime", e_datetime);
  			dent.set("poster_img", poster_img);
  			dent.set("poster_name", poster_name);
  			dent.save(null, {
			  	success: function(gameScore) {
			    	//queryDent();
			    	
					$("#quickdent_modal").modal("show");
					
			    	setTimeout(function(){
			    		window.location.assign("modent.html");
			    	}, 2000);
			  	},
			  	error: function(gameScore, error) {
			    	alert('Failed to create new object, with error code: ' + error.message);
			  	}
			});
			var makedentevent = Parse.Object.extend("Event");
			var makedent = new makedentevent();
			makedent.set("category", "makedent");
			makedent.set("User", user);
			makedent.set("content", content);
			makedent.save();
		},
		error: function(object, error) {
			alert(error.message);
		}
	});
};