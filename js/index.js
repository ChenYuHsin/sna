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
	                user.set('friends', []);
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
	
	function deliverDent(user, category, color, content, s, e){
		alert(user.id + ":" + category + ":" + content + ":" + s + ":" + e);
		var Dent = Parse.Object.extend("Dent");
  		var dent = new Dent();
  		var Poster = Parse.Object.extend("User");
  		var query = new Parse.Query(Poster);
  		var poster_img = $('.post_content img').attr('src'); 
  		var poster_name = $('.make_dent_name').text(); 			
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
		var color = $('input:radio:checked[name="emotion"]').attr('data-color');
    	//var category = $('#category').val();
    	var content = $('.make_dent_content').val();
    	var start_datetime = $('#start_datetime').val();
    	var end_datetime = $('#end_datetime').val();
    	deliverDent(currentUser, category, color, content, start_datetime, end_datetime);
		// alert( user + ":" + content + ":" + start_datetime + ":" + end_datetime);
   });

/***********************************  object id to me_line *******************************************/
	var currentUser = Parse.User.current();
	if(currentUser){
		$('.me_line').attr("data-timelineid", currentUser.id);
	}else{

	}
/******************************** add friends ****************************************/
$(".add_friend_btn").click(function(){

	
});

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
		var queryFriend = new Parse.Query(Parse.User);
		queryFriend.get(friends[i], {
			success: function(friends) {
				var imgsrc = friends.get("imagesrc");
				var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+friends.id+"'>"+
									"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
								"</section>";
				$("#friends_timmeline_area #1 .content").append(friendsSection);
				queryDent();
				
			},
			error: function(object, error) {
				alert(object +" "+error);
			}
		});
		/*queryFriend.equalTo("objectId", friends[i]);
		queryFriend.find({
			success: function(result) {
				
			    var friendsSection = "<section id='cd-timeline' class=' no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+friends[i]+"'>"+
									"<img src='' alt='Picture' class='friends_pic'>"+
								"</section>";
				$("#friends_timmeline_area #1 .content").append(friendsSection);
		  	},
		  	error: function(){
		  		alert("error");
		  	}
		});
		*/

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
    console.log($("[data-timelineid = '8hGeU3b7nd']"));
    console.log($(".dinner").attr("data-timelineid"));
} else {
    // show the signup or login page
}
/*************************************** this is test *************************************************/
	var timeLineTpl = function(poster ,startmarginTo, keepTime ,face ,color, postId){
		var timeTpl = "<div class='cd-timeline-block "+poster+"' id='"+postId+"' style='margin-top:"+startmarginTo+"px'>"+
						"<div class='cd-timeline-img  cd-"+face +" "+color+ " ui button' style='height: "+keepTime+"px ' data-position='right center' data-variation='wide'>"+
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
					var dent_poster_obj = dent.get("poster");
					var dent_poster = dent.get("poster").id;
					var dent_category = dent.get("category");
					var dent_content = dent.get("content");
					var dent_start = dent.get("s_datetime");
					var dent_end = dent.get("e_datetime");
					var dent_color = dent.get("color");
					var calstart = dent_start.getHours();
					var calkeep = (dent_end.getTime() - dent_start.getTime())/3600000;
					var ClassName = "[data-timelineid = '"+ dent_poster +"']";
					var popuoClass = "#"+dent.id+" "+".cd-timeline-img";
					var gaptime = dent_end.getTime() - dent_start.getTime();
					var calkeep = gaptime/60000*2;
					var getstartHour = dent_start.getHours();
					var getstartMinutes = dent_start.getMinutes();
					var calmarginTop = (getstartHour-8)*60*2 + getstartMinutes*2;
					console.log(calkeep);
					$(ClassName).append(timeLineTpl(dent_poster,calmarginTop, calkeep, dent_category  ,dent_color, dent.id));
					var popupTplCotent = "<div class='ui items popup_item'>"+
								  "<div class='item'>"+
								    "<a class='ui tiny image'>"+
								      "<img src='"+dent.get('poster_img')+"' style='border-radius: .25rem;'>"+
								    "</a>"+
								    "<div class='content'>"+
								      "<a class='author'>"+dent.get('poster_name')+"</a>"+
								      "<div class='metadata'>"+
								      	"<div class='date'>1</div>"+
								      "</div>"+
								      "<div class='description'>"+
								        
								        "<p>"+dent_content+"</p>"+
								      "</div>"+
								    "</div>"+
								  "</div>";
					
					$(popuoClass).attr("data-html", popupTplCotent).popup({on: "hover"});	

					
					//here is for click modal
					//origin += "<tr><td>" + dent_poster + "</td><td>" + dent_category + "</td><td>" + dent_content + "</td><td>" + dent_start + "</td><td>" + dent_end + "</td><td><a href='response.html?id=" + dent.id + "'>Link</a></td><td><button onclick='like(\"" + dent.id + "\")'>Like</button></td></tr>";
				}
				
			},
			error: function(object, error){
				alert(error.message);
			}
		});
	}
	var minusMarginTop = function(){
		$("#cd-timeline").each(function(){
			alert();
		})
	};
	minusMarginTop();
	$('body').on("click",".cd-timeline-img",function(){
		var post_id = $(this).closest('.cd-timeline-block').attr("id");

		var Dent = Parse.Object.extend("Dent");
		var query = new Parse.Query(Dent);
		query.equalTo("objectId", post_id);

		query.find({
			success: function(result){
				/**/
				for (var i = 0; i < result.length; i++) { 
			      var obj = result[i];
			      var updatedAt = obj.updatedAt;
			      	$("#poster_modal_img").attr("src", obj.get("poster_img"));
					$("#poster_modal_name").text(obj.get("poster_name"));
					$("#poster_modal_content").text(obj.get("content"));
					$("#poster_create_at").text(updatedAt);
					$(".modal_rating").click(clickLike(post_id ,Parse.User.current().id));
					$("#modal_rating_count").text(obj.get("likes").length+ " likes");
					$("#dent_id").attr("data-dentId", post_id);
			      	queryResponse(obj);
			    }
				
			},
			error: function(){

			}
		})

		$('.reply_content').modal('show');
		
	});
	

	function clickLike(dent_id , user_id){
  			var User = Parse.Object.extend("User");
  			var query = new Parse.Query(User);
  			// 搜尋此使用者
			query.get(user_id, {
				success: function(u) {
					var user = u;
		  			// 修改 dent 資料表內 likes 欄位的資料
					var Dent = Parse.Object.extend("Dent");
					var queryLikes = new Parse.Query(Dent);

					queryLikes.get(dent_id, {
						success: function(r){
							r.addUnique("likes", user_id);
							r.save(null, {
								success: function(object){
									console.log("update Dent-likes success.");
									//queryDent(requests["id"]);
								},
								error: function(object, error){
									console.log(error.message);
								}
							});
						},
						error: function(object, error){
							console.log(error.message);
						}
					});
					var LikesDent = Parse.Object.extend("LikesDent");
					var likesDent = new LikesDent(); 
					
				},
				error: function(object, error) {
					alert(error.message);
					console.log("error");
				}
			});
		}


		$(".reply_send").click(function(){
			var dent_id = $(this).closest(".actions").prev().find("#dent_id").attr("data-dentId");//requests["id"];
			console.log(dent_id);
			deliverReponse(dent_id);
		});

		function deliverReponse(dent_id){
			var currentUser = Parse.User.current();
			var responser = currentUser.id;
			
			var content = $("#reply_area").val();
			var Dent = Parse.Object.extend("Dent");
  			var query1 = new Parse.Query(Dent);
  			var Responser = Parse.Object.extend("User");
  			var query2 = new Parse.Query(Responser);
  			query1.get(dent_id, {
  				success: function(d) {
  					alert('success!!!');
  					query2.get(responser, {
  						success: function(u){
  							alert('success!!');
  							var Response = Parse.Object.extend("Response");
  							var response = new Response();
  							response.set("responser", u);
  							response.set("dent_id", d);
  							response.set("content", content);
  							response.save(null, {
							  	success: function(gameScore) {
							    	//queryResponse(d);
							    	alert('success!');
							  	},
							  	error: function(gameScore, error) {
							    	alert('Failed to create new object, with error code: ' + error.message);
							  	}
							});
  						},
  						error: function(error){
  							alert(error.message);
  						}
  					});
  				},
  				error: function(error){
  					alert(error);
  				}
  			});
		}

		function queryResponse(dent){
			if($(".reply_post").length != 0){
				$(".reply_post").remove();
			}
			var Response = Parse.Object.extend("Response");
			var query = new Parse.Query(Response);
			query.include('responser');
			query.equalTo("dent_id", dent);
			query.find({
			  	success: function(results) {
			  		// alert("Successfully retrieved " + results.length + " scores.");
			    	for (var i = 0; i < results.length; i++) { 
			    		//var user_id = $("#user").val();
			    		var currentUser = Parse.User.current();
						var user_id = currentUser.id;
			    		var response = results[i];
			    		console.log(results[i].id);
				      	var content = response.get("content");
				      	var datetime = response.createdAt;
				      	var id = response.id;
				      	//var responser = response.get("responser");
				      	//console.log("responser"+responser.get('imagesrc'));
				      	//var likes = response.get("likers");
				      	var likes_count = 0;
				      	var post = response.get("responser");
  						var name = response.get("responser").get('name');
  						var imgsrc = response.get("responser").get('imagesrc');
						  	
						    var table_response = "<div class='comment reply_post'>"+
								    "<a class='avatar'>"+
								      "<img src='"+imgsrc+"'>"+
								    "</a>"+
								    "<div class='content'>"+
								      "<a class='author'>"+name+"</a>"+
								      "<div class='metadata'>"+
								        "<div class='date'>"+post.createdAt+"</div>"+
								      "</div>"+
								      "<div class=text'>"+
								        content+
								      "</div>"+
								      
								    "</div>"+
								  "</div>";

								$('#dent_id').after(table_response);

  						
  					
  						

  						//alert(response.get("responser").id);
				      	
				      	//var button_status = "<td><button onclick='clickLike(\"" + id + "\")'>Like</button></td>";
				      	/*if(typeof(likes) != "undefined"){
							likes_count = likes.length;
							for(var j=0; j<likes_count; j++){
								if(likes[j] == user_id){
									button_status = "<td><button onclick='clickDislike(\"" + id + "\")'>Dislike</button></td>";
								}else{
									button_status = "<td><button onclick='clickLike(\"" + id + "\")'>Like</button></td>";
								}
							}
						}else{
							likes_count = 0;
							button_status = "<td><button onclick='clickLike(\"" + id + "\")'>Like</button></td>";
						}*/
				      	//table_response += "<tr><td>" + responser.id + "</td><td>" + content + "</td><td>" + datetime + "</td>" + button_status+ "<td>" + likes_count + "</td></tr>"
			    	}
			    	//$("#response").html(table_response);
			  	},
			  	error: function(error) {
			    	alert("Error: " + error.code + " " + error.message);
			  	}
			});
		}

		



	


	//$("body").on("hover",$(".cd-timeline-img").popup({on: "hover"}));
	//$(".cd-timeline-img").popup({on: "hover"});


	
});