if (Meteor.isClient) {

  Template.topList.helpers({
    'topList': function () {
        var usersHours = [];
        var uniqueUsers = listUniqueUsers();
        //return listUniqueUsers();
        uniqueUsers.forEach(function(user) {
            console.log("CountFor: " + user);
            var userHours = countHoursForUser(user);
            usersHours.push({id:user, hours:userHours});
        });
        console.log("Array: " + usersHours[0]["id"]);
        //return usersHours;
        var sorted = _.sortBy(usersHours, 'hours');
        return sorted.reverse();
    }
  });
  
  listUniqueUsers = function() {
    var users = [];
    HoursList.find().map(function(db) {
        if (users.indexOf(String(db.ghUserId)) === -1) {
            users.push(String(db.ghUserId));
        }
    })
    console.log(users.toString());
    return users;
  }
  
  countHoursForUser = function(userName) {
    var total = 0;
      
    HoursList.find({ghUserId: userName}).map(function(db) {
      total += parseInt(db.stop - db.start);
    })
       
    var totalMinutes = total / 1000 / 60;
    var hours = totalMinutes / 60;

    return hours;
  }
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}