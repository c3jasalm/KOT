
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
    	return Session.get('realName');
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