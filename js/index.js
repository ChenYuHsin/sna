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
	    window.location.assign("profile3.html");
	});

	$(".logo").click(function(){
	    window.location.assign("index.html");
	});

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
	if (currentUser) {
		$('.me_line').attr("data-timelineid", currentUser.id);//object id to me_line
		queryDent(currentUser); 
		/*****  朋友timeline ******/
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
					queryDent(friends);					
				},
				error: function(object, error) {
					alert(object +" "+error);
				}
			});
		}
		//queryDent(); // 需要改呼叫時間，不然會很耗資源

		//response modal 產生
		var postIdArray = [];
		var Dent = Parse.Object.extend("Dent");
		var dent = new Parse.Query(Dent);
		dent.find({
			success: function(results) {
				for(i=0; i<results.length; i++){
					var dentId = results[i].id;
					printResponseTpl(dentId)
					if(dentId==null){
						
					}else{
						postIdArray.push(dentId);
					}
					
					//console.log(dentId.id);
					
				}

				console.log(postIdArray);
				$.each(postIdArray,function(index, value){
					$( "#dent_"+value+ " .cd-timeline-img" ).on( "click", {
					  name: value
					}, showResponseModal );

				});
				
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		
		queryStatus(currentUser);
	    console.log($("[data-timelineid = '8hGeU3b7nd']"));
	    console.log($(".dinner").find('.cd-timeline-img'));
	    console.log($('.make_dent'));
	} else {
	    // show the signup or login page
	}
});
	
	
function deliverDent(user, category, color, content, s, e){
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
	
	

	


/*************************************** 這是時段template *************************************************/
var timeLineTpl = function(poster ,startmarginTo, keepTime ,face ,color, postId){
	var timeTpl = "<div class='cd-timeline-block "+poster+"' id='dent_"+postId+"' data-block='"+poster+"'' style='margin-top:"+startmarginTo+"px'>"+
					"<div class='cd-timeline-img  cd-"+face +" "+color+ " ui button' style='height: "+keepTime+"px ' data-position='right center' data-variation='wide'>"+
						"<i class='"+face+" icon inverted'></i>"+
					"</div>"+
				"</div>";
	return timeTpl;	
};

function queryDent(object){
	var Dent = Parse.Object.extend("Dent");
	var query = new Parse.Query(Dent);
	query.equalTo("poster", object);
	query.include("poster");
	
	//var origin = "<tr><th>User</th><th>Category</th><th>Content</th><th>Start Time</th><th>End Time</th><th>Response</th><th>Like</th></tr>";
	query.ascending("s_datetime");
	query.find({
		success: function(results){
			var pre_time_start_hour = 8;
			var pre_time_start_minute = 0;

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
				var popuoClass = "#dent_"+dent.id+" "+".cd-timeline-img";
				var gaptime = dent_end.getTime() - dent_start.getTime();
				var calkeep = gaptime/60000*2;
				var getstartHour = dent_start.getHours();
				var getstartMinutes = dent_start.getMinutes();
				var calmarginTop = (getstartHour-pre_time_start_hour)*60*2 + (getstartMinutes-pre_time_start_minute)*2;

				pre_time_start_hour = getstartHour;
				pre_time_start_minute = getstartMinutes;

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
	
// function queryDent(){
// 	var Dent = Parse.Object.extend("Dent");
// 	var query = new Parse.Query(Dent);
	
// 	//var origin = "<tr><th>User</th><th>Category</th><th>Content</th><th>Start Time</th><th>End Time</th><th>Response</th><th>Like</th></tr>";
// 	query.ascending("s_datetime");
// 	query.find({
// 		success: function(results){
// 			var pre_time_start_hour = 8;
// 			var pre_time_start_minute = 0;

// 			for(var i=0; i<results.length; i++){

// 				var dent = results[i];
// 				var dent_poster_obj = dent.get("poster");
// 				var dent_poster = dent.get("poster").id;
// 				var dent_category = dent.get("category");
// 				var dent_content = dent.get("content");
// 				var dent_start = dent.get("s_datetime");
// 				var dent_end = dent.get("e_datetime");
// 				var dent_color = dent.get("color");
// 				var calstart = dent_start.getHours();
// 				var calkeep = (dent_end.getTime() - dent_start.getTime())/3600000;
// 				var ClassName = "[data-timelineid = '"+ dent_poster +"']";
// 				var popuoClass = "#dent_"+dent.id+" "+".cd-timeline-img";
// 				var gaptime = dent_end.getTime() - dent_start.getTime();
// 				var calkeep = gaptime/60000*2;
// 				var getstartHour = dent_start.getHours();
// 				var getstartMinutes = dent_start.getMinutes();
// 				var calmarginTop = (getstartHour-pre_time_start_hour)*60*2 + (getstartMinutes-pre_time_start_minute)*2;

// 				pre_time_start_hour = getstartHour;
// 				pre_time_start_minute = getstartMinutes;

// 				$(ClassName).append(timeLineTpl(dent_poster,calmarginTop, calkeep, dent_category  ,dent_color, dent.id));
// 				var popupTplCotent = "<div class='ui items popup_item'>"+
// 							  "<div class='item'>"+
// 							    "<a class='ui tiny image'>"+
// 							      "<img src='"+dent.get('poster_img')+"' style='border-radius: .25rem;'>"+
// 							    "</a>"+
// 							    "<div class='content'>"+
// 							      "<a class='author'>"+dent.get('poster_name')+"</a>"+
// 							      "<div class='metadata'>"+
// 							      	"<div class='date'>1</div>"+
// 							      "</div>"+
// 							      "<div class='description'>"+
							        
// 							        "<p>"+dent_content+"</p>"+
// 							      "</div>"+
// 							    "</div>"+
// 							  "</div>";
				
// 				$(popuoClass).attr("data-html", popupTplCotent).popup({on: "hover"});	

				
// 				//here is for click modal
// 				//origin += "<tr><td>" + dent_poster + "</td><td>" + dent_category + "</td><td>" + dent_content + "</td><td>" + dent_start + "</td><td>" + dent_end + "</td><td><a href='response.html?id=" + dent.id + "'>Link</a></td><td><button onclick='like(\"" + dent.id + "\")'>Like</button></td></tr>";
// 			}
			
// 		},
// 		error: function(object, error){
// 			alert(error.message);
// 		}
// 	});
// }
	
	/*$('body').on("click",".cd-timeline-img",function(){
		var post_id = $(this).closest('.cd-timeline-block').attr("id");

		var Dent = Parse.Object.extend("Dent");
		var query = new Parse.Query(Dent);
		query.equalTo("objectId", post_id);

		query.find({
			success: function(result){
				moment.locale('zh-TW');
				
				for (var i = 0; i < result.length; i++) { 
			      var obj = result[i];
			      var createAt = obj.createdAt;
			      	$("#poster_modal_img").attr("src", obj.get("poster_img"));
					$("#poster_modal_name").text(obj.get("poster_name"));
					$("#poster_modal_content").text(obj.get("content"));
					$("#poster_create_at").text(moment(createAt).fromNow());
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
		
	});*/
	

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
				
				query2.get(responser, {
					success: function(u){
						
						var Response = Parse.Object.extend("Response");
						var response = new Response();
						response.set("responser", u);
						response.set("dent_id", d);
						response.set("content", content);
						response.save(null, {
					  	success: function(gameScore) {
					    	//queryResponse(d);
					    	
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
		

function showResponseModal(value){
	var modalId = ".ui.modal.modal_"+value.data.name;
	console.log(modalId);
	$(modalId).modal('show');
}
		
function printResponseTpl(post_id){
	
	var Dent = Parse.Object.extend("Dent");
	var query = new Parse.Query(Dent);
	query.equalTo("objectId", post_id);

	query.find({
		success: function(result){
			moment.locale('zh-TW');
			/**/
			for (var i = 0; i < result.length; i++) { 
		      var obj = result[i];
		      var createAt = obj.createdAt;
		      	/*$("#poster_modal_img").attr("src", obj.get("poster_img"));
				$("#poster_modal_name").text(obj.get("poster_name"));
				$("#poster_modal_content").text(obj.get("content"));
				$("#poster_create_at").text(moment(createAt).fromNow());*/
				
				
				$("#dent_id").attr("data-dentId", post_id);
				var tpl = "<div class='ui modal reply_content small modal_"+post_id+"' >"+
						"<i class='close icon'></i>"+
						"<div class='header'>"+
						"Reply"+
						"</div>"+
						"<div class='content' id='reply_content'>"+
							"<div class='ui comments'>"+
								"<div class='comment owner_post'>"+
							    "<a class='avatar'>"+
							      "<img id='poster_modal_img' src='"+obj.get("poster_img")+"'>"+
							    "</a>"+
							    "<div class='content' id='dent_id'>"+
							      "<a id= 'poster_modal_name' class='author'>"+obj.get("poster_name")+"</a>"+
							      "<div class='metadata'>"+
							        "<div id='poster_create_at' class='date'>"+moment(createAt).fromNow()+"</div>"+
							        "<div  class='rating modal_rating'>"+
							          "<a id='modal_rating_count'><i class='heart icon'></i>"+
							          "</a>"+
							        "</div>"+
							      "</div>"+

							      "<div id='poster_modal_content' class='text'>"+obj.get("content")+										   
							    "</div>"+
							  "</div>"+
							  "<form class='ui reply form'>"+
							    "<div class='field'>"+
							      "<textarea id='reply_area'></textarea>"+
							    "</div>"+
							  "</form>"+
							"</div>"+
							"</div>"+
						"</div>"+
						"<div class='actions'>"+
							"<div class='ui button'>Cancel</div>"+
							"<div class='ui button reply_send'>Send</div>"+
						"</div></div>";

				$("body").append(tpl);	
		      	queryResponse(obj);
		      	$(".modal_rating").click(clickLike(post_id ,Parse.User.current().id));
		      	$("#modal_rating_count").text(obj.get("likes").length+ " likes");
		    }
			
		},
		error: function(){

		}
	})
};

function queryResponse(dent){
	if($(".reply_post").length != 0){
		$(".reply_post").remove();
	}
	//console.log(dent.id);
	var Response = Parse.Object.extend("Response");
	var query = new Parse.Query(Response);
	query.include('responser');
	query.descending("createdAt");
	query.equalTo("dent_id", dent); //dent_id型態為物件
	query.find({
	  	success: function(results) {
	  		moment.locale('zh-TW');
	  		// alert("Successfully retrieved " + results.length + " scores.");
	    	for (var i = 0; i < results.length; i++) { 
	    		//var user_id = $("#user").val();
	    		var currentUser = Parse.User.current();
				var user_id = currentUser.id;
	    		var response = results[i];
		      	var content = response.get("content");
		      	var datetime = moment(response.createdAt).fromNow();
		      	var id = response.id;
		      	//var responser = response.get("responser");
		      	//console.log("responser"+responser.get('imagesrc'));
		      	//var likes = response.get("likers");
		      	var likes_count = 0;
		      	var post = response.get("responser");
		      	var name= post.get("name");
		      	var imgsrc= post.get("imagesrc");
					//var name = response.get("responser").get('name');
					//var imgsrc = response.get("responser").get('imagesrc');
				  	
			    var table_response = "<div class='comment reply_post'>"+
					    "<a class='avatar'>"+
					      "<img src='"+imgsrc+"'>"+
					    "</a>"+
					    "<div class='content'>"+
					      "<a class='author'>"+name+"</a>"+
					      "<div class='metadata'>"+
					        "<div class='date'>"+datetime+"</div>"+
					      "</div>"+
					      "<div class=text'>"+
					        content+
					      "</div>"+
					      
					    "</div>"+
					  "</div>";
				$('.modal_'+dent.id+ " #dent_id").after(table_response);
						

					
				
					

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

function queryStatus(currentUser){
	// var status_contents = new Array();
	// var status_times = new Array();
	var total_status = new Array();
	var friends = currentUser.get("friends");
	for(var i = 0;i < friends.length; i++){
		var Friend = Parse.Object.extend("User");
		var queryFriend = new Parse.Query(Friend);
		queryFriend.get(friends[i], {
			success: function(friend) {
				var Dent = Parse.Object.extend("Dent");
				var queryFriendDent = new Parse.Query(Dent);
				queryFriendDent.equalTo("poster", friend);
				queryFriendDent.find({
			  		success: function(results) {
			  			// alert(result.id);
			  			for(var j=0; j<results.length; j++){
			  				// status_times.push(results[j].createdAt);
			  				// console.log("createdAt:" + results[j].createdAt);
			  				// status_contents.push(results[j].get("content"));
			  				// console.log("createdAt:" + results[j].get("content"));
			  				var status = {user: results[j].get("poster"), contents: results[j], createdTime: results[j].createdAt, category: "dent"};
			  				total_status.push(status);
			  			}
			  		},
			  		error: function(error) {
			    		alert("Error: " + error.code + " " + error.message);
			  		}
				});

				var Response = Parse.Object.extend("Response");
				var queryFriendResponse = new Parse.Query(Response);
				queryFriendResponse.equalTo("responser", friend);
				queryFriendResponse.find({
					success: function(results) {
			  			for(var k=0; k<results.length; k++){
			  				var status = {user: results[k].get("responser"), contents: results[k], createdTime: results[k].createdAt, category: "response"};
			  				total_status.push(status);
			  			}
			  		},
			  		error: function(error) {
			    		alert("Error: " + error.code + " " + error.message);
			  		}
				});
			},
			error: function(object, error) {
				alert(object +" "+error);
			}
		});
	}

	setTimeout(function(){
		// console.log(status_times);
		// console.log(status_contents);
		// var new_status = sortStatus(status_contents, status_times);
		// showStatus(new_status[0], new_times[1]);
		console.log(total_status);
		showStatus(total_status);
	}, 3000);
}
		
function sortStatus(contents, times){
	// var new_times = times.sort();
	var new_status = [times, contents];
	return new_status;
	// console.log("old:" + times);
	// console.log("new:" + new_times);
}

function showStatus(total_status){
	// 應該先排列
	// for 解析所有status
	// 套入 template
	// append
	var status_section = $("#status_content");
	for(var i=0; i<total_status.length; i++){
		var action;
		console.log("category" + total_status[i].category);
		if(total_status[i].category != "dent"){
			action = "reply on your dent";
		}else{
			action = "make a dent";
		}
		var likes;
		if(total_status[i].category == "dent"){
			if(total_status[i].contents.get("likes") == "undefined"){
				likes = 0;
			}else{
				likes = total_status[i].contents.get("likes").length;	
			}
		}else{
			if(total_status[i].contents.get("likers") == "undefined"){
				likes = 0;
			}else{
				console.log(total_status[i].contents.get("likers"));
				likes = 0;
				// likes = total_status[i].contents.get("likers").length;	
			}
		}
		var template = '<div class="event">' + 
	    	'<div class="label"><img src="'+ total_status[i].contents.get("poster_img") +'"></div>' + 
	    	'<div class="content">' + 
	      		'<div class="summary">' + 
	        		'<a class="user">' + total_status[i].contents.get("post_name") + '</a> ' + action +
	        		'<div class="date">' + moment(total_status.createdTime).fromNow() + '</div>'+
	      		'</div>' +
	      		'<div class="extra text">' +
        		total_status[i].contents.get("content") + 
      			'</div>' +
	      		'<div class="meta">' +
	        		'<a class="like"><i class="like icon"></i> ' + likes + ' Likes</a>'+
      			'</div>' +
    		'</div>' +
  		'</div>';
  		status_section.append(template);
  		// console.log("template:" + template);
	}
}


	


	//$("body").on("hover",$(".cd-timeline-img").popup({on: "hover"}));
	//$(".cd-timeline-img").popup({on: "hover"});


	
