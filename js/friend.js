$(document).on("click", "#add_friend_btn", function(){
		var recommendfriend = function(id, url, name){
			var friendbody = $('<div class="card" id="'+id+'"><div class="dimmable image"><div class="ui dimmer"></div><img src="'+url+'"></div><div class="content"><a class="header">'+name+'</a></div><div class="ui bottom blue attached button" id="add_friend_btn"><i class="add icon"></i>Add Friend</div></div>');

			$('#recommendfriend').append(friendbody);
		}
		var friendlist = function(id, url, name){
			var listbody = $('<div class="card" id="'+id+'"><div class="image"><img src="'+url+'"></div><div class="content"><a class="header">'+name+'</a></div></div>');

			$('#friendlists').append(listbody);
		}
		var friendid = $(this).parent().attr('id');
		var friendname = $(this).parent().children('.content').children('.header').text();
		$("#add_friends_modal").modal({
			onApprove: function(){
				var currentuser = Parse.User.current();
				var currentuserfriends = Parse.User.current().get('friends');
				currentuserfriends.push(friendid);
				currentuser.set("friends", currentuserfriends);
				currentuser.save();
				var user = Parse.Object.extend("User");
				var query = new Parse.Query(user);
				query.equalTo("objectId", friendid);
				query.first({
					success:function(frienddata){
						var friendid = frienddata.id;
						var friendurl = frienddata.get('imagesrc');
						var friendname = frienddata.get('name');
						friendlist(friendid, friendurl, friendname);
						$('#recommendfriend').children('[id="'+friendid+'"]').remove();

						var addfriendevent = Parse.Object.extend("Event");
						var addfriend = new addfriendevent();
						addfriend.set("category", "addfriend");
						addfriend.set("User", currentuser);
						addfriend.set("targetuser", frienddata);
						addfriend.save();
					}
				})
			}
		}).modal("show");
		//var r = confirm("Do you want to add " + friendname + " as a friend?");
		/*if (r==true){
			var currentuser = Parse.User.current();
			var currentuserfriends = Parse.User.current().get('friends');
			currentuserfriends.push(friendid);
			currentuser.set("friends", currentuserfriends);
			currentuser.save();
			var user = Parse.Object.extend("User");
			var query = new Parse.Query(user);
			query.equalTo("objectId", friendid);
			query.first({
				success:function(frienddata){
					var friendid = frienddata.id;
					var friendurl = frienddata.get('imagesrc');
					var friendname = frienddata.get('name');
					friendlist(friendid, friendurl, friendname);
					$('#recommendfriend').children('[id="'+friendid+'"]').remove();

					var addfriendevent = Parse.Object.extend("Event");
					var addfriend = new addfriendevent();
					addfriend.set("category", "addfriend");
					addfriend.set("User", currentuser);
					addfriend.set("targetuser", frienddata);
					addfriend.save();
				}
			})
		}*/
	});