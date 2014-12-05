if (Meteor.isClient) {

	Template.header.helpers({
		'avatarUser':function () {
		var pathVar = Meteor.user().services.github.username;
		return 'https://avatars.githubusercontent.com/' + pathVar + '?s=200';
		},
		currentUserName: function () {
		return Meteor.user().services.github.username;
    	}	
	});
}