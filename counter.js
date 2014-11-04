if (Meteor.isClient) {
 
  Template.counter.helpers({
 	timeStart: function () {
 		return Session.get("start");
 	},
 	timeStop: function () {
 		return Session.get("stop");
 	},
 	timeHours: function () {
 		return Session.get("usedHours");
 	},
 	timeMinutes: function () {
 		return Session.get("usedMinutes");
 	},
 	timeSeconds: function () {
 		return Session.get("usedSeconds");
 	}
});

  Template.counter.events({
    'click #start': function () {
      start = new Date();
      Session.set("start", start); 
    },
    'click #stop': function () {
      stopp = new Date();
      usedTime = new Date(stopp.getTime() - start.getTime());
      Session.set("stop", stopp);
      Session.set("usedHours", usedTime.getUTCHours());
      Session.set("usedMinutes", usedTime.getMinutes());
      Session.set("usedSeconds", usedTime.getSeconds());
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
