
if (Meteor.isClient) {

	Template.header.helpers({
        //Returns GitHub avatar
		'avatarUser': function () {
            var pathVar = Meteor.user().services.github.username;
            return 'https://avatars.githubusercontent.com/' + pathVar + '?s=200';
		},
        //Returns GitHub username
		'currentUserName': function () {
            return Meteor.user().services.github.username;
    	}
	});
    //Returns users real name, registered helper -> can be used from other template also
    Template.registerHelper("currentUserRealName",function(){
        if (typeof(Session.get('realName')) === 'undefined')
        {
            var currentUserId = Meteor.user().services.github.username;
            var fullName = "";
            userInformation.find({_id: currentUserId}).map(function(db) {
                fullName = db.name;
              })
            return fullName;
        } else {
            return Session.get('realName');
        }
    });
    
    //Returns users real name from GitHub
    getUsersRealName = function() {
        var pathVar = Meteor.user().services.github.username;
    	var apiPath = "https://api.github.com/users/" + pathVar;
    	
        /*
    	$.get(apiPath,function(data,status){
            var fullName = _.pick(data, 'name');
            Session.set('realName', fullName.name);
    	});
        */
        //User name must be retrieved during login
        //Use synchronous get for retrieving information from GitHub
        //TODO: Minimize login delay by doing this on the server, or asynchronously
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