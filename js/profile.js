$(document).ready(function(){
	var getrecommendfriend = function(){
		FB.api("/me/friends",function (response) {
        	if (response && !response.error) {
        		for(var i = 0; i<response.length; i++){
        			console.log(response.data[i]);
        		}
        	}
        });
	}

	var friendbase = function(id, url, name){
		var friendbody = $('<div class="card" id="1234567" data-roleId="'+id+'"><div class="dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button add_friend_btn">Add Friend</div></div></div></div><img src="'+url+'"></div><div class="content"><a class="header">'+name+'</a></div></div>');
		$('#recommendfriend').append(friendbody);
	}
	getrecommendfriend();
})