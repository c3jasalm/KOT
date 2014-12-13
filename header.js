
if (Meteor.isClient) {

	Template.header.helpers({
		'avatarUser': function () {
            var pathVar = Meteor.user().services.github.username;
            return 'https://avatars.githubusercontent.com/' + pathVar + '?s=200';
		},
		'currentUserName': function () {
            return Meteor.user().services.github.username;
    	},
		'updateName': function () {
            updateUsersRealName();
    	}
        
	});
    Template.registerHelper("currentUserRealName",function(){
        //updateUsersRealName();
    	return getUsersRealName();
    });
    
    updateUsersRealName = function() {
        console.log("SET USER INFO");
        var currentUserId = Meteor.user().services.github.username;
        //Check if user exists
        var current = userInformation.findOne({_id: currentUserId});
        var realName = getUsersRealName();
        console.log("REAL: " + realName);
        
        if (current) {
            console.log("UPDATE");
            var newInfo = {name: realName};
            userInformation.update( {_id: currentUserId}, { $set: newInfo });
        } else {
            console.log("ADD");
            if (typeof(realName) === "undefined") {
                realName = " ";
            }
            userInformation.insert({
     			_id: currentUserId,
      			name: realName
    		});
        }
    }
    getUsersRealName = function() {
        var pathVar = Meteor.user().services.github.username;
    	var apiPath = "https://api.github.com/users/" + pathVar;
    	
    	$.get(apiPath,function(data,status){
            var fullName = _.pick(data, 'name');
            Session.set('realName', fullName.name);
    	});
		return Session.get('realName');
    }
            
}