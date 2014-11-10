HoursList = new Mongo.Collection('hours');
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.displayHours.helpers({
    previousHours: function () {
      return HoursList.find({}, {sort: {start: -1} })
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
