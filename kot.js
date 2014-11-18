HoursList = new Mongo.Collection('hours');
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.displayHours.helpers({
    previousHours: function () {
    	var currentUserId = Meteor.userId();
      return HoursList.find({userId: currentUserId}, {sort: {start: -1} })
    }
  });

  Template.selector.events({
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
