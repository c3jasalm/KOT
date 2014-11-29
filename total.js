if (Meteor.isClient) {
  // counter starts at 0

    Template.totalHours.helpers({
   	totalHoursString: function () {
      var total = 0;
      var currentUserId = Meteor.userId();
      HoursList.find({userId: currentUserId}).map(function(db) {
        total += parseInt(db.stop - db.start);
          })
      var totalMinutes = total / 1000 / 60;
      var hours = parseInt(totalMinutes / 60);
      var minutes = parseInt(totalMinutes % 60);
      
      var hoursStr = hours.toString();
      var minutesStr = minutes.toString();
      
      if (hours < 10) {
        hoursStr = "0" + hours.toString();
      }
      if (minutes < 10) {
        minutesStr = "0" + minutes.toString();
      }
      return hoursStr + ":" + minutesStr;
    },
   	totalHoursFloat: function () {
      var total = 0;
      var currentUserId = Meteor.userId();
      HoursList.find({userId: currentUserId}).map(function(db) {
        total += parseInt(db.stop - db.start);
          })
      var totalMinutes = total / 1000 / 60;
      var hours = totalMinutes / 60;

      return hours;
    },
    	currentUserName: function () {
    		return Meteor.user().services.github.username;
    	}
  });
  
  Template.totalHoursUser.helpers({
    currentUserName: function () {
        return Meteor.user().services.github.username;
    }
  });

  Template.totalHours.events({
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
