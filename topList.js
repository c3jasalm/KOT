if (Meteor.isClient) {

    Template.topList.helpers({
        'all': function () {
         var currentUserId = Meteor.userId();
      return HoursList.find({userId: currentUserId}, {sort: {start: -1} })
        }
    });

  Template.topList.events({

  });
  
  
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
