if (Meteor.isClient) {

	Template.header.helpers({
		'avatarUser':function () {
		return Meteor.user()._id;
		},
		currentUserName: function () {
		return Meteor.user().services.github.username;
    	}	
	});
}