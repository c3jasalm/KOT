if (Meteor.isClient) {
  // counter starts at 0

    Template.totalHours.helpers({
        //Returns total hours string for current user
        totalHoursString: function () {
        var total = 0;
        var currentUserId = Meteor.userId();
        //Count hours
        HoursList.find({userId: currentUserId}).map(function(db) {
            total += parseInt(db.usedTime);
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
    //Returns current users GitHub username
    currentUserName: function () {
        return Meteor.user().services.github.username;
    }
  });
    //Returns total hours float for current user 
    Template.registerHelper("totalHoursFloat",function(){
        return totalFloat();
    });
  
  //Helper for current users GitHub username
  Template.totalHoursUser.helpers({
    currentUserName: function () {
        return Meteor.user().services.github.username;
    }
  });

  Template.totalHours.events({
  });
    //Returns total hours float for current user 
    totalFloat = function() {
        var total = 0;
        var currentUserId = Meteor.userId();
        //Count hours
        HoursList.find({userId: currentUserId}).map(function(db) {
            total += parseInt(db.usedTime);
        })
          
        var totalMinutes = total / 1000 / 60;
        var hours = totalMinutes / 60;

        return Math.round(hours * 100) / 100;
    }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
