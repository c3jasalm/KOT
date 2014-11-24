if (Meteor.isClient) {

  Template.displayHours.helpers({
    'previousHours': function () {
    	var currentUserId = Meteor.userId();
      return HoursList.find({userId: currentUserId}, {sort: {start: -1} })
    },
    'formatDate': function(date) {
  	return moment(date).format('DD.MM.YYYY HH:MM');
  	},
  	'formatTime': function(time) {
  	return moment.utc(time).format('HH:mm:ss');
  	}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}