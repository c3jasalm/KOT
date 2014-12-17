
if (Meteor.isClient) {

	Template.header.helpers({
		'avatarUser': function () {
            var pathVar = Meteor.user().services.github.username;
            return 'https://avatars.githubusercontent.com/' + pathVar + '?s=200';
		},
		'currentUserName': function () {
            return Meteor.user().services.github.username;
    	}
	});
    Template.registerHelper("currentUserRealName",function(){
        console.log("CURN: " + Session.get('realName'));
        if (typeof(Session.get('realName')) === 'undefined')
        {
            console.log("Use DB");
            var currentUserId = Meteor.user().services.github.username;
            console.log("CURN ID: " + currentUserId);
            var fullName = "";
            userInformation.find({_id: currentUserId}).map(function(db) {
                fullName = db.name;
              })
            return fullName;
        } else {
            return Session.get('realName');
        }
    });

    getUsersRealName = function() {
        var pathVar = Meteor.user().services.github.username;
    	var apiPath = "https://api.github.com/users/" + pathVar;
    	
        /*
    	$.get(apiPath,function(data,status){
            var fullName = _.pick(data, 'name');
            Session.set('realName', fullName.name);
    	});
        */
        $.ajax({
            async: false,
            type: 'GET',
            url: apiPath,
            success: function(data) {
                var fullName = _.pick(data, 'name');
                Session.set('realName', fullName.name)
                console.log("Set session name: " + fullName.name);
            }
        });
        
		return Session.get('realName');
    }
            
}