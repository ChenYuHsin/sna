jQuery(document).ready(function($){
	
	$(".dent_send").click(function(){
		var currentUser = Parse.User.current();
		var category = $('input:radio:checked[name="emotion"]').val();
		var color = $('input:radio:checked[name="emotion"]').attr('data-color');
    	//var category = $('#category').val();
    	var content = $('.make_dent_content').val();
    	var start_datetime_old = $('#start_datetime').val();
		var start_datetime = new Date(Date.parse(start_datetime_old)-28800000);// 考慮時區 CST +0800
    	var end_datetime_old = $('#end_datetime').val();
		var end_datetime = new Date(Date.parse(end_datetime_old)-28800000); // 考慮時區 CST +0800
    	console.log(start_datetime + ":" + end_datetime);
    	deliverDent(currentUser, category, color, content, start_datetime, end_datetime);
		// alert( user + ":" + content + ":" + start_datetime + ":" + end_datetime);
   	});

	$("body").on( "click","#reply_send", function() {
		//var dent_id = $(this).closest(".actions").prev().find("#dent_id").find("div").attr("data-dentId");//requests["id"];
		var dent_id = $(this).closest(".reply_content").attr("data-dentId");
		deliverResponse(dent_id);
	})

	/***********************************  object id to me_line *******************************************/
	setTimeout(function(){
		var currentUser = Parse.User.current();
		if (currentUser) {
			var selecteddate = $('#menu_date').text();
			$('.me_line').attr("data-timelineid", currentUser.id);//object id to me_line
			queryDent(currentUser, selecteddate); 
			/*****  朋友timeline ******/
			friendtimeline();
			setTimeout(function(){ 
				appeardent();
			}, 2000);
			
			queryStatus(currentUser);
		    console.log($("[data-timelineid = '8hGeU3b7nd']"));
		    console.log($(".dinner").find('.cd-timeline-img'));
		    console.log($('.make_dent'));
		    console.log($("[id = 'reply_send']"));
		} else {
		    // show the signup or login page
		}
	}, 1500);

	var themoment = new Date();
	var current_date = themoment.toISOString();
	var updown;
	var current_hour = themoment.getHours();
	var current_minute = themoment.getMinutes();
	var current_string = current_date.substring(0,10) + "T" + current_hour + ":" + current_minute;
	$("#start_datetime").val(current_string);
	$("#end_datetime").val(current_string);
});

		function friendtimeline(){
			var selecteddate = $('#menu_date').text();
			var queryfriend = Parse.Object.extend("User");
			var query = new Parse.Query(queryfriend);
			query.find({
				success:function(frienddata){
					for(var i = 0; i<frienddata.length; i++){
						var friends = Parse.User.current().get("friends");
						for(var j = 0; j<friends.length; j++){
							if(frienddata[i].id == friends[j]){
								if(j <= 4){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #1 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
								else if(j >= 5 && j <=9){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #2 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
								else if(j >= 10 && j <=14){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #3 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
								else if(j >= 15 && j <=19){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #4 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
								else if(j >= 20 && j <=24){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #5 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
								else if(j >= 25 && j <=29){
									var imgsrc = frienddata[i].get("imagesrc");
			 						var friendsSection = "<section id='cd-timeline' class='dinner no_" +i + " cd-container two wide column center' style='position: relative' data-timelineId='"+frienddata[i].id+"'>"+
			 								"<img src='"+imgsrc+"' alt='Picture' class='friends_pic'>"+
			 							"</section>";
									$("#friends_timmeline_area #6 .content").append(friendsSection);
					 				queryDent(frienddata[i], selecteddate);
								}
							}
						}
					}
				}
			})
		}

		function v2friend(selecteddate){
			var friends = Parse.User.current().get("friends");
			for(var i = 0; i<friends.length; i++){
				var user = Parse.Object.extend("User");
				var query = new Parse.Query(user);
				query.equalTo('objectId', friends[i]);
				query.first({
					success:function(friendobject){
						queryDent(friendobject, selecteddate);
					}
				})
			}
			var arr=[];
			$(".modal.reply_content").each(function(){
				var dent_id = $(this).attr("data-dentid");
				arr.push(dent_id);
			});
			console.log(arr);
			setTimeout(function(){
				$.each(arr,function(index, value){
					$( "#dent_"+value+ " .cd-timeline-img" ).on( "click", {
						name: value
					}, showResponseModal );

				});
			},2000)
			
		}

//response modal 產生
		function appeardent(){
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
		}
		
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
			    	//alert("success");
			    	window.location.assign("modent.html");
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
	
	

	


/*************************************** 這是時段template *************************************************/
var timeLineTpl = function(poster ,startmarginTo, keepTime ,face ,color, postId){
	var timeTpl = "<div class='cd-timeline-block "+poster+"' id='dent_"+postId+"' data-block='"+poster+"'' style='margin-top:"+startmarginTo+"px'>"+
					"<div class='cd-timeline-img  cd-"+face +" "+color+ " ui button' style='height: "+keepTime+"px ' data-position='right center' data-variation='wide'>"+
						"<i class='"+face+" icon inverted'></i>"+
					"</div>"+
				"</div>";
	return timeTpl;	
};

function queryDent(object , querytime){
	var Dent = Parse.Object.extend("Dent");
	var selecteddate = new Date(querytime);
	var query = new Parse.Query(Dent);
	var begining = new Date(selecteddate.setHours(0,0,0));
	var end = new Date(selecteddate.setHours(23,59,59));
	query.lessThan("e_datetime", end);
	query.greaterThan("s_datetime", begining);
	query.equalTo("poster", object);
	query.include("poster");
	
	//var origin = "<tr><th>User</th><th>Category</th><th>Content</th><th>Start Time</th><th>End Time</th><th>Response</th><th>Like</th></tr>";
	query.ascending("s_datetime");
	query.find({
		success: function(results){
			if(results.length != 0){
				var pre_time_start_hour = 0;
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
			}	
		},
		error: function(object, error){

		}
	});
}

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
							// console.log("update Dent-likes success.");
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

function deliverResponse(dent_id){
	var currentUser = Parse.User.current();
	var responser = currentUser.id;
	var content = $("[data-dentid = '"+dent_id+"']").find("#reply_area").val();

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
						response.save();

						var replyevent = Parse.Object.extend("Event");
						var reply = new replyevent();
						reply.set("category", "reply");
						reply.set("User", currentUser);
						reply.set("content", content);
						reply.set("targetuser", d.get('poster'));
						reply.save();

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
	$(modalId).modal({
		close: ".close",
		onApprove : function() {
			setTimeout(function(){
				console.log($('#reply_area'));
				console.log(document.getElementById("reply_area").value);
				console.log($('#reply_area').val());
				console.log($('#reply_area').text());
			  	var table_response = "<div class='comment reply_post'>"+
						    "<a class='avatar'>"+
						      "<img src='"+Parse.User.current().get('imagesrc')+"'>"+
						    "</a>"+
						    "<div class='content'>"+
						      "<a class='author'>"+Parse.User.current().get('name')+"</a>"+
						      "<div class='metadata'>"+
						        "<div class='date'>"+moment().fromNow()+"</div>"+
						      "</div>"+
						      "<div class=text'>"+
						        $('#reply_area').val()+
						      "</div>"+
						      
						    "</div>"+
						  "</div>";
					$('.ui.reply.form').before(table_response);
					//$('.modal_'+value.data.name+ " .reply_post").before(table_response);
					$('#reply_area').val("");
			}, 1500);
			return false;
	    }
	}).modal("show");

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
				
				$("#dent_id").attr("data-dentId", post_id);
				var tpl = "<div class='ui modal reply_content small modal_"+post_id+"' data-dentId='"+post_id+"'  >"+
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
							"<div class='ui button ok' id='reply_send'>Send</div>"+
						"</div></div>";

				$("body").append(tpl);	
		      	queryResponse(obj);
		      	$(".modal_rating").click(clickLike(post_id ,Parse.User.current().id));
		      	//$("#modal_rating_count").text(obj.get("likes").length+ " likes");
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
	var Response = Parse.Object.extend("Response");
	var query = new Parse.Query(Response);
	query.include('responser');
	query.descending("createdAt");
	query.equalTo("dent_id", dent); //dent_id型態為物件
	query.find({
	  	success: function(results) {
	  		moment.locale('zh-TW');
	    		for (var i = 0; i < results.length; i++) { 
		    		var currentUser = Parse.User.current();
					var user_id = currentUser.id;
		    		var response = results[i];
			      	var content = response.get("content");
			      	var datetime = moment(response.createdAt).fromNow();
			      	var id = response.id;

			      	var likes_count = 0;
			      	var post = response.get("responser");
			      	var name= post.get("name");
			      	var imgsrc= post.get("imagesrc");
				  	
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
			}
	  	},
	  	error: function(error) {
	    	alert("Error: " + error.code + " " + error.message);
	  	}
	});
}

function queryStatus(currentUser){
	// 因應增加event table，修改邏輯，
	// 先抓出所有朋友，存到陣列
	// 在抓出所有event去判斷category和targetPointer

	var currentUser_id = currentUser.id;
	var AllFriends = Parse.Object.extend("User");
	var query_all_friends = new Parse.Query(AllFriends);
	var friend_list = new Array();
	var event_list = new Array();
	query_all_friends.equalTo("friends", currentUser_id);
	query_all_friends.find({
		success: function(friends) {
			for(var i=0; i<friends.length; i++){
				friend_list.push(friends[i]);
			}

			var Event = Parse.Object.extend("Event");
			var query_event = new Parse.Query(Event);
			query_event.descending("createdAt");
			query_event.include('User');
			query_event.find({
				success: function(results){
					for(var j=0; j<results.length; j++){
						switch(results[j].get("category")){
							case "makedent":
								for(var k=0; k<friend_list.length; k++){
									if(results[j].get("User").id == friend_list[k].id){
										var myevent = {user: results[j].get("User"), contents: results[j].get("content"), createdTime: results[j].createdAt, category: "發佈一則新 dent"};
										event_list.push(myevent);
									}
								}
								
								break;

							case "reply":
								if(results[j].get("targetuser").id == currentUser_id){
									var myevent = {user: results[j].get("User"), contents: results[j].get("content"), createdTime: results[j].createdAt, category: "回應你的 dent"};
									event_list.push(myevent);
								}
								break;

							case "addfriend":
								if(results[j].get("targetuser").id == currentUser_id){
									var myevent = {user: results[j].get("User"), contents: results[j].get("content"), createdTime: results[j].createdAt, category: "加你為好友"};
									event_list.push(myevent);
								}
								break;

							default:
								break;
						}
					}
					showStatus(event_list);
				}
			});
		}
	});
}

function showStatus(event_list){
	// 改為event_list，時間已經排好了，第一筆為最近的Event
	console.log(event_list);
	var status_section = $("#status_content");
	for(var i=0; i<event_list.length; i++){
		var contents;
		if(event_list[i].contents.trim() != "" || event_list[i].contents != null){
			contents = event_list[i].contents;
		}else{
			contents = "";
		}
		var template = '<div class="event">' + 
	    	'<div class="label"><img src="'+ event_list[i].user.get("imagesrc") +'"></div>' + 
	    	'<div class="content">' + 
	      		'<div class="summary">' + 
	        		'<a class="user">' + event_list[i].user.get("name") + '</a> ' + event_list[i].category +
	        		'<div class="date">' + moment(event_list[i].createdTime).fromNow() + '</div>'+
	      		'</div>' +
	      		'<div class="extra text">' +
        		contents + 
      			'</div>' +
    		'</div>' +
  		'</div>';
  		status_section.append(template);
	}
}


	


	//$("body").on("hover",$(".cd-timeline-img").popup({on: "hover"}));
	//$(".cd-timeline-img").popup({on: "hover"});


	
